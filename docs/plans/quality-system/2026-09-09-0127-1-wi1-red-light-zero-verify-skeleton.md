---
status: active
mission: quality-system
work-item: WI1
group: "2026-09-09-0127"
verify: [test]
---

# 2026-09-09-0127-1-wi1-red-light-zero-verify-skeleton WI1：修复存量红灯并建立 verify 骨架

> Source: `docs/backlog/quality-system-roadmap.md` Q1 — WI1 修复存量红灯并建立 verify 骨架（五层防线落地第一步，L1 机器防线归零）
> Related: `docs/testing/known-good-baselines.md`（2026-09-07 行已记录两处红灯）；后续 WI2/WI3/WI4 均依赖本计划的 verify 骨架

## Current Baseline

2026-09-09 01:27 实测（本仓库干净树）：

- `npm run type-check` exit 2：`src/components/islands/MermaidDiagram.tsx(122,26)` TS2345 —— `getThemeConfig` 返回的 `theme` 被推宽为 `string`，不能赋给 `MermaidConfig` 的 theme union（`"default" | "dark" | "base" | "forest" | "neutral" | "null"`）。
- `npm run lint` exit 1：14 errors + 1 warning，分布如下：
  - 生成目录（8 errors）：`.astro/astro/content.d.ts`（7，`no-empty-object-type` ×3 + `no-explicit-any` ×4）、`.astro/types.d.ts`（1，`triple-slash-reference`）
  - `src/` 真实错误（6 errors）：`src/components/islands/SearchIsland.tsx`（3：22:11 未用 `FuseType`、24:3 `no-misused-new`、123:26 `no-explicit-any`）、`src/env.d.ts`（1:1 `triple-slash-reference`，指向 `../.astro/types.d.ts`，是 Astro 4 生成类型接线惯例）、`src/pages/api/rss.xml.ts`（7:27 未用参数 `context`）、`src/utils/config.ts`（120:25 `no-explicit-any`）
  - warning：`SearchIsland.tsx` 258:6 `react-hooks/exhaustive-deps`（不阻塞 lint exit 0，不在本计划范围）
- `npm run test:run` exit 0（4/4，`src/utils/config.test.ts`）。
- `scripts/` 目录不存在；`package.json` 无 `verify` script；`eslint.config.js` 为 flat config，现有 ignores 仅 `['dist']`。
- `docs/testing/known-good-baselines.md` 2026-09-07 行：build/test 绿，type-check/lint 记录为 Known Failures。

## Goals

- `npm run type-check` exit 0（修复 TS2345）。
- `npm run lint` exit 0（生成目录经 eslint ignores 排除；`src/` 内 6 个真实错误逐个修复，无 eslint-disable 掩盖语义错误）。
- `npm run verify` exit 0：新建 `scripts/verify.sh` 聚合 type-check + lint + test:run（L1+L2 骨架），注册 `npm run verify`。
- `docs/testing/known-good-baselines.md` 红灯行移入 passed。

## Non-Goals

- 不接入 L3 内容完整性检查（WI2）与 Playwright/CI（WI4）。
- 不处理 `SearchIsland.tsx` 的 exhaustive-deps warning（不阻塞 lint exit 0；留待其功能演进时一并处理，非本计划验收门）。
- 不重写 `MermaidDiagram.tsx` 的渲染逻辑，只做最小类型收窄。
- 不追测试覆盖率（WI3 范围）。

## Task Route

- Type: `implementation-only change`（存量缺陷修复 + 工具骨架新增）
- Owner Docs: `docs/backlog/quality-system-roadmap.md`（WI1 完成定义）、`docs/testing/known-good-baselines.md`
- Skill Selection Basis: 纯 TS/eslint 修复 + shell 脚本，无可复用 skill，Skill: none

## Infrastructure And Config Prereqs

- No infra prereqs beyond existing baseline（无端口/env/外部服务依赖；verify.sh 仅本地命令聚合）。

## Phase 1 — 修复存量红灯（type-check + lint 归零）

Targets: `src/components/islands/MermaidDiagram.tsx`, `src/components/islands/SearchIsland.tsx`, `src/env.d.ts`, `src/pages/api/rss.xml.ts`, `src/utils/config.ts`, `eslint.config.js`
Skill: none
Prereqs: 无

- Item Types: Fix 4、Add 1、Decision 1、Proof 1（共 7 项）

- [x] Fix TS2345：收窄 `MermaidDiagram.tsx` `getThemeConfig` 返回值的 `theme` 为 MermaidConfig union 允许的字面量类型（如 `as const` 或显式返回类型），使 `mermaid.initialize` 类型检查通过；渲染行为不变
      - Skill: none
- [x] Add：`eslint.config.js` ignores 增加 `.astro`（生成目录，含 `.astro/astro/content.d.ts` 与 `.astro/types.d.ts`），消除 8 个生成文件 errors
      - Skill: none
- [x] Fix `SearchIsland.tsx` 3 errors：移除未用的 `FuseType` 导入；修复 24:3 `no-misused-new`（interface 内非法 construct 签名改为类型别名或正确声明）；123:26 `any` 换为具体类型
      - Skill: none
- [x] Fix `rss.xml.ts` 7:27：未用参数 `context` 删除或按 API 路由签名保留并前缀 `_`（以类型检查通过的最小改动为准）
      - Skill: none
- [x] Fix `config.ts` 120:25：`any` 换为具体类型
      - Skill: none
- [x] Decision：`src/env.d.ts` 1:1 `triple-slash-reference` 的处理方式 —— 它是 Astro 4 生成类型接线惯例（`/// <reference path="../.astro/types.d.ts" />`），改为 import 风格有破坏 Astro 类型解析的风险。候选：eslint config 对 `src/env.d.ts` 做规则级 override（triple-slash-reference off，范围仅此文件），或实测 import 风格可行。记录选择理由与残余风险；此为 config 级接线豁免，不属于 roadmap 禁止的「eslint-disable 掩盖语义错误」
      - Skill: none
- [x] Proof：`npm run type-check` exit=0；`npm run lint` exit=0（0 errors；warning 允许保留）。两条命令的实际输出摘录记入本计划 Verification 证据
      - Skill: none

Exit Criteria:

- [x] type-check 与 lint 双绿，且 `src/` 内无新增 eslint-disable 注释（生成目录经 ignores 排除除外）
- [x] No owner-doc update required（纯缺陷修复，无行为契约变化；基线记录在 Phase 3 完成）
- [x] Phase 1 执行过程中如发现与基线不符的新错误，先记录再决定是否入 scope，不静默扩 scope

## Phase 2 — verify 骨架（scripts/verify.sh + npm run verify）

Targets: `scripts/verify.sh`（新建）, `package.json`
Skill: none
Prereqs: Phase 1（红灯归零后 verify 才能首次 exit 0）

- Item Types: `Add` 为主（Add 2、Decision 1、Proof 1，共 4 项）

- [x] Add：新建 `scripts/verify.sh`（可执行，shebang + `set -e`）：依次运行 `npm run type-check`、`npm run lint`、`npm run test:run`，任一失败即非零退出；输出各步 PASS/FAIL 摘要。脚本内直接调用底层命令或子命令，禁止递归调用自身（防 verify 套 verify）
      - Skill: none
- [x] Decision：聚合脚本选型 —— bash 脚本 vs node 脚本。默认 bash（零依赖、CI 友好、与 roadmap 文字 `scripts/verify.sh` 一致）；若执行时发现跨平台硬需求再记录改选理由。残余风险：Windows 本地开发不可用（本项目仅 macOS/CI，可接受）
      - Skill: none
- [x] Add：`package.json` 注册 `"verify": "bash scripts/verify.sh"`（L3 内容检查由 WI2 后续接入）
      - Skill: none
- [x] Proof：红灯归零后的树上 `npm run verify` exit=0；故意破坏性验证一次（如临时注入一个 lint error 使 verify 非零退出后还原），证明聚合门真的会拦
      - Skill: none

Exit Criteria:

- [x] `npm run verify` 在干净绿树上 exit 0，在注入缺陷时非零退出（两次结果均记入 Verification 证据）
- [x] No owner-doc update required（`docs/context/project-context.md` 的 Verification Commands 表由 Phase 3 基线记录体现，不新增行；verify 属聚合命令）

## Phase 3 — 基线与日志记录

Targets: `docs/testing/known-good-baselines.md`, `docs/logs/`
Skill: none
Prereqs: Phase 1 + Phase 2 全部完成

- Item Types: `Proof` 为主（2/2 为 Proof）

- [x] Proof：更新 `docs/testing/known-good-baselines.md` —— 新增本计划验证行：`type-check`/`lint` 从 Known Failures 移入 Commands Passed（附 exit 0 证据），新增 `npm run verify`（exit 0）passed 行；Notes 注明 WI1 落地与改动文件
      - Skill: none
- [x] Proof：`docs/logs/` 新增聚合日志条目（单条覆盖三个 Phase，同日同 feature）
      - Skill: none

Exit Criteria:

- [x] known-good-baselines 出现 type-check / lint / verify 的 passed 记录，红灯行不再以 Known Failures 存在
- [x] `docs/logs/` 已更新

## Draft Review Record

- dispatch review #review-2026-09-09-012601-mission-driver-2026-09-09-0127-1-wi1-red-light-zero-verify-skeleton-1-b6f12e8d to ses_reviewer_opencode
- 2026-09-09：iteration 1，共识 approved #review-2026-09-09-012601-mission-driver-2026-09-09-0127-1-wi1-red-light-zero-verify-skeleton-1-b6f12e8d

## Verification

- 2026-09-09 Phase 1 Proof：`npm run type-check` exit 0（修复前基线 exit 2，TS2345 at `MermaidDiagram.tsx(122,26)`）；`npm run lint` exit 0，`✖ 1 problem (0 errors, 1 warning)`（修复前基线 exit 1，14 errors + 1 warning；warning 为 `SearchIsland.tsx:257` exhaustive-deps，plan Non-Goals 明确保留）。
- 2026-09-09 全链复核（Phase 1 修改后）：`npm run type-check && npm run build && npm run lint && npm run test:run` 全部 exit 0（build 647 pages；test 4/4，`src/utils/config.test.ts`）。
- 2026-09-09 Phase 2 Proof（绿树）：`npm run verify` exit 0 —— 脚本输出 `==> [verify] type-check: PASS` / `==> [verify] lint: PASS` / `==> [verify] test:run: PASS` / `verify: PASS（type-check / lint / test:run 全绿）`。
- 2026-09-09 Phase 2 Proof（破坏性注入）：临时新建 `src/__verify_probe__.ts`（含 `no-explicit-any` 违规）→ `npm run verify` exit 1，输出 `<== [verify] lint: FAIL (exit 1)` + `verify: FAIL（存在未通过的防线）`；删除探针还原后 `npm run verify` exit 0。
- 2026-09-09 全链复核（Phase 2 完成后最终树）：`npm run type-check` exit 0；`npm run build` exit 0（647 pages）；`npm run lint` exit 0（0 errors, 1 warning）；`npm run test:run` exit 0（Test Files 1 passed, Tests 4 passed）。
- pass test 2026-09-09-012601-mission-driver exit=0

## Closure

- dispatch audit #audit-2026-09-09-012601-mission-driver-2026-09-09-0127-1-wi1-red-light-zero-verify-skeleton-1-3de191bb to ses_auditor_opencode models={exec:opencode,aud:opencode}
- accepted #audit-2026-09-09-012601-mission-driver-2026-09-09-0127-1-wi1-red-light-zero-verify-skeleton-1-3de191bb：审计通过——20/20 计数域全勾且修复已落地实树（MermaidDiagram getThemeConfig 显式返回 `MermaidConfig`；SearchIsland/rss.xml/config 类型修复；eslint ignores `.astro` + `src/env.d.ts` 文件级 triple-slash 豁免；`scripts/verify.sh` + `npm run verify` 接线）；闭审实测干净树 `npm run verify` exit=0（type-check / lint / test:run 4/4 全绿），known-good-baselines 2026-09-09 行与 `docs/logs/2026/09-09.md` 已同步，红灯行不再列为 Known Failures。
