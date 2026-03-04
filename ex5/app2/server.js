const express = require('express');
const fs = require('fs');
const path = require('path');

const app = express();
const PORT = 3002;
const DATA_FILE = path.join(__dirname, 'submissions.txt');

app.get('/', (req, res) => {
  fs.readFile(DATA_FILE, 'utf8', (err, data) => {

    if (err) {
      if (err.code === 'ENOENT') {
        return res.send('<h3>No submissions yet.</h3>');
      }
      return res.status(500).send('Failed to read data.');
    }

    const rows = data
      .trim()
      .split('\n')
      .filter(Boolean)
      .map(line => {
        const parts = line.split(' | ').map(s => escapeHtml(s));
        return `<tr>
                  <td>${parts[0] || ''}</td>
                  <td>${parts[1] || ''}</td>
                  <td>${parts[2] || ''}</td>
                </tr>`;
      })
      .join('');

    res.send(`
      <!DOCTYPE html>
      <html>
      <head>
        <title>Submissions</title>
        <style>
          body {
            font-family: Arial;
            background: #f4f6f9;
            padding: 40px;
          }
          h2 {
            text-align: center;
          }
          table {
            width: 100%;
            border-collapse: collapse;
            background: white;
          }
          th {
            background: #667eea;
            color: white;
            padding: 10px;
          }
          td {
            padding: 10px;
            border-bottom: 1px solid #ddd;
          }
          tr:hover {
            background: #f1f3ff;
          }
        </style>
      </head>
      <body>
        <h2>Form Submissions</h2>
        <table border="1">
          <thead>
            <tr>
              <th>Time</th>
              <th>Name</th>
              <th>Message</th>
            </tr>
          </thead>
          <tbody>
            ${rows || '<tr><td colspan="3">No entries</td></tr>'}
          </tbody>
        </table>
      </body>
      </html>
    `);
  });
});

function escapeHtml(s) {
  return (s || '')
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

app.listen(PORT, () => {
  console.log(`App2 listening on http://localhost:${PORT}/`);
});