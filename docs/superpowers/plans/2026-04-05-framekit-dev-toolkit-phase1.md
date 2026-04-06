# Framekit Dev Toolkit — Phase 1 Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build a Framekit MCP server that exposes design knowledge (themes, tokens, components, layout patterns, universal design rules) and a client presentation mode at `/present/`.

**Architecture:** MCP server lives in `mcp/` as a Node.js + TypeScript project using `@modelcontextprotocol/sdk`. It reads structured JSON data files derived from the existing repo content. Client presentation mode is static HTML/CSS/JS at `present/index.html`, reusing card components from the theme vault.

**Tech Stack:** Node.js 24, TypeScript, `@modelcontextprotocol/sdk`, Vitest for tests. Static HTML/CSS/JS for presentation mode (no framework).

**Spec:** `docs/superpowers/specs/2026-04-05-framekit-dev-toolkit-design.md`

---

## File Structure

### Track A — MCP Server

```
mcp/
├── package.json
├── tsconfig.json
├── vitest.config.ts
├── src/
│   ├── index.ts                    — MCP server entry, registers tools + resources
│   ├── data/
│   │   ├── design-rules.json       — universal studio-grade rules
│   │   └── layout-patterns.json    — canonical layout structures
│   ├── loaders/
│   │   ├── themes.ts               — reads + merges theme data
│   │   ├── components.ts           — reads component directory structure
│   │   ├── rules.ts                — reads design rules JSON
���   │   └── layouts.ts              — reads layout patterns JSON
│   ├── tools/
│   │   ├── list-themes.ts          — browse all themes
│   │   ├── get-theme.ts            — deep dive on one theme
│   │   ├── list-components.ts      — browse components
│   │   ├── get-design-rules.ts     — universal design rules
│   │   └── recommend-theme.ts      — project description → theme match
│   └── resources/
│       ├── profiles.ts             — framekit://profiles
│       ├── tokens.ts               — framekit://tokens/{theme_id}
│       ├── design-rules.ts         — framekit://design-rules
│       └── layouts.ts              — framekit://layouts/{surface}
├── test/
│   ├── loaders/
│   │   ├── themes.test.ts
│   │   ├── components.test.ts
│   │   ├── rules.test.ts
│   │   └── layouts.test.ts
│   └── tools/
│       ├── list-themes.test.ts
│       ├── get-theme.test.ts
│       ├── list-components.test.ts
│       ├── get-design-rules.test.ts
│       └── recommend-theme.test.ts
```

### Track B — Client Presentation Mode

```
present/
├── index.html          — presentation gallery page
├── present.css         — presentation-specific styles
└── present.js          — filter logic + card rendering
```

---

## Track A: MCP Server

### Task 1: Project scaffold and build tooling

**Files:**
- Create: `mcp/package.json`
- Create: `mcp/tsconfig.json`
- Create: `mcp/vitest.config.ts`
- Create: `mcp/src/index.ts`

- [ ] **Step 1: Initialize the mcp directory**

```bash
mkdir -p mcp/src mcp/test
```

- [ ] **Step 2: Create package.json**

Create `mcp/package.json`:

```json
{
  "name": "@framekit/mcp-server",
  "version": "0.1.0",
  "description": "Framekit Design Intelligence MCP Server",
  "type": "module",
  "main": "dist/index.js",
  "scripts": {
    "build": "tsc",
    "dev": "tsx src/index.ts",
    "test": "vitest run",
    "test:watch": "vitest"
  },
  "dependencies": {
    "@modelcontextprotocol/sdk": "^1.12.0"
  },
  "devDependencies": {
    "tsx": "^4.19.0",
    "typescript": "^5.8.0",
    "vitest": "^3.2.0"
  }
}
```

- [ ] **Step 3: Create tsconfig.json**

Create `mcp/tsconfig.json`:

```json
{
  "compilerOptions": {
    "target": "ES2022",
    "module": "Node16",
    "moduleResolution": "Node16",
    "outDir": "dist",
    "rootDir": "src",
    "strict": true,
    "esModuleInterop": true,
    "resolveJsonModule": true,
    "declaration": true,
    "skipLibCheck": true
  },
  "include": ["src/**/*"],
  "exclude": ["node_modules", "dist", "test"]
}
```

- [ ] **Step 4: Create vitest.config.ts**

Create `mcp/vitest.config.ts`:

```typescript
import { defineConfig } from "vitest/config";

export default defineConfig({
  test: {
    root: ".",
    include: ["test/**/*.test.ts"],
  },
});
```

- [ ] **Step 5: Create minimal server entry**

Create `mcp/src/index.ts`:

```typescript
import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";

const server = new McpServer({
  name: "framekit",
  version: "0.1.0",
});

async function main() {
  const transport = new StdioServerTransport();
  await server.connect(transport);
}

main().catch((err) => {
  console.error("Fatal:", err);
  process.exit(1);
});
```

- [ ] **Step 6: Install dependencies**

```bash
cd mcp && npm install
```

- [ ] **Step 7: Verify build**

```bash
cd mcp && npx tsc --noEmit
```

Expected: no errors.

- [ ] **Step 8: Commit**

```bash
git add mcp/package.json mcp/tsconfig.json mcp/vitest.config.ts mcp/src/index.ts mcp/package-lock.json
git commit -m "feat(mcp): scaffold MCP server project with TypeScript + Vitest"
```

---

### Task 2: Theme data loader

**Files:**
- Create: `mcp/src/loaders/themes.ts`
- Create: `mcp/test/loaders/themes.test.ts`

The theme loader merges data from `themes/shared/theme-registry.json` and `shared/surface-coverage.json` into a single enriched structure. It also extracts CSS custom property values from each theme's `theme.css` file.

- [ ] **Step 1: Write the failing test**

Create `mcp/test/loaders/themes.test.ts`:

```typescript
import { describe, it, expect } from "vitest";
import { loadThemes, type Theme } from "../src/loaders/themes.js";
import path from "node:path";

const REPO_ROOT = path.resolve(import.meta.dirname, "../../");

describe("loadThemes", () => {
  it("returns all 8 themes", () => {
    const themes = loadThemes(REPO_ROOT);
    expect(themes).toHaveLength(8);
  });

  it("each theme has required fields", () => {
    const themes = loadThemes(REPO_ROOT);
    for (const theme of themes) {
      expect(theme.id).toBeTruthy();
      expect(theme.name).toBeTruthy();
      expect(theme.description).toBeTruthy();
      expect(theme.defaultTheme).toMatch(/^(dark|light)$/);
      expect(theme.surfaces).toBeDefined();
      expect(Object.keys(theme.surfaces)).toEqual(
        expect.arrayContaining(["landing", "dashboard", "app-screen"])
      );
      expect(theme.tokens).toBeDefined();
      expect(theme.tokens["--bg"]).toBeTruthy();
      expect(theme.tokens["--accent"]).toBeTruthy();
      expect(theme.tokens["--font"]).toBeTruthy();
    }
  });

  it("can look up a specific theme by id", () => {
    const themes = loadThemes(REPO_ROOT);
    const arctic = themes.find((t) => t.id === "arctic-mono");
    expect(arctic).toBeDefined();
    expect(arctic!.name).toBe("Arctic Mono");
  });
});
```

- [ ] **Step 2: Run test to verify it fails**

```bash
cd mcp && npx vitest run test/loaders/themes.test.ts
```

Expected: FAIL — `loadThemes` not found.

- [ ] **Step 3: Write the theme loader**

Create `mcp/src/loaders/themes.ts`:

```typescript
import { readFileSync } from "node:fs";
import path from "node:path";

export interface ThemeSurface {
  designExample: string;
  liveRuntime: string;
}

export interface Theme {
  id: string;
  name: string;
  description: string;
  defaultTheme: "dark" | "light";
  surfaces: Record<string, ThemeSurface>;
  tokens: Record<string, string>;
  moodTags: string[];
}

interface RegistryEntry {
  id: string;
  name: string;
  description: string;
  file: string;
  defaultTheme: "dark" | "light";
}

interface CoverageProfile {
  id: string;
  label: string;
  defaultTheme: string;
  descriptor: string;
  surfaces: Record<string, { designExample: string; liveRuntime: string }>;
}

const MOOD_TAGS: Record<string, string[]> = {
  "modern-saas": ["dark", "premium", "saas", "warm", "product-marketing"],
  "cyberpunk-neon": ["dark", "technical", "bold", "neon", "command-ui"],
  "arctic-mono": ["light", "research", "minimal", "cold", "editorial"],
  "noire-editorial": ["dark", "luxury", "editorial", "noir", "dossier"],
  "corporate-blueprint": ["dark", "enterprise", "technical", "drafting", "consultancy"],
  "retro-terminal": ["dark", "technical", "retro", "terminal", "crt"],
  "pastel-dreamscape": ["light", "playful", "soft", "collage", "editorial"],
  "sunset-gradient": ["dark", "cinematic", "warm", "gradient", "poster"],
};

function extractTokensFromCSS(cssPath: string): Record<string, string> {
  const tokens: Record<string, string> = {};
  let css: string;
  try {
    css = readFileSync(cssPath, "utf-8");
  } catch {
    return tokens;
  }

  const rootMatch = css.match(/:root\s*\{([^}]+)\}/);
  if (!rootMatch) return tokens;

  const block = rootMatch[1];
  const varRegex = /--([\w-]+)\s*:\s*([^;]+);/g;
  let match: RegExpExecArray | null;
  while ((match = varRegex.exec(block)) !== null) {
    tokens[`--${match[1]}`] = match[2].trim();
  }
  return tokens;
}

export function loadThemes(repoRoot: string): Theme[] {
  const registryPath = path.join(repoRoot, "themes/shared/theme-registry.json");
  const coveragePath = path.join(repoRoot, "shared/surface-coverage.json");

  const registry: RegistryEntry[] = JSON.parse(readFileSync(registryPath, "utf-8"));
  const coverage = JSON.parse(readFileSync(coveragePath, "utf-8"));
  const coverageProfiles: CoverageProfile[] = coverage.profiles;

  return registry.map((entry) => {
    const profile = coverageProfiles.find((p) => p.id === entry.id);

    const surfaces: Record<string, ThemeSurface> = {};
    if (profile) {
      for (const [surfaceId, surface] of Object.entries(profile.surfaces)) {
        surfaces[surfaceId] = {
          designExample: surface.designExample,
          liveRuntime: surface.liveRuntime,
        };
      }
    }

    const cssPath = path.join(repoRoot, "themes", entry.id, "theme.css");
    const tokens = extractTokensFromCSS(cssPath);

    return {
      id: entry.id,
      name: entry.name,
      description: entry.description,
      defaultTheme: entry.defaultTheme,
      surfaces,
      tokens,
      moodTags: MOOD_TAGS[entry.id] || [],
    };
  });
}
```

- [ ] **Step 4: Run tests to verify they pass**

```bash
cd mcp && npx vitest run test/loaders/themes.test.ts
```

Expected: 3 tests PASS.

- [ ] **Step 5: Commit**

```bash
git add mcp/src/loaders/themes.ts mcp/test/loaders/themes.test.ts
git commit -m "feat(mcp): add theme data loader with token extraction"
```

---

### Task 3: Component data loader

**Files:**
- Create: `mcp/src/loaders/components.ts`
- Create: `mcp/test/loaders/components.test.ts`

Reads the `components/` directory to build a structured component catalog.

- [ ] **Step 1: Write the failing test**

Create `mcp/test/loaders/components.test.ts`:

```typescript
import { describe, it, expect } from "vitest";
import { loadComponents, type Component } from "../src/loaders/components.js";
import path from "node:path";

const REPO_ROOT = path.resolve(import.meta.dirname, "../../");

describe("loadComponents", () => {
  it("returns universal and exclusive components", () => {
    const components = loadComponents(REPO_ROOT);
    const universal = components.filter((c) => c.type === "universal");
    const exclusive = components.filter((c) => c.type === "exclusive");
    expect(universal.length).toBeGreaterThan(0);
    expect(exclusive.length).toBeGreaterThan(0);
  });

  it("each component has required fields", () => {
    const components = loadComponents(REPO_ROOT);
    for (const comp of components) {
      expect(comp.id).toBeTruthy();
      expect(comp.name).toBeTruthy();
      expect(comp.type).toMatch(/^(universal|exclusive)$/);
      expect(comp.demoPath).toBeTruthy();
    }
  });

  it("exclusive components have a themeId", () => {
    const components = loadComponents(REPO_ROOT);
    const exclusive = components.filter((c) => c.type === "exclusive");
    for (const comp of exclusive) {
      expect(comp.themeId).toBeTruthy();
    }
  });
});
```

- [ ] **Step 2: Run test to verify it fails**

```bash
cd mcp && npx vitest run test/loaders/components.test.ts
```

Expected: FAIL — `loadComponents` not found.

- [ ] **Step 3: Write the component loader**

Create `mcp/src/loaders/components.ts`:

```typescript
import { readdirSync, existsSync } from "node:fs";
import path from "node:path";

export interface Component {
  id: string;
  name: string;
  type: "universal" | "exclusive";
  themeId?: string;
  demoPath: string;
  files: string[];
}

const EXCLUSIVE_THEME_MAP: Record<string, string> = {
  "arctic-cryo-gauge": "arctic-mono",
  "blueprint-annotation": "corporate-blueprint",
  "cyber-data-stream": "cyberpunk-neon",
  "cyber-hud-panel": "cyberpunk-neon",
  "noire-dossier-card": "noire-editorial",
  "pastel-mood-board": "pastel-dreamscape",
  "retro-file-tree": "retro-terminal",
  "retro-matrix-rain": "retro-terminal",
  "saas-comparison-table": "modern-saas",
  "sunset-cinematic-quote": "sunset-gradient",
};

function kebabToTitle(kebab: string): string {
  return kebab
    .split("-")
    .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
    .join(" ");
}

function scanComponentDir(
  dirPath: string,
  type: "universal" | "exclusive"
): Component[] {
  if (!existsSync(dirPath)) return [];

  return readdirSync(dirPath, { withFileTypes: true })
    .filter((entry) => entry.isDirectory())
    .map((entry) => {
      const compDir = path.join(dirPath, entry.name);
      const files = readdirSync(compDir).filter(
        (f) => f.endsWith(".html") || f.endsWith(".css") || f.endsWith(".js")
      );
      const htmlFile = files.find((f) => f.endsWith(".html"));

      return {
        id: entry.name,
        name: kebabToTitle(entry.name),
        type,
        themeId: type === "exclusive" ? EXCLUSIVE_THEME_MAP[entry.name] : undefined,
        demoPath: htmlFile
          ? `/components/${type}/${entry.name}/${htmlFile}`
          : `/components/${type}/${entry.name}/`,
        files,
      };
    });
}

export function loadComponents(repoRoot: string): Component[] {
  const universalDir = path.join(repoRoot, "components/universal");
  const exclusiveDir = path.join(repoRoot, "components/exclusive");

  return [
    ...scanComponentDir(universalDir, "universal"),
    ...scanComponentDir(exclusiveDir, "exclusive"),
  ];
}
```

- [ ] **Step 4: Run tests to verify they pass**

```bash
cd mcp && npx vitest run test/loaders/components.test.ts
```

Expected: 3 tests PASS.

- [ ] **Step 5: Commit**

```bash
git add mcp/src/loaders/components.ts mcp/test/loaders/components.test.ts
git commit -m "feat(mcp): add component data loader"
```

---

### Task 4: Design rules data

**Files:**
- Create: `mcp/src/data/design-rules.json`
- Create: `mcp/src/loaders/rules.ts`
- Create: `mcp/test/loaders/rules.test.ts`

This is the curated universal design rules — the studio-grade essentials.

- [ ] **Step 1: Write the failing test**

Create `mcp/test/loaders/rules.test.ts`:

```typescript
import { describe, it, expect } from "vitest";
import { loadDesignRules, type DesignRule } from "../src/loaders/rules.js";

describe("loadDesignRules", () => {
  it("returns rules across all categories", () => {
    const rules = loadDesignRules();
    const categories = [...new Set(rules.map((r) => r.category))];
    expect(categories).toEqual(
      expect.arrayContaining([
        "typography",
        "spacing",
        "color",
        "layout",
        "motion",
        "accessibility",
      ])
    );
  });

  it("each rule has required fields", () => {
    const rules = loadDesignRules();
    expect(rules.length).toBeGreaterThanOrEqual(20);
    for (const rule of rules) {
      expect(rule.id).toBeTruthy();
      expect(rule.principle).toBeTruthy();
      expect(rule.rationale).toBeTruthy();
      expect(rule.example).toBeTruthy();
      expect(rule.category).toBeTruthy();
    }
  });

  it("can filter by category", () => {
    const rules = loadDesignRules("typography");
    expect(rules.length).toBeGreaterThan(0);
    for (const rule of rules) {
      expect(rule.category).toBe("typography");
    }
  });
});
```

- [ ] **Step 2: Run test to verify it fails**

```bash
cd mcp && npx vitest run test/loaders/rules.test.ts
```

Expected: FAIL — `loadDesignRules` not found.

- [ ] **Step 3: Create design-rules.json**

Create `mcp/src/data/design-rules.json` containing 26 rules across 6 categories. Each rule has `id`, `category`, `principle`, `rationale`, and `example` fields. The full content is:

```json
[
  {
    "id": "type-scale-ratio",
    "category": "typography",
    "principle": "Use a consistent type scale with a defined ratio between sizes.",
    "rationale": "A mathematical scale (e.g., 1.25 major third) creates natural visual hierarchy without arbitrary size decisions. Every size relates to every other size.",
    "example": "Do: 14px, 16px, 20px, 25px, 31px (1.25 ratio). Don't: 14px, 16px, 22px, 28px, 40px (arbitrary jumps)."
  },
  {
    "id": "type-hierarchy-levels",
    "category": "typography",
    "principle": "Limit to 3-4 distinct typographic levels per page or section.",
    "rationale": "More than 4 levels dilute hierarchy. The eye cannot prioritize when everything competes. Studios achieve richness through weight, spacing, and color — not more sizes.",
    "example": "Do: Display (hero), Heading (section), Body, Caption. Don't: H1, H2, H3, H4, H5, Body, Small, Tiny, Label."
  },
  {
    "id": "type-line-length",
    "category": "typography",
    "principle": "Keep body text between 45-75 characters per line.",
    "rationale": "Lines longer than 75 characters cause the eye to lose its place on the return sweep. Lines shorter than 45 feel choppy. This is the most validated rule in typography.",
    "example": "Do: max-width of 65ch on body text containers. Don't: full-width paragraphs spanning 1200px."
  },
  {
    "id": "type-font-pairing",
    "category": "typography",
    "principle": "Pair a distinctive display font with a neutral body font. Maximum two families plus one mono.",
    "rationale": "More than 2-3 families create visual noise. The display font carries personality; the body font stays invisible. Contrast between them creates hierarchy without effort.",
    "example": "Do: Syne (display) + Outfit (body) + IBM Plex Mono (code). Don't: Five different fonts across the page."
  },
  {
    "id": "type-line-height",
    "category": "typography",
    "principle": "Body text needs 1.5-1.7 line-height. Display text needs 1.0-1.2.",
    "rationale": "Small text needs more breathing room for readability. Large display text at 1.5 line-height looks like it's floating apart. Tighten as size increases.",
    "example": "Do: body { line-height: 1.6 } h1 { line-height: 1.05 }. Don't: a single line-height: 1.5 on everything."
  },
  {
    "id": "spacing-base-unit",
    "category": "spacing",
    "principle": "Use an 8px base unit for all spacing and sizing decisions.",
    "rationale": "An 8px grid creates consistent rhythm across every element. Designers and developers share a common language. Sub-pixel rounding issues disappear.",
    "example": "Do: padding: 8px, 16px, 24px, 32px, 48px, 64px. Don't: padding: 10px, 15px, 23px, 37px."
  },
  {
    "id": "spacing-section-rhythm",
    "category": "spacing",
    "principle": "Section gaps should be 2-3x larger than element gaps within sections.",
    "rationale": "Gestalt proximity — elements closer together are perceived as related. If your card gap is 16px and your section gap is also 16px, the page reads as one flat list.",
    "example": "Do: card gap 16px, section gap 48-64px. Don't: uniform 24px gaps everywhere."
  },
  {
    "id": "spacing-generous-padding",
    "category": "spacing",
    "principle": "Cards and panels need generous internal padding — at least 24px, often 32-48px.",
    "rationale": "Cramped padding is the single biggest tell of amateur design. Content touching its container edges looks unintentional. Generous padding signals care and quality.",
    "example": "Do: .card { padding: 32px }. Don't: .card { padding: 12px }."
  },
  {
    "id": "spacing-whitespace-intent",
    "category": "spacing",
    "principle": "Whitespace is not empty — it directs attention. Use asymmetric whitespace to create focal points.",
    "rationale": "Even distribution of space makes everything equal priority. Studios use uneven whitespace to guide the eye: more space above a heading, less below it.",
    "example": "Do: margin-top: 64px before a heading, margin-bottom: 16px after. Don't: equal 32px margins on all sides."
  },
  {
    "id": "color-contrast-minimum",
    "category": "color",
    "principle": "All text must meet WCAG AA contrast: 4.5:1 for body text, 3:1 for large text (18px+ bold or 24px+).",
    "rationale": "This is not optional — it is a legal accessibility requirement in many jurisdictions and ensures readability on cheap monitors and in sunlight.",
    "example": "Do: #e5e2dc on #08080c (13.5:1). Don't: #666 on #333 (2.8:1)."
  },
  {
    "id": "color-dominant-accent",
    "category": "color",
    "principle": "Use a dominant palette with one sharp accent. The 60-30-10 rule: 60% dominant, 30% secondary, 10% accent.",
    "rationale": "Timid, evenly-distributed palettes feel generic. A dominant color establishes mood, a secondary adds depth, and a single accent creates focal points.",
    "example": "Do: 60% near-black bg, 30% dark surface, 10% gold accent. Don't: equal parts blue, green, orange, purple, and gray."
  },
  {
    "id": "color-semantic-consistency",
    "category": "color",
    "principle": "Never use the same color for different semantic meanings. Green = success, red = error — everywhere, always.",
    "rationale": "Users build color associations within the first 30 seconds. Breaking them causes cognitive friction.",
    "example": "Do: consistent --success and --error tokens used everywhere. Don't: green for both 'success' and 'nature category'."
  },
  {
    "id": "color-not-only-signal",
    "category": "color",
    "principle": "Never use color as the only way to convey information.",
    "rationale": "8% of men have some form of color vision deficiency. Always pair color with a second signal: icons, labels, patterns, or position.",
    "example": "Do: red error text + error icon + 'Error:' prefix. Don't: field border turns red with no other indication."
  },
  {
    "id": "layout-visual-hierarchy",
    "category": "layout",
    "principle": "Every page needs one clear focal point. Size, contrast, and position determine what the eye sees first.",
    "rationale": "If everything is important, nothing is. The hero headline should be the largest, highest-contrast element. Studios design the eye's path, not just the content.",
    "example": "Do: hero headline 4rem, section heads 2rem, body 1rem — clear size cascade. Don't: all text between 1rem and 1.5rem."
  },
  {
    "id": "layout-grid-discipline",
    "category": "layout",
    "principle": "Align to a grid, then break it intentionally. Grid-breaking elements need to be obviously intentional.",
    "rationale": "Random misalignment looks broken. A strict grid with one deliberate break looks designed. The grid must exist before you can break it.",
    "example": "Do: 12-column grid with one element spanning outside it for emphasis. Don't: inconsistent margins that look like bugs."
  },
  {
    "id": "layout-content-density",
    "category": "layout",
    "principle": "Match density to purpose. Marketing pages are sparse. Dashboards are dense. Never mix them.",
    "rationale": "A marketing page with dashboard density feels overwhelming. A dashboard with marketing spacing wastes screen real estate.",
    "example": "Do: landing sections with 64-96px vertical gaps, dashboard cards with 12-16px gaps. Don't: a dashboard that scrolls 5 screens."
  },
  {
    "id": "layout-responsive-reflow",
    "category": "layout",
    "principle": "Design three layouts, not one-that-shrinks. Mobile, tablet, and desktop are different compositions.",
    "rationale": "A 3-column grid that just stacks to 1 column is lazy reflow. Mobile often needs different element ordering and touch-optimized spacing.",
    "example": "Do: mobile hero with stacked CTA, desktop hero with side panel. Don't: the same layout at every width with column-count changes."
  },
  {
    "id": "layout-z-index-discipline",
    "category": "layout",
    "principle": "Define a z-index scale with named layers. Never use arbitrary z-index values.",
    "rationale": "z-index: 9999 is a symptom of z-index chaos. A defined scale prevents escalation warfare.",
    "example": "Do: --z-dropdown: 10, --z-sticky: 20, --z-modal: 30. Don't: z-index: 999, z-index: 10000."
  },
  {
    "id": "motion-purpose",
    "category": "motion",
    "principle": "Every animation must serve a purpose: orient, guide, confirm, or delight. If you cannot name the purpose, remove it.",
    "rationale": "Gratuitous animation slows the interface and fatigues users. One well-timed entrance animation creates more delight than 20 bouncing elements.",
    "example": "Do: staggered card reveal on scroll (orients user). Don't: every button wiggling on hover."
  },
  {
    "id": "motion-duration",
    "category": "motion",
    "principle": "UI transitions: 150-300ms. Content reveals: 300-600ms. Never exceed 1s for non-loading animation.",
    "rationale": "Under 150ms feels instant (no animation needed). Over 300ms feels sluggish for UI feedback. Content reveals can be slower.",
    "example": "Do: hover 180ms, dropdown 220ms, section reveal 400ms. Don't: 800ms button hover."
  },
  {
    "id": "motion-easing",
    "category": "motion",
    "principle": "Use ease-out for entrances, ease-in for exits, ease-in-out for state changes. Never use linear for UI motion.",
    "rationale": "Natural motion decelerates into rest (ease-out). Objects leaving accelerate away (ease-in). Linear looks mechanical.",
    "example": "Do: transform 300ms ease-out for slide-in. Don't: transition: all 300ms linear."
  },
  {
    "id": "motion-reduced-motion",
    "category": "motion",
    "principle": "Respect prefers-reduced-motion. Remove non-essential animation, keep essential state changes.",
    "rationale": "Motion sickness and vestibular disorders affect ~35% of adults over 40. Ignoring this preference excludes them.",
    "example": "Do: @media (prefers-reduced-motion: reduce) { * { animation-duration: 0.01ms !important; } }. Keep: focus indicators."
  },
  {
    "id": "a11y-focus-visible",
    "category": "accessibility",
    "principle": "Every interactive element must have a visible focus indicator. Never remove outlines without replacing them.",
    "rationale": "Keyboard users navigate entirely by focus state. Removing outlines for cleanliness makes the site unusable for them.",
    "example": "Do: :focus-visible { outline: 2px solid var(--accent); outline-offset: 2px; }. Don't: *:focus { outline: none; }."
  },
  {
    "id": "a11y-touch-targets",
    "category": "accessibility",
    "principle": "Interactive elements need minimum 44x44px touch targets.",
    "rationale": "Apple and Google both mandate this minimum. Smaller targets cause mis-taps for users with motor impairments.",
    "example": "Do: min-height: 44px on buttons, padding on small links. Don't: 24px icon buttons with no extra hit area."
  },
  {
    "id": "a11y-semantic-html",
    "category": "accessibility",
    "principle": "Use semantic HTML elements. Headings in order. Landmarks for regions. Lists for lists.",
    "rationale": "Screen readers navigate by landmarks and heading levels. A page with div soup is like a book with no chapters.",
    "example": "Do: <nav>, <main>, <section>, <h1> then <h2> then <h3> in order. Don't: <div class='nav'>, <div class='heading'>."
  },
  {
    "id": "a11y-form-labels",
    "category": "accessibility",
    "principle": "Every form input must have a visible label. Placeholder text is not a label.",
    "rationale": "Placeholders disappear when the user starts typing. Screen readers may not announce them. Labels are permanent and accessible.",
    "example": "Do: <label for='email'>Email</label><input id='email'>. Don't: <input placeholder='Email'> with no label."
  }
]
```

- [ ] **Step 4: Write the rules loader**

Create `mcp/src/loaders/rules.ts`:

```typescript
import { readFileSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

export interface DesignRule {
  id: string;
  category: string;
  principle: string;
  rationale: string;
  example: string;
}

let cached: DesignRule[] | null = null;

function loadAll(): DesignRule[] {
  if (cached) return cached;
  const raw = readFileSync(
    path.resolve(path.dirname(fileURLToPath(import.meta.url)), "../data/design-rules.json"),
    "utf-8"
  );
  cached = JSON.parse(raw) as DesignRule[];
  return cached;
}

export function loadDesignRules(category?: string): DesignRule[] {
  const all = loadAll();
  if (!category) return all;
  return all.filter((r) => r.category === category);
}
```

- [ ] **Step 5: Run tests to verify they pass**

```bash
cd mcp && npx vitest run test/loaders/rules.test.ts
```

Expected: 3 tests PASS.

- [ ] **Step 6: Commit**

```bash
git add mcp/src/data/design-rules.json mcp/src/loaders/rules.ts mcp/test/loaders/rules.test.ts
git commit -m "feat(mcp): add universal design rules data and loader"
```

---

### Task 5: Layout patterns data loader

**Files:**
- Create: `mcp/src/data/layout-patterns.json`
- Create: `mcp/src/loaders/layouts.ts`
- Create: `mcp/test/loaders/layouts.test.ts`

- [ ] **Step 1: Write the failing test**

Create `mcp/test/loaders/layouts.test.ts`:

```typescript
import { describe, it, expect } from "vitest";
import { loadLayoutPatterns, type LayoutPattern } from "../src/loaders/layouts.js";

describe("loadLayoutPatterns", () => {
  it("returns patterns for all three surface types", () => {
    const patterns = loadLayoutPatterns();
    const surfaces = [...new Set(patterns.map((p) => p.surface))];
    expect(surfaces).toEqual(
      expect.arrayContaining(["landing", "dashboard", "app-screen"])
    );
  });

  it("each pattern has required fields", () => {
    const patterns = loadLayoutPatterns();
    expect(patterns.length).toBeGreaterThanOrEqual(6);
    for (const pattern of patterns) {
      expect(pattern.id).toBeTruthy();
      expect(pattern.name).toBeTruthy();
      expect(pattern.surface).toBeTruthy();
      expect(pattern.sections).toBeDefined();
      expect(pattern.sections.length).toBeGreaterThan(0);
      expect(pattern.responsive).toBeDefined();
    }
  });

  it("can filter by surface", () => {
    const patterns = loadLayoutPatterns("landing");
    expect(patterns.length).toBeGreaterThan(0);
    for (const p of patterns) {
      expect(p.surface).toBe("landing");
    }
  });
});
```

- [ ] **Step 2: Run test to verify it fails**

```bash
cd mcp && npx vitest run test/loaders/layouts.test.ts
```

Expected: FAIL — `loadLayoutPatterns` not found.

- [ ] **Step 3: Create layout-patterns.json**

Create `mcp/src/data/layout-patterns.json`:

```json
[
  {
    "id": "L1",
    "name": "Product Narrative",
    "surface": "landing",
    "description": "Classic SaaS/product landing with trust and conversion flow.",
    "sections": ["hero", "trust-bar", "features-grid", "metrics-band", "pricing", "cta-contact", "footer"],
    "responsive": {
      "mobile": "Single column, stacked hero, 1-col features",
      "tablet": "2-column features grid, stacked hero",
      "desktop": "2-column hero with side panel, 3-column features grid"
    }
  },
  {
    "id": "L2",
    "name": "Conversion Focused",
    "surface": "landing",
    "description": "Problem/solution narrative optimized for a single conversion goal.",
    "sections": ["hero", "problem-solution", "proof-points", "faq", "cta-contact"],
    "responsive": {
      "mobile": "Single column, hero bullets stacked",
      "tablet": "2-column proof points",
      "desktop": "Full width hero, 2-column problem/solution split"
    }
  },
  {
    "id": "L3",
    "name": "Brand / Studio",
    "surface": "landing",
    "description": "Portfolio/consultancy page with capability showcase and credibility.",
    "sections": ["hero", "capability-ticker", "work-showcase", "credibility-strip", "cta-contact"],
    "responsive": {
      "mobile": "Single column, carousel for work showcase",
      "tablet": "2-column showcase grid",
      "desktop": "Full width hero, masonry or carousel showcase"
    }
  },
  {
    "id": "L4",
    "name": "Cinematic Research Narrative",
    "surface": "landing",
    "description": "Expressive technical profiles — research archive, diagnostic, or editorial narrative.",
    "sections": ["hero-system-state", "research-grid", "signature-showcase", "divisions-list", "publication-archive", "field-briefing"],
    "responsive": {
      "mobile": "Single column, simplified signature module",
      "tablet": "2-column research grid",
      "desktop": "Full cinematic layout with side-by-side signature module"
    }
  },
  {
    "id": "D1",
    "name": "KPI + Trends",
    "surface": "dashboard",
    "description": "Metrics-first dashboard with KPI cards, trend charts, and transaction table.",
    "sections": ["header-row", "kpi-cards", "trend-chart", "transactions-table", "activity-rail"],
    "responsive": {
      "mobile": "KPI cards stack vertical, table scrolls horizontal",
      "tablet": "2-column KPI grid, full-width chart",
      "desktop": "Full KPI row, chart + table side by side, activity rail"
    }
  },
  {
    "id": "D2",
    "name": "Operations Board",
    "surface": "dashboard",
    "description": "Command-center layout with charts, tables, and event stream.",
    "sections": ["header-command-bar", "chart-split", "table-search", "event-stream"],
    "responsive": {
      "mobile": "Stacked panels, collapsed command bar",
      "tablet": "2-column chart split",
      "desktop": "Full operations layout with event stream rail"
    }
  },
  {
    "id": "A1",
    "name": "Settings Screen",
    "surface": "app-screen",
    "description": "Form-driven settings page with grouped sections and danger zone.",
    "sections": ["app-header", "settings-form", "notifications-preferences", "danger-zone"],
    "responsive": {
      "mobile": "Single column, summary panel below form",
      "tablet": "Optional 2-column",
      "desktop": "Stable 2-column: form left, summary right"
    }
  },
  {
    "id": "A2",
    "name": "Workspace Detail",
    "surface": "app-screen",
    "description": "Detail view with primary content panel and metadata side rail.",
    "sections": ["title-breadcrumb", "primary-panel", "side-rail", "inline-feedback"],
    "responsive": {
      "mobile": "Single column, rail below primary",
      "tablet": "Optional 2-column",
      "desktop": "Stable 2-column shell with side rail"
    }
  }
]
```

- [ ] **Step 4: Write the layouts loader**

Create `mcp/src/loaders/layouts.ts`:

```typescript
import { readFileSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

export interface LayoutPattern {
  id: string;
  name: string;
  surface: string;
  description: string;
  sections: string[];
  responsive: Record<string, string>;
}

let cached: LayoutPattern[] | null = null;

function loadAll(): LayoutPattern[] {
  if (cached) return cached;
  const raw = readFileSync(
    path.resolve(path.dirname(fileURLToPath(import.meta.url)), "../data/layout-patterns.json"),
    "utf-8"
  );
  cached = JSON.parse(raw) as LayoutPattern[];
  return cached;
}

export function loadLayoutPatterns(surface?: string): LayoutPattern[] {
  const all = loadAll();
  if (!surface) return all;
  return all.filter((p) => p.surface === surface);
}
```

- [ ] **Step 5: Run tests to verify they pass**

```bash
cd mcp && npx vitest run test/loaders/layouts.test.ts
```

Expected: 3 tests PASS.

- [ ] **Step 6: Commit**

```bash
git add mcp/src/data/layout-patterns.json mcp/src/loaders/layouts.ts mcp/test/loaders/layouts.test.ts
git commit -m "feat(mcp): add layout patterns data and loader"
```

---

### Task 6: MCP tools — list_themes and get_theme

**Files:**
- Create: `mcp/src/tools/list-themes.ts`
- Create: `mcp/src/tools/get-theme.ts`
- Create: `mcp/test/tools/list-themes.test.ts`
- Create: `mcp/test/tools/get-theme.test.ts`
- Modify: `mcp/src/index.ts`

- [ ] **Step 1: Write the failing tests**

Create `mcp/test/tools/list-themes.test.ts`:

```typescript
import { describe, it, expect } from "vitest";
import { handleListThemes } from "../src/tools/list-themes.js";
import path from "node:path";

const REPO_ROOT = path.resolve(import.meta.dirname, "../../");

describe("handleListThemes", () => {
  it("returns a content array with theme summaries", () => {
    const result = handleListThemes(REPO_ROOT);
    expect(result.content).toHaveLength(1);
    expect(result.content[0].type).toBe("text");
    const data = JSON.parse(result.content[0].text);
    expect(data).toHaveLength(8);
    expect(data[0]).toHaveProperty("id");
    expect(data[0]).toHaveProperty("name");
    expect(data[0]).toHaveProperty("moodTags");
    expect(data[0]).toHaveProperty("palette");
    expect(data[0]).not.toHaveProperty("tokens");
  });
});
```

Create `mcp/test/tools/get-theme.test.ts`:

```typescript
import { describe, it, expect } from "vitest";
import { handleGetTheme } from "../src/tools/get-theme.js";
import path from "node:path";

const REPO_ROOT = path.resolve(import.meta.dirname, "../../");

describe("handleGetTheme", () => {
  it("returns full theme data for a valid id", () => {
    const result = handleGetTheme(REPO_ROOT, "arctic-mono");
    expect(result.content).toHaveLength(1);
    const data = JSON.parse(result.content[0].text);
    expect(data.id).toBe("arctic-mono");
    expect(data.tokens).toBeDefined();
    expect(data.surfaces).toBeDefined();
    expect(data.personality).toBeDefined();
  });

  it("returns error for invalid theme id", () => {
    const result = handleGetTheme(REPO_ROOT, "nonexistent");
    expect(result.isError).toBe(true);
  });
});
```

- [ ] **Step 2: Run tests to verify they fail**

```bash
cd mcp && npx vitest run test/tools/
```

Expected: FAIL — modules not found.

- [ ] **Step 3: Write list-themes tool**

Create `mcp/src/tools/list-themes.ts`:

```typescript
import { loadThemes } from "../loaders/themes.js";

export function handleListThemes(repoRoot: string) {
  const themes = loadThemes(repoRoot);
  const summaries = themes.map((t) => ({
    id: t.id,
    name: t.name,
    description: t.description,
    defaultTheme: t.defaultTheme,
    moodTags: t.moodTags,
    palette: {
      bg: t.tokens["--bg"] || "",
      accent: t.tokens["--accent"] || "",
      text: t.tokens["--text"] || "",
    },
  }));

  return {
    content: [{ type: "text" as const, text: JSON.stringify(summaries, null, 2) }],
  };
}
```

- [ ] **Step 4: Write get-theme tool**

Create `mcp/src/tools/get-theme.ts`:

```typescript
import { readFileSync } from "node:fs";
import path from "node:path";
import { loadThemes } from "../loaders/themes.js";

function loadPersonality(repoRoot: string, themeId: string): string {
  const profilePath = path.join(repoRoot, `design/profiles/profile.${themeId}.md`);
  try {
    return readFileSync(profilePath, "utf-8");
  } catch {
    return "";
  }
}

export function handleGetTheme(repoRoot: string, themeId: string) {
  const themes = loadThemes(repoRoot);
  const theme = themes.find((t) => t.id === themeId);

  if (!theme) {
    return {
      isError: true,
      content: [{ type: "text" as const, text: `Theme "${themeId}" not found. Valid IDs: ${themes.map((t) => t.id).join(", ")}` }],
    };
  }

  const personality = loadPersonality(repoRoot, themeId);

  const result = {
    id: theme.id,
    name: theme.name,
    description: theme.description,
    defaultTheme: theme.defaultTheme,
    moodTags: theme.moodTags,
    tokens: theme.tokens,
    surfaces: theme.surfaces,
    personality,
  };

  return {
    content: [{ type: "text" as const, text: JSON.stringify(result, null, 2) }],
  };
}
```

- [ ] **Step 5: Run tests to verify they pass**

```bash
cd mcp && npx vitest run test/tools/
```

Expected: all tests PASS.

- [ ] **Step 6: Register tools in index.ts and add zod dependency**

```bash
cd mcp && npm install zod
```

Replace `mcp/src/index.ts`:

```typescript
import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import path from "node:path";
import { z } from "zod";
import { handleListThemes } from "./tools/list-themes.js";
import { handleGetTheme } from "./tools/get-theme.js";

const REPO_ROOT = path.resolve(import.meta.dirname, "../../");

const server = new McpServer({
  name: "framekit",
  version: "0.1.0",
});

server.tool("list_themes", "List all 8 Framekit themes with mood tags, descriptions, and color palette previews.", {}, () => {
  return handleListThemes(REPO_ROOT);
});

server.tool(
  "get_theme",
  "Get full details for a specific theme: tokens, surfaces, personality rules, and design constraints.",
  { theme_id: z.string().describe("Theme identifier (e.g. 'arctic-mono', 'modern-saas')") },
  ({ theme_id }) => {
    return handleGetTheme(REPO_ROOT, theme_id);
  }
);

async function main() {
  const transport = new StdioServerTransport();
  await server.connect(transport);
}

main().catch((err) => {
  console.error("Fatal:", err);
  process.exit(1);
});
```

- [ ] **Step 7: Verify build**

```bash
cd mcp && npx tsc --noEmit
```

Expected: no errors.

- [ ] **Step 8: Commit**

```bash
git add mcp/src/tools/list-themes.ts mcp/src/tools/get-theme.ts mcp/test/tools/list-themes.test.ts mcp/test/tools/get-theme.test.ts mcp/src/index.ts mcp/package.json mcp/package-lock.json
git commit -m "feat(mcp): add list_themes and get_theme tools"
```

---

### Task 7: MCP tools — list_components, get_design_rules, recommend_theme

**Files:**
- Create: `mcp/src/tools/list-components.ts`
- Create: `mcp/src/tools/get-design-rules.ts`
- Create: `mcp/src/tools/recommend-theme.ts`
- Create: `mcp/test/tools/list-components.test.ts`
- Create: `mcp/test/tools/get-design-rules.test.ts`
- Create: `mcp/test/tools/recommend-theme.test.ts`
- Modify: `mcp/src/index.ts`

- [ ] **Step 1: Write failing tests**

Create `mcp/test/tools/list-components.test.ts`:

```typescript
import { describe, it, expect } from "vitest";
import { handleListComponents } from "../src/tools/list-components.js";
import path from "node:path";

const REPO_ROOT = path.resolve(import.meta.dirname, "../../");

describe("handleListComponents", () => {
  it("returns all components when no filter", () => {
    const result = handleListComponents(REPO_ROOT);
    const data = JSON.parse(result.content[0].text);
    expect(data.length).toBeGreaterThan(10);
  });

  it("filters by theme_id", () => {
    const result = handleListComponents(REPO_ROOT, "cyberpunk-neon");
    const data = JSON.parse(result.content[0].text);
    const exclusive = data.filter((c: any) => c.type === "exclusive");
    for (const comp of exclusive) {
      expect(comp.themeId).toBe("cyberpunk-neon");
    }
  });
});
```

Create `mcp/test/tools/get-design-rules.test.ts`:

```typescript
import { describe, it, expect } from "vitest";
import { handleGetDesignRules } from "../src/tools/get-design-rules.js";

describe("handleGetDesignRules", () => {
  it("returns all rules when no category", () => {
    const result = handleGetDesignRules();
    const data = JSON.parse(result.content[0].text);
    expect(data.length).toBeGreaterThanOrEqual(20);
  });

  it("filters by category", () => {
    const result = handleGetDesignRules("typography");
    const data = JSON.parse(result.content[0].text);
    expect(data.length).toBeGreaterThan(0);
    for (const rule of data) {
      expect(rule.category).toBe("typography");
    }
  });
});
```

Create `mcp/test/tools/recommend-theme.test.ts`:

```typescript
import { describe, it, expect } from "vitest";
import { handleRecommendTheme } from "../src/tools/recommend-theme.js";
import path from "node:path";

const REPO_ROOT = path.resolve(import.meta.dirname, "../../");

describe("handleRecommendTheme", () => {
  it("returns ranked recommendations", () => {
    const result = handleRecommendTheme(REPO_ROOT, "luxury real estate firm");
    const data = JSON.parse(result.content[0].text);
    expect(data.length).toBeGreaterThan(0);
    expect(data[0]).toHaveProperty("themeId");
    expect(data[0]).toHaveProperty("score");
    expect(data[0]).toHaveProperty("reasoning");
  });

  it("ranks dark technical themes higher for hacker description", () => {
    const result = handleRecommendTheme(REPO_ROOT, "hacker security tool");
    const data = JSON.parse(result.content[0].text);
    const topTheme = data[0].themeId;
    expect(["cyberpunk-neon", "retro-terminal"]).toContain(topTheme);
  });
});
```

- [ ] **Step 2: Run tests to verify they fail**

```bash
cd mcp && npx vitest run test/tools/
```

Expected: new tests FAIL.

- [ ] **Step 3: Write list-components tool**

Create `mcp/src/tools/list-components.ts`:

```typescript
import { loadComponents } from "../loaders/components.js";

export function handleListComponents(repoRoot: string, themeId?: string) {
  let components = loadComponents(repoRoot);

  if (themeId) {
    components = components.filter(
      (c) => c.type === "universal" || c.themeId === themeId
    );
  }

  return {
    content: [{ type: "text" as const, text: JSON.stringify(components, null, 2) }],
  };
}
```

- [ ] **Step 4: Write get-design-rules tool**

Create `mcp/src/tools/get-design-rules.ts`:

```typescript
import { loadDesignRules } from "../loaders/rules.js";

export function handleGetDesignRules(category?: string) {
  const rules = loadDesignRules(category);
  return {
    content: [{ type: "text" as const, text: JSON.stringify(rules, null, 2) }],
  };
}
```

- [ ] **Step 5: Write recommend-theme tool**

Create `mcp/src/tools/recommend-theme.ts`:

```typescript
import { loadThemes, type Theme } from "../loaders/themes.js";

interface Recommendation {
  themeId: string;
  themeName: string;
  score: number;
  reasoning: string;
}

const KEYWORD_TAGS: Record<string, string[]> = {
  luxury: ["luxury", "premium", "noir", "editorial"],
  dark: ["dark"],
  light: ["light"],
  minimal: ["minimal", "research", "cold"],
  bold: ["bold", "neon", "technical"],
  corporate: ["enterprise", "consultancy", "drafting"],
  startup: ["saas", "product-marketing", "warm"],
  creative: ["playful", "soft", "collage", "editorial"],
  technical: ["technical", "terminal", "command-ui"],
  warm: ["warm", "cinematic", "gradient", "poster"],
  hacker: ["terminal", "retro", "crt", "neon", "command-ui"],
  security: ["terminal", "retro", "crt", "neon", "command-ui"],
  real_estate: ["luxury", "premium", "noir", "editorial", "enterprise"],
  architecture: ["enterprise", "drafting", "consultancy", "noir"],
  biotech: ["research", "cold", "minimal", "editorial"],
  gaming: ["neon", "bold", "dark", "command-ui"],
  fashion: ["luxury", "editorial", "noir", "premium"],
  food: ["warm", "playful", "soft", "gradient"],
  saas: ["saas", "product-marketing", "premium", "warm"],
  agency: ["playful", "collage", "editorial", "bold"],
};

function scoreTheme(theme: Theme, description: string): { score: number; reasons: string[] } {
  const desc = description.toLowerCase();
  const words = desc.split(/\s+/);
  let score = 0;
  const reasons: string[] = [];

  for (const [keyword, matchTags] of Object.entries(KEYWORD_TAGS)) {
    if (desc.includes(keyword)) {
      const overlap = theme.moodTags.filter((tag) => matchTags.includes(tag));
      if (overlap.length > 0) {
        score += overlap.length * 2;
        reasons.push(`"${keyword}" matches mood: ${overlap.join(", ")}`);
      }
    }
  }

  for (const word of words) {
    if (theme.moodTags.includes(word)) {
      score += 3;
      reasons.push(`direct mood match: "${word}"`);
    }
    if (theme.description.toLowerCase().includes(word) && word.length > 3) {
      score += 1;
      reasons.push(`description match: "${word}"`);
    }
  }

  return { score, reasons };
}

export function handleRecommendTheme(repoRoot: string, description: string) {
  const themes = loadThemes(repoRoot);

  const recommendations: Recommendation[] = themes
    .map((theme) => {
      const { score, reasons } = scoreTheme(theme, description);
      return {
        themeId: theme.id,
        themeName: theme.name,
        score,
        reasoning: reasons.length > 0
          ? reasons.join("; ")
          : "No strong keyword matches — review theme description for fit.",
      };
    })
    .sort((a, b) => b.score - a.score)
    .slice(0, 3);

  return {
    content: [{ type: "text" as const, text: JSON.stringify(recommendations, null, 2) }],
  };
}
```

- [ ] **Step 6: Register all three tools in index.ts**

Add these imports to the top of `mcp/src/index.ts`:

```typescript
import { handleListComponents } from "./tools/list-components.js";
import { handleGetDesignRules } from "./tools/get-design-rules.js";
import { handleRecommendTheme } from "./tools/recommend-theme.js";
```

Add these registrations after the existing `get_theme` tool:

```typescript
server.tool(
  "list_components",
  "List available Framekit components. Optionally filter by theme to see only compatible components.",
  { theme_id: z.string().optional().describe("Optional theme ID to filter compatible components") },
  ({ theme_id }) => {
    return handleListComponents(REPO_ROOT, theme_id);
  }
);

server.tool(
  "get_design_rules",
  "Get universal studio-grade design rules. Optionally filter by category: typography, spacing, color, layout, motion, accessibility.",
  { category: z.string().optional().describe("Optional category filter") },
  ({ category }) => {
    return handleGetDesignRules(category);
  }
);

server.tool(
  "recommend_theme",
  "Given a project description, get ranked theme recommendations with reasoning.",
  { description: z.string().describe("Project or client description (e.g. 'luxury real estate firm')") },
  ({ description }) => {
    return handleRecommendTheme(REPO_ROOT, description);
  }
);
```

- [ ] **Step 7: Run all tests**

```bash
cd mcp && npx vitest run
```

Expected: all tests PASS.

- [ ] **Step 8: Verify build**

```bash
cd mcp && npx tsc --noEmit
```

Expected: no errors.

- [ ] **Step 9: Commit**

```bash
git add mcp/src/tools/list-components.ts mcp/src/tools/get-design-rules.ts mcp/src/tools/recommend-theme.ts mcp/test/tools/list-components.test.ts mcp/test/tools/get-design-rules.test.ts mcp/test/tools/recommend-theme.test.ts mcp/src/index.ts
git commit -m "feat(mcp): add list_components, get_design_rules, and recommend_theme tools"
```

---

### Task 8: MCP resources

**Files:**
- Create: `mcp/src/resources/profiles.ts`
- Create: `mcp/src/resources/tokens.ts`
- Create: `mcp/src/resources/design-rules.ts`
- Create: `mcp/src/resources/layouts.ts`
- Modify: `mcp/src/index.ts`

- [ ] **Step 1: Write profiles resource**

Create `mcp/src/resources/profiles.ts`:

```typescript
import { loadThemes } from "../loaders/themes.js";

export function getProfilesResource(repoRoot: string): string {
  const themes = loadThemes(repoRoot);
  const profiles = themes.map((t) => ({
    id: t.id,
    name: t.name,
    description: t.description,
    defaultTheme: t.defaultTheme,
    moodTags: t.moodTags,
    surfaces: Object.keys(t.surfaces),
  }));
  return JSON.stringify(profiles, null, 2);
}
```

- [ ] **Step 2: Write tokens resource**

Create `mcp/src/resources/tokens.ts`:

```typescript
import { loadThemes } from "../loaders/themes.js";

export function getTokensResource(repoRoot: string, themeId: string): string {
  const themes = loadThemes(repoRoot);
  const theme = themes.find((t) => t.id === themeId);
  if (!theme) return JSON.stringify({ error: `Theme "${themeId}" not found` });
  return JSON.stringify(
    { themeId: theme.id, themeName: theme.name, tokens: theme.tokens },
    null,
    2
  );
}
```

- [ ] **Step 3: Write design-rules resource**

Create `mcp/src/resources/design-rules.ts`:

```typescript
import { loadDesignRules } from "../loaders/rules.js";

export function getDesignRulesResource(): string {
  const rules = loadDesignRules();
  return JSON.stringify(rules, null, 2);
}
```

- [ ] **Step 4: Write layouts resource**

Create `mcp/src/resources/layouts.ts`:

```typescript
import { loadLayoutPatterns } from "../loaders/layouts.js";

export function getLayoutsResource(surface?: string): string {
  const patterns = loadLayoutPatterns(surface);
  return JSON.stringify(patterns, null, 2);
}
```

- [ ] **Step 5: Register resources in index.ts**

Add these imports to `mcp/src/index.ts`:

```typescript
import { loadThemes } from "./loaders/themes.js";
import { getProfilesResource } from "./resources/profiles.js";
import { getTokensResource } from "./resources/tokens.js";
import { getDesignRulesResource } from "./resources/design-rules.js";
import { getLayoutsResource } from "./resources/layouts.js";
```

Add these registrations after the tool registrations:

```typescript
server.resource("profiles", "framekit://profiles", async (uri) => ({
  contents: [{ uri: uri.href, mimeType: "application/json", text: getProfilesResource(REPO_ROOT) }],
}));

server.resource("design-rules", "framekit://design-rules", async (uri) => ({
  contents: [{ uri: uri.href, mimeType: "application/json", text: getDesignRulesResource() }],
}));

server.resource("layouts-landing", "framekit://layouts/landing", async (uri) => ({
  contents: [{ uri: uri.href, mimeType: "application/json", text: getLayoutsResource("landing") }],
}));

server.resource("layouts-dashboard", "framekit://layouts/dashboard", async (uri) => ({
  contents: [{ uri: uri.href, mimeType: "application/json", text: getLayoutsResource("dashboard") }],
}));

server.resource("layouts-app-screen", "framekit://layouts/app-screen", async (uri) => ({
  contents: [{ uri: uri.href, mimeType: "application/json", text: getLayoutsResource("app-screen") }],
}));

server.resourceTemplate(
  "tokens",
  "framekit://tokens/{theme_id}",
  { list: async () => {
    const themes = loadThemes(REPO_ROOT);
    return themes.map((t) => ({
      uri: `framekit://tokens/${t.id}`,
      name: `${t.name} tokens`,
      description: `CSS design tokens for the ${t.name} theme`,
    }));
  }},
  async (uri, { theme_id }) => ({
    contents: [{ uri: uri.href, mimeType: "application/json", text: getTokensResource(REPO_ROOT, theme_id as string) }],
  })
);
```

- [ ] **Step 6: Verify build**

```bash
cd mcp && npx tsc --noEmit
```

Expected: no errors.

- [ ] **Step 7: Run all tests**

```bash
cd mcp && npx vitest run
```

Expected: all tests PASS.

- [ ] **Step 8: Commit**

```bash
git add mcp/src/resources/ mcp/src/index.ts
git commit -m "feat(mcp): add MCP resources for profiles, tokens, design rules, and layouts"
```

---

### Task 9: MCP server integration test and Claude Code config

**Files:**
- Create: `.mcp.json` (project root)
- Modify: `.gitignore`

- [ ] **Step 1: Test the server starts and responds**

```bash
cd mcp && echo '{"jsonrpc":"2.0","id":1,"method":"initialize","params":{"protocolVersion":"2024-11-05","capabilities":{},"clientInfo":{"name":"test","version":"0.1.0"}}}' | npx tsx src/index.ts 2>/dev/null | head -1
```

Expected: JSON response with `"result"` containing server info.

- [ ] **Step 2: Create .mcp.json for Claude Code**

Create `.mcp.json` in the project root:

```json
{
  "mcpServers": {
    "framekit": {
      "command": "npx",
      "args": ["tsx", "mcp/src/index.ts"],
      "cwd": "."
    }
  }
}
```

- [ ] **Step 3: Update .gitignore**

Create or append to `.gitignore`:

```
mcp/node_modules/
mcp/dist/
.superpowers/
```

- [ ] **Step 4: Commit**

```bash
git add .mcp.json .gitignore
git commit -m "feat(mcp): add Claude Code MCP config and gitignore updates"
```

---

## Track B: Client Presentation Mode

### Task 10: Presentation page structure

**Files:**
- Create: `present/index.html`

- [ ] **Step 1: Create the present directory**

```bash
mkdir -p present
```

- [ ] **Step 2: Create the HTML page**

Create `present/index.html`:

```html
<!doctype html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <title>Framekit — Design Directions</title>
    <meta
      name="description"
      content="Explore eight distinct visual directions for your next website. Each theme is a complete design system with landing pages, dashboards, and app screens."
    />
    <link rel="icon" href="../favicon.svg" type="image/svg+xml" />
    <link rel="icon" href="../favicon.ico" sizes="any" />
    <link rel="stylesheet" href="./present.css" />
  </head>

  <body>
    <a class="skip-link" href="#main">Skip to content</a>

    <header class="present-header">
      <nav class="present-nav">
        <span class="present-brand">
          <span class="present-brand__dot" aria-hidden="true"></span>
          <span class="present-brand__text">Framekit</span>
        </span>
        <span class="present-nav__label">Design Direction Preview</span>
      </nav>
    </header>

    <main id="main">
      <section class="present-hero">
        <h1>Choose a visual direction.</h1>
        <p class="present-hero__lead">
          Each theme below is a complete design system — fonts, colors, spacing,
          components, and layout patterns. Click any to see the full landing
          page, dashboard, and app screen.
        </p>
      </section>

      <section class="present-filters" aria-label="Filter themes by mood">
        <div class="present-filter-bar" data-filter-bar>
          <button class="present-filter is-active" data-filter="all">All</button>
          <button class="present-filter" data-filter="dark">Dark</button>
          <button class="present-filter" data-filter="light">Light</button>
          <button class="present-filter" data-filter="luxury">Luxury</button>
          <button class="present-filter" data-filter="technical">Technical</button>
          <button class="present-filter" data-filter="editorial">Editorial</button>
          <button class="present-filter" data-filter="playful">Playful</button>
        </div>
      </section>

      <section class="present-gallery" id="gallery">
        <div class="present-grid" data-theme-grid></div>
      </section>
    </main>

    <footer class="present-footer">
      <p>Each direction is a standalone visual system — built for real projects, not just mockups.</p>
    </footer>

    <script src="./present.js" defer></script>
  </body>
</html>
```

- [ ] **Step 3: Commit**

```bash
git add present/index.html
git commit -m "feat(present): add presentation mode HTML structure"
```

---

### Task 11: Presentation CSS

**Files:**
- Create: `present/present.css`

- [ ] **Step 1: Create the presentation stylesheet**

Create `present/present.css`. Use the `frontend-design` skill to create a polished, client-facing stylesheet. Requirements:

- Dark background consistent with the theme vault aesthetic (`#08080c` or similar)
- Google Fonts: Syne (display) + Outfit (body) + IBM Plex Mono (labels)
- Mobile-first responsive grid: 1 column on mobile, 2 columns at 768px+
- Filter bar with pill-style buttons, `.is-active` state with accent highlight
- Card styles that accommodate the animated canvas previews from the theme vault
- Simplified card info area with 3-color palette swatches and mood tag pills
- `.present-card.is-hidden` uses `display: none` for filter transitions
- Generous whitespace — this is a client presentation
- Styles for: `.present-header`, `.present-nav`, `.present-brand`, `.present-brand__dot`, `.present-brand__text`, `.present-hero`, `.present-hero__lead`, `.present-filter-bar`, `.present-filter`, `.present-grid`, `.present-card`, `.present-card__canvas-link`, `.present-card__canvas`, `.present-card__info`, `.present-card__name`, `.present-card__desc`, `.present-card__palette`, `.present-card__swatch`, `.present-card__tags`, `.present-card__tag`, `.present-card__surfaces`, `.present-card__surface-link`, `.present-footer`, `.skip-link`

- [ ] **Step 2: Verify page renders**

Open `http://localhost:3000/present/` and verify the page loads with styling.

- [ ] **Step 3: Commit**

```bash
git add present/present.css
git commit -m "feat(present): add presentation mode stylesheet"
```

---

### Task 12: Presentation JavaScript — card rendering and filtering

**Files:**
- Create: `present/present.js`

- [ ] **Step 1: Create the presentation script**

Create `present/present.js`:

```javascript
(function () {
  'use strict';

  var THEMES = [
    {
      id: 'modern-saas',
      name: 'Modern SaaS',
      description: 'Premium warm narrative. Dark, confident, conversion-focused.',
      tags: ['dark', 'luxury', 'editorial'],
      palette: ['#e8a94a', '#63d5f0', '#f4efe6'],
      cardClass: 'card--saas',
      surfaces: {
        landing: '../themes/modern-saas/index.html',
        dashboard: '../themes/modern-saas/dashboard/index.html',
        'app-screen': '../themes/modern-saas/app-screen/index.html',
      },
    },
    {
      id: 'cyberpunk-neon',
      name: 'Cyberpunk Neon',
      description: 'Neon-lit operator interface. Command-console energy.',
      tags: ['dark', 'technical', 'bold'],
      palette: ['#00fff0', '#ff2a6d', '#e0e0e0'],
      cardClass: 'card--cyber',
      surfaces: {
        landing: '../themes/cyberpunk-neon/index.html',
        dashboard: '../themes/cyberpunk-neon/dashboard/index.html',
        'app-screen': '../themes/cyberpunk-neon/app-screen/index.html',
      },
    },
    {
      id: 'arctic-mono',
      name: 'Arctic Mono',
      description: 'Frost-tech research archive. Calm, precise, editorial.',
      tags: ['light', 'editorial', 'technical'],
      palette: ['#2563eb', '#7ec8e3', '#1a1a2e'],
      cardClass: 'card--arctic',
      surfaces: {
        landing: '../themes/arctic-mono/index.html',
        dashboard: '../themes/arctic-mono/dashboard/index.html',
        'app-screen': '../themes/arctic-mono/app-screen/index.html',
      },
    },
    {
      id: 'noire-editorial',
      name: 'Noire Editorial',
      description: 'Near-black dossier page. Classified, luxury, editorial.',
      tags: ['dark', 'luxury', 'editorial'],
      palette: ['#c9a84c', '#8b7a3e', '#e0dcd0'],
      cardClass: 'card--noire',
      surfaces: {
        landing: '../themes/noire-editorial/index.html',
        dashboard: '../themes/noire-editorial/dashboard/index.html',
        'app-screen': '../themes/noire-editorial/app-screen/index.html',
      },
    },
    {
      id: 'corporate-blueprint',
      name: 'Corporate Blueprint',
      description: 'Architectural consultancy. Drafting-grid discipline, enterprise.',
      tags: ['dark', 'technical', 'luxury'],
      palette: ['#3ec6e0', '#1a5276', '#e0e0e0'],
      cardClass: 'card--blueprint',
      surfaces: {
        landing: '../themes/corporate-blueprint/index.html',
        dashboard: '../themes/corporate-blueprint/dashboard/index.html',
        'app-screen': '../themes/corporate-blueprint/app-screen/index.html',
      },
    },
    {
      id: 'retro-terminal',
      name: 'Retro Terminal',
      description: 'CRT-green cyber defense console. Boot sequence, terminal-native.',
      tags: ['dark', 'technical', 'bold'],
      palette: ['#33ff33', '#1a3a1a', '#e0e0e0'],
      cardClass: 'card--retro',
      surfaces: {
        landing: '../themes/retro-terminal/index.html',
        dashboard: '../themes/retro-terminal/dashboard/index.html',
        'app-screen': '../themes/retro-terminal/app-screen/index.html',
      },
    },
    {
      id: 'pastel-dreamscape',
      name: 'Pastel Dreamscape',
      description: 'Luminous editorial collage. Floating forms, soft atmosphere.',
      tags: ['light', 'playful', 'editorial'],
      palette: ['#f08db8', '#a8d8ea', '#fce4ec'],
      cardClass: 'card--pastel',
      surfaces: {
        landing: '../themes/pastel-dreamscape/index.html',
        dashboard: '../themes/pastel-dreamscape/dashboard/index.html',
        'app-screen': '../themes/pastel-dreamscape/app-screen/index.html',
      },
    },
    {
      id: 'sunset-gradient',
      name: 'Sunset Gradient',
      description: 'Cinematic warm poster page. Glowing horizon, enterprise showcase.',
      tags: ['dark', 'luxury', 'bold'],
      palette: ['#f48b41', '#e0533a', '#fcd9b6'],
      cardClass: 'card--sunset',
      surfaces: {
        landing: '../themes/sunset-gradient/index.html',
        dashboard: '../themes/sunset-gradient/dashboard/index.html',
        'app-screen': '../themes/sunset-gradient/app-screen/index.html',
      },
    },
  ];

  function renderCard(theme) {
    var paletteSwatches = theme.palette
      .map(function (color) {
        return '<span class="present-card__swatch" style="background:' + color + '"></span>';
      })
      .join('');

    var tags = theme.tags
      .map(function (tag) {
        return '<span class="present-card__tag">' + tag + '</span>';
      })
      .join('');

    var surfaceLinks = Object.entries(theme.surfaces)
      .map(function (entry) {
        var name = entry[0];
        var url = entry[1];
        var label = name === 'app-screen' ? 'App' : name.charAt(0).toUpperCase() + name.slice(1);
        return '<a href="' + url + '" class="present-card__surface-link">' + label + '</a>';
      })
      .join('');

    return (
      '<article class="present-card ' + theme.cardClass + '" data-tags="' + theme.tags.join(' ') + '">' +
        '<a href="' + theme.surfaces.landing + '" class="present-card__canvas-link">' +
          '<div class="present-card__canvas"><span></span><span></span><span></span></div>' +
        '</a>' +
        '<div class="present-card__info">' +
          '<h2 class="present-card__name">' + theme.name + '</h2>' +
          '<p class="present-card__desc">' + theme.description + '</p>' +
          '<div class="present-card__palette">' + paletteSwatches + '</div>' +
          '<div class="present-card__tags">' + tags + '</div>' +
          '<div class="present-card__surfaces">' + surfaceLinks + '</div>' +
        '</div>' +
      '</article>'
    );
  }

  function initGrid() {
    var grid = document.querySelector('[data-theme-grid]');
    if (!grid) return;
    grid.innerHTML = THEMES.map(renderCard).join('');
  }

  function initFilters() {
    var bar = document.querySelector('[data-filter-bar]');
    if (!bar) return;

    bar.addEventListener('click', function (e) {
      var btn = e.target.closest('.present-filter');
      if (!btn) return;

      bar.querySelectorAll('.present-filter').forEach(function (b) {
        b.classList.remove('is-active');
      });
      btn.classList.add('is-active');

      var filter = btn.dataset.filter;
      var cards = document.querySelectorAll('.present-card');

      cards.forEach(function (card) {
        var tags = card.dataset.tags || '';
        if (filter === 'all' || tags.indexOf(filter) !== -1) {
          card.classList.remove('is-hidden');
        } else {
          card.classList.add('is-hidden');
        }
      });
    });
  }

  initGrid();
  initFilters();
})();
```

- [ ] **Step 2: Verify filtering works in browser**

Open `http://localhost:3000/present/`, click filter buttons, confirm cards show/hide.

- [ ] **Step 3: Commit**

```bash
git add present/present.js
git commit -m "feat(present): add card rendering and mood filtering"
```

---

### Task 13: Presentation polish — canvas effects from theme vault

**Files:**
- Modify: `present/present.js`
- Modify: `present/present.css`

The theme vault cards at `/themes/index.html` have interactive canvas effects. Port them to the presentation cards.

- [ ] **Step 1: Copy canvas effect CSS from hub.css**

Read `themes/shared/hub.css` and copy the card canvas styles — the color-specific background gradients for each `.card--*` variant, the `.arctic-preview-helix` canvas styles, and the `.blueprint-preview-cursor` styles. Adapt class names to work within `.present-card` context. Append to `present/present.css`.

- [ ] **Step 2: Copy canvas effect JS from hub.js**

Read `themes/shared/hub.js` and copy the `initArcticPreviewHelix()` and `initBlueprintPreviewCursor()` functions. Add them to `present/present.js`. Call them after `initGrid()`.

- [ ] **Step 3: Update renderCard for arctic and blueprint markup**

In the `renderCard` function in `present/present.js`, add the arctic canvas element and blueprint cursor markup when the theme id matches:

For arctic-mono, the canvas div becomes:
```html
<div class="present-card__canvas" data-arctic-preview>
  <span></span><span></span><span></span>
  <canvas class="arctic-preview-helix" aria-hidden="true"></canvas>
</div>
```

For corporate-blueprint, the canvas div becomes:
```html
<div class="present-card__canvas" data-blueprint-preview>
  <span></span><span></span><span></span>
  <div class="blueprint-preview-cursor" aria-hidden="true">
    <span class="blueprint-preview-cursor__ring"></span>
    <span class="blueprint-preview-cursor__h"></span>
    <span class="blueprint-preview-cursor__v"></span>
    <span class="blueprint-preview-cursor__coord">000,000</span>
  </div>
</div>
```

- [ ] **Step 4: Verify effects render**

Open `http://localhost:3000/present/` and confirm arctic helix animation and blueprint cursor work.

- [ ] **Step 5: Commit**

```bash
git add present/present.css present/present.js
git commit -m "feat(present): port interactive canvas effects from theme vault"
```

---

### Task 14: Update homepage nav and README

**Files:**
- Modify: `shared/site-nav.js`
- Modify: `README.md`

- [ ] **Step 1: Add present route to site nav**

In `shared/site-nav.js`, add to the `primaryItems` array:

```javascript
const primaryItems = [
  { id: 'home', label: 'Home', href: '/index.html' },
  { id: 'themes', label: 'Themes', href: '/themes/index.html' },
  { id: 'components', label: 'Components', href: '/components/index.html' },
  { id: 'present', label: 'Present', href: '/present/index.html' },
];
```

- [ ] **Step 2: Update README.md first section**

Replace the opening description in `README.md`:

```markdown
# Framekit

Framekit is a professional web development toolkit — a curated design system
with eight visual directions, reusable components, an MCP server for AI-assisted
site generation, and a client presentation mode.
```

Update the project map to include:

```
+- Public product
|  +- /                homepage
|  +- /themes/         theme vault (developer view)
|  +- /components/     component vault
|  +- /build/          brief builder
|  +- /present/        client presentation mode
|
+- MCP Server
|  +- mcp/             design intelligence MCP server
```

- [ ] **Step 3: Commit**

```bash
git add shared/site-nav.js README.md
git commit -m "feat: add presentation mode to nav and update README for dev toolkit reorientation"
```

---

### Task 15: Final integration verification

- [ ] **Step 1: Run all MCP tests**

```bash
cd mcp && npx vitest run
```

Expected: all tests PASS.

- [ ] **Step 2: Verify MCP server starts**

```bash
cd mcp && echo '{"jsonrpc":"2.0","id":1,"method":"initialize","params":{"protocolVersion":"2024-11-05","capabilities":{},"clientInfo":{"name":"test","version":"0.1.0"}}}' | npx tsx src/index.ts 2>/dev/null | head -1
```

Expected: JSON response with server capabilities.

- [ ] **Step 3: Verify static site serves correctly**

Start a local server and check these URLs:
- `http://localhost:3000/` — homepage loads, nav includes "Present" link
- `http://localhost:3000/themes/` — theme vault loads as before
- `http://localhost:3000/present/` — presentation mode loads with cards, filters, canvas effects
- `http://localhost:3000/components/` — component vault loads as before

- [ ] **Step 4: Commit any final fixes**

- [ ] **Step 5: Tag the milestone**

```bash
git tag v0.1.0-phase1
```
