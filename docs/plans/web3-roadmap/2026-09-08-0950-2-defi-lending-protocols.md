---
status: active
mission: web3-roadmap
work-item: M4-WI10
group: "2026-09-08-0950"
verify: [test, build]
---

# 2026-09-08-0950-2-defi-lending-protocols 文章「借贷协议」

> Source: docs/backlog/web3-roadmap.md M4/WI10（文章「借贷协议」，对应 web3-roadmap-data.json M4.2）
> Related: 2026-09-08-0950-1-uniswap-amm-explained（前置：WI10 依赖 WI9，引言承接其结尾「价格有了，借贷呢」钩子）；2026-09-08-0950-3-flash-loans-arbitrage（依赖本计划：WI11 依赖 WI10）

## Current Baseline

- 目标输出文件 `src/content/blog/defi-lending-protocols.mdx` 不存在；Web3 系列已发布 12 篇（slug 清单见 roadmap 表）；本计划执行时若前置计划 2026-09-08-0950-1（M4-WI9）未完成落地（M4.1 未 done），停止执行并上报依赖未满足。
- `src/data/web3-roadmap-data.json` 阶段 4：M4.1 应为 `done` + `articleSlug: "uniswap-amm-explained"`（前置计划产出）；M4.2-M4.4 `todo`、`articleSlug: null`。M4.2 标题「借贷协议（Aave / Compound）」。
- `docs/backlog/web3-roadmap.md` Work Item Status 表 M4/WI10 行 Status `todo`，依赖 WI9。
- 术语词典 `src/components/web3/GlossaryTerm.astro` 已有：`Aave`（最大的去中心化借贷协议……支持闪电贷）、`MakerDAO`（DAI 发行协议，超额抵押生成 DAI，DSR 让 DAI 持有者获得存款收益）、`Health Factor`（HF < 1 触发自动清算）、`清算`（Keeper 机器人自动执行，清算人获得 5-10% 罚金）、`DeFi`、`EVM`、`Gas`、`EIP1559` 等；**没有** `稳定币`、`aToken`、`超额抵押` 词条——本篇核心新概念，按全局规范需 Phase 1 先补（DSR/PSM 口径以既有 `MakerDAO` 词条与 report 页为准，不另立词条）。
- 口径来源（roadmap M4 共识 + WI10 定义）：`src/pages/web3/report.astro` 阶段 4.3 小节——Aave V3 池化借贷/超额抵押、利率模型（利用率越高利率越高）、HF < 1 → 清算、闪电贷同区块归还；MakerDAO 超额抵押 ETH 生成 DAI、PSM 模块 1:1 抵押 USDC 生成 DAI、DSR 存款利率；清算罚金 5-10% 量级表述。
- 呼应素材：`ethereum-gas-fees`（WI3）已发布——清算的经济学动机（清算机器人竞相执行有利可图的清算，gas 竞价是成本项）可与该篇 gas 口径衔接；`uniswap-amm-explained`（前置 WI9 产出）结尾钩子「价格有了，借贷呢」是本篇引言承接点。
- heroImage 现状：全库 `grep -h "heroImage" src/content/blog/*.mdx | sort -u` 去重比对（前置计划新增 1 张后为 15 个不同值，含模板占位），新图须全库唯一并带 `?w=1200&h=630&fit=crop` 后缀。
- `AGENTS.md` 路线图表阶段 4 行现为 `0/4`——仅 M4.4/WI12 完成时更新，本计划不动。
- 验证基线（docs/testing/known-good-baselines.md）：`npm run build` exit 0、`npm run test:run` exit 0 为通过门；`type-check`/`lint` 存量失败不在门内。
- 环境事实：Node v22.22.2 / npm 10.9.7 可用；`docs/logs/2026/09-08.md` 若前置计划已建则追加，否则按 `docs/logs/00-log-writing-guide.md` 新建。

## Goals

- 词典新增 `稳定币`、`aToken`、`超额抵押` 词条，先于文章使用落地。
- 发布文章 `defi-lending-protocols`（150-250 行）：超额抵押为什么是去中心化借贷的前提（无信用记录、无追索权，靠保证金约束违约动机）；Aave 模式拆解（aTokens、利用率利率模型、Health Factor、清算流程与罚金——罚金用量级表述）；Compound 的 cTokens 对照一句带过；MakerDAO 与 DAI 的稳定币视角（超额抵押铸 DAI、DSR/PSM，口径与词典及 report 页一致）；呼应 WI3 的 gas（清算的经济学动机）；结尾完成 M4.2 → M4.3 过渡（池子里的钱谁都可能借——包括不还也行的「闪电贷」）。
- 数据联动：M4.2 置 `done` + `articleSlug: "defi-lending-protocols"`；roadmap M4/WI10 行置 `done`；`docs/logs/2026/` 当日日志记录条目。
- 验证门通过：`npm run test:run` exit 0；`npm run build` exit 0 且 `dist/blog/defi-lending-protocols/index.html` 生成。

## Non-Goals

- 不写 M4.3/M4.4 文章（WI11 有独立 plan 见 Related；WI12 后续批次）。
- 不展开闪电贷机制细节（属 WI11/M4.3 范围，本篇仅在 Aave 能力清单与结尾过渡处提及）。
- 不更新 `AGENTS.md` 阶段 4 状态列（仅 M4.4/WI12 完成时更新）。
- 不修复 `type-check` / `lint` 存量失败（非本 mission 通过门）。
- 不修改任何站点代码/组件行为、不动 `dapp/` 工程——词典词条是数据级追加。
- 不给真实利率/利率曲线参数编造精确值——利率模型只讲机制方向（利用率越高利率越高），具体 APY 用「量级/约」表述。

## Task Route

- Type: `implementation-only change`（纯内容新增：一篇 MDX + 词典词条 + 数据联动，无架构/契约变化）
- Owner Docs: `docs/backlog/web3-roadmap.md`（全局写作规范 + M4 共识口径 + WI10 定义）、`src/pages/web3/report.astro`（阶段 4.3 口径，只读对照）、`docs/testing/known-good-baselines.md`（验证口径与存量失败）
- Skill Selection Basis: 无匹配 skill——技术博客写作由 roadmap 全局写作规范约束；`copywriting` 面向营销/多平台文案，与本任务方法不符（同前序计划理由）。

## Infrastructure And Config Prereqs

- Node 环境且 `node_modules/` 已安装（缺失时先 `npm install`）；无其他 infra 依赖；无数据迁移。

## Phase 1 — 词典与口径准备

Targets: `src/components/web3/GlossaryTerm.astro`（`src/pages/web3/report.astro` 只读对照）
Skill: none

- Item Types: `Add | Proof`
- Prereqs: 计划 2026-09-08-0950-1 已完成（M4.1 done，依赖链 WI9 → WI10 满足）

- [x] Add: 在 `GlossaryTerm.astro` 的 `definitions` 对象追加三个 key——`稳定币`（Stablecoin：锚定法币价值（通常 1 美元）的加密货币，如 DAI、USDC；去中心化发行路线靠超额抵押与清算维持锚定，对照中心化托管路线一句带过）、`aToken`（Aave 的生息存款凭证：存款入池后收到 aToken，余额随利息自动增长，赎回时 1:1 取回底层资产；Compound 的对应物是 cToken）、`超额抵押`（Overcollateralization：抵押品价值高于借款金额的借贷前提——链上没有信用记录与追索权，只能靠「抵押品够多 + 随时可清算」约束违约动机）。词条文案与既有 `Aave`/`MakerDAO`/`Health Factor`/`清算` 词条口径一致、风格一致。
- [x] Proof: `grep -n "稳定币\|aToken\|超额抵押" src/components/web3/GlossaryTerm.astro` 打印三个新 key 的定义行；重读 report.astro 阶段 4.3 小节与既有 `MakerDAO`/`清算` 词条，确认文章将用的 DAI/DSR/PSM/清算罚金口径与三处来源逐项一致（PSM = 1:1 抵押 USDC 生成 DAI；清算罚金 5-10% 量级）。

Exit Criteria:

- [x] 词典含 `稳定币`、`aToken`、`超额抵押` 三个 key，先于文章使用落地。
- [x] DAI/DSR/PSM/清算口径与 report 页及既有词条核对一致。

## Phase 2 — 文章写作

Targets: `src/content/blog/defi-lending-protocols.mdx`
Skill: none

- Item Types: `Add | Decision | Proof`
- Prereqs: Phase 1（词条已存在，`GlossaryTerm` 才可引用）

- [x] Add: 创建 `src/content/blog/defi-lending-protocols.mdx`，frontmatter 满足全局写作规范：`categories: ["Web3"]`、`subject: "DeFi"`（承 2026-09-08-0950-1 Phase 1 Decision 的阶段主题惯例）、`tags: ["Web3", "区块链入门", "DeFi", "Aave"]`、`pubDate` 为执行当天日期、`description` 一段摘要；`heroImage` 为 Unsplash 图（`?w=1200&h=630&fit=crop` 后缀）。
- [x] Decision: heroImage 选图——执行时 `grep -h "heroImage" src/content/blog/*.mdx` 全库比对唯一后选定；备选主题（抵押/金库/利率视觉）任选，唯一性是硬约束。残余风险：无（可机械复查）。（选定 photo-1553729459-efe14ef6055d，全库唯一 1 hit）
- [x] Add: 正文 150-250 行，结构遵守全局规范：引言（承接 WI9 结尾「价格有了，借贷呢」，回到阶段 4 painPoint——没有信用记录的人怎么借钱）→ 超额抵押为什么是前提分节（无许可环境无信用记录、无追索权，保证金 + 随时清算替代征信；对比 TradFi 抵押贷/信用贷一句话）→ Aave 模式拆解分节（池化借贷：存款人入池收 aToken 生息；利用率利率模型方向性讲解；Health Factor 计算含义与清算流程，罚金 5-10% 量级表述；ASCII text 代码块画一笔借款-价格下跌-清算的时间线示意）→ Compound cTokens 对照一句带过 → MakerDAO 与 DAI 分节（超额抵押 ETH 铸 DAI 的稳定币视角、DSR、PSM，口径与词典/report 一致）→ 呼应 WI3 gas 分节（清算的经济学动机：清算利润吸引 Keeper 机器人竞速，gas 竞价是成本项——保证金安全的最后一道防线是经济激励而非善意）→ 总结：过渡 M4.3（「池子里的规则是同区块借还，不还就整体回滚——闪电贷」）。
- [x] Add: 组件使用合规——按系列既有惯例导入组件；`<Highlight>` 仅四种 type；`<GlossaryTerm>` 仅引用词典已有 key（含 Phase 1 新增三个，大小写完全一致）；禁止 `client:` 指令；图示全 ASCII text 代码块；数字不确定处用「量级/约」表述，不编造精确值。
- [x] Add: 文末「相关文章」内链仅引用已发布 slug（`uniswap-amm-explained` 必引——前篇钩子承接；`ethereum-gas-fees` 必引——清算经济学呼应；其余按相关性精选，slug 必须真实存在）。
- [x] Proof: `wc -l src/content/blog/defi-lending-protocols.mdx` 打印值在 150-250；每个 `GlossaryTerm term="X"` 词典命中且大小写一致；heroImage 唯一性复查通过（全库 grep 仅 1 hit）。（实测 170 行；10 个 term 全部命中词典；photo-1553729459-efe14ef6055d 全库 1 hit）

Exit Criteria:

- [x] 文章文件存在，frontmatter 全字段合规，行数 150-250。
- [x] 结构完整（引言/超额抵押前提/Aave 拆解/cToken 对照/DAI 视角/gas 呼应/总结过渡），清算罚金等口径与 report 及词典一致且为量级表述。
- [x] 组件与内链合规；heroImage 全库唯一。

## Phase 3 — 数据联动与验证

Targets: `src/data/web3-roadmap-data.json`, `docs/backlog/web3-roadmap.md`, `docs/logs/2026/`
Skill: none

- Item Types: `Add | Proof`
- Prereqs: Phase 2（文章已落地才置 done）

- [x] Add: `web3-roadmap-data.json` 阶段 4 的 M4.2 `status: "todo"` → `"done"`、`articleSlug: null` → `"defi-lending-protocols"`；M4.3/M4.4 保持不动（其余阶段全不动）。
- [x] Add: `docs/backlog/web3-roadmap.md` Work Item Status 表 M4/WI10 行 Status `todo` → `done`。
- [x] Add: `docs/logs/2026/` 当日日志记录条目（当日文件不存在则按 `docs/logs/00-log-writing-guide.md` 约定新建）。（09-08.md 已由前置计划建立，追加 M4/WI10 段落）
- [x] Proof: `npm run test:run` exit 0。（4/4 passed）
- [x] Proof: `npm run build` exit 0 且 `test -f dist/blog/defi-lending-protocols/index.html` 为真（新文章路由生成）。（603 pages built；DIST_OK）

Exit Criteria:

- [x] M4.2 done + articleSlug 指向真实存在的文章 slug；roadmap WI10 行 done；日志条目在档。
- [x] `test` / `build` 两验证键均 exit 0，新文章路由生成。
- [x] `docs/logs/` 更新（本计划闭环条目）。
- [x] 无 owner-doc 之外的文档更新需求——roadmap 数据文件与 roadmap 本身即 owner doc，已在上述条目覆盖。

## Draft Review Record

- dispatch review #review-2026-09-08-094755-mission-driver-2026-09-08-0950-2-defi-lending-protocols-1-f3cd91a2 to ses-opencode-glm53
- 2026-09-08：iteration 1，共识 acceptable-as-is #review-2026-09-08-094755-mission-driver-2026-09-08-0950-2-defi-lending-protocols-1-f3cd91a2

## Verification

- pass test 2026-09-08-094755-mission-driver exit=0
- pass build 2026-09-08-094755-mission-driver exit=0
- pass test 2026-09-08-094755-mission-driver-r2 exit=0
- pass build 2026-09-08-094755-mission-driver-r2 exit=0

## Closure

- dispatch audit #audit-2026-09-08-094755-mission-driver-2026-09-08-0950-2-defi-lending-protocols-1-a7d5ab30 to ses-opencode-glm53 models={exec:glm-5.3,aud:glm-5.3}
- accepted #audit-2026-09-08-094755-mission-driver-2026-09-08-0950-2-defi-lending-protocols-1-a7d5ab30：审计通过——全部 22 项勾选与实仓一致（文章 170 行、词典三新词条、M4.2 done+articleSlug、roadmap WI10 done、日志在档）；`npm run test:run` exit=0（4/4）、`npm run build` exit=0（603 pages）且 `dist/blog/defi-lending-protocols/index.html` 生成；10 个 GlossaryTerm 引用全部命中词典、heroImage 全库唯一（1 hit）、内链 slug 真实存在、无 client: 指令；exec/aud 同为 glm-5.3，单模型降级如实记录。
