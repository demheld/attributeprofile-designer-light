---
description: "Use when modifying SDAPI endpoints, upstream HTTP calls, invoke-method/step flows, backend Node.js server code in src/server/, or the local API routes (/api/menu, /api/invoke, /api/submit-step, /api/fetch-objlist, /api/wsapi-call). Also use when debugging HTTP method mismatches or response parsing."
---
# SDAPI Backend Rules

## HTTP Method Rules — CRITICAL
- All upstream calls to `/sdapi/0.1/` use **PUT** — no exceptions
  - `PUT /sdapi/0.1/invoke-method`
  - `PUT /sdapi/0.1/{objId}/{activityId}/{parentId}/step`
- Browser→proxy calls (to localhost `/api/*`) are POST (JSON body), except:
  - `PUT /api/submit-step` — matches upstream semantics
- Exception: `/wsapi/call` uses POST (different API, not SDAPI)

## Core Workflow Pattern
```
menu (GET /objects/{objId})  →  invoke-method (PUT)  →  step (PUT)
```

## Local API Endpoints
| Endpoint | Method | Upstream |
|----------|--------|----------|
| `/api/menu` | POST | `GET /objects/{objId}` |
| `/api/invoke` | POST | `PUT /invoke-method` |
| `/api/submit-step` | PUT | `PUT /{objId}/{activityId}/{parentId}/step` |
| `/api/fetch-objlist` | POST | menu → find `Object.ObjList()` → invoke |
| `/api/load-step-form` | POST | `GET /{objId}/{activityId}/{parentId}` |
| `/api/wsapi-call` | POST | `POST /wsapi/call` |
| `/api/auth-check` | POST | `/objects/USER` validation |
| `/authenticate/postbind` | POST/GET | Auth-service token handoff |

## Request Validation
- Use `requireField()` helper to validate token and required fields
- Bearer token extraction: `Authorization` header (preferred), body.token (fallback)
- URL building: `buildUrl(baseUrl, path)` with proper encoding

## Response Parsing
- Always return `{ ok, status, url, data }`
- StepInvoker: find via recursive `findStepInvoker(data)` tree walk
- AttributeValues: find via recursive `findAttributeValues(data)` tree walk
- Create responses: parse `BulkServerResponse.bulk[].t=ObjectCreate` → use `newObjId`
- Use `sendUpstreamError()` to surface upstream failures

## Module Responsibilities
- `src/server/config.js` — port, upstream base URL
- `src/server/http/body.js` — JSON body parsing
- `src/server/http/respond.js` — JSON response formatting
- `src/server/http/static.js` — static file serving
- `src/server/sdapi/url.js` — SDAPI URL validation and building
- `src/server/sdapi/invoker.js` — recursive invoker tree search
- `src/server/sdapi/upstream.js` — fetch wrapper for upstream calls
- `src/server/routes/apiHandlers.js` — endpoint handlers
- `src/server/routes/router.js` — URL dispatcher

## ConditionalValueList Save Rule
- Build `StepInvoker.parameters` from invoke response `attributeValues` (full DO objects), then update the target field value
- Do NOT send only flattened string parameters when attributeValues are available
