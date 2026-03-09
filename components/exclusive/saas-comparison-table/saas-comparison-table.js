/* ========== SaaS Comparison Table ========== */
/* Exclusive JS for the modern-saas comparison table component. */

(function () {
  "use strict";

  /* --- Animate a number from one value to another --- */
  function animateNumber(el, from, to, duration) {
    var start = performance.now();
    var diff = to - from;

    function tick(now) {
      var elapsed = now - start;
      var progress = Math.min(elapsed / duration, 1);
      /* Ease out cubic */
      var eased = 1 - Math.pow(1 - progress, 3);
      var current = Math.round(from + diff * eased);
      el.textContent = current;
      if (progress < 1) {
        requestAnimationFrame(tick);
      }
    }

    requestAnimationFrame(tick);
  }

  /* --- Billing toggle: switch between monthly/annual --- */
  function initToggle(container) {
    var toggleBtns = container.querySelectorAll("[data-billing]");
    var priceEls = container.querySelectorAll("[data-monthly][data-annual]");

    if (!toggleBtns.length || !priceEls.length) return;

    toggleBtns.forEach(function (btn) {
      btn.addEventListener("click", function () {
        var billing = btn.dataset.billing;

        /* Update active state on toggle buttons */
        toggleBtns.forEach(function (b) {
          b.classList.remove("comparison-table__toggle-option--active");
        });
        btn.classList.add("comparison-table__toggle-option--active");

        /* Update prices with animation */
        priceEls.forEach(function (priceEl) {
          var monthlyVal = parseInt(priceEl.dataset.monthly, 10);
          var annualVal = parseInt(priceEl.dataset.annual, 10);
          var currentVal = parseInt(priceEl.textContent, 10) || 0;
          var targetVal = billing === "annual" ? annualVal : monthlyVal;

          /* Update period text */
          var planCell = priceEl.closest(".comparison-table__plan");
          if (planCell) {
            var periodEl = planCell.querySelector(".comparison-table__plan-period");
            if (periodEl) {
              periodEl.textContent = billing === "annual" ? "/year" : "/month";
            }
          }

          /* Respect reduced motion */
          var prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
          if (prefersReducedMotion) {
            priceEl.textContent = targetVal;
          } else {
            animateNumber(priceEl, currentVal, targetVal, 400);
          }
        });
      });
    });
  }

  /* --- Row hover: highlight entire row --- */
  function initRowHover(container) {
    var rows = container.querySelectorAll(".comparison-table__row");
    rows.forEach(function (row) {
      row.addEventListener("mouseenter", function () {
        row.style.background = "rgba(255, 255, 255, 0.05)";
      });
      row.addEventListener("mouseleave", function () {
        row.style.background = "";
      });
    });
  }

  /* --- CTA click: dispatch custom event --- */
  function initCTA(container) {
    var ctaButtons = container.querySelectorAll(".comparison-table__plan-cta");
    ctaButtons.forEach(function (btn) {
      btn.addEventListener("click", function (e) {
        e.preventDefault();
        var planName = btn.dataset.plan || "unknown";
        var event = new CustomEvent("comparison:select", {
          bubbles: true,
          detail: { plan: planName }
        });
        container.dispatchEvent(event);
      });
    });
  }

  /* --- Init a single comparison table --- */
  function init(container) {
    if (!container || container.dataset.comparisonInit === "true") return;
    container.dataset.comparisonInit = "true";

    initToggle(container);
    initRowHover(container);
    initCTA(container);
  }

  /* --- Init all comparison tables on the page --- */
  function initAll(root) {
    var scope = root || document;
    var tables = scope.querySelectorAll(".comparison-table-wrapper");
    tables.forEach(function (t) { init(t); });
  }

  /* --- Expose API --- */
  window.ComparisonTable = {
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
