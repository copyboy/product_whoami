---
status: active
mission: web3-roadmap
work-item: 番外-WI19
group: "2026-09-08-1902"
verify: [test, build]
---

# 2026-09-08-1902-3-wallets-and-account-abstraction 文章「钱包与账户抽象」（番外·三·收官）

> Source: docs/backlog/web3-roadmap.md 番外/WI19（文章「钱包与账户抽象」，slug wallets-and-account-abstraction；五阶段主线之外的横向专题，番外收官篇）
> Related: 2026-09-08-1902-2-stablecoins-explained（组内前置：番外之二，引言承接其结尾「钥匙」过渡钩子）；2026-09-07-2111-1-first-full-dapp（MetaMask/钱包实操呼应对象）；2026-09-07-1319-1-account-model-vs-utxo（账户模型/签名验证呼应对象）；2026-09-08-1223-1-multisig-permission-management（钥匙管理与操作安全延续对象）

## Current Baseline

- 本计划是番外批次第三篇（组内执行顺序：2026-09-08-1902-1 → 2026-09-08-1902-2 → 本计划，番外收官）。目标输出文件 `src/content/blog/wallets-and-account-abstraction.mdx` 不存在；前置计划落地后系列应为 22 篇（主线 20 + 番外 2）、roadmap 头部计数 22、延伸阅读区块挂 2 张番外卡——执行时读数不符即前置计划未完成落地，停止执行并上报依赖未满足。
- 番外特殊约定（同组 1 号计划已全文引用）：**严禁修改 `src/data/web3-roadmap-data.json` 和 AGENTS.md 路线图表**，里程碑进度 20/20 保持不变；延伸阅读按 slug 自动挂卡（roadmap.astro:150 supplementSlugs 已含 `wallets-and-account-abstraction`，本篇发布后三卡齐）；tag 含 `钱包`、`账户抽象` 驱动概念聚合。
- conceptMeta（`src/utils/web3Concepts.ts`）：`账户抽象` 条目**已存在**（:41，phaseId 3）——番外约定的补条目对本篇半数已满足，核验即可；但 `钱包` **无匹配条目**——:30 的 key 是 `wallet`（英文），tag `钱包` 经 `getConceptMeta` 小写化后是 `钱包`，不命中 `wallet`（精确 key 匹配）。番外约定通用规则「新增 tag 需在 conceptMeta 补条目」适用：缺失时概念卡与概念页的 nameEn 会回退（`concept/[slug].astro` :33 中文 slug 回退表无 `钱包`，nameEn 显示为占位文案）。本计划 Phase 1 追加 `钱包` 条目（数据级追加，无行为改动）。
- 术语词典 `src/components/web3/GlossaryTerm.astro` 已有：`Account Abstraction`（:50，**ERC-4337 独立标准 + EIP-7702 EOA 委托两路线口径已在词条内**，与 report 修订后口径一致）、`MPC`（:46）、`MetaMask`（:42）、`多签`（:88）、`Gnosis Safe`（:89）、`ERC20`（:51）、`账户模型`（:27）、`Nonce`（:28）、`DApp`（:41）。**没有** `助记词`、`热钱包`、`无限授权` 词条——本篇三个核心新概念（钥匙管理主体、冷热取舍、ERC-20 授权陷阱），按全局规范需 Phase 1 先补。注意：词典无 `非对称加密` 词条且已发布文章无专门展开（grep 证实）——正文提及签名/密钥对时用行文表述，不套 `GlossaryTerm`，也不声称站内有既有展开可呼应。
- 口径锚点（文章必须逐项对齐）：`src/content/blog/multisig-permission-management.mdx` :29/:36（助记词失窃通道：抄备忘录、截图存网盘、钓鱼网站）、:136-137（操作安全：测试专用账户隔离、签名前核对 calldata 与目标地址——该篇 :137 已一句带过「无限授权」钓鱼形态，本篇是其展开篇）；`src/content/blog/first-full-dapp.mdx`（MetaMask 连接与签名交易的既有实操叙事）；`src/content/blog/account-model-vs-utxo.mdx`（账户模型/nonce/签名验证机制）；`src/pages/web3/report.astro` :659（「L2 费用 $0.001 级别，账户抽象让 Web2 用户无缝进入。ERC-4337 定义了账户抽象标准，EIP-7702 让 EOA 账户获得智能合约能力」）、:686（技术指标 EIP-7702 采用率 > 50%）、:696 附近（终极判断：钱包抽象化、费用趋近于零、合规清晰化三件事同时发生）。
- 账户抽象体验升级口径（roadmap WI19 定义）：社交恢复、无 gas 交易、批量操作——`Account Abstraction` 词条已含「社交恢复、无 gas 赞助交易」表述（另含多签），「批量操作」词条未含、按 WI19 定义口径写入，文章以 WI19 三件套为准。
- heroImage 现状：前置计划落地后执行 `grep -h "heroImage" src/content/blog/*.mdx | sort -u` 现场计数（当前 22 个唯一值，前置两篇各带 1 图落地后预期 24；「22 篇」是系列篇数、以 roadmap 头部读数为准，heroImage 计数不作依赖判据），新图须全库唯一并带 `?w=1200&h=630&fit=crop` 后缀。
- subject 惯例：番外统一 `subject: "Web3"`（2026-09-08-1902-1 Phase 2 Decision 确立的组内惯例，本计划沿用）。
- 验证基线（docs/testing/known-good-baselines.md + missions/web3-roadmap.json commands）：`npm run test:run` exit 0、`npm run build` exit 0 为通过门；`type-check`/`lint` 存量失败不在门内（mission config 已声明 skip）。
- 环境事实：Node v22.22.2 / npm 10.9.7 可用（同日闭合计划审计确认）；`docs/logs/2026/09-08.md` 已存在，追加条目即可（跨日执行则按当日新建）。

## Goals

- 词典新增 `助记词`、`热钱包`、`无限授权` 词条；conceptMeta 新增 `钱包` 条目（tag 聚合命名兜底修复），先于文章使用落地。
- 发布文章 `wallets-and-account-abstraction`（150-250 行）：钱包的本质是钥匙管理不是「装钱」（私钥/助记词/Keystore，呼应账户模型的签名验证）；热钱包 vs 冷钱包取舍表；实操安全守则（小额热/大额冷、签名前核对、ERC-20 无限授权的坑与 revoke 工具、测试专用账户——呼应 dapp/ 实践）；账户抽象两条路线：ERC-4337 独立标准 vs EIP-7702 EOA 委托（口径与词典/report 修订后一致），带来的体验升级：社交恢复、无 gas 交易、批量操作；结尾：账户体验成熟是 Web3 大规模采用的前提（呼应 report §6），并作番外收官收束。
- 番外发布核验：延伸阅读区块三张番外卡齐全；`/web3/concept/钱包/` 与 `/web3/concept/账户抽象/` 概念页生成；roadmap Work Item Status 表番外/WI19 行置 `done`、头部系列篇数同步（22 → 23，番外收官表述）；`docs/logs/2026/` 当日日志记录条目。
- 番外约定核验：`src/data/web3-roadmap-data.json` 与 `AGENTS.md` 路线图表零变更（里程碑保持 20/20）。
- 验证门通过：`npm run test:run` exit 0；`npm run build` exit 0 且 `dist/blog/wallets-and-account-abstraction/index.html` 生成。

## Non-Goals

- 不修改 `src/data/web3-roadmap-data.json` 和 `AGENTS.md` 路线图表（番外特殊约定明文禁止；硬边界，不是数据联动的省略）。
- 不新增后续专题或系列规划（本篇是番外收官，只收束不开新坑；mission 完成与否由引擎基于审计轮数决定，非本计划职责）。
- 不深入 ZK 证明数学、ERC-4337 bundler/paymaster 基础设施细节（两条路线讲「是什么、差在哪、体验升级是什么」，协议内部机制一句话带过）。
- 不推荐具体钱包产品（MetaMask 仅作既有实操叙事的呼应，不构成产品推荐；revoke 类工具按工具类别表述）。
- 不编造任何采用率/市占数字（EIP-7702 采用率只引 report 页既有的「> 50% 是观察指标」口径）。
- 不修复 `type-check` / `lint` 存量失败（非本 mission 通过门，mission config 已声明 skip）。
- 不修改任何站点代码/组件行为（词典词条与 conceptMeta `钱包` 条目均为数据级追加）。

## Task Route

- Type: `implementation-only change`（纯内容新增：一篇 MDX + 词典词条 + conceptMeta 数据条目 + roadmap 状态行与日志，无架构/契约变化）
- Owner Docs: `docs/backlog/web3-roadmap.md`（全局写作规范 + 番外特殊约定 + WI19 定义）、`docs/testing/known-good-baselines.md`（验证口径与存量失败）
- Skill Selection Basis: 无匹配 skill——技术博客写作由 roadmap 全局写作规范约束；`hv-analysis` 面向产品/公司深度研究报告，与本任务（系列教学番外收官篇）方法不符（同前序计划理由）。

## Infrastructure And Config Prereqs

- Node 环境且 `node_modules/` 已安装（缺失时先 `npm install`）；无其他 infra 依赖；无数据迁移。

## Phase 1 — 词典、conceptMeta 与口径准备

Targets: `src/components/web3/GlossaryTerm.astro`, `src/utils/web3Concepts.ts`
Skill: none

- Item Types: `Add | Proof`
- Prereqs: 本组计划 2026-09-08-1902-2 已完成（番外 2 发布、roadmap 头部读数 22、`算法稳定币`/`脱锚` 词条已存在，依赖链满足）

- [x] Add: 在 `GlossaryTerm.astro` 的 `definitions` 对象追加三个 key——`助记词`（Seed Phrase / 助记词，BIP-39 标准：12 或 24 个单词编码私钥种子，由它确定性派生全部账户私钥；Keystore 文件是加密后的私钥另一形态。助记词即账户控制权本身——抄在备忘录、截图存网盘、输入钓鱼网站，任一通道泄露即资产全损，且没有冻结与挂失）、`热钱包`（Hot Wallet：私钥保管在联网环境（浏览器插件/手机 App），签名方便、暴露面大；冷钱包（硬件设备/离线介质）签名麻烦、暴露面小——两者构成安全与便利的光谱，通行做法是小额热钱包日常使用、大额资产冷钱包离线保管）、`无限授权`（Infinite Approval：ERC-20 的 approve 常被钱包默认或被 DApp 引导设为极大额度，此后合约可随时划走该代币的全部余额——合约被黑或作恶时无需再征得签名；防御是交互前核对授权额度、授权后用 revoke 类工具定期回收）。词条文案与既有 `MetaMask`/`多签`/`MPC` 词条口径一致、风格一致。
- [x] Add: 在 `web3Concepts.ts` 的 `conceptMeta` 对象追加 `钱包` 条目：`'钱包': { name: '钱包', nameEn: 'Wallet', phaseId: 0 }`（与既有 `wallet`（:30）、`metamask`（:31）条目同 phaseId 0，风格一致）——修复 tag `钱包` 无 conceptMeta 命中导致的聚合页英文命名回退。
- [x] Proof: `grep -n "助记词\|热钱包\|无限授权" src/components/web3/GlossaryTerm.astro` 打印三个新 key 的定义行；`grep -n "账户抽象\|钱包" src/utils/web3Concepts.ts` 确认 `账户抽象` 条目在档（核验）且 `钱包` 新条目在档（新增）；重读 multisig-permission-management.mdx :29/:136-137 与 report.astro :659/:686，确认文章将用的呼应点（助记词失窃通道、calldata 核对、无限授权、ERC-4337/EIP-7702 两路线表述）与既有文案逐项对得上。

Exit Criteria:

- [x] 词典含 `助记词`、`热钱包`、`无限授权` 三个 key；conceptMeta 含 `钱包` 条目且 `账户抽象` 核验在档，先于文章使用落地。
- [x] multisig 篇与 report 页呼应点核对一致，无凭空引用不存在的内容。

## Phase 2 — 文章写作

Targets: `src/content/blog/wallets-and-account-abstraction.mdx`
Skill: none

- Item Types: `Add | Decision | Proof`
- Prereqs: Phase 1（词条与 conceptMeta 条目已存在，`GlossaryTerm` 才可引用）

- [x] Add: 创建 `src/content/blog/wallets-and-account-abstraction.mdx`，frontmatter 满足全局写作规范：`categories: ["Web3"]`、`subject: "Web3"`（番外组内惯例，1902-1 已确立）、`tags: ["Web3", "区块链入门", "钱包", "账户抽象"]`（番外约定 tag 含 `钱包`、`账户抽象`）、`pubDate` 为执行当天日期、`description` 一段摘要；`heroImage` 为 Unsplash 图（`?w=1200&h=630&fit=crop` 后缀）；标题紧扣 roadmap WI 标签「钱包与账户抽象」。
- [x] Decision: heroImage 选图——执行时 `grep -h "heroImage" src/content/blog/*.mdx` 全库比对唯一后选定；备选主题（钥匙串/保险箱/锁具视觉）任选，唯一性是硬约束。残余风险：无（可机械复查）。
- [x] Add: 正文 150-250 行，结构遵守全局规范：引言（承接番外之二结尾「币稳了，钥匙呢」钩子——执行时以该篇实际结尾为锚）→ 钥匙管理分节（钱包的本质：管理私钥而非「装钱」——资产在链上账本里，钱包只管签名权；私钥/助记词/Keystore 三种载体；呼应账户模型篇的签名验证与 nonce，first-full-dapp 的 MetaMask 签名实操）→ 冷热取舍分节（Markdown 取舍表：热钱包 vs 冷钱包的便利/暴露面/适用金额；通行原则小额热、大额冷，呼应 multisig 篇 :29 助记词失窃通道）→ 实操安全守则分节（四条：小额热/大额冷分层；签名前核对 calldata 与目标地址；**ERC-20 无限授权的坑**与 revoke 类工具回收授权；测试专用账户隔离——后两条直接呼应 multisig 篇 :136-137 与 dapp/ 实践，本篇是其面向个人用户的展开）→ 账户抽象分节（两条路线：ERC-4337 独立标准 vs EIP-7702 EOA 委托，口径与词典 `Account Abstraction` 词条及 report :659 一致；体验升级三件套：社交恢复、无 gas 交易、批量操作；多签/MPC 与 AA 的关系一句话衔接）→ **番外收官总结**：账户体验成熟是 Web3 大规模采用的前提（呼应 report §6 终极判断「钱包抽象化、费用趋近于零、合规清晰化」与 EIP-7702 采用率观察指标），三篇番外（扩容→稳定币→钱包）串成「用得起、算得稳、管得住」的落地三件套，主线 20 篇 + 番外 3 篇全系列收束。
- [x] Add: 组件使用合规——按系列既有惯例导入组件；`<Highlight>` 仅四种 type（无限授权风险警示用 `type="danger"`，冷热分层原则提示用 `type="warning"`，不构成产品推荐声明用 `type="info"`）；`<GlossaryTerm>` 仅引用词典已有 key（含 Phase 1 新增三个，大小写完全一致；`非对称加密` 无词条，行文表述不套组件）；禁止 `client:` 指令；图示全 ASCII text 代码块；不编造采用率数字，EIP-7702 只引 report 既有观察指标口径。
- [x] Add: 文末「相关文章」内链仅引用已发布 slug（`stablecoins-explained` 必引——番外承接；`first-full-dapp` 必引——MetaMask/签名实操呼应；`account-model-vs-utxo` 必引——账户模型与签名验证；`multisig-permission-management` 必引——钥匙管理与操作安全延续；其余按相关性精选，slug 必须真实存在）。
- [x] Proof: `wc -l src/content/blog/wallets-and-account-abstraction.mdx` 打印值在 150-250；每个 `GlossaryTerm term="X"` 词典命中且大小写一致；heroImage 唯一性复查通过（全库 grep 仅 1 hit）。

Exit Criteria:

- [x] 文章文件存在，frontmatter 全字段合规，行数 150-250。
- [x] 结构完整（引言/钥匙管理/冷热取舍/安全守则/账户抽象两路线与体验升级/番外收官总结），两路线与体验升级口径与词条及 report 页一致。
- [x] 组件与内链合规；heroImage 全库唯一；四个必引 slug 均真实存在；无产品推荐式内容。

## Phase 3 — 发布核验与验证

Targets: `docs/backlog/web3-roadmap.md`, `docs/logs/2026/`
Skill: none

- Item Types: `Add | Proof`
- Prereqs: Phase 2（文章已落地才置 done）

- [x] Add: `docs/backlog/web3-roadmap.md` Work Item Status 表番外/WI19 行 Status `todo` → `done`；同文件头部系列篇数同步（22 → 23，表述注明「主线 20 篇 + 番外 3 篇」，番外收官）。
- [x] Add: `docs/logs/2026/` 当日日志记录条目（当日文件不存在则按 `docs/logs/00-log-writing-guide.md` 约定新建；收官条目注明番外 3 篇完成）。
- [x] Proof: `npm run test:run` exit 0。
- [x] Proof: `npm run build` exit 0 且 `test -f dist/blog/wallets-and-account-abstraction/index.html` 为真（新文章路由生成）。
- [x] Proof: 延伸阅读挂卡核验——三个番外 slug（ethereum-layer2-rollups / stablecoins-explained / wallets-and-account-abstraction）在 `dist/web3/roadmap/index.html` 各 ≥ 1 hit（三卡齐全）；`test -f dist/web3/concept/钱包/index.html` 与 `test -f dist/web3/concept/账户抽象/index.html` 均为真（tag 驱动的概念聚合页生成，且 `钱包` 页英文命名不再回退占位文案）。
- [x] Proof: 番外约定核验——`git diff --stat src/data/web3-roadmap-data.json AGENTS.md` 输出为空（或等价检查：json 仍为 20 个 `done`、AGENTS.md 路线图表无番外相关变更），证明两文件零改动。

Exit Criteria:

- [x] roadmap WI19 行 done、头部计数 23（番外收官表述）；日志收官条目在档。
- [x] `test` / `build` 两验证键均 exit 0，新文章路由、三张延伸阅读卡、两个概念页全部生成。
- [x] `web3-roadmap-data.json` 与 `AGENTS.md` 零变更（番外约定遵守，里程碑 20/20 不变）。
- [x] `docs/logs/` 更新（本计划闭环 + 番外收官条目）。
- [x] 无 owner-doc 之外的文档更新需求——roadmap（`docs/backlog/web3-roadmap.md`）即 owner doc，已在上述条目覆盖。

## Draft Review Record

- dispatch review #review-2026-09-08-190220-mission-driver-2026-09-08-1902-3-wallets-and-account-abstraction-1-7613eed0 to ses_opencode_reviewer
- 2026-09-08：iteration 1，共识 acceptable-after-fixes #review-2026-09-08-190220-mission-driver-2026-09-08-1902-3-wallets-and-account-abstraction-1-7613eed0

## Verification

- pass test 2026-09-08-190220-mission-driver exit=0
- pass build 2026-09-08-190220-mission-driver exit=0

## Closure

- dispatch audit #audit-2026-09-08-190220-mission-driver-2026-09-08-1902-3-wallets-and-account-abstraction-1-70f3d6f6 to ses_opencode_auditor models={exec:opencode-glm-5.3,aud:opencode-glm-5.3}
- accepted #audit-2026-09-08-190220-mission-driver-2026-09-08-1902-3-wallets-and-account-abstraction-1-70f3d6f6：审计通过——25 项执行/退出条目全部落地且逐项核验（词典 :96-98 三词条、web3Concepts.ts:42 `钱包` 条目、文章 151 行 frontmatter/组件/内链/heroImage 唯一性合规、roadmap WI19 done 头部计数 23、09-08.md 收官日志、web3-roadmap-data.json 与 AGENTS.md 零变更）；关键验证：`npm run test:run` exit=0（4 tests passed）、`npm run build` exit=0（647 pages）、`dist/blog/wallets-and-account-abstraction/index.html`、`dist/web3/concept/钱包/`、`dist/web3/concept/账户抽象/` 均生成、roadmap 页三番外卡各 1 hit。
