# Contract

Treat these rules as non-negotiable.

## Invocation Mode

- Use this skill only when explicitly invoked as `$kickass-frontend`.
- Do not apply this skill implicitly.

## Core Objectives

- Produce intentional UI, not generic boilerplate.
- Preserve compatibility with detected repo stack and conventions.
- Keep output composable, scoped, and extensible.
- Preserve readability/accessibility under all style choices.
- Deliver profile-specific, production-quality visual direction by default.
- Canonical term: `Expressive Effects Layer`.

## Protocol Invariants

- Always lock `task_mode` before normal scope lock.
- `full-build`: run `Task Mode Gate -> Scope Lock -> PLAN -> DESIGN_SPEC -> Implement -> Quality Gates -> Deliver`.
- `small-refinement`: run `Task Mode Gate -> Lock Delta/Invariants -> Implement -> Targeted Quality Gates -> Deliver`.
- Never output code before `PLAN` and `DESIGN_SPEC` on `full-build` tasks.
- Do not force a new `PLAN` or `DESIGN_SPEC` on `small-refinement` tasks unless the user expands scope.
- Ask at most 1-3 blocking questions total across task-mode and scope lock.
- Never re-ask locked choices after proceeding.

## Non-Negotiables

- Do not mix routing paradigms across frameworks.
- Do not use shadcn/ui without Tailwind.
- Do not use Recharts outside React or Next.js.
- Do not replace user-provided company/product names, domain, audience, or core narrative with invented branding unless explicitly requested.
- Do not ship dashboard/analytics data surfaces without baseline exploration controls unless user explicitly requests static output.
- Do not apply low-contrast visual effects to dense data UI.
- Do not rely on color alone for status or meaning.
- Do not ship light mode with light-on-light text or low-contrast body copy.
- Do not hardcode near-white text (`#fff`-like values) for shared text unless scope is explicitly dark-only.
- Do not import vanilla profile CSS directly into React or Next.js outputs.
- Do not require build-time network fetches for default font setup in React/Next outputs.
- Do not perform full visual takeover in existing repos without explicit user confirmation.
- Do not silently add icon-system dependencies.
- Do not ship untouched starter template copy or starter palette defaults.
- Do not honor `keep-existing` when keep-existing viability gate fails.
- Do not treat the Expressive Effects Layer as a profile replacement; it is a constrained overlay layer.
- Do not ship whole-page cursor-follow, crosshair, or spotlight effects; keep them scoped to explicit sections/components only.
- Do not replace the default cursor across an entire landing page or app shell with a custom cursor treatment.
- Do not ship generic layout defaults for expressive profiles (`retro-terminal`, `cyberpunk-neon`, `arctic-mono`, `noire-editorial`) when profile signature requirements are available.
- Do not output `retro-terminal` as generic marketing composition (`site-header + generic hero/cards/contact`) when signature requirements are in scope.
- Do not output `arctic-mono` as generic product marketing composition when cinematic research signatures are in scope.
- Do not output `noire-editorial` as generic centered SaaS composition when dossier/editorial signatures are in scope.
- Do not output `noire-editorial` with warm paper/newsprint page backgrounds when the darker dossier demo is the canonical target.
- Do not spread heavy grain/noise across the full `noire-editorial` page field by default; keep stronger texture focused on boxed surfaces unless the user asks otherwise.
- Do not output `corporate-blueprint` with cramped panel interiors under oversized outer spacing.
- Do not output `modern-saas` as a starter-kit clone with violet glass repetition or centered narrow contact-card closure.
- Do not output `pastel-dreamscape` as a generic wellness/creator landing page with uniform pills and no collage signatures.
- Do not output `sunset-gradient` as a generic rounded SaaS composition with warm gradients pasted over default structure.

## Decision Behavior

- Detect `task_mode` before normal scope lock.
- If the request could be either a `small-refinement` or a `full-build`, ask one immediate clarifying question before stack/style prompts.
- Detect before asking.
- Ask only when a choice changes output.
- If the user provides brand/domain context, lock it and propagate it through title/meta/headings/CTA/copy.
- Resolve stack before icon-system choice.
- Ask stack and styling as separate decisions (`output_target` then `styling_system`) unless user already gave both.
- If a profile choice is requested, include a visible profile option list in the same prompt.
- In empty/greenfield ambiguous repos, use the verbatim canned scope-lock prompt from `references/10-stack-detection.md`.
- After visual direction is locked, lock `expressive_intensity` (`restrained|balanced|high-drama`); default to `high-drama` if unanswered.
- For React/Next targets, resolve optional layer intent (Tailwind, shadcn/ui, Recharts) during stack resolution.
- On `full-build`, record `task_mode`, `icon_system`, and `intervention_mode` in `DESIGN_SPEC.scope_lock`.
- If scope includes dashboard/analytics tables, default to sortable headers and simple filtering unless user asks for static tables.
- If scope includes charts, default to responsive chart containers and basic interaction (tooltip/legend/hover state) unless user asks for static charts.
- Run keep-existing viability gate before honoring keep-existing choices.
- If keep-existing viability fails, ask once for concrete profile + intervention mode.
- If keep-existing viability fails and user does not choose, default by detected surface:
  - landing/brand-forward marketing -> `partial-restyle` + `arctic-mono`
  - dashboard/app/data/product UI -> `partial-restyle` + `corporate-blueprint`
  - if surface type remains ambiguous, prefer `corporate-blueprint` over `modern-saas`
- Resolve Expressive Effects Layer choices immediately after style choice using style-scoped options in `design/motion/motion.rules.md`.
- Resolve profile recipe defaults from `design/profiles/profile.<id>.md` before writing code.
- For `retro-terminal` with `profile_recipe_lock=signature-on`, select `Layout L5 - Terminal Command Console` from `design/layout/landing.layouts.md`.
- On `full-build` tasks for expressive profiles, require a `PROFILE_SIGNATURES` block inside `DESIGN_SPEC` with:
  - required signatures
  - selected effects set
  - interaction set
  - atmosphere stack
- If any cursor-driven effect is selected, lock its scope container(s) in `DESIGN_SPEC`; do not leave scope implicit.
- For demos/canonical examples, keep cursor-driven effects visible in `1-3` named sections/components total, not across the whole page.
- When theme includes light mode (`light` or `both-toggle-*`), verify text/surface contrast before finalizing output.
- Default safely when user does not respond.
- In mixed/degraded existing UI, ask once for intervention mode (`polish-existing`, `partial-restyle`, `full-takeover`).
- After first draft, lock resolved invariants (`task_mode`, style/theme/stack/layers/icon/intervention) unless user explicitly requests a change.
- In refinement mode, offer 1-2 profile-relevant effect upgrades (not a full effect list).
- Run a mandatory self-polish pass against `references/41-design-excellence-rubric.md` before final output.
- If a profile score is weak, revise once before returning deliverables (do not ask user to request this revision).

## Quality Bar

- Maintain clear visual hierarchy.
- Maintain consistent spacing and typography rhythm.
- Keep interactions keyboard-accessible.
- Keep responsive layout functional at `360px` width.
- Ensure the first draft already reads as profile-specific and non-generic within 5 seconds.
- Meet minimum contrast targets:
  - normal text >= 4.5:1
  - large text >= 3:1
  - focus/interactive boundaries >= 3:1
