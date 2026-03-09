The starter now has two clear roles:

- `index.html` is the demo directory / launcher for the canonical bespoke profile pages.
- `../../components/index.html` is the dedicated component vault for reusable UI review and experiments.

Dedicated fixed-profile portfolio entry pages live alongside the directory:

- `modern-saas.html`
- `cyberpunk-neon.html`
- `arctic-mono.html`
- `noire-editorial.html`
- `corporate-blueprint.html`
- `retro-terminal.html`
- `pastel-dreamscape.html`
- `sunset-gradient.html`

These pages pin `data-fixed-profile` on `<html>`, preload their profile stylesheet, and keep shared runtime only where a page still needs it for profile-specific interactions.

They are now bespoke portfolio entry pages rather than simple fixed-profile wrappers:

- each page has its own section mix and copy
- pricing is only present where it fits the profile
- profile-specific runtime hooks are preserved where needed (for example retro terminal feed, arctic blueprint layers, noire editorial treatments, and corporate blueprint crosshair coordinates)

Shared profile switching still applies to internal lab surfaces like `components.html`, while the dedicated component vault now lives at `../../components/index.html`:

- Profile `<select data-profile-select>` options come from `profiles.json`
- Selecting a profile injects/updates `<link id="profile-stylesheet">` in `<head>`
- Active profile id is mirrored on `<html data-profile="...">` for theme-scoped component behavior
- Selected profile id persists in `localStorage.profile`
- Theme (`light`/`dark`) persists in `localStorage.theme` for shared lab pages that still support switching

The old shared landing-page theme switcher is no longer the source of truth for what a profile looks like. Use the dedicated demo pages for that.

Skill-shipped bundled font pack (Q8: `A`) is enabled by default for starter profiles:

- `assets/vanilla-starter/styles.fonts.local.css` contains `@font-face` declarations
- each profile file in `assets/vanilla-starter/profiles/*.css` imports `../styles.fonts.local.css`
- font binaries live under `assets/fonts-bundled/<family-version-latin>/`

If you intentionally switch to Google-hosted skill families (Q8: `B`):

- replace the local stylesheet import at the top of profile CSS with the desired Google Fonts `@import`/`<link>`
- verify network and CSP allow `fonts.googleapis.com` and `fonts.gstatic.com`

If you intentionally switch to local/system fallback fonts (Q8: `C`):

- replace profile font-family tokens with deterministic local/system stacks from `references/32-profile-registry.md`

If you intentionally switch to custom user-provided fonts (Q8: `D`):

- add your font files and `@font-face` declarations
- update profile font-family tokens to your custom families plus deterministic local/system fallback stacks

Theme-scoped component demos:

- Components with `data-theme-scope="..."` are shown/hidden automatically based on active profile id.
- Current scope map:
  - `Capability Ticker`: `cyberpunk-neon`, `retro-terminal`
  - `Portfolio Carousel`: `cyberpunk-neon`, `modern-saas`, `noire-editorial`, `sunset-gradient`

Effects is loaded at runtime via `effects.json`:

- Tier persists in `localStorage.effects_tier`
- Selected effects persist in `localStorage.effects_selected`
- Custom conflict override persists in `localStorage.effects_allow_incompatible`
- Changing tier snaps to that profile's tier recipe first; users can then refine effects manually via toggle switches.
- Editing effects directly switches tier to `custom` and keeps selected effects.
- Runtime applies root contract:
  - `data-effects-tier`
  - `data-effects-requested-tier`
  - `data-effects-selected`
  - `data-effects-glitch-mode`
  - classes `effects-tier-*` and `effects-effect-*`
- Profile changes revalidate selected effects against profile-scoped menus and enforce tier/global effect budgets.
- In `custom` tier, conflicting effect pairs prompt for explicit confirmation before both are kept.
- `glitch-burst` intensity is user-selectable in the Design Controls modal (`Glitch: Once` / `Glitch: Twice`) and persists in `localStorage.effects_glitch_mode`.

Favicon assets:

- `favicon.svg`
- `favicon.ico`

To add a profile:

1. Add a CSS file under `profiles/`.
2. Add an entry in `profiles.json` (`id`, `name`, `description`, `file`, `defaultTheme`).
3. Keep IDs aligned with `references/32-profile-registry.md`.
