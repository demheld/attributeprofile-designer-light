const path = require("path");

const PORT = process.env.PORT || 5174;
const PUBLIC_DIR = path.join(__dirname, "..", "..", "public");

const MIME_TYPES = {
  ".html": "text/html; charset=utf-8",
  ".css": "text/css; charset=utf-8",
  ".js": "application/javascript; charset=utf-8",
  ".json": "application/json; charset=utf-8",
};

module.exports = {
  PORT,
  PUBLIC_DIR,
  MIME_TYPES,
};
