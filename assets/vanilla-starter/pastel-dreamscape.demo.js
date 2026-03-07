const reveals = document.querySelectorAll(".reveal, .stagger-children");
const revealObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
        revealObserver.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.15, rootMargin: "0px 0px -60px 0px" }
);

reveals.forEach((el) => revealObserver.observe(el));

const nav = document.querySelector("nav");
let ticking = false;
window.addEventListener("scroll", () => {
  if (!ticking) {
    window.requestAnimationFrame(() => {
      nav.classList.toggle("scrolled", window.scrollY > 60);
      ticking = false;
    });
    ticking = true;
  }
});

const toggle = document.querySelector(".menu-toggle");
const navLinks = document.querySelector(".nav-links");
toggle.addEventListener("click", () => {
  toggle.classList.toggle("active");
  navLinks.classList.toggle("open");
});

navLinks.querySelectorAll("a").forEach((link) => {
  link.addEventListener("click", () => {
    toggle.classList.remove("active");
    navLinks.classList.remove("open");
  });
});

if (window.matchMedia("(hover: hover)").matches) {
  const dot = document.querySelector(".cursor-dot");
  const ring = document.querySelector(".cursor-ring");
  const cursorZoneSelector = ".services, .journey";
  let mx = 0;
  let my = 0;
  let rx = 0;
  let ry = 0;
  let cursorEnabled = false;

  const setCursorEnabled = (next) => {
    if (cursorEnabled === next) return;
    cursorEnabled = next;
    dot.classList.toggle("is-active", next);
    ring.classList.toggle("is-active", next);

    if (!next) {
      ring.style.width = "36px";
      ring.style.height = "36px";
      ring.style.borderColor = "rgba(212,144,156,0.4)";
    }
  };

  document.addEventListener("mousemove", (e) => {
    mx = e.clientX;
    my = e.clientY;
    dot.style.left = `${mx - 4}px`;
    dot.style.top = `${my - 4}px`;
    const zoneTarget =
      e.target instanceof Element ? e.target.closest(cursorZoneSelector) : null;
    setCursorEnabled(Boolean(zoneTarget));
  });

  const animateRing = () => {
    rx += (mx - rx) * 0.15;
    ry += (my - ry) * 0.15;
    ring.style.left = `${rx - 18}px`;
    ring.style.top = `${ry - 18}px`;
    window.requestAnimationFrame(animateRing);
  };
  animateRing();

  document
    .querySelectorAll(
      ".services a, .services button, .services .service-card, .journey a, .journey button, .journey .journey-step"
    )
    .forEach((el) => {
      el.addEventListener("mouseenter", () => {
        if (!cursorEnabled) return;
        ring.style.width = "52px";
        ring.style.height = "52px";
        ring.style.borderColor = "rgba(212,144,156,0.6)";
      });
      el.addEventListener("mouseleave", () => {
        if (!cursorEnabled) return;
        ring.style.width = "36px";
        ring.style.height = "36px";
        ring.style.borderColor = "rgba(212,144,156,0.4)";
      });
    });
}

const heroBlob = document.querySelector(".hero-blob");
if (heroBlob && window.matchMedia("(hover: hover)").matches) {
  document.addEventListener("mousemove", (e) => {
    const x = (e.clientX / window.innerWidth - 0.5) * 20;
    const y = (e.clientY / window.innerHeight - 0.5) * 20;
    heroBlob.style.transform = `translate(${x}px, ${y}px)`;
  });
}