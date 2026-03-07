# Next.js Playbook

Load this file only when Next.js is the selected target.

## Architecture

- Use App Router when `app/` exists; otherwise follow existing Pages Router project shape.
- Keep route-level files focused; extract repeated UI into reusable components.
- Default to Server Components. Add `"use client"` only when interactivity is required.

## Data And State

- Prefer server data fetching for first render.
- Use client state only for local interaction state.
- Handle loading and error states explicitly for each async region.
- For dashboard/data surfaces, default to practical interaction:
  - sortable/filterable table behavior
  - responsive charts with tooltip/hover/legend when charts are in scope
- Keep interactive table/chart logic in focused client components; keep page/layout server-first.

## Accessibility

- Preserve semantic landmarks and heading order per route.
- Ensure interactive client components are keyboard-usable.
- Keep focus styles visible across light/dark/profile variants.
- For sortable tables, maintain correct `aria-sort` state on active column headers.

## Theme Contrast Safety

- For `light` or `both-toggle-*` outputs, verify light-mode text contrast before finalizing.
- Keep text colors theme-token driven; avoid shared `text-white` classes for body copy in dual-theme UIs.
- Validate key surfaces in light mode: hero titles, body copy, labels, muted text, buttons.

## Performance

- Minimize client bundle footprint by limiting `"use client"` boundaries.
- Prefer static or cached server rendering where appropriate.
- Avoid large client-only dependencies for simple UI needs.

## Font And Scaffold Safety

- Keep font setup centralized in `app/layout.tsx`.
- Prefer `next/font/local` first when profile/brand fidelity matters and font files are committed in repo.
- If font delivery is unresolved, ask one concise selector: `A) skill-shipped fonts (Recommended)`, `B) skill fonts via Google-hosted web fonts`, `C) local/system`, or `D) other custom fonts`.
- If user does not choose, resolve using `A -> B -> C` (`D` is explicit user override).
- Treat `next/font/local` with skill-shipped bundled files as primary path for `A`:
  - keep/copy bundled font files in-repo (for example `public/fonts/*` or `app/fonts/*`),
  - use explicit relative paths and weights,
  - if files are unavailable/invalid, attempt `B` once, then fall back to `C`.
- Use `next/font/google` for `B` when:
  - bundled files are unavailable/invalid, and
  - build environment is expected to have network access.
- In `B`, keep family parity with `A` (for example same title/body/mono family intent); change host/source only.
- For `D`, apply user-provided custom font files/instructions; if unresolved, ask once then fall back `A -> B -> C`.
- If using `next/font/google`, never guess weights.
- Use only weights documented for the selected font family.
- For single-weight families (for example `Share_Tech_Mono`), pin exactly that weight (`"400"`).
- If unsure about a profile font's available weights, attempt local/system only as final safety net (`C`).

## Config Guardrails

- Do not invent or modify Next config unless the task requires it.
- Do not add unrelated scaffolding files during UI-only tasks.
- Keep generated code compatible with existing scripts and directory conventions.
- If a required script/config is missing, state it clearly instead of fabricating setup.

## ESLint Compatibility (Version-Aware)

- Read Next major from `package.json` before touching lint config.
- Keep `next` and `eslint-config-next` majors aligned.

For Next `<=15`:

- `next lint` is expected in project scripts.
- If `eslint.config.mjs` is used, prefer FlatCompat:
  - `compat.extends("next/core-web-vitals")`
- Avoid direct subpath imports in flat config for this branch (for example `eslint-config-next/core-web-vitals`).
- If FlatCompat is used, ensure `@eslint/eslintrc` is present in dev dependencies.

For Next `>=16`:

- `next lint` is no longer available; use ESLint CLI (for example `eslint .`) via repo scripts.
- Prefer official flat-config usage of `eslint-config-next/core-web-vitals`.

If lint fails with:

- `Cannot find module ... eslint-config-next/core-web-vitals` from `eslint.config.mjs`

Then:

- On Next `<=15`, migrate to FlatCompat pattern and add `@eslint/eslintrc` if missing.
- Rerun lint and treat unresolved errors as blocking.

## Icon System Safety

- Prefer the repo's existing icon package when present.
- If user requests a different icon system and package is missing, ask once before adding dependency.
- For Material icons, avoid introducing full MUI dependency chain unless user explicitly approves.
- Keep icon imports consistent and from one family unless user requests mixing.

## Expressive Effects Layer Guidance

- Treat the Expressive Effects Layer as overlay polish, not layout rewrite.
- Resolve the Expressive Effects Layer using:
  - `design/motion/motion.rules.md`
- Implement the Expressive Effects Layer with stack-native classes/components/tokens.
- Enforce active effects within configured tier/global budget (`low=3`, `medium=5`, `high=8`, `custom=12`, global max `12`).
- Enforce style-scoped effect availability.
- Use `prefers-reduced-motion` to disable continuous motion and keep static alternatives.
- On dense surfaces (tables/forms/data-heavy regions), auto-downgrade continuous Expressive Effects Layer motion.
- Keep full-viewport overlays to one by default.
- Exception: `cyberpunk-neon` and `retro-terminal` may combine `grid-overlay + scanline-overlay` when readability remains acceptable.

## Anti-Patterns

- Do not introduce React Router.
- Do not mark entire route trees as client components without need.
- Do not hide async failure states behind empty placeholders.
- Do not default to `next/font/google` when self-hosted local files are available and viable.
- Do not ship `next/font/google` imports with unverified weights or in network-restricted builds.
- Do not ship unresolved icon imports.
- Do not ship untouched starter template sections/copy in final UI.
- Do not keep `next lint` scripts on Next `>=16`.
- Do not leave unresolved `eslint-config-next/core-web-vitals` import errors.
- Do not exceed Expressive Effects Layer effect budget or style-scoped effect constraints.
- Do not let the Expressive Effects Layer reduce readability/contrast on dense data UI.
- Do not ship dual-theme output where light mode retains dark-mode foreground classes.
