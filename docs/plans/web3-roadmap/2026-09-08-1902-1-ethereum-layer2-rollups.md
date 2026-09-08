---
status: active
mission: web3-roadmap
work-item: 番外-WI17
group: "2026-09-08-1902"
verify: [test, build]
---

# 2026-09-08-1902-1-ethereum-layer2-rollups 文章「Layer2 扩容与 Rollup」（番外·一）

> Source: docs/backlog/web3-roadmap.md 番外/WI17（文章「Layer2 扩容与 Rollup」，slug ethereum-layer2-rollups；五阶段主线之外的横向专题）
> Related: 2026-09-08-1223-2-dao-case-studies（前置：主线收官篇已发布，番外开篇承接其收官语境）；2026-09-07-1319-3-ethereum-gas-fees（blob/L2 费用口径呼应对象）；2026-09-07-1319-2-evm-deep-dive（EVM 兼容生态呼应对象）

## Current Baseline

- 本组为番外批次（组内执行顺序：本计划 → 2026-09-08-1902-2 → 2026-09-08-1902-3，按文件名 N 前缀排序执行）。目标输出文件 `src/content/blog/ethereum-layer2-rollups.mdx` 不存在；主线 20 篇已全部发布，roadmap 头部计数 20、`src/data/web3-roadmap-data.json` 20 个里程碑全 `done`——执行时读数不符即前置状态异常，停止执行并上报。
- 番外特殊约定（roadmap 番外章节明文，覆盖全局规范的数据联动条款）：**严禁修改 `src/data/web3-roadmap-data.json` 和 AGENTS.md 路线图表**，里程碑进度 20/20 保持不变；roadmap 页底部「延伸阅读」区块按 slug 自动挂卡——`src/pages/web3/roadmap.astro:148-152` 的 `supplementSlugs` 含三个番外 slug，`postsMap.get(s).filter(Boolean)` 命中已发布文章即输出卡片，无需任何数据联动。
- 术语词典 `src/components/web3/GlossaryTerm.astro` 已有（roadmap Reuse 列三项均在）：`Layer2`（:12）、`Optimistic Rollups`（:44）、`ZK Rollups`（:45）；另有 `Rollup`（:43）、`Blob`（:49，Dencun/L2 手续费降 10-100 倍）、`TPS`（:18）、`全节点`（:30）、`Gas`、`EVM`、`TVL`、`MEV` 可复用。**没有** `不可能三角`、`数据可用性` 词条——本篇两个核心新概念（全站 grep 无「不可能三角/三元悖论」任何提及；「数据可用性」仅在 gas 篇 :140 行文出现、非词条），按全局规范需 Phase 1 先补。
- 口径锚点（文章必须逐项对齐）：`src/pages/web3/report.astro` :287 关键数据（主网个位数到几十 gwei、Dencun 后长期低于 10 gwei，L2 Arbitrum/Base 不足 0.01 gwei，费用差距可达 1000 倍）；report §2.4 :293-325（Optimistic 阵营：Arbitrum TVL $7.8B、Base Coinbase 背书、Optimism OP Stack；ZK 阵营：zkSync Era、Starknet STARK、Polygon zkEVM；「ZK Rollups 是未来：无 7 天挑战期、即时退出」）；report §6 采用指标 :679-686（L2 日活钱包 > 100 万）；`src/content/blog/ethereum-gas-fees.mdx` :134-150（L2 费用便宜的机制归因：执行链下 + blob 打折计价 + 18 天自动过期，而非牺牲安全）；`src/content/blog/evm-deep-dive.mdx` 的 EVM 兼容生态段（Arbitrum/Base/Optimism）。
- Optimistic vs ZK 对比口径：欺诈证明 + 7 天挑战期（词典 `Optimistic Rollups` 词条）vs 有效性证明 + 即时退出无等待期（词典 `ZK Rollups` 词条）——与 report §2.4 一致，对比表沿用该口径。
- conceptMeta（`src/utils/web3Concepts.ts`）：`layer2` 条目已存在（:18）。番外约定要求的 conceptMeta 补条目（`稳定币`、`账户抽象`）与本篇无关——本篇 tag `Layer2` 经 `getConceptMeta` 小写化命中 `layer2`，无代码改动。tag 驱动概念聚合：`src/pages/web3/concept/[slug].astro` getStaticPaths（:41-58）按全站 tag 自动生成概念页，本篇发布后 `/web3/concept/layer2/` 自动出现（当前无文章用 `Layer2` tag，grep 已证）。
- subject 惯例：主线各篇 subject = 阶段主题（Ethereum/DApp/DeFi/DAO）；番外三篇不归属单一阶段，本计划确立番外惯例 `subject: "Web3"`（Decision 见 Phase 2，组内 2/3 号计划沿用）。
- heroImage 现状：全库 `grep -h "heroImage" src/content/blog/*.mdx | sort -u` 为 22 个唯一值，新图须全库唯一并带 `?w=1200&h=630&fit=crop` 后缀。
- 验证基线（docs/testing/known-good-baselines.md + missions/web3-roadmap.json commands）：`npm run test:run` exit 0、`npm run build` exit 0 为通过门；`type-check`/`lint` 存量失败不在门内（mission config 已声明 skip）。
- 环境事实：Node v22.22.2 / npm 10.9.7 可用（同日闭合计划审计确认）；`docs/logs/2026/09-08.md` 已存在，追加条目即可（跨日执行则按当日新建）。

## Goals

- 词典新增 `不可能三角`、`数据可用性` 词条，先于文章使用落地。
- 发布文章 `ethereum-layer2-rollups`（150-250 行）：不可能三角引出「为什么 L1 直接扩容难」（提高区块参数 = 提高全节点门槛 = 侵蚀去中心化）；Rollup 核心思路（执行移到链下、数据与证明交回 L1，数据可用性是安全锚）；Optimistic vs ZK 对比表（口径与词典/report 一致）；blob（EIP-4844）呼应 Gas 篇的 L2 费用口径；主流 L2 定位速览（Arbitrum/Base/Optimism vs zkSync/Starknet，量级表述）；结尾：L2 是普通用户实际入口，也是 report 页「采用指标」的核心。
- 番外发布核验：延伸阅读区块挂上第一张番外卡；`/web3/concept/layer2/` 概念页生成；roadmap Work Item Status 表番外/WI17 行置 `done`、头部系列篇数同步（20 → 21，注明番外）；`docs/logs/2026/` 当日日志记录条目。
- 番外约定核验：`src/data/web3-roadmap-data.json` 与 `AGENTS.md` 路线图表零变更（里程碑保持 20/20）。
- 验证门通过：`npm run test:run` exit 0；`npm run build` exit 0 且 `dist/blog/ethereum-layer2-rollups/index.html` 生成。

## Non-Goals

- 不写番外第二、三篇（稳定币、钱包与账户抽象属组内 2026-09-08-1902-2/-3）。
- 不修改 `src/data/web3-roadmap-data.json` 和 `AGENTS.md` 路线图表（番外特殊约定明文禁止；这是硬边界，不是数据联动的省略）。
- 不深入各 L2 的技术差异细节（欺诈证明交互流程、ZK 证明系统数学、 sequencer 去中心化议题）——主流 L2 速览是定位级，量级表述。
- 不编造 L2 市场份额/TVL 精确值（TVL 等数字沿用 report 页既有口径或用量级表述）。
- 不修复 `type-check` / `lint` 存量失败（非本 mission 通过门，mission config 已声明 skip）。
- 不修改任何站点代码/组件行为（词典词条是数据级追加；延伸阅读挂卡是既有机制）。

## Task Route

- Type: `implementation-only change`（纯内容新增：一篇 MDX + 词典词条 + roadmap 状态行与日志，无架构/契约变化）
- Owner Docs: `docs/backlog/web3-roadmap.md`（全局写作规范 + 番外特殊约定 + WI17 定义）、`docs/testing/known-good-baselines.md`（验证口径与存量失败）
- Skill Selection Basis: 无匹配 skill——技术博客写作由 roadmap 全局写作规范约束；`hv-analysis` 面向产品/公司深度研究报告，与本任务（系列教学番外篇）方法不符（同前序计划理由）。

## Infrastructure And Config Prereqs

- Node 环境且 `node_modules/` 已安装（缺失时先 `npm install`）；无其他 infra 依赖；无数据迁移。

## Phase 1 — 词典与口径准备

Targets: `src/components/web3/GlossaryTerm.astro`
Skill: none

- Item Types: `Add | Proof`
- Prereqs: 前置计划 2026-09-08-1223-2 已闭合（WI16 done，主线 20 篇在档，番外依赖链满足）

- [x] Add: 在 `GlossaryTerm.astro` 的 `definitions` 对象追加两个 key——`不可能三角`（区块链三难困境 Trilemma：去中心化、安全性、可扩展性三者不可同时兼得——提高区块参数确实能提速，但全节点硬件门槛随之抬高、能独立验证的节点变少，等于用去中心化换吞吐；Layer2 的思路是不动 L1 参数、把执行搬走，绕开这道选择题）、`数据可用性`（Data Availability，DA：任何人都能从 L1 取回 Rollup 的完整交易数据——执行可以搬下链，数据必须留链上，否则没人能独立验证 L2 的账本，安全锚就断了；blob 即以太坊为 DA 开辟的廉价数据空间）。词条文案与既有 `Layer2`/`Rollup`/`Blob` 词条口径一致、风格一致。
- [x] Proof: `grep -n "不可能三角\|数据可用性" src/components/web3/GlossaryTerm.astro` 打印两个新 key 的定义行；重读 report.astro :287 与 §2.4（:293-325）及 ethereum-gas-fees.mdx :134-150，确认文章将用的费用口径（1000 倍差距、blob 10-100 倍）、阵营清单（Arbitrum/Base/Optimism vs zkSync/Starknet）与站内既有文案逐项对得上。

Exit Criteria:

- [x] 词典含 `不可能三角`、`数据可用性` 两个 key，先于文章使用落地。
- [x] 费用与阵营口径与 report 页、Gas 篇核对一致，无凭空引用不存在的内容。

## Phase 2 — 文章写作

Targets: `src/content/blog/ethereum-layer2-rollups.mdx`
Skill: none

- Item Types: `Add | Decision | Proof`
- Prereqs: Phase 1（词条已存在，`GlossaryTerm` 才可引用）

- [x] Add: 创建 `src/content/blog/ethereum-layer2-rollups.mdx`，frontmatter 满足全局写作规范：`categories: ["Web3"]`、`subject: "Web3"`（番外惯例，见下方 Decision）、`tags: ["Web3", "区块链入门", "Layer2", "Rollup"]`（番外约定 tag 含 `Layer2`）、`pubDate` 为执行当天日期、`description` 一段摘要；`heroImage` 为 Unsplash 图（`?w=1200&h=630&fit=crop` 后缀）；标题紧扣 roadmap WI 标签「Layer2 扩容与 Rollup」。
- [x] Decision: 番外 subject 惯例——三篇番外统一 `subject: "Web3"`。备选：按主题挂靠阶段 subject（本篇 Ethereum、稳定币篇 DeFi、钱包篇 DApp），弃——番外明文「五阶段主线之外的横向专题」，挂靠阶段会模糊其身份，且 categories 已是 Web3。本 Decision 为组内惯例，2/3 号计划直接沿用。残余风险：无（subject 仅作栏目标签展示）。
- [x] Decision: heroImage 选图——执行时 `grep -h "heroImage" src/content/blog/*.mdx` 全库比对唯一后选定；备选主题（高速公路/分流闸道/层级结构视觉）任选，唯一性是硬约束。残余风险：无（可机械复查）。
- [x] Add: 正文 150-250 行，结构遵守全局规范：引言（番外开篇：主线五阶段收官后，三个高频横向专题先讲最贴日常体验的扩容；承接 dao-case-studies 收官语境）→ 不可能三角分节（为什么 L1 直接扩容难：提高区块参数 = 提高全节点门槛 = 侵蚀去中心化，呼应阶段 1 全节点审计历史的论点）→ Rollup 核心思路分节（执行移到链下、数据与证明交回 L1；数据可用性是安全锚，ASCII text 代码块画 L1/L2 分工图）→ Optimistic vs ZK 对比表（Markdown 表：欺诈证明 + 7 天挑战期 vs 有效性证明 + 即时退出，口径与词典/report §2.4 一致）→ blob 分节（呼应 Gas 篇：主网与 L2 费用 1000 倍差距的机制归因，blob 打折计价 + 18 天自动过期，不重复展开计价细节）→ 主流 L2 定位速览（Arbitrum/Base/Optimism vs zkSync/Starknet，量级表述，与 report §2.4 阵营一致）→ 总结：L2 是普通用户实际入口，也是 report 页「采用指标」的核心（L2 日活钱包 > 100 万）；番外过渡钩子（费用与入口之外，链上世界真正的「结算货币」是稳定币——下一篇）。
- [x] Add: 组件使用合规——按系列既有惯例导入组件；`<Highlight>` 仅四种 type（「7 天挑战期是安全假设不是缺陷」类提示用 `type="info"`，「L2 速览数字用量级表述」提示用 `type="warning"`）；`<GlossaryTerm>` 仅引用词典已有 key（含 Phase 1 新增两个，大小写完全一致）；禁止 `client:` 指令；图示全 ASCII text 代码块；TVL 等市场数字用量级表述，不编造精确值。
- [x] Add: 文末「相关文章」内链仅引用已发布 slug（`dao-case-studies` 必引——番外承接主线收官；`ethereum-gas-fees` 必引——blob 与 L2 费用口径来源；`evm-deep-dive` 必引——EVM 兼容生态呼应；其余按相关性精选，slug 必须真实存在）。
- [x] Proof: `wc -l src/content/blog/ethereum-layer2-rollups.mdx` 打印值在 150-250；每个 `GlossaryTerm term="X"` 词典命中且大小写一致；heroImage 唯一性复查通过（全库 grep 仅 1 hit）。

Exit Criteria:

- [x] 文章文件存在，frontmatter 全字段合规（含番外 subject 惯例），行数 150-250。
- [x] 结构完整（引言/不可能三角/Rollup 思路/对比表/blob/速览/总结与番外过渡），费用与阵营口径与 report 页及 Gas 篇一致。
- [x] 组件与内链合规；heroImage 全库唯一；三个必引 slug 均真实存在。

## Phase 3 — 发布核验与验证

Targets: `docs/backlog/web3-roadmap.md`, `docs/logs/2026/`
Skill: none

- Item Types: `Add | Proof`
- Prereqs: Phase 2（文章已落地才置 done）

- [x] Add: `docs/backlog/web3-roadmap.md` Work Item Status 表番外/WI17 行 Status `todo` → `done`；同文件头部系列篇数同步（20 → 21，表述注明「主线 20 篇 + 番外 1 篇」，番外约定不改里程碑计数）。
- [x] Add: `docs/logs/2026/` 当日日志记录条目（当日文件不存在则按 `docs/logs/00-log-writing-guide.md` 约定新建）。
- [x] Proof: `npm run test:run` exit 0。
- [x] Proof: `npm run build` exit 0 且 `test -f dist/blog/ethereum-layer2-rollups/index.html` 为真（新文章路由生成）。
- [x] Proof: 延伸阅读挂卡核验——`grep -c "ethereum-layer2-rollups" dist/web3/roadmap/index.html` ≥ 1（第一张番外卡出现）；`test -f dist/web3/concept/layer2/index.html` 为真（tag 驱动的概念聚合页生成）。
- [x] Proof: 番外约定核验——`git diff --stat src/data/web3-roadmap-data.json AGENTS.md` 输出为空（或等价检查：json 仍为 20 个 `done`、AGENTS.md 路线图表无番外相关变更），证明两文件零改动。

Exit Criteria:

- [x] roadmap WI17 行 done、头部计数 21（含番外表述）；日志条目在档。
- [x] `test` / `build` 两验证键均 exit 0，新文章路由、延伸阅读卡、概念页全部生成。
- [x] `web3-roadmap-data.json` 与 `AGENTS.md` 零变更（番外约定遵守，里程碑 20/20 不变）。
- [x] `docs/logs/` 更新（本计划闭环条目）。
- [x] 无 owner-doc 之外的文档更新需求——roadmap（本文件）即 owner doc，已在上述条目覆盖。

## Draft Review Record

- dispatch review #review-2026-09-08-190220-mission-driver-2026-09-08-1902-1-ethereum-layer2-rollups-1-2d90f520 to opencode-glm53-review
- 2026-09-08：iteration 1，共识 acceptable-as-is #review-2026-09-08-190220-mission-driver-2026-09-08-1902-1-ethereum-layer2-rollups-1-2d90f520

## Verification

- pass test 2026-09-08-190220-mission-driver exit=0
- pass build 2026-09-08-190220-mission-driver exit=0
- pass test 2026-09-08-193345-verify exit=0
- pass build 2026-09-08-193345-verify exit=0

## Closure

- dispatch audit #audit-2026-09-08-190220-mission-driver-2026-09-08-1902-1-ethereum-layer2-rollups-1-df7a85db to opencode-glm53-auditor models={exec:opencode-glm53,aud:opencode-glm53}
- accepted #audit-2026-09-08-190220-mission-driver-2026-09-08-1902-1-ethereum-layer2-rollups-1-df7a85db：审计通过——25 项均已实装并逐项对live库复核（文章 159 行结构完整、词典两词条在档、roadmap WI17 done/计数 21、日志条目在档、heroImage 全库唯一、GlossaryTerm 引用全部命中）；实测 `npm run test:run` exit=0（4/4）与 `npm run build` exit=0（637 pages），`dist/blog/ethereum-layer2-rollups/index.html`、`dist/web3/concept/layer2/index.html`、roadmap 延伸阅读卡均生成；`git diff --stat src/data/web3-roadmap-data.json AGENTS.md` 为空且里程碑 20/20 保持（番外约定遵守）。计划外修复（roadmap.astro 的 supplementSlugs 从模板中部 `---` 围栏上移至组件 frontmatter，解除 d7f190e 引入的 build 阻塞）已在 09-08 日志「计划外修复」条目如实记录，修复与原提交意图一致，属本计划验证门必需，不构成范围外隐瞒。
