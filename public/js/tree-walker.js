export function normalizeMethodName(name) {
  return String(name || "").trim().toLowerCase().replace(/\s+/g, "");
}

function walkTree(node, visit, ignoreKeys) {
  if (!node || typeof node !== "object") return;
  visit(node);

  if (Array.isArray(node)) {
    node.forEach((item) => walkTree(item, visit, ignoreKeys));
    return;
  }

  Object.entries(node).forEach(([key, value]) => {
    if (!value || typeof value !== "object") return;
    if (ignoreKeys && ignoreKeys.has(key)) return;
    walkTree(value, visit, ignoreKeys);
  });
}

function findFirstInTree(node, predicate, ignoreKeys) {
  if (!node || typeof node !== "object") return null;
  if (predicate(node)) return node;

  if (Array.isArray(node)) {
    for (const item of node) {
      const found = findFirstInTree(item, predicate, ignoreKeys);
      if (found) return found;
    }
    return null;
  }

  for (const [key, value] of Object.entries(node)) {
    if (!value || typeof value !== "object") continue;
    if (ignoreKeys && ignoreKeys.has(key)) continue;
    const found = findFirstInTree(value, predicate, ignoreKeys);
    if (found) return found;
  }

  return null;
}

// `data.path[*].invokers` contains invokers belonging to ancestor objects
// (breadcrumb of semantically higher menus) and must not be used. Skip the
// `path` subtree entirely; `data.invokers` and `data.submenus[*].invokers`
// are still visited normally.
const INVOKER_IGNORE_KEYS = new Set(["path"]);

export function findInvoker(data, methodName) {
  return findFirstInTree(
    data,
    (node) => node.methodName === methodName,
    INVOKER_IGNORE_KEYS
  );
}

export function findStepInvoker(data) {
  const found = findFirstInTree(data, (node) => (
    node.t === "StepInvoker"
    || (node.stepInvoker && typeof node.stepInvoker === "object")
    || (node.txnId && node.stepNo !== undefined && node.objId !== undefined && node.activityId !== undefined)
  ));

  if (found?.stepInvoker && typeof found.stepInvoker === "object") {
    return found.stepInvoker;
  }

  return found;
}

export function findAttributeValues(data) {
  const found = findFirstInTree(
    data,
    (node) => node.attributeValues && typeof node.attributeValues === "object" && !Array.isArray(node.attributeValues)
  );
  return found?.attributeValues || null;
}

export function findObjectByType(data, typeName) {
  return findFirstInTree(data, (node) => node.t === typeName);
}

export function findInvokerByMethods(data, candidates) {
  const wanted = candidates.map(normalizeMethodName);
  return findFirstInTree(data, (node) => {
    const methodName = normalizeMethodName(node.methodName);
    return methodName && wanted.includes(methodName);
  }, INVOKER_IGNORE_KEYS);
}

export function findCreateValueListInvoker(data, allowedReferences = ["CREATE_CLI_SPEC_VALUELIST"]) {
  const allowed = new Set((allowedReferences || []).map((ref) => String(ref || "").trim().toUpperCase()));
  return findFirstInTree(data, (node) => {
    const methodName = normalizeMethodName(node.methodName);
    const reference = String(node.reference || "").trim().toUpperCase();
    return methodName === normalizeMethodName("Object.Create()") && allowed.has(reference);
  }, INVOKER_IGNORE_KEYS);
}

export function findInvokerByPredicate(data, predicate) {
  return findFirstInTree(data, predicate, INVOKER_IGNORE_KEYS);
}

export function findInvokersByMethodsAll(data, candidates) {
  const wanted = candidates.map(normalizeMethodName);
  const found = [];

  walkTree(data, (node) => {
    if (Array.isArray(node)) return;
    const methodName = normalizeMethodName(node.methodName);
    if (methodName && wanted.includes(methodName)) {
      found.push(node);
    }
  }, INVOKER_IGNORE_KEYS);

  return found;
}

export function findAllInvokers(data) {
  const found = [];

  walkTree(data, (node) => {
    if (Array.isArray(node)) return;
    if (node.t === "Invoker" && node.methodName) {
      found.push(node);
    }
  }, INVOKER_IGNORE_KEYS);

  return found;
}