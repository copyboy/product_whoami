---
status: active
mission: quality-system
work-item: WI3
group: "2026-09-09-0127"
verify: [test]
---

# 2026-09-09-0127-3-wi3-utils-unit-tests WI3：utils 层单测补齐

> Source: `docs/backlog/quality-system-roadmap.md` Q3 — WI3 utils 层单测补齐（L2 单测防线）
> Related: 依赖 `2026-09-09-0127-1-wi1-red-light-zero-verify-skeleton.md`（verify 基线）；风格基准 `src/utils/config.test.ts`

## Current Baseline

2026-09-09 实测：

- `src/utils/` 五个模块：`config.ts`（唯一已测，colocated `config.test.ts`，4 用例，vitest 全绿）、`content.ts`、`seo.ts`、`web3Concepts.ts`、`web3Roadmap.ts`（均无任何测试）。
- 测试栈：vitest 3.2.2，jsdom environment，include `src/**/*.{test,spec}.{js,ts,jsx,tsx}`（colocated 模式已被 config.test.ts 验证可行）。
- `web3Roadmap.ts` 消费 `src/data/web3-roadmap-data.json`（5 阶段路线图数据）；`web3Concepts.ts` 提供概念元数据；`content.ts`/`seo.ts` 为内容处理与 SEO 元数据纯函数。各函数签名与边界行为（空值、缺失 slug、draft 过滤）以执行时读码盘点为准。
- `npm run test:run` exit 0（4/4）。`verify` 聚合脚本本日尚未存在于 package.json，由上游 WI1（`2026-09-09-0127-1-wi1-red-light-zero-verify-skeleton.md`）引入；其「exit 0」基线以 WI1 落地后实测为准，本计划仅在 Phase 3 消费该门。

## Goals

- 为 `src/utils/web3Roadmap.ts`、`src/utils/web3Concepts.ts`、`src/utils/seo.ts`、`src/utils/content.ts` 补 vitest 用例，colocated 与 config.test.ts 风格一致。
- 纯函数正常路径 + 边界（空值、缺失 slug、draft 文章过滤等），新增用例总数 ≥ 20，只锁行为契约，不追覆盖率数字。
- 完成后 `npm run test:run` 全绿且 `npm run verify` 保持 exit 0。

## Non-Goals

- 不为 `config.ts` 补测（已有 4 用例；如发现明显缺口只记录，不在本计划扩 scope）。
- 不重构被测函数签名以迁就可测性——只在不改变行为的前提下做最小可测性调整；发现真实缺陷时先记录，修复需另立 Defect 条目或扩展本计划 scope（记录 rationale）。
- 不引入测试库新依赖（沿用 vitest 现有能力）。
- 不做组件/页面级测试（本计划只锁 utils 纯函数层）。

## Task Route

- Type: `verification or audit work`（补测试锁行为契约）
- Owner Docs: `docs/backlog/quality-system-roadmap.md`（WI3 完成定义）
- Skill Selection Basis: vitest 单测为既有工程实践，无可复用 skill，Skill: none

## Infrastructure And Config Prereqs

- No infra prereqs beyond existing baseline（colocated 测试已被 vitest include 覆盖，无需配置改动）。

## Phase 1 — content.ts + seo.ts 单测

Targets: `src/utils/content.test.ts`（新建）, `src/utils/seo.test.ts`（新建）
Skill: none
Prereqs: `2026-09-09-0127-1-wi1-red-light-zero-verify-skeleton.md` 完成（verify 基线存在，测试增量被聚合门看住）

- Item Types: Add-heavy

- [ ] Add：`content.ts` 用例 —— 依导出函数逐一覆盖正常路径与边界（空集合、缺失/非法 slug、draft 文章过滤、标签/分类聚合的边界）；用例编写前先读码列出每个函数的行为契约（含错误路径），契约清单记入测试文件头部注释或 plan 备忘
      - Skill: none
- [ ] Add：`seo.ts` 用例 —— 正常路径 + 边界（空标题/描述、超长截断、可选字段缺省时的默认值）
      - Skill: none
- [ ] Proof：`npm run test:run` exit 0（新旧用例全绿）；新增用例数记录在案（累计口径，Phase 2 汇总）
      - Skill: none

Exit Criteria:

- [ ] content.ts / seo.ts 每个导出函数至少 1 条正常路径 + 已识别边界各有断言；无测试仅因「难以构造输入」而跳过（跳过需记录原因）
- [ ] No owner-doc update required

## Phase 2 — web3Concepts.ts + web3Roadmap.ts 单测

Targets: `src/utils/web3Concepts.test.ts`（新建）, `src/utils/web3Roadmap.test.ts`（新建）
Skill: none
Prereqs: Phase 1

- Item Types: Add-heavy

- [ ] Add：`web3Concepts.ts` 用例 —— 概念元数据查询函数正常路径 + 边界（未知 slug 返回值、空输入）；数据不变量（如所有注册概念的关键字段非空）抽查
      - Skill: none
- [ ] Add：`web3Roadmap.ts` 用例 —— 路线图数据不变量（5 阶段、每阶段条目结构与 roadmap 文档一致）+ 查询/过滤函数正常路径与边界（阶段号越界、空集合、完成状态统计口径）
      - Skill: none
- [ ] Proof：`npm run test:run` exit 0；新增用例总数 ≥ 20（roadmap 完成定义口径），实际数字记入 Verification 证据
      - Skill: none

Exit Criteria:

- [ ] 四个目标模块全部有 colocated 测试文件且全绿；新增用例 ≥ 20
- [ ] No owner-doc update required

## Phase 3 — 基线收口

Targets: `docs/testing/known-good-baselines.md`, `docs/logs/`
Skill: none
Prereqs: Phase 1 + Phase 2

- Item Types: Proof

- [ ] Proof：`npm run verify` exit 0（确认 L1+L2 聚合门在测试增量后仍绿；若 WI2 已并入内容检查则一并覆盖）
      - Skill: none
- [ ] Proof：`docs/testing/known-good-baselines.md` 新增 passed 行（test:run 含新用例数）；`docs/logs/` 聚合日志条目
      - Skill: none

Exit Criteria:

- [ ] known-good-baselines 记录新基线；`docs/logs/` 已更新
- [ ] roadmap WI3 完成定义逐条核对：test:run 全绿 ∧ 新增用例 ≥ 20 ∧ verify exit 0

## Draft Review Record

- dispatch review #review-2026-09-09-012601-mission-driver-2026-09-09-0127-3-wi3-utils-unit-tests-1-c1711336 to ses_reviewer_1
- 2026-09-09：iteration 1，共识 acceptable #review-2026-09-09-012601-mission-driver-2026-09-09-0127-3-wi3-utils-unit-tests-1-c1711336

## Verification

## Closure

