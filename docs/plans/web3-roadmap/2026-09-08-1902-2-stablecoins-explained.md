---
status: active
mission: web3-roadmap
work-item: 番外-WI18
group: "2026-09-08-1902"
verify: [test, build]
---

# 2026-09-08-1902-2-stablecoins-explained 文章「稳定币」（番外·二）

> Source: docs/backlog/web3-roadmap.md 番外/WI18（文章「稳定币」，slug stablecoins-explained；五阶段主线之外的横向专题）
> Related: 2026-09-08-1902-1-ethereum-layer2-rollups（组内前置：番外之一，引言承接其结尾「稳定币」过渡钩子）；2026-09-08-0950-2-defi-lending-protocols（DAI/DSR/PSM 机制口径来源，本篇指路不重复展开）；2026-09-08-1104-3-tokenomics-design（死亡螺旋判定特征呼应对象）；2026-09-08-0950-1-uniswap-amm-explained（USDC 计价口径呼应对象）

## Current Baseline

- 本计划是番外批次第二篇（组内执行顺序：2026-09-08-1902-1 → 本计划 → 2026-09-08-1902-3）。目标输出文件 `src/content/blog/stablecoins-explained.mdx` 不存在；前置计划落地后系列应为 21 篇（主线 20 + 番外 1）、roadmap 头部计数 21、延伸阅读区块挂 1 张番外卡——执行时读数不符即前置计划未完成落地，停止执行并上报依赖未满足。
- 番外特殊约定（同组 1 号计划已全文引用）：**严禁修改 `src/data/web3-roadmap-data.json` 和 AGENTS.md 路线图表**，里程碑进度 20/20 保持不变；延伸阅读按 slug 自动挂卡（roadmap.astro:150 supplementSlugs 已含 `stablecoins-explained`）；tag 含 `稳定币` 驱动概念聚合。
- conceptMeta（`src/utils/web3Concepts.ts`）：`稳定币` 条目**已存在**（:40，phaseId 4）——番外约定中「conceptMeta 补条目（稳定币、账户抽象）」对本篇已满足，本计划核验即可，无代码改动；tag `稳定币` 经小写化命中。
- 术语词典 `src/components/web3/GlossaryTerm.astro` 已有：`稳定币`（:71，含去中心化超额抵押与中心化托管两路线对照）、`MakerDAO`（:56，DSR）、`超额抵押`（:73）、`清算`（:75）、`预言机`（:76）、`MiCA`（:53）、`Curve`（:67）、`AMM`（:33）、`闪电贷`。**没有** `算法稳定币`、`脱锚` 词条——本篇核心新概念（UST 复盘的两个关键词），按全局规范需 Phase 1 先补。
- 口径锚点（文章必须逐项对齐）：`src/content/blog/defi-lending-protocols.mdx` :111-128（超额抵押铸 DAI、维持锚定两板斧「超额抵押 + 随时清算」、DSR 存款利率、PSM 1:1 抵押 USDC 生成/赎回 DAI、USDC 中心化托管路线对照——本篇 DAI 机制细节指路该篇，不重复展开）；`src/content/blog/tokenomics-design.mdx` :115-134（死亡螺旋判定特征：**需求侧只有补贴、没有价值捕获**——UST 复盘呼应此判定框架）；`src/content/blog/uniswap-amm-explained.mdx` 的 100 ETH / 200,000 USDC 池示例（USDC 作为计价单位的既有口径）；`src/pages/web3/report.astro` :663（MiCA 监管口径，一句带过）。
- 事实时间锚点（roadmap WI18 定义明文）：UST 崩盘时间为 2022 年 5 月，是「Web3 最重要的失败案例」；历史脱锚事件一律用定性词描述幅度，不编造精确值（全局规范 + WI18 明文）。
- heroImage 现状：前置计划落地后执行 `grep -h "heroImage" src/content/blog/*.mdx | sort -u` 现场计数比对（21 篇在档），新图须全库唯一并带 `?w=1200&h=630&fit=crop` 后缀。
- subject 惯例：番外统一 `subject: "Web3"`（2026-09-08-1902-1 Phase 2 Decision 确立的组内惯例，本计划沿用）。
- 验证基线（docs/testing/known-good-baselines.md + missions/web3-roadmap.json commands）：`npm run test:run` exit 0、`npm run build` exit 0 为通过门；`type-check`/`lint` 存量失败不在门内（mission config 已声明 skip）。
- 环境事实：Node v22.22.2 / npm 10.9.7 可用（同日闭合计划审计确认）；`docs/logs/2026/09-08.md` 已存在，追加条目即可（跨日执行则按当日新建）。

## Goals

- 词典新增 `算法稳定币`、`脱锚` 词条，先于文章使用落地。
- 发布文章 `stablecoins-explained`（150-250 行）：稳定币为什么是链上结算层（呼应 AMM 篇的 USDC 计价与借贷篇的 DAI）；三种锚定机制对比：法币抵押（USDT/USDC，中心化托管 + 储备审计透明度问题）、加密超额抵押（DAI，机制细节指路借贷篇不重复展开）、算法/部分算法（UST 崩盘复盘——死亡螺旋机制 ASCII 图解，标注时间为 2022 年 5 月，Web3 最重要的失败案例）；历史脱锚事件定性描述；监管视角一句带过（MiCA 口径与词典一致）；选型清单（用途 → 适配的稳定币类型）。
- 番外发布核验：延伸阅读区块挂上第二张番外卡；`/web3/concept/稳定币/` 概念页生成；roadmap Work Item Status 表番外/WI18 行置 `done`、头部系列篇数同步（21 → 22）；`docs/logs/2026/` 当日日志记录条目。
- 番外约定核验：`src/data/web3-roadmap-data.json` 与 `AGENTS.md` 路线图表零变更（里程碑保持 20/20）。
- 验证门通过：`npm run test:run` exit 0；`npm run build` exit 0 且 `dist/blog/stablecoins-explained/index.html` 生成。

## Non-Goals

- 不写番外第三篇（钱包与账户抽象属 2026-09-08-1902-3）。
- 不修改 `src/data/web3-roadmap-data.json` 和 `AGENTS.md` 路线图表（番外特殊约定明文禁止；硬边界，不是数据联动的省略）。
- 不重复展开 DAI/MakerDAO 机制细节（借贷篇已系统讲过，本篇指路 + 一段概括，PSM/DSR 只点名不拆解）。
- 不编造任何脱锚事件的精确幅度、储备规模、市值数字（历史事件定性词描述，与已发布文章口径一致）。
- 不提供任何投资建议或具体稳定币产品推荐（选型清单是「用途 → 类型」的风险教育框架，不点名「该买哪个」）。
- 不修复 `type-check` / `lint` 存量失败（非本 mission 通过门，mission config 已声明 skip）。
- 不修改任何站点代码/组件行为（词典词条是数据级追加；conceptMeta 稳定币条目已存在，仅核验）。

## Task Route

- Type: `implementation-only change`（纯内容新增：一篇 MDX + 词典词条 + roadmap 状态行与日志，无架构/契约变化）
- Owner Docs: `docs/backlog/web3-roadmap.md`（全局写作规范 + 番外特殊约定 + WI18 定义）、`docs/testing/known-good-baselines.md`（验证口径与存量失败）
- Skill Selection Basis: 无匹配 skill——技术博客写作由 roadmap 全局写作规范约束；`hv-analysis` 面向产品/公司深度研究报告，与本任务（系列教学番外篇）方法不符（同前序计划理由）。

## Infrastructure And Config Prereqs

- Node 环境且 `node_modules/` 已安装（缺失时先 `npm install`）；无其他 infra 依赖；无数据迁移。

## Phase 1 — 词典与口径准备

Targets: `src/components/web3/GlossaryTerm.astro`
Skill: none

- Item Types: `Add | Proof`
- Prereqs: 本组计划 2026-09-08-1902-1 已完成（番外 1 发布、roadmap 头部读数 21、`不可能三角`/`数据可用性` 词条已存在，依赖链满足）

- [x] Add: 在 `GlossaryTerm.astro` 的 `definitions` 对象追加两个 key——`算法稳定币`（Algorithmic Stablecoin：不靠足额储备、靠协议的铸造/销毁与套利机制维持锚定的稳定币，「部分算法」则混合少量储备；需求信心一旦逆转，锚定本身成为抛压来源——UST 2022 年 5 月崩盘是这条路线最著名的失败案例，也把「锚定的信用从哪来」变成稳定币设计的必答题）、`脱锚`（Depeg：稳定币市场价格偏离锚定值（如 1 美元）的现象；轻微脱锚靠套利与赎回机制拉回，深度脱锚则是储备可信度或机制信用的崩塌——历史上多次脱锚事件幅度与持续时间差异极大，比较时用定性描述而非单点数字）。词条文案与既有 `稳定币`/`超额抵押`/`MakerDAO` 词条口径一致、风格一致。
- [x] Proof: `grep -n "算法稳定币\|脱锚" src/components/web3/GlossaryTerm.astro` 打印两个新 key 的定义行；`grep -n "稳定币" src/utils/web3Concepts.ts` 确认 conceptMeta `稳定币` 条目在档（番外约定的补条目要求已满足）；重读 defi-lending-protocols.mdx :111-128 与 tokenomics-design.mdx :115-134，确认文章将用的 DAI 口径（超额抵押 + 清算两板斧、DSR/PSM 点名）与死亡螺旋判定特征（需求侧只有补贴、没有价值捕获）与既有文案逐项对得上。

Exit Criteria:

- [x] 词典含 `算法稳定币`、`脱锚` 两个 key，先于文章使用落地；conceptMeta `稳定币` 条目核验在档。
- [x] DAI 机制与死亡螺旋口径与借贷篇、代币经济学篇核对一致，无凭空引用不存在的内容。

## Phase 2 — 文章写作

Targets: `src/content/blog/stablecoins-explained.mdx`
Skill: none

- Item Types: `Add | Decision | Proof`
- Prereqs: Phase 1（词条已存在，`GlossaryTerm` 才可引用）

- [x] Add: 创建 `src/content/blog/stablecoins-explained.mdx`，frontmatter 满足全局写作规范：`categories: ["Web3"]`、`subject: "Web3"`（番外组内惯例，1902-1 已确立）、`tags: ["Web3", "区块链入门", "稳定币", "算法稳定币"]`（番外约定 tag 含 `稳定币`）、`pubDate` 为执行当天日期、`description` 一段摘要；`heroImage` 为 Unsplash 图（`?w=1200&h=630&fit=crop` 后缀）；标题紧扣 roadmap WI 标签「稳定币」。
- [x] Decision: heroImage 选图——执行时 `grep -h "heroImage" src/content/blog/*.mdx` 全库比对唯一后选定；备选主题（天平/锚/法定货币视觉）任选，唯一性是硬约束。残余风险：无（可机械复查）。
- [x] Add: 正文 150-250 行，结构遵守全局规范：引言（承接番外之一结尾「链上世界真正的结算货币」钩子——执行时以该篇实际结尾为锚）→ 结算层分节（AMM 池用 USDC 计价、借贷用 DAI 偿付：波动资产做交易，稳定资产做结算，呼应 WI9/WI10 既有口径）→ 三种锚定机制对比分节（Markdown 对比表：法币抵押 USDT/USDC——公司发币、储备托管在银行、承诺 1:1 兑付，风险在托管与储备审计透明度；加密超额抵押 DAI——机制细节指路借贷篇，本篇只概括「超额抵押 + 随时清算」两板斧与 PSM 稳定器；算法/部分算法——无足额储备，锚定靠机制信用）→ UST 崩盘复盘分节（2022 年 5 月；ASCII text 代码块画死亡螺旋机制图：脱锚 → 赎回/铸造套利单向失衡 → 信心崩塌螺旋；呼应代币经济学篇「需求侧只有补贴、没有价值捕获」的判定特征；标注为 Web3 最重要的失败案例）→ 历史脱锚事件段（定性词描述，不编造精确幅度）→ 监管段（一句带过，MiCA 口径与词典一致）→ 选型清单分节（用途 → 适配类型：链上结算/DeFi 保证金/跨境汇款各自的取舍维度，风险教育框架）→ 总结：番外过渡钩子（币稳了，钥匙呢——资产的实际控制权在钱包，下一篇）。
- [x] Add: 组件使用合规——按系列既有惯例导入组件；`<Highlight>` 仅四种 type（UST 复盘警示用 `type="danger"`，「历史脱锚幅度用定性描述」提示用 `type="warning"`，选型清单免责声明用 `type="info"`）；`<GlossaryTerm>` 仅引用词典已有 key（含 Phase 1 新增两个，大小写完全一致）；禁止 `client:` 指令；图示全 ASCII text 代码块；全部历史数字与幅度用「量级/约/定性」表述，不构成投资建议声明在档。
- [x] Add: 文末「相关文章」内链仅引用已发布 slug（`ethereum-layer2-rollups` 必引——番外承接；`defi-lending-protocols` 必引——DAI 机制指路；`uniswap-amm-explained` 必引——USDC 计价呼应；`tokenomics-design` 必引——死亡螺旋判定特征呼应；其余按相关性精选，slug 必须真实存在）。
- [x] Proof: `wc -l src/content/blog/stablecoins-explained.mdx` 打印值在 150-250；每个 `GlossaryTerm term="X"` 词典命中且大小写一致；heroImage 唯一性复查通过（全库 grep 仅 1 hit）。

Exit Criteria:

- [x] 文章文件存在，frontmatter 全字段合规，行数 150-250。
- [x] 结构完整（引言/结算层/三种机制对比/UST 复盘/脱锚历史/监管/选型清单/总结与番外过渡），UST 时间锚点 2022 年 5 月、全部幅度定性表述。
- [x] 组件与内链合规；heroImage 全库唯一；四个必引 slug 均真实存在；无投资建议式内容。

## Phase 3 — 发布核验与验证

Targets: `docs/backlog/web3-roadmap.md`, `docs/logs/2026/`
Skill: none

- Item Types: `Add | Proof`
- Prereqs: Phase 2（文章已落地才置 done）

- [x] Add: `docs/backlog/web3-roadmap.md` Work Item Status 表番外/WI18 行 Status `todo` → `done`；同文件头部系列篇数同步（21 → 22，表述注明「主线 20 篇 + 番外 2 篇」）。
- [x] Add: `docs/logs/2026/` 当日日志记录条目（当日文件不存在则按 `docs/logs/00-log-writing-guide.md` 约定新建）。
- [x] Proof: `npm run test:run` exit 0。
- [x] Proof: `npm run build` exit 0 且 `test -f dist/blog/stablecoins-explained/index.html` 为真（新文章路由生成）。
- [x] Proof: 延伸阅读挂卡核验——`grep -c "stablecoins-explained" dist/web3/roadmap/index.html` ≥ 1 且 `grep -c "ethereum-layer2-rollups" dist/web3/roadmap/index.html` ≥ 1（两张番外卡并存）；`test -f dist/web3/concept/稳定币/index.html` 为真（tag 驱动的概念聚合页生成）。
- [x] Proof: 番外约定核验——`git diff --stat src/data/web3-roadmap-data.json AGENTS.md` 输出为空（或等价检查：json 仍为 20 个 `done`、AGENTS.md 路线图表无番外相关变更），证明两文件零改动。

Exit Criteria:

- [x] roadmap WI18 行 done、头部计数 22（含番外表述）；日志条目在档。
- [x] `test` / `build` 两验证键均 exit 0，新文章路由、第二张延伸阅读卡、概念页全部生成。
- [x] `web3-roadmap-data.json` 与 `AGENTS.md` 零变更（番外约定遵守，里程碑 20/20 不变）。
- [x] `docs/logs/` 更新（本计划闭环条目）。
- [x] 无 owner-doc 之外的文档更新需求——roadmap（本文件）即 owner doc，已在上述条目覆盖。

## Draft Review Record

- dispatch review #review-2026-09-08-190220-mission-driver-2026-09-08-1902-2-stablecoins-explained-1-79dcaa3a to opencode-glm53-review
- 2026-09-08：iteration 1，共识 acceptable-as-is #review-2026-09-08-190220-mission-driver-2026-09-08-1902-2-stablecoins-explained-1-79dcaa3a

## Verification

- pass test 2026-09-08-190220-mission-driver exit=0
- pass build 2026-09-08-190220-mission-driver exit=0

## Closure

- dispatch audit #audit-2026-09-08-190220-mission-driver-2026-09-08-1902-2-stablecoins-explained-1-7d4e91b2 to opencode-glm53-audit models={exec:opencode-glm53,aud:opencode-glm53}
- accepted #audit-2026-09-08-190220-mission-driver-2026-09-08-1902-2-stablecoins-explained-1-7d4e91b2：实地复核全部通过——GlossaryTerm.astro 新增 `算法稳定币`/`脱锚` 词条（:74-75）；文章 stablecoins-explained.mdx 150 行、heroImage 全库唯一（1526304640581-d334cdbbf45e 仅 1 hit）；roadmap WI18 行 done、头部计数 22（主线 20 + 番外 2）；docs/logs/2026/09-08.md :81-87 条目在档；`git diff --stat src/data/web3-roadmap-data.json AGENTS.md` 为空（番外约定遵守）。审计复跑验证：`npm run test:run` exit=0（4/4 passed）、`npm run build` exit=0（642 pages；`dist/blog/stablecoins-explained/index.html`、`dist/web3/roadmap/index.html` 含 stablecoins-explained 与 ethereum-layer2-rollups 双番外卡、`dist/web3/concept/稳定币/index.html` 概念页均生成）。
