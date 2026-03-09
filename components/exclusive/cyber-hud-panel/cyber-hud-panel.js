/* ========== Cyber HUD Panel ========== */
/* Exclusive JS for the cyberpunk-neon HUD panel component. */

(function () {
  "use strict";

  /* --- Gauge: animate SVG stroke-dashoffset --- */
  function initGauge(panel) {
    var fill = panel.querySelector(".hud-gauge__fill");
    var textEl = panel.querySelector(".hud-gauge__center-text");
    if (!fill) return;

    var radius = parseFloat(fill.getAttribute("r")) || 50;
    var circumference = 2 * Math.PI * radius;
    var percent = parseFloat(fill.dataset.percent) || 0;

    fill.style.strokeDasharray = circumference;
    fill.style.strokeDashoffset = circumference;

    /* Trigger animation after brief delay for visual effect */
    requestAnimationFrame(function () {
      setTimeout(function () {
        var offset = circumference - (percent / 100) * circumference;
        fill.style.strokeDashoffset = offset;
        if (textEl) textEl.textContent = Math.round(percent) + "%";
      }, 200);
    });
  }

  /* --- Data Readout: lines appear one at a time --- */
  function initReadout(panel) {
    var lines = panel.querySelectorAll(".hud-readout__line");
    if (!lines.length) return;

    lines.forEach(function (line, i) {
      line.style.animationDelay = (i * 0.45) + "s";
    });

    /* Add blinking cursor after last line */
    var body = panel.querySelector(".hud-panel__body");
    if (body && !body.querySelector(".hud-readout__cursor")) {
      var cursor = document.createElement("span");
      cursor.className = "hud-readout__cursor";
      cursor.setAttribute("aria-hidden", "true");
      body.appendChild(cursor);
    }
  }

  /* --- Minimize / Maximize toggle --- */
  function initControls(panel) {
    var minBtn = panel.querySelector("[data-hud-minimize]");
    var closeBtn = panel.querySelector("[data-hud-close]");

    if (minBtn) {
      minBtn.addEventListener("click", function () {
        var isMinimized = panel.classList.toggle("is-minimized");
        minBtn.textContent = isMinimized ? "+" : "\u2013";
        minBtn.setAttribute("aria-label", isMinimized ? "Maximize panel" : "Minimize panel");
      });
    }

    if (closeBtn) {
      closeBtn.addEventListener("click", function () {
        panel.style.opacity = "0";
        panel.style.transform = "scale(0.95)";
        panel.style.transition = "opacity 0.25s, transform 0.25s";
        setTimeout(function () {
          panel.style.display = "none";
        }, 260);
      });
    }
  }

  /* --- Scrolling status text (already CSS-animated, but JS can update content) --- */
  function initFooterScroll(panel) {
    var scrollEl = panel.querySelector(".hud-panel__scroll-text");
    if (!scrollEl) return;
    /* Content is static from HTML; JS could update dynamically if needed */
  }

  /* --- Init a single panel --- */
  function init(panel) {
    if (!panel || panel.dataset.hudInit === "true") return;
    panel.dataset.hudInit = "true";

    initControls(panel);
    initFooterScroll(panel);

    if (panel.classList.contains("hud-panel--readout")) {
      initReadout(panel);
    }

    var gauge = panel.querySelector(".hud-gauge");
    if (gauge) {
      initGauge(panel);
    }
  }

  /* --- Init all panels on the page --- */
  function initAll(root) {
    var container = root || document;
    var panels = container.querySelectorAll(".hud-panel");
    panels.forEach(function (p) { init(p); });
  }

  /* --- Expose API --- */
  window.CyberHUD = {
    init: init,
    initAll: initAll
  };

  /* Auto-init on DOMContentLoaded */
  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", function () { initAll(); });
  } else {
    initAll();
  }
})();
