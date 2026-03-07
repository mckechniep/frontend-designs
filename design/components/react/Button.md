# React Button Spec

Implementation target: React/Next.

## Contract

- Props: `variant`, `size`, `disabled`, `onClick`, `type`.
- Variants: `primary`, `secondary`, `ghost`, `danger`.
- Keep class/token mapping deterministic.

## Accessibility

- visible `focus-visible` state required
- disabled state must map to semantic `disabled`

## Reference

- Use [Component.tsx](../../../templates/react/Component.tsx) as structure baseline when useful.
