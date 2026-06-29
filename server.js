const http = require('http');
const fs = require('fs');
const sqlite3 = require('sqlite3').verbose();
const path = require('path');

const PORT = process.env.PORT || 3001;
const HOST = process.env.HOST || '0.0.0.0';
const DB_PATH = path.join(__dirname, 'estate.db');
const db = new sqlite3.Database(DB_PATH);

db.serialize(() => {
  db.run(`CREATE TABLE IF NOT EXISTS properties (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    title TEXT NOT NULL,
    location TEXT NOT NULL,
    price INTEGER NOT NULL,
    beds INTEGER,
    baths INTEGER,
    sqft INTEGER,
    status TEXT DEFAULT 'available',
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
  )`);

  db.run(`CREATE TABLE IF NOT EXISTS leads (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    phone TEXT,
    email TEXT,
    property_id INTEGER,
    status TEXT DEFAULT 'new',
    notes TEXT,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (property_id) REFERENCES properties(id)
  )`);

  // Seed only if empty
  db.get('SELECT COUNT(*) as count FROM properties', (err, row) => {
    if (!err && row.count === 0) {
      db.run(`INSERT INTO properties (title, location, price, beds, baths, sqft) VALUES
        ('Palm Jumeirah Villa', 'Palm Jumeirah', 12500000, 5, 6, 8500),
        ('Downtown Apartment', 'Downtown Dubai', 3200000, 2, 3, 1800),
        ('Costa Brava Luxury Townhouse', 'Damac Lagoons (Costa Brava)', 2900000, 4, 4, 2500),
        ('Costa Brava Premium Villa', 'Damac Lagoons (Costa Brava)', 5800000, 5, 6, 4200),
        ('Dubai Marina Penthouse', 'Dubai Marina', 8900000, 4, 5, 4200),
        ('JVC Studio', 'Jumeirah Village', 650000, 1, 1, 550)`);
      console.log('Seeded 6 default properties');
    } else {
      console.log(`Database loaded: ${row?.count || 0} properties found`);
    }
  });
});

const parseBody = (req) => new Promise((resolve) => {
  let body = '';
  req.on('data', chunk => body += chunk);
  req.on('end', () => resolve(JSON.parse(body || '{}')));
});

const setCORS = (res) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
};

const serveFile = (res, filePath, contentType) => {
  fs.readFile(filePath, (err, data) => {
    if (err) {
      res.writeHead(404, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({ error: 'File not found' }));
    } else {
      res.writeHead(200, { 'Content-Type': contentType });
      res.end(data);
    }
  });
};

const routes = {
  'GET /': (req, res) => {
    res.writeHead(200, { 'Content-Type': 'text/html' });
    res.end(`<!DOCTYPE html><html><head><meta http-equiv="refresh" content="0;url=/dashboard.html"></head><body>Redirecting to dashboard...</body></html>`);
  },

  'GET /health': (req, res) => {
    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({ status: 'ok', name: 'SAHIIXX OS API', version: '1.0.0', timestamp: new Date().toISOString() }));
  },

  'GET /properties': (req, res) => {
    db.all('SELECT * FROM properties ORDER BY created_at DESC', (err, rows) => {
      res.writeHead(200, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify(rows));
    });
  },

  'POST /properties': async (req, res) => {
    const body = await parseBody(req);
    db.run('INSERT INTO properties (title, location, price, beds, baths, sqft) VALUES (?, ?, ?, ?, ?, ?)',
      [body.title, body.location, body.price, body.beds, body.baths, body.sqft],
      function(err) {
        res.writeHead(201, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ id: this.lastID, ...body }));
      });
  },

  'GET /leads': (req, res) => {
    db.all(`SELECT l.*, p.title as property_title FROM leads l LEFT JOIN properties p ON l.property_id = p.id ORDER BY l.created_at DESC`, (err, rows) => {
      res.writeHead(200, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify(rows));
    });
  },

  'POST /leads': async (req, res) => {
    const body = await parseBody(req);
    db.run('INSERT INTO leads (name, phone, email, property_id, notes) VALUES (?, ?, ?, ?, ?)',
      [body.name, body.phone, body.email, body.property_id, body.notes],
      function(err) {
        res.writeHead(201, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ id: this.lastID, ...body }));
      });
  },

  'PUT /leads/:id': async (req, res) => {
    const id = req.url.split('/')[2];
    const body = await parseBody(req);
    db.run('UPDATE leads SET status = ?, notes = ? WHERE id = ?',
      [body.status, body.notes, id],
      function(err) {
        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ updated: this.changes }));
      });
  },

  'GET /dashboard': (req, res) => {
    db.all(`SELECT status, COUNT(*) as count FROM leads GROUP BY status`, (err, stats) => {
      db.all(`SELECT COUNT(*) as total FROM properties`, (err, propCount) => {
        const dashboard = {
          lead_stats: stats,
          total_properties: propCount[0]?.total || 0,
          pipeline: { new: 0, contacted: 0, qualified: 0, closed: 0 }
        };
        stats.forEach(s => dashboard.pipeline[s.status] = s.count);
        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify(dashboard));
      });
    });
  }
};

const server = http.createServer(async (req, res) => {
  setCORS(res);
  const cleanUrl = req.url.split('?')[0];

  if (req.method === 'OPTIONS') {
    res.writeHead(204);
    res.end();
    return;
  }

  // Static files
  if (req.method === 'GET' && (cleanUrl === '/' || cleanUrl === '/dashboard.html')) {
    serveFile(res, path.join(__dirname, 'dashboard-v3.html'), 'text/html');
    return;
  }
  if (req.method === 'GET' && cleanUrl === '/manifest.json') {
    serveFile(res, path.join(__dirname, 'manifest.json'), 'application/json');
    return;
  }
  if (req.method === 'GET' && cleanUrl === '/sw.js') {
    serveFile(res, path.join(__dirname, 'sw.js'), 'application/javascript');
    return;
  }

  // Ollama proxy for custom voice AI
  if (req.method === 'POST' && cleanUrl === '/ollama-proxy') {
    const body = await parseBody(req);
    try {
      const result = await fetch('http://127.0.0.1:11434/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body)
      });
      const data = await result.json();
      res.writeHead(200, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify(data));
    } catch (err) {
      res.writeHead(502, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({ error: 'Ollama not available', detail: err.message }));
    }
    return;
  }

  const exactKey = `${req.method} ${cleanUrl}`;

  // Try exact match first
  let handler = routes[exactKey];

  // Fallback: match parameterized routes like PUT /leads/:id
  if (!handler) {
    const parts = cleanUrl.split('/');
    for (const routeKey of Object.keys(routes)) {
      const [routeMethod, ...routePathParts] = routeKey.split(' ');
      const routePath = routePathParts.join(' ');
      if (routeMethod !== req.method) continue;
      const rParts = routePath.split('/');
      if (rParts.length !== parts.length) continue;
      let match = true;
      for (let i = 0; i < rParts.length; i++) {
        if (rParts[i].startsWith(':')) continue;
        if (rParts[i] !== parts[i]) { match = false; break; }
      }
      if (match) { handler = routes[routeKey]; break; }
    }
  }

  if (handler) {
    handler(req, res);
  } else {
    res.writeHead(404, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({ error: 'Not found' }));
  }
});

server.listen(PORT, HOST, () => {
  console.log(`SAHIIXX OS API running at http://${HOST}:${PORT}`);
  console.log('Dashboard: http://' + HOST + ':' + PORT + '/');
  console.log('Endpoints:');
  console.log('  GET  /');
  console.log('  GET  /dashboard.html');
  console.log('  GET  /properties');
  console.log('  POST /properties');
  console.log('  GET  /leads');
  console.log('  POST /leads');
  console.log('  PUT  /leads/:id');
  console.log('  GET  /dashboard');
  console.log('  POST /ollama-proxy');
});
