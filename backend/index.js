const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const app = express();

app.use(cors());
app.use(bodyParser.json());

// The lab stores entries in memory. Restarting the backend clears them.
const timesheets = [];

app.post('/api/timesheet', (req, res) => {
  const { employeeName, hours } = req.body || {};
  const workedHours = Number(hours);
  if (typeof employeeName !== 'string' || !employeeName.trim() ||
      employeeName.trim().length > 100 ||
      !['string', 'number'].includes(typeof hours) ||
      !Number.isFinite(workedHours) || workedHours <= 0) {
    return res.status(400).send('Enter an employee name and hours greater than 0.');
  }
  timesheets.push({ employeeName: employeeName.trim(), hours: workedHours });
  res.status(201).send('Timesheet saved');
});

app.get('/api/timesheet', (req, res) => {
  res.json(timesheets);
});

if (require.main === module) {
  app.listen(5000, '0.0.0.0', () => console.log('Backend running on port 5000'));
}

module.exports = app;
