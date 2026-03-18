# Framekit

Framekit is a static frontend direction vault and brief builder.

It is not a hosted generator app in its current form. The useful product that
already exists in this repo is the public site:

- `/` - homepage that explains the product
- `/themes/` - theme vault with eight visual systems
- `/components/` - component vault with live demos
- `/build/` - brief builder that exports a locked brief and points to shipped sources

## What Users Do Here

1. Browse the theme vault to find a visual direction.
2. Inspect the component vault to see what the direction can actually support.
3. Use the brief builder to export a build brief, prompt draft, and source links.

## Project Map

```text
Framekit
|
+- Public product
|  +- /                homepage
|  +- /themes/         theme vault
|  +- /components/     component vault
|  +- /build/          brief builder
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
