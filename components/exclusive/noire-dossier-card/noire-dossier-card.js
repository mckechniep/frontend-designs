/* ========== Noire Dossier Card ========== */
/* EXCLUSIVE component for noire-editorial theme. */
/* Toggle redacted sections, typewriter animation, custom events. */

(function () {
  "use strict";

  /* ----- Typewriter Engine ----- */

  function typewrite(el, text, speed, callback) {
    el.classList.add("dossier__notes-content--typing");
    el.textContent = "";
    let i = 0;

    function tick() {
      if (i < text.length) {
        el.textContent += text.charAt(i);
        i++;
        /* Slightly randomized delay for natural feel */
        var delay = speed + Math.floor(Math.random() * 40) - 20;
        setTimeout(tick, Math.max(15, delay));
      } else {
        el.classList.remove("dossier__notes-content--typing");
        if (typeof callback === "function") callback();
      }
    }

    tick();
  }


  /* ----- Redacted Toggle ----- */

  function bindRedacted(card) {
    var redacted = card.querySelectorAll(".dossier__redacted");
    redacted.forEach(function (el) {
      el.addEventListener("click", function () {
        var wasRevealed = el.classList.contains("is-revealed");
        el.classList.toggle("is-revealed");

        /* Dispatch custom event */
        var evt = new CustomEvent("dossier:reveal", {
          bubbles: true,
          detail: {
            element: el,
            revealed: !wasRevealed,
            text: el.textContent
          }
        });
        card.dispatchEvent(evt);
      });
    });
  }


  /* ----- Notes Typewriter ----- */

  function bindTypewriter(card) {
    var notes = card.querySelectorAll(".dossier__notes-content");
    notes.forEach(function (el) {
      var text = el.getAttribute("data-typewriter") || el.textContent;
      var speed = parseInt(el.getAttribute("data-speed"), 10) || 45;
      var triggered = false;

      /* Observe when the notes element enters the viewport */
      if ("IntersectionObserver" in window) {
        var observer = new IntersectionObserver(function (entries) {
          entries.forEach(function (entry) {
            if (entry.isIntersecting && !triggered) {
              triggered = true;
              typewrite(el, text, speed);
              observer.unobserve(el);
            }
          });
        }, { threshold: 0.3 });
        observer.observe(el);
      } else {
        /* Fallback: run immediately */
        triggered = true;
        typewrite(el, text, speed);
      }
    });
  }


  /* ----- Init Single Card ----- */

  function init(card) {
    if (!card || card.hasAttribute("data-dossier-init")) return;
    card.setAttribute("data-dossier-init", "true");

    bindRedacted(card);
    bindTypewriter(card);
  }


  /* ----- Init All Cards ----- */

  function initAll(root) {
    var scope = root || document;
    var cards = scope.querySelectorAll(".dossier");
    cards.forEach(function (card) {
      init(card);
    });
  }


  /* ----- Expose Public API ----- */

  window.NoireDossier = {
    init: init,
    initAll: initAll
  };


  /* ----- Auto-Init on DOMContentLoaded ----- */

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", function () {
      initAll();
    });
  } else {
    initAll();
  }
})();
