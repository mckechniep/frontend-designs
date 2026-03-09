/**
 * Stepper / Wizard Component
 * Multi-step indicator with programmatic navigation and events.
 *
 * Usage:
 *   <ol class="stepper" data-stepper>
 *     <li class="stepper__step stepper__step--completed" data-step="1">...</li>
 *     <li class="stepper__step stepper__step--active" data-step="2">...</li>
 *     <li class="stepper__step stepper__step--upcoming" data-step="3">...</li>
 *   </ol>
 *
 * Events:
 *   stepper:change — { step: number, prev: number, total: number }
 */

(function () {
  function init(root) {
    var steps = Array.from(root.querySelectorAll("[data-step]"));
    var total = steps.length;
    var current = 1;

    // Determine initial active step
    var activeEl = root.querySelector(".stepper__step--active");
    if (activeEl && activeEl.dataset.step) {
      current = parseInt(activeEl.dataset.step, 10);
    }

    function goTo(stepNum) {
      if (stepNum < 1 || stepNum > total || stepNum === current) return;

      var prev = current;
      current = stepNum;

      steps.forEach(function (step) {
        var n = parseInt(step.dataset.step, 10);
        step.classList.remove(
          "stepper__step--completed",
          "stepper__step--active",
          "stepper__step--upcoming"
        );
        if (n < current) {
          step.classList.add("stepper__step--completed");
        } else if (n === current) {
          step.classList.add("stepper__step--active");
        } else {
          step.classList.add("stepper__step--upcoming");
        }
      });

      root.dispatchEvent(
        new CustomEvent("stepper:change", {
          bubbles: true,
          detail: { step: current, prev: prev, total: total },
        })
      );
    }

    function next() {
      goTo(current + 1);
    }

    function previous() {
      goTo(current - 1);
    }

    function getCurrent() {
      return current;
    }

    function getTotal() {
      return total;
    }

    // Store API on the element for external access
    root._stepper = { goTo: goTo, next: next, previous: previous, getCurrent: getCurrent, getTotal: getTotal };

    return root._stepper;
  }

  function initAll() {
    document.querySelectorAll("[data-stepper]").forEach(init);
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", initAll);
  } else {
    initAll();
  }

  window.Stepper = { init: init, initAll: initAll };
})();
