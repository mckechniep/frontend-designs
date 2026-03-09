/**
 * Dropdown Menu Component
 * Keyboard-navigable, accessible dropdown with click-outside dismiss.
 *
 * Usage:
 *   <div class="dropdown" data-dropdown>
 *     <button class="dropdown__trigger" data-dropdown-trigger aria-haspopup="true" aria-expanded="false">
 *       Label <span class="dropdown__caret">▾</span>
 *     </button>
 *     <ul class="dropdown__menu" role="menu" data-dropdown-menu>
 *       <li><button class="dropdown__item" role="menuitem">Item</button></li>
 *     </ul>
 *   </div>
 */

(function () {
  function init(root) {
    const trigger = root.querySelector("[data-dropdown-trigger]");
    const menu = root.querySelector("[data-dropdown-menu]");
    if (!trigger || !menu) return;

    const items = () =>
      Array.from(menu.querySelectorAll('.dropdown__item:not([disabled]):not([aria-disabled="true"])'));

    let activeIdx = -1;

    function open() {
      trigger.setAttribute("aria-expanded", "true");
      menu.classList.add("dropdown__menu--open");
      activeIdx = -1;
      clearActive();
      document.addEventListener("click", onOutsideClick, true);
      document.addEventListener("keydown", onDocKey, true);
    }

    function close() {
      trigger.setAttribute("aria-expanded", "false");
      menu.classList.remove("dropdown__menu--open");
      activeIdx = -1;
      clearActive();
      document.removeEventListener("click", onOutsideClick, true);
      document.removeEventListener("keydown", onDocKey, true);
    }

    function toggle() {
      const expanded = trigger.getAttribute("aria-expanded") === "true";
      expanded ? close() : open();
    }

    function clearActive() {
      items().forEach((el) => el.removeAttribute("data-active"));
    }

    function focusIdx(idx) {
      const list = items();
      if (!list.length) return;
      activeIdx = ((idx % list.length) + list.length) % list.length;
      clearActive();
      list[activeIdx].setAttribute("data-active", "true");
      list[activeIdx].focus();
    }

    function selectItem(el) {
      const event = new CustomEvent("dropdown:select", {
        bubbles: true,
        detail: { value: el.dataset.value, label: el.textContent.trim() },
      });
      root.dispatchEvent(event);
      close();
      trigger.focus();
    }

    trigger.addEventListener("click", (e) => {
      e.stopPropagation();
      toggle();
    });

    menu.addEventListener("click", (e) => {
      const item = e.target.closest(".dropdown__item");
      if (item && !item.disabled && item.getAttribute("aria-disabled") !== "true") {
        selectItem(item);
      }
    });

    function onOutsideClick(e) {
      if (!root.contains(e.target)) close();
    }

    function onDocKey(e) {
      const isOpen = trigger.getAttribute("aria-expanded") === "true";
      if (!isOpen) return;

      switch (e.key) {
        case "Escape":
          e.preventDefault();
          close();
          trigger.focus();
          break;
        case "ArrowDown":
          e.preventDefault();
          focusIdx(activeIdx + 1);
          break;
        case "ArrowUp":
          e.preventDefault();
          focusIdx(activeIdx - 1);
          break;
        case "Home":
          e.preventDefault();
          focusIdx(0);
          break;
        case "End":
          e.preventDefault();
          focusIdx(items().length - 1);
          break;
        case "Enter":
        case " ":
          if (activeIdx >= 0) {
            e.preventDefault();
            selectItem(items()[activeIdx]);
          }
          break;
        case "Tab":
          close();
          break;
      }
    }

    trigger.addEventListener("keydown", (e) => {
      if (e.key === "ArrowDown" || e.key === "Enter" || e.key === " ") {
        const isOpen = trigger.getAttribute("aria-expanded") === "true";
        if (!isOpen) {
          e.preventDefault();
          open();
          requestAnimationFrame(() => focusIdx(0));
        }
      }
    });
  }

  function initAll() {
    document.querySelectorAll("[data-dropdown]").forEach(init);
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", initAll);
  } else {
    initAll();
  }

  window.Dropdown = { init, initAll };
})();
