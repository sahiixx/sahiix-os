const assert = require('node:assert/strict');
const test = require('node:test');
const { startServer } = require('./helpers/server-fixture');

for (const [method, route] of [
  ['POST', '/properties'], ['POST', '/leads'], ['PUT', '/leads/1'], ['POST', '/ollama-proxy']
]) {
  test(`${method} ${route} rejects malformed JSON and stays healthy`, async t => {
    const api = await startServer(t, 'server.js');
    const response = await api.request(route, method, '{');
    assert.equal(response.status, 400);
    assert.equal(typeof response.body.error, 'string');
    assert.equal((await api.request('/health')).status, 200);
  });
}

test('JSON bodies must be objects, including on the proxy route', async t => {
  const api = await startServer(t, 'server.js');
  for (const body of ['null', '[]', 'true', '"text"']) {
    for (const route of ['/properties', '/leads', '/ollama-proxy']) {
      assert.equal((await api.request(route, 'POST', body)).status, 400);
    }
  }
  assert.equal((await api.request('/health')).status, 200);
});

for (const route of ['/properties', '/leads']) {
  test(`${route} does not report failed SQLite inserts as created`, async t => {
    const api = await startServer(t, 'server.js');
    const response = await api.request(route, 'POST', {});
    assert.equal(response.status, 500);
    assert.equal(typeof response.body.error, 'string');
    assert.equal(response.body.id, undefined);
    if (route === '/leads') assert.deepEqual((await api.request('/leads')).body, []);
  });
}

test('failed SQLite lead updates return an error and leave the lead unchanged', async t => {
  const api = await startServer(t, 'server.js');
  const created = await api.request('/leads', 'POST', { name: 'Test lead', notes: 'original' });
  assert.equal(created.status, 201);
  await api.control({ sql: `CREATE TRIGGER reject_update BEFORE UPDATE ON leads
    BEGIN SELECT RAISE(ABORT, 'isolated test write failure'); END;` });
  const updated = await api.request(`/leads/${created.body.id}`, 'PUT', { status: 'closed', notes: 'changed' });
  assert.equal(updated.status, 500);
  assert.equal(typeof updated.body.error, 'string');
  const leads = (await api.request('/leads')).body;
  assert.equal(leads[0].notes, 'original');
  assert.equal(leads[0].status, 'new');
});

for (const [route, table] of [
  ['/properties', 'properties'], ['/leads', 'leads'], ['/dashboard', 'leads'], ['/dashboard', 'properties']
]) {
  test(`${route} reports SQLite read errors (${table}) and stays healthy`, async t => {
    const api = await startServer(t, 'server.js');
    // Wait for startup/seed queries before deliberately breaking this isolated database.
    await api.request('/properties');
    await api.control({ sql: `DROP TABLE ${table}` });
    const response = await api.request(route);
    assert.equal(response.status, 500);
    assert.equal(typeof response.body.error, 'string');
    assert.equal((await api.request('/health')).status, 200);
  });
}

test('successful property and lead writes, reads, updates and dashboard remain compatible', async t => {
  const api = await startServer(t, 'server.js');
  const property = await api.request('/properties', 'POST', { title: 'Test property', location: 'Test location', price: 100 });
  assert.equal(property.status, 201);
  assert.equal(typeof property.body.id, 'number');
  const lead = await api.request('/leads', 'POST', { name: 'Test lead', property_id: property.body.id });
  assert.equal(lead.status, 201);
  const updated = await api.request(`/leads/${lead.body.id}`, 'PUT', { status: 'contacted', notes: 'Test note' });
  assert.deepEqual(updated, { status: 200, body: { updated: 1 } });
  const leads = (await api.request('/leads')).body;
  assert.equal(leads[0].property_title, 'Test property');
  assert.equal(leads[0].notes, 'Test note');
  const dashboard = await api.request('/dashboard');
  assert.equal(dashboard.status, 200);
  assert.equal(dashboard.body.pipeline.contacted, 1);
  assert.ok(dashboard.body.total_properties >= 1);
});
