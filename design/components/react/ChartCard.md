# React ChartCard Spec

Implementation target: React/Next.

## Contract

- Responsive chart container required.
- Include value inspection affordance (tooltip/legend/active point) unless static chart requested.
- Include loading/empty/error placeholders.

## Accessibility

- provide textual value context for non-hover users
- preserve contrast and readable labels at mobile widths

## Reference

- Reuse [ChartCard.tsx](../../../templates/ui/ChartCard.tsx) when compatible.
