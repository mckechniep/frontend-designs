# Style Modifiers

Modifiers are optional and must stay subordinate to the selected base profile.

## Supported Modifiers

- `none` (default)
- `minimal`
- `vivid`
- `editorial`
- `technical`

## Selection Rules

- Apply at most one modifier.
- Modifier cannot override profile identity.
- If modifier conflicts with readability/accessibility, degrade or remove modifier first.
- Keep Expressive Effects Layer decisions independent and resolve via [design/motion/motion.rules.md](design/motion/motion.rules.md).

## Conflict Rules

- Prefer base profile intent over modifier intensity.
- For dense data surfaces, prefer restrained modifiers (`none|minimal|technical`).
- In light mode, do not allow modifiers that reduce text contrast.

## Safe Fallback

When modifier conflict remains unresolved, fall back to `none` and continue.
