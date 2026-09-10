/* ============================================================================
   Vik Al — behaviour
   Three jobs: reveal on scroll, keep the rail index honest, hold the theme.
   The page is fully readable with this file blocked.
   ========================================================================= */

(function () {
  "use strict";

  var root = document.documentElement;
  var reduced = window.matchMedia("(prefers-reduced-motion: reduce)");

  /* --- Reveal ------------------------------------------------------------ */
  /* Sections, work entries, and plates each earn their own entrance. Plates
     hold their animations until visible so nothing loops off-screen. */

  var targets = document.querySelectorAll(".section, .system, .plate");

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
