/* Vanilla UI Starter JS
   - Profile switcher (persisted)
   - Effects tier/effects switcher (persisted, style-scoped)
   - Mobile menu toggle
   - Theme toggle (persisted)
   - Demo toast
   - Demo form validation (client-side only)
*/

function qs(selector, root = document) {
  return root.querySelector(selector);
}

function qsa(selector, root = document) {
  return Array.from(root.querySelectorAll(selector));
}

function normalizeProfileId(profileId) {
  // Backward compatibility for older saved profile ids.
  if (profileId === "modern-saas-dark") return "modern-saas";
  return profileId;
}

function getFixedProfileId() {
  const fixed = normalizeProfileId(document.documentElement.dataset.fixedProfile || "");
  return fixed || null;
}

function getFixedProfileStylesheet() {
  return (
    document.documentElement.dataset.fixedProfileStylesheet ||
    document.documentElement.dataset.fixedStylesheet ||
    ""
  );
}

function safeParseArray(value) {
  if (!value) return [];
  try {
    const parsed = JSON.parse(value);
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

function uniqueStrings(values) {
  return [...new Set(values.filter((v) => typeof v === "string" && v.trim() !== ""))];
}

/* ── Retro Terminal mode ── */

const RETRO_PROFILE_ID = "retro-terminal";
const CORPORATE_PROFILE_ID = "corporate-blueprint";
const ARCTIC_PROFILE_ID = "arctic-mono";
const NOIRE_PROFILE_ID = "noire-editorial";
const RETRO_SECTION_ORDER = ["hero", "features", "metrics", "contact", "footer"];
const RETRO_NAV_COMMANDS = {
  "#features": "./welcome.sh",
  "#metrics": "cat services.conf",
  "#contact": "netstat --threats",
  "../../components/index.html": "whoami --verbose",
};
const RETRO_BOOT_LINES = [
  "BIOS v3.14.159 — POST check initiated...",
  "CPU: Intel Xeon E-2388G @ 3.20GHz ........... [  OK  ]",
  "RAM: 128GB ECC DDR4 .......................... [  OK  ]",
  "NIC: Intel X710-DA4 10GbE ................... [  OK  ]",
  "",
  "Loading kernel modules...",
  "  ├─ nf_conntrack ........................... [LOADED]",
  "  ├─ xt_geoip ............................... [LOADED]",
  "  ├─ wireguard .............................. [LOADED]",
  "  └─ nexus_sentinel_core .................... [LOADED]",
  "",
  "Starting services...",
  "  ├─ sshd ................................... [ACTIVE]",
  "  ├─ nexus-firewall ......................... [ACTIVE]",
  "  ├─ nexus-threat-intel ..................... [ACTIVE]",
  "  └─ nexus-web-portal ....................... [ACTIVE]",
  "",
  "NEXUS SENTINEL DEFENSE PLATFORM v4.2.1",
  "All systems operational. Establishing secure session...",
];
const RETRO_ASCII_LOGO = String.raw` ███╗   ██╗███████╗██╗  ██╗██╗   ██╗███████╗
 ████╗  ██║██╔════╝╚██╗██╔╝██║   ██║██╔════╝
 ██╔██╗ ██║█████╗   ╚███╔╝ ██║   ██║███████╗
 ██║╚██╗██║██╔══╝   ██╔██╗ ██║   ██║╚════██║
 ██║ ╚████║███████╗██╔╝ ██╗╚██████╔╝███████║
 ╚═╝  ╚═══╝╚══════╝╚═╝  ╚═╝ ╚═════╝ ╚══════╝
 ███████╗███████╗███╗   ██╗████████╗██╗███╗   ██╗███████╗██╗
 ██╔════╝██╔════╝████╗  ██║╚══██╔══╝██║████╗  ██║██╔════╝██║
 ███████╗█████╗  ██╔██╗ ██║   ██║   ██║██╔██╗ ██║█████╗  ██║
 ╚════██║██╔══╝  ██║╚██╗██║   ██║   ██║██║╚██╗██║██╔══╝  ██║
 ███████║███████╗██║ ╚████║   ██║   ██║██║ ╚████║███████╗███████╗
 ╚══════╝╚══════╝╚═╝  ╚═══╝   ╚═╝   ╚═╝╚═╝  ╚═══╝╚══════╝╚══════╝`;
const RETRO_TYPING_LINES = [
  ">> NEXUS SENTINEL CYBER DEFENSE SYSTEMS v4.2.1",
  ">> Initializing threat assessment protocols...",
  ">> Status: ALL PERIMETERS SECURE",
  ">> We don't just defend networks. We hunt threats.",
  ">> Ready to fortify your infrastructure?",
];

const retroState = {
  bootPlayed: false,
  bootTimerIds: [],
  feedIntervalId: null,
  keyboardBound: false,
};

const corporateState = {
  revealObserver: null,
};

const arcticState = {
  revealObserver: null,
  frostCanvas: null,
  frostCtx: null,
  frostAnimationId: null,
  frostParticles: [],
  frostResizeBound: false,
  frostStaticDrawn: false,
  helixCanvas: null,
  helixCtx: null,
  helixAnimationId: null,
  helixTime: 0,
  helixResizeBound: false,
  blueprintCanvas: null,
  blueprintCtx: null,
  blueprintAnimationId: null,
  blueprintTime: 0,
  blueprintResizeBound: false,
};

const noireState = {
  revealObserver: null,
  cursorDot: null,
  cursorRafId: null,
  cursorPos: { x: 0, y: 0, tx: 0, ty: 0 },
  redactionTimerId: null,
  parallaxBound: false,
};

function isRetroActive() {
  return document.documentElement.dataset.profile === RETRO_PROFILE_ID;
}

function clearRetroTimers() {
  retroState.bootTimerIds.forEach((id) => window.clearTimeout(id));
  retroState.bootTimerIds = [];
  if (retroState.feedIntervalId) {
    window.clearInterval(retroState.feedIntervalId);
    retroState.feedIntervalId = null;
  }
}

function ensureRetroBootScreen() {
  let boot = qs(".retro-boot-screen");
  if (!boot) {
    boot = document.createElement("div");
    boot.className = "retro-boot-screen";
    boot.hidden = true;
    boot.innerHTML = `<div class="retro-boot-log" data-retro-boot-log></div>`;
    document.body.appendChild(boot);
  }
  return boot;
}

function runRetroBootSequence() {
  const boot = ensureRetroBootScreen();
  const log = qs("[data-retro-boot-log]", boot);
  if (!log || retroState.bootPlayed) return;

  boot.hidden = false;
  log.innerHTML = "";

  let delay = 120;
  RETRO_BOOT_LINES.forEach((line) => {
    const timer = window.setTimeout(() => {
      const row = document.createElement("div");
      row.className = "retro-boot-line";
      row.textContent = line;
      log.appendChild(row);
      log.scrollTop = log.scrollHeight;
    }, delay);
    retroState.bootTimerIds.push(timer);
    delay += line === "" ? 130 : 70;
  });

  const closeTimer = window.setTimeout(() => {
    boot.style.opacity = "0";
    const hideTimer = window.setTimeout(() => {
      boot.hidden = true;
      boot.style.opacity = "";
    }, 320);
    retroState.bootTimerIds.push(hideTimer);
  }, delay + 520);
  retroState.bootTimerIds.push(closeTimer);
  retroState.bootPlayed = true;
}

function applyRetroNavLabels(active) {
  const links = qsa(".nav-link");
  links.forEach((link) => {
    if (!link.dataset.originalLabel) {
      link.dataset.originalLabel = (link.textContent || "").trim();
    }
    const href = link.getAttribute("href") || "";
    if (active && RETRO_NAV_COMMANDS[href]) {
      link.textContent = RETRO_NAV_COMMANDS[href];
    } else if (!active && link.dataset.originalLabel) {
      link.textContent = link.dataset.originalLabel;
      link.removeAttribute("data-retro-active");
    }
  });
}

function applyRetroCtaLabels(active) {
  const ctas = qsa(".cta-row .button, .nav .button-primary");
  ctas.forEach((button) => {
    if (!button.dataset.originalLabel) {
      button.dataset.originalLabel = (button.textContent || "").trim();
    }
  });

  const navPrimary = qs(".nav .button-primary");
  if (navPrimary) {
    navPrimary.textContent = active ? "ssh contact@nexus" : navPrimary.dataset.originalLabel;
  }
}

function ensureRetroHeroElements() {
  const heroCopy = qs(".hero-copy");
  if (!heroCopy) return;

  let logo = qs(".retro-ascii-logo", heroCopy);
  if (!logo) {
    logo = document.createElement("pre");
    logo.className = "retro-ascii-logo";
    logo.setAttribute("aria-hidden", "true");
    logo.textContent = RETRO_ASCII_LOGO;
    const heading = qs(".h1", heroCopy);
    if (heading) heroCopy.insertBefore(logo, heading);
  }

  let feed = qs(".retro-typing-feed", heroCopy);
  if (!feed) {
    feed = document.createElement("div");
    feed.className = "retro-typing-feed";
    RETRO_TYPING_LINES.forEach((line) => {
      const row = document.createElement("p");
      row.className = "retro-typing-line";
      row.textContent = line;
      feed.appendChild(row);
    });
    const lead = qs(".lead", heroCopy);
    if (lead) lead.insertAdjacentElement("afterend", feed);
    else heroCopy.appendChild(feed);
  }

  if (!qs(".retro-kbd-hint", heroCopy)) {
    const hint = document.createElement("p");
    hint.className = "retro-kbd-hint";
    hint.textContent = "Keyboard nav: j/k or arrows, and keys 1-5 for direct jumps.";
    feed?.insertAdjacentElement("afterend", hint);
  }
}

function runRetroTypingAnimation() {
  const lines = qsa(".retro-typing-feed .retro-typing-line");
  lines.forEach((line, index) => {
    const fullText = line.dataset.fullText || line.textContent || "";
    line.dataset.fullText = fullText;
    line.textContent = "";
    line.dataset.state = "off";

    const startTimer = window.setTimeout(() => {
      line.dataset.state = "on";
      let charIndex = 0;
      const typeTick = () => {
        if (charIndex <= fullText.length) {
          line.textContent = fullText.slice(0, charIndex);
          charIndex += 1;
          const t = window.setTimeout(typeTick, 22);
          retroState.bootTimerIds.push(t);
          return;
        }

        if (!qs(".retro-cursor", line) && index === lines.length - 1) {
          const cursor = document.createElement("span");
          cursor.className = "retro-cursor";
          cursor.textContent = " _";
          line.appendChild(cursor);
        }
      };
      typeTick();
    }, 260 + index * 680);
    retroState.bootTimerIds.push(startTimer);
  });
}

function randomRetroIp() {
  const prefixes = ["185.220.101", "45.155.205", "103.136.42", "91.240.118", "194.26.29"];
  const prefix = prefixes[Math.floor(Math.random() * prefixes.length)];
  return `${prefix}.${Math.floor(Math.random() * 255)}`;
}

function randomRetroDomain() {
  const domains = ["cdn-update.xyz", "secure-payload.top", "ns1.darkgate.cc", "api-telemetry.click"];
  return domains[Math.floor(Math.random() * domains.length)];
}

function ensureRetroThreatFeed() {
  const metricsSection = qs("#metrics .container");
  if (!metricsSection) return;

  let panel = qs(".retro-threat-panel", metricsSection);
  if (!panel) {
    panel = document.createElement("div");
    panel.className = "retro-threat-panel";
    panel.innerHTML = `
      <div class="retro-threat-header">
        <span>LIVE THREAT TELEMETRY</span>
        <span data-retro-threat-clock>--:--:--</span>
      </div>
      <div class="retro-threat-feed" data-retro-threat-feed></div>
    `;
    const head = qs(".section-head", metricsSection);
    if (head) head.insertAdjacentElement("afterend", panel);
    else metricsSection.prepend(panel);
  }
}

function appendRetroThreatEntry() {
  const feed = qs("[data-retro-threat-feed]");
  const clock = qs("[data-retro-threat-clock]");
  if (!feed) return;

  const now = new Date();
  if (clock) clock.textContent = now.toUTCString().slice(17, 25);

  const levelRoll = Math.random();
  const level = levelRoll < 0.6 ? "LOW" : levelRoll < 0.9 ? "MED" : "HIGH";
  const levelClass = level === "HIGH" ? "lvl-high" : level === "MED" ? "lvl-med" : "";
  const actions = ["BLOCKED", "ALERT", "INSPECT"];
  const action = actions[Math.floor(Math.random() * actions.length)];
  const snippets = [
    `Port scan detected from ${randomRetroIp()}`,
    `Suspicious DNS request to ${randomRetroDomain()}`,
    `Credential stuffing attempt from ${randomRetroIp()}`,
    `Anomalous outbound traffic to ${randomRetroDomain()}`,
    `TLS downgrade attempt intercepted`,
  ];
  const msg = snippets[Math.floor(Math.random() * snippets.length)];
  const time = now.toTimeString().slice(0, 8);

  const row = document.createElement("div");
  row.className = "retro-threat-entry";
  row.innerHTML = `[${time}] <span class="${levelClass}">[${level}]</span> <strong>${action}</strong> ${msg}`;
  feed.appendChild(row);
  while (feed.children.length > 36) feed.removeChild(feed.firstChild);
  feed.scrollTop = feed.scrollHeight;
}

function startRetroThreatFeed() {
  ensureRetroThreatFeed();
  const feed = qs("[data-retro-threat-feed]");
  if (!feed) return;
  feed.innerHTML = "";
  for (let i = 0; i < 8; i += 1) appendRetroThreatEntry();
  if (retroState.feedIntervalId) window.clearInterval(retroState.feedIntervalId);
  retroState.feedIntervalId = window.setInterval(() => {
    if (!isRetroActive()) return;
    appendRetroThreatEntry();
  }, 2400);
}

function retroScrollTo(sectionId) {
  const target =
    sectionId === "footer" ? qs(".site-footer") : qs(`#${sectionId}`);
  if (!target) return;
  target.scrollIntoView({ behavior: "smooth", block: "start" });

  const href = sectionId === "footer" ? "#contact" : `#${sectionId}`;
  qsa(".nav-link").forEach((link) => {
    link.dataset.retroActive = String((link.getAttribute("href") || "") === href);
  });
}

function bindRetroKeyboardNav() {
  if (retroState.keyboardBound) return;
  document.addEventListener("keydown", (event) => {
    if (!isRetroActive()) return;
    const target = event.target;
    if (
      target instanceof HTMLInputElement ||
      target instanceof HTMLTextAreaElement ||
      target instanceof HTMLSelectElement ||
      (target instanceof HTMLElement && target.isContentEditable)
    ) {
      return;
    }

    const currentY = window.scrollY;
    const anchors = RETRO_SECTION_ORDER.map((id) =>
      id === "footer" ? qs(".site-footer") : qs(`#${id}`)
    ).filter(Boolean);
    const currentIndex = Math.max(
      0,
      anchors.findIndex((el) => Math.abs(el.getBoundingClientRect().top) < 120)
    );

    if (event.key === "j" || event.key === "ArrowDown") {
      event.preventDefault();
      retroScrollTo(RETRO_SECTION_ORDER[Math.min(currentIndex + 1, RETRO_SECTION_ORDER.length - 1)]);
      return;
    }

    if (event.key === "k" || event.key === "ArrowUp") {
      event.preventDefault();
      retroScrollTo(RETRO_SECTION_ORDER[Math.max(currentIndex - 1, 0)]);
      return;
    }

    if (/^[1-5]$/.test(event.key)) {
      event.preventDefault();
      const idx = Number(event.key) - 1;
      retroScrollTo(RETRO_SECTION_ORDER[idx]);
      return;
    }

    if (currentY < 0) window.scrollTo({ top: 0 });
  });
  retroState.keyboardBound = true;
}

function setRetroMode(active) {
  document.documentElement.classList.toggle("retro-terminal-mode", active);
  applyRetroNavLabels(active);
  applyRetroCtaLabels(active);

  if (!active) {
    clearRetroTimers();
    const boot = qs(".retro-boot-screen");
    if (boot) boot.hidden = true;
    return;
  }

  ensureRetroHeroElements();
  runRetroTypingAnimation();
  startRetroThreatFeed();
  bindRetroKeyboardNav();
  runRetroBootSequence();
}

function disconnectCorporateRevealObserver() {
  if (corporateState.revealObserver) {
    corporateState.revealObserver.disconnect();
    corporateState.revealObserver = null;
  }
}

function ensureCorporateHeroStats(active) {
  const values = qsa(".hero .mini-stat__value");
  const labels = qsa(".hero .mini-stat__label");
  if (values.length < 3 || labels.length < 3) return;

  values.forEach((el) => {
    if (!el.dataset.originalText) {
      el.dataset.originalText = (el.textContent || "").trim();
    }
  });

  labels.forEach((el) => {
    if (!el.dataset.originalText) {
      el.dataset.originalText = (el.textContent || "").trim();
    }
  });

  if (!active) {
    values.forEach((el) => {
      if (el.dataset.originalText) el.textContent = el.dataset.originalText;
      el.removeAttribute("data-corp-counter");
      el.removeAttribute("data-corp-target");
      el.removeAttribute("data-corp-prefix");
      el.removeAttribute("data-corp-suffix");
      el.removeAttribute("data-corp-decimals");
    });
    labels.forEach((el) => {
      if (el.dataset.originalText) el.textContent = el.dataset.originalText;
    });
    return;
  }

  values[0].dataset.corpCounter = "true";
  values[0].dataset.corpTarget = "142";
  values[0].dataset.corpPrefix = "";
  values[0].dataset.corpSuffix = "";
  values[0].dataset.corpDecimals = "0";
  values[0].textContent = "0";
  labels[0].textContent = "Projects Delivered";

  values[1].dataset.corpCounter = "true";
  values[1].dataset.corpTarget = "96";
  values[1].dataset.corpPrefix = "";
  values[1].dataset.corpSuffix = "%";
  values[1].dataset.corpDecimals = "0";
  values[1].textContent = "0%";
  labels[1].textContent = "Client Retention";

  values[2].dataset.corpCounter = "true";
  values[2].dataset.corpTarget = "2.4";
  values[2].dataset.corpPrefix = "$";
  values[2].dataset.corpSuffix = "B";
  values[2].dataset.corpDecimals = "1";
  values[2].textContent = "$0.0B";
  labels[2].textContent = "Value Created";
}

function formatCorporateCounter(value, decimals, prefix, suffix) {
  const formatted =
    decimals > 0
      ? value.toFixed(decimals)
      : String(Math.round(value));
  return `${prefix}${formatted}${suffix}`;
}

function animateCorporateHeroCounters() {
  const counters = qsa("[data-corp-counter='true']");
  if (counters.length === 0) return;

  const duration = 1500;
  const start = performance.now();

  const easeOutExpo = (t) => (t === 1 ? 1 : 1 - 2 ** (-10 * t));

  const tick = (now) => {
    const elapsed = now - start;
    const progress = Math.min(1, elapsed / duration);
    const eased = easeOutExpo(progress);

    counters.forEach((el) => {
      const target = Number(el.dataset.corpTarget || "0");
      const decimals = Number(el.dataset.corpDecimals || "0");
      const prefix = el.dataset.corpPrefix || "";
      const suffix = el.dataset.corpSuffix || "";
      const current = target * eased;
      el.textContent = formatCorporateCounter(current, decimals, prefix, suffix);
    });

    if (progress < 1) {
      window.requestAnimationFrame(tick);
    }
  };

  window.requestAnimationFrame(tick);
}

function runCorporateRevealSequence() {
  disconnectCorporateRevealObserver();

  const targets = [
    ...qsa(".hero-copy .badge, .hero-copy .h1, .hero-copy .lead, .hero-copy .cta-row"),
    ...qsa(".hero-copy .mini-stat"),
    ...qsa(".hero-card"),
    ...qsa(".section-head"),
    ...qsa(".cards-grid .card"),
    ...qsa(".metrics-grid .metric"),
    ...qsa(".contact-card-wrapper .card"),
  ];
  if (targets.length === 0) return;

  targets.forEach((el, index) => {
    el.classList.add("blueprint-reveal-target");
    el.classList.remove("is-revealed");
    el.style.setProperty("--reveal-delay", `${Math.min(index * 70, 520)}ms`);
  });

  corporateState.revealObserver = new IntersectionObserver(
    (entries, observer) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        if (document.documentElement.dataset.profile !== CORPORATE_PROFILE_ID) return;
        entry.target.classList.add("is-revealed");
        observer.unobserve(entry.target);
      });
    },
    { threshold: 0.18, rootMargin: "0px 0px -48px 0px" }
  );

  targets.forEach((el) => corporateState.revealObserver.observe(el));
}

function setCorporateMode(active) {
  document.documentElement.classList.toggle("corporate-blueprint-mode", active);
  ensureCorporateHeroStats(active);

  if (!active) {
    disconnectCorporateRevealObserver();
    qsa(".blueprint-reveal-target").forEach((el) => {
      el.classList.remove("is-revealed");
      el.style.removeProperty("--reveal-delay");
    });
    return;
  }

  runCorporateRevealSequence();
  window.setTimeout(() => {
    if (document.documentElement.dataset.profile === CORPORATE_PROFILE_ID) {
      animateCorporateHeroCounters();
    }
  }, 260);
}

function disconnectArcticRevealObserver() {
  if (arcticState.revealObserver) {
    arcticState.revealObserver.disconnect();
    arcticState.revealObserver = null;
  }
}

function ensureArcticFrostCanvas() {
  if (arcticState.frostCanvas && arcticState.frostCtx) return;

  let canvas = qs("#arctic-frost-canvas");
  if (!canvas) {
    canvas = document.createElement("canvas");
    canvas.id = "arctic-frost-canvas";
    canvas.setAttribute("aria-hidden", "true");
    document.body.appendChild(canvas);
  }

  const ctx = canvas.getContext("2d");
  if (!ctx) return;

  arcticState.frostCanvas = canvas;
  arcticState.frostCtx = ctx;
}

function resizeArcticFrostCanvas() {
  const canvas = arcticState.frostCanvas;
  const ctx = arcticState.frostCtx;
  if (!canvas || !ctx) return;

  const dpr = window.devicePixelRatio || 1;
  const width = window.innerWidth;
  const height = window.innerHeight;
  canvas.width = Math.floor(width * dpr);
  canvas.height = Math.floor(height * dpr);
  canvas.style.width = `${width}px`;
  canvas.style.height = `${height}px`;
  ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

  const count = Math.max(30, Math.min(120, Math.floor((width * height) / 15000)));
  arcticState.frostParticles = Array.from({ length: count }, () => ({
    x: Math.random() * width,
    y: Math.random() * height,
    r: Math.random() * 2.5 + 1.2,
    dx: (Math.random() - 0.5) * 0.16,
    dy: Math.random() * 0.16 + 0.03,
    tw: Math.random() * Math.PI * 2,
    alpha: Math.random() * 0.5 + 0.25,
  }));
  arcticState.frostStaticDrawn = false;
}

function drawArcticFrostFrame(step = 1) {
  const canvas = arcticState.frostCanvas;
  const ctx = arcticState.frostCtx;
  if (!canvas || !ctx) return;

  const width = window.innerWidth;
  const height = window.innerHeight;
  ctx.clearRect(0, 0, width, height);

  const particles = arcticState.frostParticles;
  for (let i = 0; i < particles.length; i += 1) {
    const p = particles[i];
    p.x += p.dx * step;
    p.y += p.dy * step;
    p.tw += 0.01 * step;
    p.alpha = 0.25 + ((Math.sin(p.tw) + 1) * 0.3);

    if (p.y > height + 10) {
      p.y = -10;
      p.x = Math.random() * width;
    }
    if (p.x < -10) p.x = width + 10;
    if (p.x > width + 10) p.x = -10;

    ctx.beginPath();
    ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
    ctx.fillStyle = `rgba(126, 200, 227, ${p.alpha.toFixed(3)})`;
    ctx.fill();
  }
}

function animateArcticFrostCanvas() {
  if (document.documentElement.dataset.profile !== ARCTIC_PROFILE_ID) return;
  drawArcticFrostFrame(1);
  arcticState.frostAnimationId = window.requestAnimationFrame(animateArcticFrostCanvas);
}

function startArcticFrostLayer() {
  ensureArcticFrostCanvas();
  if (!arcticState.frostCanvas) return;
  arcticState.frostCanvas.hidden = false;

  if (!arcticState.frostResizeBound) {
    window.addEventListener("resize", resizeArcticFrostCanvas, { passive: true });
    arcticState.frostResizeBound = true;
  }

  resizeArcticFrostCanvas();
  const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  if (reduceMotion) {
    if (!arcticState.frostStaticDrawn) {
      drawArcticFrostFrame(0);
      arcticState.frostStaticDrawn = true;
    }
    return;
  }

  if (arcticState.frostAnimationId) {
    window.cancelAnimationFrame(arcticState.frostAnimationId);
    arcticState.frostAnimationId = null;
  }
  arcticState.frostAnimationId = window.requestAnimationFrame(animateArcticFrostCanvas);
}

function stopArcticFrostLayer() {
  if (arcticState.frostAnimationId) {
    window.cancelAnimationFrame(arcticState.frostAnimationId);
    arcticState.frostAnimationId = null;
  }
  if (arcticState.frostCanvas) {
    arcticState.frostCanvas.hidden = true;
  }
}

function ensureArcticHelixCanvas() {
  const host = qs(".hero-card .card");
  if (!host) return;

  let wrap = qs(".arctic-helix-wrap", host);
  if (!wrap) {
    wrap = document.createElement("div");
    wrap.className = "arctic-helix-wrap";
    wrap.innerHTML = '<canvas class="arctic-helix-canvas" aria-hidden="true"></canvas>';
    const body = qs(".card-body", host);
    if (body) body.insertAdjacentElement("beforebegin", wrap);
    else host.appendChild(wrap);
  }

  const canvas = qs(".arctic-helix-canvas", wrap);
  const ctx = canvas ? canvas.getContext("2d") : null;
  if (!canvas || !ctx) return;

  arcticState.helixCanvas = canvas;
  arcticState.helixCtx = ctx;
}

function resizeArcticHelixCanvas() {
  const canvas = arcticState.helixCanvas;
  const ctx = arcticState.helixCtx;
  if (!canvas || !ctx) return;
  const rect = canvas.getBoundingClientRect();
  if (rect.width <= 0 || rect.height <= 0) return;
  const dpr = window.devicePixelRatio || 1;
  canvas.width = Math.floor(rect.width * dpr);
  canvas.height = Math.floor(rect.height * dpr);
  ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
}

function drawArcticHelixFrame() {
  const canvas = arcticState.helixCanvas;
  const ctx = arcticState.helixCtx;
  if (!canvas || !ctx) return;

  const w = canvas.getBoundingClientRect().width;
  const h = canvas.getBoundingClientRect().height;
  if (w <= 0 || h <= 0) return;

  arcticState.helixTime += 0.018;
  const t = arcticState.helixTime;
  ctx.clearRect(0, 0, w, h);

  const cx = w / 2;
  const cy = h / 2;
  const radius = Math.min(w, h) * 0.205;
  const spread = Math.min(w, h) * 0.33;
  const points = 38;

  for (let i = 0; i < points; i += 1) {
    const p = (i / (points - 1)) * 2 - 1;
    const y = cy + p * spread;
    const wave = p * 5.4 + t;
    const x1 = cx + Math.cos(wave) * radius;
    const x2 = cx + Math.cos(wave + Math.PI) * radius;
    const z1 = Math.sin(wave);
    const z2 = Math.sin(wave + Math.PI);

    if (i % 3 === 0) {
      ctx.beginPath();
      ctx.moveTo(x1, y);
      ctx.lineTo(x2, y);
      ctx.strokeStyle = `rgba(126,200,227,${(0.12 + (z1 + 1) * 0.1).toFixed(3)})`;
      ctx.lineWidth = 1;
      ctx.stroke();
    }

    const r1 = 1.9 + (z1 + 1) * 1.3;
    const r2 = 1.9 + (z2 + 1) * 1.3;

    ctx.beginPath();
    ctx.arc(x1, y, r1, 0, Math.PI * 2);
    ctx.fillStyle = `rgba(126,200,227,${(0.32 + (z1 + 1) * 0.24).toFixed(3)})`;
    ctx.fill();

    ctx.beginPath();
    ctx.arc(x2, y, r2, 0, Math.PI * 2);
    ctx.fillStyle = `rgba(163,223,240,${(0.28 + (z2 + 1) * 0.2).toFixed(3)})`;
    ctx.fill();
  }
}

function animateArcticHelix() {
  if (document.documentElement.dataset.profile !== ARCTIC_PROFILE_ID) return;
  drawArcticHelixFrame();
  arcticState.helixAnimationId = window.requestAnimationFrame(animateArcticHelix);
}

function startArcticHelix() {
  ensureArcticHelixCanvas();
  if (!arcticState.helixCanvas) return;
  arcticState.helixCanvas.hidden = false;
  if (!arcticState.helixResizeBound) {
    window.addEventListener("resize", resizeArcticHelixCanvas, { passive: true });
    arcticState.helixResizeBound = true;
  }
  resizeArcticHelixCanvas();

  const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  if (reduceMotion) {
    drawArcticHelixFrame();
    return;
  }

  if (arcticState.helixAnimationId) window.cancelAnimationFrame(arcticState.helixAnimationId);
  arcticState.helixAnimationId = window.requestAnimationFrame(animateArcticHelix);
}

function stopArcticHelix() {
  if (arcticState.helixAnimationId) {
    window.cancelAnimationFrame(arcticState.helixAnimationId);
    arcticState.helixAnimationId = null;
  }
  if (arcticState.helixCanvas) {
    arcticState.helixCanvas.hidden = true;
  }
}

function resolveArcticBlueprintLabels() {
  const source = [
    (qs(".hero .h1")?.textContent || "").trim(),
    (qs(".hero .lead")?.textContent || "").trim(),
  ]
    .join(" ")
    .toUpperCase()
    .replace(/[^A-Z0-9\s]/g, " ");
  const words = source
    .split(/\s+/)
    .filter((w) => w.length >= 5 && !["THROUGH", "WITHIN", "SYSTEM", "SYSTEMS"].includes(w));

  const labels = [];
  for (let i = 0; i < words.length && labels.length < 3; i += 1) {
    if (!labels.includes(words[i])) labels.push(words[i]);
  }
  while (labels.length < 3) labels.push(`MODULE-${labels.length + 1}`);
  return labels;
}

function ensureArcticBlueprintCanvas() {
  const host = qs(".hero-card .card") || qs(".hero .container") || qs(".hero");
  if (!host) return;

  let wrap = qs(".arctic-blueprint-wrap", host);
  if (!wrap) {
    wrap = document.createElement("div");
    wrap.className = "arctic-blueprint-wrap";
    wrap.innerHTML = '<canvas class="arctic-blueprint-canvas" aria-hidden="true"></canvas>';
    const ref = qs(".arctic-helix-wrap", host);
    if (ref) ref.insertAdjacentElement("afterend", wrap);
    else host.appendChild(wrap);
  }

  const canvas = qs(".arctic-blueprint-canvas", wrap);
  const ctx = canvas ? canvas.getContext("2d") : null;
  if (!canvas || !ctx) return;
  arcticState.blueprintCanvas = canvas;
  arcticState.blueprintCtx = ctx;
}

function resizeArcticBlueprintCanvas() {
  const canvas = arcticState.blueprintCanvas;
  const ctx = arcticState.blueprintCtx;
  if (!canvas || !ctx) return;
  const rect = canvas.getBoundingClientRect();
  if (rect.width <= 0 || rect.height <= 0) return;
  const dpr = window.devicePixelRatio || 1;
  canvas.width = Math.floor(rect.width * dpr);
  canvas.height = Math.floor(rect.height * dpr);
  ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
}

function drawIsoPrism(ctx, prism, tileW, tileH, unitH, ox, oy) {
  const x = prism.x;
  const y = prism.y;
  const z = prism.z;
  const w = prism.w;
  const d = prism.d;
  const h = prism.h;

  const iso = (ix, iy, iz = 0) => ({
    x: ox + (ix - iy) * tileW,
    y: oy + (ix + iy) * tileH - iz * unitH,
  });

  const p000 = iso(x, y, z);
  const pW00 = iso(x + w, y, z);
  const pWD0 = iso(x + w, y + d, z);
  const p0D0 = iso(x, y + d, z);
  const p00H = iso(x, y, z + h);
  const pW0H = iso(x + w, y, z + h);
  const pWDH = iso(x + w, y + d, z + h);
  const p0DH = iso(x, y + d, z + h);

  ctx.beginPath();
  ctx.moveTo(p00H.x, p00H.y);
  ctx.lineTo(pW0H.x, pW0H.y);
  ctx.lineTo(pWDH.x, pWDH.y);
  ctx.lineTo(p0DH.x, p0DH.y);
  ctx.closePath();
  ctx.fillStyle = prism.top;
  ctx.fill();

  ctx.beginPath();
  ctx.moveTo(p0D0.x, p0D0.y);
  ctx.lineTo(pWD0.x, pWD0.y);
  ctx.lineTo(pWDH.x, pWDH.y);
  ctx.lineTo(p0DH.x, p0DH.y);
  ctx.closePath();
  ctx.fillStyle = prism.left;
  ctx.fill();

  ctx.beginPath();
  ctx.moveTo(pW00.x, pW00.y);
  ctx.lineTo(pWD0.x, pWD0.y);
  ctx.lineTo(pWDH.x, pWDH.y);
  ctx.lineTo(pW0H.x, pW0H.y);
  ctx.closePath();
  ctx.fillStyle = prism.right;
  ctx.fill();

  ctx.strokeStyle = prism.stroke;
  ctx.lineWidth = 1;
  ctx.stroke();

  return { x: (p00H.x + pWDH.x) * 0.5, y: (p00H.y + pWDH.y) * 0.5 };
}

function drawArcticBlueprintFrame() {
  const canvas = arcticState.blueprintCanvas;
  const ctx = arcticState.blueprintCtx;
  if (!canvas || !ctx) return;
  const w = canvas.getBoundingClientRect().width;
  const h = canvas.getBoundingClientRect().height;
  if (w <= 0 || h <= 0) return;

  arcticState.blueprintTime += 0.015;
  const t = arcticState.blueprintTime;
  ctx.clearRect(0, 0, w, h);

  ctx.fillStyle = "rgba(8, 16, 24, 0.16)";
  ctx.fillRect(0, 0, w, h);

  ctx.save();
  ctx.globalAlpha = 0.2;
  ctx.strokeStyle = "rgba(126, 200, 227, 0.34)";
  for (let x = 0; x <= w; x += 20) {
    ctx.beginPath();
    ctx.moveTo(x, 0);
    ctx.lineTo(x, h);
    ctx.stroke();
  }
  for (let y = 0; y <= h; y += 20) {
    ctx.beginPath();
    ctx.moveTo(0, y);
    ctx.lineTo(w, y);
    ctx.stroke();
  }
  ctx.restore();

  const tileW = Math.max(10, Math.min(16, w * 0.031));
  const tileH = tileW * 0.56;
  const unitH = tileH * 1.7;
  const originX = w * 0.5;
  const originY = h * 0.62;
  const labels = resolveArcticBlueprintLabels();
  const scanX = (t * 82) % (w + 60) - 30;

  const prisms = [
    { x: -3.8, y: -1.4, z: 0, w: 2.3, d: 1.9, h: 1.7, name: labels[0] },
    { x: -1.0, y: -2.4, z: 0, w: 2.0, d: 1.6, h: 1.3, name: labels[1] },
    { x: 1.5, y: -1.2, z: 0, w: 2.4, d: 2.0, h: 2.0, name: labels[2] },
    { x: 0.3, y: 1.3, z: 0, w: 2.1, d: 1.7, h: 1.2, name: "STACK" },
  ].map((p, i) => ({
    ...p,
    top: `rgba(163, 223, 240, ${0.22 + i * 0.035})`,
    left: `rgba(72, 118, 145, ${0.46 + i * 0.03})`,
    right: `rgba(95, 150, 182, ${0.38 + i * 0.03})`,
    stroke: "rgba(163, 223, 240, 0.66)",
    depth: p.x + p.y + p.z,
  }));

  prisms.sort((a, b) => a.depth - b.depth);
  const tops = prisms.map((prism) => drawIsoPrism(ctx, prism, tileW, tileH, unitH, originX, originY));

  ctx.strokeStyle = "rgba(163, 223, 240, 0.55)";
  ctx.lineWidth = 1;
  for (let i = 0; i < tops.length - 1; i += 1) {
    ctx.beginPath();
    ctx.moveTo(tops[i].x, tops[i].y);
    ctx.lineTo(tops[i + 1].x, tops[i + 1].y);
    ctx.stroke();
  }

  tops.forEach((pt, i) => {
    const glow = 3.8 + Math.sin(t * 2 + i) * 0.8;
    const grd = ctx.createRadialGradient(pt.x, pt.y, 0, pt.x, pt.y, glow * 2.8);
    grd.addColorStop(0, "rgba(163, 223, 240, 0.8)");
    grd.addColorStop(1, "rgba(163, 223, 240, 0)");
    ctx.fillStyle = grd;
    ctx.beginPath();
    ctx.arc(pt.x, pt.y, glow * 2.8, 0, Math.PI * 2);
    ctx.fill();

    ctx.fillStyle = "rgba(205, 235, 248, 0.94)";
    ctx.beginPath();
    ctx.arc(pt.x, pt.y, 2.2, 0, Math.PI * 2);
    ctx.fill();
  });

  ctx.strokeStyle = "rgba(163, 223, 240, 0.35)";
  ctx.beginPath();
  ctx.moveTo(scanX, 0);
  ctx.lineTo(scanX, h);
  ctx.stroke();

  ctx.font = "11px var(--font-mono, monospace)";
  ctx.fillStyle = "rgba(205, 235, 248, 0.82)";
  tops.forEach((pt, i) => {
    ctx.fillText(prisms[i].name, pt.x + 7, pt.y - 6);
  });
}

function animateArcticBlueprint() {
  if (document.documentElement.dataset.profile !== ARCTIC_PROFILE_ID) return;
  drawArcticBlueprintFrame();
  arcticState.blueprintAnimationId = window.requestAnimationFrame(animateArcticBlueprint);
}

function startArcticBlueprint() {
  ensureArcticBlueprintCanvas();
  if (!arcticState.blueprintCanvas) return;
  arcticState.blueprintCanvas.hidden = false;
  if (!arcticState.blueprintResizeBound) {
    window.addEventListener("resize", resizeArcticBlueprintCanvas, { passive: true });
    arcticState.blueprintResizeBound = true;
  }
  resizeArcticBlueprintCanvas();
  const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  if (reduceMotion) {
    drawArcticBlueprintFrame();
    return;
  }
  if (arcticState.blueprintAnimationId) window.cancelAnimationFrame(arcticState.blueprintAnimationId);
  arcticState.blueprintAnimationId = window.requestAnimationFrame(animateArcticBlueprint);
}

function stopArcticBlueprint() {
  if (arcticState.blueprintAnimationId) {
    window.cancelAnimationFrame(arcticState.blueprintAnimationId);
    arcticState.blueprintAnimationId = null;
  }
  if (arcticState.blueprintCanvas) {
    arcticState.blueprintCanvas.hidden = true;
  }
}

function ensureArcticHeroStats(active) {
  const values = qsa(".hero .mini-stat__value");
  const labels = qsa(".hero .mini-stat__label");
  if (values.length < 3 || labels.length < 3) return;

  values.forEach((el) => {
    if (!el.dataset.originalText) {
      el.dataset.originalText = (el.textContent || "").trim();
    }
  });

  labels.forEach((el) => {
    if (!el.dataset.originalText) {
      el.dataset.originalText = (el.textContent || "").trim();
    }
  });

  if (!active) {
    values.forEach((el) => {
      if (el.dataset.originalText) el.textContent = el.dataset.originalText;
      el.removeAttribute("data-arctic-counter");
      el.removeAttribute("data-arctic-target");
    });
    labels.forEach((el) => {
      if (el.dataset.originalText) el.textContent = el.dataset.originalText;
    });
    return;
  }

  values[0].dataset.arcticCounter = "true";
  values[0].dataset.arcticTarget = "147";
  values[0].textContent = "0";
  labels[0].textContent = "Published Papers";

  values[1].dataset.arcticCounter = "true";
  values[1].dataset.arcticTarget = "12";
  values[1].textContent = "0";
  labels[1].textContent = "Active Patents";

  values[2].dataset.arcticCounter = "true";
  values[2].dataset.arcticTarget = "4";
  values[2].textContent = "0";
  labels[2].textContent = "Global Facilities";
}

function animateArcticHeroCounters() {
  const counters = qsa("[data-arctic-counter='true']");
  if (counters.length === 0) return;

  const duration = 1300;
  const start = performance.now();
  const easeOutQuart = (t) => 1 - (1 - t) ** 4;

  const tick = (now) => {
    const progress = Math.min(1, (now - start) / duration);
    const eased = easeOutQuart(progress);
    counters.forEach((el) => {
      const target = Number(el.dataset.arcticTarget || "0");
      el.textContent = String(Math.round(target * eased));
    });
    if (progress < 1) window.requestAnimationFrame(tick);
  };

  window.requestAnimationFrame(tick);
}

function runArcticRevealSequence() {
  disconnectArcticRevealObserver();
  const targets = [
    ...qsa(".hero-copy .badge, .hero-copy .h1, .hero-copy .lead, .hero-copy .cta-row"),
    ...qsa(".hero-copy .mini-stat"),
    ...qsa(".hero-card, .arctic-blueprint-wrap"),
    ...qsa(".section-head"),
    ...qsa(".cards-grid .card"),
    ...qsa(".metrics-grid .metric"),
    ...qsa(".contact-card-wrapper .card"),
  ];
  if (targets.length === 0) return;

  targets.forEach((el, index) => {
    el.classList.add("arctic-reveal-target");
    el.classList.remove("is-revealed");
    el.style.setProperty("--arctic-reveal-delay", `${Math.min(index * 65, 520)}ms`);
  });

  arcticState.revealObserver = new IntersectionObserver(
    (entries, observer) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        if (document.documentElement.dataset.profile !== ARCTIC_PROFILE_ID) return;
        entry.target.classList.add("is-revealed");
        observer.unobserve(entry.target);
      });
    },
    { threshold: 0.16, rootMargin: "0px 0px -42px 0px" }
  );

  targets.forEach((el) => arcticState.revealObserver.observe(el));
}

function setArcticMode(active) {
  document.documentElement.classList.toggle("arctic-mono-mode", active);
  ensureArcticHeroStats(active);

  if (!active) {
    stopArcticFrostLayer();
    stopArcticHelix();
    stopArcticBlueprint();
    disconnectArcticRevealObserver();
    qsa(".arctic-reveal-target").forEach((el) => {
      el.classList.remove("is-revealed");
      el.style.removeProperty("--arctic-reveal-delay");
    });
    return;
  }

  // Arctic uses a single continuous background; disable global effects overlays.
  Array.from(document.documentElement.classList)
    .filter((name) => name.startsWith("effects-effect-"))
    .forEach((name) => document.documentElement.classList.remove(name));

  startArcticFrostLayer();
  startArcticHelix();
  startArcticBlueprint();
  refreshArcticVisualLayout();
  runArcticRevealSequence();
  window.setTimeout(() => {
    if (document.documentElement.dataset.profile === ARCTIC_PROFILE_ID) {
      animateArcticHeroCounters();
    }
  }, 220);
}

function refreshArcticVisualLayout() {
  if (document.documentElement.dataset.profile !== ARCTIC_PROFILE_ID) return;
  window.requestAnimationFrame(() => {
    window.requestAnimationFrame(() => {
      resizeArcticFrostCanvas();
      resizeArcticHelixCanvas();
      resizeArcticBlueprintCanvas();
      drawArcticHelixFrame();
      drawArcticBlueprintFrame();
    });
  });
}

function disconnectNoireRevealObserver() {
  if (noireState.revealObserver) {
    noireState.revealObserver.disconnect();
    noireState.revealObserver = null;
  }
}

function ensureNoireCursorDot(active) {
  if (window.matchMedia("(pointer: coarse)").matches) return;

  if (!noireState.cursorDot) {
    let dot = qs("#noire-cursor-dot");
    if (!dot) {
      dot = document.createElement("div");
      dot.id = "noire-cursor-dot";
      dot.setAttribute("aria-hidden", "true");
      document.body.appendChild(dot);
    }
    noireState.cursorDot = dot;

    document.addEventListener(
      "pointermove",
      (event) => {
        noireState.cursorPos.tx = event.clientX;
        noireState.cursorPos.ty = event.clientY;
      },
      { passive: true }
    );
  }

  if (!noireState.cursorDot) return;

  if (!active) {
    noireState.cursorDot.hidden = true;
    if (noireState.cursorRafId) {
      window.cancelAnimationFrame(noireState.cursorRafId);
      noireState.cursorRafId = null;
    }
    return;
  }

  noireState.cursorDot.hidden = false;

  const tick = () => {
    if (document.documentElement.dataset.profile !== NOIRE_PROFILE_ID) return;
    noireState.cursorPos.x += (noireState.cursorPos.tx - noireState.cursorPos.x) * 0.16;
    noireState.cursorPos.y += (noireState.cursorPos.ty - noireState.cursorPos.y) * 0.16;
    noireState.cursorDot.style.left = `${noireState.cursorPos.x}px`;
    noireState.cursorDot.style.top = `${noireState.cursorPos.y}px`;
    noireState.cursorRafId = window.requestAnimationFrame(tick);
  };

  if (noireState.cursorRafId) window.cancelAnimationFrame(noireState.cursorRafId);
  noireState.cursorRafId = window.requestAnimationFrame(tick);
}

function ensureNoireClassifiedStamp(active) {
  const heroCopy = qs(".hero-copy");
  if (!heroCopy) return;

  let stamp = qs(".noire-classified-stamp", heroCopy);
  if (!stamp) {
    stamp = document.createElement("span");
    stamp.className = "noire-classified-stamp";
    stamp.textContent = "Classified";
    const badge = qs(".badge", heroCopy);
    if (badge) badge.insertAdjacentElement("afterend", stamp);
  }
  stamp.hidden = !active;
}

function ensureNoireRedaction(active) {
  const lead = qs(".hero-copy .lead");
  if (!lead) return;

  if (!lead.dataset.originalHtml) {
    lead.dataset.originalHtml = lead.innerHTML;
  }

  if (!active) {
    lead.innerHTML = lead.dataset.originalHtml;
    if (noireState.redactionTimerId) {
      window.clearTimeout(noireState.redactionTimerId);
      noireState.redactionTimerId = null;
    }
    return;
  }

  const phrase = "sensible spacing, typography, and components you can lift into any stack.";
  const originalText = (lead.textContent || "").trim();
  if (originalText.includes(phrase)) {
    const escaped = phrase.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
    const replaced = originalText.replace(
      new RegExp(escaped),
      `<span class="noire-redacted-line">${phrase}</span>`
    );
    lead.innerHTML = replaced;
  }

  const redacted = qs(".noire-redacted-line", lead);
  if (!redacted) return;
  redacted.addEventListener("mouseenter", () => redacted.classList.add("revealed"), { once: true });
  if (noireState.redactionTimerId) window.clearTimeout(noireState.redactionTimerId);
  noireState.redactionTimerId = window.setTimeout(() => {
    redacted.classList.add("revealed");
  }, 3500);
}

function ensureNoirePressStrip(active) {
  const hero = qs(".hero");
  if (!hero) return;

  let strip = qs(".noire-press-strip");
  if (!strip) {
    strip = document.createElement("div");
    strip.className = "noire-press-strip";
    strip.innerHTML =
      '<div class="noire-press-track" aria-hidden="true">SPECIAL REPORT • INVESTIGATION OPEN • DOSSIER ACCESS GRANTED • FIELD NOTES UPDATED • SPECIAL REPORT • INVESTIGATION OPEN • DOSSIER ACCESS GRANTED • FIELD NOTES UPDATED</div>';
    hero.insertAdjacentElement("afterend", strip);
  }
  strip.hidden = !active;
}

function bindNoireParallax() {
  if (noireState.parallaxBound) return;
  window.addEventListener(
    "scroll",
    () => {
      if (document.documentElement.dataset.profile !== NOIRE_PROFILE_ID) return;
      const title = qs(".hero .h1");
      if (!title) return;
      const shift = Math.min(window.scrollY * 0.08, 30);
      title.style.transform = `translateY(${shift}px)`;
    },
    { passive: true }
  );
  noireState.parallaxBound = true;
}

function runNoireRevealSequence() {
  disconnectNoireRevealObserver();

  const targets = [
    ...qsa(".hero-copy .badge, .hero-copy .h1, .hero-copy .lead, .hero-copy .cta-row"),
    ...qsa(".hero-copy .mini-stat"),
    ...qsa(".hero-card"),
    ...qsa(".section-head"),
    ...qsa(".cards-grid .card"),
    ...qsa(".metrics-grid .metric"),
    ...qsa(".contact-card-wrapper .card"),
  ];
  if (targets.length === 0) return;

  targets.forEach((el, index) => {
    el.classList.add("noire-reveal-target");
    el.classList.remove("is-revealed");
    el.style.setProperty("--noire-reveal-delay", `${Math.min(index * 70, 540)}ms`);
  });

  noireState.revealObserver = new IntersectionObserver(
    (entries, observer) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        if (document.documentElement.dataset.profile !== NOIRE_PROFILE_ID) return;
        entry.target.classList.add("is-revealed");
        observer.unobserve(entry.target);
      });
    },
    { threshold: 0.16, rootMargin: "0px 0px -48px 0px" }
  );

  targets.forEach((el) => noireState.revealObserver.observe(el));
}

function setNoireMode(active) {
  document.documentElement.classList.toggle("noire-editorial-mode", active);

  if (!active) {
    ensureNoireCursorDot(false);
    ensureNoireClassifiedStamp(false);
    ensureNoireRedaction(false);
    ensureNoirePressStrip(false);
    disconnectNoireRevealObserver();
    qsa(".noire-reveal-target").forEach((el) => {
      el.classList.remove("is-revealed");
      el.style.removeProperty("--noire-reveal-delay");
    });
    return;
  }

  ensureNoireCursorDot(true);
  ensureNoireClassifiedStamp(true);
  ensureNoireRedaction(true);
  ensureNoirePressStrip(true);
  bindNoireParallax();
  runNoireRevealSequence();
}

/* ── Profile switching ── */

async function loadProfiles() {
  let profiles;
  try {
    const res = await fetch("../shared/theme-registry.json");
    if (!res.ok) {
      throw new Error(`theme-registry.json request failed with ${res.status}`);
    }
    profiles = await res.json();
  } catch (error) {
    const fixedId = getFixedProfileId();
    const fixedStylesheet = getFixedProfileStylesheet();
    const existingStylesheet = qs("#profile-stylesheet")?.getAttribute("href") || "";

    console.warn("Falling back to inline profile config.", error);
    profiles = [
      {
        id: fixedId || "modern-saas",
        name: fixedId || "modern-saas",
        description: "Fallback profile config for local preview boot.",
        file: fixedStylesheet || existingStylesheet || "./theme.css",
        defaultTheme: document.documentElement.dataset.theme || "dark",
      },
    ];
  }

  const select = qs("[data-profile-select]");
  if (select) {
    profiles.forEach((p) => {
      const opt = document.createElement("option");
      opt.value = p.id;
      opt.textContent = p.name;
      select.appendChild(opt);
    });
  }

  const fixed = getFixedProfileId();
  if (fixed && select) {
    const field = select.closest(".controls-field");
    select.value = fixed;
    select.disabled = true;
    if (field) {
      field.hidden = true;
      field.setAttribute("aria-hidden", "true");
    }
  }

  return profiles;
}

function getInitialProfile(profiles) {
  const fixed = getFixedProfileId();
  if (fixed && profiles.some((p) => p.id === fixed)) return fixed;

  const stored = normalizeProfileId(localStorage.getItem("profile"));
  if (stored && profiles.some((p) => p.id === stored)) return stored;
  return profiles[0].id;
}

function syncThemeScopedSections(profileId) {
  qsa("[data-theme-scope]").forEach((section) => {
    const raw = section.getAttribute("data-theme-scope") || "";
    const allowed = raw
      .split(/\s+/)
      .map((id) => normalizeProfileId(id.trim()))
      .filter(Boolean);
    const visible = allowed.length === 0 || allowed.includes(profileId);
    section.hidden = !visible;
    section.setAttribute("aria-hidden", String(!visible));
  });
}

const DEFAULT_PREVIEW_LAYOUT = [
  [
    {
      modifiers: ["preview-panel--tall"],
      lines: ["preview-line--short", "", "preview-line--med"],
      chip: true,
    },
    {
      lines: ["preview-line--short", "", "preview-line--tiny"],
    },
  ],
  [
    {
      modifiers: ["preview-panel--wide"],
      lines: ["preview-line--med", ""],
    },
  ],
];

const PROFILE_PREVIEW_LAYOUTS = {
  "modern-saas": [
    [
      {
        modifiers: ["preview-panel--tall"],
        lines: ["preview-line--short", "", "preview-line--med"],
        chip: true,
      },
      {
        lines: ["preview-line--tiny", "", "preview-line--short", "preview-line--med"],
      },
    ],
    [
      {
        modifiers: ["preview-panel--wide"],
        lines: ["preview-line--short", "", "preview-line--med"],
        chip: true,
      },
    ],
  ],
  "cyberpunk-neon": [
    [
      {
        modifiers: ["preview-panel--tall"],
        lines: ["preview-line--med", "", "preview-line--tiny", ""],
      },
      {
        lines: ["preview-line--short", "", "preview-line--med", "preview-line--tiny"],
        chip: true,
      },
    ],
    [
      {
        modifiers: ["preview-panel--wide"],
        lines: ["preview-line--med", "preview-line--short", "", "preview-line--tiny"],
      },
    ],
  ],
  "arctic-mono": [
    [
      {
        modifiers: ["preview-panel--tall"],
        lines: ["preview-line--med", "preview-line--short", "", "preview-line--tiny"],
      },
      {
        lines: ["preview-line--short", "", "preview-line--med"],
      },
    ],
    [
      {
        modifiers: ["preview-panel--wide"],
        lines: ["preview-line--tiny", "", "preview-line--med"],
      },
    ],
  ],
  "noire-editorial": [
    [
      {
        modifiers: ["preview-panel--tall"],
        lines: ["preview-line--tiny", "", "preview-line--med", "", "preview-line--short"],
      },
      {
        lines: ["preview-line--med", "", "preview-line--med"],
      },
    ],
    [
      {
        modifiers: ["preview-panel--wide"],
        lines: ["preview-line--short", "", "preview-line--short"],
      },
    ],
  ],
  "corporate-blueprint": [
    [
      {
        modifiers: ["preview-panel--tall"],
        lines: ["preview-line--short", "preview-line--med", "", "preview-line--med"],
        chip: true,
      },
      {
        lines: ["preview-line--short", "preview-line--short", "", "preview-line--tiny"],
      },
    ],
    [
      {
        modifiers: ["preview-panel--wide"],
        lines: ["preview-line--tiny", "", "preview-line--med", "preview-line--short"],
      },
    ],
  ],
  "retro-terminal": [
    [
      {
        modifiers: ["preview-panel--tall"],
        lines: ["preview-line--med", "", "preview-line--med", "", "preview-line--tiny"],
      },
      {
        lines: ["preview-line--short", "", "preview-line--short", "", "preview-line--tiny"],
      },
    ],
    [
      {
        modifiers: ["preview-panel--wide"],
        lines: ["preview-line--med", "", "preview-line--tiny", "", "preview-line--short"],
      },
    ],
  ],
  "pastel-dreamscape": [
    [
      {
        modifiers: ["preview-panel--tall"],
        lines: ["preview-line--short", "", "preview-line--med"],
        chip: true,
      },
      {
        lines: ["preview-line--tiny", "", "preview-line--short"],
        chip: true,
      },
    ],
    [
      {
        modifiers: ["preview-panel--wide"],
        lines: ["preview-line--med", "", "preview-line--short"],
      },
    ],
  ],
  "sunset-gradient": [
    [
      {
        modifiers: ["preview-panel--tall"],
        lines: ["preview-line--med", "", "preview-line--short"],
        chip: true,
      },
      {
        lines: ["preview-line--med", "preview-line--tiny"],
      },
    ],
    [
      {
        modifiers: ["preview-panel--wide"],
        lines: ["preview-line--short", "", "preview-line--med"],
      },
    ],
  ],
};

function createPreviewPanel(panelConfig) {
  const panel = document.createElement("div");
  panel.className = uniqueStrings(["preview-panel", ...(panelConfig.modifiers || [])]).join(" ");

  (panelConfig.lines || []).forEach((modifier) => {
    const line = document.createElement("div");
    line.className = uniqueStrings(["preview-line", modifier]).join(" ");
    panel.appendChild(line);
  });

  if (panelConfig.chip) {
    const chip = document.createElement("div");
    chip.className = "preview-chip";
    panel.appendChild(chip);
  }

  return panel;
}

function renderProfilePreview(profileId) {
  const stage = qs("[data-preview-stage]");
  if (!stage) return;

  const normalized = normalizeProfileId(profileId);
  const layout = PROFILE_PREVIEW_LAYOUTS[normalized] || DEFAULT_PREVIEW_LAYOUT;
  stage.dataset.previewProfile = normalized;
  stage.replaceChildren();

  layout.forEach((rowConfig) => {
    const row = document.createElement("div");
    row.className = "preview-row";
    rowConfig.forEach((panelConfig) => {
      row.appendChild(createPreviewPanel(panelConfig));
    });
    stage.appendChild(row);
  });
}

/* ── Theme ── */

function setTheme(theme) {
  document.documentElement.dataset.theme = theme;
  localStorage.setItem("theme", theme);
}

function getStoredTheme() {
  const stored = localStorage.getItem("theme");
  return stored === "light" || stored === "dark" ? stored : null;
}

/* ── Effects ── */

const EFFECTS_TIER_OPTIONS = [
  { id: "profile-default", label: "Effects: Profile Default" },
  { id: "off", label: "Effects: Off" },
  { id: "low", label: "Effects: Low" },
  { id: "medium", label: "Effects: Medium" },
  { id: "high", label: "Effects: High" },
  { id: "custom", label: "Effects: Custom" },
];

const GLITCH_MODE_OPTIONS = [
  { id: "once", label: "Glitch: Once" },
  { id: "twice", label: "Glitch: Twice" },
];

function normalizeEffectsTier(tier) {
  const allowed = EFFECTS_TIER_OPTIONS.map((t) => t.id);
  return allowed.includes(tier) ? tier : "profile-default";
}

function normalizeGlitchMode(mode) {
  const allowed = GLITCH_MODE_OPTIONS.map((m) => m.id);
  return allowed.includes(mode) ? mode : "twice";
}

function applyGlitchMode(mode) {
  const next = normalizeGlitchMode(mode);
  document.documentElement.dataset.effectsGlitchMode = next;
  localStorage.setItem("effects_glitch_mode", next);
}

function getInitialGlitchMode() {
  return normalizeGlitchMode(localStorage.getItem("effects_glitch_mode"));
}

function getTierEffectBudget(tier, maxEffects) {
  if (tier === "custom") return Math.min(12, maxEffects);
  if (tier === "low") return Math.min(3, maxEffects);
  if (tier === "medium") return Math.min(5, maxEffects);
  if (tier === "high") return Math.min(8, maxEffects);
  return 0;
}

function getTierMotionBudget(tier) {
  if (tier === "custom") return 4;
  if (tier === "low") return 1;
  if (tier === "medium") return 2;
  if (tier === "high") return 3;
  return 0;
}

function getRequestedTierCap(requestedTier, effectiveTier, maxEffects) {
  if (requestedTier === "off") return 0;
  if (requestedTier === "custom") {
    return Math.min(getTierEffectBudget("custom", maxEffects), maxEffects);
  }

  const budgetTier = requestedTier === "profile-default" ? effectiveTier : requestedTier;
  return Math.min(getTierEffectBudget(budgetTier, maxEffects), maxEffects);
}

function getEffectMap(config) {
  const map = new Map();
  (config.effects || []).forEach((e) => map.set(e.id, e));
  return map;
}

function getProfileEffectsConfig(profileId, effectsConfig) {
  const fallbackId = "modern-saas";
  return (
    effectsConfig.profileDefaults?.[profileId] ||
    effectsConfig.profileDefaults?.[fallbackId] ||
    { tier: "off", recipes: { low: [], medium: [], high: [] } }
  );
}

function getAllowedEffectsForProfile(profileId, effectsConfig) {
  return effectsConfig.profileMenus?.[profileId] || [];
}

function getEffectsFallbackPool(allowed, recipe, effectsConfig) {
  const effectMap = getEffectMap(effectsConfig);
  const prioritized = [...recipe, ...allowed];
  const unique = uniqueStrings(prioritized);
  const staticFirst = unique.filter((id) => !effectMap.get(id)?.continuousMotion);
  return staticFirst.length ? staticFirst : unique;
}

function getStoredEffectsState() {
  return {
    tier: normalizeEffectsTier(localStorage.getItem("effects_tier")),
    effects: uniqueStrings(safeParseArray(localStorage.getItem("effects_selected"))),
    allowIncompatible: localStorage.getItem("effects_allow_incompatible") === "true",
  };
}

function persistEffectsState(state) {
  localStorage.setItem("effects_tier", state.tier);
  localStorage.setItem("effects_selected", JSON.stringify(state.effects));
  localStorage.setItem(
    "effects_allow_incompatible",
    String(state.allowIncompatible === true)
  );
}

function findIncompatibleSelections(effects, effectsConfig) {
  const set = new Set(effects);
  return (effectsConfig.constraints?.incompatiblePairs || []).filter(([a, b]) => {
    return set.has(a) && set.has(b);
  });
}

function deriveCustomEffectiveTier(effects) {
  if (effects.length >= 8) return "high";
  if (effects.length >= 5) return "medium";
  return "low";
}

function enforceEffectsConstraints(effects, tier, effectsConfig, options = {}) {
  const effectMap = getEffectMap(effectsConfig);
  let next = [...effects];
  const maxEffects = effectsConfig.maxEffects || 12;
  const allowIncompatible = options.allowIncompatible === true;

  next = next.slice(0, Math.min(getTierEffectBudget(tier, maxEffects), maxEffects));

  const overlaySet = new Set(effectsConfig.constraints?.overlayExclusiveEffects || []);
  let overlaySeen = false;
  next = next.filter((id) => {
    if (!overlaySet.has(id)) return true;
    if (overlaySeen) return false;
    overlaySeen = true;
    return true;
  });

  if (!allowIncompatible) {
    (effectsConfig.constraints?.incompatiblePairs || []).forEach((pair) => {
      const [a, b] = pair;
      if (next.includes(a) && next.includes(b)) {
        next = next.filter((id) => id !== b);
      }
    });
  }

  const motionBudget = getTierMotionBudget(tier);
  let motionUsed = 0;
  next = next.filter((id) => {
    const meta = effectMap.get(id);
    if (!meta || !meta.continuousMotion) return true;
    if (motionUsed >= motionBudget) return false;
    motionUsed += 1;
    return true;
  });

  return next;
}

function resolveEffects(profileId, effectsConfig, requestedTier, requestedEffects, options = {}) {
  const tier = normalizeEffectsTier(requestedTier);
  const profileEffects = getProfileEffectsConfig(profileId, effectsConfig);
  const allowed = getAllowedEffectsForProfile(profileId, effectsConfig);
  const allowIncompatible = tier === "custom" && options.allowIncompatible === true;

  if (tier === "off") {
    return {
      requestedTier: tier,
      effectiveTier: "off",
      allowedEffects: allowed,
      effects: [],
      hasIncompatible: false,
    };
  }

  if (tier === "profile-default") {
    const effectiveTier = profileEffects.tier;
    if (effectiveTier === "off") {
      return {
        requestedTier: tier,
        effectiveTier: "off",
        allowedEffects: allowed,
        effects: [],
        hasIncompatible: false,
      };
    }

    const recipe = uniqueStrings(profileEffects.recipes?.[effectiveTier] || []).filter((id) =>
      allowed.includes(id)
    );
    let resolved = enforceEffectsConstraints(recipe, effectiveTier, effectsConfig);
    if (resolved.length === 0) {
      resolved = enforceEffectsConstraints(
        getEffectsFallbackPool(allowed, recipe, effectsConfig),
        effectiveTier,
        effectsConfig
      );
    }
    return {
      requestedTier: tier,
      effectiveTier,
      allowedEffects: allowed,
      effects: resolved,
      hasIncompatible: false,
    };
  }

  if (tier === "custom") {
    const profileTier = profileEffects.tier === "off" ? "low" : profileEffects.tier;
    const profileRecipe = uniqueStrings(profileEffects.recipes?.[profileTier] || []).filter((id) =>
      allowed.includes(id)
    );
    const requested = uniqueStrings(requestedEffects).filter((id) => allowed.includes(id));

    let resolved = requested.length ? requested : profileRecipe;
    resolved = enforceEffectsConstraints(resolved, "custom", effectsConfig, {
      allowIncompatible,
    });

    if (resolved.length === 0) {
      resolved = enforceEffectsConstraints(
        getEffectsFallbackPool(allowed, profileRecipe, effectsConfig),
        "custom",
        effectsConfig,
        { allowIncompatible }
      );
    }

    return {
      requestedTier: tier,
      effectiveTier: deriveCustomEffectiveTier(resolved),
      allowedEffects: allowed,
      effects: resolved,
      hasIncompatible: findIncompatibleSelections(resolved, effectsConfig).length > 0,
    };
  }

  const effectiveTier = tier;
  const requested = uniqueStrings(requestedEffects).filter((id) => allowed.includes(id));
  const recipe = uniqueStrings(profileEffects.recipes?.[effectiveTier] || []).filter((id) =>
    allowed.includes(id)
  );

  let resolved = requested.length === 0 ? recipe : requested;
  resolved = enforceEffectsConstraints(resolved, effectiveTier, effectsConfig);

  if (resolved.length === 0) {
    resolved = enforceEffectsConstraints(
      getEffectsFallbackPool(allowed, recipe, effectsConfig),
      effectiveTier,
      effectsConfig
    );
  }

  return {
    requestedTier: tier,
    effectiveTier,
    allowedEffects: allowed,
    effects: resolved,
    hasIncompatible: false,
  };
}

function applyEffectsClasses(resolved) {
  const root = document.documentElement;

  [...root.classList].forEach((name) => {
    if (name.startsWith("effects-tier-") || name.startsWith("effects-effect-")) {
      root.classList.remove(name);
    }
  });

  root.classList.add(`effects-tier-${resolved.effectiveTier}`);
  resolved.effects.forEach((id) => root.classList.add(`effects-effect-${id}`));

  root.dataset.effectsRequestedTier = resolved.requestedTier;
  root.dataset.effectsTier = resolved.effectiveTier;
  root.dataset.effectsSelected = resolved.effects.join(" ");
}

function renderEffectsTierControl(resolved) {
  const select = qs("[data-effects-tier-select]");
  if (!select) return;

  if (!select.options.length) {
    EFFECTS_TIER_OPTIONS.forEach((tier) => {
      const opt = document.createElement("option");
      opt.value = tier.id;
      opt.textContent = tier.label;
      select.appendChild(opt);
    });
  }

  select.value = resolved.requestedTier;
}

function renderEffectsLabel(resolved, effectsConfig) {
  const label = qs("[data-effects-list-label]");
  if (!label) return;

  if (resolved.requestedTier === "off") {
    label.textContent = "Effects (disabled while Effects is Off)";
    return;
  }

  const maxEffects = effectsConfig.maxEffects || 12;
  const cap = getRequestedTierCap(
    resolved.requestedTier,
    resolved.effectiveTier,
    maxEffects
  );

  if (resolved.requestedTier === "profile-default") {
    if (resolved.effectiveTier === "off") {
      label.textContent = "Effects (profile default is Off; toggle to enter Custom)";
      return;
    }
    label.textContent = `Effects (profile recipe, up to ${cap})`;
    return;
  }

  label.textContent = `Effects (pick up to ${cap})`;
}

function renderEffectsControl(resolved, effectsConfig) {
  const host = qs("[data-effects-list-toggles]");
  if (!host) return;

  const effectMap = getEffectMap(effectsConfig);
  host.innerHTML = "";
  const disabled = resolved.requestedTier === "off";
  const maxEffects = effectsConfig.maxEffects || 12;
  const cap = getRequestedTierCap(
    resolved.requestedTier,
    resolved.effectiveTier,
    maxEffects
  );

  resolved.allowedEffects.forEach((id) => {
    const meta = effectMap.get(id);
    const label = document.createElement("label");
    label.className = "toggle-switch effects-toggle";

    const input = document.createElement("input");
    input.type = "checkbox";
    input.value = id;
    input.checked = resolved.effects.includes(id);
    input.disabled = disabled;
    input.setAttribute("data-effects-toggle", "");
    input.setAttribute("aria-label", meta ? meta.name : id);

    const track = document.createElement("span");
    track.className = "toggle-switch__track";
    const thumb = document.createElement("span");
    thumb.className = "toggle-switch__thumb";
    track.appendChild(thumb);

    const text = document.createElement("span");
    text.className = "toggle-switch__label";
    text.textContent = meta ? meta.name : id;

    label.appendChild(input);
    label.appendChild(track);
    label.appendChild(text);
    host.appendChild(label);
  });

  host.dataset.cap = String(cap);
  host.dataset.disabled = String(disabled);
  host.setAttribute("aria-disabled", String(disabled));
}

function renderEffectsHelp(resolved, effectsConfig) {
  const help = qs("[data-effects-list-help]");
  const note = qs("[data-effects-list-note]");
  if (!help) return;

  if (resolved.effectiveTier === "off") {
    help.textContent =
      resolved.requestedTier === "profile-default"
        ? "Profile default includes: none."
        : "Tier includes: none.";
    if (note) {
      note.classList.remove("effects-list-note--warning");
      note.textContent =
        resolved.requestedTier === "profile-default"
          ? "Take note: this profile defaults Effects to Off. Toggle any effect to enter Effects: Custom."
          : "Take note: Effects is off. Switch to a tier to enable effects.";
    }
    return;
  }

  const effectMap = getEffectMap(effectsConfig);
  const names = resolved.effects.map((id) => effectMap.get(id)?.name || id);
  const maxEffects = effectsConfig.maxEffects || 12;
  const cap = getRequestedTierCap(
    resolved.requestedTier,
    resolved.effectiveTier,
    maxEffects
  );
  const prefix =
    resolved.requestedTier === "profile-default"
      ? "Profile default includes"
      : resolved.requestedTier === "custom"
        ? "Custom includes"
        : "Tier includes";
  const selected = names.length ? names.join(", ") : "none";
  help.textContent = `${prefix}: ${selected}.`;

  if (!note) return;
  note.classList.remove("effects-list-note--warning");

  if (resolved.requestedTier === "profile-default") {
    note.textContent = `Take note: profile default is active. Toggle any effect to enter Effects: Custom (up to ${cap} effect${cap === 1 ? "" : "s"}).`;
  } else if (resolved.requestedTier === "custom") {
    note.textContent = `Take note: You can check up to ${cap} effect${cap === 1 ? "" : "s"} in Effects: Custom.`;
  } else {
    note.textContent = `Take note: This tier supports up to ${cap} effect${cap === 1 ? "" : "s"}. Changing effects switches to Effects: Custom.`;
  }

  if (resolved.hasIncompatible) {
    note.classList.add("effects-list-note--warning");
    note.textContent += " Caution: conflicting effects are active by explicit override.";
  }
}

function confirmEffectsConflict(conflicts, effectsConfig) {
  const effectMap = getEffectMap(effectsConfig);
  const pairLabels = conflicts.map(([a, b]) => {
    const aName = effectMap.get(a)?.name || a;
    const bName = effectMap.get(b)?.name || b;
    return `${aName} + ${bName}`;
  });

  const panel = qs("[data-effects-confirm]");
  if (!panel) {
    return Promise.resolve(
      window.confirm(
        `These effects can clash visually: ${pairLabels.join(
          ", "
        )}.\n\nKeep both anyway?`
      )
    );
  }

  const dialog = qs(".effects-confirm__dialog", panel);
  const message = qs("[data-effects-confirm-message]", panel);
  const list = qs("[data-effects-confirm-list]", panel);
  const keepButton = qs("[data-effects-confirm-keep]", panel);
  const cancelButtons = qsa("[data-effects-confirm-cancel]", panel);

  if (!dialog || !keepButton || cancelButtons.length === 0 || !message || !list) {
    return Promise.resolve(
      window.confirm(
        `These effects can clash visually: ${pairLabels.join(
          ", "
        )}.\n\nKeep both anyway?`
      )
    );
  }

  message.textContent =
    "These selected effects can clash visually. Keep the combination anyway?";
  list.innerHTML = "";
  pairLabels.forEach((pair) => {
    const item = document.createElement("li");
    item.textContent = pair;
    list.appendChild(item);
  });

  panel.hidden = false;
  panel.setAttribute("aria-hidden", "false");

  const focusableSelector = [
    "button:not([disabled])",
    "a[href]",
    "input:not([disabled]):not([type='hidden'])",
    "select:not([disabled])",
    "textarea:not([disabled])",
    "[tabindex]:not([tabindex='-1'])",
  ].join(", ");

  const getFocusableElements = () =>
    qsa(focusableSelector, panel).filter((el) => {
      if (el.hasAttribute("disabled")) return false;
      if (el.getAttribute("aria-hidden") === "true") return false;
      const style = window.getComputedStyle(el);
      return style.display !== "none" && style.visibility !== "hidden";
    });

  const previousFocus =
    document.activeElement instanceof HTMLElement ? document.activeElement : null;
  const previousBodyOverflow = document.body.style.overflow;
  document.body.style.overflow = "hidden";

  return new Promise((resolve) => {
    let settled = false;

    const cleanup = () => {
      document.removeEventListener("keydown", onKeyDown);
      keepButton.removeEventListener("click", onKeep);
      cancelButtons.forEach((btn) => btn.removeEventListener("click", onCancel));
      document.body.style.overflow = previousBodyOverflow;
      panel.hidden = true;
      panel.setAttribute("aria-hidden", "true");
      if (previousFocus) previousFocus.focus();
    };

    const settle = (keep) => {
      if (settled) return;
      settled = true;
      cleanup();
      resolve(keep);
    };

    const onKeep = (event) => {
      event.preventDefault();
      settle(true);
    };

    const onCancel = (event) => {
      event.preventDefault();
      settle(false);
    };

    const onKeyDown = (event) => {
      if (event.key === "Escape") {
        event.preventDefault();
        settle(false);
        return;
      }

      if (event.key !== "Tab") return;

      const focusables = getFocusableElements();
      if (focusables.length === 0) {
        event.preventDefault();
        dialog.focus();
        return;
      }

      const first = focusables[0];
      const last = focusables[focusables.length - 1];
      const active = document.activeElement;

      if (!panel.contains(active)) {
        event.preventDefault();
        first.focus();
        return;
      }

      if (event.shiftKey && active === first) {
        event.preventDefault();
        last.focus();
        return;
      }

      if (!event.shiftKey && active === last) {
        event.preventDefault();
        first.focus();
      }
    };

    document.addEventListener("keydown", onKeyDown);
    keepButton.addEventListener("click", onKeep);
    cancelButtons.forEach((btn) => btn.addEventListener("click", onCancel));

    const focusables = getFocusableElements();
    if (focusables.length > 0) {
      focusables[0].focus();
    } else {
      dialog.focus();
    }
  });
}

function renderGlitchModeControl(resolved) {
  const select = qs("[data-glitch-mode-select]");
  if (!select) return;
  const field = qs("[data-glitch-mode-field]");
  const profileAllowsGlitch = resolved.allowedEffects.includes("glitch-burst");

  if (field) field.hidden = !profileAllowsGlitch;
  if (!profileAllowsGlitch) {
    select.disabled = true;
    return;
  }

  if (!select.options.length) {
    GLITCH_MODE_OPTIONS.forEach((mode) => {
      const opt = document.createElement("option");
      opt.value = mode.id;
      opt.textContent = mode.label;
      select.appendChild(opt);
    });
  }

  select.value = getInitialGlitchMode();
  select.disabled = !resolved.effects.includes("glitch-burst");
}

function initCursorSpotlightTracking() {
  const root = document.documentElement;
  const resetSpotlight = () => {
    root.style.setProperty("--effects-cursor-spotlight-x", "50%");
    root.style.setProperty("--effects-cursor-spotlight-y", "45%");
  };

  const updateSpotlight = (event) => {
    if (!root.classList.contains("effects-effect-cursor-spotlight")) return;

    const hero = qs(".hero");
    if (!hero) return;

    const rect = hero.getBoundingClientRect();
    if (rect.width <= 0 || rect.height <= 0) return;

    const insideX = ((event.clientX - rect.left) / rect.width) * 100;
    const insideY = ((event.clientY - rect.top) / rect.height) * 100;
    const x = Math.max(0, Math.min(100, insideX));
    const y = Math.max(0, Math.min(100, insideY));
    root.style.setProperty("--effects-cursor-spotlight-x", `${x.toFixed(2)}%`);
    root.style.setProperty("--effects-cursor-spotlight-y", `${y.toFixed(2)}%`);
  };

  document.addEventListener("pointermove", updateSpotlight, { passive: true });
  document.addEventListener("pointerleave", resetSpotlight, { passive: true });
  resetSpotlight();
}

function syncEffects(profileId, effectsConfig, state) {
  if (!effectsConfig) return;

  const resolved = resolveEffects(
    profileId,
    effectsConfig,
    state.tier,
    state.effects,
    { allowIncompatible: state.allowIncompatible === true }
  );

  applyEffectsClasses(resolved);
  renderEffectsTierControl(resolved);
  renderEffectsLabel(resolved, effectsConfig);
  renderEffectsControl(resolved, effectsConfig);
  renderEffectsHelp(resolved, effectsConfig);
  renderGlitchModeControl(resolved);

  persistEffectsState({
    tier: resolved.requestedTier,
    effects: resolved.effects,
    allowIncompatible:
      resolved.requestedTier === "custom" &&
      state.allowIncompatible === true &&
      resolved.hasIncompatible,
  });
}

async function loadEffectsConfig() {
  try {
    const res = await fetch("../shared/effects.json");
    if (!res.ok) {
      throw new Error(`shared effects.json request failed with ${res.status}`);
    }
    return await res.json();
  } catch (error) {
    const fixedId = getFixedProfileId() || "modern-saas";

    console.warn("Falling back to inline effects config.", error);
    return {
      version: 1,
      maxEffects: 12,
      tiers: ["profile-default", "off", "low", "medium", "high", "custom"],
      constraints: {
        overlayExclusiveEffects: [],
        incompatiblePairs: [],
      },
      effects: [],
      profileMenus: {
        [fixedId]: [],
      },
      profileDefaults: {
        [fixedId]: {
          tier: "off",
          recipes: {
            low: [],
            medium: [],
            high: [],
          },
        },
      },
    };
  }
}

/* ── Mobile menu ── */

function toggleMenu() {
  const button = qs("[data-menu-button]");
  const menu = qs("[data-mobile-menu]");
  if (!button || !menu) return;

  const isOpen = button.getAttribute("aria-expanded") === "true";
  const next = !isOpen;

  button.setAttribute("aria-expanded", String(next));
  menu.hidden = !next;
}

/* ── Controls modal ── */

function initControlsModal() {
  const modal = qs("[data-controls-modal]");
  if (!modal || typeof modal.showModal !== "function") return;

  qsa("[data-controls-open]").forEach((btn) => {
    btn.addEventListener("click", () => modal.showModal());
  });

  qsa("[data-controls-close]", modal).forEach((btn) => {
    btn.addEventListener("click", () => modal.close());
  });

  modal.addEventListener("click", (e) => {
    if (e.target === modal) modal.close();
  });
}

function initScopedCrosshair() {
  if (window.matchMedia("(pointer: coarse)").matches) return;

  const scopes = qsa(".blueprint-crosshair-scope");
  if (scopes.length === 0) return;

  scopes.forEach((scope) => {
    const coordLabel = qs("[data-crosshair-coord]", scope);

    const reset = () => {
      scope.style.setProperty("--crosshair-x", "50%");
      scope.style.setProperty("--crosshair-y", "50%");
      if (coordLabel) coordLabel.textContent = "";
    };

    scope.addEventListener(
      "pointermove",
      (event) => {
        if (document.documentElement.dataset.profile !== CORPORATE_PROFILE_ID) return;
        const rect = scope.getBoundingClientRect();
        if (rect.width <= 0 || rect.height <= 0) return;

        const localX = Math.max(0, Math.min(rect.width, event.clientX - rect.left));
        const localY = Math.max(0, Math.min(rect.height, event.clientY - rect.top));
        const percentX = (localX / rect.width) * 100;
        const percentY = (localY / rect.height) * 100;

        scope.style.setProperty("--crosshair-x", `${percentX.toFixed(2)}%`);
        scope.style.setProperty("--crosshair-y", `${percentY.toFixed(2)}%`);

        if (coordLabel) {
          coordLabel.textContent = `${Math.round(localX)}, ${Math.round(localY)}`;
        }
      },
      { passive: true }
    );

    scope.addEventListener("pointerleave", reset, { passive: true });
    window.addEventListener("profilechange", reset);
    reset();
  });
}

function initBlueprintNavScrollState() {
  const header = qs(".site-header");
  if (!header) return;

  const applyState = () => {
    const enabled = document.documentElement.dataset.profile === CORPORATE_PROFILE_ID;
    const scrolled = window.scrollY > 24;
    header.classList.toggle("blueprint-scrolled", enabled && scrolled);
  };

  window.addEventListener("scroll", applyState, { passive: true });
  window.addEventListener("resize", applyState, { passive: true });
  applyState();
}

/* ── Toast ── */

function showToast(message) {
  const toast = qs("[data-toast]");
  if (!toast) return;

  toast.textContent = message;
  toast.hidden = false;

  window.clearTimeout(showToast._t);
  showToast._t = window.setTimeout(() => {
    toast.hidden = true;
  }, 1600);
}

/* ── Footer year ── */

function setYear() {
  const el = qs("[data-year]");
  if (el) el.textContent = String(new Date().getFullYear());
}

function setProfile(profileId, profiles, effectsConfig, options = {}) {
  const normalized = normalizeProfileId(getFixedProfileId() || profileId);
  const profile = profiles.find((p) => p.id === normalized);
  if (!profile) return;
  const fixedProfileId = getFixedProfileId();
  const fixedStylesheet = getFixedProfileStylesheet();
  const respectStoredTheme = !fixedProfileId && options.respectStoredTheme === true;

  document.documentElement.dataset.profile = normalized;
  syncThemeScopedSections(normalized);
  renderProfilePreview(normalized);

  let link = qs("#profile-stylesheet");
  if (!link) {
    link = document.createElement("link");
    link.id = "profile-stylesheet";
    link.rel = "stylesheet";
    document.head.appendChild(link);
  }
  link.href = fixedProfileId && normalized === fixedProfileId && fixedStylesheet
    ? fixedStylesheet
    : profile.file;
  link.addEventListener(
    "load",
    () => {
      if (document.documentElement.dataset.profile === ARCTIC_PROFILE_ID) {
        refreshArcticVisualLayout();
      }
    },
    { once: true }
  );

  localStorage.setItem("profile", normalized);

  if (profile.defaultTheme && !(respectStoredTheme && getStoredTheme())) {
    setTheme(profile.defaultTheme);
  }

  const select = qs("[data-profile-select]");
  if (select) select.value = normalized;

  if (effectsConfig) {
    syncEffects(normalized, effectsConfig, getStoredEffectsState());
  }

  setRetroMode(normalized === RETRO_PROFILE_ID);
  setCorporateMode(normalized === CORPORATE_PROFILE_ID);
  setArcticMode(normalized === ARCTIC_PROFILE_ID);
  setNoireMode(normalized === NOIRE_PROFILE_ID);
  window.dispatchEvent(new Event("profilechange"));
}

/* ── Event wiring ── */

/* ── Pricing toggle ── */

function initPricingToggle() {
  const toggles = qsa("[data-billing]");
  if (!toggles.length) return;

  toggles.forEach((btn) => {
    btn.addEventListener("click", () => {
      const billing = btn.dataset.billing;
      toggles.forEach((b) => {
        const isActive = b === btn;
        b.classList.toggle("pricing-toggle__option--active", isActive);
        b.setAttribute("aria-checked", String(isActive));
      });

      qsa("[data-price-monthly]").forEach((el) => {
        const value = el.dataset[billing === "annual" ? "priceAnnual" : "priceMonthly"];
        const display = qs("[data-price-value]", el);
        if (display) display.textContent = value;
      });
    });
  });
}

function wireEvents(profiles, effectsConfig) {
  const menuBtn = qs("[data-menu-button]");
  if (menuBtn) menuBtn.addEventListener("click", toggleMenu);

  // Close mobile menu when clicking a link
  qsa(".mobile-nav-list a").forEach((a) => {
    a.addEventListener("click", () => {
      const menu = qs("[data-mobile-menu]");
      const button = qs("[data-menu-button]");
      if (!menu || !button) return;
      menu.hidden = true;
      button.setAttribute("aria-expanded", "false");
    });
  });

  const themeBtn = qs("[data-theme-toggle]");
  if (themeBtn) {
    themeBtn.addEventListener("click", () => {
      const current = document.documentElement.dataset.theme || "dark";
      setTheme(current === "dark" ? "light" : "dark");
    });
  }

  const profileSelect = qs("[data-profile-select]");
  if (profileSelect) {
    profileSelect.addEventListener("change", () => {
      setProfile(profileSelect.value, profiles, effectsConfig);
    });
  }

  const tierSelect = qs("[data-effects-tier-select]");
  if (tierSelect && effectsConfig) {
    tierSelect.addEventListener("change", () => {
      const profile = normalizeProfileId(localStorage.getItem("profile"));
      const nextTier = normalizeEffectsTier(tierSelect.value);
      if (nextTier === "custom") {
        const previous = getStoredEffectsState();
        syncEffects(profile, effectsConfig, {
          tier: "custom",
          effects: previous.effects,
          allowIncompatible: previous.allowIncompatible,
        });
        return;
      }
      syncEffects(profile, effectsConfig, {
        tier: nextTier,
        // Tier switches should snap to the profile recipe for that tier.
        // Users can then refine effects in the effects control.
        effects: [],
        allowIncompatible: false,
      });
    });
  }

  const effectsToggles = qs("[data-effects-list-toggles]");
  if (effectsToggles && effectsConfig) {
    effectsToggles.addEventListener("change", async (e) => {
      const input = e.target;
      if (
        !(input instanceof HTMLInputElement) ||
        !input.hasAttribute("data-effects-toggle")
      ) {
        return;
      }

      const nextTier = "custom";
      const profile = normalizeProfileId(localStorage.getItem("profile"));

      let effects = uniqueStrings(
        qsa("input[data-effects-toggle]:checked", effectsToggles).map(
          (toggle) => toggle.value
        )
      );

      const hardCap = effectsConfig.maxEffects || 12;
      const tierBudget = getTierEffectBudget(nextTier, hardCap);
      const cap = Math.min(hardCap, tierBudget);

      if (effects.length > cap) {
        effects = effects.slice(0, cap);
        qsa("input[data-effects-toggle]", effectsToggles).forEach((toggle) => {
          toggle.checked = effects.includes(toggle.value);
        });
        showToast(`Effects limited to ${cap} effect${cap === 1 ? "" : "s"} for this tier.`);
      }

      const conflicts = findIncompatibleSelections(effects, effectsConfig);
      let allowIncompatible = false;
      if (conflicts.length > 0) {
        const keep = await confirmEffectsConflict(conflicts, effectsConfig);
        if (!keep) {
          showToast("Choose a non-conflicting effects combination.");
          syncEffects(profile, effectsConfig, getStoredEffectsState());
          return;
        }
        allowIncompatible = true;
      }

      syncEffects(profile, effectsConfig, {
        tier: nextTier,
        effects,
        allowIncompatible,
      });
    });
  }

  const glitchModeSelect = qs("[data-glitch-mode-select]");
  if (glitchModeSelect) {
    glitchModeSelect.addEventListener("change", () => {
      const mode = normalizeGlitchMode(glitchModeSelect.value);
      applyGlitchMode(mode);

      // Restart one-shot glitch so mode changes are visible immediately.
      const root = document.documentElement;
      if (root.classList.contains("effects-effect-glitch-burst")) {
        root.classList.remove("effects-effect-glitch-burst");
        void root.offsetWidth;
        root.classList.add("effects-effect-glitch-burst");
      }
    });
  }

  const toastBtn = qs("[data-toast-button]");
  if (toastBtn) {
    toastBtn.addEventListener("click", () => {
      showToast("Saved.");
    });
  }

  const form = qs("[data-contact-form]");
  if (form) {
    form.addEventListener("submit", (e) => {
      e.preventDefault();

      const name = qs("#name");
      const message = qs("#message");

      const errors = [
        { field: "name", ok: name && name.value.trim().length > 0 },
        { field: "message", ok: message && message.value.trim().length > 0 },
      ];

      let allOk = true;
      errors.forEach(({ field, ok }) => {
        const err = qs(`[data-error-for="${field}"]`);
        if (!err) return;
        err.hidden = ok;
        if (!ok) allOk = false;
      });

      if (!allOk) {
        showToast("Fix the highlighted fields.");
        return;
      }

      if (isRetroActive()) {
        let status = qs(".retro-contact-status", form);
        if (!status) {
          status = document.createElement("p");
          status.className = "retro-contact-status";
          form.appendChild(status);
        }

        const submitButton = qs('button[type="submit"]', form);
        if (submitButton) submitButton.setAttribute("disabled", "true");
        status.textContent = ">> Encrypting payload (AES-256-GCM)...";

        const step2 = window.setTimeout(() => {
          status.textContent = ">> Routing through secure channel...";
        }, 620);
        const step3 = window.setTimeout(() => {
          status.textContent =
            ">> Transmission received. Operator response ETA: < 4 hours.";
          if (submitButton) submitButton.removeAttribute("disabled");
          showToast("Secure message transmitted.");
          form.reset();
        }, 1450);
        retroState.bootTimerIds.push(step2, step3);
        return;
      }

      showToast("Message ready (demo).");
      form.reset();
    });
  }
}

/* ── Init ── */

(async function init() {
  setYear();
  applyGlitchMode(getInitialGlitchMode());
  initCursorSpotlightTracking();
  initScopedCrosshair();
  initBlueprintNavScrollState();
  initControlsModal();
  initPricingToggle();

  const [profiles, effectsConfig] = await Promise.all([
    loadProfiles(),
    loadEffectsConfig(),
  ]);

  const initialProfile = getInitialProfile(profiles);
  const shouldRespectStoredTheme = !getFixedProfileId();
  const storedTheme = shouldRespectStoredTheme ? getStoredTheme() : null;
  if (storedTheme) setTheme(storedTheme);
  setProfile(initialProfile, profiles, effectsConfig, {
    respectStoredTheme: shouldRespectStoredTheme,
  });

  if (!document.documentElement.dataset.theme) setTheme("dark");
  syncEffects(initialProfile, effectsConfig, getStoredEffectsState());

  wireEvents(profiles, effectsConfig);
})();
