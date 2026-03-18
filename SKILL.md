---
name: kickass-frontend
description: Deterministic planner-first frontend skill for Vanilla HTML/CSS/JS, React, and Next.js. Invoke explicitly with $kickass-frontend to lock task mode and scope, ground work against canonical theme profiles and shipped runtime references, produce PLAN and DESIGN_SPEC for full builds, or run a targeted refinement flow for small edits, then render verified, accessible, profile-consistent UI.
---

# Kickass Frontend

## Intent

Generate production-quality frontend UI with a strict planning-first workflow.

- Produce intentional, profile-specific visual direction instead of generic output.
- Preserve repo conventions and behavior contracts.
- Keep responsive layout, accessibility, and verification as mandatory deliverables.
- Support Vanilla, React, and Next.js targets with deterministic execution order.

## Activation Criteria

This skill is explicit-only.

- Activate only when the user invokes `$kickass-frontend`.
- Use for frontend creation, redesign, restyling, conversion, or polish tasks.
- Do not activate implicitly.

## Execution Protocol

Follow this exact sequence. Reordering is an error.

### Step -1 - Task Mode Gate

Lock `task_mode` before normal scope lock.

- Lock `task_mode`: `full-build | small-refinement`.
- Detect obvious refinement intent before asking.
- Use `small-refinement` for localized edits to existing UI (for example copy, spacing, component behavior, asset swaps, or narrow style polish).
- Use `full-build` for net-new surfaces, broad redesign/restyle work, or major layout/composition changes.
- If ambiguous, ask one immediate clarifying question before normal scope lock using [references/23-prompt-inventory.md](references/23-prompt-inventory.md).
- `full-build` continues to Step 0.
- `small-refinement` skips full `PLAN` and `DESIGN_SPEC`; use [references/22-refinement-loop.md](references/22-refinement-loop.md) plus targeted verification from [references/91-verification-gates.md](references/91-verification-gates.md).

### Step 0 - Scope Lock (Required for `full-build`)

After `task_mode=full-build`, lock required execution choices before any implementation.

1. Lock `output_target`: `vanilla | react | nextjs`.
2. Lock `styling_system`: `css | tailwind`.
3. Lock `design_profile`: concrete profile id or `keep-existing`.
4. Lock `surface_archetype`: `landing | dashboard | app-screen | component-demo | mixed-other`.
5. Lock `theme_mode`, optional layers, and `icon_system`.
6. Lock `expressive_intensity` (`high-drama` default; downgrade only when user asks).
7. In non-empty repos, run existing UI triage and lock `intervention_mode`; use `not-applicable` in empty/greenfield repos.

Use:

- Contract and non-negotiables: [references/00-contract.md](references/00-contract.md)
- Stack detection: [references/10-stack-detection.md](references/10-stack-detection.md)
- Existing UI triage: [references/21-existing-ui-triage.md](references/21-existing-ui-triage.md)
- Icon systems: [references/33-icon-systems.md](references/33-icon-systems.md)
- Style system: [references/30-style-system.md](references/30-style-system.md)
- Prompt inventory: [references/23-prompt-inventory.md](references/23-prompt-inventory.md)
- Profile registry: [references/32-profile-registry.md](references/32-profile-registry.md)
- Build brief contract: [references/34-build-brief-contract.md](references/34-build-brief-contract.md)
- Expressive effects layer rules: [design/motion/motion.rules.md](design/motion/motion.rules.md)

Scope-lock questioning rules:

- Detect before asking.
- If `task_mode` is ambiguous, resolve it before stack/style questions.
- Ask at most 1-3 questions total across task-mode and scope lock, only when decisions are blocking.
- Ask stack and styling as separate locks (`output_target`, `styling_system`); avoid ambiguous shorthand-only prompts.
- When asking for a profile choice, include the profile menu from [references/30-style-system.md](references/30-style-system.md) in the same message.
- Infer `surface_archetype` from the requested surface or touched files when possible; ask only when surface type changes the canonical reference to load, using the verbatim clarifier in [references/23-prompt-inventory.md](references/23-prompt-inventory.md).
- In empty/greenfield ambiguous context, use the verbatim canned scope-lock prompt from [references/10-stack-detection.md](references/10-stack-detection.md).
- Do not re-ask locked choices after proceeding.

Canonical reference loading rules:

- After locking `design_profile`, always load `design/profiles/profile.<id>.md`.
- After locking `surface_archetype`, load `design/examples/<surface_archetype>.<id>.md` when that file exists; treat it as the canonical composition/signature reference for that surface.
- When working inside this repo or another repo with established live frontend surfaces, inspect the matching shipped runtime before implementation:
  - theme/page work -> `themes/<profile>/index.html`, `themes/<profile>/theme.css`, and relevant `themes/<profile>/page.js`
  - component work -> `components/index.html` plus the nearest relevant file under `components/universal/` or `components/exclusive/`
- If no exact surface example exists, fall back to the selected profile reference plus the nearest matching shipped runtime surface.

### Step 1 - PLAN (Required Output for `full-build`)

Before code, output `PLAN` with:

- page purpose (1 sentence)
- layout map (sections + grid strategy)
- component tree (max 12 nodes)
- token usage (colors, spacing, typography, effects)
- responsive rules (`360px`, `768px`, `1280px`)
- accessibility notes (landmarks, focus, labels, keyboard)

### Step 2 - DESIGN_SPEC (Required Output for `full-build`, No Code Yet)

Output a fully populated `DESIGN_SPEC` that matches the schema in **Output Schema**.

Hard rule:

- Do not produce implementation code before `PLAN` and `DESIGN_SPEC` are present on `full-build` tasks.

### Step 3 - Implement (Deterministic Order)

For `full-build`, generate code in this order only:

1. tokens/theme wiring
2. layout skeleton (landmarks + sections)
3. components (buttons/cards/forms/tables/charts)
4. interactions/state wiring
5. responsive + accessibility polish

For `small-refinement`:

- lock current invariants + requested delta via [references/22-refinement-loop.md](references/22-refinement-loop.md)
- patch only requested deltas in the existing architecture
- keep untouched surfaces stable unless a cross-cutting bug requires broader repair

Load stack playbook after stack lock:

- Next.js: [references/11-next-rules.md](references/11-next-rules.md)
- React: [references/12-react-rules.md](references/12-react-rules.md)
- Vanilla: [references/13-vanilla-rules.md](references/13-vanilla-rules.md)

Load optional layers only when relevant:

- Tailwind: [references/60-tailwind-rules.md](references/60-tailwind-rules.md)
- shadcn/ui: [references/70-shadcn-rules.md](references/70-shadcn-rules.md)
- Recharts: [references/80-recharts-rules.md](references/80-recharts-rules.md)
- Icon systems: [references/33-icon-systems.md](references/33-icon-systems.md)

For structure and assets:

- Layout patterns: [references/40-layout-patterns.md](references/40-layout-patterns.md)
- Deliverables matrix: [references/20-deliverables-matrix.md](references/20-deliverables-matrix.md)
- Surface examples: `design/examples/`
- Design layouts: `design/layout/`
- Design components: `design/components/`
- Canonical live themes: `themes/`
- Canonical live components: `components/`
- Templates: `templates/`

### Step 4 - Quality Gates

Run required verification before finalizing:

- Verification gates: [references/91-verification-gates.md](references/91-verification-gates.md)
- Accessibility checklist: [references/50-a11y-checklist.md](references/50-a11y-checklist.md)
- Design rubric: [references/41-design-excellence-rubric.md](references/41-design-excellence-rubric.md)

On blocking failure, return canonical error block from:

- Error taxonomy: [references/90-error-taxonomy.md](references/90-error-taxonomy.md)

Verification mode rules:

- `full-build`: run full verification coverage, including responsive checks at `360px`, `768px`, and `1280px`.
- `small-refinement`: run targeted checks first on touched surfaces and escalate only when shared primitives, config, or cross-surface behavior changed.
- Verify alignment against the locked profile reference, the matching `design/examples/*` surface file when present, and the relevant shipped runtime surface when one exists.

### Step 5 - Deliverable Format

For `full-build`, return output in this order:

1. `PLAN`
2. `DESIGN_SPEC`
3. `FILES_CHANGED`
4. `KEY_DECISIONS_AND_RATIONALE`
5. `QUALITY_GATE_RESULTS`
6. `ERROR_BLOCK` (only when blocked)

For `small-refinement`, return output in this order:

1. `DELTA_SUMMARY`
2. `FILES_CHANGED`
3. `KEY_DECISIONS_AND_RATIONALE`
4. `QUALITY_GATE_RESULTS`
5. `ERROR_BLOCK` (only when blocked)

For first draft and refinements, follow:

- Refinement loop: [references/22-refinement-loop.md](references/22-refinement-loop.md)

## Constraints

- Do not generate code before `PLAN` and `DESIGN_SPEC` on `full-build` tasks.
- Do not emit a fresh `PLAN` or full `DESIGN_SPEC` on `small-refinement` tasks unless the user explicitly expands scope to `full-build`.
- Do not implicitly invoke this skill.
- Do not ignore a matching canonical `design/examples/<surface>.<profile>.md` file when one exists for the active surface.
- Do not silently add dependencies.
- Do not replace user-provided company/product/domain narrative with invented branding unless explicitly requested.
- Do not break existing behavior/contracts while restyling.
- Do not perform full visual takeover in existing repos without explicit confirmation.
- Do not use shadcn/ui without Tailwind.
- Do not use Recharts outside React or Next.js.
- Do not exceed Expressive Effects Layer effect budgets (`low=3`, `medium=5`, `high=8`, `custom=12`, global max `12`).
- Do not apply invalid style-scoped Expressive Effects Layer effects.
- Do not ship unresolved font or icon import/build errors.
- Do not ship low-contrast light mode (`normal >= 4.5:1`, `large >= 3:1`, focus/control boundaries `>= 3:1`).
- Do not ship untouched starter/template placeholders unless explicitly requested.
- Touch only files required by the current task.

## Output Schema

Return sections in this exact order for the active `task_mode`.

For `full-build`:

1. `PLAN`
2. `DESIGN_SPEC`
3. `FILES_CHANGED`
4. `KEY_DECISIONS_AND_RATIONALE`
5. `QUALITY_GATE_RESULTS`
6. `ERROR_BLOCK` (conditional)

For `small-refinement`:

1. `DELTA_SUMMARY`
2. `FILES_CHANGED`
3. `KEY_DECISIONS_AND_RATIONALE`
4. `QUALITY_GATE_RESULTS`
5. `ERROR_BLOCK` (conditional)

`DESIGN_SPEC` schema (mandatory):

```yaml
DESIGN_SPEC:
  version: "1.2"
  scope_lock:
    task_mode: "full-build"
    output_target: "vanilla|react|nextjs"
    styling_system: "css|tailwind"
    design_profile: "<profile-id|keep-existing>"
    surface_archetype: "landing|dashboard|app-screen|component-demo|mixed-other"
    theme_mode: "dark|light|both-toggle-dark-default|both-toggle-light-default"
    expressive_intensity: "restrained|balanced|high-drama"
    icon_system: "keep-existing|heroicons|tabler|feather|material-icons|tabler-inline-svg|feather-inline-svg|material-inline-svg|none"
    intervention_mode: "polish-existing|partial-restyle|full-takeover|not-applicable"
    component_scope:
      mode: "none|starter|universal|theme-exclusive|mixed"
      requested_components: ["<optional component ids>"]
    layers:
      tailwind: "yes|no|keep-existing"
      shadcn_ui: "yes|no|keep-existing"
      recharts: "yes|no|keep-existing"
  page_purpose: "<1 sentence>"
  layout_map: "<sections + grid strategy>"
  component_tree: ["<max 12 nodes>"]
  token_plan:
    color: "<palette intent + contrast notes>"
    spacing: "<scale>"
    typography: "<display/body/mono>"
    effects: "<expressive-effects-layer/motion selection>"
  responsive_rules:
    mobile: "<360 behavior>"
    tablet: "<768 behavior>"
    desktop: "<1280 behavior>"
  accessibility_plan:
    landmarks: "<list>"
    focus: "<focus-visible strategy>"
    labels: "<form/control labeling plan>"
    keyboard: "<key interactions>"
  PROFILE_SIGNATURES:
    required: ["<non-negotiable profile signatures>"]
    selected: ["<signatures this draft will implement>"]
    excluded: ["<only if explicitly out of scope>"]
    effects_stack:
      atmosphere: ["<profile-consistent atmosphere effects>"]
      interaction: ["<profile-consistent interaction effects>"]
  deliverables:
    files_to_touch: ["<paths>"]
    files_not_to_touch: ["<paths>"]
  verification_plan:
    checks: ["semantic", "keyboard", "contrast", "responsive", "regression"]
```

`DELTA_SUMMARY` schema (mandatory for `small-refinement`):

```yaml
DELTA_SUMMARY:
  task_mode: "small-refinement"
  requested_delta: "<1 sentence>"
  locked_invariants:
    output_target: "vanilla|react|nextjs"
    styling_system: "css|tailwind"
    design_profile: "<profile-id|keep-existing>"
    surface_archetype: "landing|dashboard|app-screen|component-demo|mixed-other"
    theme_mode: "dark|light|both-toggle-dark-default|both-toggle-light-default"
    expressive_intensity: "restrained|balanced|high-drama"
    icon_system: "keep-existing|heroicons|tabler|feather|material-icons|tabler-inline-svg|feather-inline-svg|material-inline-svg|none"
    intervention_mode: "polish-existing|partial-restyle|full-takeover|not-applicable"
    component_scope:
      mode: "none|starter|universal|theme-exclusive|mixed"
      requested_components: ["<optional component ids>"]
    layers:
      tailwind: "yes|no|keep-existing"
      shadcn_ui: "yes|no|keep-existing"
      recharts: "yes|no|keep-existing"
  implementation_scope:
    touched_surfaces: ["<sections/components/files changed>"]
    protected_surfaces: ["<areas intentionally kept stable>"]
  verification_scope:
    ran: ["<targeted checks>"]
    skipped: ["<skipped checks + why>"]
```

`PROFILE_SIGNATURES` is required when `design_profile` is an expressive profile with signature requirements (`retro-terminal`, `cyberpunk-neon`, `arctic-mono`, `noire-editorial`, `corporate-blueprint`, `pastel-dreamscape`, `sunset-gradient`). Omit it only for `keep-existing` or profiles without a signature contract.

If blocked, emit `ERROR_BLOCK` using the canonical shape from [references/90-error-taxonomy.md](references/90-error-taxonomy.md).

## Quality Checks

Before final output, verify:

- semantic structure and landmarks
- keyboard navigation and visible focus
- color contrast not obviously broken
- responsive behavior at `360px`, `768px`, `1280px` for `full-build`, or targeted breakpoints for `small-refinement`
- table/chart interactions when data surfaces are in scope
- no regressions to existing behavior/contracts
- verification coverage summary (what ran, what skipped, why)

## Example Transformations

Use these as golden direction anchors:

- [landing.modern-saas.md](design/examples/landing.modern-saas.md)
- [landing.pastel-dreamscape.md](design/examples/landing.pastel-dreamscape.md)
- [dashboard.corporate-blueprint.md](design/examples/dashboard.corporate-blueprint.md)
- [app-screen.noire-editorial.md](design/examples/app-screen.noire-editorial.md)
- [dashboard.cyberpunk-neon.md](design/examples/dashboard.cyberpunk-neon.md)
- [landing.arctic-mono.md](design/examples/landing.arctic-mono.md)
- [landing.retro-terminal.md](design/examples/landing.retro-terminal.md)
- [landing.sunset-gradient.md](design/examples/landing.sunset-gradient.md)

Use A/B evidence prompts in `examples/ab/` for consistency checks.
