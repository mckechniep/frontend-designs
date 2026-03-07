# Vanilla FormField Spec

Implementation target: Vanilla HTML/CSS/JS.

## Contract

- Every input/select/textarea must have an associated `<label>`.
- Support helper text and error text.
- Required states: `default`, `focus`, `error`, `disabled`.

## Accessibility

- label association via `for` + `id`
- error message linked by `aria-describedby` when present
- keyboard-only users can traverse all controls

## Token Usage

- `--surface`, `--border`, `--text`, `--muted`, `--error`, `--radius`
