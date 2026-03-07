# Skill A/B Examples

Use this folder to publish side-by-side evidence of output quality:

- `with-skill`: same prompt, explicitly invoke `$kickass-frontend`
- `without-skill`: same prompt, no skill invocation

## Capture Protocol (Keep Constant Across A/B)

- Model/version
- Repo state
- Prompt text (except skill invocation toggle)
- Viewport sizes
- Image format

Recommended viewports:

- Desktop: `1366x768`
- Mobile: `390x844`

## v2 Behavior Check

For `with-skill` runs, confirm first draft follows v2 ordering:

1. `PLAN`
2. `DESIGN_SPEC`
3. implementation output

For `without-skill`, keep normal unconstrained behavior.

## Font Delivery Mode (Hold Constant Across A/B)

Choose one mode per scenario and keep it identical in both runs:

- `A)` skill-shipped fonts (Recommended baseline)
- `B)` skill fonts via Google-hosted web fonts
- `C)` local/system fonts (safety fallback)
- `D)` other custom fonts (user-provided)

For `A`:

- store font files in-repo (for example `public/fonts/` or `assets/fonts/`)
- for this skill's vanilla starter, use `assets/fonts-bundled/` + `assets/vanilla-starter/styles.fonts.local.css`
- record exact file paths and weights in scenario `notes.md`

## Required Files Per Scenario

For each scenario folder under `examples/ab/`, include:

- `prompt.md` (exact prompt used)
- `notes.md` (model/date/constraints)
- `with-skill-desktop.png`
- `with-skill-mobile.png`
- `without-skill-desktop.png`
- `without-skill-mobile.png`

## Scenario Folders

- `examples/ab/landing/`
- `examples/ab/dashboard/`
- `examples/ab/app-screen/`

## Publishing Notes

- Keep prompts short and realistic.
- Keep acceptance criteria identical across A/B.
- Prefer screenshots of final built UI, not intermediate drafts.
