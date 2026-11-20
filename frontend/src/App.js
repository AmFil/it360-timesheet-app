import { useEffect, useState } from 'react';
import axios from 'axios';
import './App.css';

const apiUrl = process.env.REACT_APP_API_URL || 'http://localhost:5000/api/timesheet';

function App() {
  const [employeeName, setEmployeeName] = useState('');
  const [hours, setHours] = useState('');
  const [records, setRecords] = useState([]);
  const [message, setMessage] = useState('');
  const [saving, setSaving] = useState(false);

  async function fetchRecords() {
    const response = await axios.get(apiUrl);
    setRecords(response.data);
  }

  useEffect(() => {
    fetchRecords().catch(() => setMessage('Could not load timesheets. Check that the backend is running.'));
  }, []);

  async function submitTimesheet(event) {
    event.preventDefault();
    setSaving(true);
    setMessage('');
    try {
      await axios.post(apiUrl, { employeeName, hours });
      setEmployeeName('');
      setHours('');
      try {
        await fetchRecords();
        setMessage('Timesheet saved.');
      } catch {
        setMessage('Timesheet saved, but the list could not refresh. Reload the page to view it.');
      }
    } catch (error) {
      setMessage(error.response?.data || 'Could not save the timesheet. Check that the backend is running.');
    } finally {
      setSaving(false);
    }
  }

  return (
    <main>
      <h1>Employee Timesheet</h1>
      <form onSubmit={submitTimesheet}>
        <label htmlFor="employeeName">Employee Name</label>
        <input id="employeeName" value={employeeName}
          onChange={event => setEmployeeName(event.target.value)}
          placeholder="Employee Name" maxLength={100} required />
        <label htmlFor="hours">Hours Worked</label>
        <input id="hours" type="number" min="0.01" step="0.01"
          value={hours} onChange={event => setHours(event.target.value)}
          placeholder="Hours Worked" required />
        <button type="submit" disabled={saving}>{saving ? 'Saving...' : 'Submit'}</button>
      </form>
      {message && <p role="status">{message}</p>}
      <h2>Submitted Timesheets</h2>
      {records.length === 0 ? <p>No timesheets yet.</p> : (
        <ul>{records.map((record, index) => (
          <li key={index}>{record.employeeName} - {record.hours} hrs</li>
        ))}</ul>
      )}
    </main>
  );
}

export default App;
