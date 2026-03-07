# Icon Systems

Use this file when icon style is requested or relevant to visual direction.

## Supported Icon Choices

- `heroicons`
  - React/Next package: `@heroicons/react`
- `tabler`
  - React/Next package: `@tabler/icons-react`
  - raw icon package (non-React): `@tabler/icons`
- `feather`
  - React package: `react-feather`
  - raw icon package (non-React): `feather-icons`
- `material-icons`
  - React package: `@mui/icons-material`
  - Material Icons license: Apache 2.0
- `none`
  - minimal inline SVG only

## Selection Rules

- Prefer one icon family per screen/surface for visual consistency.
- Resolve stack before icon system.
- If user specifies icon system, honor when compatible.
- If user does not specify:
  - keep existing repo icon system only when keep-existing viability passes
  - otherwise default to `heroicons` for React/Next and `none` for Vanilla unless icon-heavy UI is explicit
- If selected icon system is incompatible with resolved stack, ask once for replacement.

## Scope-Lock Option Sets

- Vanilla:
  - `keep-existing`, `tabler-inline-svg`, `feather-inline-svg`, `material-inline-svg`, `none`
- React/Next:
  - `keep-existing`, `heroicons`, `tabler`, `feather`, `material-icons`, `none`

Mapping notes:

- `tabler-inline-svg`, `feather-inline-svg`, and `material-inline-svg` use inline SVG only.

## Recommendation Heuristics

When user has not specified icon preference:

- Vanilla:
  - prefer `none` for minimal/icon-light interfaces
  - prefer `tabler-inline-svg` for dashboard/app UIs with repeated controls
  - prefer `feather-inline-svg` for editorial/minimal surfaces
- React/Next:
  - prefer `heroicons` for general product UI
  - prefer `tabler` for technical/corporate/cyberpunk directions
  - prefer `feather` for minimal/editorial/pastel directions
  - prefer `material-icons` only when user references Material/MUI conventions

## Stack Compatibility

- Vanilla:
  - prefer inline SVG icons unless user requests package setup
- React/Next:
  - prefer package-based icon components when dependency exists

## Dependency Guardrails

- Do not silently add icon dependencies.
- If requested icon package is missing, ask once:
  - install dependency, or
  - use inline SVG fallback for current scope.
- Avoid pulling full MUI dependency chain unless explicitly requested.

## Accessibility and Styling

- decorative icons: `aria-hidden="true"`
- semantic/action icons: include accessible labels
- use `currentColor` for theme/profile consistency
- keep icon size system consistent via shared classes/tokens

## Verification

- ensure icon imports resolve and build passes
- ensure icon family is not unintentionally mixed within a region
