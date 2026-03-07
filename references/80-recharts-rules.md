# Recharts Rules

Use this file only after Scope Lock resolves stack/layers.

## Layer Resolution

`recharts` supports: `keep-existing | yes | no`.

Preconditions:

- stack must be React or Next.js
- chart/data-viz scope is present

Resolution rules:

- `keep-existing`:
  - honor only when Recharts is already detected
  - if not detected, resolve to `no`
- `yes`:
  - use Recharts only for chart/data-viz needs
  - if package is missing, ask once to install or use non-Recharts fallback
- `no`:
  - do not introduce Recharts dependencies/components

Default when unspecified:

- if chart/data-viz scope is absent, default to `no`
- if scope is present and unresolved, keep existing only when detected; otherwise `no`

## Usage

- Wrap charts with `ResponsiveContainer`.
- Align chart type with data semantics.
- Keep color usage restrained and accessible.
- Provide basic interaction affordances by default on non-static charts:
  - tooltip for value inspection
  - hover/active state on primary marks
  - legend when multiple series are present
- Use domain-appropriate axis/value formatting.
- Keep chart cards responsive with stable min heights.

## States

- Provide empty, loading, and error states where data can vary.
- Keep fallback content informative and compact.

## Composition

- Prefer small chart wrapper components when repeated patterns exist.
- Keep chart config simple and maintainable.
- Reuse shared wrappers (for example `templates/ui/ChartCard.tsx`) when useful.

## Interactivity Scope

- If user asks for static charts, disable hover/tooltips and ship static presentation.
- Otherwise default to lightweight interactivity only.
- Keep nearby textual labels/summaries for non-hover users.

## Boundaries

- Do not use Recharts in Vanilla output.
- Do not build heavy chart abstraction layers unless requested.
- Do not enable noisy animation by default on dense dashboards.
