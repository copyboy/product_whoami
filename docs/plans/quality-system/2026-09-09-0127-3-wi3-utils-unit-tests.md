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

- [x] Add：`content.ts` 用例 —— 依导出函数逐一覆盖正常路径与边界（空集合、缺失/非法 slug、draft 文章过滤、标签/分类聚合的边界）；用例编写前先读码列出每个函数的行为契约（含错误路径），契约清单记入测试文件头部注释或 plan 备忘（实际读码盘点：content.ts 仅 `getHeadings` + `calculateReadingTime`，无 draft/标签聚合函数，契约清单见 Verification 备忘）
      - Skill: none
- [x] Add：`seo.ts` 用例 —— 正常路径 + 边界（空标题/描述、超长截断、可选字段缺省时的默认值）（实际读码盘点：seo.ts 仅 `generateBreadcrumbSchema`，按其真实契约覆盖空数组/空字符串/特殊字符）
      - Skill: none
- [x] Proof：`npm run test:run` exit 0（新旧用例全绿）；新增用例数记录在案（累计口径，Phase 2 汇总）（2026-09-09 实测 exit 0，Phase 1 新增 27：content 22 + seo 5）
      - Skill: none

Exit Criteria:

- [x] content.ts / seo.ts 每个导出函数至少 1 条正常路径 + 已识别边界各有断言；无测试仅因「难以构造输入」而跳过（跳过需记录原因）（两模块全部导出函数均覆盖，无跳过）
- [x] No owner-doc update required

## Phase 2 — web3Concepts.ts + web3Roadmap.ts 单测

Targets: `src/utils/web3Concepts.test.ts`（新建）, `src/utils/web3Roadmap.test.ts`（新建）
Skill: none
Prereqs: Phase 1

- Item Types: Add-heavy

- [x] Add：`web3Concepts.ts` 用例 —— 概念元数据查询函数正常路径 + 边界（未知 slug 返回值、空输入）；数据不变量（如所有注册概念的关键字段非空）抽查
      - Skill: none
- [x] Add：`web3Roadmap.ts` 用例 —— 路线图数据不变量（5 阶段、每阶段条目结构与 roadmap 文档一致）+ 查询/过滤函数正常路径与边界（阶段号越界、空集合、完成状态统计口径）
      - Skill: none
- [x] Proof：`npm run test:run` exit 0；新增用例总数 ≥ 20（roadmap 完成定义口径），实际数字记入 Verification 证据（2026-09-09 实测 exit 0，累计新增 57：content 22 + seo 5 + web3Concepts 12 + web3Roadmap 18；type-check 同跑 exit 0）
      - Skill: none

Exit Criteria:

- [x] 四个目标模块全部有 colocated 测试文件且全绿；新增用例 ≥ 20（57 ≥ 20）
- [x] No owner-doc update required

## Phase 3 — 基线收口

Targets: `docs/testing/known-good-baselines.md`, `docs/logs/`
Skill: none
Prereqs: Phase 1 + Phase 2

- Item Types: Proof

- [x] Proof：`npm run verify` exit 0（确认 L1+L2 聚合门在测试增量后仍绿；若 WI2 已并入内容检查则一并覆盖）（2026-09-09 实测 exit 0：type-check → lint → test:run → build → content-checks 全绿，content-checks 0 findings）
      - Skill: none
- [x] Proof：`docs/testing/known-good-baselines.md` 新增 passed 行（test:run 含新用例数）；`docs/logs/` 聚合日志条目（已新增 2026-09-09 WI3 行，13 files / 120 tests；`docs/logs/2026/09-09.md` 增 WI3 条目）
      - Skill: none

Exit Criteria:

- [x] known-good-baselines 记录新基线；`docs/logs/` 已更新
- [x] roadmap WI3 完成定义逐条核对：test:run 全绿 ∧ 新增用例 ≥ 20 ∧ verify exit 0（120/120 全绿 ∧ 57 ≥ 20 ∧ verify exit 0）

## Draft Review Record

- dispatch review #review-2026-09-09-012601-mission-driver-2026-09-09-0127-3-wi3-utils-unit-tests-1-c1711336 to ses_reviewer_1
- 2026-09-09：iteration 1，共识 acceptable #review-2026-09-09-012601-mission-driver-2026-09-09-0127-3-wi3-utils-unit-tests-1-c1711336

## Verification

2026-09-09 实测（local，dirty tree：4 个新建测试文件 + 本计划 docs 更新）：

- pass test 2026-09-09-012601-mission-driver exit=0
- `npm run test:run` exit 0 —— 13 files / 120 tests 全绿。新增 57 用例（≥ 20 完成定义口径）：`content.test.ts` 22、`seo.test.ts` 5、`web3Concepts.test.ts` 12、`web3Roadmap.test.ts` 18（config.test.ts 4 + WI2 的 scripts/checks 59 为存量）。
- `npm run type-check` exit 0（web3Roadmap.test.ts 引入 `../data/web3-roadmap-data.json` JSON import，resolveJsonModule 经 astro strict tsconfig 生效）。
- `npm run verify` exit 0 —— type-check → lint → test:run → build（647 pages）→ content-checks（0 findings）全绿；lint 0 errors，存量 1 个 non-blocking warning（`SearchIsland.tsx:257` exhaustive-deps，WI1 已记录，范围外）。
- 基线联动：`docs/testing/known-good-baselines.md` 新增 2026-09-09 WI3 passed 行；`docs/logs/2026/09-09.md` 新增 WI3 条目。

### 契约清单备忘（读码盘点口径）

执行时读码修正 plan 假设：`content.ts` 实际仅导出 `getHeadings`（async）与 `calculateReadingTime`；`seo.ts` 仅导出 `generateBreadcrumbSchema`。无 draft 过滤、标签/分类聚合函数（该职责在 content collections 查询层，不在 utils）。按真实契约覆盖：

- `getHeadings(content)`：空串/无标题 → `[]`；depth 映射 1-6；7 个 `#` 或无空格不匹配；slug 规则（小写、空格/下划线 → 连字符、剔除特殊字符、中文保留）；emoji 开头文本 → slug 加 `-` 前缀（Astro 对齐）；纯特殊字符 → `heading-{depth}-{index}` fallback；文本 trim。
- `calculateReadingTime(content, wpm=200)`：`ceil(words/wpm)`、`"N min read"`；剔除围栏码块/行内码、链接保文字去 URL；空串 → `"1 min read"`（split 语义下限）；自定义 wpm 生效。
- `generateBreadcrumbSchema(items)`：固定 `@context`/`@type`；1-based position 顺序映射；空数组 → 空列表；空字符串字段保留；JSON round-trip 安全。
- `getConceptMeta(slug)`：slug 先 `toLowerCase` 再查表（未知/空 slug → `undefined`，大小写不敏感，中文键支持）；`getPhaseColor`：1-5 映射调色板，越界/0/undefined → `'indigo'`；数据不变量：键全小写、name/nameEn 非空、phaseId ∈ [0,5]。
- `web3Roadmap.ts`：`getStatusEmoji`/`getStatusLabel` 四态映射；`getPhaseProgress` = round(done/total×100)（含 0/50/33/100 口径）；`getCurrentPhase` 优先含 learning 的阶段、否则首个含非 done 的阶段、全完成/空数组 → `undefined`；`getCompletedMilestones` 跨阶段按序扁平化 done；数据不变量：恰 5 阶段（id 1-5，subtitle Bitcoin/Ethereum/DApp/DeFi/DAO 与 roadmap 文档一致）、每阶段文案字段非空 + scenarios 非空 + 恰 4 里程碑、done 里程碑必有 articleSlug、里程碑 id 阶段内唯一、数据全阶段进度 100%。

### 记录的观察（不修复，Non-Goals 口径）

1. `getPhaseProgress(空 milestones)` 返回 `NaN`（0/0）。用例 `toBeNaN()` 锁定现行为并注明；如需修复另立 Defect 条目。
2. `calculateReadingTime` 的图片 alt 文本会计入字数：link 正则先于 image 正则执行，`![alt](url)` 被 link 规则替换为 `alt`（image 剔除规则实际不可达）。用例按现行为锁定（alt 计入、URL 不计入）。

## Closure

- dispatch audit #audit-2026-09-09-012601-mission-driver-2026-09-09-0127-3-wi3-utils-unit-tests-1-4d7c1b9e to ses_auditor_opencode_2026-09-09 models={exec:opencode,aud:opencode}
- accepted #audit-2026-09-09-012601-mission-driver-2026-09-09-0127-3-wi3-utils-unit-tests-1-4d7c1b9e：审计通过——WI3 四个 colocated 测试文件真实落地且运行时被 vitest 执行（审计员现场重跑 `npm run test:run` exit=0，13 files / 120 tests，新增 57 ≥ 20）；`docs/testing/known-good-baselines.md` WI3 行与 `docs/logs/2026/09-09.md` 条目在库可查；记录的 2 项观察（getPhaseProgress NaN、calculateReadingTime alt 计数）符合 Non-Goals 口径，非隐藏缺陷。

