/* ========== Command Palette ========== */
/* IIFE — exposes window.CommandPalette = { open, close, register } */

(function () {
  "use strict";

  let commands = [];
  let activeIndex = -1;
  let isOpen = false;

  /* ---- DOM ---- */
  const overlay = document.querySelector(".cmd-palette__overlay");
  const dialog = document.querySelector(".cmd-palette__dialog");
  const input = document.querySelector(".cmd-palette__input");
  const results = document.querySelector(".cmd-palette__results");

  /* ---- Public API ---- */

  function register(cmds) {
    if (!Array.isArray(cmds)) cmds = [cmds];
    cmds.forEach(function (cmd) {
      if (cmd && cmd.id && cmd.label) {
        // Avoid duplicates
        if (!commands.find(function (c) { return c.id === cmd.id; })) {
          commands.push(cmd);
        }
      }
    });
  }

  function open() {
    if (isOpen) return;
    isOpen = true;
    overlay.classList.add("cmd-palette__overlay--open");
    dialog.classList.add("cmd-palette__dialog--open");
    input.value = "";
    activeIndex = -1;
    render(commands);
    // Focus after transition frame
    requestAnimationFrame(function () { input.focus(); });
  }

  function close() {
    if (!isOpen) return;
    isOpen = false;
    overlay.classList.remove("cmd-palette__overlay--open");
    dialog.classList.remove("cmd-palette__dialog--open");
    activeIndex = -1;
  }

  /* ---- Filtering ---- */

  function filter(query) {
    if (!query) return commands;
    var q = query.toLowerCase();
    return commands.filter(function (cmd) {
      return cmd.label.toLowerCase().indexOf(q) !== -1 ||
        (cmd.group && cmd.group.toLowerCase().indexOf(q) !== -1);
    });
  }

  /* ---- Rendering ---- */

  function render(list) {
    results.innerHTML = "";

    if (list.length === 0) {
      var empty = document.createElement("div");
      empty.className = "cmd-palette__empty";
      empty.textContent = "No results found";
      results.appendChild(empty);
      return;
    }

    // Group commands
    var groups = {};
    var groupOrder = [];
    list.forEach(function (cmd) {
      var g = cmd.group || "Commands";
      if (!groups[g]) {
        groups[g] = [];
        groupOrder.push(g);
      }
      groups[g].push(cmd);
    });

    var flatIndex = 0;
    groupOrder.forEach(function (groupName) {
      var section = document.createElement("div");
      section.className = "cmd-palette__group";

      var label = document.createElement("div");
      label.className = "cmd-palette__group-label";
      label.textContent = groupName;
      section.appendChild(label);

      groups[groupName].forEach(function (cmd) {
        var btn = document.createElement("button");
        btn.className = "cmd-palette__item";
        btn.dataset.index = flatIndex;
        btn.type = "button";

        // Icon
        if (cmd.icon) {
          var iconSpan = document.createElement("span");
          iconSpan.className = "cmd-palette__item-icon";
          iconSpan.setAttribute("aria-hidden", "true");
          iconSpan.innerHTML = cmd.icon;
          btn.appendChild(iconSpan);
        }

        // Label
        var labelSpan = document.createElement("span");
        labelSpan.className = "cmd-palette__item-label";
        labelSpan.textContent = cmd.label;
        btn.appendChild(labelSpan);

        // Description
        if (cmd.description) {
          var descSpan = document.createElement("span");
          descSpan.className = "cmd-palette__item-desc";
          descSpan.textContent = cmd.description;
          btn.appendChild(descSpan);
        }

        // Hint
        if (cmd.hint) {
          var hintSpan = document.createElement("span");
          hintSpan.className = "cmd-palette__item-hint";
          hintSpan.textContent = cmd.hint;
          btn.appendChild(hintSpan);
        }

        btn.addEventListener("click", function () {
          executeCommand(cmd);
        });

        section.appendChild(btn);
        flatIndex++;
      });

      results.appendChild(section);
    });

    updateActive();
  }

  /* ---- Navigation ---- */

  function getAllItems() {
    return results.querySelectorAll(".cmd-palette__item");
  }

  function updateActive() {
    var items = getAllItems();
    items.forEach(function (item, i) {
      item.dataset.active = i === activeIndex ? "true" : "false";
    });
    // Scroll active into view
    if (activeIndex >= 0 && items[activeIndex]) {
      items[activeIndex].scrollIntoView({ block: "nearest" });
    }
  }

  function moveActive(delta) {
    var items = getAllItems();
    if (items.length === 0) return;
    activeIndex += delta;
    if (activeIndex < 0) activeIndex = items.length - 1;
    if (activeIndex >= items.length) activeIndex = 0;
    updateActive();
  }

  /* ---- Execution ---- */

  function executeCommand(cmd) {
    close();
    if (typeof cmd.action === "function") {
      cmd.action();
    }
    document.dispatchEvent(new CustomEvent("cmdpalette:execute", {
      detail: { id: cmd.id, label: cmd.label }
    }));
  }

  /* ---- Events ---- */

  // Input filtering
  input.addEventListener("input", function () {
    var list = filter(input.value);
    activeIndex = -1;
    render(list);
  });

  // Keyboard inside dialog
  dialog.addEventListener("keydown", function (e) {
    if (e.key === "ArrowDown") {
      e.preventDefault();
      moveActive(1);
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      moveActive(-1);
    } else if (e.key === "Enter") {
      e.preventDefault();
      var items = getAllItems();
      if (activeIndex >= 0 && items[activeIndex]) {
        var idx = parseInt(items[activeIndex].dataset.index, 10);
        var list = filter(input.value);
        if (list[idx]) executeCommand(list[idx]);
      }
    } else if (e.key === "Escape") {
      e.preventDefault();
      close();
    }
  });

  // Click overlay to close
  overlay.addEventListener("click", close);

  // Global keyboard shortcut: Ctrl+K / Cmd+K
  document.addEventListener("keydown", function (e) {
    if ((e.ctrlKey || e.metaKey) && e.key === "k") {
      e.preventDefault();
      if (isOpen) {
        close();
      } else {
        open();
      }
    }
  });

  /* ---- Expose ---- */
  window.CommandPalette = {
    open: open,
    close: close,
    register: register
  };
})();
