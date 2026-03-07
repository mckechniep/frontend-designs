# Design Excellence Rubric

Run this quick self-check before returning code.

## Scoring Rule

Score each category `0-2`:

- `0` = weak/missing
- `1` = present but not convincing
- `2` = strong and profile-coherent

Target: `>= 16/20` before final output.  
If below target, revise once before returning deliverables.

## Visual Hierarchy

- Is the primary action unmistakable?
- Is information grouped and ordered by user intent?

## Typography

- Is the type scale coherent and restrained?
- Is line length and spacing readable on desktop and mobile?

## Spacing And Layout

- Is spacing rhythm consistent across sections/components?
- Does the layout stay stable at 360px, 768px, and 1280px?

## Color And Contrast

- Are interactive and text contrasts readable in active theme/profile?
- In light mode, is primary/secondary/body text clearly readable (not light-on-light)?
- If both-theme mode is supported, does readability hold in both light and dark?
- Are status cues understandable without color alone?

## Components And Interactions

- Are states present (default/hover/focus/disabled/loading/error where relevant)?
- Are focus styles visible and keyboard behavior complete?
- For dashboard/data surfaces, are tables sortable/filterable where it improves usability?
- For chart surfaces, are charts responsive and easy to inspect (tooltip/legend/value clarity)?

## Motion And Polish

- Is motion subtle and intentional (not ornamental noise)?
- Does the screen feel deliberate and premium rather than generic?
- If Expressive Effects Layer is enabled, are effects profile-consistent and restrained (not amateur/noisy)?
- If Expressive Effects Layer is enabled, do effects have clear hierarchy (hero-first, then section, then micro-interactions)?
- If cursor-driven effects are enabled, are they scoped to explicit sections/components and invisible outside those bounds?

## Distinctiveness

- Would this UI be distinguishable from a default starter template in under 5 seconds?
- Are typography, color, and component tone clearly aligned with the chosen style profile?
- Is "minimal" expressed as intentional restraint rather than missing visual direction?
- Is the Expressive Effects Layer layered on top of profile identity instead of replacing profile coherence?

## Profile Signature Checks (Required For Expressive Profiles)

### `retro-terminal`

- Boot sequence exists and runs before normal content reveal.
- Dedicated terminal shell frame exists (not generic site header composition).
- Nav uses command-style labels, not generic marketing labels.
- Hero includes ASCII + typewriter line behavior.
- Live threat feed updates periodically.
- Contact flow includes secure transmission feedback (not plain form submit message).
- Spacing rhythm is coherent across shell, command-nav, terminal sections, telemetry, and contact form surfaces.

### `cyberpunk-neon`

- Atmosphere stack includes gradient base + scanline + optional restrained technical overlay.
- Primary cards/buttons use angular clipped-corner or zero-radius geometry (not rounded SaaS pills).
- Feature/project cards include matrix-style vertical streak/rain treatment when in scope.
- Hero has high-drama title treatment (split/accent/glitch token as scoped effect).
- At least one semantically relevant terminal readout surface includes blinking cursor behavior.
- At least one interaction effect is clearly cyberpunk (spotlight, rgb split, or scoped glitch).
- Light mode (if requested) preserves cyberpunk identity instead of collapsing to generic teal SaaS.

### `arctic-mono`

- Hero and surfaces feel frost-tech (not generic enterprise blue).
- Hero reads like a research archive or system briefing, not a startup homepage.
- Signature technical visual module exists (for example helix/diagnostic shell/blueprint panel/frost field).
- Typography split is clear (display vs mono labels/data).
- Smaller structural headings in divisions/tracks and publication records use the mono/uppercase system rather than soft product-marketing heading styles.
- Motion is precise and measured (reveals/counters/sweeps), not flat.
- Atmosphere depth is present (subtle snow/frost particles + grain/ambient layering) without readability loss.
- Core UI surfaces are sharp (zero-radius cards/badges/buttons/inputs) unless a status dot explicitly requires circular form.
- Navigation has premium behavior (glass treatment + directional show/hide or equivalent).
- Section topology matches cinematic research narrative (hero + research modules + signature split + divisions row-list + publication record + field briefing).
- Output is invalid if reduced to generic hero/cards/contact structure without explicit user simplification.
- Output is invalid if it falls back to trust rails, pricing, or generic SaaS proof cadence without explicit user direction.
- Spacing rhythm is coherent (section padding, heading gaps, card padding, split-layout gaps) with no outer/inner imbalance.

### `noire-editorial`

- Page field reads as a near-black dossier; heavier grain/noise is concentrated on boxed surfaces instead of muddying the whole canvas.
- Hero includes classification cues, a redaction or evidence-reveal line, mini issue stats, and a cover-sheet / briefing card or equivalent editorial companion surface.
- Typography hierarchy is unmistakably editorial (serif display + sans body + uppercase utility contrast).
- Composition avoids generic SaaS symmetry and keeps dossier/editorial tone.
- Investigations/case-files/records pacing reads like an authored dossier, not a features/testimonials/pricing stack.
- Interactive cues feel investigative/publishing-themed, not generic card hovers only.
- Dossier composition markers are present (section indices, labels/rules, stamp or redaction language).
- If a cursor accent exists, it is visible only inside `2-3` named dossier surfaces and never becomes the page-wide default cursor.
- Output is invalid if reduced to centered generic hero/cards/contact structure without explicit user simplification.

### `corporate-blueprint`

- Blueprint visual language is present (line-work, annotation rhythm, disciplined hierarchy).
- Landing topology follows the canonical consultancy cadence (annotated hero + services + methodology + projects + split contact) unless the user explicitly requested a different structure.
- Typography split is clear: serif display, sans body, mono labels/indices.
- Dashboard/data surfaces remain clarity-first (readable table/chart/panel spacing).
- Gold accents are reserved for milestone/deliverable emphasis (not sprayed across all UI).
- Spacing rhythm is coherent across sections, panels, annotation labels, and split layouts.
- If a crosshair or coordinate cursor effect exists, it is visible only inside named sections/components and never becomes the page-wide default cursor.
- Output is invalid when panel/table/chart interiors are cramped while outer section spacing is oversized.

### `modern-saas`

- Product UI reads premium and controlled, not like a starter-kit clone with purple accents.
- Page atmosphere reads as one continuous premium field; sections do not feel pasted on via repetitive alternating bands or generic overlay washes.
- Glass treatments are selective and disciplined; the screen does not devolve into full-page frosted-card repetition.
- Typography and layout hierarchy create clear product depth beyond a default hero + trust strip + three cards pattern.
- Primary marketing or product surfaces include at least one strong structure change from commodity SaaS composition.
- Output is invalid if it can be mistaken for a Vercel/Linear imitation in under 5 seconds.

### `pastel-dreamscape`

- Softness feels intentional and premium, not childish or template-like.
- Composition includes at least one unmistakable dreamy signature (floating atmosphere, oversized blob/object framing, divider transition, or equivalent).
- Rounded geometry is varied and controlled; the screen does not collapse into identical pills and soft cards everywhere.
- Typography should read serif-display plus clean sans body; bubbly rounded headline fonts are a miss for the canonical recipe.
- Landing cadence should read like an editorial journey (`hero -> philosophy -> services -> process -> testimonials -> CTA`), not generic SaaS feature/pricing sequencing.
- Motion, if used, feels airy and restrained rather than flat or absent.
- If a custom cursor effect exists, it is scoped to named sections/components and never takes over the whole page.
- Output is invalid if it reads as a generic wellness/creator landing page with only pink/lavender tokens swapped in.

### `sunset-gradient`

- Gradient treatment creates atmosphere and hierarchy, not just colorful backgrounds and CTA fills.
- The page reads like a premium warm enterprise launch page, not a generic startup template with warmer colors.
- Hero includes a clear poster-scale display treatment, gradient phrase emphasis, and a strong hero-side visual object such as a glowing dashboard orb.
- Composition follows the canonical cadence: hero + quiet logo row + solutions grid + stats band + split platform section + testimonials + centered CTA close.
- Warm accent use is controlled; orange/red/gold tones do not spray across every surface equally.
- Typography uses serif display plus clean sans body rather than mono-heavy system styling or modern-saas hierarchy.
- Motion, if used, reinforces reveal/counter/orbital/glow behavior without reducing readability.
- Output is invalid if it falls back to pricing tables, generic feature-card stacks, or modern-saas proof/pricing cadence without explicit user direction.
- Output is invalid if it reads as a standard startup landing page with orange-to-purple gradients pasted on top.

## Exit Criteria

- If any answer above is "no", fix before final output.
