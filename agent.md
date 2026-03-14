# SDAPI Agent Documentation

## Overview
This document describes the SDAPI (Service Data API) for interacting with the TIE Portal system.

## Terminology
- Preferred term: Attribute Field
- Short form: Field
- UI wording: Form Field

Definition:
One `AttributeShowDO` row (for example with keys like `attributeName`, `showType`, `tag`, `hpos`, `vpos`) is treated as one Attribute Field.

Usage guideline:
- Technical discussion and docs: use "Attribute Field"
- UI labels/messages: use "Form Field"

## Base Information
- **API Version**: 0.1
- **Base URL**: 
  - Production: `https://kundenportal.tie.ch/rest2/sdapi/0.1`
- **Authentication**: Bearer token (JWT)
- **Auth Provider**: IENIGNE
- **2FA Method**: SMS_MTAN

## Available Endpoints

### 1. Get Object Information
**Method**: GET  
**Endpoint**: `/objects/{objId}`  
**Description**: Retrieve information about a specific object from the Fallakte (case file)

**Example**:
```
GET /objects/31011934949
```

---

### 2. Invoke Method
**Method**: PUT  
**Endpoint**: `/invoke-method`  
**Description**: Invoke a method on an object (e.g., create a new note)

**Request Body Structure**:
```json
{
  "t": "Invoker",
  "parameters": {},
  "presentation": {
    "t": "ImageSource",
    "label": "string",
    "tooltip": "string",
    "italic": false,
    "uri": "string",
    "overlayUri": null
  },
  "shortcut": "string",
  "objId": number,
  "activityId": number,
  "methodId": number,
  "parentId": number,
  "methodName": "string",
  "reference": "string",
  "target": "string",
  "seq": number
}
```

**Example Use Case**: Create a new note with `Object.Create()` method

---

### 3. Execute Step
**Method**: PUT  
**Endpoint**: `/{objId}/{activityId}/{parentId}/step`  
**Description**: Execute a step in a workflow/process

**Request Body Structure**:
```json
{
  "t": "StepInvoker",
  "parameters": {
    "parameterName": {
      "t": "DataType",
      "internalValue": "value",
      "displayValue": "displayValue"
    }
  },
  "presentation": null,
  "shortcut": "string",
  "txnId": "string",
  "objId": number,
  "activityId": number,
  "parentId": number,
  "methodId": number,
  "stepNo": number
}
```

**Example Use Case**: Create a note with step-by-step execution where you provide:
- `SYS_ATTRIBUTE_CLOB.1.VALUE[BODY,2]`: Note body content
- `SYS_OBJECT.OBJ_NAME[BODY,1]`: Object name (e.g., "Notiz")

---

## Authentication
All endpoints require a Bearer token in the Authorization header:
```
Authorization: Bearer <JWT_TOKEN>
```

## Data Types
- **StringDO**: String data object with internal and display values
- **ImageSource**: Presentation object with icon URI
- **Invoker**: Method invocation type
- **StepInvoker**: Step execution type

## Common Object IDs
- **Fallakte ID**: 31011934949 (Sabine Heidenreich - 777125)
- **Activity ID**: 31025008310
- **Method ID**: 10010004 (Object.Create)

## Common Methods
- `Object.Create()`: Create a new object (e.g., note)
- `NOTECREATE`: Reference for note creation

## Usage Notes
- Use transaction IDs (`txnId`) to track step execution
- Parameters are nested objects with type information
- Workflow steps are numbered sequentially
- All timestamps are in Unix epoch format
- Always verify endpoint HTTP methods against the SDAPI Confluence description before implementation changes (especially `/invoke-method` and `/{objId}/{activityId}/{parentId}/step`, both are `PUT`).

---

## Current App Implementation (March 2026)

This section documents what has already been implemented in the current source code so future improvements can build on it.

### End-to-End Flow in the App
1. First screen asks for:
   - Base URL
   - Bearer Token
   - `obj_id`
2. On submit, backend calls:
   - `GET /objects/{objId}` (Object.Menu)
3. The response is searched recursively for an invoker with:
   - `methodName = "AttributeProfile.Edit()"`
4. If found, backend calls:
   - `PUT /invoke-method` with that invoker
5. The resulting attribute profile is rendered in the GUI.

### Current Local API Endpoints (Node Server)
- `POST /api/menu`
  - Input: `baseUrl`, `token`, `objId`
  - Action: calls SDAPI `GET /objects/{objId}`
- `POST /api/invoke`
  - Input: `baseUrl`, `token`, `invoker`
  - Action: calls SDAPI `PUT /invoke-method`

### Current GUI Behavior
- The first input screen (base URL + token + obj_id) is intentionally kept as is.
- After load, profile view provides tabs:
  - Form Layout
  - Field Table
  - Raw JSON
- BODY fields are positioned via CSS grid using:
  - `hpos`, `vpos`, `colspan`, `rowspan`

### GROUPING Handling (Implemented)
Based on documentation page **"GROUPING - Feldgruppierung"**:

- A grouping container is an `AttributeShowDO` row with:
  - `tag = GROUPING`
  - `showType = BODY` (or another area where container is shown)
  - `tagPref` / `tagPrefs` containing `show_type=XXX`
- Group members are all rows with:
  - `showType = XXX`

#### Important Fix Applied
Initial implementation only looked for group members inside BODY rows.
That caused empty groups for custom show types (for example `PATIENTENDATEN`).

Now fixed:
- Group members are resolved from **all attribute rows**, not only BODY.
- Group containers remain rendered in BODY layout.
- Grouped member rows are excluded from the generic "other show types" list to avoid duplication.

### Notes for Next Iterations
- Improve visual hierarchy and spacing inside grouped content.
- Add explicit grouping diagnostics in UI header (for example show_type badge).
- Add optional handling for nested or multiple grouping containers with same target show_type.
