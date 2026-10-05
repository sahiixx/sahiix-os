const assert = require('node:assert/strict');
const test = require('node:test');
const { startServer } = require('./helpers/server-fixture');

test('outbound defaults to dry-run without a bridge token or any bridge request', async t => {
  const bot = await startServer(t, 'whatsapp-bot.js');
  for (const flags of [{}, { dry_run: true }, { dryRun: true }, { dry_run: 'false' }]) {
    const response = await bot.request('/outbound', 'POST', { to: '+1 555 555 0123', message: 'Test message', ...flags });
    assert.equal(response.status, 200);
    assert.equal(response.body.status, 'dry_run');
    assert.equal(response.body.sent, false);
    assert.equal(response.body.chatId, '15555550123@s.whatsapp.net');
    assert.equal(response.body.messagePreview, 'Test message');
  }
  assert.deepEqual(await bot.control({ bridgeCalls: true }), []);
});

test('explicit sends and webhook replies require a configured bridge token before any request', async t => {
  const bot = await startServer(t, 'whatsapp-bot.js');
  for (const flags of [{ dry_run: false }, { dryRun: false }]) {
    const response = await bot.request('/outbound', 'POST', { to: '15555550123', message: 'Test message', ...flags });
    assert.equal(response.status, 400);
    assert.match(response.body.error, /BRIDGE_TOKEN/);
  }
  const webhook = await bot.request('/webhook', 'POST', { from: '15555550123', text: 'hi' });
  assert.equal(webhook.status, 400);
  assert.match(webhook.body.error, /BRIDGE_TOKEN/);
  assert.deepEqual(await bot.control({ bridgeCalls: true }), []);
});

test('explicit outbound sends use the environment token and configured bridge URL (in-memory stub only)', async t => {
  const bot = await startServer(t, 'whatsapp-bot.js', {
    BRIDGE_TOKEN: 'synthetic-test-token',
    BRIDGE_API: 'http://bridge.invalid:18790'
  });
  const response = await bot.request('/outbound', 'POST', { to: '15555550123', message: 'Test message', dry_run: false });
  assert.equal(response.status, 200);
  assert.equal(response.body.sent, true);
  const calls = await bot.control({ bridgeCalls: true });
  assert.equal(calls.length, 1);
  assert.equal(calls[0].authorizationMatches, true);
  assert.equal(calls[0].hostname, 'bridge.invalid');
  assert.equal(calls[0].port, '18790');
  assert.equal(calls[0].path, '/send');
  assert.deepEqual(calls[0].body, { chatId: '15555550123@s.whatsapp.net', message: 'Test message' });
});
