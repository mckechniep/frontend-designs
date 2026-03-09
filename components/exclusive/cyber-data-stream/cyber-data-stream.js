/* ========== Cyber Data Stream ========== */
/* Exclusive JS for the cyberpunk-neon data stream component. */

(function () {
  "use strict";

  /* --- Message templates by type --- */
  var MESSAGES = {
    INFO: [
      "Connection established from {ip}",
      "Handshake complete on port {port}",
      "DNS resolved: {domain} -> {ip}",
      "Session authenticated for user@{node}",
      "Heartbeat received from node {node}",
      "Route updated via gateway {ip}",
      "Certificate validated: SHA-256 OK",
      "Proxy tunnel opened on port {port}",
      "Keep-alive ACK from {ip}:{port}",
      "Service discovery: {node} registered"
    ],
    WARN: [
      "High latency detected: {ms}ms",
      "Memory usage at {pct}%",
      "Connection pool nearing limit: {n}/500",
      "Retry attempt {n}/5 for {ip}:{port}",
      "Disk I/O spike on volume /dev/sd{hex}",
      "Rate limit approaching: {n} req/min",
      "Packet loss detected: {pct}% on {iface}",
      "Thread pool saturation: {pct}%",
      "Slow query: {ms}ms on db.{node}",
      "TLS renegotiation requested by {ip}"
    ],
    ERROR: [
      "Connection refused: {ip}:{port}",
      "TLS certificate expired for {domain}",
      "Timeout: no response from {ip} after {ms}ms",
      "Authentication failed: invalid token from {ip}",
      "Buffer overflow on stream {hex}",
      "Segmentation fault in module 0x{hex}",
      "Socket reset by peer: {ip}:{port}",
      "DNS lookup failed for {domain}",
      "Max retries exceeded for node {node}",
      "Checksum mismatch: packet 0x{hex}"
    ],
    DATA: [
      "Packet received: {kb}KB payload",
      "Stream buffer: {kb}KB allocated",
      "Data frame #{n} processed: {kb}KB",
      "Upload complete: {kb}KB to {ip}",
      "Block synced: hash 0x{hex}{hex}",
      "Payload decoded: {kb}KB cleartext",
      "Chunk #{n} acknowledged by {node}",
      "Transfer rate: {kb}KB/s to {ip}:{port}",
      "Queue depth: {n} pending frames",
      "Compressed stream: {kb}KB -> {smallkb}KB"
    ],
    SYS: [
      "Node sync complete",
      "Firewall rule updated: ACCEPT {ip}/24",
      "Cron job executed: cleanup_logs",
      "Service restarted: net-monitor.d",
      "Configuration reloaded at {timestamp}",
      "GC cycle: {ms}ms, freed {kb}KB",
      "Kernel module loaded: nf_conntrack",
      "Swap usage normalized to {pct}%",
      "Log rotation completed: {n} files archived",
      "System clock synchronized via NTP"
    ]
  };

  var DOMAINS = [
    "node-alpha.net", "sec-vault.io", "mesh-07.corp", "api.darknet.run",
    "edge-proxy.sys", "cache-12.cdn", "db-primary.int", "queue.broker.io"
  ];

  var NODES = [
    "ALPHA-7", "BRAVO-3", "CYBER-12", "DELTA-9", "ECHO-4",
    "FOXTROT-1", "GRID-08", "HEX-11", "ION-6", "KILO-2"
  ];

  var IFACES = ["eth0", "eth1", "wlan0", "bond0", "veth3", "br-lan"];

  /* Weighted random type selection */
  var TYPE_WEIGHTS = [
    { type: "INFO",  weight: 35 },
    { type: "DATA",  weight: 30 },
    { type: "WARN",  weight: 15 },
    { type: "SYS",   weight: 12 },
    { type: "ERROR", weight: 8 }
  ];

  var TOTAL_WEIGHT = TYPE_WEIGHTS.reduce(function (s, t) { return s + t.weight; }, 0);

  function randomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  function randomIP() {
    return randomInt(10, 192) + "." + randomInt(0, 255) + "." + randomInt(0, 255) + "." + randomInt(1, 254);
  }

  function randomHex(len) {
    var h = "";
    for (var i = 0; i < (len || 4); i++) {
      h += "0123456789abcdef".charAt(randomInt(0, 15));
    }
    return h;
  }

  function randomFrom(arr) {
    return arr[randomInt(0, arr.length - 1)];
  }

  function randomPort() {
    return randomFrom([443, 8080, 3000, 5432, 6379, 8443, 9090, 27017, 22, 80, 7741, 4433]);
  }

  function randomType() {
    var r = Math.random() * TOTAL_WEIGHT;
    var cumulative = 0;
    for (var i = 0; i < TYPE_WEIGHTS.length; i++) {
      cumulative += TYPE_WEIGHTS[i].weight;
      if (r < cumulative) return TYPE_WEIGHTS[i].type;
    }
    return "INFO";
  }

  function formatTimestamp() {
    var now = new Date();
    var h = String(now.getHours()).padStart(2, "0");
    var m = String(now.getMinutes()).padStart(2, "0");
    var s = String(now.getSeconds()).padStart(2, "0");
    var ms = String(now.getMilliseconds()).padStart(3, "0");
    return h + ":" + m + ":" + s + "." + ms;
  }

  function fillTemplate(template) {
    return template
      .replace(/\{ip\}/g, randomIP())
      .replace(/\{port\}/g, String(randomPort()))
      .replace(/\{domain\}/g, randomFrom(DOMAINS))
      .replace(/\{node\}/g, randomFrom(NODES))
      .replace(/\{ms\}/g, String(randomInt(12, 4800)))
      .replace(/\{pct\}/g, String(randomInt(60, 98)))
      .replace(/\{n\}/g, String(randomInt(1, 999)))
      .replace(/\{kb\}/g, String(randomInt(1, 512) / 10))
      .replace(/\{smallkb\}/g, String(randomInt(1, 128) / 10))
      .replace(/\{hex\}/g, randomHex(4))
      .replace(/\{iface\}/g, randomFrom(IFACES))
      .replace(/\{timestamp\}/g, formatTimestamp());
  }

  function generateHexDump() {
    var parts = [];
    var count = randomInt(8, 16);
    for (var i = 0; i < count; i++) {
      parts.push(randomHex(2));
    }
    return parts.join(" ");
  }

  /* --- Speed presets (ms between entries) --- */
  var SPEEDS = {
    slow: 2000,
    normal: 800,
    fast: 200
  };

  /* --- Main DataStream class --- */
  function DataStreamInstance(container) {
    this.container = container;
    this.viewport = container.querySelector(".data-stream__viewport");
    this.liveIndicator = container.querySelector(".data-stream__live");
    this.statsEls = {
      rate: container.querySelector("[data-stat='rate']"),
      total: container.querySelector("[data-stat='total']"),
      bandwidth: container.querySelector("[data-stat='bandwidth']")
    };
    this.filterBtns = container.querySelectorAll(".data-stream__filter-btn");
    this.speedBtns = container.querySelectorAll(".data-stream__speed-btn");
    this.startBtn = container.querySelector("[data-action='start']");
    this.stopBtn = container.querySelector("[data-action='stop']");
    this.clearBtn = container.querySelector("[data-action='clear']");

    this.running = false;
    this.timer = null;
    this.speed = "normal";
    this.totalCount = 0;
    this.totalBytes = 0;
    this.recentCounts = [];
    this.maxEntries = 200;
    this.activeFilter = null;

    this._bindEvents();
  }

  DataStreamInstance.prototype._bindEvents = function () {
    var self = this;

    /* Filter buttons */
    this.filterBtns.forEach(function (btn) {
      btn.addEventListener("click", function () {
        var type = btn.dataset.filter;
        if (self.activeFilter === type) {
          self.activeFilter = null;
        } else {
          self.activeFilter = type;
        }
        self._applyFilter();
      });
    });

    /* Speed buttons */
    this.speedBtns.forEach(function (btn) {
      btn.addEventListener("click", function () {
        var spd = btn.dataset.speed;
        self.setRate(spd);
      });
    });

    /* Start / Stop / Clear */
    if (this.startBtn) {
      this.startBtn.addEventListener("click", function () { self.start(); });
    }
    if (this.stopBtn) {
      this.stopBtn.addEventListener("click", function () { self.stop(); });
    }
    if (this.clearBtn) {
      this.clearBtn.addEventListener("click", function () { self.clear(); });
    }
  };

  DataStreamInstance.prototype._applyFilter = function () {
    var self = this;
    var entries = this.viewport.querySelectorAll(".data-stream__entry");

    /* Update button states */
    this.filterBtns.forEach(function (btn) {
      var type = btn.dataset.filter;
      btn.classList.remove("is-active", "is-dimmed");
      if (self.activeFilter) {
        if (type === self.activeFilter) {
          btn.classList.add("is-active");
        } else {
          btn.classList.add("is-dimmed");
        }
      }
    });

    /* Show/hide entries */
    entries.forEach(function (entry) {
      if (!self.activeFilter || entry.dataset.type === self.activeFilter) {
        entry.classList.remove("is-filtered");
      } else {
        entry.classList.add("is-filtered");
      }
    });
  };

  DataStreamInstance.prototype.addEntry = function (opts) {
    var type = (opts && opts.type) || randomType();
    var templates = MESSAGES[type] || MESSAGES.INFO;
    var message = (opts && opts.message) || fillTemplate(randomFrom(templates));
    var source = (opts && opts.source) || randomIP();
    var timestamp = formatTimestamp();
    var showHex = type === "DATA" && Math.random() < 0.3;

    /* Create entry DOM */
    var entry = document.createElement("div");
    entry.className = "data-stream__entry is-new";
    entry.dataset.type = type;

    var tsEl = document.createElement("span");
    tsEl.className = "data-stream__timestamp";
    tsEl.textContent = timestamp;

    var typeEl = document.createElement("span");
    typeEl.className = "data-stream__type data-stream__type--" + type;
    typeEl.textContent = type;

    var srcEl = document.createElement("span");
    srcEl.className = "data-stream__source";
    srcEl.textContent = source;

    var msgEl = document.createElement("span");
    msgEl.className = "data-stream__message";
    msgEl.textContent = message;

    entry.appendChild(tsEl);
    entry.appendChild(typeEl);
    entry.appendChild(srcEl);
    entry.appendChild(msgEl);

    if (showHex) {
      var hexEl = document.createElement("div");
      hexEl.className = "data-stream__hex";
      hexEl.textContent = generateHexDump();
      entry.appendChild(hexEl);
    }

    /* Remove empty state if present */
    var empty = this.viewport.querySelector(".data-stream__empty");
    if (empty) empty.remove();

    /* Apply filter if active */
    if (this.activeFilter && type !== this.activeFilter) {
      entry.classList.add("is-filtered");
    }

    this.viewport.appendChild(entry);

    /* Remove old entries beyond max */
    var allEntries = this.viewport.querySelectorAll(".data-stream__entry");
    while (allEntries.length > this.maxEntries) {
      allEntries[0].remove();
      allEntries = this.viewport.querySelectorAll(".data-stream__entry");
    }

    /* Remove is-new class after animation */
    setTimeout(function () {
      entry.classList.remove("is-new");
    }, 1200);

    /* Auto-scroll */
    this.viewport.scrollTop = this.viewport.scrollHeight;

    /* Update stats */
    this.totalCount++;
    var bytes = randomInt(64, 4096);
    this.totalBytes += bytes;
    this.recentCounts.push(Date.now());
    this._updateStats();
  };

  DataStreamInstance.prototype._updateStats = function () {
    var now = Date.now();

    /* Entries per second: count entries in last 1 second */
    this.recentCounts = this.recentCounts.filter(function (t) {
      return now - t < 1000;
    });
    var rate = this.recentCounts.length;

    if (this.statsEls.rate) {
      this.statsEls.rate.textContent = rate + "/s";
    }
    if (this.statsEls.total) {
      this.statsEls.total.textContent = this.totalCount.toLocaleString();
    }
    if (this.statsEls.bandwidth) {
      var kb = (this.totalBytes / 1024).toFixed(1);
      if (this.totalBytes > 1048576) {
        kb = (this.totalBytes / 1048576).toFixed(2) + " MB";
      } else {
        kb = kb + " KB";
      }
      this.statsEls.bandwidth.textContent = kb;
    }
  };

  DataStreamInstance.prototype.start = function () {
    if (this.running) return;
    this.running = true;
    var self = this;

    if (this.liveIndicator) {
      this.liveIndicator.classList.remove("is-stopped");
    }

    function tick() {
      if (!self.running) return;
      self.addEntry();
      self.timer = setTimeout(tick, SPEEDS[self.speed] || SPEEDS.normal);
    }
    tick();
  };

  DataStreamInstance.prototype.stop = function () {
    this.running = false;
    if (this.timer) {
      clearTimeout(this.timer);
      this.timer = null;
    }
    if (this.liveIndicator) {
      this.liveIndicator.classList.add("is-stopped");
    }
  };

  DataStreamInstance.prototype.clear = function () {
    var entries = this.viewport.querySelectorAll(".data-stream__entry");
    entries.forEach(function (e) { e.remove(); });
    this.totalCount = 0;
    this.totalBytes = 0;
    this.recentCounts = [];
    this._updateStats();

    /* Show empty state */
    var empty = document.createElement("div");
    empty.className = "data-stream__empty";
    empty.textContent = "// awaiting data stream...";
    this.viewport.appendChild(empty);
  };

  DataStreamInstance.prototype.setRate = function (speed) {
    if (!SPEEDS[speed]) return;
    this.speed = speed;
    var self = this;

    /* Update speed button states */
    this.speedBtns.forEach(function (btn) {
      btn.classList.toggle("is-active", btn.dataset.speed === self.speed);
    });

    /* Restart timer with new speed if running */
    if (this.running) {
      if (this.timer) clearTimeout(this.timer);
      var self2 = this;
      function tick() {
        if (!self2.running) return;
        self2.addEntry();
        self2.timer = setTimeout(tick, SPEEDS[self2.speed]);
      }
      tick();
    }
  };

  /* --- Public API --- */
  var instances = [];

  function init(container) {
    if (!container || container.dataset.dsInit === "true") return null;
    container.dataset.dsInit = "true";
    var instance = new DataStreamInstance(container);
    instances.push(instance);
    return instance;
  }

  function start() {
    instances.forEach(function (i) { i.start(); });
  }

  function stop() {
    instances.forEach(function (i) { i.stop(); });
  }

  function addEntry(opts) {
    instances.forEach(function (i) { i.addEntry(opts); });
  }

  function clear() {
    instances.forEach(function (i) { i.clear(); });
  }

  function setRate(speed) {
    instances.forEach(function (i) { i.setRate(speed); });
  }

  /* Expose */
  window.DataStream = {
    init: init,
    start: start,
    stop: stop,
    addEntry: addEntry,
    clear: clear,
    setRate: setRate
  };

  /* Auto-init on DOMContentLoaded */
  function autoInit() {
    var containers = document.querySelectorAll(".data-stream");
    containers.forEach(function (c) {
      var instance = init(c);
      if (instance) {
        /* Set initial speed button state */
        instance.speedBtns.forEach(function (btn) {
          btn.classList.toggle("is-active", btn.dataset.speed === instance.speed);
        });
        instance.start();
      }
    });
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", autoInit);
  } else {
    autoInit();
  }
})();
