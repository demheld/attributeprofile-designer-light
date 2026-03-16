export function escapeHtml(value) {
  return String(value === null || value === undefined ? "" : value)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

export function renderFieldCardMarkup(show, options = {}) {
  const {
    includeDatatype = true,
    includeTag = false,
    footerExtras = "",
  } = options;

  const datatypeMarkup = includeDatatype && show?.datatype
    ? `<span class="field-badge">${escapeHtml(show.datatype)}</span>`
    : "";
  const tagMarkup = includeTag && show?.tag
    ? `<span class="field-badge tag-badge">${escapeHtml(show.tag)}</span>`
    : "";

  return `
    <div class="field-label">${escapeHtml(show?.displayName || show?.attributeName || "")}</div>
    <div class="field-attr">${escapeHtml(show?.attributeName || "")}</div>
    <div class="field-footer">
      ${datatypeMarkup}
      ${tagMarkup}
      ${footerExtras}
    </div>
  `;
}

export function appendEdgeInsertButtons(container, edgeDefs, onInsert) {
  edgeDefs.forEach(({ dir, title }) => {
    const button = document.createElement("button");
    button.type = "button";
    button.className = `edge-insert-btn edge-insert-${dir}`;
    button.title = title;
    button.setAttribute("aria-label", title);
    button.textContent = "+";
    button.addEventListener("click", (event) => {
      event.stopPropagation();
      onInsert(dir, event);
    });
    container.appendChild(button);
  });
}

export function appendRemoveButton(container, { title, ariaLabel = title, onRemove }) {
  const button = document.createElement("button");
  button.type = "button";
  button.className = "field-remove-btn";
  button.title = title;
  button.setAttribute("aria-label", ariaLabel);
  button.textContent = "×";
  button.addEventListener("click", (event) => {
    event.stopPropagation();
    onRemove(event);
  });
  container.appendChild(button);
}