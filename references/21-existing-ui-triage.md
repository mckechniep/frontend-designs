# Existing UI Triage

Use this file when the repo already has frontend UI.

## Goal

Decide whether to preserve, partially restyle, or fully take over visual direction.

## Quick Triage

Evaluate existing UI quickly across these dimensions:

- Visual consistency (typography, spacing, color system, component patterns)
- Responsiveness (mobile layout, overflow, tap-target usability)
- Accessibility basics (focus visibility, labels, contrast, keyboard flow)
- Product fit (does current design support intended audience/use case)

## Triage Outcome

Classify current UI as one of:

- `healthy`: coherent design language, mostly maintainable
- `mixed`: uneven quality, inconsistent sections/components
- `degraded`: visibly weak/incoherent design requiring direction reset

## Keep-Existing Viability Gate

Run this gate before accepting any `keep-existing` choice (style/theme/icon/stack conventions).

Pass only when all conditions are true:

- Frontend surfaces exist (not empty/scaffold-only).
- A reusable visual system exists (shared tokens/theme primitives and repeated component patterns).
- Baseline UI is readable and responsive enough to improve without direction reset.

Fail immediately when any condition is true:

- No meaningful frontend surfaces exist (empty repo or placeholder-only UI).
- Existing frontend cannot render reliably (broken imports/build preventing baseline UI).
- Triage outcome is `degraded` with no reusable design patterns worth preserving.

If gate passes:

- `keep-existing` is allowed.
- `keep-existing` may include all Expressive Effects Layer tiers (`low|medium|high`) as an overlay layer while preserving existing structure/contracts.

If gate fails:

- `keep-existing` is not allowed for style direction.
- Ask once for a concrete profile + intervention mode (`partial-restyle` or `full-takeover`).

## Intervention Modes

Offer one explicit choice when outcome is `mixed` or `degraded` and user has not already specified approach:

1. `polish-existing`: keep visual system, improve quality and consistency
2. `partial-restyle`: re-theme selected surfaces/components to chosen profile
3. `full-takeover`: replace visual language broadly with chosen profile

## Prompt Pattern

Use one concise control prompt:

- "Current UI looks [mixed/degraded]. Do you want me to polish existing styles, partially restyle to a profile, or fully take over with a profile while preserving functionality?"

## Canned Prompt (Use Verbatim)

Use this exact prompt when intervention mode is not user-specified:

```text
I reviewed the existing UI and it looks [mixed/degraded]. Choose how you want me to proceed: 1) `polish-existing` (keep current style, improve quality), 2) `partial-restyle` (apply a profile to key surfaces), or 3) `full-takeover` (shift to a profile broadly while preserving app behavior).
```

Use this exact prompt when `keep-existing` fails the viability gate:

```text
I checked the current UI and `keep-existing` is not viable here (insufficient or degraded baseline design system). Choose: 1) `partial-restyle` with a concrete profile, or 2) `full-takeover` with a concrete profile. If you do not choose, I will proceed with `partial-restyle` + `arctic-mono` for landing/brand-forward work, or `partial-restyle` + `corporate-blueprint` for dashboard/app/data/product UI.
```

## Safety Rules

- Preserve routes, data contracts, and core product behaviors.
- Avoid destructive rewrites of business logic.
- If scope is large, apply takeover to requested pages first, then expand.
- Always state chosen intervention mode in `DESIGN_SPEC.scope_lock.intervention_mode` for `full-build`, or in `DELTA_SUMMARY.locked_invariants.intervention_mode` for `small-refinement`.

## Defaults

- `healthy` -> default `polish-existing`
- `mixed` -> default `partial-restyle` only if user asks for redesign; otherwise ask once
- `degraded` -> recommend `full-takeover`, but require explicit user confirmation before broad restyle
- If `keep-existing` fails viability gate and user does not choose: default by detected surface:
  - landing/brand-forward marketing -> `partial-restyle` + `arctic-mono`
  - dashboard/app/data/product UI -> `partial-restyle` + `corporate-blueprint`
  - if surface type remains unclear, prefer `partial-restyle` + `corporate-blueprint`
- If that fallback is used and expressive effects layer tier is unanswered, use the selected profile default tier from `design/motion/motion.rules.md`.
