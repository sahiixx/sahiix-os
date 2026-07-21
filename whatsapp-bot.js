const http = require('http');

const ESTATE_API = 'http://localhost:3001';
const BRIDGE_API = 'http://127.0.0.1:18789';
const PORT = 3002;

function fetchJSON(url, opts = {}) {
  return new Promise((resolve, reject) => {
    const parsed = require('url').parse(url);
    const options = {
      hostname: parsed.hostname,
      port: parsed.port,
      path: parsed.path,
      method: opts.method || 'GET',
      headers: opts.headers || {}
    };
    
    const req = http.request(options, (res) => {
      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', () => {
        try { resolve(JSON.parse(data)); }
        catch (e) { resolve(data); }
      });
    });
    
    req.on('error', reject);
    if (opts.body) req.write(opts.body);
    req.end();
  });
}

function toJid(phone) {
  const clean = String(phone).replace(/[^0-9]/g, '');
  return `${clean}@s.whatsapp.net`;
}

async function sendWhatsApp(to, message) {
  const chatId = toJid(to);
  console.log(`[sendWhatsApp] to=${to} chatId=${chatId} messageLength=${message.length}`);
  try {
    const result = await fetchJSON(`${BRIDGE_API}/send`, {
      method: 'POST',
      headers: { 
        'Content-Type': 'application/json',
        'Authorization': 'Bearer 6467aa06c68e76e51622ea4d7996bbb62e73d06c9876937d'
      },
      body: JSON.stringify({ chatId, message })
    });
    console.log('[sendWhatsApp] result:', JSON.stringify(result));
    return result;
  } catch (err) {
    console.error('[sendWhatsApp] FAILED:', err.message);
    return null;
  }
}

async function getProperties() {
  return fetchJSON(`${ESTATE_API}/properties`);
}

async function addLead(data) {
  return fetchJSON(`${ESTATE_API}/leads`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data)
  });
}

async function getDashboard() {
  return fetchJSON(`${ESTATE_API}/dashboard`);
}

function parseMessage(text) {
  const lower = text.toLowerCase().trim();
  
  if (lower === 'help' || lower === 'menu') {
    return { command: 'help' };
  }
  if (lower === 'properties' || lower === 'listings' || lower === 'list') {
    return { command: 'listings' };
  }
  if (lower === 'dashboard' || lower === 'stats') {
    return { command: 'dashboard' };
  }
  if (lower.startsWith('inquiry') || lower.startsWith('interested')) {
    const parts = text.split('|').map(p => p.trim());
    return {
      command: 'inquiry',
      name: parts[1] || 'Unknown',
      phone: parts[2] || '',
      property: parts[3] || '',
      notes: parts[4] || ''
    };
  }
  if (lower === 'hi' || lower === 'hello' || lower === 'hey') {
    return { command: 'greeting' };
  }
  
  return { command: 'unknown', text };
}

async function handleMessage(from, text) {
  const parsed = parseMessage(text);
  let response = '';
  
  switch (parsed.command) {
    case 'greeting':
      response = `Welcome to SAHIIX.AI Estate! 🏠\n\nI can help you with Dubai real estate:\n\n• Type "listings" to see properties\n• Type "dashboard" for stats\n• Type "help" for all commands\n\nHow can I assist you today?`;
      break;
      
    case 'help':
      response = `SAHIIX.AI Estate Commands:\n\n📋 listings - View all properties\n📊 dashboard - Lead pipeline stats\n💬 inquiry|Name|Phone|Property|Notes - Submit inquiry\n❓ help - Show this menu\n\nExample: inquiry|Ahmed|+971501234567|Palm Jumeirah Villa|Looking for 5BR`;
      break;
      
    case 'listings':
      const props = await getProperties();
      response = `Available Properties:\n\n${props.map((p, i) => 
        `${i+1}. ${p.title}\n   📍 ${p.location}\n   💰 AED ${(p.price/1000000).toFixed(1)}M\n   🛏️ ${p.beds} bed, 🛁 ${p.baths} bath, 📐 ${p.sqft?.toLocaleString()} sqft\n`
      ).join('\n')}\nReply with "inquiry|Your Name|Phone|Property Name|Notes" to inquire.`;
      break;
      
    case 'dashboard':
      const dash = await getDashboard();
      response = `Lead Pipeline:\n\n🆕 New: ${dash.pipeline.new || 0}\n📞 Contacted: ${dash.pipeline.contacted || 0}\n✅ Qualified: ${dash.pipeline.qualified || 0}\n🎯 Closed: ${dash.pipeline.closed || 0}\n\nTotal Properties: ${dash.total_properties}`;
      break;
      
    case 'inquiry':
      const lead = await addLead({
        name: parsed.name,
        phone: parsed.phone,
        property_id: null,
        notes: `Property: ${parsed.property} | ${parsed.notes}`
      });
      response = `Thank you ${parsed.name}! 🙏\n\nYour inquiry has been received:\n🏠 Property: ${parsed.property}\n📞 We'll contact you at: ${parsed.phone}\n\nA SAHIIX.AI agent will reach out shortly!`;
      break;
      
    default:
      response = `I didn't understand that. Type "help" to see available commands.`;
  }
  
  return response;
}

const server = http.createServer(async (req, res) => {
  if (req.method === 'POST' && req.url === '/webhook') {
    let body = '';
    req.on('data', chunk => body += chunk);
    req.on('end', async () => {
      try {
        const data = JSON.parse(body);
        const from = data.from || data.sender;
        const text = data.text || data.message || '';
        
        console.log(`Message from ${from}: ${text}`);
        
        const response = await handleMessage(from, text);
        
        if (from) {
          await sendWhatsApp(from, response);
        }
        
        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ success: true, response }));
      } catch (err) {
        console.error('Webhook error:', err);
        res.writeHead(400, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ error: err.message }));
      }
    });
  } else if (req.method === 'POST' && req.url === '/outbound') {
    let body = '';
    req.on('data', chunk => body += chunk);
    req.on('end', async () => {
      try {
        const data = JSON.parse(body || '{}');
        const to = data.to || data.phone;
        const message = data.message || data.text || '';
        // Default dry_run=true unless explicitly false
        const isDry = !(data.dry_run === false || data.dryRun === false);
        if (!to || !message) {
          res.writeHead(400, { 'Content-Type': 'application/json' });
          res.end(JSON.stringify({ error: 'to and message required' }));
          return;
        }
        if (isDry) {
          res.writeHead(200, { 'Content-Type': 'application/json' });
          res.end(JSON.stringify({
            status: 'dry_run',
            to,
            chatId: toJid(to),
            messagePreview: String(message).slice(0, 200),
            sent: false
          }));
          return;
        }
        const result = await sendWhatsApp(to, message);
        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ status: result ? 'sent' : 'failed', to, result, sent: !!result }));
      } catch (err) {
        res.writeHead(400, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ error: err.message }));
      }
    });
  } else if (req.method === 'GET' && req.url === '/') {
    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({ name: 'SAHIIX.AI Estate WhatsApp Bot', status: 'running', endpoints: ['/', '/webhook', '/outbound'] }));
  } else {
    res.writeHead(404, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({ error: 'Not found' }));
  }
});

server.listen(PORT, "0.0.0.0", () => {
  console.log(`SAHIIX.AI WhatsApp Bot running at http://localhost:${PORT}`);
  console.log('Webhook endpoint: POST /webhook');
  console.log('Connect this to OpenClaw gateway for WhatsApp integration');
});
