---
status: active
mission: web3-roadmap
work-item: M2-WI4
group: "2026-09-07-1524"
verify: [test, build]
---

# 2026-09-07-1524-1-smart-contracts-explained 文章「智能合约到底是什么，能做什么」

> Source: docs/backlog/web3-roadmap.md M2/WI4（文章「智能合约到底是什么，能做什么」，对应 web3-roadmap-data.json M2.4）
> Related: 2026-09-07-1319-2-evm-deep-dive（WI2，机制基础）、2026-09-07-1319-3-ethereum-gas-fees（WI3，前置：本篇引言承接其「这些规则由谁写、由谁执行」过渡）；M3/WI5 为本组后续计划 2026-09-07-1524-2

## Current Baseline

- 目标输出文件 `src/content/blog/smart-contracts-explained.mdx` 不存在；Web3 系列已发布 7 篇（4 篇 Bitcoin + account-model-vs-utxo + evm-deep-dive + ethereum-gas-fees）。
- `src/data/web3-roadmap-data.json` 阶段 2 M2.4 为 `status: "todo"`、`articleSlug: null`（M2.1-M2.3 已 done）。
- `docs/backlog/web3-roadmap.md` Work Item Status 表 M2/WI4 行 Status 为 `todo`，依赖 WI2（已 done，依赖链满足）。
- `AGENTS.md` 路线图表阶段 2 行现为 `| 2 | Ethereum — 去中心化计算 | 0/4 |`（长期滞后，实际 3/4；roadmap 授权仅在本 WI 完成时同步为 `4/4 完成`）。
- 术语词典 `GlossaryTerm.astro` 已有：`智能合约`（部署在链上的程序代码，满足预设条件自动执行）、`ERC20`、`ERC721`、`字节码`、`操作码`、`EVM`、`Gas`、`gwei`、`EIP1559`、`DeFi`、`DAO`、`Account Abstraction`、`Ethereum`；**没有**「预言机 / Oracle」词条——本篇「能力边界」一节的 oracle 概念按惯例需先加词条再引用。
- 口径来源 `src/pages/web3/report.astro`：第 363-367 行「智能合约：规则即法律……规则写在链上，没有任何人可以单方面修改或关掉它」——本篇「代码即规则」的表述以此为基准框架；升级代理模式作为 roadmap 明确要求的一句话例外 + 风险提示带过（不改 report 页，单向对齐）。
- Gas 数字口径（衔接 ethereum-gas-fees 篇）：EOA 间简单转账 21000 gas 为协议固定定价；ERC-20 转账是合约调用，gas 高于该基准——具体数值不确定时按全局规范用「量级/约」表述，不编造精确值。
- 已用 heroImage（全库唯一性硬约束）：photo-1554224155-6726b3ff858f、photo-1516245834210-c4c142787335、photo-1451187580459-43490279c0fa、photo-1554224154-26032ffc0d07、photo-1518770660439-4636190af475、photo-1518546305927-5a555bb7020d、photo-1621761191319-c6fb62004040。
- `Highlight`（四种 type）、ASCII 图示、150-250 行、文末「相关文章」仅内链已发布 slug——规范同前三篇计划所载。
- 验证门：`build` + `test:run`；`type-check`/`lint` 存量失败不在门内（docs/testing/known-good-baselines.md）。

## Goals

- 发布文章 `smart-contracts-explained`：「代码即规则」的准确表述（部署后字节码上链不可变；升级代理模式一句话带过 + 风险提示）；确定性执行 + 全网验证（衔接 EVM 篇）；能力边界（能做什么：代币/DAO/借贷；不能做什么：链下数据需 oracle、随机数难题）；ERC-20 转账流程端到端实例（呼应 WI1 账户模型与 WI3 gas）；结尾完成阶段 2 → 阶段 3 过渡（从「理解」到「动手写」）。
- 词典新增 `预言机` 词条并在文中使用。
- 数据联动：M2.4 置 `done` + `articleSlug: "smart-contracts-explained"`；roadmap M2/WI4 行置 `done`；`AGENTS.md` 阶段 2 状态列改 `4/4 完成`（阶段 2 全部完成的授权动作）；当日日志记录条目。
- 验证门通过：`npm run build` exit 0 且 `dist/blog/smart-contracts-explained/index.html` 生成；`npm run test:run` exit 0。

## Non-Goals

- 不写 M3/WI5 笔记（本组后续计划 2026-09-07-1524-2 负责）。
- 不改 `src/pages/web3/report.astro`（「规则即法律」框架单向对齐，不动源头）。
- 不更新 `AGENTS.md` 阶段 3 及以后的状态列。
- 不修复 `type-check` / `lint` 存量失败。

## Task Route

- Type: `implementation-only change`（纯内容新增：一篇 MDX + 词典词条 + 数据联动 + AGENTS.md 状态列同步）
- Owner Docs: `docs/backlog/web3-roadmap.md`（全局写作规范 + WI4 定义）、`src/pages/web3/report.astro`（「规则即法律」口径来源，只读）
- Skill Selection Basis: 无匹配 skill——内容写作为领域专项，无代码/架构变更，同前三篇计划理由。

## Infrastructure And Config Prereqs

- Node 环境且 `node_modules/` 已安装；无其他 infra 依赖；无数据迁移。

## Phase 1 — 词典与口径准备

Targets: `src/components/web3/GlossaryTerm.astro`, `src/pages/web3/report.astro`（只读核对，不改）
Skill: none

- Item Types: `Add | Proof`
- Prereqs: 计划 2026-09-07-1319-3 已完成（M2.3 done，依赖链 WI2 → WI4 满足）

- [x] Add: 在 `GlossaryTerm.astro` 的 `definitions` 追加 key `预言机`（Oracle：把链下真实世界数据喂给智能合约的中间服务，如价格喂给 DeFi 协议；合约自身无法主动获取链外数据）。风格与既有词条一致，不与 `智能合约`/`DeFi` 词条口径冲突。
- [x] Proof: `grep -n "预言机" src/components/web3/GlossaryTerm.astro` 打印新 key 定义行；重读 report.astro 第 363-367 行「规则即法律」表述，列出本篇必须对齐的口径清单（① 规则写在链上、无人可单方面修改或关掉 = 基准框架；② 升级代理是 roadmap 要求明示的一句话例外 + 风险提示；③ 确定性执行与 EVM 篇「同样输入必得同样输出」口径一致）。

Exit Criteria:

- [x] 词典含 `预言机` key，先于文章使用落地。
- [x] 口径清单核对完成并作为写作输入。

## Phase 2 — 文章写作

Targets: `src/content/blog/smart-contracts-explained.mdx`
Skill: none

- Item Types: `Add | Decision | Proof`
- Prereqs: Phase 1

- [x] Add: 创建 `src/content/blog/smart-contracts-explained.mdx`，frontmatter：`title`（与文章主题一致）、`categories: ["Web3"]`、`subject: "Ethereum"`、`tags: ["Web3", "区块链入门", "Ethereum", "智能合约"]`、`pubDate` 执行当天、`description` 摘要、`heroImage` 为 Unsplash 图（`?w=1200&h=630&fit=crop`）。
- [x] Decision: heroImage 选图——`grep -h "heroImage" src/content/blog/*.mdx` 比对确认全库唯一后选定（主题任选，唯一性是硬约束；避开 Current Baseline 列出的 7 个已用图）。备选与残余风险记录在案（无）。
- [x] Add: 正文 150-250 行：引言（承接 Gas 篇结尾「这些规则由谁写、由谁执行」）→ 「代码即规则」分节（部署后字节码上链不可变——呼应 `字节码` 词条与 EVM 篇；升级代理模式一句话带过 + `Highlight type="warning"` 风险提示）→ 确定性执行 + 全网验证分节（每个节点重放同样代码得同样结果，衔接 EVM 篇口径）→ 能力边界分节（能做：代币/DAO/借贷，引用 `ERC20`/`ERC721`/`DeFi`/`DAO` 词条；不能做：链下数据需 `预言机`、随机数难题）→ ERC-20 转账端到端实例（ASCII text 代码块画「发起方 EOA → 合约账户 → 余额 mapping 改写 + Transfer 事件 → 两端状态变化」，标注 gas 消耗为合约调用、高于 21000 基准的量级表述）→ 总结：阶段 2 收束 + 阶段 3 过渡（从「理解」到「动手写」，引出 Solidity）。
- [x] Add: 组件使用合规——`<Highlight>` 仅四种 type；`<GlossaryTerm>` 仅引用词典已有 key（含新增 `预言机`）；无 `client:` 指令；图示全 ASCII。
- [x] Add: 文末「相关文章」内链仅引用已发布 slug：4 篇 Bitcoin 文章 + `account-model-vs-utxo` + `evm-deep-dive` + `ethereum-gas-fees`（前置计划已保证存在；执行时若前置未落地，停止执行并上报依赖未满足）。
- [x] Proof: `wc -l` 打印值 150-250；每个 `GlossaryTerm term="X"` 词典命中且大小写一致；heroImage 唯一性复查通过；文中表述与 Phase 1 口径清单逐项比对一致；gas 相关数字仅使用「量级/约」或协议固定值 21000。

Exit Criteria:

- [x] 文章文件存在，frontmatter 全字段合规，行数 150-250。
- [x] 不可变性 + 代理例外 / 确定性验证 / 能力边界 / ERC-20 实例四个内容块齐备，结尾完成阶段 2 → 阶段 3 过渡。
- [x] 组件与内链合规；表述与 report 页及词典口径一致，无编造精确数字。
- [x] heroImage 全库唯一。

## Phase 3 — 数据联动与验证

Targets: `src/data/web3-roadmap-data.json`, `docs/backlog/web3-roadmap.md`, `AGENTS.md`, `docs/logs/2026/`
Skill: none

- Item Types: `Add | Proof`
- Prereqs: Phase 2

- [x] Add: `web3-roadmap-data.json` 阶段 2 的 M2.4 `status: "todo"` → `"done"`、`articleSlug: null` → `"smart-contracts-explained"`；其余 milestone 不动（M2.1-M2.3 保持 done，阶段 3-5 全不动）。
- [x] Add: `docs/backlog/web3-roadmap.md` Work Item Status 表 M2/WI4 行 Status `todo` → `done`。
- [x] Add: `AGENTS.md` 路线图阶段 2 行 `| 2 | Ethereum — 去中心化计算 | 0/4 |` → `| 2 | Ethereum — 去中心化计算 | 4/4 完成 |`（格式对齐阶段 1 行；阶段 2 全完成的授权同步）。
- [x] Add: `docs/logs/2026/` 当日日志条目（追加或按日志指南新建当日文件，如 09-07 执行则追加至既有 `docs/logs/2026/09-07.md`）。
- [x] Proof: `npm run test:run` exit 0。
- [x] Proof: `npm run build` exit 0 且 `test -f dist/blog/smart-contracts-explained/index.html` 为真。

Exit Criteria:

- [x] M2.4 done + articleSlug 正确；roadmap WI 行 done；AGENTS.md 阶段 2 状态 `4/4 完成`；日志条目在档。
- [x] `npm run test:run` 与 `npm run build` 均 exit 0，新文章路由生成。
- [x] `docs/logs/` 更新（本计划闭环条目）。

## Draft Review Record

- dispatch review #review-2026-09-07-131958-mission-driver-2026-09-07-1524-1-smart-contracts-explained-1-df98c185 to ses_opencode_reviewer
- 2026-09-07：iteration 1，共识 acceptable-after-fixes #review-2026-09-07-131958-mission-driver-2026-09-07-1524-1-smart-contracts-explained-1-df98c185

## Verification

- pass test 2026-09-07-131958-mission-driver exit=0
- pass build 2026-09-07-131958-mission-driver exit=0
- pass test 2026-09-07-131958-mission-driver exit=0
- pass build 2026-09-07-131958-mission-driver exit=0

## Closure

- dispatch audit #audit-2026-09-07-131958-mission-driver-2026-09-07-1524-1-smart-contracts-explained-1-4e7a9c2b to ses_opencode_auditor models={exec:opencode/glm-5.3,aud:opencode/glm-5.3}
- accepted #audit-2026-09-07-131958-mission-driver-2026-09-07-1524-1-smart-contracts-explained-1-4e7a9c2b：审计通过——全部 23 个勾选项落地核实：文章 src/content/blog/smart-contracts-explained.mdx 存在（152 行，frontmatter 合规，heroImage photo-1639762681485-074b7f938ba0 全库唯一无重复）；GlossaryTerm.astro 新增「预言机」词条且文中 9 个 term 全部命中词典；web3-roadmap-data.json M2.4=done+articleSlug、backlog M2/WI4=done、AGENTS.md 阶段2=4/4 完成、docs/logs/2026/09-07.md 有条目；相关文章 7 个内链 slug 均存在；无 client: 指令。验证命令实测：npm run test:run exit=0（4 tests passed）、npm run build exit=0（578 pages，dist/blog/smart-contracts-explained/index.html 生成）。
