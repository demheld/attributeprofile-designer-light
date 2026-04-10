export function normalizeMethodName(name) {
  return String(name || "").trim().toLowerCase().replace(/\s+/g, "");
}

function walkTree(node, visit) {
  if (!node || typeof node !== "object") return;
  visit(node);

  if (Array.isArray(node)) {
    node.forEach((item) => walkTree(item, visit));
    return;
  }

  Object.values(node).forEach((value) => {
    if (value && typeof value === "object") {
      walkTree(value, visit);
    }
  });
}

function findFirstInTree(node, predicate) {
  if (!node || typeof node !== "object") return null;
  if (predicate(node)) return node;

  if (Array.isArray(node)) {
    for (const item of node) {
      const found = findFirstInTree(item, predicate);
      if (found) return found;
    }
    return null;
  }

  for (const value of Object.values(node)) {
    if (!value || typeof value !== "object") continue;
    const found = findFirstInTree(value, predicate);
    if (found) return found;
  }

  return null;
}

export function findInvoker(data, methodName) {
  return findFirstInTree(data, (node) => node.methodName === methodName);
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
  });
}

export function findCreateValueListInvoker(data, allowedReferences = ["CREATE_CLI_SPEC_VALUELIST"]) {
  const allowed = new Set((allowedReferences || []).map((ref) => String(ref || "").trim().toUpperCase()));
  return findFirstInTree(data, (node) => {
    const methodName = normalizeMethodName(node.methodName);
    const reference = String(node.reference || "").trim().toUpperCase();
    return methodName === normalizeMethodName("Object.Create()") && allowed.has(reference);
  });
}

export function findInvokerByPredicate(data, predicate) {
  return findFirstInTree(data, predicate);
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
  });

  return found;
}

export function findAllInvokers(data) {
  const found = [];

  walkTree(data, (node) => {
    if (Array.isArray(node)) return;
    if (node.t === "Invoker" && node.methodName) {
      found.push(node);
    }
  });

  return found;
}