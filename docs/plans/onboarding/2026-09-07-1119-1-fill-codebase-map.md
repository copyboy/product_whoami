---
status: active
mission: onboarding
work-item: M1-WI4
group: "2026-09-07-1119"
verify: [test]
---

# 2026-09-07-1119-1-fill-codebase-map Fill docs/context/codebase-map.md

> Source: docs/backlog/onboarding-roadmap.md M1/WI4 (填 docs/context/codebase-map.md)
> Related: 2026-09-07-1044-1-project-scan-and-engine-smoke (scan input), 2026-09-07-1044-3-fill-ai-autonomy-policy (protected areas the map must agree with)

## Current Baseline

- `docs/context/codebase-map.md` is fully templated: the Entry Points table has 5 placeholder rows (Frontend/Backend/Shared/Tests/Config, each `<path>` / `<notes>` / `<YYYY-MM-DD>` / confidence-enum placeholder); the Common Change Routes table has 5 placeholder rows (add page, add API/handler, change model/schema, change permissions, fix UI behavior); Large Or Fragile Files has a single `<path>` / `<risk>` / `<approach>` placeholder row; Project-Specific Search Hints has `<example glob>` / `<important function/type/component names>` / `<paths or none>` placeholders.
- Real data is available and verified: `docs/input/project-scan.md` §3 lists entry points verified on disk 2026-09-07 (`astro.config.mjs`, `src/main.tsx`, `src/layouts/*`, `src/pages/` tree, `src/pages/api/`, `src/content/config.ts`, `src/data/web3-roadmap-data.json`, `src/utils/config.ts`).
- Live repo facts: the sole test file is `src/utils/config.test.ts` (Vitest); there is no backend app (fully static Astro SSG), so the Backend row must be an explicit `none`; config surface is `astro.config.mjs`, `tailwind.config.js`, `tsconfig.json`.
- `docs/context/ai-autonomy-policy.md` (WI3, done) declares the content-collections schema (`src/content/config.ts`) a protected area — the map's Change model/schema route must agree with it (plan-first), not contradict it.
- Depends on M1-WI1 (done); no other dependency.

## Goals

- All four sections of `docs/context/codebase-map.md` (Entry Points, Common Change Routes, Large Or Fragile Files, Project-Specific Search Hints) contain only real rows; no `<...>` placeholder remains anywhere in the file.
- Rows that have no live counterpart (Backend app, Change permissions) carry an explicit `none` with a one-line note instead of being silently dropped or left templated.
- Every path cited in the map is re-verified on disk at execution time; `Last Verified` is stamped with the execution date and `Confidence` gets a real value.
- Routes are consistent with `docs/context/ai-autonomy-policy.md` protected areas (schema route = plan-first) and with the Verification Commands in `docs/context/project-context.md`.

## Non-Goals

- Filling `docs/index.md`, `docs/architecture/*`, `docs/process/*`, `docs/backlog/README.md`, or `docs/testing/*` (WI5–WI8 scope).
- Changing the Documentation freshness field in `docs/context/project-context.md`.
- Any code change.

## Task Route

- Type: `implementation-only change` (documentation template filling)
- Owner Docs: `docs/context/codebase-map.md` (target), `docs/input/project-scan.md` (input), `docs/context/ai-autonomy-policy.md` (consistency constraint)
- Skill Selection Basis: no skill applies — mechanical template filling from verified scan data, same basis as WI2/WI3 plans.

## Infrastructure And Config Prereqs

- No infra prereqs beyond existing baseline.

## Phase 1 — Fill codebase-map.md from scan + live repo

Targets: `docs/context/codebase-map.md`
Skill: none

- Item Types: `Add | Decision | Proof`
- Prereqs: M1-WI1 done (`docs/input/project-scan.md` exists); M1-WI3 done (protected areas known)

- [x] Add: fill the Entry Points table — Frontend app `src/pages/` tree (index, blog/, projects/, web3/, search, tags/, categories/, about, 404) + React entry `src/main.tsx`; Backend app explicit `none — fully static Astro SSG, no server runtime` with notes; Shared code `src/components/` + `src/utils/` + `src/layouts/` (BaseLayout.astro, ThreeColumnLayout.astro); Tests `src/utils/config.test.ts` (sole test file, re-verify with `find . -name "*.test.*" -not -path "*/node_modules/*"` at execution); Config `astro.config.mjs`, `tailwind.config.js`, `tsconfig.json`. Stamp `Last Verified` with the execution date and set `Confidence` per how each row was checked (direct on-disk verification → high).
- [x] Add: fill the Common Change Routes table using commands from `package.json` scripts — Add page: start `src/pages/`, check layouts + `src/content/config.ts` when the page needs a collection, verify `npm run build` + `npm run type-check`; Add API/handler: start `src/pages/api/` (existing: `rss.xml.ts`, `search.json.ts`), verify `npm run build`; Change model/schema: start `src/content/config.ts`, verify `npm run type-check` + `npm run build` + `npm run test:run`, route marked plan-first per `ai-autonomy-policy.md` (protected area); Change permissions: explicit `none — no auth/permissions in a static site`; Fix UI behavior: start `src/components/` + target page, verify `npm run dev` locally then `npm run build`.
- [x] Decision: choose the Large Or Fragile Files entries from live evidence — expected candidates: `src/content/config.ts` (content schema, protected area, breaks all collections if wrong), `src/data/web3-roadmap-data.json` (single data file drives the whole web3 page family), `src/layouts/BaseLayout.astro` (wraps every page), `astro.config.mjs` (central integration list). For each: risk + preferred approach (e.g. plan-first for schema, update-then-build for config). Alternative considered — leaving the section empty until more evidence accumulates — rejected because the template requires real content and these files are demonstrably central; residual risk: list may be incomplete, the Update Rule covers later additions.
- [x] Add: fill Project-Specific Search Hints — file patterns `src/pages/**`, `src/components/**`, `src/content/**`, `src/utils/**`; content anchors `config.ts` collections (blog/projects schema), `web3-roadmap-data.json`, `src/utils/config.ts` site config, `web3Roadmap` / `web3Concepts` utils; avoid editing generated files: `public/data/search-data.json` (build artifact per AGENTS.md), `dist/`.
- [x] Proof: run `grep -c "<[A-Za-z]" docs/context/codebase-map.md` and confirm the printed count is 0 — every template placeholder starts with `<` + letter (`<path>`, `<notes>`, `<command>`, `<YYYY-MM-DD>`, `<risk>`, `<approach>`, `<example glob>`, `<important function/type/component names>`, `<paths or none>`, `<high | medium | low>`), and filled rows contain paths, npm commands, dates, and plain notes only (printed count is the criterion; grep exits 1 on zero matches).

Exit Criteria:

- [x] No `<...>` template placeholder remains anywhere in `docs/context/codebase-map.md`.
- [x] Every path cited in the map exists on disk (spot-checked at execution time); Backend and permissions rows carry explicit `none` with notes.
- [x] The Change model/schema route is consistent with `ai-autonomy-policy.md` (plan-first, protected area).
- [x] The Large Or Fragile Files Decision is recorded with alternatives and residual risk.
- [x] `docs/logs/` updated with a closure entry for this plan.

## Draft Review Record

- dispatch review #review-2026-09-07-104453-mission-driver-2026-09-07-1119-1-fill-codebase-map-1-aff5f8d3 to ses_opencode_glm53
- 2026-09-07：iteration 1，共识 acceptable-after-fixes #review-2026-09-07-104453-mission-driver-2026-09-07-1119-1-fill-codebase-map-1-aff5f8d3

## Verification

- pass test 2026-09-07-104453-mission-driver exit=0
- pass test 2026-09-07-104453-mission-driver exit=0

## Closure

- dispatch audit #audit-2026-09-07-104453-mission-driver-2026-09-07-1119-1-fill-codebase-map-1-4c5f51fc to ses_opencode_glm53 models={exec:opencode-glm5.3,aud:opencode-glm5.3}
- accepted #audit-2026-09-07-104453-mission-driver-2026-09-07-1119-1-fill-codebase-map-1-4c5f51fc：审计通过——`docs/context/codebase-map.md` 四节全为实填（Entry Points/Change Routes/Large Or Fragile Files/Search Hints 无模板占位，Backend 与 Change permissions 行为显式 none），proof 命令复跑 `grep -c "<[A-Za-z]" docs/context/codebase-map.md` 输出 0；全部引用路径逐一核对在盘（20/20 存在，`find . -name "*.test.*" -not -path "*/node_modules/*"` 恰 1 处与 Tests 行一致）；schema 路由标注 plan-first 与 `ai-autonomy-policy.md` 保护区分区一致；Decision 含被否替代方案与残余风险；`docs/logs/2026/09-07.md` 已有本计划 (WI4) closure 条目；mission test 命令 `echo onboarding-ok` exit=0。exec/aud 为同一模型，属声明的单模型降级，如实记录。
