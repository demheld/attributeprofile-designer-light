# SDAPI Prompt Guide

Use these prompts when asking Copilot to build SDAPI features in this app or future apps.

## 1) Core Rules Prompt
Use this at the top of a new task.

```text
Use the shared SDAPI workflow service pattern: menu -> invoke-method -> step.

Rules:
- SDAPI upstream calls under /sdapi/0.1/ must use PUT for invoke-method and step.
- For popup list checks, validate from Object.ObjList() invoke response under items[].objclass.type.
- For value-list creation responses, read BulkServerResponse.bulk[].t=ObjectCreate and use newObjId.
- Keep UI behavior and backend behavior in sync.
- Reuse the common API service abstractions instead of duplicating fetch logic.
```

## 2) Reusable Flow Prompt (Generic)

```text
Implement this feature using a reusable SDAPI operation flow.

Expected architecture:
1. Fetch menu for object id.
2. Find invoker by method name (for example Object.ObjList(), Object.Create(), AttributeProfile.Edit()).
3. Invoke method via PUT /invoke-method.
4. If StepInvoker is returned, edit parameters and submit via PUT /step.
5. Parse response bulk actions and surface important IDs/messages to UI.

Also:
- Add/extend a shared service layer for menu/invoke/step.
- Keep route handlers thin and focused on validation + orchestration.
- Add frontend client function for the endpoint.
- Validate with no lint/syntax errors.
```

## 3) Conditional Field Prompt

```text
For Bedingtes Feld validation:
- Only allow tag SELECT or RADIO.
- popupObjId must be numeric.
- Force a fresh Object.ObjList() lookup (do not rely on stale cache).
- Validate that invoke response contains ObjList items with objclass.type=VALUE_LIST.
- If invalid, show warning dialog with clear reasons.
```

## 4) Add Value List Entry Prompt

```text
In Attribute Field overview dropdowns, add a (+) action to create a new VALUE_LIST entry.

Backend flow for popupObjId:
- Call menu on popupObjId.
- Find Object.Create().
- PUT /invoke-method with create invoker.
- Extract StepInvoker + attributeValues.
- Fill value/description fields.
- PUT /step.
- Read ObjectCreate.newObjId from BulkServerResponse and return it.

Frontend:
- Use a modal with Value + Description fields.
- Trigger the explicit local sequence so the browser network tab shows it:
	- POST /api/menu
	- POST /api/invoke
	- PUT /api/submit-step
	- POST /api/menu + POST /api/invoke again for live dropdown refresh
- Refresh dropdown values and select new entry.
```

## 5) Debug Prompt (HAR-first)

```text
Debug this SDAPI flow with HAR evidence.

Checklist:
- Confirm local API method/route match (POST vs PUT).
- Confirm upstream /invoke-method is PUT.
- Confirm upstream /step is PUT.
- Confirm invoker methodName/reference used is correct.
- Confirm response parsing uses the real payload shape (for example bulk[].ObjectCreate.newObjId).

Deliver:
- Root cause.
- Minimal patch.
- Exact files changed.
```

## 6) Short Prompt You Can Reuse Anywhere

```text
Build this with the standard SDAPI pattern (menu -> invoke-method -> step), strict PUT semantics for SDAPI actions, response-aware parsing (especially bulk ObjectCreate.newObjId), and shared service abstractions so the logic is reusable in future apps.
```

## Project-specific Notes
- For popup value-list entry creation, do not use a combined local endpoint. Use explicit local POST /api/menu, POST /api/invoke, and PUT /api/submit-step calls from the frontend flow.
- Shared backend SDAPI service module: src/server/sdapi/service.js.
- Frontend SDAPI client abstraction: public/js/sdapi-client.js.
