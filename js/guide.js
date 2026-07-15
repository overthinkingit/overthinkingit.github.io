(function () {
  var STORAGE_KEY = "guide:v1";
  var MINIMIZE_KEY = "guide:minimized";
  var dataEl = document.getElementById("guide-data");
  if (!dataEl) return;

  var data;
  try {
    data = JSON.parse(dataEl.textContent || "{}");
  } catch (err) {
    return;
  }

  var steps = Array.isArray(data.steps) ? data.steps : [];
  if (!steps.length) return;

  var total = typeof data.total === "number" ? data.total : steps.length;

  function normalizePath(path) {
    if (!path) return "/";
    var p = String(path).split("?")[0].split("#")[0];
    if (!p) return "/";
    if (p !== "/" && p.charAt(p.length - 1) !== "/") p += "/";
    // Treat /index.html as home
    if (p === "/index.html" || p === "/index.html/") return "/";
    return p;
  }

  function loadState() {
    try {
      var raw = localStorage.getItem(STORAGE_KEY);
      if (!raw) return { active: false, visited: [] };
      var parsed = JSON.parse(raw);
      return {
        active: !!parsed.active,
        visited: Array.isArray(parsed.visited) ? parsed.visited.map(normalizePath) : [],
      };
    } catch (err) {
      return { active: false, visited: [] };
    }
  }

  function saveState(state) {
    try {
      localStorage.setItem(
        STORAGE_KEY,
        JSON.stringify({
          active: !!state.active,
          visited: state.visited || [],
        })
      );
    } catch (err) {
      /* ignore quota / private mode */
    }
  }

  function hasStartedGuide() {
    return state.active || state.visited.length > 0;
  }

  function updateStartHints() {
    document.body.classList.toggle("guide-started", hasStartedGuide());
  }

  function isMinimized() {
    try {
      var val = sessionStorage.getItem(MINIMIZE_KEY);
      // First visit on a sequence page: show the full panel so Prev/Next
      // are discoverable. Only collapse after the reader chooses Minimize.
      if (val === null) return false;
      return val === "1";
    } catch (err) {
      return false;
    }
  }

  function setMinimized(value) {
    try {
      sessionStorage.setItem(MINIMIZE_KEY, value ? "1" : "0");
    } catch (err) {
      /* ignore */
    }
  }

  var state = loadState();
  updateStartHints();
  var currentPath = normalizePath(window.location.pathname);
  var currentIndex = -1;
  for (var i = 0; i < steps.length; i++) {
    if (normalizePath(steps[i].url) === currentPath) {
      currentIndex = i;
      break;
    }
  }
  var onSequence = currentIndex >= 0;
  var onGuidePage = currentPath === "/guide/";

  function markVisited(url) {
    var path = normalizePath(url);
    if (state.visited.indexOf(path) === -1) {
      state.visited.push(path);
      saveState(state);
      updateStartHints();
    }
  }

  function unmarkVisited(url) {
    var path = normalizePath(url);
    var idx = state.visited.indexOf(path);
    if (idx !== -1) {
      state.visited.splice(idx, 1);
      saveState(state);
      updateStartHints();
    }
  }

  function isVisited(url) {
    return state.visited.indexOf(normalizePath(url)) !== -1;
  }

  function setItemDone(item, done) {
    var check = item.querySelector(".guide-item__check");
    item.classList.toggle("guide-item--done", done);
    if (!check) return;
    check.setAttribute("aria-pressed", done ? "true" : "false");
    check.setAttribute("aria-label", done ? "Mark as unread" : "Mark as read");
  }

  function paintGuideChecks() {
    document.querySelectorAll(".guide-item[data-guide-url]").forEach(function (item) {
      var url = item.getAttribute("data-guide-url");
      setItemDone(item, isVisited(url));
    });
  }

  function activateSession() {
    state.active = true;
    saveState(state);
    updateStartHints();
  }

  function pauseSession() {
    state.active = false;
    saveState(state);
    try {
      sessionStorage.removeItem(MINIMIZE_KEY);
    } catch (err) {
      /* ignore */
    }
  }

  // Guide index: paint checks, allow manual toggle, activate on step links
  if (onGuidePage) {
    paintGuideChecks();

    document.addEventListener("click", function (event) {
      var check = event.target.closest && event.target.closest(".guide-item__check");
      if (check) {
        var item = check.closest(".guide-item[data-guide-url]");
        if (!item) return;
        var url = item.getAttribute("data-guide-url");
        if (isVisited(url)) {
          unmarkVisited(url);
          setItemDone(item, false);
        } else {
          markVisited(url);
          setItemDone(item, true);
        }
        updateStartHints();
        return;
      }

      var link = event.target.closest && event.target.closest(".guide-item__link");
      if (!link) return;
      activateSession();
    });
  }

  // Widget only while a guide session is active
  if (!state.active) return;

  if (onSequence) {
    markVisited(currentPath);
  }

  function nextUnvisitedUrl() {
    for (var i = 0; i < steps.length; i++) {
      if (state.visited.indexOf(normalizePath(steps[i].url)) === -1) {
        return steps[i].url;
      }
    }
    // All done — resume at last visited, or first step
    if (state.visited.length) {
      var last = state.visited[state.visited.length - 1];
      for (var j = 0; j < steps.length; j++) {
        if (normalizePath(steps[j].url) === last) return steps[j].url;
      }
    }
    return steps[0].url;
  }

  function progressCount() {
    var count = 0;
    steps.forEach(function (step) {
      if (state.visited.indexOf(normalizePath(step.url)) !== -1) count += 1;
    });
    return count;
  }

  function removeWidget(el) {
    document.body.classList.remove("guide-active");
    document.body.style.removeProperty("--guide-widget-offset");
    if (el && el.parentNode) el.parentNode.removeChild(el);
  }

  function syncWidgetOffset(el) {
    if (!el) {
      document.body.style.removeProperty("--guide-widget-offset");
      return;
    }
    var height = Math.ceil(el.getBoundingClientRect().height);
    var inset = window.matchMedia("(max-width: 640px)").matches ? 12 : 20;
    document.body.style.setProperty(
      "--guide-widget-offset",
      height + inset + "px"
    );
  }

  function wireExit(el) {
    var exitBtn = el.querySelector(".guide-widget__exit");
    if (!exitBtn) return;
    exitBtn.addEventListener("click", function () {
      pauseSession();
      removeWidget(el);
    });
  }

  function renderFullWidget() {
    var step = steps[currentIndex];
    var prev = currentIndex > 0 ? steps[currentIndex - 1] : null;
    var next = currentIndex < steps.length - 1 ? steps[currentIndex + 1] : null;
    var done = progressCount();
    var pct = Math.round((done / total) * 100);

    var el = document.createElement("aside");
    el.setAttribute("aria-label", "Guide progress");
    document.body.classList.add("guide-active");

    function paint() {
      var minimized = isMinimized();
      el.className = "guide-widget" + (minimized ? " guide-widget--pill" : "");

      if (minimized) {
        el.innerHTML =
          '<button type="button" class="guide-widget__expand guide-widget__pill-link" aria-expanded="false">' +
          "Guide · Step " +
          (currentIndex + 1) +
          "</button>" +
          '<button type="button" class="guide-widget__exit guide-widget__exit--pill" aria-label="Exit guide">×</button>';

        el.querySelector(".guide-widget__expand").addEventListener("click", function () {
          setMinimized(false);
          paint();
        });
      } else {
        el.innerHTML =
          '<div class="guide-widget__header">' +
          '<p class="guide-widget__label">Guide</p>' +
          '<div class="guide-widget__actions">' +
          '<button type="button" class="guide-widget__minimize" aria-label="Minimize guide" aria-expanded="true">Minimize</button>' +
          '<button type="button" class="guide-widget__exit" aria-label="Exit guide">Exit</button>' +
          "</div>" +
          "</div>" +
          '<p class="guide-widget__step">Step ' +
          (currentIndex + 1) +
          " of " +
          total +
          "</p>" +
          '<p class="guide-widget__title">' +
          escapeHtml(step.title) +
          "</p>" +
          '<div class="guide-widget__progress" role="progressbar" aria-valuemin="0" aria-valuemax="' +
          total +
          '" aria-valuenow="' +
          done +
          '" aria-label="Guide progress">' +
          '<span class="guide-widget__progress-bar" style="width:' +
          pct +
          '%"></span>' +
          "</div>" +
          '<p class="guide-widget__progress-text">' +
          done +
          " of " +
          total +
          " completed</p>" +
          '<div class="guide-widget__nav">' +
          (prev
            ? '<a class="guide-widget__btn guide-widget__btn--prev" href="' +
              escapeAttr(prev.url) +
              '">Previous</a>'
            : '<span class="guide-widget__btn guide-widget__btn--prev is-disabled" aria-disabled="true">Previous</span>') +
          (next
            ? '<a class="guide-widget__btn guide-widget__btn--next" href="' +
              escapeAttr(next.url) +
              '">Next</a>'
            : '<span class="guide-widget__btn guide-widget__btn--next is-disabled" aria-disabled="true">Next</span>') +
          "</div>";

        el.querySelector(".guide-widget__minimize").addEventListener("click", function () {
          setMinimized(true);
          paint();
        });
      }

      wireExit(el);
      requestAnimationFrame(function () {
        syncWidgetOffset(el);
      });
    }

    paint();
    document.body.appendChild(el);
    requestAnimationFrame(function () {
      syncWidgetOffset(el);
    });
    window.addEventListener("resize", function () {
      syncWidgetOffset(el);
    });
  }

  function renderPill() {
    var resumeUrl = nextUnvisitedUrl();
    var el = document.createElement("aside");
    el.className = "guide-widget guide-widget--pill";
    el.setAttribute("aria-label", "Resume guide");
    el.innerHTML =
      '<a class="guide-widget__pill-link" href="' +
      escapeAttr(resumeUrl) +
      '">Resume guide</a>' +
      '<button type="button" class="guide-widget__exit guide-widget__exit--pill" aria-label="Exit guide">×</button>';

    document.body.classList.add("guide-active");
    wireExit(el);
    document.body.appendChild(el);
    requestAnimationFrame(function () {
      syncWidgetOffset(el);
    });
    window.addEventListener("resize", function () {
      syncWidgetOffset(el);
    });
  }

  function escapeHtml(str) {
    return String(str || "")
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;");
  }

  function escapeAttr(str) {
    return escapeHtml(str).replace(/'/g, "&#39;");
  }

  // Don't show the full widget on the guide index itself — just keep completed marks.
  // Off-sequence: dormant resume pill. On-sequence: full widget.
  if (onGuidePage) return;
  if (onSequence) renderFullWidget();
  else renderPill();
})();
