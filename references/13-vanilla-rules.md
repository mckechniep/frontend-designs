# Vanilla Playbook

Load this file only when Vanilla HTML/CSS/JS is the selected target.

## Architecture

- Keep structure semantic (`header`, `main`, `section`, `footer`, form semantics).
- Keep CSS token-driven where possible (colors, spacing, radius, shadows, fonts).
- Keep JavaScript progressive and minimal.

## State And Behavior

- Prefer unobtrusive event wiring (`data-*` hooks).
- Guard all JS behavior against missing DOM nodes.
- Keep feature scripts modular and readable.
- For dashboard/analytics surfaces, default to lightweight client-side table sort/filter behavior unless user requests static tables.
- For chart regions in Vanilla, use responsive SVG/canvas patterns and provide textual fallback summaries.

## Accessibility

- Ensure full keyboard reachability and visible focus states.
- Ensure inputs have labels and clear validation/error messaging.
- Use ARIA only when native semantics cannot express behavior.

## Theme Contrast Safety

- For `light` or `both-toggle-*` outputs, ensure light-mode text is dark enough on light surfaces.
- Keep text/surface colors token-driven per theme (for example `:root[data-theme="light"]` overrides).
- Validate readability for hero text, body copy, labels, muted text, and button text in light mode.

## Performance

- Avoid unnecessary JS for purely presentational concerns.
- Keep CSS selectors maintainable and not overly specific.
- Keep payload small and avoid dependency creep.
- Keep table/chart interactivity lightweight (no framework-like state layers for simple sort/filter/tooltip behavior).

## Font And Asset Safety

- If font delivery is unresolved, ask one concise selector: `A) skill-shipped fonts (Recommended)`, `B) skill fonts via Google-hosted web fonts`, `C) local/system`, or `D) other custom fonts`.
- If user does not choose, resolve using `A -> B -> C` (`D` is explicit user override).
- For `B`, use explicit `<link>` or CSS `@import`; avoid hidden runtime fetch assumptions.
- In `B`, keep family parity with `A` (same family intent as bundled profile fonts); change host/source only.
- For `A`, use bundled in-repo font files via `@font-face` with explicit formats/weights and deterministic fallback stacks.
- For this skill's vanilla starter, `A` uses `assets/vanilla-starter/styles.fonts.local.css` with files under `assets/fonts-bundled/`.
- For `D`, use user-provided local files/instructions and verify paths/weights.
- If `A` is selected/defaulted but files are unavailable/invalid, attempt `B` once, then fall back to `C`.

## Icon System Safety

- Prefer inline SVG icons for Vanilla unless user requests package setup.
- Keep one icon family and a consistent stroke/fill style across each UI surface.
- Use `currentColor`, semantic labels, and `aria-hidden` for decorative icons.

## Expressive Effects Layer Guidance

- Resolve the Expressive Effects Layer through:
  - `design/motion/motion.rules.md`
- Use root data attributes/classes to drive Expressive Effects Layer state.
- Enforce tier/global effect budgets (`low=3`, `medium=5`, `high=8`, `custom=12`, global max `12`) and style-scoped effect availability.
- Implement motion via CSS, not JS animation loops.
- Add `prefers-reduced-motion` static fallbacks for continuous effects.
- Auto-downgrade continuous Expressive Effects Layer motion on dense surfaces (forms/tables/data-heavy regions).
- Keep full-viewport overlays to one by default.
- Exception: `cyberpunk-neon` and `retro-terminal` may combine `grid-overlay + scanline-overlay` when readability remains acceptable.

## Anti-Patterns

- Do not recreate framework-level abstractions without clear need.
- Do not use div-only layouts when semantic elements are available.
- Do not rely on JS for content that can be server/static HTML.
- Do not exceed Expressive Effects Layer effect budget or style-scoped effect constraints.
- Do not allow Expressive Effects Layer overlays/glows to reduce legibility or focus visibility.
- Do not ship light theme with inherited dark-mode text colors or hardcoded near-white body text.
