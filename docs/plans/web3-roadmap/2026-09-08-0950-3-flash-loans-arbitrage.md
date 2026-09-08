---
status: active
mission: web3-roadmap
work-item: M4-WI11
group: "2026-09-08-0950"
verify: [test, build]
---

# 2026-09-08-0950-3-flash-loans-arbitrage 文章「闪电贷与套利」

> Source: docs/backlog/web3-roadmap.md M4/WI11（文章「闪电贷与套利」，对应 web3-roadmap-data.json M4.3）
> Related: 2026-09-08-0950-2-defi-lending-protocols（前置：WI11 依赖 WI10，引言承接其结尾「同区块借还，不还就整体回滚」过渡钩子）；2026-09-08-0950-1-uniswap-amm-explained（同组前篇：套利示例的两个池子来自 AMM 篇的定价机制）

## Current Baseline

- 目标输出文件 `src/content/blog/flash-loans-arbitrage.mdx` 不存在；Web3 系列已发布 12 篇 + 本组前置两篇（执行时 14 篇）；本计划执行时若前置计划 2026-09-08-0950-2（M4-WI10）未完成落地（M4.2 未 done），停止执行并上报依赖未满足。
- `src/data/web3-roadmap-data.json` 阶段 4：M4.1/M4.2 应为 `done`（前置计划产出）；M4.3/M4.4 `todo`、`articleSlug: null`。M4.3 标题「闪电贷与套利策略」。
- `docs/backlog/web3-roadmap.md` Work Item Status 表 M4/WI11 行 Status `todo`，依赖 WI10。
- 术语词典 `src/components/web3/GlossaryTerm.astro` 已有：`闪电贷`（无抵押短期贷款，必须在同一区块内归还，用于套利、清算等紧急操作）、`MEV`（验证者/矿工通过操纵交易顺序获取的额外利润，包括闪电贷攻击、三明治攻击等）、`预言机`（链下数据喂给智能合约，「喂价是否可信」是新信任假设）、`清算`、`Health Factor`、`Aave`（词条明言支持闪电贷）、`AMM`、`Uniswap` 等；**没有** `原子性`、`三明治攻击` 词条——本篇核心新概念，按全局规范需 Phase 1 先补。
- 口径来源（roadmap WI11 定义）：MEV 与三明治攻击表述须与既有 `MEV` 词条一致（操纵交易顺序获利；三明治攻击为其典型形态）；闪电贷费用只用量级表述（协议费率以「约/量级」措辞，不编造精确值——各协议、各时期不同）。
- 呼应素材：`smart-contracts-explained`（WI4）已发布——合约原子性（要么全部执行、要么整体回滚，不存在执行一半的状态）是闪电贷唯一规则的机制基础，roadmap 明文「呼应 WI4 合约原子性」；`defi-lending-protocols`（前置 WI10 产出）结尾过渡钩子是本篇引言承接点；预言机操纵攻击呼应既有 `预言机` 词条的信任假设论点。
- heroImage 现状：全库 `grep -h "heroImage" src/content/blog/*.mdx | sort -u` 去重比对（本组前置两篇各新增 1 张后为 16 个不同值，含模板占位），新图须全库唯一并带 `?w=1200&h=630&fit=crop` 后缀。
- `AGENTS.md` 路线图表阶段 4 行现为 `0/4`——仅 M4.4/WI12 完成时更新，本计划不动。
- 验证基线（docs/testing/known-good-baselines.md）：`npm run build` exit 0、`npm run test:run` exit 0 为通过门；`type-check`/`lint` 存量失败不在门内。
- 环境事实：Node v22.22.2 / npm 10.9.7 可用；`docs/logs/2026/09-08.md` 若本组前置计划已建则追加，否则按 `docs/logs/00-log-writing-guide.md` 新建。

## Goals

- 词典新增 `原子性`、`三明治攻击` 词条，先于文章使用落地。
- 发布文章 `flash-loans-arbitrage`（150-250 行）：闪电贷的原理与唯一规则（同区块借还，不还则整体回滚——呼应 WI4 合约原子性，ASCII 图示一笔闪电贷的成功/失败两条路径）；为什么无抵押可行（回滚保证状态零污染，协议风险只剩合约漏洞）；合法用途（套利、清算、一键换仓——各一个机制说明）与攻击面（配合预言机操纵的攻击，强调「工具无善恶、协议要有防单价格源设计」）；MEV 与三明治攻击简要提及（口径与词典一致）；从「攻击者的工具箱」收束到「DeFi 安全设计的必修课」；结尾完成 M4.3 → M4.4 过渡（单点策略之上还有把策略打包的组合层——聚合器与收益金库）。
- 数据联动：M4.3 置 `done` + `articleSlug: "flash-loans-arbitrage"`；roadmap M4/WI11 行置 `done`；`docs/logs/2026/` 当日日志记录条目。
- 验证门通过：`npm run test:run` exit 0；`npm run build` exit 0 且 `dist/blog/flash-loans-arbitrage/index.html` 生成。

## Non-Goals

- 不写 M4.4 文章（阶段 4 收尾计划后续批次处理，聚合器/收益金库词条属其范围）。
- 不深入 MEV 的提取机制与 PBS/ mev-boost 等区块构建细节（roadmap 明文「简要提及」）。
- 不提供可运行的套利代码或操作教程（文章讲机制与风险，不产出攻击/套利脚本；不写具体合约调用样例代码）。
- 不更新 `AGENTS.md` 阶段 4 状态列（仅 M4.4/WI12 完成时更新）。
- 不修复 `type-check` / `lint` 存量失败（非本 mission 通过门）。
- 不修改任何站点代码/组件行为、不动 `dapp/` 工程——词典词条是数据级追加。

## Task Route

- Type: `implementation-only change`（纯内容新增：一篇 MDX + 词典词条 + 数据联动，无架构/契约变化）
- Owner Docs: `docs/backlog/web3-roadmap.md`（全局写作规范 + M4 共识口径 + WI11 定义）、`docs/testing/known-good-baselines.md`（验证口径与存量失败）
- Skill Selection Basis: 无匹配 skill——技术博客写作由 roadmap 全局写作规范约束；`copywriting` 面向营销/多平台文案，与本任务方法不符（同前序计划理由）。

## Infrastructure And Config Prereqs

- Node 环境且 `node_modules/` 已安装（缺失时先 `npm install`）；无其他 infra 依赖；无数据迁移。

## Phase 1 — 词典与口径准备

Targets: `src/components/web3/GlossaryTerm.astro`
Skill: none

- Item Types: `Add | Proof`
- Prereqs: 计划 2026-09-08-0950-2 已完成（M4.2 done，依赖链 WI10 → WI11 满足）

- [x] Add: 在 `GlossaryTerm.astro` 的 `definitions` 对象追加两个 key——`原子性`（Atomicity：一笔交易内的所有操作要么全部生效、要么整体回滚到未发生状态，不存在执行一半的中间态——闪电贷「同区块借还、不还即回滚」的机制基础）、`三明治攻击`（Sandwich Attack：MEV 的典型形态，攻击者在受害交易前后的同一区块内各插入一笔交易，像两片面包夹住目标交易，通过制造价格偏移赚取差价，受害者以更差价格成交）。词条文案与既有 `闪电贷`/`MEV` 词条口径一致、风格一致。
- [x] Proof: `grep -n "原子性\|三明治攻击" src/components/web3/GlossaryTerm.astro` 打印两个新 key 的定义行；重读既有 `MEV`/`预言机`/`闪电贷` 词条，确认文章将用的 MEV/三明治/预言机操纵表述与词条逐项一致。

Exit Criteria:

- [x] 词典含 `原子性`、`三明治攻击` 两个 key，先于文章使用落地。
- [x] MEV/预言机口径与既有词条核对一致。

## Phase 2 — 文章写作

Targets: `src/content/blog/flash-loans-arbitrage.mdx`
Skill: none

- Item Types: `Add | Decision | Proof`
- Prereqs: Phase 1（词条已存在，`GlossaryTerm` 才可引用）

- [x] Add: 创建 `src/content/blog/flash-loans-arbitrage.mdx`，frontmatter 满足全局写作规范：`categories: ["Web3"]`、`subject: "DeFi"`（承 2026-09-08-0950-1 Phase 1 Decision 的阶段主题惯例）、`tags: ["Web3", "区块链入门", "闪电贷", "MEV"]`、`pubDate` 为执行当天日期、`description` 一段摘要；`heroImage` 为 Unsplash 图（`?w=1200&h=630&fit=crop` 后缀）。
- [x] Decision: heroImage 选图——执行时 `grep -h "heroImage" src/content/blog/*.mdx` 全库比对唯一后选定；备选主题（闪电/速度/工具箱视觉）任选，唯一性是硬约束。残余风险：无（可机械复查）。
- [x] Add: 正文 150-250 行，结构遵守全局规范：引言（承接 WI10 结尾「同区块借还，不还就整体回滚」钩子——无抵押借出巨额资产的「魔法」从何而来）→ 原理与唯一规则分节（原子性机制呼应 WI4；ASCII text 代码块画一笔闪电贷的成功路径 vs 失败回滚路径；为什么无抵押可行；协议费率用量级表述）→ 合法用途分节（套利：两个 AMM 池价差搬运，借→买→卖→还一区块完成，呼应 WI9 池子定价；清算：借入抵押品平仓获利，呼应 WI10；一键换仓：原子化资产置换）→ 攻击面分节（配合预言机操纵的攻击拆解——操纵单一价格源使协议误判抵押品价值，「工具无善恶、协议要有防单价格源设计」，TWAP/多源喂价一句带过；MEV 与三明治攻击简要提及，口径与词典一致）→ 总结：从「攻击者的工具箱」收束到「DeFi 安全设计的必修课」，过渡 M4.4（策略的组合层：聚合器与收益金库）。
- [x] Add: 组件使用合规——按系列既有惯例导入组件；`<Highlight>` 仅四种 type（攻击风险提示用 `type="danger"`）；`<GlossaryTerm>` 仅引用词典已有 key（含 Phase 1 新增两个，大小写完全一致）；禁止 `client:` 指令；图示全 ASCII text 代码块；数字不确定处用「量级/约」表述，不编造精确值（闪电贷费率、攻击损失金额均用量级表述）。
- [x] Add: 文末「相关文章」内链仅引用已发布 slug（`defi-lending-protocols` 与 `uniswap-amm-explained` 必引——机制承接两篇；`smart-contracts-explained` 必引——原子性呼应；其余按相关性精选，slug 必须真实存在）。
- [x] Proof: `wc -l src/content/blog/flash-loans-arbitrage.mdx` 打印值在 150-250；每个 `GlossaryTerm term="X"` 词典命中且大小写一致；heroImage 唯一性复查通过（全库 grep 仅 1 hit）。

Exit Criteria:

- [x] 文章文件存在，frontmatter 全字段合规，行数 150-250。
- [x] 结构完整（引言/原理与唯一规则/合法用途/攻击面/总结收束与过渡），原子性呼应 WI4、MEV 与三明治口径与词典一致、费率与损失均为量级表述。
- [x] 组件与内链合规；heroImage 全库唯一；无攻击/套利操作教程内容。

## Phase 3 — 数据联动与验证

Targets: `src/data/web3-roadmap-data.json`, `docs/backlog/web3-roadmap.md`, `docs/logs/2026/`
Skill: none

- Item Types: `Add | Proof`
- Prereqs: Phase 2（文章已落地才置 done）

- [x] Add: `web3-roadmap-data.json` 阶段 4 的 M4.3 `status: "todo"` → `"done"`、`articleSlug: null` → `"flash-loans-arbitrage"`；M4.4 保持不动（其余阶段全不动）。
- [x] Add: `docs/backlog/web3-roadmap.md` Work Item Status 表 M4/WI11 行 Status `todo` → `done`。
- [x] Add: `docs/logs/2026/` 当日日志记录条目（当日文件不存在则按 `docs/logs/00-log-writing-guide.md` 约定新建）。
- [x] Proof: `npm run test:run` exit 0。
- [x] Proof: `npm run build` exit 0 且 `test -f dist/blog/flash-loans-arbitrage/index.html` 为真（新文章路由生成）。

Exit Criteria:

- [x] M4.3 done + articleSlug 指向真实存在的文章 slug；roadmap WI11 行 done；日志条目在档。
- [x] `test` / `build` 两验证键均 exit 0，新文章路由生成。
- [x] `docs/logs/` 更新（本计划闭环条目）。
- [x] 无 owner-doc 之外的文档更新需求——roadmap 数据文件与 roadmap 本身即 owner doc，已在上述条目覆盖。

## Draft Review Record

- dispatch review #review-2026-09-08-094755-mission-driver-2026-09-08-0950-3-flash-loans-arbitrage-1-4a7c19e3 to ses-opencode-glm53
- 2026-09-08：iteration 1，共识 acceptable-as-is #review-2026-09-08-094755-mission-driver-2026-09-08-0950-3-flash-loans-arbitrage-1-4a7c19e3

## Verification

- pass test 2026-09-08-094755-mission-driver exit=0
- pass build 2026-09-08-094755-mission-driver exit=0

## Closure

- dispatch audit #audit-2026-09-08-094755-mission-driver-2026-09-08-0950-3-flash-loans-arbitrage-1-814b167e to ses-opencode-glm53 models={exec:glm-5.3,aud:glm-5.3}
- accepted #audit-2026-09-08-094755-mission-driver-2026-09-08-0950-3-flash-loans-arbitrage-1-814b167e：审计通过——所有落地物实证核对（文章 155 行/heroImage 全库唯一/9 个 GlossaryTerm 词条全部命中且大小写一致/相关内链 5 个 slug 全部存在/M4.3 done+articleSlug/backlog WI11 done/docs/logs/2026/09-08.md 条目在档），并独立复跑验证门：npm run test:run exit=0（4/4）、npm run build exit=0（608 pages，dist/blog/flash-loans-arbitrage/index.html 生成），与日志记录一致。models 双 glm-5.3 为声明的单模型降级，如实记录。
