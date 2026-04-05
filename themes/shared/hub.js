(function () {
  'use strict';

  const resolveSitePath =
    window.FramekitPaths && typeof window.FramekitPaths.resolveSitePath === 'function'
      ? window.FramekitPaths.resolveSitePath
      : function (path) {
          return path;
        };

  const profileCardClassMap = {
    'modern-saas': 'card--saas',
    'cyberpunk-neon': 'card--cyber',
    'arctic-mono': 'card--arctic',
    'noire-editorial': 'card--noire',
    'corporate-blueprint': 'card--blueprint',
    'retro-terminal': 'card--retro',
    'pastel-dreamscape': 'card--pastel',
    'sunset-gradient': 'card--sunset'
  };

  function cardClassForProfile(profileId) {
    return profileCardClassMap[profileId] || 'card--saas';
  }

  function surfacePreviewMarkup(profileId) {
    const blueprintPreview = profileId === 'corporate-blueprint' ? ' data-blueprint-preview' : '';
    const arcticExtra =
      profileId === 'arctic-mono' ? '<canvas class="arctic-preview-helix" aria-hidden="true"></canvas>' : '';
    const blueprintExtra =
      profileId === 'corporate-blueprint'
        ? `
            <div class="blueprint-preview-cursor" aria-hidden="true">
              <span class="blueprint-preview-cursor__ring"></span>
              <span class="blueprint-preview-cursor__h"></span>
              <span class="blueprint-preview-cursor__v"></span>
              <span class="blueprint-preview-cursor__coord">000,000</span>
            </div>
          `
        : '';

    return `
      <div class="card__canvas"${blueprintPreview}>
        <span></span><span></span><span></span>
        ${arcticExtra}
        ${blueprintExtra}
      </div>
    `;
  }

  function initArcticPreviewHelix() {
    const canvases = document.querySelectorAll('.arctic-preview-helix');
    if (!canvases.length) return;

    canvases.forEach((canvas) => {
      if (canvas.dataset.arcticPreviewBound === 'true') return;

      const ctx = canvas.getContext('2d');
      if (!ctx) return;
      canvas.dataset.arcticPreviewBound = 'true';

      const reduceMotionQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
      let rafId = 0;
      let time = 0.85;

      function resize() {
        const rect = canvas.getBoundingClientRect();
        if (!rect.width || !rect.height) return false;

        const dpr = window.devicePixelRatio || 1;
        canvas.width = Math.floor(rect.width * dpr);
        canvas.height = Math.floor(rect.height * dpr);
        canvas.style.width = `${rect.width}px`;
        canvas.style.height = `${rect.height}px`;
        ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
        return true;
      }

      function drawFrame() {
        const rect = canvas.getBoundingClientRect();
        const width = rect.width;
        const height = rect.height;
        if (!width || !height) return;

        ctx.clearRect(0, 0, width, height);

        const cx = width / 2;
        const cy = height / 2;
        const radius = Math.min(width, height) * 0.2;
        const spread = Math.min(width, height) * 0.42;
        const points = 28;

        ctx.strokeStyle = 'rgba(126, 200, 227, 0.08)';
        ctx.lineWidth = 1;
        ctx.beginPath();
        ctx.moveTo(cx, cy - spread - 6);
        ctx.lineTo(cx, cy + spread + 6);
        ctx.stroke();

        for (let i = 0; i < points; i += 1) {
          const progress = (i / (points - 1)) * 2 - 1;
          const y = cy + progress * spread;
          const wave = progress * 5.4 + time;
          const x1 = cx + Math.cos(wave) * radius;
          const x2 = cx + Math.cos(wave + Math.PI) * radius;
          const z1 = Math.sin(wave);
          const z2 = Math.sin(wave + Math.PI);

          if (i % 2 === 0) {
            ctx.beginPath();
            ctx.moveTo(x1, y);
            ctx.lineTo(x2, y);
            ctx.strokeStyle = `rgba(126, 200, 227, ${(0.12 + (z1 + 1) * 0.08).toFixed(3)})`;
            ctx.lineWidth = 1;
            ctx.stroke();
          }

          ctx.beginPath();
          ctx.arc(x1, y, 1.8 + (z1 + 1) * 1.1, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(126, 200, 227, ${(0.3 + (z1 + 1) * 0.24).toFixed(3)})`;
          ctx.fill();

          ctx.beginPath();
          ctx.arc(x2, y, 1.8 + (z2 + 1) * 1.1, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(163, 223, 240, ${(0.28 + (z2 + 1) * 0.2).toFixed(3)})`;
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

    const previews = document.querySelectorAll('[data-blueprint-preview]');
    if (!previews.length) return;

    previews.forEach((preview) => {
      if (preview.dataset.blueprintPreviewBound === 'true') return;

      const cursor = preview.querySelector('.blueprint-preview-cursor');
      const coord = preview.querySelector('.blueprint-preview-cursor__coord');
      if (!cursor || !coord) return;
      preview.dataset.blueprintPreviewBound = 'true';

      const gridSize = 20;

      function updateCursor(event) {
        const rect = preview.getBoundingClientRect();
        const rawX = event.clientX - rect.left;
        const rawY = event.clientY - rect.top;

        const snap = (value, limit) => {
          const snapped = Math.round(value / gridSize) * gridSize;
          return Math.max(0, Math.min(Math.max(0, limit - 1), snapped));
        };

        const x = snap(rawX, rect.width);
        const y = snap(rawY, rect.height);
        const shiftX = x > rect.width - 88 ? -80 : 12;
        const shiftY = y < 32 ? 12 : -28;

        cursor.style.transform = `translate(${x}px, ${y}px)`;
        cursor.style.setProperty('--coord-shift-x', `${shiftX}px`);
        cursor.style.setProperty('--coord-shift-y', `${shiftY}px`);
        coord.textContent = `${String(Math.round(x)).padStart(3, '0')},${String(Math.round(y)).padStart(3, '0')}`;
      }

      preview.addEventListener('pointerenter', (event) => {
        cursor.classList.add('is-active');
        updateCursor(event);
      });

      preview.addEventListener('pointermove', updateCursor);

      preview.addEventListener('pointerleave', () => {
        cursor.classList.remove('is-active');
      });
    });
  }

  function initSurfaceDirectory() {
    const root = document.querySelector('[data-surface-directory]');
    if (!root) return;

    fetch('../shared/surface-coverage.json')
      .then((response) => {
        if (!response.ok) throw new Error('surface coverage request failed');
        return response.json();
      })
      .then((data) => {
        root.innerHTML = data.profiles
          .map((profile, index) => {
            const links = Object.entries(profile.surfaces)
              .map(([surfaceId, surface]) => {
                const label = surfaceId === 'app-screen' ? 'App screen' : surfaceId.charAt(0).toUpperCase() + surfaceId.slice(1);
                return `<a href="${resolveSitePath(surface.liveRuntime)}">${label}</a>`;
              })
              .join('');

            return `
              <article class="card vault-surface-card ${cardClassForProfile(profile.id)}" style="--delay: ${index}">
                ${surfacePreviewMarkup(profile.id)}
                <div class="card__body">
                  <div class="vault-surface-card__meta">
                    <span class="card__num">${String(index + 1).padStart(2, '0')}</span>
                    <span class="vault-surface-card__theme">${profile.defaultTheme}</span>
                  </div>
                  <div class="vault-surface-card__top">
                    <div>
                      <span class="vault-surface-card__eyebrow">Canonical surface family</span>
                      <h3 class="card__name">${profile.label}</h3>
                    </div>
                    <span class="vault-surface-card__count">${Object.keys(profile.surfaces).length} surfaces</span>
                  </div>
                  <p class="card__desc">${profile.descriptor}</p>
                  <div class="vault-surface-card__links">${links}</div>
                </div>
              </article>
            `;
          })
          .join('');

        initArcticPreviewHelix();
        initBlueprintPreviewCursor();
      })
      .catch((error) => {
        root.textContent = `Unable to load surface directory: ${error.message}`;
      });
  }

  initArcticPreviewHelix();
  initBlueprintPreviewCursor();
  initSurfaceDirectory();
})();
