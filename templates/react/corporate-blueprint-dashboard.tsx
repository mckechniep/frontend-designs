export const buildBrief = {
  profile_id: "corporate-blueprint",
  surface_archetype: "dashboard",
  output_target: "react",
  styling_system: "tailwind",
  theme_mode: "dark",
  expressive_intensity: "restrained",
  component_scope: {
    mode: "universal",
    requested_components: ["sidebar-nav", "pagination", "blueprint-annotation"],
  },
} as const;

const metrics = [
  { value: "$41.2M", label: "Portfolio under review" },
  { value: "18", label: "Pending approvals" },
  { value: "3.4%", label: "Exposure delta" },
  { value: "09", label: "Site audits due" },
];

const initiatives = [
  { label: "Transit corridor retrofit", owner: "Northline", phase: "Bid review", status: "Needs approval" },
  { label: "Campus power spine", owner: "Helix Grid", phase: "Technical scope", status: "On track" },
  { label: "Waterfront archive fitout", owner: "Cairn Group", phase: "Risk pass", status: "Escalated" },
];

export default function CorporateBlueprintDashboard() {
  return (
    <div className="min-h-screen bg-[#06101f] text-[#e8edf4]">
      <div className="mx-auto flex min-h-screen max-w-7xl flex-col px-5 pb-10 pt-6 sm:px-8">
        <header className="rounded-[28px] border border-cyan-400/10 bg-[#0b1a30]/80 px-5 py-4 backdrop-blur-xl">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div>
              <p className="font-mono text-[0.68rem] uppercase tracking-[0.22em] text-cyan-300/70">
                Meridian &amp; Kirsch / dashboard anchor
              </p>
              <h1 className="mt-2 font-serif text-4xl tracking-[-0.04em] sm:text-5xl">
                Executive oversight with blueprint rhythm.
              </h1>
            </div>
            <div className="flex flex-wrap gap-3">
              <button className="rounded-full border border-cyan-400/18 px-4 py-2 text-sm text-cyan-100 transition hover:border-cyan-300/32">
                Export packet
              </button>
              <button className="rounded-full bg-cyan-300 px-4 py-2 text-sm font-medium text-[#06101f] transition hover:bg-cyan-200">
                Open approvals
              </button>
            </div>
          </div>
        </header>

        <main className="grid flex-1 gap-6 pt-6 xl:grid-cols-[0.72fr_1.28fr]">
          <aside className="rounded-[30px] border border-cyan-400/10 bg-[#0b1a30]/72 p-5">
            <p className="font-mono text-[0.68rem] uppercase tracking-[0.18em] text-cyan-300/72">
              Project index
            </p>
            <div className="mt-5 space-y-3">
              {["Advisory", "Approvals", "Allocations", "Vendors", "Field audit"].map((item, index) => (
                <button
                  key={item}
                  className={`flex w-full items-center justify-between rounded-[20px] border px-4 py-3 text-left ${
                    index === 1
                      ? "border-cyan-300/26 bg-cyan-400/10 text-white"
                      : "border-white/6 bg-white/[0.02] text-slate-200"
                  }`}
                >
                  <span className="font-mono text-[0.72rem] uppercase tracking-[0.16em]">{item}</span>
                  <span className="text-sm text-cyan-200/80">{String(index + 2).padStart(2, "0")}</span>
                </button>
              ))}
            </div>

            <div className="mt-6 rounded-[24px] border border-cyan-400/12 bg-[#102240] p-4">
              <p className="font-mono text-[0.68rem] uppercase tracking-[0.16em] text-cyan-300/72">
                Scope note
              </p>
              <p className="mt-3 text-sm leading-7 text-slate-300">
                Serif display, mono labels, and cyan annotation cues remain
                active even when the surface becomes dense and data-driven.
              </p>
            </div>
          </aside>

          <section className="grid gap-6">
            <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
              {metrics.map((metric) => (
                <article
                  key={metric.label}
                  className="rounded-[24px] border border-cyan-400/10 bg-[#0b1a30]/72 p-5"
                >
                  <p className="font-mono text-[0.68rem] uppercase tracking-[0.18em] text-cyan-300/72">
                    {metric.label}
                  </p>
                  <p className="mt-4 font-serif text-4xl tracking-[-0.05em]">{metric.value}</p>
                </article>
              ))}
            </div>

            <div className="grid gap-6 xl:grid-cols-[1.08fr_0.92fr]">
              <article className="rounded-[28px] border border-cyan-400/10 bg-[#0b1a30]/72 p-6">
                <div className="flex items-center justify-between gap-4">
                  <div>
                    <p className="font-mono text-[0.68rem] uppercase tracking-[0.18em] text-cyan-300/72">
                      Exposure trend
                    </p>
                    <h2 className="mt-3 font-serif text-3xl tracking-[-0.04em]">Current programme mix</h2>
                  </div>
                  <span className="rounded-full border border-cyan-400/12 px-3 py-2 font-mono text-[0.66rem] uppercase tracking-[0.16em] text-cyan-200">
                    updated 09:42
                  </span>
                </div>
                <div className="mt-8 space-y-5">
                  {[
                    ["Infrastructure", "76%"],
                    ["Facilities retrofit", "58%"],
                    ["Compliance reserve", "34%"],
                  ].map(([label, value]) => (
                    <div key={label}>
                      <div className="flex items-center justify-between text-sm text-slate-300">
                        <span>{label}</span>
                        <span>{value}</span>
                      </div>
                      <div className="mt-2 h-2 rounded-full bg-cyan-400/8">
                        <div
                          className="h-full rounded-full bg-gradient-to-r from-cyan-300 to-cyan-500"
                          style={{ width: value }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </article>

              <article className="rounded-[28px] border border-cyan-400/10 bg-[#0b1a30]/72 p-6">
                <p className="font-mono text-[0.68rem] uppercase tracking-[0.18em] text-cyan-300/72">
                  Annotation rail
                </p>
                <div className="mt-6 space-y-4">
                  {[
                    "Crosshair/cursor effects stay scoped to named regions only.",
                    "Panel spacing favors precision over dense enterprise packing.",
                    "Table/chart interiors remain readable even when outer spacing tightens.",
                  ].map((note, index) => (
                    <div key={note} className="rounded-[20px] border border-white/6 bg-white/[0.02] p-4">
                      <p className="font-mono text-[0.66rem] uppercase tracking-[0.18em] text-cyan-200/72">
                        0{index + 1}
                      </p>
                      <p className="mt-3 text-sm leading-7 text-slate-300">{note}</p>
                    </div>
                  ))}
                </div>
              </article>
            </div>

            <article className="rounded-[28px] border border-cyan-400/10 bg-[#0b1a30]/72 p-6">
              <div className="flex items-center justify-between gap-4">
                <div>
                  <p className="font-mono text-[0.68rem] uppercase tracking-[0.18em] text-cyan-300/72">
                    Active initiatives
                  </p>
                  <h2 className="mt-3 font-serif text-3xl tracking-[-0.04em]">Current approvals queue</h2>
                </div>
                <button className="rounded-full border border-cyan-400/14 px-4 py-2 text-sm text-cyan-100 transition hover:border-cyan-300/32">
                  Review all
                </button>
              </div>
              <div className="mt-6 overflow-hidden rounded-[20px] border border-white/6">
                <div className="grid grid-cols-[1.2fr_0.8fr_0.8fr_0.9fr] gap-4 bg-white/[0.04] px-4 py-3 font-mono text-[0.68rem] uppercase tracking-[0.18em] text-cyan-200/72">
                  <span>Project</span>
                  <span>Owner</span>
                  <span>Phase</span>
                  <span>Status</span>
                </div>
                {initiatives.map((initiative) => (
                  <div
                    key={initiative.label}
                    className="grid grid-cols-[1.2fr_0.8fr_0.8fr_0.9fr] gap-4 border-t border-white/6 px-4 py-4 text-sm text-slate-200"
                  >
                    <span>{initiative.label}</span>
                    <span>{initiative.owner}</span>
                    <span>{initiative.phase}</span>
                    <span className="text-cyan-200">{initiative.status}</span>
                  </div>
                ))}
              </div>
            </article>
          </section>
        </main>
      </div>
    </div>
  );
}
