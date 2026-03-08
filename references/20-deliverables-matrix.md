# Deliverables Matrix

Return only files required for selected target and current scope.

## General Rules

- Follow existing directory and naming conventions.
- Avoid adding setup/config files unless requested or required to unblock delivery.
- Avoid introducing dependencies silently.
- Keep style-profile intent consistent with selected profile id.
- On `full-build`, record `task_mode`, `icon_system`, and `intervention_mode` in `DESIGN_SPEC.scope_lock`.
- Use `intervention_mode=not-applicable` for empty/greenfield repos.
- On `small-refinement`, do not emit a fresh `DESIGN_SPEC`; restate locked invariants in `DELTA_SUMMARY`.
- Do not ship untouched placeholder/template copy in final deliverables.
- When blocked by environment/repo/input failures, return structured error per [references/90-error-taxonomy.md](references/90-error-taxonomy.md).

## Mandatory Response Artifact Order

For `task_mode=full-build`:

1. `PLAN`
2. `DESIGN_SPEC`
3. `FILES_CHANGED`
4. `KEY_DECISIONS_AND_RATIONALE`
5. `QUALITY_GATE_RESULTS`
6. `ERROR_BLOCK` (only when blocked)

For `task_mode=small-refinement`:

1. `DELTA_SUMMARY`
2. `FILES_CHANGED`
3. `KEY_DECISIONS_AND_RATIONALE`
4. `QUALITY_GATE_RESULTS`
5. `ERROR_BLOCK` (only when blocked)

For `task_mode=full-build`, `DESIGN_SPEC` must include a profile execution contract for expressive profiles:

- `PROFILE_SIGNATURES.required` (non-negotiable profile signatures)
- `PROFILE_SIGNATURES.selected` (what this draft will implement)
- `PROFILE_SIGNATURES.excluded` (only if explicitly out of scope)
- `PROFILE_SIGNATURES.effects_stack` (atmosphere + interaction effects)

If `required` and `selected` diverge without explicit user scope constraints, revise before code output.

`DELTA_SUMMARY` must include:

- requested delta
- locked invariants retained
- targeted verification coverage (ran, skipped, why)

For landing pages using expressive profiles (`arctic-mono`, `cyberpunk-neon`, `noire-editorial`) with `profile_recipe_lock=signature-on`:

- prefer `design/layout/landing.layouts.md` `Layout L4 - Cinematic Research Narrative`
- do not fallback to a generic 4-section SaaS composition

For `arctic-mono` with `profile_recipe_lock=signature-on`:

- preserve section numbering + signature showcase technical module in first draft
- treat generic product-marketing composition as invalid unless user explicitly requests simplification
- enforce 8pt spacing rhythm with balanced outer section spacing vs inner component spacing
- enforce sharp surface geometry (zero-radius cards/badges/buttons/inputs) and subtle snowfall atmosphere over hard grid-lattice backgrounds

For `noire-editorial` with `profile_recipe_lock=signature-on`:

- preserve editorial/dossier cues (rules, labels, stamps/redaction/ticker class)
- treat centered generic SaaS composition as invalid unless user explicitly requests simplification

For `retro-terminal` with `profile_recipe_lock=signature-on`:

- prefer `design/layout/landing.layouts.md` `Layout L5 - Terminal Command Console`
- treat generic header/hero/cards composition as invalid unless user explicitly requests simplified structure
- enforce terminal spacing rhythm (shell padding, command-nav gaps, section cadence, telemetry/form spacing)
- enforce hard-edged terminal geometry (zero-radius cards/badges/buttons/inputs/chips)

For `corporate-blueprint`:

- for landing surfaces with `profile_recipe_lock=signature-on`, prefer the canonical consultancy sequence (`annotated hero -> services -> methodology -> selected projects -> split contact`)
- enforce blueprint spacing rhythm (section cadence, panel padding, annotation spacing, split-layout gaps)
- treat cramped panel/table/chart interiors under oversized outer spacing as invalid
- if a cursor-driven effect is demonstrated, scope it to a small set of named regions (`1-3`, ideally `2`) rather than the whole page

## Vanilla HTML/CSS/JS

Default output:

- `index.html`
- `styles.css`
- `main.js`

Expressive Effects Layer deliverables (when requested/needed):

- `effects.json`
- `styles.effects.css`
- expressive effects layer state wiring in runtime JS
- `favicon.ico` and/or `favicon.svg` when referenced

If user requests single-file output, return one `index.html` with embedded `<style>` and `<script>`.

Dashboard/data-surface expectation (when in scope):

- Include sortable/filterable table wiring in `main.js` (or inline script in single-file mode).
- Include responsive chart region implementation or explicit placeholder + integration contract when chart library setup is out of scope.

## React (non-Next)

Default output:

- `Component.tsx` or `.jsx` matching repo language
- small supporting components only when they reduce complexity

When dashboard/data surfaces are in scope:

- include sortable/filterable table component in screen scope
- include responsive chart component(s) with lightweight interaction when chart scope is present

Expressive Effects Layer deliverables:

- stack-native expressive effects layer classes/tokens/components

Avoid routing assumptions unless repo already contains routing.

## Next.js

App Router default output:

- `app/<route>/page.tsx` or `app/page.tsx`

Optional:

- `app/layout.tsx` only when needed by request or repo pattern
- lint/config files only when required to fix blocking compatibility issues

When dashboard/data surfaces are in scope:

- include requested page plus focused client components for table/chart interactivity

Expressive Effects Layer deliverables:

- stack-native expressive effects layer classes/tokens/components

If repo is Pages Router only, output `pages/<route>.tsx`.

## Layer-Specific Notes

- Tailwind: prefer utility classes; do not scaffold Tailwind config unless asked.
- shadcn/ui: use existing `components/ui/*` primitives when present.
- Recharts: use `ResponsiveContainer` and minimal chart wrappers.
- Data tables: prefer reusable sortable/filterable primitives when available.
- Charts: prefer reusable responsive wrappers when available.
- Icons: use one chosen icon family per surface and avoid silent dependency installs.
- Expressive Effects Layer: enforce style-scoped effects with hierarchy and reduced-motion fallbacks.
- Prefer profile coherence rubric over rigid numeric effect caps; avoid clashing or redundant effects.

## Style Profile Application by Stack

- Vanilla:
  - apply selected profile via `design/profiles/profiles.json` intent and runtime CSS profile switching
- React and Next.js:
  - do not import vanilla profile CSS directly
  - translate selected profile into stack-native tokens and component styling
  - preserve profile typography, color mood, radius/shadow character, and interaction tone

## Intervention Mode Output Expectations

- `polish-existing`:
  - keep current design language; improve consistency, spacing, hierarchy, accessibility
- `partial-restyle`:
  - restyle selected pages/components to chosen profile; preserve untouched surfaces outside scope
- `full-takeover`:
  - apply chosen profile broadly across requested scope
  - preserve routes, data contracts, and business behavior
