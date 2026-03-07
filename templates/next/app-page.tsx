/**
 * Page Template — Next.js App Router page
 *
 * Usage:
 *   1. Place at app/page.tsx (home) or app/<route>/page.tsx
 *   2. Update the metadata export for SEO
 *   3. Replace section content with real copy and data
 *
 * This is a Server Component by default.
 * For interactive parts, extract them into separate "use client" components:
 *
 *   // app/components/ContactForm.tsx
 *   "use client";
 *   export function ContactForm() { ... }
 *
 *   // Then import here:
 *   import { ContactForm } from "./components/ContactForm";
 *
 * Structure (Marketing/Landing pattern):
 *   Hero → Features → Metrics → CTA
 *
 * Tailwind utility classes only. Responsive at 360px+.
 */

import type { Metadata } from "next";

/* ── Metadata ─────────────────────────────────────────────── */
export const metadata: Metadata = {
  title: "Home",
  description:
    "A short, compelling description of this page for search engines and social cards.",
};

/* ── Page ──────────────────────────────────────────────────── */
export default function Page() {
  return (
    <main>
      {/* ── Hero ────────────────────────────────────────── */}
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
            A short, compelling description of your product or service.
            Explain the core value proposition in one or two sentences.
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

      {/* ── Features ────────────────────────────────────── */}
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
            {[
              { title: "Feature One", desc: "Brief benefit description for the first feature." },
              { title: "Feature Two", desc: "Brief benefit description for the second feature." },
              { title: "Feature Three", desc: "Brief benefit description for the third feature." },
            ].map((item) => (
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

      {/* ── Metrics ─────────────────────────────────────── */}
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
            {[
              { value: "10k+", label: "Active Users" },
              { value: "99.9%", label: "Uptime" },
              { value: "4.9★", label: "Avg. Rating" },
              { value: "150+", label: "Integrations" },
            ].map((stat) => (
              <div key={stat.label}>
                <div className="text-3xl font-extrabold tracking-tight text-violet-400 sm:text-4xl">
                  {stat.value}
                </div>
                <div className="mt-1 text-sm text-slate-400">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA ─────────────────────────────────────────── */}
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
    </main>
  );
}
