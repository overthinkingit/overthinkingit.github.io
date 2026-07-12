(function () {
  var nav = document.querySelector(".site-nav");
  var toggle = document.getElementById("site-nav-toggle");
  var links = document.getElementById("site-nav-links");
  if (!nav || !toggle || !links) return;

  var mq = window.matchMedia("(max-width: 720px)");

  function setOpen(open) {
    nav.classList.toggle("is-open", open);
    document.body.classList.toggle("nav-open", open);
    toggle.setAttribute("aria-expanded", open ? "true" : "false");
    toggle.setAttribute("aria-label", open ? "Close menu" : "Open menu");
  }

  function close() {
    setOpen(false);
  }

  toggle.addEventListener("click", function () {
    setOpen(!nav.classList.contains("is-open"));
  });

  links.querySelectorAll("a").forEach(function (link) {
    link.addEventListener("click", close);
  });

  document.addEventListener("keydown", function (e) {
    if (e.key === "Escape") close();
  });

  function onBreakpointChange() {
    if (!mq.matches) close();
  }

  if (mq.addEventListener) mq.addEventListener("change", onBreakpointChange);
  else if (mq.addListener) mq.addListener(onBreakpointChange);
})();
