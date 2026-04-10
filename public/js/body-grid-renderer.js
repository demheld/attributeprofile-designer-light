import {
  appendEdgeInsertButtons,
  appendRemoveButton,
  escapeHtml as esc,
  renderFieldCardMarkup,
} from "/js/field-card-factory.js";
import { fieldStateClass } from "/js/section-renderer.js";
import { getGroupingConfig, normalizeFieldPosition, resolveNoOverlap } from "/js/grid-geometry.js";

export function createBodyGridRenderer({
  documentRef,
  formGrid,
  bodyLabel,
  getState,
  getShows,
  onInsertFieldAtPosition,
  onInsertFieldAtEdge,
  onRemoveField,
  onAttachSelectPreview,
  onOpenFieldEditor,
  onRemoveBodyColumn,
  onRemoveBodyRow,
  onRenderCurrentProfile,
}) {
  function getOrCreateSnapIndicator(gridElement) {
    const appState = getState();
    if (!appState.snapIndicatorEl) {
      const node = documentRef.createElement("div");
      node.className = "snap-indicator hidden";
      appState.snapIndicatorEl = node;
    }
    if (appState.snapIndicatorEl.parentElement !== gridElement) {
      appState.snapIndicatorEl.remove();
      gridElement.appendChild(appState.snapIndicatorEl);
    }
    return appState.snapIndicatorEl;
  }

  function hideSnapIndicator() {
    const appState = getState();
    if (appState.snapIndicatorEl) {
      appState.snapIndicatorEl.classList.add("hidden");
    }
  }

  function clearPushPreview() {
    documentRef.querySelectorAll(".field-card.push-preview").forEach((el) => {
      el.classList.remove("push-preview");
    });
  }

  function showPushPreview(indices) {
    clearPushPreview();
    indices.forEach((idx) => {
      const card = documentRef.querySelector(`.field-card[data-field-index="${idx}"]`);
      if (card) card.classList.add("push-preview");
    });
  }

  function simulatePushPreview(pool, movedField, nextH, nextV, maxCols) {
    const shows = getShows();
    const clones = pool.map((f) => ({
      __idx: shows.indexOf(f),
      hpos: Number(f.hpos) || 1,
      vpos: Number(f.vpos) || 1,
      colspan: Number(f.colspan) || 1,
      rowspan: Number(f.rowspan) || 1,
    }));

    const movedIdx = shows.indexOf(movedField);
    const movedClone = clones.find((c) => c.__idx === movedIdx);
    if (!movedClone) return [];

    movedClone.hpos = nextH;
    movedClone.vpos = nextV;
    resolveNoOverlap(clones, movedClone, maxCols);

    return clones
      .filter((c) => c.__idx !== movedIdx)
      .filter((c) => {
        const original = shows[c.__idx];
        return original && (Number(original.vpos) !== c.vpos || Number(original.hpos) !== c.hpos);
      })
      .map((c) => c.__idx);
  }

  function showSnapIndicator(gridElement, localH, localV, colspan, rowspan, maxCols) {
    const indicator = getOrCreateSnapIndicator(gridElement);
    const rect = gridElement.getBoundingClientRect();
    const colWidth = rect.width / Math.max(1, maxCols);
    const gap = 8;
    const appState = getState();

    const h = Math.max(1, Math.min(maxCols, localH));
    const v = Math.max(1, localV);

    indicator.style.left = `${(h - 1) * colWidth}px`;
    indicator.style.top = `${(v - 1) * appState.dragRowHeight}px`;
    indicator.style.width = `${Math.max(10, colWidth * Math.max(1, colspan) - gap)}px`;
    indicator.style.height = `${Math.max(10, appState.dragRowHeight * Math.max(1, rowspan) - gap)}px`;
    indicator.classList.remove("hidden");
  }

  function moveFieldToGridPosition(field, gridElement, event, maxCols, minH = 1, minV = 1) {
    const appState = getState();
    const rect = gridElement.getBoundingClientRect();
    const x = Math.max(0, Math.min(rect.width - 1, event.clientX - rect.left));
    const y = Math.max(0, event.clientY - rect.top);
    const colWidth = rect.width / Math.max(1, maxCols);

    const localH = Math.max(1, Math.floor(x / Math.max(1, colWidth)) + 1);
    const localV = Math.max(1, Math.floor(y / appState.dragRowHeight) + 1);

    field.hpos = minH + localH - 1;
    field.vpos = minV + localV - 1;
  }

  function beginDragField(event, index) {
    const appState = getState();
    appState.dragFieldIndex = index;
    appState.dragging = true;
    event.dataTransfer.setData("text/plain", String(index));
    event.dataTransfer.effectAllowed = "move";
    event.currentTarget.classList.add("is-dragging");
  }

  function endDragField(event) {
    const appState = getState();
    event.currentTarget.classList.remove("is-dragging");
    appState.dragging = false;
    appState.dragFieldIndex = -1;
    appState.dragSuppressClickUntil = Date.now() + 140;
    formGrid.classList.remove("drop-target-active");
    hideSnapIndicator();
    clearPushPreview();
  }

  function renderBodyGrid(shows, allShows) {
    const appState = getState();
    formGrid.innerHTML = "";
    formGrid.style.placeContent = "";
    bodyLabel.classList.add("hidden");

    if (!shows.length) {
      bodyLabel.classList.remove("hidden");
      formGrid.style.minHeight = `${Math.max(220, appState.dragRowHeight * 2)}px`;
      formGrid.style.gridTemplateColumns = "minmax(220px, 380px)";
      formGrid.style.placeContent = "center";

      const emptyAdd = documentRef.createElement("button");
      emptyAdd.type = "button";
      emptyAdd.className = "empty-add-card";
      emptyAdd.innerHTML = '<span class="empty-add-plus">+</span><span class="empty-add-text">Neues Feld anlegen</span>';
      emptyAdd.addEventListener("click", () => onInsertFieldAtPosition(1, 1));
      formGrid.appendChild(emptyAdd);
      return;
    }

    bodyLabel.classList.remove("hidden");

    const { containers, memberShowTypes } = getGroupingConfig(shows);
    const bodyStandaloneShows = shows.filter((s) => {
      const showType = String(s.showType || "").toUpperCase();
      const tag = String(s.tag || "").toUpperCase();
      if (tag === "GROUPING") return false;
      return !memberShowTypes.has(showType);
    });

    const sorted = bodyStandaloneShows
      .slice()
      .sort((a, b) => (Number(a.vpos) - Number(b.vpos)) || (Number(a.hpos) - Number(b.hpos)));

    const containerItems = containers.map((c) => c.container);
    const allGridItems = [...sorted, ...containerItems];
    const outerRenderedItems = [];
    if (!allGridItems.length) {
      bodyLabel.classList.remove("hidden");
      formGrid.style.minHeight = `${Math.max(220, appState.dragRowHeight * 2)}px`;
      formGrid.style.gridTemplateColumns = "minmax(220px, 380px)";
      formGrid.style.placeContent = "center";

      const emptyAdd = documentRef.createElement("button");
      emptyAdd.type = "button";
      emptyAdd.className = "empty-add-card";
      emptyAdd.innerHTML = '<span class="empty-add-plus">+</span><span class="empty-add-text">Neues Feld anlegen</span>';
      emptyAdd.addEventListener("click", () => onInsertFieldAtPosition(1, 1));
      formGrid.appendChild(emptyAdd);
      return;
    }

    const usedCols = Math.max(...allGridItems.map((s) => (Number(s.hpos) || 1) + (Number(s.colspan) || 1) - 1));
    const cols = Math.max(usedCols, Number(appState.manualBodyCols || 0), 1);
    appState.formGridCols = cols;
    appState.manualBodyCols = cols;
    formGrid.style.gridTemplateColumns = `repeat(${cols}, 1fr) 28px`;

    const usedRows = Math.max(...allGridItems.map((s) => (Number(s.vpos) || 1) + (Number(s.rowspan) || 1) - 1));
    const rows = Math.max(usedRows + Number(appState.extraBodyRows || 0), 1);
    formGrid.style.minHeight = `${rows * appState.dragRowHeight}px`;

    for (let r = 1; r <= rows; r++) {
      for (let c = 1; c <= cols; c++) {
        const ghost = documentRef.createElement("div");
        ghost.className = "grid-ghost-cell";
        ghost.dataset.hpos = String(c);
        ghost.dataset.vpos = String(r);
        ghost.style.gridColumn = String(c);
        ghost.style.gridRow = String(r);
        const ghostPlus = documentRef.createElement("span");
        ghostPlus.className = "ghost-cell-add";
        ghostPlus.textContent = "+";
        ghost.appendChild(ghostPlus);
        ghost.addEventListener("click", () => onInsertFieldAtPosition(c, r));
        formGrid.appendChild(ghost);
      }
    }

    if (!appState.formGridDropBound) {
      formGrid.addEventListener("dragover", (event) => {
        event.preventDefault();
        formGrid.classList.add("drop-target-active");

        const idx = Number(event.dataTransfer.getData("text/plain"));
        const field = getShows()[idx];
        if (!field || String(field.showType || "").toUpperCase() !== "BODY") return;

        const rect = formGrid.getBoundingClientRect();
        const colWidth = rect.width / Math.max(1, getState().formGridCols);
        const localH = Math.max(1, Math.floor(Math.max(0, event.clientX - rect.left) / Math.max(1, colWidth)) + 1);
        const localV = Math.max(1, Math.floor(Math.max(0, event.clientY - rect.top) / getState().dragRowHeight) + 1);
        showSnapIndicator(formGrid, localH, localV, Number(field.colspan) || 1, Number(field.rowspan) || 1, getState().formGridCols);

        const pool = getShows().filter(
          (s) => String(s.showType || "").toUpperCase() === "BODY" && String(s.tag || "").toUpperCase() !== "GROUPING"
        );
        const preview = simulatePushPreview(pool, field, localH, localV, getState().formGridCols);
        showPushPreview(preview);
      });

      formGrid.addEventListener("dragleave", () => {
        formGrid.classList.remove("drop-target-active");
        hideSnapIndicator();
        clearPushPreview();
      });

      formGrid.addEventListener("drop", (event) => {
        event.preventDefault();
        formGrid.classList.remove("drop-target-active");

        const idx = Number(event.dataTransfer.getData("text/plain"));
        if (!Number.isFinite(idx)) return;
        const field = getShows()[idx];
        if (!field) return;
        if (String(field.showType || "").toUpperCase() !== "BODY") return;

        moveFieldToGridPosition(field, formGrid, event, getState().formGridCols, 1, 1);
        normalizeFieldPosition(field, getState().formGridCols);

        const pool = getShows().filter(
          (s) => String(s.showType || "").toUpperCase() === "BODY" && String(s.tag || "").toUpperCase() !== "GROUPING"
        );
        resolveNoOverlap(pool, field, getState().formGridCols);

        hideSnapIndicator();
        clearPushPreview();
        onRenderCurrentProfile();
      });

      appState.formGridDropBound = true;
    }

    sorted.forEach((show) => {
      const idx = getShows().indexOf(show);
      const hpos = Math.max(1, Number(show.hpos) || 1);
      const vpos = Math.max(1, Number(show.vpos) || 1);
      const colspan = Math.max(1, Number(show.colspan) || 1);
      const rowspan = Math.max(1, Number(show.rowspan) || 1);

      const card = documentRef.createElement("div");
      card.className = `field-card is-draggable ${fieldStateClass(show)}`;
      card.setAttribute("data-field-index", String(idx));
      card.draggable = true;
      card.style.gridColumn = `${hpos} / span ${colspan}`;
      card.style.gridRow = `${vpos} / span ${rowspan}`;

      const flags = [
        show.mandatory ? '<span class="flag flag-required">required</span>' : "",
        show.readonly ? '<span class="flag flag-readonly">readonly</span>' : "",
        show.hidden ? '<span class="flag flag-hidden">hidden</span>' : "",
      ].join("");

      card.innerHTML = renderFieldCardMarkup(show, { includeTag: true, footerExtras: flags });

      appendEdgeInsertButtons(card, [
        { dir: "top", title: "Zeile darüber einfügen" },
        { dir: "right", title: "Spalte rechts einfügen" },
        { dir: "bottom", title: "Zeile darunter einfügen" },
        { dir: "left", title: "Spalte links einfügen" },
      ], (dir) => onInsertFieldAtEdge(show, dir));

      appendRemoveButton(card, {
        title: "Feld entfernen",
        onRemove: () => onRemoveField(show),
      });

      onAttachSelectPreview(card, show);
      card.addEventListener("dragstart", (event) => beginDragField(event, idx));
      card.addEventListener("dragend", endDragField);
      card.addEventListener("click", () => {
        if (getState().dragging || Date.now() < getState().dragSuppressClickUntil) return;
        onOpenFieldEditor(idx);
      });
      formGrid.appendChild(card);
      outerRenderedItems.push({
        rect: { left: hpos, top: vpos, right: hpos + colspan - 1, bottom: vpos + rowspan - 1 },
        element: card,
      });
    });

    containers.forEach(({ container, memberType, defaultOpen }) => {
      const containerIdx = getShows().indexOf(container);
      const members = allShows
        .filter((s) => String(s.showType || "").toUpperCase() === memberType)
        .slice()
        .sort((a, b) => (Number(a.vpos) - Number(b.vpos)) || (Number(a.hpos) - Number(b.hpos)));

      const hpos = Math.max(1, Number(container.hpos) || 1);
      const vpos = Math.max(1, Number(container.vpos) || 1);
      const colspan = Math.max(1, Number(container.colspan) || 1);
      const rowspan = Math.max(1, Number(container.rowspan) || 1);

      const wrapper = documentRef.createElement("details");
      wrapper.className = "grouping-card";
      wrapper.setAttribute("data-field-index", String(containerIdx));
      wrapper.style.gridColumn = `${hpos} / span ${colspan}`;
      wrapper.style.gridRow = `${vpos} / span ${rowspan}`;
      wrapper.open = defaultOpen;

      const titleText = container.displayName || container.attributeName || `Group ${memberType}`;
      const summary = documentRef.createElement("summary");
      summary.innerHTML = `
      <span class="grouping-title">${esc(titleText)}</span>
      <span class="grouping-meta">${esc(memberType)} · ${members.length} field${members.length !== 1 ? "s" : ""}</span>
    `;
      wrapper.appendChild(summary);

      wrapper.addEventListener("click", (event) => {
        if (!Number.isFinite(containerIdx) || containerIdx < 0) return;
        if (getState().dragging || Date.now() < getState().dragSuppressClickUntil) return;
        if (event.target.closest(".grouping-inner-grid")) return;
        if (event.target.closest(".edge-insert-btn")) return;
        if (event.target.closest(".field-remove-btn")) return;
        onOpenFieldEditor(containerIdx);
      });

      const memberGrid = documentRef.createElement("div");
      memberGrid.className = "grouping-inner-grid";

      if (!members.length) {
        memberGrid.innerHTML = `<p class="empty-hint">No fields found for show_type ${esc(memberType)}.</p>`;
      } else {
        const minH = Math.min(...members.map((m) => Math.max(1, Number(m.hpos) || 1)));
        const minV = Math.min(...members.map((m) => Math.max(1, Number(m.vpos) || 1)));
        const maxMemberCol = Math.max(
          ...members.map((m) => (Math.max(1, Number(m.hpos) || 1) - minH + 1) + Math.max(1, Number(m.colspan) || 1) - 1)
        );

        memberGrid.style.gridTemplateColumns = `repeat(${Math.max(1, maxMemberCol)}, minmax(130px, 1fr))`;
        memberGrid.style.minHeight = `${Math.max(1, Math.max(...members.map((m) => Number(m.vpos) || 1))) * getState().dragRowHeight}px`;

        memberGrid.addEventListener("dragover", (event) => {
          event.preventDefault();
          memberGrid.classList.add("drop-target-active");

          const idx = Number(event.dataTransfer.getData("text/plain"));
          const field = getShows()[idx];
          if (!field || String(field.showType || "").toUpperCase() !== memberType) return;

          const rect = memberGrid.getBoundingClientRect();
          const localH = Math.max(1, Math.floor(Math.max(0, event.clientX - rect.left) / Math.max(1, rect.width / Math.max(1, maxMemberCol))) + 1);
          const localV = Math.max(1, Math.floor(Math.max(0, event.clientY - rect.top) / getState().dragRowHeight) + 1);
          showSnapIndicator(memberGrid, localH, localV, Number(field.colspan) || 1, Number(field.rowspan) || 1, Math.max(1, maxMemberCol));

          const pool = getShows().filter((s) => String(s.showType || "").toUpperCase() === memberType);
          const preview = simulatePushPreview(pool, field, minH + localH - 1, minV + localV - 1, Math.max(1, maxMemberCol) + minH - 1);
          showPushPreview(preview);
        });

        memberGrid.addEventListener("dragleave", () => {
          memberGrid.classList.remove("drop-target-active");
          hideSnapIndicator();
          clearPushPreview();
        });

        memberGrid.addEventListener("drop", (event) => {
          event.preventDefault();
          memberGrid.classList.remove("drop-target-active");

          const idx = Number(event.dataTransfer.getData("text/plain"));
          if (!Number.isFinite(idx)) return;
          const field = getShows()[idx];
          if (!field) return;
          if (String(field.showType || "").toUpperCase() !== memberType) return;

          moveFieldToGridPosition(field, memberGrid, event, Math.max(1, maxMemberCol), minH, minV);

          const groupPool = getShows().filter((s) => String(s.showType || "").toUpperCase() === memberType);
          resolveNoOverlap(groupPool, field, Math.max(1, maxMemberCol) + minH - 1);

          hideSnapIndicator();
          clearPushPreview();
          onRenderCurrentProfile();
        });

        members.forEach((member) => {
          const idx = getShows().indexOf(member);
          const localH = Math.max(1, Number(member.hpos) || 1) - minH + 1;
          const localV = Math.max(1, Number(member.vpos) || 1) - minV + 1;
          const localColspan = Math.max(1, Number(member.colspan) || 1);
          const localRowspan = Math.max(1, Number(member.rowspan) || 1);

          const card = documentRef.createElement("div");
          card.className = `field-card small is-draggable ${fieldStateClass(member)}`;
          card.setAttribute("data-field-index", String(idx));
          card.draggable = true;
          card.style.gridColumn = `${localH} / span ${localColspan}`;
          card.style.gridRow = `${localV} / span ${localRowspan}`;
          card.innerHTML = renderFieldCardMarkup(member, { includeTag: true });

          appendEdgeInsertButtons(card, [
            { dir: "top", title: "Zeile darüber einfügen" },
            { dir: "right", title: "Spalte rechts einfügen" },
            { dir: "bottom", title: "Zeile darunter einfügen" },
            { dir: "left", title: "Spalte links einfügen" },
          ], (dir) => onInsertFieldAtEdge(member, dir));

          appendRemoveButton(card, {
            title: "Feld entfernen",
            onRemove: () => onRemoveField(member),
          });

          onAttachSelectPreview(card, member);
          card.addEventListener("dragstart", (event) => beginDragField(event, idx));
          card.addEventListener("dragend", endDragField);
          card.addEventListener("click", (event) => {
            event.stopPropagation();
            if (getState().dragging || Date.now() < getState().dragSuppressClickUntil) return;
            onOpenFieldEditor(idx);
          });

          memberGrid.appendChild(card);
        });
      }

      wrapper.appendChild(memberGrid);

      appendEdgeInsertButtons(wrapper, [
        { dir: "top", title: "Zeile darüber einfügen" },
        { dir: "right", title: "Spalte rechts einfügen" },
        { dir: "bottom", title: "Zeile darunter einfügen" },
        { dir: "left", title: "Spalte links einfügen" },
      ], (dir) => onInsertFieldAtEdge(container, dir));

      appendRemoveButton(wrapper, {
        title: "Gruppierung entfernen",
        ariaLabel: "Gruppierung entfernen",
        onRemove: () => onRemoveField(container),
      });

      formGrid.appendChild(wrapper);
      outerRenderedItems.push({
        rect: { left: hpos, top: vpos, right: hpos + colspan - 1, bottom: vpos + rowspan - 1 },
        element: wrapper,
      });
    });

    requestAnimationFrame(() => {
    const coveredCols = new Set();
    for (let c = 1; c <= usedCols; c++) {
      if (coveredCols.has(c)) continue;

      const target = outerRenderedItems
        .filter((item) => item.rect.left <= c && item.rect.right >= c)
        .sort((a, b) => (a.rect.top - b.rect.top) || (a.rect.left - b.rect.left))[0];

      if (!target?.element) continue;

      const btn = documentRef.createElement("button");
      btn.className = "grid-edge-btn grid-remove-btn grid-remove-top";
      btn.type = "button";
      btn.title = "Remove column and its content";
      btn.textContent = "−";
      btn.style.left = `${target.element.offsetLeft}px`;
      btn.style.top = `${target.element.offsetTop - 36}px`;
      btn.style.width = `${target.element.offsetWidth}px`;
      btn.addEventListener("click", () => onRemoveBodyColumn(c));
      formGrid.appendChild(btn);

      for (let covered = target.rect.left; covered <= target.rect.right; covered += 1) {
        coveredCols.add(covered);
      }
    }

    const coveredRows = new Set();
    for (let r = 1; r <= rows; r++) {
      if (coveredRows.has(r)) continue;

      const target = outerRenderedItems
        .filter((item) => item.rect.top <= r && item.rect.bottom >= r)
        .sort((a, b) => (a.rect.left - b.rect.left) || (a.rect.top - b.rect.top))[0];

      const anchor = target?.element
        || formGrid.querySelector(`.grid-ghost-cell[data-vpos="${r}"]`);
      if (!anchor) continue;

      const btn = documentRef.createElement("button");
      btn.className = "grid-edge-btn grid-remove-btn grid-remove-left";
      btn.type = "button";
      btn.title = "Remove row and its content";
      btn.textContent = "−";
      btn.style.left = `${anchor.offsetLeft - 36}px`;
      btn.style.top = `${anchor.offsetTop}px`;
      btn.style.height = `${anchor.offsetHeight}px`;
      btn.addEventListener("click", () => onRemoveBodyRow(r));
      formGrid.appendChild(btn);

      if (target) {
        for (let covered = target.rect.top; covered <= target.rect.bottom; covered += 1) {
          coveredRows.add(covered);
        }
      } else {
        coveredRows.add(r);
      }
    }
    }); // end requestAnimationFrame

    for (let r = 1; r <= rows; r++) {
      const btn = documentRef.createElement("button");
      btn.className = "grid-add-btn grid-add-col";
      btn.type = "button";
      btn.title = "Add column";
      btn.textContent = "+";
      btn.style.gridColumn = String(cols + 1);
      btn.style.gridRow = String(r);
      btn.addEventListener("click", () => {
        if (!getState().invokeData) return;
        const appStateRef = getState();
        appStateRef.manualBodyCols = Math.max(1, Number(appStateRef.manualBodyCols || appStateRef.formGridCols || 2)) + 1;
        onRenderCurrentProfile();
      });
      formGrid.appendChild(btn);
    }

    for (let c = 1; c <= cols; c++) {
      const btn = documentRef.createElement("button");
      btn.className = "grid-add-btn grid-add-row";
      btn.type = "button";
      btn.title = "Add row";
      btn.textContent = "+";
      btn.style.gridColumn = String(c);
      btn.style.gridRow = String(rows + 1);
      btn.addEventListener("click", () => {
        if (!getState().invokeData) return;
        getState().extraBodyRows += 1;
        onRenderCurrentProfile();
      });
      formGrid.appendChild(btn);
    }
  }

  return { renderBodyGrid };
}
