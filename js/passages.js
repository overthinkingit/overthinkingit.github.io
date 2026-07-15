(function () {
  var STORAGE_KEY = "passages:v1";
  var MOBILE_BREAKPOINT = 1100;
  var NOTE_GAP = 8;
  var CONTEXT_LEN = 40;
  var NOTE_DEBOUNCE_MS = 400;

  var popoverEl = null;
  var pendingRange = null;
  var openPassageId = null;
  var openPassageMark = null;
  var noteSaveTimer = null;
  var lastIsMobile = null;
  var noteRelayoutTimer = null;

  function normalizePath(path) {
    if (!path) return "/";
    var p = String(path).split("?")[0].split("#")[0];
    if (!p) return "/";
    if (p !== "/" && p.charAt(p.length - 1) !== "/") p += "/";
    if (p === "/index.html" || p === "/index.html/") return "/";
    return p;
  }

  function escapeHtml(str) {
    return String(str)
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;");
  }

  function escapeAttr(str) {
    return escapeHtml(str).replace(/'/g, "&#39;");
  }

  function makeId() {
    if (typeof crypto !== "undefined" && crypto.randomUUID) {
      return "p_" + crypto.randomUUID().replace(/-/g, "").slice(0, 16);
    }
    return "p_" + Date.now().toString(36) + Math.random().toString(36).slice(2, 8);
  }

  function isMobile() {
    return window.innerWidth <= MOBILE_BREAKPOINT;
  }

  function getDocumentTop(el) {
    return el.getBoundingClientRect().top + window.scrollY;
  }

  function loadPassages() {
    try {
      var raw = localStorage.getItem(STORAGE_KEY);
      if (!raw) return [];
      var parsed = JSON.parse(raw);
      if (!Array.isArray(parsed)) return [];
      return parsed.filter(function (p) {
        return p && typeof p.id === "string" && typeof p.text === "string" && p.text.length;
      });
    } catch (err) {
      return [];
    }
  }

  function savePassages(list) {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(list));
    } catch (err) {
      /* ignore quota / private mode */
    }
  }

  function getPassage(id) {
    var list = loadPassages();
    for (var i = 0; i < list.length; i++) {
      if (list[i].id === id) return list[i];
    }
    return null;
  }

  function upsertPassage(record) {
    var list = loadPassages();
    var found = false;
    for (var i = 0; i < list.length; i++) {
      if (list[i].id === record.id) {
        list[i] = record;
        found = true;
        break;
      }
    }
    if (!found) list.push(record);
    savePassages(list);
    return record;
  }

  function removePassage(id) {
    var list = loadPassages().filter(function (p) {
      return p.id !== id;
    });
    savePassages(list);
  }

  function updatePassageNote(id, note) {
    var list = loadPassages();
    for (var i = 0; i < list.length; i++) {
      if (list[i].id === id) {
        list[i].note = note;
        list[i].updatedAt = new Date().toISOString();
        savePassages(list);
        return list[i];
      }
    }
    return null;
  }

  function updateNoteHidden(id, hidden) {
    var list = loadPassages();
    for (var i = 0; i < list.length; i++) {
      if (list[i].id === id) {
        list[i].noteHidden = !!hidden;
        list[i].updatedAt = new Date().toISOString();
        savePassages(list);
        return list[i];
      }
    }
    return null;
  }

  function hasNoteText(passage) {
    return !!(passage && String(passage.note || "").trim());
  }

  function findPassageMark(id) {
    return document.querySelector('.saved-passage[data-passage-id="' + id + '"]');
  }

  function articleRoot() {
    return (
      document.querySelector(".page-content article") ||
      document.querySelector(".page-content")
    );
  }

  function isIgnorableNode(node) {
    if (!node || node.nodeType !== 1) return false;
    return !!(
      node.closest &&
      node.closest(
        ".margin-note, .inline-note, .saved-passage-note, .saved-passage-inline, .article-toc, .guide-widget, .site-nav, .site-footer, .site-search-dialog, .passage-save-popover, .saved-passages-page"
      )
    );
  }

  function selectionInArticle(range) {
    var root = articleRoot();
    if (!root || !range) return false;
    if (!root.contains(range.commonAncestorContainer)) return false;
    var ancestor =
      range.commonAncestorContainer.nodeType === 1
        ? range.commonAncestorContainer
        : range.commonAncestorContainer.parentElement;
    if (isIgnorableNode(ancestor)) return false;
    return true;
  }

  function getMappedFullText(root) {
    var map = getTextNodeMap(root);
    var parts = [];
    for (var i = 0; i < map.length; i++) parts.push(map[i].node.nodeValue);
    return { map: map, full: parts.join("") };
  }

  function getTextContext(range) {
    var root = articleRoot();
    if (!root || !range) return null;

    var mapped = getMappedFullText(root);
    var map = mapped.map;
    var full = mapped.full;

    var startOff = null;
    var endOff = null;

    for (var j = 0; j < map.length; j++) {
      var overlap = getTextNodeOverlap(range, map[j].node);
      if (!overlap) continue;
      var absStart = map[j].start + overlap.start;
      var absEnd = map[j].start + overlap.end;
      if (startOff === null || absStart < startOff) startOff = absStart;
      if (endOff === null || absEnd > endOff) endOff = absEnd;
    }

    if (startOff === null || endOff === null || startOff >= endOff) return null;

    var text = full.slice(startOff, endOff);
    if (!text.trim()) return null;

    return {
      text: text,
      prefix: full.slice(Math.max(0, startOff - CONTEXT_LEN), startOff),
      suffix: full.slice(endOff, Math.min(full.length, endOff + CONTEXT_LEN)),
    };
  }

  /* ============================================================
     Find & wrap text in the article
     ============================================================ */

  /**
   * Text nodes that contribute to article textContent, with cumulative offsets.
   * Includes text inside existing .saved-passage / .pali so offsets stay aligned
   * with root.textContent. Skips chrome (notes, toc, scripts).
   */
  function getTextNodeMap(root) {
    var entries = [];
    var cursor = 0;
    var walker = document.createTreeWalker(root, NodeFilter.SHOW_TEXT, {
      acceptNode: function (node) {
        if (!node.nodeValue) return NodeFilter.FILTER_REJECT;
        var parent = node.parentElement;
        if (!parent) return NodeFilter.FILTER_REJECT;
        if (
          parent.closest(
            "script, style, .saved-passage-inline, .inline-note, .margin-note, .saved-passage-note, .article-toc, .passage-save-popover"
          )
        ) {
          return NodeFilter.FILTER_REJECT;
        }
        return NodeFilter.FILTER_ACCEPT;
      },
    });
    var n;
    while ((n = walker.nextNode())) {
      var len = n.nodeValue.length;
      entries.push({ node: n, start: cursor, end: cursor + len });
      cursor += len;
    }
    return entries;
  }

  function findMatchOffsets(full, passage) {
    var needle = (passage.prefix || "") + passage.text + (passage.suffix || "");
    var idx = -1;
    if (passage.prefix || passage.suffix) {
      idx = full.indexOf(needle);
      if (idx !== -1) {
        return {
          start: idx + (passage.prefix || "").length,
          end: idx + (passage.prefix || "").length + passage.text.length,
        };
      }
    }
    idx = full.indexOf(passage.text);
    if (idx === -1) return null;
    return { start: idx, end: idx + passage.text.length };
  }

  function createMarkElement(passageId) {
    var mark = document.createElement("mark");
    mark.className = "saved-passage";
    mark.dataset.passageId = passageId;
    mark.setAttribute("tabindex", "0");
    mark.setAttribute("role", "button");
    mark.setAttribute("aria-label", "Saved passage — click to open note");
    mark.setAttribute("aria-expanded", "false");
    return mark;
  }

  /** Block-ish ancestor used as the wrap unit (one solid mark per block). */
  function getNearestBlock(node, root) {
    var el = node && node.nodeType === 1 ? node : node && node.parentElement;
    while (el && el !== root) {
      if (/^(P|LI|BLOCKQUOTE|H[1-6]|TD|TH|DT|DD|FIGCAPTION)$/i.test(el.tagName)) {
        return el;
      }
      el = el.parentElement;
    }
    return root;
  }

  /**
   * Split text nodes at range boundaries so surroundContents can wrap
   * contiguous phrasing (links, .pali, em, …) in one <mark>.
   */
  function splitRangeBoundaries(range) {
    if (!range || range.collapsed) return;

    var endContainer = range.endContainer;
    var endOffset = range.endOffset;
    if (
      endContainer.nodeType === 3 &&
      endOffset > 0 &&
      endOffset < endContainer.nodeValue.length
    ) {
      endContainer.splitText(endOffset);
    }

    var startContainer = range.startContainer;
    var startOffset = range.startOffset;
    if (
      startContainer.nodeType === 3 &&
      startOffset > 0 &&
      startOffset < startContainer.nodeValue.length
    ) {
      var after = startContainer.splitText(startOffset);
      range.setStart(after, 0);
    }
  }

  function clampRangeToBlock(outer, block) {
    if (!outer || !block) return null;
    var blockRange = document.createRange();
    try {
      blockRange.selectNodeContents(block);
    } catch (err) {
      return null;
    }

    var r = outer.cloneRange();
    try {
      if (r.compareBoundaryPoints(Range.START_TO_START, blockRange) < 0) {
        r.setStart(blockRange.startContainer, blockRange.startOffset);
      }
      if (r.compareBoundaryPoints(Range.END_TO_END, blockRange) > 0) {
        r.setEnd(blockRange.endContainer, blockRange.endOffset);
      }
    } catch (err) {
      return null;
    }

    if (r.collapsed) return null;
    if (!/\S/.test(r.toString())) return null;

    var ca = r.commonAncestorContainer;
    if (ca !== block && !block.contains(ca)) return null;
    return r;
  }

  function rangeFromCharacterOffsets(root, start, end) {
    if (start >= end) return null;
    var map = getTextNodeMap(root);
    var range = document.createRange();
    var setStart = false;
    var setEnd = false;

    for (var i = 0; i < map.length; i++) {
      var entry = map[i];
      if (!setStart && start >= entry.start && start <= entry.end) {
        range.setStart(entry.node, start - entry.start);
        setStart = true;
      }
      if (!setEnd && end >= entry.start && end <= entry.end) {
        range.setEnd(entry.node, end - entry.start);
        setEnd = true;
      }
      if (setStart && setEnd) break;
    }

    if (!setStart || !setEnd || range.collapsed) return null;
    return range;
  }

  /** Wrap a slice of a single text node. Never crosses element boundaries. */
  function wrapTextNodePortion(textNode, localStart, localEnd, passageId) {
    if (!textNode || !textNode.parentNode) return null;
    if (textNode.parentElement && textNode.parentElement.closest(".saved-passage")) {
      return null;
    }
    if (localStart >= localEnd) return null;
    if (localStart < 0) localStart = 0;
    if (localEnd > textNode.nodeValue.length) localEnd = textNode.nodeValue.length;
    if (localStart >= localEnd) return null;

    var mark = createMarkElement(passageId);
    var range = document.createRange();
    try {
      range.setStart(textNode, localStart);
      range.setEnd(textNode, localEnd);
      range.surroundContents(mark);
    } catch (err) {
      return null;
    }
    return mark;
  }

  /** Fallback when surroundContents cannot wrap a partial non-text selection. */
  function wrapRangeByTextNodes(range, passageId) {
    var root = articleRoot();
    if (!root || !range) return null;

    var ancestor = range.commonAncestorContainer;
    if (ancestor.nodeType === 3) ancestor = ancestor.parentNode;
    if (!ancestor || !root.contains(ancestor)) ancestor = root;

    var map = getTextNodeMap(root);
    var segments = [];

    for (var i = 0; i < map.length; i++) {
      var entry = map[i];
      var node = entry.node;
      if (!ancestor.contains(node)) continue;
      if (node.parentElement && node.parentElement.closest(".saved-passage")) continue;
      if (!/\S/.test(node.nodeValue)) continue;

      var overlap = getTextNodeOverlap(range, node);
      if (!overlap) continue;

      segments.push({
        node: node,
        localStart: overlap.start,
        localEnd: overlap.end,
      });
    }

    if (!segments.length) return null;

    var firstMark = null;
    for (var j = segments.length - 1; j >= 0; j--) {
      var seg = segments[j];
      var mark = wrapTextNodePortion(seg.node, seg.localStart, seg.localEnd, passageId);
      if (mark) firstMark = mark;
    }
    return firstMark;
  }

  /**
   * Wrap one block-clamped range as a single <mark> when possible, so links
   * and .pali spans sit inside the highlight instead of splitting it.
   */
  function wrapContiguousRange(range, passageId) {
    if (!range || range.collapsed) return null;
    if (!/\S/.test(range.toString())) return null;

    var anc = range.commonAncestorContainer;
    if (anc.nodeType === 3) anc = anc.parentElement;
    if (anc && anc.closest && anc.closest(".saved-passage")) return null;

    var working = range.cloneRange();
    splitRangeBoundaries(working);
    if (working.collapsed || !/\S/.test(working.toString())) return null;

    var mark = createMarkElement(passageId);
    try {
      working.surroundContents(mark);
      return mark;
    } catch (err) {
      /* Partial element boundary — fall back to per-text-node marks. */
      return wrapRangeByTextNodes(working, passageId);
    }
  }

  /**
   * Highlight [start, end) in root. Prefers one solid <mark> per block so
   * fully selected links / .pali terms stay inside the highlight.
   */
  function wrapCharacterRange(root, start, end, passageId) {
    var range = rangeFromCharacterOffsets(root, start, end);
    if (!range) return null;
    return wrapDomRange(range, passageId);
  }

  /** Wrap a live DOM Range (used on save). One mark per intersecting block. */
  function wrapDomRange(range, passageId) {
    var root = articleRoot();
    if (!root || !range) return null;

    var ancestor = range.commonAncestorContainer;
    if (ancestor.nodeType === 3) ancestor = ancestor.parentNode;
    if (!ancestor || !root.contains(ancestor)) ancestor = root;

    var map = getTextNodeMap(root);
    var blocks = [];
    var seen = typeof WeakSet !== "undefined" ? new WeakSet() : null;

    for (var i = 0; i < map.length; i++) {
      var node = map[i].node;
      if (!ancestor.contains(node)) continue;
      if (node.parentElement && node.parentElement.closest(".saved-passage")) continue;
      if (!getTextNodeOverlap(range, node)) continue;

      var block = getNearestBlock(node, root);
      if (!block) continue;
      if (seen) {
        if (seen.has(block)) continue;
        seen.add(block);
      } else if (blocks.indexOf(block) !== -1) {
        continue;
      }
      blocks.push(block);
    }

    if (!blocks.length) return wrapRangeByTextNodes(range, passageId);

    var firstMark = null;
    for (var j = blocks.length - 1; j >= 0; j--) {
      var blockRange = clampRangeToBlock(range, blocks[j]);
      if (!blockRange) continue;
      var mark = wrapContiguousRange(blockRange, passageId);
      if (mark) firstMark = mark;
    }
    return firstMark;
  }

  /**
   * Local [start, end) within a text node overlapping `range`.
   * Element-bounded ranges (selectNodeContents) fully include descendant text nodes.
   */
  function getTextNodeOverlap(range, node) {
    if (!node || node.nodeType !== 3) return null;
    if (typeof range.intersectsNode === "function") {
      try {
        if (!range.intersectsNode(node)) return null;
      } catch (err) {
        return null;
      }
    }

    var start = 0;
    var end = node.nodeValue.length;

    if (range.startContainer === node) start = range.startOffset;
    if (range.endContainer === node) end = range.endOffset;

    if (start < 0) start = 0;
    if (end > node.nodeValue.length) end = node.nodeValue.length;
    if (start >= end) return null;
    return { start: start, end: end };
  }

  /** Remove empty/orphan marks left by older buggy wraps. */
  function cleanupBrokenMarks(root) {
    if (!root) return;
    root.querySelectorAll("mark.saved-passage").forEach(function (mark) {
      if (!(mark.textContent || "").trim()) {
        mark.remove();
      }
    });
    // Empty paragraphs left behind by extractContents mishaps
    root.querySelectorAll("p").forEach(function (p) {
      if (!p.textContent.trim() && !p.querySelector("img, svg, canvas")) {
        p.remove();
      }
    });
    root.normalize();
  }

  function applyMarksForPath() {
    var root = articleRoot();
    if (!root) return;

    cleanupBrokenMarks(root);

    var path = normalizePath(window.location.pathname);
    var forPage = loadPassages().filter(function (p) {
      return normalizePath(p.path) === path;
    });

    // One passage at a time, end→start in the article, so offsets stay valid
    var matches = [];
    var full = getMappedFullText(root).full;
    forPage.forEach(function (passage) {
      if (root.querySelector('.saved-passage[data-passage-id="' + passage.id + '"]')) {
        return;
      }
      var offsets = findMatchOffsets(full, passage);
      if (!offsets) return;
      matches.push({ passage: passage, start: offsets.start, end: offsets.end });
    });
    matches.sort(function (a, b) {
      return b.start - a.start;
    });
    matches.forEach(function (m) {
      wrapCharacterRange(root, m.start, m.end, m.passage.id);
    });

    bindMarkHandlers(root);
  }

  function bindMarkHandlers(root) {
    root.querySelectorAll(".saved-passage:not([data-passage-bound])").forEach(function (mark) {
      mark.setAttribute("data-passage-bound", "1");
      mark.addEventListener("click", function (e) {
        e.preventDefault();
        e.stopPropagation();
        togglePassageNote(mark.dataset.passageId, mark);
      });
      mark.addEventListener("keydown", function (e) {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          togglePassageNote(mark.dataset.passageId, mark);
        }
      });
    });
  }

  /* ============================================================
     Selection popover — bookmark in the left gutter
     ============================================================ */

  function ensurePopover() {
    if (popoverEl) return popoverEl;
    popoverEl = document.createElement("div");
    popoverEl.className = "passage-save-popover";
    popoverEl.setAttribute("role", "toolbar");
    popoverEl.hidden = true;
    popoverEl.innerHTML =
      '<button type="button" class="passage-save-popover__btn" aria-label="Save passage" title="Save passage">' +
      '<svg class="passage-save-popover__icon" xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">' +
      '<path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z"/>' +
      "</svg>" +
      "</button>";
    document.body.appendChild(popoverEl);
    var btn = popoverEl.querySelector("button");
    // Keep the selection alive while pressing the bookmark
    btn.addEventListener("mousedown", function (e) {
      e.preventDefault();
      e.stopPropagation();
    });
    btn.addEventListener("click", function (e) {
      e.preventDefault();
      e.stopPropagation();
      saveCurrentSelection();
    });
    return popoverEl;
  }

  function hidePopover() {
    if (popoverEl) popoverEl.hidden = true;
    pendingRange = null;
  }

  function showPopoverForSelection() {
    var sel = window.getSelection();
    if (!sel || sel.rangeCount === 0 || sel.isCollapsed) {
      hidePopover();
      return;
    }
    var range = sel.getRangeAt(0);
    if (!selectionInArticle(range)) {
      hidePopover();
      return;
    }
    var text = range.toString();
    if (!text || !text.trim() || text.trim().length < 2) {
      hidePopover();
      return;
    }

    // Don't offer save if selection is entirely inside an existing mark
    var ancestor =
      range.commonAncestorContainer.nodeType === 1
        ? range.commonAncestorContainer
        : range.commonAncestorContainer.parentElement;
    if (ancestor && ancestor.closest && ancestor.closest(".saved-passage")) {
      hidePopover();
      return;
    }

    pendingRange = range.cloneRange();
    var pop = ensurePopover();
    var rect = range.getBoundingClientRect();
    var content = document.querySelector(".page-content");
    var contentRect = content
      ? content.getBoundingClientRect()
      : { left: rect.left };

    pop.hidden = false;
    var iconW = pop.offsetWidth || 36;
    var iconH = pop.offsetHeight || 36;

    // Align with the first line of the selection, in the right gutter
    var top = rect.top + window.scrollY + Math.max(0, (Math.min(rect.height, 28) - iconH) / 2);
    var left = contentRect.right + window.scrollX + 12;

    // Narrow viewports: tuck just right of the selection if the gutter is gone
    var maxLeft = window.scrollX + window.innerWidth - iconW - 6;
    if (left > maxLeft) {
      left = Math.min(maxLeft, rect.right + window.scrollX + 8);
    }

    pop.style.top = top + "px";
    pop.style.left = left + "px";
  }

  function pageTitle() {
    var h1 = document.querySelector(".page-header__title");
    if (h1 && h1.textContent) return h1.textContent.trim();
    var t = document.title || "";
    var sep = t.indexOf(" — ");
    return sep !== -1 ? t.slice(0, sep) : t;
  }

  function saveCurrentSelection() {
    if (!pendingRange) return;
    var ctx = getTextContext(pendingRange);
    if (!ctx || !ctx.text.trim()) {
      hidePopover();
      return;
    }

    var now = new Date().toISOString();
    var record = {
      id: makeId(),
      path: normalizePath(window.location.pathname),
      title: pageTitle(),
      text: ctx.text,
      prefix: ctx.prefix,
      suffix: ctx.suffix,
      note: "",
      noteHidden: false,
      createdAt: now,
      updatedAt: now,
    };

    upsertPassage(record);

    var rangeToWrap = pendingRange;
    hidePopover();
    window.getSelection().removeAllRanges();

    var root = articleRoot();
    if (root && rangeToWrap) {
      var mark = wrapDomRange(rangeToWrap, record.id);
      if (!mark) {
        // Fallback: re-find by stored text (e.g. if range became detached)
        var full = getMappedFullText(root).full;
        var offsets = findMatchOffsets(full, record);
        if (offsets) mark = wrapCharacterRange(root, offsets.start, offsets.end, record.id);
      }
      if (mark) {
        bindMarkHandlers(root);
        document
          .querySelectorAll('.saved-passage[data-passage-id="' + record.id + '"]')
          .forEach(function (m) {
            m.classList.add("saved-passage--just-saved");
            setTimeout(function () {
              m.classList.remove("saved-passage--just-saved");
            }, 1200);
          });
        // Open the note editor for the new passage
        var firstMark =
          root.querySelector('.saved-passage[data-passage-id="' + record.id + '"]') || mark;
        togglePassageNote(record.id, firstMark);
      }
    }

    showSaveToast();
  }

  function showSaveToast() {
    var existing = document.querySelector(".passage-toast");
    if (existing) existing.remove();
    var toast = document.createElement("div");
    toast.className = "passage-toast";
    toast.setAttribute("role", "status");
    toast.innerHTML =
      'Passage saved. <a href="/saved/">View saved passages</a>';
    document.body.appendChild(toast);
    requestAnimationFrame(function () {
      toast.classList.add("passage-toast--visible");
    });
    setTimeout(function () {
      toast.classList.remove("passage-toast--visible");
      setTimeout(function () {
        toast.remove();
      }, 300);
    }, 3200);
  }

  /* ============================================================
     Notes (margin / inline) — edit / preview / chip
     ============================================================ */

  function noteUiSelector(id) {
    return (
      '.saved-passage-note[data-passage-id="' +
      id +
      '"], .saved-passage-inline[data-passage-id="' +
      id +
      '"]'
    );
  }

  function removeNoteUi(id) {
    document.querySelectorAll(noteUiSelector(id)).forEach(function (el) {
      el.remove();
    });
  }

  function clearEditingMarks(id) {
    document.querySelectorAll('.saved-passage[data-passage-id="' + id + '"]').forEach(function (mark) {
      mark.setAttribute("aria-expanded", "false");
      mark.classList.remove("saved-passage--active");
    });
  }

  function setEditingMarks(id) {
    document.querySelectorAll('.saved-passage[data-passage-id="' + id + '"]').forEach(function (mark) {
      mark.setAttribute("aria-expanded", "true");
      mark.classList.add("saved-passage--active");
    });
  }

  function dismissOpenEditor() {
    if (!openPassageId) return;
    var id = openPassageId;
    leaveEditMode(id, findPassageMark(id));
  }

  /** Remove every note panel (edit/preview/chip). Used before full remount. */
  function clearAllNotePanels() {
    document.querySelectorAll(".saved-passage-note, .saved-passage-inline").forEach(function (el) {
      el.remove();
    });
    document.querySelectorAll(".saved-passage[aria-expanded='true']").forEach(function (mark) {
      mark.setAttribute("aria-expanded", "false");
      mark.classList.remove("saved-passage--active");
    });
    openPassageId = null;
  }

  /** @deprecated name kept for call sites that mean “dismiss editor” */
  function closeAllPassageNotes() {
    dismissOpenEditor();
  }

  function closeAllPaliNotes() {
    document.querySelectorAll(".pali--active").forEach(function (span) {
      var noteId = span.dataset.noteId;
      if (noteId) {
        var note = document.getElementById(noteId);
        if (note) note.remove();
        delete span.dataset.noteId;
      }
      span.classList.remove("pali--active");
      span.setAttribute("aria-expanded", "false");
    });
  }

  function mountClosedNote(passage, mark) {
    if (!passage || !mark || !hasNoteText(passage)) {
      relayoutPassageNotes(document.querySelector(".margin-notes"));
      return;
    }
    if (passage.noteHidden) {
      placeNoteCard(buildChipCard(passage), mark, "chip");
    } else {
      placeNoteCard(buildPreviewCard(passage), mark, "preview");
    }
  }

  function leaveEditMode(id, mark) {
    clearEditingMarks(id);
    if (openPassageId === id) openPassageId = null;
    var anchor = mark || openPassageMark || findPassageMark(id);
    openPassageMark = null;
    removeNoteUi(id);
    var passage = getPassage(id);
    if (passage && anchor) {
      mountClosedNote(passage, anchor);
    } else {
      relayoutPassageNotes(document.querySelector(".margin-notes"));
    }
  }

  function saveAndLeave(id, noteText, mark) {
    updatePassageNote(id, noteText);
    if (String(noteText || "").trim()) {
      updateNoteHidden(id, false);
    }
    clearEditingMarks(id);
    if (openPassageId === id) openPassageId = null;
    var anchor = mark || openPassageMark || findPassageMark(id);
    openPassageMark = null;
    removeNoteUi(id);
    var passage = getPassage(id);
    if (passage && anchor) {
      mountClosedNote(passage, anchor);
    } else {
      relayoutPassageNotes(document.querySelector(".margin-notes"));
    }
    refreshSavedPageIfPresent();
  }

  function togglePassageNote(id, mark) {
    if (openPassageId === id) {
      leaveEditMode(id, mark);
      return;
    }
    openEdit(id, mark);
  }

  function openEdit(id, mark) {
    if (openPassageId && openPassageId !== id) {
      leaveEditMode(openPassageId, openPassageMark || findPassageMark(openPassageId));
    }
    closeAllPaliNotes();
    window.dispatchEvent(new CustomEvent("passages:note-open", { detail: { id: id } }));

    var passage = getPassage(id);
    if (!passage) return;

    openPassageId = id;
    openPassageMark = mark || findPassageMark(id);
    setEditingMarks(id);
    removeNoteUi(id);
    placeNoteCard(buildEditCard(passage), openPassageMark, "edit");
  }

  function placeNoteCard(card, mark, mode) {
    if (!card || !mark) return;

    if (isMobile() || !document.querySelector(".margin-notes")) {
      card.classList.remove(
        "saved-passage-note",
        "saved-passage-note--preview",
        "saved-passage-note--chip"
      );
      card.classList.add("saved-passage-inline");
      card.classList.toggle("saved-passage-inline--preview", mode === "preview");
      card.classList.toggle("saved-passage-inline--chip", mode === "chip");
      var parent = mark.closest("p, li, blockquote") || mark.parentElement;
      parent.insertAdjacentElement("afterend", card);
      if (mode === "edit" && typeof card.scrollIntoView === "function") {
        card.scrollIntoView({ block: "nearest", behavior: "smooth" });
      }
      if (mode === "edit") textareaFocus(card);
      return;
    }

    var marginEl = document.querySelector(".margin-notes");
    var topOffset = Math.max(0, getDocumentTop(mark) - getDocumentTop(marginEl));
    card.dataset.idealTop = String(topOffset);
    card.classList.toggle("saved-passage-note--preview", mode === "preview");
    card.classList.toggle("saved-passage-note--chip", mode === "chip");
    marginEl.appendChild(card);
    relayoutPassageNotes(marginEl);
    if (mode === "edit") textareaFocus(card);
  }

  function syncEditDirtyState(wrap, textarea, savedNote) {
    var status = wrap.querySelector(".saved-passage-note__status");
    var cancelBtn = wrap.querySelector(".saved-passage-note__cancel");
    var dirty = textarea.value !== (savedNote || "");
    if (status) {
      if (dirty) {
        status.hidden = false;
        status.textContent = "Unsaved changes";
      } else {
        status.hidden = true;
        status.textContent = "";
      }
    }
    if (cancelBtn) cancelBtn.hidden = !dirty;
  }

  function noteIconSvg(name) {
    if (name === "pencil") {
      return (
        '<svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">' +
        '<path d="M12 20h9"/>' +
        '<path d="M16.5 3.5a2.12 2.12 0 0 1 3 3L7 19l-4 1 1-4Z"/>' +
        "</svg>"
      );
    }
    if (name === "minimize") {
      return (
        '<svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">' +
        '<path d="M5 12h14"/>' +
        "</svg>"
      );
    }
    return "";
  }

  function buildEditCard(passage) {
    var wrap = document.createElement("div");
    wrap.className = "saved-passage-note";
    wrap.dataset.passageId = passage.id;
    wrap.dataset.mode = "edit";
    wrap.setAttribute("role", "note");

    var savedNote = passage.note || "";
    wrap.innerHTML =
      '<div class="saved-passage-note__header">' +
      '<p class="saved-passage-note__label">Your note</p>' +
      '<div class="saved-passage-note__tools">' +
      '<button type="button" class="saved-passage-note__icon-btn saved-passage-note__close" aria-label="Close note editor">' +
      noteIconSvg("minimize") +
      "</button>" +
      "</div>" +
      "</div>" +
      '<textarea class="saved-passage-note__textarea" rows="4" placeholder="Write in the margin…">' +
      escapeHtml(savedNote) +
      "</textarea>" +
      '<p class="saved-passage-note__status" hidden></p>' +
      '<div class="saved-passage-note__actions">' +
      '<button type="button" class="saved-passage-note__save" aria-label="Save note">Save</button>' +
      '<button type="button" class="saved-passage-note__cancel" hidden aria-label="Cancel note edits">Cancel</button>' +
      '<button type="button" class="saved-passage-note__remove" aria-label="Remove saved passage">Remove passage</button>' +
      "</div>";

    var textarea = wrap.querySelector(".saved-passage-note__textarea");
    var mark = function () {
      return openPassageMark || findPassageMark(passage.id);
    };

    function cancelOrClose() {
      leaveEditMode(passage.id, mark());
    }

    wrap.querySelector(".saved-passage-note__close").addEventListener("click", cancelOrClose);
    wrap.querySelector(".saved-passage-note__cancel").addEventListener("click", cancelOrClose);

    textarea.addEventListener("input", function () {
      syncEditDirtyState(wrap, textarea, savedNote);
    });

    wrap.querySelector(".saved-passage-note__save").addEventListener("click", function () {
      saveAndLeave(passage.id, textarea.value, mark());
    });

    wrap.querySelector(".saved-passage-note__remove").addEventListener("click", function () {
      removePassageAndMark(passage.id);
    });

    return wrap;
  }

  function buildPreviewCard(passage) {
    var wrap = document.createElement("div");
    wrap.className = "saved-passage-note saved-passage-note--preview";
    wrap.dataset.passageId = passage.id;
    wrap.dataset.mode = "preview";
    wrap.setAttribute("role", "note");

    wrap.innerHTML =
      '<div class="saved-passage-note__header">' +
      '<div class="saved-passage-note__tools">' +
      '<button type="button" class="saved-passage-note__icon-btn saved-passage-note__edit" aria-label="Edit note" title="Edit note">' +
      noteIconSvg("pencil") +
      "</button>" +
      '<button type="button" class="saved-passage-note__icon-btn saved-passage-note__hide" aria-label="Hide note" title="Hide note">' +
      noteIconSvg("minimize") +
      "</button>" +
      "</div>" +
      "</div>" +
      '<p class="saved-passage-note__body"></p>';

    wrap.querySelector(".saved-passage-note__body").textContent = String(passage.note || "").trim();

    wrap.querySelector(".saved-passage-note__edit").addEventListener("click", function () {
      openEdit(passage.id, findPassageMark(passage.id));
    });

    wrap.querySelector(".saved-passage-note__hide").addEventListener("click", function () {
      updateNoteHidden(passage.id, true);
      removeNoteUi(passage.id);
      var updated = getPassage(passage.id);
      var anchor = findPassageMark(passage.id);
      if (updated && anchor) mountClosedNote(updated, anchor);
    });

    return wrap;
  }

  function buildChipCard(passage) {
    var wrap = document.createElement("div");
    wrap.className = "saved-passage-note saved-passage-note--chip";
    wrap.dataset.passageId = passage.id;
    wrap.dataset.mode = "chip";
    wrap.setAttribute("role", "note");

    wrap.innerHTML =
      '<button type="button" class="saved-passage-note__icon-btn saved-passage-note__show" aria-label="Show note" title="Show note">' +
      noteIconSvg("pencil") +
      "</button>";

    wrap.querySelector(".saved-passage-note__show").addEventListener("click", function () {
      updateNoteHidden(passage.id, false);
      removeNoteUi(passage.id);
      var updated = getPassage(passage.id);
      var anchor = findPassageMark(passage.id);
      if (updated && anchor) mountClosedNote(updated, anchor);
    });

    return wrap;
  }

  function textareaFocus(note) {
    var ta = note.querySelector("textarea");
    if (ta) {
      setTimeout(function () {
        ta.focus();
      }, 50);
    }
  }

  function relayoutPassageNotes(marginEl) {
    if (!marginEl) return;
    var notes = Array.from(marginEl.querySelectorAll(".saved-passage-note"));
    if (!notes.length) return;
    notes.sort(function (a, b) {
      return parseFloat(a.dataset.idealTop) - parseFloat(b.dataset.idealTop);
    });

    var cursor = 0;
    var tops = notes.map(function (note) {
      var ideal = parseFloat(note.dataset.idealTop) || 0;
      var top = Math.max(ideal, cursor);
      cursor = top + note.offsetHeight + NOTE_GAP;
      return top;
    });

    var pageContent = document.querySelector(".page-content");
    var maxBottom = pageContent ? pageContent.offsetHeight : Infinity;
    for (var i = notes.length - 1; i >= 0; i--) {
      var capped = maxBottom - notes[i].offsetHeight;
      if (tops[i] > capped) tops[i] = Math.max(0, capped);
      if (i > 0) {
        var maxForPrev = tops[i] - notes[i - 1].offsetHeight - NOTE_GAP;
        if (tops[i - 1] > maxForPrev) tops[i - 1] = Math.max(0, maxForPrev);
      }
    }

    notes.forEach(function (note, i) {
      note.style.top = tops[i] + "px";
    });
  }

  /** Recompute ideal tops from current mark positions (after images/fonts settle). */
  function syncMarginNotePositions() {
    var marginEl = document.querySelector(".margin-notes");
    if (!marginEl || isMobile()) return;
    var notes = marginEl.querySelectorAll(".saved-passage-note");
    if (!notes.length) return;
    var marginTop = getDocumentTop(marginEl);
    notes.forEach(function (note) {
      var mark = findPassageMark(note.dataset.passageId);
      if (!mark) return;
      note.dataset.idealTop = String(Math.max(0, getDocumentTop(mark) - marginTop));
    });
    relayoutPassageNotes(marginEl);
  }

  function scheduleMarginNoteSync() {
    clearTimeout(noteRelayoutTimer);
    noteRelayoutTimer = setTimeout(syncMarginNotePositions, 50);
  }

  function restoreNotePanels() {
    var path = normalizePath(window.location.pathname);
    var forPage = loadPassages().filter(function (p) {
      return normalizePath(p.path) === path && hasNoteText(p);
    });
    forPage.forEach(function (passage) {
      var mark = findPassageMark(passage.id);
      if (!mark) return;
      if (document.querySelector(noteUiSelector(passage.id))) return;
      mountClosedNote(passage, mark);
    });
    scheduleMarginNoteSync();
  }

  function remountAllNotePanels() {
    var editingId = openPassageId;
    var draft = null;
    if (editingId) {
      var openUi = document.querySelector(noteUiSelector(editingId));
      var ta = openUi && openUi.querySelector("textarea");
      if (ta) draft = ta.value;
    }
    clearAllNotePanels();
    restoreNotePanels();
    if (editingId) {
      var mark = findPassageMark(editingId);
      if (mark) {
        openEdit(editingId, mark);
        if (draft !== null) {
          var wrap = document.querySelector(noteUiSelector(editingId));
          var ta2 = wrap && wrap.querySelector("textarea");
          var passage = getPassage(editingId);
          if (ta2 && passage) {
            ta2.value = draft;
            syncEditDirtyState(wrap, ta2, passage.note || "");
          }
        }
      }
    }
  }

  function removePassageAndMark(id) {
    removePassage(id);
    removeNoteUi(id);
    clearEditingMarks(id);
    if (openPassageId === id) openPassageId = null;
    document.querySelectorAll('.saved-passage[data-passage-id="' + id + '"]').forEach(function (mark) {
      var parent = mark.parentNode;
      while (mark.firstChild) parent.insertBefore(mark.firstChild, mark);
      mark.remove();
      if (parent) parent.normalize();
    });
    relayoutPassageNotes(document.querySelector(".margin-notes"));
    refreshSavedPageIfPresent();
  }

  /* ============================================================
     Markdown export / import
     ============================================================ */

  function siteOrigin() {
    return window.location.origin || "";
  }

  function exportMarkdown() {
    var list = loadPassages().slice().sort(function (a, b) {
      return (b.createdAt || "").localeCompare(a.createdAt || "");
    });
    var lines = [
      "---",
      "format: overthinkingit-passages",
      "version: 1",
      "exported: " + new Date().toISOString(),
      "---",
      "",
    ];

    list.forEach(function (p) {
      lines.push("## Passage");
      lines.push("");
      lines.push("- id: " + p.id);
      lines.push("- article: " + (p.title || "").replace(/\n/g, " "));
      lines.push("- url: " + siteOrigin() + (p.path || "/"));
      lines.push("- path: " + (p.path || "/"));
      lines.push("- created: " + (p.createdAt || ""));
      lines.push("- updated: " + (p.updatedAt || ""));
      lines.push("");
      // Blockquote each line of the passage text
      String(p.text)
        .split("\n")
        .forEach(function (line) {
          lines.push("> " + line);
        });
      lines.push("");
      if (p.note && String(p.note).trim()) {
        lines.push("### Note");
        lines.push("");
        lines.push(String(p.note).trim());
        lines.push("");
      }
      lines.push("---");
      lines.push("");
    });

    var blob = new Blob([lines.join("\n")], { type: "text/markdown;charset=utf-8" });
    var url = URL.createObjectURL(blob);
    var a = document.createElement("a");
    a.href = url;
    a.download = "overthinkingit-saved-passages.md";
    document.body.appendChild(a);
    a.click();
    a.remove();
    setTimeout(function () {
      URL.revokeObjectURL(url);
    }, 1000);
  }

  function parseImportMarkdown(md) {
    var text = String(md || "").replace(/^\uFEFF/, "");
    // Front matter
    var fmMatch = text.match(/^---\r?\n([\s\S]*?)\r?\n---\r?\n?/);
    if (!fmMatch) return { error: "Missing front matter. Expected format: overthinkingit-passages." };
    var fm = fmMatch[1];
    if (!/format:\s*overthinkingit-passages/.test(fm)) {
      return { error: "Unrecognized file. Expected format: overthinkingit-passages." };
    }

    var body = text.slice(fmMatch[0].length);
    var blocks = body.split(/\n---\s*\n/).filter(function (b) {
      return /##\s*Passage/.test(b);
    });

    var imported = [];
    blocks.forEach(function (block) {
      var id = (block.match(/^- id:\s*(.+)$/m) || [])[1];
      var title = (block.match(/^- article:\s*(.+)$/m) || [])[1];
      var path = (block.match(/^- path:\s*(.+)$/m) || [])[1];
      var created = (block.match(/^- created:\s*(.+)$/m) || [])[1];
      var updated = (block.match(/^- updated:\s*(.+)$/m) || [])[1];

      if (!id) id = makeId();
      id = id.trim();
      if (title) title = title.trim();
      if (path) path = normalizePath(path.trim());
      else path = "/";

      // Quote block: lines starting with >
      var quoteLines = [];
      var inQuote = false;
      var lines = block.split(/\r?\n/);
      for (var i = 0; i < lines.length; i++) {
        var line = lines[i];
        if (/^>\s?/.test(line)) {
          inQuote = true;
          quoteLines.push(line.replace(/^>\s?/, ""));
        } else if (inQuote) {
          break;
        }
      }
      var passageText = quoteLines.join("\n").trim();
      if (!passageText) return;

      var note = "";
      var noteMatch = block.match(/###\s*Note\s*\n+([\s\S]*?)(?=\n##\s|\n---\s*$|$)/);
      if (noteMatch) {
        note = noteMatch[1].replace(/\n+$/, "").trim();
      }

      imported.push({
        id: id,
        path: path,
        title: title || "Untitled",
        text: passageText,
        prefix: "",
        suffix: "",
        note: note,
        createdAt: (created && created.trim()) || new Date().toISOString(),
        updatedAt: (updated && updated.trim()) || new Date().toISOString(),
      });
    });

    return { passages: imported };
  }

  function importMarkdownFile(file, statusEl) {
    var reader = new FileReader();
    reader.onload = function () {
      var result = parseImportMarkdown(reader.result);
      if (result.error) {
        setImportStatus(statusEl, result.error, true);
        return;
      }
      var incoming = result.passages || [];
      if (!incoming.length) {
        setImportStatus(statusEl, "No passages found in that file.", true);
        return;
      }
      var list = loadPassages();
      var byId = {};
      list.forEach(function (p) {
        byId[p.id] = p;
      });
      var added = 0;
      var updated = 0;
      incoming.forEach(function (p) {
        if (byId[p.id]) {
          byId[p.id] = p;
          updated++;
        } else {
          byId[p.id] = p;
          added++;
        }
      });
      var merged = Object.keys(byId).map(function (k) {
        return byId[k];
      });
      savePassages(merged);
      setImportStatus(
        statusEl,
        "Imported " + added + " new, updated " + updated + ".",
        false
      );
      refreshSavedPageIfPresent();
      applyMarksForPath();
    };
    reader.onerror = function () {
      setImportStatus(statusEl, "Could not read that file.", true);
    };
    reader.readAsText(file);
  }

  function setImportStatus(el, msg, isError) {
    if (!el) return;
    el.textContent = msg;
    el.hidden = false;
    el.classList.toggle("saved-passages__status--error", !!isError);
  }

  /* ============================================================
     Saved passages page
     ============================================================ */

  function formatRelativeDate(iso) {
    if (!iso) return "";
    var then = new Date(iso).getTime();
    if (isNaN(then)) return "";
    var diff = Date.now() - then;
    var mins = Math.floor(diff / 60000);
    if (mins < 1) return "just now";
    if (mins < 60) return mins + "m ago";
    var hours = Math.floor(mins / 60);
    if (hours < 24) return hours + "h ago";
    var days = Math.floor(hours / 24);
    if (days < 30) return days + "d ago";
    try {
      return new Date(iso).toLocaleDateString(undefined, {
        year: "numeric",
        month: "short",
        day: "numeric",
      });
    } catch (err) {
      return iso.slice(0, 10);
    }
  }

  function refreshSavedPageIfPresent() {
    var root = document.getElementById("saved-passages-root");
    if (root) renderSavedPage(root);
  }

  function renderSavedPage(root) {
    var list = loadPassages().slice().sort(function (a, b) {
      return (b.createdAt || "").localeCompare(a.createdAt || "");
    });

    if (!list.length) {
      root.innerHTML =
        '<div class="placeholder-notice saved-passages__empty">' +
        "<p>No saved passages yet.</p>" +
        "<p>On any article, select a stretch of text and choose <strong>Save passage</strong>. " +
        "Click a highlight later to add a note.</p>" +
        "</div>";
      return;
    }

    var html = '<ul class="saved-passages-list">';
    list.forEach(function (p) {
      html +=
        '<li class="saved-passages-list__item" data-passage-id="' +
        escapeAttr(p.id) +
        '">' +
        '<blockquote class="saved-passages-list__quote">' +
        escapeHtml(p.text) +
        "</blockquote>" +
        '<div class="saved-passages-list__meta">' +
        '<a class="saved-passages-list__link" href="' +
        escapeAttr(p.path || "/") +
        '">' +
        escapeHtml(p.title || "Article") +
        "</a>" +
        '<span class="saved-passages-list__date">' +
        escapeHtml(formatRelativeDate(p.createdAt)) +
        "</span>" +
        "</div>" +
        '<label class="saved-passages-list__note-label" for="note-' +
        escapeAttr(p.id) +
        '">Note</label>' +
        '<textarea id="note-' +
        escapeAttr(p.id) +
        '" class="saved-passages-list__note" rows="3" placeholder="Add a note…">' +
        escapeHtml(p.note || "") +
        "</textarea>" +
        '<div class="saved-passages-list__actions">' +
        '<button type="button" class="saved-passages-list__remove" data-remove="' +
        escapeAttr(p.id) +
        '">Remove</button>' +
        "</div>" +
        "</li>";
    });
    html += "</ul>";
    root.innerHTML = html;

    root.querySelectorAll(".saved-passages-list__note").forEach(function (ta) {
      var item = ta.closest("[data-passage-id]");
      var id = item && item.dataset.passageId;
      if (!id) return;
      var timer = null;
      ta.addEventListener("input", function () {
        clearTimeout(timer);
        timer = setTimeout(function () {
          updatePassageNote(id, ta.value);
        }, NOTE_DEBOUNCE_MS);
      });
      ta.addEventListener("blur", function () {
        clearTimeout(timer);
        updatePassageNote(id, ta.value);
      });
    });

    root.querySelectorAll("[data-remove]").forEach(function (btn) {
      btn.addEventListener("click", function () {
        var id = btn.getAttribute("data-remove");
        removePassage(id);
        renderSavedPage(root);
      });
    });
  }

  function initSavedPage() {
    var root = document.getElementById("saved-passages-root");
    if (!root) return;

    renderSavedPage(root);

    var exportBtn = document.getElementById("saved-passages-export");
    var importInput = document.getElementById("saved-passages-import");
    var statusEl = document.getElementById("saved-passages-status");

    if (exportBtn) {
      exportBtn.addEventListener("click", function () {
        if (!loadPassages().length) {
          setImportStatus(statusEl, "Nothing to export yet.", true);
          return;
        }
        exportMarkdown();
        setImportStatus(statusEl, "Download started.", false);
      });
    }

    if (importInput) {
      importInput.addEventListener("change", function () {
        var file = importInput.files && importInput.files[0];
        if (!file) return;
        importMarkdownFile(file, statusEl);
        importInput.value = "";
      });
    }
  }

  /* ============================================================
     Boot
     ============================================================ */

  function initArticlePassages() {
    if (document.querySelector(".page-grid--listing")) return;
    var root = articleRoot();
    if (!root) return;
    if (
      !document.querySelector(".page-content article") &&
      !document.querySelector(".quote-display")
    ) {
      return;
    }

    applyMarksForPath();
    restoreNotePanels();

    window.addEventListener("load", scheduleMarginNoteSync);
    if (document.fonts && document.fonts.ready) {
      document.fonts.ready.then(scheduleMarginNoteSync).catch(function () {});
    }
    root.querySelectorAll("img").forEach(function (img) {
      if (img.complete) return;
      img.addEventListener("load", scheduleMarginNoteSync);
      img.addEventListener("error", scheduleMarginNoteSync);
    });

    document.addEventListener("mouseup", function () {
      setTimeout(showPopoverForSelection, 10);
    });
    document.addEventListener("keyup", function (e) {
      if (e.key === "Shift" || e.key.indexOf("Arrow") === 0) {
        setTimeout(showPopoverForSelection, 10);
      }
    });
    document.addEventListener(
      "scroll",
      function () {
        hidePopover();
      },
      true
    );
  }

  function init() {
    lastIsMobile = isMobile();

    window.addEventListener("pali:note-open", function () {
      dismissOpenEditor();
    });

    document.addEventListener("keydown", function (e) {
      if (e.key === "Escape") {
        hidePopover();
        dismissOpenEditor();
      }
    });

    var resizeTimer;
    window.addEventListener("resize", function () {
      clearTimeout(resizeTimer);
      resizeTimer = setTimeout(function () {
        var nowMobile = isMobile();
        if (nowMobile !== lastIsMobile) {
          lastIsMobile = nowMobile;
          remountAllNotePanels();
        } else {
          syncMarginNotePositions();
        }
      }, 250);
    });

    initSavedPage();
    initArticlePassages();
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }
})();
