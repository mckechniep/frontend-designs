# Skill: Arctic Mono Frost-Tech Template

## Canonical Target
Arctic Mono is a **frost-tech research archive**, not a simplified startup landing page. The canonical landing target in this repo is `themes/arctic-mono/index.html`. First-draft Arctic outputs should aim to feel materially close to that demo in structure, typography split, atmosphere, and technical narrative rhythm.

If a generated Arctic landing starts reading like generic SaaS, enterprise blue, or minimal white cards with icy accents, it has already drifted off profile.

> Font delivery note: These profile font families describe the canonical theme/runtime intent. In this repo, fonts are self-hosted under `assets/fonts-bundled/` and loaded by the canonical theme CSS in `themes/`. For React/Next outputs, treat them as stylistic intent and use fallback chain `A -> B -> C` (skill-shipped bundled fonts, then Google-hosted skill families, then local/system).

## Design Philosophy
Arctic Mono should feel like a premium cold-climate systems lab:

- clinical, precise, atmospheric
- editorial enough to feel composed, not sterile
- technical enough to feel instrumented, not decorative
- restrained in color, rich in depth

The profile is **high-drama by default** under the Expressive Effects Layer policy, but the drama comes from frost atmosphere, diagnostic detail, motion, and hierarchy, not from loud color or crowded effects.

## Required Signature Structure (Non-Negotiable)

When `design_profile=arctic-mono`, first-draft output must include all of the following:

1. Frost-tech atmosphere stack: cold radial field, subtle snowfall drift, low-opacity grain, and ambient light bands.
2. Clear display/mono split: `Outfit` intent for display/body, `DM Mono` intent for labels, metadata, nav, and technical notation.
3. One signature technical visual module: for example a DNA helix, diagnostic shell, schematic panel, or blueprint canvas.
4. One measured motion system: staggered reveal, counter ramp, scroll cue pulse, sweep-line hover, or equivalent restrained motion.
5. Instrumented data treatment: stats, records, tags, and metadata must read like a system archive, not generic marketing counters.
6. Sharp geometry contract: zero-radius baseline for cards, buttons, inputs, badges, and main surfaces.

If any required signature item above is missing, the Arctic Mono output is incomplete.

## Required Landing Topology (Non-Negotiable)

For landing surfaces with `profile_recipe_lock=signature-on`, use this exact narrative order unless the user explicitly asks to change it:

1. Hero system state with status badge, large research statement, dual CTA, animated stats, and vertical scroll cue.
2. Section `01` core research modules grid.
3. Signature module split: narrative column plus technical visual host and supporting note list.
4. Section `02` divisions and tracks row list.
5. Section `03` publication record or case archive grid.
6. Field briefing / contact split with explicit submit feedback.

This page should read like a research archive under review. Do not collapse it into hero, trust rail, three features, testimonials, pricing, and footer.

## Canonical Implementation Markers

These are the strongest signals from the repo demo and should appear in Arctic outputs by default:

- premium glass nav with measured show/hide behavior
- italic accent word in the hero headline
- hero-side diagnostic shell or equivalent technical object
- vertical scroll cue directly below hero stats
- numbered section labels and divider rhythm
- DM Mono uppercase labels for nav, metadata, technical tags, and smaller section/card headings
- core modules grid with technical tags, not soft marketing blurbs
- divisions rendered as structured row-list tracks, not commodity feature cards
- publication record cards with generous internal padding and archive-style metadata rows
- field briefing/contact close that feels operational and precise, not salesy

## Signature Effects Matrix

Treat this as the canonical Arctic Mono effect stack.

### Background + Atmosphere

1. Frost particle or snow system with tiny, restrained drift.
2. No dominant lattice grid in the base atmosphere.
3. Grain overlay at low opacity.
4. Ambient gradient bands in showcase/contact regions.

### Animation + Motion

5. Scroll-triggered reveal transitions.
6. Staggered reveal delays on sibling blocks.
7. Animated stat counters with ease-out behavior.
8. Continuous helix or technical object rotation with controlled depth ordering.
9. Blueprint or schematic module with layered technical annotations.
10. Front-node glow treatment on the visual module.
11. Pulsing status dot animation.
12. Scroll-line indicator animation.

### Navigation

13. Glass nav treatment.
14. Nav auto-hide on scroll-down and return on scroll-up.
15. Link underline grow from left on hover/focus.

### Hover + Interaction

16. Card hover lift with border shift.
17. Card top-edge glow sweep on hover.
18. Division row slide and arrow reveal interaction.
19. Publication/title accent shift on hover.
20. Form input focus glow.

### Feedback

21. Submit confirmation state (`Transmitted` or equivalent operational success signal).

### Typography + Composition

22. Hero accent word in italic + accent color.
23. `Outfit` / `DM Mono` split.
24. Section numbering system with divider rules.

## First-Draft Recipe Pack (Default)

When `expressive_intensity=high-drama` and `profile_recipe_lock=signature-on`, include at least:

- effects `1-4` for the atmosphere core
- effects `5-9` for the motion and technical-module core
- effects `13` and `15` for navigation
- effects `16`, `17`, and `20` for interaction
- effects `22-24` for typography and composition

Optional expansions in refinement:

- `10`, `11`, `12`, `14`, `18`, `19`, `21`

## Core Direction

- Palette:
  - deep arctic base from `#080f16` into `#15283a`
  - ice-cyan accents such as `#7ec8e3` and `#a3dff0`
  - cool slate neutrals for text hierarchy and structure
- Typography:
  - display/body: `Outfit` intent
  - labels/data/meta: `DM Mono` intent
- Atmosphere:
  - subtle frost field with radial cold light and tiny snowfall texture
  - thin-line technical separators and edge glints
- Motion:
  - staged reveals, measured counters, and restrained hover sweeps

## Typography Contract (Non-Negotiable)

- Use `DM Mono` intent for nav, badges, metadata, technical tags, indices, and smaller structural headings.
- In Arctic landing outputs, smaller headings inside divisions/tracks and record cards should also use the uppercase mono treatment by default.
- Use display typography for major section titles and hero hierarchy only; do not let serif/editorial display styles creep in.
- Do not mix in friendly rounded-product typography or soft app-style caps.

## Geometry Contract (Non-Negotiable)

- Use sharp geometry by default: cards, badges/pills, buttons, chips, inputs, textareas, toasts, and major panels are zero-radius.
- Do not drift back to rounded SaaS surfaces for Arctic Mono outputs.
- Tiny circular indicators are allowed only for explicit status dots.

## Spacing Rhythm Contract (Non-Negotiable)

Use an 8pt-based spacing scale and keep outer/inner rhythm coherent.

### Required scale

- `--s-1: 4px`
- `--s-2: 8px`
- `--s-3: 12px`
- `--s-4: 16px`
- `--s-5: 24px`
- `--s-6: 32px`
- `--s-7: 48px`
- `--s-8: 72px`

### Section spacing

- desktop section padding: `72px` top/bottom baseline
- tablet section padding: `56px` top/bottom
- mobile section padding: `40px` top/bottom
- hero should not combine oversized `min-height` and oversized top padding at the same time

### Internal spacing

- section heading block to content block gap: `24-32px`
- card/grid item padding: `20-28px`
- dense card grid gaps: `12-20px`
- split layouts column gap: `24-40px`
- form field vertical gap: `12-16px`; form block gap: `20-28px`
- divisions/tracks and publication cards must have enough internal padding that text never rides the border edges

### Anti-regression rules

- Do not use very large outer spacing with very small inner spacing.
- Do not shrink contact/showcase gaps below readability thresholds on desktop.
- Keep spacing transitions gradual across breakpoints; avoid abrupt compression.

## Expressive Effects Layer Defaults

- baseline intent: `high-drama` unless user explicitly dials down
- preferred high recipe: `panel-sheen` + `depth-fade-gradient` + `interaction-lift` + `film-grain-overlay`
- optional upgrade: `hero-sweep` for hero-forward landing composition

## Interactive Pattern Set

- staged reveal on section entry
- animated numeric hero counters
- polished card hover with icy edge sweep
- sticky glass nav with clear hierarchy
- row-list track interaction for divisions
- clear form feedback states

## Anti-Patterns (Non-Negotiable)

Do not introduce these unless the user explicitly asks for them:

- trust rails or logo strips
- SaaS pricing sections
- testimonial carousels as a primary proof device
- rounded startup cards or friendly app onboarding blocks
- generic process bubbles or step timelines that replace the divisions/records rhythm
- warm luxury serif treatment
- enterprise-blue dashboard defaults
- generic hero/features/contact structure with no research archive framing

## A11y + Guardrails

- maintain strong contrast for long-form body copy
- avoid excessive simultaneous motion in dense data areas
- preserve keyboard/focus clarity above decorative overlays
- respect `prefers-reduced-motion` with static fallbacks
