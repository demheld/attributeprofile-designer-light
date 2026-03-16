import { findObjectByType } from "/js/tree-walker.js";

export function extractShows(data) {
  if (!data || typeof data !== "object") return [];

  if (data.attributeProfile && Array.isArray(data.attributeProfile.attributeShows)) {
    return data.attributeProfile.attributeShows;
  }

  if (Array.isArray(data.attributeShows)) {
    return data.attributeShows;
  }

  for (const value of Object.values(data)) {
    if (value && typeof value === "object") {
      const found = extractShows(value);
      if (found.length) return found;
    }
  }

  return [];
}

export function cloneJson(value) {
  return JSON.parse(JSON.stringify(value));
}

export function normalizeProfileSaveId(value) {
  const numeric = Number(value);
  if (Number.isFinite(numeric) && numeric > 0) return numeric;
  return value;
}

export function buildProfileRefreshInvoker(profileId) {
  return {
    t: "Invoker",
    shortcut: "NONE",
    objId: normalizeProfileSaveId(profileId),
    activityId: 10070052,
    methodId: 10010098,
    parentId: 10090021,
    methodName: "10010098",
    reference: null,
    target: null,
  };
}

export function normalizeAttributeShowsForSave(attributeShows) {
  if (!Array.isArray(attributeShows)) return [];
  return attributeShows.map((field) => {
    const nextField = cloneJson(field || {});
    if (nextField.popupObjId === null || nextField.popupObjId === undefined || String(nextField.popupObjId).trim() === "") {
      nextField.popupObjId = 0;
    }
    return nextField;
  });
}

export function mergeEditedAttributeProfile(freshData, editedProfile) {
  const freshEditResponse = findObjectByType(freshData, "AttributeProfileEditResponse");
  const freshProfile = freshEditResponse?.attributeProfile || freshData?.attributeProfile || null;
  if (!freshProfile || typeof freshProfile !== "object") {
    return {
      t: "AttributeProfileDO",
      ...cloneJson(editedProfile || {}),
      attributeShows: normalizeAttributeShowsForSave(editedProfile?.attributeShows || []),
    };
  }

  return {
    ...cloneJson(freshProfile),
    attributeShows: normalizeAttributeShowsForSave(editedProfile?.attributeShows || freshProfile?.attributeShows || []),
  };
}

export function extractProfileName(data) {
  if (!data) return "(unknown)";
  if (data.attributeProfile?.name) return data.attributeProfile.name;
  if (data.name) return data.name;
  return "(unnamed profile)";
}