/**
 * Sidebar Nav Component
 * Collapsible sidebar navigation with submenu sections.
 *
 * Usage:
 *   <aside class="sidebar" data-sidebar>
 *     <button class="sidebar__toggle" data-sidebar-toggle>...</button>
 *     <div data-sidebar-submenu>
 *       <button class="sidebar__item">Section...</button>
 *       <div class="sidebar__submenu">...children...</div>
 *     </div>
 *   </aside>
 *
 * Events:
 *   sidebar:navigate  { item, label }   — fired on the sidebar when a nav item is clicked
 *   sidebar:toggle    { collapsed }     — fired on the sidebar when collapse state changes
 */

(function () {
  function init(root) {
    const toggleBtn = root.querySelector("[data-sidebar-toggle]");
    const submenuSections = root.querySelectorAll("[data-sidebar-submenu]");

    /* ---- Collapse / Expand ---- */

    function isCollapsed() {
      return root.classList.contains("sidebar--collapsed");
    }

    function setCollapsed(collapsed) {
      root.classList.toggle("sidebar--collapsed", collapsed);

      /* Update toggle button title */
      if (toggleBtn) {
        toggleBtn.setAttribute(
          "aria-label",
          collapsed ? "Expand sidebar" : "Collapse sidebar"
        );
        toggleBtn.title = collapsed ? "Expand sidebar" : "Collapse sidebar";
      }

      /* Update item titles for tooltip in collapsed mode */
      root.querySelectorAll(".sidebar__item").forEach(function (item) {
        var labelEl = item.querySelector(".sidebar__item-label");
        if (!labelEl) return;
        if (collapsed) {
          item.title = labelEl.textContent.trim();
        } else {
          item.removeAttribute("title");
        }
      });

      root.dispatchEvent(
        new CustomEvent("sidebar:toggle", {
          bubbles: true,
          detail: { collapsed: collapsed },
        })
      );
    }

    if (toggleBtn) {
      toggleBtn.addEventListener("click", function () {
        setCollapsed(!isCollapsed());
      });
    }

    /* ---- Submenu expand / collapse ---- */

    submenuSections.forEach(function (section) {
      var trigger = section.querySelector(".sidebar__item");
      var submenu = section.querySelector(".sidebar__submenu");
      var chevron = trigger
        ? trigger.querySelector(".sidebar__submenu-toggle")
        : null;

      if (!trigger || !submenu) return;

      trigger.addEventListener("click", function (e) {
        e.preventDefault();

        /* Don't toggle submenus when sidebar is collapsed */
        if (isCollapsed()) return;

        var isOpen = submenu.classList.contains("sidebar__submenu--open");
        submenu.classList.toggle("sidebar__submenu--open", !isOpen);

        if (chevron) {
          chevron.classList.toggle("sidebar__submenu-toggle--open", !isOpen);
        }

        trigger.setAttribute("aria-expanded", String(!isOpen));
      });
    });

    /* ---- Nav item clicks ---- */

    root.addEventListener("click", function (e) {
      var item = e.target.closest(".sidebar__item");
      if (!item) return;

      /* Skip submenu parent triggers — they handle their own click */
      var parentSubmenu = item.closest("[data-sidebar-submenu]");
      if (
        parentSubmenu &&
        item === parentSubmenu.querySelector(".sidebar__item") &&
        parentSubmenu.querySelector(".sidebar__submenu")
      ) {
        return;
      }

      /* Set active state */
      root
        .querySelectorAll(".sidebar__item--active")
        .forEach(function (el) {
          el.classList.remove("sidebar__item--active");
        });
      item.classList.add("sidebar__item--active");

      var labelEl = item.querySelector(".sidebar__item-label");
      var label = labelEl
        ? labelEl.textContent.trim()
        : item.textContent.trim();

      root.dispatchEvent(
        new CustomEvent("sidebar:navigate", {
          bubbles: true,
          detail: { item: item, label: label },
        })
      );
    });
  }

  function initAll() {
    document.querySelectorAll("[data-sidebar]").forEach(init);
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", initAll);
  } else {
    initAll();
  }

  window.SidebarNav = { init: init, initAll: initAll };
})();
