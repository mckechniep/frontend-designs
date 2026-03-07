/* ═══════════════════════════════════════════
   CRYOGEN LABS — Arctic Mono Scripts
   ═══════════════════════════════════════════ */

// ── Frost Particle System ──
(function initFrostCanvas() {
  const canvas = document.getElementById('frost-canvas');
  const ctx = canvas.getContext('2d');
  let particles = [];
  let w, h;
  let animId;

  function resize() {
    w = canvas.width = window.innerWidth;
    h = canvas.height = window.innerHeight;
  }

  class Particle {
    constructor() {
      this.reset();
    }

    reset() {
      this.x = Math.random() * w;
      this.y = Math.random() * h;
      this.size = Math.random() * 1.5 + 0.3;
      this.speedX = (Math.random() - 0.5) * 0.15;
      this.speedY = Math.random() * 0.12 + 0.02;
      this.opacity = Math.random() * 0.5 + 0.1;
      this.flickerSpeed = Math.random() * 0.008 + 0.002;
      this.flickerOffset = Math.random() * Math.PI * 2;
    }

    update(time) {
      this.x += this.speedX;
      this.y += this.speedY;
      this.opacity = (Math.sin(time * this.flickerSpeed + this.flickerOffset) + 1) * 0.25 + 0.05;

      if (this.y > h + 10) {
        this.y = -10;
        this.x = Math.random() * w;
      }
      if (this.x < -10) this.x = w + 10;
      if (this.x > w + 10) this.x = -10;
    }

    draw() {
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(126, 200, 227, ${this.opacity})`;
      ctx.fill();
    }
  }

  function init() {
    resize();
    const count = Math.min(Math.floor((w * h) / 12000), 120);
    particles = Array.from({ length: count }, () => new Particle());
  }

  let time = 0;
  function animate() {
    time++;
    ctx.clearRect(0, 0, w, h);

    for (const p of particles) {
      p.update(time);
      p.draw();
    }

    // Draw faint connections between nearby particles
    for (let i = 0; i < particles.length; i++) {
      for (let j = i + 1; j < particles.length; j++) {
        const dx = particles[i].x - particles[j].x;
        const dy = particles[i].y - particles[j].y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < 100) {
          ctx.beginPath();
          ctx.moveTo(particles[i].x, particles[i].y);
          ctx.lineTo(particles[j].x, particles[j].y);
          ctx.strokeStyle = `rgba(126, 200, 227, ${0.04 * (1 - dist / 100)})`;
          ctx.lineWidth = 0.5;
          ctx.stroke();
        }
      }
    }

    animId = requestAnimationFrame(animate);
  }

  window.addEventListener('resize', () => {
    cancelAnimationFrame(animId);
    init();
    animate();
  });

  init();
  animate();
})();


// ── DNA Helix Canvas ──
(function initHelixCanvas() {
  const canvas = document.getElementById('helix-canvas');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');
  let w, h;

  function resize() {
    const container = canvas.parentElement;
    const rect = container.getBoundingClientRect();
    const dpr = window.devicePixelRatio || 1;
    w = rect.width;
    h = rect.height;
    canvas.width = w * dpr;
    canvas.height = h * dpr;
    canvas.style.width = w + 'px';
    canvas.style.height = h + 'px';
    ctx.scale(dpr, dpr);
  }

  resize();
  window.addEventListener('resize', resize);

  let time = 0;

  function draw() {
    time += 0.008;
    ctx.clearRect(0, 0, w, h);

    const cx = w / 2;
    const cy = h / 2;
    const helixRadius = Math.min(w, h) * 0.22;
    const numPoints = 40;
    const verticalSpread = Math.min(w, h) * 0.38;

    // Collect all drawable elements with z-depth for sorting
    const elements = [];

    for (let i = 0; i < numPoints; i++) {
      const t = (i / numPoints) * Math.PI * 4 + time;
      const y = cy - verticalSpread + (i / numPoints) * verticalSpread * 2;

      const x1 = cx + Math.cos(t) * helixRadius;
      const z1 = Math.sin(t);
      const x2 = cx + Math.cos(t + Math.PI) * helixRadius;
      const z2 = Math.sin(t + Math.PI);

      const opacity1 = 0.3 + z1 * 0.35;
      const opacity2 = 0.3 + z2 * 0.35;
      const size1 = 2.5 + z1 * 1.5;
      const size2 = 2.5 + z2 * 1.5;

      // Strand 1 node
      elements.push({
        type: 'node',
        x: x1, y, z: z1,
        size: size1,
        opacity: opacity1,
        color: '126, 200, 227'
      });

      // Strand 2 node
      elements.push({
        type: 'node',
        x: x2, y, z: z2,
        size: size2,
        opacity: opacity2,
        color: '163, 223, 240'
      });

      // Connecting rungs (every 3rd pair)
      if (i % 3 === 0) {
        const avgZ = (z1 + z2) / 2;
        elements.push({
          type: 'rung',
          x1, y1: y, x2, y2: y,
          z: avgZ,
          opacity: 0.12 + avgZ * 0.08
        });
      }
    }

    // Sort by z-depth (back to front)
    elements.sort((a, b) => a.z - b.z);

    // Draw elements
    for (const el of elements) {
      if (el.type === 'rung') {
        ctx.beginPath();
        ctx.moveTo(el.x1, el.y1);
        ctx.lineTo(el.x2, el.y2);
        ctx.strokeStyle = `rgba(126, 200, 227, ${Math.max(0, el.opacity)})`;
        ctx.lineWidth = 0.8;
        ctx.stroke();
      } else {
        ctx.beginPath();
        ctx.arc(el.x, el.y, Math.max(0.5, el.size), 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${el.color}, ${Math.max(0, el.opacity)})`;
        ctx.fill();

        // Glow on front-facing nodes
        if (el.z > 0.3) {
          ctx.beginPath();
          ctx.arc(el.x, el.y, el.size * 3, 0, Math.PI * 2);
          const grad = ctx.createRadialGradient(el.x, el.y, 0, el.x, el.y, el.size * 3);
          grad.addColorStop(0, `rgba(${el.color}, ${el.opacity * 0.2})`);
          grad.addColorStop(1, 'rgba(126, 200, 227, 0)');
          ctx.fillStyle = grad;
          ctx.fill();
        }
      }
    }

    // Draw strand curves
    ctx.beginPath();
    for (let i = 0; i < numPoints; i++) {
      const t = (i / numPoints) * Math.PI * 4 + time;
      const y = cy - verticalSpread + (i / numPoints) * verticalSpread * 2;
      const x = cx + Math.cos(t) * helixRadius;
      if (i === 0) ctx.moveTo(x, y);
      else ctx.lineTo(x, y);
    }
    ctx.strokeStyle = 'rgba(126, 200, 227, 0.08)';
    ctx.lineWidth = 1;
    ctx.stroke();

    ctx.beginPath();
    for (let i = 0; i < numPoints; i++) {
      const t = (i / numPoints) * Math.PI * 4 + time + Math.PI;
      const y = cy - verticalSpread + (i / numPoints) * verticalSpread * 2;
      const x = cx + Math.cos(t) * helixRadius;
      if (i === 0) ctx.moveTo(x, y);
      else ctx.lineTo(x, y);
    }
    ctx.strokeStyle = 'rgba(163, 223, 240, 0.06)';
    ctx.lineWidth = 1;
    ctx.stroke();

    requestAnimationFrame(draw);
  }

  draw();
})();


// ── Scroll Reveal ──
(function initReveal() {
  const elements = document.querySelectorAll('[data-reveal]');
  let revealed = new Set();

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry, index) => {
      if (entry.isIntersecting && !revealed.has(entry.target)) {
        revealed.add(entry.target);
        // Stagger reveal within the same observation batch
        const siblings = Array.from(entry.target.parentElement.querySelectorAll('[data-reveal]'));
        const siblingIndex = siblings.indexOf(entry.target);
        const delay = siblingIndex * 80;
        setTimeout(() => {
          entry.target.classList.add('revealed');
        }, delay);
      }
    });
  }, {
    threshold: 0.15,
    rootMargin: '0px 0px -40px 0px'
  });

  elements.forEach(el => observer.observe(el));
})();


// ── Number Counter Animation ──
(function initCounters() {
  const counters = document.querySelectorAll('[data-count]');

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const el = entry.target;
        const target = parseInt(el.getAttribute('data-count'));
        animateCount(el, target);
        observer.unobserve(el);
      }
    });
  }, { threshold: 0.5 });

  counters.forEach(el => observer.observe(el));

  function animateCount(el, target) {
    const duration = 1800;
    const start = performance.now();

    function tick(now) {
      const elapsed = now - start;
      const progress = Math.min(elapsed / duration, 1);
      // Ease out quart
      const eased = 1 - Math.pow(1 - progress, 4);
      el.textContent = Math.round(eased * target);

      if (progress < 1) {
        requestAnimationFrame(tick);
      }
    }

    requestAnimationFrame(tick);
  }
})();


// ── Nav Hide on Scroll ──
(function initNavScroll() {
  const nav = document.getElementById('nav');
  let lastScroll = 0;
  let ticking = false;

  window.addEventListener('scroll', () => {
    if (!ticking) {
      requestAnimationFrame(() => {
        const currentScroll = window.scrollY;

        if (currentScroll > lastScroll && currentScroll > 120) {
          nav.classList.add('nav--hidden');
        } else {
          nav.classList.remove('nav--hidden');
        }

        lastScroll = currentScroll;
        ticking = false;
      });
      ticking = true;
    }
  });
})();


// ── Contact Form ──
(function initForm() {
  const form = document.getElementById('contact-form');
  if (!form) return;

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const btn = form.querySelector('button[type="submit"]');
    const originalHTML = btn.innerHTML;

    btn.innerHTML = '<span>Transmitted</span>';
    btn.style.background = 'rgba(74, 222, 128, 0.2)';
    btn.style.color = '#4ade80';
    btn.style.borderColor = 'rgba(74, 222, 128, 0.3)';

    setTimeout(() => {
      btn.innerHTML = originalHTML;
      btn.style.background = '';
      btn.style.color = '';
      btn.style.borderColor = '';
      form.reset();
    }, 2500);
  });
})();


// ── Smooth scroll for anchor links ──
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', (e) => {
    const target = document.querySelector(anchor.getAttribute('href'));
    if (target) {
      e.preventDefault();
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  });
});
