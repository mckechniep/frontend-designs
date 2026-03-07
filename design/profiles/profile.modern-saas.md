# Skill: Modern SaaS Premium Assurance Template

## Design Philosophy
Modern SaaS is a premium product-story system, not a startup starter kit. The target is a high-trust landing or product screen with warm slate depth, cream text, amber metal accents, serif-led hierarchy, and selective glass only where it adds value.

Use the current starter implementation in `assets/vanilla-starter/index.html` with `assets/vanilla-starter/profiles/modern-saas.css` as the canonical north star: fixed blurred nav, serif-led hero, tilted product mockup, transparent trust rail, premium feature grid, structured proof, pricing, and a strong close over one continuous page atmosphere.

> Font delivery note: These profile font families describe vanilla starter intent. In this repo's starter, fonts are self-hosted under `assets/fonts-bundled/` via `assets/vanilla-starter/styles.fonts.local.css`. For React/Next outputs, treat them as stylistic intent and use fallback chain `A -> B -> C` (skill-shipped bundled fonts, then Google-hosted skill families, then local/system).

## Required Signature Structure (Non-Negotiable)

When `design_profile=modern-saas`, first-draft output must include all of the following:

1. Serif-led display hierarchy with clean geometric body text.
2. Warm dark atmosphere stack driven by a continuous body-level gradient (`dark -> warm lift -> dark`) plus amber/sage/coral accent logic and restrained orb depth.
3. Fixed or sticky premium nav that condenses into a blurred surface on scroll.
4. Split hero with badge/proof cluster on one side and a product/device/mockup surface on the other.
5. A trust rail or proof strip immediately after hero.
6. Feature surfaces with selective glow/metal accents instead of repeated generic frosted cards.
7. One structured proof surface beyond features (spotlight, use-scene, process, testimonial rail, or plan comparison).
8. Premium closing CTA or pricing section; do not end with only a centered narrow contact form.

If any required signature item above is missing, the modern-saas output is considered incomplete.

## Required Section Topology (Non-Negotiable)

For landing surfaces with `profile_recipe_lock=signature-on`, use this order:

1. fixed/sticky nav with premium brand mark
2. split hero with badge, proof, dual CTA, and product mockup
3. trust rail / customer proof strip
4. feature or capability grid
5. spotlight or narrative use-scene split
6. proof expansion (`how it works`, testimonials, or quantified outcomes)
7. pricing / plan comparison or high-trust CTA close
8. structured footer

Do not collapse to `generic hero -> three cards -> centered contact card`.

## Starter Implementation Markers (Canonical Sync)

These markers describe the current starter profile and should be preserved when generating new modern-saas output unless the user explicitly requests a deviation.

1. Atmosphere lives on the page canvas (`body`/root), not in repetitive section-band overlays.
2. The page background reads as one seamless premium field with restrained amber/sage radial lift rather than alternating section blocks.
3. Trust rail and alternate sections stay mostly transparent so the long-form page feels continuous.
4. The hero preview/mockup surface is a tilted frosted card with subtle hover relaxation, not a flat centered screenshot block.
5. Pricing uses a compact savings pill (`Save 25%`) integrated into the annual billing toggle, never a full-width badge/ribbon.
6. Featured pricing emphasis comes from border, shadow, and accent hierarchy, not oversized transforms or color flooding.

## Signature Effects Matrix (Target Reference)

### Atmosphere

1. Low-opacity grain overlay (via effects system `film-grain-overlay`, enabled at medium+ tiers).
2. Warm ambient orbs or light fields in hero/support sections.
3. Frosted nav and selective glass surfaces.
4. Subtle amber edge highlights or metal-line accents.

### Motion + Runtime

5. Scroll reveal choreography.
6. Staggered sibling reveals.
7. Nav condense-on-scroll behavior.
8. Tilted/floating hero mockup motion.
9. Small proof/status pulse on one badge or shield accent.

### Interaction

10. Elevated CTA hover with restrained shadow gain.
11. Feature card top-edge sheen or accent-line reveal.
12. Pricing or plan emphasis state with stronger border/light treatment.
13. Testimonial/proof card lift with no cartoon bounce.

### Composition + Typography

14. Serif display + sans body split.
15. Premium proof cluster (avatars, stats, trust copy, or customer marks).
16. Structured section labels and clean dividers.
17. Multi-surface rhythm with one strong spotlight section.

## First-Draft Recipe Pack (Default)

When `profile_recipe_lock=signature-on`, include at least:

- effects `1-4` (atmosphere core)
- effects `5-8` (motion core)
- effects `10-12` (interaction core)
- effects `14-17` (composition core)

Optional refinements:

- effect `9` and `13`

## Core Direction

- Palette:
  - deep slate base `#1a1f2e`
  - cream and warm white text/surfaces
  - amber as primary emphasis
  - sage and muted coral as supporting accents
- Typography:
  - display: elegant serif with italic moments
  - body/interface: clean geometric sans
  - utility/meta: restrained mono for labels or pricing metadata only
- Atmosphere:
  - cinematic but controlled; premium assurance rather than nightclub glow
  - continuous body-level gradient field with a lighter warm lift through the middle of the page
  - restrained amber and sage atmospheric orbs layered over the page canvas
- Composition:
  - split hero, trust rail, proof-driven sections, structured pricing/CTA close
  - multi-surface rhythm over one continuous page background rather than obvious alternating section bands

## Color System

### Dark Theme (default)
| Token | Value | Usage |
|---|---|---|
| `--bg` | `#1a1f2e` | page background |
| `--surface` | `#2a3042` | elevated surfaces |
| `--surface-2` | `#232838` | alternating surfaces |
| `--surface-3` | `#3d4459` | higher emphasis panels |
| `--text` | `#f8f5f0` | primary text |
| `--muted` | `#a8a3a0` | body secondary text |
| `--muted-2` | `#6e6a68` | tertiary labels |
| `--border` | `rgba(255, 255, 255, 0.08)` | standard borders |
| `--border-strong` | `rgba(255, 255, 255, 0.14)` | emphasized borders |
| `--accent` | `#e8a94a` | amber emphasis |
| `--accent-2` | `#c98b2f` | deeper amber |
| `--accent-soft` | `#8fa89a` | sage support |
| `--accent-coral` | `#d9786c` | warm accent for secondary highlights |
| `--glass-bg` | `rgba(255, 255, 255, 0.08)` | premium frosted surfaces |
| `--glass-border` | `rgba(255, 255, 255, 0.14)` | frosted borders |

### Light Theme
| Token | Value |
|---|---|
| `--bg` | `#f8f5f0` |
| `--surface` | `#ffffff` |
| `--surface-2` | `#ede8df` |
| `--surface-3` | `#e2d9cb` |
| `--text` | `#1a1f2e` |
| `--muted` | `#5f5a57` |
| `--muted-2` | `#7a746f` |
| `--border` | `rgba(26, 31, 46, 0.1)` |
| `--border-strong` | `rgba(26, 31, 46, 0.16)` |
| `--accent` | `#c98b2f` |
| `--accent-2` | `#a87122` |
| `--accent-soft` | `#6b8478` |
| `--accent-coral` | `#b86458` |
| `--glass-bg` | `rgba(255, 255, 255, 0.72)` |
| `--glass-border` | `rgba(26, 31, 46, 0.1)` |

## Typography

### Font Stack
- **Display (`--font-display`)**: `"DM Serif Display"` (400 regular + 400 italic, bundled) with `"Playfair Display"` fallback, then `Georgia`
- **Body (`--font`)**: `"Outfit"` (300, 400, 500, 600, 700, bundled) for readable product copy and UI text
- **Mono (`--font-mono`)**: `"IBM Plex Mono"` intent for utility labels, metrics, or plan metadata

### Weight Rules
- Display headings (h1-h3, brand-text): weight **400** — DM Serif Display is inherently display-weight at 400; using 600 causes faux bold
- Body copy: weight **300** for premium airiness; **400** for standard paragraphs
- UI controls (buttons, labels): weight **500-600**
- Mono metadata: weight **400**

### Hierarchy Rules
- H1/H2 must read as premium editorial-product typography, not default tech dashboard text.
- Use italic emphasis for one hero token or short phrase only.
- Reserve mono treatment for small labels, plan metadata, or measured proof values.

## Geometry Contract (Non-Negotiable)

- Major surfaces use medium radii (`12-24px`), not zero-radius severity and not universal pill treatment.
- Buttons/badges may use pill or high-radius forms, but cards/panels must vary shape and scale.
- Do not make every surface equally glassy or equally rounded.

## Spacing Rhythm Contract (Non-Negotiable)

Use an 8pt-based premium marketing rhythm.

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

- desktop section padding: `96-120px`
- tablet section padding: `72-88px`
- mobile section padding: `48-64px`

### Internal spacing

- hero split gap: `40-72px`
- feature/plan/testimonial card padding: `24-36px`
- trust rail spacing: `24-40px`
- spotlight split gap: `32-56px`
- CTA close padding: `32-48px`

### Anti-regression rules

- Do not pair oversized outer section padding with tiny interior padding.
- Do not shrink the hero into a flat centered block.
- Do not default the contact or close section to a narrow centered card only.

## Surface Rules

- Use selective glass:
  - nav
  - hero badge/proof
  - hero device/mockup
  - one or two premium highlight surfaces
- Keep the page background itself doing the heavy atmospheric work; sections should usually remain transparent unless a specific spotlight surface needs separation.
- Feature cards may be matte/frost hybrids; they must not look like repeated SaaS placeholders.
- Use amber line accents, soft borders, and layered shadows instead of violet glow or generic blue glass.

## Interaction Rules

- Scroll reveals should feel calm and expensive, not hyperactive.
- Hero mockup float/tilt should be small and disabled under reduced motion.
- Button and card hovers should lift subtly with stronger light/border definition.
- Pricing emphasis should use border, shadow, and accent hierarchy rather than pure color flood.

## Pricing Section

The pricing section is a 3-tier comparison with a monthly/annual billing toggle. Structure:

- **Section header**: centered kicker + title + subtitle
- **Billing toggle**: pill-shaped radio group with amber active state and a compact `Save 25%` savings pill integrated into the annual option, not a full-width banner
- **Pricing grid**: 3 columns on desktop, stacked on mobile
  - Standard cards: glass surface (`rgba(255,255,255,0.06)`), ghost CTA button
  - Featured card: elevated with amber border accent (`rgba(232,169,74,0.28)`), stronger shadow stack, "Most Popular" badge, primary CTA button, featured amount in `--accent`
- **Feature lists**: sage-colored checkmark indicators using `--accent-soft`
- **Price display**: `--font-display` at weight 400 for the amount, mono-style currency symbol
- **Toggle JS**: switches `data-price-value` text between `data-price-monthly` and `data-price-annual` attributes

Light theme: standard cards use `--glass-bg`, featured card uses `--surface` with amber border shadow.

## Failure Patterns To Avoid

- Do not output a purple Vercel/Linear clone.
- Do not use `Inter` + violet + repeated frosted cards as the baseline identity.
- Do not rely on a generic trust strip and three feature cards as the whole design language.
- Do not end with only a centered narrow contact card.
- Do not spray glow across all surfaces; this is premium assurance UI, not neon futurism.

## A11y + Guardrails

- Maintain readable contrast on amber accents against both dark and light surfaces.
- Keep serif sizes large enough for comfortable scanning; do not use the display face for dense UI controls.
- Preserve focus visibility over frosted and layered surfaces.
- Respect `prefers-reduced-motion` for nav condense, hero float, and reveal choreography.
