export function createSdapiClient(options) {
  const {
    getToken,
    getBaseUrl,
    caches,
    findInvoker,
    extractValueListItems,
    extractConditionalRules,
  } = options;

  async function parseResponsePayload(response) {
    const text = await response.text();
    try {
      return JSON.parse(text || "{}");
    } catch {
      return { raw: text };
    }
  }

  function buildRequestError(url, response, payload) {
    const status = Number(response?.status || payload?.status || 0);
    let message = String(payload?.error || "").trim();

    if (!message && (status === 401 || status === 403)) {
      message = "JWT ist abgelaufen oder ungueltig. Bitte erneut einloggen und den Vorgang nochmal starten.";
    }

    if (!message) {
      message = `Request failed for ${url}`;
    }

    const error = new Error(message);
    error.status = status;
    error.payload = payload;
    error.url = url;
    return error;
  }

  async function apiPostJson(url, body) {
    const response = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    });

    const payload = await parseResponsePayload(response);
    if (!response.ok || !payload.ok) {
      throw buildRequestError(url, response, payload);
    }

    return payload;
  }

  async function apiPutJson(url, body) {
    const response = await fetch(url, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    });

    const payload = await parseResponsePayload(response);
    if (!response.ok || !payload.ok) {
      throw buildRequestError(url, response, payload);
    }

    return payload;
  }

  async function fetchMenuForObject(objId) {
    return apiPostJson("/api/menu", {
      token: getToken(),
      objId: String(objId),
      baseUrl: getBaseUrl(),
    });
  }

  async function invokeInvoker(invoker) {
    return apiPostJson("/api/invoke", {
      token: getToken(),
      baseUrl: getBaseUrl(),
      invoker,
    });
  }

  async function submitStep(stepInvoker, endpointTemplate) {
    return apiPutJson("/api/submit-step", {
      token: getToken(),
      baseUrl: getBaseUrl(),
      endpointTemplate,
      stepInvoker,
    });
  }

  async function loadProfileByObjectId(token, baseUrl, objId) {
    const menuPayload = await apiPostJson("/api/menu", {
      token,
      objId: String(objId),
      baseUrl,
    });

    const invoker = findInvoker(menuPayload.data, "AttributeProfile.Edit()");
    if (!invoker) {
      throw new Error(`Object ${objId} has no AttributeProfile.Edit() action in its menu.`);
    }

    const invokePayload = await apiPostJson("/api/invoke", {
      token,
      baseUrl,
      invoker,
    });

    return { menuPayload, invoker, invokePayload };
  }

  async function fetchObjListViaFlow(objId) {
    const menuPayload = await fetchMenuForObject(objId);
    const invoker = findInvoker(menuPayload.data, "Object.ObjList()");
    if (!invoker) {
      throw new Error("Object.ObjList() not found");
    }

    const invokePayload = await invokeInvoker(invoker);
    return invokePayload.data;
  }

  async function loadObjListData(objId) {
    const key = String(objId);
    if (caches.objListCache[key]) return caches.objListCache[key];

    const pendingRequest = (async () => {
      const objListData = await fetchObjListViaFlow(key);
      caches.objListCache[key] = objListData;
      return objListData;
    })().catch((error) => {
      delete caches.objListCache[key];
      throw error;
    });

    caches.objListCache[key] = pendingRequest;
    return pendingRequest;
  }

  async function loadObjListDataNoCache(objId) {
    const key = String(objId);
    return fetchObjListViaFlow(key);
  }

  async function loadValueList(popupObjId) {
    const key = String(popupObjId);
    if (caches.valueListCache[key]) return caches.valueListCache[key];

    const pendingRequest = (async () => {
      const objListData = await loadObjListData(key);
      const items = extractValueListItems(objListData);
      caches.valueListCache[key] = items;
      return items;
    })().catch((error) => {
      delete caches.valueListCache[key];
      throw error;
    });

    caches.valueListCache[key] = pendingRequest;
    return pendingRequest;
  }

  async function loadValueListNoCache(popupObjId) {
    const key = String(popupObjId);
    const objListData = await loadObjListDataNoCache(key);
    return extractValueListItems(objListData);
  }

  async function loadConditionalRules(reference) {
    const key = String(reference || "").trim();
    if (!key) return {};
    if (caches.conditionalListCache[key]) return caches.conditionalListCache[key];

    const pendingRequest = (async () => {
      if (!/^\d+$/.test(key)) {
        caches.conditionalListCache[key] = {};
        return {};
      }

      const objListData = await loadObjListData(key);
      const rules = extractConditionalRules(objListData);
      caches.conditionalListCache[key] = rules;
      return rules;
    })().catch((error) => {
      delete caches.conditionalListCache[key];
      throw error;
    });

    caches.conditionalListCache[key] = pendingRequest;
    return pendingRequest;
  }

  return {
    apiPostJson,
    apiPutJson,
    fetchMenuForObject,
    invokeInvoker,
    submitStep,
    loadProfileByObjectId,
    loadObjListData,
    loadObjListDataNoCache,
    loadValueList,
    loadValueListNoCache,
    loadConditionalRules,
  };
}
