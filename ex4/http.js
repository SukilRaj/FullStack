const http = require("http");
const https = require("https");

const server = http.createServer((req, res) => {

  https.get("https://github.com/", (apiRes) => {
    let data = "";

    apiRes.on("data", (chunk) => {
      data += chunk;
    });

    apiRes.on("end", () => {
      res.writeHead(200, { "Content-Type": "text/html" });
      res.end(data); // sending GitHub page content
    });

  }).on("error", (err) => {
    res.writeHead(500);
    res.end("Error: " + err.message);
  });

});

server.listen(4000, () => {
  console.log("Server running at http://localhost:4000/");
});