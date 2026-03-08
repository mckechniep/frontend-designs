# Verification Gates

Run this phase before final output.

## Protocol Verification

- For `task_mode=full-build`, confirm response includes `PLAN` and `DESIGN_SPEC` before implementation code.
- For `task_mode=small-refinement`, confirm response begins with `DELTA_SUMMARY` and does not force a fresh `PLAN` or `DESIGN_SPEC` unless scope expanded.
- For `task_mode=full-build`, confirm implementation follows deterministic order:
  1. tokens/theme wiring
  2. layout skeleton
  3. components
  4. interactions/state
  5. responsive + accessibility polish
- For `task_mode=small-refinement`, confirm only the requested deltas were patched and untouched surfaces remained stable unless a cross-cutting bug required broader repair.
- Confirm output sections follow the required order for the active `task_mode`.

## Code Verification

If project scripts exist, run relevant checks:

- lint
- typecheck
- build
- test (if fast/relevant)

If a script is unavailable, skip and state that explicitly.

## Dependency Install Permission Gate

Before installing dependencies in Node-based repos, verify:

- `package.json` exists
- install is likely required (`node_modules/` missing or required tool missing)
- requested check cannot proceed without install

Only then ask once for explicit install permission.

If permission is denied:

- do not run install
- report structured error using [references/90-error-taxonomy.md](references/90-error-taxonomy.md)
- continue checks that do not require install

## Targeted Verification Mode (Refinements)

- For `task_mode=small-refinement` or later refinement turns, run targeted checks on touched surfaces first.
- Keep minimum targeted checks aligned to [references/22-refinement-loop.md](references/22-refinement-loop.md).
- Escalate to broader/full verification when shared primitives, config, or cross-surface behavior changed.

## Next ESLint Compatibility Verification

- Detect Next major from `package.json` before lint fixes.
- Next `<=15`: `next lint` may be used; flat config should use `FlatCompat` with `compat.extends("next/core-web-vitals")`.
- Next `>=16`: use ESLint CLI scripts, not `next lint`.
- Treat unresolved lint compatibility errors as blocking.

## Font Delivery Verification

- Prefer skill-shipped local fonts (`A`) first.
- If using Google-hosted fonts (`B`), verify family parity with `A` and treat import/build failures as blocking.
- If `A` fails, attempt `B` once when environment allows, then fall back to `C` local/system.
- For custom font mode (`D`), validate paths/weights; ask once if invalid, then fall back `A -> B -> C`.
- Verify declared families in tokens/style output are actually loaded by at least one mechanism:
  - local `@font-face`/imported stylesheet,
  - framework font loader (`next/font/local` or `next/font/google`),
  - explicit `<link>`/`@import` for hosted fonts.
- If a non-system font family is declared but unresolved, treat as blocking:
  - emit `ERROR_CODE: BUILD_FONT_FAMILY_UNRESOLVED`, or
  - remove unresolved family declarations and continue with deterministic `C` fallback stacks.
- Do not finalize output with undeclared-loading mismatch (for example declaring `"IBM Plex Sans"` without any valid load path).

## Icon Import Verification

- If icon packages are used, run build and treat unresolved icon imports as blocking.
- Ensure selected icon family matches scope lock choice and is not unintentionally mixed.
- If dependency unavailable and install not approved, fall back to existing icons or inline SVG and rerun checks.

## Motion/Expressive Effects Layer Verification

- Validate effects against selected profile menu from `design/motion/motion.rules.md`.
- Enforce effect budgets (`low=3`, `medium=5`, `high=8`, `custom=12`, global max `12`).
- Enforce tier motion budgets (`low=0`, `medium=1`, `high=2` continuous effects).
- Ensure full-viewport overlay limits are respected:
  - default max `1`
  - `cyberpunk-neon` and `retro-terminal` may use `grid-overlay + scanline-overlay` together when readability remains acceptable.
- Verify `prefers-reduced-motion: reduce` disables continuous motion.
- Verify dense surfaces downgrade continuous motion.

## Responsive Verification

For `task_mode=full-build`, check key breakpoints:

- `360px` (mobile)
- `768px` (tablet)
- `1280px` (desktop)

Verify no horizontal overflow and no broken interaction targets.

For `task_mode=small-refinement`:

- check only the breakpoints relevant to touched sections/components first
- include `360px`, `768px`, and `1280px` when the refinement changes layout, shared primitives, or nav/shell structure
- otherwise state which breakpoints were checked and why broader coverage was unnecessary

## Data Interaction Verification

When dashboard/data surfaces are in scope:

- tables: sortable headers + correct visible/ARIA state; filters/search update rows
- charts: responsive container; tooltip/legend/value inspection works unless static charts requested

## Theme Contrast Verification

For `light` or `both-toggle-*` outputs:

- verify normal text >= 4.5:1
- verify large text >= 3:1
- verify focus/control boundaries >= 3:1
- confirm text color is token/theme driven (not hardcoded dark-mode assumptions)

## Accessibility Verification

- keyboard-only pass for primary interactions
- visible focus states on all interactive controls
- labels/assistive text for form and composite controls

## Delivery Verification

- Ensure output files match [references/20-deliverables-matrix.md](references/20-deliverables-matrix.md).
- Ensure no silent dependency additions.
- Report what ran, what skipped, and why.
- For `full-build` first-draft responses, ensure refinement entry uses required 5-line block in [references/22-refinement-loop.md](references/22-refinement-loop.md).
- In existing repos, confirm intervention mode is preserved and recorded in `DESIGN_SPEC.scope_lock.intervention_mode` for `full-build`, or `DELTA_SUMMARY.locked_invariants.intervention_mode` for `small-refinement`.

## Structured Error Reporting

When a blocking failure occurs, report canonical `ERROR_BLOCK` using:

- [references/90-error-taxonomy.md](references/90-error-taxonomy.md)
