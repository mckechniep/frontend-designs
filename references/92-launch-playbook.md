# Launch Playbook

Use this repo as the public Framekit site: a static frontend direction vault
and brief builder.

## Core Routes

- `/` - product landing
- `/themes/` - Theme Vault
- `/components/` - Component Vault
- `/build/` - guided build brief flow

## Hosting Recommendation

- Preferred: Cloudflare Pages
  - static repo, git-connected deploys, preview environments, no build step required
- Fallback: GitHub Pages
  - works for static showcase deployment, including project-subpath URLs, when using the shipped path-aware runtime scripts

## Deployment Shape

- Keep this repo static-first.
- Treat the public product as:
  - homepage
  - theme vault
  - component vault
  - brief builder
- Keep future auth, generation jobs, workspaces, and preview persistence in a separate app or service.
- Treat this repo as the source of truth for:
  - theme runtime exemplars
  - component demos
  - design examples
  - stack anchor templates
  - coverage and build-brief contracts

## Pre-Launch Checks

- Root landing opens Theme Vault, Component Vault, and `/build/` without broken paths.
- Theme Vault exposes landing, dashboard, and app-screen exemplars for each profile.
- Builder reads `shared/build-brief.contract.json` and `shared/surface-coverage.json` successfully.
- Mobile smoke test passes on `/`, `/themes/`, `/components/`, and at least one profile family page.
