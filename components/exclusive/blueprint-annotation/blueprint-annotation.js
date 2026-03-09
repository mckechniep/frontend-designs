/* ========== Blueprint Annotation Callout ========== */
/* Exclusive JS for the corporate-blueprint annotation component. */

(function () {
  "use strict";

  /**
   * Initialize a single blueprint canvas and its annotations.
   * @param {HTMLElement} canvas - A .blueprint-canvas element.
   */
  function init(canvas) {
    if (!canvas || canvas.dataset.bpInit === "true") return;
    canvas.dataset.bpInit = "true";

    var annotations = canvas.querySelectorAll(".blueprint-annotation");
    var legendItems = canvas.querySelectorAll(".blueprint-legend__item");
    var activeAnnotation = null;

    /* --- Activate an annotation by number --- */
    function activate(number) {
      /* Deactivate current */
      if (activeAnnotation) {
        activeAnnotation.classList.remove("is-active");
      }

      /* Deactivate legend items */
      legendItems.forEach(function (item) {
        item.classList.remove("is-active");
      });

      /* Find the matching annotation */
      var target = null;
      annotations.forEach(function (ann) {
        if (ann.dataset.annotation === String(number)) {
          target = ann;
        }
      });

      if (!target) return;

      /* If clicking the same one, just deactivate (toggle) */
      if (activeAnnotation === target) {
        activeAnnotation = null;
        return;
      }

      /* Activate */
      target.classList.add("is-active");
      activeAnnotation = target;

      /* Activate corresponding legend item */
      legendItems.forEach(function (item) {
        if (item.dataset.annotation === String(number)) {
          item.classList.add("is-active");
        }
      });

      /* Dispatch custom event */
      var title = "";
      var titleEl = target.querySelector(".blueprint-annotation__title");
      if (titleEl) {
        title = titleEl.textContent.trim();
      }

      canvas.dispatchEvent(new CustomEvent("annotation:select", {
        bubbles: true,
        detail: { number: number, title: title }
      }));
    }

    /* --- Marker click handlers --- */
    annotations.forEach(function (ann) {
      var marker = ann.querySelector(".blueprint-annotation__marker");
      if (!marker) return;

      marker.addEventListener("click", function (e) {
        e.stopPropagation();
        activate(ann.dataset.annotation);
      });
    });

    /* --- Legend click handlers --- */
    legendItems.forEach(function (item) {
      item.addEventListener("click", function (e) {
        e.stopPropagation();
        activate(item.dataset.annotation);
      });
    });

    /* --- Click on canvas background to deactivate --- */
    canvas.addEventListener("click", function (e) {
      if (e.target === canvas || e.target.classList.contains("blueprint-canvas__corners")) {
        if (activeAnnotation) {
          activeAnnotation.classList.remove("is-active");
          activeAnnotation = null;
          legendItems.forEach(function (item) {
            item.classList.remove("is-active");
          });
        }
      }
    });

    /* --- Animate leader lines: set initial dashoffset and animate on hover --- */
    annotations.forEach(function (ann) {
      var leaderLines = ann.querySelectorAll(".leader-line");
      leaderLines.forEach(function (line) {
        var length = line.getTotalLength ? line.getTotalLength() : 500;
        line.style.strokeDasharray = length;
        line.style.strokeDashoffset = length;
      });
    });

    /* --- Show all callouts as visible by default after a staggered fade-in --- */
    annotations.forEach(function (ann, i) {
      var callout = ann.querySelector(".blueprint-annotation__callout");
      if (callout) {
        setTimeout(function () {
          callout.classList.add("is-visible");
        }, 150 * (i + 1));
      }
    });
  }

  /**
   * Initialize all blueprint canvases on the page.
   * @param {HTMLElement} [root] - Optional root element (defaults to document).
   */
  function initAll(root) {
    var container = root || document;
    var canvases = container.querySelectorAll(".blueprint-canvas");
    canvases.forEach(function (c) { init(c); });
  }

  /* --- Expose API --- */
  window.BlueprintAnnotation = {
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
