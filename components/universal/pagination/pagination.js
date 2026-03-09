/**
 * Pagination Component
 * Handles page navigation clicks and emits events. Works with static HTML or dynamic rendering.
 *
 * Usage (static HTML):
 *   <nav aria-label="Pagination" data-pagination>
 *     <ol class="pagination">
 *       <li class="pagination__item">
 *         <a class="pagination__link pagination__link--prev" href="#" data-page="prev">
 *           <svg viewBox="0 0 24 24"><path d="M15 18l-6-6 6-6"/></svg>
 *         </a>
 *       </li>
 *       <li class="pagination__item"><a class="pagination__link" href="#" data-page="1" aria-current="page">1</a></li>
 *       <li class="pagination__item"><a class="pagination__link" href="#" data-page="2">2</a></li>
 *       ...
 *     </ol>
 *   </nav>
 *
 * Events:
 *   pagination:change — { page: number, prev: number }
 */

(function () {
  function init(root) {
    let currentPage = 1;

    // Find initial active
    const active = root.querySelector('[aria-current="page"]');
    if (active && active.dataset.page) {
      currentPage = parseInt(active.dataset.page, 10);
    }

    root.addEventListener("click", (e) => {
      const link = e.target.closest("[data-page]");
      if (!link || link.disabled || link.getAttribute("aria-disabled") === "true") return;
      e.preventDefault();

      const allPages = Array.from(root.querySelectorAll("[data-page]"))
        .filter((el) => !isNaN(parseInt(el.dataset.page, 10)));
      const maxPage = Math.max(...allPages.map((el) => parseInt(el.dataset.page, 10)));

      let newPage;
      if (link.dataset.page === "prev") {
        newPage = Math.max(1, currentPage - 1);
      } else if (link.dataset.page === "next") {
        newPage = Math.min(maxPage, currentPage + 1);
      } else {
        newPage = parseInt(link.dataset.page, 10);
      }

      if (newPage === currentPage) return;

      const prev = currentPage;
      currentPage = newPage;

      // Update aria-current
      root.querySelectorAll("[aria-current]").forEach((el) => el.removeAttribute("aria-current"));
      const target = root.querySelector(`[data-page="${currentPage}"]`);
      if (target) target.setAttribute("aria-current", "page");

      // Update prev/next disabled state
      const prevBtn = root.querySelector('[data-page="prev"]');
      const nextBtn = root.querySelector('[data-page="next"]');
      if (prevBtn) {
        currentPage <= 1
          ? prevBtn.setAttribute("aria-disabled", "true")
          : prevBtn.removeAttribute("aria-disabled");
      }
      if (nextBtn) {
        currentPage >= maxPage
          ? nextBtn.setAttribute("aria-disabled", "true")
          : nextBtn.removeAttribute("aria-disabled");
      }

      // Update info text
      const info = root.querySelector(".pagination__info");
      if (info) info.textContent = `Page ${currentPage} of ${maxPage}`;

      root.dispatchEvent(
        new CustomEvent("pagination:change", {
          bubbles: true,
          detail: { page: currentPage, prev },
        })
      );
    });
  }

  function initAll() {
    document.querySelectorAll("[data-pagination]").forEach(init);
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", initAll);
  } else {
    initAll();
  }

  window.Pagination = { init, initAll };
})();
