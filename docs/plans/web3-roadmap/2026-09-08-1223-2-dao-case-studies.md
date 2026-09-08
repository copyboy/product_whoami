---
status: active
mission: web3-roadmap
work-item: M5-WI16
group: "2026-09-08-1223"
verify: [test, build]
---

# 2026-09-08-1223-2-dao-case-studies 文章「知名 DAO 案例分析」（专栏收官）

> Source: docs/backlog/web3-roadmap.md M5/WI16（文章「知名 DAO 案例分析」，对应 web3-roadmap-data.json M5.4；系列收官篇）
> Related: 2026-09-08-1223-1-multisig-permission-management（前置：WI16 依赖 WI15，引言承接其结尾「现实里跑得怎么样」过渡钩子）；2026-09-07-1524-1-smart-contracts-explained（WI4 合约安全边界/代理升级权限呼应对象）；2026-09-07-1319-1-account-model-vs-utxo（阶段 1 前置链）

## Current Baseline

- 本计划是 web3-roadmap mission 的最后一个工作项（组内执行顺序：2026-09-08-1223-1 → 本计划）。目标输出文件 `src/content/blog/dao-case-studies.mdx` 不存在；前置计划落地后系列已发布 19 篇，roadmap 头部计数应为 19——执行时读数不符即前置计划未完成落地，停止执行并上报依赖未满足。
- `src/data/web3-roadmap-data.json` 阶段 5：M5.4 `todo`、`articleSlug: null`（:85）；M5.3 应为前置计划产出 `done`。M5.4 标题「知名 DAO 案例分析」。
- `docs/backlog/web3-roadmap.md` Work Item Status 表 M5/WI16 行 Status `todo`，依赖 WI15。
- 术语词典 `src/components/web3/GlossaryTerm.astro` 已有：`治理代币`、`时间锁`、`Snapshot`、`代币经济学`、`Vesting` 及前置计划新增的 `多签`、`Gnosis Safe`；**没有** `重入攻击`、`硬分叉` 词条——本篇核心新概念（The DAO 事件的两个关键词），按全局规范需 Phase 1 先补。
- 重入概念的站内现状：`smart-contracts-explained`（WI4）以「升级代理权限风险」呈现合约安全边界（:38「谁能触发升级，谁就事实掌控合约资金」、:135 总结重申），**未展开重入细节**；重入在站内仅 `evm-deep-dive` :130 一句带过（「EVM 的坑（重入、整数溢出等）被研究得最透」）。本篇将首次系统展开 The DAO 重入事件——roadmap 所说「呼应 WI4 的重入漏洞」落点在 WI4 的安全边界与权限风险主题上，两处呼应均指向真实存在的文案。
- 口径来源（roadmap WI16 定义）：The DAO 2016 事件始末与重入漏洞——注明该事件催生了 ERC-20 时代的 checks-effects-interactions 模式与硬分叉先例；MakerDAO 治理的现实运转（执行/治理两院制一句话带过）；Uniswap 国库与治理权争议用**量级/定性描述，不编造精确数字**；案例总结表（成败维度：金库规模/治理参与率/幸存状态用定性词）。
- 收官职责：本篇是专栏收官文，结尾做五阶段总回顾（价值转移→计算→应用→金融→组织），呼应系列第一篇 `utxo-model-deep-dive`（M1.1，json 已置 done）。
- `AGENTS.md` 路线图表阶段 5 行现为 `0/4`（:109）——本计划完成时更新为 `4/4`。
- `getCurrentPhase` 收官行为核验点：`src/utils/web3Roadmap.ts:51-59`——无 `learning` 里程碑时回退 `phases.find(p => p.milestones.some(m => m.status !== 'done'))`，全 done 后返回 `undefined`；唯一消费方 `src/components/web3/Web3PhaseProgress.astro:12`（web3 首页学习路径组件），`currentPhase` 为 undefined 时「当前阶段」CTA 块（:100-117，渲染标记「当前阶段」/「继续学习 →」）不再输出——属预期行为，本计划核验该行为而非修改代码。
- heroImage 现状：前置计划落地后 19 张唯一（执行时 `grep -h "heroImage" src/content/blog/*.mdx | sort -u` 现场计数比对），新图须全库唯一并带 `?w=1200&h=630&fit=crop` 后缀。
- 验证基线（docs/testing/known-good-baselines.md + mission config commands）：`npm run test:run` exit 0、`npm run build` exit 0 为通过门；`type-check`/`lint` 存量失败不在门内（mission config 已声明 skip）。
- 环境事实：Node v22.22.2 / npm 10.9.7 可用（同日闭合计划审计确认）；`docs/logs/2026/09-08.md` 已存在，追加条目即可（跨日执行则按当日新建）。
- subject 惯例：阶段 5 文章 `subject: "DAO"`（承 2026-09-08-0950-1 Phase 1 Decision 确立的「subject = 阶段主题」惯例，与同组 1104-2/1104-3/1223-1 一致）。

## Goals

- 词典新增 `重入攻击`、`硬分叉` 词条，先于文章使用落地。
- 发布文章 `dao-case-studies`（150-250 行）：The DAO 2016 事件始末与重入漏洞（split 递归提款机制拆解，注明催生 checks-effects-interactions 模式与硬分叉先例）；MakerDAO 治理的现实运转（执行/治理两院制一句话带过，呼应 WI14 代币经济学与 WI13 治理模型）；Uniswap 国库与治理权争议（量级/定性描述）；案例总结表（成败维度定性对比）；**收官总结**：五阶段总回顾（价值转移→计算→应用→金融→组织），呼应系列第一篇。
- 数据联动：M5.4 置 `done` + `articleSlug: "dao-case-studies"`；roadmap M5/WI16 行置 `done`；roadmap 头部系列篇数同步（19 → 20）；`AGENTS.md` 路线图阶段 5 行 `0/4` → `4/4`；`docs/logs/2026/` 当日日志记录条目。
- 收官核验：`getCurrentPhase` 全 done 行为无异常——`dist/web3/index.html` 不再输出「当前阶段」CTA 块。
- 验证门通过：`npm run test:run` exit 0；`npm run build` exit 0 且 `dist/blog/dao-case-studies/index.html` 生成。

## Non-Goals

- 不新增任何工作项或后续系列规划（收官篇只回顾，不开新坑；mission 完成与否由引擎基于审计轮数决定，非本计划职责）。
- 不编造任何案例的精确数字（金库规模、赔偿比例、参与率一律量级/定性表述，与已发布文章口径一致）。
- 不展开 The DAO 事件的政治/社区叙事细节（分叉争议只讲硬分叉先例的技术与治理意义，ETC/ECH 分叉链走向一句带过）。
- 不修复 `type-check` / `lint` 存量失败（非本 mission 通过门，mission config 已声明 skip）。
- 不修改 `web3Roadmap.ts` / `Web3PhaseProgress.astro` 等任何站点代码（getCurrentPhase 返回 undefined 是预期行为，核验即可）。

## Task Route

- Type: `implementation-only change`（纯内容新增：一篇 MDX + 词典词条 + 数据联动与收官核验，无架构/契约变化）
- Owner Docs: `docs/backlog/web3-roadmap.md`（全局写作规范 + M5 各篇定义 + WI16 定义）、`docs/testing/known-good-baselines.md`（验证口径与存量失败）
- Skill Selection Basis: 无匹配 skill——技术博客写作由 roadmap 全局写作规范约束；`hv-analysis` 面向产品/公司深度研究报告产出，与本任务（系列教学文章收官篇）方法不符。

## Infrastructure And Config Prereqs

- Node 环境且 `node_modules/` 已安装（缺失时先 `npm install`）；无其他 infra 依赖；无数据迁移。

## Phase 1 — 词典与口径准备

Targets: `src/components/web3/GlossaryTerm.astro`
Skill: none

- Item Types: `Add | Proof`
- Prereqs: 本组计划 2026-09-08-1223-1 已完成（M5.3 done；`多签`/`Gnosis Safe` 词条已存在可复用；roadmap 头部读数 19）

- [ ] Add: 在 `GlossaryTerm.astro` 的 `definitions` 对象追加两个 key——`重入攻击`（Reentrancy：外部合约在余额扣减前被回调、递归重复提款的攻击模式——The DAO 2016 事件损失约当时流通 ETH 的相当比例，直接催生以太坊硬分叉；防御即 checks-effects-interactions 模式：先改状态、记账在后、外部交互放最后）、`硬分叉`（Hard Fork：协议规则变更导致不兼容分链——节点必须升级否则留在旧链；The DAO 事件后的干预性分叉是以太坊唯一一次大规模回滚先例，分出的原链延续为 ETC，也留下「代码即规则」与「人治干预」的长期争论）。词条文案与既有 `智能合约`/`闪电贷`/`原子性` 词条口径一致、风格一致。
- [ ] Proof: `grep -n "重入攻击\|硬分叉" src/components/web3/GlossaryTerm.astro` 打印两个新 key 的定义行；重读 `evm-deep-dive` :130 与 `smart-contracts-explained` :38/:135，确认文章将用的呼应点与既有文案逐项对得上（重入被提及的语境、代理升级权限风险的表述）。

Exit Criteria:

- [ ] 词典含 `重入攻击`、`硬分叉` 两个 key，先于文章使用落地。
- [ ] WI4/evm-deep-dive 呼应点核对一致，无凭空引用不存在的内容。

## Phase 2 — 文章写作

Targets: `src/content/blog/dao-case-studies.mdx`
Skill: none

- Item Types: `Add | Decision | Proof`
- Prereqs: Phase 1（词条已存在，`GlossaryTerm` 才可引用）

- [ ] Add: 创建 `src/content/blog/dao-case-studies.mdx`，frontmatter 满足全局写作规范：`categories: ["Web3"]`、`subject: "DAO"`（承阶段主题惯例，见 Current Baseline）、`tags: ["Web3", "区块链入门", "DAO", "案例分析"]`、`pubDate` 为执行当天日期、`description` 一段摘要；`heroImage` 为 Unsplash 图（`?w=1200&h=630&fit=crop` 后缀）；标题紧扣 roadmap WI 标签「知名 DAO 案例分析」。
- [ ] Decision: heroImage 选图——执行时 `grep -h "heroImage" src/content/blog/*.mdx` 全库比对唯一后选定；备选主题（档案馆/编年史/判例视觉）任选，唯一性是硬约束。残余风险：无（可机械复查）。
- [ ] Add: 正文 150-250 行，结构遵守全局规范：引言（承接 WI15 结尾「规则、激励、钥匙都齐了——现实里跑得怎么样」钩子）→ The DAO 分节（2016 始末：募集规模与 split 函数递归提款漏洞拆解；ASCII text 代码块画重入调用时序；催生 checks-effects-interactions 模式与硬分叉先例；呼应 WI4 安全边界与 evm-deep-dive「安全的复利」论点）→ MakerDAO 分节（治理的现实运转：执行/治理两院制一句话带过；呼应 WI13 治理模型与 WI10 稳定币视角的既有口径）→ Uniswap 分节（国库与治理权争议：费开关/国库用途的量级与定性描述，不编造精确数字）→ 案例总结表（Markdown 表：案例 × 金库规模/治理参与率/幸存状态，全部定性词）→ **收官总结**：五阶段总回顾（价值转移 Bitcoin → 计算 Ethereum → 应用 DApp → 金融 DeFi → 组织 DAO，每阶段一句话收束 + 代表文章内链），呼应系列第一篇 utxo-model-deep-dive 的开篇视角，专栏完。
- [ ] Add: 组件使用合规——按系列既有惯例导入组件；`<Highlight>` 仅四种 type（The DAO 事件警示用 `type="danger"`，「历史数字用量级表述」提示用 `type="warning"`）；`<GlossaryTerm>` 仅引用词典已有 key（含 Phase 1 新增两个，大小写完全一致）；禁止 `client:` 指令；图示全 ASCII text 代码块；所有历史数字（募集额、损失额、补偿比例）用「量级/约」表述，不编造精确值。
- [ ] Add: 文末「相关文章」内链仅引用已发布 slug（`multisig-permission-management` 必引——引言承接其结尾钩子；`smart-contracts-explained` 必引——安全边界与代理权限呼应；`evm-deep-dive` 必引——重入的既有提及与 EVM 安全复利论点；`utxo-model-deep-dive` 必引——系列第一篇，收官呼应；其余按相关性精选，slug 必须真实存在）。
- [ ] Proof: `wc -l src/content/blog/dao-case-studies.mdx` 打印值在 150-250；每个 `GlossaryTerm term="X"` 词典命中且大小写一致；heroImage 唯一性复查通过（全库 grep 仅 1 hit）。

Exit Criteria:

- [ ] 文章文件存在，frontmatter 全字段合规，行数 150-250。
- [ ] 结构完整（引言/The DAO/MakerDAO/Uniswap/案例总结表/五阶段收官总回顾），历史数字全部量级/定性表述。
- [ ] 组件与内链合规；heroImage 全库唯一；四个必引 slug 均真实存在。

## Phase 3 — 数据联动、收官核验与验证

Targets: `src/data/web3-roadmap-data.json`, `docs/backlog/web3-roadmap.md`, `AGENTS.md`, `docs/logs/2026/`
Skill: none

- Item Types: `Add | Proof`
- Prereqs: Phase 2（文章已落地才置 done）

- [ ] Add: `web3-roadmap-data.json` 阶段 5 的 M5.4 `status: "todo"` → `"done"`、`articleSlug: null` → `"dao-case-studies"`（其余阶段全不动）。
- [ ] Add: `docs/backlog/web3-roadmap.md` Work Item Status 表 M5/WI16 行 Status `todo` → `done`；同文件头部系列篇数同步刷新（19 → 20，阶段 5 第四篇，全系列完）。
- [ ] Add: `AGENTS.md` 路线图表阶段 5 行 `0/4` → `4/4`（:109，仅改该行状态列）。
- [ ] Add: `docs/logs/2026/` 当日日志记录条目（当日文件不存在则按 `docs/logs/00-log-writing-guide.md` 约定新建；收官条目注明全系列 20 篇完成）。
- [ ] Proof: `npm run test:run` exit 0。
- [ ] Proof: `npm run build` exit 0 且 `test -f dist/blog/dao-case-studies/index.html` 为真（新文章路由生成）。
- [ ] Proof: 收官行为核验——`grep -c "当前阶段" dist/web3/index.html` 为 0（getCurrentPhase 全 done 返回 undefined，首页当前阶段 CTA 块不再渲染，属预期行为）；`grep -n "| 5 | DAO" AGENTS.md` 显示 `4/4`。

Exit Criteria:

- [ ] M5.4 done + articleSlug 指向真实存在的文章 slug；roadmap WI16 行 done、头部计数 20；AGENTS.md 阶段 5 行 4/4；日志收官条目在档。
- [ ] `test` / `build` 两验证键均 exit 0，新文章路由生成。
- [ ] `getCurrentPhase` 全 done 行为核验通过（首页 CTA 消失），无代码改动。
- [ ] `docs/logs/` 更新（本计划闭环 + 系列收官条目）。
- [ ] 无 owner-doc 之外的文档更新需求——roadmap 数据文件、roadmap、AGENTS.md 路线图状态即 owner doc 更新，已在上述条目覆盖。

## Draft Review Record

- dispatch review #review-2026-09-08-094755-mission-driver-2026-09-08-1223-2-dao-case-studies-1-76fcdb98 to opencode-glm53-review
- 2026-09-08：iteration 1，共识 acceptable-as-is #review-2026-09-08-094755-mission-driver-2026-09-08-1223-2-dao-case-studies-1-76fcdb98

## Verification

## Closure
