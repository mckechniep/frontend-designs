# Skill: Corporate Blueprint Architectural Consultancy Template

## Canonical Target
Corporate Blueprint is now a **dark architectural consultancy landing page** in this repo, not a loose enterprise dashboard skin. The canonical north star is [`assets/vanilla-starter/corporate-blueprint.html`](../../assets/vanilla-starter/corporate-blueprint.html): Meridian & Kirsch, deep navy drafting field, cyan line-work, reserved gold milestones, fixed glass nav, annotated hero, services grid, methodology timeline, case-study section, split contact block, and structured footer.

If a generated Corporate Blueprint page starts reading like Modern SaaS with colder colors, it has already drifted off profile.

> Font delivery note: These profile font families describe vanilla starter intent. In this repo's starter, fonts are self-hosted under `assets/fonts-bundled/` via `assets/vanilla-starter/styles.fonts.local.css`. For React/Next outputs, treat them as stylistic intent and use fallback chain `A -> B -> C` (skill-shipped bundled fonts, then Google-hosted skill families, then local/system).

## Design Philosophy
Corporate Blueprint should feel like a premium strategy firm presenting a technical plan:

- precise, annotated, and disciplined
- cinematic without turning theatrical
- luxury-consultancy rather than startup-marketing
- clarity-first even when effects are present
- drafting-room atmosphere, not generic “enterprise blue”

The page should feel engineered and reviewed, not themed.

## Required Signature Structure (Non-Negotiable)

When `design_profile=corporate-blueprint`, first-draft output must include all of the following:

1. A deep navy page field with visible blueprint line-work, sub-grid rhythm, or registration-mark atmosphere.
2. Strong typography split:
   - `Playfair Display`-style display serif
   - `IBM Plex Sans`-style body/UI
   - `DM Mono`-style labels, indices, coordinates, and metadata
3. One annotated hero with:
   - consultancy label/eyebrow
   - display lockup
   - restrained supporting copy
   - dual CTAs
   - three metrics or proof counters
   - dimension or annotation cues
4. A four-card services block with technical icon treatment and metadata tags.
5. A methodology/process section with explicit phased progression and deliverable markers.
6. At least one case-study or selected-projects section with sector labels and impact metrics.
7. A split contact close that feels like an enterprise intake workflow, not a centered startup card.
8. Gold accent use limited to deliverables, milestones, or high-value proof markers.

If any required signature item above is missing, the Corporate Blueprint output is incomplete.

## Required Landing Topology (Non-Negotiable)

For landing surfaces with `profile_recipe_lock=signature-on`, use this order unless the user explicitly changes it:

1. fixed glass nav with brand mark, mono-indexed links, and one CTA
2. annotated hero with dimension labels, display lockup, dual CTAs, and three counters
3. four-card services grid
4. methodology timeline with phased steps and deliverable badges
5. selected projects/case studies with one lead card plus supporting cards
6. split contact workflow section
7. structured footer

Do not collapse this into hero, generic features, testimonials, pricing, and footer. Do not inject Modern SaaS trust rails, proof strips, or pricing tables unless the user explicitly asks for them.

## Canonical Implementation Markers

These are the strongest signals from the repo demo and should appear in Corporate Blueprint outputs by default:

- fixed drafting grid canvas or equivalent blueprint field
- cyan line-work with low-opacity sub-grid plus brighter major grid
- registration-mark details or coordinate-style notation
- `Playfair Display`-style headline lockup with `DM Mono` labels
- fixed nav that gains a denser glass state on scroll
- hero annotations and vertical measurement cues
- three large numeric proof stats below the hero CTA row
- four service cards with technical icons and tag pills
- methodology timeline with numbered phases and gold deliverable tags
- selected-projects layout with one wide feature card and smaller supporting cards
- split contact section with firm details on one side and a serious intake form on the other
- footer that carries brand, services, firm links, and legal structure cleanly

## Signature Effects Matrix

Treat this as the canonical Corporate Blueprint effect stack.

### Atmosphere

1. Deep navy blueprint field with visible grid cadence.
2. Cyan drafting lines, registration marks, and low-opacity overlays.
3. Controlled glass on nav and key surfaces.
4. Reserved gold accent only on milestones and deliverables.

### Motion + Runtime

5. Hero and section reveal choreography with stagger.
6. Scroll-reactive nav condensation.
7. Counter animation for proof metrics.
8. Card-edge or border emphasis on hover, not flashy glow spam.

### Interaction

9. Quiet underline growth or index-emphasis on nav links.
10. Technical card hover polish with border/top-edge motion.
11. Form success-state feedback that feels operational and precise.
12. Optional scoped crosshair or coordinate cursor effect in a small number of named regions.

## First-Draft Recipe Pack (Default)

When `profile_recipe_lock=signature-on`, include at least:

- effects `1-4` for the atmosphere core
- effects `5-8` for the runtime core
- effects `9-11` for the interaction core
- effect `12` only if the user asks for it or the demo explicitly calls for it

## Core Direction

- Palette:
  - deep navy `#06101f`
  - blueprint navy `#0b1a30`
  - cyan line-work `#3ec6e0`
  - brighter cyan highlight `#5fd4eb`
  - reserved gold `#c9a84c`
- Typography:
  - display: `Playfair Display` intent
  - body/UI: `IBM Plex Sans` intent
  - mono labels: `DM Mono` intent
- Composition:
  - fixed glass nav
  - annotated hero
  - services grid
  - phased methodology
  - project cases
  - split contact workflow
  - structured footer

Default theme direction is `dark`. A light “blueprint paper” variant is optional, but the first draft should aim for the dark demo unless the user explicitly asks for light mode.

## Typography Contract (Non-Negotiable)

- Use serif display type for the primary headline and section titles.
- Use `DM Mono`-style uppercase labels for indices, nav links, tags, deliverable labels, and any coordinate language.
- Use `IBM Plex Sans`-style body/UI typography for supporting copy, cards, forms, and data.
- Do not flatten the page into all-sans enterprise typography.
- Do not overuse mono beyond labels, metadata, and technical callouts.

## Geometry Contract (Non-Negotiable)

- Keep geometry crisp and controlled, usually `4-12px` radii.
- Glass surfaces may be slightly softened, but not rounded into SaaS pills.
- Buttons and cards should feel architectural and measured.
- Gold should never become the main background color of cards or buttons.

## Spacing Rhythm Contract (Non-Negotiable)

Use an 8pt drafting rhythm with strong balance between outer section cadence and inner panel padding.

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

### Section spacing

- desktop section padding: `72-104px`
- tablet section padding: `56-72px`
- mobile section padding: `40-56px`

### Internal spacing

- hero split gap: `36-64px`
- services/methodology/project card padding: `22-32px`
- annotation/meta row spacing: `8-14px`
- timeline step spacing: `24-36px`
- split contact column gap: `32-48px`
- form field row spacing: `12-16px`

### Anti-regression rules

- Do not use oversized outer section spacing with cramped card interiors.
- Do not pack methodology and project cards edge-to-edge with their borders.
- Do not let metadata and annotation rows collapse into visual noise.
- Keep breakpoints gradual; avoid sudden density jumps.

## Scoped Cursor Guidance (Not Global by Default)

Custom cursor, crosshair, coordinate, spotlight, halo, and pointer-follow effects are allowed in this profile only as scoped demonstrations.

- never replace the page’s default cursor across the full landing page
- preferred demo scope: `2` named sections, or at most `3` sections/components total
- canonical corporate scope: services and methodology, or comparable structured sections
- bind the effect to explicit containers, never `body`, `html`, or the app shell
- compute coordinates relative to the scoped container
- hide the effect completely when the pointer leaves scope
- desktop fine-pointer only; disable on touch/coarse pointers and respect reduced motion

This keeps the blueprint personality visible without hijacking the whole experience.

## Failure Patterns To Avoid

- generic enterprise hero plus three cards plus contact layout
- Modern SaaS trust rails, proof strips, or pricing tables
- page-wide crosshair or cursor-follow takeover
- gold sprayed across every interactive state and card border
- mono used as the only typography voice
- giant exterior whitespace with cramped services, methodology, or project interiors
- dashboard-only composition when the surface is clearly a landing page

## A11y + Guardrails

- Maintain readable text contrast over all line-work and glass overlays.
- Use cyan and gold as emphasis, not as substitutes for text hierarchy.
- Respect `prefers-reduced-motion` for grid motion, reveals, counters, and cursor effects.
- Keep forms, links, and buttons fully usable without hover.
- If the crosshair or coordinate treatment hurts readability, shrink or remove its scope instead of expanding it.
