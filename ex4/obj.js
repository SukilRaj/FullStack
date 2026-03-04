const express = require("express");
const app = express();

app.use(express.urlencoded({ extended: true }));

// Show Form
app.get("/", (req, res) => {
  res.send(`
    <h2>Enter Object Details</h2>
    <form method="POST" action="/process">
      Name: <input type="text" name="Name" required><br><br>
      Age: <input type="number" name="age" required><br><br>
      City: <input type="text" name="city" required><br><br>
      Profession: <input type="text" name="profession" required><br><br>
      <button type="submit">Submit</button>
    </form>
  `);
});

// Process Data
app.post("/process", (req, res) => {

  const obj = {
    Name: req.body.Name,
    age: req.body.age,
    city: req.body.city,
    profession: req.body.profession,
  };

  let output = `<h3>Original Object:</h3><pre>${JSON.stringify(obj, null, 2)}</pre>`;

  // Print properties
  output += "<h3>Properties:</h3>";
  Object.keys(obj).forEach((k, i) => {
    output += `${i + 1}. ${k}: ${obj[k]}<br>`;
  });

  // Delete second property
  const keys = Object.keys(obj);
  if (keys.length >= 2) {
    const secondKey = keys[1];
    delete obj[secondKey];
    output += `<br><strong>Deleted second property:</strong> ${secondKey}<br>`;
  }

  // Length
  const length = Object.keys(obj).length;

  output += `<h3>Resulting Object:</h3><pre>${JSON.stringify(obj, null, 2)}</pre>`;
  output += `<strong>Number of properties:</strong> ${length}<br><br>`;
  output += `<a href="/">Go Back</a>`;

  res.send(output);
});

app.listen(3000, () => {
  console.log("Server running at http://localhost:3000/");
});