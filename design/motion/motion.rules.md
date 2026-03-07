# Expressive Effects Layer Rules

Canonical source for Expressive Effects Layer tiers, effect constraints, style-scoped menus, and runtime safety.

## Purpose

The Expressive Effects Layer is a constrained overlay that adds atmosphere/motion polish without replacing base profile identity.

## Expressive Effects Layer Interface

```yaml
expressive_effects_layer:
  tier: profile-default|off|low|medium|high|custom
  effects: [effect-id, ...]  # max 12
```

## Global Constraints

- `maxEffects`: `12`
- tiers: `profile-default | off | low | medium | high | custom`
- tier budgets: `low=3`, `medium=5`, `high=8`, `custom=12`
- motion budgets: `low=1`, `medium=2`, `high=3`, `custom=4` continuous effects
- default: only one full-viewport overlay effect may be active at once
- cursor-driven effects must be scoped to explicit sections/components; never whole-page
- exception: `cyberpunk-neon` and `retro-terminal` may run two overlay effects together only for `grid-overlay + scanline-overlay`

Overlay-exclusive effects:

- `ambient-gradient`
- `grid-overlay`
- `scanline-overlay`
- `vignette-frame`
- `film-grain-overlay`

Incompatible pairs:

- `panel-glow` + `bloom-halo`
- `hero-underlight` + `ambient-gradient`
- `hero-underlight` + `cursor-spotlight`
- `glitch-burst` + `section-reveal-once`
- `glitch-burst` + `badge-pulse`
- `bloom-halo` + `depth-fade-gradient`

Exception:

- `grid-overlay` + `scanline-overlay` is allowed for `cyberpunk-neon` and `retro-terminal` when readability remains acceptable.

## Effect Catalog

| id | label | type | continuousMotion | viewportOverlay |
|---|---|---|---|---|
| `ambient-gradient` | Ambient Gradient | atmosphere | no | yes |
| `hero-sweep` | Hero Sweep Line | motion-accent | yes | no |
| `grid-overlay` | Grid Overlay | texture | no | yes |
| `scanline-overlay` | Scanline Overlay | texture | no | yes |
| `panel-glow` | Panel Glow | elevation | no | no |
| `panel-sheen` | Panel Sheen | surface accent | no | no |
| `badge-pulse` | Badge Pulse | micro-motion | yes | no |
| `vignette-frame` | Vignette Frame | framing | no | yes |
| `film-grain-overlay` | Film Grain Overlay | texture | no | yes |
| `hero-underlight` | Hero Underlight | atmosphere | no | no |
| `section-reveal-once` | Section Reveal Once | entrance | no | no |
| `interaction-lift` | Interaction Lift | interaction | no | no |
| `bloom-halo` | Bloom Halo | atmosphere | no | no |
| `depth-fade-gradient` | Depth Fade Gradient | depth | no | no |
| `cursor-spotlight` | Cursor Spotlight | interaction-atmosphere | no | no |
| `title-rgb-split` | Title RGB Split | typography-distortion | no | no |
| `glitch-burst` | Glitch Burst | signal-corruption accent | no | no |

Descriptor hints for UI menus:

- `ambient-gradient`: atmospheric, soft depth
- `hero-sweep`: moving hero scan line
- `grid-overlay`: technical grid texture
- `scanline-overlay`: CRT scan texture
- `panel-glow`: luminous panel elevation
- `panel-sheen`: subtle directional sheen
- `badge-pulse`: pulsing accent badge
- `vignette-frame`: cinematic edge framing
- `film-grain-overlay`: tactile grain texture
- `hero-underlight`: radial hero underglow
- `section-reveal-once`: one-shot staged reveal
- `interaction-lift`: hover/active/focus polish
- `bloom-halo`: soft bloom halo
- `depth-fade-gradient`: section depth fade
- `cursor-spotlight`: pointer-follow scoped glow
- `title-rgb-split`: chromatic title offset
- `glitch-burst`: signal corruption burst

`glitch-burst` should be short-lived (for example once/twice), never continuous.

## Cursor-Driven Effect Scope

- `cursor-spotlight` and any custom cursor/ring/follower effect are opt-in, not baseline.
- A user-requested scoped cursor effect is allowed on any profile, even when it is not part of that profile's default effect recipe.
- Bind cursor-driven effects to an explicit scope container, never `body`, `html`, or the full app shell.
- Render the effect element inside that scope and compute coordinates relative to the scope bounding box.
- Hide the effect when the pointer leaves scope.
- For demos and canonical examples, showcase cursor-driven effects in `1-3` named sections/components total so users can discover the pattern without losing the default cursor across the full page.
- Restrict cursor-driven effects to fine-pointer desktop contexts; disable on touch/coarse pointers.
- If the effect competes with dense content, form entry, or readability, remove it instead of expanding the scope.

## Default Tier Map

- `corporate-blueprint`: `high`
- `arctic-mono`: `high`
- `modern-saas`: `high`
- `noire-editorial`: `high`
- `pastel-dreamscape`: `high`
- `cyberpunk-neon`: `high`
- `retro-terminal`: `high`
- `sunset-gradient`: `high`

## Profile-Scoped Effect Menus

- `modern-saas`:
  - `ambient-gradient`, `hero-sweep`, `hero-underlight`, `panel-glow`, `panel-sheen`, `section-reveal-once`, `interaction-lift`, `bloom-halo`, `depth-fade-gradient`
- `cyberpunk-neon`:
  - `ambient-gradient`, `hero-sweep`, `hero-underlight`, `grid-overlay`, `scanline-overlay`, `panel-glow`, `badge-pulse`, `section-reveal-once`, `interaction-lift`, `bloom-halo`, `depth-fade-gradient`, `cursor-spotlight`, `title-rgb-split`, `glitch-burst`
- `arctic-mono`:
  - `hero-sweep`, `panel-sheen`, `vignette-frame`, `film-grain-overlay`, `section-reveal-once`, `interaction-lift`, `depth-fade-gradient`
- `noire-editorial`:
  - `scanline-overlay`, `badge-pulse`, `panel-sheen`, `ambient-gradient`, `film-grain-overlay`, `section-reveal-once`, `interaction-lift`, `depth-fade-gradient`
- `corporate-blueprint`:
  - `panel-sheen`, `hero-sweep`, `ambient-gradient`, `grid-overlay`, `film-grain-overlay`, `section-reveal-once`, `interaction-lift`, `depth-fade-gradient`, `cursor-spotlight`
- `retro-terminal`:
  - `scanline-overlay`, `grid-overlay`, `badge-pulse`, `ambient-gradient`, `film-grain-overlay`, `section-reveal-once`, `interaction-lift`, `depth-fade-gradient`, `cursor-spotlight`, `title-rgb-split`, `glitch-burst`
- `pastel-dreamscape`:
  - `ambient-gradient`, `hero-sweep`, `hero-underlight`, `panel-glow`, `badge-pulse`, `section-reveal-once`, `interaction-lift`, `bloom-halo`, `depth-fade-gradient`
- `sunset-gradient`:
  - `ambient-gradient`, `hero-sweep`, `hero-underlight`, `panel-glow`, `badge-pulse`, `vignette-frame`, `section-reveal-once`, `interaction-lift`, `bloom-halo`, `depth-fade-gradient`, `cursor-spotlight`, `title-rgb-split`

## Tier Recipes by Profile

- `modern-saas`
  - `low`: `panel-sheen`, `interaction-lift`
  - `medium`: `hero-underlight`, `interaction-lift`, `panel-sheen`
  - `high`: `hero-underlight`, `panel-glow`, `interaction-lift`, `depth-fade-gradient`
- `cyberpunk-neon`
  - `low`: `hero-underlight`, `interaction-lift`
  - `medium`: `hero-sweep`, `grid-overlay`, `interaction-lift`
  - `high`: `hero-sweep`, `grid-overlay`, `scanline-overlay`, `glitch-burst`
- `arctic-mono`
  - `low`: `depth-fade-gradient`
  - `medium`: `panel-sheen`, `depth-fade-gradient`, `interaction-lift`
  - `high`: `panel-sheen`, `depth-fade-gradient`, `interaction-lift`, `film-grain-overlay`
- `noire-editorial`
  - `low`: `badge-pulse`, `depth-fade-gradient`
  - `medium`: `scanline-overlay`, `badge-pulse`, `depth-fade-gradient`, `panel-sheen`
  - `high`: `scanline-overlay`, `badge-pulse`, `film-grain-overlay`, `depth-fade-gradient`, `panel-sheen`, `section-reveal-once`
- `corporate-blueprint`
  - `low`: `panel-sheen`, `depth-fade-gradient`
  - `medium`: `panel-sheen`, `depth-fade-gradient`, `interaction-lift`
  - `high`: `panel-sheen`, `grid-overlay`, `hero-sweep`, `interaction-lift`
- `retro-terminal`
  - `low`: `film-grain-overlay`, `interaction-lift`
  - `medium`: `scanline-overlay`, `interaction-lift`, `badge-pulse`
  - `high`: `film-grain-overlay`, `glitch-burst`, `interaction-lift`, `depth-fade-gradient`
- `pastel-dreamscape`
  - `low`: `hero-underlight`, `interaction-lift`
  - `medium`: `hero-underlight`, `interaction-lift`, `section-reveal-once`
  - `high`: `hero-underlight`, `bloom-halo`, `interaction-lift`, `section-reveal-once`
- `sunset-gradient`
  - `low`: `hero-underlight`, `depth-fade-gradient`
  - `medium`: `hero-underlight`, `bloom-halo`, `interaction-lift`
  - `high`: `hero-underlight`, `hero-sweep`, `bloom-halo`, `interaction-lift`

## Resolution Rules

1. Filter selected effects to active profile menu.
2. Enforce global max effects (`12`).
3. Enforce overlay exclusivity and incompatible pairs.
4. Enforce tier effect budgets and motion budgets.
5. `custom` allows manual selection up to 12 effects.
6. If filtered result is empty for concrete tier, fallback to that tier recipe.

## Accessibility and Safety

- Implement `prefers-reduced-motion: reduce` to disable continuous Expressive Effects Layer motion.
- On dense surfaces (tables/forms/data-heavy panels), downgrade or disable continuous effects.
- Never allow the Expressive Effects Layer to reduce contrast/readability of core content.
- If cursor-driven effects are used, keep them invisible outside their scoped container and disable them on coarse pointers.
- Never turn a custom cursor treatment into the default cursor for the whole landing page or app shell.

## Stack Implementation Guidance

- Vanilla: drive the Expressive Effects Layer via root classes/data attributes and CSS.
- React/Next: implement the Expressive Effects Layer in stack-native styling primitives; avoid direct import of vanilla starter profile CSS.
