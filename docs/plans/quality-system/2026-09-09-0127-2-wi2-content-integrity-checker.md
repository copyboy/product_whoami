---
status: active
mission: quality-system
work-item: WI2
group: "2026-09-09-0127"
verify: [test]
---

# 2026-09-09-0127-2-wi2-content-integrity-checker WI2：内容完整性检查器 + verify 接入

> Source: `docs/backlog/quality-system-roadmap.md` Q2 — WI2 内容完整性检查器（L3 内容完整性，本站特色层）
> Related: 依赖 `2026-09-09-0127-1-wi1-red-light-zero-verify-skeleton.md`（verify.sh 骨架）；设计边界见 `docs/design/quality-assurance-architecture.md`

## Current Baseline

2026-09-09 实测：

- 内容源：`src/content/blog/` 与 `src/content/projects/`（MDX），schema 在 `src/content/config.ts`；heroImage、pubDate、tags、description 等字段现有 schema 校验情况以执行时盘点为准（部分约束如 pubDate ≤ 今天、description ≤ 300 目前无机器门）。
- Glossary：`src/components/web3/GlossaryTerm.astro` 内联 `definitions: Record<string, string>` 词典（30+ 词条）；当前唯一使用方 `src/pages/web3/report.astro`。词典数据不可被 Node 脚本导入（内联在组件里）。
- 产物管线：`astro.config.mjs` 启用 `@astrojs/sitemap` + `astro-robots-txt`；搜索索引 `src/pages/api/search.json.ts`；RSS `src/pages/api/rss.xml.ts`。构建产物 sitemap/search-index/RSS 的对账目前无任何检查。
- 检查器基础设施：`scripts/verify.sh` 存在（WI1 产物，当前 = type-check + lint + test:run）；`scripts/checks/` 不存在。
- vitest 3.2.2，include 仅 `src/**/*.{test,spec}.{js,ts,jsx,tsx}`（`vitest.config.ts:11`）—— `scripts/` 下的测试默认不被收集。
- 依赖中无 frontmatter/markdown 解析库（无 gray-matter、unified）。

## Goals

- 新建内容扫描脚本（Node，`scripts/checks/`），覆盖 roadmap (a)–(e) 五类检查，解析逻辑可被 vitest 单测。
- 全部检查接入 `scripts/verify.sh`；`npm run verify` 在真实内容树上 exit 0。
- 验收证据：测试 fixture 注入一个死链与一个悬空 Glossary 引用，检查器必须失败且错误信息指到文件与行号。

## Non-Goals

- 不做外链可达性检查（设计文档 §5 边界，属 CI 边界外；远程图片仅做 http 200 或白名单跳过）。
- 不改写任何现有博客/项目内容来「绕过」检查——发现的真实存量问题按检查器报告修复或逐条记录处置。
- 不实现自动修复（check-only，不引入 fix 模式）。
- 不动 CI（WI4 范围）。

## Task Route

- Type: `implementation-only change`（新增检查工具 + 接线 + 少量结构重构）
- Owner Docs: `docs/backlog/quality-system-roadmap.md`（WI2 完成定义）、`docs/design/quality-assurance-architecture.md`
- Skill Selection Basis: 脚本 + 单测，无可复用 skill，Skill: none

## Infrastructure And Config Prereqs

- 无外部服务依赖；远程图片检查需要网络（http HEAD/GET 200），离线时白名单跳过策略必须可用（Decision 见 Phase 1）。
- `npm run verify` 接入产物对账后依赖 `astro build` 产物（dist/、sitemap-index.xml、search 索引、rss.xml）。

## Phase 1 — 检查器骨架 + 内链与图片检查（a/b）

Targets: `scripts/checks/`（新建）, `vitest.config.ts`
Skill: none
Prereqs: `2026-09-09-0127-1-wi1-red-light-zero-verify-skeleton.md` 完成（verify.sh 存在）

- Item Types: `Add` 为主（5 项：3 Add / 1 Decision / 1 Proof）

- [x] Add：`scripts/checks/` 检查器骨架 —— 解析/校验逻辑导出为纯函数（可被 vitest 直接单测），CLI 入口聚合执行：收集 `src/content/**/*.mdx`、`src/pages/**/*.astro`，逐规则检查，错误输出统一 `文件路径:行号: 规则: 消息` 格式，存在 finding 时进程非零退出
      - Skill: none
- [x] Add (a) 内链检查：MDX/astro 中相对 href 目标必须存在；含 anchor 时对目标页 slug/标题做校验（锚点不存在即 finding）
      - Skill: none
- [x] Add (b) 图片存在性：frontmatter `heroImage` 与正文图片引用可解析 —— 本地路径必须存在；远程 URL 允许 http 200，或经显式白名单跳过（白名单文件化并入库，避免静默放过）
      - Skill: none
- [x] Decision：两处选型各记录一次 rationale —— (1) frontmatter 解析策略：新增 `gray-matter` devDependency vs 自写 YAML 子集解析器（自写残余风险：YAML 边界用例误报/漏报）；(2) vitest include 扩展为同时收集 `scripts/checks/**` 测试（roadmap 要求单测解析逻辑；备选的独立测试跑法被拒，增加维护面）
      - Skill: none
- [x] Proof：`scripts/checks/` 纯函数单测（vitest 收集通过）：fixture 目录内构造合法/非法内链与图片引用，断言 finding 的文件与行号输出正确；`npm run test:run` exit 0
      - Skill: none

Exit Criteria:

- [x] (a)(b) 两类检查在 fixture 上能精确报文件+行号并使进程非零退出；在真实内容树上运行无未处置 finding
- [x] No owner-doc update required（工具新增，不改内容契约；白名单文件 README 级说明随代码入库）

## Phase 2 — frontmatter 强化 + Glossary 闭合（c/d）

Targets: `scripts/checks/`, `src/components/web3/GlossaryTerm.astro`, `src/data/`（新增 glossary 数据模块）
Skill: none
Prereqs: Phase 1（骨架与解析能力就绪）

- Item Types: `Add` 与 `Proof` 混合（3 项：1 Add / 1 Add|Decision / 1 Proof）

- [x] Add (c) frontmatter 强化：每篇 blog/projects 文章校验 `pubDate ≤ 今天`、`tags` 非空、`description` 非空且 ≤ 300 字符
      - Skill: none
- [x] Add|Decision (d) Glossary 闭合：把 `GlossaryTerm.astro` 内联词典抽取为可导入数据模块（如 `src/data/glossary.ts`），组件改为 import（渲染输出必须逐字节不变——Proof：构建后 report.astro 渲染产物对比或等价断言）；检查器校验所有 `<GlossaryTerm term="x">` 的 x 都在词典注册。Decision：抽取模块的路径与导出形态（默认导出 Record vs 具名导出），记录理由；备选「脚本用正则从 .astro 里抠词典」被拒（脆弱）
      - Skill: none
- [x] Proof：(c)(d) 单测覆盖正常与违规 fixture（未来 pubDate、空 tags、301 字符 description、悬空 term）；悬空 Glossary 引用的报错含文件与行号
      - Skill: none

Exit Criteria:

- [x] (c)(d) 两类检查生效：fixture 违规必报错（文件+行号），真实内容树 exit 0（存量违规如有，逐条修复或在本计划记录处置，不留模糊态）
- [x] `GlossaryTerm.astro` 重构后渲染行为不变（build 成功 + report 页视觉/产物断言通过）
- [x] No owner-doc update required

## Phase 3 — 产物对账（e）+ verify 接入 + 验收证据

Targets: `scripts/checks/`, `scripts/verify.sh`
Skill: none
Prereqs: Phase 1 + Phase 2；`astro build` 可产出完整产物

- Item Types: `Add` 与 `Proof` 混合（6 项：2 Add / 1 Decision / 3 Proof）

- [x] Add (e) 产物对账：build 后校验 (1) sitemap URL 数与实际页面数一致；(2) search-index 覆盖所有非 draft 文章；(3) RSS 含最新文章。对账逻辑同样导出纯函数 + 单测
      - Skill: none
- [x] Decision：verify.sh 接入顺序 —— `npm run verify` = type-check + lint + test:run + `astro build` + 内容检查（含产物对账）。理由：roadmap 总验收是 verify 一条命令 exit 0，(e) 必须依赖 build 产物，build 放进 verify 才能自洽；备选「verify 不含 build、(e) 移到 CI」被拒（违背总验收定义）。残余风险：verify 运行时间变长（563 页构建），可接受
      - Skill: none
- [x] Add：内容检查步骤（含 build + 对账）接入 `scripts/verify.sh`，失败即 verify 非零退出
      - Skill: none
- [x] Proof（roadmap 指定验收证据）：测试 fixture 注入一个死链与一个悬空 Glossary 引用 —— 检查器（或 verify）必须失败，错误信息指到文件与行号；两次失败输出原文摘录记入本计划 Verification 证据，随后 fixture 还原
      - Skill: none
- [x] Proof：真实内容树上 `npm run verify` exit=0；`npm run test:run` exit=0（新增 checker 单测全绿）
      - Skill: none
- [x] Proof：`docs/testing/known-good-baselines.md` 新增 verify（含内容检查）passed 行；`docs/logs/` 聚合日志条目
      - Skill: none

Exit Criteria:

- [x] `npm run verify` 一条命令覆盖 L1+L2+L3 并在真实树上 exit 0；fixture 注入缺陷时精确报错（文件+行号）且非零退出（证据入 Verification）
- [x] known-good-baselines 与 `docs/logs/` 已更新

## Draft Review Record

- dispatch review #review-2026-09-09-012601-mission-driver-2026-09-09-0127-2-wi2-content-integrity-checker-1-76293acb to opencode-glm-reviewer
- 2026-09-09：iteration 1，共识 acceptable-after-fixes #review-2026-09-09-012601-mission-driver-2026-09-09-0127-2-wi2-content-integrity-checker-1-76293acb

## Verification

2026-09-09 实测（真实内容树，工作区含本计划全部改动）：

- pass test 2026-09-09-012601-mission-driver exit=0
- pass test 2026-09-09-012601-mission-driver-verify exit=0
- `npm run type-check` exit 0
- `npm run lint` exit 0（0 errors；保留 1 条非阻断 warning `react-hooks/exhaustive-deps` @ `SearchIsland.tsx:257`，WI1 既定范围外）
- `npm run test:run` exit 0（9 files / 63 tests，含 scripts/checks 新增 59 个断言用例）
- `npm run build` exit 0（647 pages）
- `npm run verify` exit 0（type-check → lint → test:run → build → content-checks 全绿；content-checks = 0 findings，远程图片 24 条全部白名单化，verify 不依赖网络）
- 产物对账真实值：sitemap 646 locs == dist 646 个 `**/index.html`；search.json 75 slugs == 非草稿文章 75 篇；rss.xml 含最新 3 篇

Roadmap 指定验收证据（fixture 注入 → 检查器必须失败且指到文件与行号 → 还原）：

注入 `src/content/blog/__wi2-acceptance-fixture.mdx`（正文含一个死链 + 一个悬空 Glossary 引用，pubDate 取历史日期避免误报噪声），运行 `node scripts/checks/run-content-checks.ts --skip-remote-fetch`：

```
$ node scripts/checks/run-content-checks.ts --skip-remote-fetch
dist/api/search.json:1: artifacts/search-index-missing-posts: search-index 缺少 1 篇非草稿文章: __wi2-acceptance-fixture
src/content/blog/__wi2-acceptance-fixture.mdx:9: links/dead-internal: 内链目标不存在: /blog/does-not-exist-wi2-acceptance
src/content/blog/__wi2-acceptance-fixture.mdx:11: glossary/dangling-term: <GlossaryTerm term="不存在的术语WI2验收"> 未在 src/data/glossary.ts 词典注册
content-checks: FAIL（3 findings）
injected run exit code: 1
```

fixture 还原（删除）后重跑：exit 0（0 findings）。死链与悬空 Glossary 引用均精确报出文件与行号，退出码非零 ✓。

GlossaryTerm 抽取渲染等价 Proof（Phase 2）：

- 仅还原 `GlossaryTerm.astro` 至内联词典版本（其余 Phase 1 改动保留）重建 → 保存 `dist/web3/report/index.html` → 恢复抽取版重建 → 对比：
- report 页非 `<style>` 标记逐字节一致（True）；glossary span 标签 16 个逐字节一致；`data-definition` 属性逐字节一致；glossary CSS 规则集合一致（7 条）
- 唯一差异：内联 `<style>` 块内 CSS 规则顺序变化（glossary 规则组与 scrollbar 规则组换序，选择器集合不相交，无级联行为影响）
- 等价断言：`scripts/checks/lib/rules-glossary.test.ts` 对 `src/data/glossary.ts` 做规范化 JSON sha256 校验，与抽取前内联词典 hash 一致（`be0eb32d…8559`），88 键无重复

存量违规处置记录（不留模糊态）：

- (a) 内链/锚点存量 4 处，已修复：`src/pages/404.astro` 3 个指向不存在标签页的死链（`/tags/javascript`、`/tags/css`、`/tags/web-development`，仓库内容中无对应标签）改为真实存在的标签路由（bitcoin / ethereum / react / web3）；同文件 skip-link 指向的 `#main-content` 锚点全站无定义，在 `src/layouts/ThreeColumnLayout.astro` 的 `<main>` 上补 `id="main-content"`（渲染语义最小增量）
- (c) description 超 300 字符存量 14 篇（303–609 字符），已逐篇在句号边界截短至 ≤300（`dao-case-studies` 532→233、`dao-governance-voting` 391→86、`defi-aggregators-yield` 521→100、`defi-lending-protocols` 543→116、`deploy-to-testnet` 348→279、`ethereum-layer2-rollups` 479→254、`first-full-dapp` 609→287、`flash-loans-arbitrage` 532→114、`multisig-permission-management` 468→268、`solidity-basics-notes` 303→281、`stablecoins-explained` 419→259、`tokenomics-design` 423→249、`uniswap-amm-explained` 497→112、`wallets-and-account-abstraction` 462→299）
- (b) 远程图片存量 24 条（unsplash/pexels 封面）登记入 `scripts/checks/remote-image-allowlist.json`（含出处文章），verify 离线安全

Decision 记录（补充 Phase 1/2 计划项）：

- frontmatter 解析：自写 YAML 子集解析器（`scripts/checks/lib/frontmatter.ts`，标量/引号/流式数组/行内注释/键行号，单测覆盖），拒绝 `gray-matter` 新依赖。理由：本仓库 frontmatter 为受控简单子集，零供应链面；残余风险（YAML 边界误报/漏报）由单测 + 真实树 verify 兜底
- vitest include：扩展为 `src/**` + `scripts/checks/**` 同池收集（`vitest.config.ts`），拒绝独立测试跑法。理由：roadmap 要求单测解析逻辑，一套跑法最小维护面
- Glossary 导出形态：`src/data/glossary.ts` 具名导出 `glossaryDefinitions: Record<string, string>`，拒绝默认导出。理由：导入点见名知义；为后续派生导出（如 term 列表 helper）留扩展位且不产生默认导出歧义；组件与检查器引用同一数据源
- verify 顺序（Phase 3 Decision 项）：`npm run verify` = type-check + lint + test:run + `astro build` + content-checks（含产物对账）。理由：roadmap 总验收是 verify 一条命令 exit 0，(e) 依赖 build 产物，build 必须在 verify 内才自洽；「verify 不含 build、(e) 移 CI」被拒。残余风险：verify 运行时间变长（647 页构建 ≈ 31s），可接受
- 运行时选型：检查器 CLI 以 Node ≥ 22.18 原生 TS 类型剥离直接运行（本机 v22.22.2），零构建步骤、零新运行时依赖；tsconfig 增 `allowImportingTsExtensions`（noEmit 下合法）+ 显式 `@types/node` devDependency

Notes: 关键字 `gitnexus_impact`/`gitnexus_detect_changes` 要求的 MCP 工具在本执行会话不可用；本计划改动以新增 `scripts/checks/` 工具文件为主，存量符号级改动为 `GlossaryTerm.astro`（数据外移，渲染等价已证）、`vitest.config.ts` include、`tsconfig.json` include、`scripts/verify.sh` 步骤、`404.astro` 链接修复、`ThreeColumnLayout.astro` id 增补、14 篇 description 截短；`GlossaryTerm` 唯一使用方为 `src/pages/web3/report.astro`（grep 全库确认），影响半径已人工收敛。提交后需 `npx gitnexus analyze` 刷新索引。

## Closure

- dispatch audit #audit-2026-09-09-012601-mission-driver-2026-09-09-0127-2-wi2-content-integrity-checker-1-53229922 to ses_opencode_auditor models={exec:opencode/glm-5.3,aud:opencode/glm-5.3}
- accepted #audit-2026-09-09-012601-mission-driver-2026-09-09-0127-2-wi2-content-integrity-checker-1-53229922：独立闭环审计通过（单模型 GLM-5.3 声明性降级）：21/21 计数域条目全部 [x] 且实测落地——`scripts/checks/` 检查器（lib 纯函数 + 单测 + CLI + 24 条远程图片白名单 + test-fixtures）、`scripts/verify.sh` 已接入 content-checks、`src/data/glossary.ts` 抽取且 `GlossaryTerm.astro` import 已核、存量修复（404 死链 / 布局锚点 / 14 篇 description ≤300）与 `docs/logs/2026/09-09.md`、`docs/testing/known-good-baselines.md` 同步；审计会话本机重跑 `npm run verify` exit=0（type-check / lint / test:run 9 files 63 tests / build 647 页 / content-checks 0 条异常 全绿），frontmatter verify 键 `test` 已有 pass 行，无未处置 Deferred 项。结论：approved
