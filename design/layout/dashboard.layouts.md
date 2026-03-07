# Dashboard Layout Patterns

Canonical dashboard layouts for data-heavy surfaces.

## Layout D1 - KPI + Trends

Sections:

1. Header row (title, date range, key actions)
2. KPI card row (3-6 stat cards)
3. Trend chart region
4. Sortable/filterable transactions table
5. Activity or alerts rail

## Layout D2 - Operations Board

Sections:

1. Header + command/filter bar
2. Primary chart + secondary chart split
3. Table region with search and sorting
4. Event stream / exceptions panel

## Interaction Baseline

- tables: sortable key columns + lightweight filter/search
- charts: responsive containers + tooltip/legend/value inspection
- include explicit loading/empty/error states

## Responsive Rules

- 360px: collapse KPI rows; chart and table stack vertically
- 768px: two-column midsize where legible
- 1280px: full dashboard grid with stable panel heights
