# Vanilla Card Spec

Implementation target: Vanilla HTML/CSS/JS.

## Contract

- Card types: `content`, `metric`, `panel`, `interactive`.
- Default structure: heading + body + optional footer/actions.
- Interactive card must be keyboard-focusable when clickable.

## Accessibility

- maintain heading hierarchy inside card groups
- interactive cards need visible focus-visible treatment
- avoid dense low-contrast overlays on text

## Token Usage

- `--surface`, `--surface-2`, `--border`, `--shadow`, `--radius`
- optional Expressive Effects Layer effects must follow `design/motion/motion.rules.md`
