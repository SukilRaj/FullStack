const express = require("express");

const app = express();
app.use(express.urlencoded({ extended: true }));

// Show Form
app.get("/", (req, res) => {
  res.send(`
    <h2>Replace multiple 'a' with 'b'</h2>
    <form method="POST" action="/process">
      <input type="text" name="text" placeholder="Enter text" required />
      <button type="submit">Submit</button>
    </form>
  `);
});

// Handle Form
app.post("/process", (req, res) => {
  const input = req.body.text;

  const output = input.replace(/a{2,}/g, "b");

  res.send(`
    <h3>Result</h3>
    <p><strong>Input:</strong> ${input}</p>
    <p><strong>Output:</strong> ${output}</p>
    <br>
    <a href="/">Go Back</a>
  `);
});

app.listen(4000, () => {
  console.log("Server running at http://localhost:4000/");
});