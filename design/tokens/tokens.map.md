# Token Map

Canonical token semantics used during Step 3 (tokens/theme wiring).

## Color Tokens

- `--bg`: app/page background surface
- `--surface`: primary card/panel surface
- `--surface-2`: secondary background band
- `--surface-3`: tertiary fill (muted subregions)
- `--text`: primary foreground text
- `--muted`: secondary text
- `--border`: default boundary
- `--border-subtle`: low-emphasis divider
- `--accent`: primary action/highlight color
- `--accent-2`: pressed/strong accent variant
- `--accent-glow`: accent aura/gradient stop helper
- `--glass-bg`: translucent card backdrop token
- `--glass-border`: translucent card boundary
- `--success`: positive status color
- `--error`: destructive/error status color

Constraints:

- Do not hardcode dark-mode text for all themes.
- Light mode must meet contrast targets.
- Status meaning cannot rely on color alone.

## Geometry and Elevation

- `--radius`: default corner radius
- `--radius-lg`: large card/surface radius
- `--shadow`: default depth shadow
- `--shadow-lg`: elevated depth shadow

## Layout and Spacing

- `--container`: max content width
- `--s-1`..`--s-8`: spacing scale (`4px` -> `72px`)

Usage guidance:

- prefer spacing tokens over ad-hoc values
- preserve rhythm across sections and component gaps

## Typography

- `--font`: body and UI font stack
- `--font-mono`: monospaced stack
- `--font-ui`: optional technical label stack

## Profile Hook Tokens

- `--badge-bg`: profile-tuned badge fill

## Responsive Baseline

- mobile: `360px`
- tablet: `768px`
- desktop: `1280px`

## Accessibility Baseline

- focus-visible outline must stay visible on all interactive elements
- semantic landmarks and heading structure required
