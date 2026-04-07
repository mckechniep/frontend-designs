# Framekit Dev Toolkit — Implementation Guide

**Spec:** `docs/superpowers/specs/2026-04-05-framekit-dev-toolkit-design.md`
**Plan:** `docs/superpowers/plans/2026-04-05-framekit-dev-toolkit-phase1.md`

---

## Phase 1 — Foundation (COMPLETE)

### Track A: MCP Server (COMPLETE)

All 21 tests passing. Server starts via `.mcp.json` in Claude Code.

| Item | Status | Files |
|------|--------|-------|
| Project scaffold | Done | `mcp/package.json`, `tsconfig.json`, `vitest.config.ts`, `src/index.ts` |
| Theme data loader | Done | `mcp/src/loaders/themes.ts` + test |
| Component data loader | Done | `mcp/src/loaders/components.ts` + test |
| Design rules (26 rules, 6 categories) | Done | `mcp/src/data/design-rules.json`, `mcp/src/loaders/rules.ts` + test |
| Layout patterns (8 patterns, 3 surfaces) | Done | `mcp/src/data/layout-patterns.json`, `mcp/src/loaders/layouts.ts` + test |
| Tool: `list_themes` | Done | `mcp/src/tools/list-themes.ts` + test |
| Tool: `get_theme` | Done | `mcp/src/tools/get-theme.ts` + test |
| Tool: `list_components` | Done | `mcp/src/tools/list-components.ts` + test |
| Tool: `get_design_rules` | Done | `mcp/src/tools/get-design-rules.ts` + test |
| Tool: `recommend_theme` | Done | `mcp/src/tools/recommend-theme.ts` + test |
| Resources (profiles, tokens, design-rules, layouts) | Done | `mcp/src/resources/*.ts` |
| Claude Code config | Done | `.mcp.json` |

### Track B: Client Presentation Mode (COMPLETE)

| Item | Status | Files |
|------|--------|-------|
| `/present/` HTML | Done | `present/index.html` |
| Presentation CSS | Done | `present/present.css` |
| Card rendering + mood filtering | Done | `present/present.js` |
| Canvas effects (arctic helix, blueprint cursor) | Done | Ported from hub.js/hub.css |
| Site nav updated | Done | `shared/site-nav.js` — "Present" link added |
| README reoriented | Done | Developer toolkit language |

### New Themes Built (not in original plan — added during session)

| Theme | Type | Surfaces | Key Identity |
|-------|------|----------|--------------|
| Clean Professional | Business/consulting | Landing + Dashboard + App | Off-white, DM Serif Display, Satoshi, Geist Mono, navy accent, soft rounded |
| Dark Gallery | Photography | Landing + Dashboard + App | Near-black, Playfair Display, Outfit, warm white, zero radius, film grain |
| Brutalist Portfolio | Photography | Landing + Dashboard + App | Stark B&W, Space Grotesk + Space Mono, 2px borders, no animations, grayscale |
| Magazine Editorial | Photography | Landing + Dashboard + App | Off-cream, Instrument Serif, General Sans, deep red, paper texture, warm tones |
| White Cube | Photography | Landing + Dashboard + App | Pure white, Cormorant Garamond, Satoshi, charcoal, extreme whitespace, fade-only |

**Total themes in repo: 13** (8 original + 5 new)

### Infrastructure Fixes Applied

- `surface-showcase.css` now reads theme tokens via `var()` fallbacks — new themes don't need per-profile override blocks
- Light-theme overrides for surfaces (proper bg, toned-down atmospheric effects, clean shadows)
- Compact `app-header` and `dash-header` patterns for light themes (replaces oversized cinematic heroes)
- Button text contrast fix (accent bg → page bg text color)

---

## Phase 2 — Generation (NOT STARTED)

### What needs to happen

1. **Section catalog** — decompose the 13 theme landing pages into reusable sections with content slots
   - Create `shared/section-registry.json`
   - Map each section type (hero, features-grid, pricing, testimonials, cta-contact, portfolio-grid, about, projects, etc.) to source HTML per theme
   - Define content slots per section type

2. **New MCP tools**
   - `generate_section(theme_id, section_type, content?)` → production HTML/CSS
   - `generate_page(theme_id, surface, description)` → assembled page from sections

3. **Export pipeline** — self-contained site packages (HTML/CSS/JS/fonts, no deps)

4. **Design rules expansion** — fill gaps found during Phase 1 usage

### Dependencies

- Section catalog needs a fresh audit of all 13 theme pages to map sections
- Generation tools need the section catalog
- Export pipeline needs generation tools

---

## Phase 3 — Full Toolkit (NOT STARTED)

1. `generate_site` tool — multi-page scaffolding
2. Lightweight web UI on top of MCP
3. Enhanced presentation mode — preview generated sites
4. Package for distribution (other devs install the MCP server)

---

## What to pick up next

### Immediate priorities (in order)

1. **Update MCP server data** for the 5 new themes
   - Add new themes to `themes/shared/theme-registry.json`
   - Add new themes to `shared/surface-coverage.json`
   - Add mood tags to `mcp/src/loaders/themes.ts` MOOD_TAGS map
   - Add exclusive component mappings if any new exclusive components exist
   - Run MCP tests to verify

2. **Update presentation mode** for 5 new themes
   - Add new theme cards to `present/present.js` THEMES array
   - Verify filter tags work for new themes

3. **Update theme vault** (`/themes/index.html`)
   - Add cards for the 5 new themes in the gallery grid
   - Update surface directory data

4. **Add profile docs** for new themes
   - Create `design/profiles/profile.clean-professional.md`
   - Create `design/profiles/profile.dark-gallery.md`
   - Create `design/profiles/profile.brutalist-portfolio.md`
   - Create `design/profiles/profile.magazine-editorial.md`
   - Create `design/profiles/profile.white-cube.md`

5. **New themes discussed but not built yet**
   - Organic / Earth — wellness, restaurants, eco brands
   - (Others from the original brainstorm: Neo-Deco, Japanese Minimal, Maximalist)

6. **Components gap** — missing universals that block real site building
   - Modal/dialog
   - Form fields (themed inputs, textareas, selects, checkboxes, toggles)
   - Accordion/FAQ
   - Tabs
   - Mobile navigation (hamburger)
   - Pricing table (universalized from SaaS-exclusive)
   - Testimonial cards (universalized from sunset-exclusive)

7. **Begin Phase 2** — section catalog + generation tools

### Where we literally left off

Last commit: `ae65334 feat: add White Cube photography theme — all 3 surfaces`

We had just finished building all 4 photography themes (Dark Gallery, Brutalist Portfolio, Magazine Editorial, White Cube) and the Clean Professional business theme. The MCP server and presentation mode are functional but don't yet know about the 5 new themes — registry updates are the first thing to do.
