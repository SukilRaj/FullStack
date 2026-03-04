// app1/server.js
const express = require('express');
const fs = require('fs');
const path = require('path');

const app = express();
const PORT = 3001;
const DATA_FILE = path.join(__dirname, 'submissions.txt');

app.use(express.urlencoded({ extended: false }));

// Serve Form
app.get('/', (req, res) => {
  res.type('html').send(`
    <!DOCTYPE html>
    <html>
    <head>
      <title>User Registration</title>
      <link href="https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;600&display=swap" rel="stylesheet">
      <style>
        * {
          box-sizing: border-box;
          margin: 0;
          padding: 0;
          font-family: 'Poppins', sans-serif;
        }

        body {
          background: linear-gradient(135deg, #667eea, #764ba2);
          display: flex;
          justify-content: center;
          align-items: center;
          height: 100vh;
        }

        .container {
          background: #ffffff;
          padding: 30px 35px;
          border-radius: 12px;
          width: 420px;
          box-shadow: 0 10px 25px rgba(0, 0, 0, 0.2);
        }

        h2 {
          text-align: center;
          margin-bottom: 20px;
          font-weight: 600;
          color: #333;
        }

        label {
          display: block;
          margin-top: 12px;
          font-size: 14px;
          font-weight: 500;
          color: #444;
        }

        input, textarea {
          width: 100%;
          padding: 8px 10px;
          margin-top: 5px;
          border-radius: 6px;
          border: 1px solid #ccc;
          font-size: 14px;
          transition: 0.2s ease;
        }

        input:focus, textarea:focus {
          border-color: #667eea;
          outline: none;
          box-shadow: 0 0 5px rgba(102, 126, 234, 0.3);
        }

        .radio-group {
          margin-top: 6px;
          display: flex;
          gap: 15px;
          font-size: 14px;
        }

        button {
          width: 100%;
          margin-top: 18px;
          padding: 10px;
          border-radius: 6px;
          border: none;
          background: #667eea;
          color: white;
          font-size: 15px;
          font-weight: 500;
          cursor: pointer;
          transition: 0.3s ease;
        }

        button:hover {
          background: #5563d6;
        }

      </style>
    </head>
    <body>
      <div class="container">
        <h2>User Registration</h2>

        <form method="POST" action="/submit">
          <label>Name</label>
          <input type="text" name="name" required>

          <label>Gender</label>
          <div class="radio-group">
            <label><input type="radio" name="gender" value="Male" required> Male</label>
            <label><input type="radio" name="gender" value="Female" required> Female</label>
          </div>

          <label>Date of Birth</label>
          <input type="date" name="dob" required>

          <label>Email</label>
          <input type="email" name="email" required>

          <label>Phone Number</label>
          <input type="tel" name="phone" pattern="[0-9]{10}" required>

          <label>Description</label>
          <textarea name="description" rows="3" required></textarea>

          <button type="submit">Submit</button>
        </form>
      </div>
    </body>
    </html>
  `);
});

// Handle Submission
app.post('/submit', (req, res) => {
  const { name, gender, dob, email, phone, description } = req.body;

  const entry = `
------------------------------
Time: ${new Date().toISOString()}
Name: ${name}
Gender: ${gender}
DOB: ${dob}
Email: ${email}
Phone: ${phone}
Description: ${description}
------------------------------
`;

  fs.appendFile(DATA_FILE, entry, (err) => {
    if (err) {
      console.error('Write error:', err);
      return res.status(500).send('Failed to save submission.');
    }

    res.send(`
      <h3>Data Saved Successfully</h3>
      <a href="/">Back to Form</a>
    `);
  });
});

app.listen(PORT, () => {
  console.log(`App1 running at http://localhost:${PORT}`);
});