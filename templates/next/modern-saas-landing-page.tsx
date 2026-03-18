import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Aurelian Cloud",
  description: "Modern SaaS anchor landing aligned to the Framekit build brief contract.",
};

export const buildBrief = {
  profile_id: "modern-saas",
  surface_archetype: "landing",
  output_target: "nextjs",
  styling_system: "tailwind",
  theme_mode: "dark",
  expressive_intensity: "balanced",
  component_scope: {
    mode: "starter",
    requested_components: ["pricing-toggle", "testimonial-cards", "trust-rail"],
  },
} as const;

const metrics = [
  { value: "32%", label: "Faster enterprise onboarding" },
  { value: "11.4d", label: "Average cycle trimmed" },
  { value: "4.9/5", label: "Pilot satisfaction" },
];

const pillars = [
  {
    title: "Executive clarity",
    body: "Warm, premium product framing with the proof density founders need once the story leaves prototype mode.",
  },
  {
    title: "Conversion discipline",
    body: "Trust rails, revenue framing, and decision-oriented pricing are integrated rather than bolted on at the end.",
  },
  {
    title: "Operational credibility",
    body: "The same visual language carries into app screens and dashboard surfaces without snapping back to generic admin UI.",
  },
];

export default function ModernSaasLandingPage() {
  return (
    <main className="min-h-screen bg-[#171d29] text-[#f5efe6]">
      <div className="mx-auto max-w-6xl px-5 pb-24 pt-6 sm:px-8 lg:px-10">
        <header className="sticky top-5 z-20 rounded-full border border-white/10 bg-[#171d29]/80 px-5 py-3 backdrop-blur-xl">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div>
              <p className="font-mono text-[0.68rem] uppercase tracking-[0.28em] text-[#b7ab96]">
                Aurelian Cloud
              </p>
            </div>
            <nav className="flex flex-wrap items-center gap-4 text-sm text-[#d2cabd]">
              <a href="#proof" className="transition hover:text-white">
                Proof
              </a>
              <a href="#pillars" className="transition hover:text-white">
                Pillars
              </a>
              <a href="#pricing" className="transition hover:text-white">
                Pricing
              </a>
              <a
                href="#cta"
                className="rounded-full border border-[#e8a94a]/40 bg-[#e8a94a]/12 px-4 py-2 text-[#f6ebd6] transition hover:bg-[#e8a94a]/20"
              >
                Book pilot
              </a>
            </nav>
          </div>
        </header>

        <section className="grid gap-10 pb-16 pt-16 lg:grid-cols-[1.15fr_0.85fr] lg:items-center">
          <div>
            <p className="font-mono text-[0.72rem] uppercase tracking-[0.24em] text-[#b7ab96]">
              Modern SaaS / canonical next anchor
            </p>
            <h1 className="mt-5 max-w-[10ch] font-serif text-5xl leading-[0.94] tracking-[-0.05em] sm:text-6xl lg:text-7xl">
              Enterprise rollout software with an actual point of view.
            </h1>
            <p className="mt-6 max-w-2xl text-lg leading-8 text-[#d8d0c3]">
              This landing anchor mirrors the Framekit modern-saas language:
              serif-led hierarchy, warm premium neutrals, selective glass, and
              proof-first conversion rhythm instead of template-market sameness.
            </p>
            <div className="mt-8 flex flex-wrap gap-4">
              <a
                href="#pricing"
                className="rounded-full bg-[#e8a94a] px-6 py-3 font-medium text-[#171d29] transition hover:bg-[#f1bc67]"
              >
                View pricing
              </a>
              <a
                href="#proof"
                className="rounded-full border border-white/10 px-6 py-3 font-medium text-[#f5efe6] transition hover:border-white/20 hover:bg-white/5"
              >
                See the proof stack
              </a>
            </div>
          </div>

          <aside className="rounded-[28px] border border-[#e8a94a]/12 bg-white/5 p-6 shadow-[0_30px_60px_rgba(0,0,0,0.35)] backdrop-blur-md">
            <div className="rounded-[22px] border border-white/10 bg-[#222938] p-5">
              <div className="flex items-center justify-between text-sm text-[#c5bbab]">
                <span className="font-mono uppercase tracking-[0.16em]">Pipeline console</span>
                <span>Q3 rollout</span>
              </div>
              <div className="mt-8 grid gap-4">
                {metrics.map((metric) => (
                  <div key={metric.label} className="rounded-2xl border border-white/8 bg-white/[0.03] p-4">
                    <p className="font-serif text-3xl tracking-[-0.04em] text-[#f7f2ea]">{metric.value}</p>
                    <p className="mt-2 text-sm text-[#bfb5a4]">{metric.label}</p>
                  </div>
                ))}
              </div>
              <div className="mt-6 rounded-2xl border border-[#8fa89a]/18 bg-[#8fa89a]/10 p-4">
                <p className="font-mono text-[0.68rem] uppercase tracking-[0.16em] text-[#cbd8cf]">
                  Annual plan toggle
                </p>
                <div className="mt-3 flex items-center justify-between rounded-full bg-black/20 p-1 text-sm">
                  <span className="rounded-full px-3 py-2 text-[#d0c7b8]">Monthly</span>
                  <span className="rounded-full bg-[#e8a94a] px-3 py-2 font-medium text-[#171d29]">
                    Annual / save 18%
                  </span>
                </div>
              </div>
            </div>
          </aside>
        </section>

        <section
          id="proof"
          className="rounded-[28px] border border-white/8 bg-white/[0.025] px-6 py-8 sm:px-8"
        >
          <div className="grid gap-6 lg:grid-cols-[0.85fr_1.15fr] lg:items-center">
            <div>
              <p className="font-mono text-[0.68rem] uppercase tracking-[0.18em] text-[#b7ab96]">
                Trust rail
              </p>
              <h2 className="mt-3 font-serif text-4xl tracking-[-0.04em]">
                Proof should feel integrated, not stapled on.
              </h2>
            </div>
            <div className="grid gap-4 sm:grid-cols-3">
              {["Fjord Capital", "Peregrine Ops", "Northline Cloud"].map((logo) => (
                <div
                  key={logo}
                  className="rounded-2xl border border-white/8 bg-white/[0.03] px-4 py-5 text-center text-sm text-[#d8d0c3]"
                >
                  {logo}
                </div>
              ))}
            </div>
          </div>
        </section>

        <section id="pillars" className="pb-16 pt-16">
          <div className="max-w-2xl">
            <p className="font-mono text-[0.68rem] uppercase tracking-[0.18em] text-[#b7ab96]">
              Pillars
            </p>
            <h2 className="mt-3 font-serif text-4xl tracking-[-0.04em] sm:text-5xl">
              One design language across pitch, pipeline, and product.
            </h2>
          </div>
          <div className="mt-8 grid gap-5 lg:grid-cols-3">
            {pillars.map((pillar) => (
              <article
                key={pillar.title}
                className="rounded-[24px] border border-white/8 bg-white/[0.03] p-6"
              >
                <p className="font-serif text-2xl tracking-[-0.04em]">{pillar.title}</p>
                <p className="mt-4 text-[#d0c7b8]">{pillar.body}</p>
              </article>
            ))}
          </div>
        </section>

        <section id="pricing" className="grid gap-6 lg:grid-cols-[0.9fr_1.1fr]">
          <div className="rounded-[28px] border border-white/8 bg-white/[0.025] p-6 sm:p-8">
            <p className="font-mono text-[0.68rem] uppercase tracking-[0.18em] text-[#b7ab96]">
              Pricing close
            </p>
            <h2 className="mt-3 font-serif text-4xl tracking-[-0.04em]">Premium cadence without enterprise theater.</h2>
            <p className="mt-4 max-w-xl text-[#d0c7b8]">
              The featured plan is framed through confidence and savings instead
              of oversized SaaS gimmicks. Warm accents stay scarce, so the CTA
              still feels expensive when it appears.
            </p>
          </div>
          <div className="grid gap-5 sm:grid-cols-2">
            <article className="rounded-[28px] border border-white/8 bg-white/[0.03] p-6">
              <p className="font-mono text-[0.68rem] uppercase tracking-[0.18em] text-[#b7ab96]">Pilot</p>
              <p className="mt-4 font-serif text-4xl tracking-[-0.05em]">$2.8k</p>
              <p className="mt-4 text-[#d0c7b8]">For founder-led rollout stories that need a credible launch page fast.</p>
            </article>
            <article className="rounded-[28px] border border-[#e8a94a]/22 bg-[#e8a94a]/10 p-6 shadow-[0_18px_40px_rgba(0,0,0,0.24)]">
              <p className="font-mono text-[0.68rem] uppercase tracking-[0.18em] text-[#f5dfb7]">Featured / Annual</p>
              <p className="mt-4 font-serif text-4xl tracking-[-0.05em]">$7.4k</p>
              <p className="mt-4 text-[#f1e5cf]">For teams that need the landing, dashboard, and app-screen grammar to feel like one system.</p>
            </article>
          </div>
        </section>

        <section
          id="cta"
          className="mt-16 rounded-[32px] border border-white/8 bg-gradient-to-r from-[#e8a94a]/14 via-white/[0.04] to-[#8fa89a]/12 px-6 py-8 sm:px-8"
        >
          <div className="flex flex-wrap items-center justify-between gap-6">
            <div>
              <p className="font-mono text-[0.68rem] uppercase tracking-[0.18em] text-[#b7ab96]">
                Canonical next step
              </p>
              <h2 className="mt-3 font-serif text-4xl tracking-[-0.04em]">Take the profile into the guided builder.</h2>
            </div>
            <a
              href="/build/index.html"
              className="rounded-full bg-[#f5efe6] px-6 py-3 font-medium text-[#171d29] transition hover:bg-white"
            >
              Open /build
            </a>
          </div>
        </section>
      </div>
    </main>
  );
}
