const { findInvokerByMethod } = require("./invoker");
const { fetchWithParsedPayload } = require("./upstream");
const { buildUrl } = require("./url");

function authHeaders(token, withJson = false) {
  const headers = {
    Authorization: `Bearer ${token}`,
    Accept: "application/json",
  };
  if (withJson) headers["Content-Type"] = "application/json";
  return headers;
}

async function fetchMenu({ baseUrl, token, objId }) {
  const url = buildUrl(baseUrl, `/objects/${encodeURIComponent(String(objId))}`);
  const response = await fetchWithParsedPayload(url, {
    method: "GET",
    headers: authHeaders(token, false),
  });
  return { ...response, url };
}

async function invokeMethod({ baseUrl, token, invoker }) {
  const url = buildUrl(baseUrl, "/invoke-method");
  const response = await fetchWithParsedPayload(url, {
    method: "PUT",
    headers: authHeaders(token, true),
    body: JSON.stringify(invoker),
  });
  return { ...response, url };
}

function resolveStepPath(stepInvoker, endpointTemplate = "/{objId}/{activityId}/{parentId}/step") {
  const parentId = stepInvoker.parentId ?? 0;
  return String(endpointTemplate || "/{objId}/{activityId}/{parentId}/step")
    .replaceAll("{objId}", encodeURIComponent(String(stepInvoker.objId)))
    .replaceAll("{activityId}", encodeURIComponent(String(stepInvoker.activityId)))
    .replaceAll("{parentId}", encodeURIComponent(String(parentId)));
}

async function submitStep({ baseUrl, token, stepInvoker, endpointTemplate = "/{objId}/{activityId}/{parentId}/step" }) {
  const stepPath = resolveStepPath(stepInvoker, endpointTemplate);
  const url = buildUrl(baseUrl, stepPath);
  const response = await fetchWithParsedPayload(url, {
    method: "PUT",
    headers: authHeaders(token, true),
    body: JSON.stringify(stepInvoker),
  });
  return { ...response, url };
}

function findMenuInvoker(data, methodNames) {
  const candidates = Array.isArray(methodNames) ? methodNames : [methodNames];
  for (const methodName of candidates) {
    const invoker = findInvokerByMethod(data, methodName);
    if (invoker) return invoker;
  }
  return null;
}

module.exports = {
  fetchMenu,
  invokeMethod,
  submitStep,
  findMenuInvoker,
};
