# Landing Layout Patterns

Canonical landing layouts for `PLAN` and `DESIGN_SPEC` generation.

## Layout L1 - Product Narrative

Sections:

1. Hero (headline, supporting copy, primary CTA, secondary CTA)
2. Trust strip (logos or social proof)
3. Feature grid (3-6 cards)
4. Metrics/testimonial band
5. Pricing preview (optional)
6. Final CTA

Grid strategy:

- Desktop: hero 2-column, features 3-column
- Tablet: hero stacked media-first or copy-first, features 2-column
- Mobile: single column with compressed spacing

## Layout L2 - Conversion Focused

Sections:

1. Hero with benefit bullets
2. Problem/Solution split
3. Proof points (stats + testimonial)
4. FAQ accordion
5. Conversion CTA + contact form

## Layout L3 - Brand/Studio

Sections:

1. Positioning hero
2. Capability ticker lane (optional by profile)
3. Work showcase carousel/grid
4. Credibility strip (clients/metrics)
5. Contact CTA

## Layout L4 - Cinematic Research Narrative

Use for expressive technical profiles (`arctic-mono`, `cyberpunk-neon`, `noire-editorial`) when `profile_recipe_lock=signature-on`.

Sections:

1. Hero system state (badge, 2-3 line title, lead, dual CTAs, animated stats, scroll cue)
2. Section `01` research/capabilities grid (3-4 cards with technical iconography/tags)
3. Signature showcase module (split narrative + visual system panel/canvas)
4. Section `02` divisions/tracks list (interactive rows)
5. Section `03` publications/case feed (editorial or technical entries)
6. Contact split (copy + form with explicit feedback)

Grid strategy:

- Desktop: hero split (copy + metrics), showcase split, research in 2x2 or 3-column based on card density
- Tablet: hero stacked, research 2-column, divisions single-column
- Mobile: single-column flow, preserve section numbering and one signature visual moment

Hard rules:

- Do not collapse to generic 4-section SaaS fallback when this layout is selected.
- Preserve section numbering rhythm for technical/editorial profiles.
- Preserve one profile-specific signature module in the first viewport and one mid-page.

## Layout L5 - Terminal Command Console

Use for `retro-terminal` when `profile_recipe_lock=signature-on`.

Sections:

1. Boot overlay (POST/kernel/service startup lines before main reveal)
2. Terminal frame shell (window chrome + command prompt context)
3. Command-nav row (`./welcome.sh`, `cat services.conf`, `whoami`, `netstat --threats`, `ssh contact`)
4. Hero command output (ASCII logo + typed lines + dual command CTAs)
5. Services/config surface (terminal config/listing structure)
6. Operator profile surface (`whoami` style block)
7. Live telemetry (`netstat --threats` feed + stat panels)
8. Secure contact session (encrypted transmission simulation)
9. Terminal status footer

Grid strategy:

- Desktop: command-console full-width shell with stacked terminal sections
- Tablet: preserve command-nav semantics, allow wrapped command chips
- Mobile: keep shell framing, allow horizontal scroll for wide terminal content blocks

Hard rules:

- Do not replace terminal shell with generic marketing header/hero/cards layout.
- Do not rename command-nav labels into plain marketing nav labels.
- Do not remove boot overlay, live feed, or secure transmission form feedback.

## Responsive Rules

- no horizontal overflow at 360px
- preserve one signature visual moment at all breakpoints
- move multi-column content to single column on narrow screens
