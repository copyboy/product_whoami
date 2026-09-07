# Codebase Map

## Purpose

This file gives AI agents a compact map of the live repository so they do not rediscover the structure by repeatedly searching imports and directories.

Keep it current enough to route common work. Do not turn it into a full architecture document.

## Entry Points

Replace placeholders after copying the template.

| Area         | Path     | Notes     | Last Verified  | Confidence |
| ------------ | -------- | --------- | -------------- | ---------- |
| Frontend app | `src/pages/` | Astro SSG page tree: `index.astro`, `about.astro`, `search.astro`, `404.astro`, `blog/[...page].astro` + `blog/[slug].astro`, `projects/` (index + `[slug]`), `web3/` (index, roadmap, report, `concept/[slug]`, `phase/[n]`), `tags/`, `categories/`; React entry `src/main.tsx` | 2026-09-07 | high |
| Backend app  | `none` | Fully static Astro SSG, no server runtime; `src/pages/api/` holds build-time endpoints only (`rss.xml.ts`, `search.json.ts`) | 2026-09-07 | high |
| Shared code  | `src/components/`, `src/utils/`, `src/layouts/` | Layouts: `BaseLayout.astro` (HTML shell) + `ThreeColumnLayout.astro`; components incl. `web3/`, `islands/`; utils incl. `config.ts`, `web3Roadmap.ts`, `web3Concepts.ts` | 2026-09-07 | high |
| Tests        | `src/utils/config.test.ts` | Sole test file (Vitest); re-verified at execution via `find . -name "*.test.*" -not -path "*/node_modules/*"` → exactly 1 hit | 2026-09-07 | high |
| Config       | `astro.config.mjs`, `tailwind.config.js`, `tsconfig.json` | All verified on disk; central integration list lives in `astro.config.mjs` | 2026-09-07 | high |

## Common Change Routes

| Task Type           | Start Here | Then Check | Verification | Last Verified  | Confidence |
| ------------------- | ---------- | ---------- | ------------ | -------------- | ---------- |
| Add page/screen     | `src/pages/` | Layouts (`src/layouts/`) + `src/content/config.ts` when the page reads a collection | `npm run build` + `npm run type-check` | 2026-09-07 | high |
| Add API/handler     | `src/pages/api/` (existing: `rss.xml.ts`, `search.json.ts`) | `astro.config.mjs` integrations + `src/utils/` helpers the endpoint calls | `npm run build` | 2026-09-07 | high |
| Change model/schema | `src/content/config.ts` — plan-first, protected area per `ai-autonomy-policy.md` | Existing frontmatter in `src/content/blog/` + `src/content/projects/` stays schema-valid | `npm run type-check` + `npm run build` + `npm run test:run` | 2026-09-07 | high |
| Change permissions  | `none` | No auth/permissions in a fully static site | n/a | 2026-09-07 | high |
| Fix UI behavior     | `src/components/` + the target page in `src/pages/` | `src/styles/global.css` + `tailwind.config.js` for styling; React islands in `src/components/islands/` with entry `src/main.tsx` | `npm run dev` locally, then `npm run build` | 2026-09-07 | high |

## Large Or Fragile Files

List files that agents should treat carefully because they are large, central, generated, or easy to edit incorrectly.

| Path     | Risk     | Preferred Approach |
| -------- | -------- | ------------------ |
| `src/content/config.ts` | Content-collections schema (blog + projects); a bad edit breaks every collection page at build time; protected area (`plan-first` per `ai-autonomy-policy.md`) | Plan-first; after audit, edit schema then run `npm run type-check` + `npm run build` + `npm run test:run` |
| `src/data/web3-roadmap-data.json` | Single data file drives the whole web3 page family (index/roadmap/report/concept/phase); bad slugs or phase ids break detail-page generation | Update data, then `npm run build`; click through `/web3/` routes in `npm run dev` when slugs or ids change |
| `src/layouts/BaseLayout.astro` | Wraps every page (HTML shell, SEO, scripts); regressions are site-wide | Minimal diffs; verify visually with `npm run dev`, then `npm run build` |
| `astro.config.mjs` | Central integration list (react, mdx, tailwind, i18n, sitemap, compress, etc.); one wrong flag breaks the build | Update-then-build: change one integration at a time, `npm run build` after each |

Decision (2026-09-07, M1-WI4): entries chosen from live evidence — the schema file, the single-source web3 data, the site-wide layout wrapper, and the central config are each demonstrably load-bearing for every build. Alternative considered — leaving the section empty until more evidence accumulates — rejected because the template requires real content and these files are demonstrably central. Residual risk: the list may be incomplete; the Update Rule below covers later additions.

## Project-Specific Search Hints

- Use file patterns: `src/pages/**` (routes), `src/components/**` (incl. `web3/`, `islands/`), `src/content/**` (MDX + schema), `src/utils/**`
- Use content anchors: collections schema in `src/content/config.ts` (blog/projects), `src/data/web3-roadmap-data.json`, site config in `src/utils/config.ts`, `web3Roadmap` / `web3Concepts` utils
- Avoid editing generated files: `public/data/search-data.json` (build artifact per AGENTS.md), `dist/`

## Update Rule

Update this file when a change creates a new major entry point, moves common code, adds a new test location, or repeatedly causes agents to rediscover the same path.

If a listed path is missing, placeholders remain, or live imports contradict this map, do not treat the map as authority. Verify with the live repo, then update the map or mark the row low confidence before implementation.

If `Last Verified` is old for the project's pace, predates major structural changes, or the task touches a listed route's boundary, verify the live repo before relying on the row. Low-confidence rows do not block low-risk work after live verification, but protected-area, migration, or cross-module work should update the row before implementation.
