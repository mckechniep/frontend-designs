# Skill: Cyberpunk Neon Terminal UI Template

## Design Philosophy
Neo-Tokyo hacker terminal aesthetic. Void-black backgrounds, electric cyan primary accent with hot magenta secondary, sharp squared-off edges, scan-line texture overlay, and monospaced body text. Everything reads like a design studio dashboard running in a neon-lit basement. Supports light theme toggle (flips to a teal-tinted "blueprint" mode).

Default expression target: high-drama hero with unmistakable cyberpunk atmosphere, while preserving the user's real brand/product narrative.

## Required Signature Structure (Non-Negotiable)

When `design_profile=cyberpunk-neon`, first-draft output must include all of the following:

1. Atmosphere stack: dual-gradient base + scanline layer + optional low-opacity technical grid/noise treatment.
2. Clipped-corner geometry on primary cards and buttons (angular cyberpunk silhouette via `clip-path` where supported).
3. Matrix-style vertical light/rain streak treatment in feature/project cards.
4. High-drama hero treatment with split emphasis and one scoped signature text effect.
5. Terminal-like control language in at least one major surface (hero, nav, or status panel), including one fake readout line with blinking cursor where appropriate.
6. At least one profile-relevant interaction effect (for example: scoped cursor spotlight, rgb split, or scoped glitch).
7. Light-mode parity (when requested) that preserves cyberpunk identity instead of collapsing to generic SaaS styling.

If any required signature item above is missing, the cyberpunk-neon output is considered incomplete.

### Signature Hero Defaults

- Hero heading should use `--font-display` with strong size contrast and tight line-height.
- Add one animated scan/sweep accent in the hero area (disable under reduced motion).
- Keep layered atmosphere by default: dual radial background + scanline overlay + subtle grid/noise treatment.
- Use clipped corners on CTA controls and core cards; avoid rounded SaaS pills.
- Add one scoped terminal-readout strip (with blinking cursor) in a semantically relevant section.
- Highlight one phrase in the hero heading with accent glow.
- Preferred expressive effects for this profile: scoped `cursor-spotlight`, `title-rgb-split`, and `glitch-burst` (use within active budget).
- Preserve user-provided company/product names and domain copy; style should not rewrite brand identity.

### High-Drama Cyberpunk Signature Mode

Use this mode when the requested direction is cinematic, high-contrast, and terminal-forward:

- Composition rhythm:
  - fixed/frosted nav
  - large multi-line hero with split-color emphasis
  - terminal/status shell in hero region
  - services grid with technical cards
  - featured work block with neon metadata
  - telemetry/stat block
  - high-contrast CTA/contact close
- Atmospheric stack:
  - gradient base + scanline overlay + optional low-opacity technical grid
  - optional subtle micro-noise
  - one animated hero accent line
- Typography behavior:
  - display weight contrast in hero
  - monospaced control labels for nav/buttons/chips
- Motion behavior:
  - staggered section reveal
  - optional terminal typing loop
  - optional restrained glitch on one hero token only

Do not require all effects at once; keep within active effect budget and readability constraints.


> Font delivery note: These profile font families describe the canonical theme/runtime assets. In this repo, fonts are self-hosted under `assets/fonts-bundled/` and loaded by the canonical theme CSS in `themes/`. For React/Next outputs, treat them as stylistic intent and use fallback chain `A -> B -> C` (skill-shipped bundled fonts, then Google-hosted skill families, then local/system).

## References
- Cyberpunk 2077 UI panels
- Retro-futuristic terminal interfaces
- Tron Legacy grid aesthetics
- Design studio tooling (Figma dark mode, terminal emulators)

---

## Color System

### Dark Theme (default)
| Token | Value | Usage |
|---|---|---|
| `--bg` | `#0a0a0f` | Page background (deep void) |
| `--surface` | `#0d0f18` | Elevated surfaces (mobile menu, dropdown menus) |
| `--surface-2` | `#080a12` | Alternating section backgrounds |
| `--surface-3` | `#12141f` | Tertiary surface |
| `--text` | `#d4f0fc` | Primary text (cool blue-white) |
| `--muted` | `#5e8a9a` | Secondary text, labels, descriptions |
| `--border` | `rgba(0, 255, 240, 0.12)` | Standard borders (cyan-tinted) |
| `--border-subtle` | `rgba(0, 255, 240, 0.05)` | Section dividers |
| `--accent` | `#00fff0` | Primary accent (electric cyan) |
| `--accent-2` | `#00d4c8` | Hover/secondary accent (deeper cyan) |
| `--accent-glow` | `rgba(0, 255, 240, 0.3)` | Glow effects, focus rings |
| `--glass-bg` | `rgba(0, 255, 240, 0.03)` | Card/surface background (cyan-tinted glass) |
| `--glass-border` | `rgba(0, 255, 240, 0.08)` | Card borders |
| `--badge-bg` | `rgba(0, 255, 240, 0.08)` | Badge background |
| `--success` | `#39ff14` | Positive deltas (neon green) |
| `--error` | `#ff2d7b` | Negative deltas, errors (hot magenta) |

### Light Theme
| Token | Value |
|---|---|
| `--bg` | `#e8f4f8` |
| `--surface` | `#f0f9fc` |
| `--surface-2` | `#dceef5` |
| `--surface-3` | `#c8e2ed` |
| `--text` | `#0a1a22` |
| `--muted` | `#3d6472` |
| `--border` | `rgba(0, 80, 90, 0.25)` |
| `--border-subtle` | `rgba(0, 80, 90, 0.12)` |
| `--accent` | `#008b8b` |
| `--accent-2` | `#006d6d` |
| `--accent-glow` | `rgba(0, 139, 139, 0.2)` |
| `--accent-hot` | `#c4195c` |
| `--accent-violet` | `#7f42d9` |
| `--glass-bg` | `rgba(0, 100, 110, 0.1)` |
| `--glass-border` | `rgba(0, 80, 90, 0.28)` |
| `--badge-bg` | `rgba(0, 100, 110, 0.12)` |
| `--shadow` | `0 10px 30px rgba(0, 40, 50, 0.1)` |
| `--shadow-lg` | `0 20px 50px rgba(0, 40, 50, 0.16)` |

### Geometry Tokens
| Token | Value | Notes |
|---|---|---|
| `--radius` | `0px` | Base fallback should be hard-edged |
| `--radius-lg` | `0px` | Large containers should remain angular |
| `--shadow` | `0 0 30px rgba(0, 255, 240, 0.08), 0 10px 40px rgba(0, 0, 0, 0.6)` | Dual-layer: cyan glow + depth |
| `--shadow-lg` | `0 0 50px rgba(0, 255, 240, 0.12), 0 20px 60px rgba(0, 0, 0, 0.8)` | Intensified glow on hover |

### Background
Dual asymmetric radial gradients on `body` — cyan bleed top-left, magenta bleed bottom-right. Fixed attachment.
```css
background-image:
  radial-gradient(ellipse 1200px 700px at 10% -10%, rgba(255, 79, 216, 0.18), transparent 46%),
  radial-gradient(ellipse 900px 640px at 90% 12%, rgba(0, 255, 240, 0.2), transparent 50%),
  linear-gradient(160deg, #05060b 0%, #0a1020 42%, #0f1f3f 100%);
background-attachment: fixed;
```
Light theme uses toned-down equivalents (`rgba(0, 139, 139, 0.1)` and `rgba(196, 25, 92, 0.06)`) with a soft cool linear base.

### Technical Overlay (Optional But Recommended)
Full-viewport `body::before` may render a restrained technical grid/noise layer in dark mode:
```css
body::before {
  content: "";
  position: fixed;
  inset: 0;
  pointer-events: none;
  z-index: 998;
  opacity: 0.36;
  background-image:
    linear-gradient(rgba(0, 255, 240, 0.14) 1px, transparent 1px),
    linear-gradient(90deg, rgba(0, 255, 240, 0.14) 1px, transparent 1px);
  background-size: 42px 42px;
  mask-image: radial-gradient(circle at center, black 38%, transparent 100%);
}
```
For light theme, reduce intensity (`opacity: 0.22`, grid alpha `0.11`) or omit if readability drops.

### Scan-Line Overlay
Full-viewport `body::after` pseudo-element with repeating horizontal lines for a CRT monitor effect:
```css
body::after {
  content: "";
  position: fixed;
  inset: 0;
  pointer-events: none;
  z-index: 999;
  background: repeating-linear-gradient(
    0deg,
    transparent,
    transparent 2px,
    rgba(0, 0, 0, 0.04) 2px,
    rgba(0, 0, 0, 0.04) 4px
  );
}
```
Light theme reduces scan-line opacity to `0.015`.

### Light Theme Parity Rules (Cyberpunk Blueprint Mode)

- Keep cyan/magenta dual-accent logic in light mode (`--accent` + `--accent-hot`) instead of collapsing to monochrome.
- Keep scanlines visible and keep any technical overlay restrained in light mode.
- Keep hero emphasis glow in light mode with reduced blur/spread.
- Prefer darker text tokens on light surfaces; never reuse dark-mode light text.

---

## Typography

### Font Stack
- **Body (`--font`)**: `"Rajdhani"` intent (with `"Sora"` fallback) — technical but readable body flow
- **UI Mono (`--font-mono`)**: `"Share Tech Mono"` intent (with `"IBM Plex Mono"` fallback) — nav links, buttons, labels, and control text
- **Display (`--font-display`)**: `"Orbitron"` intent (with `"Syne"` fallback) — headings, brand wordmark, and high-drama title moments
- Fonts are loaded via local `@font-face` declarations in the canonical `themes/*/theme.css` bundles, sourcing files from `assets/fonts-bundled/`.

Typography split is intentional: readable body flow, technical UI chrome, and high-contrast display headlines.

If Orbitron/Rajdhani/Share Tech Mono are not available locally, use the skill fallback chain (`A -> B -> C`) without blocking output quality.

### Optional Display Override: Goldman

If you want `Goldman` for biggest hero/headline text:

1. Add local `Goldman` `.woff2` files to `assets/fonts-bundled/` (recommended: `400` and `700`).
2. Register them in the canonical `themes/*/theme.css` font bundle via `@font-face`.
3. Set `--font-display-brand: "Goldman"` in the active cyberpunk output scope.

The profile CSS already supports this hook and falls back to `Syne` when Goldman is not available.

### Scale
| Element | Size | Weight | Tracking | Notes |
|---|---|---|---|---|
| H1 | `clamp(2.25rem, 4vw, 3.25rem)` | 800 | `-0.03em` | `line-height: 1.05` |
| H2 | `clamp(1.5rem, 2vw, 2rem)` | inherit | `-0.02em` | |
| H3 | `1.125rem` | inherit | — | |
| Lead/subtitle | `1.05rem` | inherit | — | `line-height: 1.6`, `max-width: 540px`, `color: --muted` |
| Badge | `0.75rem` | inherit | `0.08em` | Uses `--font-mono`, uppercase, pulsing indicator dot |
| Buttons | `0.85rem` | 600 | `0.04–0.06em` | Uppercase, tight tracking |
| Metric values | `1.5rem` | 800 | — | Uses `--font-display`, cyan glow `text-shadow` |
| Mini-stat values | inherit | 700 | — | Uses `--font-display`, cyan glow `text-shadow` |
| Inputs | `0.9rem` | inherit | — | Uses `--font-mono` |

Hero emphasis convention:

- Wrap key cyan phrase in `.line-neon`
- Wrap secondary magenta phrase in `.line-secondary`
- Optional gradient blend accent: `.line-split`
- For high-drama hero words, wrap one short token in `.glitch`:
  - Example: `<span class="glitch" data-text="VOID">VOID</span>`
  - Keep glitch usage to one token in the hero to avoid visual noise.
- If `title-rgb-split` effect is enabled, apply it to one primary hero title line and optionally brand text only.

---

## Spacing System

8-point scale stored as CSS custom properties (inherited from base):
```
--s-1: 4px    --s-2: 8px    --s-3: 12px   --s-4: 16px
--s-5: 24px   --s-6: 32px   --s-7: 48px   --s-8: 72px
```

### Container
- Max width: `1120px`, centered
- Side padding: `clamp(20px, 5vw, 48px)`

### Header/Footer Row
- Both get explicit horizontal padding of `16px` (`--s-4`) on top of container padding
- Header min-height: `60px`

---

## Section Separation

Every `.section` gets:
- `padding: 72px 0` (top and bottom)
- `border-top: 1px solid var(--border-subtle)` — faint cyan-tinted divider

Alternating sections use `.section--alt`:
- `background-color: var(--surface-2)`
- `::before` pseudo-element: dual-tone gradient highlight (`transparent → cyan → magenta → transparent`) for the top accent line

Apply `section--alt` to every other content section (e.g., Features and Contact, but not Metrics).

---

## Surface / Card Treatment

Cyan-tinted glass on all cards:
```css
background: var(--glass-bg);
border: 1px solid rgba(0, 255, 240, 0.1);
border-radius: 4px;
box-shadow: var(--shadow), inset 0 1px 0 rgba(0, 255, 240, 0.06);
```

**Hover state**: Brighten border to `rgba(0, 255, 240, 0.22)`, deepen shadow to `--shadow-lg`, intensify inset glow.

Radius values should default to `0px` for a hard, angular silhouette.

---

## Interactive Elements

### Buttons
- All buttons: clipped-corner or zero-radius geometry (no rounded pills)
- All buttons: `text-transform: uppercase`
- **Primary**: `background: var(--accent)`, dark text (`#0a0a0f`), `border-color: rgba(0, 255, 240, 0.3)`
- **Primary hover**: `background: var(--accent-2)`, plus dual glow `box-shadow: 0 0 24px rgba(0, 255, 240, 0.4), 0 0 60px rgba(0, 255, 240, 0.15)`
- **Primary (light)**: White text on teal
- **Ghost**: `border-color: rgba(0, 255, 240, 0.15)`, `letter-spacing: 0.04em`
- **Ghost hover**: `border-color: rgba(0, 255, 240, 0.35)`, subtle cyan glow
- **Ghost (light)**: `border-color: rgba(0, 80, 90, 0.25)`, no glow on hover

### Select
Native `<select>` element. Styled via `.select` class with same border-radius, padding, and focus treatment as inputs. Uses `--font-mono` (IBM Plex Mono) to match the terminal control style. A custom select component is available as an optional template in `templates/vanilla/custom-select/` if full visual control is needed.

### Inputs / Textarea
- `border-radius: 0` (inherits from `--radius`), `padding: 10px 12px`
- Dark bg: `rgba(0, 255, 240, 0.03)`, border: `rgba(0, 255, 240, 0.12)`
- Light bg: `var(--surface-2)`, border: `rgba(0, 80, 90, 0.15)`
- All inputs use `--font-mono` (IBM Plex Mono) for terminal feel
- **Focus state**: `border-color: var(--accent)`, `box-shadow: 0 0 0 3px rgba(0, 255, 240, 0.15), 0 0 20px rgba(0, 255, 240, 0.08)` — cyan ring with ambient glow

### Focus-Visible (global)
```css
outline: 2px solid var(--accent);
outline-offset: 2px;
border-radius: 8px;
```

---

## Header

Sticky, frosted glass navbar:
```css
position: sticky;
top: 0;
backdrop-filter: blur(12px) saturate(160%);
background: rgba(10, 10, 15, 0.75);
border-bottom-color: rgba(0, 255, 240, 0.1);
z-index: 20;
```
Light theme: `background: rgba(232, 244, 248, 0.8)`, `border-bottom-color: rgba(0, 80, 90, 0.12)`.

### Mobile Menu
- Solid `var(--surface)` background (opaque for readability)
- Nav links: `color: var(--text)`, `font-weight: 500`
- Hover: `color: var(--accent-2)`

### Brand Mark
Small `12px` square (`border-radius: 2px`) with `background: var(--accent)` and pulsing cyan glow animation:
```css
@keyframes pulse-glow {
  0%, 100% { box-shadow: 0 0 0 4px rgba(0, 255, 240, 0.25); }
  50% { box-shadow: 0 0 12px 6px rgba(0, 255, 240, 0.4); }
}
```

---

## Badge

Sharp-edged (`border-radius: 2px`), uppercase, tight letter-spacing (`0.08em`), smaller font size (`0.75rem`). Includes a pulsing `::before` indicator dot:
```css
.badge::before {
  content: "";
  width: 6px;
  height: 6px;
  border-radius: 1px;
  background: var(--accent);
  box-shadow: 0 0 6px var(--accent), 0 0 14px var(--accent-glow);
  animation: badge-pulse 1.8s ease-in-out infinite;
}
```
Light theme reduces the glow to `0 0 4px var(--accent)`.

---

## Metrics

Metric values use `--font-display` (Syne), colored `var(--accent)` with cyan text-shadow glow (`0 0 20px rgba(0, 255, 240, 0.3)`). Light theme removes the text-shadow.

Mini-stat values follow the same pattern with a slightly tighter glow (`0 0 14px`).

---

## Toast

Magenta-accented notification:
```css
background: rgba(255, 45, 123, 0.15);
border-color: rgba(255, 45, 123, 0.3);
backdrop-filter: blur(8px);
```
Light theme: `background: rgba(196, 25, 92, 0.08)`, `border-color: rgba(196, 25, 92, 0.2)`.

---

## Contact Form Layout

Centered narrow card:
```css
.contact-card-wrapper {
  display: flex;
  justify-content: center;
}
.contact-form {
  max-width: 500px;
  width: 100%;
  padding: 32px;
  gap: 24px;
}
```
Single stacked column. Submit button is full-width. Padding reduces to `16px` on small screens.

---

## Selection Color

Text selection uses cyan highlight:
- Dark: `background: rgba(0, 255, 240, 0.25)`, `color: #ffffff`
- Light: `background: rgba(0, 139, 139, 0.2)`, `color: #0a1a22`

---

## Responsive Breakpoints

Three breakpoints, mobile-first base:

### Small (max-width: 520px)
- Cards and forms reduce padding to `16px`
- Mini-stats collapse to single column
- Metrics grid collapses to single column
- Footer stacks vertically, centered
- "Get started" button hidden in nav
- Hero padding reduced

### Tablet (521px – 879px)
- "Get started" button hidden in nav
- Feature cards: 2-column grid
- Metrics: 2-column grid

### Desktop (880px+)
- Desktop nav links visible, hamburger hidden
- Hero: 2-column grid (`1.15fr 0.85fr`)
- Feature cards: 3-column grid
- Metrics: 4-column grid

---

## Theme-Scoped Components

Preferred advanced components for this profile:

- **Capability ticker (right-to-left loop)**:
  - strong fit for cyberpunk terminal/dashboard surfaces
  - use uppercase compact labels with cyan edge glow
  - support pause-on-hover and pause-on-tap
- **Portfolio carousel**:
  - horizontal project cards with snap-scrolling and keyboard controls
  - keep card glow subtle; prioritize readability over heavy effects

---

## Implementation Notes

- Theme is toggled via `data-theme="light"` on the `<html>` element. Default is dark.
- All JS selectors use `data-*` attributes (e.g., `data-contact-form`, `data-menu-button`, `data-toast`) — do not change these.
- Toast is positioned absolute within a relative parent (`.hero-card`).
- The footer has no `margin-top` — it sits flush against the last section so alternating section backgrounds don't leave gaps.
- Error text color uses `var(--error)`, success delta color uses `var(--success)` — both defined as tokens, not hardcoded.
- Fonts are loaded via local `@font-face` declarations in the canonical `themes/*/theme.css` bundles, sourcing files from `assets/fonts-bundled/`.
- Component overrides (badge, mini-stats, etc.) should reference tokens (`var(--glass-bg)`, `var(--badge-bg)`) rather than hardcoded rgba values, so the light/dark toggle works automatically through the token system.
- Canonical theme metadata now lives in `themes/shared/theme-registry.json`. Universal component previews load theme CSS directly from `themes/<profile>/theme.css` via the shared preview runtime.
