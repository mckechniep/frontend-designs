/* Components Page JS
   - Profile/theme switcher
   - Effects tier/effects switcher (persisted, style-scoped)
   - Mobile menu toggle
   - Modal, Tabs, Accordion, Data Table, Ticker, Carousel, Progress, Chips, Banners
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
const CYBERPUNK_PROFILE_ID = "cyberpunk-neon";
const RETRO_SECTION_ORDER = ["hero", "modals", "tabs", "accordion", "data-table"];
const CYBERPUNK_READOUT_LINES = [
  "trace://matrix-columns :: renderer online",
  "diag://feature-cards :: neon rain active",
  "ops://ui-core :: clipped geometry locked",
  "net://edge-gateway :: low-latency stable",
];
const RETRO_NAV_COMMANDS = {
  "./index.html": "./welcome.sh",
  "./components.html": "cat components.conf",
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
  "  ├─ ui-shell ................................ [ACTIVE]",
  "  ├─ component-registry ...................... [ACTIVE]",
  "  ├─ threat-intel-demo ....................... [ACTIVE]",
  "  └─ diagnostics-feed ........................ [ACTIVE]",
  "",
  "NEXUS SENTINEL COMPONENT CONSOLE v4.2.1",
  "All systems operational. Establishing secure session...",
];
const RETRO_ASCII_LOGO = String.raw` ███╗   ██╗███████╗██╗  ██╗██╗   ██╗███████╗
 ████╗  ██║██╔════╝╚██╗██╔╝██║   ██║██╔════╝
 ██╔██╗ ██║█████╗   ╚███╔╝ ██║   ██║███████╗
 ██║╚██╗██║██╔══╝   ██╔██╗ ██║   ██║╚════██║
 ██║ ╚████║███████╗██╔╝ ██╗╚██████╔╝███████║
 ╚═╝  ╚═══╝╚══════╝╚═╝  ╚═╝ ╚═════╝ ╚══════╝
  ██████╗ ██████╗ ███╗   ███╗██████╗  ██████╗ ███╗   ██╗███████╗███╗   ██╗████████╗███████╗
 ██╔════╝██╔═══██╗████╗ ████║██╔══██╗██╔═══██╗████╗  ██║██╔════╝████╗  ██║╚══██╔══╝██╔════╝
 ██║     ██║   ██║██╔████╔██║██████╔╝██║   ██║██╔██╗ ██║█████╗  ██╔██╗ ██║   ██║   ███████╗
 ██║     ██║   ██║██║╚██╔╝██║██╔═══╝ ██║   ██║██║╚██╗██║██╔══╝  ██║╚██╗██║   ██║   ╚════██║
 ╚██████╗╚██████╔╝██║ ╚═╝ ██║██║     ╚██████╔╝██║ ╚████║███████╗██║ ╚████║   ██║   ███████║
  ╚═════╝ ╚═════╝ ╚═╝     ╚═╝╚═╝      ╚═════╝ ╚═╝  ╚═══╝╚══════╝╚═╝  ╚═══╝   ╚═╝   ╚══════╝`;
const RETRO_TYPING_LINES = [
  ">> NEXUS SENTINEL COMPONENT SHOWCASE v4.2.1",
  ">> Initializing demo modules and control surfaces...",
  ">> Status: INTERACTIVE SYSTEMS NOMINAL",
  ">> Keyboard nav: j/k or arrows, 1-5 for section jumps",
  ">> Loadout ready. Continue to module inspection.",
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
};

const cyberpunkState = {
  readoutIntervalId: null,
  readoutIndex: 0,
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
  const ctas = qsa(".nav .button-primary, .nav .button-ghost");
  ctas.forEach((button) => {
    if (!button.dataset.originalLabel) {
      button.dataset.originalLabel = (button.textContent || "").trim();
    }
  });

  const navPrimary = qs(".nav .button-primary");
  if (navPrimary) {
    navPrimary.textContent = active ? "ssh contact@nexus" : navPrimary.dataset.originalLabel;
  }
  const navGhost = qs(".nav .button-ghost");
  if (navGhost) {
    navGhost.textContent = active ? "sudo controls --open" : navGhost.dataset.originalLabel;
  }
}

function ensureRetroHeroElements() {
  const hero = qs(".hero .container") || qs(".hero");
  if (!hero) return;

  let logo = qs(".retro-ascii-logo", hero);
  if (!logo) {
    logo = document.createElement("pre");
    logo.className = "retro-ascii-logo";
    logo.setAttribute("aria-hidden", "true");
    logo.textContent = RETRO_ASCII_LOGO;
    const heading = qs(".h1", hero);
    if (heading) hero.insertBefore(logo, heading);
  }

  let feed = qs(".retro-typing-feed", hero);
  if (!feed) {
    feed = document.createElement("div");
    feed.className = "retro-typing-feed";
    RETRO_TYPING_LINES.forEach((line) => {
      const row = document.createElement("p");
      row.className = "retro-typing-line";
      row.textContent = line;
      feed.appendChild(row);
    });
    const lead = qs(".lead", hero);
    if (lead) lead.insertAdjacentElement("afterend", feed);
    else hero.appendChild(feed);
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
  const section = qs("#data-table .container") || qs(".hero .container");
  if (!section) return;

  let panel = qs(".retro-threat-panel", section);
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
    const head = qs(".section-head", section);
    if (head) head.insertAdjacentElement("afterend", panel);
    else section.appendChild(panel);
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
    "TLS downgrade attempt intercepted",
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
    sectionId === "footer" ? qs(".site-footer") : sectionId === "hero" ? qs(".hero") : qs(`#${sectionId}`);
  if (!target) return;
  target.scrollIntoView({ behavior: "smooth", block: "start" });
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

    const anchors = RETRO_SECTION_ORDER.map((id) =>
      id === "hero" ? qs(".hero") : qs(`#${id}`)
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
    }
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

function ensureCorporateHeroBadge(active) {
  const badge = qs(".hero .badge");
  if (!badge) return;

  if (!badge.dataset.originalText) {
    badge.dataset.originalText = (badge.textContent || "").trim();
  }

  if (!active) {
    if (badge.dataset.originalText) badge.textContent = badge.dataset.originalText;
    badge.removeAttribute("data-corp-counter");
    badge.removeAttribute("data-corp-target");
    badge.removeAttribute("data-corp-suffix");
    return;
  }

  badge.dataset.corpCounter = "true";
  badge.dataset.corpTarget = "10";
  badge.dataset.corpSuffix = " Component Sets";
  badge.textContent = "0 Component Sets";
}

function animateCorporateBadgeCounter() {
  const badge = qs("[data-corp-counter='true']");
  if (!badge) return;

  const target = Number(badge.dataset.corpTarget || "0");
  const suffix = badge.dataset.corpSuffix || "";
  const duration = 1100;
  const start = performance.now();
  const easeOut = (t) => 1 - (1 - t) ** 3;

  const tick = (now) => {
    const progress = Math.min(1, (now - start) / duration);
    const value = Math.round(target * easeOut(progress));
    badge.textContent = `${value}${suffix}`;
    if (progress < 1) window.requestAnimationFrame(tick);
  };

  window.requestAnimationFrame(tick);
}

function runCorporateRevealSequence() {
  disconnectCorporateRevealObserver();

  const targets = [
    ...qsa(".hero .badge, .hero .h1, .hero .lead"),
    ...qsa("#modals .section-head, #modals .demo-actions"),
    ...qsa("#tabs .section-head, #tabs .tabs"),
    ...qsa("#accordion .section-head, #accordion .accordion"),
    ...qsa("#data-table .section-head, #data-table .data-table-wrapper"),
    ...qsa("#capability-ticker .section-head, #capability-ticker .ticker"),
    ...qsa("#portfolio-carousel .section-head, #portfolio-carousel .portfolio-carousel"),
    ...qsa("#progress .section-head, #progress .progress-demo"),
    ...qsa("#controls-media .section-head, #controls-media .controls-media-grid"),
    ...qsa("#avatars .section-head, #avatars .avatars-grid"),
    ...qsa("#banners .section-head, #banners .banner-stack"),
  ];

  if (targets.length === 0) return;

  targets.forEach((el, index) => {
    el.classList.add("blueprint-reveal-target");
    el.classList.remove("is-revealed");
    el.style.setProperty("--reveal-delay", `${Math.min(index * 55, 480)}ms`);
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
    { threshold: 0.16, rootMargin: "0px 0px -48px 0px" }
  );

  targets.forEach((el) => corporateState.revealObserver.observe(el));
}

function setCorporateMode(active) {
  document.documentElement.classList.toggle("corporate-blueprint-mode", active);
  ensureCorporateHeroBadge(active);

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
      animateCorporateBadgeCounter();
    }
  }, 220);
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

  const count = Math.max(18, Math.min(84, Math.floor((width * height) / 26000)));
  arcticState.frostParticles = Array.from({ length: count }, () => ({
    x: Math.random() * width,
    y: Math.random() * height,
    r: Math.random() * 1.1 + 0.24,
    dx: (Math.random() - 0.5) * 0.08,
    dy: Math.random() * 0.1 + 0.015,
    tw: Math.random() * Math.PI * 2,
    alphaBase: Math.random() * 0.11 + 0.02,
    alphaSwing: Math.random() * 0.06 + 0.015,
    alpha: 0.05,
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
    p.tw += 0.006 * step;
    p.alpha = p.alphaBase + ((Math.sin(p.tw) + 1) * 0.5 * p.alphaSwing);

    if (p.y > height + 10) {
      p.y = -10;
      p.x = Math.random() * width;
    }
    if (p.x < -10) p.x = width + 10;
    if (p.x > width + 10) p.x = -10;

    ctx.beginPath();
    ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
    ctx.fillStyle = `rgba(218, 236, 248, ${p.alpha.toFixed(3)})`;
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
  const host = qs(".hero .container") || qs(".hero");
  if (!host) return;
  let wrap = qs(".arctic-helix-wrap", host);
  if (!wrap) {
    wrap = document.createElement("div");
    wrap.className = "arctic-helix-wrap";
    wrap.innerHTML = '<canvas class="arctic-helix-canvas" aria-hidden="true"></canvas>';
    host.appendChild(wrap);
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
  const radius = Math.min(w, h) * 0.22;
  const spread = Math.min(w, h) * 0.34;
  const points = 40;

  for (let i = 0; i < points; i += 1) {
    const p = (i / (points - 1)) * 2 - 1;
    const y = cy + p * spread;
    const wave = p * 5.2 + t;
    const x1 = cx + Math.cos(wave) * radius;
    const x2 = cx + Math.cos(wave + Math.PI) * radius;
    const z = Math.sin(wave);

    if (i % 3 === 0) {
      ctx.beginPath();
      ctx.moveTo(x1, y);
      ctx.lineTo(x2, y);
      ctx.strokeStyle = `rgba(126,200,227,${(0.08 + (z + 1) * 0.08).toFixed(3)})`;
      ctx.lineWidth = 1;
      ctx.stroke();
    }

    ctx.beginPath();
    ctx.arc(x1, y, 1.4 + (z + 1) * 1.2, 0, Math.PI * 2);
    ctx.fillStyle = `rgba(126,200,227,${(0.26 + (z + 1) * 0.22).toFixed(3)})`;
    ctx.fill();

    ctx.beginPath();
    ctx.arc(x2, y, 1.4 + (1 - z) * 1.2, 0, Math.PI * 2);
    ctx.fillStyle = `rgba(163,223,240,${(0.2 + (1 - z) * 0.2).toFixed(3)})`;
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

  const p00H = iso(x, y, z + h);
  const pW0H = iso(x + w, y, z + h);
  const pWDH = iso(x + w, y + d, z + h);
  const p0DH = iso(x, y + d, z + h);
  const pW00 = iso(x + w, y, z);
  const pWD0 = iso(x + w, y + d, z);
  const p0D0 = iso(x, y + d, z);

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

  ctx.fillStyle = "rgba(10, 20, 30, 0.34)";
  ctx.fillRect(0, 0, w, h);

  ctx.save();
  ctx.globalAlpha = 0.26;
  ctx.strokeStyle = "rgba(126, 200, 227, 0.28)";
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

  const tileW = Math.max(12, Math.min(19, w * 0.034));
  const tileH = tileW * 0.56;
  const unitH = tileH * 1.7;
  const originX = w * 0.52;
  const originY = h * 0.77;
  const labels = resolveArcticBlueprintLabels();
  const scanX = (t * 82) % (w + 60) - 30;

  const prisms = [
    { x: -3.8, y: -1.4, z: 0, w: 2.3, d: 1.9, h: 1.7, name: labels[0] },
    { x: -1.0, y: -2.4, z: 0, w: 2.0, d: 1.6, h: 1.3, name: labels[1] },
    { x: 1.5, y: -1.2, z: 0, w: 2.4, d: 2.0, h: 2.0, name: labels[2] },
    { x: 0.3, y: 1.3, z: 0, w: 2.1, d: 1.7, h: 1.2, name: "STACK" },
  ].map((p, i) => ({
    ...p,
    top: `rgba(163, 223, 240, ${0.16 + i * 0.03})`,
    left: `rgba(72, 118, 145, ${0.42 + i * 0.03})`,
    right: `rgba(95, 150, 182, ${0.34 + i * 0.03})`,
    stroke: "rgba(163, 223, 240, 0.58)",
    depth: p.x + p.y + p.z,
  }));

  prisms.sort((a, b) => a.depth - b.depth);
  const tops = prisms.map((prism) => drawIsoPrism(ctx, prism, tileW, tileH, unitH, originX, originY));

  ctx.strokeStyle = "rgba(163, 223, 240, 0.42)";
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

  ctx.strokeStyle = "rgba(163, 223, 240, 0.24)";
  ctx.beginPath();
  ctx.moveTo(scanX, 0);
  ctx.lineTo(scanX, h);
  ctx.stroke();

  ctx.font = "11px var(--font-mono, monospace)";
  ctx.fillStyle = "rgba(205, 235, 248, 0.72)";
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

function ensureArcticHeroBadge(active) {
  const badge = qs(".hero .badge");
  if (!badge) return;
  if (!badge.dataset.originalText) {
    badge.dataset.originalText = (badge.textContent || "").trim();
  }

  if (!active) {
    if (badge.dataset.originalText) badge.textContent = badge.dataset.originalText;
    badge.removeAttribute("data-arctic-counter");
    badge.removeAttribute("data-arctic-target");
    badge.removeAttribute("data-arctic-suffix");
    return;
  }

  badge.dataset.arcticCounter = "true";
  badge.dataset.arcticTarget = "12";
  badge.dataset.arcticSuffix = " Active Modules";
  badge.textContent = "0 Active Modules";
}

function animateArcticBadgeCounter() {
  const badge = qs("[data-arctic-counter='true']");
  if (!badge) return;
  const target = Number(badge.dataset.arcticTarget || "0");
  const suffix = badge.dataset.arcticSuffix || "";
  const duration = 1050;
  const start = performance.now();
  const easeOutQuart = (t) => 1 - (1 - t) ** 4;

  const tick = (now) => {
    const progress = Math.min(1, (now - start) / duration);
    const value = Math.round(target * easeOutQuart(progress));
    badge.textContent = `${value}${suffix}`;
    if (progress < 1) window.requestAnimationFrame(tick);
  };

  window.requestAnimationFrame(tick);
}

function runArcticRevealSequence() {
  disconnectArcticRevealObserver();
  const targets = [
    ...qsa(".hero .badge, .hero .h1, .hero .lead, .arctic-blueprint-wrap"),
    ...qsa("#modals .section-head, #modals .demo-actions"),
    ...qsa("#tabs .section-head, #tabs .tabs"),
    ...qsa("#accordion .section-head, #accordion .accordion"),
    ...qsa("#data-table .section-head, #data-table .data-table-wrapper"),
    ...qsa("#capability-ticker .section-head, #capability-ticker .ticker"),
    ...qsa("#portfolio-carousel .section-head, #portfolio-carousel .portfolio-carousel"),
    ...qsa("#progress .section-head, #progress .progress-demo"),
    ...qsa("#controls-media .section-head, #controls-media .controls-media-grid"),
    ...qsa("#avatars .section-head, #avatars .avatars-grid"),
    ...qsa("#banners .section-head, #banners .banner-stack"),
  ];
  if (targets.length === 0) return;

  targets.forEach((el, index) => {
    el.classList.add("arctic-reveal-target");
    el.classList.remove("is-revealed");
    el.style.setProperty("--arctic-reveal-delay", `${Math.min(index * 55, 480)}ms`);
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
    { threshold: 0.16, rootMargin: "0px 0px -44px 0px" }
  );

  targets.forEach((el) => arcticState.revealObserver.observe(el));
}

function setArcticMode(active) {
  document.documentElement.classList.toggle("arctic-mono-mode", active);
  ensureArcticHeroBadge(active);

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

  startArcticFrostLayer();
  startArcticHelix();
  startArcticBlueprint();
  runArcticRevealSequence();
  window.setTimeout(() => {
    if (document.documentElement.dataset.profile === ARCTIC_PROFILE_ID) {
      animateArcticBadgeCounter();
    }
  }, 200);
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
  const hero = qs(".hero .container") || qs(".hero");
  if (!hero) return;

  let stamp = qs(".noire-classified-stamp", hero);
  if (!stamp) {
    stamp = document.createElement("span");
    stamp.className = "noire-classified-stamp";
    stamp.textContent = "Classified";
    const badge = qs(".badge", hero);
    if (badge) badge.insertAdjacentElement("afterend", stamp);
  }
  stamp.hidden = !active;
}

function ensureNoirePressStrip(active) {
  const hero = qs(".hero");
  if (!hero) return;

  let strip = qs(".noire-press-strip");
  if (!strip) {
    strip = document.createElement("div");
    strip.className = "noire-press-strip";
    strip.innerHTML =
      '<div class="noire-press-track" aria-hidden="true">PRESS FILE • CASE NOTES • ARCHIVE UPDATE • INVESTIGATION DESK • PRESS FILE • CASE NOTES • ARCHIVE UPDATE • INVESTIGATION DESK</div>';
    hero.insertAdjacentElement("afterend", strip);
  }
  strip.hidden = !active;
}

function runNoireRevealSequence() {
  disconnectNoireRevealObserver();
  const targets = [
    ...qsa(".hero .badge, .hero .h1, .hero .lead"),
    ...qsa("#modals .section-head, #modals .demo-actions"),
    ...qsa("#tabs .section-head, #tabs .tabs"),
    ...qsa("#accordion .section-head, #accordion .accordion"),
    ...qsa("#data-table .section-head, #data-table .data-table-wrapper"),
    ...qsa("#capability-ticker .section-head, #capability-ticker .ticker"),
    ...qsa("#portfolio-carousel .section-head, #portfolio-carousel .portfolio-carousel"),
    ...qsa("#progress .section-head, #progress .progress-demo"),
    ...qsa("#controls-media .section-head, #controls-media .controls-media-grid"),
    ...qsa("#avatars .section-head, #avatars .avatars-grid"),
    ...qsa("#banners .section-head, #banners .banner-stack"),
  ];
  if (targets.length === 0) return;

  targets.forEach((el, index) => {
    el.classList.add("noire-reveal-target");
    el.classList.remove("is-revealed");
    el.style.setProperty("--noire-reveal-delay", `${Math.min(index * 60, 520)}ms`);
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
  ensureNoirePressStrip(true);
  runNoireRevealSequence();
}

function stopCyberpunkReadoutTicker() {
  if (cyberpunkState.readoutIntervalId) {
    window.clearInterval(cyberpunkState.readoutIntervalId);
    cyberpunkState.readoutIntervalId = null;
  }
}

function ensureCyberpunkReadout(active) {
  const head = qs("#features .section-head");
  if (!head) return;

  let readout = qs(".cyber-terminal-readout", head);
  if (!readout) {
    readout = document.createElement("div");
    readout.className = "cyber-terminal-readout";
    readout.setAttribute("aria-live", "polite");
    readout.innerHTML = `
      <div class="cyber-terminal-readout__header">
        <span>ops@neon-grid:~ / feature_stream</span>
        <span class="cyber-terminal-readout__signal" aria-hidden="true"></span>
      </div>
      <div class="cyber-terminal-readout__body">
        <p>$ tail -f project_cards.log</p>
        <p class="cyber-terminal-readout__line"><span data-cyber-readout-line></span><span class="cyber-terminal-readout__cursor" aria-hidden="true">_</span></p>
      </div>`;
    head.appendChild(readout);
  }

  const line = qs("[data-cyber-readout-line]", readout);
  if (!line) return;

  readout.hidden = !active;
  stopCyberpunkReadoutTicker();
  if (!active) return;

  line.textContent =
    CYBERPUNK_READOUT_LINES[cyberpunkState.readoutIndex % CYBERPUNK_READOUT_LINES.length];

  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

  cyberpunkState.readoutIntervalId = window.setInterval(() => {
    cyberpunkState.readoutIndex =
      (cyberpunkState.readoutIndex + 1) % CYBERPUNK_READOUT_LINES.length;
    line.textContent = CYBERPUNK_READOUT_LINES[cyberpunkState.readoutIndex];
  }, 1800);
}

function setCyberpunkMode(active) {
  document.documentElement.classList.toggle("cyberpunk-neon-mode", active);
  ensureCyberpunkReadout(active);
  if (!active) stopCyberpunkReadoutTicker();
}

/* ── Profile switching ── */

async function loadProfiles() {
  const res = await fetch("./profiles.json");
  const profiles = await res.json();

  const select = qs("[data-profile-select]");
  if (select) {
    profiles.forEach((p) => {
      const opt = document.createElement("option");
      opt.value = p.id;
      opt.textContent = p.name;
      select.appendChild(opt);
    });
  }

  return profiles;
}

function getInitialProfile(profiles) {
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
  const res = await fetch("./effects.json");
  return res.json();
}

function setProfile(profileId, profiles, effectsConfig, options = {}) {
  const normalized = normalizeProfileId(profileId);
  const profile = profiles.find((p) => p.id === normalized);
  if (!profile) return;
  const respectStoredTheme = options.respectStoredTheme === true;

  document.documentElement.dataset.profile = normalized;
  syncThemeScopedSections(normalized);

  let link = qs("#profile-stylesheet");
  if (!link) {
    link = document.createElement("link");
    link.id = "profile-stylesheet";
    link.rel = "stylesheet";
    document.head.appendChild(link);
  }
  link.href = "./" + profile.file;

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
  setCyberpunkMode(normalized === CYBERPUNK_PROFILE_ID);
}

/* ── Mobile menu ── */

function toggleMenu() {
  const button = qs("[data-menu-button]");
  const menu = qs("[data-mobile-menu]");
  if (!button || !menu) return;

  const isOpen = button.getAttribute("aria-expanded") === "true";
  button.setAttribute("aria-expanded", String(!isOpen));
  menu.hidden = isOpen;
}

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

/* ── Footer year ── */

function setYear() {
  const el = qs("[data-year]");
  if (el) el.textContent = String(new Date().getFullYear());
}

/* ══════════════════════════════════════
   Component initializers
   ══════════════════════════════════════ */

/* ── 1. Modals ── */

function initModals() {
  qsa("[data-modal-trigger]").forEach((trigger) => {
    trigger.addEventListener("click", () => {
      const id = trigger.getAttribute("data-modal-trigger");
      const modal = document.getElementById(id);
      if (modal && modal.showModal) modal.showModal();
    });
  });

  qsa("[data-modal]").forEach((modal) => {
    // Close buttons inside modal
    qsa("[data-modal-close]", modal).forEach((btn) => {
      btn.addEventListener("click", () => modal.close());
    });

    // Click on backdrop (::backdrop) closes modal
    modal.addEventListener("click", (e) => {
      if (e.target === modal) modal.close();
    });
  });
}

/* ── 2. Tabs ── */

function initTabs() {
  qsa("[role='tablist']").forEach((tablist) => {
    const tabs = qsa("[role='tab']", tablist);

    function activateTab(tab) {
      tabs.forEach((t) => {
        t.setAttribute("aria-selected", "false");
        t.setAttribute("tabindex", "-1");
        const panel = qs(`[data-tab-panel="${t.dataset.tab}"]`);
        if (panel) panel.hidden = true;
      });

      tab.setAttribute("aria-selected", "true");
      tab.removeAttribute("tabindex");
      tab.focus();

      const panel = qs(`[data-tab-panel="${tab.dataset.tab}"]`);
      if (panel) panel.hidden = false;
    }

    tabs.forEach((tab) => {
      tab.addEventListener("click", () => activateTab(tab));
    });

    // Arrow key navigation
    tablist.addEventListener("keydown", (e) => {
      const current = tabs.findIndex(
        (t) => t.getAttribute("aria-selected") === "true"
      );
      let next = current;

      if (e.key === "ArrowRight") next = (current + 1) % tabs.length;
      else if (e.key === "ArrowLeft")
        next = (current - 1 + tabs.length) % tabs.length;
      else if (e.key === "Home") next = 0;
      else if (e.key === "End") next = tabs.length - 1;
      else return;

      e.preventDefault();
      activateTab(tabs[next]);
    });
  });
}

/* ── 3. Accordion ── */

function initAccordion() {
  qsa("[data-accordion]").forEach((accordion) => {
    const mode = accordion.getAttribute("data-accordion"); // "single" or "multi"
    const items = qsa(".accordion__item", accordion);

    if (mode === "single") {
      items.forEach((item) => {
        item.addEventListener("toggle", () => {
          if (item.open) {
            items.forEach((other) => {
              if (other !== item && other.open) other.open = false;
            });
          }
        });
      });
    }
  });
}

/* ── 4. Data Table (sort) ── */

function initDataTable() {
  qsa("[data-sortable]").forEach((table) => {
    const headers = qsa("[data-sort]", table);
    const tbody = qs("tbody", table);

    headers.forEach((th) => {
      th.addEventListener("click", () => {
        const key = th.getAttribute("data-sort");
        const currentSort = th.getAttribute("aria-sort");
        const direction =
          currentSort === "ascending" ? "descending" : "ascending";

        // Reset all headers
        headers.forEach((h) => {
          h.removeAttribute("aria-sort");
          const ind = qs(".sort-indicator", h);
          if (ind) ind.textContent = "";
        });

        th.setAttribute("aria-sort", direction);
        const indicator = qs(".sort-indicator", th);
        if (indicator)
          indicator.textContent = direction === "ascending" ? "\u25B2" : "\u25BC";

        // Sort rows
        const rows = qsa(".data-table__row", tbody);
        rows.sort((a, b) => {
          const aVal = a.getAttribute(`data-${key}`);
          const bVal = b.getAttribute(`data-${key}`);

          // Try numeric comparison
          const aNum = parseFloat(aVal);
          const bNum = parseFloat(bVal);

          let cmp;
          if (!isNaN(aNum) && !isNaN(bNum)) {
            cmp = aNum - bNum;
          } else {
            cmp = aVal.localeCompare(bVal);
          }

          return direction === "ascending" ? cmp : -cmp;
        });

        rows.forEach((row) => tbody.appendChild(row));
      });
    });
  });
}

/* ── 5. Seamless ticker lane ── */

function initTicker() {
  qsa("[data-ticker]").forEach((ticker) => {
    const viewport = qs(".ticker__viewport", ticker);
    const track = qs("[data-ticker-track]", ticker);
    const baseGroup = track ? qs("[data-ticker-group]", track) : null;
    if (!viewport || !track || !baseGroup) return;

    const speed = Number(ticker.getAttribute("data-ticker-speed")) || 80;
    const syncMetrics = () => {
      qsa("[data-ticker-clone]", track).forEach((clone) => clone.remove());

      const distance = baseGroup.getBoundingClientRect().width;
      if (!distance) return;

      let trackWidth = distance;
      const minRequiredWidth = viewport.clientWidth + distance;
      while (trackWidth < minRequiredWidth) {
        const clone = baseGroup.cloneNode(true);
        clone.setAttribute("data-ticker-clone", "");
        clone.setAttribute("aria-hidden", "true");
        track.appendChild(clone);
        trackWidth += distance;
      }

      const duration = Math.max(distance / speed, 8);
      ticker.style.setProperty("--ticker-distance", `${distance}px`);
      ticker.style.setProperty("--ticker-duration", `${duration.toFixed(2)}s`);
    };

    syncMetrics();

    if ("ResizeObserver" in window) {
      const resizeObserver = new ResizeObserver(() => syncMetrics());
      resizeObserver.observe(baseGroup);
      resizeObserver.observe(ticker);
    } else {
      window.addEventListener("resize", syncMetrics);
    }

    const togglePaused = () => ticker.classList.toggle("is-paused");

    ticker.addEventListener("click", (event) => {
      const target = event.target;
      if (target instanceof HTMLElement && target.closest("a, button, input, select, textarea")) {
        return;
      }
      togglePaused();
    });

    ticker.addEventListener("keydown", (event) => {
      if (event.key === "Enter" || event.key === " ") {
        event.preventDefault();
        togglePaused();
      }
    });
  });
}

/* ── 6. Portfolio carousel ── */

function initPortfolioCarousel() {
  qsa("[data-carousel]").forEach((carousel) => {
    const viewport = qs("[data-carousel-viewport]", carousel);
    if (!viewport) return;

    const slides = qsa("[data-carousel-slide]", viewport);
    if (slides.length === 0) return;

    const prevButton = qs("[data-carousel-prev]", carousel);
    const nextButton = qs("[data-carousel-next]", carousel);
    const dotsHost = qs("[data-carousel-dots]", carousel);
    let currentIndex = 0;
    let scrollRaf = null;

    const getSlideScrollLeft = (slide) =>
      slide.getBoundingClientRect().left -
      viewport.getBoundingClientRect().left +
      viewport.scrollLeft;

    const findClosestIndex = () => {
      const viewportCenter = viewport.scrollLeft + viewport.clientWidth / 2;
      let closest = 0;
      let smallestDistance = Number.POSITIVE_INFINITY;

      slides.forEach((slide, index) => {
        const left = getSlideScrollLeft(slide);
        const center = left + slide.clientWidth / 2;
        const distance = Math.abs(center - viewportCenter);
        if (distance < smallestDistance) {
          smallestDistance = distance;
          closest = index;
        }
      });

      return closest;
    };

    const scrollToIndex = (index) => {
      const bounded = Math.max(0, Math.min(index, slides.length - 1));
      const target = slides[bounded];
      if (!target) return;
      const left = getSlideScrollLeft(target);
      viewport.scrollTo({ left, behavior: "smooth" });
    };

    const updateDots = () => {
      if (!dotsHost) return;
      qsa(".carousel-dot", dotsHost).forEach((dot, index) => {
        dot.setAttribute("aria-current", index === currentIndex ? "true" : "false");
      });
    };

    const syncControls = () => {
      currentIndex = findClosestIndex();
      if (prevButton) prevButton.disabled = currentIndex <= 0;
      if (nextButton) nextButton.disabled = currentIndex >= slides.length - 1;
      updateDots();
    };

    if (dotsHost) {
      dotsHost.innerHTML = "";
      slides.forEach((_, index) => {
        const dot = document.createElement("button");
        dot.type = "button";
        dot.className = "carousel-dot";
        dot.setAttribute("aria-label", `Go to slide ${index + 1}`);
        dot.setAttribute("aria-current", index === 0 ? "true" : "false");
        dot.addEventListener("click", () => scrollToIndex(index));
        dotsHost.appendChild(dot);
      });
    }

    if (prevButton) {
      prevButton.addEventListener("click", () => scrollToIndex(currentIndex - 1));
    }
    if (nextButton) {
      nextButton.addEventListener("click", () => scrollToIndex(currentIndex + 1));
    }

    viewport.addEventListener("keydown", (event) => {
      if (event.key === "ArrowLeft") {
        event.preventDefault();
        scrollToIndex(currentIndex - 1);
      } else if (event.key === "ArrowRight") {
        event.preventDefault();
        scrollToIndex(currentIndex + 1);
      }
    });

    viewport.addEventListener("scroll", () => {
      if (scrollRaf !== null) return;
      scrollRaf = window.requestAnimationFrame(() => {
        scrollRaf = null;
        syncControls();
      });
    });

    window.addEventListener("resize", syncControls);
    syncControls();
  });
}

/* ── 7. Progress + Skeleton ── */

function initProgress() {
  const trigger = qs("[data-progress-trigger]");
  if (!trigger) return;

  trigger.addEventListener("click", () => {
    const container = qs("[data-animated-progress]");
    if (!container) return;

    const fill = qs(".progress__fill", container);
    const label = qs("[data-progress-value]", container);
    const track = qs("[role='progressbar']", container);

    trigger.disabled = true;
    let current = 0;

    const interval = setInterval(() => {
      current += 2;
      if (current > 100) current = 100;

      fill.style.setProperty("--progress", current);
      if (label) label.textContent = current + "%";
      if (track) track.setAttribute("aria-valuenow", current);

      if (current >= 100) {
        clearInterval(interval);
        trigger.disabled = false;
        // Reset after a pause
        setTimeout(() => {
          fill.style.setProperty("--progress", 0);
          if (label) label.textContent = "0%";
          if (track) track.setAttribute("aria-valuenow", "0");
        }, 1200);
      }
    }, 40);
  });

  // Skeleton toggle
  const skeletonToggle = qs("[data-skeleton-toggle]");
  const skeletonArea = qs("[data-skeleton-area]");
  if (!skeletonToggle || !skeletonArea) return;

  const skeletonHTML = skeletonArea.innerHTML;
  const loadedHTML = `
    <div class="card" style="padding: var(--s-5); display: grid; gap: var(--s-4);">
      <div style="display: flex; align-items: center; gap: var(--s-3);">
        <span class="avatar" style="background: var(--accent)">JD</span>
        <div>
          <div style="font-weight: 600;">Jane Doe</div>
          <div class="muted" style="font-size: 0.85rem;">Product Designer</div>
        </div>
      </div>
      <p class="muted" style="margin: 0; line-height: 1.6;">
        Passionate about creating delightful user experiences. Previously at
        Figma, now building design systems for the web.
      </p>
      <div style="background: var(--surface-2); border-radius: var(--radius); height: 120px; display: flex; align-items: center; justify-content: center;">
        <span class="muted">Image placeholder</span>
      </div>
    </div>`;

  let showingSkeleton = true;

  skeletonToggle.addEventListener("click", () => {
    showingSkeleton = !showingSkeleton;
    skeletonArea.innerHTML = showingSkeleton ? skeletonHTML : loadedHTML;
  });
}

/* ── 8. Control primitives ── */

function initControlPrimitives() {
  qsa("[data-slider-input]").forEach((slider) => {
    const row = slider.closest(".slider-row");
    const valueEl = row ? qs("[data-slider-value]", row) : null;

    const syncValue = () => {
      if (valueEl) valueEl.textContent = `${slider.value}%`;
    };

    slider.addEventListener("input", syncValue);
    syncValue();
  });
}

/* ── 9. Chips ── */

function initChips() {
  const group = qs("[data-chip-group]");
  if (!group) return;

  // Delegate remove clicks
  group.addEventListener("click", (e) => {
    const removeBtn = e.target.closest("[data-chip-remove]");
    if (!removeBtn) return;

    const chip = removeBtn.closest("[data-chip]");
    if (!chip) return;

    chip.classList.add("chip--removing");
    chip.addEventListener("transitionend", () => chip.remove(), { once: true });
    // Fallback if no transition fires
    setTimeout(() => { if (chip.parentNode) chip.remove(); }, 300);
  });

  // Add chip button
  const addBtn = qs("[data-chip-add]");
  if (!addBtn) return;

  const names = ["Eve", "Frank", "Grace", "Hank", "Iris", "Jun", "Kim", "Leo"];
  const colors = [
    "var(--accent)",
    "var(--success)",
    "var(--error)",
    "var(--muted)",
  ];
  let nameIndex = 0;

  addBtn.addEventListener("click", () => {
    const name = names[nameIndex % names.length];
    const color = colors[nameIndex % colors.length];
    nameIndex++;

    const chip = document.createElement("span");
    chip.className = "chip";
    chip.setAttribute("data-chip", "");
    chip.innerHTML = `
      <span class="avatar chip__avatar" style="background: ${color}">${name[0]}</span>
      <span class="chip__label">${name}</span>
      <button class="chip__remove" type="button" data-chip-remove aria-label="Remove ${name}">&times;</button>
    `;

    group.appendChild(chip);
  });
}

/* ── 10. Banners ── */

function initBanners() {
  const group = qs("[data-banner-group]");
  if (!group) return;

  const originalHTML = group.innerHTML;

  // Delegate close clicks
  group.addEventListener("click", (e) => {
    const closeBtn = e.target.closest("[data-banner-close]");
    if (!closeBtn) return;

    const banner = closeBtn.closest("[data-banner]");
    if (!banner) return;

    banner.classList.add("banner--dismissing");
    banner.addEventListener(
      "transitionend",
      () => banner.remove(),
      { once: true }
    );
    setTimeout(() => { if (banner.parentNode) banner.remove(); }, 300);
  });

  // Reset button
  const resetBtn = qs("[data-banner-reset]");
  if (resetBtn) {
    resetBtn.addEventListener("click", () => {
      group.innerHTML = originalHTML;
    });
  }
}

/* ── Shared event wiring ── */

function wireEvents(profiles, effectsConfig) {
  const menuBtn = qs("[data-menu-button]");
  if (menuBtn) menuBtn.addEventListener("click", toggleMenu);

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
      }

      const conflicts = findIncompatibleSelections(effects, effectsConfig);
      let allowIncompatible = false;
      if (conflicts.length > 0) {
        const keep = await confirmEffectsConflict(conflicts, effectsConfig);
        if (!keep) {
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
}

/* ── Init ── */

(async function init() {
  setYear();
  applyGlitchMode(getInitialGlitchMode());
  initCursorSpotlightTracking();
  initScopedCrosshair();
  initBlueprintNavScrollState();
  initControlsModal();

  const profiles = await loadProfiles();
  const effectsControlsPresent =
    qs("[data-effects-tier-select]") !== null ||
    qs("[data-effects-list-toggles]") !== null;
  const effectsConfig = effectsControlsPresent
    ? await loadEffectsConfig()
    : null;
  const initialProfile = getInitialProfile(profiles);
  const storedTheme = getStoredTheme();
  if (storedTheme) setTheme(storedTheme);
  setProfile(initialProfile, profiles, effectsConfig, { respectStoredTheme: true });
  if (!document.documentElement.dataset.theme) setTheme("dark");
  if (effectsConfig) {
    syncEffects(initialProfile, effectsConfig, getStoredEffectsState());
  }

  wireEvents(profiles, effectsConfig);

  // Component inits
  initModals();
  initTabs();
  initAccordion();
  initDataTable();
  initTicker();
  initPortfolioCarousel();
  initProgress();
  initControlPrimitives();
  initChips();
  initBanners();
})();
