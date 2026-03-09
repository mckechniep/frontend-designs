/**
 * Breadcrumb Component
 * Handles truncation expand/collapse for long breadcrumb trails.
 *
 * Usage:
 *   <nav aria-label="Breadcrumb">
 *     <ol class="breadcrumb breadcrumb--truncate" data-breadcrumb>
 *       <li class="breadcrumb__item"><a class="breadcrumb__link" href="#">Home</a></li>
 *       <li class="breadcrumb__item breadcrumb__item--collapsed"><a class="breadcrumb__link" href="#">Category</a></li>
 *       <li class="breadcrumb__item breadcrumb__item--collapsed"><a class="breadcrumb__link" href="#">Subcategory</a></li>
 *       <li class="breadcrumb__item breadcrumb__ellipsis-item">
 *         <button class="breadcrumb__ellipsis" data-breadcrumb-expand aria-label="Show full path">&hellip;</button>
 *       </li>
 *       <li class="breadcrumb__item" aria-current="page"><span class="breadcrumb__link">Current Page</span></li>
 *     </ol>
 *   </nav>
 */

(function () {
  function init() {
    document.querySelectorAll("[data-breadcrumb-expand]").forEach((btn) => {
      btn.addEventListener("click", () => {
        const breadcrumb = btn.closest("[data-breadcrumb]");
        if (breadcrumb) {
          breadcrumb.classList.toggle("is-expanded");
        }
      });
    });
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }

  window.Breadcrumb = { init };
})();
