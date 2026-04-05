(function () {
  'use strict';

  const resolveSitePath =
    window.FramekitPaths && typeof window.FramekitPaths.resolveSitePath === 'function'
      ? window.FramekitPaths.resolveSitePath
      : function (path) {
          return path;
        };

  const primaryItems = [
    { id: 'home', label: 'Home', href: '/index.html' },
    { id: 'themes', label: 'Themes', href: '/themes/index.html' },
    { id: 'components', label: 'Components', href: '/components/index.html' }
  ];

  function currentAttr(isCurrent) {
    return isCurrent ? ' aria-current="page"' : '';
  }

  function renderHeader(root) {
    const current = root.dataset.siteNavCurrent || '';

    const links = primaryItems
      .map((item) => {
        return `<a href="${resolveSitePath(item.href)}"${currentAttr(current === item.id)}>${item.label}</a>`;
      })
      .join('');

    root.classList.add('site-header');
    root.innerHTML = `
      <nav class="site-nav" aria-label="Primary">
        <a class="site-brand" href="${resolveSitePath('/index.html')}" aria-label="Framekit home">
          <span class="site-brand__dot" aria-hidden="true"></span>
          <span class="site-brand__text">Framekit</span>
        </a>
        <div class="site-nav__links">
          ${links}
          <a class="site-nav__cta" href="${resolveSitePath('/build/index.html')}"${currentAttr(current === 'build')}>Brief Builder</a>
        </div>
      </nav>
    `;
  }

  document.querySelectorAll('[data-site-nav]').forEach(renderHeader);
})();
