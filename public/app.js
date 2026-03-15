import { createSdapiClient } from "/js/sdapi-client.js";

// -- DOM refs -----------------------------------------------------------------
const mainForm = document.getElementById("mainForm");
const loadBtn = document.getElementById("loadBtn");
const authServiceBtn = document.getElementById("authServiceBtn");
const sampleProfileBtn = document.getElementById("sampleProfileBtn");
const resetBtn = document.getElementById("resetBtn");
const statusBanner = document.getElementById("statusBanner");
const inputSection = document.getElementById("inputSection");
const profileSection = document.getElementById("profileSection");
const profileName = document.getElementById("profileName");
const profileMeta = document.getElementById("profileMeta");
const headerFields = document.getElementById("headerFields");
const bodyLabel = document.getElementById("bodyLabel");
const formGrid = document.getElementById("formGrid");
const otherFields = document.getElementById("otherFields");
const fieldTableBody = document.getElementById("fieldTableBody");
const rawOutput = document.getElementById("rawOutput");
const datenkontextBtn = document.getElementById("datenkontextBtn");
const sendToServerBtn = document.getElementById("sendToServerBtn");
const sendStatus = document.getElementById("sendStatus");

const fieldEditorModal = document.getElementById("fieldEditorModal");
const fieldEditorMeta = document.getElementById("fieldEditorMeta");
const editAttributeName = document.getElementById("editAttributeName");
const editDisplayName = document.getElementById("editDisplayName");
const editTag = document.getElementById("editTag");
const editTagMoreBtn = document.getElementById("editTagMoreBtn");
const editPopupType = document.getElementById("editPopupType");
const editPopupObjId = document.getElementById("editPopupObjId");
const editTagPrefReadonly = document.getElementById("editTagPrefReadonly");
const conditionalSetupSection = document.getElementById("conditionalSetupSection");
const conditionalChoiceSection = document.getElementById("conditionalChoiceSection");
const conditionalValueListInput = document.getElementById("conditionalValueListInput");
const confirmConditionalValueListBtn = document.getElementById("confirmConditionalValueListBtn");
const createNewConditionalValueListBtn = document.getElementById("createNewConditionalValueListBtn");
const editMandatory = document.getElementById("editMandatory");
const editReadonly = document.getElementById("editReadonly");
const editHidden = document.getElementById("editHidden");
const editPersisted = document.getElementById("editPersisted");
const editFieldJson = document.getElementById("editFieldJson");
const saveEditorBtn = document.getElementById("saveEditorBtn");
const cancelEditorBtn = document.getElementById("cancelEditorBtn");
const presetSelectBtn = document.getElementById("presetSelectBtn");
const presetRichtextBtn = document.getElementById("presetRichtextBtn");
const presetRadioBtn = document.getElementById("presetRadioBtn");
const editorBasicPane = document.getElementById("editorBasicPane");
const editorExpertPane = document.getElementById("editorExpertPane");
const editConditionalField = document.getElementById("editConditionalField");
const conditionalConfig = document.getElementById("conditionalConfig");
const conditionalChoiceSelect = document.getElementById("conditionalChoiceSelect");
const conditionalDepsBtn = document.getElementById("conditionalDepsBtn");
const conditionalChoiceMeta = document.getElementById("conditionalChoiceMeta");
const conditionalDepsModal = document.getElementById("conditionalDepsModal");
const conditionalDepsMeta = document.getElementById("conditionalDepsMeta");
const conditionalDepsList = document.getElementById("conditionalDepsList");
const conditionalNewChoiceSelect = document.getElementById("conditionalNewChoiceSelect");
const conditionalAddChoiceBtn = document.getElementById("conditionalAddChoiceBtn");
const conditionalAddChoiceMeta = document.getElementById("conditionalAddChoiceMeta");
const cancelConditionalDepsBtn = document.getElementById("cancelConditionalDepsBtn");
const saveConditionalDepsBtn = document.getElementById("saveConditionalDepsBtn");
const conditionalWarningModal = document.getElementById("conditionalWarningModal");
const conditionalWarningMeta = document.getElementById("conditionalWarningMeta");
const conditionalWarningReasons = document.getElementById("conditionalWarningReasons");
const cancelConditionalWarningBtn = document.getElementById("cancelConditionalWarningBtn");
const createValueListBtn = document.getElementById("createValueListBtn");
const valueListCreateModal = document.getElementById("valueListCreateModal");
const valueListCreateMeta = document.getElementById("valueListCreateMeta");
const valueListCreateFields = document.getElementById("valueListCreateFields");
const cancelValueListCreateBtn = document.getElementById("cancelValueListCreateBtn");
const saveValueListCreateBtn = document.getElementById("saveValueListCreateBtn");
const popupEntryModal = document.getElementById("popupEntryModal");
const popupEntryMeta = document.getElementById("popupEntryMeta");
const popupEntryValue = document.getElementById("popupEntryValue");
const popupEntryDescription = document.getElementById("popupEntryDescription");
const cancelPopupEntryBtn = document.getElementById("cancelPopupEntryBtn");
const savePopupEntryBtn = document.getElementById("savePopupEntryBtn");
const quickAddFieldModal = document.getElementById("quickAddFieldModal");
const quickAddFieldType = document.getElementById("quickAddFieldType");
const quickAddDisplayName = document.getElementById("quickAddDisplayName");
const quickAddAttributeName = document.getElementById("quickAddAttributeName");
const cancelQuickAddFieldBtn = document.getElementById("cancelQuickAddFieldBtn");
const saveQuickAddFieldBtn = document.getElementById("saveQuickAddFieldBtn");
const datenkontextModal = document.getElementById("datenkontextModal");
const datenkontextObjId = document.getElementById("datenkontextObjId");
const loadDatenkontextBtn = document.getElementById("loadDatenkontextBtn");
const datenkontextListBody = document.getElementById("datenkontextListBody");
const addDatenkontextRowBtn = document.getElementById("addDatenkontextRowBtn");
const closeDatenkontextBtn = document.getElementById("closeDatenkontextBtn");
const saveDatenkontextBtn = document.getElementById("saveDatenkontextBtn");
const datenkontextStatus = document.getElementById("datenkontextStatus");

const expertAttributeName = document.getElementById("expertAttributeName");
const expertDisplayName = document.getElementById("expertDisplayName");
const expertShowType = document.getElementById("expertShowType");
const expertTag = document.getElementById("expertTag");
const expertDatatype = document.getElementById("expertDatatype");
const expertHpos = document.getElementById("expertHpos");
const expertVpos = document.getElementById("expertVpos");
const expertColspan = document.getElementById("expertColspan");
const expertRowspan = document.getElementById("expertRowspan");
const expertMandatory = document.getElementById("expertMandatory");
const expertReadonly = document.getElementById("expertReadonly");
const expertHidden = document.getElementById("expertHidden");

const VALUE_LIST_TEMPLATE_FOLDER_OBJ_ID = "31026762484";
const TAG_DROPDOWN_VALUES = [
  "DATE",
  "BUTTON_WORKFLOW",
  "DESCRIPTION",
  "BUTTON_EMPTY",
  "SELECT_LIST",
  "TAB_SUBMIT",
  "YVALUE",
  "RICHTEXT",
  "VALUE_HEADER_DESCRIPTION",
  "DATETIME",
  "FINDER",
  "GROUPING",
  "BUTTON_SCRIPT",
  "COLOR",
  "BUTTON_SUBMIT_AND_CLOSE",
  "BUTTON_SUBMIT_EXECUTOR_AND_CLOSE",
  "BUTTON_CLOSE",
  "BUTTON_SUBMIT",
  "BUTTON_SUBMIT_EDITFRAME",
  "EMPTY",
  "BUTTON_SUBMIT_EDITFRAME_TO_PARENT",
  "HIDDEN",
  "TEXT_ML",
  "TITLE",
  "FIX",
  "AUTOCOMPLETE",
  "POPUP",
  "GRID",
  "CHECKBOX",
  "CHART",
  "PIE_CHART",
  "BUTTON_HREF",
  "BUTTON_BACK",
  "BUTTON_SUBMIT_EDITFRAME_TO_TOP",
  "FORMULA",
  "TIME_INTERVAL",
  "TAB",
  "YAXIS",
  "PASSWORD",
  "SINGLECHOSEN",
  "BUTTON_SUBMIT_TO_EXECUTOR",
  "NUMBER",
  "MAIL",
  "VALUE",
  "VALUE_HEADER_TOOLTIP",
  "INDEX_EDIT",
  "BUTTON_RESET",
  "MULTICHOSEN",
  "SELECT",
  "TEXTAREA",
  "XAXIS",
  "XVALUE",
  "FILE",
  "DDATE",
  "IMAGE_WORKFLOW",
  "TEXT",
  "RADIO",
  "NONE",
  "Radio",
  "IMAGE",
  "COLLECTION",
];

const appState = {
  invokeData: null,
  shows: [],
  nullProfileShows: [],
  nullProfileAttributeOptions: [],
  nullProfileObjId: "",
  nullProfileInvokeData: null,
  nullProfileStepInvokerTemplate: null,
  nullProfileSourceInvoker: null,
  selectedFieldIndex: -1,
  dragFieldIndex: -1,
  dragging: false,
  dragSuppressClickUntil: 0,
  dragRowHeight: 86,
  formGridCols: 2,
  formGridDropBound: false,
  manualBodyCols: null,
  extraBodyRows: 0,
  snapIndicatorEl: null,
  stepInvokerTemplate: null,
  selectedAttributeProfileInvoker: null,
  tableSort: { key: "vpos", dir: "asc" },
  objListCache: {},
  valueListCache: {},
  conditionalListCache: {},
  previewValues: {},
  conditionalEditor: {
    enabled: false,
    listObjId: "",
    cachedListObjId: "",
    sourceOptions: [],
    items: [],
    selectedKey: "",
    dependenciesByKey: {},
    originalDependenciesByKey: {},
    dirtyKeys: new Set(),
  },
  pendingConditionalWarningFieldIndex: -1,
  valueListCreation: {
    fieldIndex: -1,
    createInvoker: null,
    stepInvokerTemplate: null,
    parametersTemplate: null,
    responseData: null,
  },
  popupEntryDraft: {
    show: null,
    selectEl: null,
    addBtnEl: null,
  },
};

// -- localStorage helpers ------------------------------------------------------
const LS_BASE_URL = "tie_baseUrl";
const LS_OBJ_ID = "tie_objId";
const LS_NULL_OBJ_ID = "tie_nullProfileObjId";
const LS_OBJ_CLASS_ID = "tie_objClassId";

function getUrlParamValue(params, keys) {
  for (const key of keys) {
    const value = String(params.get(key) || "").trim();
    if (value) return value;
  }
  return "";
}

function saveFormToStorage() {
  const token = document.getElementById("token").value.trim();
  const baseUrl = document.getElementById("baseUrl").value.trim();
  const objId = document.getElementById("objId").value.trim();
  const nullProfileObjId = document.getElementById("nullProfileObjId").value.trim();
  const objClassId = document.getElementById("objClassId")?.value.trim() || "";
  if (token) localStorage.setItem("tie_token", token);
  if (baseUrl) localStorage.setItem(LS_BASE_URL, baseUrl);
  if (objId) localStorage.setItem(LS_OBJ_ID, objId);
  localStorage.setItem(LS_NULL_OBJ_ID, nullProfileObjId);
  localStorage.setItem(LS_OBJ_CLASS_ID, objClassId);
}

function restoreFormFromStorage() {
  const token = localStorage.getItem("tie_token") || "";
  let baseUrl = localStorage.getItem(LS_BASE_URL) || "";
  let objId = localStorage.getItem(LS_OBJ_ID) || "";
  const nullProfileObjId = localStorage.getItem(LS_NULL_OBJ_ID) || "";
  let objClassId = localStorage.getItem(LS_OBJ_CLASS_ID) || "";

  try {
    const params = new URLSearchParams(window.location.search || "");
    const objIdFromUrl = getUrlParamValue(params, ["objId", "objectId"]);
    const objClassIdFromUrl = getUrlParamValue(params, ["objClassId", "objektklassenId", "objectClassId"]);

    if (objIdFromUrl) {
      objId = objIdFromUrl;
      localStorage.setItem(LS_OBJ_ID, objId);
    }
    if (objClassIdFromUrl) {
      objClassId = objClassIdFromUrl;
      localStorage.setItem(LS_OBJ_CLASS_ID, objClassId);
    }
  } catch {
    // ignore invalid search params
  }

  if (baseUrl === "https://p-p.portal.tie.ch/rest2/sdapi/0.1") {
    baseUrl = "https://kundenportal.tie.ch/rest2/sdapi/0.1";
    localStorage.setItem(LS_BASE_URL, baseUrl);
  }

  if (baseUrl) document.getElementById("baseUrl").value = baseUrl;
  if (token) document.getElementById("token").value = token;
  if (objId) document.getElementById("objId").value = objId;
  if (nullProfileObjId) document.getElementById("nullProfileObjId").value = nullProfileObjId;
  if (objClassId && document.getElementById("objClassId")) document.getElementById("objClassId").value = objClassId;

  return { token, baseUrl, objId, objClassId };
}

/**
 * Build the URL for auth-service login.
 * Format: <origin>/authenticate/start?application=<app>&path=<path>
 *
 * `application` must match a registered client name in the auth-service config.
 * Once the formulardesigner is registered (success-url pointing to this app's
 * host), auth-service will deliver the JWT via a postbind POST to
 * /authenticate/postbind on this server, and the user will be logged in
 * automatically without having to paste the token.
 *
 * Until then, `application=auth-service` lets the user authenticate at the
 * auth-service cockpit and retrieve the token manually.
 */
function buildAuthServiceUrl(rawBaseUrl, application = "auth-service", path = "/") {
  const value = String(rawBaseUrl || "").trim();
  if (!value) return "";

  try {
    const parsed = new URL(value);
    const params = new URLSearchParams({
      application: "formulardesigner",
      path: "/",
      lang: "DE",
    });
    return `${parsed.origin}/auth-service/authenticate/start?${params.toString()}`;
  } catch {
    return "";
  }
}

// -- Auth flow ------------------------------------------------------------------
// -- Status helpers -------------------------------------------------------------
function showStatus(msg, type = "info") {
  statusBanner.textContent = msg;
  statusBanner.className = `status-banner ${type}`;
}

let centerNoticeTimer = null;

function showCenterNotice(msg, type = "info", timeoutMs = 2000) {
  let notice = document.getElementById("centerNotice");
  if (!notice) {
    notice = document.createElement("div");
    notice.id = "centerNotice";
    notice.className = "center-notice hidden";
    notice.innerHTML = `
      <div class="center-notice-card">
        <p class="center-notice-text" id="centerNoticeText"></p>
      </div>
    `;
    document.body.appendChild(notice);
  }

  const text = notice.querySelector("#centerNoticeText");
  if (text) text.textContent = msg;
  notice.className = `center-notice ${type}`;

  if (centerNoticeTimer) {
    clearTimeout(centerNoticeTimer);
  }
  centerNoticeTimer = setTimeout(() => {
    notice.className = "center-notice hidden";
  }, Math.max(800, Number(timeoutMs) || 2000));
}

function hideStatus() {
  statusBanner.className = "status-banner hidden";
}

function buildNullProfileAttributeOptions(shows) {
  const byAttributeName = new Map();
  (shows || []).forEach((show) => {
    const attributeName = String(show?.attributeName || "").trim();
    if (!attributeName) return;
    const displayName = String(show?.displayName || "").trim();
    if (!byAttributeName.has(attributeName)) {
      byAttributeName.set(attributeName, {
        value: attributeName,
        label: displayName || attributeName,
      });
    }
  });

  return Array.from(byAttributeName.values()).sort((a, b) => a.label.localeCompare(b.label));
}

function fillAttributeNameDropdown(selectedValue = "") {
  if (!editAttributeName) return;
  const selected = String(selectedValue || "");
  const options = appState.nullProfileAttributeOptions || [];

  editAttributeName.innerHTML = "";

  if (!options.length) {
    const fallback = document.createElement("option");
    fallback.value = selected;
    fallback.textContent = selected || "(no nullprofile attributes loaded)";
    editAttributeName.appendChild(fallback);
    editAttributeName.value = selected;
    return;
  }

  options.forEach((option) => {
    const el = document.createElement("option");
    el.value = option.value;
    el.textContent = option.label;
    editAttributeName.appendChild(el);
  });

  const selectedExists = options.some((option) => option.value === selected);
  editAttributeName.value = selectedExists ? selected : options[0].value;
}

function syncNullprofileOptions() {
  appState.nullProfileAttributeOptions = buildNullProfileAttributeOptions(appState.nullProfileShows);
}

function renderDatenkontextList() {
  if (!datenkontextListBody) return;
  datenkontextListBody.innerHTML = "";

  const sorted = (appState.nullProfileShows || [])
    .slice()
    .sort((a, b) => (Number(a.seq) || 0) - (Number(b.seq) || 0));

  sorted.forEach((show) => {
    const row = document.createElement("tr");

    const seqTd = document.createElement("td");
    const seqInput = document.createElement("input");
    seqInput.type = "number";
    seqInput.min = "1";
    seqInput.value = String(Math.max(1, Number(show.seq) || 1));
    seqInput.addEventListener("change", () => {
      show.seq = Math.max(1, Number(seqInput.value) || 1);
      renderDatenkontextList();
      syncNullprofileOptions();
    });
    seqTd.appendChild(seqInput);

    const attrTd = document.createElement("td");
    const attrInput = document.createElement("input");
    attrInput.type = "text";
    attrInput.value = String(show.attributeName || "");
    attrInput.placeholder = "attributeName";
    attrInput.addEventListener("input", () => {
      show.attributeName = attrInput.value;
      syncNullprofileOptions();
    });
    attrTd.appendChild(attrInput);

    const displayTd = document.createElement("td");
    const displayInput = document.createElement("input");
    displayInput.type = "text";
    displayInput.value = String(show.displayName || "");
    displayInput.placeholder = "displayName";
    displayInput.addEventListener("input", () => {
      show.displayName = displayInput.value;
      syncNullprofileOptions();
    });
    displayTd.appendChild(displayInput);

    const actionTd = document.createElement("td");
    const removeBtn = document.createElement("button");
    removeBtn.type = "button";
    removeBtn.className = "secondary";
    removeBtn.textContent = "Entfernen";
    removeBtn.addEventListener("click", () => {
      const idx = appState.nullProfileShows.indexOf(show);
      if (idx >= 0) appState.nullProfileShows.splice(idx, 1);
      renderDatenkontextList();
      syncNullprofileOptions();
    });
    actionTd.appendChild(removeBtn);

    row.appendChild(seqTd);
    row.appendChild(attrTd);
    row.appendChild(displayTd);
    row.appendChild(actionTd);
    datenkontextListBody.appendChild(row);
  });
}

async function loadNullProfileContextByObjId(objId) {
  const token = document.getElementById("token").value.trim();
  const baseUrl = document.getElementById("baseUrl").value.trim();
  const normalizedObjId = String(objId || "").trim();

  if (!normalizedObjId) {
    appState.nullProfileShows = [];
    appState.nullProfileObjId = "";
    appState.nullProfileInvokeData = null;
    appState.nullProfileStepInvokerTemplate = null;
    appState.nullProfileSourceInvoker = null;
    syncNullprofileOptions();
    renderDatenkontextList();
    return;
  }

  const nullProfile = await loadProfileByObjectId(token, baseUrl, normalizedObjId);
  appState.nullProfileInvokeData = nullProfile.invokePayload.data;
  appState.nullProfileStepInvokerTemplate = findStepInvoker(nullProfile.invokePayload.data);
  appState.nullProfileSourceInvoker = nullProfile.invoker || null;
  appState.nullProfileShows = extractShows(appState.nullProfileInvokeData);
  appState.nullProfileObjId = normalizedObjId;
  syncNullprofileOptions();
  renderDatenkontextList();

  const nullProfileObjInput = document.getElementById("nullProfileObjId");
  if (nullProfileObjInput) {
    nullProfileObjInput.value = normalizedObjId;
  }
  if (datenkontextObjId) {
    datenkontextObjId.value = normalizedObjId;
  }
  saveFormToStorage();
}

async function saveNullProfileContextToServer() {
  const token = document.getElementById("token").value.trim();
  const baseUrl = document.getElementById("baseUrl").value.trim();

  if (!token) {
    throw new Error("Token missing.");
  }

  const sourceInvoker = appState.nullProfileSourceInvoker;
  if (!sourceInvoker) {
    throw new Error("Nullprofile invoker context missing. Please load the nullprofile first.");
  }

  let stepInvoker = appState.nullProfileStepInvokerTemplate;
  if (!stepInvoker) {
    stepInvoker = {
      t: "StepInvoker",
      parameters: {},
      shortcut: "NONE",
      stepNo: 1,
    };
  }

  const rawProfile = appState.nullProfileInvokeData?.attributeProfile || appState.nullProfileInvokeData;
  if (!rawProfile || typeof rawProfile !== "object") {
    throw new Error("Nullprofile payload missing.");
  }

  const currentInvokeData = {
    ...cloneJson(rawProfile),
    attributeShows: cloneJson(appState.nullProfileShows || []),
  };

  await saveProfileViaWsapiRefresh({
    token,
    baseUrl,
    sourceInvoker,
    stepInvokerTemplate: stepInvoker,
    currentInvokeData,
  });
}

function fillTagDropdown(selectedValue = "") {
  if (!editTag) return;

  const selected = String(selectedValue || "");
  const showAll = String(editTag.dataset.showAll || "") === "1";
  const primaryOptions = [
    { value: "SELECT", label: "SELECT (Dropdownmenue)" },
    { value: "RADIO", label: "RADIO (Auswahlknoepfe)" },
  ];
  const others = TAG_DROPDOWN_VALUES.filter((value) => value !== "SELECT" && value !== "RADIO");
  const options = showAll
    ? [
        ...primaryOptions,
        ...others.map((value) => ({ value, label: value })),
      ]
    : primaryOptions;

  editTag.innerHTML = "";
  options.forEach(({ value, label }) => {
    const option = document.createElement("option");
    option.value = value;
    option.textContent = label;
    editTag.appendChild(option);
  });

  const knownValues = new Set(options.map((entry) => entry.value));
  if (selected && !knownValues.has(selected)) {
    const extra = document.createElement("option");
    extra.value = selected;
    extra.textContent = `${selected} (current)`;
    editTag.appendChild(extra);
  }

  if (editTagMoreBtn) {
    editTagMoreBtn.hidden = showAll;
  }

  editTag.value = selected || "SELECT";
}

async function loadProfileByObjectId(token, baseUrl, objId) {
  return sdapiClient.loadProfileByObjectId(token, baseUrl, objId);
}

function nowMs() {
  return Date.now();
}

function applyTagPreset(tagValue) {
  fillTagDropdown(tagValue);
  editTag.value = tagValue;
  applyLiveBasicEdit();
}

function promptPopupObjIdCreationIfMissing(field, fieldIndex) {
  if (!field) return false;

  const popupObjId = String(field.popupObjId || "").trim();
  if (/^\d+$/.test(popupObjId)) return false;

  const reasons = [];
  if (!popupObjId) {
    reasons.push("popupObjId ist nicht gesetzt.");
  } else {
    reasons.push("popupObjId muss numerisch sein.");
  }

  appState.pendingConditionalWarningFieldIndex = fieldIndex;
  openConditionalWarningDialog(field, reasons);
  return true;
}

function sanitizeAttributeName(seed) {
  const base = String(seed || "")
    .trim()
    .replace(/\s+/g, "_")
    .replace(/[^A-Za-z0-9_.]/g, "_")
    .replace(/_+/g, "_")
    .replace(/^_+|_+$/g, "")
    .toUpperCase();
  return base || "NEW_FIELD";
}

function resolveShowsArrayTarget(invokeData) {
  if (invokeData?.attributeProfile && Array.isArray(invokeData.attributeProfile.attributeShows)) {
    return invokeData.attributeProfile.attributeShows;
  }
  if (Array.isArray(invokeData?.attributeShows)) {
    return invokeData.attributeShows;
  }
  return null;
}

async function createAndInsertQuickField() {
  if (!appState.invokeData) {
    showStatus("Profil zuerst laden, bevor ein Feld erstellt wird.", "warning");
    return;
  }

  const showsTarget = resolveShowsArrayTarget(appState.invokeData);
  if (!showsTarget) {
    showStatus("attributeShows Struktur wurde nicht gefunden.", "error");
    return;
  }

  const bodyFields = showsTarget.filter((show) => String(show.showType || "").toUpperCase() === "BODY");
  const maxSeq = showsTarget.length ? Math.max(...showsTarget.map((show) => Number(show.seq) || 0)) : 0;
  const maxBottom = bodyFields.length
    ? Math.max(...bodyFields.map((show) => (Number(show.vpos) || 1) + (Number(show.rowspan) || 1) - 1))
    : 0;

  const selectedTag = String(quickAddFieldType?.value || "SELECT").trim().toUpperCase();
  const displayName = String(quickAddDisplayName?.value || "").trim() || `Neues Feld ${maxSeq + 1}`;
  const rawAttributeName = String(quickAddAttributeName?.value || "").trim();
  const candidateBase = sanitizeAttributeName(rawAttributeName || displayName);
  const usedKeys = new Set(showsTarget.map((show) => normalizeAttributeKey(show.attributeName)));

  let attributeName = candidateBase;
  let suffix = 2;
  while (usedKeys.has(normalizeAttributeKey(attributeName))) {
    attributeName = `${candidateBase}_${suffix}`;
    suffix += 1;
  }

  const nextField = {
    seq: maxSeq + 1,
    showType: "BODY",
    hpos: 1,
    vpos: Math.max(1, maxBottom + 1),
    colspan: 1,
    rowspan: 1,
    attributeName,
    displayName,
    tag: selectedTag,
    popupType: "",
    popupObjId: null,
    mandatory: false,
    readonly: false,
    hidden: false,
    persisted: false,
  };

  showsTarget.push(nextField);
  quickAddFieldModal.close();
  renderProfile(appState.invokeData);

  const newIndex = appState.shows.indexOf(nextField);
  if (newIndex >= 0) {
    await openFieldEditor(newIndex);
    if (selectedTag === "SELECT") {
      promptPopupObjIdCreationIfMissing(nextField, newIndex);
    }
  }
  showCenterNotice(`Feld '${displayName}' wurde hinzugefuegt.`, "info", 2000);
}

function insertFieldAtEdge(referenceField, direction) {
  if (!appState.invokeData) return;
  const showsTarget = resolveShowsArrayTarget(appState.invokeData);
  if (!showsTarget) return;

  const fieldShowType = String(referenceField.showType || "BODY").toUpperCase();
  const hpos    = Math.max(1, Number(referenceField.hpos)    || 1);
  const vpos    = Math.max(1, Number(referenceField.vpos)    || 1);
  const colspan = Math.max(1, Number(referenceField.colspan) || 1);
  const rowspan = Math.max(1, Number(referenceField.rowspan) || 1);

  const sameTypeFields = showsTarget.filter(
    (s) => String(s.showType || "").toUpperCase() === fieldShowType
  );

  let newHpos, newVpos;

  if (direction === "top") {
    sameTypeFields.forEach((f) => {
      if ((Number(f.vpos) || 1) >= vpos) f.vpos = (Number(f.vpos) || 1) + 1;
    });
    newHpos = hpos;
    newVpos = vpos;

  } else if (direction === "bottom") {
    const insertVpos = vpos + rowspan;
    sameTypeFields.forEach((f) => {
      if ((Number(f.vpos) || 1) >= insertVpos) f.vpos = (Number(f.vpos) || 1) + 1;
    });
    newHpos = hpos;
    newVpos = insertVpos;

  } else if (direction === "left") {
    sameTypeFields.forEach((f) => {
      if ((Number(f.hpos) || 1) >= hpos) f.hpos = (Number(f.hpos) || 1) + 1;
    });
    newHpos = hpos;
    newVpos = vpos;

  } else { // right
    const insertHpos = hpos + colspan;
    sameTypeFields.forEach((f) => {
      if ((Number(f.hpos) || 1) >= insertHpos) f.hpos = (Number(f.hpos) || 1) + 1;
    });
    newHpos = insertHpos;
    newVpos = vpos;
  }

  const maxSeq = showsTarget.length
    ? Math.max(...showsTarget.map((s) => Number(s.seq) || 0))
    : 0;
  const usedKeys = new Set(showsTarget.map((s) => normalizeAttributeKey(s.attributeName)));
  const displayName = `Neues Feld ${maxSeq + 1}`;
  const base = sanitizeAttributeName(displayName);
  let attributeName = base;
  let suffix = 2;
  while (usedKeys.has(normalizeAttributeKey(attributeName))) {
    attributeName = `${base}_${suffix}`;
    suffix += 1;
  }

  const newField = {
    seq: maxSeq + 1,
    showType: fieldShowType,
    hpos: newHpos,
    vpos: newVpos,
    colspan: 1,
    rowspan: 1,
    attributeName,
    displayName,
    tag: "RICHTEXT",
    popupType: "",
    popupObjId: null,
    mandatory: false,
    readonly: false,
    hidden: false,
    persisted: false,
  };

  showsTarget.push(newField);
  renderProfile(appState.invokeData);

  const newIndex = appState.shows.indexOf(newField);
  if (newIndex >= 0) openFieldEditor(newIndex);
}

function insertFieldBySequence(referenceField, direction) {
  if (!appState.invokeData) return;
  const showsTarget = resolveShowsArrayTarget(appState.invokeData);
  if (!showsTarget) return;

  const showType = String(referenceField.showType || "").toUpperCase();
  if (!showType) return;

  const before = direction === "top" || direction === "left";
  const refSeq = Number(referenceField.seq) || 0;
  const insertSeq = before ? Math.max(1, refSeq) : Math.max(1, refSeq + 1);

  showsTarget.forEach((show) => {
    const seq = Number(show.seq) || 0;
    if (seq >= insertSeq) show.seq = seq + 1;
  });

  const usedKeys = new Set(showsTarget.map((s) => normalizeAttributeKey(s.attributeName)));
  const displayName = `Neues Feld ${insertSeq}`;
  const base = sanitizeAttributeName(displayName);
  let attributeName = base;
  let suffix = 2;
  while (usedKeys.has(normalizeAttributeKey(attributeName))) {
    attributeName = `${base}_${suffix}`;
    suffix += 1;
  }

  const newField = {
    seq: insertSeq,
    showType,
    hpos: Math.max(1, Number(referenceField.hpos) || 1),
    vpos: Math.max(1, Number(referenceField.vpos) || 1),
    colspan: 1,
    rowspan: 1,
    attributeName,
    displayName,
    tag: "RICHTEXT",
    popupType: "",
    popupObjId: null,
    mandatory: false,
    readonly: false,
    hidden: false,
    persisted: false,
  };

  showsTarget.push(newField);
  renderProfile(appState.invokeData);

  const newIndex = appState.shows.indexOf(newField);
  if (newIndex >= 0) openFieldEditor(newIndex);
}

function insertFieldForCard(referenceField, direction) {
  const showType = String(referenceField?.showType || "").toUpperCase();
  if (!referenceField || !showType) return;

  if (showType === "BODY") {
    insertFieldAtEdge(referenceField, direction);
    return;
  }

  insertFieldBySequence(referenceField, direction);
}

function removeFieldFromProfile(field) {
  if (!appState.invokeData) return;
  const showsTarget = resolveShowsArrayTarget(appState.invokeData);
  if (!showsTarget) return;

  const label = field.displayName || field.attributeName || "Feld";
  const isGrouping = String(field.tag || "").toUpperCase() === "GROUPING";
  let fieldsToRemove = [field];

  if (isGrouping) {
    const memberType = getGroupingMemberType(field);
    if (memberType) {
      const members = showsTarget.filter(
        (show) => show !== field && String(show.showType || "").toUpperCase() === memberType
      );
      fieldsToRemove = [field, ...members];
    }
  }

  const msg = isGrouping
    ? `Gruppierung "${label}" wirklich entfernen? (${Math.max(0, fieldsToRemove.length - 1)} enthaltene Felder werden mit entfernt.)`
    : `Feld "${label}" wirklich entfernen?`;
  if (!confirm(msg)) return;

  let removedCount = 0;
  fieldsToRemove.forEach((item) => {
    const idx = showsTarget.indexOf(item);
    if (idx >= 0) {
      showsTarget.splice(idx, 1);
      removedCount += 1;
    }
  });

  if (!removedCount) return;
  if (isGrouping) {
    showCenterNotice(`Gruppierung '${label}' und ${Math.max(0, removedCount - 1)} Felder wurden entfernt.`, "info", 2000);
  } else {
    showCenterNotice(`'${label}' wurde entfernt.`, "info", 2000);
  }
  renderProfile(appState.invokeData);
}

function getGroupingMemberType(field) {
  if (!field || String(field.tag || "").toUpperCase() !== "GROUPING") return "";

  const prefs = parseTagPrefs(field.tagPrefs ?? field.tagPref);
  const direct = String(
    prefs.show_type
      ?? prefs.showType
      ?? prefs.group_show_type
      ?? prefs.groupShowType
      ?? ""
  ).trim();
  if (direct) return direct.toUpperCase();

  for (const [rawKey, rawValue] of Object.entries(prefs)) {
    const key = String(rawKey || "").trim().toLowerCase().replace(/[^a-z0-9_]/g, "");
    if (key === "show_type" || key === "showtype" || key === "group_show_type" || key === "groupshowtype") {
      const value = String(rawValue || "").trim();
      if (value) return value.toUpperCase();
    }
  }

  return "";
}

function insertFieldAtPosition(hpos, vpos) {
  if (!appState.invokeData) return;
  const showsTarget = resolveShowsArrayTarget(appState.invokeData);
  if (!showsTarget) return;

  const maxSeq = showsTarget.length
    ? Math.max(...showsTarget.map((s) => Number(s.seq) || 0))
    : 0;
  const usedKeys = new Set(showsTarget.map((s) => normalizeAttributeKey(s.attributeName)));
  const displayName = `Neues Feld ${maxSeq + 1}`;
  const base = sanitizeAttributeName(displayName);
  let attributeName = base;
  let suffix = 2;
  while (usedKeys.has(normalizeAttributeKey(attributeName))) {
    attributeName = `${base}_${suffix}`;
    suffix += 1;
  }

  const newField = {
    seq: maxSeq + 1,
    showType: "BODY",
    hpos,
    vpos,
    colspan: 1,
    rowspan: 1,
    attributeName,
    displayName,
    tag: "RICHTEXT",
    popupType: "",
    popupObjId: null,
    mandatory: false,
    readonly: false,
    hidden: false,
    persisted: false,
  };

  showsTarget.push(newField);
  renderProfile(appState.invokeData);

  const newIndex = appState.shows.indexOf(newField);
  if (newIndex >= 0) openFieldEditor(newIndex);
}

function removeBodyRow(rowNumber) {
  if (!appState.invokeData) return;
  const showsTarget = resolveShowsArrayTarget(appState.invokeData);
  if (!showsTarget) return;

  const bodyFields = showsTarget.filter((show) => String(show.showType || "").toUpperCase() === "BODY");
  const survivors = [];
  const removed = [];

  bodyFields.forEach((field) => {
    const rect = getFieldRect(field);
    if (rect.top <= rowNumber && rect.bottom >= rowNumber) {
      removed.push(field);
      return;
    }
    if (rect.top > rowNumber) {
      field.vpos = rect.top - 1;
    }
    survivors.push(field);
  });

  removed.forEach((field) => {
    const idx = showsTarget.indexOf(field);
    if (idx >= 0) showsTarget.splice(idx, 1);
  });

  // If a removed BODY field is a grouping container, remove its member cards too.
  const removedMemberTypes = new Set(
    removed
      .map((field) => getGroupingMemberType(field))
      .filter(Boolean)
  );
  if (removedMemberTypes.size) {
    for (let i = showsTarget.length - 1; i >= 0; i -= 1) {
      const showType = String(showsTarget[i]?.showType || "").toUpperCase();
      if (removedMemberTypes.has(showType)) {
        showsTarget.splice(i, 1);
      }
    }
  }

  appState.extraBodyRows = Math.max(0, Number(appState.extraBodyRows || 0) - 1);
  renderProfile(appState.invokeData);
}

function removeBodyColumn(colNumber) {
  if (!appState.invokeData) return;
  const showsTarget = resolveShowsArrayTarget(appState.invokeData);
  if (!showsTarget) return;

  const bodyFields = showsTarget.filter((show) => String(show.showType || "").toUpperCase() === "BODY");
  const removed = [];

  bodyFields.forEach((field) => {
    const rect = getFieldRect(field);
    if (rect.left <= colNumber && rect.right >= colNumber) {
      removed.push(field);
      return;
    }
    if (rect.left > colNumber) {
      field.hpos = rect.left - 1;
    }
  });

  removed.forEach((field) => {
    const idx = showsTarget.indexOf(field);
    if (idx >= 0) showsTarget.splice(idx, 1);
  });

  // If a removed BODY field is a grouping container, remove its member cards too.
  const removedMemberTypes = new Set(
    removed
      .map((field) => getGroupingMemberType(field))
      .filter(Boolean)
  );
  if (removedMemberTypes.size) {
    for (let i = showsTarget.length - 1; i >= 0; i -= 1) {
      const showType = String(showsTarget[i]?.showType || "").toUpperCase();
      if (removedMemberTypes.has(showType)) {
        showsTarget.splice(i, 1);
      }
    }
  }

  const currentCols = Math.max(1, Number(appState.manualBodyCols || appState.formGridCols || 1));
  appState.manualBodyCols = Math.max(1, currentCols - 1);
  renderProfile(appState.invokeData);
}

// -- Tab switching --------------------------------------------------------------
document.querySelectorAll(".tab").forEach((tab) => {
  tab.addEventListener("click", () => {
    document.querySelectorAll(".tab").forEach((t) => t.classList.remove("active"));
    tab.classList.add("active");
    const pane = tab.getAttribute("data-tab");
    document.querySelectorAll(".tab-pane").forEach((p) => p.classList.add("hidden"));
    document.getElementById("tab" + pane.charAt(0).toUpperCase() + pane.slice(1)).classList.remove("hidden");
  });
});

document.querySelectorAll("th[data-sort-key]").forEach((th) => {
  th.addEventListener("click", () => {
    const key = th.getAttribute("data-sort-key");
    if (!key) return;
    if (appState.tableSort.key === key) {
      appState.tableSort.dir = appState.tableSort.dir === "asc" ? "desc" : "asc";
    } else {
      appState.tableSort.key = key;
      appState.tableSort.dir = "asc";
    }
    if (appState.invokeData) renderProfile(appState.invokeData);
  });
});

function switchEditorTab(name) {
  document.querySelectorAll(".field-editor-tab").forEach((t) => {
    t.classList.toggle("active", t.getAttribute("data-editor-tab") === name);
  });
  editorBasicPane.classList.toggle("hidden", name !== "basic");
  editorExpertPane.classList.toggle("hidden", name !== "expert");
}

document.querySelectorAll(".field-editor-tab").forEach((tab) => {
  tab.addEventListener("click", () => {
    switchEditorTab(tab.getAttribute("data-editor-tab"));
  });
});

// -- Reset ----------------------------------------------------------------------
resetBtn.addEventListener("click", () => {
  profileSection.classList.add("hidden");
  inputSection.classList.remove("hidden");
  hideStatus();
});

if (authServiceBtn) {
  authServiceBtn.addEventListener("click", () => {
    const baseUrlInput = document.getElementById("baseUrl");
    const authUrl = buildAuthServiceUrl(baseUrlInput?.value);
    if (!authUrl) {
      showStatus("Bitte zuerst eine gueltige Base URL eingeben.", "warning");
      return;
    }
    saveFormToStorage();
    sessionStorage.setItem("tie_auth_login_started_at", String(Date.now()));
    window.location.assign(authUrl);
  });
}

if (sampleProfileBtn) {
  sampleProfileBtn.addEventListener("click", () => {
    const objInput = document.getElementById("objId");
    const nullObjInput = document.getElementById("nullProfileObjId");
    if (objInput) objInput.value = "31020273396";
    if (nullObjInput) nullObjInput.value = "31027726487";
    saveFormToStorage();
    showCenterNotice("Beispielattributprofile Werte wurden eingetragen.", "info", 1700);
  });
}

// -- Escape HTML ----------------------------------------------------------------
function esc(val) {
  return String(val === null || val === undefined ? "" : val)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

// -- Geometry helpers -----------------------------------------------------------
function getFieldRect(field) {
  const h = Math.max(1, Number(field.hpos) || 1);
  const v = Math.max(1, Number(field.vpos) || 1);
  const c = Math.max(1, Number(field.colspan) || 1);
  const r = Math.max(1, Number(field.rowspan) || 1);
  return { left: h, top: v, right: h + c - 1, bottom: v + r - 1 };
}

function intersects(a, b) {
  return !(a.right < b.left || b.right < a.left || a.bottom < b.top || b.bottom < a.top);
}

function normalizeFieldPosition(field, maxCols) {
  const colspan = Math.max(1, Number(field.colspan) || 1);
  const maxLeft = Math.max(1, maxCols - colspan + 1);
  field.hpos = Math.max(1, Math.min(maxLeft, Number(field.hpos) || 1));
  field.vpos = Math.max(1, Number(field.vpos) || 1);
}

// Push overlapping fields down until there are no collisions.
function resolveNoOverlap(fields, pinnedField, maxCols) {
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

function getOrCreateSnapIndicator(gridElement) {
  if (!appState.snapIndicatorEl) {
    const node = document.createElement("div");
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
  if (appState.snapIndicatorEl) {
    appState.snapIndicatorEl.classList.add("hidden");
  }
}

function clearPushPreview() {
  document.querySelectorAll(".field-card.push-preview").forEach((el) => {
    el.classList.remove("push-preview");
  });
}

function showPushPreview(indices) {
  clearPushPreview();
  indices.forEach((idx) => {
    const card = document.querySelector(`.field-card[data-field-index="${idx}"]`);
    if (card) card.classList.add("push-preview");
  });
}

function simulatePushPreview(pool, movedField, nextH, nextV, maxCols) {
  const clones = pool.map((f) => ({
    __idx: appState.shows.indexOf(f),
    hpos: Number(f.hpos) || 1,
    vpos: Number(f.vpos) || 1,
    colspan: Number(f.colspan) || 1,
    rowspan: Number(f.rowspan) || 1,
  }));

  const movedIdx = appState.shows.indexOf(movedField);
  const movedClone = clones.find((c) => c.__idx === movedIdx);
  if (!movedClone) return [];

  movedClone.hpos = nextH;
  movedClone.vpos = nextV;
  resolveNoOverlap(clones, movedClone, maxCols);

  return clones
    .filter((c) => c.__idx !== movedIdx)
    .filter((c) => {
      const original = appState.shows[c.__idx];
      return original && (Number(original.vpos) !== c.vpos || Number(original.hpos) !== c.hpos);
    })
    .map((c) => c.__idx);
}

function showSnapIndicator(gridElement, localH, localV, colspan, rowspan, maxCols) {
  const indicator = getOrCreateSnapIndicator(gridElement);
  const rect = gridElement.getBoundingClientRect();
  const colWidth = rect.width / Math.max(1, maxCols);
  const gap = 8;

  const h = Math.max(1, Math.min(maxCols, localH));
  const v = Math.max(1, localV);

  indicator.style.left = `${(h - 1) * colWidth}px`;
  indicator.style.top = `${(v - 1) * appState.dragRowHeight}px`;
  indicator.style.width = `${Math.max(10, colWidth * Math.max(1, colspan) - gap)}px`;
  indicator.style.height = `${Math.max(10, appState.dragRowHeight * Math.max(1, rowspan) - gap)}px`;
  indicator.classList.remove("hidden");
}

function moveFieldToGridPosition(field, gridElement, event, maxCols, minH = 1, minV = 1) {
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
  appState.dragFieldIndex = index;
  appState.dragging = true;
  event.dataTransfer.setData("text/plain", String(index));
  event.dataTransfer.effectAllowed = "move";
  event.currentTarget.classList.add("is-dragging");
}

function endDragField(event) {
  event.currentTarget.classList.remove("is-dragging");
  appState.dragging = false;
  appState.dragFieldIndex = -1;
  appState.dragSuppressClickUntil = nowMs() + 140;
  formGrid.classList.remove("drop-target-active");
  hideSnapIndicator();
  clearPushPreview();
}

// -- Field editor ---------------------------------------------------------------
function generateExpertFormControls(field) {
  const container = document.getElementById('expertFormControls');
  container.innerHTML = '';
  
  const sortedKeys = Object.keys(field).sort();
  
  sortedKeys.forEach((key) => {
    const value = field[key];
    const label = document.createElement('label');
    label.textContent = key;
    label.htmlFor = `expert_${key}`;
    
    let input;
    if (typeof value === 'boolean') {
      input = document.createElement('input');
      input.type = 'checkbox';
      input.id = `expert_${key}`;
      input.checked = value;
    } else if (typeof value === 'number') {
      input = document.createElement('input');
      input.type = 'number';
      input.id = `expert_${key}`;
      input.value = value;
    } else {
      input = document.createElement('input');
      input.type = 'text';
      input.id = `expert_${key}`;
      input.value = value || '';
    }
    
    if (typeof value === 'boolean') {
      const checkLabel = document.createElement('label');
      checkLabel.className = 'editor-checkbox';
      checkLabel.appendChild(input);
      checkLabel.appendChild(document.createTextNode(` ${key}`));
      container.appendChild(checkLabel);
    } else {
      container.appendChild(label);
      container.appendChild(input);
      input.addEventListener('input', applyLiveExpertFormEdit);
      input.addEventListener('change', applyLiveExpertFormEdit);
    }
  });
}

async function openFieldEditor(index) {
  const field = appState.shows[index];
  if (!field) return;

  appState.selectedFieldIndex = index;
  switchEditorTab("basic");

  fieldEditorMeta.textContent = `${field.showType || "?"} | seq ${field.seq ?? "-"} | tag ${field.tag || "-"}`;

  // Basic tab
  fillAttributeNameDropdown(field.attributeName || "");
  editDisplayName.value = field.displayName || "";
  editTag.dataset.showAll = "0";
  fillTagDropdown(field.tag || "");
  editPopupType.value = field.popupType || "";
  editPopupObjId.value = field.popupObjId || "";
  editMandatory.checked = Boolean(field.mandatory);
  editReadonly.checked = Boolean(field.readonly);
  editHidden.checked = Boolean(field.hidden);
  editPersisted.checked = Boolean(field.persisted);
  appState.conditionalEditor.cachedListObjId = "";
  refreshConditionalTagPrefControls(field);

  // Expert tab - dynamically generate all field controls
  generateExpertFormControls(field);

  await initConditionalEditorForField(field);

  editFieldJson.value = JSON.stringify(field, null, 2);
  fieldEditorModal.showModal();
}

async function applyFieldEditorChanges() {
  const index = appState.selectedFieldIndex;
  if (index < 0) return;

  let field = appState.shows[index];
  if (!field) return;

  if (!editorBasicPane.classList.contains("hidden")) {
    // Basic tab - update from form inputs
    field.attributeName = editAttributeName.value.trim();
    field.displayName = editDisplayName.value;
    field.tag = editTag.value.trim();
    field.popupType = editPopupType.value.trim();
    field.popupObjId = editPopupObjId.value ? Number(editPopupObjId.value) : null;
    field.mandatory = editMandatory.checked;
    field.readonly = editReadonly.checked;
    field.hidden = editHidden.checked;
    field.persisted = editPersisted.checked;
  } else {
    // Expert tab - parse JSON and apply
    let parsed;
    try {
      parsed = JSON.parse(editFieldJson.value);
    } catch {
      showStatus("Expert JSON is invalid. Please fix JSON before saving.", "error");
      return;
    }
    appState.shows[index] = parsed;
    field = parsed;

    if (appState.invokeData?.attributeProfile && Array.isArray(appState.invokeData.attributeProfile.attributeShows)) {
      appState.invokeData.attributeProfile.attributeShows[index] = parsed;
    } else if (Array.isArray(appState.invokeData?.attributeShows)) {
      appState.invokeData.attributeShows[index] = parsed;
    }
  }

  try {
    await ensureMandatoryConditionalValueList(field);
  } catch (error) {
    showStatus(`Conditional value list create failed: ${error.message}`, "error");
    return;
  }

  editFieldJson.value = JSON.stringify(field, null, 2);

  try {
    await persistConditionalDependencies();
  } catch (error) {
    showStatus(`Conditional save failed: ${error.message}`, "error");
    return;
  }

  renderProfile(appState.invokeData);
  fieldEditorModal.close();
}

function applyLiveBasicEdit() {
  const idx = appState.selectedFieldIndex;
  if (idx < 0) return;
  const field = appState.shows[idx];
  if (!field) return;
  field.attributeName = editAttributeName.value.trim();
  field.displayName = editDisplayName.value;
  field.tag = editTag.value.trim();
  field.popupType = editPopupType.value.trim();
  field.popupObjId = editPopupObjId.value ? Number(editPopupObjId.value) : null;
  field.mandatory = editMandatory.checked;
  field.readonly = editReadonly.checked;
  field.hidden = editHidden.checked;
  field.persisted = editPersisted.checked;
  refreshConditionalTagPrefControls(field);
  if (appState.invokeData) renderProfile(appState.invokeData);
}

function getConditionalValueListObjId(field) {
  const prefs = parseTagPrefs(field?.tagPrefs ?? field?.tagPref);
  return String(prefs.conditionalValueList || prefs.conditional_value_list || "").trim();
}

function refreshConditionalTagPrefControls(field) {
  if (!editTagPrefReadonly) return;
  const rawTagPref = field?.tagPrefs ?? field?.tagPref;
  if (rawTagPref && typeof rawTagPref === "object") {
    editTagPrefReadonly.value = JSON.stringify(rawTagPref);
  } else {
    editTagPrefReadonly.value = String(rawTagPref || "");
  }
}

async function createMissingConditionalValueListForSelectedField() {
  const idx = appState.selectedFieldIndex;
  if (idx < 0) return;
  const field = appState.shows[idx];
  if (!field) return;

  const existingObjId = getConditionalValueListObjId(field);
  if (existingObjId) {
    showStatus(`conditionalValueList ${existingObjId} ist bereits gesetzt.`, "info");
    return;
  }

  const creation = await createConditionalValueListForField(field);
  setFieldConditionalValueListReference(field, creation.createdObjId);
  refreshConditionalTagPrefControls(field);
  editFieldJson.value = JSON.stringify(field, null, 2);

  await initConditionalEditorForField(field);
  editConditionalField.checked = true;
  syncConditionalConfigVisibility();

  showCenterNotice(`Abhaengige Felder Liste erstellt: ${creation.createdObjId}`, "info", 2200);
}

function applyLiveExpertFormEdit() {
  const idx = appState.selectedFieldIndex;
  if (idx < 0) return;
  const field = appState.shows[idx];
  if (!field) return;

  // Gather values from all dynamically generated form inputs
  const container = document.getElementById('expertFormControls');
  const inputs = container.querySelectorAll('input');
  
  inputs.forEach((input) => {
    const key = input.id.replace('expert_', '');
    if (input.type === 'checkbox') {
      field[key] = input.checked;
    } else if (input.type === 'number') {
      field[key] = input.value ? Number(input.value) : null;
    } else {
      field[key] = input.value || null;
    }
  });

  // Update JSON to match form changes
  editFieldJson.value = JSON.stringify(field, null, 2);
  
  if (appState.invokeData) renderProfile(appState.invokeData);
}

cancelEditorBtn.addEventListener("click", () => fieldEditorModal.close());
saveEditorBtn.addEventListener("click", () => {
  void applyFieldEditorChanges();
});

if (presetSelectBtn) {
  presetSelectBtn.addEventListener("click", async () => {
    applyTagPreset("SELECT");

    const idx = appState.selectedFieldIndex;
    const field = idx >= 0 ? appState.shows[idx] : null;
    promptPopupObjIdCreationIfMissing(field, idx);
  });
}

if (presetRichtextBtn) {
  presetRichtextBtn.addEventListener("click", () => {
    applyTagPreset("RICHTEXT");
  });
}

if (presetRadioBtn) {
  presetRadioBtn.addEventListener("click", () => {
    applyTagPreset("RADIO");
  });
}

if (editTagMoreBtn) {
  editTagMoreBtn.addEventListener("click", () => {
    editTag.dataset.showAll = "1";
    fillTagDropdown(editTag.value || "SELECT");
    editTag.focus();
  });
}

editConditionalField.addEventListener("change", async () => {
  const idx = appState.selectedFieldIndex;
  const field = idx >= 0 ? appState.shows[idx] : null;

  if (!editConditionalField.checked) {
    if (field) {
      const currentListObjId = getConditionalValueListObjId(field);
      if (currentListObjId) {
        appState.conditionalEditor.cachedListObjId = currentListObjId;
        removeConditionalValueListReference(field);
        refreshConditionalTagPrefControls(field);
        editFieldJson.value = JSON.stringify(field, null, 2);
      }
    }
    resetConditionalEditorState();
    syncConditionalConfigVisibility();
    return;
  }

  if (!field) {
    editConditionalField.checked = false;
    syncConditionalConfigVisibility();
    return;
  }

  const eligibility = evaluateConditionalEligibility(field);
  if (!eligibility.ok) {
    editConditionalField.checked = false;
    syncConditionalConfigVisibility();
    showStatus(eligibility.reasons[0], "warning");
    return;
  }

  const existingListObjId = getConditionalValueListObjId(field);
  if (existingListObjId) {
    await initConditionalEditorForField(field);
  } else {
    appState.conditionalEditor.enabled = true;
    if (conditionalValueListInput) {
      conditionalValueListInput.value = appState.conditionalEditor.cachedListObjId || "";
    }
    syncConditionalConfigVisibility();
  }
});

conditionalChoiceSelect.addEventListener("change", () => {
  appState.conditionalEditor.selectedKey = conditionalChoiceSelect.value;
  updateConditionalChoiceMeta();
});

conditionalDepsBtn.addEventListener("click", () => {
  void openConditionalDepsModal();
});
cancelConditionalDepsBtn.addEventListener("click", () => conditionalDepsModal.close());
saveConditionalDepsBtn.addEventListener("click", applyConditionalDepsSelection);
if (conditionalAddChoiceBtn) {
  conditionalAddChoiceBtn.addEventListener("click", () => {
    void addConditionalChoiceFromSourceValue();
  });
}
cancelConditionalWarningBtn.addEventListener("click", () => conditionalWarningModal.close());

createValueListBtn.addEventListener("click", async () => {
  const fieldIndex = appState.pendingConditionalWarningFieldIndex;
  try {
    createValueListBtn.disabled = true;
    await openValueListCreateDialogForField(fieldIndex);
    conditionalWarningModal.close();
  } catch (error) {
    showStatus(`Value list creation setup failed: ${error.message}`, "error");
  } finally {
    createValueListBtn.disabled = false;
  }
});

if (confirmConditionalValueListBtn) {
  confirmConditionalValueListBtn.addEventListener("click", async () => {
    const idx = appState.selectedFieldIndex;
    const field = idx >= 0 ? appState.shows[idx] : null;
    if (!field) return;
    const enteredId = String(conditionalValueListInput?.value || "").trim();
    if (!enteredId || !/^\d+$/.test(enteredId)) {
      showStatus("Bitte eine gueltige numerische ID eingeben.", "warning");
      return;
    }
    setFieldConditionalValueListReference(field, enteredId);
    refreshConditionalTagPrefControls(field);
    editFieldJson.value = JSON.stringify(field, null, 2);
    await initConditionalEditorForField(field);
    syncConditionalConfigVisibility();
  });
}

if (createNewConditionalValueListBtn) {
  createNewConditionalValueListBtn.addEventListener("click", async () => {
    const idx = appState.selectedFieldIndex;
    const field = idx >= 0 ? appState.shows[idx] : null;
    if (!field) return;
    try {
      createNewConditionalValueListBtn.disabled = true;
      createNewConditionalValueListBtn.textContent = "Erstelle Liste ...";
      const creation = await createConditionalValueListForField(field);
      setFieldConditionalValueListReference(field, creation.createdObjId);
      refreshConditionalTagPrefControls(field);
      editFieldJson.value = JSON.stringify(field, null, 2);
      await initConditionalEditorForField(field);
      syncConditionalConfigVisibility();
      showCenterNotice(`Abhaengige Felder Liste erstellt: ${creation.createdObjId}`, "info", 2200);
    } catch (error) {
      showStatus(`Neue Liste erstellen fehlgeschlagen: ${error.message}`, "error");
    } finally {
      createNewConditionalValueListBtn.disabled = false;
      createNewConditionalValueListBtn.textContent = "Neue Liste erstellen";
    }
  });
}

cancelValueListCreateBtn.addEventListener("click", () => valueListCreateModal.close());
saveValueListCreateBtn.addEventListener("click", async () => {
  try {
    saveValueListCreateBtn.disabled = true;
    await submitValueListCreation();
    valueListCreateModal.close();
  } catch (error) {
    showStatus(`Value list creation failed: ${error.message}`, "error");
  } finally {
    saveValueListCreateBtn.disabled = false;
  }
});

cancelPopupEntryBtn.addEventListener("click", () => {
  popupEntryModal.close();
  appState.popupEntryDraft = { show: null, selectEl: null, addBtnEl: null };
});

savePopupEntryBtn.addEventListener("click", async () => {
  const draft = appState.popupEntryDraft;
  const show = draft.show;
  const sel = draft.selectEl;
  const addBtn = draft.addBtnEl;

  if (!show || !show.popupObjId) {
    showStatus("Kein gueltiges popupObjId fuer neuen Eintrag gefunden.", "error");
    return;
  }

  const value = String(popupEntryValue.value || "").trim();
  const description = String(popupEntryDescription.value || "").trim();
  if (!value) {
    showStatus("Bitte einen Wert eingeben.", "warning");
    popupEntryValue.focus();
    return;
  }

  try {
    savePopupEntryBtn.disabled = true;
    if (addBtn) addBtn.disabled = true;

    const createPayload = await createPopupEntryViaSdapiFlow(show.popupObjId, value, description);

    const items = await sdapiClient.loadValueListNoCache(show.popupObjId);
    clearObjListLookupCache(show.popupObjId);

    if (sel) {
      if (!items.length) {
        sel.innerHTML = '<option>(no items)</option>';
      } else {
        sel.innerHTML = items
          .map((item) => `<option value="${esc(item.value)}">${esc(item.label)}</option>`)
          .join("");
      }
    }

    const newObjId = String(createPayload?.newObjId || "").trim();
    if (sel) {
      if (newObjId) {
        sel.value = newObjId;
      } else {
        const match = items.find((item) => String(item.label || "").trim().toUpperCase() === value.toUpperCase());
        if (match) sel.value = match.value;
      }
    }

    const selectedLabel = sel?.selectedOptions?.[0]?.textContent || description || value;
    appState.previewValues[normalizeAttributeKey(show.attributeName)] = {
      value: sel?.value || newObjId || value,
      label: selectedLabel,
    };

    popupEntryModal.close();
    appState.popupEntryDraft = { show: null, selectEl: null, addBtnEl: null };
    const bulkInfo = Array.isArray(createPayload?.stepResponse?.data?.bulk)
      ? createPayload.stepResponse.data.bulk.find((entry) => String(entry?.t || "").toUpperCase() === "STATUSMESSAGE2")
      : null;
    const infoText = String(bulkInfo?.message || "").trim();
    const newObjIdInfo = String(createPayload?.newObjId || "").trim();
    const details = [infoText, newObjIdInfo ? `newObjId=${newObjIdInfo}` : ""].filter(Boolean).join(" | ");
    const successMessage = details ? `Eintrag '${value}' wurde erstellt. ${details}` : `Eintrag '${value}' wurde erstellt.`;
    showStatus(successMessage, "info");
    showCenterNotice(successMessage, "info", 2000);
    if (appState.invokeData) renderProfile(appState.invokeData);
  } catch (error) {
    const errEl = document.getElementById("popupEntryError");
    if (errEl) {
      errEl.textContent = error.message;
      errEl.hidden = false;
    } else {
      showStatus(`Eintrag konnte nicht erstellt werden: ${error.message}`, "error");
    }
  } finally {
    savePopupEntryBtn.disabled = false;
    if (addBtn) addBtn.disabled = false;
  }
});

[editAttributeName, editDisplayName, editTag, editPopupType, editPopupObjId, editMandatory, editReadonly, editHidden, editPersisted].forEach((el) => {
  el.addEventListener("input", applyLiveBasicEdit);
  el.addEventListener("change", applyLiveBasicEdit);
});

editFieldJson.addEventListener("input", () => {
  if (editorExpertPane.classList.contains("hidden")) return;
  try {
    const parsed = JSON.parse(editFieldJson.value);
    const idx = appState.selectedFieldIndex;
    if (idx >= 0 && appState.shows[idx]) {
      appState.shows[idx] = parsed;
      if (appState.invokeData?.attributeProfile && Array.isArray(appState.invokeData.attributeProfile.attributeShows)) {
        appState.invokeData.attributeProfile.attributeShows[idx] = parsed;
      } else if (Array.isArray(appState.invokeData?.attributeShows)) {
        appState.invokeData.attributeShows[idx] = parsed;
      }
      // Regenerate form controls to reflect JSON changes
      generateExpertFormControls(parsed);
    }
    if (appState.invokeData) renderProfile(appState.invokeData);
  } catch {
    // keep controls unchanged while JSON is incomplete
  }
});

if (cancelQuickAddFieldBtn && quickAddFieldModal) {
  cancelQuickAddFieldBtn.addEventListener("click", () => quickAddFieldModal.close());
}

if (saveQuickAddFieldBtn) {
  saveQuickAddFieldBtn.addEventListener("click", () => {
    void createAndInsertQuickField();
  });
}

if (datenkontextBtn && datenkontextModal) {
  datenkontextBtn.addEventListener("click", async () => {
    const nullProfileObjInput = document.getElementById("nullProfileObjId");
    const candidateObjId = String(appState.nullProfileObjId || nullProfileObjInput?.value || "").trim();
    if (datenkontextObjId) {
      datenkontextObjId.value = candidateObjId;
    }
    if (!appState.nullProfileShows.length && candidateObjId) {
      try {
        await loadNullProfileContextByObjId(candidateObjId);
      } catch (error) {
        showStatus(`Nullprofile could not be loaded: ${error.message}`, "warning");
      }
    } else {
      renderDatenkontextList();
    }
    datenkontextModal.showModal();
  });
}

if (loadDatenkontextBtn) {
  loadDatenkontextBtn.addEventListener("click", async () => {
    const objId = String(datenkontextObjId?.value || "").trim();
    try {
      await loadNullProfileContextByObjId(objId);
      showCenterNotice("Nullprofile Datenkontext geladen.", "info", 1500);
    } catch (error) {
      showStatus(`Nullprofile could not be loaded: ${error.message}`, "warning");
    }
  });
}

function createNullprofileDraftShow(nextSeq) {
  const bodyTemplate = appState.nullProfileShows.find((show) => String(show?.showType || "").toUpperCase() === "BODY")
    || appState.nullProfileShows[0]
    || {};

  const fallbackField = {
    t: "AttributeShowDO",
    checker: "NONE",
    colspan: 1,
    datatype: "TEXT",
    defaultValue: null,
    defaultValueL1: null,
    defaultValueL2: null,
    defaultValueL3: null,
    descr: null,
    displayNameL1: "default Wert",
    displayNameL2: "default Wert",
    displayNameL3: "default Wert",
    displayNameWidth: 32,
    format: null,
    hpos: 1,
    mandatory: false,
    hidden: false,
    readonly: false,
    persisted: true,
    pageNr: 0,
    popupDialogprefs: null,
    popupMandatory: "NO",
    popupObjId: 0,
    popupP1: null,
    popupProfileId: null,
    popupType: "NONE",
    reference: null,
    rowspan: 1,
    serverChecker: null,
    tag: "TEXT",
    tagPref: "NONE",
    vpos: nextSeq,
    valueStmtId: 0,
    xmlElementName: null,
    alignment: "LEFT",
    info: null,
    infoL1: null,
    infoL2: null,
    infoL3: null,
    systemAttributeName: null,
    code: null,
    codeSystem: null,
  };

  const usedNames = new Set(appState.nullProfileShows.map((show) => normalizeAttributeKey(show?.attributeName)));
  let attributeName = `sys_attribute.new_${nextSeq}`;
  let suffix = 2;
  while (usedNames.has(normalizeAttributeKey(attributeName))) {
    attributeName = `sys_attribute.new_${nextSeq}_${suffix}`;
    suffix += 1;
  }

  return {
    ...fallbackField,
    ...cloneJson(bodyTemplate || {}),
    t: "AttributeShowDO",
    seq: nextSeq,
    showType: "BODY",
    attributeName,
    displayName: `Neues Feld ${nextSeq}`,
    popupObjId: bodyTemplate?.popupObjId ?? 0,
    xmlElementName: null,
  };
}

if (addDatenkontextRowBtn) {
  addDatenkontextRowBtn.addEventListener("click", () => {
    const maxSeq = appState.nullProfileShows.length
      ? Math.max(...appState.nullProfileShows.map((show) => Number(show.seq) || 0))
      : 0;
    appState.nullProfileShows.push(createNullprofileDraftShow(maxSeq + 1));
    renderDatenkontextList();
    syncNullprofileOptions();
  });
}

if (closeDatenkontextBtn && datenkontextModal) {
  closeDatenkontextBtn.addEventListener("click", () => datenkontextModal.close());
}

if (saveDatenkontextBtn) {
  saveDatenkontextBtn.addEventListener("click", async () => {
    try {
      if (datenkontextStatus) datenkontextStatus.textContent = "Nullprofile wird gespeichert ...";
      saveDatenkontextBtn.disabled = true;
      await saveNullProfileContextToServer();
      if (datenkontextStatus) datenkontextStatus.textContent = "Nullprofile erfolgreich ueber wsapi/call gespeichert (nicht ueber SDAPI).";
      showCenterNotice("Nullprofile gespeichert: wsapi/call verwendet (SDAPI Edit-Support noch offen).", "info", 2200);
    } catch (error) {
      if (datenkontextStatus) datenkontextStatus.textContent = `Speichern fehlgeschlagen: ${error.message}`;
      showStatus(`Nullprofile speichern fehlgeschlagen: ${error.message}`, "error");
    } finally {
      saveDatenkontextBtn.disabled = false;
    }
  });
}

// -- Data extraction ------------------------------------------------------------
function findInvoker(data, methodName) {
  if (!data || typeof data !== "object") return null;
  if (data.methodName === methodName) return data;

  for (const val of Object.values(data)) {
    if (Array.isArray(val)) {
      for (const item of val) {
        const found = findInvoker(item, methodName);
        if (found) return found;
      }
    } else if (val && typeof val === "object") {
      const found = findInvoker(val, methodName);
      if (found) return found;
    }
  }
  return null;
}

function findStepInvoker(data) {
  if (!data || typeof data !== "object") return null;

  if (data.t === "StepInvoker") return data;
  if (data.stepInvoker && typeof data.stepInvoker === "object") return data.stepInvoker;
  if (data.txnId && data.stepNo !== undefined && data.objId !== undefined && data.activityId !== undefined) return data;

  for (const val of Object.values(data)) {
    if (Array.isArray(val)) {
      for (const item of val) {
        const found = findStepInvoker(item);
        if (found) return found;
      }
    } else if (val && typeof val === "object") {
      const found = findStepInvoker(val);
      if (found) return found;
    }
  }
  return null;
}

function findAttributeValues(data) {
  if (!data || typeof data !== "object") return null;

  if (data.attributeValues && typeof data.attributeValues === "object" && !Array.isArray(data.attributeValues)) {
    return data.attributeValues;
  }

  for (const val of Object.values(data)) {
    if (Array.isArray(val)) {
      for (const item of val) {
        const found = findAttributeValues(item);
        if (found) return found;
      }
    } else if (val && typeof val === "object") {
      const found = findAttributeValues(val);
      if (found) return found;
    }
  }

  return null;
}

function extractShows(data) {
  if (!data || typeof data !== "object") return [];

  if (data.attributeProfile && Array.isArray(data.attributeProfile.attributeShows)) {
    return data.attributeProfile.attributeShows;
  }

  if (Array.isArray(data.attributeShows)) {
    return data.attributeShows;
  }

  for (const val of Object.values(data)) {
    if (val && typeof val === "object") {
      const found = extractShows(val);
      if (found.length) return found;
    }
  }

  return [];
}

function cloneJson(value) {
  return JSON.parse(JSON.stringify(value));
}

function findObjectByType(data, typeName) {
  if (!data || typeof data !== "object") return null;
  if (data.t === typeName) return data;

  for (const val of Object.values(data)) {
    if (Array.isArray(val)) {
      for (const item of val) {
        const found = findObjectByType(item, typeName);
        if (found) return found;
      }
    } else if (val && typeof val === "object") {
      const found = findObjectByType(val, typeName);
      if (found) return found;
    }
  }

  return null;
}

async function postWsapiCall(token, baseUrl, payload) {
  const response = await fetch(`/api/wsapi-call?baseUrl=${encodeURIComponent(baseUrl)}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(payload),
  });

  const text = await response.text();
  let parsed = {};
  try {
    parsed = JSON.parse(text || "{}");
  } catch {
    parsed = { raw: text };
  }

  if (!response.ok || !parsed.ok) {
    const status = parsed.status || response.status;
    throw new Error(parsed.error || `Save failed (HTTP ${status}).`);
  }

  return parsed;
}

function normalizeProfileSaveId(value) {
  const numeric = Number(value);
  if (Number.isFinite(numeric) && numeric > 0) return numeric;
  return value;
}

function buildProfileRefreshInvoker(profileId) {
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

function normalizeAttributeShowsForSave(attributeShows) {
  if (!Array.isArray(attributeShows)) return [];
  return attributeShows.map((field) => {
    const nextField = cloneJson(field || {});
    if (nextField.popupObjId === null || nextField.popupObjId === undefined || String(nextField.popupObjId).trim() === "") {
      nextField.popupObjId = 0;
    }
    return nextField;
  });
}

function mergeEditedAttributeProfile(freshData, editedProfile) {
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

async function saveProfileViaWsapiRefresh({ token, baseUrl, sourceInvoker, stepInvokerTemplate, currentInvokeData }) {
  const editedProfile = currentInvokeData?.attributeProfile || currentInvokeData;
  if (!editedProfile || typeof editedProfile !== "object") {
    throw new Error("Attribute profile payload missing.");
  }

  const profileId = editedProfile.id ?? stepInvokerTemplate?.objId ?? sourceInvoker?.objId;
  if (!profileId) {
    throw new Error("Attribute profile id missing.");
  }

  const refreshResponse = await postWsapiCall(token, baseUrl, buildProfileRefreshInvoker(profileId));
  const freshData = refreshResponse.data;
  const freshStepInvoker = findStepInvoker(freshData);
  if (!freshStepInvoker || !freshStepInvoker.txnId) {
    throw new Error("Fresh txnId missing in wsapi response.");
  }

  const payload = {
    ...cloneJson(freshStepInvoker),
    t: "StepInvoker",
    shortcut: freshStepInvoker.shortcut || "NONE",
    objId: freshStepInvoker.objId ?? stepInvokerTemplate?.objId ?? sourceInvoker?.objId ?? normalizeProfileSaveId(profileId),
    activityId: freshStepInvoker.activityId ?? stepInvokerTemplate?.activityId ?? sourceInvoker?.activityId ?? 10070052,
    parentId: freshStepInvoker.parentId ?? stepInvokerTemplate?.parentId ?? sourceInvoker?.parentId ?? 10090021,
    methodId: freshStepInvoker.methodId ?? stepInvokerTemplate?.methodId ?? sourceInvoker?.methodId ?? 10010098,
    stepNo: freshStepInvoker.stepNo ?? stepInvokerTemplate?.stepNo ?? 1,
    parameters: { APEDIT: mergeEditedAttributeProfile(freshData, editedProfile) },
  };

  return postWsapiCall(token, baseUrl, payload);
}

function extractProfileName(data) {
  if (!data) return "(unknown)";
  if (data.attributeProfile?.name) return data.attributeProfile.name;
  if (data.name) return data.name;
  return "(unnamed profile)";
}

function parseTagPrefs(rawPrefs) {
  if (!rawPrefs) return {};
  if (typeof rawPrefs === "object") return rawPrefs;

  const prefs = {};
  const chunks = String(rawPrefs)
    .replace(/[;,\n]/g, " ")
    .split(/\s+/)
    .map((s) => s.trim())
    .filter(Boolean);

  chunks.forEach((entry) => {
    const parts = entry.split("=");
    if (parts.length < 2) return;
    const key = parts[0].trim();
    const value = parts.slice(1).join("=").trim();
    if (key) prefs[key] = value;
  });

  return prefs;
}

function serializeTagPrefs(rawPrefs, prefs) {
  if (rawPrefs && typeof rawPrefs === "object") return prefs;

  return Object.entries(prefs || {})
    .filter(([key]) => String(key || "").trim())
    .map(([key, value]) => `${key}=${value}`)
    .join(" ");
}

function setFieldConditionalValueListReference(field, listObjId) {
  const nextObjId = String(listObjId || "").trim();
  if (!field || !nextObjId) return;

  const prefersTagPrefs = field.tagPrefs !== undefined || field.tagPref === undefined;
  const targetKey = prefersTagPrefs ? "tagPrefs" : "tagPref";
  const rawPrefs = field[targetKey];
  const parsedPrefs = { ...parseTagPrefs(rawPrefs) };
  const conditionalKey = Object.prototype.hasOwnProperty.call(parsedPrefs, "conditional_value_list")
    ? "conditional_value_list"
    : "conditionalValueList";

  parsedPrefs[conditionalKey] = nextObjId;
  field[targetKey] = serializeTagPrefs(rawPrefs, parsedPrefs);
}

function removeConditionalValueListReference(field) {
  if (!field) return;
  const prefersTagPrefs = field.tagPrefs !== undefined || field.tagPref === undefined;
  const targetKey = prefersTagPrefs ? "tagPrefs" : "tagPref";
  const rawPrefs = field[targetKey];
  const parsedPrefs = { ...parseTagPrefs(rawPrefs) };
  delete parsedPrefs.conditionalValueList;
  delete parsedPrefs.conditional_value_list;
  field[targetKey] = serializeTagPrefs(rawPrefs, parsedPrefs);
}

function normalizeMethodName(name) {
  return String(name || "").trim().toLowerCase().replace(/\s+/g, "");
}

function findInvokerByMethods(data, candidates) {
  const wanted = candidates.map(normalizeMethodName);

  function walk(node) {
    if (!node || typeof node !== "object") return null;
    if (Array.isArray(node)) {
      for (const item of node) {
        const found = walk(item);
        if (found) return found;
      }
      return null;
    }

    const methodName = normalizeMethodName(node.methodName);
    if (methodName && wanted.includes(methodName)) {
      return node;
    }

    for (const value of Object.values(node)) {
      const found = walk(value);
      if (found) return found;
    }
    return null;
  }

  return walk(data);
}

function splitSpaceSeparatedDependencies(raw) {
  return String(raw || "")
    .split(/\s+/)
    .map((entry) => normalizeAttributeKey(entry))
    .filter(Boolean);
}

function extractConditionalListItems(data) {
  const results = [];

  function walk(node) {
    if (!node || typeof node !== "object") return;
    if (Array.isArray(node)) {
      node.forEach(walk);
      return;
    }

    if (String(node.t || "").toUpperCase() === "OBJLIST" && Array.isArray(node.items)) {
      const attrNames = Array.isArray(node.attrNames) ? node.attrNames.map((name) => String(name || "").trim()) : [];
      const normalizedHeaders = attrNames.map((name) => name.toLowerCase());
      const keyIndex = normalizedHeaders.findIndex((name) => ["bezeichnung", "key", "name", "anzeigewert"].includes(name));
      const valueIndex = normalizedHeaders.findIndex((name) => ["beschreibung", "value", "description", "descr"].includes(name));
      const resolvedKeyIndex = keyIndex >= 0 ? keyIndex : 0;
      const resolvedValueIndex = valueIndex >= 0 ? valueIndex : -1;

      node.items.forEach((item) => {
        const isValueList = String(item?.objclass?.type || "").toUpperCase() === "VALUE_LIST";
        if (!isValueList || !Array.isArray(item.attrValues)) return;

        const keyName = attrNames[resolvedKeyIndex] || "bezeichnung";
        const valueName = valueIndex >= 0 ? (attrNames[resolvedValueIndex] || "beschreibung") : "beschreibung";
        const key = String(item.attrValues[resolvedKeyIndex] || item.objName || item.obj_name || "").trim();
        if (!key) return;

        const rawDependencies = resolvedValueIndex >= 0
          ? String(item.attrValues[resolvedValueIndex] || "").trim()
          : "";
        results.push({
          key,
          objId: item.objId,
          objName: String(item.objName || item.obj_name || key).trim(),
          keyAttributeName: keyName,
          dependencyAttributeName: valueName,
          dependencyRawValue: rawDependencies,
          dependencies: splitSpaceSeparatedDependencies(rawDependencies),
        });
      });
    }

    Object.values(node).forEach(walk);
  }

  walk(data);
  return results;
}

function cloneDependenciesMap(source) {
  const out = {};
  Object.entries(source || {}).forEach(([key, value]) => {
    out[key] = Array.isArray(value) ? [...value] : [];
  });
  return out;
}

function areDependenciesEqual(a, b) {
  const left = Array.isArray(a) ? [...a].sort() : [];
  const right = Array.isArray(b) ? [...b].sort() : [];
  return left.length === right.length && left.every((entry, idx) => entry === right[idx]);
}

function getProfileAttributeOptions() {
  return appState.shows
    .map((show) => {
      const key = normalizeAttributeKey(show.attributeName);
      if (!key) return null;
      return {
        key,
        attributeName: String(show.attributeName || "").trim(),
        label: String(show.displayName || show.attributeName || key).trim(),
      };
    })
    .filter(Boolean)
    .sort((a, b) => a.label.localeCompare(b.label));
}

function resolveDependencyAttributeName(normalizedKey) {
  const wanted = normalizeAttributeKey(normalizedKey);
  if (!wanted) return "";
  const match = appState.shows.find((show) => normalizeAttributeKey(show?.attributeName) === wanted);
  return String(match?.attributeName || normalizedKey || "").trim();
}

function updateConditionalChoiceMeta() {
  const state = appState.conditionalEditor;
  if (!state.enabled || !state.selectedKey) {
    conditionalChoiceMeta.textContent = "";
    return;
  }
  const deps = state.dependenciesByKey[state.selectedKey] || [];
  conditionalChoiceMeta.textContent = `${deps.length} dependent field${deps.length === 1 ? "" : "s"} selected`;
}

function renderConditionalChoiceOptions() {
  const state = appState.conditionalEditor;
  conditionalChoiceSelect.innerHTML = "";

  state.items.forEach((item) => {
    const option = document.createElement("option");
    option.value = item.key;
    option.textContent = item.objName || item.key;
    conditionalChoiceSelect.appendChild(option);
  });

  if (!state.items.length) {
    const fallback = document.createElement("option");
    fallback.value = "";
    fallback.textContent = "(no entries found)";
    conditionalChoiceSelect.appendChild(fallback);
  }

  const firstKey = state.items[0]?.key || "";
  state.selectedKey = state.selectedKey && state.dependenciesByKey[state.selectedKey] ? state.selectedKey : firstKey;
  conditionalChoiceSelect.value = state.selectedKey;
  conditionalDepsBtn.disabled = !state.listObjId;
  updateConditionalChoiceMeta();
}

function resetConditionalEditorState() {
  const cachedListObjId = appState.conditionalEditor.cachedListObjId || "";
  appState.conditionalEditor = {
    enabled: false,
    listObjId: "",
    cachedListObjId,
    sourceOptions: [],
    items: [],
    selectedKey: "",
    dependenciesByKey: {},
    originalDependenciesByKey: {},
    dirtyKeys: new Set(),
  };
  conditionalChoiceSelect.innerHTML = "";
  conditionalChoiceMeta.textContent = "";
  conditionalDepsBtn.disabled = true;
}

function syncConditionalConfigVisibility() {
  const checked = editConditionalField.checked;
  conditionalConfig.classList.toggle("hidden", !checked);
  if (!checked) return;

  const hasListObjId = Boolean(appState.conditionalEditor.listObjId);
  if (conditionalSetupSection) conditionalSetupSection.classList.toggle("hidden", hasListObjId);
  if (conditionalChoiceSection) conditionalChoiceSection.classList.toggle("hidden", !hasListObjId);
}

function collectObjListItems(data) {
  const out = [];

  function walk(node) {
    if (!node || typeof node !== "object") return;
    if (Array.isArray(node)) {
      node.forEach(walk);
      return;
    }

    if (String(node.t || "").toUpperCase() === "OBJLIST" && Array.isArray(node.items)) {
      out.push(...node.items);
    }

    Object.values(node).forEach(walk);
  }

  walk(data);
  return out;
}

function hasValueListInObjListInvokeResponse(data) {
  let foundObjList = false;
  let foundValueList = false;

  function walk(node) {
    if (!node || typeof node !== "object" || foundValueList) return;
    if (Array.isArray(node)) {
      node.forEach(walk);
      return;
    }

    const nodeType = String(node.t || "").trim().toUpperCase();
    if (nodeType === "OBJLIST" && Array.isArray(node.items)) {
      foundObjList = true;
      const hasMatch = node.items.some(
        (item) => String(item?.objclass?.type || "").trim().toUpperCase() === "VALUE_LIST"
      );
      if (hasMatch) {
        foundValueList = true;
        return;
      }
    }

    Object.values(node).forEach(walk);
  }

  walk(data);
  return { foundObjList, foundValueList };
}

function clearObjListLookupCache(objId) {
  const key = String(objId || "").trim();
  if (!key) return;
  delete appState.objListCache[key];
  delete appState.valueListCache[key];
  delete appState.conditionalListCache[key];
}

function evaluateTagForConditional(field) {
  const tag = String(field?.tag || "").trim().toUpperCase();
  if (tag === "SELECT" || tag === "RADIO") {
    return { ok: true, tag };
  }
  return { ok: false, tag };
}

function evaluateConditionalEligibility(field) {
  const tagCheck = evaluateTagForConditional(field);
  const popupObjId = String(field?.popupObjId || "").trim();
  const ok = tagCheck.ok && /^\d+$/.test(popupObjId) && popupObjId !== "0";
  return {
    ok,
    popupObjId,
    reasons: ok ? [] : ["Keine Optionen zur Verfügung für Bedingtes Feld. Konfigurieren sie zuerst eine Auswahlliste (tag=SELECT oder RADIO mit popupObjId)."],
  };
}

function renderConditionalWarningReasons(reasons) {
  conditionalWarningReasons.innerHTML = "";
  if (!reasons.length) {
    const row = document.createElement("p");
    row.textContent = "Unbekannter Validierungsfehler.";
    conditionalWarningReasons.appendChild(row);
    return;
  }

  reasons.forEach((reason) => {
    const row = document.createElement("p");
    row.textContent = `• ${reason}`;
    conditionalWarningReasons.appendChild(row);
  });
}

function openConditionalWarningDialog(field, reasons) {
  const label = String(field?.displayName || field?.attributeName || "(ohne Name)");
  conditionalWarningMeta.textContent = `Feld: ${label}`;
  renderConditionalWarningReasons(reasons);
  conditionalWarningModal.showModal();
}

function findCreateValueListInvoker(data, allowedReferences = ["CREATE_CLI_SPEC_VALUELIST"]) {
  const allowed = new Set((allowedReferences || []).map((ref) => String(ref || "").trim().toUpperCase()));

  function walk(node) {
    if (!node || typeof node !== "object") return null;
    if (Array.isArray(node)) {
      for (const item of node) {
        const found = walk(item);
        if (found) return found;
      }
      return null;
    }

    const methodName = normalizeMethodName(node.methodName);
    const reference = String(node.reference || "").trim().toUpperCase();
    if (methodName === normalizeMethodName("Object.Create()") && allowed.has(reference)) {
      return node;
    }

    for (const value of Object.values(node)) {
      const found = walk(value);
      if (found) return found;
    }
    return null;
  }

  return walk(data);
}

function findInvokerByPredicate(data, predicate) {
  function walk(node) {
    if (!node || typeof node !== "object") return null;
    if (Array.isArray(node)) {
      for (const item of node) {
        const found = walk(item);
        if (found) return found;
      }
      return null;
    }

    if (predicate(node)) return node;

    for (const value of Object.values(node)) {
      const found = walk(value);
      if (found) return found;
    }
    return null;
  }

  return walk(data);
}

function findInvokersByMethodsAll(data, candidates) {
  const wanted = candidates.map(normalizeMethodName);
  const found = [];

  function walk(node) {
    if (!node || typeof node !== "object") return;
    if (Array.isArray(node)) {
      node.forEach(walk);
      return;
    }

    const methodName = normalizeMethodName(node.methodName);
    if (methodName && wanted.includes(methodName)) {
      found.push(node);
    }

    Object.values(node).forEach(walk);
  }

  walk(data);
  return found;
}

function invokerIdentityKey(invoker) {
  return [
    String(invoker?.objId ?? ""),
    String(invoker?.activityId ?? ""),
    String(invoker?.methodId ?? ""),
    String(invoker?.parentId ?? ""),
    String(invoker?.reference ?? ""),
    String(invoker?.methodName ?? ""),
  ].join("|");
}

async function discoverCreateValueListInvoker(rootObjId, allowedReferences = ["CREATE_CLI_SPEC_VALUELIST"]) {
  const menuQueue = [String(rootObjId)];
  const visitedMenus = new Set();
  const objListInvokerQueue = [];
  const seenInvokerKeys = new Set();

  function enqueueObjListInvokers(data) {
    const invokers = findInvokersByMethodsAll(data, ["Object.ObjList()"]);
    invokers.forEach((invoker) => {
      const key = invokerIdentityKey(invoker);
      if (seenInvokerKeys.has(key)) return;
      seenInvokerKeys.add(key);
      objListInvokerQueue.push(invoker);
    });
  }

  function enqueueMenuObjIds(data) {
    findObjectIdCandidates(data).forEach((candidateId) => {
      const id = String(candidateId || "").trim();
      if (!id || visitedMenus.has(id)) return;
      if (!menuQueue.includes(id)) menuQueue.push(id);
    });
  }

  while (menuQueue.length || objListInvokerQueue.length) {
    while (menuQueue.length) {
      const objId = menuQueue.shift();
      if (!objId || visitedMenus.has(objId)) continue;
      visitedMenus.add(objId);

      const menuPayload = await sdapiClient.fetchMenuForObject(objId);
      const fromMenu = findCreateValueListInvoker(menuPayload.data, allowedReferences);
      if (fromMenu) {
        return { createInvoker: fromMenu, source: `menu:${objId}` };
      }

      enqueueObjListInvokers(menuPayload.data);
      enqueueMenuObjIds(menuPayload.data);
    }

    if (!objListInvokerQueue.length) break;

    const invoker = objListInvokerQueue.shift();
    const invokePayload = await sdapiClient.invokeInvoker(invoker);

    const fromInvoke = findCreateValueListInvoker(invokePayload.data, allowedReferences);
    if (fromInvoke) {
      return {
        createInvoker: fromInvoke,
        source: `invoke:${invoker.methodName || "Object.ObjList()"}:${invoker.objId}`,
      };
    }

    enqueueObjListInvokers(invokePayload.data);
    enqueueMenuObjIds(invokePayload.data);
  }

  throw new Error(
    `Object.Create() with reference ${allowedReferences.join(" | ")} was not found after menu and ObjList traversal.`
  );
}

async function discoverInvokerFromRoot(rootObjId, predicate, traversedMethodNames = ["Object.ObjList()"] ) {
  const menuQueue = [String(rootObjId)];
  const visitedMenus = new Set();
  const invokeQueue = [];
  const seenInvokerKeys = new Set();

  function enqueueTraversalInvokers(data) {
    const invokers = findInvokersByMethodsAll(data, traversedMethodNames);
    invokers.forEach((invoker) => {
      const key = invokerIdentityKey(invoker);
      if (seenInvokerKeys.has(key)) return;
      seenInvokerKeys.add(key);
      invokeQueue.push(invoker);
    });
  }

  function enqueueMenuObjIds(data) {
    findObjectIdCandidates(data).forEach((candidateId) => {
      const id = String(candidateId || "").trim();
      if (!id || visitedMenus.has(id)) return;
      if (!menuQueue.includes(id)) menuQueue.push(id);
    });
  }

  while (menuQueue.length || invokeQueue.length) {
    while (menuQueue.length) {
      const objId = menuQueue.shift();
      if (!objId || visitedMenus.has(objId)) continue;
      visitedMenus.add(objId);

      const menuPayload = await sdapiClient.fetchMenuForObject(objId);
      const matchedMenuInvoker = findInvokerByPredicate(menuPayload.data, predicate);
      if (matchedMenuInvoker) {
        return { invoker: matchedMenuInvoker, source: `menu:${objId}` };
      }

      enqueueTraversalInvokers(menuPayload.data);
      enqueueMenuObjIds(menuPayload.data);
    }

    if (!invokeQueue.length) break;

    const invoker = invokeQueue.shift();
    const invokePayload = await sdapiClient.invokeInvoker(invoker);
    const matchedInvokeInvoker = findInvokerByPredicate(invokePayload.data, predicate);
    if (matchedInvokeInvoker) {
      return {
        invoker: matchedInvokeInvoker,
        source: `invoke:${invoker.methodName || traversedMethodNames[0] || "method"}:${invoker.objId}`,
      };
    }

    enqueueTraversalInvokers(invokePayload.data);
    enqueueMenuObjIds(invokePayload.data);
  }

  throw new Error("Requested invoker was not found after menu and traversal flow.");
}

function setParameterObjectValue(entry, nextValue) {
  if (!entry || typeof entry !== "object") {
    return {
      t: "StringDO",
      internalValue: String(nextValue || ""),
      displayValue: String(nextValue || ""),
    };
  }

  const value = String(nextValue || "");
  if ("valueL0" in entry) entry.valueL0 = value;
  if ("internalValue" in entry) entry.internalValue = value;
  if ("displayValue" in entry) entry.displayValue = value;
  if ("value" in entry) entry.value = value;

  if (!("valueL0" in entry) && !("internalValue" in entry) && !("value" in entry)) {
    entry.internalValue = value;
    entry.displayValue = value;
  }

  return entry;
}

function findAllParameterKeys(parameters, patterns) {
  return Object.keys(parameters || {}).filter((key) => patterns.some((pattern) => pattern.test(key)));
}

function fillCreateEntryStepParameters(parameters, value, description) {
  const result = JSON.parse(JSON.stringify(parameters || {}));
  const updatedKeys = [];

  const valuePatterns = [/bezeichnung/i, /anzeigewert/i, /obj_name/i, /(^|\.)name(\[|$)/i, /(^|\.)value(\[|$)/i];
  const descriptionPatterns = [/beschreibung/i, /description/i, /descr/i];

  const valueKeys = findAllParameterKeys(result, valuePatterns);
  const descriptionKeys = findAllParameterKeys(result, descriptionPatterns);

  valueKeys.forEach((key) => {
    result[key] = setParameterObjectValue(result[key], value);
    updatedKeys.push(key);
  });

  const descriptionValue = String(description || value || "");
  descriptionKeys.forEach((key) => {
    result[key] = setParameterObjectValue(result[key], descriptionValue);
    updatedKeys.push(key);
  });

  if (!updatedKeys.length) {
    const firstKey = Object.keys(result)[0];
    if (firstKey) {
      result[firstKey] = setParameterObjectValue(result[firstKey], value);
      updatedKeys.push(firstKey);
    } else {
      result.VALUE = setParameterObjectValue(null, value);
      updatedKeys.push("VALUE");
    }
  }

  return { parameters: result, updatedKeys: Array.from(new Set(updatedKeys)) };
}

function fillValueListCreateParameters(parameters, field) {
  const result = JSON.parse(JSON.stringify(parameters || {}));
  const baseName = String(field?.displayName || field?.attributeName || "Conditional Value List").trim();
  const description = `${baseName} conditionalValueList`;

  const namePatterns = [/bezeichnung/i, /anzeigewert/i, /obj_name/i, /(^|\.)name(\[|$)/i];
  const descriptionPatterns = [/beschreibung/i, /description/i, /descr/i];

  findAllParameterKeys(result, namePatterns).forEach((key) => {
    result[key] = setParameterObjectValue(result[key], baseName);
  });

  findAllParameterKeys(result, descriptionPatterns).forEach((key) => {
    result[key] = setParameterObjectValue(result[key], description);
  });

  return result;
}

async function createConditionalValueListForField(field) {
  const discovery = await discoverCreateValueListInvoker(
    VALUE_LIST_TEMPLATE_FOLDER_OBJ_ID,
    ["CREATE_CLI_SPEC_CVL_VALUELIST"]
  );
  const createInvoker = discovery.createInvoker;

  const invokePayload = await sdapiClient.invokeInvoker(createInvoker);
  const stepInvoker = findStepInvoker(invokePayload.data);
  if (!stepInvoker || typeof stepInvoker !== "object") {
    throw new Error("StepInvoker fehlt in der Create-Antwort.");
  }

  const attributeValues = findAttributeValues(invokePayload.data);
  const parametersTemplate = attributeValues && typeof attributeValues === "object"
    ? JSON.parse(JSON.stringify(attributeValues))
    : JSON.parse(JSON.stringify(stepInvoker.parameters || {}));

  const submitPayload = await sdapiClient.submitStep(
    {
      ...stepInvoker,
      parameters: fillValueListCreateParameters(parametersTemplate, field),
    },
    "/{objId}/{activityId}/{parentId}/step"
  );

  const createdObjId = findLikelyCreatedValueListObjId(submitPayload?.data);
  if (!createdObjId) {
    throw new Error("VALUE_LIST create step completed but no newObjId was returned.");
  }

  return {
    createdObjId,
    discoverySource: discovery.source,
  };
}

async function ensureMandatoryConditionalValueList(field) {
  if (!field?.mandatory) return "";

  const prefs = parseTagPrefs(field.tagPrefs ?? field.tagPref);
  const existingObjId = String(prefs.conditionalValueList || prefs.conditional_value_list || "").trim();
  if (existingObjId) return existingObjId;

  const creation = await createConditionalValueListForField(field);
  setFieldConditionalValueListReference(field, creation.createdObjId);
  await initConditionalEditorForField(field);

  showStatus(`conditionalValueList ${creation.createdObjId} wurde fuer Pflichtfeld angelegt.`, "info");
  return creation.createdObjId;
}

async function createPopupEntryViaSdapiFlow(popupObjId, value, description) {
  const menuPayload = await sdapiClient.fetchMenuForObject(popupObjId);
  const createInvoker = findInvokerByPredicate(
    menuPayload.data,
    (node) => normalizeMethodName(node?.methodName) === normalizeMethodName("Object.Create()")
  );
  if (!createInvoker) {
    throw new Error(`Object.Create() not found in menu for popupObjId ${popupObjId}.`);
  }

  const invokePayload = await sdapiClient.invokeInvoker(createInvoker);
  const stepInvoker = findStepInvoker(invokePayload.data);
  if (!stepInvoker || typeof stepInvoker !== "object") {
    throw new Error("StepInvoker missing in Object.Create() response.");
  }

  const attributeValues = findAttributeValues(invokePayload.data);
  const baseParameters = attributeValues && typeof attributeValues === "object"
    ? attributeValues
    : (stepInvoker.parameters || {});

  const { parameters, updatedKeys } = fillCreateEntryStepParameters(baseParameters, value, description);
  const payload = {
    ...stepInvoker,
    parameters,
  };

  const stepResponse = await sdapiClient.submitStep(payload, "/{objId}/{activityId}/{parentId}/step");
  return {
    invokePayload,
    stepResponse,
    updatedKeys,
    newObjId: findLikelyCreatedValueListObjId(stepResponse?.data),
  };
}

function findObjectIdCandidates(data) {
  const ids = new Set();

  function walk(node) {
    if (!node || typeof node !== "object") return;
    if (Array.isArray(node)) {
      node.forEach(walk);
      return;
    }

    if (node.objId !== undefined && node.objId !== null && /^\d+$/.test(String(node.objId))) {
      ids.add(String(node.objId));
    }

    Object.values(node).forEach(walk);
  }

  walk(data);
  return Array.from(ids);
}

function findLikelyCreatedValueListObjId(data) {
  const bulkEntries = Array.isArray(data?.bulk) ? data.bulk : [];
  const objectCreateEntry = bulkEntries.find((entry) =>
    String(entry?.t || "").toUpperCase() === "OBJECTCREATE" && /^\d+$/.test(String(entry?.newObjId || ""))
  );
  if (objectCreateEntry) {
    return String(objectCreateEntry.newObjId);
  }

  const created = [];

  function walk(node) {
    if (!node || typeof node !== "object") return;
    if (Array.isArray(node)) {
      node.forEach(walk);
      return;
    }

    const itemType = String(node?.objclass?.type || node?.type || "").toUpperCase();
    if (itemType === "VALUE_LIST" && node.objId !== undefined && node.objId !== null) {
      created.push(String(node.objId));
    }

    Object.values(node).forEach(walk);
  }

  walk(data);
  if (created.length) return created[0];

  const candidates = findObjectIdCandidates(data).filter((id) => id !== VALUE_LIST_TEMPLATE_FOLDER_OBJ_ID);
  return candidates[0] || "";
}

function renderValueListCreateFields(parameters) {
  valueListCreateFields.innerHTML = "";

  const entries = Object.entries(parameters || {});
  if (!entries.length) {
    const hint = document.createElement("p");
    hint.className = "profile-meta";
    hint.textContent = "Keine editierbaren Attribute im StepInvoker gefunden.";
    valueListCreateFields.appendChild(hint);
    return;
  }

  entries.forEach(([key, value]) => {
    const wrap = document.createElement("div");
    wrap.className = "value-list-create-field";

    const label = document.createElement("label");
    label.htmlFor = `valueListParam_${key}`;
    label.textContent = key;

    const input = document.createElement("input");
    input.type = "text";
    input.id = `valueListParam_${key}`;
    input.setAttribute("data-param-key", key);
    input.value = getParameterObjectValue(value);

    const typeHint = document.createElement("code");
    typeHint.textContent = String(value?.t || "unknown");

    wrap.appendChild(label);
    wrap.appendChild(input);
    wrap.appendChild(typeHint);
    valueListCreateFields.appendChild(wrap);
  });
}

async function openValueListCreateDialogForField(fieldIndex) {
  const field = appState.shows[fieldIndex];
  if (!field) return;

  valueListCreateMeta.textContent = `Lade Create-Template aus Ordner ${VALUE_LIST_TEMPLATE_FOLDER_OBJ_ID} ...`;

  const discovery = await discoverCreateValueListInvoker(
    VALUE_LIST_TEMPLATE_FOLDER_OBJ_ID,
    ["CREATE_CLI_SPEC_VALUELIST"]
  );
  const createInvoker = discovery.createInvoker;

  const invokePayload = await sdapiClient.invokeInvoker(createInvoker);
  const stepInvoker = findStepInvoker(invokePayload.data);
  if (!stepInvoker || typeof stepInvoker !== "object") {
    throw new Error("StepInvoker fehlt in der Create-Antwort.");
  }

  const attributeValues = findAttributeValues(invokePayload.data);
  const parametersTemplate = attributeValues && typeof attributeValues === "object"
    ? JSON.parse(JSON.stringify(attributeValues))
    : JSON.parse(JSON.stringify(stepInvoker.parameters || {}));

  appState.valueListCreation = {
    fieldIndex,
    createInvoker,
    stepInvokerTemplate: JSON.parse(JSON.stringify(stepInvoker)),
    parametersTemplate,
    responseData: invokePayload.data,
  };

  const fieldName = String(field.displayName || field.attributeName || "(ohne Name)");
  valueListCreateMeta.textContent = `Feld: ${fieldName} | Ordner: ${VALUE_LIST_TEMPLATE_FOLDER_OBJ_ID} | Quelle: ${discovery.source}`;
  renderValueListCreateFields(parametersTemplate);
  valueListCreateModal.showModal();
}

async function submitValueListCreation() {
  const draft = appState.valueListCreation;
  if (!draft || draft.fieldIndex < 0 || !draft.stepInvokerTemplate) {
    throw new Error("Kein Value-List Create-Entwurf aktiv.");
  }

  const stepInvoker = JSON.parse(JSON.stringify(draft.stepInvokerTemplate));
  const parameters = JSON.parse(JSON.stringify(draft.parametersTemplate || {}));

  Array.from(valueListCreateFields.querySelectorAll("input[data-param-key]")).forEach((input) => {
    const key = input.getAttribute("data-param-key");
    if (!key) return;
    parameters[key] = setParameterObjectValue(parameters[key], input.value);
  });

  stepInvoker.parameters = parameters;
  const submitPayload = await sdapiClient.submitStep(stepInvoker, "/{objId}/{activityId}/{parentId}/step");

  const createdObjId = findLikelyCreatedValueListObjId(submitPayload?.data);
  if (createdObjId && appState.selectedFieldIndex === draft.fieldIndex) {
    editPopupObjId.value = createdObjId;
    const field = appState.shows[draft.fieldIndex];
    const currentTag = evaluateTagForConditional(field);
    if (!currentTag.ok) {
      editTag.value = "SELECT";
    }
    applyLiveBasicEdit();
  }

  showStatus(
    createdObjId
      ? `VALUE_LIST object created (${createdObjId}). popupObjId was prefilled.`
      : "VALUE_LIST create step sent successfully.",
    "info"
  );
}

async function initConditionalEditorForField(field) {
  resetConditionalEditorState();
  refreshConditionalTagPrefControls(field);

  const prefs = parseTagPrefs(field.tagPrefs ?? field.tagPref);
  const listObjId = String(prefs.conditionalValueList || prefs.conditional_value_list || "").trim();
  const hasConditionalList = Boolean(listObjId);

  editConditionalField.checked = hasConditionalList;
  editConditionalField.disabled = false;

  if (!hasConditionalList) {
    conditionalChoiceMeta.textContent = "No conditionalValueList defined in tagPrefs.";
    refreshConditionalTagPrefControls(field);
    syncConditionalConfigVisibility();
    return;
  }

  appState.conditionalEditor.enabled = true;
  appState.conditionalEditor.listObjId = listObjId;

  try {
    const objListData = await loadObjListData(listObjId);
    const items = extractConditionalListItems(objListData);
    const dependenciesByKey = {};
    items.forEach((item) => {
      dependenciesByKey[item.key] = [...item.dependencies];
    });

    appState.conditionalEditor.items = items;
    appState.conditionalEditor.dependenciesByKey = dependenciesByKey;
    appState.conditionalEditor.originalDependenciesByKey = cloneDependenciesMap(dependenciesByKey);
    renderConditionalChoiceOptions();
  } catch (error) {
    conditionalChoiceMeta.textContent = `Failed to load conditional list: ${error.message}`;
    appState.conditionalEditor.enabled = false;
  }

  syncConditionalConfigVisibility();
  refreshConditionalTagPrefControls(field);
}

async function openConditionalDepsModal() {
  const state = appState.conditionalEditor;
  const selectedKey = conditionalChoiceSelect.value;
  state.selectedKey = selectedKey;
  conditionalDepsList.innerHTML = "";

  const idx = appState.selectedFieldIndex;
  const field = idx >= 0 ? appState.shows[idx] : null;
  const popupObjId = String(field?.popupObjId || "").trim();

  if (conditionalNewChoiceSelect) {
    conditionalNewChoiceSelect.innerHTML = "";
  }
  state.sourceOptions = [];

  if (conditionalAddChoiceBtn) conditionalAddChoiceBtn.disabled = true;
  if (conditionalAddChoiceMeta) conditionalAddChoiceMeta.textContent = "";

  if (popupObjId && /^\d+$/.test(popupObjId)) {
    try {
      const sourceOptions = await loadValueList(popupObjId);
      state.sourceOptions = Array.isArray(sourceOptions) ? sourceOptions : [];
      if (conditionalNewChoiceSelect) {
        state.sourceOptions.forEach((option) => {
          const entry = document.createElement("option");
          entry.value = String(option.value || option.label || "");
          entry.textContent = String(option.label || option.value || "");
          conditionalNewChoiceSelect.appendChild(entry);
        });
      }
      if (conditionalAddChoiceBtn) conditionalAddChoiceBtn.disabled = !state.sourceOptions.length;
      if (conditionalAddChoiceMeta) {
        conditionalAddChoiceMeta.textContent = state.sourceOptions.length
          ? "Wert aus Dropdown waehlen und als neuen Conditional Choice uebernehmen."
          : "Im Dropdown sind keine Werte verfuegbar.";
      }
    } catch (error) {
      if (conditionalAddChoiceMeta) {
        conditionalAddChoiceMeta.textContent = `Dropdown-Werte konnten nicht geladen werden: ${error.message}`;
      }
      if (conditionalAddChoiceBtn) conditionalAddChoiceBtn.disabled = true;
    }
  } else if (conditionalAddChoiceMeta) {
    conditionalAddChoiceMeta.textContent = "popupObjId fehlt. Bitte zuerst eine Auswahlliste konfigurieren.";
  }

  if (!selectedKey) {
    conditionalDepsMeta.textContent = "Select a choice first.";
    conditionalDepsModal.showModal();
    return;
  }

  const selectedItem = state.items.find((item) => item.key === selectedKey);
  conditionalDepsMeta.textContent = `Choice: ${selectedItem?.objName || selectedKey}`;

  const selectedDeps = new Set(state.dependenciesByKey[selectedKey] || []);
  const attributeOptions = getProfileAttributeOptions();

  attributeOptions.forEach((option) => {
    const row = document.createElement("label");
    row.className = "editor-checkbox";

    const checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    checkbox.value = option.key;
    checkbox.checked = selectedDeps.has(option.key);

    row.appendChild(checkbox);
    row.appendChild(document.createTextNode(` ${option.label} (${option.key})`));
    conditionalDepsList.appendChild(row);
  });

  conditionalDepsModal.showModal();
}

async function addConditionalChoiceFromSourceValue() {
  const state = appState.conditionalEditor;
  if (!state.listObjId) {
    showStatus("Keine conditionalValueList gesetzt.", "warning");
    return;
  }

  const selectedLabel = String(conditionalNewChoiceSelect?.selectedOptions?.[0]?.textContent || "").trim();
  if (!selectedLabel) {
    showStatus("Bitte zuerst einen Dropdown-Wert waehlen.", "warning");
    return;
  }

  const existing = state.items.find((item) => String(item.key || "").trim().toUpperCase() === selectedLabel.toUpperCase());
  if (existing) {
    state.selectedKey = existing.key;
    conditionalChoiceSelect.value = existing.key;
    await openConditionalDepsModal();
    return;
  }

  const idx = appState.selectedFieldIndex;
  const field = idx >= 0 ? appState.shows[idx] : null;
  if (!field) return;

  try {
    if (conditionalAddChoiceBtn) conditionalAddChoiceBtn.disabled = true;
    await createPopupEntryViaSdapiFlow(state.listObjId, selectedLabel, selectedLabel);
    clearObjListLookupCache(state.listObjId);
    await initConditionalEditorForField(field);

    const matched = appState.conditionalEditor.items.find(
      (item) => String(item.key || "").trim().toUpperCase() === selectedLabel.toUpperCase()
    );
    if (matched) {
      appState.conditionalEditor.selectedKey = matched.key;
      conditionalChoiceSelect.value = matched.key;
    }

    await openConditionalDepsModal();
    showCenterNotice(`Choice '${selectedLabel}' wurde hinzugefuegt.`, "info", 1800);
  } catch (error) {
    showStatus(`Choice konnte nicht erstellt werden: ${error.message}`, "error");
  } finally {
    if (conditionalAddChoiceBtn) conditionalAddChoiceBtn.disabled = false;
  }
}

function applyConditionalDepsSelection() {
  const state = appState.conditionalEditor;
  const selectedKey = state.selectedKey;
  if (!selectedKey) return;

  const checked = Array.from(conditionalDepsList.querySelectorAll("input[type='checkbox']:checked"))
    .map((input) => normalizeAttributeKey(input.value))
    .filter(Boolean);

  state.dependenciesByKey[selectedKey] = checked;
  const original = state.originalDependenciesByKey[selectedKey] || [];
  if (areDependenciesEqual(original, checked)) {
    state.dirtyKeys.delete(selectedKey);
  } else {
    state.dirtyKeys.add(selectedKey);
  }

  conditionalDepsModal.close();
  updateConditionalChoiceMeta();
}

function setValueInObjectRecursive(target, keyName, value) {
  if (!target || typeof target !== "object") return false;

  const wanted = normalizeAttributeKey(keyName);

  function applyValueToAttributeEntry(entry, nextValue) {
    if (!entry || typeof entry !== "object") return false;

    const type = String(entry.t || "").toUpperCase();
    if (type === "TEXTMLDO" || "valueL0" in entry) {
      entry.valueL0 = nextValue;
      return true;
    }

    if ("internalValue" in entry) {
      entry.internalValue = nextValue;
      if ("displayValue" in entry) entry.displayValue = nextValue;
      return true;
    }

    if ("value" in entry) {
      entry.value = nextValue;
      return true;
    }

    return false;
  }

  for (const [key, val] of Object.entries(target)) {
    if (normalizeAttributeKey(key) === wanted) {
      if (typeof val !== "object" || val === null) {
        target[key] = value;
        return true;
      }

      if (applyValueToAttributeEntry(val, value)) {
        return true;
      }

      target[key] = value;
      return true;
    }
  }

  for (const nested of Object.values(target)) {
    if (nested && typeof nested === "object" && setValueInObjectRecursive(nested, keyName, value)) {
      return true;
    }
  }

  return false;
}

function getParameterObjectValue(entry) {
  if (!entry || typeof entry !== "object") return "";

  if (typeof entry.valueL0 === "string") return entry.valueL0;
  if (entry.internalValue !== undefined && entry.internalValue !== null) return String(entry.internalValue);
  if (entry.value !== undefined && entry.value !== null) return String(entry.value);
  if (entry.displayValue !== undefined && entry.displayValue !== null) return String(entry.displayValue);
  return "";
}

function resolveParameterKey(parameters, attributeNameHint, previousRawValue) {
  if (!parameters || typeof parameters !== "object") return "";

  const normalizedHint = normalizeAttributeKey(attributeNameHint);
  const entries = Object.entries(parameters);

  const exactMatch = entries.find(([key]) => normalizeAttributeKey(key) === normalizedHint);
  if (exactMatch) return exactMatch[0];

  const previous = String(previousRawValue || "").trim();
  if (previous) {
    const valueMatches = entries.filter(([, val]) => getParameterObjectValue(val) === previous);
    if (valueMatches.length === 1) return valueMatches[0][0];
  }

  const hintLower = String(attributeNameHint || "").trim().toLowerCase();
  if (["beschreibung", "description", "descr"].includes(hintLower)) {
    const descrMatch = entries.find(([key]) => /(^|\.)descr(\[|$)/i.test(String(key)));
    if (descrMatch) return descrMatch[0];
  }

  const genericDescrMatch = entries.find(([key]) => /(^|\.)descr(\[|$)|description|beschreibung/i.test(String(key)));
  if (genericDescrMatch) return genericDescrMatch[0];

  return "";
}

function resolvePreferredConditionalTargetKey(parameters) {
  const entries = Object.entries(parameters || {});
  if (!entries.length) return "";

  const objectDescr = entries.find(([key]) => /(^|\.)object\.descr(\[|$)|(^|\.)descr(\[|$)/i.test(String(key)));
  if (objectDescr) return objectDescr[0];

  const attributeL1 = entries.find(([key]) => /(^|\.)attribute\.l1(\[|$)|(^|\.)l1(\[|$)/i.test(String(key)));
  if (attributeL1) return attributeL1[0];

  return "";
}

async function persistConditionalDependencies() {
  const state = appState.conditionalEditor;
  if (!editConditionalField.checked || !state.enabled) return;
  if (!state.listObjId) return;
  if (!state.dirtyKeys.size) return;

  delete appState.objListCache[state.listObjId];
  const latestObjListData = await loadObjListData(state.listObjId);
  const latestItems = extractConditionalListItems(latestObjListData);
  const latestByKey = new Map(latestItems.map((item) => [item.key, item]));

  for (const key of state.dirtyKeys) {
    const selectedItem = latestByKey.get(key) || state.items.find((item) => item.key === key);
    if (!selectedItem || selectedItem.objId === undefined || selectedItem.objId === null) {
      throw new Error(`Cannot update choice '${key}': missing objId in conditional list.`);
    }

    const menuPayload = await sdapiClient.fetchMenuForObject(selectedItem.objId);
    const attrEditInvoker = findInvokerByMethods(menuPayload.data, [
      "Object.Attributes.Edit()",
      "Object.Attribute.Edit()",
    ]);
    if (!attrEditInvoker) {
      throw new Error(`Object.Attributes.Edit() not found for '${selectedItem.objName || key}'.`);
    }

    const invokePayload = await sdapiClient.invokeInvoker(attrEditInvoker);
    const stepInvoker = findStepInvoker(invokePayload.data);
    if (!stepInvoker || typeof stepInvoker !== "object") {
      throw new Error(`StepInvoker missing for '${selectedItem.objName || key}'.`);
    }

    const attributeValues = findAttributeValues(invokePayload.data);

    const deps = state.dependenciesByKey[key] || [];
    const spaceSeparated = deps
      .map((dep) => resolveDependencyAttributeName(dep))
      .filter(Boolean)
      .join(" ");
    stepInvoker.parameters = attributeValues && typeof attributeValues === "object"
      ? { ...attributeValues }
      : {};

    let resolvedAttributeKey = resolvePreferredConditionalTargetKey(stepInvoker.parameters);
    if (!resolvedAttributeKey) {
      const attributeName = selectedItem.dependencyAttributeName || "beschreibung";
      resolvedAttributeKey = resolveParameterKey(stepInvoker.parameters, attributeName, selectedItem.dependencyRawValue);
    }
    if (!resolvedAttributeKey) {
      throw new Error(
        `Backend payload for '${selectedItem.objName || key}' has neither object.descr nor attribute.l1 in invoke-method response.`
      );
    }

    const updated = setValueInObjectRecursive(stepInvoker.parameters, resolvedAttributeKey, spaceSeparated);
    if (!updated) {
      throw new Error(
        `Resolved parameter '${resolvedAttributeKey}' could not be updated for '${selectedItem.objName || key}'.`
      );
    }

    await sdapiClient.submitStep(stepInvoker, "/{objId}/{activityId}/{parentId}/step");
  }

  state.originalDependenciesByKey = cloneDependenciesMap(state.dependenciesByKey);
  state.dirtyKeys.clear();

  appState.conditionalListCache[state.listObjId] = Object.fromEntries(
    Object.entries(state.dependenciesByKey).map(([entryKey, deps]) => [entryKey.toUpperCase(), [...deps]])
  );
  delete appState.objListCache[state.listObjId];
}

function getGroupingConfig(shows) {
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

function fieldStateClass(show) {
  if (show.hidden) return "field-hidden";
  if (show.readonly) return "field-readonly";
  if (show.mandatory) return "field-mandatory";
  return "";
}

function normalizeAttributeKey(value) {
  return String(value || "")
    .trim()
    .toUpperCase()
    .replace(/\.0\./g, ".");
}

// -- Value list helpers (SELECT / popup preview) --------------------------------

const sdapiClient = createSdapiClient({
  getToken: () => document.getElementById("token").value.trim(),
  getBaseUrl: () => document.getElementById("baseUrl").value.trim(),
  caches: {
    objListCache: appState.objListCache,
    valueListCache: appState.valueListCache,
    conditionalListCache: appState.conditionalListCache,
  },
  findInvoker,
  extractValueListItems,
  extractConditionalRules,
});

async function apiPostJson(url, body) {
  return sdapiClient.apiPostJson(url, body);
}

async function loadObjListData(objId) {
  return sdapiClient.loadObjListData(objId);
}

// Walk the ObjList invoke response and collect all VALUE_LIST item attrValues arrays.
function extractValueListItems(data) {
  const results = [];

  function getEntryLabel(item, attrNames) {
    const headers = Array.isArray(attrNames) ? attrNames.map((name) => String(name || "").trim().toLowerCase()) : [];
    const values = Array.isArray(item.attrValues) ? item.attrValues : [];
    const preferredKeys = ["bezeichnung", "anzeigewert", "displayvalue", "name"];
    const preferredIndex = headers.findIndex((name) => preferredKeys.includes(name));

    if (preferredIndex >= 0 && values[preferredIndex] !== undefined && values[preferredIndex] !== null && String(values[preferredIndex]).trim()) {
      return String(values[preferredIndex]).trim();
    }
    if (values[1] !== undefined && values[1] !== null && String(values[1]).trim()) {
      return String(values[1]).trim();
    }
    if (item.objName) return String(item.objName).trim();
    if (item.displayValue) return String(item.displayValue).trim();
    if (item.internalValue) return String(item.internalValue).trim();
    return "";
  }

  function walk(node) {
    if (!node || typeof node !== "object") return;
    if (Array.isArray(node)) {
      node.forEach(walk);
      return;
    }

    if (String(node.t || "").toUpperCase() === "OBJLIST" && Array.isArray(node.items)) {
      const attrNames = Array.isArray(node.attrNames) ? node.attrNames : [];
      node.items.forEach((item) => {
        const isValueList = String(item?.objclass?.type || "").toUpperCase() === "VALUE_LIST";
        if (!isValueList) return;
        const label = getEntryLabel(item, attrNames);
        if (!label) return;
        results.push({
          label,
          value: String(item.internalValue ?? item.objId ?? label),
        });
      });
      return;
    }

    // Fallback: older/alternate payloads may expose VALUE_LIST rows directly.
    const itemType = String(node.t || node.type || "").toUpperCase();
    if (itemType === "VALUE_LIST" && Array.isArray(node.attrValues)) {
      const label = String(node.displayValue ?? node.attrValues[1] ?? node.attrValues[0] ?? "").trim();
      if (label) {
        results.push({
          label,
          value: String(node.internalValue ?? node.objId ?? label),
        });
      }
      return;
    }
    Object.values(node).forEach(walk);
  }

  walk(data);
  return results;
}

// Fetch and cache value list items for a given popupObjId.
// Returns a Promise that resolves to an array of value objects.
async function loadValueList(popupObjId) {
  return sdapiClient.loadValueList(popupObjId);
}

function extractConditionalRules(data) {
  const objListItems = Array.isArray(data?.items) ? data.items : [];
  const attrNames = Array.isArray(data?.attrNames) ? data.attrNames.map((name) => String(name || "").trim().toLowerCase()) : [];
  const keyIndex = attrNames.findIndex((name) => name === "bezeichnung" || name === "key");
  const valueIndex = attrNames.findIndex((name) => name === "beschreibung" || name === "value");
  const resolvedKeyIndex = keyIndex >= 0 ? keyIndex : 1;
  const resolvedValueIndex = valueIndex >= 0 ? valueIndex : 2;

  const rules = {};
  objListItems.forEach((item) => {
    const isValueList = String(item?.objclass?.type || "").toUpperCase() === "VALUE_LIST";
    if (!isValueList || !Array.isArray(item.attrValues)) return;

    const rawKey = String(item.attrValues[resolvedKeyIndex] ?? "").trim();
    const rawValue = String(item.attrValues[resolvedValueIndex] ?? "").trim();
    if (!rawKey || !rawValue) return;

    rules[rawKey.toUpperCase()] = rawValue
      .split(/\s+/)
      .map((entry) => normalizeAttributeKey(entry))
      .filter(Boolean);
  });
  return rules;
}

async function loadConditionalRules(reference) {
  return sdapiClient.loadConditionalRules(reference);
}

function preloadConditionalRules(shows) {
  shows.forEach((show) => {
    const prefs = parseTagPrefs(show.tagPrefs ?? show.tagPref);
    const reference = prefs.conditionalValueList || prefs.conditional_value_list;
    if (!reference) return;

    const cacheKey = String(reference).trim();
    if (!cacheKey) return;
    if (appState.conditionalListCache[cacheKey]) return;

    void loadConditionalRules(cacheKey)
      .then(() => {
        if (appState.invokeData) renderProfile(appState.invokeData);
      })
      .catch(() => {
        // keep rendering without conditional behavior if the reference list cannot be loaded
      });
  });
}

function buildConditionalVisibility(shows) {
  const allConditionalTargets = new Set();
  const activeTargets = new Set();
  const bodyShows = shows.filter((show) => String(show.showType || "").toUpperCase() === "BODY");
  const { containers } = getGroupingConfig(bodyShows);
  const memberTypeToContainerKey = new Map(
    containers.map(({ container, memberType }) => [memberType, normalizeAttributeKey(container.attributeName)])
  );

  shows.forEach((show) => {
    const prefs = parseTagPrefs(show.tagPrefs ?? show.tagPref);
    const reference = prefs.conditionalValueList || prefs.conditional_value_list;
    if (!reference) return;

    const rules = appState.conditionalListCache[String(reference).trim()];
    if (!rules || typeof rules.then === "function") return;

    Object.values(rules).forEach((entries) => {
      entries.forEach((entry) => allConditionalTargets.add(entry));
    });

    const previewState = appState.previewValues[normalizeAttributeKey(show.attributeName)];
    const candidates = new Set();
    if (typeof previewState === "string") {
      const normalized = previewState.trim().toUpperCase();
      if (normalized) candidates.add(normalized);
    } else if (previewState && typeof previewState === "object") {
      const byValue = String(previewState.value || "").trim().toUpperCase();
      const byLabel = String(previewState.label || "").trim().toUpperCase();
      if (byValue) candidates.add(byValue);
      if (byLabel) candidates.add(byLabel);
    }
    if (!candidates.size) return;

    candidates.forEach((candidate) => {
      const visibleEntries = rules[candidate] || [];
      visibleEntries.forEach((entry) => activeTargets.add(entry));
    });
  });

  return (show) => {
    const key = normalizeAttributeKey(show.attributeName);
    if (allConditionalTargets.has(key) && !activeTargets.has(key)) return false;

    const showType = String(show.showType || "").toUpperCase();
    const owningContainerKey = memberTypeToContainerKey.get(showType);
    if (!owningContainerKey) return true;

    if (!allConditionalTargets.has(owningContainerKey)) return true;
    return activeTargets.has(owningContainerKey);
  };
}

// Append a live option preview to a card for SELECT/RADIO popup fields.
function attachSelectPreview(card, show) {
  const tag = String(show.tag || "").toUpperCase();
  if (tag !== "SELECT" && tag !== "RADIO") return;
  if (!show.popupObjId) return;

  const wrapper = document.createElement("div");
  wrapper.className = "field-select-preview";

  const row = document.createElement("div");
  row.className = "field-select-preview-row";

  const sel = document.createElement("select");
  sel.className = "field-preview-select";
  sel.innerHTML = '<option>⌛ loading...</option>';
  ["pointerdown", "mousedown", "click", "dblclick", "dragstart"].forEach((eventName) => {
    sel.addEventListener(eventName, (event) => {
      event.stopPropagation();
    });
  });
  sel.addEventListener("keydown", (event) => {
    event.stopPropagation();
  });
  sel.addEventListener("change", (event) => {
    event.stopPropagation();
    const selectedLabel = sel.selectedOptions?.[0]?.textContent || "";
    appState.previewValues[normalizeAttributeKey(show.attributeName)] = {
      value: sel.value,
      label: selectedLabel,
    };
    if (appState.invokeData) renderProfile(appState.invokeData);
  });

  const addBtn = document.createElement("button");
  addBtn.type = "button";
  addBtn.className = "field-preview-add-btn";
  addBtn.title = "Wertelisten-Eintrag hinzufuegen";
  addBtn.setAttribute("aria-label", "Wertelisten-Eintrag hinzufuegen");
  addBtn.textContent = "+";

  ["pointerdown", "mousedown", "click", "dblclick", "dragstart"].forEach((eventName) => {
    addBtn.addEventListener(eventName, (event) => {
      event.stopPropagation();
    });
  });

  addBtn.addEventListener("click", async (event) => {
    event.preventDefault();
    event.stopPropagation();

    appState.popupEntryDraft = {
      show,
      selectEl: sel,
      addBtnEl: addBtn,
    };
    popupEntryMeta.textContent = `${show.displayName || show.attributeName || "Feld"} | popupObjId ${show.popupObjId}`;
    popupEntryValue.value = "";
    popupEntryDescription.value = "";
    const errEl = document.getElementById("popupEntryError");
    if (errEl) { errEl.hidden = true; errEl.textContent = ""; }
    popupEntryModal.showModal();
    popupEntryValue.focus();
  });

  row.appendChild(sel);
  row.appendChild(addBtn);
  wrapper.appendChild(row);
  card.appendChild(wrapper);

  loadValueList(show.popupObjId)
    .then((items) => {
      if (!items.length) {
        sel.innerHTML = '<option>(no items)</option>';
        return;
      }
      sel.innerHTML = items
        .map((item) => `<option value="${esc(item.value)}">${esc(item.label)}</option>`)
        .join("");

      const currentValue = appState.previewValues[normalizeAttributeKey(show.attributeName)];
      const defaultValue = String(show.defaultValue ?? "").trim();
      if (currentValue && typeof currentValue === "object" && currentValue.value) {
        sel.value = currentValue.value;
      } else if (typeof currentValue === "string" && currentValue) {
        sel.value = currentValue;
      } else if (defaultValue) {
        const match = items.find((item) =>
          String(item.value).trim().toUpperCase() === defaultValue.toUpperCase() ||
          String(item.label).trim().toUpperCase() === defaultValue.toUpperCase()
        );
        if (match) {
          sel.value = match.value;
          appState.previewValues[normalizeAttributeKey(show.attributeName)] = {
            value: match.value,
            label: match.label,
          };
        }
      }
    })
    .catch(() => {
      sel.innerHTML = '<option>(error loading)</option>';
    });
}

// -- Rendering ------------------------------------------------------------------
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
      const idx = appState.shows.indexOf(show);
      const cell = document.createElement("div");
      cell.className = `field-card small ${fieldStateClass(show)}`;
      cell.innerHTML = `
        <div class="field-label">${esc(show.displayName || show.attributeName || "")}</div>
        <div class="field-attr">${esc(show.attributeName || "")}</div>
        ${show.datatype ? `<span class="field-badge">${esc(show.datatype)}</span>` : ""}
      `;

      const edgeDirs = [
        { dir: "top", title: "Feld davor einfuegen" },
        { dir: "right", title: "Feld danach einfuegen" },
        { dir: "bottom", title: "Feld danach einfuegen" },
        { dir: "left", title: "Feld davor einfuegen" },
      ];
      edgeDirs.forEach(({ dir, title }) => {
        const btn = document.createElement("button");
        btn.type = "button";
        btn.className = `edge-insert-btn edge-insert-${dir}`;
        btn.title = title;
        btn.setAttribute("aria-label", title);
        btn.textContent = "+";
        btn.addEventListener("click", (event) => {
          event.stopPropagation();
          insertFieldForCard(show, dir);
        });
        cell.appendChild(btn);
      });

      const removeBtn = document.createElement("button");
      removeBtn.type = "button";
      removeBtn.className = "field-remove-btn";
      removeBtn.title = "Feld entfernen";
      removeBtn.setAttribute("aria-label", "Feld entfernen");
      removeBtn.textContent = "×";
      removeBtn.addEventListener("click", (event) => {
        event.stopPropagation();
        removeFieldFromProfile(show);
      });
      cell.appendChild(removeBtn);

      attachSelectPreview(cell, show);
      cell.addEventListener("click", () => openFieldEditor(idx));
      grid.appendChild(cell);
    });

  headerFields.appendChild(grid);
}

function renderBodyGrid(shows, allShows) {
  formGrid.innerHTML = "";
  formGrid.style.placeContent = "";
  bodyLabel.classList.add("hidden");

  if (!shows.length) {
    bodyLabel.classList.remove("hidden");
    formGrid.style.minHeight = `${Math.max(220, appState.dragRowHeight * 2)}px`;
    formGrid.style.gridTemplateColumns = "minmax(220px, 380px)";
    formGrid.style.placeContent = "center";

    const emptyAdd = document.createElement("button");
    emptyAdd.type = "button";
    emptyAdd.className = "empty-add-card";
    emptyAdd.innerHTML = '<span class="empty-add-plus">+</span><span class="empty-add-text">Neues Feld anlegen</span>';
    emptyAdd.addEventListener("click", () => insertFieldAtPosition(1, 1));
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

    const emptyAdd = document.createElement("button");
    emptyAdd.type = "button";
    emptyAdd.className = "empty-add-card";
    emptyAdd.innerHTML = '<span class="empty-add-plus">+</span><span class="empty-add-text">Neues Feld anlegen</span>';
    emptyAdd.addEventListener("click", () => insertFieldAtPosition(1, 1));
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

  // Background ghost cells — one per grid slot, rendered before cards so cards paint on top
  for (let r = 1; r <= rows; r++) {
    for (let c = 1; c <= cols; c++) {
      const ghost = document.createElement("div");
      ghost.className = "grid-ghost-cell";
      ghost.dataset.hpos = String(c);
      ghost.dataset.vpos = String(r);
      ghost.style.gridColumn = String(c);
      ghost.style.gridRow = String(r);
      const ghostPlus = document.createElement("span");
      ghostPlus.className = "ghost-cell-add";
      ghostPlus.textContent = "+";
      ghost.appendChild(ghostPlus);
      ghost.addEventListener("click", () => insertFieldAtPosition(c, r));
      formGrid.appendChild(ghost);
    }
  }

  if (!appState.formGridDropBound) {
    formGrid.addEventListener("dragover", (event) => {
      event.preventDefault();
      formGrid.classList.add("drop-target-active");

      const idx = Number(event.dataTransfer.getData("text/plain"));
      const field = appState.shows[idx];
      if (!field || String(field.showType || "").toUpperCase() !== "BODY") return;

      const rect = formGrid.getBoundingClientRect();
      const colWidth = rect.width / Math.max(1, appState.formGridCols);
      const localH = Math.max(1, Math.floor(Math.max(0, event.clientX - rect.left) / Math.max(1, colWidth)) + 1);
      const localV = Math.max(1, Math.floor(Math.max(0, event.clientY - rect.top) / appState.dragRowHeight) + 1);
      showSnapIndicator(formGrid, localH, localV, Number(field.colspan) || 1, Number(field.rowspan) || 1, appState.formGridCols);

      const pool = appState.shows.filter(
        (s) => String(s.showType || "").toUpperCase() === "BODY" && String(s.tag || "").toUpperCase() !== "GROUPING"
      );
      const preview = simulatePushPreview(pool, field, localH, localV, appState.formGridCols);
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
      const field = appState.shows[idx];
      if (!field) return;
      if (String(field.showType || "").toUpperCase() !== "BODY") return;

      moveFieldToGridPosition(field, formGrid, event, appState.formGridCols, 1, 1);
      normalizeFieldPosition(field, appState.formGridCols);

      const pool = appState.shows.filter(
        (s) => String(s.showType || "").toUpperCase() === "BODY" && String(s.tag || "").toUpperCase() !== "GROUPING"
      );
      resolveNoOverlap(pool, field, appState.formGridCols);

      hideSnapIndicator();
      clearPushPreview();
      renderProfile(appState.invokeData);
    });

    appState.formGridDropBound = true;
  }

  sorted.forEach((show) => {
    const idx = appState.shows.indexOf(show);
    const hpos = Math.max(1, Number(show.hpos) || 1);
    const vpos = Math.max(1, Number(show.vpos) || 1);
    const colspan = Math.max(1, Number(show.colspan) || 1);
    const rowspan = Math.max(1, Number(show.rowspan) || 1);

    const card = document.createElement("div");
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

    card.innerHTML = `
      <div class="field-label">${esc(show.displayName || show.attributeName || "(no label)")}</div>
      <div class="field-attr">${esc(show.attributeName || "")}</div>
      <div class="field-footer">
        ${show.datatype ? `<span class="field-badge">${esc(show.datatype)}</span>` : ""}
        ${show.tag ? `<span class="field-badge tag-badge">${esc(show.tag)}</span>` : ""}
        ${flags}
      </div>
    `;

    // Edge-insert buttons (top / right / bottom / left)
    const edgeDirs = [
      { dir: "top",    title: "Zeile darüber einfügen"   },
      { dir: "right",  title: "Spalte rechts einfügen"   },
      { dir: "bottom", title: "Zeile darunter einfügen"  },
      { dir: "left",   title: "Spalte links einfügen"    },
    ];
    edgeDirs.forEach(({ dir, title }) => {
      const btn = document.createElement("button");
      btn.type = "button";
      btn.className = `edge-insert-btn edge-insert-${dir}`;
      btn.title = title;
      btn.setAttribute("aria-label", title);
      btn.textContent = "+";
      btn.addEventListener("click", (e) => {
        e.stopPropagation();
        insertFieldAtEdge(show, dir);
      });
      card.appendChild(btn);
    });

    // Remove button (top-right corner)
    const removeBtn = document.createElement("button");
    removeBtn.type = "button";
    removeBtn.className = "field-remove-btn";
    removeBtn.title = "Feld entfernen";
    removeBtn.setAttribute("aria-label", "Feld entfernen");
    removeBtn.textContent = "×";
    removeBtn.addEventListener("click", (e) => {
      e.stopPropagation();
      removeFieldFromProfile(show);
    });
    card.appendChild(removeBtn);

    attachSelectPreview(card, show);
    card.addEventListener("dragstart", (event) => beginDragField(event, idx));
    card.addEventListener("dragend", endDragField);
    card.addEventListener("click", () => {
      if (appState.dragging || nowMs() < appState.dragSuppressClickUntil) return;
      openFieldEditor(idx);
    });
    formGrid.appendChild(card);
    outerRenderedItems.push({
      rect: { left: hpos, top: vpos, right: hpos + colspan - 1, bottom: vpos + rowspan - 1 },
      element: card,
    });
  });

  containers.forEach(({ container, memberType, defaultOpen }) => {
    const containerIdx = appState.shows.indexOf(container);
    const members = allShows
      .filter((s) => String(s.showType || "").toUpperCase() === memberType)
      .slice()
      .sort((a, b) => (Number(a.vpos) - Number(b.vpos)) || (Number(a.hpos) - Number(b.hpos)));

    const hpos = Math.max(1, Number(container.hpos) || 1);
    const vpos = Math.max(1, Number(container.vpos) || 1);
    const colspan = Math.max(1, Number(container.colspan) || 1);
    const rowspan = Math.max(1, Number(container.rowspan) || 1);

    const wrapper = document.createElement("details");
    wrapper.className = "grouping-card";
    wrapper.setAttribute("data-field-index", String(containerIdx));
    wrapper.style.gridColumn = `${hpos} / span ${colspan}`;
    wrapper.style.gridRow = `${vpos} / span ${rowspan}`;
    wrapper.open = defaultOpen;

    const titleText = container.displayName || container.attributeName || `Group ${memberType}`;
    const summary = document.createElement("summary");
    summary.innerHTML = `
      <span class="grouping-title">${esc(titleText)}</span>
      <span class="grouping-meta">${esc(memberType)} · ${members.length} field${members.length !== 1 ? "s" : ""}</span>
    `;
    wrapper.appendChild(summary);

    wrapper.addEventListener("click", (event) => {
      if (!Number.isFinite(containerIdx) || containerIdx < 0) return;
      if (appState.dragging || nowMs() < appState.dragSuppressClickUntil) return;
      if (event.target.closest(".grouping-inner-grid")) return;
      if (event.target.closest(".edge-insert-btn")) return;
      if (event.target.closest(".field-remove-btn")) return;
      openFieldEditor(containerIdx);
    });

    const memberGrid = document.createElement("div");
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
      memberGrid.style.minHeight = `${Math.max(1, Math.max(...members.map((m) => Number(m.vpos) || 1))) * appState.dragRowHeight}px`;

      memberGrid.addEventListener("dragover", (event) => {
        event.preventDefault();
        memberGrid.classList.add("drop-target-active");

        const idx = Number(event.dataTransfer.getData("text/plain"));
        const field = appState.shows[idx];
        if (!field || String(field.showType || "").toUpperCase() !== memberType) return;

        const rect = memberGrid.getBoundingClientRect();
        const localH = Math.max(1, Math.floor(Math.max(0, event.clientX - rect.left) / Math.max(1, rect.width / Math.max(1, maxMemberCol))) + 1);
        const localV = Math.max(1, Math.floor(Math.max(0, event.clientY - rect.top) / appState.dragRowHeight) + 1);
        showSnapIndicator(memberGrid, localH, localV, Number(field.colspan) || 1, Number(field.rowspan) || 1, Math.max(1, maxMemberCol));

        const pool = appState.shows.filter((s) => String(s.showType || "").toUpperCase() === memberType);
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
        const field = appState.shows[idx];
        if (!field) return;
        if (String(field.showType || "").toUpperCase() !== memberType) return;

        moveFieldToGridPosition(field, memberGrid, event, Math.max(1, maxMemberCol), minH, minV);

        const groupPool = appState.shows.filter((s) => String(s.showType || "").toUpperCase() === memberType);
        resolveNoOverlap(groupPool, field, Math.max(1, maxMemberCol) + minH - 1);

        hideSnapIndicator();
        clearPushPreview();
        renderProfile(appState.invokeData);
      });

      members.forEach((member) => {
        const idx = appState.shows.indexOf(member);
        const localH = Math.max(1, Number(member.hpos) || 1) - minH + 1;
        const localV = Math.max(1, Number(member.vpos) || 1) - minV + 1;
        const localColspan = Math.max(1, Number(member.colspan) || 1);
        const localRowspan = Math.max(1, Number(member.rowspan) || 1);

        const card = document.createElement("div");
        card.className = `field-card small is-draggable ${fieldStateClass(member)}`;
        card.setAttribute("data-field-index", String(idx));
        card.draggable = true;
        card.style.gridColumn = `${localH} / span ${localColspan}`;
        card.style.gridRow = `${localV} / span ${localRowspan}`;
        card.innerHTML = `
          <div class="field-label">${esc(member.displayName || member.attributeName || "(no label)")}</div>
          <div class="field-attr">${esc(member.attributeName || "")}</div>
          <div class="field-footer">
            ${member.datatype ? `<span class="field-badge">${esc(member.datatype)}</span>` : ""}
            ${member.tag ? `<span class="field-badge tag-badge">${esc(member.tag)}</span>` : ""}
          </div>
        `;

        // Edge-insert buttons
        const memberEdgeDirs = [
          { dir: "top",    title: "Zeile darüber einfügen"  },
          { dir: "right",  title: "Spalte rechts einfügen"  },
          { dir: "bottom", title: "Zeile darunter einfügen" },
          { dir: "left",   title: "Spalte links einfügen"   },
        ];
        memberEdgeDirs.forEach(({ dir, title }) => {
          const btn = document.createElement("button");
          btn.type = "button";
          btn.className = `edge-insert-btn edge-insert-${dir}`;
          btn.title = title;
          btn.setAttribute("aria-label", title);
          btn.textContent = "+";
          btn.addEventListener("click", (e) => {
            e.stopPropagation();
            insertFieldAtEdge(member, dir);
          });
          card.appendChild(btn);
        });

        // Remove button
        const memberRemoveBtn = document.createElement("button");
        memberRemoveBtn.type = "button";
        memberRemoveBtn.className = "field-remove-btn";
        memberRemoveBtn.title = "Feld entfernen";
        memberRemoveBtn.setAttribute("aria-label", "Feld entfernen");
        memberRemoveBtn.textContent = "×";
        memberRemoveBtn.addEventListener("click", (e) => {
          e.stopPropagation();
          removeFieldFromProfile(member);
        });
        card.appendChild(memberRemoveBtn);

        attachSelectPreview(card, member);
        card.addEventListener("dragstart", (event) => beginDragField(event, idx));
        card.addEventListener("dragend", endDragField);
        card.addEventListener("click", (event) => {
          event.stopPropagation();
          if (appState.dragging || nowMs() < appState.dragSuppressClickUntil) return;
          openFieldEditor(idx);
        });

        memberGrid.appendChild(card);
      });
    }

    wrapper.appendChild(memberGrid);

    // Edge-insert buttons on the grouping container (positions in the outer BODY grid)
    const groupEdgeDirs = [
      { dir: "top",    title: "Zeile darüber einfügen"  },
      { dir: "right",  title: "Spalte rechts einfügen"  },
      { dir: "bottom", title: "Zeile darunter einfügen" },
      { dir: "left",   title: "Spalte links einfügen"   },
    ];
    groupEdgeDirs.forEach(({ dir, title }) => {
      const btn = document.createElement("button");
      btn.type = "button";
      btn.className = `edge-insert-btn edge-insert-${dir}`;
      btn.title = title;
      btn.setAttribute("aria-label", title);
      btn.textContent = "+";
      btn.addEventListener("click", (e) => {
        e.stopPropagation();
        insertFieldAtEdge(container, dir);
      });
      wrapper.appendChild(btn);
    });

    // Remove button for the grouping container
    const groupRemoveBtn = document.createElement("button");
    groupRemoveBtn.type = "button";
    groupRemoveBtn.className = "field-remove-btn";
    groupRemoveBtn.title = "Gruppierung entfernen";
    groupRemoveBtn.setAttribute("aria-label", "Gruppierung entfernen");
    groupRemoveBtn.textContent = "×";
    groupRemoveBtn.addEventListener("click", (e) => {
      e.stopPropagation();
      removeFieldFromProfile(container);
    });
    wrapper.appendChild(groupRemoveBtn);

    formGrid.appendChild(wrapper);
    outerRenderedItems.push({
      rect: { left: hpos, top: vpos, right: hpos + colspan - 1, bottom: vpos + rowspan - 1 },
      element: wrapper,
    });
  });

    // "−" buttons on the top edge of visible top-level columns → remove that column and its content
    const coveredCols = new Set();
    for (let c = 1; c <= usedCols; c++) {
      if (coveredCols.has(c)) continue;

      const target = outerRenderedItems
        .filter((item) => item.rect.left <= c && item.rect.right >= c)
        .sort((a, b) => (a.rect.top - b.rect.top) || (a.rect.left - b.rect.left))[0];

      if (!target?.element) continue;

      const btn = document.createElement("button");
      btn.className = "grid-edge-btn grid-remove-btn grid-remove-top";
      btn.type = "button";
      btn.title = "Remove column and its content";
      btn.textContent = "−";
      btn.style.left = `${target.element.offsetLeft}px`;
      btn.style.top = `${target.element.offsetTop - 36}px`;
      btn.style.width = `${target.element.offsetWidth}px`;
      btn.addEventListener("click", () => removeBodyColumn(c));
      formGrid.appendChild(btn);

      for (let covered = target.rect.left; covered <= target.rect.right; covered += 1) {
        coveredCols.add(covered);
      }
    }

    // "−" buttons on the left edge of visible top-level rows → remove that row and its content
    const coveredRows = new Set();
    for (let r = 1; r <= usedRows; r++) {
      if (coveredRows.has(r)) continue;

      const target = outerRenderedItems
        .filter((item) => item.rect.top <= r && item.rect.bottom >= r)
        .sort((a, b) => (a.rect.left - b.rect.left) || (a.rect.top - b.rect.top))[0];

      if (!target?.element) continue;

      const btn = document.createElement("button");
      btn.className = "grid-edge-btn grid-remove-btn grid-remove-left";
      btn.type = "button";
      btn.title = "Remove row and its content";
      btn.textContent = "−";
      btn.style.left = `${target.element.offsetLeft - 36}px`;
      btn.style.top = `${target.element.offsetTop}px`;
      btn.style.height = `${target.element.offsetHeight}px`;
      btn.addEventListener("click", () => removeBodyRow(r));
      formGrid.appendChild(btn);

      for (let covered = target.rect.top; covered <= target.rect.bottom; covered += 1) {
        coveredRows.add(covered);
      }
    }

    // "+" buttons on the right edge of every row → add a column
    for (let r = 1; r <= rows; r++) {
      const btn = document.createElement("button");
      btn.className = "grid-add-btn grid-add-col";
      btn.type = "button";
      btn.title = "Add column";
      btn.textContent = "+";
      btn.style.gridColumn = String(cols + 1);
      btn.style.gridRow = String(r);
      btn.addEventListener("click", () => {
        if (!appState.invokeData) return;
        appState.manualBodyCols = Math.max(1, Number(appState.manualBodyCols || appState.formGridCols || 2)) + 1;
        renderProfile(appState.invokeData);
      });
      formGrid.appendChild(btn);
    }

    // "+" buttons at the bottom of every column → add a row
    for (let c = 1; c <= cols; c++) {
      const btn = document.createElement("button");
      btn.className = "grid-add-btn grid-add-row";
      btn.type = "button";
      btn.title = "Add row";
      btn.textContent = "+";
      btn.style.gridColumn = String(c);
      btn.style.gridRow = String(rows + 1);
      btn.addEventListener("click", () => {
        if (!appState.invokeData) return;
        appState.extraBodyRows += 1;
        renderProfile(appState.invokeData);
      });
      formGrid.appendChild(btn);
    }
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
        const idx = appState.shows.indexOf(show);
        const cell = document.createElement("div");
        cell.className = `field-card small ${fieldStateClass(show)}`;
        cell.innerHTML = `
          <div class="field-label">${esc(show.displayName || show.attributeName || "")}</div>
          <div class="field-attr">${esc(show.attributeName || "")}</div>
          ${show.datatype ? `<span class="field-badge">${esc(show.datatype)}</span>` : ""}
        `;

        const edgeDirs = [
          { dir: "top", title: "Feld davor einfuegen" },
          { dir: "right", title: "Feld danach einfuegen" },
          { dir: "bottom", title: "Feld danach einfuegen" },
          { dir: "left", title: "Feld davor einfuegen" },
        ];
        edgeDirs.forEach(({ dir, title }) => {
          const btn = document.createElement("button");
          btn.type = "button";
          btn.className = `edge-insert-btn edge-insert-${dir}`;
          btn.title = title;
          btn.setAttribute("aria-label", title);
          btn.textContent = "+";
          btn.addEventListener("click", (event) => {
            event.stopPropagation();
            insertFieldForCard(show, dir);
          });
          cell.appendChild(btn);
        });

        const removeBtn = document.createElement("button");
        removeBtn.type = "button";
        removeBtn.className = "field-remove-btn";
        removeBtn.title = "Feld entfernen";
        removeBtn.setAttribute("aria-label", "Feld entfernen");
        removeBtn.textContent = "×";
        removeBtn.addEventListener("click", (event) => {
          event.stopPropagation();
          removeFieldFromProfile(show);
        });
        cell.appendChild(removeBtn);

        attachSelectPreview(cell, show);
        cell.addEventListener("click", () => openFieldEditor(idx));
        grid.appendChild(cell);
      });

    otherFields.appendChild(grid);
  });
}

function getSortableValue(show, key) {
  const value = show?.[key];
  if (typeof value === "boolean") return value ? 1 : 0;
  if (typeof value === "number") return value;
  const asNumber = Number(value);
  if (!Number.isNaN(asNumber) && value !== "" && value !== null && value !== undefined) return asNumber;
  return String(value ?? "").toLowerCase();
}

function renderFieldTable(shows) {
  fieldTableBody.innerHTML = "";

  const { key, dir } = appState.tableSort;
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
      const idx = appState.shows.indexOf(show);
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

      tr.addEventListener("click", () => openFieldEditor(idx));
      fieldTableBody.appendChild(tr);
    });
}

function renderProfile(invokeData) {
  const shows = extractShows(invokeData);
  const name = extractProfileName(invokeData);

  appState.invokeData = invokeData;
  appState.shows = shows;
  preloadConditionalRules(shows);

  const isVisible = buildConditionalVisibility(shows);
  const visibleShows = shows.filter(isVisible);
  const allBodyShows = shows.filter((s) => String(s.showType || "").toUpperCase() === "BODY");
  const { memberShowTypes } = getGroupingConfig(allBodyShows);

  profileName.textContent = name;
  profileMeta.textContent = `${shows.length} field${shows.length !== 1 ? "s" : ""}`;

  const headerShows = visibleShows.filter((s) => String(s.showType || "").toUpperCase() === "HEADER");
  const bodyShows = visibleShows.filter((s) => String(s.showType || "").toUpperCase() === "BODY");
  const otherShows = visibleShows.filter((s) => {
    const t = String(s.showType || "").toUpperCase();
    return t !== "HEADER" && t !== "BODY" && !memberShowTypes.has(t);
  });

  renderHeaderSection(headerShows);
  renderBodyGrid(bodyShows, visibleShows);
  renderOtherSection(otherShows);
  renderFieldTable(shows);
  rawOutput.textContent = JSON.stringify(invokeData, null, 2);
}

sendToServerBtn.addEventListener("click", async () => {
  if (!appState.invokeData) return;
  const token = document.getElementById("token").value.trim();
  const baseUrl = document.getElementById("baseUrl").value.trim();

  if (!token) {
    showStatus("Token missing for send step.", "error");
    return;
  }

  const sourceInvoker = appState.selectedAttributeProfileInvoker;
  if (!sourceInvoker) {
    showStatus("Missing invoker context. Load profile again before sending.", "error");
    return;
  }

  let stepInvoker = appState.stepInvokerTemplate;

  if (!stepInvoker) {
    stepInvoker = {
      t: "StepInvoker",
      parameters: {},
      shortcut: "NONE",
      stepNo: 1,
    };
  }

  const rawProfile = appState.invokeData.attributeProfile || appState.invokeData;

  try {
    sendToServerBtn.disabled = true;
    sendStatus.textContent = "Refreshing profile session and saving via wsapi/call ...";

    await saveProfileViaWsapiRefresh({
      token,
      baseUrl,
      sourceInvoker,
      stepInvokerTemplate: stepInvoker,
      currentInvokeData: rawProfile,
    });

    sendStatus.textContent = "Saved via wsapi/call (not via SDAPI AttributeProfile.Edit support).";
    showCenterNotice("Attributprofil gespeichert: wsapi/call verwendet (SDAPI Edit-Support noch offen).", "info", 2200);
  } catch (err) {
    sendStatus.textContent = `Send failed: ${err.message}`;
  } finally {
    sendToServerBtn.disabled = false;
  }
});

// -- Main form submit -----------------------------------------------------------
mainForm.addEventListener("submit", async (e) => {
  e.preventDefault();

  const token = document.getElementById("token").value.trim();
  const objId = document.getElementById("objId").value.trim();
  const nullProfileObjId = document.getElementById("nullProfileObjId").value.trim();
  const baseUrl = document.getElementById("baseUrl").value.trim();

  saveFormToStorage();

  loadBtn.disabled = true;
  showStatus("Step 1 / 3 - Fetching menu from object...", "info");

  try {
    const mainProfile = await loadProfileByObjectId(token, baseUrl, objId);
    const menuPayload = mainProfile.menuPayload;
    const invoker = mainProfile.invoker;

    if (!invoker) {
      rawOutput.textContent = JSON.stringify(menuPayload.data, null, 2);
      profileName.textContent = "AttributeProfile.Edit() not found";
      profileMeta.textContent = `Object ${objId} has no AttributeProfile.Edit() action in its menu.`;
      headerFields.innerHTML = "";
      bodyLabel.classList.add("hidden");
      formGrid.innerHTML = '<p class="empty-hint">This object does not expose an <strong>AttributeProfile.Edit()</strong> action. Check the Raw JSON tab for the full menu response.</p>';
      otherFields.innerHTML = "";
      fieldTableBody.innerHTML = "";
      profileSection.classList.remove("hidden");
      inputSection.classList.add("hidden");
      hideStatus();
      return;
    }

    appState.selectedAttributeProfileInvoker = invoker;

    showStatus("Step 2 / 3 - Loading nullprofile definition...", "info");
    if (nullProfileObjId) {
      try {
        await loadNullProfileContextByObjId(nullProfileObjId);
      } catch (nullProfileError) {
        appState.nullProfileShows = [];
        appState.nullProfileAttributeOptions = [];
        appState.nullProfileObjId = "";
        appState.nullProfileInvokeData = null;
        appState.nullProfileStepInvokerTemplate = null;
        appState.nullProfileSourceInvoker = null;
        showStatus(`Nullprofile could not be loaded: ${nullProfileError.message}`, "warning");
      }
    } else {
      appState.nullProfileShows = [];
      appState.nullProfileAttributeOptions = [];
      appState.nullProfileObjId = "";
      appState.nullProfileInvokeData = null;
      appState.nullProfileStepInvokerTemplate = null;
      appState.nullProfileSourceInvoker = null;
    }

    showStatus("Step 3 / 3 - Rendering profile...", "info");

    appState.stepInvokerTemplate = findStepInvoker(mainProfile.invokePayload.data);
    sendStatus.textContent = appState.stepInvokerTemplate
      ? "StepInvoker detected. Ready to send profile back."
      : "No StepInvoker detected in response.";

    renderProfile(mainProfile.invokePayload.data);
    inputSection.classList.add("hidden");
    profileSection.classList.remove("hidden");
    hideStatus();
  } catch (err) {
    showStatus(`Request failed: ${err.message}`, "error");
  } finally {
    loadBtn.disabled = false;
  }
});

// -- Boot -----------------------------------------------------------------------
const _bootState = restoreFormFromStorage();

// Auto-submit when objId was supplied via URL param and a token is already stored.
(function autoLoadFromUrlParams() {
  try {
    const params = new URLSearchParams(window.location.search || "");
    const hasObjIdParam = !!getUrlParamValue(params, ["objId", "objectId"]);
    const hasToken = !!_bootState.token;
    if (hasObjIdParam && hasToken) {
      mainForm.dispatchEvent(new Event("submit", { bubbles: true, cancelable: true }));
    }
  } catch {
    // ignore
  }
}());

// If auth-service delivered a token via postbind, it lands in the URL fragment
// as #received-token=<encoded-jwt>.  Pick it up, prefill the field, then
// clean the fragment so it does not linger in the address bar.
(function pickupPostbindToken() {
  const hash = window.location.hash;
  const prefix = "#received-token=";
  let token = "";

  if (hash.startsWith(prefix)) {
    token = decodeURIComponent(hash.slice(prefix.length));
  }

  if (!token) {
    const params = new URLSearchParams(window.location.search);
    token = String(
      params.get("received-token")
      || params.get("token")
      || params.get("jwt")
      || ""
    ).trim();
  }

  const tokenInput = document.getElementById("token");
  if (token && tokenInput) {
    tokenInput.value = token;
    tokenInput.type = "text"; // briefly show it so the user sees something arrived
    setTimeout(() => { tokenInput.type = "password"; }, 2400);
    saveFormToStorage();
    sessionStorage.removeItem("tie_auth_login_started_at");

    // Remove token artifacts from URL without triggering a navigation.
    history.replaceState(null, "", window.location.pathname);
    showCenterNotice("JWT-Token vom Auth-Service empfangen und eingetragen.", "info", 3000);
    return;
  }

  const authStartedAt = Number(sessionStorage.getItem("tie_auth_login_started_at") || "0");
  const recentLogin = Number.isFinite(authStartedAt) && authStartedAt > 0 && (Date.now() - authStartedAt) < 10 * 60 * 1000;
  if (recentLogin) {
    sessionStorage.removeItem("tie_auth_login_started_at");
    showStatus("Login abgeschlossen, aber kein Token wurde an die App zurueckgegeben.", "warning");
  }
}());
