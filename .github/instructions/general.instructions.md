---
description: "Always-on project context for Formulardesigner-light. Covers terminology, authentication, project structure, and cross-cutting conventions."
applyTo: "**"
---
# General Project Context

## Terminology
- Technical / docs: **Attribute Field** (one `AttributeShowDO` row)
- UI labels / messages: **Form Field**
- Short form: **Field**

## Project Structure
```
server.js              → 1-line bootstrap to src/server/index.js
src/server/
  config.js            → centralized settings (port, upstream base)
  http/                → body parsing, respond helpers, static serving
  sdapi/               → url building, invoker tree search, upstream fetch
  routes/              → apiHandlers (endpoints), router (dispatcher)
public/
  app.js               → main frontend orchestration
  index.html / styles.css
  js/
    sdapi-client.js    → frontend API client (factory, DI, caching)
    body-grid-renderer.js  → BODY grid + drag-drop
    section-renderer.js    → HEADER / OTHER / table rendering
    field-card-factory.js  → reusable card DOM factories
    conditional-model.js   → conditional field rule extraction
    parameter-model.js     → StepInvoker parameter helpers
    profile-model.js       → profile/show extraction
    grid-geometry.js       → grid overlap resolution
    storage.js             → localStorage persistence
    tag-prefs.js           → tagPref/tagPrefs parse/serialize
    tree-walker.js         → recursive response tree search
    notices.js             → center-screen toast notices
```

## Authentication
- Bearer token (JWT) in `Authorization: Bearer <token>` header
- Auth provider: IENIGNE, 2FA: SMS_MTAN
- Backend accepts token from: header (preferred), body.token, cookie (fallback)

## Conventions
- Dependency injection over hardcoded config (both backend and frontend)
- Promise caching in sdapi-client to prevent duplicate in-flight requests
- `findStepInvoker()` / `findAttributeValues()` use recursive tree search
- All response shapes: `{ ok, status, url, data }`
- Keep backend routes thin; business logic in sdapi/ service modules
- Preserve existing IDs/selectors in HTML unless a change is explicitly required
