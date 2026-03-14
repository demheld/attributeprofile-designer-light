# Attribute Profile Designer Light

Local helper app to inspect and edit one i-engine attribute profile.
The current app loads a profile directly by ID, but keeps the core SDAPI endpoint settings visible so the tool can scale back into broader workflow support.

## Why this is safe

- You do not share tokens in chat.
- You enter the bearer token only in your local browser.
- The token is used only for one proxied request from your local Node process.
- The app does not persist token values.

## Start

```bash
npm start
```

Then open `http://localhost:5174`.

## Inputs

- `API base URL`: default `https://kundenportal.tie.ch/rest2/sdapi/0.1`
- `Profile endpoint template`: default `/objects/{id}`
- `Invoke-method endpoint`: default `/invoke-method`
- `Attribute profile ID`: the profile/object id to load
- `Bearer token`: your current JWT

The profile is loaded through:

- `GET {baseUrl}{profileEndpointTemplate}` with `{id}` replaced by the entered profile id.

`Invoke-method endpoint` stays in the UI intentionally because it is a core SDAPI primitive and will be needed when the designer grows into broader workflow interactions.

## Output

- `Simple Designer View`: focused table for `attributeProfile.attributeShows`.
- Default filter excludes non-editing/technical rows (`HEADER`, `BUTTON*`, `EMPTY`, `MBODY`).
- `Include HEADER/BUTTON/MBODY rows` lets you inspect technical rows too.
- Each row has an `Edit` action that opens a modal for designer-relevant fields.
- `Field Map`: flattened path/type/value list for fast analysis.
- `Show likely designer fields only`: filters to fields likely relevant for simple form layout/editing.
- `Raw JSON`: full API response payload.

## Save edited profile

The app supports Step API submission based on the returned `stepInvoker`:

1. Edit rows in the modal.
2. Configure the parameter name expected by your process (default: `ATTRIBUTE_PROFILE_JSON`).
3. Click `Save Edited Profile Via Step`.

The app sends `PUT /{objId}/{activityId}/{parentId}/step` with the original `stepInvoker` and one parameter containing the edited `attributeProfile` JSON string.

## SDAPI notes

From the SDAPI description:

- `GET /objects/{identifier}` generally executes `Object.Menu()`.
- `PUT /invoke-method` is the generic stateless action execution endpoint.
- `PUT /{objId}/{activityId}/{parentId}/step` is the form/step submission endpoint.

This app currently uses direct profile loading plus step-based save, while leaving the invoke-method configuration visible for future expansion.
