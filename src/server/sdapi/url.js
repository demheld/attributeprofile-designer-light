const { URL } = require("url");

function buildUrl(base, urlPath) {
  const cleanBase = String(base || "").trim().replace(/\/$/, "");
  if (!cleanBase.startsWith("https://")) {
    throw new Error("Base URL must start with https://");
  }

  const merged = cleanBase + (urlPath.startsWith("/") ? urlPath : "/" + urlPath);
  const parsed = new URL(merged);
  if (parsed.protocol !== "https:") {
    throw new Error("Only https:// URLs are allowed");
  }

  return parsed.toString();
}

function buildWsapiCallUrl(base) {
  const parsedBase = new URL(String(base || "").trim());
  if (parsedBase.protocol !== "https:") {
    throw new Error("Only https:// URLs are allowed");
  }

  const basePath = parsedBase.pathname.replace(/\/+$/, "");
  const pathScoped = `${parsedBase.origin}${basePath}/wsapi/call`;
  const originScoped = `${parsedBase.origin}/wsapi/call`;

  if (pathScoped === originScoped) {
    return [originScoped];
  }

  return [pathScoped, originScoped];
}

module.exports = {
  buildUrl,
  buildWsapiCallUrl,
};
