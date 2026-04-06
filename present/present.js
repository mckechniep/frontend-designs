(function () {
  'use strict';

  // Note: innerHTML is used intentionally here. All content is generated from
  // the static THEMES array defined in this file — no user input is ever
  // interpolated. There is no XSS risk in this context.

  var THEMES = [
    {
      id: 'modern-saas',
      name: 'Modern SaaS',
      description: 'Premium warm narrative. Dark, confident, conversion-focused.',
      tags: ['dark', 'luxury', 'editorial'],
      palette: ['#e8a94a', '#63d5f0', '#f4efe6'],
      cardClass: 'card--saas',
      surfaces: {
        landing: '../themes/modern-saas/index.html',
        dashboard: '../themes/modern-saas/dashboard/index.html',
        'app-screen': '../themes/modern-saas/app-screen/index.html',
      },
    },
    {
      id: 'cyberpunk-neon',
      name: 'Cyberpunk Neon',
      description: 'Neon-lit operator interface. Command-console energy.',
      tags: ['dark', 'technical', 'bold'],
      palette: ['#00fff0', '#ff2a6d', '#e0e0e0'],
      cardClass: 'card--cyber',
      surfaces: {
        landing: '../themes/cyberpunk-neon/index.html',
        dashboard: '../themes/cyberpunk-neon/dashboard/index.html',
        'app-screen': '../themes/cyberpunk-neon/app-screen/index.html',
      },
    },
    {
      id: 'arctic-mono',
      name: 'Arctic Mono',
      description: 'Frost-tech research archive. Calm, precise, editorial.',
      tags: ['light', 'editorial', 'technical'],
      palette: ['#2563eb', '#7ec8e3', '#1a1a2e'],
      cardClass: 'card--arctic',
      surfaces: {
        landing: '../themes/arctic-mono/index.html',
        dashboard: '../themes/arctic-mono/dashboard/index.html',
        'app-screen': '../themes/arctic-mono/app-screen/index.html',
      },
    },
    {
      id: 'noire-editorial',
      name: 'Noire Editorial',
      description: 'Near-black dossier page. Classified, luxury, editorial.',
      tags: ['dark', 'luxury', 'editorial'],
      palette: ['#c9a84c', '#8b7a3e', '#e0dcd0'],
      cardClass: 'card--noire',
      surfaces: {
        landing: '../themes/noire-editorial/index.html',
        dashboard: '../themes/noire-editorial/dashboard/index.html',
        'app-screen': '../themes/noire-editorial/app-screen/index.html',
      },
    },
    {
      id: 'corporate-blueprint',
      name: 'Corporate Blueprint',
      description: 'Architectural consultancy. Drafting-grid discipline, enterprise.',
      tags: ['dark', 'technical', 'luxury'],
      palette: ['#3ec6e0', '#1a5276', '#e0e0e0'],
      cardClass: 'card--blueprint',
      surfaces: {
        landing: '../themes/corporate-blueprint/index.html',
        dashboard: '../themes/corporate-blueprint/dashboard/index.html',
        'app-screen': '../themes/corporate-blueprint/app-screen/index.html',
      },
    },
    {
      id: 'retro-terminal',
      name: 'Retro Terminal',
      description: 'CRT-green cyber defense console. Boot sequence, terminal-native.',
      tags: ['dark', 'technical', 'bold'],
      palette: ['#33ff33', '#1a3a1a', '#e0e0e0'],
      cardClass: 'card--retro',
      surfaces: {
        landing: '../themes/retro-terminal/index.html',
        dashboard: '../themes/retro-terminal/dashboard/index.html',
        'app-screen': '../themes/retro-terminal/app-screen/index.html',
      },
    },
    {
      id: 'pastel-dreamscape',
      name: 'Pastel Dreamscape',
      description: 'Luminous editorial collage. Floating forms, soft atmosphere.',
      tags: ['light', 'playful', 'editorial'],
      palette: ['#f08db8', '#a8d8ea', '#fce4ec'],
      cardClass: 'card--pastel',
      surfaces: {
        landing: '../themes/pastel-dreamscape/index.html',
        dashboard: '../themes/pastel-dreamscape/dashboard/index.html',
        'app-screen': '../themes/pastel-dreamscape/app-screen/index.html',
      },
    },
    {
      id: 'sunset-gradient',
      name: 'Sunset Gradient',
      description: 'Cinematic warm poster page. Glowing horizon, enterprise showcase.',
      tags: ['dark', 'luxury', 'bold'],
      palette: ['#f48b41', '#e0533a', '#fcd9b6'],
      cardClass: 'card--sunset',
      surfaces: {
        landing: '../themes/sunset-gradient/index.html',
        dashboard: '../themes/sunset-gradient/dashboard/index.html',
        'app-screen': '../themes/sunset-gradient/app-screen/index.html',
      },
    },
  ];

  function canvasMarkup(id) {
    if (id === 'arctic-mono') {
      return (
        '<div class="present-card__canvas" data-arctic-preview>' +
          '<span></span><span></span><span></span>' +
          '<canvas class="arctic-preview-helix" aria-hidden="true"></canvas>' +
        '</div>'
      );
    }
    if (id === 'corporate-blueprint') {
      return (
        '<div class="present-card__canvas" data-blueprint-preview>' +
          '<span></span><span></span><span></span>' +
          '<div class="blueprint-preview-cursor" aria-hidden="true">' +
            '<span class="blueprint-preview-cursor__ring"></span>' +
            '<span class="blueprint-preview-cursor__h"></span>' +
            '<span class="blueprint-preview-cursor__v"></span>' +
            '<span class="blueprint-preview-cursor__coord">000,000</span>' +
          '</div>' +
        '</div>'
      );
    }
    return '<div class="present-card__canvas"><span></span><span></span><span></span></div>';
  }

  function renderCard(theme) {
    var paletteSwatches = theme.palette
      .map(function (color) {
        return '<span class="present-card__swatch" style="background:' + color + '"></span>';
      })
      .join('');

    var tags = theme.tags
      .map(function (tag) {
        return '<span class="present-card__tag">' + tag + '</span>';
      })
      .join('');

    var surfaceLinks = Object.entries(theme.surfaces)
      .map(function (entry) {
        var name = entry[0];
        var url = entry[1];
        var label = name === 'app-screen' ? 'App' : name.charAt(0).toUpperCase() + name.slice(1);
        return '<a href="' + url + '" class="present-card__surface-link">' + label + '</a>';
      })
      .join('');

    return (
      '<article class="present-card ' + theme.cardClass + '" data-tags="' + theme.tags.join(' ') + '">' +
        '<a href="' + theme.surfaces.landing + '" class="present-card__canvas-link">' +
          canvasMarkup(theme.id) +
        '</a>' +
        '<div class="present-card__info">' +
          '<h2 class="present-card__name">' + theme.name + '</h2>' +
          '<p class="present-card__desc">' + theme.description + '</p>' +
          '<div class="present-card__palette">' + paletteSwatches + '</div>' +
          '<div class="present-card__tags">' + tags + '</div>' +
          '<div class="present-card__surfaces">' + surfaceLinks + '</div>' +
        '</div>' +
      '</article>'
    );
  }

  function initGrid() {
    var grid = document.querySelector('[data-theme-grid]');
    if (!grid) return;
    grid.innerHTML = THEMES.map(renderCard).join(''); // safe: content is static, not user-supplied
  }

  function initArcticPreviewHelix() {
    var canvases = document.querySelectorAll('.arctic-preview-helix');
    if (!canvases.length) return;

    canvases.forEach(function (canvas) {
      if (canvas.dataset.arcticPreviewBound === 'true') return;

      var ctx = canvas.getContext('2d');
      if (!ctx) return;
      canvas.dataset.arcticPreviewBound = 'true';

      var reduceMotionQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
      var rafId = 0;
      var time = 0.85;

      function resize() {
        var rect = canvas.getBoundingClientRect();
        if (!rect.width || !rect.height) return false;

        var dpr = window.devicePixelRatio || 1;
        canvas.width = Math.floor(rect.width * dpr);
        canvas.height = Math.floor(rect.height * dpr);
        canvas.style.width = rect.width + 'px';
        canvas.style.height = rect.height + 'px';
        ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
        return true;
      }

      function drawFrame() {
        var rect = canvas.getBoundingClientRect();
        var width = rect.width;
        var height = rect.height;
        if (!width || !height) return;

        ctx.clearRect(0, 0, width, height);

        var cx = width / 2;
        var cy = height / 2;
        var radius = Math.min(width, height) * 0.2;
        var spread = Math.min(width, height) * 0.42;
        var points = 28;

        ctx.strokeStyle = 'rgba(126, 200, 227, 0.08)';
        ctx.lineWidth = 1;
        ctx.beginPath();
        ctx.moveTo(cx, cy - spread - 6);
        ctx.lineTo(cx, cy + spread + 6);
        ctx.stroke();

        for (var i = 0; i < points; i += 1) {
          var progress = (i / (points - 1)) * 2 - 1;
          var y = cy + progress * spread;
          var wave = progress * 5.4 + time;
          var x1 = cx + Math.cos(wave) * radius;
          var x2 = cx + Math.cos(wave + Math.PI) * radius;
          var z1 = Math.sin(wave);
          var z2 = Math.sin(wave + Math.PI);

          if (i % 2 === 0) {
            ctx.beginPath();
            ctx.moveTo(x1, y);
            ctx.lineTo(x2, y);
            ctx.strokeStyle = 'rgba(126, 200, 227, ' + (0.12 + (z1 + 1) * 0.08).toFixed(3) + ')';
            ctx.lineWidth = 1;
            ctx.stroke();
          }

          ctx.beginPath();
          ctx.arc(x1, y, 1.8 + (z1 + 1) * 1.1, 0, Math.PI * 2);
          ctx.fillStyle = 'rgba(126, 200, 227, ' + (0.3 + (z1 + 1) * 0.24).toFixed(3) + ')';
          ctx.fill();

          ctx.beginPath();
          ctx.arc(x2, y, 1.8 + (z2 + 1) * 1.1, 0, Math.PI * 2);
          ctx.fillStyle = 'rgba(163, 223, 240, ' + (0.28 + (z2 + 1) * 0.2).toFixed(3) + ')';
          ctx.fill();
        }
      }

      function stop() {
        if (!rafId) return;
        window.cancelAnimationFrame(rafId);
        rafId = 0;
      }

      function animate() {
        time += 0.03;
        drawFrame();
        rafId = window.requestAnimationFrame(animate);
      }

      function sync() {
        stop();
        if (!resize()) return;

        if (reduceMotionQuery.matches) {
          drawFrame();
          return;
        }

        animate();
      }

      window.addEventListener('resize', sync, { passive: true });
      if (typeof reduceMotionQuery.addEventListener === 'function') {
        reduceMotionQuery.addEventListener('change', sync);
      }

      sync();
    });
  }

  function initBlueprintPreviewCursor() {
    if (window.matchMedia('(pointer: coarse)').matches) return;

    var previews = document.querySelectorAll('[data-blueprint-preview]');
    if (!previews.length) return;

    previews.forEach(function (preview) {
      if (preview.dataset.blueprintPreviewBound === 'true') return;

      var cursor = preview.querySelector('.blueprint-preview-cursor');
      var coord = preview.querySelector('.blueprint-preview-cursor__coord');
      if (!cursor || !coord) return;
      preview.dataset.blueprintPreviewBound = 'true';

      var gridSize = 20;

      function updateCursor(event) {
        var rect = preview.getBoundingClientRect();
        var rawX = event.clientX - rect.left;
        var rawY = event.clientY - rect.top;

        function snap(value, limit) {
          var snapped = Math.round(value / gridSize) * gridSize;
          return Math.max(0, Math.min(Math.max(0, limit - 1), snapped));
        }

        var x = snap(rawX, rect.width);
        var y = snap(rawY, rect.height);
        var shiftX = x > rect.width - 88 ? -80 : 12;
        var shiftY = y < 32 ? 12 : -28;

        cursor.style.transform = 'translate(' + x + 'px, ' + y + 'px)';
        cursor.style.setProperty('--coord-shift-x', shiftX + 'px');
        cursor.style.setProperty('--coord-shift-y', shiftY + 'px');
        coord.textContent = String(Math.round(x)).padStart(3, '0') + ',' + String(Math.round(y)).padStart(3, '0');
      }

      preview.addEventListener('pointerenter', function (event) {
        cursor.classList.add('is-active');
        updateCursor(event);
      });

      preview.addEventListener('pointermove', updateCursor);

      preview.addEventListener('pointerleave', function () {
        cursor.classList.remove('is-active');
      });
    });
  }

  function initFilters() {
    var bar = document.querySelector('[data-filter-bar]');
    if (!bar) return;

    bar.addEventListener('click', function (e) {
      var btn = e.target.closest('.present-filter');
      if (!btn) return;

      bar.querySelectorAll('.present-filter').forEach(function (b) {
        b.classList.remove('is-active');
      });
      btn.classList.add('is-active');

      var filter = btn.dataset.filter;
      var cards = document.querySelectorAll('.present-card');

      cards.forEach(function (card) {
        var tags = card.dataset.tags || '';
        if (filter === 'all' || tags.indexOf(filter) !== -1) {
          card.classList.remove('is-hidden');
        } else {
          card.classList.add('is-hidden');
        }
      });
    });
  }

  initGrid();
  initArcticPreviewHelix();
  initBlueprintPreviewCursor();
  initFilters();
})();
