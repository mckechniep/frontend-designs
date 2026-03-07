# shadcn/ui Rules

Use this file only after Scope Lock resolves stack/layers.

## Layer Resolution

`shadcn-ui` supports: `keep-existing | yes | no`.

Preconditions:

- stack must be React or Next.js
- Tailwind must be enabled

Resolution rules:

- `keep-existing`:
  - honor only when existing shadcn primitives are detected (`components/ui/*` or `components.json`)
  - if not detected, resolve to `no`
- `yes`:
  - requires Tailwind enabled
  - if Tailwind is `no`, ask once to enable Tailwind; if unresolved, resolve shadcn-ui to `no`
- `no`:
  - do not introduce shadcn primitives

Default when unspecified:

- keep existing shadcn only when detected; otherwise `no`

## Usage

- Prefer existing primitives from `components/ui/*`.
- Compose primitives instead of recreating equivalents.
- Keep variants/sizing consistent with existing usage.

## Boundaries

- Do not scaffold shadcn installation unless requested.
- Do not mix ad-hoc custom patterns when an existing primitive fits.
