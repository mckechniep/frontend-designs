/* ═══════════════════════════════════════════════════════════
   CORPORATE BLUEPRINT — Meridian & Kirsch
   Interactive behaviors: grid, cursor, scroll, counters
   ═══════════════════════════════════════════════════════════ */

(function () {
  'use strict';

  // ── Blueprint Grid Canvas ──
  function initBlueprintGrid() {
    const canvas = document.getElementById('blueprint-grid');
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let w, h;

    function resize() {
      w = canvas.width = window.innerWidth;
      h = canvas.height = window.innerHeight;
      draw();
    }

    function draw() {
      ctx.clearRect(0, 0, w, h);

      const gridSize = 80;
      const subGridSize = 20;

      // Sub-grid
      ctx.strokeStyle = 'rgba(62, 198, 224, 0.04)';
      ctx.lineWidth = 0.5;
      ctx.beginPath();
      for (let x = 0; x <= w; x += subGridSize) {
        ctx.moveTo(x, 0);
        ctx.lineTo(x, h);
      }
      for (let y = 0; y <= h; y += subGridSize) {
        ctx.moveTo(0, y);
        ctx.lineTo(w, y);
      }
      ctx.stroke();

      // Main grid
      ctx.strokeStyle = 'rgba(62, 198, 224, 0.08)';
      ctx.lineWidth = 0.5;
      ctx.beginPath();
      for (let x = 0; x <= w; x += gridSize) {
        ctx.moveTo(x, 0);
        ctx.lineTo(x, h);
      }
      for (let y = 0; y <= h; y += gridSize) {
        ctx.moveTo(0, y);
        ctx.lineTo(w, y);
      }
      ctx.stroke();

      // Grid intersection markers
      ctx.fillStyle = 'rgba(62, 198, 224, 0.12)';
      for (let x = 0; x <= w; x += gridSize) {
        for (let y = 0; y <= h; y += gridSize) {
          ctx.beginPath();
          // Small cross at intersections
          ctx.moveTo(x - 3, y);
          ctx.lineTo(x + 3, y);
          ctx.moveTo(x, y - 3);
          ctx.lineTo(x, y + 3);
          ctx.stroke();
        }
      }

      // Corner registration marks
      drawRegistrationMark(ctx, 30, 30);
      drawRegistrationMark(ctx, w - 30, 30);
      drawRegistrationMark(ctx, 30, h - 30);
      drawRegistrationMark(ctx, w - 30, h - 30);
    }

    function drawRegistrationMark(ctx, x, y) {
      ctx.strokeStyle = 'rgba(62, 198, 224, 0.15)';
      ctx.lineWidth = 1;
      ctx.beginPath();
      ctx.arc(x, y, 8, 0, Math.PI * 2);
      ctx.stroke();
      ctx.beginPath();
      ctx.moveTo(x - 12, y);
      ctx.lineTo(x + 12, y);
      ctx.moveTo(x, y - 12);
      ctx.lineTo(x, y + 12);
      ctx.stroke();
    }

    window.addEventListener('resize', resize);
    resize();
  }

  // ── Custom Crosshair Cursor ──
  function initCrosshair() {
    if (window.innerWidth <= 768) return;

    const crosshair = document.getElementById('crosshair');
    const coord = document.getElementById('crosshair-coord');
    if (!crosshair || !coord) return;

    let mouseX = 0, mouseY = 0;
    let currentX = 0, currentY = 0;
    let isActive = false;

    function setActive(nextState) {
      if (isActive === nextState) return;
      isActive = nextState;
      crosshair.classList.toggle('is-active', isActive);
    }

    document.addEventListener('mousemove', (e) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
      const target = e.target instanceof Element ? e.target : null;
      setActive(Boolean(target && target.closest('#services, #methodology')));
    });

    document.addEventListener('mouseleave', () => {
      setActive(false);
    });

    window.addEventListener('blur', () => {
      setActive(false);
    });

    function animate() {
      currentX += (mouseX - currentX) * 0.15;
      currentY += (mouseY - currentY) * 0.15;

      crosshair.style.transform = `translate(${currentX}px, ${currentY}px)`;
      coord.textContent = `${Math.round(currentX)}, ${Math.round(currentY)}`;

      requestAnimationFrame(animate);
    }

    animate();
  }

  // ── Nav Scroll Effect ──
  function initNavScroll() {
    const nav = document.getElementById('nav');
    if (!nav) return;

    let ticking = false;

    window.addEventListener('scroll', () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          nav.classList.toggle('scrolled', window.scrollY > 60);
          ticking = false;
        });
        ticking = true;
      }
    });
  }

  // ── Mobile Nav ──
  function initNavMenu() {
    const toggle = document.querySelector('[data-nav-toggle]');
    const panel = document.getElementById('nav-mobile');
    if (!toggle || !panel) return;

    const mobileQuery = window.matchMedia('(max-width: 1180px)');

    function closeMenu() {
      toggle.setAttribute('aria-expanded', 'false');
      panel.hidden = true;
    }

    function syncForViewport() {
      if (!mobileQuery.matches) {
        closeMenu();
      }
    }

    toggle.addEventListener('click', () => {
      const expanded = toggle.getAttribute('aria-expanded') === 'true';
      toggle.setAttribute('aria-expanded', String(!expanded));
      panel.hidden = expanded;
    });

    panel.querySelectorAll('a').forEach((link) => {
      link.addEventListener('click', () => {
        closeMenu();
      });
    });

    document.addEventListener('keydown', (event) => {
      if (event.key === 'Escape') {
        closeMenu();
      }
    });

    window.addEventListener('resize', syncForViewport, { passive: true });
    syncForViewport();
  }

  // ── Scroll Reveal ──
  function initScrollReveal() {
    const elements = document.querySelectorAll('[data-reveal]');
    if (!elements.length) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            // Stagger children if they're siblings
            const parent = entry.target.parentElement;
            const siblings = parent.querySelectorAll('[data-reveal]');
            const index = Array.from(siblings).indexOf(entry.target);

            entry.target.style.transitionDelay = `${index * 0.1}s`;
            entry.target.classList.add('revealed');
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.15, rootMargin: '0px 0px -40px 0px' }
    );

    elements.forEach((el) => observer.observe(el));
  }

  // ── Animated Counters ──
  function initCounters() {
    const counters = document.querySelectorAll('[data-count]');
    if (!counters.length) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            animateCounter(entry.target);
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.5 }
    );

    counters.forEach((el) => observer.observe(el));
  }

  function animateCounter(el) {
    const target = parseInt(el.dataset.count, 10);
    const prefix = el.dataset.prefix || '';
    const suffix = el.dataset.suffix || '';
    const duration = 2000;
    const start = performance.now();

    function easeOutExpo(t) {
      return t === 1 ? 1 : 1 - Math.pow(2, -10 * t);
    }

    function update(now) {
      const elapsed = now - start;
      const progress = Math.min(elapsed / duration, 1);
      const eased = easeOutExpo(progress);
      const current = Math.round(eased * target);

      el.textContent = prefix + current + suffix;

      if (progress < 1) {
        requestAnimationFrame(update);
      }
    }

    requestAnimationFrame(update);
  }

  // ── Smooth Scroll for Anchor Links ──
  function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach((link) => {
      link.addEventListener('click', (e) => {
        const id = link.getAttribute('href');
        if (id === '#') return;

        const target = document.querySelector(id);
        if (target) {
          e.preventDefault();
          const offset = 80;
          const top = target.getBoundingClientRect().top + window.scrollY - offset;
          window.scrollTo({ top, behavior: 'smooth' });
        }
      });
    });
  }

  // ── Contact Form ──
  function initContactForm() {
    const form = document.getElementById('contact-form');
    if (!form) return;

    form.addEventListener('submit', (e) => {
      e.preventDefault();

      const btn = form.querySelector('.btn');
      const originalText = btn.querySelector('.btn-text').textContent;

      btn.querySelector('.btn-text').textContent = 'Inquiry Received';
      btn.style.background = 'rgba(62, 198, 224, 0.15)';
      btn.style.borderColor = 'var(--cyan)';
      btn.style.color = 'var(--cyan)';

      setTimeout(() => {
        btn.querySelector('.btn-text').textContent = originalText;
        btn.style.background = '';
        btn.style.borderColor = '';
        btn.style.color = '';
        form.reset();
      }, 3000);
    });
  }

  // ── Scroll Indicator Hide on Scroll ──
  function initScrollIndicator() {
    const indicator = document.getElementById('scroll-indicator');
    if (!indicator) return;

    window.addEventListener('scroll', () => {
      indicator.style.opacity = window.scrollY > 100 ? '0' : '1';
    }, { passive: true });
  }

  // ── Init Everything ──
  document.addEventListener('DOMContentLoaded', () => {
    initBlueprintGrid();
    initCrosshair();
    initNavScroll();
    initNavMenu();
    initScrollReveal();
    initCounters();
    initSmoothScroll();
    initContactForm();
    initScrollIndicator();
  });
})();
