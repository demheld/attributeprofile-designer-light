const { URL } = require("url");

const { parseJsonBody } = require("../http/body");
const { sendJson } = require("../http/respond");
const { fetchWithParsedPayload, sendUpstreamError } = require("../sdapi/upstream");
const { buildUrl, buildWsapiCallUrl } = require("../sdapi/url");
const { fetchMenu, invokeMethod, submitStep, findMenuInvoker } = require("../sdapi/service");

function getBearerToken(req, body) {
  const authHeader = String(req.headers.authorization || "").trim();
  const fromHeader = authHeader.toLowerCase().startsWith("bearer ")
    ? authHeader.slice(7).trim()
    : "";
  return String(fromHeader || body.token || "").trim();
}

async function parseRequestBody(req, res) {
  try {
    return await parseJsonBody(req);
  } catch (error) {
    sendJson(res, 400, { error: error.message });
    return null;
  }
}

function requireField(res, value, fieldName) {
  if (value) return true;
  sendJson(res, 400, { error: `${fieldName} is required` });
  return false;
}

function sendUpstreamResponse(res, upstreamResponse, url) {
  sendJson(res, upstreamResponse.status, {
    ok: upstreamResponse.ok,
    status: upstreamResponse.status,
    url,
    data: upstreamResponse.data,
  });
}

function findStepInvoker(data) {
  if (!data || typeof data !== "object") return null;

  if (data.t === "StepInvoker") return data;
  if (data.stepInvoker && typeof data.stepInvoker === "object") return data.stepInvoker;
  if (data.txnId && data.stepNo !== undefined && data.objId !== undefined && data.activityId !== undefined) return data;

  for (const val of Object.values(data)) {
    if (Array.isArray(val)) {
      for (const item of val) {
        const found = findStepInvoker(item);
        if (found) return found;
      }
    } else if (val && typeof val === "object") {
      const found = findStepInvoker(val);
      if (found) return found;
    }
  }

  return null;
}

function findAttributeValues(data) {
  if (!data || typeof data !== "object") return null;

  if (data.attributeValues && typeof data.attributeValues === "object" && !Array.isArray(data.attributeValues)) {
    return data.attributeValues;
  }

  for (const val of Object.values(data)) {
    if (Array.isArray(val)) {
      for (const item of val) {
        const found = findAttributeValues(item);
        if (found) return found;
      }
    } else if (val && typeof val === "object") {
      const found = findAttributeValues(val);
      if (found) return found;
    }
  }

  return null;
}

async function handleMenu(req, res) {
  const body = await parseRequestBody(req, res);
  if (!body) return;

  const token = String(body.token || "").trim();
  const objId = String(body.objId || "").trim();
  const baseUrl = String(body.baseUrl || "").trim();

  if (!requireField(res, token, "token")) return;
  if (!requireField(res, objId, "objId")) return;

  let url;
  try {
    url = buildUrl(baseUrl, `/objects/${encodeURIComponent(objId)}`);
  } catch (error) {
    sendJson(res, 400, { error: error.message });
    return;
  }

  try {
    const upstreamResponse = await fetchWithParsedPayload(url, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
        Accept: "application/json",
      },
    });

    sendUpstreamResponse(res, upstreamResponse, url);
  } catch (error) {
    sendUpstreamError(res, error);
  }
}

async function handleInvoke(req, res) {
  const body = await parseRequestBody(req, res);
  if (!body) return;

  const token = String(body.token || "").trim();
  const baseUrl = String(body.baseUrl || "").trim();
  const invoker = body.invoker;

  if (!requireField(res, token, "token")) return;
  if (!invoker || typeof invoker !== "object") {
    sendJson(res, 400, { error: "invoker object is required" });
    return;
  }

  let url;
  try {
    url = buildUrl(baseUrl, "/invoke-method");
  } catch (error) {
    sendJson(res, 400, { error: error.message });
    return;
  }

  try {
    const upstreamResponse = await fetchWithParsedPayload(url, {
      method: "PUT",
      headers: {
        Authorization: `Bearer ${token}`,
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(invoker),
    });

    sendUpstreamResponse(res, upstreamResponse, url);
  } catch (error) {
    sendUpstreamError(res, error);
  }
}

async function handleLoadStepForm(req, res) {
  const body = await parseRequestBody(req, res);
  if (!body) return;

  const token = String(body.token || "").trim();
  const baseUrl = String(body.baseUrl || "").trim();
  const objId = body.objId;
  const activityId = body.activityId;
  const parentId = body.parentId ?? 0;

  if (!requireField(res, token, "token")) return;
  if (objId === undefined || activityId === undefined) {
    sendJson(res, 400, { error: "objId and activityId are required" });
    return;
  }

  let url;
  try {
    url = buildUrl(
      baseUrl,
      `/${encodeURIComponent(String(objId))}/${encodeURIComponent(String(activityId))}/${encodeURIComponent(String(parentId))}`
    );
  } catch (error) {
    sendJson(res, 400, { error: error.message });
    return;
  }

  try {
    const upstreamResponse = await fetchWithParsedPayload(url, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
        Accept: "application/json",
      },
    });

    sendUpstreamResponse(res, upstreamResponse, url);
  } catch (error) {
    sendUpstreamError(res, error);
  }
}

async function handleFetchObjList(req, res) {
  const body = await parseRequestBody(req, res);
  if (!body) return;

  const token = String(body.token || "").trim();
  const baseUrl = String(body.baseUrl || "").trim();
  const popupObjId = String(body.popupObjId || "").trim();

  if (!requireField(res, token, "token")) return;
  if (!requireField(res, popupObjId, "popupObjId")) return;

  let menuResponse;
  try {
    menuResponse = await fetchMenu({ baseUrl, token, objId: popupObjId });
  } catch (error) {
    sendUpstreamError(res, error, "Menu request failed");
    return;
  }

  if (!menuResponse.ok) {
    sendJson(res, menuResponse.status, {
      error: "Menu fetch failed",
      data: menuResponse.data,
    });
    return;
  }

  const invoker = findMenuInvoker(menuResponse.data, ["Object.ObjList()"]);
  if (!invoker) {
    sendJson(res, 404, { error: "No Object.ObjList() invoker found in menu" });
    return;
  }

  try {
    const invokeResponse = await invokeMethod({ baseUrl, token, invoker });

    sendJson(res, invokeResponse.status, {
      ok: invokeResponse.ok,
      status: invokeResponse.status,
      url: invokeResponse.url,
      data: invokeResponse.data,
    });
  } catch (error) {
    sendUpstreamError(res, error, "Invoke request failed");
  }
}

async function handleWsapiCall(req, res) {
  const body = await parseRequestBody(req, res);
  if (!body) return;

  const token = getBearerToken(req, body);
  const reqUrl = new URL(req.url, "http://localhost");
  const baseUrl = String(reqUrl.searchParams.get("baseUrl") || body.baseUrl || "").trim();
  const payload = body.payload && typeof body.payload === "object" ? body.payload : body;

  if (!requireField(res, token, "token")) return;
  if (!payload || typeof payload !== "object") {
    sendJson(res, 400, { error: "payload object is required" });
    return;
  }

  let url;
  try {
    url = buildWsapiCallUrl(baseUrl);
  } catch (error) {
    sendJson(res, 400, { error: error.message });
    return;
  }

  try {
    const upstreamResponse = await fetchWithParsedPayload(url, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    });

    sendUpstreamResponse(res, upstreamResponse, url);
  } catch (error) {
    sendUpstreamError(res, error);
  }
}

async function handleSubmitStep(req, res) {
  const body = await parseRequestBody(req, res);
  if (!body) return;

  const token = String(body.token || "").trim();
  const baseUrl = String(body.baseUrl || "").trim();
  const endpointTemplate = String(body.endpointTemplate || "/{objId}/{activityId}/{parentId}/step").trim();
  const stepInvoker = body.stepInvoker;

  if (!requireField(res, token, "token")) return;
  if (!stepInvoker || typeof stepInvoker !== "object") {
    sendJson(res, 400, { error: "stepInvoker object is required" });
    return;
  }

  if (stepInvoker.objId === undefined || stepInvoker.activityId === undefined) {
    sendJson(res, 400, { error: "stepInvoker.objId and stepInvoker.activityId are required" });
    return;
  }

  const parentId = stepInvoker.parentId ?? 0;
  const stepPath = endpointTemplate
    .replaceAll("{objId}", encodeURIComponent(String(stepInvoker.objId)))
    .replaceAll("{activityId}", encodeURIComponent(String(stepInvoker.activityId)))
    .replaceAll("{parentId}", encodeURIComponent(String(parentId)));

  let url;
  try {
    url = buildUrl(baseUrl, stepPath);
  } catch (error) {
    sendJson(res, 400, { error: error.message });
    return;
  }

  try {
    const upstreamResponse = await fetchWithParsedPayload(url, {
      method: "PUT",
      headers: {
        Authorization: `Bearer ${token}`,
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(stepInvoker),
    });

    sendUpstreamResponse(res, upstreamResponse, url);
  } catch (error) {
    sendUpstreamError(res, error);
  }
}


async function handleAuthCheck(req, res) {
  const body = await parseRequestBody(req, res);
  if (!body) return;

  const baseUrl = String(body.baseUrl || "").trim();
  const token = String(body.token || "").trim();

  if (!baseUrl) {
    sendJson(res, 400, { error: "baseUrl is required" });
    return;
  }

  let authUrl = "";
  try {
    authUrl = new URL(baseUrl).origin + "/auth-service/";
  } catch {
    sendJson(res, 400, { error: "Invalid baseUrl" });
    return;
  }

  if (!token) {
    sendJson(res, 200, { ok: true, authenticated: false, authUrl });
    return;
  }

  try {
    const testUrl = buildUrl(baseUrl, "/objects/USER");
    const result = await fetchWithParsedPayload(testUrl, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
        Accept: "application/json",
      },
    });
    sendJson(res, 200, {
      ok: true,
      authenticated: result.status !== 401 && result.status !== 403,
      authUrl,
    });
  } catch (error) {
    sendJson(res, 200, { ok: true, authenticated: false, authUrl });
  }
}

module.exports = {
  handleMenu,
  handleInvoke,
  handleLoadStepForm,
  handleFetchObjList,
  handleWsapiCall,
  handleSubmitStep,
  handleAuthCheck,
};
