---
description: "Use when editing the form layout UI, HTML structure in public/index.html, CSS in public/styles.css, rendering in section-renderer.js or body-grid-renderer.js, field cards in field-card-factory.js, drag-and-drop behavior, grid positioning, GROUPING containers, or tab switching (Form Layout, Field Table, Raw JSON)."
---
# Frontend GUI Rules

## Rendering Pipeline
```
renderProfile(invokeData)
  ├── extractShows() → flat list of AttributeShowDO rows
  ├── preloadConditionalRules() → async cache fill
  ├── buildConditionalVisibility() → filter function
  ├── renderHeaderSection(headerShows)
  ├── renderBodyGrid(bodyShows, visibleShows)
  ├── renderOtherSection(otherShows)
  ├── renderFieldTable(shows)          ← unfiltered, all fields
  └── rawOutput = JSON.stringify()     ← unfiltered
```

## Key State in appState
- `invokeData` — raw SDAPI response (source of truth)
- `shows` — extracted AttributeShowDO array
- `previewValues` — current dropdown selections (used for conditional visibility)
- `formGridCols`, `extraBodyRows`, `manualBodyCols` — grid dimensions

## Body Grid (body-grid-renderer.js)
- CSS Grid: `repeat(cols, 1fr) 28px` (28px for edge column)
- Fields positioned by `hpos` (column), `vpos` (row), `colspan`, `rowspan`
- Ghost cells fill empty slots with "+" insert button
- Drag-drop: `dragstart` → `dragover` (snap indicator) → `drop` (resolve overlaps)
- 140ms click-suppress after drag to prevent accidental edit
- GROUPING containers: `<details>` with inner grid, scoped drag zone

## Section Renderer (section-renderer.js)
- Factory: `createSectionRenderer(options)` returns 3 methods
- `renderHeaderSection` — HEADER fields in grid
- `renderOtherSection` — non-BODY/non-HEADER grouped by showType
- `renderFieldTable` — sortable `<tbody>` via `getTableSort()` / `getSortableValue()`

## Field Cards (field-card-factory.js)
- `renderFieldCardMarkup(show, options)` — HTML string for card
- `appendEdgeInsertButtons(container, edgeDefs, onInsert)` — ±buttons on edges
- `appendRemoveButton(container, opts)` — × close button
- `escapeHtml(value)` — sanitize HTML entities

## GROUPING Handling
- Container: `tag=GROUPING`, `showType=BODY`, `tagPref` contains `show_type=XXX`
- Members: all rows with `showType=XXX`
- Members resolved from ALL attribute rows, not only BODY
- Members excluded from "other show types" to avoid duplication
- Containers rendered in BODY layout; members inside container's inner grid

## Tab System
- Tabs: Form Layout (`tabLayout`), Field Table (`tabTable`), Raw JSON (`tabRaw`)
- Tab switching via `.tab` buttons with `data-tab` attribute
- All three update on every `renderProfile()` call

## CSS Conventions
- Use CSS custom properties from `:root` (e.g., `var(--border)`, `var(--muted)`)
- `.hidden` class for visibility toggling
- `.card` for section containers
- Field state classes: `field-hidden`, `field-readonly`, `field-mandatory`
