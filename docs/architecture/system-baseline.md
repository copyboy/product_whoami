# System Baseline

## Purpose

Record the current supported implementation baseline for `Product Whoami`.

## Current Baseline

- Runtime shape: build-time SSG (`astro build`, `output: 'static'` in `astro.config.mjs`); no server runtime — the deployed artifact is a set of static assets.
- Frontend stack: Astro 4 + React 18 islands (via `@astrojs/react`) + Tailwind CSS 3.4 (with `@tailwindcss/typography`) + TypeScript 5.5 (`tsc --noEmit`); i18n via astro-i18next; client-side search via Fuse.js 7; diagrams via Mermaid 11; syntax highlighting via Shiki.
- Backend stack: none.
- State management approach: no server-side state; React islands (`src/components/islands/`, entry `src/main.tsx`) hold local component state only — there is no global client state manager.
- Data access approach: Astro Content Collections (`src/content/blog/`, `src/content/projects/`; schema `src/content/config.ts`) read at build time; site config in `src/utils/config.ts`; web3 roadmap data in `src/data/web3-roadmap-data.json`.
- Testing stack: Vitest 3 + Testing Library (`@testing-library/react`, `@testing-library/jest-dom`) + jsdom; sole test file `src/utils/config.test.ts`.
- Build and package tools: astro CLI (`npm run build` / `dev` / `preview`); ESLint 9 (eslint-plugin-astro, jsx-a11y, react-hooks) for lint; Prettier 3 (prettier-plugin-astro) for formatting.
- Deployment shape: Cloudflare Pages, production URL https://i.zhangqingdong.cn (`package.json` `"homepage"`); setup reference `docs/cloudflare-pages-setup.md`.
- External platforms or enterprise systems this app must integrate with: none at runtime — RSS (`@astrojs/rss`), sitemap (`@astrojs/sitemap`), robots.txt (`astro-robots-txt`), and the search index (`src/pages/api/search.json.ts` → build artifact `public/data/search-data.json`) are generated at build time; no runtime third-party APIs or credentials.

## Stable Rules

- Dependency direction: `src/pages/` → layouts (`src/layouts/`) / components (`src/components/`) → utils (`src/utils/`) / data (`src/content/`, `src/data/`). Pages compose; utils and data serve; never the reverse.
- `src/content/config.ts` schema changes are plan-first: protected area per `docs/context/ai-autonomy-policy.md` (plan audit + owner doc + `npm run type-check` / `npm run build` / `npm run test:run` green).
- No runtime-backend assumptions in pages/components: no server APIs, databases, auth, or credentials at runtime — the site is fully static.
- Keep islands small: interactive React islands stay minimal; third-party scripts run via partytown (verified at execution: `@astrojs/partytown` is configured in `astro.config.mjs` with `dataLayer.push` forwarding).

## Update Rule

When the supported baseline changes, update this file in the same change.
