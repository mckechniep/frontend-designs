# Skill: Noire Editorial Dossier Landing Template

## Canonical Target
Noire Editorial is now a **dark dossier landing page** in this repo, not a warm-paper magazine skin and not a luxury SaaS variant with serif type pasted on top. The canonical north star is `themes/noire-editorial/index.html`: near-black page field, sharp gold dividers, classified badge/stamp language, redaction reveal, investigations wall, case-file spread, records feed, split briefing close, and restrained editorial motion.

If a generated Noire page drifts toward warm newsprint, trust rails, pricing, testimonial carousels, or centered marketing symmetry, it has already lost the profile.

> Font delivery note: These profile font families describe the canonical theme/runtime intent. In this repo, fonts are self-hosted under `assets/fonts-bundled/` and loaded by the canonical theme CSS in `themes/`. For React/Next outputs, treat them as stylistic intent and use fallback chain `A -> B -> C` (skill-shipped bundled fonts, then Google-hosted skill families, then local/system).

## Design Philosophy
Noire Editorial should feel like an authored report assembled by a premium night desk:

- reported and deliberate, not decorative for its own sake
- luxurious through restraint, hierarchy, and composition
- darker dossier atmosphere, not sepia newspaper cosplay
- sharp and angular, with zero-radius surface language
- atmospheric, but always readable and controlled

The page should read like a lead story and a briefing packet, not like a startup homepage.

## Canonical Landing Reference (Non-Negotiable)

When `design_profile=noire-editorial` and the surface is a landing page, aim to reproduce the structure and tone of `themes/noire-editorial/index.html` rather than older generic Noire starter pages.

If the layout becomes `hero -> proof strip -> features -> testimonials -> pricing/contact`, it is invalid for the canonical Noire landing.

## Required Signature Structure (Non-Negotiable)

When `design_profile=noire-editorial`, first-draft output must include all of the following:

1. A near-black page field with charcoal cards/components. Heavier grain/noise belongs on boxed surfaces, not across the whole page by default.
2. Clear typography split:
   - `Playfair Display`-style display serif for the main dramatic headlines
   - `DM Sans`-style clean sans for body copy
   - `Cinzel`-style uppercase utility face for labels, metadata, section kickers, and dossier chrome
3. One dossier hero with:
   - issue badge / report label
   - classified stamp pulse or equivalent evidence cue
   - dramatic serif headline
   - redacted or evidence-reveal sentence
   - dual CTAs
   - mini issue stats
   - cover-sheet / ledger card on the opposite side
4. Visible dossier composition markers: section kickers, indices, rules, file labels, witness/desk-note language, or ledger rows.
5. Mid-page investigative structure that feels authored:
   - investigations wall
   - case-file spread
   - records/publications feed
6. One split final briefing/contact section instead of a narrow centered conversion card.
7. Sharp zero-radius cards, inputs, buttons, and dividers.

If any required signature item above is missing, the Noire output is incomplete.

## Required Landing Topology (Non-Negotiable)

For landing surfaces with `profile_recipe_lock=signature-on`, use this order unless the user explicitly changes it:

1. fixed editorial nav with uppercase links and one dossier CTA
2. split dossier hero with classified cue, redaction line, mini stats, and cover-sheet card
3. investigations wall / evidence section
4. case-file spread with narrative copy and supporting witness/brief stack
5. records feed with one primary list surface and supporting note cards
6. split final briefing / contact section
7. structured footer

Do not substitute this with trust rails, pricing tables, generic testimonial bands, or default three-card SaaS feature grids.

## Canonical Implementation Markers

These are the strongest signals from the repo demo and should appear in Noire outputs by default:

- near-black page canvas with only a restrained top wash
- dark charcoal boxed surfaces with gold-tinted borders
- thin scanline treatment at low opacity
- grain/noise texture concentrated on cards, trays, and other boxed components
- gold rule/kicker system paired with a visible muted-red classified stamp
- hero redaction reveal inside the lead copy
- cover-sheet card with ledger rows and dossier note copy
- investigations section that mixes lead thesis, desk note, pull quote, and field tray rather than repeated equal cards
- case-files section with asymmetric copy on one side and witness/brief cards on the other
- records section with one primary records list card plus supporting quote/checklist cards
- contact close framed as a briefing request rather than a cheerful sales form
- scoped cursor accent, if used, limited to `2-3` named dossier surfaces total

## Signature Effects Matrix

Treat this as the canonical Noire effect stack.

### Atmosphere

1. Near-black page field with restrained warm top lift.
2. Low-opacity scanline treatment.
3. Surface-scoped grain/noise on boxed cards/components.
4. Sharp gold rules and separators.

### Motion + Runtime

5. Classified stamp pulse or equivalent accent rhythm.
6. Section reveal choreography with editorial restraint.
7. Subtle rule/header sweep or equivalent directional cue.
8. Optional gentle card lift or sheen, never playful floatiness.

### Interaction

9. Redaction reveal or evidence-reveal behavior in hero/lead copy.
10. Editorial nav underline or rule-shift behavior.
11. Investigative card accent response on hover/focus.
12. Optional scoped cursor accent only on named dossier surfaces.

### Composition + Typography

13. Serif-led dramatic headline lockup.
14. Uppercase dossier utility labels and section kickers.
15. Asymmetric editorial rhythm across mid-page sections.
16. Records/publications feed and final briefing close.

## First-Draft Recipe Pack (Default)

When `profile_recipe_lock=signature-on`, include at least:

- effects `1-4` (atmosphere core)
- effects `5-8` (motion core)
- effects `9-11` (interaction core)
- effects `13-16` (composition core)

Optional refinement:

- effect `12`, but only inside `2-3` named dossier surfaces

## Core Direction

- Default theme is dark-first.
- Keep the base page field closer to black than paper-grey.
- Cards/components can be slightly lighter charcoal than the page field, but not creamy or sepia unless the user explicitly asks for that direction.
- Gold is the main premium accent; muted red is reserved for classified/warning cues.
- The page should feel premium through hierarchy and pacing, not through heavy glow stacks.
- If a light theme is requested, keep the dossier tone and sharp geometry; do not collapse to soft beige lifestyle UI.

## Anti-Patterns

Avoid all of the following unless the user explicitly asks for them:

- warm paper or newspaper-like full-page background treatment
- centered generic hero with proof strip and equal cards
- pricing tables, SaaS trust rails, or startup proof cadence
- rounded cards, rounded pills, bubbly inputs, or soft glassmorphism drift
- page-wide cursor replacement or page-wide cursor glow
- full-canvas fuzzy/noise blanket that muddies readability
- purple/cyan neon glow takeover
- testimonial carousel as a default Noire landing signature
