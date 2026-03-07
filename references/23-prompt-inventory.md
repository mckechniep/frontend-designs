# Prompt Inventory

Canonical source for user-facing canned prompts and fixed prompt blocks used by this skill.

Use this file to keep wording consistent and avoid prompt drift.

## Scope-Lock Intake (Verbatim)

Source: `references/10-stack-detection.md`

Use when repo is empty/greenfield and build brief is underspecified.

```text
Scope lock: I can’t infer stack/contracts yet from this repo, so lock these 3 items and I’ll return PLAN + DESIGN_SPEC next.

1) What should I build? (page/app purpose + key sections/components)

2) Tech stack lock (pick one `output_target` + one `styling_system`):
   - `output_target`:
     - `vanilla` (HTML + CSS + JavaScript, static/no-build)
     - `react` (SPA/component app)
     - `nextjs` (App Router/full-stack ready)
   - `styling_system`: `css` (plain CSS) or `tailwind` (utility classes)
   - quick combo aliases accepted: `vanilla`, `react+css`, `react+tailwind`, `nextjs+css`, `nextjs+tailwind`

3) Visual direction lock (pick `design_profile` + `theme_mode`, or describe a vibe and I’ll map it):
   - `design_profile` options: `modern-saas`, `cyberpunk-neon`, `arctic-mono`, `noire-editorial`, `corporate-blueprint`, `retro-terminal`, `pastel-dreamscape`, `sunset-gradient`
   - `theme_mode`: `light`, `dark`, `both-toggle-dark-default`, or `both-toggle-light-default`
   - profile recipe lock: default is `signature-on` (recommended); choose `softened` only if you want a less theatrical first draft
```

## Existing UI Intervention Prompt (Verbatim)

Source: `references/21-existing-ui-triage.md`

Use when intervention mode is not user-specified in mixed/degraded existing UI.

```text
I reviewed the existing UI and it looks [mixed/degraded]. Choose how you want me to proceed: 1) `polish-existing` (keep current style, improve quality), 2) `partial-restyle` (apply a profile to key surfaces), or 3) `full-takeover` (shift to a profile broadly while preserving app behavior).
```

## Keep-Existing Failure Prompt (Verbatim)

Source: `references/21-existing-ui-triage.md`

Use when keep-existing viability gate fails.

```text
I checked the current UI and `keep-existing` is not viable here (insufficient or degraded baseline design system). Choose: 1) `partial-restyle` with a concrete profile, or 2) `full-takeover` with a concrete profile. If you do not choose, I will proceed with `partial-restyle` + `arctic-mono` for landing/brand-forward work, or `partial-restyle` + `corporate-blueprint` for dashboard/app/data/product UI.
```

## Profile Selection Menu (Fixed Options)

Source: `references/30-style-system.md`

Use when style direction is unclear:

- A) `keep-existing`
- B) `modern-saas`
- C) `cyberpunk-neon`
- D) `arctic-mono`
- E) `noire-editorial`
- F) `corporate-blueprint`
- G) `retro-terminal`
- H) `pastel-dreamscape`
- I) `sunset-gradient`

In empty/greenfield context, omit `A) keep-existing`.

## Refinement Entry Prompt (Required 5-Line Block)

Source: `references/22-refinement-loop.md`

Rules:

- Keep this exact 5-line structure.
- Render as separate paragraphs with one blank line between lines.
- Keep `<Back>` line included.

```text
------ REFINEMENTS & SECOND PASS ------

If you want refinements, I can do a focused pass aligned to your <style>/<theme>/<stack> direction.

I can also add components next (for example: <component option 1>, <component option 2>, <component option 3>).

Tell me what you want changed or added and I’ll implement it in the next pass.

If you want to revise your previous refinement answer, type `<Back>` and I’ll re-ask the previous refinement question.
```

## Post-Revision Follow-Up Prompt (Verbatim)

Source: `references/22-refinement-loop.md`

```text
If you want, I can keep going with additions that stay within the current style/theme/stack/layers — e.g. more components, extra pages, chart/table expansions, or logo/favicon/image integration.
```

## Refinement Back-Navigation Tip (Verbatim)

Source: `references/22-refinement-loop.md`

```text
Tip: type <Back> to revisit the previous refinement question.
```

## Dependency Permission Prompt (Template)

Source: `references/22-refinement-loop.md`

Use only when install is actually required by the dependency permission gate.

```text
Can I install dependencies with npm install?
```

## Component Option Source (for Refinement Line 3)

Source: `references/22-refinement-loop.md`

For:

`I can also add components next (for example: ... )`

Use sources in this order:

1. canonical examples in `references/22-refinement-loop.md` (profile + surface + stack)
2. `references/40-layout-patterns.md`
3. `references/20-deliverables-matrix.md`
4. selected profile doc `design/profiles/profile.<id>.md`

Use exactly 3 concrete options.

## Refinement Effects Upgrade Offer (Verbatim)

Source: `references/22-refinement-loop.md`

Use after first draft and after the required 5-line refinement entry block.

```text
If you want visual upgrades next, I can add 1-2 profile-relevant effects (for example in cyberpunk-neon: `scoped cursor-spotlight` + `title-rgb-split`).
```

## Refinement Intensity Downgrade Offer (Verbatim)

Source: `references/22-refinement-loop.md`

```text
If you want, I can also tone the visual intensity down in the next pass (`high-drama` -> `balanced` or `restrained`) while keeping the same profile.
```

## Profile-Specific Upgrade Offers (Verbatim)

Source: `references/22-refinement-loop.md` + profile contracts

```text
If you want visual upgrades next, I can add 1-2 profile-relevant effects:

- `retro-terminal`: `crt-vignette-boost` + `hero-glitch-burst`
- `cyberpunk-neon`: `scoped cursor-spotlight` + `title-rgb-split`
- `arctic-mono`: `hero-sweep` + `panel-sheen`
- `noire-editorial`: `press-ticker` + `redaction-reveal`
```
