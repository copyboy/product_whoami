---
status: active
mission: onboarding
work-item: M1-WI6
group: "2026-09-07-1119"
verify: [test]
---

# 2026-09-07-1119-3-fill-architecture-docs Fill docs/architecture/{README,module-boundaries,project-vision,system-baseline}.md

> Source: docs/backlog/onboarding-roadmap.md M1/WI6 (填 docs/architecture/*)
> Related: 2026-09-07-1119-1-fill-codebase-map (WI4 provides entry points/routes), 2026-09-07-1044-2-fill-project-context (WI2 baseline), 2026-09-07-1044-3-fill-ai-autonomy-policy (WI3 protected areas)

## Current Baseline

- `docs/architecture/README.md` is already real content (purpose, suggested reading order, owner-doc rules, precedence boundary, initial owner-docs list) — for this file WI6 reduces to verifying pointers hit real files and adjusting only if something is stale. One stale pointer is known at review time (verified 2026-09-07 via repo-wide search): `mission-driver-baseline.md` is referenced twice (reading order item 4 + Initial Owner Docs list) but does not exist anywhere in the repo — the mission-driver engine itself exists (`tools/mission-driver.sh`, `.opencode/skills/mission-driver/`); only its baseline doc is missing.
- `module-boundaries.md`, `project-vision.md`, `system-baseline.md` are in template state: `## Fill In` bullet lists are empty; `## Recommended Sections` / `## Stable Rules` contain template instructions rather than project facts.
- `docs/architecture/` also contains `api-response-conventions.md` and `integration-and-transaction-patterns.md` — template docs NOT in WI6's four-file list, explicitly out of scope.
- Inputs available: WI1 scan (`docs/input/project-scan.md` §2 stack / §3 entry points / §5 domain / §6 deployment), WI2-filled `docs/context/project-context.md` (tech baseline), WI3-filled `ai-autonomy-policy.md` (protected areas), WI4-filled `codebase-map.md` (entry points and routes — this plan is ordered after WI4).
- Depends on M1-WI1 + M1-WI2 (both done); benefits from WI4 landing first (execution order 1 → 3).

## Goals

- The four WI6 files reflect the real project: `module-boundaries.md` states real module ownership with allowed/forbidden dependencies; `project-vision.md` records goal, users, constraints, non-goals, success criteria, and human decision points; `system-baseline.md` records the full runtime/stack/testing/deployment baseline plus stable dependency rules; `README.md` pointers verified against real files.
- No template placeholder (`Fill In` empty bullets, `<...>` tokens) remains in the four files.
- Every factual claim is traceable to the WI1 scan, `package.json`, or live repo files verified at execution time.

## Non-Goals

- Filling `api-response-conventions.md` or `integration-and-transaction-patterns.md` (not in WI6's file list; candidate future backlog).
- Authoring `mission-driver-baseline.md` (referenced by `README.md` but absent repo-wide — writing it is candidate future backlog; this plan only removes the stale references).
- WI7 (`docs/process/*`, `docs/backlog/README.md`) and WI8 (`docs/testing/*`) scope.
- Updating the Documentation freshness field in `docs/context/project-context.md` (per the WI2 freshness decision, that is revisited when the onboarding M1 items are done, not per-WI).
- Any code change.

## Task Route

- Type: `implementation-only change` (architecture documentation template filling)
- Owner Docs: `docs/architecture/README.md`, `docs/architecture/module-boundaries.md`, `docs/architecture/project-vision.md`, `docs/architecture/system-baseline.md` (targets); `docs/input/project-scan.md` (input)
- Skill Selection Basis: no skill applies — template filling from verified scan data and live repo reading.

## Infrastructure And Config Prereqs

- No infra prereqs beyond existing baseline.

## Phase 1 — Fill the three template architecture docs + verify README

Targets: `docs/architecture/module-boundaries.md`, `docs/architecture/project-vision.md`, `docs/architecture/system-baseline.md`, `docs/architecture/README.md`
Skill: none

- Item Types: `Add | Decision | Proof`
- Prereqs: M1-WI1, M1-WI2 done; WI4 plan (execution order 1) landed or its map data available

- [ ] Add: fill `module-boundaries.md` with real boundaries — Application shells: `src/layouts/BaseLayout.astro` (HTML shell), `src/layouts/ThreeColumnLayout.astro` (Nav+Main+Sidebar); Domain modules: `src/pages/blog/`, `src/pages/projects/`, `src/pages/web3/` (web3 additionally owns `src/data/web3-roadmap-data.json` + `src/utils/web3Roadmap.ts` / `web3Concepts.ts`); Shared UI: `src/components/` (+ `src/icons/`); Data/service layer: content collections `src/content/blog/` + `src/content/projects/` with schema authority `src/content/config.ts`, site config `src/utils/config.ts`; State layer: none server-side — React islands hold local component state only; Test ownership: `src/utils/config.test.ts`. For each boundary: responsibility, allowed dependencies, forbidden dependencies, governing owner docs.
- [ ] Add: fill `project-vision.md` — product goal (personal portfolio + blog + product showcase + web3 learning column, published at https://i.zhangqingdong.cn); primary users (site visitors / solo content author); constraints that must stay true (fully static Astro SSG on Cloudflare Pages, no backend runtime, content via MDX collections, schema changes plan-first per autonomy policy); explicit non-goals (no dynamic server, no payment, no auth/user-data storage); success criteria + human decision points per the Decision item below.
- [ ] Decision: choose success criteria and human decision points for `project-vision.md`. Expected success criteria: all verification commands green on a known-good baseline (recorded by WI8) and new content publishable by adding MDX + git push without code change. Expected human decision points: deployment/Cloudflare config changes, protected-area list changes, Documentation freshness upgrades (each already gated by existing policies). Alternatives considered — richer criteria (traffic/SEO metrics) — rejected: no analytics evidence exists in the repo to define them; residual risk: criteria may be tightened later when real metrics exist.
- [ ] Add: fill `system-baseline.md` — runtime shape: build-time SSG, no server runtime; frontend: Astro 4 + React 18 islands + Tailwind 3.4 + TypeScript 5.5; backend: none; state: islands-local only; data access: Astro Content Collections read at build time; testing: Vitest 3 + Testing Library + jsdom; build/package: astro CLI + ESLint 9 + Prettier 3; deployment: Cloudflare Pages (setup ref `docs/cloudflare-pages-setup.md`); external integrations: none at runtime (RSS/sitemap/search index generated at build). Stable rules: dependency direction pages → layouts/components → utils/data; `src/content/config.ts` schema changes are plan-first; no runtime-backend assumptions in pages/components; keep islands small (partytown for third-party scripts — verify against `astro.config.mjs` at execution).
- [ ] Add: verify `README.md` — every file it lists exists on disk, reading order still matches reality. For any pointer whose target does not exist, remove the reference — do not author the missing doc in this plan (out of scope). Known case: `mission-driver-baseline.md` (reading order item 4 + Initial Owner Docs entry; absent repo-wide, verified 2026-09-07) — remove both references and record the removal. If no change is needed, record `No owner-doc update required` for this item.
- [ ] Proof: run `grep -c "Fill In\|<path>\|<area>\|<example" docs/architecture/README.md docs/architecture/module-boundaries.md docs/architecture/project-vision.md docs/architecture/system-baseline.md` and confirm every per-file printed count is 0 (printed counts are the criterion; grep exits 1 on zero matches).

Exit Criteria:

- [ ] The three template docs contain real project content; no `Fill In` empty-bullet or `<...>` placeholder remains in any of the four WI6 files.
- [ ] `README.md` pointers verified against real files (stale pointers fixed — including removal of the absent `mission-driver-baseline.md` references — or explicitly recorded as none).
- [ ] The success-criteria/human-decision-points Decision is recorded with alternatives and residual risk.
- [ ] Claims are traceable to the WI1 scan, `package.json`, or files verified at execution time.
- [ ] `docs/logs/` updated with a closure entry for this plan.

## Draft Review Record

- dispatch review #review-2026-09-07-104453-mission-driver-2026-09-07-1119-3-fill-architecture-docs-1-d3b8e5f2 to ses_opencode_glm53
- 2026-09-07：iteration 1，共识 acceptable-after-fixes #review-2026-09-07-104453-mission-driver-2026-09-07-1119-3-fill-architecture-docs-1-d3b8e5f2

## Verification

## Closure
