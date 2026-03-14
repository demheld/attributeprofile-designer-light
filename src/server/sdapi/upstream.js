const { sendJson } = require("../http/respond");

function parseUpstreamPayload(text) {
  try {
    return JSON.parse(text);
  } catch {
    return { raw: text };
  }
}

async function fetchWithParsedPayload(url, options) {
  const upstream = await fetch(url, options);
  const text = await upstream.text();
  return {
    status: upstream.status,
    ok: upstream.status >= 200 && upstream.status < 300,
    data: parseUpstreamPayload(text),
  };
}

function sendUpstreamError(res, error, message = "Upstream request failed") {
  sendJson(res, 502, { error: message, details: error.message });
}

module.exports = {
  fetchWithParsedPayload,
  sendUpstreamError,
};
