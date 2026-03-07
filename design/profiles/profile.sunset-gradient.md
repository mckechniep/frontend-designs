# Skill: Sunset Gradient Cinematic Enterprise Poster Template

## Canonical Target
Sunset Gradient is now a **warm enterprise poster landing page**, not a generic SaaS page with orange and purple gradients pasted on top. The canonical landing target in this repo is `assets/vanilla-starter/sunset-gradient.html`. First-draft Sunset outputs should aim to feel materially close to that demo in composition, atmosphere, typography, and runtime behavior.

If a generated Sunset page starts reading like Modern SaaS with warmer colors, it has already drifted off profile.

> Font delivery note: These profile font families describe vanilla starter intent. In this repo's starter, fonts are self-hosted under `assets/fonts-bundled/` via `assets/vanilla-starter/styles.fonts.local.css`. For React/Next outputs, treat them as stylistic intent and use fallback chain `A -> B -> C` (skill-shipped bundled fonts, then Google-hosted skill families, then local/system).

## Design Philosophy
Sunset Gradient should feel like a polished launch page from a premium city software company:

- cinematic but legible
- warm and atmospheric without losing clarity
- premium enterprise, not consumer whimsy
- poster-like in typography and pacing
- glassy and luminous, not frosted SaaS sludge

The page should feel like sunset light hitting a real software brand, not a mood board.

## Required Signature Structure (Non-Negotiable)

When `design_profile=sunset-gradient`, first-draft output must include all of the following:

1. Full-page warm ambient field with layered radial glows, dark horizon depth, and low-opacity grain.
2. Fixed glass navigation with a distinct brand mark and one prominent pill CTA.
3. Split hero with:
   - small signal badge
   - poster-scale display heading
   - gradient-highlighted phrase
   - italicized supporting line
   - CTA pair
   - hero-side glowing orb or atmospheric visual object containing a software/dashboard mock
4. Quiet brand/logo row immediately after the hero.
5. Three-card solutions or product pillars section.
6. Counter/stat band with large numeric emphasis.
7. Split platform section with one strong visual system object, such as rotating rings, orbital nodes, or equivalent cinematic technical motif.
8. Testimonial trio that still feels premium and warm.
9. Centered CTA close with inline email capture, not a detached narrow contact card.
10. Structured footer with multiple columns and consistent brand carry-through.

If any required signature item above is missing, the Sunset Gradient output is incomplete.

## Required Landing Topology (Non-Negotiable)

For landing surfaces with `profile_recipe_lock=signature-on`, use this exact narrative order unless the user explicitly asks to change it:

1. fixed glass nav
2. split hero with badge, poster headline, CTA pair, and glowing dashboard/orb visual
3. quiet logo row
4. three-pillar solutions grid
5. counter/stat band
6. split platform/features section with rotating or orbital visual motif
7. testimonial trio
8. centered CTA close with inline form
9. structured footer

Do not collapse this into hero, generic features, testimonials, pricing, and footer. Do not inject a modern SaaS proof/pricing cadence.

## Canonical Implementation Markers

These are the strongest signals from the repo demo and should appear in Sunset outputs by default:

- fixed ambient background with warm radial glows and grain overlay
- conic or radiant circular brand mark
- `Cormorant Garamond`-style display typography paired with `Outfit`-style body typography
- hero badge with status-dot behavior
- gradient text treatment on one key phrase in the hero
- italic display line in the hero, used deliberately rather than everywhere
- large glowing orb plus glass dashboard mockup on the hero side
- soft but controlled glass cards
- quiet logo row after the hero
- solutions grid with three distinct product pillars
- stats band with animated counters
- rotating ring or orbital platform visual paired with numbered feature list
- centered CTA section with inline form and glow field
- multi-column footer with brand, links, and social icons

## Signature Effects Matrix

Treat this as the canonical Sunset Gradient effect stack.

### Atmosphere

1. Full-page warm horizon gradient stack.
2. Radial glow pockets in hero and CTA.
3. Low-opacity grain overlay.
4. Glass surfaces with restrained blur and border light.

### Motion + Runtime

5. Hero entry fade-up choreography.
6. Staggered reveal on sections and cards.
7. Animated dashboard bars or comparable hero data motion.
8. Counter animation on stats band.
9. Slow orbital or ring rotation in the platform section.

### Interaction

10. Warm pill CTA hover lift with glow increase.
11. Glass-card hover lift with top-edge or border emphasis.
12. Quiet link underline growth in nav/footer.
13. Inline CTA form success-state shift.

### Composition + Typography

14. Poster-scale display heading rhythm.
15. Gradient phrase treatment used selectively.
16. Quiet logo row, not a loud monochrome trust strip.
17. Centered CTA close with cinematic glow field.

## First-Draft Recipe Pack (Default)

When `profile_recipe_lock=signature-on`, include at least:

- effects `1-4` for the atmosphere core
- effects `5-9` for the runtime core
- effects `10-11` and `13` for interaction
- effects `14-17` for composition and typography

Optional refinements:

- richer dashboard animation, more detailed orbital nodes, or deeper footer treatments

## Core Direction

- Palette:
  - sun gold `#FFBA08`
  - ember `#F48C06`
  - coral flame `#E85D04`
  - burnt orange `#DC2F02`
  - crimson dusk `#D00000`
  - deep rose `#9D0208`
  - twilight purple `#370617`
  - midnight `#13001A`
- Typography:
  - display: `Cormorant Garamond` intent
  - body/UI: `Outfit` intent
  - mono is optional and should not dominate this profile
- Composition:
  - enterprise launch hero
  - quiet logo row
  - product-pillar grid
  - stats band
  - orbital platform split
  - testimonial trio
  - centered CTA close

## Typography Contract (Non-Negotiable)

- Use a serif display face with clear cinematic contrast for major headings.
- Pair it with a clean geometric sans for body copy, nav, buttons, and forms.
- Use gradient text on one hero phrase and italic display styling on one supporting line; do not overuse either.
- Do not drift into mono-heavy system typography.
- Do not use the warm serif stack as a luxury editorial profile; this is enterprise and launch-oriented, not noir or lifestyle.

## Geometry Contract (Non-Negotiable)

- Pill geometry is expected for primary CTA buttons and the inline CTA input.
- Glass cards should use soft rounded corners, typically `14-20px`.
- Circular motifs are encouraged for logo mark, hero orb, node system, avatars, and glow anchors.
- Do not turn every surface into the same rounded SaaS card with identical shadow and blur values.

## Spacing Rhythm Contract (Non-Negotiable)

Use an 8pt-based cinematic rhythm with clear separation between major story beats.

### Required scale

- `--s-1: 4px`
- `--s-2: 8px`
- `--s-3: 12px`
- `--s-4: 16px`
- `--s-5: 24px`
- `--s-6: 32px`
- `--s-7: 48px`
- `--s-8: 72px`
- `--s-9: 96px`
- `--s-10: 120px`

### Section spacing

- desktop section padding: `80-112px`
- tablet section padding: `56-80px`
- mobile section padding: `40-56px`
- hero should feel expansive, but not so tall that the CTA and hero visual drift apart

### Internal spacing

- hero split gap: `40-72px`
- solutions grid gap: `20-32px`
- stats band gap: `20-32px`
- platform split gap: `48-80px`
- testimonial card padding: `28-40px`
- centered CTA content gap: `16-28px`

### Anti-regression rules

- Do not flatten every section into identical card stacks.
- Do not let all gradients hit the same intensity.
- Do not over-pack the footer or CTA once the hero is large and atmospheric.

## Surface Rules

- Ambient background carries most of the atmospheric work.
- Glass cards should be dark and translucent in dark mode, never opaque flat slabs.
- The hero and centered CTA can carry the strongest glow.
- Interior sections should still have readable structure and contrast; the warmth cannot replace hierarchy.

## Interaction Rules

- Keep nav scroll behavior polished and minimal.
- Use section reveals and counters to support the cinematic rhythm.
- Keep hover states warm and tactile, not hyperactive.
- CTA confirmation should feel affirmative and quick.

## Anti-Patterns (Non-Negotiable)

Do not introduce these unless the user explicitly asks for them:

- pricing tables or comparison grids
- a modern SaaS trust-strip plus proof expansion cadence
- generic six-card feature grids directly after the hero
- centered narrow contact cards as the main close
- oversized product screenshot stacks borrowed from modern SaaS
- bland warm gradients on a standard startup template
- editorial noir or scrapbook/pastel composition drift

## A11y + Guardrails

- Maintain readable contrast over every gradient and glow layer.
- Use overlays before shrinking text contrast.
- Respect `prefers-reduced-motion` for orb rotation, reveals, and counters.
- Keep the CTA form and nav usable on mobile without relying on hover.
