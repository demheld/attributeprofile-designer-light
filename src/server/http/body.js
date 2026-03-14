function readBody(req) {
  return new Promise((resolve, reject) => {
    let body = "";

    req.on("data", (chunk) => {
      body += chunk;
      if (body.length > 512 * 1024) {
        reject(new Error("Request body too large"));
        req.destroy();
      }
    });

    req.on("end", () => resolve(body));
    req.on("error", reject);
  });
}

async function parseJsonBody(req) {
  const raw = await readBody(req);
  try {
    return JSON.parse(raw || "{}");
  } catch {
    throw new Error("Invalid JSON body");
  }
}

/**
 * Parse application/x-www-form-urlencoded body (e.g. from auth-service postbind).
 * Returns a plain object of decoded key → value pairs.
 */
async function parseFormBody(req) {
  const raw = await readBody(req);
  if (!raw) return {};
  const result = {};
  for (const pair of raw.split("&")) {
    const eqIdx = pair.indexOf("=");
    if (eqIdx < 0) continue;
    const key = decodeURIComponent(pair.slice(0, eqIdx).replace(/\+/g, " "));
    const val = decodeURIComponent(pair.slice(eqIdx + 1).replace(/\+/g, " "));
    result[key] = val;
  }
  return result;
}

module.exports = {
  parseJsonBody,
  parseFormBody,
};
