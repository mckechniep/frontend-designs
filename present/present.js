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
          '<div class="present-card__canvas"><span></span><span></span><span></span></div>' +
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
  initFilters();
})();
