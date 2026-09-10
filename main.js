/* ============================================================================
   Vik Al — behaviour
   Four jobs: reveal on scroll, settle the work drawings as they scroll into
   view, keep the rail index honest, hold the theme.
   The page is fully readable with this file blocked.
   ========================================================================= */

(function () {
  "use strict";

  var root = document.documentElement;
  var reduced = window.matchMedia("(prefers-reduced-motion: reduce)");

  /* --- Reveal ------------------------------------------------------------ */
  /* Sections and each work exhibit earn their own entrance. */

  var targets = document.querySelectorAll(".section, .exhibit");

  function revealAll() {
    Array.prototype.forEach.call(targets, function (el) { el.classList.add("in-view"); });
  }

  if (!("IntersectionObserver" in window) || reduced.matches) {
    revealAll();
  } else {
    var revealObserver = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add("in-view");
          revealObserver.unobserve(entry.target);
        }
      });
    }, { rootMargin: "0px 0px -12% 0px", threshold: 0.08 });

    Array.prototype.forEach.call(targets, function (el) { revealObserver.observe(el); });

    /* A hidden document does not report intersections, so a page that loads
       in a background tab or gets prerendered would sit at opacity 0 with no
       way back. Show everything rather than risk hiding the whole page. */
    if (document.visibilityState === "hidden") revealAll();

    /* Last resort: if nothing has revealed itself shortly after load, the
       observer is not doing its job. Content wins over choreography. */
    window.setTimeout(function () {
      if (!document.querySelector(".section.in-view")) revealAll();
    }, 2500);
  }

  /* --- Exhibits --------------------------------------------------------- */
  /* Each drawing starts in disorder and settles into structure as it scrolls
     into view, and comes apart again if you scroll back. The markup holds
     the settled state; every moving element carries the offset back to its
     disordered state. With this file blocked or motion reduced, nothing
     here runs and the drawings simply show their structure. */

  var figures = document.querySelectorAll(".exhibit-figure svg");

  function nums(s) { return s.trim().split(/[\s,]+/).map(Number); }
  function clamp01(v) { return v < 0 ? 0 : v > 1 ? 1 : v; }
  function ease(t) { return t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2; }
  function mix(a, b, k) { return b + (a - b) * k; }

  function model(svg) {
    var m = { svg: svg, parts: [], lines: [], threads: [], p: -1 };

    Array.prototype.forEach.call(svg.querySelectorAll("[data-t]"), function (el) {
      var t = nums(el.getAttribute("data-t"));
      var o = nums(el.getAttribute("data-o"));
      m.parts.push({ el: el, dx: t[0], dy: t[1], rot: t[2], sc: t[3], op: t[4], d: t[5], cx: o[0], cy: o[1] });
    });

    Array.prototype.forEach.call(svg.querySelectorAll("[data-l]"), function (el) {
      m.lines.push({
        el: el,
        from: nums(el.getAttribute("data-l")),
        to: ["x1", "y1", "x2", "y2"].map(function (a) { return Number(el.getAttribute(a)); })
      });
    });

    Array.prototype.forEach.call(svg.querySelectorAll("[data-p]"), function (el) {
      m.threads.push({
        el: el,
        from: nums(el.getAttribute("data-p")),
        to: nums(el.getAttribute("points"))
      });
    });

    return m;
  }

  function render(m, p) {
    if (Math.abs(p - m.p) < 0.0005) return;
    m.p = p;

    /* Structure arrives first; the material follows it into place. */
    m.svg.style.setProperty("--s", ease(clamp01(p / 0.55)).toFixed(3));

    m.parts.forEach(function (q) {
      var k = 1 - ease(clamp01((p - q.d) / 0.65));
      if (k < 0.0005) {
        q.el.removeAttribute("transform");
        q.el.style.opacity = "";
        return;
      }
      var s = 1 + (q.sc - 1) * k;
      q.el.setAttribute("transform",
        "translate(" + (q.dx * k).toFixed(1) + " " + (q.dy * k).toFixed(1) + ") " +
        "rotate(" + (q.rot * k).toFixed(1) + " " + q.cx + " " + q.cy + ") " +
        "translate(" + q.cx + " " + q.cy + ") scale(" + s.toFixed(3) + ") translate(" + -q.cx + " " + -q.cy + ")");
      q.el.style.opacity = (1 + (q.op - 1) * k).toFixed(3);
    });

    var kl = 1 - ease(clamp01(p / 0.8));
    m.lines.forEach(function (l) {
      l.el.setAttribute("x1", mix(l.from[0], l.to[0], kl).toFixed(1));
      l.el.setAttribute("y1", mix(l.from[1], l.to[1], kl).toFixed(1));
      l.el.setAttribute("x2", mix(l.from[2], l.to[2], kl).toFixed(1));
      l.el.setAttribute("y2", mix(l.from[3], l.to[3], kl).toFixed(1));
    });

    /* The thread pulls taut from its start toward the gate. */
    m.threads.forEach(function (t) {
      var n = t.to.length / 2, out = [];
      for (var i = 0; i < n; i++) {
        var k = 1 - ease(clamp01((p - 0.3 * (i / (n - 1))) / 0.7));
        out.push(mix(t.from[i * 2], t.to[i * 2], k).toFixed(1) + "," + mix(t.from[i * 2 + 1], t.to[i * 2 + 1], k).toFixed(1));
      }
      t.el.setAttribute("points", out.join(" "));
    });
  }

  /* 0 as the drawing's top edge enters the viewport, 1 once its centre
     reaches a little above the middle. */
  function progress(svg) {
    var r = svg.getBoundingClientRect(), h = window.innerHeight;
    var start = h, end = h * 0.58 - r.height / 2;
    return clamp01((start - r.top) / (start - end));
  }

  if (figures.length && !reduced.matches) {
    var models = Array.prototype.map.call(figures, model);
    var ticking = false;

    var update = function () {
      ticking = false;
      var h = window.innerHeight;
      models.forEach(function (m) {
        var r = m.svg.getBoundingClientRect();
        if (r.bottom < -200 || r.top > h + 200) return;
        render(m, progress(m.svg));
      });
    };
    var request = function () {
      if (!ticking) { ticking = true; window.requestAnimationFrame(update); }
    };

    /* Set the starting state synchronously: a hidden document never runs
       requestAnimationFrame, and the drawings must not wait on it. */
    models.forEach(function (m) { render(m, progress(m.svg)); });

    window.addEventListener("scroll", request, { passive: true });
    window.addEventListener("resize", request);
  }

  /* --- Rail index -------------------------------------------------------- */
  /* Marks the section you are actually reading, not the one you scrolled past. */

  var navLinks = document.querySelectorAll(".rail-nav a");
  var sections = [];

  Array.prototype.forEach.call(navLinks, function (link) {
    var section = document.querySelector(link.getAttribute("href"));
    if (section) sections.push({ link: link, section: section });
  });

  function setCurrent(link) {
    sections.forEach(function (pair) {
      if (pair.link === link) {
        pair.link.setAttribute("aria-current", "true");
      } else {
        pair.link.removeAttribute("aria-current");
      }
    });
  }

  if (sections.length && "IntersectionObserver" in window) {
    var visible = new Map();

    var spy = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          visible.set(entry.target, entry.intersectionRatio);
        } else {
          visible.delete(entry.target);
        }
      });

      var best = null;
      var bestTop = Infinity;
      visible.forEach(function (ratio, el) {
        var top = el.getBoundingClientRect().top;
        if (top < bestTop) { bestTop = top; best = el; }
      });

      if (best) {
        var match = sections.filter(function (p) { return p.section === best; })[0];
        if (match) setCurrent(match.link);
      }
    }, { rootMargin: "-20% 0px -55% 0px", threshold: 0 });

    sections.forEach(function (pair) { spy.observe(pair.section); });
  }

  /* --- Theme ------------------------------------------------------------- */
  /* Opens in the visitor's system preference. A click pins the choice. */

  var toggle = document.getElementById("theme-toggle");
  var label = toggle && toggle.querySelector(".theme-toggle-label");
  var systemDark = window.matchMedia("(prefers-color-scheme: dark)");

  function currentTheme() {
    return root.getAttribute("data-theme") || (systemDark.matches ? "dark" : "light");
  }

  function syncToggle() {
    if (!toggle) return;
    var next = currentTheme() === "dark" ? "light" : "dark";
    if (label) label.textContent = next === "dark" ? "Dark" : "Light";
    toggle.setAttribute("aria-label", "Switch to " + next + " theme");
  }

  if (toggle) {
    toggle.addEventListener("click", function () {
      var next = currentTheme() === "dark" ? "light" : "dark";
      root.setAttribute("data-theme", next);
      try { localStorage.setItem("theme", next); } catch (e) {}
      syncToggle();
    });

    systemDark.addEventListener("change", syncToggle);
    syncToggle();
  }

  /* --- Smooth anchors ---------------------------------------------------- */
  /* Honour the motion preference the browser reports. */

  if (reduced.matches) root.style.scrollBehavior = "auto";
})();
