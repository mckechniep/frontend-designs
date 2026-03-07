# Tailwind Rules

Use this file only after Scope Lock resolves stack/layers.

## Layer Resolution

`tailwind` supports: `keep-existing | yes | no`.

- `keep-existing`:
  - honor only when Tailwind is already detected
  - if not detected, resolve to `no`
- `yes`:
  - use Tailwind utilities in React/Next output
  - do not scaffold Tailwind setup unless explicitly requested
- `no`:
  - do not introduce Tailwind classes/config

Default when unspecified:

- keep existing Tailwind only when detected; otherwise `no`

## Usage

- Prefer utility-first composition for spacing/layout/typography.
- Keep class lists readable and grouped by concern.
- Avoid large custom CSS blocks for patterns Tailwind already supports.

## Consistency

- Reuse spacing and color scales consistently.
- Extract small components for repeated utility patterns.
- Keep responsive behavior explicit with breakpoint utilities.

## Boundaries

- Do not generate Tailwind setup files unless requested.
- Do not mix conflicting styling paradigms in the same component.
