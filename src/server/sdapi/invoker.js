function findInvokerByMethod(node, methodName) {
  if (!node || typeof node !== "object") return null;

  if (Array.isArray(node)) {
    for (const item of node) {
      const found = findInvokerByMethod(item, methodName);
      if (found) return found;
    }
    return null;
  }

  if (node.t === "Invoker" && node.methodName === methodName) {
    return node;
  }

  for (const value of Object.values(node)) {
    const found = findInvokerByMethod(value, methodName);
    if (found) return found;
  }

  return null;
}

module.exports = {
  findInvokerByMethod,
};
