# Layout Patterns

Define structure before visual detail.

## Layout Workflow

1. Define page purpose and primary action.
2. Define section order and content hierarchy.
3. Define container width, grid strategy, and spacing scale.
4. Define one signature visual moment (hero treatment, asymmetric media block, standout metrics band).
5. Implement skeleton markup/components first.
6. Apply style tokens and visual treatment second.

## Canonical Layout Specs

- Landing: `design/layout/landing.layouts.md`
- Dashboard: `design/layout/dashboard.layouts.md`
- App screen: `design/layout/app-screen.layouts.md`

Use these as structure defaults unless user requirements require deviation.

## Common Patterns

### Marketing / Landing

- Hero with single clear CTA
- Trust/social proof strip
- Feature grid
- Metrics or testimonial band
- Final CTA section

### Dashboard

- Header with filters/actions
- KPI row
- Chart and table region
- Activity/feed region
- Empty/error/loading states

Dashboard interaction baseline:

- Table: sortable key columns + lightweight filter/search when row count is non-trivial.
- Chart: responsive container + hover/focus feedback for value inspection.
- Keep clear fallback states for empty data and loading.

### Form-Centric

- Intro + expectations
- Grouped fields with clear labels
- Inline validation guidance
- Sticky or stable submit action

### Studio / Portfolio (when scope fits)

- Hero with positioning statement
- Capability ticker lane (right-to-left seamless loop)
- Portfolio/project carousel with snap scrolling
- Credibility strip (clients/logos/metrics)
- Clear contact CTA

Theme guidance:

- Prefer ticker in `cyberpunk-neon` and `retro-terminal`.
- Prefer carousel in `cyberpunk-neon`, `modern-saas`, `noire-editorial`, `sunset-gradient`.
- Do not default carousel for `retro-terminal` unless explicitly requested.
- Keep these optional for other profiles unless explicitly requested.

Retro-terminal structural guidance:

- Prefer a `terminal-frame` composition over generic marketing blocks.
- Use command-nav + section command echoes as primary IA language.
- Keep hero as ASCII + typed intro + operator CTA block.
- Include a dedicated telemetry/feed section rather than only static KPI cards.

## Responsive Rules

- Ensure no horizontal scroll at 360px.
- Stack columns on small screens.
- Promote to multi-column layout at medium+ widths.
- Provide overflow strategy for tables.
- Keep tables usable on mobile via horizontal scroll container.
- Keep chart controls/legends readable at small widths; simplify labels before removing data access.
- Preserve signature visual moments at mobile scale (simplified, not removed).
