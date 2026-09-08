---
status: active
mission: web3-roadmap
work-item: M4-WI12
group: "2026-09-08-1104"
verify: [test, build]
---

# 2026-09-08-1104-1-defi-aggregators-yield 文章「聚合器与收益策略」

> Source: docs/backlog/web3-roadmap.md M4/WI12（文章「聚合器与收益策略」，对应 web3-roadmap-data.json M4.4）
> Related: 2026-09-08-0950-3-flash-loans-arbitrage（前置：WI12 依赖 WI11，引言承接其结尾「单点策略之上还有把策略打包的组合层——聚合器与收益金库」过渡钩子）；2026-09-08-0950-1-uniswap-amm-explained、2026-09-08-0950-2-defi-lending-protocols（乐高栈叠示例引用其定价与借贷机制）

## Current Baseline

- 本组为阶段 4 收尾 + 阶段 5 开篇批次（组内执行顺序：本计划 → 2026-09-08-1104-2 → 2026-09-08-1104-3，按文件名 N 前缀排序执行）。目标输出文件 `src/content/blog/defi-aggregators-yield.mdx` 不存在；Web3 系列已发布 15 篇（阶段 1-3 十二篇 + 2026-09-08-0950 组三篇，前置 M4-WI11 计划已闭合并通过审计）。
- `src/data/web3-roadmap-data.json` 阶段 4：M4.1/M4.2/M4.3 均为 `done` 且 `articleSlug` 已填；M4.4 `todo`、`articleSlug: null`。M4.4 标题「DeFi 聚合器与收益策略」。
- `docs/backlog/web3-roadmap.md` Work Item Status 表 M4/WI12 行 Status `todo`，依赖 WI11；头部「系列已有 12 篇」计数已滞后于实际（实际 15 篇，本计划落地后 16 篇）——阶段边界是刷新该计数的自然时点。
- 术语词典 `src/components/web3/GlossaryTerm.astro` 已有：`Curve`、`Convex`、`gauge voting`（roadmap Reuse 列点名可复用）、`AMM`、`LP`、`无常损失`、`Aave`、`Uniswap`、`闪电贷`、`清算`、`Health Factor`、`MEV`、`TVL`、`DeFi` 等；**没有** `聚合器`、`收益金库`、`APY` 词条——本篇核心新概念，按全局规范需 Phase 1 先补。
- 口径来源（roadmap M4 共识口径 + WI12 定义）：DeFi 乐高栈叠示例**直接引用 report 页 4.4 章节的既有示例**——Aave（借贷）借出 USDC → 存入 Curve（稳定币交易）赚收益 → 质押 Curve LP token 到 Convex 获取额外奖励 → 用 Convex token 做 gauge voting 治理（`src/pages/web3/report.astro:523-531`）；并展开风险（嵌套越深，清算与合约风险复合）。1inch 类聚合器机制一句话带过。
- 呼应素材：`flash-loans-arbitrage`（WI11）已发布——其结尾过渡钩子是本篇引言承接点；`uniswap-amm-explained`（WI9）的滑点/LP 手续费机制、`defi-lending-protocols`（WI10）的清算经济学是乐高风险展开的呼应对象。
- heroImage 现状：全库 `grep -h "heroImage" src/content/blog/*.mdx | sort -u` 去重为 17 个不同值（含模板占位），新图须全库唯一并带 `?w=1200&h=630&fit=crop` 后缀。
- `AGENTS.md` 路线图表阶段 4 行现为 `0/4`——roadmap 明文本 WI 完成时置 `4/4`（阶段 1/2 行格式为「4/4 完成」，沿用该格式）。
- 验证基线（docs/testing/known-good-baselines.md + mission config commands）：`npm run test:run` exit 0、`npm run build` exit 0 为通过门；`type-check`/`lint` 存量失败不在门内（mission config 已声明 skip）。
- 环境事实：Node v22.22.2 / npm 10.9.7 可用（同日闭合计划审计确认）；`docs/logs/2026/09-08.md` 已存在，追加条目即可。

## Goals

- 词典新增 `聚合器`、`收益金库`、`APY` 词条，先于文章使用落地。
- 发布文章 `defi-aggregators-yield`（150-250 行）：DEX 聚合器为什么存在（拆单路由找最优价，1inch 类一句话机制）；收益金库/自动复投（Yearn 式 vault 的策略抽象）；DeFi 乐高：直接引用 report 页 Aave→Curve→Convex→gauge voting 栈叠示例并展开风险（嵌套越深，清算与合约风险复合）；理性提示 APY 高≠好，风险与策略复杂度正相关；结尾完成阶段 4 → 阶段 5 过渡（金融原生的协议群没有 CEO——组织如何治理：DAO）。
- 数据联动：M4.4 置 `done` + `articleSlug: "defi-aggregators-yield"`；roadmap M4/WI12 行置 `done`；`AGENTS.md` 阶段 4 状态列置 `4/4 完成`；roadmap 头部系列篇数刷新为 16（阶段 1-4 各四篇）；`docs/logs/2026/` 当日日志记录条目。
- 验证门通过：`npm run test:run` exit 0；`npm run build` exit 0 且 `dist/blog/defi-aggregators-yield/index.html` 生成。

## Non-Goals

- 不写 M5 文章（DAO 三篇属下一批次 2026-09-08-1104-2/-3 及后续）。
- 不深入聚合器的具体报价/路由算法细节（roadmap 明文「1inch 类一句话机制」即可）。
- 不提供收益策略操作教程或投资建议（理性提示部分是风险教育，不推荐具体金库/策略产品）。
- 不更新 `AGENTS.md` 阶段 5 状态列（仅 M5.4/WI16 完成时更新）。
- 不修复 `type-check` / `lint` 存量失败（非本 mission 通过门，mission config 已声明 skip）。
- 不修改任何站点代码/组件行为、不动 `dapp/` 工程——词典词条是数据级追加。

## Task Route

- Type: `implementation-only change`（纯内容新增：一篇 MDX + 词典词条 + 数据联动，无架构/契约变化）
- Owner Docs: `docs/backlog/web3-roadmap.md`（全局写作规范 + M4 共识口径 + WI12 定义）、`docs/testing/known-good-baselines.md`（验证口径与存量失败）
- Skill Selection Basis: 无匹配 skill——技术博客写作由 roadmap 全局写作规范约束；`copywriting` 面向营销/多平台文案，与本任务方法不符（同前序计划理由）。

## Infrastructure And Config Prereqs

- Node 环境且 `node_modules/` 已安装（缺失时先 `npm install`）；无其他 infra 依赖；无数据迁移。

## Phase 1 — 词典与口径准备

Targets: `src/components/web3/GlossaryTerm.astro`
Skill: none

- Item Types: `Add | Proof`
- Prereqs: 前置计划 2026-09-08-0950-3 已完成（M4.3 done，依赖链 WI11 → WI12 满足）

- [x] Add: 在 `GlossaryTerm.astro` 的 `definitions` 对象追加三个 key——`聚合器`（Aggregator：站在多个 DeFi 协议之上的路由层，DEX 聚合器把一笔交易拆分路由到多个流动性池找最优价，收益聚合器把策略打包自动复投，用户只需面对一个入口）、`收益金库`（Vault：Yearn 开创的策略抽象——用户存入一种资产，合约自动执行「存入协议→收息→复投→调仓」循环，份额以凭证记账，策略复杂度对用户透明）、`APY`（Annual Percentage Yield，复利口径的年化收益率；DeFi 中高 APY 常来自代币激励而非现金流，APY 越高往往意味着风险与激励衰减越快，不等于真实长期回报）。词条文案与既有 `AMM`/`Curve`/`Convex` 词条口径一致、风格一致。
- [x] Proof: `grep -n "聚合器\|收益金库\|APY" src/components/web3/GlossaryTerm.astro` 打印三个新 key 的定义行；重读 report 页 4.4 章节栈叠示例，确认文章将引用的 Aave→Curve→Convex→gauge voting 链路与页面逐项一致。

Exit Criteria:

- [x] 词典含 `聚合器`、`收益金库`、`APY` 三个 key，先于文章使用落地。
- [x] 乐高栈叠口径与 report 页 4.4 核对一致。

## Phase 2 — 文章写作

Targets: `src/content/blog/defi-aggregators-yield.mdx`
Skill: none

- Item Types: `Add | Decision | Proof`
- Prereqs: Phase 1（词条已存在，`GlossaryTerm` 才可引用）

- [x] Add: 创建 `src/content/blog/defi-aggregators-yield.mdx`，frontmatter 满足全局写作规范：`categories: ["Web3"]`、`subject: "DeFi"`（承 2026-09-08-0950-1 Phase 1 Decision 的阶段主题惯例）、`tags: ["Web3", "区块链入门", "DeFi", "聚合器"]`、`pubDate` 为执行当天日期、`description` 一段摘要；`heroImage` 为 Unsplash 图（`?w=1200&h=630&fit=crop` 后缀）；标题紧扣 roadmap WI 标签「聚合器与收益策略」。
- [x] Decision: heroImage 选图——执行时 `grep -h "heroImage" src/content/blog/*.mdx` 全库比对唯一后选定；备选主题（积木/乐高/管道/组合视觉）任选，唯一性是硬约束。残余风险：无（可机械复查）。选定 `photo-1587654780291-39c9404d746b`（互锁积木视觉），全库 grep 1 hit。
- [x] Add: 正文 150-250 行，结构遵守全局规范：引言（承接 WI11 结尾「单点策略之上还有组合层」钩子——手动搬砖拼不过合约，组合层为什么出现）→ DEX 聚合器分节（拆单路由找最优价的动机；1inch 类机制一句话带过；与滑点/gas 的权衡呼应 WI9）→ 收益金库分节（Yearn 式 vault 的策略抽象：存入资产→自动「存入协议→收息→复投→调仓」；LP 手续费与激励自动复投呼应 WI9 无常损失）→ DeFi 乐高分节（直接引用 report 页 Aave→Curve→Convex→gauge voting 栈叠示例，ASCII text 代码块画堆叠层级；展开风险：嵌套越深，清算与合约风险复合——任何一层出问题整栈连锁，呼应 WI10 清算与 WI11 合约漏洞）→ 理性提示分节（APY 高≠好：高 APY 多为代币激励而非现金流，激励衰减+退出踩踏；风险与策略复杂度正相关）→ 总结：阶段 4 收束（价格→借贷→闪电贷→组合层，DeFi 栈图景完整），过渡阶段 5（协议群没有 CEO，金融原生的组织如何治理——DAO）。
- [x] Add: 组件使用合规——按系列既有惯例导入组件；`<Highlight>` 仅四种 type（理性提示用 `type="warning"`，风险复合警示用 `type="danger"`）；`<GlossaryTerm>` 仅引用词典已有 key（含 Phase 1 新增三个，大小写完全一致）；禁止 `client:` 指令；图示全 ASCII text 代码块；数字不确定处用「量级/约」表述，不编造精确值（各金库 APY、TVL 数字均用量级表述）。
- [x] Add: 文末「相关文章」内链仅引用已发布 slug（`flash-loans-arbitrage` 必引——引言承接；`uniswap-amm-explained`、`defi-lending-protocols` 必引——乐高栈叠的机制来源；其余按相关性精选，slug 必须真实存在）。
- [x] Proof: `wc -l src/content/blog/defi-aggregators-yield.mdx` 打印值在 150-250；每个 `GlossaryTerm term="X"` 词典命中且大小写一致；heroImage 唯一性复查通过（全库 grep 仅 1 hit）。

Exit Criteria:

- [x] 文章文件存在，frontmatter 全字段合规，行数 150-250。
- [x] 结构完整（引言/聚合器/收益金库/乐高与复合风险/理性提示/总结收束与阶段过渡），乐高示例与 report 页一致、APY 与收益数字均为量级表述。
- [x] 组件与内链合规；heroImage 全库唯一；无投资建议式内容。

## Phase 3 — 数据联动与验证

Targets: `src/data/web3-roadmap-data.json`, `docs/backlog/web3-roadmap.md`, `AGENTS.md`, `docs/logs/2026/`
Skill: none

- Item Types: `Add | Proof`
- Prereqs: Phase 2（文章已落地才置 done）

- [x] Add: `web3-roadmap-data.json` 阶段 4 的 M4.4 `status: "todo"` → `"done"`、`articleSlug: null` → `"defi-aggregators-yield"`；其余阶段全不动。
- [x] Add: `docs/backlog/web3-roadmap.md` Work Item Status 表 M4/WI12 行 Status `todo` → `done`；同文件头部「系列已有 12 篇」刷新为「系列已有 16 篇：阶段 1-4 各四篇」（修复计数滞后，阶段边界同步）。
- [x] Add: `AGENTS.md` 路线图表格阶段 4 行 `0/4` → `4/4 完成`（roadmap 完成定义明文要求；格式沿用阶段 1/2 行）。
- [x] Add: `docs/logs/2026/` 当日日志记录条目（当日文件不存在则按 `docs/logs/00-log-writing-guide.md` 约定新建）。
- [x] Proof: `npm run test:run` exit 0。
- [x] Proof: `npm run build` exit 0 且 `test -f dist/blog/defi-aggregators-yield/index.html` 为真（新文章路由生成）。

Exit Criteria:

- [x] M4.4 done + articleSlug 指向真实存在的文章 slug；roadmap WI12 行 done、头部计数刷新；AGENTS.md 阶段 4 行 `4/4 完成`；日志条目在档。
- [x] `test` / `build` 两验证键均 exit 0，新文章路由生成。
- [x] `docs/logs/` 更新（本计划闭环条目）。
- [x] 无 owner-doc 之外的文档更新需求——roadmap 数据文件、roadmap 本身与 AGENTS.md 路线图表即 owner doc，已在上述条目覆盖。

## Draft Review Record

- dispatch review #review-2026-09-08-094755-mission-driver-2026-09-08-1104-1-defi-aggregators-yield-1-9d5f28c1 to ses-opencode-glm53
- 2026-09-08：iteration 1，共识 acceptable-as-is #review-2026-09-08-094755-mission-driver-2026-09-08-1104-1-defi-aggregators-yield-1-9d5f28c1

## Verification

- pass test 2026-09-08-094755-mission-driver exit=0
- pass build 2026-09-08-094755-mission-driver exit=0
- pass test 2026-09-08-1133-verify exit=0
- pass build 2026-09-08-1133-verify exit=0

## Closure

- dispatch audit #audit-2026-09-08-094755-mission-driver-2026-09-08-1104-1-defi-aggregators-yield-1-79c8d279 to ses-opencode-glm53 models={exec:opencode-glm53,aud:opencode-glm53}
- accepted #audit-2026-09-08-094755-mission-driver-2026-09-08-1104-1-defi-aggregators-yield-1-79c8d279：审计通过——全部 23 项计数域条目与实仓一致（GlossaryTerm 含聚合器/收益金库/APY 三词条，文章 152 行且 heroImage 全库唯一，M4.4 done+articleSlug、roadmap WI12 done 与 16 篇计数、AGENTS.md 阶段 4 行 4/4 完成、docs/logs/2026/09-08.md 闭环条目均在档）；本审计独立复跑验证门：npm run test:run exit=0（4/4 通过）、npm run build exit=0（611 页构建，dist/blog/defi-aggregators-yield/index.html 生成）；exec 与 aud 为同一模型，按单模型降级如实记录。
