/**
 * Retro File Tree Component
 * Terminal-style file/directory tree browser with keyboard navigation.
 * EXCLUSIVE to retro-terminal profile.
 *
 * Usage:
 *   <div class="file-tree" data-file-tree>
 *     <div class="file-tree__header">...</div>
 *     <div class="file-tree__body">
 *       <ul class="file-tree__list">...</ul>
 *     </div>
 *     <div class="file-tree__status">...</div>
 *   </div>
 */

(function () {
  /**
   * Initialise a single file tree instance.
   * @param {HTMLElement} tree - The .file-tree root element
   */
  function init(tree) {
    var nodes = [];
    var focusedIndex = -1;

    /* ---- Gather all nodes in DOM order ---- */
    function collectNodes() {
      nodes = Array.from(tree.querySelectorAll(".file-tree__node"));
    }

    /* ---- Focus helpers ---- */
    function setFocused(index) {
      if (index < 0 || index >= nodes.length) return;

      // Clear previous
      if (focusedIndex >= 0 && focusedIndex < nodes.length) {
        nodes[focusedIndex].classList.remove("file-tree__node--focused");
      }

      focusedIndex = index;
      nodes[focusedIndex].classList.add("file-tree__node--focused");

      // Scroll into view
      var label = nodes[focusedIndex].querySelector(".file-tree__label");
      if (label) {
        label.scrollIntoView({ block: "nearest", behavior: "smooth" });
      }
    }

    /* ---- Selection ---- */
    function selectNode(node) {
      // Clear all selected
      tree.querySelectorAll(".file-tree__node--selected").forEach(function (n) {
        n.classList.remove("file-tree__node--selected");
      });

      node.classList.add("file-tree__node--selected");

      // Dispatch custom event
      var name = node.getAttribute("data-name") || "";
      var path = node.getAttribute("data-path") || "";
      var type = node.classList.contains("file-tree__folder") ? "folder" : "file";

      tree.dispatchEvent(
        new CustomEvent("filetree:select", {
          bubbles: true,
          detail: { path: path, type: type, name: name },
        })
      );
    }

    /* ---- Toggle folder expand/collapse ---- */
    function toggleFolder(node) {
      if (!node.classList.contains("file-tree__folder")) return;

      var isCollapsed = node.classList.contains("file-tree__folder--collapsed");
      node.classList.toggle("file-tree__folder--collapsed");

      // Update toggle indicator text
      var toggle = node.querySelector(":scope > .file-tree__label .file-tree__toggle");
      if (toggle) {
        toggle.textContent = isCollapsed ? "[-]" : "[+]";
      }

      // Recollect because visibility changed
      collectVisibleNodes();
    }

    /* ---- Collect only visible (non-hidden) nodes ---- */
    function collectVisibleNodes() {
      collectNodes();
      nodes = nodes.filter(function (n) {
        // Check if any ancestor folder is collapsed
        var parent = n.parentElement;
        while (parent && parent !== tree) {
          // If parent is a .file-tree__children inside a collapsed folder, node is hidden
          if (
            parent.classList.contains("file-tree__children") &&
            parent.parentElement &&
            parent.parentElement.classList.contains("file-tree__folder--collapsed")
          ) {
            return false;
          }
          parent = parent.parentElement;
        }
        return true;
      });

      // Adjust focused index if it's out of bounds
      if (focusedIndex >= nodes.length) {
        focusedIndex = nodes.length - 1;
      }
    }

    /* ---- Click handler ---- */
    tree.addEventListener("click", function (e) {
      var label = e.target.closest(".file-tree__label");
      if (!label) return;

      var node = label.closest(".file-tree__node");
      if (!node) return;

      // If folder, toggle it
      if (node.classList.contains("file-tree__folder")) {
        toggleFolder(node);
      }

      // Select and focus
      selectNode(node);
      var idx = nodes.indexOf(node);
      if (idx >= 0) setFocused(idx);
    });

    /* ---- Keyboard navigation ---- */
    tree.setAttribute("tabindex", "0");

    tree.addEventListener("keydown", function (e) {
      if (nodes.length === 0) return;

      switch (e.key) {
        case "ArrowDown":
          e.preventDefault();
          setFocused(Math.min(focusedIndex + 1, nodes.length - 1));
          break;

        case "ArrowUp":
          e.preventDefault();
          setFocused(Math.max(focusedIndex - 1, 0));
          break;

        case "ArrowRight":
          e.preventDefault();
          if (focusedIndex >= 0) {
            var current = nodes[focusedIndex];
            if (
              current.classList.contains("file-tree__folder") &&
              current.classList.contains("file-tree__folder--collapsed")
            ) {
              toggleFolder(current);
              setFocused(focusedIndex); // re-set to update
            } else {
              // Move to next
              setFocused(Math.min(focusedIndex + 1, nodes.length - 1));
            }
          }
          break;

        case "ArrowLeft":
          e.preventDefault();
          if (focusedIndex >= 0) {
            var curr = nodes[focusedIndex];
            if (
              curr.classList.contains("file-tree__folder") &&
              !curr.classList.contains("file-tree__folder--collapsed")
            ) {
              toggleFolder(curr);
              setFocused(focusedIndex);
            } else {
              // Move to parent folder
              var parentChildren = curr.parentElement;
              if (parentChildren && parentChildren.classList.contains("file-tree__children")) {
                var parentNode = parentChildren.closest(".file-tree__node");
                if (parentNode) {
                  var pIdx = nodes.indexOf(parentNode);
                  if (pIdx >= 0) setFocused(pIdx);
                }
              }
            }
          }
          break;

        case "Enter":
          e.preventDefault();
          if (focusedIndex >= 0) {
            var n = nodes[focusedIndex];
            if (n.classList.contains("file-tree__folder")) {
              toggleFolder(n);
            }
            selectNode(n);
          }
          break;

        case " ":
          e.preventDefault();
          if (focusedIndex >= 0) {
            selectNode(nodes[focusedIndex]);
          }
          break;

        case "Home":
          e.preventDefault();
          setFocused(0);
          break;

        case "End":
          e.preventDefault();
          setFocused(nodes.length - 1);
          break;
      }
    });

    /* ---- Boot animation: items appear sequentially ---- */
    function bootAnimation() {
      var reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

      if (reducedMotion) {
        // Skip animation
        tree.classList.remove("file-tree--booting");
        collectVisibleNodes();
        if (nodes.length > 0) setFocused(0);
        return;
      }

      tree.classList.add("file-tree--booting");
      collectNodes(); // all nodes, including hidden

      var allNodes = Array.from(tree.querySelectorAll(".file-tree__node"));
      var delay = 35;

      allNodes.forEach(function (node, i) {
        setTimeout(function () {
          node.classList.add("file-tree__node--visible");

          // After last node, clean up and init
          if (i === allNodes.length - 1) {
            setTimeout(function () {
              tree.classList.remove("file-tree--booting");
              collectVisibleNodes();
              if (nodes.length > 0) setFocused(0);
            }, 80);
          }
        }, i * delay);
      });
    }

    /* ---- Status bar update ---- */
    function updateStatus() {
      var fileCount = tree.querySelectorAll(".file-tree__file").length;
      var folderCount = tree.querySelectorAll(".file-tree__folder").length;

      var totalSize = 0;
      tree.querySelectorAll(".file-tree__file [data-size]").forEach(function (el) {
        totalSize += parseInt(el.getAttribute("data-size"), 10) || 0;
      });

      var countEl = tree.querySelector("[data-status-count]");
      var sizeEl = tree.querySelector("[data-status-size]");

      if (countEl) {
        countEl.textContent = fileCount + " file(s), " + folderCount + " dir(s)";
      }
      if (sizeEl) {
        sizeEl.textContent = formatSize(totalSize);
      }
    }

    function formatSize(bytes) {
      if (bytes === 0) return "0 B";
      var units = ["B", "KB", "MB", "GB"];
      var i = 0;
      var size = bytes;
      while (size >= 1024 && i < units.length - 1) {
        size /= 1024;
        i++;
      }
      return size.toFixed(i === 0 ? 0 : 1) + " " + units[i];
    }

    /* ---- Init ---- */
    updateStatus();
    bootAnimation();
  }

  /**
   * Initialise all file trees on the page.
   */
  function initAll() {
    document.querySelectorAll("[data-file-tree]").forEach(init);
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", initAll);
  } else {
    initAll();
  }

  window.RetroFileTree = { init: init, initAll: initAll };
})();
