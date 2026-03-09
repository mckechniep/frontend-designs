/**
 * Card Variants Component
 * Minimal JS — handles optional sparkline rendering for stat cards.
 *
 * Usage:
 *   <div class="card-stat">
 *     ...
 *     <div class="card-stat__sparkline" data-sparkline="20,35,28,45,60,52,70,65,80,75"></div>
 *   </div>
 */

(function () {
  function drawSparkline(el) {
    const raw = el.dataset.sparkline;
    if (!raw) return;

    const values = raw.split(",").map(Number);
    if (values.length < 2) return;

    const w = 200;
    const h = 32;
    const min = Math.min(...values);
    const max = Math.max(...values);
    const range = max - min || 1;

    const points = values.map((v, i) => {
      const x = (i / (values.length - 1)) * w;
      const y = h - ((v - min) / range) * (h - 4) - 2;
      return `${x},${y}`;
    });

    const accentColor = getComputedStyle(document.documentElement).getPropertyValue("--accent").trim() || "#2563eb";

    el.innerHTML = `
      <svg viewBox="0 0 ${w} ${h}" preserveAspectRatio="none" fill="none">
        <defs>
          <linearGradient id="spark-fill-${el.id || Math.random().toString(36).slice(2)}" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stop-color="${accentColor}" stop-opacity="0.2"/>
            <stop offset="100%" stop-color="${accentColor}" stop-opacity="0"/>
          </linearGradient>
        </defs>
        <polyline
          points="${points.join(" ")}"
          stroke="${accentColor}"
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round"
          vector-effect="non-scaling-stroke"
        />
        <polygon
          points="0,${h} ${points.join(" ")} ${w},${h}"
          fill="url(#spark-fill-${el.id || ""})"
        />
      </svg>
    `;
  }

  function init() {
    document.querySelectorAll("[data-sparkline]").forEach(drawSparkline);
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }

  window.CardVariants = { init, drawSparkline };
})();
