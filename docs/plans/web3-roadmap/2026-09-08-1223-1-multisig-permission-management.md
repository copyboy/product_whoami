---
status: active
mission: web3-roadmap
work-item: M5-WI15
group: "2026-09-08-1223"
verify: [test, build]
---

# 2026-09-08-1223-1-multisig-permission-management 文章「Multi-sig 与权限管理」

> Source: docs/backlog/web3-roadmap.md M5/WI15（文章「Multi-sig 与权限管理」，对应 web3-roadmap-data.json M5.3）
> Related: 2026-09-08-1104-3-tokenomics-design（前置：WI15 依赖 WI14，引言承接其结尾「钥匙归谁管——多签与权限管理」过渡钩子）；2026-09-08-1104-2-dao-governance-voting（紧急路径多签钩子与治理安全清单的站内既有铺垫）

## Current Baseline

- 本组为阶段 5（DAO）收尾批次（组内执行顺序：本计划 → 2026-09-08-1223-2-dao-case-studies，按文件名 N 前缀排序执行）。目标输出文件 `src/content/blog/multisig-permission-management.mdx` 不存在；系列已发布 18 篇（阶段 1-4 各四篇 + 阶段 5 两篇），roadmap 头部计数现为 18（已由 1104-3 刷新，读数相符）。
- `src/data/web3-roadmap-data.json` 阶段 5：M5.2 `done`（articleSlug: tokenomics-design）；M5.3 `todo`、`articleSlug: null`（:84）；M5.4 `todo`。M5.3 标题「Multi-sig 与权限管理」。
- `docs/backlog/web3-roadmap.md` Work Item Status 表 M5/WI15 行 Status `todo`，依赖 WI14（已 done，可直接开工）。
- 术语词典 `src/components/web3/GlossaryTerm.astro` 已有：`MPC`（:46，安全多方计算私钥分片）、`AccountAbstraction`（:50，词条文案内含「多签」能力列举，非独立词条）、`治理代币`（:82）、`时间锁`（:84）、`Snapshot`（:85）；**没有** `多签`、`Gnosis Safe` 独立词条——本篇核心新概念（m-of-n 模型与代表产品），按全局规范需 Phase 1 先补。
- 口径来源（roadmap WI15 定义）：report 页 5.4 章节（`src/pages/web3/report.astro:621-632`）——Gnosis Safe：3/7 多签（7 人持有密钥，3 人签名即可执行）、时间锁：48 小时延迟（重大决策需等待窗口期）、插件化：每个插件独立权限。
- 呼应素材：`tokenomics-design` 结尾钩子「钥匙归谁管？……把最锋利的那几把钥匙从『单票多数』手里收回到『多签 + 权限分层』，是下一篇 Multi-sig 与权限管理（M5.3）的主题」= 本篇引言承接点；`dao-governance-voting` :115 紧急路径钩子（「由多签小组触发快速通道……正是下一篇 Multi-sig 的主题，这里先埋个钩子」）与 :143 治理安全清单（「敏感操作叠加多签（防单点）」）是「权限分层」一节的站内既有铺垫，须收回。
- heroImage 现状：全库 18 张唯一（`grep -h "heroImage" src/content/blog/*.mdx | sort -u` 现场计数比对），新图须全库唯一并带 `?w=1200&h=630&fit=crop` 后缀。
- `AGENTS.md` 路线图表阶段 5 行现为 `0/4`（:109）——仅 M5.4/WI16 完成时更新，本计划不动。
- 验证基线（docs/testing/known-good-baselines.md + mission config commands）：`npm run test:run` exit 0、`npm run build` exit 0 为通过门；`type-check`/`lint` 存量失败不在门内（mission config 已声明 skip）。
- 环境事实：Node v22.22.2 / npm 10.9.7 可用（同日闭合计划审计确认）；`docs/logs/2026/09-08.md` 已存在，追加条目即可（跨日执行则按当日新建）。
- subject 惯例：阶段 5 文章 `subject: "DAO"`（承 2026-09-08-0950-1 Phase 1 Decision 确立的「subject = 阶段主题」惯例，与同组 1104-2/1104-3 一致）。

## Goals

- 词典新增 `多签`、`Gnosis Safe` 词条，先于文章使用落地。
- 发布文章 `multisig-permission-management`（150-250 行）：单私钥的风险（一把钥匙一个单点）→ 多签的 m-of-n 模型（沿用 report 页 5.4 的 Gnosis Safe 3/7 + 48 小时时间锁口径）→ 多签 vs MPC 的取舍（词典 MPC 词条口径：私钥分片 vs 签名聚合，信任模型与恢复语义差异）→ DAO 金库的权限分层（多签执行 + 治理提案 + 时间锁窗口，收回 dao-governance-voting 埋的紧急路径钩子）→ 操作安全的现实建议（测试专用账户、签名前核对 calldata）→ 结尾完成 M5.3 → M5.4 过渡（规则、激励、钥匙都齐了——现实里这些制度跑得怎么样：知名 DAO 案例分析，专栏收官）。
- 数据联动：M5.3 置 `done` + `articleSlug: "multisig-permission-management"`；roadmap M5/WI15 行置 `done`；roadmap 头部系列篇数同步（18 → 19）；`docs/logs/2026/` 当日日志记录条目。
- 验证门通过：`npm run test:run` exit 0；`npm run build` exit 0 且 `dist/blog/multisig-permission-management/index.html` 生成。

## Non-Goals

- 不写 M5.4 文章「知名 DAO 案例分析」（属下一计划 2026-09-08-1223-2）。
- 不做 Gnosis Safe 界面级实操教程（文章讲模型与取舍，不逐步教点哪里）。
- 不展开 MPC 的密码学细节（分片协议内部原理超出入门专栏范围，词典口径够用）。
- 不更新 `AGENTS.md` 阶段 5 状态列（仅 M5.4/WI16 完成时更新）。
- 不修复 `type-check` / `lint` 存量失败（非本 mission 通过门，mission config 已声明 skip）。
- 不修改任何站点代码/组件行为、不动 `dapp/` 工程——词典词条是数据级追加。

## Task Route

- Type: `implementation-only change`（纯内容新增：一篇 MDX + 词典词条 + 数据联动，无架构/契约变化）
- Owner Docs: `docs/backlog/web3-roadmap.md`（全局写作规范 + M5 各篇定义 + WI15 定义）、`docs/testing/known-good-baselines.md`（验证口径与存量失败）
- Skill Selection Basis: 无匹配 skill——技术博客写作由 roadmap 全局写作规范约束；`copywriting` 面向营销/多平台文案，与本任务方法不符（同前序计划理由）。

## Infrastructure And Config Prereqs

- Node 环境且 `node_modules/` 已安装（缺失时先 `npm install`）；无其他 infra 依赖；无数据迁移。

## Phase 1 — 词典与口径准备

Targets: `src/components/web3/GlossaryTerm.astro`
Skill: none

- Item Types: `Add | Proof`
- Prereqs: 无（WI14 已 done，可直接开工）

- [x] Add: 在 `GlossaryTerm.astro` 的 `definitions` 对象追加两个 key——`多签`（Multi-sig：m-of-n 签名模型——n 把私钥持有钥匙，任意 m 把签名即可执行交易；单人失窃或离线不足以动金库，少数人合谋也不足以独断；DAO 金库与协议敏感操作的标准配置，典型如 Gnosis Safe 3/7）、`Gnosis Safe`（最广泛使用的多签钱包合约：以智能合约账户承载 m-of-n 签名权，支持插件化权限、时间锁延迟与链上交易提案-确认流程，是 DAO 金库管理的事实标准）。词条文案与既有 `MPC`/`时间锁`/`治理代币` 词条口径一致、风格一致。
- [x] Proof: `grep -n "多签\|Gnosis Safe" src/components/web3/GlossaryTerm.astro` 打印两个新 key 的定义行；重读 report 页 5.4 章节（report.astro:621-632），确认文章将用的 3/7、48 小时、插件化三组口径与页面逐项一致。

Exit Criteria:

- [x] 词典含 `多签`、`Gnosis Safe` 两个 key，先于文章使用落地。
- [x] m-of-n 口径与 report 页 5.4 核对一致（3/7 多签、48 小时时间锁、插件化独立权限）。

## Phase 2 — 文章写作

Targets: `src/content/blog/multisig-permission-management.mdx`
Skill: none

- Item Types: `Add | Decision | Proof`
- Prereqs: Phase 1（词条已存在，`GlossaryTerm` 才可引用）

- [x] Add: 创建 `src/content/blog/multisig-permission-management.mdx`，frontmatter 满足全局写作规范：`categories: ["Web3"]`、`subject: "DAO"`（承阶段主题惯例，见 Current Baseline）、`tags: ["Web3", "区块链入门", "多签", "Gnosis Safe"]`、`pubDate` 为执行当天日期、`description` 一段摘要；`heroImage` 为 Unsplash 图（`?w=1200&h=630&fit=crop` 后缀）；标题紧扣 roadmap WI 标签「Multi-sig 与权限管理」。
- [x] Decision: heroImage 选图——执行时 `grep -h "heroImage" src/content/blog/*.mdx` 全库比对唯一后选定；备选主题（钥匙串/保险库/门禁视觉）任选，唯一性是硬约束。残余风险：无（可机械复查）。
- [x] Add: 正文 150-250 行，结构遵守全局规范：引言（承接 WI14 结尾「钥匙归谁管」钩子）→ 单私钥风险分节（一把钥匙一个单点：钓鱼、助记词失窃、持有人失联，任何一种都等于金库全损）→ m-of-n 模型分节（Gnosis Safe 3/7 + 48 小时时间锁口径沿用 report 页 5.4 并标注出处；ASCII text 代码块画 m-of-n 签名与执行流程示意；m 与 n 的权衡：m 太小失防合谋、m 太大卡执行）→ 多签 vs MPC 分节（词典 MPC 词条口径：MPC 私钥分片、签名前重组，用户无感；多签签名权独立、链上可审计——信任模型与恢复语义的差异，二者并非互斥）→ 权限分层分节（DAO 金库三层：治理提案定方向 + 时间锁窗口留退出权 + 多签执行敏感操作；收回 dao-governance-voting 的紧急路径钩子：紧急路径由多签小组触发快速通道，用「少数受信人」换「响应速度」，本身也需约束）→ 操作安全分节（现实建议：测试专用账户隔离、签名前核对 calldata 与目标地址、大额操作先小额试路）→ 总结：权限分层是治理机器的保险丝，过渡 M5.4（规则、激励、钥匙都齐了——现实里跑得怎么样：知名 DAO 案例分析，专栏收官）。
- [x] Add: 组件使用合规——按系列既有惯例导入组件；`<Highlight>` 仅四种 type（单私钥风险警示用 `type="danger"`，m/n 权衡与紧急路径提示用 `type="warning"`）；`<GlossaryTerm>` 仅引用词典已有 key（含 Phase 1 新增两个及 `MPC`/`时间锁`，大小写完全一致）；禁止 `client:` 指令；图示全 ASCII text 代码块；数字不确定处用「量级/约」表述，不编造精确值。
- [x] Add: 文末「相关文章」内链仅引用已发布 slug（`tokenomics-design` 必引——引言承接其结尾钩子；`dao-governance-voting` 必引——紧急路径钩子与「敏感操作叠加多签」安全清单的出处；其余按相关性精选，slug 必须真实存在）。
- [x] Proof: `wc -l src/content/blog/multisig-permission-management.mdx` 打印值在 150-250；每个 `GlossaryTerm term="X"` 词典命中且大小写一致；heroImage 唯一性复查通过（全库 grep 仅 1 hit）。

Exit Criteria:

- [x] 文章文件存在，frontmatter 全字段合规，行数 150-250。
- [x] 结构完整（引言/单私钥风险/m-of-n/多签 vs MPC/权限分层/操作安全/总结收束与过渡），3/7 + 48 小时口径与 report 页 5.4 一致。
- [x] 组件与内链合规；heroImage 全库唯一。

## Phase 3 — 数据联动与验证

Targets: `src/data/web3-roadmap-data.json`, `docs/backlog/web3-roadmap.md`, `docs/logs/2026/`
Skill: none

- Item Types: `Add | Proof`
- Prereqs: Phase 2（文章已落地才置 done）

- [x] Add: `web3-roadmap-data.json` 阶段 5 的 M5.3 `status: "todo"` → `"done"`、`articleSlug: null` → `"multisig-permission-management"`；M5.4 保持不动（其余阶段全不动）。
- [x] Add: `docs/backlog/web3-roadmap.md` Work Item Status 表 M5/WI15 行 Status `todo` → `done`；同文件头部系列篇数同步刷新（18 → 19，阶段 5 第三篇）。
- [x] Add: `docs/logs/2026/` 当日日志记录条目（当日文件不存在则按 `docs/logs/00-log-writing-guide.md` 约定新建）。
- [x] Proof: `npm run test:run` exit 0。
- [x] Proof: `npm run build` exit 0 且 `test -f dist/blog/multisig-permission-management/index.html` 为真（新文章路由生成）。

Exit Criteria:

- [x] M5.3 done + articleSlug 指向真实存在的文章 slug；roadmap WI15 行 done、头部计数刷新；日志条目在档。
- [x] `test` / `build` 两验证键均 exit 0，新文章路由生成。
- [x] `docs/logs/` 更新（本计划闭环条目）。
- [x] 无 owner-doc 之外的文档更新需求——roadmap 数据文件与 roadmap 本身即 owner doc，已在上述条目覆盖（AGENTS.md 阶段 5 行按 roadmap 定义不在本 WI 范围）。

## Draft Review Record

- dispatch review #review-2026-09-08-094755-mission-driver-2026-09-08-1223-1-multisig-permission-management-1-7c4e2b90 to ses-opencode-glm53
- 2026-09-08：iteration 1，共识 acceptable-as-is #review-2026-09-08-094755-mission-driver-2026-09-08-1223-1-multisig-permission-management-1-7c4e2b90
- review notes: 无 Blocker；活库核验基线断言逐项一致（目标 mdx 不存在、M5.3 todo/articleSlug null 于 json :84、WI15 行 todo 且依赖 WI14 已 done、词典无「多签/Gnosis Safe」独立词条且 MPC:46/时间锁:84 等行号相符、report.astro 5.4 三组口径 3/7+48h+插件化逐项一致、两处钩子原文在档、heroImage 全库真实唯一 18 张——原始 grep 20 行中 2 行为模板/文档行、AGENTS.md:109 为 0/4、09-08.md 在档、verify 键与 package.json 实命令一致）。Minor 一处不修：Current Baseline 将词典键写作 `AccountAbstraction`，实际键为 `"Account Abstraction"`——仅描述性行号与结论均正确，计划未指示引用该键。组内执行顺序（先本计划后 1223-2）属执行期检查，非计划缺陷。

## Verification

- pass test 2026-09-08-094755-mission-driver exit=0
- pass build 2026-09-08-094755-mission-driver exit=0
- pass test 2026-09-08-094755-mission-driver-verify exit=0
- pass build 2026-09-08-094755-mission-driver-verify exit=0

## Closure

- dispatch audit #audit-2026-09-08-094755-mission-driver-2026-09-08-1223-1-multisig-permission-management-1-01eecb65 to ses-opencode-glm53 models={exec:glm-5.3,aud:glm-5.3}
- accepted #audit-2026-09-08-094755-mission-driver-2026-09-08-1223-1-multisig-permission-management-1-01eecb65：审计通过——执行项全部落地并活库核验（文章 155 行含合规 frontmatter/heroImage 全库唯一/无 client: 指令；词典 多签+Gnosis Safe 于 GlossaryTerm.astro:88-89；GlossaryTerm term= MPC/多签/时间锁/Gnosis Safe/Account Abstraction/智能合约 全部命中既有 key；内链 dao-governance-voting/smart-contracts-explained/tokenomics-design 均为真实 slug；web3-roadmap-data.json M5.3 done+articleSlug、M5.4 未动；roadmap WI15 行 done、头部计数 19；docs/logs/2026/09-08.md 闭环条目在档）；本审计重跑验证门 npm run test:run exit=0（4/4）与 npm run build exit=0（628 pages，dist/blog/multisig-permission-management/index.html 生成）。3/7+48h+插件化口径与 report.astro 5.4 逐项一致。exec 与 aud 同为 GLM 系（单模型降级，如实记录）。
