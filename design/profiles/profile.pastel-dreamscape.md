# Skill: Pastel Dreamscape Editorial Landing Template

## Design Philosophy
Pastel Dreamscape should feel like a romantic editorial landing page with dreamy atmosphere and adult taste, not a wellness starter, not a cute creator template, and not a softened SaaS bento. The canonical north star in this repo is `themes/pastel-dreamscape/index.html`: translucent fixed nav, split serif hero, floating blob object, wave transition, philosophy/services/process/testimonials/CTA cadence, and softly layered glass surfaces.

The target is curated softness with authority. Keep the page luminous and emotional, but composition and typography must stay disciplined enough that it still feels premium.

> Font delivery note: These profile font families describe the canonical theme/runtime intent. In this repo, fonts are self-hosted under `assets/fonts-bundled/` and loaded by the canonical theme CSS in `themes/`. For React/Next outputs, treat them as stylistic intent and use fallback chain `A -> B -> C` (skill-shipped bundled fonts, then Google-hosted skill families, then local/system).

## Canonical Landing Reference (Non-Negotiable)

When `design_profile=pastel-dreamscape` and the surface is a landing page, aim to reproduce the structure and tone of `themes/pastel-dreamscape/index.html` rather than older generic pastel starter pages.

If the output drifts toward `soft hero -> proof band -> generic cards -> pricing -> centered contact`, it has lost the profile.

## Required Signature Structure (Non-Negotiable)

When `design_profile=pastel-dreamscape`, first-draft output must include all of the following:

1. Layered dreamy atmosphere using floating color fields, soft grain, blur orbs, or paper-soft depth instead of flat pastel fills.
2. A split hero with a serif-led headline, restrained editorial copy block, dual CTAs, and one large organic visual object on the opposite side.
3. Strong serif display + clean sans body contrast so hierarchy survives the soft palette.
4. One decorative transition or divider between the hero and the first content block (wave, scallop, or similarly soft cutaway).
5. Varied rounded geometry; at least one surface should feel organic/blob-like while cards and buttons stay more disciplined.
6. A values/philosophy section and a process/journey section; the page cannot be just hero + feature cards.
7. A closing CTA that feels editorial and atmospheric, not a narrow centered form card.

If any required signature item above is missing, the pastel-dreamscape output is considered incomplete.

## Required Section Topology (Non-Negotiable)

For landing surfaces with `profile_recipe_lock=signature-on`, use this order:

1. translucent fixed nav with serif wordmark and uppercase editorial links
2. split hero with eyebrow/tag, large serif headline, concise supporting copy, dual CTAs, and one oversized blob/object treatment on the right
3. decorative divider or wave transition
4. philosophy/value trio in softly translucent cards
5. editorial services grid with large ordinal numbers and at least one service CTA card
6. four-step journey/process flow with connecting line or directional rhythm
7. three testimonials or story cards with quote treatment
8. centered CTA close with a large soft blob/backdrop behind the copy
9. multi-column footer

Do not substitute this with proof ribbons, pricing tables, dashboard stat rows, or generic bento SaaS sections unless the user explicitly requests those changes.

## Signature Effects Matrix (Target Reference)

### Atmosphere

1. Floating blur orbs in blush/lavender/mint/sky/peach tones.
2. Very light grain or paper texture on top of the page.
3. Translucent/frosted nav and card surfaces.
4. One large blob backdrop in the hero and another in the close.

### Motion + Runtime

5. Slow orbital drift on background atmosphere objects.
6. Gentle reveal/stagger choreography on section cards.
7. Slight pointer-reactive drift on the main hero object.
8. Soft hover lift on selected cards only.

### Interaction

9. Underline or tint shift on editorial nav links.
10. Plush but restrained button hover transitions.
11. Card elevation or glow changes on selected philosophy/service/testimonial cards.
12. Optional custom cursor or cursor halo only when explicitly scoped to named sections/components.

### Composition + Typography

13. Serif-led split hero.
14. Philosophy trio + editorial service grid + process flow cadence.
15. Large numbered service cards and quote-mark testimonial cards.
16. Clean sans body copy with restrained italic accenting in hero/section headlines.

## First-Draft Recipe Pack (Default)

When `profile_recipe_lock=signature-on`, include at least:

- effects `1-4` (atmosphere core)
- effects `5-8` (motion core)
- effects `9-11` (interaction core)
- effects `13-16` (composition core)

Optional refinement:

- effect `12`, but only as a scoped interaction inside one or two named sections

## Core Direction

- Palette:
  - cream and warm white base
  - blush, lavender, mint, sky, and peach atmosphere tones
  - one deeper rose accent for emphasis
- Typography:
  - high-contrast serif display by default
  - clean geometric/humanist sans for body and UI
  - mono is optional and should not appear in the default landing recipe
- Composition:
  - translucent fixed nav
  - split hero with one oversized organic object
  - wave or soft divider
  - philosophy card trio
  - numbered services editorial
  - four-step process flow
  - testimonial trio
  - centered CTA close

## Color System

### Light Theme (default)
| Token | Value | Usage |
|---|---|---|
| `--cream` | `#fdf6f0` | page base |
| `--white` | `#fffbf8` | raised cards and nav glass |
| `--text` | `#4a3f5c` | primary text |
| `--text-light` | `#7b6f8e` | secondary copy |
| `--blush` | `#f2c4ce` | warm atmosphere wash |
| `--lavender` | `#c9b8e8` | hero and section glow |
| `--mint` | `#b8e0d2` | freshness/support accent |
| `--peach` | `#fad4c0` | warmth/support accent |
| `--sky` | `#bcd4e6` | cool balancing wash |
| `--lilac` | `#e8d5f5` | soft surface variation |
| `--rose-deep` | `#d4909c` | emphasis and links |
| `--sage` | `#a8c5b8` | secondary organic accent |

### Dark Theme
| Token | Value |
|---|---|
| `--bg` | `#241f2d` |
| `--surface` | `#31283c` |
| `--surface-2` | `#3a3047` |
| `--surface-3` | `#463956` |
| `--text` | `#f8eef6` |
| `--muted` | `#c6b8d4` |
| `--border` | `rgba(248, 238, 246, 0.1)` |
| `--blush` | `#efb8c5` |
| `--lavender` | `#c7b5ef` |
| `--mint` | `#aad7ca` |
| `--peach` | `#f1c3b2` |
| `--sky` | `#b2cde5` |
| `--rose-deep` | `#f0a1b1` |

## Typography

### Font Stack
- **Display (`--font-display`)**: `"Cormorant Garamond"` intent for romantic editorial headlines
- **Body (`--font`)**: `"Questrial"` intent for clean readable UI/body copy
- **Mono (`--font-mono`)**: optional only for special metadata if explicitly requested; not part of the default landing recipe

### Hierarchy Rules
- Hero H1 should feel editorial and airy, often spanning two lines.
- Use italic emphasis sparingly inside headlines or the brand name, not across body copy.
- Body copy must stay crisp and restrained; do not run long paragraphs in decorative type.
- Avoid rounded display faces and cute bubble typography in the canonical recipe.

## Geometry Contract (Non-Negotiable)

- Use varied radii across the system (`18px`, `28px`, `40px`, `64px`) plus one organic blob-like silhouette.
- Buttons, testimonial cards, service cards, and hero shapes should not all share the same pill radius.
- One or two standout hero/CTA surfaces can be fully organic; the rest should stay composed and readable.

## Spacing Rhythm Contract (Non-Negotiable)

Use an airy editorial rhythm with generous breathing room.

### Required scale

- `--s-1: 4px`
- `--s-2: 8px`
- `--s-3: 12px`
- `--s-4: 16px`
- `--s-5: 24px`
- `--s-6: 32px`
- `--s-7: 48px`
- `--s-8: 72px`
- `--s-9: 104px`

### Section spacing

- desktop section padding: `96-132px`
- tablet section padding: `72-96px`
- mobile section padding: `48-64px`

### Internal spacing

- hero split gap: `40-80px`
- philosophy/service card padding: `26-36px`
- process step spacing: `24-32px`
- testimonial cards: `24-32px`
- CTA close padding: `56-88px`

### Anti-regression rules

- Do not compress the editorial sections into dense SaaS cards.
- Do not use giant outer whitespace with under-designed inner modules.
- Do not center every section into the same safe stack width.

## Surface Rules

- Mix soft translucent cards, subtle borders, blurred blobs, and low-contrast shadow depth.
- Keep the nav and selected cards lightly frosted, not fully opaque or heavy-glass everywhere.
- Let the hero and CTA own the largest atmospheric shapes; secondary sections should feel lighter and more printable.
- Prefer borderless transitions or decorative dividers between major sections over hard section bands.

## Interaction Rules

- Use subtle nav state changes on scroll, reveal/stagger choreography, and gentle card lift.
- Buttons should feel tactile but refined; avoid oversized gummy-pill SaaS buttons.
- Focus states must remain visible against cream and white surfaces.

## Scoped Cursor Guidance (Not Global by Default)

Custom cursor effects are allowed in this profile, but they must stay scoped:

- preferred scope: one or two named sections, or one special component cluster
- recommended pastel scope: services and/or process-style sections only
- never bind a custom cursor, cursor halo, or pointer-follow ring to the whole page
- render the effect element inside the scoped container
- compute coordinates relative to the scope bounding box
- hide the effect entirely when the pointer leaves scope
- desktop-only; disable on touch/coarse pointers and respect reduced-motion preferences

This avoids whole-page cursor takeover while preserving the profile's dreamy interactivity.

## Failure Patterns To Avoid

- Do not output a generic wellness or creator landing page with pink/lavender tokens pasted on.
- Do not replace the editorial section cadence with proof band + pricing table + centered contact.
- Do not use bubbly rounded display fonts in the canonical recipe.
- Do not make every card and button the same rounded capsule.
- Do not rely on pastel color alone for identity; the hero object, divider, and section rhythm must carry the profile.
- Do not ship a whole-page custom cursor effect.

## A11y + Guardrails

- Keep body copy contrast high enough on pale backgrounds.
- Use stronger text/border tokens than the palette might tempt you toward.
- Respect `prefers-reduced-motion` for orb drift, hero drift, reveal, and lift.
- Disable scoped cursor effects on coarse pointers and small touch devices.
