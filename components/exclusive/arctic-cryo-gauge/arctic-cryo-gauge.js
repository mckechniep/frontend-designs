/**
 * Arctic Cryo Gauge — EXCLUSIVE: arctic-mono
 * Scientific gauge components with cryogenic monitoring aesthetic.
 *
 * Usage:
 *   <div class="cryo-gauge cryo-gauge--circular"
 *        data-cryo-gauge
 *        data-value="73" data-min="0" data-max="100"
 *        data-unit="%" data-label="CPU Load">
 *   </div>
 *
 * API: window.CryoGauge = { init, initAll, setValue }
 */

(function () {
  "use strict";

  /* ---- Threshold helpers ---- */

  function getPercent(value, min, max) {
    if (max === min) return 0;
    return ((value - min) / (max - min)) * 100;
  }

  function getStatus(percent) {
    if (percent >= 85) return "critical";
    if (percent >= 60) return "warning";
    return "safe";
  }

  /* ---- SVG helpers ---- */

  function polarToCart(cx, cy, r, deg) {
    var rad = ((deg - 90) * Math.PI) / 180;
    return { x: cx + r * Math.cos(rad), y: cy + r * Math.sin(rad) };
  }

  function describeArc(cx, cy, r, startAngle, endAngle) {
    var s = polarToCart(cx, cy, r, startAngle);
    var e = polarToCart(cx, cy, r, endAngle);
    var large = endAngle - startAngle > 180 ? 1 : 0;
    return "M " + s.x + " " + s.y + " A " + r + " " + r + " 0 " + large + " 1 " + e.x + " " + e.y;
  }

  /* ---- Circular gauge builder ---- */

  function buildCircular(el, cfg) {
    var size = 160;
    var cx = size / 2;
    var cy = size / 2;
    var r = 64;
    var startAngle = -225;
    var endAngle = 45;
    var totalArc = endAngle - startAngle; // 270 degrees

    // Build tick marks
    var ticks = "";
    var tickCount = 27;
    for (var i = 0; i <= tickCount; i++) {
      var angle = startAngle + (totalArc / tickCount) * i;
      var isMajor = i % 3 === 0;
      var innerR = isMajor ? r - 12 : r - 7;
      var outerR = r - 2;
      var p1 = polarToCart(cx, cy, innerR, angle);
      var p2 = polarToCart(cx, cy, outerR, angle);
      ticks +=
        '<line class="cryo-gauge__tick" x1="' + p1.x + '" y1="' + p1.y +
        '" x2="' + p2.x + '" y2="' + p2.y + '"/>';
    }

    var trackPath = describeArc(cx, cy, r, startAngle, endAngle);
    var circumference = (totalArc / 360) * 2 * Math.PI * r;

    el.innerHTML =
      '<div class="cryo-gauge__svg-wrap">' +
        '<svg class="cryo-gauge__svg" viewBox="0 0 ' + size + ' ' + size + '">' +
          ticks +
          '<path class="cryo-gauge__track" d="' + trackPath + '"/>' +
          '<path class="cryo-gauge__fill" d="' + trackPath + '" ' +
            'stroke-dasharray="' + circumference + '" ' +
            'stroke-dashoffset="' + circumference + '"/>' +
        '</svg>' +
        '<div class="cryo-gauge__center">' +
          '<span class="cryo-gauge__value">0</span>' +
          '<span class="cryo-gauge__unit">' + cfg.unit + '</span>' +
        '</div>' +
      '</div>' +
      '<span class="cryo-gauge__label">' + cfg.label + '</span>';

    el._circumference = circumference;
    el._fillPath = el.querySelector(".cryo-gauge__fill");
    el._valueEl = el.querySelector(".cryo-gauge__value");
  }

  /* ---- Linear gauge builder ---- */

  function buildLinear(el, cfg) {
    var tickCount = 10;
    var ticksHTML = "";
    for (var i = 0; i < tickCount; i++) {
      ticksHTML += '<div class="cryo-gauge__bar-tick"></div>';
    }

    el.innerHTML =
      '<div class="cryo-gauge__header">' +
        '<div>' +
          '<span class="cryo-gauge__label">' + cfg.label + '</span>' +
        '</div>' +
        '<div>' +
          '<span class="cryo-gauge__value">0</span>' +
          '<span class="cryo-gauge__unit">' + cfg.unit + '</span>' +
        '</div>' +
      '</div>' +
      '<div class="cryo-gauge__bar-wrap">' +
        '<div class="cryo-gauge__bar-fill" style="width:0%"></div>' +
        '<div class="cryo-gauge__bar-ticks">' + ticksHTML + '</div>' +
      '</div>' +
      '<div class="cryo-gauge__range">' +
        '<span>' + cfg.min + '</span>' +
        '<span>' + cfg.max + '</span>' +
      '</div>';

    el._barFill = el.querySelector(".cryo-gauge__bar-fill");
    el._valueEl = el.querySelector(".cryo-gauge__value");
  }

  /* ---- Temperature gauge builder ---- */

  function buildTemp(el, cfg) {
    var markCount = 5;
    var marksHTML = "";
    for (var i = 0; i <= markCount; i++) {
      var val = cfg.max - ((cfg.max - cfg.min) / markCount) * i;
      marksHTML += '<span class="cryo-gauge__thermo-mark">' + Math.round(val) + cfg.unit + '</span>';
    }

    el.innerHTML =
      '<span class="cryo-gauge__label">' + cfg.label + '</span>' +
      '<div class="cryo-gauge__thermo-wrap">' +
        '<div class="cryo-gauge__thermo">' +
          '<div class="cryo-gauge__thermo-tube">' +
            '<div class="cryo-gauge__thermo-mercury" style="height:0%"></div>' +
          '</div>' +
          '<div class="cryo-gauge__thermo-bulb"></div>' +
        '</div>' +
        '<div class="cryo-gauge__thermo-scale">' +
          marksHTML +
        '</div>' +
      '</div>' +
      '<div>' +
        '<span class="cryo-gauge__value">0</span>' +
        '<span class="cryo-gauge__unit">' + cfg.unit + '</span>' +
      '</div>';

    el._mercury = el.querySelector(".cryo-gauge__thermo-mercury");
    el._bulb = el.querySelector(".cryo-gauge__thermo-bulb");
    el._valueEl = el.querySelector(".cryo-gauge__value");
  }

  /* ---- Animate value ---- */

  function animateValue(el, from, to, cfg, duration) {
    var start = null;
    duration = duration || 800;

    function step(ts) {
      if (!start) start = ts;
      var progress = Math.min((ts - start) / duration, 1);
      // ease out cubic
      var ease = 1 - Math.pow(1 - progress, 3);
      var current = from + (to - from) * ease;
      applyValue(el, current, cfg);
      if (progress < 1) {
        requestAnimationFrame(step);
      }
    }

    requestAnimationFrame(step);
  }

  /* ---- Apply value (no animation) ---- */

  function applyValue(el, value, cfg) {
    var pct = getPercent(value, cfg.min, cfg.max);
    var status = getStatus(pct);
    var prevStatus = el.getAttribute("data-status");

    el.setAttribute("data-status", status);

    // Display value
    if (el._valueEl) {
      el._valueEl.textContent = Math.round(value);
    }

    // Circular
    if (el.classList.contains("cryo-gauge--circular") && el._circumference != null) {
      var offset = el._circumference * (1 - pct / 100);
      el._fillPath.style.strokeDashoffset = offset;
    }

    // Linear
    if (el.classList.contains("cryo-gauge--linear") && el._barFill) {
      el._barFill.style.width = pct + "%";
    }

    // Temperature
    if (el.classList.contains("cryo-gauge--temp") && el._mercury) {
      el._mercury.style.height = pct + "%";
    }

    // Fire threshold event when zone changes
    if (prevStatus && prevStatus !== status) {
      el.dispatchEvent(
        new CustomEvent("cryogauge:threshold", {
          bubbles: true,
          detail: { value: value, percent: pct, status: status, previous: prevStatus }
        })
      );
    }
  }

  /* ---- Init a single gauge ---- */

  function init(el) {
    if (el._cryoInit) return;
    el._cryoInit = true;

    var cfg = {
      value: parseFloat(el.dataset.value) || 0,
      min: parseFloat(el.dataset.min) || 0,
      max: parseFloat(el.dataset.max) || 100,
      unit: el.dataset.unit || "%",
      label: el.dataset.label || ""
    };

    el._cfg = cfg;
    el.setAttribute("data-status", "safe");

    if (el.classList.contains("cryo-gauge--circular")) {
      buildCircular(el, cfg);
    } else if (el.classList.contains("cryo-gauge--linear")) {
      buildLinear(el, cfg);
    } else if (el.classList.contains("cryo-gauge--temp")) {
      buildTemp(el, cfg);
    }

    // Animate from 0 to target on load
    setTimeout(function () {
      animateValue(el, cfg.min, cfg.value, cfg, 1000);
    }, 100);
  }

  /* ---- Init all gauges ---- */

  function initAll() {
    document.querySelectorAll("[data-cryo-gauge]").forEach(init);
  }

  /* ---- Set value programmatically ---- */

  function setValue(el, value) {
    if (!el._cfg) return;
    var current = parseFloat(el._valueEl.textContent) || el._cfg.min;
    el._cfg.value = value;
    el.dataset.value = value;
    animateValue(el, current, value, el._cfg, 600);
  }

  /* ---- Auto-init ---- */

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", initAll);
  } else {
    initAll();
  }

  window.CryoGauge = { init: init, initAll: initAll, setValue: setValue };
})();
