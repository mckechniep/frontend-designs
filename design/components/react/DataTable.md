# React DataTable Spec

Implementation target: React/Next.

## Contract

- Support sortable headers on key columns.
- Support lightweight text filter/search when row count is non-trivial.
- Include empty/loading/error states.

## Accessibility

- set `aria-sort` on active sort header
- keep keyboard focus flow through controls and table region
- maintain readable mobile overflow behavior

## Reference

- Reuse [DataTable.tsx](../../../templates/ui/DataTable.tsx) when compatible.
