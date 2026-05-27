import {
  appendEdgeInsertButtons,
  appendRemoveButton,
  escapeHtml as esc,
  renderFieldCardMarkup,
} from "/js/field-card-factory.js";
import { getFieldRect } from "/js/grid-geometry.js";

export function fieldStateClass(show) {
  if (show.hidden) return "field-hidden";
  if (show.readonly) return "field-readonly";
  if (show.mandatory) return "field-mandatory";
  return "";
}

function getSortableValue(show, key) {
  const value = show?.[key];
  if (typeof value === "boolean") return value ? 1 : 0;
  if (typeof value === "number") return value;
  const asNumber = Number(value);
  if (!Number.isNaN(asNumber) && value !== "" && value !== null && value !== undefined) return asNumber;
  return String(value ?? "").toLowerCase();
}

/**
 * Create section-level renderers bound to the given DOM containers and app
 * callbacks.  The returned render functions keep the same public signatures as
 * the original app.js functions.
 *
 * @param {Object} opts
 * @param {Element} opts.headerFields  – container for HEADER cards
 * @param {Element} opts.otherFields   – container for OTHER/non-BODY cards
 * @param {Element} opts.fieldTableBody – <tbody> for the field table
 * @param {Function} opts.attachSelectPreview – (cell, show) → void
 * @param {Function} opts.onOpenEditor  – (idx) → void
 * @param {Function} opts.onInsertField – (show, dir) → void
 * @param {Function} opts.onRemoveField – (show) → void
 * @param {Function} opts.onRemoveRow  – (showType, rowNumber) → void
 * @param {Function} opts.onRemoveColumn – (showType, colNumber) → void
 * @param {Function} opts.getShows      – () → show[]
 * @param {Function} opts.getTableSort  – () → { key, dir }
 */
export function createSectionRenderer({
  headerFields,
  otherFields,
  fieldTableBody,
  attachSelectPreview,
  onOpenEditor,
  onInsertField,
  onRemoveField,
  onRemoveRow,
  onRemoveColumn,
  getShows,
  getTableSort,
}) {
  function renderHeaderSection(shows) {
    headerFields.innerHTML = "";
    if (!shows.length) return;

    const label = document.createElement("p");
    label.className = "section-label";
    label.textContent = "HEADER";
    headerFields.appendChild(label);

    renderSectionGrid(headerFields, shows, "HEADER");
  }

  function renderOtherSection(shows) {
    otherFields.innerHTML = "";
    if (!shows.length) return;

    const grouped = {};
    shows.forEach((s) => {
      const t = String(s.showType || "OTHER").toUpperCase();
      if (!grouped[t]) grouped[t] = [];
      grouped[t].push(s);
    });

    Object.entries(grouped).forEach(([type, items]) => {
      const label = document.createElement("p");
      label.className = "section-label";
      label.textContent = type;
      otherFields.appendChild(label);

      renderSectionGrid(otherFields, items, type);
    });
  }

  /**
   * Render a CSS-grid section with hpos/vpos positioning and row/column
   * remove buttons – mirrors the BODY grid pattern for any showType.
   */
  function renderSectionGrid(container, shows, showType) {
    const sorted = shows
      .slice()
      .sort((a, b) => (Number(a.vpos) - Number(b.vpos)) || (Number(a.hpos) - Number(b.hpos)));

    const usedCols = Math.max(1, ...sorted.map((s) => (Number(s.hpos) || 1) + (Number(s.colspan) || 1) - 1));
    const usedRows = Math.max(1, ...sorted.map((s) => (Number(s.vpos) || 1) + (Number(s.rowspan) || 1) - 1));

    const grid = document.createElement("div");
    grid.className = "section-grid";
    grid.style.gridTemplateColumns = `repeat(${usedCols}, 1fr)`;

    const renderedItems = [];

    sorted.forEach((show) => {
      const idx = getShows().indexOf(show);
      const hpos = Math.max(1, Number(show.hpos) || 1);
      const vpos = Math.max(1, Number(show.vpos) || 1);
      const colspan = Math.max(1, Number(show.colspan) || 1);
      const rowspan = Math.max(1, Number(show.rowspan) || 1);

      const cell = document.createElement("div");
      cell.className = `field-card small ${fieldStateClass(show)}`;
      cell.style.gridColumn = `${hpos} / span ${colspan}`;
      cell.style.gridRow = `${vpos} / span ${rowspan}`;
      cell.innerHTML = renderFieldCardMarkup(show);

      appendEdgeInsertButtons(cell, [
        { dir: "top", title: "Feld davor einfuegen" },
        { dir: "right", title: "Feld danach einfuegen" },
        { dir: "bottom", title: "Feld danach einfuegen" },
        { dir: "left", title: "Feld davor einfuegen" },
      ], (dir) => onInsertField(show, dir));

      appendRemoveButton(cell, {
        title: "Feld entfernen",
        onRemove: () => onRemoveField(show),
      });

      attachSelectPreview(cell, show);
      cell.addEventListener("click", () => onOpenEditor(idx));
      grid.appendChild(cell);

      renderedItems.push({
        rect: { left: hpos, top: vpos, right: hpos + colspan - 1, bottom: vpos + rowspan - 1 },
        element: cell,
      });
    });

    container.appendChild(grid);

    // Row / column remove buttons (absolute-positioned, same pattern as body grid)
    requestAnimationFrame(() => {
      const coveredCols = new Set();
      for (let c = 1; c <= usedCols; c++) {
        if (coveredCols.has(c)) continue;
        const target = renderedItems
          .filter((item) => item.rect.left <= c && item.rect.right >= c)
          .sort((a, b) => (a.rect.top - b.rect.top) || (a.rect.left - b.rect.left))[0];
        if (!target?.element) continue;

        const btn = document.createElement("button");
        btn.className = "grid-edge-btn grid-remove-btn grid-remove-top";
        btn.type = "button";
        btn.title = "Remove column and its content";
        btn.textContent = "\u2212";
        btn.style.left = `${target.element.offsetLeft}px`;
        btn.style.top = `${target.element.offsetTop - 36}px`;
        btn.style.width = `${target.element.offsetWidth}px`;
        btn.addEventListener("click", () => onRemoveColumn(showType, c));
        grid.appendChild(btn);

        for (let covered = target.rect.left; covered <= target.rect.right; covered += 1) {
          coveredCols.add(covered);
        }
      }

      const coveredRows = new Set();
      for (let r = 1; r <= usedRows; r++) {
        if (coveredRows.has(r)) continue;
        const target = renderedItems
          .filter((item) => item.rect.top <= r && item.rect.bottom >= r)
          .sort((a, b) => (a.rect.left - b.rect.left) || (a.rect.top - b.rect.top))[0];
        if (!target?.element) continue;

        const btn = document.createElement("button");
        btn.className = "grid-edge-btn grid-remove-btn grid-remove-left";
        btn.type = "button";
        btn.title = "Remove row and its content";
        btn.textContent = "\u2212";
        btn.style.left = `${target.element.offsetLeft - 36}px`;
        btn.style.top = `${target.element.offsetTop}px`;
        btn.style.height = `${target.element.offsetHeight}px`;
        btn.addEventListener("click", () => onRemoveRow(showType, r));
        grid.appendChild(btn);

        for (let covered = target.rect.top; covered <= target.rect.bottom; covered += 1) {
          coveredRows.add(covered);
        }
      }
    });
  }

  function renderFieldTable(shows) {
    fieldTableBody.innerHTML = "";

    const { key, dir } = getTableSort();
    const factor = dir === "desc" ? -1 : 1;

    shows
      .slice()
      .sort((a, b) => {
        const av = getSortableValue(a, key);
        const bv = getSortableValue(b, key);
        if (av < bv) return -1 * factor;
        if (av > bv) return 1 * factor;
        return (Number(a.seq) - Number(b.seq));
      })
      .forEach((show) => {
        const idx = getShows().indexOf(show);
        const tr = document.createElement("tr");
        tr.className = "field-row-clickable";
        tr.innerHTML = [
          esc(show.seq),
          `<span class="field-badge type-badge-${esc(String(show.showType || "").toLowerCase())}">${esc(show.showType)}</span>`,
          esc(show.hpos),
          esc(show.vpos),
          esc(show.colspan),
          esc(show.rowspan),
          esc(show.displayName),
          `<code>${esc(show.attributeName)}</code>`,
          esc(show.tag),
          esc(show.datatype),
          show.mandatory ? '<span class="flag flag-required">✓</span>' : "",
          show.hidden ? '<span class="flag flag-hidden">✓</span>' : "",
          show.readonly ? '<span class="flag flag-readonly">✓</span>' : "",
        ].map((c) => `<td>${c}</td>`).join("");

        tr.addEventListener("click", () => onOpenEditor(idx));
        fieldTableBody.appendChild(tr);
      });
  }

  return { renderHeaderSection, renderOtherSection, renderFieldTable };
}
