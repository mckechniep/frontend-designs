# Refinement Loop

Use this after the first draft is delivered, or when `task_mode=small-refinement` is locked at the start of the turn.

## Task Mode Split (Mandatory)

Use this file in two different ways:

- `full-build`: after first-draft delivery, send the required refinement handoff block below before waiting for feedback.
- `small-refinement`: skip the first-draft handoff block, keep current invariants locked, implement only the requested delta, and return a concise `DELTA_SUMMARY` instead of a fresh `PLAN` + `DESIGN_SPEC`.

## Full-Build First-Draft Handoff (Mandatory)

Immediately after `full-build` first-draft delivery, always send a concise handoff block before waiting for user feedback:

1. `What I changed` (high-level delta)
2. `Locked invariants` (task mode/style/theme/stack/layers/icons/intervention mode)
3. `Verification coverage` (ran, skipped, why)
4. `Refinement entry prompt` (explicitly invite refinements)

If this handoff is skipped, refinement mode is considered not entered.

Use this required refinement entry prompt structure in the first-draft handoff:

`------ REFINEMENTS & SECOND PASS ------`

`If you want refinements, I can do a focused pass aligned to your <style>/<theme>/<stack> direction.`

`I can also add components next (for example: <component option 1>, <component option 2>, <component option 3>).`

`Tell me what you want changed or added and I’ll implement it in the next pass.`

`If you want to revise your previous refinement answer, type \`<Back>\` and I’ll re-ask the previous refinement question.`

Hard rules:

- Format this as a clearly separated block with the dashed refinement header line first.
- Include all five prompt lines above in order.
- Render the five lines as five separate paragraphs with exactly one blank line between each line.
- Do not collapse the refinement entry prompt into a compact list or a single wrapped paragraph.
- Tailor component examples to current surface type (landing/dashboard/app screen) and selected stack.
- Do not mention locked `layers` in user-facing first-draft refinement prompt text.
- Include the backticked `<Back>` navigation line above in first-draft refinement handoff and in any later multi-question refinement interrogation.

## Small-Refinement Entry Rules

When `task_mode=small-refinement`:

- do not emit the first-draft 5-line refinement handoff block
- do not generate a fresh `PLAN` or full `DESIGN_SPEC`
- treat current UI and locked invariants as the baseline contract
- return `DELTA_SUMMARY` with:
  - requested delta
  - locked invariants retained
  - targeted verification coverage
- ask only for missing blocking invariants or a task-mode clarification if the request is ambiguous

After the required 5-line block, include this optional one-line offer:

`If you want visual upgrades next, I can add 1-2 profile-relevant effects (for example in cyberpunk-neon: \`scoped cursor-spotlight\` + \`title-rgb-split\`).`

After the optional upgrade offer, include this optional one-line downgrade offer:

`If you want, I can also tone the visual intensity down in the next pass (\`high-drama\` -> \`balanced\` or \`restrained\`) while keeping the same profile.`

## Component Option Source Of Truth

For this line:

`I can also add components next (for example: <component option 1>, <component option 2>, <component option 3>).`

Source component options in this order:

1. Exact match from this file's canonical matrix (profile + surface type + stack).
2. If exact match is unavailable, derive from:
   - `references/40-layout-patterns.md`
   - `references/20-deliverables-matrix.md`
   - active profile doc `design/profiles/profile.<id>.md`
3. If user already requested a refinement focus area, keep all three options inside that focus area.

Option quality rules:

- Use concrete component nouns/phrases, not placeholders.
- Keep exactly 3 options.
- Keep options scoped to current page type (landing/dashboard/app screen) and selected stack.
- Avoid generic options (for example "improve styling", "make UI better").

## Canonical Refinement Prompt Examples

Use these as reference outputs for the `Refinement entry prompt` block. Use each example's direction + component options, then render them with the required 5-line formatted prompt block above.

### modern-saas

- Landing + vanilla:
  - `If you want refinements, I can do a focused pass aligned to your modern-saas/dark/vanilla direction.`
  - `I can also add components next (for example: animated pricing calculator, trust-logo rail, feature comparison grid).`
- Dashboard + React:
  - `If you want refinements, I can do a focused pass aligned to your modern-saas/dark/react direction.`
  - `I can also add components next (for example: KPI stat cards with trend deltas, activity timeline panel, saved-filter command bar).`
- App screen + Next.js:
  - `If you want refinements, I can do a focused pass aligned to your modern-saas/dark/nextjs direction.`
  - `I can also add components next (for example: onboarding progress shell, account settings tabs, notification preferences panel).`

### corporate-blueprint

- Landing + vanilla:
  - `If you want refinements, I can do a focused pass aligned to your corporate-blueprint/dark/vanilla direction.`
  - `I can also add components next (for example: annotated services grid, phased methodology timeline, enterprise contact workflow form).`
- Dashboard + React:
  - `If you want refinements, I can do a focused pass aligned to your corporate-blueprint/dark/react direction.`
  - `I can also add components next (for example: portfolio allocation widgets, risk exposure heat table, approvals queue module).`
- App screen + Next.js:
  - `If you want refinements, I can do a focused pass aligned to your corporate-blueprint/dark/nextjs direction.`
  - `I can also add components next (for example: policy detail side panel, audit log stream, role-permission management view).`

### cyberpunk-neon

- Landing + vanilla:
  - `If you want refinements, I can do a focused pass aligned to your cyberpunk-neon/dark/vanilla direction.`
  - `I can also add components next (for example: neon feature scanner section, terminal-style CTA block, live status ticker band).`
- Dashboard + React:
  - `If you want refinements, I can do a focused pass aligned to your cyberpunk-neon/dark/react direction.`
  - `I can also add components next (for example: pulse KPI wall, anomaly alert console, event stream inspector).`
- App screen + Next.js:
  - `If you want refinements, I can do a focused pass aligned to your cyberpunk-neon/dark/nextjs direction.`
  - `I can also add components next (for example: ops command dock, machine telemetry cards, scenario simulation panel).`

### arctic-mono

- Landing + vanilla:
  - `If you want refinements, I can do a focused pass aligned to your arctic-mono/light/vanilla direction.`
  - `I can also add components next (for example: diagnostic hero shell, numbered research modules grid, divisions row-list with slide interaction, publication record cards).`
- Dashboard + React:
  - `If you want refinements, I can do a focused pass aligned to your arctic-mono/light/react direction.`
  - `I can also add components next (for example: frost telemetry board, diagnostic signal panel, sortable operations table with technical tags).`
- App screen + Next.js:
  - `If you want refinements, I can do a focused pass aligned to your arctic-mono/light/nextjs direction.`
  - `I can also add components next (for example: mission control side panel, numbered workflow steps, live status console cards).`

### noire-editorial

- Landing + vanilla:
  - `If you want refinements, I can do a focused pass aligned to your noire-editorial/dark/vanilla direction.`
  - `I can also add components next (for example: investigations wall module, witness-statement stack, records feed sidebar, final briefing split).`
- Dashboard + React:
  - `If you want refinements, I can do a focused pass aligned to your noire-editorial/dark/react direction.`
  - `I can also add components next (for example: narrative KPI row, dossier spotlight cards, records activity feed).`
- App screen + Next.js:
  - `If you want refinements, I can do a focused pass aligned to your noire-editorial/dark/nextjs direction.`
  - `I can also add components next (for example: editorial settings workspace, case-file approval queue, spotlight detail rail).`

### retro-terminal

- Landing + vanilla:
  - `If you want refinements, I can do a focused pass aligned to your retro-terminal/dark/vanilla direction.`
  - `I can also add components next (for example: operator profile whoami block, live netstat threat panel, secure-session contact console).`
- Dashboard + React:
  - `If you want refinements, I can do a focused pass aligned to your retro-terminal/dark/react direction.`
  - `I can also add components next (for example: command-center KPI rows, alert feed terminal panel, filtered incident log table).`
- App screen + Next.js:
  - `If you want refinements, I can do a focused pass aligned to your retro-terminal/dark/nextjs direction.`
  - `I can also add components next (for example: session diagnostics console, process queue monitor, terminal settings drawer).`

### pastel-dreamscape

- Landing + vanilla:
  - `If you want refinements, I can do a focused pass aligned to your pastel-dreamscape/light/vanilla direction.`
  - `I can also add components next (for example: philosophy card trio, numbered service editorial, guided process flow).`
- Dashboard + React:
  - `If you want refinements, I can do a focused pass aligned to your pastel-dreamscape/light/react direction.`
  - `I can also add components next (for example: pastel KPI clusters, mood-coded status board, friendly task panel).`
- App screen + Next.js:
  - `If you want refinements, I can do a focused pass aligned to your pastel-dreamscape/light/nextjs direction.`
  - `I can also add components next (for example: guided onboarding steps, profile personalization cards, reminders center module).`

### sunset-gradient

- Landing + vanilla:
  - `If you want refinements, I can do a focused pass aligned to your sunset-gradient/dark/vanilla direction.`
  - `I can also add components next (for example: glowing dashboard hero orb, quiet logo row, three-pillar solutions grid, rotating platform rings, or centered CTA glow section).`
- Dashboard + React:
  - `If you want refinements, I can do a focused pass aligned to your sunset-gradient/dark/react direction.`
  - `I can also add components next (for example: gradient KPI ribbon, goal progress board, comparative metrics cards).`
- App screen + Next.js:
  - `If you want refinements, I can do a focused pass aligned to your sunset-gradient/dark/nextjs direction.`
  - `I can also add components next (for example: journey checkpoint panel, account highlights feed, action-priority side rail).`

## Goals

- Preserve the approved direction.
- Execute change requests quickly without regressions.
- Keep checks proportional to the blast radius.

## Locked Scope-Lock Invariants

After scope lock + first draft, treat these as locked:

- task mode
- style profile
- theme mode
- stack target
- optional layers (`tailwind`, `shadcn-ui`, `recharts`)
- icon system
- intervention mode (`polish-existing`, `partial-restyle`, `full-takeover`)

Do not change locked invariants unless the user explicitly requests the change.

## Unlock Rules

- If user explicitly asks to change a locked invariant, confirm the new value once and proceed.
- If a requested refinement conflicts with locked invariants, keep invariants and offer a compatible alternative.
- If user says "switch style/theme/stack/layers/icon mode", treat that as explicit unlock.

## Standard Refinement Protocol

1. Parse the user request as a delta against current output.
2. Classify the change:
   - content/copy
   - component behavior
   - layout/composition
   - data interactions (table/chart)
   - assets (logo/favicon/images)
   - invariant change request
3. Apply only requested deltas in-scope.
4. Keep untouched surfaces stable unless a cross-cutting bug requires broader fixes.
5. Run targeted checks (see below).
6. Return `DELTA_SUMMARY`:
   - what changed
   - what remained locked
   - what was verified
7. Offer at most 1-2 profile-relevant effect upgrades (never full effect menu dump).
   - Example (`cyberpunk-neon`): `scoped cursor-spotlight` + `title-rgb-split`

## Dependency Permission Gate (Refinement Turns)

Before asking to install dependencies, confirm install is actually needed:

- `package.json` exists, and
- required local dependency/tool is missing (for example `node_modules/` absent, or script-required binary/module not resolvable), and
- target step cannot proceed without install.

When all three are true:

- ask once for explicit permission to install (for example `Can I install dependencies with npm install?`)
- if permission is granted, run install and continue
- if permission is denied or unavailable, emit a structured error using `references/90-error-taxonomy.md` and continue with non-install fallback where possible

Do not ask for install permission when install is not required for the requested refinement scope.

Theme-scoped component guardrail:

- Keep ticker/carousel aligned to profile defaults unless user explicitly requests an override.
- Do not introduce carousel by default on `retro-terminal`; require explicit user request.

## Targeted Check Matrix

- Copy/content only:
  - sanity-check markup integrity and obvious overflow.
- Component behavior changes:
  - keyboard/focus behavior for touched controls
  - console/runtime error check for touched JS paths
- Theme-scoped ticker/carousel changes:
  - verify active profile scope mapping still matches `references/40-layout-patterns.md`
  - verify out-of-scope components are hidden and in-scope components render/behave correctly
- Layout/responsive changes:
  - check `360px`, `768px`, `1280px` for touched sections
- Table/chart changes:
  - table sort/filter behavior
  - chart responsiveness and interaction affordances (unless static requested)
- Theme/style token changes:
  - contrast check in active mode(s), especially light mode when enabled
- Asset integration (logo/favicon/images):
  - file/path existence
  - visual fit and sizing at target breakpoints

Escalate to full verification when:

- stack config/build tooling changed
- shared primitives changed
- multiple core surfaces changed together

## Post-Revision Follow-Up Prompt

After each refinement, ask one concise follow-up:

`If you want, I can keep going with additions that stay within the current style/theme/stack/layers — e.g. more components, extra pages, chart/table expansions, or logo/favicon/image integration.`

When follow-up uses a question sequence, include:

`Tip: type <Back> to revisit the previous refinement question.`
