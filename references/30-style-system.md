# Style System

Choose one style profile before layout work.

Canonical profile IDs and mappings live in [references/32-profile-registry.md](references/32-profile-registry.md).

## Profile Selection Prompt

Use this menu when user has not provided a clear style direction:

- A) `keep-existing` - preserve current repo visual language
- B) `modern-saas` - premium warm product narrative with serif-led hierarchy
- C) `cyberpunk-neon` - high-contrast neon terminal futurism
- D) `arctic-mono` - high-drama frost-tech lab narrative
- E) `noire-editorial` - luxury editorial serif contrast
- F) `corporate-blueprint` - enterprise navy precise dashboard
- G) `retro-terminal` - CRT green-on-black nostalgic terminal
- H) `pastel-dreamscape` - dreamy serif editorial pastel landing
- I) `sunset-gradient` - cinematic warm poster narrative

Default behavior:

- established non-empty repo with passing keep-existing viability gate -> `keep-existing`
- greenfield/empty context -> ask for a concrete profile; if the user does not answer, infer by surface:
  - landing/brand-forward marketing -> `arctic-mono`
  - dashboard/app/data/product UI -> `corporate-blueprint`
  - if surface type remains unclear, prefer `corporate-blueprint` over `modern-saas`

Accept letter (`A-I`) or profile id (case-insensitive).

Prompting rule:

- Never ask "pick a profile" without showing this menu (or an equivalent explicit list).
- If repo context is empty/greenfield, omit `A) keep-existing` and offer only concrete profiles.
- If user gives only a vibe ("clean", "futuristic", "editorial"), map it to the nearest profile and state the mapping before proceeding.

For `arctic-mono`:

- Prefer frost-tech research archive composition over minimalist SaaS simplification.
- Default landing layout is `Layout L4 - Cinematic Research Narrative`, specifically: hero system state + research modules + signature technical split + divisions row-list + publication record + field briefing close.
- Use `DM Mono`-style mono labels for nav, labels, metadata, and smaller structural headings by default; prefer `DM Mono` when available, otherwise use shipped `IBM Plex Mono` in font mode `A`, and do not let Arctic drift into friendly product-marketing typography.
- Do not introduce trust rails, pricing, or generic proof-strip cadence unless the user explicitly asks for them.

For `noire-editorial`:

- Prefer darker dossier/editorial asymmetric composition over centered marketing composition.
- Default landing layout should follow the canonical sequence: fixed editorial nav + split dossier hero with cover-sheet card + investigations wall + case-file spread + records feed + split final brief + structured footer.
- Keep the page field near-black and let stronger grain/noise live on boxed surfaces instead of coating the entire canvas.
- Use serif display + clean sans body + uppercase utility labels by default; do not let Noire drift into soft magazine beige or generic SaaS typography.

For `retro-terminal`:

- Prefer command-console composition over generic marketing composition.
- Default landing layout is `Layout L5 - Terminal Command Console` when `profile_recipe_lock=signature-on`.

For `corporate-blueprint`:

- Prefer blueprint annotation rhythm over dense enterprise default packing.
- Default landing layout should follow the canonical consultancy sequence: fixed glass nav + annotated hero + services grid + phased methodology + selected projects + split contact workflow + structured footer.
- Use `Playfair Display`-style display type, `IBM Plex Sans`-style body type, and `DM Mono`-style labels by default; in font mode `A`, prefer shipped `IBM Plex Mono` over unresolved `DM Mono` declarations, and do not flatten it into all-sans enterprise UI.
- Keep section/panel spacing disciplined and legible, especially on dashboard/table/chart surfaces.
- If a cursor-driven effect is used, demonstrate it in 2-3 named sections/components at most; never make it the page-wide default cursor.

For `modern-saas`:

- Prefer premium product-story composition over starter-kit SaaS defaults.
- Default landing layout should include split hero, trust rail, proof expansion, and premium CTA/pricing close.
- Drive atmosphere from a continuous page-level gradient field with restrained warm lift, not obvious alternating section bands.

For `pastel-dreamscape`:

- Prefer dreamy collage and scrapbook composition over wellness-app simplification.
- Default landing layout should follow the canonical editorial sequence: split serif hero + decorative divider + philosophy trio + numbered service editorials + four-step process + testimonial trio + centered CTA close.
- Use serif display with clean sans body by default; do not default to rounded bubble type.

For `sunset-gradient`:

- Prefer cinematic warm enterprise poster rhythm over generic rounded startup composition.
- Default landing layout should follow the canonical sequence: fixed glass nav + split hero with glowing dashboard orb + quiet logo row + three-pillar solutions grid + stats band + split platform rings/features section + testimonial trio + centered CTA close + structured footer.
- Default typography should be serif display plus clean sans body; do not let Sunset drift into mono-heavy system type or modern-saas product-marketing hierarchy.
- Do not introduce pricing tables, generic feature-card stacks, or modern-saas proof/pricing cadence unless the user explicitly asks for them.

## Profile Rules

- Keep exactly one active profile.
- Apply at most one modifier from [references/31-style-modifiers.md](references/31-style-modifiers.md).
- Resolve the Expressive Effects Layer as a separate axis (`tier + effects`) using [design/motion/motion.rules.md](design/motion/motion.rules.md).
- Resolve icon system via [references/33-icon-systems.md](references/33-icon-systems.md) when icons are in scope.
- If profile conflicts with readability requirements, reduce visual intensity before profile substitution.
- `keep-existing` is valid only when keep-existing viability gate passes in [references/21-existing-ui-triage.md](references/21-existing-ui-triage.md).
- If intervention mode is `partial-restyle` or `full-takeover`, require concrete profile id (not `keep-existing`).

## Cross-Stack Application

- Vanilla:
  - use runtime CSS profile switching and profile metadata from `themes/shared/theme-registry.json`
- React and Next.js:
  - treat selected profile as design language, not raw vanilla CSS import
  - translate to stack-native tokens/classes/components
  - preserve profile typography/spacing/radius/shadow/accent behavior
  - apply typography fallback chain `A -> B -> C` (skill-shipped, Google-hosted equivalent, local/system)

## Font Delivery Alignment

When a profile calls for `DM Mono`-style labels or metadata:

- prefer `DM Mono` when it is actually available in the chosen delivery mode
- in this repo's font mode `A`, use shipped `IBM Plex Mono` as the deterministic mono fallback
- preserve the mono-label role even when the exact family changes
- never declare a non-system font family with no valid load path

## Profile Baseline vs Expressive Effects Layer

- Profile defines baseline design language.
- Expressive Effects Layer adds constrained atmospheric/motion accents.
- Expressive Effects Layer never replaces profile identity.
- If the Expressive Effects Layer conflicts with readability, downgrade it before changing profile baseline.
- If light-theme readability fails, correct contrast tokens before layout changes.
- Cursor-driven effects are never page-wide by default; scope them to explicit sections or components only, and keep demo usage to a small number of named regions.

## Intervention Coupling

- `polish-existing` usually pairs with `keep-existing`.
- `partial-restyle` pairs with selected profile on targeted surfaces.
- `full-takeover` pairs with selected profile broadly while preserving behavior contracts.

## Keep-Existing Failure Handling

When keep-existing viability fails:

- ask once for concrete profile + intervention mode
- if unanswered, proceed by surface:
  - landing/brand-forward marketing -> `partial-restyle` + `arctic-mono`
  - dashboard/app/data/product UI -> `partial-restyle` + `corporate-blueprint`
  - if surface type remains unclear, prefer `partial-restyle` + `corporate-blueprint`
- keep `full-takeover` behind explicit confirmation for broad restyles

## Profile References

Load only the selected profile design reference:

- `design/profiles/profile.<id>.md`
