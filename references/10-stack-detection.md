# Stack Detection

Resolve stack during Scope Lock before writing any implementation code.

## User-Intent Override (Highest Priority)

If the user explicitly names stack/framework/language, lock to that choice.

Examples:

- `Next.js + TypeScript` -> Next.js output
- `React app` -> React output
- `Vanilla HTML/CSS/JS` -> Vanilla output

Do not re-ask explicit choices unless there is a hard conflict.

## Detection Priority

1. Next.js
2. React
3. Vanilla HTML/CSS/JS

## Signals

### Next.js

Use Next.js when at least one strong signal matches:

- `package.json` lists `next`
- `next.config.js|mjs|ts` exists
- App Router files exist (`app/layout.*` or `app/page.*`)
- Pages Router files exist (`pages/_app.*` or `pages/_document.*`)

Do not treat a generic `app/` directory alone as sufficient signal.

### React

Use React when Next.js is not detected and any signal matches:

- `package.json` lists `react`
- repo contains `.jsx` or `.tsx` React component files

### Vanilla

Use Vanilla when neither Next.js nor React is confidently detected.

## Styling System Lock

During Scope Lock, resolve styling system explicitly:

- `tailwind` when Tailwind is detected or requested
- `css` otherwise

Tailwind detection signals:

- `tailwind.config.*` exists
- `@tailwind` directives present
- Tailwind utility usage is clearly established in target surface

## Optional Layer Detection

- shadcn/ui: `components/ui/*` or `components.json`
- Recharts: `package.json` includes `recharts`
- Heroicons: `@heroicons/react`
- Tabler: `@tabler/icons-react` or `@tabler/icons`
- Feather: `react-feather` or `feather-icons`
- Material icons: `@mui/icons-material`

## Data-Surface Scope Detection

Treat chart/data-viz scope as present when user intent or repo context includes:

- dashboard/analytics/reporting/KPI/metrics/trends
- time-series/comparison chart requirements
- tabular operations data benefiting from sort/filter controls

## Layer Preference Capture (After Stack Lock)

For `react` or `nextjs` targets, lock optional layers before implementation:

- Tailwind (`yes | no | keep-existing`)
- shadcn/ui (`yes | no | keep-existing`, requires Tailwind)
- Recharts (`yes | no | keep-existing`, only for chart/data-viz scope)

Rules:

- Honor explicit user layer choices when compatible.
- If `shadcn-ui=yes` and Tailwind is not enabled, ask once to enable Tailwind.
- If layers are unspecified, keep existing detected layers.
- Do not silently scaffold new layer dependencies.

## Ambiguous Context

If repo is empty/greenfield and the build brief is underspecified, use this exact canned scope-lock prompt (verbatim, max 3 questions total):

```text
Scope lock: I can’t infer stack/contracts yet from this repo, so lock these 3 items and I’ll return PLAN + DESIGN_SPEC next.

1) What should I build? (page/app purpose + key sections/components)

2) Tech stack lock (pick one `output_target` + one `styling_system`):
   - `output_target`:
     - `vanilla` (HTML + CSS + JavaScript, static/no-build)
     - `react` (SPA/component app)
     - `nextjs` (App Router/full-stack ready)
   - `styling_system`: `css` (plain CSS) or `tailwind` (utility classes)
   - quick combo aliases accepted: `vanilla`, `react+css`, `react+tailwind`, `nextjs+css`, `nextjs+tailwind`

3) Visual direction lock (pick `design_profile` + `theme_mode`, or describe a vibe and I’ll map it):
   - `design_profile` options: `modern-saas`, `cyberpunk-neon`, `arctic-mono`, `noire-editorial`, `corporate-blueprint`, `retro-terminal`, `pastel-dreamscape`, `sunset-gradient`
   - `theme_mode`: `light`, `dark`, `both-toggle-dark-default`, or `both-toggle-light-default`
```

Normalization rules for tech stack lock:

- Canonical locked fields are always `output_target` and `styling_system`.
- If user replies with a combo alias, split it into canonical fields.
  - `react+tailwind` -> `output_target=react`, `styling_system=tailwind`
  - `nextjs+css` -> `output_target=nextjs`, `styling_system=css`
- If user gives only one field, ask only for the missing field.
- If `expressive_intensity` is not provided, default to `high-drama`.

Rules for this intake:

- Do not ask for `keep-existing` in empty repo context.
- Do not ask optional layer or icon questions unless they are blocking for requested scope.
- Keep wording deterministic and avoid vague labels like "stack/style" without explicit fields.

If repo is non-empty but still ambiguous after detection, ask once for target output: `vanilla`, `react`, or `nextjs`.

If unanswered:

- Prefer explicit stack hints in user prompt.
- Otherwise default:
  - `React` for greenfield app/dashboard/component requests
  - `Vanilla` for explicitly static/single-file/no-build requests

If ambiguity remains unresolved after one direct stack question, emit:

- `ERROR_CODE: SKILL_STACK_AMBIGUOUS`
- Use schema in [references/90-error-taxonomy.md](references/90-error-taxonomy.md)

## Stack Playbooks

After stack lock, load exactly one playbook:

- Next.js: [references/11-next-rules.md](references/11-next-rules.md)
- React: [references/12-react-rules.md](references/12-react-rules.md)
- Vanilla: [references/13-vanilla-rules.md](references/13-vanilla-rules.md)
