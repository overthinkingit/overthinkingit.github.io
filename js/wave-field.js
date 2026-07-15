/**
 * Reusable Three.js wave field.
 *
 * Styles:
 *   topo  — charcoal contour lines (pencil / topographic, default for ink)
 *   grid  — CodePen-style wireframe mesh
 *
 * Usage:
 *   <div class="wave-field" data-wave-field
 *        data-style="topo|grid"
 *        data-palette="ink|dark|wire"
 *        data-height="180"
 *        data-speed="0.18"
 *        data-amplitude="1"
 *        aria-label="..."></div>
 *   <script src="/js/vendor/three.min.js"></script>
 *   <script src="/js/wave-field.js"></script>
 *
 * Or: WaveField.mount(element, { style: "topo", palette: "ink" })
 */
(function (global) {
  var PALETTES = {
    ink: {
      clear: 0xfaf7f2,
      alpha: false,
      line: 0x3d3228,
      lineOpacity: 0.72,
      point: 0x6b4f2a,
      pointOpacity: 0.3,
      pointSize: 0.12,
      fog: null,
    },
    dark: {
      clear: 0x111111,
      alpha: false,
      line: 0xaaaaaa,
      lineOpacity: 0.55,
      point: 0xccddff,
      pointOpacity: 0.7,
      pointSize: 0.14,
      fog: 0x111111,
    },
    wire: {
      clear: 0x000000,
      alpha: true,
      line: 0x6b4f2a,
      lineOpacity: 0.65,
      point: 0x9b7440,
      pointOpacity: 0.45,
      pointSize: 0.12,
      fog: null,
    },
  };

  function readOptions(el, overrides) {
    overrides = overrides || {};
    var ds = el.dataset || {};
    var palette = overrides.palette || ds.palette || "ink";
    var style =
      overrides.style ||
      ds.style ||
      (palette === "dark" ? "grid" : "topo");
    return {
      palette: palette,
      style: style,
      height: num(overrides.height, ds.height, 180),
      speed: num(overrides.speed, ds.speed, 0.18),
      amplitude: num(overrides.amplitude, ds.amplitude, 1),
      spacing: num(overrides.spacing, ds.spacing, 5),
      size: num(overrides.size, ds.size, 220),
      lines: num(overrides.lines, ds.lines, 42),
      scroll: bool(overrides.scroll, ds.scroll, false),
    };
  }

  function num(a, b, fallback) {
    if (a != null && a !== "") return Number(a);
    if (b != null && b !== "") return Number(b);
    return fallback;
  }

  function bool(a, b, fallback) {
    if (typeof a === "boolean") return a;
    if (a != null && a !== "") return String(a) === "true";
    if (b != null && b !== "") return String(b) === "true";
    return fallback;
  }

  function webglOk() {
    try {
      var c = document.createElement("canvas");
      return !!(
        global.THREE &&
        (c.getContext("webgl") || c.getContext("experimental-webgl"))
      );
    } catch (e) {
      return false;
    }
  }

  /**
   * Wind-stirred water. Contours sample a 2D traveling field h(x, z).
   * Spatial z terms stagger crests down the page. Amp fades only at the top
   * so the upper edge stays calm; the field extends past the bottom of the
   * frame and is hard-clipped there (rectangular crop, always).
   */
  function surface(nx, t, band) {
    var x = nx * Math.PI * 2;
    var z = band * Math.PI * 2;

    // Wind chop with real z-wavenumber — crests walk as you move down-field
    var chop =
      Math.sin(x * 4.5 + z * 1.9 - t * 1.45) * 0.34 +
      Math.sin(x * 6.0 - z * 1.4 - t * 1.8) * 0.26 +
      Math.sin(x * 3.4 + z * 2.6 - t * 1.1) * 0.2;
    // Fine gust texture
    var gust =
      Math.sin(x * 9.0 + z * 3.2 - t * 2.55) * 0.12 +
      Math.sin(x * 7.2 - z * 4.0 - t * 2.05) * 0.1;
    // Trace under-swell only (must stay quiet or it reads as a billow)
    var swell = Math.sin(x * 1.6 + z * 0.55 - t * 0.45) * 0.1;
    return chop + gust + swell;
  }

  /** Fade amp only near the top; bottom stays lively and is hard-clipped. */
  function windowAmp(band) {
    var b = Math.max(0, Math.min(1, band));
    return Math.pow(Math.min(1, b / 0.2), 0.7);
  }

  function mount2dFallback(el, opts) {
    el.classList.add("wave-field--fallback");
    if (opts.style === "topo") el.classList.add("wave-field--topo");
    el.style.height = opts.height + "px";
    var canvas = document.createElement("canvas");
    canvas.className = "wave-field__canvas";
    canvas.setAttribute("role", "img");
    if (el.getAttribute("aria-label")) {
      canvas.setAttribute("aria-label", el.getAttribute("aria-label"));
    }
    el.appendChild(canvas);

    var reduceMotion = global.matchMedia("(prefers-reduced-motion: reduce)").matches;
    var ctx = canvas.getContext("2d");
    var dpr = 1;
    var cssW = 0;
    var bg =
      opts.palette === "dark"
        ? "#111111"
        : opts.palette === "wire"
          ? "transparent"
          : "#faf7f2";
    var ink = opts.palette === "dark" ? "200, 210, 230" : "61, 50, 40";
    var nLines = opts.lines || 56;

    function resize() {
      cssW = Math.max(240, Math.floor(el.clientWidth || 660));
      dpr = Math.min(global.devicePixelRatio || 1, 2);
      canvas.width = Math.floor(cssW * dpr);
      canvas.height = Math.floor(opts.height * dpr);
      canvas.style.width = cssW + "px";
      canvas.style.height = opts.height + "px";
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    }

    function draw(t) {
      var w = cssW;
      var h = opts.height;
      if (bg === "transparent") ctx.clearRect(0, 0, w, h);
      else {
        ctx.fillStyle = bg;
        ctx.fillRect(0, 0, w, h);
      }
      ctx.lineCap = "round";
      ctx.lineJoin = "round";

      var samples = 180;
      var ceiling = new Float32Array(samples + 1);
      for (var i = 0; i <= samples; i++) ceiling[i] = 1e9;

      // Canvas y grows downward — back lines near top, front past bottom (clipped)
      for (var li = 0; li < nLines; li++) {
        var band = li / (nLines - 1);
        // Extend past h so the bottom edge is always a hard crop
        var base = 8 + (h + 28) * Math.pow(band, 0.92);
        var amp = 11 * windowAmp(band) * opts.amplitude;
        var minGap = 0.7;

        ctx.beginPath();
        ctx.strokeStyle =
          "rgba(" + ink + ", " + (0.38 + 0.5 * band).toFixed(3) + ")";
        ctx.lineWidth = band < 0.85 ? 1 : 1.25;

        for (var s = 0; s <= samples; s++) {
          var nx = s / samples;
          var x = nx * w;
          var surf = surface(nx, t, band);
          var y = base - amp * surf;
          // Soft anti-crossing only — do not clone the line above
          if (ceiling[s] < 1e8) y = Math.max(y, ceiling[s] + minGap);
          ceiling[s] = y;
          if (s === 0) ctx.moveTo(x, y);
          else ctx.lineTo(x, y);
        }
        ctx.stroke();
      }
    }

    resize();
    draw(0);
    if (reduceMotion) return { destroy: function () {} };

    var raf = 0;
    var running = false;
    var t0 = performance.now();
    function frame(now) {
      if (!running) return;
      draw(((now - t0) / 1000) * opts.speed * 5);
      raf = requestAnimationFrame(frame);
    }
    function start() {
      if (running) return;
      running = true;
      t0 = performance.now();
      raf = requestAnimationFrame(frame);
    }
    function stop() {
      running = false;
      if (raf) cancelAnimationFrame(raf);
    }
    if ("IntersectionObserver" in global) {
      var io = new IntersectionObserver(
        function (entries) {
          entries.forEach(function (e) {
            if (e.isIntersecting) start();
            else stop();
          });
        },
        { threshold: 0.1 }
      );
      io.observe(el);
    } else start();

    global.addEventListener("resize", function () {
      resize();
      draw(0);
    });

    return {
      destroy: function () {
        stop();
        el.innerHTML = "";
      },
    };
  }

  function mountTopo(el, opts, THREE) {
    var palette = PALETTES[opts.palette] || PALETTES.ink;
    var reduceMotion = global.matchMedia("(prefers-reduced-motion: reduce)").matches;

    el.classList.add("wave-field--ready", "wave-field--topo");
    el.style.height = opts.height + "px";
    el.style.position = "relative";
    el.style.overflow = "hidden";

    var scene = new THREE.Scene();
    var camera = new THREE.OrthographicCamera(-1, 1, 1, -1, 0.1, 10);
    camera.position.set(0, 0, 1);
    camera.lookAt(0, 0, 0);

    var renderer = new THREE.WebGLRenderer({
      antialias: true,
      alpha: palette.alpha,
      powerPreference: "low-power",
      preserveDrawingBuffer: true,
    });
    renderer.setPixelRatio(Math.min(global.devicePixelRatio || 1, 2));
    if (!palette.alpha) renderer.setClearColor(palette.clear, 1);
    renderer.domElement.className = "wave-field__canvas";
    renderer.domElement.setAttribute("role", "img");
    if (el.getAttribute("aria-label")) {
      renderer.domElement.setAttribute(
        "aria-label",
        el.getAttribute("aria-label")
      );
    }
    el.appendChild(renderer.domElement);

    var nLines = Math.max(24, opts.lines | 0);
    var samples = 220;
    var totalVerts = nLines * (samples + 1);
    var positions = new Float32Array(totalVerts * 3);
    var lineIndices = [];

    for (var li = 0; li < nLines; li++) {
      var row = li * (samples + 1);
      for (var s = 0; s < samples; s++) {
        lineIndices.push(row + s, row + s + 1);
      }
    }

    // Seed x positions in normalized clip-ish space; y updated each frame
    for (var li0 = 0; li0 < nLines; li0++) {
      for (var s0 = 0; s0 <= samples; s0++) {
        var idx = (li0 * (samples + 1) + s0) * 3;
        positions[idx] = (s0 / samples) * 2 - 1; // -1..1
        positions[idx + 1] = 0;
        positions[idx + 2] = 0;
      }
    }

    var geometry = new THREE.BufferGeometry();
    geometry.setAttribute("position", new THREE.BufferAttribute(positions, 3));
    geometry.setIndex(lineIndices);

    var material = new THREE.LineBasicMaterial({
      color: palette.line,
      transparent: true,
      opacity: Math.min(0.62, palette.lineOpacity),
      depthTest: false,
      depthWrite: false,
    });
    var lines = new THREE.LineSegments(geometry, material);
    scene.add(lines);

    var clock = new THREE.Clock();
    var running = false;
    var raf = 0;
    var destroyed = false;

    function resize() {
      var w = Math.max(200, el.clientWidth || 660);
      var h = opts.height;
      var aspect = w / h;
      camera.left = -aspect;
      camera.right = aspect;
      camera.top = 1;
      camera.bottom = -1;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h, false);
      renderer.domElement.style.width = "100%";
      renderer.domElement.style.height = h + "px";
      // Re-seed x for aspect
      for (var li = 0; li < nLines; li++) {
        for (var s = 0; s <= samples; s++) {
          var idx = (li * (samples + 1) + s) * 3;
          positions[idx] = ((s / samples) * 2 - 1) * aspect;
        }
      }
      geometry.attributes.position.needsUpdate = true;
    }

    function displace(time) {
      var t = time * opts.speed * 5;
      var pos = geometry.attributes.position.array;
      var aspect = camera.right; // width half-extent when top=1
      var prev = new Float32Array(samples + 1);
      // Span past camera.bottom (-1) so the front of the field is always cropped
      var span = 2.05;
      var gap = 0.016;

      // Back → front: 2D water field; each contour samples its own z-band
      for (var li = 0; li < nLines; li++) {
        var band = li / (nLines - 1);
        // Top stays inside the frame; bottom runs past -1 and is clipped
        var base = 0.9 - (span * (li + 0.5)) / nLines;
        var amp = 0.12 * windowAmp(band) * opts.amplitude;

        for (var s = 0; s <= samples; s++) {
          var nx = s / samples;
          var idx = (li * (samples + 1) + s) * 3;
          var surf = surface(nx, t, band);
          var y = base + amp * surf;

          if (li > 0) y = Math.min(y, prev[s] - gap);
          prev[s] = y;

          pos[idx] = (nx * 2 - 1) * aspect;
          pos[idx + 1] = y;
          pos[idx + 2] = 0;
        }
      }
      geometry.attributes.position.needsUpdate = true;
    }

    function renderOnce() {
      displace(clock.getElapsedTime());
      renderer.render(scene, camera);
    }

    function tick() {
      if (!running || destroyed) return;
      displace(clock.getElapsedTime());
      renderer.render(scene, camera);
      raf = requestAnimationFrame(tick);
    }

    function start() {
      if (running || destroyed || reduceMotion) return;
      running = true;
      clock.start();
      raf = requestAnimationFrame(tick);
    }

    function stop() {
      running = false;
      if (raf) cancelAnimationFrame(raf);
      raf = 0;
    }

    resize();
    renderOnce();
    // Re-measure after layout — first paint can run before the figure has width
    requestAnimationFrame(function () {
      resize();
      renderOnce();
    });

    var io = null;
    if (!reduceMotion && "IntersectionObserver" in global) {
      io = new IntersectionObserver(
        function (entries) {
          entries.forEach(function (entry) {
            if (entry.isIntersecting) start();
            else stop();
          });
        },
        { threshold: 0.12 }
      );
      io.observe(el);
    } else if (!reduceMotion) {
      start();
    }

    var onResize = function () {
      resize();
      if (!running) renderOnce();
    };
    global.addEventListener("resize", onResize);

    var ro = null;
    if ("ResizeObserver" in global) {
      ro = new ResizeObserver(function () {
        resize();
        if (!running) renderOnce();
      });
      ro.observe(el);
    }

    return {
      destroy: function () {
        destroyed = true;
        stop();
        global.removeEventListener("resize", onResize);
        if (io) io.disconnect();
        if (ro) ro.disconnect();
        geometry.dispose();
        material.dispose();
        renderer.dispose();
        el.innerHTML = "";
        el.classList.remove("wave-field--ready", "wave-field--topo");
      },
      setSpeed: function (s) {
        opts.speed = Number(s) || opts.speed;
      },
      setAmplitude: function (a) {
        opts.amplitude = Number(a) || opts.amplitude;
      },
    };
  }

  function mountGrid(el, opts, THREE) {
    var palette = PALETTES[opts.palette] || PALETTES.ink;
    var reduceMotion = global.matchMedia("(prefers-reduced-motion: reduce)").matches;

    el.classList.add("wave-field--ready", "wave-field--grid");
    el.style.height = opts.height + "px";
    el.style.position = "relative";
    el.style.overflow = "hidden";

    var scene = new THREE.Scene();
    if (palette.fog != null) {
      scene.fog = new THREE.FogExp2(palette.fog, 0.012);
    }

    var camera = new THREE.PerspectiveCamera(55, 1, 0.1, 1000);
    camera.position.set(0, 28, 72);
    camera.lookAt(0, 0, -10);

    var renderer = new THREE.WebGLRenderer({
      antialias: true,
      alpha: palette.alpha,
      powerPreference: "low-power",
    });
    renderer.setPixelRatio(Math.min(global.devicePixelRatio || 1, 2));
    if (!palette.alpha) renderer.setClearColor(palette.clear, 1);
    renderer.domElement.className = "wave-field__canvas";
    renderer.domElement.setAttribute("role", "img");
    if (el.getAttribute("aria-label")) {
      renderer.domElement.setAttribute(
        "aria-label",
        el.getAttribute("aria-label")
      );
    }
    el.appendChild(renderer.domElement);

    var waveSize = opts.size;
    var pointSpacing = opts.spacing;
    var pointCount = Math.floor(waveSize / pointSpacing);
    var totalPoints = pointCount * pointCount;

    var positions = new Float32Array(totalPoints * 3);
    var colors = new Float32Array(totalPoints * 3);
    var baseLine = new THREE.Color(palette.line);
    var basePoint = new THREE.Color(palette.point);

    var index = 0;
    for (var i = 0; i < pointCount; i++) {
      for (var j = 0; j < pointCount; j++) {
        var x = (i - pointCount / 2) * pointSpacing;
        var z = (j - pointCount / 2) * pointSpacing;
        positions[index * 3] = x;
        positions[index * 3 + 1] = 0;
        positions[index * 3 + 2] = z;
        var distance = Math.sqrt(x * x + z * z) / (waveSize / 2);
        var intensity = 1 - Math.min(distance, 1) * 0.75;
        colors[index * 3] = basePoint.r * intensity;
        colors[index * 3 + 1] = basePoint.g * intensity;
        colors[index * 3 + 2] = basePoint.b * intensity;
        index++;
      }
    }

    var pointsGeometry = new THREE.BufferGeometry();
    pointsGeometry.setAttribute(
      "position",
      new THREE.BufferAttribute(positions, 3)
    );
    pointsGeometry.setAttribute("color", new THREE.BufferAttribute(colors, 3));

    var pointsMaterial = new THREE.PointsMaterial({
      size: palette.pointSize,
      vertexColors: true,
      transparent: true,
      opacity: palette.pointOpacity,
      sizeAttenuation: true,
      depthWrite: false,
      blending:
        opts.palette === "dark" ? THREE.AdditiveBlending : THREE.NormalBlending,
    });
    var wavePoints = new THREE.Points(pointsGeometry, pointsMaterial);
    scene.add(wavePoints);

    var lineIndices = [];
    for (var ii = 0; ii < pointCount; ii++) {
      for (var jj = 0; jj < pointCount; jj++) {
        var currentIndex = ii * pointCount + jj;
        if (jj < pointCount - 1)
          lineIndices.push(currentIndex, currentIndex + 1);
        if (ii < pointCount - 1)
          lineIndices.push(currentIndex, currentIndex + pointCount);
      }
    }

    var linesGeometry = new THREE.BufferGeometry();
    linesGeometry.setAttribute(
      "position",
      pointsGeometry.getAttribute("position")
    );
    linesGeometry.setIndex(lineIndices);

    var lineMaterial = new THREE.LineBasicMaterial({
      color: baseLine,
      transparent: true,
      opacity: palette.lineOpacity,
    });
    var linesMesh = new THREE.LineSegments(linesGeometry, lineMaterial);
    scene.add(linesMesh);

    var clock = new THREE.Clock();
    var running = false;
    var raf = 0;
    var destroyed = false;

    function resize() {
      var w = Math.max(200, el.clientWidth || 660);
      var h = opts.height;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h, false);
      renderer.domElement.style.width = "100%";
      renderer.domElement.style.height = h + "px";
    }

    function displace(time) {
      var pos = pointsGeometry.attributes.position.array;
      var amp = 2.2 * opts.amplitude;
      var t = time * opts.speed * 5;
      for (var i = 0; i < pointCount; i++) {
        for (var j = 0; j < pointCount; j++) {
          var idx = (i * pointCount + j) * 3;
          var px = pos[idx];
          var pz = pos[idx + 2];
          var wave1 = Math.sin(px * 0.1 + t) * amp;
          var wave2 = Math.cos(pz * 0.1 + t * 0.8) * amp;
          var wave3 = Math.sin(px * 0.05 + pz * 0.05 + t * 1.2) * amp * 0.75;
          pos[idx + 1] = wave1 + wave2 + wave3;
        }
      }
      pointsGeometry.attributes.position.needsUpdate = true;
    }

    function renderOnce() {
      displace(clock.getElapsedTime());
      renderer.render(scene, camera);
    }

    function tick() {
      if (!running || destroyed) return;
      displace(clock.getElapsedTime());
      if (opts.scroll) {
        wavePoints.rotation.y = Math.sin(clock.getElapsedTime() * 0.05) * 0.04;
        linesMesh.rotation.y = wavePoints.rotation.y;
      }
      renderer.render(scene, camera);
      raf = requestAnimationFrame(tick);
    }

    function start() {
      if (running || destroyed || reduceMotion) return;
      running = true;
      clock.start();
      raf = requestAnimationFrame(tick);
    }

    function stop() {
      running = false;
      if (raf) cancelAnimationFrame(raf);
      raf = 0;
    }

    resize();
    renderOnce();

    var io = null;
    if (!reduceMotion && "IntersectionObserver" in global) {
      io = new IntersectionObserver(
        function (entries) {
          entries.forEach(function (entry) {
            if (entry.isIntersecting) start();
            else stop();
          });
        },
        { threshold: 0.12 }
      );
      io.observe(el);
    } else if (!reduceMotion) {
      start();
    }

    var onResize = function () {
      resize();
      if (!running) renderOnce();
    };
    global.addEventListener("resize", onResize);

    var onScroll = null;
    if (opts.scroll) {
      onScroll = function () {
        var scrollY = global.scrollY || global.pageYOffset || 0;
        var max = Math.max(
          1,
          document.documentElement.scrollHeight - global.innerHeight
        );
        var p = Math.min(1, Math.max(0, scrollY / max));
        camera.position.set(0, 28 - 40 * p, 72 - 10 * p);
        camera.lookAt(0, 0, -10);
        if (!running) renderOnce();
      };
      global.addEventListener("scroll", onScroll, { passive: true });
    }

    return {
      destroy: function () {
        destroyed = true;
        stop();
        global.removeEventListener("resize", onResize);
        if (onScroll) global.removeEventListener("scroll", onScroll);
        if (io) io.disconnect();
        pointsGeometry.dispose();
        linesGeometry.dispose();
        pointsMaterial.dispose();
        lineMaterial.dispose();
        renderer.dispose();
        el.innerHTML = "";
        el.classList.remove("wave-field--ready", "wave-field--grid");
      },
      setSpeed: function (s) {
        opts.speed = Number(s) || opts.speed;
      },
      setAmplitude: function (a) {
        opts.amplitude = Number(a) || opts.amplitude;
      },
    };
  }

  function mount3d(el, opts) {
    var THREE = global.THREE;
    if (opts.style === "grid") return mountGrid(el, opts, THREE);
    return mountTopo(el, opts, THREE);
  }

  function mount(el, overrides) {
    if (!el) return null;
    var opts = readOptions(el, overrides);
    if (webglOk()) return mount3d(el, opts);
    return mount2dFallback(el, opts);
  }

  function autoInit() {
    var nodes = document.querySelectorAll("[data-wave-field]");
    var instances = [];
    for (var i = 0; i < nodes.length; i++) {
      instances.push(mount(nodes[i]));
    }
    return instances;
  }

  var api = {
    mount: mount,
    autoInit: autoInit,
    palettes: Object.keys(PALETTES),
    styles: ["topo", "grid"],
  };
  global.WaveField = api;

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", autoInit);
  } else {
    autoInit();
  }
})(window);
