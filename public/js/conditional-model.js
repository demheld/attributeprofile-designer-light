export function splitSpaceSeparatedDependencies(raw, normalizeAttributeKey) {
  return String(raw || "")
    .split(/\s+/)
    .map((entry) => normalizeAttributeKey(entry))
    .filter(Boolean);
}

export function extractConditionalListItems(data, normalizeAttributeKey) {
  const results = [];

  function walk(node) {
    if (!node || typeof node !== "object") return;
    if (Array.isArray(node)) {
      node.forEach(walk);
      return;
    }

    if (String(node.t || "").toUpperCase() === "OBJLIST" && Array.isArray(node.items)) {
      const attrNames = Array.isArray(node.attrNames) ? node.attrNames.map((name) => String(name || "").trim()) : [];
      const normalizedHeaders = attrNames.map((name) => name.toLowerCase());
      const keyIndex = normalizedHeaders.findIndex((name) => ["bezeichnung", "key", "name", "anzeigewert"].includes(name));
      const valueIndex = normalizedHeaders.findIndex((name) => ["beschreibung", "value", "description", "descr"].includes(name));
      const resolvedKeyIndex = keyIndex >= 0 ? keyIndex : 0;
      const resolvedValueIndex = valueIndex >= 0 ? valueIndex : -1;

      node.items.forEach((item) => {
        const isValueList = String(item?.objclass?.type || "").toUpperCase() === "VALUE_LIST";
        if (!isValueList || !Array.isArray(item.attrValues)) return;

        const keyName = attrNames[resolvedKeyIndex] || "bezeichnung";
        const valueName = valueIndex >= 0 ? (attrNames[resolvedValueIndex] || "beschreibung") : "beschreibung";
        const key = String(item.attrValues[resolvedKeyIndex] || item.objName || item.obj_name || "").trim();
        if (!key) return;

        const rawDependencies = resolvedValueIndex >= 0
          ? String(item.attrValues[resolvedValueIndex] || "").trim()
          : "";
        results.push({
          key,
          objId: item.objId,
          objName: String(item.objName || item.obj_name || key).trim(),
          keyAttributeName: keyName,
          dependencyAttributeName: valueName,
          dependencyRawValue: rawDependencies,
          dependencies: splitSpaceSeparatedDependencies(rawDependencies, normalizeAttributeKey),
        });
      });
    }

    Object.values(node).forEach(walk);
  }

  walk(data);
  return results;
}

export function cloneDependenciesMap(source) {
  const result = {};
  Object.entries(source || {}).forEach(([key, value]) => {
    result[key] = Array.isArray(value) ? [...value] : [];
  });
  return result;
}

export function areDependenciesEqual(a, b) {
  const left = Array.isArray(a) ? [...a].sort() : [];
  const right = Array.isArray(b) ? [...b].sort() : [];
  return left.length === right.length && left.every((entry, index) => entry === right[index]);
}

export function collectObjListItems(data) {
  const result = [];

  function walk(node) {
    if (!node || typeof node !== "object") return;
    if (Array.isArray(node)) {
      node.forEach(walk);
      return;
    }

    if (String(node.t || "").toUpperCase() === "OBJLIST" && Array.isArray(node.items)) {
      result.push(...node.items);
    }

    Object.values(node).forEach(walk);
  }

  walk(data);
  return result;
}

export function hasValueListInObjListInvokeResponse(data) {
  let foundObjList = false;
  let foundValueList = false;

  function walk(node) {
    if (!node || typeof node !== "object" || foundValueList) return;
    if (Array.isArray(node)) {
      node.forEach(walk);
      return;
    }

    const nodeType = String(node.t || "").trim().toUpperCase();
    if (nodeType === "OBJLIST" && Array.isArray(node.items)) {
      foundObjList = true;
      const hasMatch = node.items.some(
        (item) => String(item?.objclass?.type || "").trim().toUpperCase() === "VALUE_LIST"
      );
      if (hasMatch) {
        foundValueList = true;
        return;
      }
    }

    Object.values(node).forEach(walk);
  }

  walk(data);
  return { foundObjList, foundValueList };
}

export function evaluateTagForConditional(field) {
  const tag = String(field?.tag || "").trim().toUpperCase();
  if (tag === "SELECT" || tag === "RADIO") {
    return { ok: true, tag };
  }
  return { ok: false, tag };
}

export function evaluateConditionalEligibility(field) {
  const tagCheck = evaluateTagForConditional(field);
  const popupObjId = String(field?.popupObjId || "").trim();
  const ok = tagCheck.ok && /^\d+$/.test(popupObjId) && popupObjId !== "0";
  return {
    ok,
    popupObjId,
    reasons: ok ? [] : ["Keine Optionen zur Verfügung für Bedingtes Feld. Konfigurieren sie zuerst eine Auswahlliste (tag=SELECT oder RADIO mit popupObjId)."],
  };
}