---
status: active
mission: web3-roadmap
work-item: M5-WI14
group: "2026-09-08-1104"
verify: [test, build]
---

# 2026-09-08-1104-3-tokenomics-design 文章「代币经济学设计」

> Source: docs/backlog/web3-roadmap.md M5/WI14（文章「代币经济学设计」，对应 web3-roadmap-data.json M5.2）
> Related: 2026-09-08-1104-2-dao-governance-voting（前置：WI14 依赖 WI13，引言承接其结尾「治理代币怎么发、怎么分、凭什么有价值」过渡钩子）；2026-09-07-1319-3-ethereum-gas-fees（EIP-1559 的 ETH 燃烧口径呼应——供给销毁型曲线）

## Current Baseline

- 本组为阶段 4 收尾 + 阶段 5 开篇批次（组内执行顺序：2026-09-08-1104-1 → 2026-09-08-1104-2 → 本计划，按文件名 N 前缀排序执行）。目标输出文件 `src/content/blog/tokenomics-design.mdx` 不存在；前置计划落地后系列已发布 17 篇。本计划执行时若前置计划 2026-09-08-1104-2（M5-WI13）未完成落地（M5.1 未 done），停止执行并上报依赖未满足。
- `src/data/web3-roadmap-data.json` 阶段 5：M5.2 `todo`、`articleSlug: null`（M5.1 应为前置计划产出 `done`）。M5.2 标题「代币经济学设计」。
- `docs/backlog/web3-roadmap.md` Work Item Status 表 M5/WI14 行 Status `todo`，依赖 WI13；头部「系列已有 N 篇」计数滞后于实际（现写 12 篇，实际已发布 15 篇），前置链 1104-1 落地时刷新为 16、1104-2 刷新为 17——本计划执行时头部读数应为 17，读数不符即前置计划未完成落地。
- 术语词典 `src/components/web3/GlossaryTerm.astro` 已有：`EIP1559`（基础费燃烧机制）、`ERC20`、`DAO`、`DeFi`、`闪电贷`、`清算` 等；前置计划 2026-09-08-1104-2 新增 `治理代币`（本篇直接复用）；**没有** `代币经济学`、`Vesting` 词条——本篇核心新概念，按全局规范需 Phase 1 先补。
- 口径来源（roadmap WI14 定义）：分配结构典型区间沿用 report 页 5.3 章节表述（`src/pages/web3/report.astro:604-612`：团队 15-20%（锁仓+归属）、投资者 10-15%（通常有折扣）、国库 20-30%（持续运营）、社区 40-50%（空投/流动性挖矿））并**标注为常见区间而非标准**；代币职能三分法（治理权/价值捕获/激励层）同出 report 页 5.3。
- 呼应素材：`dao-governance-voting`（前置 WI13 产出）结尾过渡钩子是本篇引言承接点；`ethereum-gas-fees`（WI3）已发布——EIP-1559 基础费燃烧使 ETH 具备通缩可能，是「销毁型供给曲线」的站内既有口径（与 `EIP1559` 词典词条一致）；`uniswap-amm-explained`/`defi-aggregators-yield` 的流动性激励与 APY 提示是「纯激励驱动死亡螺旋」的呼应对象。
- heroImage 现状：前置计划各新增 1 张后，执行时以 `grep -h "heroImage" src/content/blog/*.mdx | sort -u` 现场计数比对，新图须全库唯一并带 `?w=1200&h=630&fit=crop` 后缀。
- `AGENTS.md` 路线图表阶段 5 行现为 `0/4`——仅 M5.4/WI16 完成时更新，本计划不动。
- 验证基线（docs/testing/known-good-baselines.md + mission config commands）：`npm run test:run` exit 0、`npm run build` exit 0 为通过门；`type-check`/`lint` 存量失败不在门内（mission config 已声明 skip）。
- 环境事实：Node v22.22.2 / npm 10.9.7 可用（同日闭合计划审计确认）；`docs/logs/2026/09-08.md` 已存在，追加条目即可（跨日执行则按当日新建）。
- subject 惯例：阶段 5 文章 `subject: "DAO"`（承 2026-09-08-0950-1 Phase 1 Decision 确立的「subject = 阶段主题」惯例，与同组 1104-2 一致）。

## Goals

- 词典新增 `代币经济学`、`Vesting` 词条，先于文章使用落地。
- 发布文章 `tokenomics-design`（150-250 行）：供给曲线（固定上限/通胀/销毁三型，呼应 EIP-1559 的 ETH 燃烧口径）；分配结构与归属（vesting/锁仓，团队/投资者/国库/社区的典型区间沿用 report 页 5.3 的 15-20%/10-15%/20-30%/40-50% 表述并标注为常见区间而非标准）；价值捕获（手续费分红/回购/治理权）与「治理代币为什么有价值」；警惕纯激励驱动的死亡螺旋；结尾完成 M5.2 → M5.3 过渡（规则与激励都有了，钥匙归谁管——多签与权限管理）。
- 数据联动：M5.2 置 `done` + `articleSlug: "tokenomics-design"`；roadmap M5/WI14 行置 `done`；roadmap 头部系列篇数同步（17 → 18）；`docs/logs/2026/` 当日日志记录条目。
- 验证门通过：`npm run test:run` exit 0；`npm run build` exit 0 且 `dist/blog/tokenomics-design/index.html` 生成。

## Non-Goals

- 不写 M5.3/M5.4 文章（多签/DAO 案例分析属后续批次）。
- 不做任何代币发行/估值的实操指引或投资建议（文章讲设计原理与风险，不评估具体项目代币）。
- 不展开证券法/监管定性问题（Howey 测试等一句不提或至多一句带过，roadmap 未要求）。
- 不更新 `AGENTS.md` 阶段 5 状态列（仅 M5.4/WI16 完成时更新）。
- 不修复 `type-check` / `lint` 存量失败（非本 mission 通过门，mission config 已声明 skip）。
- 不修改任何站点代码/组件行为、不动 `dapp/` 工程——词典词条是数据级追加。

## Task Route

- Type: `implementation-only change`（纯内容新增：一篇 MDX + 词典词条 + 数据联动，无架构/契约变化）
- Owner Docs: `docs/backlog/web3-roadmap.md`（全局写作规范 + M5 各篇定义 + WI14 定义）、`docs/testing/known-good-baselines.md`（验证口径与存量失败）
- Skill Selection Basis: 无匹配 skill——技术博客写作由 roadmap 全局写作规范约束；`copywriting` 面向营销/多平台文案，与本任务方法不符（同前序计划理由）。

## Infrastructure And Config Prereqs

- Node 环境且 `node_modules/` 已安装（缺失时先 `npm install`）；无其他 infra 依赖；无数据迁移。

## Phase 1 — 词典与口径准备

Targets: `src/components/web3/GlossaryTerm.astro`
Skill: none

- Item Types: `Add | Proof`
- Prereqs: 本组计划 2026-09-08-1104-2 已完成（M5.1 done，引言承接其治理代币钩子；`治理代币` 词条已存在可复用）

- [ ] Add: 在 `GlossaryTerm.astro` 的 `definitions` 对象追加两个 key——`代币经济学`（Tokenomics：代币的供给、分配与价值捕获设计——总量曲线（固定上限/通胀/销毁）、各方分配与解锁节奏、协议收入如何回流持币者；它决定代币是可持续的协作协调工具还是击鼓传花的筹码）、`Vesting`（归属/锁仓：代币分期的解锁机制——团队与投资者份额通常按锁仓期加线性归属逐步解锁，防止早期持有人在上市初期集中抛售砸盘；解锁日程是供给端最大的短期变量）。词条文案与既有 `治理代币`/`EIP1559` 词条口径一致、风格一致。
- [ ] Proof: `grep -n "代币经济学\|Vesting" src/components/web3/GlossaryTerm.astro` 打印两个新 key 的定义行；重读 report 页 5.3 章节，确认文章将用的分配区间与代币职能表述与页面逐项一致（15-20%/10-15%/20-30%/40-50% 四组数字及括注）。

Exit Criteria:

- [ ] 词典含 `代币经济学`、`Vesting` 两个 key，先于文章使用落地。
- [ ] 分配区间与代币职能口径与 report 页 5.3 核对一致。

## Phase 2 — 文章写作

Targets: `src/content/blog/tokenomics-design.mdx`
Skill: none

- Item Types: `Add | Decision | Proof`
- Prereqs: Phase 1（词条已存在，`GlossaryTerm` 才可引用）

- [ ] Add: 创建 `src/content/blog/tokenomics-design.mdx`，frontmatter 满足全局写作规范：`categories: ["Web3"]`、`subject: "DAO"`（承阶段主题惯例，见 Current Baseline）、`tags: ["Web3", "区块链入门", "代币经济学", "Tokenomics"]`、`pubDate` 为执行当天日期、`description` 一段摘要；`heroImage` 为 Unsplash 图（`?w=1200&h=630&fit=crop` 后缀）；标题紧扣 roadmap WI 标签「代币经济学设计」。
- [ ] Decision: heroImage 选图——执行时 `grep -h "heroImage" src/content/blog/*.mdx` 全库比对唯一后选定；备选主题（天平/曲线/铸造视觉）任选，唯一性是硬约束。残余风险：无（可机械复查）。
- [ ] Add: 正文 150-250 行，结构遵守全局规范：引言（承接 WI13 结尾「治理代币怎么发、怎么分、凭什么有价值」钩子）→ 供给曲线分节（固定上限/通胀/销毁三型各举机制；ETH 的 EIP-1559 基础费燃烧作为「销毁型」站内既有口径呼应 WI3；ASCII text 代码块画三型供给曲线示意）→ 分配结构与归属分节（典型区间沿用 report 页 5.3 的 15-20%/10-15%/20-30%/40-50% 并明确标注为常见区间而非标准；vesting/锁仓防砸盘的机制；解锁日程 = 供给端短期变量）→ 价值捕获分节（手续费分红/回购/治理权三路线；「治理代币为什么有价值」：价值来自协议收入权与治理权的制度设计，不是发币自然增值；代币职能三分法与 report 页一致）→ 风险提示分节（纯激励驱动的死亡螺旋：高补贴吸引挖矿→抛压→价格跌→补贴缩水→资金流失的循环；呼应 WI12 的「APY 高≠好」理性提示）→ 总结：代币是组织的宪法与燃料，过渡 M5.3（规则与激励都有了，钥匙归谁管——多签与权限管理）。
- [ ] Add: 组件使用合规——按系列既有惯例导入组件；`<Highlight>` 仅四种 type（死亡螺旋警示用 `type="danger"`，区间非标准提示用 `type="warning"`）；`<GlossaryTerm>` 仅引用词典已有 key（含 Phase 1 新增两个，大小写完全一致）；禁止 `client:` 指令；图示全 ASCII text 代码块；数字不确定处用「量级/约」表述，不编造精确值（各项目解锁规模、回购金额等均用量级表述；分配区间须带「常见区间」限定语）。
- [ ] Add: 文末「相关文章」内链仅引用已发布 slug（`dao-governance-voting` 必引——引言承接与治理代币复用；`ethereum-gas-fees` 必引——EIP-1559 燃烧口径呼应；`defi-aggregators-yield` 必引——死亡螺旋呼应其 APY 理性提示；其余按相关性精选，slug 必须真实存在）。
- [ ] Proof: `wc -l src/content/blog/tokenomics-design.mdx` 打印值在 150-250；每个 `GlossaryTerm term="X"` 词典命中且大小写一致；heroImage 唯一性复查通过（全库 grep 仅 1 hit）。

Exit Criteria:

- [ ] 文章文件存在，frontmatter 全字段合规，行数 150-250。
- [ ] 结构完整（引言/供给曲线/分配与归属/价值捕获/死亡螺旋/总结收束与过渡），分配区间与 report 页一致且标注常见区间、EIP-1559 口径与 WI3 一致。
- [ ] 组件与内链合规；heroImage 全库唯一；无投资建议式内容。

## Phase 3 — 数据联动与验证

Targets: `src/data/web3-roadmap-data.json`, `docs/backlog/web3-roadmap.md`, `docs/logs/2026/`
Skill: none

- Item Types: `Add | Proof`
- Prereqs: Phase 2（文章已落地才置 done）

- [ ] Add: `web3-roadmap-data.json` 阶段 5 的 M5.2 `status: "todo"` → `"done"`、`articleSlug: null` → `"tokenomics-design"`；M5.3/M5.4 保持不动（其余阶段全不动）。
- [ ] Add: `docs/backlog/web3-roadmap.md` Work Item Status 表 M5/WI14 行 Status `todo` → `done`；同文件头部系列篇数同步刷新（17 → 18，阶段 5 第二篇）。
- [ ] Add: `docs/logs/2026/` 当日日志记录条目（当日文件不存在则按 `docs/logs/00-log-writing-guide.md` 约定新建）。
- [ ] Proof: `npm run test:run` exit 0。
- [ ] Proof: `npm run build` exit 0 且 `test -f dist/blog/tokenomics-design/index.html` 为真（新文章路由生成）。

Exit Criteria:

- [ ] M5.2 done + articleSlug 指向真实存在的文章 slug；roadmap WI14 行 done、头部计数刷新；日志条目在档。
- [ ] `test` / `build` 两验证键均 exit 0，新文章路由生成。
- [ ] `docs/logs/` 更新（本计划闭环条目）。
- [ ] 无 owner-doc 之外的文档更新需求——roadmap 数据文件与 roadmap 本身即 owner doc，已在上述条目覆盖（AGENTS.md 阶段 5 行按 roadmap 定义不在本 WI 范围）。

## Draft Review Record

- dispatch review #review-2026-09-08-094755-mission-driver-2026-09-08-1104-3-tokenomics-design-1-96693ae3 to ses_opencode_1
- 2026-09-08：iteration 1，共识 acceptable-after-fix #review-2026-09-08-094755-mission-driver-2026-09-08-1104-3-tokenomics-design-1-96693ae3
- review notes: 无 Blocker；活库核验基线断言一致（M5.2 todo/articleSlug null、WI14 行 todo 依赖 WI13、词典无「代币经济学/Vesting」、report.astro:604-612 分配区间四组数字逐项一致、计数链 12→16→17→18 与同组计划衔接）；Minor 一处已就地修复——Current Baseline 补 backlog 头部计数滞后现状与执行时预期读数 17。上游依赖（1104-2 未落地）属执行期检查，非计划缺陷。

## Verification

## Closure
