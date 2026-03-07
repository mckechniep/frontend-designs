---
name: kickass-frontend
description: Deterministic planner-first frontend skill for Vanilla HTML/CSS/JS, React, and Next.js. Invoke explicitly with $kickass-frontend to scope-lock stack/style, produce PLAN and DESIGN_SPEC artifacts, then render accessible, responsive, profile-consistent UI with verification gates and refinement support.
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

### Step 0 - Scope Lock

Lock required execution choices before any implementation.

1. Lock `output_target`: `vanilla | react | nextjs`.
2. Lock `styling_system`: `css | tailwind`.
3. Lock `design_profile`: concrete profile id or `keep-existing`.
4. Lock theme, optional layers, and icon system.
5. Lock `expressive_intensity` (`high-drama` default; downgrade only when user asks).
6. In non-empty repos, run existing UI triage and intervention-mode selection.

Use:

- Contract and non-negotiables: [references/00-contract.md](references/00-contract.md)
- Stack detection: [references/10-stack-detection.md](references/10-stack-detection.md)
- Existing UI triage: [references/21-existing-ui-triage.md](references/21-existing-ui-triage.md)
- Style system: [references/30-style-system.md](references/30-style-system.md)
- Prompt inventory: [references/23-prompt-inventory.md](references/23-prompt-inventory.md)
- Profile registry: [references/32-profile-registry.md](references/32-profile-registry.md)
- Expressive effects layer rules: [design/motion/motion.rules.md](design/motion/motion.rules.md)

Scope-lock questioning rules:

- Detect before asking.
- Ask at most 1-3 questions only when decisions are blocking.
- Ask stack and styling as separate locks (`output_target`, `styling_system`); avoid ambiguous shorthand-only prompts.
- When asking for a profile choice, include the profile menu from [references/30-style-system.md](references/30-style-system.md) in the same message.
- In empty/greenfield ambiguous context, use the verbatim canned scope-lock prompt from [references/10-stack-detection.md](references/10-stack-detection.md).
- Do not re-ask locked choices after proceeding.

### Step 1 - PLAN (Required Output)

Before code, output `PLAN` with:

- page purpose (1 sentence)
- layout map (sections + grid strategy)
- component tree (max 12 nodes)
- token usage (colors, spacing, typography, effects)
- responsive rules (`360px`, `768px`, `1280px`)
- accessibility notes (landmarks, focus, labels, keyboard)

### Step 2 - DESIGN_SPEC (Required Output, No Code Yet)

Output a fully populated `DESIGN_SPEC` that matches the schema in **Output Schema**.

Hard rule:

- Do not produce implementation code before `PLAN` and `DESIGN_SPEC` are present.

### Step 3 - Implement (Deterministic Order)

Generate code in this order only:

1. tokens/theme wiring
2. layout skeleton (landmarks + sections)
3. components (buttons/cards/forms/tables/charts)
4. interactions/state wiring
5. responsive + accessibility polish

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
- Design layouts: `design/layout/`
- Design components: `design/components/`
- Templates: `templates/`

### Step 4 - Quality Gates

Run required verification before finalizing:

- Verification gates: [references/91-verification-gates.md](references/91-verification-gates.md)
- Accessibility checklist: [references/50-a11y-checklist.md](references/50-a11y-checklist.md)
- Design rubric: [references/41-design-excellence-rubric.md](references/41-design-excellence-rubric.md)

On blocking failure, return canonical error block from:

- Error taxonomy: [references/90-error-taxonomy.md](references/90-error-taxonomy.md)

### Step 5 - Deliverable Format

Return output in this order:

1. `PLAN`
2. `DESIGN_SPEC`
3. `FILES_CHANGED`
4. `KEY_DECISIONS_AND_RATIONALE`
5. `QUALITY_GATE_RESULTS`
6. `ERROR_BLOCK` (only when blocked)

For first draft and refinements, follow:

- Refinement loop: [references/22-refinement-loop.md](references/22-refinement-loop.md)

## Constraints

- Do not generate code before `PLAN` and `DESIGN_SPEC`.
- Do not implicitly invoke this skill.
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

Return sections in this exact order:

1. `PLAN`
2. `DESIGN_SPEC`
3. `FILES_CHANGED`
4. `KEY_DECISIONS_AND_RATIONALE`
5. `QUALITY_GATE_RESULTS`
6. `ERROR_BLOCK` (conditional)

`DESIGN_SPEC` schema (mandatory):

```yaml
DESIGN_SPEC:
  version: "1.0"
  scope_lock:
    output_target: "vanilla|react|nextjs"
    styling_system: "css|tailwind"
    design_profile: "<profile-id|keep-existing>"
    theme_mode: "dark|light|both-toggle-dark-default|both-toggle-light-default"
    expressive_intensity: "restrained|balanced|high-drama"
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

`PROFILE_SIGNATURES` is required when `design_profile` is an expressive profile with signature requirements (`retro-terminal`, `cyberpunk-neon`, `arctic-mono`, `noire-editorial`, `corporate-blueprint`, `pastel-dreamscape`, `sunset-gradient`). Omit it only for `keep-existing` or profiles without a signature contract.

If blocked, emit `ERROR_BLOCK` using the canonical shape from [references/90-error-taxonomy.md](references/90-error-taxonomy.md).

## Quality Checks

Before final output, verify:

- semantic structure and landmarks
- keyboard navigation and visible focus
- color contrast not obviously broken
- responsive behavior at `360px`, `768px`, `1280px`
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
