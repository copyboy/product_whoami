# Project Scan — product_whoami

> Generated: 2026-09-07 · Source plan: `docs/plans/onboarding/2026-09-07-1044-1-project-scan-and-engine-smoke.md` (M1/WI1)
> Every claim below is traceable to a file in this repo; sources are cited per section.

## 1. Project Identity

| Field | Value | Source |
|-------|-------|--------|
| Name | `product-whoami` | `package.json` `"name"` |
| Description | Personal portfolio website combining blog functionality with product showcase capabilities | `package.json` `"description"` |
| Homepage | https://i.zhangqingdong.cn | `package.json` `"homepage"` |
| Author | Gerrad Zhang <gerrad.zhang@hotmail.com> | `package.json` `"author"` |
| Version | 1.0.0 (private) | `package.json` |

## 2. Tech Stack

| Layer | Technology | Source |
|-------|-----------|--------|
| Framework | Astro `^4.0.0` (SSG, static output) | `package.json` deps; `astro.config.mjs` |
| UI islands | React `^18.3.1` + react-dom (via `@astrojs/react` `^3.0.0`) | `package.json` deps |
| Styling | Tailwind CSS `^3.4.1` (via `@astrojs/tailwind` `^5.0.0`, `@tailwindcss/typography`) | `package.json` deps; `tailwind.config.js` |
| Language | TypeScript `^5.5.3` (`type-check`: `tsc --noEmit`) | `package.json` devDeps/scripts; `tsconfig.json` |
| Content | MDX (`@astrojs/mdx` `^3.0.0`) + Astro Content Collections | `package.json` deps; `src/content/config.ts` |
| i18n | astro-i18next `^1.0.0-beta.21` | `package.json` deps |
| Search | Fuse.js `^7.1.0` | `package.json` deps |
| Charts | Mermaid `^11.10.0` | `package.json` deps |
| Syntax highlight | Shiki `^0.14.7` | `package.json` deps |
| Testing | Vitest `^3.2.2` + Testing Library + jsdom | `package.json` devDeps |
| Linting / formatting | ESLint 9 (eslint-plugin-astro, jsx-a11y, react-hooks) · Prettier 3 | `package.json` devDeps |
| Other notable deps | `@astrojs/rss`, `@astrojs/sitemap`, `astro-seo`, `astro-robots-txt`, `astro-compress`, `@astrojs/partytown`, `rehype-slug`, `rehype-autolink-headings`, `remark-toc`, `qrcode` | `package.json` deps |

## 3. Entry Points

| Entry | Path (verified on disk 2026-09-07) |
|-------|-----------------------------------|
| Astro config | `astro.config.mjs` |
| HTML shell layout | `src/layouts/BaseLayout.astro` |
| Three-column layout | `src/layouts/ThreeColumnLayout.astro` (Nav + Main + Sidebar) |
| React entry | `src/main.tsx` |
| Content schema | `src/content/config.ts` (collections: `src/content/blog/`, `src/content/projects/`) |
| Home | `src/pages/index.astro` |
| Blog | `src/pages/blog/[...page].astro` (list), `src/pages/blog/[slug].astro` (detail) |
| Projects | `src/pages/projects/index.astro`, `src/pages/projects/[slug].astro` |
| Web3 column | `src/pages/web3/index.astro`, `roadmap.astro`, `report.astro`, `concept/[slug].astro`, `phase/[n].astro` |
| Search | `src/pages/search.astro` |
| Taxonomy | `src/pages/tags/`, `src/pages/categories/` |
| About / 404 | `src/pages/about.astro`, `src/pages/404.astro` |
| API routes | `src/pages/api/rss.xml.ts`, `src/pages/api/search.json.ts` |
| Roadmap data | `src/data/web3-roadmap-data.json` |
| Site config util | `src/utils/config.ts` |

## 4. Verification Commands

From `package.json` `"scripts"`:

| Command | Script |
|---------|--------|
| `npm run dev` | `astro dev --host` |
| `npm run build` | `astro build` |
| `npm run preview` | `astro preview` |
| `npm run lint` | `eslint .` (also `lint:fix`) |
| `npm run test:run` | `vitest run` (also `test`, `test:ui`, `test:coverage`) |
| `npm run type-check` | `tsc --noEmit` |
| `npm run format` | `prettier --write .` (also `format:check`) |

## 5. Business Domain

Personal portfolio + blog + product showcase site (see `package.json` description; page tree in §3):

- **Blog** — technical articles and learning notes in MDX (`src/content/blog/`), with tags/categories taxonomy and RSS.
- **Projects** — product showcase entries (`src/content/projects/`).
- **Web3 learning column** — 5-phase blockchain learning roadmap (Bitcoin → Ethereum → DApp → DeFi → DAO) driven by `src/data/web3-roadmap-data.json` with concept/phase detail pages.
- **Search** — client-side full-text search over content (Fuse.js).
- **i18n** — multi-language support via astro-i18next.

## 6. Deployment

- **Target: Cloudflare Pages**, production URL https://i.zhangqingdong.cn (`package.json` `"homepage"`).
- Setup reference: `docs/cloudflare-pages-setup.md`.

## Engine Smoke Record

Executed during this scan (2026-09-07):

```
$ ./tools/mission-driver.sh list
Missions in /Users/gerrad/Workspace/workspace_g1/product_whoami/missions:
  base
  demo
  onboarding
exit code: 0
```

Result: **PASS** — mission-driver engine responds, lists 3 missions (`base`, `demo`, `onboarding`), exit code 0.
