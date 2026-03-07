/* Custom Select — optional JS module
   Import and call wireCustomSelects() after DOM is ready.
   Requires matching HTML markup (see custom-select.html).
*/

function qs(selector, root = document) {
  return root.querySelector(selector);
}

function qsa(selector, root = document) {
  return Array.from(root.querySelectorAll(selector));
}

export function wireCustomSelects() {
  qsa("[data-custom-select]").forEach((select) => {
    const trigger = qs(".custom-select__trigger", select);
    const menu = qs(".custom-select__menu", select);
    const valueEl = qs("[data-select-value]", select);
    if (!trigger || !menu || !valueEl) return;

    function open() {
      trigger.setAttribute("aria-expanded", "true");
      menu.hidden = false;
    }

    function close() {
      trigger.setAttribute("aria-expanded", "false");
      menu.hidden = true;
    }

    function pick(option) {
      const prev = qs(".custom-select__option--selected", menu);
      if (prev) {
        prev.classList.remove("custom-select__option--selected");
        prev.setAttribute("aria-selected", "false");
      }
      option.classList.add("custom-select__option--selected");
      option.setAttribute("aria-selected", "true");
      valueEl.textContent = option.textContent.trim();
      close();
    }

    trigger.addEventListener("click", () => {
      menu.hidden ? open() : close();
    });

    qsa(".custom-select__option", menu).forEach((opt) => {
      opt.addEventListener("click", () => pick(opt));
    });

    select.addEventListener("keydown", (e) => {
      if (e.key === "Escape") close();
      if (e.key === "Enter" || e.key === " ") {
        e.preventDefault();
        if (menu.hidden) {
          open();
        } else {
          const focused = qs(".custom-select__option:focus", menu);
          if (focused) pick(focused);
        }
      }
      if (e.key === "ArrowDown" || e.key === "ArrowUp") {
        e.preventDefault();
        const opts = qsa(".custom-select__option", menu);
        if (menu.hidden) {
          open();
          opts[0]?.focus();
          return;
        }
        const i = opts.indexOf(document.activeElement);
        const next =
          e.key === "ArrowDown"
            ? opts[Math.min(i + 1, opts.length - 1)]
            : opts[Math.max(i - 1, 0)];
        next?.focus();
      }
    });

    document.addEventListener("click", (e) => {
      if (!select.contains(e.target)) close();
    });
  });
}
