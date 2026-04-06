/* Clean Professional — page interactions */
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
  var toastBtn = document.querySelector('[data-toast-button]');
  var toastEl = document.querySelector('[data-toast]');

  if (toastBtn && toastEl) {
    var toastTimer = 0;
    toastBtn.addEventListener('click', function () {
      clearTimeout(toastTimer);
      toastEl.hidden = false;
      toastTimer = setTimeout(function () {
        toastEl.hidden = true;
      }, 2800);
    });
  }

  /* --- Pricing toggle --- */
  var billingBtns = document.querySelectorAll('[data-billing]');
  var priceEls = document.querySelectorAll('[data-price-value]');

  billingBtns.forEach(function (btn) {
    btn.addEventListener('click', function () {
      var period = btn.dataset.billing;

      billingBtns.forEach(function (b) {
        var isActive = b === btn;
        b.classList.toggle('pricing-toggle__option--active', isActive);
        b.setAttribute('aria-checked', String(isActive));
      });

      priceEls.forEach(function (el) {
        var wrap = el.closest('[data-price-monthly]');
        if (!wrap) return;
        var monthly = wrap.dataset.priceMonthly;
        var annual = wrap.dataset.priceAnnual;
        if (monthly === '0' && annual === '0') return;
        el.textContent = period === 'annual'
          ? Number(annual).toLocaleString()
          : Number(monthly).toLocaleString();
      });
    });
  });

  /* --- Contact form validation --- */
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

      if (valid && toastEl) {
        toastEl.textContent = 'Inquiry received.';
        toastEl.hidden = false;
        clearTimeout(toastTimer);
        toastTimer = setTimeout(function () {
          toastEl.hidden = true;
        }, 2800);
      }
    });
  }

  /* --- Scroll reveal --- */
  if (!window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    var targets = document.querySelectorAll('.section, .trust-bar');

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
        { threshold: 0.12, rootMargin: '0px 0px -40px 0px' }
      );

      targets.forEach(function (el) { observer.observe(el); });
    } else {
      targets.forEach(function (el) { el.classList.add('is-revealed'); });
    }
  }

  /* --- Year --- */
  var yearEl = document.querySelector('[data-year]');
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  /* --- Preview stage animation --- */
  var stage = document.querySelector('[data-preview-stage]');
  if (stage) {
    var bars = [];
    for (var i = 0; i < 4; i++) {
      var bar = document.createElement('div');
      bar.style.cssText =
        'position:absolute;bottom:12px;width:' + (14 + Math.random() * 8) + 'px;' +
        'left:' + (16 + i * 24) + '%;height:0;' +
        'background:' + (i % 2 === 0 ? 'var(--accent)' : 'var(--surface-3)') + ';' +
        'border-radius:3px 3px 0 0;opacity:0.5;' +
        'transition:height 600ms ease;';
      stage.appendChild(bar);
      bars.push(bar);
    }

    function animateBars() {
      bars.forEach(function (b) {
        b.style.height = (20 + Math.random() * 50) + 'px';
      });
    }

    animateBars();
    setInterval(animateBars, 2400);
  }
})();
