(function () {
  'use strict';

  const SCRIPT_SUFFIX = '/shared/site-paths.js';
  const currentScript = document.currentScript;

  function getScriptPathname() {
    if (!currentScript || !currentScript.src) return window.location.pathname;

    try {
      return new URL(currentScript.src, window.location.href).pathname;
    } catch (error) {
      return window.location.pathname;
    }
  }

  function isExternalPath(path) {
    return /^[a-zA-Z][a-zA-Z\d+.-]*:/.test(path) || path.startsWith('//');
  }

  const scriptPathname = getScriptPathname();
  const basePath = scriptPathname.endsWith(SCRIPT_SUFFIX)
    ? scriptPathname.slice(0, -SCRIPT_SUFFIX.length)
    : '';

  function resolveSitePath(path) {
    if (!path) return path;
    if (isExternalPath(path) || path.startsWith('#')) return path;
    if (path.startsWith('/')) return `${basePath}${path}` || path;
    return path;
  }

  window.FramekitPaths = {
    basePath,
    resolveSitePath
  };
})();
