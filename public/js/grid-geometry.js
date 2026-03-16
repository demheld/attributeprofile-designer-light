import { parseTagPrefs } from "/js/tag-prefs.js";

export function getFieldRect(field) {
  const h = Math.max(1, Number(field.hpos) || 1);
  const v = Math.max(1, Number(field.vpos) || 1);
  const c = Math.max(1, Number(field.colspan) || 1);
  const r = Math.max(1, Number(field.rowspan) || 1);
  return { left: h, top: v, right: h + c - 1, bottom: v + r - 1 };
}

export function intersects(a, b) {
  return !(a.right < b.left || b.right < a.left || a.bottom < b.top || b.bottom < a.top);
}

export function normalizeFieldPosition(field, maxCols) {
  const colspan = Math.max(1, Number(field.colspan) || 1);
  const maxLeft = Math.max(1, maxCols - colspan + 1);
  field.hpos = Math.max(1, Math.min(maxLeft, Number(field.hpos) || 1));
  field.vpos = Math.max(1, Number(field.vpos) || 1);
}

// Push overlapping fields down until there are no collisions.
export function resolveNoOverlap(fields, pinnedField, maxCols) {
  fields.forEach((f) => normalizeFieldPosition(f, maxCols));

  let changed = true;
  let safety = 0;
  while (changed && safety < 500) {
    changed = false;
    safety += 1;

    for (const field of fields) {
      if (field === pinnedField) continue;
      if (intersects(getFieldRect(field), getFieldRect(pinnedField))) {
        field.vpos = getFieldRect(pinnedField).bottom + 1;
        changed = true;
      }
    }

    for (let i = 0; i < fields.length; i += 1) {
      for (let j = i + 1; j < fields.length; j += 1) {
        const a = fields[i];
        const b = fields[j];
        if (a === pinnedField || b === pinnedField) continue;
        if (intersects(getFieldRect(a), getFieldRect(b))) {
          b.vpos = getFieldRect(a).bottom + 1;
          changed = true;
        }
      }
    }
  }
}

export function getGroupingConfig(shows) {
  const groupContainers = shows.filter((s) => String(s.tag || "").toUpperCase() === "GROUPING");
  const memberShowTypes = new Set();

  const containers = groupContainers
    .map((container) => {
      const prefs = parseTagPrefs(container.tagPrefs ?? container.tagPref);
      const memberType = String(prefs.show_type || prefs.showType || prefs.group_show_type || "").toUpperCase();
      const defaultOpenRaw = String(prefs.defaultOpen ?? "true").toLowerCase();
      const defaultOpen = defaultOpenRaw !== "false";

      if (!memberType) return null;

      memberShowTypes.add(memberType);
      return { container, memberType, defaultOpen };
    })
    .filter(Boolean);

  return { containers, memberShowTypes };
}
