const { sendJson } = require("../http/respond");
const { serveStatic } = require("../http/static");
const {
  handleMenu,
  handleInvoke,
  handleLoadStepForm,
  handleFetchObjList,
  handleWsapiCall,
  handleSubmitStep,
  handleAuthCheck,
  handleAuthPostbind,
} = require("./apiHandlers");

const API_ROUTES = [
  // auth-service delivers the JWT here after cross-domain login (postbind flow)
  { method: "GET", path: "/authenticate/postbind", handler: handleAuthPostbind },
  { method: "POST", path: "/authenticate/postbind", handler: handleAuthPostbind },
  { method: "POST", path: "/api/auth-check", handler: handleAuthCheck },
  { method: "POST", path: "/api/menu", handler: handleMenu },
  { method: "POST", path: "/api/invoke", handler: handleInvoke },
  { method: "POST", path: "/api/load-step-form", handler: handleLoadStepForm },
  { method: "POST", path: "/api/fetch-objlist", handler: handleFetchObjList },
  { method: "POST", path: "/api/submit-step", handler: handleSubmitStep },
  { method: "PUT", path: "/api/submit-step", handler: handleSubmitStep },
];

async function routeRequest(req, res) {
  res.setHeader("X-Content-Type-Options", "nosniff");
  const reqPath = new URL(req.url, "http://localhost").pathname;

  if (req.method === "POST" && req.url.startsWith("/api/wsapi-call")) {
    await handleWsapiCall(req, res);
    return;
  }

  const match = API_ROUTES.find((route) => req.method === route.method && reqPath === route.path);
  if (match) {
    await match.handler(req, res);
    return;
  }

  if (req.method === "GET") {
    serveStatic(req, res);
    return;
  }

  sendJson(res, 405, { error: "Method not allowed" });
}

module.exports = {
  routeRequest,
};
