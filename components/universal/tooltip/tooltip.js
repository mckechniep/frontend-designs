/**
 * Tooltip Component
 * Mostly CSS-driven. JS handles edge-detection to prevent viewport overflow.
 *
 * Usage:
 *   <button data-tooltip="Helpful text" data-tooltip-pos="top">Hover me</button>
 *
 * Positions: top (default), bottom, left, right
 */

(function () {
  function adjustPosition(el) {
    const rect = el.getBoundingClientRect();
    const pos = el.dataset.tooltipPos || "top";
    const margin = 12;

    // If tooltip would overflow viewport edges, flip to a safe position
    if (pos === "top" && rect.top < 60) {
      el.dataset.tooltipPos = "bottom";
    } else if (pos === "bottom" && rect.bottom > window.innerHeight - 60) {
      el.dataset.tooltipPos = "top";
    } else if (pos === "left" && rect.left < 200) {
      el.dataset.tooltipPos = "right";
    } else if (pos === "right" && rect.right > window.innerWidth - 200) {
      el.dataset.tooltipPos = "left";
    }
  }

  function restorePosition(el) {
    if (el._originalPos !== undefined) {
      el.dataset.tooltipPos = el._originalPos;
    }
  }

  function init() {
    document.querySelectorAll("[data-tooltip]").forEach((el) => {
      el._originalPos = el.dataset.tooltipPos || "top";

      el.addEventListener("mouseenter", () => adjustPosition(el));
      el.addEventListener("mouseleave", () => restorePosition(el));
      el.addEventListener("focus", () => adjustPosition(el));
      el.addEventListener("blur", () => restorePosition(el));
    });
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }

  window.Tooltip = { init };
})();
