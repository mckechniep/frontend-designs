import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Noire Editorial Workspace",
  description: "Noire Editorial app-screen anchor aligned to the Framekit build brief contract.",
};

export const buildBrief = {
  profile_id: "noire-editorial",
  surface_archetype: "app-screen",
  output_target: "nextjs",
  styling_system: "tailwind",
  theme_mode: "dark",
  expressive_intensity: "balanced",
  component_scope: {
    mode: "theme-exclusive",
    requested_components: ["noire-dossier-card", "tooltip", "tag-input"],
  },
} as const;

const notes = [
  "Redaction bars and dossier rules are structural devices, not novelty overlays.",
  "Forms remain readable first; editorial drama rides on framing, spacing, and typography.",
  "Danger zones and irreversible actions get separated into their own dark, stamped panel.",
];

export default function NoireEditorialAppScreen() {
  return (
    <main className="min-h-screen bg-[#09090b] text-[#f2ede6]">
      <div className="mx-auto max-w-7xl px-5 pb-20 pt-6 sm:px-8">
        <header className="rounded-[28px] border border-white/10 bg-[#121214]/86 px-5 py-4 backdrop-blur-xl">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div>
              <p className="font-mono text-[0.68rem] uppercase tracking-[0.24em] text-[#a39786]">
                Noire Editorial / app-screen anchor
              </p>
              <h1 className="mt-3 max-w-[11ch] font-serif text-5xl leading-[0.94] tracking-[-0.05em] sm:text-6xl">
                Editorial workspace, not anonymous settings chrome.
              </h1>
            </div>
            <div className="flex flex-wrap gap-3">
              <button className="rounded-full border border-white/10 px-4 py-2 text-sm text-[#e0d6c8] transition hover:border-white/20">
                Archive copy
              </button>
              <button className="rounded-full bg-[#c9a84c] px-4 py-2 text-sm font-medium text-[#1b1610] transition hover:bg-[#d4b96a]">
                Publish dossier
              </button>
            </div>
          </div>
        </header>

        <section className="grid gap-6 pt-8 xl:grid-cols-[1.08fr_0.92fr]">
          <article className="rounded-[30px] border border-white/10 bg-[#121214] p-6">
            <div className="flex items-center justify-between gap-4">
              <div>
                <p className="font-mono text-[0.68rem] uppercase tracking-[0.18em] text-[#a39786]">
                  Cover sheet
                </p>
                <h2 className="mt-3 font-serif text-4xl tracking-[-0.05em]">Issue 14 / Membership desk</h2>
              </div>
              <span className="rounded-full border border-white/10 px-3 py-2 font-mono text-[0.66rem] uppercase tracking-[0.16em] text-[#b6a890]">
                secure draft
              </span>
            </div>

            <div className="mt-8 grid gap-5 md:grid-cols-2">
              <label className="grid gap-2">
                <span className="font-mono text-[0.66rem] uppercase tracking-[0.18em] text-[#9d8f7d]">
                  Desk name
                </span>
                <input
                  className="rounded-[18px] border border-white/10 bg-[#17171a] px-4 py-3 text-sm text-[#f2ede6] outline-none"
                  defaultValue="Membership desk"
                />
              </label>
              <label className="grid gap-2">
                <span className="font-mono text-[0.66rem] uppercase tracking-[0.18em] text-[#9d8f7d]">
                  Primary editor
                </span>
                <input
                  className="rounded-[18px] border border-white/10 bg-[#17171a] px-4 py-3 text-sm text-[#f2ede6] outline-none"
                  defaultValue="R. Vale"
                />
              </label>
              <label className="grid gap-2 md:col-span-2">
                <span className="font-mono text-[0.66rem] uppercase tracking-[0.18em] text-[#9d8f7d]">
                  Editorial stance
                </span>
                <textarea
                  className="min-h-[132px] rounded-[22px] border border-white/10 bg-[#17171a] px-4 py-3 text-sm text-[#f2ede6] outline-none"
                  defaultValue="Use dossier-style framing, hard category rules, and serif-led hierarchy while keeping pricing and member actions clear enough for a founder-facing product flow."
                />
              </label>
            </div>

            <div className="mt-6 rounded-[24px] border border-white/10 bg-[#0f0f12] p-5">
              <p className="font-mono text-[0.68rem] uppercase tracking-[0.18em] text-[#a39786]">
                Danger zone
              </p>
              <div className="mt-4 grid gap-4 md:grid-cols-[1fr_auto] md:items-center">
                <p className="text-sm leading-7 text-[#d2c7b7]">
                  Destructive actions get a separated, stamped enclosure so the
                  screen keeps its editorial mood without burying risky controls.
                </p>
                <button className="rounded-full border border-[#d84747]/35 bg-[#d84747]/12 px-4 py-2 text-sm text-[#f2c0c0] transition hover:border-[#d84747]/48">
                  Archive this desk
                </button>
              </div>
            </div>
          </article>

          <aside className="grid gap-6">
            <article className="rounded-[30px] border border-white/10 bg-[#121214] p-6">
              <p className="font-mono text-[0.68rem] uppercase tracking-[0.18em] text-[#a39786]">
                Summary rail
              </p>
              <div className="mt-5 space-y-4">
                {[
                  ["Members in review", "148"],
                  ["Editorial segments", "06"],
                  ["Pending renewals", "19"],
                ].map(([label, value]) => (
                  <div key={label} className="rounded-[22px] border border-white/8 bg-white/[0.03] p-4">
                    <p className="font-mono text-[0.64rem] uppercase tracking-[0.18em] text-[#9d8f7d]">{label}</p>
                    <p className="mt-3 font-serif text-4xl tracking-[-0.05em]">{value}</p>
                  </div>
                ))}
              </div>
            </article>

            <article className="rounded-[30px] border border-white/10 bg-[#121214] p-6">
              <p className="font-mono text-[0.68rem] uppercase tracking-[0.18em] text-[#a39786]">
                Editorial notes
              </p>
              <div className="mt-5 space-y-4">
                {notes.map((note, index) => (
                  <div key={note} className="rounded-[20px] border border-white/8 bg-white/[0.025] p-4">
                    <p className="font-mono text-[0.64rem] uppercase tracking-[0.18em] text-[#9d8f7d]">
                      0{index + 1} / guardrail
                    </p>
                    <p className="mt-3 text-sm leading-7 text-[#d2c7b7]">{note}</p>
                  </div>
                ))}
              </div>
            </article>
          </aside>
        </section>
      </div>
    </main>
  );
}
