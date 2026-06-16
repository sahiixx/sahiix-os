const http = require('http');
const sqlite3 = require('sqlite3').verbose();
const path = require('path');

const PORT = 3001;
const db = new sqlite3.Database(':memory:');

db.serialize(() => {
  db.run(`CREATE TABLE properties (
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

  db.run(`CREATE TABLE leads (
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

  db.run(`INSERT INTO properties (title, location, price, beds, baths, sqft) VALUES
    ('Palm Jumeirah Villa', 'Palm Jumeirah', 12500000, 5, 6, 8500),
    ('Downtown Apartment', 'Downtown Dubai', 3200000, 2, 3, 1800),
    ('Dubai Marina Penthouse', 'Dubai Marina', 8900000, 4, 5, 4200),
    ('JVC Studio', 'Jumeirah Village', 650000, 1, 1, 550)`);
});

const parseBody = (req) => new Promise((resolve) => {
  let body = '';
  req.on('data', chunk => body += chunk);
  req.on('end', () => resolve(JSON.parse(body || '{}')));
});

const routes = {
  'GET /': (req, res) => {
    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({ name: 'SAHIIX.AI Estate API', version: '1.0.0' }));
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
  const key = `${req.method} ${req.url.split('/').slice(0, 3).join('/')}`;
  const exactKey = `${req.method} ${req.url}`;
  
  const handler = routes[exactKey] || routes[key];
  if (handler) {
    handler(req, res);
  } else {
    res.writeHead(404, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({ error: 'Not found' }));
  }
});

server.listen(PORT, () => {
  console.log(`SAHIIX.AI Estate API running at http://localhost:${PORT}`);
  console.log('Endpoints:');
  console.log('  GET  /properties');
  console.log('  POST /properties');
  console.log('  GET  /leads');
  console.log('  POST /leads');
  console.log('  PUT  /leads/:id');
  console.log('  GET  /dashboard');
});
