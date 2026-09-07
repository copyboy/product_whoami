# Module Boundaries

## Purpose

Define the main code ownership boundaries for `Product Whoami`.

## Application Shells

### `src/layouts/BaseLayout.astro`

- Responsibility: site-wide HTML document shell — head, SEO metadata, scripts; wraps every page.
- Allowed dependencies: shared UI (`src/components/`), icons (`src/icons/`), site config (`src/utils/config.ts`), global styles (`src/styles/global.css`).
- Forbidden dependencies: importing pages (`src/pages/**`); reading content collections directly (content reaches layouts as props/frontmatter from the pages that use them).
- Owner docs: `docs/architecture/system-baseline.md` (dependency direction), `docs/context/codebase-map.md` (fragile-file entry — regressions are site-wide).

### `src/layouts/ThreeColumnLayout.astro`

- Responsibility: three-column page structure (Nav + Main + Sidebar) used by content pages.
- Allowed dependencies: `BaseLayout.astro`, shared UI (`src/components/`), icons, site config.
- Forbidden dependencies: importing pages; owning domain data reads beyond props.
- Owner docs: `docs/architecture/system-baseline.md`.

## Domain Modules

Domain modules are route families under `src/pages/`. Each owns its pages plus (for web3) its domain data and utils. Cross-domain page imports are forbidden — a blog page must not import a web3 page, and no domain may write into another domain's data.

### `src/pages/blog/`

- Responsibility: blog list (`[...page].astro`) and detail (`[slug].astro`) pages; tags/categories taxonomy pages under `src/pages/tags/` and `src/pages/categories/` serve this content.
- Allowed dependencies: layouts, shared UI, content collection `src/content/blog/` (read-only at build), shared utils.
- Forbidden dependencies: web3-owned files (`src/data/web3-roadmap-data.json`, `src/utils/web3Roadmap.ts`, `src/utils/web3Concepts.ts`); schema edits to `src/content/config.ts` (plan-first protected area).
- Owner docs: `docs/architecture/system-baseline.md`, `docs/context/ai-autonomy-policy.md`.

### `src/pages/projects/`

- Responsibility: product showcase index (`index.astro`) and detail (`[slug].astro`) pages.
- Allowed dependencies: layouts, shared UI, content collection `src/content/projects/` (read-only at build), shared utils.
- Forbidden dependencies: web3-owned files; schema edits to `src/content/config.ts` (plan-first).
- Owner docs: `docs/architecture/system-baseline.md`, `docs/context/ai-autonomy-policy.md`.

### `src/pages/web3/`

- Responsibility: the Web3 learning column — `index.astro`, `roadmap.astro`, `report.astro`, `concept/[slug].astro`, `phase/[n].astro`. This module additionally owns its data and utils: `src/data/web3-roadmap-data.json` (single source driving the whole page family) and `src/utils/web3Roadmap.ts` / `src/utils/web3Concepts.ts`.
- Allowed dependencies: layouts, shared UI (`src/components/` incl. `src/components/web3/`), its own data/utils above, shared utils.
- Forbidden dependencies: blog/projects content collections; schema edits to `src/content/config.ts` (plan-first). Bad slugs or phase ids in `web3-roadmap-data.json` break detail-page generation (see fragile-file entry in `docs/context/codebase-map.md`).
- Owner docs: `docs/architecture/system-baseline.md`, `docs/context/codebase-map.md`.

## Shared UI / Components

### `src/components/` (incl. `web3/`, `islands/`) + `src/icons/`

- Responsibility: reusable presentation — Astro components, web3-column components (`src/components/web3/`), React interactive islands (`src/components/islands/`, mounted via entry `src/main.tsx`), SVG icons (`src/icons/`).
- Allowed dependencies: other shared components, icons, utils (`src/utils/`), global styles.
- Forbidden dependencies: routes (`src/pages/**`); owning domain data files (data flows in via props from pages); runtime backend/API calls (fully static site).
- Owner docs: `docs/architecture/system-baseline.md` (islands rule).

## Data / Service Layer

- Content collections: `src/content/blog/` + `src/content/projects/` (MDX), schema authority `src/content/config.ts`. Collections are read at build time only. `src/content/config.ts` is a protected area — schema changes are `plan-first` per `docs/context/ai-autonomy-policy.md` (plan audit + owner doc + `npm run type-check` / `npm run build` / `npm run test:run` green).
- Site config: `src/utils/config.ts` (single site-level configuration source; also consumed by `astro.config.mjs`).
- Web3 data: owned by the web3 domain module (above).
- Forbidden: runtime database/API clients or credentials — none exist and none may be introduced without re-filling the protected-areas table in `docs/context/ai-autonomy-policy.md`.
- Owner docs: `docs/context/ai-autonomy-policy.md`, `docs/context/codebase-map.md`, `docs/testing/known-good-baselines.md` (green baselines).

## State Layer

- None server-side: the site is build-time SSG with no server runtime.
- Client state: React islands (`src/components/islands/`) hold local component state only; there is no global client state manager. Keep islands small (see `docs/architecture/system-baseline.md`).
- Owner docs: `docs/architecture/system-baseline.md`.

## Test Ownership

- `src/utils/config.test.ts` — sole test file (Vitest), owned by the shared utils boundary; tests `src/utils/config.ts`. New tests colocate with the code they test unless a new test location is recorded in `docs/context/codebase-map.md`.
- Owner docs: `docs/testing/known-good-baselines.md`, `docs/context/codebase-map.md` (Tests row).

## Rule

If a recurring design argument depends on module ownership, write the answer here instead of re-litigating it in chat.
