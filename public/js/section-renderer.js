import {
  appendEdgeInsertButtons,
  appendRemoveButton,
  escapeHtml as esc,
  renderFieldCardMarkup,
} from "/js/field-card-factory.js";

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

    const grid = document.createElement("div");
    grid.className = "header-grid";

    shows
      .slice()
      .sort((a, b) => Number(a.seq) - Number(b.seq))
      .forEach((show) => {
        const idx = getShows().indexOf(show);
        const cell = document.createElement("div");
        cell.className = `field-card small ${fieldStateClass(show)}`;
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
      });

    headerFields.appendChild(grid);
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

      const grid = document.createElement("div");
      grid.className = "header-grid";

      items
        .slice()
        .sort((a, b) => Number(a.seq) - Number(b.seq))
        .forEach((show) => {
          const idx = getShows().indexOf(show);
          const cell = document.createElement("div");
          cell.className = `field-card small ${fieldStateClass(show)}`;
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
        });

      otherFields.appendChild(grid);
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
