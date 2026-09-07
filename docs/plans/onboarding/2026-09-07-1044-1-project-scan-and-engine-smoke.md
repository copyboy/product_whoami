---
status: active
mission: onboarding
work-item: M1-WI1
group: "2026-09-07-1044"
verify: [test]
---

# 2026-09-07-1044-1-project-scan-and-engine-smoke Project Scan And Engine Smoke

> Source: docs/backlog/onboarding-roadmap.md M1/WI1 (项目扫描 + 引擎冒烟)
> Related: template/START-HERE-after-copy.md (manual fallback)

## Current Baseline

- Live repo facts (verified 2026-09-07 during drafting): `package.json` declares `product-whoami` — Astro 4 + React 18 + Tailwind 3.4 + TypeScript 5.5 personal portfolio/blog site, homepage `https://i.zhangqingdong.cn`; real npm scripts exist (`dev`, `build`, `preview`, `lint`, `test:run`, `type-check`, `format`).
- Entry points verified on disk: `src/pages/` (index, blog/, projects/, web3/, search, tags/, categories/, about, 404, api/), `astro.config.mjs`, `src/layouts/BaseLayout.astro` / `ThreeColumnLayout.astro`, React entry `src/main.tsx`.
- `docs/input/project-scan.md` does NOT exist — the WI1 output is missing.
- Engine smoke: `./tools/mission-driver.sh list` ran successfully during drafting (lists missions base/demo/onboarding, exit 0), but no formal record of this exists in any doc.
- Downstream WIs (WI2–WI8) are blocked on this scan output.

## Goals

- `docs/input/project-scan.md` exists and records, from the live repo: project identity, tech stack (framework/UI/content/search/chart deps), entry points, build/test/lint commands, business domain, deployment target.
- The scan doc records the engine smoke result (`./tools/mission-driver.sh list`, exit 0).
- Every factual claim in the scan is traceable to a file that exists in the repo.

## Non-Goals

- Filling any `docs/context/*`, `docs/index.md`, `docs/architecture/*`, `docs/process/*`, `docs/backlog/README.md`, or `docs/testing/*` doc (WI2–WI8 scope).
- Running the full verification suite to establish a green baseline (WI8 scope).
- Any code change.

## Task Route

- Type: `implementation-only change` (research and documentation output — doc-only, no code change)
- Owner Docs: `docs/input/00-input-processing-guide.md`, `docs/input/README.md`
- Skill Selection Basis: no skill applies — plain repo reading and one doc write.

## Infrastructure And Config Prereqs

- No infra prereqs beyond existing baseline.

## Phase 1 — Scan repo and write docs/input/project-scan.md

Targets: `docs/input/project-scan.md`
Skill: none

- Item Types: `Add | Proof`
- Prereqs: none

- [x] Add: create `docs/input/project-scan.md` covering, at minimum: (1) project identity — name `product-whoami`, description, homepage `https://i.zhangqingdong.cn`, author; (2) tech stack — Astro 4 SSG, React 18 islands, Tailwind CSS 3.4, TypeScript 5.5, key deps (MDX, astro-i18next, Fuse.js, Mermaid, Shiki); (3) entry points — `src/pages/` tree, `astro.config.mjs`, `src/layouts/*`, `src/main.tsx`, `src/content/config.ts`; (4) verification commands from `package.json` scripts — `npm run dev` / `build` / `preview` / `lint` / `test:run` / `type-check` / `format`; (5) business domain — personal portfolio + blog + Web3 learning-roadmap column; (6) deployment — Cloudflare Pages.
- [x] Add: record the engine smoke result inside the scan doc — `./tools/mission-driver.sh list` executed, its mission list, and exit code.
- [x] Proof: spot-check every path cited in the scan doc against the live repo (e.g. `test -f astro.config.mjs && test -d src/pages/web3`), so no claim cites a nonexistent file.

Exit Criteria:

- [x] `docs/input/project-scan.md` exists with all six content areas above plus the engine-smoke record, and contains no `<...>` template placeholders.
- [x] Engine smoke `./tools/mission-driver.sh list` exit 0 is recorded in the scan doc.
- [x] No owner-doc update required beyond the scan doc itself (WI2–WI8 consume it later).
- [x] `docs/logs/` updated with a closure entry for this plan.

## Draft Review Record

- dispatch review #review-2026-09-07-104453-mission-driver-2026-09-07-1044-1-project-scan-and-engine-smoke-1-36113f7b to ses_opencode_glm53
- 2026-09-07：iteration 1，共识 acceptable-after-fixes #review-2026-09-07-104453-mission-driver-2026-09-07-1044-1-project-scan-and-engine-smoke-1-36113f7b

## Verification

- pass test 2026-09-07-104453-mission-driver exit=0

## Closure

- dispatch audit #audit-2026-09-07-104453-mission-driver-2026-09-07-1044-1-project-scan-and-engine-smoke-1-b1b62320 to ses_opencode_glm53 models={exec:opencode-glm-5.3,aud:opencode-glm-5.3}
- accepted #audit-2026-09-07-104453-mission-driver-2026-09-07-1044-1-project-scan-and-engine-smoke-1-b1b62320：审计通过 — 全部 7 项 checkbox 属实：docs/input/project-scan.md 六大内容区 + 引擎冒烟记录齐全、无 `<...>` 模板占位符；引用路径逐一抽查存在（astro.config.mjs、src/main.tsx、src/content/config.ts、src/data/web3-roadmap-data.json、src/pages/web3/phase/[n].astro 等，ALL_PATHS_EXIST）；package.json 身份字段（name/homepage/author/version/test:run）核对一致；docs/logs/2026/09-07.md 闭包条目已存在；审计中复跑 ./tools/mission-driver.sh list → base/demo/onboarding、exit=0，verify[test]（echo onboarding-ok）→ exit=0。exec 与 aud 同为 opencode-glm-5.3，属声明的单模型情形，如实记录。
