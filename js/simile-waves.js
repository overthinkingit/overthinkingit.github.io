/**
 * Lightweight 2D woodcut wave band (no Three.js).
 * Prefer js/wave-field.js for the WebGL port; this remains as a standalone
 * option if you want the flat contour look without the 3D mesh.
 *
 * Targets: canvas.simile-figure__canvas
 */
(function () {
  var canvas = document.querySelector(".simile-figure__canvas");
  if (!canvas || !canvas.getContext) return;

  var ctx = canvas.getContext("2d");
  var reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  var CSS_H = 125;
  var N_LINES = 40;
  var SAMPLES = 160;
  var TIME_SCALE = 0.18;

  var BG = "#faf7f2";
  var INK = "44, 36, 24";

  var raf = 0;
  var running = false;
  var start = performance.now();
  var dpr = 1;
  var cssW = 660;

  function resize() {
    var parent = canvas.parentElement;
    cssW = Math.max(280, Math.floor(parent ? parent.clientWidth : 660));
    dpr = Math.min(window.devicePixelRatio || 1, 2);
    canvas.width = Math.floor(cssW * dpr);
    canvas.height = Math.floor(CSS_H * dpr);
    canvas.style.width = cssW + "px";
    canvas.style.height = CSS_H + "px";
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
  }

  function heightAt(nx, t, band) {
    var lag = band * 0.35;
    var w1 = Math.sin(nx * Math.PI * 2 * 1.15 + t - lag);
    var w2 = Math.cos(nx * Math.PI * 2 * 2.35 + t * 0.8 + 0.9);
    var w3 = Math.sin(nx * Math.PI * 2 * 0.7 + t * 1.15 + band * 0.8);
    var w4 = Math.sin(nx * Math.PI * 2 * 3.6 + t * 0.55 + 1.7) * 0.45;
    var crest =
      Math.pow(0.5 + 0.5 * Math.sin(nx * Math.PI * 2 * 1.15 + t - lag), 2.2) * 0.55;
    return w1 * 0.55 + w2 * 0.35 + w3 * 0.28 + w4 + crest;
  }

  function draw(timeSec) {
    var t = timeSec * TIME_SCALE;
    var w = cssW;
    var h = CSS_H;

    ctx.fillStyle = BG;
    ctx.fillRect(0, 0, w, h);
    ctx.lineCap = "round";
    ctx.lineJoin = "round";

    var crestBase = 12;
    var usable = h - crestBase - 6;

    for (var li = 0; li < N_LINES; li++) {
      var band = Math.pow(li / (N_LINES - 1), 0.9);
      var off = 3 + usable * band;
      var amp = 7 + 18 * band;
      var alpha = 0.42 + 0.52 * band;

      ctx.beginPath();
      ctx.strokeStyle = "rgba(" + INK + ", " + alpha.toFixed(3) + ")";
      ctx.lineWidth = band < 0.82 ? 1 : 1.35;

      for (var s = 0; s <= SAMPLES; s++) {
        var nx = s / SAMPLES;
        var x = nx * w;
        var surface = heightAt(nx, t, band);
        var y = crestBase + off - amp * surface;
        if (y < 3) y = 3;
        if (y > h - 2) y = h - 2;
        if (s === 0) ctx.moveTo(x, y);
        else ctx.lineTo(x, y);
      }
      ctx.stroke();
    }
  }

  function frame(now) {
    if (!running) return;
    draw((now - start) / 1000);
    raf = requestAnimationFrame(frame);
  }

  function startAnim() {
    if (running || reduceMotion) return;
    running = true;
    start = performance.now();
    raf = requestAnimationFrame(frame);
  }

  function stopAnim() {
    running = false;
    if (raf) cancelAnimationFrame(raf);
    raf = 0;
  }

  function paintStatic() {
    draw(0);
  }

  resize();
  paintStatic();

  if (!reduceMotion) {
    if ("IntersectionObserver" in window) {
      var io = new IntersectionObserver(
        function (entries) {
          entries.forEach(function (entry) {
            if (entry.isIntersecting) startAnim();
            else {
              stopAnim();
              paintStatic();
            }
          });
        },
        { threshold: 0.15 }
      );
      io.observe(canvas);
    } else {
      startAnim();
    }
  }

  var resizeTimer = 0;
  window.addEventListener("resize", function () {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(function () {
      var was = running;
      stopAnim();
      resize();
      if (was) startAnim();
      else paintStatic();
    }, 100);
  });
})();
