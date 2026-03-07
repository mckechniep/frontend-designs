# Vanilla Button Spec

Implementation target: Vanilla HTML/CSS/JS.

## Contract

- Use semantic `<button>` for in-page actions.
- Use `<a>` for navigation with button styling.
- Variants: `primary`, `secondary`, `ghost`, `danger`.
- Required states: `default`, `hover`, `active`, `focus-visible`, `disabled`.

## Accessibility

- visible focus ring required
- disabled buttons must be non-interactive and visually distinct
- button text must meet contrast targets

## Token Usage

- use `--accent`, `--accent-2`, `--text`, `--border`, `--radius`
- avoid hardcoded per-instance colors
