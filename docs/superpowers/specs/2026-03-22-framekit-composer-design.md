# Framekit Composer — Design Spec

**Date:** 2026-03-22
**Status:** Approved (design conversation)

## Problem

Framekit has well-crafted themes (8 profiles, 24 surface demos) and components (22 demos), but no path from "I like this" to "I have a working site." The brief builder outputs a JSON blob and an AI prompt — not useful for the target audience. The project feels like a gallery of templates with no actionable output.

## Target Users

- **Primary:** Non-technical founders who need a quality website but cannot code.
- **Secondary:** Designers and design-aware people who want a visual direction to hand off or refine.

## Desired Outcome

Founders leave Framekit with a **working, deployable website** built from the curated design system. Optionally, they leave with a **hand-off package** (clean files for a developer or AI tool to extend).

## Approach

**Section Catalog + Composer** — decompose the existing theme pages into a library of reusable sections, build a lightweight app that lets founders browse sections, compose pages, edit content, and export self-contained static sites. Add AI generation as a layer on top, constrained by the same catalog.

---

## Architecture

Three layers, cleanly separated:

```
┌─────────────────────────────────────────────────┐
│                  COMPOSER APP                    │
│  (separate lightweight frontend — React/Svelte)  │
│                                                  │
│  Theme browser → Section picker → Canvas →       │
│  Content editor → Live preview → Export           │
└──────────────────────┬──────────────────────────┘
                       │ reads
┌──────────────────────▼──────────────────────────┐
│               SECTION CATALOG                    │
│  (new JSON metadata layer)                       │
│                                                  │
│  section-registry.json — lists every section,    │
│  its content slots, theme support, and pointers  │
│  to the actual HTML/CSS source fragments         │
└──────────────────────┬──────────────────────────┘
                       │ references
┌──────────────────────▼──────────────────────────┐
│               CONTENT LAYER                      │
│  (existing — stays untouched)                    │
│                                                  │
│  themes/*/theme.css                — visual identity (includes token overrides)  │
│  themes/*/index.html               — full-page source       │
│  components/universal/<name>/      — universal interactive blocks  │
│  components/exclusive/<name>/      — theme-specific blocks   │
│  design/tokens/tokens.base.css     — base token defaults     │
│  assets/fonts-bundled/             — fonts                   │
└─────────────────────────────────────────────────┘
```

**Key principle:** The existing vanilla themes and components are the source of truth for design quality. The catalog formalizes them. The composer app consumes them. Neither layer modifies the originals.

**Token architecture:** Base token defaults live in `design/tokens/tokens.base.css`. Each theme overrides these values in its own `themes/<profile>/theme.css` via CSS custom property redeclaration. Some themes that use non-standard naming also require `components/universal/token-bridge.css` to map their tokens to the standard contract (`--bg`, `--surface`, `--text`, `--accent`, etc.). The composer must include the token bridge when assembling previews and exports.

The composer app lives in a new directory (e.g., `app/`) alongside the existing project. It is a separate concern with its own build tooling, but reads from the same repo.

---

## Section Catalog

### Section types (from current inventory, will be re-audited before implementation)

| Section Type | Description | Surface |
|---|---|---|
| `hero` | Opening frame — headline, subhead, CTA, proof element | landing |
| `trust-bar` | Credibility strip — logos, traits, signal keywords | landing |
| `features-grid` | Card grid of capabilities/services | landing |
| `spotlight` | Deeper narrative — text + side panels | landing |
| `process-steps` | Numbered workflow/methodology | landing |
| `metrics-band` | Stats/numbers highlight row | landing |
| `pricing` | Plan cards with billing toggle | landing |
| `testimonials` | Quote cards / social proof | landing |
| `cta-contact` | Closing form or call-to-action | landing |
| `footer` | Copyright, links | landing |
| `surface-hero` | Page title area | dashboard, app-screen |
| `surface-grid` | Card/stat grid | dashboard, app-screen |
| `surface-panel` | Detail panel | dashboard, app-screen |

Not every theme has every section type. The catalog tracks what exists.

**Surface scope:** The existing brief contract (`build-brief.contract.json`) defines five `surface_archetype` values: `landing`, `dashboard`, `app-screen`, `component-demo`, and `mixed-other`. The composer uses only the first three. `component-demo` is the existing component vault — it is a browsing surface, not a composable page type. `mixed-other` is a catch-all for non-standard surfaces that don't map to the section model. Both are intentionally excluded from the composer.

**Important:** New themes and components are planned before catalog implementation begins. The plan must include a fresh audit step that scans all theme pages to build the registry dynamically, not from today's snapshot.

### Data model

```json
{
  "version": "1.0",
  "sections": [
    {
      "id": "hero",
      "name": "Hero",
      "description": "Opening frame with headline, subheadline, call-to-action, and optional proof element",
      "surface": "landing",
      "slots": [
        { "id": "badge", "type": "text", "label": "Eyebrow badge", "optional": true },
        { "id": "headline", "type": "text", "label": "Main headline" },
        { "id": "subhead", "type": "text", "label": "Supporting paragraph" },
        { "id": "cta_primary", "type": "link", "label": "Primary button" },
        { "id": "cta_secondary", "type": "link", "label": "Secondary button", "optional": true },
        { "id": "stats", "type": "stat-list", "label": "Proof stats", "optional": true }
      ],
      "themes": {
        "modern-saas": { "source": "themes/modern-saas/index.html", "lines": "73-188" },
        "cyberpunk-neon": { "source": "themes/cyberpunk-neon/index.html", "lines": "71-187" },
        "arctic-mono": { "source": "themes/arctic-mono/index.html", "lines": "73-168" }
      }
    }
  ]
}
```

The registry carries a `version` field matching the convention used by `surface-coverage.json` and `build-brief.contract.json`. A breaking change is any modification to the `slots` schema shape, the `themes` entry shape, or the removal/rename of a section `id`. The composer should validate the registry version on load and surface a clear error if it encounters an unsupported version.

- **`slots`** — define editable content. Types: `text`, `link`, `image`, `stat-list`, `feature-list`.
- **`themes`** — maps to actual source HTML for each theme variant.
- **`surface`** — scopes sections to landing / dashboard / app-screen.

Registry location: `shared/section-registry.json` (alongside existing `surface-coverage.json`).

---

## Composer App

### Two modes, one canvas

**Compose mode (manual):**
1. Left panel shows available sections for the chosen theme + surface type, with live thumbnails.
2. Founder adds sections to the canvas (ordered vertical list, not free-form).
3. Canvas renders a live preview using the real theme CSS inside an iframe.
4. Clicking a section opens an inline content editor for its slots.
5. Sections can be reordered (drag up/down) or removed.
6. Theme can be switched at any time — sections re-render in the new visual identity.

**AI mode (generate):**
1. Founder picks theme + surface, describes their business in a text box.
2. AI selects sections from the catalog, orders them, fills content slots.
3. Result appears on the same composer canvas — fully editable.
4. Founder tweaks and exports.

Both modes converge on the same canvas. AI mode is a fast way to get a first draft.

### Tech decisions

- **Framework:** React or Svelte (leaning Svelte for bundle size). Final decision will be made and documented in a separate ADR before Phase 1 implementation begins. Key factors: drag-and-drop library ecosystem, iframe communication patterns, and whether dogfooding React benefits the Phase 2 React export target.
- **Preview:** Iframe-based. Real theme CSS applies without leaking into composer UI. The preview iframe supports a viewport toggle (desktop / tablet / mobile) so founders can check responsive behavior before exporting.
- **Phase 1-2:** Fully client-side. No backend. Section catalog is a static JSON file.
- **Phase 3:** Thin serverless backend (Cloudflare Worker or similar) for LLM API calls.

### Responsive behavior

Exported sites inherit the theme's responsive CSS, which already handles breakpoints at 360px, 768px, and 1280px. The composer's iframe preview includes a viewport size toggle so founders can preview mobile, tablet, and desktop layouts before exporting. The composer UI itself is desktop-first (composing a page on a phone is not a target use case).

### Brief contract fields not surfaced in the composer

The existing brief contract defines `styling_system` (css vs. tailwind) and `expressive_intensity` (restrained, balanced, high-drama). These are not exposed in the Phase 1-2 composer:

- **`styling_system`** is implicit in the export target: vanilla export uses CSS, React/Next.js export uses the project's styling convention. This becomes relevant in Phase 2.
- **`expressive_intensity`** could become a composer control in Phase 3+ ("how bold should this look?"), controlling which effects and animations the theme applies. For now the themes ship at their default intensity.

### Scope boundaries (Phase 1-2)

- No user accounts or saved projects. Export is the save mechanism.
- No pixel-level layout editing. Founders pick sections, edit content, reorder.
- No custom CSS editing. Design quality comes from the curated sections.

---

## Export Pipeline

### Output structure

```
my-site/
├── index.html          ← Composed page, clean semantic HTML
├── theme.css           ← Full theme stylesheet
├── tokens.css          ← Base design tokens
├── page.js             ← Only if interactive components used
├── fonts/              ← Bundled woff2 files for the theme
│   └── *.woff2
└── assets/             ← User-uploaded images
    └── *.png / *.jpg
```

### Export rules

- **No framework in the output.** Vanilla HTML/CSS/JS. Opens in any browser.
- **No Framekit branding.** The exported site is the founder's site.
- **Self-contained.** No CDN links, no external dependencies. Works offline, works on any host.
- **Readable code.** Formatted, indented, lightly commented. Not minified.
- **Only what's used.** Tree-shake to what the page needs (start simple — full theme CSS in Phase 1, trim later).

### Export targets by phase

| Phase | Export type |
|---|---|
| Phase 1 | Download zip (vanilla HTML/CSS/JS) |
| Phase 2 | Download zip + optional React/Next.js export |
| Phase 3 | One-click deploy to Vercel/Netlify/Cloudflare Pages |
| Phase 4+ | Hosted on framekit.dev subdomain |

---

## Phasing

### Phase 1 — Section Catalog + Browser + Export

The foundation. Ships value and replaces the brief builder.

- Audit all theme pages (accounting for any new themes/components added by then)
- Extract sections into HTML fragments with slot markers
- Build `section-registry.json`
- Build minimal composer UI: pick theme, pick surface, browse sections, add to canvas, edit content in slots, reorder
- Iframe-based live preview with real theme CSS
- Client-side zip export (full theme CSS, no tree-shaking yet)
- Deploy composer alongside the existing static site (e.g., `/app/` or a subdomain)
- Existing showroom site stays as-is — becomes the marketing/browsing layer that funnels people into the composer

### Phase 2 — Polish + React/Next.js Export

Make the composer feel professional. Add developer-friendly output.

- Component integration — add interactive vault components into sections
- Export tree-shaking — only ship CSS/JS that the page actually uses
- React and Next.js export targets using existing template starters
- Section thumbnails / richer previews
- Undo/redo in the editor
- Image upload and basic asset management

### Phase 3 — AI Generation

Two stages.

- **Stage A:** Catalog-constrained. AI reads section catalog, selects/orders sections, fills content slots from founder's business description. Output renders on the composer canvas for editing. Thin serverless backend for LLM API calls.
- **Stage B:** Creative generation. AI generates novel sections and layouts following the theme's token system and design rules. Design system acts as guardrails, not a fixed menu. Generated sections render in the same preview pipeline.

### Phase 4 — Deploy Integrations

Founders go from composed page to live site without leaving Framekit.

- One-click deploy to Vercel / Netlify / Cloudflare Pages (OAuth flow, push generated files)
- Custom domain support through the deploy target
- Hosted option: `yourcompany.framekit.dev` subdomain

### Phase 5 — Power Editing

Opens up the designer audience.

- Pixel-level layout editing — resize columns, adjust spacing, reposition elements
- Custom CSS editor panel — override or extend the theme
- Token editor — tweak design token values (colors, fonts, radius, spacing) and preview in real time
- Save/load projects (requires user accounts)

---

## Relationship to Existing Project

- The existing static site (homepage, theme vault, component vault) remains the public-facing showroom and marketing layer.
- The composer app is a new surface that the showroom funnels into ("Browse themes here, build your site here").
- The brief builder (`/build/`) is retired once the composer ships. Its coverage logic and contract schema may be repurposed by the composer.
- `shared/surface-coverage.json` and `shared/build-brief.contract.json` remain as data contracts consumed by both the showroom and the composer.
- The `SKILL.md` automation workflow continues to work for developers who want to use the design system programmatically. The composer is the non-technical user's equivalent.
