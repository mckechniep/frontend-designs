# Build Brief Contract

Canonical machine-readable brief for the public showcase, future `/build/` flow, templates, and any later hosted generator.

Machine-readable source:

- `shared/build-brief.contract.json`

## Required Fields

- `profile_id`
- `surface_archetype`
- `output_target`
- `styling_system`
- `theme_mode`
- `expressive_intensity`
- `component_scope`

## Rules

- Keep field names identical across:
  - `shared/build-brief.contract.json`
  - `SKILL.md` scope-lock / `DESIGN_SPEC.scope_lock`
  - future builder UI form state
  - template anchor examples
  - any future API payloads for hosted generation
- Treat `component_scope.mode` as the stable top-level decision and `requested_components` as optional detail.
- If a requested `profile_id x surface_archetype x output_target` combination is not `canonical`, check `shared/surface-coverage.json` before proceeding.
- `preview` means a guided or starter path exists, but there is no dedicated canonical anchor yet.
- `unsupported` means the builder should block or route the user to the nearest supported alternative.

## Defaults

- `surface_archetype=landing`
- `output_target=vanilla`
- `styling_system=css`
- `theme_mode=dark`
- `expressive_intensity=high-drama`
- `component_scope.mode=starter`

## Consumption Guidance

- Public showcase:
  - use the contract to describe the builder fields and keep public claims aligned with real support
- Skill:
  - map `scope_lock` directly onto these fields wherever possible
- Templates:
  - include an example `buildBrief` object that matches this contract
- Future generator:
  - validate incoming user briefs against this contract before selecting templates or canonical references
