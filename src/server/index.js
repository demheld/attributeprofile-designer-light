const http = require("http");

const { PORT } = require("./config");
const { routeRequest } = require("./routes/router");

const server = http.createServer((req, res) => {
  routeRequest(req, res).catch((error) => {
    const message = error && error.message ? error.message : "Internal server error";
    res.writeHead(500, { "Content-Type": "application/json; charset=utf-8" });
    res.end(JSON.stringify({ error: message }));
  });
});

server.listen(PORT, () => {
  console.log(`AttributeProfile Editor running at http://localhost:${PORT}`);
});

module.exports = {
  server,
};
