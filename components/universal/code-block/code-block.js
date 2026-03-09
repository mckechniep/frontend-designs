/**
 * Code Block Component
 * Handles copy-to-clipboard functionality.
 *
 * Usage:
 *   <div class="code-block" data-code-block>
 *     <button class="code-block__copy" data-copy-btn>Copy</button>
 *     <div class="code-block__body">
 *       <pre><code>const x = 42;</code></pre>
 *     </div>
 *   </div>
 */

(function () {
  function init(block) {
    const btn = block.querySelector("[data-copy-btn]");
    if (!btn) return;

    btn.addEventListener("click", async () => {
      const code = block.querySelector("pre");
      if (!code) return;

      const text = code.textContent;

      try {
        await navigator.clipboard.writeText(text);
        showCopied(btn);
      } catch {
        // Fallback for non-HTTPS or older browsers
        const textarea = document.createElement("textarea");
        textarea.value = text;
        textarea.style.cssText = "position:fixed;opacity:0;";
        document.body.appendChild(textarea);
        textarea.select();
        document.execCommand("copy");
        textarea.remove();
        showCopied(btn);
      }
    });
  }

  function showCopied(btn) {
    const original = btn.textContent;
    btn.textContent = "Copied!";
    btn.classList.add("code-block__copy--copied");
    setTimeout(() => {
      btn.textContent = original;
      btn.classList.remove("code-block__copy--copied");
    }, 2000);
  }

  function initAll() {
    document.querySelectorAll("[data-code-block]").forEach(init);
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", initAll);
  } else {
    initAll();
  }

  window.CodeBlock = { init, initAll };
})();
