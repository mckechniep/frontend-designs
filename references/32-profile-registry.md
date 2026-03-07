# Profile Registry

Canonical source of profile IDs, labels, defaults, and design references.

## Registry

| id | label | descriptor | defaultTheme | styleReference | canonicalCss |
|---|---|---|---|---|---|
| `modern-saas` | Modern SaaS | premium warm product narrative, serif-led hierarchy | `dark` | `design/profiles/profile.modern-saas.md` | `design/profiles/styles.profile.modern-saas.css` |
| `cyberpunk-neon` | Cyberpunk Neon | high-contrast neon, terminal futurism | `dark` | `design/profiles/profile.cyberpunk-neon.md` | `design/profiles/styles.profile.cyberpunk-neon.css` |
| `arctic-mono` | Arctic Mono | frost-tech research archive with diagnostic shell and precise monochrome hierarchy | `light` | `design/profiles/profile.arctic-mono.md` | `design/profiles/styles.profile.arctic-mono.css` |
| `noire-editorial` | Noire Editorial | dark dossier editorial with serif display, classified cues, and near-black luxury atmosphere | `dark` | `design/profiles/profile.noire-editorial.md` | `design/profiles/styles.profile.noire-editorial.css` |
| `corporate-blueprint` | Corporate Blueprint | dark architectural consultancy with drafting grid, serif display, and cyan annotation rhythm | `dark` | `design/profiles/profile.corporate-blueprint.md` | `design/profiles/styles.profile.corporate-blueprint.css` |
| `retro-terminal` | Retro Terminal | CRT green-on-black, nostalgic terminal | `dark` | `design/profiles/profile.retro-terminal.md` | `design/profiles/styles.profile.retro-terminal.css` |
| `pastel-dreamscape` | Pastel Dreamscape | dreamy serif editorial with blob hero, layered softness, and curated pastel depth | `light` | `design/profiles/profile.pastel-dreamscape.md` | `design/profiles/styles.profile.pastel-dreamscape.css` |
| `sunset-gradient` | Sunset Gradient | cinematic warm enterprise poster with glowing horizon depth and glass launch pacing | `dark` | `design/profiles/profile.sunset-gradient.md` | `design/profiles/styles.profile.sunset-gradient.css` |

## Sync Rules

- Keep IDs identical across:
  - this file
  - `design/profiles/profiles.json`
  - any style/profile selectors in prompts or templates
- Keep labels/descriptors consistent with user-facing menus.
- Keep default theme values aligned with `design/profiles/profiles.json`.

For Vanilla starter compatibility:

- Runtime starter CSS still lives under `assets/vanilla-starter/profiles/*.css`.
- `design/profiles/styles.profile.*.css` is the canonical design-contract copy.

## React/Next Local/System Fallback Map

Use these as `C` safety fallback stacks in chain `A -> B -> C`.

| profile id | `--font` fallback stack | `--font-mono` fallback stack | optional display fallback |
|---|---|---|---|
| `modern-saas` | `ui-sans-serif, system-ui, -apple-system, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif` | `ui-monospace, SFMono-Regular, Menlo, Consolas, "Liberation Mono", monospace` | `Georgia, "Times New Roman", Times, serif` |
| `cyberpunk-neon` | `system-ui, "Segoe UI", "Trebuchet MS", Tahoma, Arial, sans-serif` | `ui-monospace, SFMono-Regular, Menlo, Consolas, "Liberation Mono", monospace` | `"Arial Black", Impact, "Segoe UI", sans-serif` |
| `arctic-mono` | `system-ui, -apple-system, "Segoe UI", "Helvetica Neue", Arial, sans-serif` | `ui-monospace, SFMono-Regular, Menlo, Consolas, "Liberation Mono", monospace` | `system-ui, "Segoe UI", sans-serif` |
| `noire-editorial` | `ui-sans-serif, system-ui, "Segoe UI", "Helvetica Neue", Arial, sans-serif` | `ui-serif, Georgia, Cambria, "Times New Roman", Times, serif` | `ui-serif, Georgia, Cambria, "Times New Roman", serif` |
| `corporate-blueprint` | `"IBM Plex Sans", "Avenir Next", "Helvetica Neue", Arial, "Noto Sans", sans-serif` | `"DM Mono", "IBM Plex Mono", "SFMono-Regular", Menlo, Consolas, "Liberation Mono", monospace` | `"Playfair Display", Georgia, "Times New Roman", serif` |
| `retro-terminal` | `"Trebuchet MS", "Segoe UI", Tahoma, Arial, sans-serif` | `ui-monospace, SFMono-Regular, Menlo, Consolas, "Liberation Mono", monospace` | `"Arial Black", Impact, "Segoe UI", sans-serif` |
| `pastel-dreamscape` | `"Avenir Next", "Century Gothic", "Segoe UI", Arial, sans-serif` | `ui-monospace, SFMono-Regular, Menlo, Consolas, "Liberation Mono", monospace` | `Georgia, "Times New Roman", Times, serif` |
| `sunset-gradient` | `"Outfit", "Avenir Next", "Segoe UI", "Helvetica Neue", Arial, sans-serif` | `ui-monospace, SFMono-Regular, Menlo, Consolas, "Liberation Mono", monospace` | `Georgia, "Times New Roman", Times, serif` |

## Backward Compatibility

- Treat legacy id `modern-saas-dark` as alias of `modern-saas`.
- `keep-existing` is intake-only and is not a registry profile id.
