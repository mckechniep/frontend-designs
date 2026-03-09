/* ========== Pastel Mood Board ========== */
/* EXCLUSIVE component for pastel-dreamscape theme. */
/* Copy hex colors, tag filtering, custom events. */

(function () {
  "use strict";

  /* ----- Copy Color Hex ----- */

  function bindCopyButtons(board) {
    var buttons = board.querySelectorAll(".mood-card__copy-btn");
    buttons.forEach(function (btn) {
      btn.addEventListener("click", function () {
        var card = btn.closest(".mood-card--color");
        if (!card) return;

        var hex = card.getAttribute("data-color") || "";
        var name = card.getAttribute("data-color-name") || "";

        /* Copy to clipboard */
        if (navigator.clipboard && navigator.clipboard.writeText) {
          navigator.clipboard.writeText(hex);
        } else {
          /* Fallback for older browsers */
          var temp = document.createElement("textarea");
          temp.value = hex;
          temp.style.position = "fixed";
          temp.style.opacity = "0";
          document.body.appendChild(temp);
          temp.select();
          document.execCommand("copy");
          document.body.removeChild(temp);
        }

        /* Show "Copied!" feedback */
        var original = btn.textContent;
        btn.textContent = "Copied!";
        btn.classList.add("is-copied");

        setTimeout(function () {
          btn.textContent = original;
          btn.classList.remove("is-copied");
        }, 1500);

        /* Dispatch custom event */
        var evt = new CustomEvent("moodboard:copy", {
          bubbles: true,
          detail: { color: hex, name: name }
        });
        board.dispatchEvent(evt);
      });
    });
  }


  /* ----- Tag Filtering ----- */

  function bindTagFiltering(board) {
    var root = board.closest("[data-mood-board-root]") || board.parentElement;
    var filterRow = root ? root.querySelector(".mood-board-filters") : null;
    var cards = board.querySelectorAll(".mood-card");
    var allTags = [];

    /* Also bind inline card tags */
    var cardTags = board.querySelectorAll(".mood-card__tag");

    function getActiveTag() {
      if (!filterRow) return null;
      var active = filterRow.querySelector(".mood-board-filters__tag.is-active");
      return active ? active.getAttribute("data-tag") : null;
    }

    function applyFilter(tag) {
      cards.forEach(function (card) {
        var cardTagStr = card.getAttribute("data-tags") || "";
        var cardTagList = cardTagStr.split(",").map(function (t) { return t.trim().toLowerCase(); });

        if (!tag) {
          card.classList.remove("is-dimmed");
        } else if (cardTagList.indexOf(tag.toLowerCase()) !== -1) {
          card.classList.remove("is-dimmed");
        } else {
          card.classList.add("is-dimmed");
        }
      });

      /* Update filter row active states */
      if (filterRow) {
        var filterTags = filterRow.querySelectorAll(".mood-board-filters__tag");
        filterTags.forEach(function (ft) {
          var ftTag = ft.getAttribute("data-tag");
          if (tag && ftTag && ftTag.toLowerCase() === tag.toLowerCase()) {
            ft.classList.add("is-active");
          } else {
            ft.classList.remove("is-active");
          }
        });
      }

      /* Update card tag active states */
      cardTags.forEach(function (ct) {
        var ctTag = ct.getAttribute("data-tag") || ct.textContent.trim();
        if (tag && ctTag.toLowerCase() === tag.toLowerCase()) {
          ct.classList.add("is-active");
        } else {
          ct.classList.remove("is-active");
        }
      });

      /* Dispatch custom event */
      var evt = new CustomEvent("moodboard:filter", {
        bubbles: true,
        detail: { tag: tag || null }
      });
      board.dispatchEvent(evt);
    }

    /* Bind filter row clicks */
    if (filterRow) {
      var filterButtons = filterRow.querySelectorAll(".mood-board-filters__tag");
      filterButtons.forEach(function (btn) {
        btn.addEventListener("click", function () {
          var tag = btn.getAttribute("data-tag");
          var current = getActiveTag();

          /* Toggle off if same tag clicked */
          if (current && current.toLowerCase() === tag.toLowerCase()) {
            applyFilter(null);
          } else {
            applyFilter(tag);
          }
        });
      });
    }

    /* Bind inline card tag clicks */
    cardTags.forEach(function (ct) {
      ct.addEventListener("click", function () {
        var tag = ct.getAttribute("data-tag") || ct.textContent.trim();
        var current = getActiveTag();

        if (current && current.toLowerCase() === tag.toLowerCase()) {
          applyFilter(null);
        } else {
          applyFilter(tag);
        }
      });
    });
  }


  /* ----- Init Single Board ----- */

  function init(board) {
    if (!board || board.hasAttribute("data-mood-board-init")) return;
    board.setAttribute("data-mood-board-init", "true");

    bindCopyButtons(board);
    bindTagFiltering(board);
  }


  /* ----- Init All Boards ----- */

  function initAll(root) {
    var scope = root || document;
    var boards = scope.querySelectorAll(".mood-board");
    boards.forEach(function (board) {
      init(board);
    });
  }


  /* ----- Expose Public API ----- */

  window.MoodBoard = {
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
