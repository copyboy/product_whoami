---
status: active
mission: web3-roadmap
work-item: M5-WI13
group: "2026-09-08-1104"
verify: [test, build]
---

# 2026-09-08-1104-2-dao-governance-voting 文章「DAO 治理与投票」

> Source: docs/backlog/web3-roadmap.md M5/WI13（文章「DAO 治理与投票」，对应 web3-roadmap-data.json M5.1）
> Related: 2026-09-08-1104-1-defi-aggregators-yield（前置：WI13 依赖 WI12，引言承接其结尾「协议群没有 CEO，组织如何治理」阶段 5 过渡钩子）；2026-09-08-0950-3-flash-loans-arbitrage（治理攻击面呼应其闪电贷内容——治理代币也能被闪电贷借来投票）

## Current Baseline

- 本组为阶段 4 收尾 + 阶段 5 开篇批次（组内执行顺序：2026-09-08-1104-1 → 本计划 → 2026-09-08-1104-3，按文件名 N 前缀排序执行）。目标输出文件 `src/content/blog/dao-governance-voting.mdx` 不存在；前置计划落地后系列已发布 16 篇。本计划执行时若前置计划 2026-09-08-1104-1（M4-WI12）未完成落地（M4.4 未 done），停止执行并上报依赖未满足。
- `src/data/web3-roadmap-data.json` 阶段 5：M5.1-M5.4 全部 `todo`、`articleSlug: null`。M5.1 标题「DAO 治理机制与投票模型」。
- `docs/backlog/web3-roadmap.md` Work Item Status 表 M5/WI13 行 Status `todo`，依赖 WI12；头部「系列已有 N 篇」计数滞后于实际（现写 12 篇，实际已发布 15 篇），前置计划 1104-1 落地时刷新为 16——本计划执行时头部读数应为 16。
- 术语词典 `src/components/web3/GlossaryTerm.astro` 已有：`DAO`（基于智能合约和代币治理的组织形式，成员通过提案和投票共同决策，没有中心化管理层）、`闪电贷`、`MEV`、`智能合约`、`预言机` 等；**没有** `治理代币`、`Quadratic Voting`、`时间锁`、`Snapshot` 词条——本篇核心新概念，按全局规范需 Phase 1 先补。
- 口径来源（roadmap WI13 定义）：Token Voting vs Quadratic Voting 表述须与 report 页 5.2 章节一致（`src/pages/web3/report.astro:573-584`：Token Voting「1 token = 1 票，持币越多话语权越大，优点简单直接，缺点富者越富」；Quadratic Voting「平方投票，票数 = √(代币数)，优点防止鲸鱼控制，缺点复杂度高」）。
- 呼应素材：`flash-loans-arbitrage`（WI11）已发布——闪电贷「同区块借还」机制是「闪电贷借币投票」攻击面的机制基础，roadmap 明文「呼应 WI11 闪电贷——治理代币也能被闪电贷借来投票，故有 snapshot 链下快照投票等缓解」；`defi-aggregators-yield`（前置 WI12 产出）结尾阶段 5 过渡钩子是本篇引言承接点。
- heroImage 现状：前置计划各新增 1 张后，执行时以 `grep -h "heroImage" src/content/blog/*.mdx | sort -u` 现场计数比对，新图须全库唯一并带 `?w=1200&h=630&fit=crop` 后缀。
- `AGENTS.md` 路线图表阶段 5 行现为 `0/4`——仅 M5.4/WI16 完成时更新，本计划不动。
- 验证基线（docs/testing/known-good-baselines.md + mission config commands）：`npm run test:run` exit 0、`npm run build` exit 0 为通过门；`type-check`/`lint` 存量失败不在门内（mission config 已声明 skip）。
- 环境事实：Node v22.22.2 / npm 10.9.7 可用（同日闭合计划审计确认）；`docs/logs/2026/09-08.md` 已存在，追加条目即可（跨日执行则按当日新建）。
- subject 惯例：阶段 5 文章 `subject: "DAO"`（承 2026-09-08-0950-1 Phase 1 Decision 确立的「subject = 阶段主题」惯例，M4 组用 "DeFi"，M5 组用 "DAO"）。

## Goals

- 词典新增 `治理代币`、`Quadratic Voting`、`时间锁`、`Snapshot` 词条，先于文章使用落地。
- 发布文章 `dao-governance-voting`（150-250 行）：从「协议由谁升级」引出链上治理；Token Voting 1 token = 1 票的优缺点 vs Quadratic Voting（口径与 report 页 5.2 一致）；提案-投票-时间锁的完整生命周期（ASCII 流程图）；治理攻击面（闪电贷投票/巨鲸垄断，呼应 WI11 闪电贷——治理代币也能被闪电贷借来投票，故有 Snapshot 链下快照投票等缓解）；结尾完成 M5.1 → M5.2 过渡（治理权来自代币——这个代币本身怎么设计）。
- 数据联动：M5.1 置 `done` + `articleSlug: "dao-governance-voting"`；roadmap M5/WI13 行置 `done`；roadmap 头部系列篇数同步（16 → 17）；`docs/logs/2026/` 当日日志记录条目。
- 验证门通过：`npm run test:run` exit 0；`npm run build` exit 0 且 `dist/blog/dao-governance-voting/index.html` 生成。

## Non-Goals

- 不写 M5.2-M5.4 文章（代币经济学属同组 2026-09-08-1104-3，多签/案例分析属后续批次）。
- 不深入具体 DAO 的组织架构与法律实体问题（ Wyoming DAO LLC 等法律 wrapper 不展开）。
- 不深入治理代币的价值设计（属 M5.2/WI14 范围，本篇只在结尾过渡提及）。
- 不更新 `AGENTS.md` 阶段 5 状态列（仅 M5.4/WI16 完成时更新）。
- 不修复 `type-check` / `lint` 存量失败（非本 mission 通过门，mission config 已声明 skip）。
- 不修改任何站点代码/组件行为、不动 `dapp/` 工程——词典词条是数据级追加。

## Task Route

- Type: `implementation-only change`（纯内容新增：一篇 MDX + 词典词条 + 数据联动，无架构/契约变化）
- Owner Docs: `docs/backlog/web3-roadmap.md`（全局写作规范 + M5 各篇定义 + WI13 定义）、`docs/testing/known-good-baselines.md`（验证口径与存量失败）
- Skill Selection Basis: 无匹配 skill——技术博客写作由 roadmap 全局写作规范约束；`copywriting` 面向营销/多平台文案，与本任务方法不符（同前序计划理由）。

## Infrastructure And Config Prereqs

- Node 环境且 `node_modules/` 已安装（缺失时先 `npm install`）；无其他 infra 依赖；无数据迁移。

## Phase 1 — 词典与口径准备

Targets: `src/components/web3/GlossaryTerm.astro`
Skill: none

- Item Types: `Add | Proof`
- Prereqs: 本组计划 2026-09-08-1104-1 已完成（M4.4 done，阶段 5 开篇依赖阶段 4 收尾的过渡钩子）

- [x] Add: 在 `GlossaryTerm.astro` 的 `definitions` 对象追加四个 key——`治理代币`（Governance Token：赋予持有者协议治理权的代币——提交提案、投票决定协议参数与金库使用；其价值支撑来自治理权与协议的价值捕获设计，而非公司股权）、`Quadratic Voting`（二次方投票：票数按 √(代币数) 计，投票成本随影响力平方增长，巨鲸话语权边际递减，用于缓解 1 token = 1 票的富者越富；代价是机制复杂、需防拆分多账户绕过）、`时间锁`（Timelock：治理执行的延迟窗口——投票通过的提案不立即执行，须等待约 1-2 天窗口期，给社区留出发现恶意提案后的反应时间，是治理合约的标配安全层）、`Snapshot`（最常用的链下投票工具：在指定区块高度对持币地址拍照记账，投票与计票在链下完成、结果回链执行，零 gas 成本；因快照先于投票，天然免疫闪电贷借币投票）。词条文案与既有 `DAO`/`闪电贷` 词条口径一致、风格一致。
- [x] Proof: `grep -n "治理代币\|Quadratic Voting\|时间锁\|Snapshot" src/components/web3/GlossaryTerm.astro` 打印四个新 key 的定义行；重读 report 页 5.2 章节，确认文章将用的 Token Voting / Quadratic Voting 表述与页面逐项一致（1 token = 1 票/√ 计票/优缺点四要素）。

Exit Criteria:

- [x] 词典含 `治理代币`、`Quadratic Voting`、`时间锁`、`Snapshot` 四个 key，先于文章使用落地。
- [x] 投票模型口径与 report 页 5.2 核对一致。

## Phase 2 — 文章写作

Targets: `src/content/blog/dao-governance-voting.mdx`
Skill: none

- Item Types: `Add | Decision | Proof`
- Prereqs: Phase 1（词条已存在，`GlossaryTerm` 才可引用）

- [x] Add: 创建 `src/content/blog/dao-governance-voting.mdx`，frontmatter 满足全局写作规范：`categories: ["Web3"]`、`subject: "DAO"`（承阶段主题惯例，见 Current Baseline）、`tags: ["Web3", "区块链入门", "DAO", "治理"]`、`pubDate` 为执行当天日期、`description` 一段摘要；`heroImage` 为 Unsplash 图（`?w=1200&h=630&fit=crop` 后缀）；标题紧扣 roadmap WI 标签「DAO 治理与投票」。
- [x] Decision: heroImage 选图——执行时 `grep -h "heroImage" src/content/blog/*.mdx` 全库比对唯一后选定；备选主题（投票箱/议会/组织协作视觉）任选，唯一性是硬约束。残余风险：无（可机械复查）。
- [x] Add: 正文 150-250 行，结构遵守全局规范：引言（承接 WI12 结尾「协议群没有 CEO」钩子——阶段 4 的协议群都由谁决定升级与参数）→ 链上治理动机分节（「协议由谁升级」：参数调整、金库支出、合约升级都需要决策权；去中心化协议的合法性来自规则而非公司，`DAO` 词条呼应）→ 投票模型分节（Token Voting 1 token = 1 票的优缺点 vs Quadratic Voting，口径与 report 页 5.2 完全一致；对比表列两模型四要素）→ 生命周期分节（提案-投票-时间锁完整流程，ASCII text 代码块画流程：提案门槛→链上提案→投票期→时间锁窗口→执行；时间锁为什么必要）→ 治理攻击面分节（闪电贷投票——治理代币也能被闪电贷借来投票，呼应 WI11 的同区块借还机制；巨鲸垄断/富者越富；缓解：Snapshot 链下快照投票等——快照先于投票开始故借不到票）→ 总结：治理是权利分配的机器，过渡 M5.2（投票权来自治理代币——这个代币本身怎么发、怎么分、凭什么有价值：代币经济学）。
- [x] Add: 组件使用合规——按系列既有惯例导入组件；`<Highlight>` 仅四种 type（攻击面警示用 `type="danger"`，机制复杂度提示用 `type="warning"`）；`<GlossaryTerm>` 仅引用词典已有 key（含 Phase 1 新增四个，大小写完全一致）；禁止 `client:` 指令；图示全 ASCII text 代码块；数字不确定处用「量级/约」表述，不编造精确值（投票率、提案数量等均用量级表述）。
- [x] Add: 文末「相关文章」内链仅引用已发布 slug（`defi-aggregators-yield` 必引——引言承接；`flash-loans-arbitrage` 必引——闪电贷投票呼应；`smart-contracts-explained` 必引——治理规则即合约代码；其余按相关性精选，slug 必须真实存在）。
- [x] Proof: `wc -l src/content/blog/dao-governance-voting.mdx` 打印值在 150-250；每个 `GlossaryTerm term="X"` 词典命中且大小写一致；heroImage 唯一性复查通过（全库 grep 仅 1 hit）。

Exit Criteria:

- [x] 文章文件存在，frontmatter 全字段合规，行数 150-250。
- [x] 结构完整（引言/治理动机/投票模型/生命周期/攻击面/总结收束与过渡），投票模型口径与 report 页一致、闪电贷投票呼应 WI11、投票率等数字为量级表述。
- [x] 组件与内链合规；heroImage 全库唯一。

## Phase 3 — 数据联动与验证

Targets: `src/data/web3-roadmap-data.json`, `docs/backlog/web3-roadmap.md`, `docs/logs/2026/`
Skill: none

- Item Types: `Add | Proof`
- Prereqs: Phase 2（文章已落地才置 done）

- [x] Add: `web3-roadmap-data.json` 阶段 5 的 M5.1 `status: "todo"` → `"done"`、`articleSlug: null` → `"dao-governance-voting"`；M5.2-M5.4 保持不动（其余阶段全不动）。
- [x] Add: `docs/backlog/web3-roadmap.md` Work Item Status 表 M5/WI13 行 Status `todo` → `done`；同文件头部系列篇数同步刷新为「系列已有 17 篇：阶段 1-4 各四篇 + 阶段 5 一篇」（16 → 17，阶段 5 首篇）。
- [x] Add: `docs/logs/2026/` 当日日志记录条目（当日文件不存在则按 `docs/logs/00-log-writing-guide.md` 约定新建）。
- [x] Proof: `npm run test:run` exit 0。
- [x] Proof: `npm run build` exit 0 且 `test -f dist/blog/dao-governance-voting/index.html` 为真（新文章路由生成）。

Exit Criteria:

- [x] M5.1 done + articleSlug 指向真实存在的文章 slug；roadmap WI13 行 done、头部计数刷新；日志条目在档。
- [x] `test` / `build` 两验证键均 exit 0，新文章路由生成。
- [x] `docs/logs/` 更新（本计划闭环条目）。
- [x] 无 owner-doc 之外的文档更新需求——roadmap 数据文件与 roadmap 本身即 owner doc，已在上述条目覆盖（AGENTS.md 阶段 5 行按 roadmap 定义不在本 WI 范围）。

## Draft Review Record

- dispatch review #review-2026-09-08-094755-mission-driver-2026-09-08-1104-2-dao-governance-voting-1-4fe42980 to opencode-glm53-reviewer
- 2026-09-08：iteration 1，共识 acceptable-after-fixes #review-2026-09-08-094755-mission-driver-2026-09-08-1104-2-dao-governance-voting-1-4fe42980

## Verification

- pass test 2026-09-08-094755-mission-driver exit=0
- pass build 2026-09-08-094755-mission-driver exit=0

## Closure

- dispatch audit #audit-2026-09-08-094755-mission-driver-2026-09-08-1104-2-dao-governance-voting-1-ff9943ec to opencode-glm53-auditor models={exec:opencode-glm53,aud:opencode-glm53}
- accepted #audit-2026-09-08-094755-mission-driver-2026-09-08-1104-2-dao-governance-voting-1-ff9943ec：审计通过——文章 `src/content/blog/dao-governance-voting.mdx` 159 行落地（heroImage 全库唯一带裁剪后缀）、词典四新 key（GlossaryTerm.astro:82-85）先于文章落地、M5.1 done + articleSlug、roadmap WI13 done + 头部计数 17、`docs/logs/2026/09-08.md` 条目在档且与实测一致；审计者独立复跑 `npm run test:run` exit=0（4/4）与 `npm run build` exit=0（617 pages，`dist/blog/dao-governance-voting/index.html` 生成）；typecheck/lint 存量失败为 mission config 声明 skip 项。
