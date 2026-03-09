/**
 * Toast Stack Component
 * Programmatic toast notification system with queuing, auto-dismiss, and stacking.
 *
 * Usage:
 *   Toast.show({ title: "Saved", message: "Your changes were saved.", type: "success" });
 *   Toast.show({ title: "Error", message: "Something went wrong.", type: "error", duration: 8000 });
 *   Toast.show({ title: "Heads up", type: "info" });
 *
 * Options:
 *   title    — string (required)
 *   message  — string (optional)
 *   type     — "info" | "success" | "warning" | "error" (default: "info")
 *   duration — ms, 0 for persistent (default: 5000)
 */

(function () {
  const MAX_VISIBLE = 5;
  const ICONS = {
    info: "\u2139\uFE0F",
    success: "\u2705",
    warning: "\u26A0\uFE0F",
    error: "\u274C",
  };

  let container = null;

  function ensureContainer() {
    if (container && document.body.contains(container)) return container;
    container = document.createElement("div");
    container.className = "toast-stack";
    container.setAttribute("aria-live", "polite");
    container.setAttribute("aria-atomic", "false");
    document.body.appendChild(container);
    return container;
  }

  function dismiss(el) {
    el.classList.add("toast-item--dismissing");
    el.addEventListener("animationend", () => el.remove(), { once: true });
    // Fallback if animation doesn't fire (reduced motion)
    setTimeout(() => { if (el.parentNode) el.remove(); }, 300);
  }

  function show(opts = {}) {
    const {
      title = "",
      message = "",
      type = "info",
      duration = 5000,
    } = opts;

    const stack = ensureContainer();

    // Enforce max visible
    const existing = stack.querySelectorAll(".toast-item:not(.toast-item--dismissing)");
    if (existing.length >= MAX_VISIBLE) {
      dismiss(existing[0]);
    }

    const el = document.createElement("div");
    el.className = `toast-item toast-item--${type}`;
    el.setAttribute("role", "status");

    el.innerHTML = `
      <span class="toast-item__icon" aria-hidden="true">${ICONS[type] || ICONS.info}</span>
      <div class="toast-item__content">
        <div class="toast-item__title">${escapeHtml(title)}</div>
        ${message ? `<div class="toast-item__message">${escapeHtml(message)}</div>` : ""}
      </div>
      <button class="toast-item__close" aria-label="Dismiss">&times;</button>
      ${duration > 0 ? `<div class="toast-item__progress" style="animation-duration:${duration}ms"></div>` : ""}
    `;

    el.querySelector(".toast-item__close").addEventListener("click", () => dismiss(el));

    // Pause progress on hover
    if (duration > 0) {
      let timer = setTimeout(() => dismiss(el), duration);
      const progress = el.querySelector(".toast-item__progress");

      el.addEventListener("mouseenter", () => {
        clearTimeout(timer);
        if (progress) progress.style.animationPlayState = "paused";
      });

      el.addEventListener("mouseleave", () => {
        // Get remaining fraction and restart
        if (progress) {
          const remaining = progress.getBoundingClientRect().width / el.getBoundingClientRect().width;
          const remainingMs = remaining * duration;
          progress.style.animationPlayState = "running";
          timer = setTimeout(() => dismiss(el), remainingMs);
        }
      });
    }

    stack.appendChild(el);
    return el;
  }

  function escapeHtml(str) {
    const div = document.createElement("div");
    div.textContent = str;
    return div.innerHTML;
  }

  function clearAll() {
    if (!container) return;
    container.querySelectorAll(".toast-item").forEach(dismiss);
  }

  window.Toast = { show, clearAll };
})();
