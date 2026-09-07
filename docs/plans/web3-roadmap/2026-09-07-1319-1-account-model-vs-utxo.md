---
status: active
mission: web3-roadmap
work-item: M2-WI1
group: "2026-09-07-1319"
verify: [test, build]
---

# 2026-09-07-1319-1-account-model-vs-utxo 文章「账户模型 vs UTXO」

> Source: docs/backlog/web3-roadmap.md M2/WI1（文章「账户模型 vs UTXO」，对应 web3-roadmap-data.json M2.1）
> Related: 2026-09-07-1319-2-evm-deep-dive（依赖本计划：WI2 依赖 WI1，且其「相关文章」内链本篇 slug）

## Current Baseline

- 目标输出文件 `src/content/blog/account-model-vs-utxo.mdx` 不存在；`src/content/blog/` 现有 56 篇 MDX 文章（另有 2 个 `.mdx.backup` 文件），其中 Web3 系列已发布 4 篇 Bitcoin 文章：`utxo-model-deep-dive`、`pow-consensus`、`bitcoin-whitepaper-deep-dive`、`bitcoin-network-in-practice`。
- `src/data/web3-roadmap-data.json` 阶段 2（id 2）M2.1 为 `status: "todo"`、`articleSlug: null`（M2.2-M2.4 同为 todo）；阶段 1 M1.1-M1.4 全部 done 并带 articleSlug。
- `docs/backlog/web3-roadmap.md` Work Item Status 表 M2/WI1 行 Status 为 `todo`。
- 术语词典 `src/components/web3/GlossaryTerm.astro` 已有 `UTXO`、`Ethereum`、`Bitcoin`、`智能合约`、`共识机制`、`EVM`、`Gas`、`PoS` 等 key；**没有** `账户模型`、`Nonce` 词条。
- 镜像文章 `src/content/blog/utxo-model-deep-dive.mdx`（175 行）确立本系列的写作模式：frontmatter（title/description/pubDate/heroImage Unsplash 带 `?w=1200&h=630&fit=crop`/tags/categories `["Web3"]`/subject/location）+ `import Highlight from '@components/web3/Highlight.astro'` + ASCII 代码块图示 + `<Highlight>` 提示框 + 文末总结。该文对比维度：记账方式（余额 vs 现金找零）、双花防护、隐私（地址复用）、确定性、简单性——本篇需沿用其维度并扩展「并行性、合约适配性」。
- `src/components/web3/Highlight.astro` 仅支持 `info | warning | success | danger` 四种 type（源码 Props 定义）；`GlossaryTerm` 未命中 key 时静默回退到通用文案，因此引用前必须人工核对 key 存在且大小写一致。
- 已发布可内链 slug 仅上述 4 篇；`account-model-vs-utxo` 自身及 `evm-deep-dive` 等后续文章尚未发布，文末「相关文章」不得引用未来 slug。
- 验证基线（docs/testing/known-good-baselines.md，2026-09-07 @ `cbf6d45`）：`npm run build` exit 0（563 pages）、`npm run test:run` exit 0（4/4）；`npm run type-check`（TS2345 `MermaidDiagram.tsx:122`）与 `npm run lint`（14 存量错误）为已知存量失败，不在本 mission 通过门内。
- `AGENTS.md` 路线图表阶段 2 状态为 0/4——按全局写作规范仅在阶段全部完成（M2.4/WI4）时更新，本计划不改。

## Goals

- 发布文章 `account-model-vs-utxo`：与 `utxo-model-deep-dive` 形成镜像对照——以太坊全局账户状态（余额 + nonce）vs 比特币 UTXO 集合；nonce 防重放的作用（UTXO 天然防双花，账户模型靠 nonce）；对比表沿用前文维度并扩展并行性、合约适配性；结尾以「状态由谁来执行」过渡引出 EVM。
- 词典新增 `账户模型`、`Nonce` 词条，并在文中通过 `<GlossaryTerm>` 使用。
- 数据联动：M2.1 置 `done` + `articleSlug: "account-model-vs-utxo"`；roadmap M2/WI1 行置 `done`；`docs/logs/2026/` 当日日志记录条目。
- 验证门通过：`npm run build` exit 0 且 `dist/blog/account-model-vs-utxo/index.html` 生成；`npm run test:run` exit 0。

## Non-Goals

- 不写 M2.2-M2.4 文章（各自有独立 plan，见 Related）。
- 不更新 `AGENTS.md` 阶段 2 状态列（仅 M2.4/WI4 完成时更新）。
- 不修复 `type-check` / `lint` 存量失败（非本 mission 通过门，已知基线在档）。
- 不修改任何站点代码/组件行为——词典词条是 definitions 对象的数据级追加，不改 `GlossaryTerm.astro` 组件逻辑。

## Task Route

- Type: `implementation-only change`（纯内容新增：一篇 MDX + 词典词条 + 数据联动，无架构/契约变化）
- Owner Docs: `docs/backlog/web3-roadmap.md`（全局写作规范 + WI1 定义）、`docs/testing/known-good-baselines.md`（验证口径与存量失败）
- Skill Selection Basis: 无匹配 skill——技术博客写作由 roadmap 全局写作规范约束；`copywriting` 面向营销/多平台文案，与本任务方法不符。

## Infrastructure And Config Prereqs

- Node 环境且 `node_modules/` 已安装（缺失时先 `npm install`）；无其他 infra 依赖；无数据迁移。

## Phase 1 — 词典与口径准备

Targets: `src/components/web3/GlossaryTerm.astro`（`utxo-model-deep-dive.mdx` 仅作对照参考，只读不改）
Skill: none

- Item Types: `Add | Decision | Proof`
- Prereqs: 无（本 mission 首个执行计划）

- [x] Add: 在 `GlossaryTerm.astro` 的 `definitions` 对象追加两个 key——`账户模型`（以太坊的全局状态记账方式：每个地址对应 余额 + nonce（+ 合约代码与存储），转账是状态改写而非 UTXO 的销毁+创造）与 `Nonce`（账户已发起交易的计数器，账户模型下防重放/防双花的核心机制，UTXO 模型天然不需要）。词条文案与本系列既有词条风格一致（一句话定义 + 与对照概念的差异）。
- [x] Decision: 对比表维度选择——沿用 `utxo-model-deep-dive` 已有维度（记账单位、双花防护、隐私）并按 roadmap WI1 定义扩展「并行性、合约适配性」两维。备选：另起全新维度表——否决，会割裂与前文的镜像对照关系。残余风险：无。将结论写入文章对比表。
- [x] Proof: `grep -n "账户模型\|Nonce" src/components/web3/GlossaryTerm.astro` 打印两个新 key 的定义行；重读 `utxo-model-deep-dive.mdx` 对比章节确认沿用维度清单与 Decision 一致。

Exit Criteria:

- [x] 词典含 `账户模型`、`Nonce` 两个 key，先于文章使用落地（全局规范：新概念先加词条再使用）。
- [x] 对比表维度 Decision 记录在案（沿用 + 扩展两维）。

## Phase 2 — 文章写作

Targets: `src/content/blog/account-model-vs-utxo.mdx`
Skill: none

- Item Types: `Add | Decision | Proof`
- Prereqs: Phase 1（词条已存在，`GlossaryTerm` 才可引用）

- [x] Add: 创建 `src/content/blog/account-model-vs-utxo.mdx`，frontmatter 满足全局写作规范：`categories: ["Web3"]`、`subject: "Ethereum"`、`tags: ["Web3", "区块链入门", "Ethereum", "账户模型"]`、`pubDate` 为执行当天日期、`description` 一段摘要；`heroImage` 为 Unsplash 图（`?w=1200&h=630&fit=crop` 后缀）。
- [x] Decision: heroImage 选图——必须与现有全部文章不重复。执行时 `grep -h "heroImage" src/content/blog/*.mdx` 比对候选 URL 唯一后选定；备选图像主题（账本/对比/双列视觉）任选，唯一性是硬约束。残余风险：无（唯一性可机械复查）。
- [x] Add: 正文 150-250 行，结构遵守全局规范：引言（衔接 Bitcoin 阶段收尾，提出「以太坊换了一种记账方式」）→ 账户模型机制分节（全局状态、余额 + nonce，用 ASCII text 代码块画账户状态示意）→ nonce 防重放 vs UTXO 天然防双花（对照讲解，含一笔具体转账的两边视角例子）→ 对比表（Phase 1 Decision 的维度）→ 总结：完成阶段内过渡，以「状态由谁来执行」引出 EVM。
- [x] Add: 组件使用合规——按系列既有文章惯例导入（`import Highlight from '@components/web3/Highlight.astro'`、`import GlossaryTerm from '@components/web3/GlossaryTerm.astro'`）；`<Highlight type="info|warning|success|danger">` 仅这四种；`<GlossaryTerm term="...">` 仅引用词典已有 key（含 Phase 1 新增）；Astro 组件上禁止 `client:` 指令；图示全部用 ASCII 代码块（本站 mermaid 块只渲染静态代码）。数字不确定处用「量级/约」表述，不编造精确值。
- [x] Add: 文末「相关文章」内链仅引用已发布 4 篇 Bitcoin 文章真实 slug（`utxo-model-deep-dive` 至少含其一——本篇是其镜像对照）。
- [x] Proof: `wc -l src/content/blog/account-model-vs-utxo.mdx` 打印值在 150-250；对文中每个 `GlossaryTerm term="X"`，`grep` 确认 X 在 `GlossaryTerm.astro` definitions 中存在且大小写一致；heroImage 唯一性复查通过。

Exit Criteria:

- [x] 文章文件存在，frontmatter 全字段合规，行数 150-250。
- [x] 结构完整（引言/机制/对比表/总结过渡），对比表覆盖 Decision 维度。
- [x] 组件与内链合规：Highlight 四型之内、GlossaryTerm key 全部命中、相关文章 slug 全部真实存在。
- [x] heroImage 全库唯一。

## Phase 3 — 数据联动与验证

Targets: `src/data/web3-roadmap-data.json`, `docs/backlog/web3-roadmap.md`, `docs/logs/2026/`
Skill: none

- Item Types: `Add | Proof`
- Prereqs: Phase 2（文章已落地才置 done）

- [x] Add: `web3-roadmap-data.json` 阶段 2 的 M2.1 `status: "todo"` → `"done"`、`articleSlug: null` → `"account-model-vs-utxo"`；M2.2-M2.4 保持不动。
- [x] Add: `docs/backlog/web3-roadmap.md` Work Item Status 表 M2/WI1 行 Status `todo` → `done`。
- [x] Add: `docs/logs/2026/` 当日日志记录条目（当日文件已存在则追加 `### <日期> (M2/WI1)` 小节，不存在则按 `docs/logs/00-log-writing-guide.md` 约定新建当日文件）。
- [x] Proof: `npm run test:run` exit 0。
- [x] Proof: `npm run build` exit 0 且 `test -f dist/blog/account-model-vs-utxo/index.html` 为真（新文章路由生成）。

Exit Criteria:

- [x] M2.1 done + articleSlug 指向真实存在的文章 slug；roadmap WI 行 done；日志条目在档。
- [x] `npm run test:run` 与 `npm run build` 均 exit 0，`dist/blog/account-model-vs-utxo/index.html` 存在。
- [x] `docs/logs/` 更新（本计划闭环条目）。
- [x] 无 owner-doc 之外的文档更新需求——roadmap 数据文件与 roadmap 本身即 owner doc，已在上述条目覆盖。

## Draft Review Record

- dispatch review #review-2026-09-07-131958-mission-driver-2026-09-07-1319-1-account-model-vs-utxo-1-c6e74c3e to ses_opencode_glm53
- 2026-09-07：iteration 1，共识 acceptable-after-fixes #review-2026-09-07-131958-mission-driver-2026-09-07-1319-1-account-model-vs-utxo-1-c6e74c3e

## Verification

- pass test 2026-09-07-131958-mission-driver exit=0
- pass build 2026-09-07-131958-mission-driver exit=0
- pass test 2026-09-07-131958-mission-driver-verify2 exit=0
- pass build 2026-09-07-131958-mission-driver-verify2 exit=0

## Closure

- dispatch audit #audit-2026-09-07-131958-mission-driver-2026-09-07-1319-1-account-model-vs-utxo-1-f3182b6a to ses_opencode_glm53 models={exec:ses_opencode_glm53,aud:ses_opencode_glm53}
- accepted #audit-2026-09-07-131958-mission-driver-2026-09-07-1319-1-account-model-vs-utxo-1-f3182b6a：审计通过——文章落地且合规（208 行、frontmatter 全字段合规、heroImage photo-1554224155-6726b3ff858f 全库唯一 1 hit、6 个 GlossaryTerm key 全命中、Highlight 仅 info/warning/success、无 client: 指令、相关文章 4 slug 真实存在）；词典新增 账户模型/Nonce 两 key；M2.1 done+articleSlug、roadmap M2/WI1 done、logs/2026/09-07.md 条目在档；实测 `npm run test:run` exit=0（4/4）、`npm run build` exit=0（569 pages）且 dist/blog/account-model-vs-utxo/index.html 存在。exec/aud 同会话模型为声明的单模型降级，如实记录。
