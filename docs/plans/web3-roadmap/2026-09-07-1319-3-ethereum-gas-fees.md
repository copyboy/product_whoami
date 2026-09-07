---
status: active
mission: web3-roadmap
work-item: M2-WI3
group: "2026-09-07-1319"
verify: [test, build]
---

# 2026-09-07-1319-3-ethereum-gas-fees 文章「Gas 为什么存在，怎么计算」

> Source: docs/backlog/web3-roadmap.md M2/WI3（文章「Gas 为什么存在，怎么计算」，对应 web3-roadmap-data.json M2.3）
> Related: 2026-09-07-1319-2-evm-deep-dive（前置：WI2，先落地——本篇引言承接其「执行计价」过渡）；M2/WI4 为后续轮次另行起草

## Current Baseline

- 目标输出文件 `src/content/blog/ethereum-gas-fees.mdx` 不存在；Web3 系列已发布 4 篇 Bitcoin 文章。
- `src/data/web3-roadmap-data.json` 阶段 2 M2.3 为 `status: "todo"`、`articleSlug: null`。
- `docs/backlog/web3-roadmap.md` Work Item Status 表 M2/WI3 行 Status 为 `todo`，依赖 WI2。
- 术语词典 `GlossaryTerm.astro` 已有 `Gas`（费用 = Gas 消耗量 × Gas 单价 gwei）、`EIP1559`（基础费燃烧机制）、`Blob`（Dencun / L2 数据发布降费 10-100 倍）、`Layer2`、`Rollup`、`MEV` 等 key；**没有** `gwei` 词条。
- 口径来源 `src/pages/web3/report.astro` 第 287 行：「以太坊主网 Gas 通常在个位数到几十 gwei 波动（Dencun 升级后长期低于 10 gwei），L2 (Arbitrum/Base) Gas 不足 0.01 gwei，费用差距可达 1000倍」——本篇 blob/L2 费用论述必须与该口径一致。
- 前两篇计划落地后的前置状态：`account-model-vs-utxo`、`evm-deep-dive` 已发布，M2.1/M2.2 done——本篇「相关文章」可内链这 6 个真实 slug。
- `Highlight`（四种 type）、ASCII 图示、150-250 行、frontmatter 规范同前两篇计划所载。
- 验证门与存量失败口径同前：`build` + `test:run` 为门，`type-check`/`lint` 不在门内（docs/testing/known-good-baselines.md）。

## Goals

- 发布文章 `ethereum-gas-fees`：Gas 的三重意义（计量资源、防滥用/停机问题、定价市场）；费用公式 = gasUsed × gasPrice；EIP-1559 的 base fee（燃烧、目标 50% 利用率自动调节）+ priority fee（小费）；gwei 单位换算给一个手算例子；blob（EIP-4844）如何把 L2 费用打下来（口径与 report 页一致）。
- 词典新增 `gwei` 词条并在文中使用。
- 数据联动：M2.3 置 `done` + `articleSlug: "ethereum-gas-fees"`；roadmap M2/WI3 行置 `done`；当日日志记录条目。
- 验证门通过：`npm run build` exit 0 且 `dist/blog/ethereum-gas-fees/index.html` 生成；`npm run test:run` exit 0。

## Non-Goals

- 不写 M2/WI4 文章与 M3/WI5 笔记（后续轮次另行起草）。
- 不更新 `AGENTS.md` 阶段 2 状态列（仅 M2.4/WI4 完成时更新）。
- 不修复 `type-check` / `lint` 存量失败。
- 不改 `src/pages/web3/report.astro`（单向口径对齐）。

## Task Route

- Type: `implementation-only change`（纯内容新增：一篇 MDX + 词典词条 + 数据联动）
- Owner Docs: `docs/backlog/web3-roadmap.md`（全局写作规范 + WI3 定义）、`src/pages/web3/report.astro`（费用数字口径来源，只读）
- Skill Selection Basis: 无匹配 skill——同 WI1 计划理由。

## Infrastructure And Config Prereqs

- Node 环境且 `node_modules/` 已安装；无其他 infra 依赖；无数据迁移。

## Phase 1 — 词典与口径准备

Targets: `src/components/web3/GlossaryTerm.astro`, `src/pages/web3/report.astro`（只读，仅作口径核对，不改）
Skill: none

- Item Types: `Add | Proof`
- Prereqs: 计划 2026-09-07-1319-2 已完成（M2.2 done，依赖链 WI2 → WI3）

- [ ] Add: 在 `GlossaryTerm.astro` 的 `definitions` 追加 key `gwei`（以太坊 gas 价最小常用单位，1 gwei = 10^-9 ETH；费用换算桥梁：gasUsed × gasPrice(gwei) 再换算为 ETH）。风格与既有词条一致，且与 `Gas`、`EIP1559` 词条口径不冲突。
- [ ] Proof: `grep -n "\"gwei\"\|gwei" src/components/web3/GlossaryTerm.astro` 打印新 key 定义行；重读 `report.astro` 第 287 行费用口径与既有 `Gas`/`EIP1559`/`Blob` 词条，列出本篇数字必须一致的清单（主网个位数到几十 gwei、Dencun 后长期低于 10 gwei、L2 不足 0.01 gwei、差距可达 1000 倍、blob 降费 10-100 倍）。

Exit Criteria:

- [ ] 词典含 `gwei` key，先于文章使用落地。
- [ ] 口径清单核对完成并作为写作输入。

## Phase 2 — 文章写作

Targets: `src/content/blog/ethereum-gas-fees.mdx`
Skill: none

- Item Types: `Add | Decision | Proof`
- Prereqs: Phase 1

- [ ] Add: 创建 `src/content/blog/ethereum-gas-fees.mdx`，frontmatter：`title`（与文章主题一致）、`categories: ["Web3"]`、`subject: "Ethereum"`、`tags: ["Web3", "区块链入门", "Ethereum", "Gas"]`、`pubDate` 执行当天、`description` 摘要、`heroImage` 为 Unsplash 图（`?w=1200&h=630&fit=crop`）。
- [ ] Decision: heroImage 选图——`grep -h "heroImage" src/content/blog/*.mdx` 比对确认全库唯一后选定（主题任选，唯一性是硬约束）。残余风险：无。
- [ ] Decision: 手算例子参数——选一组自洽的示范数字（如简单转账 21000 gas × 某个位数 gwei 单价），在文中完整算出 ETH 与法币量级；要求：每个数字标注「示例值」，gas 单价取值落在 report 页「主网个位数到几十 gwei」区间内，不得虚构该区间外的行情。备选：引用某真实历史交易日行情——否决，无法可靠核验且易过时。残余风险：读者误当实时行情——以「示例值」标注缓解。
- [ ] Add: 正文 150-250 行：引言（承接 EVM 篇结尾「执行每一步都要计价」）→ Gas 三重意义分节（计量资源 / 防滥用与停机问题——无 Gas 则死循环可瘫痪网络 / 定价市场）→ 费用公式与 EIP-1559 分节（base fee 燃烧 + 目标 50% 利用率自动调节 + priority fee 小费；ASCII text 代码块画一笔交易的费用构成拆解）→ gwei 换算手算例子 → blob（EIP-4844）如何把 L2 费用打下来（对齐 Phase 1 口径清单）→ 总结：阶段内过渡，引出「这些规则由谁写、由谁执行」指向智能合约。
- [ ] Add: 组件使用合规——`<Highlight>` 仅四种 type；`<GlossaryTerm>` 仅引用词典已有 key（含新增 `gwei` 与已有 `Gas`/`EIP1559`/`Blob`/`Layer2`）；无 `client:` 指令；图示全 ASCII。
- [ ] Add: 文末「相关文章」内链仅引用已发布 slug：4 篇 Bitcoin 文章 + `account-model-vs-utxo` + `evm-deep-dive`（前置计划已保证存在；执行时若前置未落地，停止执行并上报依赖未满足）。
- [ ] Proof: `wc -l` 打印值 150-250；每个 `GlossaryTerm term="X"` 词典命中且大小写一致；heroImage 唯一性复查通过；文中数字与 Phase 1 口径清单逐项比对一致。

Exit Criteria:

- [ ] 文章文件存在，frontmatter 全字段合规，行数 150-250。
- [ ] 三重意义 / 公式与 EIP-1559 / 手算例子 / blob 四个内容块齐备，结尾完成向智能合约的过渡。
- [ ] 组件与内链合规；全部数字与 report 页及词典口径一致。
- [ ] heroImage 全库唯一。

## Phase 3 — 数据联动与验证

Targets: `src/data/web3-roadmap-data.json`, `docs/backlog/web3-roadmap.md`, `docs/logs/2026/`
Skill: none

- Item Types: `Add | Proof`
- Prereqs: Phase 2

- [ ] Add: `web3-roadmap-data.json` 阶段 2 的 M2.3 `status: "todo"` → `"done"`、`articleSlug: null` → `"ethereum-gas-fees"`；其余 milestone 不动。
- [ ] Add: `docs/backlog/web3-roadmap.md` Work Item Status 表 M2/WI3 行 Status `todo` → `done`。
- [ ] Add: `docs/logs/2026/` 当日日志条目（追加或按日志指南新建当日文件）。
- [ ] Proof: `npm run test:run` exit 0。
- [ ] Proof: `npm run build` exit 0 且 `test -f dist/blog/ethereum-gas-fees/index.html` 为真。

Exit Criteria:

- [ ] M2.3 done + articleSlug 正确；roadmap WI 行 done；日志条目在档。
- [ ] `npm run test:run` 与 `npm run build` 均 exit 0，新文章路由生成。
- [ ] `docs/logs/` 更新（本计划闭环条目）。

## Draft Review Record

- dispatch review #review-2026-09-07-131958-mission-driver-2026-09-07-1319-3-ethereum-gas-fees-1-63c47168 to ses_opencode_reviewer
- 2026-09-07：iteration 1，共识 acceptable-after-fixes #review-2026-09-07-131958-mission-driver-2026-09-07-1319-3-ethereum-gas-fees-1-63c47168

## Verification

## Closure
