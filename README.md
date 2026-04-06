# Framekit

Framekit is a professional web development toolkit — a curated design system
with eight visual directions, reusable components, an MCP server for AI-assisted
site generation, and a client presentation mode.

## Public Routes

- `/` - homepage
- `/themes/` - theme vault (developer view) with eight visual systems
- `/components/` - component vault with live demos
- `/build/` - brief builder
- `/present/` - client presentation mode for showing themes to clients

## MCP Server

The `mcp/` directory contains a design intelligence MCP server that exposes
Framekit's themes, tokens, components, layout patterns, and universal design
rules to AI models. Connect it in Claude Code, Cursor, or any MCP-compatible tool.

## What Users Do Here

1. Show clients the presentation mode to pick a visual direction.
2. Use the MCP server with AI to generate sites constrained by Framekit's design system.
3. Browse the theme vault and component vault for reference.

## Project Map

```text
Framekit
|
+- Public product
|  +- /                homepage
|  +- /themes/         theme vault (developer view)
|  +- /components/     component vault
|  +- /build/          brief builder
|  +- /present/        client presentation mode
|
+- MCP Server
|  +- mcp/             design intelligence MCP server
|
+- Shared product data
|  +- shared/surface-coverage.json
|  +- shared/build-brief.contract.json
|  +- shared/site-paths.js
|
+- Shipped runtime content
|  +- themes/          live profile families and surfaces
|  +- components/      live component demos
|
+- Support material
|  +- templates/       source anchors and starters
|  +- design/          design examples, profiles, tokens
|  +- references/      launch and process docs
|  +- SKILL.md         optional automation workflow
```

## Mental Model

- `index.html`, `themes/`, `components/`, and `build/` are the actual product.
- `shared/` is the contract and routing layer that keeps the public site honest.
- `themes/` and `components/` are the shipped proof.
- `templates/` and `design/` support building from Framekit, but they are not the primary product surface.
- `SKILL.md` is optional automation for using the repo material, not the definition of Framekit.

## What This Repo Ships Today

- 8 profile families
- 24 live vanilla runtime surfaces across landing, dashboard, and app-screen
- 22 component demos across universal and theme-exclusive sets
- a shared coverage registry and build-brief contract
- a small set of React and Next.js source anchors

## What This Repo Is Not

- not a hosted generation platform
- not an auth/product workspace app
- not a jobs/previews/history service

If you build those later, keep them in a separate app or service and treat this
repo as the canonical content layer.

## Key Directories

- [index.html](index.html) - homepage
- [themes/](themes/) - public theme vault and live runtimes
- [components/](components/) - component vault and demos
- [build/](build/) - brief builder
- [shared/surface-coverage.json](shared/surface-coverage.json) - public coverage registry
- [shared/build-brief.contract.json](shared/build-brief.contract.json) - brief schema
- [shared/site-paths.js](shared/site-paths.js) - base-path resolver for root and GitHub Pages project deploys
- [templates/](templates/) - source anchors and starters
- [design/](design/) - design examples, profile definitions, tokens
- [references/](references/) - launch and process docs
- [SKILL.md](SKILL.md) - optional Codex automation layer

## Deploy

Deploy this repo as a static site.

- Preferred: Cloudflare Pages
- Fallback: GitHub Pages only if you handle subpath-safe routing and asset links

See [references/92-launch-playbook.md](references/92-launch-playbook.md).
