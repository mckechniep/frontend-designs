/**
 * Page Template — React page/route component with TypeScript + Tailwind
 *
 * Usage:
 *   1. Rename to match your route (e.g., HomePage.tsx, PricingPage.tsx)
 *   2. Update the PageProps, section content, and metadata
 *   3. Drop into your router: <Route path="/" element={<Page title="Home" />} />
 *
 * Structure (Marketing/Landing pattern):
 *   Header → Hero → Features → Metrics → CTA → Footer
 *
 * Keep the exported buildBrief aligned with shared/build-brief.contract.json.
 *
 * Each section is a composable block — remove, reorder, or add sections freely.
 * Tailwind utility classes only. Responsive at 360px+.
 */

"use client";

import { useState } from "react";

export const buildBrief = {
  profile_id: "choose-profile",
  surface_archetype: "landing",
  output_target: "react",
  styling_system: "tailwind",
  theme_mode: "choose-theme-mode",
  expressive_intensity: "balanced",
  component_scope: {
    mode: "starter",
    requested_components: [],
  },
} as const;

/* ── Props ────────────────────────────────────────────────── */
interface PageProps {
  /** Page title for header/SEO */
  title?: string;
  /** Page description for SEO/meta */
  description?: string;
}

/* ── Section Components ───────────────────────────────────── */

function Hero() {
  return (
    <section className="py-20 text-center" aria-labelledby="hero-heading">
      <div className="mx-auto max-w-3xl px-5">
        <span className="mb-4 inline-block rounded-full bg-violet-500/15 px-3 py-1 font-mono text-xs font-semibold text-violet-400">
          Now Available
        </span>
        <h1
          id="hero-heading"
          className="text-4xl font-extrabold tracking-tight sm:text-5xl lg:text-6xl"
        >
          Build something
          <br />
          people love
        </h1>
        <p className="mx-auto mt-6 max-w-lg text-base text-slate-400">
          A short, compelling description of your product or service. Explain
          the core value proposition in one or two sentences.
        </p>
        <div className="mt-8 flex flex-wrap justify-center gap-3">
          <a
            href="#cta"
            className="inline-flex items-center rounded-xl bg-violet-600 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-violet-700"
          >
            Get Started
          </a>
          <a
            href="#features"
            className="inline-flex items-center rounded-xl border border-white/10 px-5 py-2.5 text-sm font-semibold transition hover:bg-white/5"
          >
            Learn More
          </a>
        </div>
      </div>
    </section>
  );
}

function Features() {
  const items = [
    { title: "Feature One", desc: "Brief benefit description for the first feature." },
    { title: "Feature Two", desc: "Brief benefit description for the second feature." },
    { title: "Feature Three", desc: "Brief benefit description for the third feature." },
  ];

  return (
    <section
      id="features"
      className="border-t border-white/5 py-20"
      aria-labelledby="features-heading"
    >
      <div className="mx-auto max-w-5xl px-5">
        <h2
          id="features-heading"
          className="mb-10 text-2xl font-bold tracking-tight sm:text-3xl"
        >
          Everything you need
        </h2>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {items.map((item) => (
            <article
              key={item.title}
              className="rounded-2xl border border-white/[.08] bg-white/[.03] p-6 shadow-md backdrop-blur-xl transition-shadow hover:shadow-lg"
            >
              <h3 className="text-lg font-semibold">{item.title}</h3>
              <p className="mt-2 text-sm text-slate-400">{item.desc}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

function Metrics() {
  const stats = [
    { value: "10k+", label: "Active Users" },
    { value: "99.9%", label: "Uptime" },
    { value: "4.9★", label: "Avg. Rating" },
    { value: "150+", label: "Integrations" },
  ];

  return (
    <section
      id="metrics"
      className="border-t border-white/5 py-20"
      aria-labelledby="metrics-heading"
    >
      <div className="mx-auto max-w-5xl px-5 text-center">
        <h2
          id="metrics-heading"
          className="mb-10 text-2xl font-bold tracking-tight sm:text-3xl"
        >
          Trusted by teams everywhere
        </h2>
        <div className="grid grid-cols-2 gap-6 lg:grid-cols-4">
          {stats.map((s) => (
            <div key={s.label}>
              <div className="text-3xl font-extrabold tracking-tight text-violet-400 sm:text-4xl">
                {s.value}
              </div>
              <div className="mt-1 text-sm text-slate-400">{s.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function CTA() {
  return (
    <section
      id="cta"
      className="border-t border-white/5 py-20 text-center"
      aria-labelledby="cta-heading"
    >
      <div className="mx-auto max-w-2xl px-5">
        <h2
          id="cta-heading"
          className="text-2xl font-bold tracking-tight sm:text-3xl"
        >
          Ready to get started?
        </h2>
        <p className="mx-auto mt-4 max-w-md text-base text-slate-400">
          Join thousands of teams already using our platform.
        </p>
        <div className="mt-8 flex flex-wrap justify-center gap-3">
          <a
            href="#"
            className="inline-flex items-center rounded-xl bg-violet-600 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-violet-700"
          >
            Start Free Trial
          </a>
          <a
            href="#"
            className="inline-flex items-center rounded-xl border border-white/10 px-5 py-2.5 text-sm font-semibold transition hover:bg-white/5"
          >
            Talk to Sales
          </a>
        </div>
      </div>
    </section>
  );
}

/* ── Page ──────────────────────────────────────────────────── */
export default function Page({
  title = "YourBrand",
  description: _description,
}: PageProps) {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <div className="flex min-h-screen flex-col bg-[#06090f] text-slate-100">
      {/* Header */}
      <header className="sticky top-0 z-20 border-b border-white/[.08] bg-[#06090f]/80 backdrop-blur-xl backdrop-saturate-[180%]">
        <div className="mx-auto flex min-h-[60px] max-w-5xl items-center justify-between px-5">
          <span className="text-lg font-bold">{title}</span>

          {/* Desktop nav */}
          <nav className="hidden items-center gap-5 sm:flex" aria-label="Primary">
            <a href="#features" className="text-sm text-slate-400 hover:text-white">
              Features
            </a>
            <a href="#metrics" className="text-sm text-slate-400 hover:text-white">
              Proof
            </a>
            <a
              href="#cta"
              className="rounded-xl bg-violet-600 px-4 py-2 text-sm font-semibold text-white transition hover:bg-violet-700"
            >
              Get Started
            </a>
          </nav>

          {/* Hamburger button */}
          <button
            type="button"
            className="inline-flex items-center justify-center rounded-lg p-2 text-slate-400 hover:bg-white/5 hover:text-white sm:hidden"
            aria-label={menuOpen ? "Close menu" : "Open menu"}
            aria-expanded={menuOpen}
            onClick={() => setMenuOpen(!menuOpen)}
          >
            <svg
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              aria-hidden="true"
            >
              {menuOpen ? (
                <path d="M18 6 6 18M6 6l12 12" />
              ) : (
                <path d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>

        {/* Mobile nav */}
        {menuOpen && (
          <nav
            className="border-t border-white/[.06] px-5 pb-4 pt-3 sm:hidden"
            aria-label="Mobile"
          >
            <div className="flex flex-col gap-3">
              <a
                href="#features"
                className="text-sm text-slate-400 hover:text-white"
                onClick={() => setMenuOpen(false)}
              >
                Features
              </a>
              <a
                href="#metrics"
                className="text-sm text-slate-400 hover:text-white"
                onClick={() => setMenuOpen(false)}
              >
                Proof
              </a>
              <a
                href="#cta"
                className="mt-1 inline-flex items-center justify-center rounded-xl bg-violet-600 px-4 py-2 text-sm font-semibold text-white transition hover:bg-violet-700"
                onClick={() => setMenuOpen(false)}
              >
                Get Started
              </a>
            </div>
          </nav>
        )}
      </header>

      <main className="flex-1">
        <Hero />
        <Features />
        <Metrics />
        <CTA />
      </main>

      {/* Footer */}
      <footer className="border-t border-white/5">
        <div className="mx-auto flex min-h-[64px] max-w-5xl flex-col items-center justify-between gap-2 px-5 py-5 text-sm text-slate-400 sm:flex-row">
          <span>&copy; 2026 {title}. All rights reserved.</span>
          <nav aria-label="Footer" className="flex gap-2">
            <a href="#" className="hover:text-white">Privacy</a>
            <span className="text-slate-600">&middot;</span>
            <a href="#" className="hover:text-white">Terms</a>
          </nav>
        </div>
      </footer>
    </div>
  );
}
