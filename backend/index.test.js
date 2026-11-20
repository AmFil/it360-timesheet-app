const { test } = require('node:test');
const assert = require('node:assert/strict');
const app = require('./index');

test('timesheets can be saved and retrieved, and invalid entries are rejected', async () => {
  const server = app.listen(0, '127.0.0.1');
  await new Promise(resolve => server.once('listening', resolve));
  const url = `http://127.0.0.1:${server.address().port}/api/timesheet`;
  try {
    assert.deepEqual(await (await fetch(url)).json(), []);
    const post = (body) => fetch(url, {
      method: 'POST', headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body)
    });
    const saved = await post({ employeeName: ' Sample Employee ', hours: '7.5' });
    assert.equal(saved.status, 201);
    assert.equal(await saved.text(), 'Timesheet saved');
    for (const body of [
      { employeeName: '', hours: 8 },
      { employeeName: 'Sample Employee', hours: 0 },
      { employeeName: 'Sample Employee', hours: -1 },
      { employeeName: 'Sample Employee', hours: 'abc' }
    ]) {
      assert.equal((await post(body)).status, 400);
    }
    assert.deepEqual(await (await fetch(url)).json(), [
      { employeeName: 'Sample Employee', hours: 7.5 }
    ]);
  } finally {
    await new Promise(resolve => server.close(resolve));
  }
});
