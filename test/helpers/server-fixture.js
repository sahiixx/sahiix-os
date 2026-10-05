const { fork } = require('node:child_process');
const { EventEmitter } = require('node:events');
const fs = require('node:fs');
const http = require('node:http');
const path = require('node:path');
const { PassThrough } = require('node:stream');
const vm = require('node:vm');

async function startServer(t, file, env = {}) {
  const child = fork(__filename, [file], {
    env: { ...process.env, BRIDGE_TOKEN: '', ...env },
    stdio: ['ignore', 'ignore', 'pipe', 'ipc']
  });
  t.after(() => new Promise(resolve => {
    if (child.exitCode !== null || child.signalCode !== null) return resolve();
    child.once('exit', resolve);
    child.kill();
  }));
  const port = await new Promise((resolve, reject) => {
    const timer = setTimeout(() => reject(new Error('Fixture startup timed out')), 5000);
    child.once('error', reject);
    child.once('exit', code => reject(new Error(`Fixture exited with code ${code}`)));
    child.once('message', message => {
      clearTimeout(timer);
      resolve(message.port);
    });
  });
  return {
    async request(route, method = 'GET', body) {
      const response = await fetch(`http://127.0.0.1:${port}${route}`, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: body === undefined ? undefined : typeof body === 'string' ? body : JSON.stringify(body),
        signal: AbortSignal.timeout(3000)
      });
      return { status: response.status, body: await response.json() };
    },
    control(message) {
      return new Promise((resolve, reject) => {
        child.once('exit', reject);
        child.once('message', reply => {
          child.removeListener('exit', reject);
          if (reply.error) reject(new Error(reply.error));
          else resolve(reply.result);
        });
        child.send(message);
      });
    }
  };
}

module.exports = { startServer };

if (require.main === module) {
  const root = path.resolve(__dirname, '../..');
  const file = process.argv[2];
  const bridgeCalls = [];
  let db;
  const isolatedHttp = {
    ...http,
    createServer(handler) {
      const server = http.createServer(handler);
      const listen = server.listen.bind(server);
      server.listen = (_port, _host, callback) => listen(0, '127.0.0.1', () => {
        process.send({ port: server.address().port });
        callback();
      });
      return server;
    },
    request(options, callback) {
      // Simulate the bridge entirely in memory: never send a real WhatsApp request.
      const request = new EventEmitter();
      let body = '';
      request.write = chunk => { body += chunk; };
      request.end = () => process.nextTick(() => {
        bridgeCalls.push({
          hostname: options.hostname,
          port: options.port,
          path: options.path,
          authorizationMatches: options.headers.Authorization === `Bearer ${process.env.BRIDGE_TOKEN}`,
          body: JSON.parse(body)
        });
        const response = new PassThrough();
        callback(response);
        response.end(JSON.stringify({ ok: true }));
      });
      return request;
    }
  };
  process.on('message', message => {
    if (message.sql) {
      db.exec(message.sql, error => process.send(error ? { error: error.message } : { result: true }));
    } else {
      process.send({ result: bridgeCalls });
    }
  });
  vm.runInNewContext(fs.readFileSync(path.join(root, file), 'utf8'), {
    __dirname: root,
    process: { env: process.env },
    console: { log() {}, error() {} },
    fetch() { throw new Error('External fetch blocked by test fixture'); },
    require(name) {
      if (name === 'http') return isolatedHttp;
      if (name === 'sqlite3') return {
        verbose() {
          return { Database: function() {
            db = new (require('sqlite3').verbose().Database)(':memory:');
            return db;
          } };
        }
      };
      return require(name);
    }
  }, { filename: file });
}
