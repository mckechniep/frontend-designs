// ===== NAV SCROLL =====
const nav = document.getElementById('nav');
let lastScroll = 0;

window.addEventListener('scroll', () => {
    nav.classList.toggle('scrolled', window.scrollY > 50);
}, { passive: true });

// ===== MOBILE MENU =====
const mobileToggle = document.getElementById('mobileToggle');
const navLinks = document.getElementById('navLinks');

mobileToggle.addEventListener('click', () => {
    navLinks.classList.toggle('open');
    const spans = mobileToggle.querySelectorAll('span');
    if (navLinks.classList.contains('open')) {
        spans[0].style.transform = 'rotate(45deg) translate(5px, 5px)';
        spans[1].style.opacity = '0';
        spans[2].style.transform = 'rotate(-45deg) translate(5px, -5px)';
    } else {
        spans[0].style.transform = '';
        spans[1].style.opacity = '';
        spans[2].style.transform = '';
    }
});

// Close menu on link click
navLinks.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
        navLinks.classList.remove('open');
        const spans = mobileToggle.querySelectorAll('span');
        spans[0].style.transform = '';
        spans[1].style.opacity = '';
        spans[2].style.transform = '';
    });
});

// ===== DASHBOARD CHART =====
const dashChart = document.getElementById('dashChart');
const barHeights = [30, 45, 35, 60, 50, 75, 55, 85, 65, 90, 70, 95];
const barColors = [
    'linear-gradient(to top, #DC2F02, #E85D04)',
    'linear-gradient(to top, #E85D04, #F48C06)',
    'linear-gradient(to top, #F48C06, #FFBA08)',
];

barHeights.forEach((h, i) => {
    const bar = document.createElement('div');
    bar.className = 'chart-bar';
    bar.style.height = '0%';
    bar.style.background = barColors[i % barColors.length];
    bar.style.opacity = '0.8';
    dashChart.appendChild(bar);

    setTimeout(() => {
        bar.style.height = h + '%';
    }, 800 + i * 80);
});

// ===== SCROLL REVEAL =====
const revealElements = document.querySelectorAll('.reveal');

const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
        }
    });
}, {
    threshold: 0.15,
    rootMargin: '0px 0px -40px 0px'
});

revealElements.forEach(el => revealObserver.observe(el));

// ===== COUNTER ANIMATION =====
const statNumbers = document.querySelectorAll('.stat-number[data-count]');

const counterObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting && !entry.target.dataset.animated) {
            entry.target.dataset.animated = 'true';
            const target = parseInt(entry.target.dataset.count);
            const suffix = entry.target.dataset.suffix || '+';
            const duration = 2000;
            const start = performance.now();

            function update(now) {
                const elapsed = now - start;
                const progress = Math.min(elapsed / duration, 1);
                const eased = 1 - Math.pow(1 - progress, 3);
                const current = Math.floor(eased * target);
                entry.target.textContent = current + (progress >= 1 ? suffix : '');
                if (progress < 1) requestAnimationFrame(update);
            }

            requestAnimationFrame(update);
        }
    });
}, { threshold: 0.5 });

statNumbers.forEach(el => counterObserver.observe(el));

// ===== CTA FORM =====
document.getElementById('ctaForm').addEventListener('submit', (e) => {
    e.preventDefault();
    const input = e.target.querySelector('input');
    const btn = e.target.querySelector('button');
    btn.textContent = 'Thank you!';
    btn.style.background = 'linear-gradient(135deg, #4ADE80, #22C55E)';
    input.value = '';
    setTimeout(() => {
        btn.textContent = 'Get Started';
        btn.style.background = '';
    }, 3000);
});

// ===== SMOOTH ANCHOR SCROLLING =====
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            e.preventDefault();
            target.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
    });
});