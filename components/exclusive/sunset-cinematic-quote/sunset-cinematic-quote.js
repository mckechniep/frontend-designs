/* ========== Sunset Cinematic Quote ========== */
/* EXCLUSIVE component for sunset-gradient theme. */
/* Scroll-triggered reveal, text split animation, gallery scroll snap. */

(function () {
  "use strict";

  /* ----- Text Split — Break quote into animated words ----- */

  function splitText(el) {
    var original = el.textContent.trim();
    if (!original) return;

    /* Store original text for accessibility */
    el.setAttribute("aria-label", original);

    var words = original.split(/\s+/);
    el.innerHTML = "";

    words.forEach(function (word, i) {
      var span = document.createElement("span");
      span.className = "cine-quote__word";
      span.textContent = word;
      span.style.transitionDelay = (i * 0.07) + "s";
      el.appendChild(span);

      /* Add space between words */
      if (i < words.length - 1) {
        el.appendChild(document.createTextNode(" "));
      }
    });
  }


  /* ----- Scroll-Triggered Reveal ----- */

  function bindReveal(quote) {
    if (!("IntersectionObserver" in window)) {
      /* Fallback: reveal immediately */
      quote.classList.add("is-revealed");
      return;
    }

    var observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          quote.classList.add("is-revealed");

          /* Dispatch custom event */
          var evt = new CustomEvent("cinequote:reveal", {
            bubbles: true,
            detail: {
              element: quote
            }
          });
          quote.dispatchEvent(evt);

          observer.unobserve(quote);
        }
      });
    }, { threshold: 0.25 });

    observer.observe(quote);
  }


  /* ----- Gallery Scroll Snap ----- */

  function bindGallery(gallery) {
    /* Ensure scroll-snap is supported and working */
    if (!gallery) return;

    /* Optional: keyboard navigation within gallery */
    gallery.setAttribute("tabindex", "0");
    gallery.setAttribute("role", "region");
    gallery.setAttribute("aria-label", "Quote gallery");

    gallery.addEventListener("keydown", function (e) {
      var scrollAmount = 340;
      if (e.key === "ArrowRight") {
        gallery.scrollBy({ left: scrollAmount, behavior: "smooth" });
        e.preventDefault();
      } else if (e.key === "ArrowLeft") {
        gallery.scrollBy({ left: -scrollAmount, behavior: "smooth" });
        e.preventDefault();
      }
    });
  }


  /* ----- Init Single Quote ----- */

  function init(quote) {
    if (!quote || quote.hasAttribute("data-cinequote-init")) return;
    quote.setAttribute("data-cinequote-init", "true");

    /* Split text into words for stagger animation */
    var textEl = quote.querySelector(".cine-quote__text");
    if (textEl) {
      splitText(textEl);
    }

    /* Bind scroll reveal */
    bindReveal(quote);
  }


  /* ----- Init All Quotes ----- */

  function initAll(root) {
    var scope = root || document;

    /* Init individual quotes */
    var quotes = scope.querySelectorAll(".cine-quote");
    quotes.forEach(function (quote) {
      init(quote);
    });

    /* Init galleries */
    var galleries = scope.querySelectorAll(".cine-quote-gallery");
    galleries.forEach(function (gallery) {
      bindGallery(gallery);
    });
  }


  /* ----- Expose Public API ----- */

  window.CineQuote = {
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
