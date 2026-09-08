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

- [ ] Add：`scripts/checks/` 检查器骨架 —— 解析/校验逻辑导出为纯函数（可被 vitest 直接单测），CLI 入口聚合执行：收集 `src/content/**/*.mdx`、`src/pages/**/*.astro`，逐规则检查，错误输出统一 `文件路径:行号: 规则: 消息` 格式，存在 finding 时进程非零退出
      - Skill: none
- [ ] Add (a) 内链检查：MDX/astro 中相对 href 目标必须存在；含 anchor 时对目标页 slug/标题做校验（锚点不存在即 finding）
      - Skill: none
- [ ] Add (b) 图片存在性：frontmatter `heroImage` 与正文图片引用可解析 —— 本地路径必须存在；远程 URL 允许 http 200，或经显式白名单跳过（白名单文件化并入库，避免静默放过）
      - Skill: none
- [ ] Decision：两处选型各记录一次 rationale —— (1) frontmatter 解析策略：新增 `gray-matter` devDependency vs 自写 YAML 子集解析器（自写残余风险：YAML 边界用例误报/漏报）；(2) vitest include 扩展为同时收集 `scripts/checks/**` 测试（roadmap 要求单测解析逻辑；备选的独立测试跑法被拒，增加维护面）
      - Skill: none
- [ ] Proof：`scripts/checks/` 纯函数单测（vitest 收集通过）：fixture 目录内构造合法/非法内链与图片引用，断言 finding 的文件与行号输出正确；`npm run test:run` exit 0
      - Skill: none

Exit Criteria:

- [ ] (a)(b) 两类检查在 fixture 上能精确报文件+行号并使进程非零退出；在真实内容树上运行无未处置 finding
- [ ] No owner-doc update required（工具新增，不改内容契约；白名单文件 README 级说明随代码入库）

## Phase 2 — frontmatter 强化 + Glossary 闭合（c/d）

Targets: `scripts/checks/`, `src/components/web3/GlossaryTerm.astro`, `src/data/`（新增 glossary 数据模块）
Skill: none
Prereqs: Phase 1（骨架与解析能力就绪）

- Item Types: `Add` 与 `Proof` 混合（3 项：1 Add / 1 Add|Decision / 1 Proof）

- [ ] Add (c) frontmatter 强化：每篇 blog/projects 文章校验 `pubDate ≤ 今天`、`tags` 非空、`description` 非空且 ≤ 300 字符
      - Skill: none
- [ ] Add|Decision (d) Glossary 闭合：把 `GlossaryTerm.astro` 内联词典抽取为可导入数据模块（如 `src/data/glossary.ts`），组件改为 import（渲染输出必须逐字节不变——Proof：构建后 report.astro 渲染产物对比或等价断言）；检查器校验所有 `<GlossaryTerm term="x">` 的 x 都在词典注册。Decision：抽取模块的路径与导出形态（默认导出 Record vs 具名导出），记录理由；备选「脚本用正则从 .astro 里抠词典」被拒（脆弱）
      - Skill: none
- [ ] Proof：(c)(d) 单测覆盖正常与违规 fixture（未来 pubDate、空 tags、301 字符 description、悬空 term）；悬空 Glossary 引用的报错含文件与行号
      - Skill: none

Exit Criteria:

- [ ] (c)(d) 两类检查生效：fixture 违规必报错（文件+行号），真实内容树 exit 0（存量违规如有，逐条修复或在本计划记录处置，不留模糊态）
- [ ] `GlossaryTerm.astro` 重构后渲染行为不变（build 成功 + report 页视觉/产物断言通过）
- [ ] No owner-doc update required

## Phase 3 — 产物对账（e）+ verify 接入 + 验收证据

Targets: `scripts/checks/`, `scripts/verify.sh`
Skill: none
Prereqs: Phase 1 + Phase 2；`astro build` 可产出完整产物

- Item Types: `Add` 与 `Proof` 混合（6 项：2 Add / 1 Decision / 3 Proof）

- [ ] Add (e) 产物对账：build 后校验 (1) sitemap URL 数与实际页面数一致；(2) search-index 覆盖所有非 draft 文章；(3) RSS 含最新文章。对账逻辑同样导出纯函数 + 单测
      - Skill: none
- [ ] Decision：verify.sh 接入顺序 —— `npm run verify` = type-check + lint + test:run + `astro build` + 内容检查（含产物对账）。理由：roadmap 总验收是 verify 一条命令 exit 0，(e) 必须依赖 build 产物，build 放进 verify 才能自洽；备选「verify 不含 build、(e) 移到 CI」被拒（违背总验收定义）。残余风险：verify 运行时间变长（563 页构建），可接受
      - Skill: none
- [ ] Add：内容检查步骤（含 build + 对账）接入 `scripts/verify.sh`，失败即 verify 非零退出
      - Skill: none
- [ ] Proof（roadmap 指定验收证据）：测试 fixture 注入一个死链与一个悬空 Glossary 引用 —— 检查器（或 verify）必须失败，错误信息指到文件与行号；两次失败输出原文摘录记入本计划 Verification 证据，随后 fixture 还原
      - Skill: none
- [ ] Proof：真实内容树上 `npm run verify` exit=0；`npm run test:run` exit=0（新增 checker 单测全绿）
      - Skill: none
- [ ] Proof：`docs/testing/known-good-baselines.md` 新增 verify（含内容检查）passed 行；`docs/logs/` 聚合日志条目
      - Skill: none

Exit Criteria:

- [ ] `npm run verify` 一条命令覆盖 L1+L2+L3 并在真实树上 exit 0；fixture 注入缺陷时精确报错（文件+行号）且非零退出（证据入 Verification）
- [ ] known-good-baselines 与 `docs/logs/` 已更新

## Draft Review Record

- dispatch review #review-2026-09-09-012601-mission-driver-2026-09-09-0127-2-wi2-content-integrity-checker-1-76293acb to opencode-glm-reviewer
- 2026-09-09：iteration 1，共识 acceptable-after-fixes #review-2026-09-09-012601-mission-driver-2026-09-09-0127-2-wi2-content-integrity-checker-1-76293acb
