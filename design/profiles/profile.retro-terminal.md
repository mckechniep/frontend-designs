# Skill: Retro Terminal CRT Security Console Template

## Design Philosophy
High-end retro-futurist security terminal aesthetic. Deep black phosphor screen, scanline/flicker optics, command-line framing, and explicit operator language.

This profile is not generic "green-on-black". It should feel like a live defense console session with believable telemetry and interaction affordances.

> Font delivery note: These profile font families describe vanilla starter intent. In this repo's starter, fonts are self-hosted under `assets/fonts-bundled/` via `assets/vanilla-starter/styles.fonts.local.css`. For React/Next outputs, treat them as stylistic intent and use fallback chain `A -> B -> C` (skill-shipped bundled fonts, then Google-hosted skill families, then local/system).

## Core Direction

- Boot sequence before content reveal:
  - realistic POST/kernel/service startup lines
  - fade boot screen out, then reveal terminal frame
- CRT atmosphere stack:
  - scanlines
  - subtle flicker
  - vignette darkening
  - phosphor glow bias on text
- Command navigation voice:
  - nav labels rendered as terminal commands (`./welcome.sh`, `cat services.conf`, `whoami`, `netstat --threats`, `ssh contact`)
- Hero signature:
  - large ASCII block logo
  - typed operator lines + blinking cursor behavior
- Live threat feed:
  - randomized IP/domain/threat rows
  - periodic append cadence
- Interaction accents:
  - chromatic aberration glitch on stat hover
  - keyboard navigation (`j`/`k`, arrow up/down, `1-5` jumps)
- Contact behavior:
  - secure-session styled form
  - encrypted transmission simulation on submit
- Geometry contract:
  - hard-edged terminal surfaces (cards/badges/buttons/inputs/chips/toasts are zero-radius by default)

## Section Blueprint (Preferred Composition)

1. Hero
   - command echo + ASCII logo + typed intro lines + dual CTAs
2. Services
   - terminal config/listing feel (if card layout is used, keep command framing)
3. About / Identity
   - operator profile language and trust markers
4. Stats / Telemetry
   - live threat feed + status panels
5. Contact
   - secure channel framing + simulated transmission states

## Required Signature Structure (Non-Negotiable)

When `design_profile=retro-terminal`, first-draft output must include all of the following:

1. A dedicated terminal shell wrapper (`terminal frame`) distinct from plain card sections.
2. Command-style primary nav where labels are shell commands (not plain marketing labels).
3. Hero ASCII block logo with typed lines and blinking cursor behavior.
4. Boot sequence surface that runs before normal content reveal.
5. Live threat feed surface with periodic randomized entries.
6. Keyboard section navigation (`j`/`k`, arrows, `1-5`) with input-focus safety guard.
7. Contact form submit path with multi-step secure transmission feedback.

If any required signature item above is missing, the retro-terminal output is considered incomplete.

## Required Section Topology (Non-Negotiable)

For landing surfaces with `profile_recipe_lock=signature-on`, use this order:

1. boot overlay
2. terminal frame + command nav
3. hero command output
4. services config surface
5. operator profile (`whoami`) surface
6. live telemetry surface
7. secure contact session
8. terminal footer/status line

Do not collapse to a generic marketing header/hero/cards/contact flow.

## Signature Effects Matrix (Target Reference)

### Atmosphere

1. CRT scanline overlay
2. subtle CRT flicker
3. vignette darkening
4. phosphor glow text bias

### Motion + Runtime

5. boot line reveal sequencing
6. typed hero line cadence
7. blinking cursor behavior
8. live threat feed append cadence
9. optional stat counter ramps in telemetry

### Navigation + Interaction

10. command-nav active state
11. keyboard section navigation (`j/k`, arrows, `1-5`)
12. glitch/chromatic accent on stat hover
13. command CTA hover framing

### Contact + Feedback

14. secure-session contact form styling
15. multi-step transmission feedback on submit
16. transmission completion reset behavior

### Composition + Typography

17. ASCII logo hero signature
18. mono-first typography hierarchy
19. terminal metadata blocks and separators
20. terminal footer runtime/status language

## First-Draft Recipe Pack (Default)

Apply this default pack unless the user explicitly asks for a softer output:

- Atmosphere: `crt-scanlines` + `crt-flicker-subtle` + `vignette`
- Hero: `ascii-logo` + `typed-ops-lines` + `blinking-cursor`
- Interaction: `keyboard-section-nav` + `live-threat-feed`
- Contact: `secure-transmission-multi-step-feedback`
- Composition: `terminal-shell` + `command-nav` + `services-config-surface` + `whoami-operator-surface`

This recipe is the baseline for `high-drama` retro-terminal output.

## Spacing Rhythm Contract (Non-Negotiable)

Use an 8pt-derived terminal rhythm with coherent shell-to-section spacing.

### Required scale

- `--s-1: 4px`
- `--s-2: 8px`
- `--s-3: 12px`
- `--s-4: 16px`
- `--s-5: 24px`
- `--s-6: 32px`
- `--s-7: 48px`
- `--s-8: 72px`

### Shell + command spacing

- terminal frame outer padding: `16-24px` desktop, `12-16px` mobile
- command-nav item spacing: `8-16px` horizontal gaps
- command surfaces (`cmd echo`, blocks) vertical spacing: `16-24px`

### Section spacing

- terminal sections vertical padding: `48-72px` desktop
- tablet: `40-56px`
- mobile: `28-40px`
- avoid oversized section spacing when terminal content is dense

### Internal spacing

- config/listing row spacing: `8-14px`
- telemetry/stat panel padding: `16-24px`
- form row spacing: `10-16px`, form block spacing: `20-28px`
- footer/status strip top separation: `16-24px`

### Anti-regression rules

- Do not combine very large outer section spacing with cramped terminal rows.
- Do not compress command-nav and section spacing below readability on mobile.
- Keep shell, sections, and telemetry spacing rhythm consistent across breakpoints.

## Failure Patterns To Avoid

- Do not output generic modern marketing layout with only green colors applied.
- Do not replace command-nav voice with plain text nav labels.
- Do not omit the boot sequence and still claim retro-terminal mode is complete.
- Do not ship static non-updating threat feed in a supposed live-console composition.
- Do not make glitch/CRT effects constant full-page noise; keep them legible and scoped.
- Do not reintroduce rounded pills/cards/buttons in retro-terminal mode.

## Typography

- `--font-display`: `VT323` intent for large terminal display moments
- `--font-mono`: `Share Tech Mono` intent for commands/labels/data
- `--font`: `Fira Code` intent for readable body/code-like copy

Use mono-first treatment across nav labels, metadata, badges, and telemetry values.

## Color System

### Dark Theme (default)
| Token | Value | Usage |
|---|---|---|
| `--bg` | `#0a0a0a` | main CRT black |
| `--surface` | `#111111` | raised terminal surfaces |
| `--surface-2` | `#0d1a0d` | alt terminal blocks |
| `--text` | `#33ff33` | phosphor green text |
| `--muted` | `#1a9e1a` | dim green labels |
| `--accent` | `#66ff66` | bright green active states |
| `--accent-glow` | `rgba(51,255,51,0.4)` | glow and focus |
| `--amber` | `#ffb000` | warning/telemetry headers |
| `--red` | `#ff3333` | critical threat states |

### Light Theme
Keep a "paper terminal" fallback:
- cream/ivory backgrounds
- dark green text
- dramatically reduced scanline/flicker intensity

## Interaction Rules

- Boot screen runs on initial profile activation only (avoid replay spam on every minor change).
- Keyboard shortcuts must not steal input focus while typing in form controls.
- Threat feed cadence should remain readable (roughly 2-4 seconds per append).
- Glitch effects are brief and hover-triggered (never constant full-page jitter).
- Respect `prefers-reduced-motion` by reducing/turning off flicker and typing cadence animations.

## Responsive Rules

- Maintain terminal framing and command hierarchy on mobile.
- Convert horizontal command nav to wrapped or scrollable command chips.
- Keep ASCII hero block readable via horizontal overflow or reduced font scale.
- Ensure threat feed and contact session surfaces remain usable at `360px`.

## Implementation Notes

- Theme toggled via `data-theme` on `<html>`; default dark.
- Profile toggled via `data-profile="retro-terminal"`.
- Boot/CRT overlays should be additive and non-destructive to core semantic layout.
- All runtime wiring remains `data-*` based and keyboard-accessible.
