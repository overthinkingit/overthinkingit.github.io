(function () {
  var openBtn = document.getElementById("site-search-open");
  var closeBtn = document.getElementById("site-search-close");
  var dialog = document.getElementById("site-search-dialog");
  var input = document.getElementById("site-search-input");
  var resultsEl = document.getElementById("site-search-results");
  var hintEl = document.getElementById("site-search-hint");
  if (!openBtn || !dialog || !input || !resultsEl) return;

  var index = null;
  var activeIndex = -1;
  var debounceTimer = null;
  var currentResults = [];

  function normalize(str) {
    return String(str || "")
      .toLowerCase()
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "");
  }

  function escapeHtml(str) {
    return String(str || "")
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;");
  }

  function sectionLabel(section) {
    if (!section) return "";
    return section.charAt(0).toUpperCase() + section.slice(1);
  }

  function rankItem(item, query) {
    var nTitle = normalize(item.title);
    var nExcerpt = normalize(item.excerpt);
    var nText = normalize(item.text);

    if (nTitle.indexOf(query) !== -1) return 0;
    if (nExcerpt.indexOf(query) !== -1) return 1;
    if (nText.indexOf(query) !== -1) return 2;
    return 3;
  }

  function snippet(item, query) {
    if (item.excerpt && normalize(item.excerpt).indexOf(query) !== -1) {
      return highlightMatch(item.excerpt, query);
    }

    var text = item.text || "";
    var nText = normalize(text);
    var idx = nText.indexOf(query);
    if (idx === -1) return escapeHtml(item.excerpt || "");

    var start = Math.max(0, idx - 40);
    var end = Math.min(text.length, idx + query.length + 80);
    var slice = text.slice(start, end);
    if (start > 0) slice = "…" + slice;
    if (end < text.length) slice = slice + "…";
    return highlightMatch(slice, query);
  }

  function highlightMatch(text, query) {
    var nText = normalize(text);
    var idx = nText.indexOf(query);
    if (idx === -1) return escapeHtml(text);

    var before = text.slice(0, idx);
    var match = text.slice(idx, idx + query.length);
    var after = text.slice(idx + query.length);
    return escapeHtml(before) + "<mark>" + escapeHtml(match) + "</mark>" + escapeHtml(after);
  }

  function search(query) {
    if (!index) return [];
    var nQuery = normalize(query);
    if (!nQuery) return [];

    return index
      .filter(function (item) {
        return (
          normalize(item.title).indexOf(nQuery) !== -1 ||
          normalize(item.excerpt).indexOf(nQuery) !== -1 ||
          normalize(item.text).indexOf(nQuery) !== -1
        );
      })
      .sort(function (a, b) {
        var rankDiff = rankItem(a, nQuery) - rankItem(b, nQuery);
        if (rankDiff !== 0) return rankDiff;
        return a.title.localeCompare(b.title);
      });
  }

  function setExpanded(expanded) {
    input.setAttribute("aria-expanded", expanded ? "true" : "false");
  }

  function updateHint(query) {
    if (!hintEl) return;
    hintEl.hidden = Boolean(query);
  }

  function hideResults() {
    resultsEl.hidden = true;
    resultsEl.innerHTML = "";
    activeIndex = -1;
    currentResults = [];
    setExpanded(false);
  }

  function renderResults(results, query) {
    currentResults = results;
    activeIndex = -1;
    updateHint(query);

    if (!query) {
      hideResults();
      return;
    }

    if (results.length === 0) {
      resultsEl.innerHTML = '<li class="site-search__empty" role="presentation">No results</li>';
      resultsEl.hidden = false;
      setExpanded(true);
      return;
    }

    resultsEl.innerHTML = results
      .map(function (item, i) {
        return (
          '<li role="option" id="site-search-option-' + i + '" aria-selected="false">' +
          '<a class="site-search__result" href="' + escapeHtml(item.url) + '" tabindex="-1">' +
          '<span class="site-search__section">' + escapeHtml(sectionLabel(item.section)) + "</span>" +
          '<span class="site-search__title">' + escapeHtml(item.title) + "</span>" +
          '<span class="site-search__snippet">' + snippet(item, normalize(query)) + "</span>" +
          "</a></li>"
        );
      })
      .join("");

    resultsEl.hidden = false;
    setExpanded(true);
  }

  function setActiveIndex(nextIndex) {
    var options = resultsEl.querySelectorAll('[role="option"]');
    if (!options.length) return;

    if (activeIndex >= 0 && options[activeIndex]) {
      options[activeIndex].setAttribute("aria-selected", "false");
      options[activeIndex].querySelector("a").classList.remove("is-active");
    }

    activeIndex = nextIndex;
    if (activeIndex < 0) activeIndex = options.length - 1;
    if (activeIndex >= options.length) activeIndex = 0;

    var active = options[activeIndex];
    active.setAttribute("aria-selected", "true");
    active.querySelector("a").classList.add("is-active");
    active.scrollIntoView({ block: "nearest" });
  }

  function navigateToActive() {
    if (activeIndex < 0 || !currentResults[activeIndex]) return;
    window.location.href = currentResults[activeIndex].url;
  }

  function onInput() {
    clearTimeout(debounceTimer);
    debounceTimer = setTimeout(function () {
      renderResults(search(input.value.trim()), input.value.trim());
    }, 150);
  }

  function openDialog() {
    dialog.showModal();
    input.value = "";
    hideResults();
    updateHint("");
    window.setTimeout(function () {
      input.focus();
    }, 0);
  }

  function closeDialog() {
    dialog.close();
    input.value = "";
    hideResults();
    updateHint("");
    openBtn.focus();
  }

  openBtn.addEventListener("click", openDialog);

  if (closeBtn) {
    closeBtn.addEventListener("click", closeDialog);
  }

  document.addEventListener("keydown", function (e) {
    if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
      e.preventDefault();
      if (dialog.open) {
        closeDialog();
      } else {
        openDialog();
      }
    }
  });

  dialog.addEventListener("click", function (e) {
    if (e.target === dialog) closeDialog();
  });

  dialog.addEventListener("close", function () {
    input.value = "";
    hideResults();
    updateHint("");
  });

  input.addEventListener("input", onInput);

  input.addEventListener("keydown", function (e) {
    if (e.key === "Escape") {
      closeDialog();
      return;
    }

    if (resultsEl.hidden) return;

    if (e.key === "ArrowDown") {
      e.preventDefault();
      setActiveIndex(activeIndex + 1);
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setActiveIndex(activeIndex - 1);
    } else if (e.key === "Enter") {
      if (activeIndex >= 0) {
        e.preventDefault();
        navigateToActive();
      }
    }
  });

  resultsEl.addEventListener("click", function () {
    closeDialog();
  });

  fetch("/search-index.json")
    .then(function (res) {
      if (!res.ok) throw new Error("Failed to load search index");
      return res.json();
    })
    .then(function (data) {
      index = data;
    })
    .catch(function () {
      index = [];
    });

  var modKey = document.querySelector(".js-mod-key");
  if (modKey && /Mac|iPhone|iPad|iPod/.test(navigator.platform)) {
    modKey.textContent = "⌘";
  }
})();
