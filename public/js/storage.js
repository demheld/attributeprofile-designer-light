const LS_BASE_URL = "tie_baseUrl";
const LS_OBJ_ID = "tie_objId";
const LS_NULL_OBJ_ID = "tie_nullProfileObjId";
const LS_OBJ_CLASS_ID = "tie_objClassId";
const LS_TOKEN = "tie_token";

function getUrlParamValue(params, keys) {
  const normalizedKeySet = new Set(keys.map((key) => String(key).toLowerCase()));

  for (const [paramKey, paramValue] of params.entries()) {
    if (!normalizedKeySet.has(String(paramKey).toLowerCase())) continue;
    const value = String(paramValue || "").trim();
    if (value) return value;
  }

  return "";
}

export { getUrlParamValue };

export function createStorageService({ documentRef, locationRef, storageRef }) {
  function saveFormToStorage() {
    const token = documentRef.getElementById("token").value.trim();
    const baseUrl = documentRef.getElementById("baseUrl").value.trim();
    const objId = documentRef.getElementById("objId").value.trim();
    const nullProfileObjId = documentRef.getElementById("nullProfileObjId").value.trim();
    const objClassId = documentRef.getElementById("objClassId")?.value.trim() || "";

    if (token) storageRef.setItem(LS_TOKEN, token);
    if (baseUrl) storageRef.setItem(LS_BASE_URL, baseUrl);
    if (objId) storageRef.setItem(LS_OBJ_ID, objId);
    storageRef.setItem(LS_NULL_OBJ_ID, nullProfileObjId);
    storageRef.setItem(LS_OBJ_CLASS_ID, objClassId);
  }

  function restoreFormFromStorage() {
    const token = storageRef.getItem(LS_TOKEN) || "";
    let baseUrl = storageRef.getItem(LS_BASE_URL) || "";
    let objId = storageRef.getItem(LS_OBJ_ID) || "";
    let nullProfileObjIdValue = storageRef.getItem(LS_NULL_OBJ_ID) || "";
    let objClassId = storageRef.getItem(LS_OBJ_CLASS_ID) || "";

    try {
      const params = new URLSearchParams(locationRef.search || "");
      const objIdFromUrl = getUrlParamValue(params, ["objId", "objectId"]);
      const objClassIdFromUrl = getUrlParamValue(params, ["objClassId", "objektklassenId", "objectClassId"]);
      const nullProfileObjIdFromUrl = getUrlParamValue(params, [
        "nullProfileObjId",
        "nullprofileObjId",
        "nullprofileobjid",
        "nullProfileId",
        "nullprofileid",
        "nullObjId",
      ]);

      if (objIdFromUrl) {
        objId = objIdFromUrl;
        storageRef.setItem(LS_OBJ_ID, objId);
      }
      if (objClassIdFromUrl) {
        objClassId = objClassIdFromUrl;
        storageRef.setItem(LS_OBJ_CLASS_ID, objClassId);
      }
      if (nullProfileObjIdFromUrl) {
        nullProfileObjIdValue = nullProfileObjIdFromUrl;
        storageRef.setItem(LS_NULL_OBJ_ID, nullProfileObjIdValue);
      }
    } catch {
      // ignore invalid search params
    }

    if (baseUrl === "https://p-p.portal.tie.ch/rest2/sdapi/0.1") {
      baseUrl = "https://kundenportal.tie.ch/rest2/sdapi/0.1";
      storageRef.setItem(LS_BASE_URL, baseUrl);
    }

    if (baseUrl) documentRef.getElementById("baseUrl").value = baseUrl;
    if (token) documentRef.getElementById("token").value = token;
    if (objId) documentRef.getElementById("objId").value = objId;
    if (nullProfileObjIdValue) documentRef.getElementById("nullProfileObjId").value = nullProfileObjIdValue;
    if (objClassId && documentRef.getElementById("objClassId")) documentRef.getElementById("objClassId").value = objClassId;

    return { token, baseUrl, objId, objClassId };
  }

  return {
    saveFormToStorage,
    restoreFormFromStorage,
  };
}