# Accessibility Checklist

Run this pass before returning code.

## Semantics

- Use semantic landmarks (`header`, `main`, `nav`, `section`, `footer`).
- Use native controls before ARIA fallbacks.
- Associate labels with all form inputs.

## Keyboard

- Ensure all interactive controls are keyboard reachable.
- Ensure visible focus states on all focusable elements.
- Ensure dialogs, menus, and tabs have usable keyboard behavior.
- For sortable tables, ensure header controls are keyboard-activatable and `aria-sort` reflects current state.

## Color And Contrast

- Preserve readable contrast for text and controls.
- Enforce minimum contrast targets:
  - normal text >= 4.5:1
  - large text >= 3:1
  - focus indicators and control boundaries >= 3:1
- Do not encode state using color alone.
- Preserve contrast under dark, neon, or glass styling.
- In light mode, ensure body text is dark enough against light surfaces (avoid light-gray on white).
- If theme supports both modes, verify contrast in both `light` and `dark` states.

## Messaging

- Provide accessible error and status text.
- Use polite live regions for async status when needed.

## Data Surfaces

- Provide meaningful table headers and preserve row/column relationships.
- For charts, provide nearby textual context (title, units, and key value summary).
- Do not rely solely on color/hover for chart interpretation.

## Advanced Components

- Ticker/marquee lanes must provide pause interaction and should not carry unique critical meaning.
- Carousels need keyboard-operable next/prev controls and clear focus-visible states.

## Motion

- Keep motion subtle and purposeful.
- Avoid critical meaning delivered only through motion.
- Respect `prefers-reduced-motion: reduce` for all continuous Expressive Effects Layer effects.
- In reduced motion mode, provide static visual alternatives (no hidden meaning).
- On dense/task-critical surfaces, disable continuous Expressive Effects Layer motion.
