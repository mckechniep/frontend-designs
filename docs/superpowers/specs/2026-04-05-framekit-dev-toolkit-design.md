# Framekit Dev Toolkit — Design Spec

**Date:** 2026-04-05
**Status:** Approved (design conversation)
**Supersedes:** 2026-03-22-framekit-composer-design.md (reoriented from founder self-service to professional web dev tool)

## Problem

Framekit has 8 polished theme systems, 22 components, detailed design specs, token maps, and profile docs — but no way to programmatically consume this design intelligence. The brief builder outputs JSON and a prompt, which isn't actionable. The project feels like a gallery with no path to production.

## Target Users

- **Primary:** Web developers (starting with Peter) who build sites for clients and want AI-assisted generation constrained by a curated design system.
- **Secondary:** Any developer using an MCP-compatible tool (Claude Code, Cursor, Windsurf) who wants studio-grade design guidance when building frontends.

## Desired Outcome

Developers can point an AI model at Framekit via MCP and get: theme recommendations, design tokens, layout patterns, component specs, and universal design rules. The AI uses this as its design system brain when generating code. Separately, developers can show clients a polished presentation of available themes to sell a direction before building.

## Approach

**MCP Server + Client Presentation Mode** — build an MCP server that exposes Framekit's design knowledge as structured tools and resources, and a static presentation route for client-facing theme browsing. Both ship in Phase 1. Generation tools follow in Phase 2.

---

## Architecture

Three layers of design intelligence, consumed through MCP:

```
┌─────────────────────────────────────────────────┐
│          Layer 3: Components & Patterns          │
│  Section catalog, component library, layout      │
│  patterns per surface type, compatibility matrix  │
│  "Build me a hero section for arctic-mono"       │
├─────────────────────────────────────────────────┤
│          Layer 2: Theme Profiles & Tokens         │
│  Color palettes, font stacks, spacing tokens,    │
│  shadow systems, personality rules, do's/don'ts   │
│  "Use these colors, fonts, spacing"              │
├─────────────────────────────────────────────────┤
│          Layer 1: Universal Design Rules          │
│  Typography scale, whitespace systems, contrast,  │
│  visual hierarchy, responsive philosophy, motion  │
│  "Maintain 4:1 contrast, use 8px grid"           │
└─────────────────────────────────────────────────┘
```

Every generation request flows through all three layers. Universal rules are baseline guardrails, theme tokens are the visual identity, components are the building blocks.

---

## Phase 1 — Foundation

Two parallel tracks that don't depend on each other.

### Track A: MCP Server (Design Knowledge Layer)

#### Directory structure

```
mcp/
├── package.json
├── tsconfig.json
��── src/
│   ├── index.ts              — MCP server entry point
│   ├── tools/
│   │   ├── list-themes.ts
│   │   ├── get-theme.ts
���   │   ├── list-components.ts
│   │   ├── get-design-rules.ts
│   │   └── recommend-theme.ts
│   ├── resources/
│   │   ��── profiles.ts
│   │   ├── tokens.ts
│   │   ├── layout-patterns.ts
│   │   └── design-rules.ts
│   └── data/                 — structured JSON (built from repo)
│       ├── theme-registry.json
│       ├── component-registry.json
│       ├── design-rules.json
│       ��── layout-patterns.json
```

The `mcp/` directory lives alongside the existing project. It has its own `package.json` and build tooling (Node.js + TypeScript) but reads design data from the parent repo. The repo remains the source of truth — the JSON data files are structured views of it.

#### Tools (Phase 1)

| Tool | Params | Returns |
|------|--------|---------|
| `list_themes` | none | All 8 themes: id, label, mood tags, color palette preview, one-line descriptor |
| `get_theme` | `theme_id: string` | Full profile: tokens (colors, fonts, spacing, shadows), personality rules, do's/don'ts, supported components, available surfaces, live demo URLs |
| `list_components` | `theme_id?: string` | Available components. Optional theme filter for compatibility. Includes type (universal/exclusive), description, slot definitions |
| `get_design_rules` | `category?: string` | Universal design rules. Optional category filter: typography, spacing, color, layout, motion, accessibility. Each rule has principle, rationale, and concrete example |
| `recommend_theme` | `description: string` | Given a project description ("luxury real estate firm"), returns ranked theme recommendations with reasoning |

#### Resources (always available to the AI)

| URI | Description |
|-----|-------------|
| `framekit://profiles` | All theme profiles with personality, mood, audience fit |
| `framekit://tokens/{theme_id}` | Full CSS variable set for a specific theme |
| `framekit://design-rules` | Universal studio-grade design principles |
| `framekit://layouts/{surface}` | Canonical layout patterns for landing / dashboard / app-screen |

#### Universal design rules

Curated essentials — 20-30 rules codified from top studio practices. Not invented, researched. Categories:

- **Typography:** scale ratios, hierarchy rules, line-height/measure, font pairing principles
- **Spacing:** 8px grid system, whitespace density rules, section rhythm
- **Color:** contrast minimums (WCAG AA), palette composition, accent usage
- **Layout:** visual hierarchy, grid discipline, alignment rules, responsive breakpoint philosophy
- **Motion:** interaction principles, timing curves, when to animate vs. when not to
- **Accessibility:** focus states, color-only signaling, touch targets, semantic structure

Each rule structured as: principle → rationale (why) → concrete example (do this / not that).

Start with curated essentials (Phase 1), expand based on gaps found during real usage (Phase 2+).

#### Data sourcing

The structured JSON in `mcp/src/data/` is built from existing repo content:

- **theme-registry.json** — from `design/profiles/profile.*.md`, `themes/shared/theme-registry.json`, and `shared/surface-coverage.json`
- **component-registry.json** — from `components/` directory structure and component demo files
- **design-rules.json** — new content, curated and written during implementation
- **layout-patterns.json** — from `design/layout/*.md`

### Track B: Client Presentation Mode

#### Route: `/present/`

A client-facing theme gallery. Self-contained, no nav back to dev-facing site.

#### Design

- **Reuses existing theme cards** from `/themes/index.html` — including the interactive canvas effects (arctic-mono helix, corporate-blueprint cursor tracker, etc.)
- **Enhanced with:** simplified color swatches (3 key colors per theme), mood/industry tags, client-friendly descriptions (no dev jargon)
- **Filter bar** at top — filter by mood: All, Dark, Light, Luxury, Technical, Editorial, Playful
- **Click-through flow:**
  1. Gallery view — grid of theme cards with interactive previews
  2. Theme overview — color palette, font samples, personality description
  3. Surface picker — thumbnails for landing / dashboard / app-screen
  4. Full demo — links to existing live theme pages (already built)

#### Key decisions

- **Static HTML/CSS/JS** — no framework, consistent with the rest of the repo
- **Reads from existing data** — theme-registry.json + surface-coverage.json
- **No nav back to dev stuff** — `/present/` is its own self-contained experience
- **Deploys with the rest of the site** — just another route, no separate build
- **Mobile-first layout** — 1 column on phone, 2 on tablet/desktop. Designed for showing on a phone in client meetings

#### Relationship to `/themes/`

`/themes/` stays as-is — the developer-facing theme vault with surface directory, component vault links, and the full effects system. `/present/` borrows the same card components (including interactive canvas effects) and wraps them in a client-appropriate shell with filtering and simplified info. Two audiences, shared card design, separate experiences.

---

## Phase 2 — Generation

Adds code generation tools to the MCP server.

### Section catalog

Decompose existing theme pages into reusable sections with content slots. Each section has:
- Section type (hero, features-grid, pricing, testimonials, cta-contact, etc.)
- Content slots (headline, subhead, CTA, stats, etc.) with types
- Theme support map (which themes have this section, with source pointers)
- Surface scope (landing / dashboard / app-screen)

Registry location: `shared/section-registry.json`

### New tools

| Tool | Params | Returns |
|------|--------|---------|
| `generate_section` | `theme_id, section_type, content?` | Production HTML/CSS for one section using real theme tokens |
| `generate_page` | `theme_id, surface, description` | Full page assembled from multiple sections |

### Export pipeline

Output is self-contained:
```
my-site/
├── index.html          — composed page, clean semantic HTML
├── theme.css           — full theme stylesheet
├── tokens.css          — base design tokens
├── page.js             — only if interactive components used
├── fonts/              — bundled woff2 files
└── assets/             — images
```

No framework in output. No Framekit branding. No CDN links. Works offline, works on any host.

### Design rules expansion

Expand universal design rules based on gaps identified during Phase 1 real-world usage. Move from curated essentials toward comprehensive reference.

---

## Phase 3 — Full Toolkit

### Multi-page generation

| Tool | Params | Returns |
|------|--------|---------|
| `generate_site` | `theme_id, pages[], description` | Multi-page site scaffolding with consistent theme, shared nav/footer |

### Web UI layer

Lightweight web app on top of the MCP server for non-CLI users. Visual composer where you pick theme + components, describe the client, and generate a site package. This is the successor to the original Composer concept, but built on the MCP foundation rather than as a standalone app.

### Enhanced presentation mode

Client presentation mode gains ability to preview generated sites — not just browse existing demos.

### Packaging for distribution

MCP server packaged for other developers to install and use in their own workflows.

---

## What stays, what changes

**Stays as-is:**
- All existing theme pages and demos
- Component vault and demos
- Shared data files (surface-coverage.json, etc.)
- `/themes/` developer-facing vault

**Changes:**
- Homepage and README reorient from "founder vault" to "web dev toolkit"
- Brief builder deprioritized (replaced by MCP generation in Phase 2)
- New `/present/` route added for client presentation
- New `mcp/` directory for MCP server

**Deleted:**
- Nothing. Existing work is preserved.
