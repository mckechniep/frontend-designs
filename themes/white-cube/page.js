/* Dark Gallery — page interactions */
(function () {
  'use strict';

  /* --- Mobile menu --- */
  var menuBtn = document.querySelector('[data-menu-button]');
  var menuPanel = document.querySelector('[data-mobile-menu]');

  if (menuBtn && menuPanel) {
    menuBtn.addEventListener('click', function () {
      var expanded = menuBtn.getAttribute('aria-expanded') === 'true';
      menuBtn.setAttribute('aria-expanded', String(!expanded));
      menuPanel.hidden = expanded;
    });

    menuPanel.querySelectorAll('a').forEach(function (link) {
      link.addEventListener('click', function () {
        menuBtn.setAttribute('aria-expanded', 'false');
        menuPanel.hidden = true;
      });
    });
  }

  /* --- Toast --- */
  var toastEl = document.querySelector('[data-toast]');
  var toastTimer = 0;

  function showToast(msg) {
    if (!toastEl) return;
    if (msg) toastEl.textContent = msg;
    clearTimeout(toastTimer);
    toastEl.hidden = false;
    toastTimer = setTimeout(function () { toastEl.hidden = true; }, 2800);
  }

  /* --- Contact form --- */
  var form = document.querySelector('[data-contact-form]');
  if (form) {
    form.addEventListener('submit', function (e) {
      e.preventDefault();
      var valid = true;
      form.querySelectorAll('[required]').forEach(function (field) {
        var errorEl = form.querySelector('[data-error-for="' + field.name + '"]');
        if (!field.value.trim()) {
          valid = false;
          field.setAttribute('aria-invalid', 'true');
          if (errorEl) errorEl.hidden = false;
        } else {
          field.removeAttribute('aria-invalid');
          if (errorEl) errorEl.hidden = true;
        }
      });
      if (valid) showToast('Inquiry received.');
    });
  }

  /* --- Scroll reveal --- */
  if (!window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    var targets = document.querySelectorAll('.section');

    if ('IntersectionObserver' in window) {
      var observer = new IntersectionObserver(
        function (entries) {
          entries.forEach(function (entry) {
            if (entry.isIntersecting) {
              entry.target.classList.add('is-revealed');
              observer.unobserve(entry.target);
            }
          });
        },
        { threshold: 0.08, rootMargin: '0px 0px -40px 0px' }
      );

      targets.forEach(function (el) { observer.observe(el); });
    } else {
      targets.forEach(function (el) { el.classList.add('is-revealed'); });
    }
  }

  /* --- Year --- */
  var yearEl = document.querySelector('[data-year]');
  if (yearEl) yearEl.textContent = new Date().getFullYear();
})();
