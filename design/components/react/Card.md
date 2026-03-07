# React Card Spec

Implementation target: React/Next.

## Contract

- Card primitive should support: heading, content, footer/actions.
- Accept className/token overrides without breaking defaults.
- Use composition over deep prop matrices.

## Accessibility

- preserve semantic headings inside card groups
- interactive cards must support keyboard/focus behavior

## Reference

- Use [Page.tsx](../../../templates/react/Page.tsx) and existing repo patterns for composition.
