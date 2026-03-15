const fs = require("fs");
const path = require("path");

const { MIME_TYPES, PUBLIC_DIR } = require("../config");
const { sendJson } = require("./respond");

function serveStatic(req, res) {
  const urlPathname = req.url.split("?")[0] || "/";
  const requestPath = urlPathname === "/" ? "/index.html" : urlPathname;
  const safePath = path.normalize(requestPath).replace(/^([.][.][/\\])+/, "");
  const filePath = path.join(PUBLIC_DIR, safePath);

  if (!filePath.startsWith(PUBLIC_DIR + path.sep) && filePath !== PUBLIC_DIR) {
    sendJson(res, 403, { error: "Forbidden" });
    return;
  }

  fs.readFile(filePath, (err, data) => {
    if (err) {
      sendJson(res, err.code === "ENOENT" ? 404 : 500, { error: "Not found" });
      return;
    }

    const ext = path.extname(filePath).toLowerCase();
    res.writeHead(200, {
      "Content-Type": MIME_TYPES[ext] || "application/octet-stream",
      "Content-Length": data.length,
    });
    res.end(data);
  });
}

module.exports = {
  serveStatic,
};
