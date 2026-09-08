---
status: active
mission: web3-roadmap
work-item: M4-WI9
group: "2026-09-08-0950"
verify: [test, build]
---

# 2026-09-08-0950-1-uniswap-amm-explained 文章「AMM 机制与 Uniswap」

> Source: docs/backlog/web3-roadmap.md M4/WI9（文章「AMM 机制与 Uniswap」，对应 web3-roadmap-data.json M4.1）
> Related: 2026-09-08-0950-2-defi-lending-protocols（依赖本计划：WI10 依赖 WI9，其「相关文章」内链本篇 slug，且本篇结尾「价格有了，借贷呢」是它的引言钩子）

## Current Baseline

- 目标输出文件 `src/content/blog/uniswap-amm-explained.mdx` 不存在；`src/content/blog/` 现有 64 篇 MDX 文章，其中 Web3 系列已发布 12 篇（阶段 1 四篇 + 阶段 2 四篇 + 阶段 3 四篇）：utxo-model-deep-dive、pow-consensus、bitcoin-whitepaper-deep-dive、bitcoin-network-in-practice、account-model-vs-utxo、evm-deep-dive、ethereum-gas-fees、smart-contracts-explained、solidity-basics-notes、hardhat-local-env、deploy-to-testnet、first-full-dapp。
- 阶段 3 收官篇 `first-full-dapp` 结尾已留阶段 4 预告钩子：「从『一个能点的计数器』到『一个能用的交易所』，距离没有想象中远」——本篇引言承接此钩子（价格/交易所从哪来）。
- `src/data/web3-roadmap-data.json` 阶段 4（id 4）M4.1-M4.4 全部 `status: "todo"`、`articleSlug: null`；M4.1 标题「AMM 机制与 Uniswap 原理」。阶段 1-3 全部 done。
- `docs/backlog/web3-roadmap.md` Work Item Status 表 M4/WI9 行 Status `todo`，依赖 WI8（已 done，依赖链满足）。M4 为纯文章阶段（无代码工程）。
- 术语词典 `src/components/web3/GlossaryTerm.astro` 已有：`AMM`、`Uniswap`、`Uniswap V4`、`DeFi`、`EVM`、`Gas`、`智能合约` 等；**没有** `无常损失`、`LP` 词条——本篇两个核心新概念，按全局规范「新概念先加词条再使用」需 Phase 1 先补。
- 口径来源（roadmap M4 共识）：`src/pages/web3/report.astro` 阶段 4 章节（4.2 AMM 小节）——池中 ETH=100 / USDC=200,000，k = 100 × 200,000 = 20,000,000，价格 $2000/ETH；买入 1 ETH → 池变为 (99, 202,020) → 价格 $2040.6，滑点约 2%；V4 Hook 创新清单（Custom Pools / TWAMM / Limit Orders / Dynamic Fees）。数值例必须与此逐项一致。
- heroImage 现状：`grep -h "heroImage" src/content/blog/*.mdx | sort -u` 当前 14 个不同值（含 1 个模板占位 example.com），新图须全库唯一并带 `?w=1200&h=630&fit=crop` 后缀。
- frontmatter 惯例注意：全局写作规范的 `subject` 字段写的是阶段 2/3 语境（`"Ethereum"`，WI5 为 `"DApp"`）；按「subject = 所处阶段主题」惯例，阶段 4 文章取 `"DeFi"`——本计划以 Decision 项显式确认这个推断（roadmap 未逐字给出 M4 的 subject 值）。
- `AGENTS.md` 路线图表阶段 4 行现为 `0/4`——按全局规范仅在 M4.4/WI12（阶段收尾）时更新为 4/4，本计划不动。
- 验证基线（docs/testing/known-good-baselines.md，2026-09-07 @ `cbf6d45`）：`npm run build` exit 0（563 pages）、`npm run test:run` exit 0（4/4）；`npm run type-check`（TS2345 MermaidDiagram.tsx:122）与 `npm run lint`（14 存量错误）为已知存量失败，不在本 mission 通过门内。
- 环境事实：Node v22.22.2 / npm 10.9.7 可用；`docs/logs/2026/09-08.md` 尚不存在（执行时按 `docs/logs/00-log-writing-guide.md` 新建）。

## Goals

- 词典新增 `无常损失`、`LP` 词条，先于文章使用落地。
- 发布文章 `uniswap-amm-explained`（150-250 行）：订单簿 vs AMM 的动机（为什么不用挂单撮合）；x*y=k 恒定乘积推导（数值例直接沿用 report 页口径，含滑点计算）；LP 与无常损失（简化数值例说明 IL < HODL 的情形，明确标注为简化模型）；V2 → V3 集中流动性 → V4 Hook 演进各一句话带过；结尾过渡「价格有了，借贷呢」引出 WI10。
- 数据联动：M4.1 置 `done` + `articleSlug: "uniswap-amm-explained"`；roadmap M4/WI9 行置 `done`；`docs/logs/2026/` 当日日志记录条目。
- 验证门通过：`npm run test:run` exit 0；`npm run build` exit 0 且 `dist/blog/uniswap-amm-explained/index.html` 生成。

## Non-Goals

- 不写 M4.2-M4.4 文章（WI10 有独立 plan 见 Related；WI11/WI12 后续批次）。
- 不更新 `AGENTS.md` 阶段 4 状态列（仅 M4.4/WI12 完成时更新）。
- 不修复 `type-check` / `lint` 存量失败（非本 mission 通过门，已知基线在档）。
- 不修改任何站点代码/组件行为、不动 `dapp/` 工程——词典词条是 definitions 对象的数据级追加，不改 `GlossaryTerm.astro` 组件逻辑。
- 不展开 V3 集中流动性与 V4 Hook 的机制细节（roadmap 明文「一句话各带过」）。

## Task Route

- Type: `implementation-only change`（纯内容新增：一篇 MDX + 词典词条 + 数据联动，无架构/契约变化）
- Owner Docs: `docs/backlog/web3-roadmap.md`（全局写作规范 + M4 共识口径 + WI9 定义）、`src/pages/web3/report.astro`（阶段 4 数值例口径，只读对照）、`docs/testing/known-good-baselines.md`（验证口径与存量失败）
- Skill Selection Basis: 无匹配 skill——技术博客写作由 roadmap 全局写作规范约束；`copywriting` 面向营销/多平台文案，与本任务方法不符（同前八篇计划理由）。

## Infrastructure And Config Prereqs

- Node 环境且 `node_modules/` 已安装（缺失时先 `npm install`）；无其他 infra 依赖；无数据迁移。

## Phase 1 — 词典与口径准备

Targets: `src/components/web3/GlossaryTerm.astro`（`src/pages/web3/report.astro` 只读对照）
Skill: none

- Item Types: `Add | Decision | Proof`
- Prereqs: 无（本批次首个执行计划；依赖链 WI8 已 done）

- [x] Add: 在 `GlossaryTerm.astro` 的 `definitions` 对象追加两个 key——`无常损失`（Impermanent Loss：LP 按公式比例持有两种资产，价格偏离存入时比例后，取出价值低于一直拿着不动的 HODL 价值的差额；价格回到原点损失归零，「无常」由此得名）与 `LP`（Liquidity Provider，流动性提供者：向 AMM 池存入两种资产的人，赚取交易手续费分成，承担无常损失风险）。词条文案与本系列既有词条风格一致（一句话定义 + 与对照概念的关系），不与 `AMM`/`Uniswap` 词条口径冲突。
- [x] Decision: `subject` 字段取值确认——本篇及阶段 4 后续文章取 `subject: "DeFi"`。依据：「subject = 所处阶段主题」惯例（阶段 2 全部 `"Ethereum"`、WI5/WI6-WI8 全部 `"DApp"`），roadmap 全局规范原文的 `"Ethereum"` 是阶段 2 语境示例。备选：逐字照抄规范写 `"Ethereum"`——否决，阶段主题不符且与内容目录/subject 语义冲突。残余风险：无（可机械复查一致性）。
- [x] Proof: `grep -n "无常损失\|LP" src/components/web3/GlossaryTerm.astro` 打印两个新 key 的定义行；重读 report.astro 阶段 4.2 小节确认数值例口径清单（100/200,000/k=20,000,000/$2000/$2040.6/滑点约 2%/V4 Hook 四项）与文章将用的数字逐项一致。

Exit Criteria:

- [x] 词典含 `无常损失`、`LP` 两个 key，先于文章使用落地（全局规范：新概念先加词条再使用）。
- [x] `subject` 取值 Decision 记录在案（含备选与否决理由）。

## Phase 2 — 文章写作

Targets: `src/content/blog/uniswap-amm-explained.mdx`
Skill: none

- Item Types: `Add | Decision | Proof`
- Prereqs: Phase 1（词条已存在，`GlossaryTerm` 才可引用）

- [x] Add: 创建 `src/content/blog/uniswap-amm-explained.mdx`，frontmatter 满足全局写作规范：`categories: ["Web3"]`、`subject: "DeFi"`（Phase 1 Decision）、`tags: ["Web3", "区块链入门", "AMM", "Uniswap"]`、`pubDate` 为执行当天日期、`description` 一段摘要；`heroImage` 为 Unsplash 图（`?w=1200&h=630&fit=crop` 后缀）。
- [x] Decision: heroImage 选图——必须与现有全部文章不重复。执行时 `grep -h "heroImage" src/content/blog/*.mdx` 比对候选 URL 唯一后选定；备选图像主题（交易/曲线/流动性视觉）任选，唯一性是硬约束。残余风险：无（唯一性可机械复查）。
- [x] Add: 正文 150-250 行，结构遵守全局规范：引言（承接 first-full-dapp 结尾「计数器 → 交易所」钩子，提出「没有挂单簿的交易所怎么定价」）→ 订单簿 vs AMM 动机分节（传统交易所靠做市商挂单撮合，链上无许可环境怎么解决冷启动与流动性）→ x*y=k 恒定乘积推导（数值例沿用 report 口径：100 ETH / 200,000 USDC、k=20,000,000、$2000 基准价、买 1 ETH 后 (99, 202,020)、$2040.6、滑点约 2%，ASCII text 代码块画池子变化示意）→ LP 与无常损失分节（LP 赚手续费、担无常损失；给一个简化数值例说明 IL < HODL 的情形——如价格翻倍后取出对比一直持有，明确标注「简化模型，忽略手续费」）→ V2 → V3 集中流动性 → V4 Hook 各一句话带过（V4 四项创新清单与 report 一致）→ 总结：结尾过渡「价格有了，借贷呢」引出下一篇。
- [x] Add: 组件使用合规——按系列既有文章惯例导入（`import Highlight from '@components/web3/Highlight.astro'`、`import GlossaryTerm from '@components/web3/GlossaryTerm.astro'`）；`<Highlight type="info|warning|success|danger">` 仅这四种；`<GlossaryTerm term="...">` 仅引用词典已有 key（含 Phase 1 新增，大小写完全一致）；Astro 组件上禁止 `client:` 指令；图示全部用 ASCII text 代码块（本站 mermaid 块只渲染静态代码）。数字不确定处用「量级/约」表述，不编造精确值。
- [x] Add: 文末「相关文章」内链仅引用已发布 12 篇 web3 文章真实 slug（`first-full-dapp` 必引——本篇承接其阶段 4 预告；`evm-deep-dive`、`ethereum-gas-fees` 等按相关性精选）。
- [x] Proof: `wc -l src/content/blog/uniswap-amm-explained.mdx` 打印值在 150-250；对文中每个 `GlossaryTerm term="X"`，`grep` 确认 X 在 `GlossaryTerm.astro` definitions 中存在且大小写一致；heroImage 唯一性复查通过（全库 grep 仅 1 hit）。

Exit Criteria:

- [x] 文章文件存在，frontmatter 全字段合规（含 subject/tags Decision 结论），行数 150-250。
- [x] 结构完整（引言/订单簿动机/恒定乘积推导/LP 与无常损失/演进一句话/总结过渡），数值例与 report.astro 口径逐项一致，无常损失例明确标注简化模型。
- [x] 组件与内链合规：Highlight 四型之内、GlossaryTerm key 全部命中、相关文章 slug 全部真实存在。
- [x] heroImage 全库唯一。

## Phase 3 — 数据联动与验证

Targets: `src/data/web3-roadmap-data.json`, `docs/backlog/web3-roadmap.md`, `docs/logs/2026/`
Skill: none

- Item Types: `Add | Proof`
- Prereqs: Phase 2（文章已落地才置 done）

- [x] Add: `web3-roadmap-data.json` 阶段 4 的 M4.1 `status: "todo"` → `"done"`、`articleSlug: null` → `"uniswap-amm-explained"`；M4.2-M4.4 保持不动（阶段 1-3、5 亦不动）。
- [x] Add: `docs/backlog/web3-roadmap.md` Work Item Status 表 M4/WI9 行 Status `todo` → `done`。
- [x] Add: `docs/logs/2026/` 当日日志记录条目（`09-08.md` 不存在则按 `docs/logs/00-log-writing-guide.md` 约定新建当日文件）。
- [x] Proof: `npm run test:run` exit 0。
- [x] Proof: `npm run build` exit 0 且 `test -f dist/blog/uniswap-amm-explained/index.html` 为真（新文章路由生成）。

Exit Criteria:

- [x] M4.1 done + articleSlug 指向真实存在的文章 slug；roadmap WI9 行 done；日志条目在档。
- [x] `test` / `build` 两验证键均 exit 0，新文章路由生成。
- [x] `docs/logs/` 更新（本计划闭环条目）。
- [x] 无 owner-doc 之外的文档更新需求——roadmap 数据文件与 roadmap 本身即 owner doc，已在上述条目覆盖。

## Draft Review Record

- dispatch review #review-2026-09-08-094755-mission-driver-2026-09-08-0950-1-uniswap-amm-explained-1-1bc9cfde to ses-opencode-glm53
- 2026-09-08：iteration 1，共识 acceptable-as-is #review-2026-09-08-094755-mission-driver-2026-09-08-0950-1-uniswap-amm-explained-1-1bc9cfde

## Verification

- pass test 2026-09-08-094755-mission-driver exit=0
- pass build 2026-09-08-094755-mission-driver exit=0

## Closure

- dispatch audit #audit-2026-09-08-094755-mission-driver-2026-09-08-0950-1-uniswap-amm-explained-1-5c1dc679 to ses-opencode-glm53 models={exec:opencode/glm-5.3,aud:opencode/glm-5.3}
- accepted #audit-2026-09-08-094755-mission-driver-2026-09-08-0950-1-uniswap-amm-explained-1-5c1dc679：审计通过——24/24 勾选与仓库实况逐项一致（GlossaryTerm.astro 新增 LP/无常损失 词条、uniswap-amm-explained.mdx 157 行且 heroImage 全库唯一、web3-roadmap-data.json M4.1 done + articleSlug、backlog WI9 行 done、docs/logs/2026/09-08.md 在档）；实测验证门：npm run test:run exit=0（4/4 通过）、npm run build exit=0（598 pages、dist/blog/uniswap-amm-explained/index.html 生成）；文中 GlossaryTerm 引用 9 个 key 全部存在于 definitions，Highlight 仅用 info/warning 两型，M4.2-M4.4 保持 todo 未动。exec 与 aud 同模型为声明的单模型降级，如实记录。
