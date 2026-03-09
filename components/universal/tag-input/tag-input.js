/**
 * Tag Input Component
 * Interactive tag input with add/remove, keyboard navigation, and optional suggestions.
 *
 * Usage:
 *   <div class="tag-input-wrap" data-tag-input>
 *     <div class="tag-input" data-tag-input-container>
 *       <input class="tag-input__field" data-tag-input-field
 *              placeholder="Add a tag..." />
 *     </div>
 *     <ul class="tag-input__suggestions" data-tag-suggestions></ul>
 *   </div>
 *
 * Attributes:
 *   data-tag-input           — root wrapper
 *   data-tag-input-container — flex container holding tags + input
 *   data-tag-input-field     — text input
 *   data-tag-suggestions     — suggestions list (optional)
 *   data-suggestions='["React","Vue","Svelte"]' — on root, provides suggestion data
 *   data-max-tags="5"        — optional max tag limit
 */

(function () {
  function init(root) {
    const container = root.querySelector("[data-tag-input-container]");
    const field = root.querySelector("[data-tag-input-field]");
    const suggestionsList = root.querySelector("[data-tag-suggestions]");
    if (!container || !field) return;

    let tags = [];
    const maxTags = parseInt(root.dataset.maxTags, 10) || Infinity;
    let suggestions = [];
    try {
      suggestions = JSON.parse(root.dataset.suggestions || "[]");
    } catch (e) {
      suggestions = [];
    }

    let activeIdx = -1;

    function renderTags() {
      container.querySelectorAll(".tag-input__tag").forEach((t) => t.remove());
      tags.forEach((tag, i) => {
        const el = document.createElement("span");
        el.className = "tag-input__tag";
        el.innerHTML = `
          ${escapeHtml(tag)}
          <button class="tag-input__tag-remove" aria-label="Remove ${escapeHtml(tag)}" data-tag-idx="${i}">&times;</button>
        `;
        container.insertBefore(el, field);
      });
      emit();
    }

    function addTag(value) {
      const v = value.trim();
      if (!v || tags.includes(v) || tags.length >= maxTags) return;
      tags.push(v);
      renderTags();
      field.value = "";
      closeSuggestions();
    }

    function removeTag(idx) {
      const el = container.querySelectorAll(".tag-input__tag")[idx];
      if (el) {
        el.classList.add("tag-input__tag--removing");
        el.addEventListener("animationend", () => {
          tags.splice(idx, 1);
          renderTags();
        }, { once: true });
        setTimeout(() => {
          if (tags[idx] !== undefined) {
            tags.splice(idx, 1);
            renderTags();
          }
        }, 200);
      } else {
        tags.splice(idx, 1);
        renderTags();
      }
    }

    function emit() {
      const event = new CustomEvent("taginput:change", {
        bubbles: true,
        detail: { tags: [...tags] },
      });
      root.dispatchEvent(event);
    }

    // Click on container focuses input
    container.addEventListener("click", (e) => {
      if (e.target.closest(".tag-input__tag-remove")) {
        const idx = parseInt(e.target.closest(".tag-input__tag-remove").dataset.tagIdx, 10);
        removeTag(idx);
        return;
      }
      field.focus();
    });

    // Keyboard
    field.addEventListener("keydown", (e) => {
      if (e.key === "Enter" || e.key === ",") {
        e.preventDefault();
        if (activeIdx >= 0 && suggestionsList) {
          const items = filteredSuggestionEls();
          if (items[activeIdx]) {
            addTag(items[activeIdx].textContent);
            return;
          }
        }
        addTag(field.value);
      } else if (e.key === "Backspace" && field.value === "" && tags.length > 0) {
        removeTag(tags.length - 1);
      } else if (e.key === "Escape") {
        closeSuggestions();
      } else if (e.key === "ArrowDown" && suggestionsList) {
        e.preventDefault();
        const items = filteredSuggestionEls();
        activeIdx = Math.min(activeIdx + 1, items.length - 1);
        highlightSuggestion(items);
      } else if (e.key === "ArrowUp" && suggestionsList) {
        e.preventDefault();
        const items = filteredSuggestionEls();
        activeIdx = Math.max(activeIdx - 1, 0);
        highlightSuggestion(items);
      }
    });

    // Suggestions
    field.addEventListener("input", () => {
      if (!suggestionsList || !suggestions.length) return;
      const val = field.value.trim().toLowerCase();
      if (!val) { closeSuggestions(); return; }
      const filtered = suggestions.filter(
        (s) => s.toLowerCase().includes(val) && !tags.includes(s)
      );
      if (!filtered.length) { closeSuggestions(); return; }

      suggestionsList.innerHTML = filtered
        .map((s) => `<li class="tag-input__suggestion">${escapeHtml(s)}</li>`)
        .join("");
      suggestionsList.classList.add("tag-input__suggestions--open");
      activeIdx = -1;
    });

    if (suggestionsList) {
      suggestionsList.addEventListener("click", (e) => {
        const item = e.target.closest(".tag-input__suggestion");
        if (item) addTag(item.textContent);
      });
    }

    function filteredSuggestionEls() {
      return suggestionsList ? Array.from(suggestionsList.querySelectorAll(".tag-input__suggestion")) : [];
    }

    function highlightSuggestion(items) {
      items.forEach((el) => el.removeAttribute("data-active"));
      if (items[activeIdx]) {
        items[activeIdx].setAttribute("data-active", "true");
        items[activeIdx].scrollIntoView({ block: "nearest" });
      }
    }

    function closeSuggestions() {
      if (suggestionsList) {
        suggestionsList.classList.remove("tag-input__suggestions--open");
        suggestionsList.innerHTML = "";
        activeIdx = -1;
      }
    }

    // Close suggestions on outside click
    document.addEventListener("click", (e) => {
      if (!root.contains(e.target)) closeSuggestions();
    });
  }

  function escapeHtml(str) {
    const div = document.createElement("div");
    div.textContent = str;
    return div.innerHTML;
  }

  function initAll() {
    document.querySelectorAll("[data-tag-input]").forEach(init);
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", initAll);
  } else {
    initAll();
  }

  window.TagInput = { init, initAll };
})();
