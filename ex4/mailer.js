const express = require("express");
const nodemailer = require("nodemailer");

const app = express();
app.use(express.urlencoded({ extended: true }));

// Show Form
app.get("/", (req, res) => {
  res.send(`
    <h2>Send Mail</h2>
    <form method="POST" action="/send">
      <input type="text" name="name" placeholder="Your Name" required /><br><br>
      <input type="email" name="email" placeholder="Your Email" required /><br><br>
      <textarea name="message" placeholder="Your Message" required></textarea><br><br>
      <button type="submit">Send</button>
    </form>
  `);
});

// Handle Form Submit
app.post("/send", async (req, res) => {
  const { name, email, message } = req.body;

  const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 587,
    secure: false,
    auth: {
      user: "sukilrajms_bai27@mepcoeng.ac.in",
      pass: "YOUR_APP_PASSWORD_HERE",
    },
  });

  try {
    await transporter.sendMail({
      from: `"${name}" <${email}>`,
      to: "sukilraj2005@gmail.com",
      subject: "New Form Submission",
      text: `Name: ${name}\nEmail: ${email}\nMessage: ${message}`,
    });

    res.send("Mail Sent Successfully ✅");
  } catch (error) {
    res.send("Error sending mail " + error.message);
  }
});

app.listen(3000, () => {
  console.log("Server running at http://localhost:3000/");
});