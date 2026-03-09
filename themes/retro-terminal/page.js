/* ═══════════════════════════════════════════
   NEXUS SENTINEL — Terminal Engine
   ═══════════════════════════════════════════ */

(() => {
  'use strict';

  // ─── BOOT SEQUENCE ───
  const bootMessages = [
    'BIOS v3.14.159 — POST check initiated...',
    'CPU: Intel Xeon E-2388G @ 3.20GHz ........... [  OK  ]',
    'RAM: 128GB ECC DDR4 .......................... [  OK  ]',
    'NIC: Intel X710-DA4 10GbE ................... [  OK  ]',
    'HSM: Thales Luna Network HSM 7 .............. [  OK  ]',
    '',
    'Loading kernel modules...',
    '  ├─ nf_conntrack ........................... [LOADED]',
    '  ├─ xt_geoip ............................... [LOADED]',
    '  ├─ wireguard .............................. [LOADED]',
    '  └─ nexus_sentinel_core .................... [LOADED]',
    '',
    'Mounting encrypted volumes...',
    '  /dev/mapper/vault0 ........................ [DECRYPTED]',
    '  /dev/mapper/vault1 ........................ [DECRYPTED]',
    '',
    'Starting services...',
    '  ├─ sshd (port 22) ......................... [ACTIVE]',
    '  ├─ nexus-firewall ......................... [ACTIVE]',
    '  ├─ nexus-ids (Suricata 7.0) .............. [ACTIVE]',
    '  ├─ nexus-siem ............................. [ACTIVE]',
    '  ├─ nexus-threat-intel ..................... [ACTIVE]',
    '  └─ nexus-web-portal ....................... [ACTIVE]',
    '',
    '╔═══════════════════════════════════════════════╗',
    '║  NEXUS SENTINEL DEFENSE PLATFORM v4.2.1      ║',
    '║  All systems operational. Threats: 0 active.  ║',
    '║  Uptime: 847d 13h 22m | Load: 0.42           ║',
    '╚═══════════════════════════════════════════════╝',
    '',
    'Welcome, operator. Establishing secure session...',
  ];

  const bootLog = document.getElementById('boot-log');
  const bootScreen = document.getElementById('boot-screen');
  const terminalFrame = document.getElementById('terminal-frame');
  let bootIndex = 0;

  function bootSequence() {
    if (bootIndex < bootMessages.length) {
      const line = document.createElement('div');
      line.className = 'boot-line';
      line.textContent = bootMessages[bootIndex];
      bootLog.appendChild(line);
      bootLog.scrollTop = bootLog.scrollHeight;
      bootIndex++;

      // Variable timing for realism
      const msg = bootMessages[bootIndex - 1];
      let delay = 40;
      if (msg === '') delay = 80;
      else if (msg.includes('Loading') || msg.includes('Starting') || msg.includes('Mounting')) delay = 200;
      else if (msg.includes('═') || msg.includes('║')) delay = 30;
      else if (msg.includes('Welcome')) delay = 400;

      setTimeout(bootSequence, delay);
    } else {
      setTimeout(() => {
        bootScreen.classList.add('hidden');
        setTimeout(() => {
          bootScreen.style.display = 'none';
          terminalFrame.classList.add('visible');
          initTypingAnimation();
          startLiveFeed();
          animateCounters();
          observeServiceCards();
        }, 400);
      }, 600);
    }
  }

  // Start boot
  setTimeout(bootSequence, 300);

  // ─── NAVIGATION ───
  const navBtns = document.querySelectorAll('.nav-cmd');
  const sections = document.querySelectorAll('.terminal-section');

  navBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const target = btn.dataset.section;
      navigateTo(target);
    });
  });

  window.navigateTo = function(target) {
    // Update nav
    navBtns.forEach(b => b.classList.remove('active'));
    const activeBtn = document.querySelector(`.nav-cmd[data-section="${target}"]`);
    if (activeBtn) activeBtn.classList.add('active');

    // Update sections
    sections.forEach(s => s.classList.remove('active'));
    const targetSection = document.getElementById(target);
    if (targetSection) {
      targetSection.classList.add('active');

      // Re-trigger animations for specific sections
      if (target === 'hero') initTypingAnimation();
      if (target === 'services') observeServiceCards();
      if (target === 'stats') {
        animateCounters();
        startLiveFeed();
      }
    }

    // Update header title
    const cmd = activeBtn ? activeBtn.dataset.cmd : '';
    document.querySelector('.header-title').innerHTML =
      `nexus@sentinel:~$ ${cmd} <span class="blink-cursor">_</span>`;
  };

  // ─── TYPING ANIMATION ───
  function initTypingAnimation() {
    const lines = document.querySelectorAll('#hero .typing-line');
    lines.forEach(line => {
      line.classList.remove('typing', 'typed');
      line.style.opacity = '0';
      line.style.width = '';
    });

    lines.forEach((line, i) => {
      const delay = parseInt(line.dataset.delay) || i * 600;
      setTimeout(() => {
        line.classList.add('typing');
        setTimeout(() => {
          line.classList.remove('typing');
          line.classList.add('typed');
        }, 1200);
      }, delay);
    });

    // Show actions after typing
    const actions = document.querySelector('.hero-actions');
    if (actions) {
      actions.style.opacity = '0';
      actions.style.transform = 'translateY(10px)';
      actions.style.transition = 'all 0.5s ease';
      setTimeout(() => {
        actions.style.opacity = '1';
        actions.style.transform = 'translateY(0)';
      }, 4200);
    }
  }

  // ─── SERVICE CARDS STAGGER ───
  function observeServiceCards() {
    const cards = document.querySelectorAll('.service-card');
    cards.forEach((card, i) => {
      card.classList.remove('visible');
      setTimeout(() => {
        card.classList.add('visible');
      }, 100 + i * 120);
    });
  }

  // ─── LIVE THREAT FEED ───
  const threatTypes = [
    { level: 'low', action: 'BLOCKED', msgs: [
      'Port scan detected from {ip} — 1,247 ports probed',
      'SSH brute force attempt from {ip} — 342 attempts',
      'Suspicious DNS query to {domain} from internal host',
      'Unauthorized SNMP request from {ip}',
      'TLS downgrade attempt intercepted from {ip}',
    ]},
    { level: 'med', action: 'ALERT', msgs: [
      'Possible C2 beacon detected — {ip} → {domain}',
      'Anomalous data exfiltration pattern — 2.4GB outbound to {ip}',
      'Credential stuffing attack on /api/auth from {ip} subnet',
      'Lateral movement detected — host-14 → host-27 via SMB',
      'Obfuscated PowerShell execution on endpoint WS-{num}',
    ]},
    { level: 'high', action: 'CRITICAL', msgs: [
      'Zero-day exploit signature matched — CVE-2026-{num}',
      'Ransomware payload intercepted on endpoint SRV-{num}',
      'APT-41 TTP pattern detected in network traffic',
    ]},
  ];

  const sampleIPs = [
    '185.220.101.', '45.155.205.', '192.241.xx.', '103.136.42.',
    '91.240.118.', '194.26.29.', '23.129.64.', '162.247.74.',
    '185.56.80.', '45.95.169.',
  ];

  const sampleDomains = [
    'xn--80ak6aa.ru', 'cdn-update.xyz', 'api-telemetry.click',
    'secure-payload.top', 'data-sync.onion', 'ns1.darkgate.cc',
  ];

  function randomIP() {
    return sampleIPs[Math.floor(Math.random() * sampleIPs.length)] +
      Math.floor(Math.random() * 255);
  }

  function randomDomain() {
    return sampleDomains[Math.floor(Math.random() * sampleDomains.length)];
  }

  function generateThreat() {
    // Weight towards low-level threats
    const rand = Math.random();
    const typeIdx = rand < 0.6 ? 0 : rand < 0.9 ? 1 : 2;
    const type = threatTypes[typeIdx];
    const msg = type.msgs[Math.floor(Math.random() * type.msgs.length)]
      .replace('{ip}', randomIP())
      .replace('{domain}', randomDomain())
      .replace('{num}', String(Math.floor(Math.random() * 9000) + 1000));

    const now = new Date();
    const time = now.toTimeString().slice(0, 8);

    return { time, level: type.level, action: type.action, msg };
  }

  let feedInterval;

  function startLiveFeed() {
    const feed = document.getElementById('threat-feed');
    if (!feed) return;
    feed.innerHTML = '';

    // Clear previous interval
    if (feedInterval) clearInterval(feedInterval);

    // Seed initial entries
    for (let i = 0; i < 8; i++) {
      addThreatEntry(feed, false);
    }

    feedInterval = setInterval(() => {
      addThreatEntry(feed, true);
      // Remove old entries if too many
      while (feed.children.length > 50) {
        feed.removeChild(feed.firstChild);
      }
    }, 2500 + Math.random() * 2000);
  }

  function addThreatEntry(feed, scroll) {
    const t = generateThreat();
    const entry = document.createElement('div');
    entry.className = 'threat-entry';

    const levelClass = t.level === 'low' ? 't-level-low' : t.level === 'med' ? 't-level-med' : 't-level-high';
    const actionClass = t.action === 'BLOCKED' ? 't-action' : 't-action-alert';

    entry.innerHTML = `<span class="t-time">[${t.time}]</span> <span class="${levelClass}">[${t.level.toUpperCase()}]</span> <span class="${actionClass}">${t.action}</span> ${t.msg}`;

    feed.appendChild(entry);
    if (scroll) feed.scrollTop = feed.scrollHeight;
  }

  // ─── COUNTER ANIMATION ───
  function animateCounters() {
    animateValue('stat-blocked', 14_892);
    animateValue('stat-monitors', 3_421);
    animateValue('stat-endpoints', 28_750);
  }

  function animateValue(id, target) {
    const el = document.getElementById(id);
    if (!el) return;

    const duration = 1500;
    const start = performance.now();
    const startVal = 0;

    function update(now) {
      const elapsed = now - start;
      const progress = Math.min(elapsed / duration, 1);
      // Ease out cubic
      const eased = 1 - Math.pow(1 - progress, 3);
      const current = Math.floor(startVal + (target - startVal) * eased);
      el.textContent = current.toLocaleString();

      if (progress < 1) {
        requestAnimationFrame(update);
      }
    }

    requestAnimationFrame(update);
  }

  // ─── LIVE CLOCK ───
  function updateClock() {
    const el = document.getElementById('live-clock');
    if (el) {
      const now = new Date();
      el.textContent = now.toUTCString().slice(17, 25);
    }
  }
  setInterval(updateClock, 1000);
  updateClock();

  // ─── FOOTER DETAILS ───
  document.getElementById('footer-pid').textContent = Math.floor(Math.random() * 60000) + 1000;
  document.getElementById('footer-mem').textContent = (Math.floor(Math.random() * 40000) + 12000).toLocaleString();

  // ─── SESSION ID ───
  const sessionEl = document.getElementById('session-id');
  if (sessionEl) {
    const hex = Array.from({ length: 8 }, () =>
      Math.floor(Math.random() * 16).toString(16)
    ).join('').toUpperCase();
    sessionEl.textContent = hex;
  }

  // ─── CONTACT FORM ───
  window.handleSubmit = function(e) {
    e.preventDefault();
    const status = document.getElementById('form-status');
    const form = document.getElementById('contact-form');

    status.className = 'form-status';
    status.textContent = '> Encrypting transmission...';

    setTimeout(() => {
      status.textContent = '> Routing through secure channel...';
    }, 600);

    setTimeout(() => {
      status.textContent = '> Transmission received. Operator will respond within 4 hours.';
      status.classList.add('success');
      form.reset();
    }, 1500);
  };

  // ─── KEYBOARD NAV (vim-style bonus) ───
  document.addEventListener('keydown', (e) => {
    // Don't intercept when user is typing in form
    if (e.target.tagName === 'INPUT' || e.target.tagName === 'TEXTAREA' || e.target.tagName === 'SELECT') return;

    const sectionIds = ['hero', 'services', 'about', 'stats', 'contact'];
    const currentIdx = sectionIds.findIndex(id => document.getElementById(id)?.classList.contains('active'));

    if (e.key === 'j' || e.key === 'ArrowDown') {
      e.preventDefault();
      const next = Math.min(currentIdx + 1, sectionIds.length - 1);
      navigateTo(sectionIds[next]);
    } else if (e.key === 'k' || e.key === 'ArrowUp') {
      e.preventDefault();
      const prev = Math.max(currentIdx - 1, 0);
      navigateTo(sectionIds[prev]);
    } else if (e.key >= '1' && e.key <= '5') {
      e.preventDefault();
      navigateTo(sectionIds[parseInt(e.key) - 1]);
    }
  });
})();
