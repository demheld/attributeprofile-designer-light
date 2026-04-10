---
description: "Use when working on conditional fields, conditional visibility, tagPrefs with conditionalValueList, the Abhaengige Felder modal, conditional-model.js, conditional dependency editing, conditional value list creation, or previewValues-driven field show/hide logic."
---
# Conditional Fields Rules

## How Conditional Fields Work
A field with `tagPrefs` containing `conditionalValueList=<objId>` is a **conditional controller**.
It controls the visibility of other fields (conditional targets) based on the selected dropdown value.

## Data Flow
```
tagPrefs parsed → conditionalValueList reference found
  → loadConditionalRules(reference) via sdapi-client
    → menu → Object.ObjList() → invoke → extract items
  → rules cached in appState.conditionalListCache[reference]
  → buildConditionalVisibility(shows) uses:
      - cached rules (key → [target attributeNames])
      - current dropdown selection from appState.previewValues
    → returns isVisible(show) filter function
  → renderProfile filters shows through isVisible
```

## Key State
- `appState.conditionalListCache` — `{ [reference]: { [choiceKey]: [targetAttrNames] } }`
- `appState.previewValues` — `{ [normalizedAttrName]: { value, label } }` — persists across rerenders
- `appState.conditionalEditor` — modal editing state for deps configuration

## Rule Extraction (conditional-model.js)
- `extractConditionalListItems(data, normalizeKey)` — walks ObjList response
- Items must have `objclass.type === "VALUE_LIST"`
- Key from `Bezeichnung` column, dependencies from `Beschreibung` column
- Dependencies are space-separated attribute names, normalized case-insensitively
- Also exports: `evaluateConditionalEligibility(field)`, `evaluateTagForConditional(field)`

## Eligibility Requirements
A field can be a conditional controller only if:
1. `tag` is `SELECT` or `RADIO`
2. `popupObjId` is a non-zero numeric string

## Visibility Logic (buildConditionalVisibility)
- Collects all conditional target attributeNames across all controllers
- For each controller: reads `previewValues[attrName]` and checks both `.value` and `.label` (case-insensitive)
- A target is visible if ANY controller's current selection maps to it
- GROUPING-aware: if a GROUPING container is a target, all its members are shown/hidden together

## Initial Value Resolution
When a dropdown's value list loads for the first time (no `previewValues` entry exists):
- If `defaultValue` matches an option → use it
- Otherwise → use the first option as initial value
- Trigger `renderProfile()` to apply conditional visibility immediately

## Conditional Editor Modal ("Abhaengige Felder")
- Opened from the field editor's ⚙ button
- Dropdown shows all popup values (loaded from the field's `popupObjId`)
- Changing dropdown: saves current checkbox state, renders checkboxes for new choice
- If selected value doesn't exist as a conditional choice yet → auto-created via SDAPI
- Save: writes all accumulated dirty changes to `state.dependenciesByKey`, closes modal
- Persistence: `persistConditionalDependencies()` submits dirty entries via step flow

## TagPrefs Format
- `parseTagPrefs(raw)` — parses `"key1=val1 key2=val2"` or `{ key: val }` object
- `serializeTagPrefs(raw, prefs)` — preserves original format (string vs object)
- Conditional reference key: `conditionalValueList` or `conditional_value_list`
