(function () {
  var article = document.querySelector(".page-content article");
  if (!article) return;

  var headings = article.querySelectorAll("h2");
  if (headings.length < 3) return;

  function ensureHeadingIds() {
    headings.forEach(function (heading, i) {
      if (!heading.id) {
        var slug = heading.textContent
          .toLowerCase()
          .normalize("NFD")
          .replace(/[\u0300-\u036f]/g, "")
          .replace(/[^a-z0-9]+/g, "-")
          .replace(/^-|-$/g, "");
        heading.id = slug || ("section-" + (i + 1));
      }
    });
  }

  function buildList() {
    var list = document.createElement("ul");
    list.className = "article-toc__list";

    headings.forEach(function (heading) {
      var li = document.createElement("li");
      var a = document.createElement("a");
      a.href = "#" + heading.id;
      a.textContent = heading.textContent;
      li.appendChild(a);
      list.appendChild(li);
    });

    return list;
  }

  function buildSidebarNav() {
    var nav = document.createElement("nav");
    nav.className = "article-toc";
    nav.setAttribute("aria-label", "On this page");

    var label = document.createElement("p");
    label.className = "article-toc__label";
    label.textContent = "On this page";
    nav.appendChild(label);
    nav.appendChild(buildList());
    return nav;
  }

  function buildInlineNav() {
    var details = document.createElement("details");
    details.className = "article-toc article-toc--inline";
    details.setAttribute("aria-label", "On this page");

    var summary = document.createElement("summary");
    summary.className = "article-toc__label";
    summary.textContent = "On this page";
    details.appendChild(summary);
    details.appendChild(buildList());
    return details;
  }

  ensureHeadingIds();

  var sidebarNav = buildSidebarNav();
  var sidebar = document.querySelector(".page-spacer");
  if (sidebar) {
    sidebar.removeAttribute("aria-hidden");
    sidebar.appendChild(sidebarNav);
    sidebar.classList.add("page-spacer--toc");
  }

  // Compact inline TOC for narrow viewports (sidebar column is hidden).
  // Walk up to a direct child of article so insertBefore works when
  // headings are nested (e.g. inside <section> on the Guide page).
  var inlineNav = buildInlineNav();
  var inlineAnchor = headings[0];
  while (inlineAnchor.parentElement && inlineAnchor.parentElement !== article) {
    inlineAnchor = inlineAnchor.parentElement;
  }
  article.insertBefore(inlineNav, inlineAnchor);

  var wideQuery = window.matchMedia("(min-width: 1101px)");

  function syncTocVisibility() {
    var wide = wideQuery.matches && !!sidebar;
    if (sidebarNav) {
      sidebarNav.hidden = !wide;
      sidebarNav.setAttribute("aria-hidden", wide ? "false" : "true");
    }
    inlineNav.hidden = wide;
    inlineNav.setAttribute("aria-hidden", wide ? "true" : "false");
  }

  // Collapsed by default on narrow viewports — long always-open lists
  // push article content down and feel clunky on tablet/phone.
  inlineNav.open = false;

  syncTocVisibility();
  if (wideQuery.addEventListener) wideQuery.addEventListener("change", syncTocVisibility);
  else if (wideQuery.addListener) wideQuery.addListener(syncTocVisibility);

  var allLinks = [];
  sidebarNav.querySelectorAll("a").forEach(function (a) { allLinks.push(a); });
  inlineNav.querySelectorAll("a").forEach(function (a) { allLinks.push(a); });

  function setActive(id) {
    allLinks.forEach(function (a) {
      var active = a.getAttribute("href") === "#" + id;
      a.classList.toggle("is-active", active);
      if (active) a.setAttribute("aria-current", "location");
      else a.removeAttribute("aria-current");
    });
  }

  // Close the inline TOC after a jump so the destination heading isn't
  // buried under an open list on short viewports.
  inlineNav.querySelectorAll("a").forEach(function (a) {
    a.addEventListener("click", function () {
      if (!inlineNav.hidden) inlineNav.open = false;
    });
  });

  if (!("IntersectionObserver" in window)) {
    setActive(headings[0].id);
    return;
  }

  var visible = new Map();

  var observer = new IntersectionObserver(
    function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) visible.set(entry.target.id, entry);
        else visible.delete(entry.target.id);
      });

      var topId = null;
      var topY = Infinity;
      visible.forEach(function (entry, id) {
        var y = entry.boundingClientRect.top;
        if (y < topY) {
          topY = y;
          topId = id;
        }
      });

      if (topId) setActive(topId);
    },
    {
      rootMargin: "-20% 0px -65% 0px",
      threshold: [0, 1],
    }
  );

  headings.forEach(function (heading) {
    observer.observe(heading);
  });

  setActive(headings[0].id);
})();
