# React Playbook

Load this file only when React (non-Next) is the selected target.

## Architecture

- Match existing component and folder conventions.
- Keep components single-purpose and composable.
- Split presentation and data wiring when complexity grows.

## Data And State

- Keep state as local as possible.
- Derive view state instead of duplicating it.
- Model loading, empty, and error states explicitly.
- For dashboard/data surfaces, include practical exploration controls by default:
  - sortable/filterable tables
  - responsive charts with lightweight interaction (tooltip/hover/legend)
- Use shared primitives (for example `templates/ui/DataTable.tsx`, `templates/ui/ChartCard.tsx`) when they reduce repeated logic.

## Accessibility

- Use semantic HTML first, ARIA only when needed.
- Ensure keyboard access for all controls and composite widgets.
- Keep labels, helper text, and validation errors programmatically associated.
- For sortable tables, keep `aria-sort` accurate on active headers and visible sort indicators.

## Theme Contrast Safety

- For `light` or `both-toggle-*` outputs, verify light-mode readability before finalizing.
- Keep text colors tied to theme tokens/classes; avoid hardcoded light text for shared content.
- Check hero titles, body copy, form labels, muted text, and button labels in light mode.

## Performance

- Avoid unnecessary re-renders from unstable props.
- Memoize only when profiling or obvious churn justifies it.
- Keep heavy UI chunks lazily loaded when reasonable.

## Font And Scaffold Safety

- Prefer skill-shipped bundled fonts first (`A`) when profile/brand fidelity matters.
- If font delivery is unresolved, ask one concise selector: `A) skill-shipped fonts (Recommended)`, `B) skill fonts via Google-hosted web fonts`, `C) local/system`, or `D) other custom fonts`.
- If user does not choose, resolve using `A -> B -> C` (`D` is explicit user override).
- If `A` is selected/defaulted, use in-repo bundled font files via `@font-face` and deterministic fallback stacks.
- If bundled files are unavailable/invalid, attempt `B` once, then fall back to `C`.
- In `B`, keep family parity with `A` (title/body/mono intent must match); change host/source only.
- Do not guess unsupported font-weight combinations for third-party web fonts.
- For `D`, apply user-provided custom font files/instructions; if unresolved, ask once then fall back `A -> B -> C`.
- If custom font support is uncertain after trying `A` and `B`, use `C` to keep delivery reliable.
- Avoid generating setup/config churn just to support non-essential font swaps.

## Icon System Safety

- Prefer existing icon dependency in the repo when available.
- If requested icon package is missing, ask once before adding dependencies.
- Keep one icon family per surface unless user explicitly requests mixed systems.
- Use `currentColor` and consistent size tokens/classes for icon styling.

## Expressive Effects Layer Guidance

- Treat the Expressive Effects Layer as constrained atmosphere/motion polish over selected profile.
- Resolve the Expressive Effects Layer via:
  - `design/motion/motion.rules.md`
- Enforce active effects within configured tier/global budget (`low=3`, `medium=5`, `high=8`, `custom=12`, global max `12`) and style-scoped effect availability.
- For continuous effects, provide `prefers-reduced-motion` fallbacks.
- On dense surfaces (tables/forms/data-heavy dashboards), downgrade continuous Expressive Effects Layer motion.
- Keep full-viewport overlays to one by default.
- Exception: `cyberpunk-neon` and `retro-terminal` may combine `grid-overlay + scanline-overlay` when readability remains acceptable.

## Anti-Patterns

- Do not assume router presence unless detected.
- Do not create deep prop-drilling trees when composition or context is cleaner.
- Do not ship component-only happy paths without robust state handling.
- Do not ship unresolved icon imports.
- Do not ship untouched starter template sections/copy in final UI.
- Do not exceed Expressive Effects Layer effect budget or style-scoped effect constraints.
- Do not allow the Expressive Effects Layer to degrade readability or focus visibility.
- Do not ship dual-theme UIs where light mode reuses dark-only text color classes.
