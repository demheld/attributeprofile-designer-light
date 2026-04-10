---
description: "Implement improvements for the Edit Attribute Field modal. Use for modal UX, validation, conditional controls, and save behavior changes."
---
Implement improvements for the "Edit Attribute Field" modal in Formulardesigner-light.

Goal:
- Improve UX and reliability of editing a field in the modal without changing existing SDAPI semantics.

Scope:
- Modal behavior in public/app.js (and extracted frontend modules where appropriate).
- Keep backend routes thin; reuse shared SDAPI client/service abstractions.
- Preserve existing IDs/selectors unless a change is explicitly required.

Requirements:
1. Modal loading
- When opening a field, preload all existing values correctly (basic + expert tabs).
- Keep JSON editor and generated expert controls in sync.

2. Validation and save behavior
- Validate required values before save (for example: attributeName not empty where required by current behavior).
- Keep conditional-field eligibility checks (SELECT/RADIO + numeric popupObjId) consistent with current rules.
- On save, persist conditional dependency changes only when dirty.

3. Conditional controls
- If "Bedingtes Feld" is enabled and no conditional list exists, keep current creation/assignment path.
- Keep warning dialogs explicit and actionable.

4. UI feedback
- Show clear success/error messages in status banner and modal context.
- Do not silently fail; surface root cause text from response parsing where possible.

5. Architecture constraints
- Use standard SDAPI flow where applicable: menu -> invoke-method -> step.
- Respect strict PUT semantics for upstream SDAPI invoke-method/step calls.
- Reuse existing modules (sdapi-client, parameter-model, conditional-model, section/body renderers) instead of duplicating logic.

6. Quality bar
- Keep behavior backward compatible.
- No lint/syntax errors.
- Provide a short change summary with exact files touched.

Deliverables:
- Minimal patch.
- Notes on edge cases handled (for example malformed tagPrefs, missing StepInvoker, stale cache).
