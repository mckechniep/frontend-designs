/**
 * Retro Matrix Rain Component
 * Canvas-based Matrix digital rain with interactive terminal overlay.
 * EXCLUSIVE to retro-terminal profile.
 *
 * API:
 *   MatrixRain.init(container)  — set up canvas + start animation
 *   MatrixRain.start()          — resume animation
 *   MatrixRain.stop()           — pause animation
 *   MatrixRain.setSpeed(mult)   — adjust fall speed (0.5 – 5)
 *   MatrixRain.setDensity(cols) — adjust column count ("low"|"medium"|"high" or number)
 */

(function () {
  /* ---- Character set: half-width katakana, digits, symbols ---- */
  var KATAKANA = [];
  for (var k = 0xFF65; k <= 0xFF9F; k++) {
    KATAKANA.push(String.fromCharCode(k));
  }
  var DIGITS = "0123456789".split("");
  var SYMBOLS = "!@#$%^&*()-=+[]{}|;:<>?/~".split("");
  var CHARSET = KATAKANA.concat(DIGITS).concat(SYMBOLS);

  /* ---- State ---- */
  var instances = [];
  var activeInstance = null;

  /* ---- Color presets ---- */
  var COLOR_PRESETS = {
    green:  { head: "#ffffff", bright: "#66ff66", mid: "#33ff00", dim: "#0a6600", glow: "rgba(51,255,0,0.6)" },
    amber:  { head: "#ffffff", bright: "#ffcc44", mid: "#ffb000", dim: "#664400", glow: "rgba(255,176,0,0.6)" },
    blue:   { head: "#ffffff", bright: "#66ccff", mid: "#0099ff", dim: "#003366", glow: "rgba(0,153,255,0.6)" }
  };

  /**
   * Create a single rain instance for a container element.
   */
  function createInstance(container) {
    var canvas = container.querySelector(".matrix-rain__canvas");
    if (!canvas) return null;

    var ctx = canvas.getContext("2d");
    var animId = null;
    var running = false;
    var speedMultiplier = 1;
    var colorName = "green";
    var colors = COLOR_PRESETS.green;

    /* Column state */
    var columns = [];
    var fontSize = 16;
    var colCount = 0;

    /* ---- Resize handler ---- */
    function resize() {
      var rect = container.getBoundingClientRect();
      var dpr = window.devicePixelRatio || 1;
      canvas.width = rect.width * dpr;
      canvas.height = rect.height * dpr;
      canvas.style.width = rect.width + "px";
      canvas.style.height = rect.height + "px";
      ctx.scale(dpr, dpr);

      var newColCount = Math.floor(rect.width / fontSize);
      if (newColCount !== colCount) {
        rebuildColumns(newColCount, rect.height);
      }
    }

    function rebuildColumns(count, height) {
      colCount = count;
      var oldCols = columns;
      columns = [];
      for (var i = 0; i < colCount; i++) {
        if (oldCols[i]) {
          columns.push(oldCols[i]);
        } else {
          columns.push(createColumn(height));
        }
      }
      // Trim extras
      columns.length = colCount;
    }

    function createColumn(height) {
      var maxLen = Math.floor(height / fontSize);
      return {
        y: Math.random() * -maxLen * fontSize,
        speed: 1.5 + Math.random() * 3,
        length: 8 + Math.floor(Math.random() * 18),
        chars: generateChars(26),
        changeTimer: 0,
        changeInterval: 3 + Math.floor(Math.random() * 8)
      };
    }

    function generateChars(len) {
      var arr = [];
      for (var i = 0; i < len; i++) {
        arr.push(CHARSET[Math.floor(Math.random() * CHARSET.length)]);
      }
      return arr;
    }

    /* ---- Draw frame ---- */
    function draw() {
      var w = canvas.width / (window.devicePixelRatio || 1);
      var h = canvas.height / (window.devicePixelRatio || 1);

      // Fade effect — trail
      ctx.fillStyle = "rgba(10, 10, 8, 0.12)";
      ctx.fillRect(0, 0, w, h);

      ctx.font = fontSize + "px monospace";
      ctx.textAlign = "center";

      for (var i = 0; i < columns.length; i++) {
        var col = columns[i];

        // Update position
        col.y += col.speed * speedMultiplier;

        // Randomly mutate characters
        col.changeTimer++;
        if (col.changeTimer >= col.changeInterval) {
          col.changeTimer = 0;
          var ri = Math.floor(Math.random() * col.chars.length);
          col.chars[ri] = CHARSET[Math.floor(Math.random() * CHARSET.length)];
        }

        // Draw characters in column
        var x = i * fontSize + fontSize / 2;
        var headRow = Math.floor(col.y / fontSize);

        for (var j = 0; j < col.length; j++) {
          var row = headRow - j;
          var py = row * fontSize;

          if (py < -fontSize || py > h + fontSize) continue;

          var charIdx = (headRow - j) % col.chars.length;
          if (charIdx < 0) charIdx += col.chars.length;
          var ch = col.chars[charIdx];

          if (j === 0) {
            // Head character — brightest
            ctx.shadowBlur = 12;
            ctx.shadowColor = colors.glow;
            ctx.fillStyle = colors.head;
          } else if (j < 3) {
            ctx.shadowBlur = 8;
            ctx.shadowColor = colors.glow;
            ctx.fillStyle = colors.bright;
          } else if (j < col.length * 0.5) {
            ctx.shadowBlur = 4;
            ctx.shadowColor = colors.glow;
            ctx.fillStyle = colors.mid;
          } else {
            ctx.shadowBlur = 0;
            ctx.shadowColor = "transparent";
            // Fade progressively
            var fade = 1 - (j / col.length);
            ctx.globalAlpha = Math.max(fade, 0.1);
            ctx.fillStyle = colors.dim;
          }

          ctx.fillText(ch, x, py);
          ctx.globalAlpha = 1;
        }

        // Reset column when fully off-screen
        if ((headRow - col.length) * fontSize > h) {
          columns[i] = createColumn(h);
          columns[i].y = -Math.random() * h * 0.5;
        }
      }

      // Clear shadow state
      ctx.shadowBlur = 0;
      ctx.shadowColor = "transparent";
    }

    /* ---- Animation loop ---- */
    function loop() {
      if (!running) return;
      draw();
      animId = requestAnimationFrame(loop);
    }

    function start() {
      if (running) return;
      running = true;
      container.classList.remove("matrix-rain--static");
      loop();
    }

    function stop() {
      running = false;
      container.classList.add("matrix-rain--static");
      if (animId) {
        cancelAnimationFrame(animId);
        animId = null;
      }
    }

    function setSpeed(mult) {
      speedMultiplier = Math.max(0.2, Math.min(5, mult));
    }

    function setDensity(value) {
      var rect = container.getBoundingClientRect();
      var newSize;
      if (value === "low") {
        newSize = 24;
      } else if (value === "medium") {
        newSize = 16;
      } else if (value === "high") {
        newSize = 10;
      } else if (typeof value === "number") {
        // Direct column count => calculate font size
        newSize = Math.max(6, Math.floor(rect.width / value));
      } else {
        newSize = 16;
      }
      fontSize = newSize;
      resize();
    }

    function setColor(name) {
      if (COLOR_PRESETS[name]) {
        colorName = name;
        colors = COLOR_PRESETS[name];
      }
    }

    function getColorName() {
      return colorName;
    }

    /* ---- Draw static frame for reduced-motion ---- */
    function drawStatic() {
      var w = canvas.width / (window.devicePixelRatio || 1);
      var h = canvas.height / (window.devicePixelRatio || 1);

      ctx.fillStyle = "#0a0a08";
      ctx.fillRect(0, 0, w, h);
      ctx.font = fontSize + "px monospace";
      ctx.textAlign = "center";

      for (var i = 0; i < columns.length; i++) {
        var x = i * fontSize + fontSize / 2;
        var rows = Math.floor(h / fontSize);
        for (var r = 0; r < rows; r++) {
          if (Math.random() > 0.3) continue;
          var ch = CHARSET[Math.floor(Math.random() * CHARSET.length)];
          var alpha = 0.05 + Math.random() * 0.25;
          ctx.globalAlpha = alpha;
          ctx.fillStyle = colors.mid;
          ctx.fillText(ch, x, r * fontSize);
        }
      }
      ctx.globalAlpha = 1;
    }

    /* ---- Init ---- */
    resize();

    // Check for slow/dense variants
    if (container.classList.contains("matrix-rain--slow")) {
      speedMultiplier = 0.5;
    }
    if (container.classList.contains("matrix-rain--dense")) {
      fontSize = 10;
      resize();
    }

    // Reduced motion check
    var reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reducedMotion) {
      container.classList.add("matrix-rain--static");
      drawStatic();
    } else {
      start();
    }

    // Resize listener
    var resizeTimeout;
    window.addEventListener("resize", function () {
      clearTimeout(resizeTimeout);
      resizeTimeout = setTimeout(function () {
        resize();
        if (!running && reducedMotion) {
          drawStatic();
        }
      }, 100);
    });

    return {
      start: start,
      stop: stop,
      setSpeed: setSpeed,
      setDensity: setDensity,
      setColor: setColor,
      getColorName: getColorName,
      isRunning: function () { return running; },
      container: container
    };
  }

  /* ---- Terminal command handler ---- */
  function setupTerminal(container, instance) {
    var terminal = container.querySelector(".matrix-rain__terminal");
    if (!terminal) return;

    var input = terminal.querySelector(".matrix-rain__input");
    var output = terminal.querySelector(".matrix-rain__output");
    if (!input || !output) return;

    function appendLine(text, cls) {
      var line = document.createElement("div");
      line.className = "matrix-rain__output-line";
      if (cls) line.className += " matrix-rain__output-line--" + cls;
      line.textContent = text;
      output.appendChild(line);
      output.scrollTop = output.scrollHeight;
    }

    function clearOutput() {
      output.innerHTML = "";
    }

    var COMMANDS = {
      help: function () {
        appendLine("Available commands:", "amber");
        appendLine("  help              Show this help");
        appendLine("  speed [1-5]       Set rain speed");
        appendLine("  color [green|amber|blue]  Change color");
        appendLine("  density [low|medium|high] Column density");
        appendLine("  clear             Clear terminal");
        appendLine("  echo [text]       Echo text back");
        appendLine("  start             Start rain animation");
        appendLine("  stop              Stop rain animation");
        appendLine("  status            Show current settings");
      },
      speed: function (args) {
        var val = parseFloat(args[0]);
        if (isNaN(val) || val < 1 || val > 5) {
          appendLine("Usage: speed [1-5]", "error");
          return;
        }
        instance.setSpeed(val);
        appendLine("Speed set to " + val + "x", "accent");
      },
      color: function (args) {
        var c = (args[0] || "").toLowerCase();
        if (!COLOR_PRESETS[c]) {
          appendLine("Usage: color [green|amber|blue]", "error");
          return;
        }
        instance.setColor(c);
        appendLine("Color changed to " + c, "accent");
      },
      density: function (args) {
        var d = (args[0] || "").toLowerCase();
        if (d !== "low" && d !== "medium" && d !== "high") {
          appendLine("Usage: density [low|medium|high]", "error");
          return;
        }
        instance.setDensity(d);
        appendLine("Density set to " + d, "accent");
      },
      clear: function () {
        clearOutput();
      },
      echo: function (args) {
        appendLine(args.join(" "), "accent");
      },
      start: function () {
        instance.start();
        appendLine("Rain started", "accent");
      },
      stop: function () {
        instance.stop();
        appendLine("Rain stopped", "amber");
      },
      status: function () {
        appendLine("Status:", "amber");
        appendLine("  Running: " + (instance.isRunning() ? "YES" : "NO"));
        appendLine("  Color:   " + instance.getColorName());
      }
    };

    input.addEventListener("keydown", function (e) {
      if (e.key === "Enter") {
        e.preventDefault();
        var raw = input.value.trim();
        if (!raw) return;

        appendLine("> " + raw, "accent");
        input.value = "";

        var parts = raw.split(/\s+/);
        var cmd = parts[0].toLowerCase();
        var args = parts.slice(1);

        if (COMMANDS[cmd]) {
          COMMANDS[cmd](args);
        } else {
          appendLine('Unknown command: "' + cmd + '". Type "help" for commands.', "error");
        }
      }
    });

    // Show welcome message
    appendLine("MATRIX RAIN TERMINAL v1.0", "accent");
    appendLine('Type "help" for available commands.', "amber");
    appendLine("");
  }

  /* ---- Public init ---- */
  function init(container) {
    if (typeof container === "string") {
      container = document.querySelector(container);
    }
    if (!container) return null;

    var instance = createInstance(container);
    if (!instance) return null;

    instances.push(instance);
    activeInstance = instance;

    setupTerminal(container, instance);

    return instance;
  }

  function initAll() {
    document.querySelectorAll("[data-matrix-rain]").forEach(function (el) {
      init(el);
    });
  }

  /* ---- Global start/stop (operates on active/last instance) ---- */
  function start() {
    if (activeInstance) activeInstance.start();
  }

  function stop() {
    if (activeInstance) activeInstance.stop();
  }

  function setSpeed(mult) {
    if (activeInstance) activeInstance.setSpeed(mult);
  }

  function setDensity(value) {
    if (activeInstance) activeInstance.setDensity(value);
  }

  /* ---- Auto-init ---- */
  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", initAll);
  } else {
    initAll();
  }

  window.MatrixRain = {
    init: init,
    start: start,
    stop: stop,
    setSpeed: setSpeed,
    setDensity: setDensity
  };
})();
