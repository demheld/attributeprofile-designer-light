export function parseTagPrefs(rawPrefs) {
  if (!rawPrefs) return {};
  if (typeof rawPrefs === "object") return rawPrefs;

  const prefs = {};
  const chunks = String(rawPrefs)
    .replace(/[;,\n]/g, " ")
    .split(/\s+/)
    .map((value) => value.trim())
    .filter(Boolean);

  chunks.forEach((entry) => {
    const parts = entry.split("=");
    if (parts.length < 2) return;
    const key = parts[0].trim();
    const value = parts.slice(1).join("=").trim();
    if (key) prefs[key] = value;
  });

  return prefs;
}

export function serializeTagPrefs(rawPrefs, prefs) {
  if (rawPrefs && typeof rawPrefs === "object") return prefs;

  return Object.entries(prefs || {})
    .filter(([key]) => String(key || "").trim())
    .map(([key, value]) => `${key}=${value}`)
    .join(" ");
}