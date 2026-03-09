/**
 * Timeline / Activity Feed Component
 * Scroll-triggered reveal animation using IntersectionObserver.
 * Dispatches `timeline:reveal` custom event when items become visible.
 *
 * Usage:
 *   <ul class="timeline" data-timeline-reveal>
 *     <li class="timeline__item">...</li>
 *   </ul>
 *
 * API:
 *   Timeline.init(containerEl)  - initialise a single timeline
 *   Timeline.initAll()          - initialise all [data-timeline-reveal] timelines
 */

(function () {
  var observers = [];

  function revealItem(entry) {
    if (entry.isIntersecting) {
      entry.target.classList.add("is-visible");
      entry.target.dispatchEvent(
        new CustomEvent("timeline:reveal", { bubbles: true })
      );
    }
  }

  function init(container) {
    if (!container) return;

    var items = container.querySelectorAll(".timeline__item");
    if (!items.length) return;

    /* Respect reduced-motion */
    var prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (prefersReduced && prefersReduced.matches) {
      items.forEach(function (item) {
        item.classList.add("is-visible");
      });
      return;
    }

    var observer = new IntersectionObserver(
      function (entries) {
        entries.forEach(revealItem);
      },
      { threshold: 0.15 }
    );

    items.forEach(function (item) {
      observer.observe(item);
    });

    observers.push(observer);
  }

  function initAll() {
    document
      .querySelectorAll("[data-timeline-reveal]")
      .forEach(function (el) {
        init(el);
      });
  }

  /* Auto-init on DOM ready */
  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", initAll);
  } else {
    initAll();
  }

  window.Timeline = { init: init, initAll: initAll };
})();
