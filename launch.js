(function () {
  'use strict';

  const summaryRoot = document.querySelector('[data-coverage-summary]');
  const profileGrid = document.querySelector('[data-profile-grid]');
  const resolveSitePath =
    window.FramekitPaths && typeof window.FramekitPaths.resolveSitePath === 'function'
      ? window.FramekitPaths.resolveSitePath
      : function (path) {
          return path;
        };

  const profileCardClassMap = {
    'modern-saas': 'profile-card--modern-saas',
    'cyberpunk-neon': 'profile-card--cyberpunk-neon',
    'arctic-mono': 'profile-card--arctic-mono',
    'noire-editorial': 'profile-card--noire-editorial',
    'corporate-blueprint': 'profile-card--corporate-blueprint',
    'retro-terminal': 'profile-card--retro-terminal',
    'pastel-dreamscape': 'profile-card--pastel-dreamscape',
    'sunset-gradient': 'profile-card--sunset-gradient'
  };

  function surfaceLinkLabel(surfaceId) {
    return surfaceId === 'app-screen'
      ? 'App screen'
      : surfaceId.charAt(0).toUpperCase() + surfaceId.slice(1);
  }

  function renderProfilePreview(profileId) {
    return `
      <div class="profile-card__visual" aria-hidden="true">
        <span></span><span></span><span></span>
      </div>
    `;
  }

  function statusLabel(targets) {
    const statuses = Object.values(targets || {}).map((item) => item.status);
    const canonical = statuses.filter((status) => status === 'canonical').length;
    const preview = statuses.filter((status) => status === 'preview').length;
    return { canonical, preview };
  }

  function renderSummary(data) {
    if (!summaryRoot) return;

    let canonicalSurfaces = 0;
    let stackAnchors = 0;

    data.profiles.forEach((profile) => {
      Object.values(profile.surfaces).forEach((surface) => {
        if (surface.targets.vanilla && surface.targets.vanilla.status === 'canonical') {
          canonicalSurfaces += 1;
        }

        Object.values(surface.targets).forEach((target) => {
          if (target.status === 'canonical' && /templates\//.test(target.artifact || '')) {
            stackAnchors += 1;
          }
        });
      });
    });

    const items = [
      ['8', 'canonical profiles'],
      [String(canonicalSurfaces), 'live runtime surfaces'],
      [String(stackAnchors), 'stack-specific anchors']
    ];

    summaryRoot.innerHTML = items
      .map(
        ([value, label]) => `
          <article class="hero__stat">
            <span class="hero__stat-value">${value}</span>
            <span class="hero__stat-label">${label}</span>
          </article>
        `
      )
      .join('');
  }

  function renderProfiles(data) {
    if (!profileGrid) return;

    profileGrid.innerHTML = data.profiles
      .map((profile) => {
        const surfaceLinks = Object.entries(profile.surfaces)
          .map(
            ([surfaceId, surface]) =>
              `<a href="${resolveSitePath(surface.liveRuntime)}">${surfaceLinkLabel(surfaceId)}</a>`
          )
          .join('');

        const stackNotes = Object.values(profile.surfaces).reduce(
          (acc, surface) => {
            Object.entries(surface.targets).forEach(([targetId, target]) => {
              if (!acc[targetId]) acc[targetId] = { canonical: 0, preview: 0 };
              if (target.status === 'canonical') acc[targetId].canonical += 1;
              if (target.status === 'preview') acc[targetId].preview += 1;
            });
            return acc;
          },
          {}
        );

        const stackLine = Object.entries(stackNotes)
          .map(([targetId, info]) => `<span>${targetId}: ${info.canonical} canonical / ${info.preview} preview</span>`)
          .join('');

        const surfaceCount = Object.keys(profile.surfaces).length;
        const canonicalCount = Object.values(profile.surfaces).reduce((sum, surface) => {
          return sum + (surface.targets.vanilla.status === 'canonical' ? 1 : 0);
        }, 0);

        return `
          <article class="profile-card site-card ${profileCardClassMap[profile.id] || ''}">
            ${renderProfilePreview(profile.id)}
            <div class="profile-card__body">
              <div class="profile-card__top">
                <div>
                  <span class="profile-card__eyebrow">${profile.label}</span>
                  <h3>${profile.label}</h3>
                </div>
                <span class="profile-card__theme">${profile.defaultTheme}</span>
              </div>
              <p>${profile.descriptor}</p>
              <p class="profile-card__status">${canonicalCount}/${surfaceCount} live vanilla surfaces are canonical.</p>
              <div class="profile-card__stack-line">${stackLine}</div>
              <div class="profile-card__surface-links">${surfaceLinks}</div>
            </div>
          </article>
        `;
      })
      .join('');
  }

  fetch('./shared/surface-coverage.json')
    .then((response) => {
      if (!response.ok) throw new Error('coverage registry request failed');
      return response.json();
    })
    .then((data) => {
      renderSummary(data);
      renderProfiles(data);
    })
    .catch((error) => {
      if (summaryRoot) summaryRoot.textContent = 'Coverage registry unavailable.';
      if (profileGrid) profileGrid.textContent = `Unable to load profile matrix: ${error.message}`;
    });
})();
