---
description: "Use when editing the field editor modal (Edit Attribute Field dialog), expert mode, basic mode, preset buttons, field creation (Neues Feld anlegen), popup entry add/edit/delete, value list creation, or the Datenkontext/Nullprofile modal."
---
# Field Editor Modal Rules

## Modal Structure
- Dialog: `#fieldEditorModal`
- Two panes: Basic (`#editorBasicPane`) and Expert (`#editorExpertPane`)
- Toggle via gear icon / "Expert Mode" and "Basic Mode" buttons

## Basic Pane
- Preset buttons: Auswahlliste (SELECT), Textfeld (RICHTEXT), Radiobuttons (RADIO)
- Fields: Feldname (`displayName`), Feld-Daten (`attributeName` as `<select>`)
- Hidden inputs: `popupType`, `popupObjId`
- Checkboxes: Pflichtfeld, readonly, persisted, Bedingtes Feld
- Select preview: loaded from `popupObjId` value list (with +, edit, delete buttons)
- Conditional config section: toggle with "Bedingtes Feld" checkbox

## Expert Pane
- `generateExpertFormControls()` creates inputs for ALL attribute properties dynamically
- Form controls sync to JSON textarea in real-time (`applyLiveExpertFormEdit`)
- JSON changes regenerate form controls (bidirectional sync)
- Both modes share the same underlying field object in `appState.shows[idx]`

## Live Sync Flow
```
User edits Basic field → applyLiveBasicEdit() → updates field object + JSON
User edits Expert field → applyLiveExpertFormEdit() → updates JSON → regenerates controls
User edits JSON → parses → updates field object → regenerates expert controls
All changes → renderProfile(invokeData) → updates all 3 tabs live
```

## Field Save
- `saveEditorBtn` → `applyFieldEditorChanges()`
- Validates required values (e.g., attributeName not empty)
- Persists conditional dependency changes only when dirty
- Closes modal

## attributeName Dropdown (Nullprofile)
- Populated from nullprofile attribute options (`appState.nullProfileAttributeOptions`)
- If no nullprofile → falls back to single entry with current value
- Uses `fillAttributeNameDropdown()` helper

## Value List Entry Operations
- Add: `popupEntryModal` → `createPopupEntryViaSdapiFlow(popupObjId, value, description)`
- Edit: loads existing via `editValueListEntryViaSdapiFlow(entryObjId)` → populates modal
- Delete: `deleteValueListEntryViaSdapiFlow(entryObjId)` with confirmation

## Quick Add Field
- Dialog: `#quickAddFieldModal`
- Creates a new field in BODY section with chosen type (SELECT/RICHTEXT/RADIO)
- Auto-opens field editor after creation

## Datenkontext / Nullprofile Modal
- Dialog: `#datenkontextModal`
- Loads nullprofile by object ID → shows attribute list (seq, attributeName, displayName)
- Editable table rows with add/delete
- Save persists nullprofile changes via step flow
