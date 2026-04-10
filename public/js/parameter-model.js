function findAllParameterKeys(parameters, patterns) {
  return Object.keys(parameters || {}).filter((key) => patterns.some((pattern) => pattern.test(key)));
}

export function setParameterObjectValue(entry, nextValue) {
  if (!entry || typeof entry !== "object") {
    return {
      t: "StringDO",
      internalValue: String(nextValue || ""),
      displayValue: String(nextValue || ""),
    };
  }

  const value = String(nextValue || "");
  if ("valueL0" in entry) entry.valueL0 = value;
  if ("internalValue" in entry) entry.internalValue = value;
  if ("displayValue" in entry) entry.displayValue = value;
  if ("value" in entry) entry.value = value;

  if (!("valueL0" in entry) && !("internalValue" in entry) && !("value" in entry)) {
    entry.internalValue = value;
    entry.displayValue = value;
  }

  return entry;
}

export function fillCreateEntryStepParameters(parameters, value, description) {
  const result = JSON.parse(JSON.stringify(parameters || {}));
  const updatedKeys = [];

  const valuePatterns = [/bezeichnung/i, /anzeigewert/i, /obj_name/i, /(^|\.)name(\[|$)/i, /(^|\.)value(\[|$)/i];
  const descriptionPatterns = [/beschreibung/i, /description/i, /descr/i];

  const valueKeys = findAllParameterKeys(result, valuePatterns);
  const descriptionKeys = findAllParameterKeys(result, descriptionPatterns);

  valueKeys.forEach((key) => {
    result[key] = setParameterObjectValue(result[key], value);
    updatedKeys.push(key);
  });

  const descriptionValue = String(description || value || "");
  descriptionKeys.forEach((key) => {
    result[key] = setParameterObjectValue(result[key], descriptionValue);
    updatedKeys.push(key);
  });

  if (!updatedKeys.length) {
    const firstKey = Object.keys(result)[0];
    if (firstKey) {
      result[firstKey] = setParameterObjectValue(result[firstKey], value);
      updatedKeys.push(firstKey);
    } else {
      result.VALUE = setParameterObjectValue(null, value);
      updatedKeys.push("VALUE");
    }
  }

  return { parameters: result, updatedKeys: Array.from(new Set(updatedKeys)) };
}

export function fillValueListCreateParameters(parameters, field, customName) {
  const result = JSON.parse(JSON.stringify(parameters || {}));
  const baseName = customName || String(field?.displayName || field?.attributeName || "Conditional Value List").trim();
  const description = customName || `${baseName} conditionalValueList`;

  const namePatterns = [/bezeichnung/i, /anzeigewert/i, /obj_name/i, /(^|\.)name(\[|$)/i];
  const descriptionPatterns = [/beschreibung/i, /description/i, /descr/i];

  findAllParameterKeys(result, namePatterns).forEach((key) => {
    result[key] = setParameterObjectValue(result[key], baseName);
  });

  findAllParameterKeys(result, descriptionPatterns).forEach((key) => {
    result[key] = setParameterObjectValue(result[key], description);
  });

  return result;
}

export function setValueInObjectRecursive(target, keyName, value, normalizeAttributeKey) {
  if (!target || typeof target !== "object") return false;

  const wanted = normalizeAttributeKey(keyName);

  function applyValueToAttributeEntry(entry, nextValue) {
    if (!entry || typeof entry !== "object") return false;

    const type = String(entry.t || "").toUpperCase();
    if (type === "TEXTMLDO" || "valueL0" in entry) {
      entry.valueL0 = nextValue;
      return true;
    }

    if ("internalValue" in entry) {
      entry.internalValue = nextValue;
      if ("displayValue" in entry) entry.displayValue = nextValue;
      return true;
    }

    if ("value" in entry) {
      entry.value = nextValue;
      return true;
    }

    return false;
  }

  for (const [key, entry] of Object.entries(target)) {
    if (normalizeAttributeKey(key) === wanted) {
      if (typeof entry !== "object" || entry === null) {
        target[key] = value;
        return true;
      }

      if (applyValueToAttributeEntry(entry, value)) {
        return true;
      }

      target[key] = value;
      return true;
    }
  }

  for (const nested of Object.values(target)) {
    if (nested && typeof nested === "object" && setValueInObjectRecursive(nested, keyName, value, normalizeAttributeKey)) {
      return true;
    }
  }

  return false;
}

export function getParameterObjectValue(entry) {
  if (!entry || typeof entry !== "object") return "";

  if (typeof entry.valueL0 === "string") return entry.valueL0;
  if (entry.internalValue !== undefined && entry.internalValue !== null) return String(entry.internalValue);
  if (entry.value !== undefined && entry.value !== null) return String(entry.value);
  if (entry.displayValue !== undefined && entry.displayValue !== null) return String(entry.displayValue);
  return "";
}

export function resolveParameterKey(parameters, attributeNameHint, previousRawValue, normalizeAttributeKey) {
  if (!parameters || typeof parameters !== "object") return "";

  const normalizedHint = normalizeAttributeKey(attributeNameHint);
  const entries = Object.entries(parameters);

  const exactMatch = entries.find(([key]) => normalizeAttributeKey(key) === normalizedHint);
  if (exactMatch) return exactMatch[0];

  const previous = String(previousRawValue || "").trim();
  if (previous) {
    const valueMatches = entries.filter(([, entry]) => getParameterObjectValue(entry) === previous);
    if (valueMatches.length === 1) return valueMatches[0][0];
  }

  const hintLower = String(attributeNameHint || "").trim().toLowerCase();
  if (["beschreibung", "description", "descr"].includes(hintLower)) {
    const descrMatch = entries.find(([key]) => /(^|\.)descr(\[|$)/i.test(String(key)));
    if (descrMatch) return descrMatch[0];
  }

  const genericDescrMatch = entries.find(([key]) => /(^|\.)descr(\[|$)|description|beschreibung/i.test(String(key)));
  if (genericDescrMatch) return genericDescrMatch[0];

  return "";
}

export function resolvePreferredConditionalTargetKey(parameters) {
  const entries = Object.entries(parameters || {});
  if (!entries.length) return "";

  const objectDescr = entries.find(([key]) => /(^|\.)object\.descr(\[|$)|(^|\.)descr(\[|$)/i.test(String(key)));
  if (objectDescr) return objectDescr[0];

  const attributeL1 = entries.find(([key]) => /(^|\.)attribute\.l1(\[|$)|(^|\.)l1(\[|$)/i.test(String(key)));
  if (attributeL1) return attributeL1[0];

  return "";
}