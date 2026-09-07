---
status: active
mission: web3-roadmap
work-item: M3-WI7
group: "2026-09-07-2027"
verify: [test, build, hardhat]
---

# 2026-09-07-2027-2-deploy-to-testnet 测试网部署脚本 + 文章

> Source: docs/backlog/web3-roadmap.md M3/WI7（测试网部署准备 + 文章，对应 web3-roadmap-data.json M3.3）
> Related: 2026-09-07-2027-1-hardhat-local-env（前置：本计划在其 dapp/ 工程上加部署能力，承接其「预告 M3.3」结尾）；后续 M3/WI8（第一个完整 DApp）依赖本计划产出

## Current Baseline

- 依赖：本组前置计划 2026-09-07-2027-1（M3-WI6）须已完成——`dapp/` 存在且含 package.json（`test: "hardhat test"`）、hardhat.config.js、`contracts/Counter.sol`、全绿测试 `test/counter.js`；M3.2 为 `done`（执行时若前置未落地，停止执行并上报依赖未满足）。
- `src/data/web3-roadmap-data.json` 阶段 3：M3.3 `todo`、`articleSlug: null`（本计划目标）；M3.4 `todo`；milestone 标题为「部署到测试网（Sepolia / Hoodi）」。
- `docs/backlog/web3-roadmap.md` Work Item Status 表 M3/WI7 行 Status `todo`，依赖 WI6。
- `dapp/` 现无 deploy 脚本、无 `.env.example`、hardhat.config 无 sepolia network 配置（全部由本计划新增）。
- 密钥面：根 `.gitignore` 的 `.env`（无锚定）已覆盖 `dapp/.env`；roadmap 硬约束——助记词/私钥/RPC URL 一律只进 `.env`，文中用占位符，严禁真实值入库。
- 术语词典 `GlossaryTerm.astro`：已有 `Hardhat`（前置计划新增）；**没有** `测试网`、`水龙头` 词条——本篇文章的核心概念，按全局规范需先加词条再引用（RPC/Alchemy/Infura 等可作为普通专有名词走行文，不入词典）。
- 真实部署**不是本 WI 的完成门**（roadmap 明文：需要用户自己的 RPC 与测试私钥；文中写清操作步骤即可）；若执行时 `dapp/.env` 恰已配置且测试币可用，允许真实部署并把 tx hash 写进文章。
- Web3 系列已发布 9 篇 + 前置计划的 `hardhat-local-env`（前置计划保证存在，合计 10 个可内链 slug）。
- 已用 heroImage：photo-1554224155-6726b3ff858f、photo-1516245834210-c4c142787335、photo-1451187580459-43490279c0fa、photo-1554224154-26032ffc0d07、photo-1518770660439-4636190af475、photo-1518546305927-5a555bb7020d、photo-1639762681485-074b7f938ba0、photo-1555066931-4365d14bab8c、photo-1621761191319-c6fb62004040 + 前置计划新增 1 张（执行时以 grep 全库清单为准）。
- 验证门：`test` + `build` + `hardhat`；`type-check`/`lint` 存量失败不在门内（docs/testing/known-good-baselines.md）。

## Goals

- `dapp/` 新增部署能力：`scripts/deploy.js`（或等价 hardhat-deploy 方案）+ `.env.example`（`SEPOLIA_RPC_URL` / `PRIVATE_KEY` 占位符）+ hardhat.config 的 sepolia network 配置（读 env）。
- 部署脚本在本地/模拟网络验证通过：`npx hardhat run scripts/deploy.js`（默认 hardhat network）exit 0 且打印合约地址——这是 roadmap 认可的完成替代门。
- 词典新增 `测试网`、`水龙头` 词条并先于文章使用。
- 发布文章 `deploy-to-testnet`（本地网络 vs 测试网 vs 主网差别、faucet 获取测试币、RPC 节点服务角色、部署后 Etherscan 验证；含「配置好 .env 后执行 npx hardhat run ... --network sepolia」操作步骤），150-250 行，如实注明部署脚本在本地/模拟网络验证通过。
- 数据联动：M3.3 置 `done` + `articleSlug: "deploy-to-testnet"`；roadmap M3/WI7 行置 `done`；当日日志记录条目。
- 验证门通过：`npm run test:run` exit 0；`npm run build` exit 0 且 `dist/blog/deploy-to-testnet/index.html` 生成；`npm --prefix dapp test` exit 0。

## Non-Goals

- 不做真实 Sepolia/Hoodi 部署（除非执行时 .env 已配置且测试币可用——roadmap 预授权的可选增强，非完成门）。
- 不写 WI8 前端与 DApp 联调（后续计划负责）。
- 不更新 `AGENTS.md` 任何状态列（阶段 3 全完成的同步是 WI8 的授权动作）。
- 不引入 CI/CD、多网络批量部署、合约升级管理——超出 M3.3 范围。
- 不修复 `type-check` / `lint` 存量失败。

## Task Route

- Type: `implementation-only change`（dapp/ 增量：部署脚本 + 配置 + env 模板；一篇 MDX + 词典词条 + 数据联动）
- Owner Docs: `docs/backlog/web3-roadmap.md`（全局写作规范 + M3 续代码工程约定 + WI7 定义，含「真实部署非完成门」条款）
- Skill Selection Basis: 无匹配 skill——脚本与内容写作为领域专项，无架构变更，同前六篇计划理由。

## Infrastructure And Config Prereqs

- 前置计划的 `dapp/` 工程与已装依赖（含 ethers 相关 toolbox 能力）；`dapp/.env` 默认**不存在**（本计划只交付 `.env.example`，真实 .env 属用户侧）。
- 无外部服务调用、无密钥生成；若触发可选真实部署，则需用户自备 Sepolia RPC URL + 测试私钥 + 测试币（仅写入 `dapp/.env`，不入库）。

## Phase 1 — 部署脚本与环境配置

Targets: `dapp/scripts/deploy.js`, `dapp/.env.example`, `dapp/hardhat.config.js`, `.gitignore`（核验）
Skill: none

- Item Types: `Add | Decision | Proof`
- Prereqs: 计划 2026-09-07-2027-1 已完成（dapp/ 工程 + M3.2 done，依赖链 WI6 → WI7 满足）

- [x] Decision: 部署方案选型——默认 `scripts/deploy.js` + hardhat-ethers（零新增插件，与既有 toolbox 栈一致）；备选 hardhat-deploy 插件被否决：引入新依赖与部署目录约定，M3.3 用不上其增量能力。残余风险：无。
- [x] Add: `dapp/scripts/deploy.js`：取 Counter 合约工厂 → 部署 → 等待确认 → 打印合约地址与部署者地址（无任何硬编码网络/密钥；网络由 `--network` 参数决定）。
- [x] Add: `dapp/.env.example`：仅两行占位符 `SEPOLIA_RPC_URL=` 与 `PRIVATE_KEY=`（外加注释说明各自获取途径），不含任何真实值。
- [x] Add: `dapp/hardhat.config.js` 追加 sepolia network 配置：url/accounts 从 `process.env` 读取（dotenv 或toolbox 自带加载，选型与 Phase 1 Decision 一致）；默认 hardhat network 行为不变。
- [x] Proof: `git check-ignore -v dapp/.env` 生效（无锚定 `.env` 覆盖）；`git status --porcelain` 无 `.env` 类文件；`npx --prefix dapp hardhat run scripts/deploy.js` exit 0 且输出含合约地址（默认 hardhat network = 本地/模拟网络验证通过）；若 `.env` 已配置且走可选真实部署，另记录 tx hash。
- [x] Proof: `npm --prefix dapp test` 仍 exit 0（配置追加无回归）。

Exit Criteria:

- [x] 部署脚本 + .env.example + sepolia 配置三件套落地，本地/模拟网络部署验证通过。
- [x] 密钥面干净：仓库内无真实密钥/RPC URL，`.env` 仍被 gitignore。

## Phase 2 — 词典与文章写作

Targets: `src/components/web3/GlossaryTerm.astro`, `src/content/blog/deploy-to-testnet.mdx`
Skill: none

- Item Types: `Add | Decision | Proof`
- Prereqs: Phase 1

- [x] Add: `GlossaryTerm.astro` 的 `definitions` 追加两个 key：`测试网`（模仿主网规则但代币无价值的目标网络，如以太坊 Sepolia，供开发者免费验证合约与应用）与 `水龙头`（faucet：免费领取测试币的服务的通称，领取后即可在测试网支付 gas）。风格与既有词条一致，不与 `Gas`/`Hardhat` 词条口径冲突。
- [x] Add: 创建 `src/content/blog/deploy-to-testnet.mdx`，frontmatter：`title`、`categories: ["Web3"]`、`subject: "DApp"`、`tags: ["Web3", "区块链入门", "Sepolia"]`、`pubDate` 执行当天、`description` 摘要、`heroImage` 为 Unsplash 图（`?w=1200&h=630&fit=crop`）。
- [x] Decision: subject 取 `"DApp"` 与主题 tag 取 `Sepolia`——同组前例（2026-09-07-2027-1 Decision）的延续：阶段 3 文章 subject 为 "DApp"；主题 tag 取本文部署目标网络名。备选（"测试网" 作 tag）否决：与既有英文主题 tag 惯例（Ethereum/Gas/Solidity/Hardhat）一致优先。残余风险：无。
- [x] Decision: heroImage 选图——`grep -h "heroImage" src/content/blog/*.mdx` 全库比对确认唯一后选定。备选与残余风险记录在案（无）。
- [x] Add: 正文 150-250 行：引言（承接 hardhat-local-env 结尾「预告 M3.3」，本地全绿之后为什么要上测试网）→ 本地网络 vs `测试网` vs 主网差别（ASCII 对比表或表格式分节：成本/数据/重置/参与者）→ 准备工作分节（`水龙头` 领测试币、RPC 节点服务（Alchemy/Infura）角色——为什么需要第三方 RPC、`.env` 两项各填什么）→ 部署操作分节（复制 `.env.example` → 填值 → `npx hardhat run scripts/deploy.js --network sepolia`，逐条解释输出）→ 部署后分节（Etherscan 测试网版查合约地址、为什么要做合约验证/verify）→ 总结：合约已就位，预告 M3.4 第一个完整 DApp。全文如实注明：本文部署脚本已在本地/模拟网络验证通过（真实测试网部署为可选步骤）；若 Phase 1 走了真实部署，把 tx hash 与合约地址写进本节。
- [x] Add: 组件使用合规——`<Highlight>` 仅四种 type（密钥警告用 `type="danger"`：私钥永不入 git/永不发人）；`<GlossaryTerm>` 仅引用词典已有 key（含新增 `测试网`、`水龙头`）；无 `client:` 指令；图示全 ASCII text。
- [x] Add: 文末「相关文章」内链仅引用已发布 slug：4 篇 Bitcoin + account-model-vs-utxo + evm-deep-dive + ethereum-gas-fees + smart-contracts-explained + solidity-basics-notes + hardhat-local-env（前置计划保证存在）。
- [x] Proof: `wc -l` 打印值 150-250；每个 `GlossaryTerm term="X"` 词典命中且大小写一致；heroImage 唯一性复查通过；`grep -nE "(PRIVATE_KEY|RPC_URL)" src/content/blog/deploy-to-testnet.mdx` 仅命中占位符/说明文字，无真实值；文中命令与 `dapp/` 实际文件名/脚本名逐项一致。

Exit Criteria:

- [x] 词典含 `测试网`、`水龙头` key，先于文章使用落地；文章文件存在，frontmatter 全字段合规，行数 150-250。
- [x] 三网差别 / 准备工作 / 部署操作 / Etherscan 验证四个内容块齐备，「本地/模拟网络验证通过」如实注明，结尾完成向 M3.4 的预告。
- [x] 组件与内链合规；无真实密钥；heroImage 全库唯一。

## Phase 3 — 数据联动与验证

Targets: `src/data/web3-roadmap-data.json`, `docs/backlog/web3-roadmap.md`, `docs/logs/2026/`
Skill: none

- Item Types: `Add | Proof`
- Prereqs: Phase 2

- [x] Add: `web3-roadmap-data.json` 阶段 3 的 M3.3 `status: "todo"` → `"done"`、`articleSlug: null` → `"deploy-to-testnet"`；其余 milestone 不动（M3.1/M3.2 保持 done，M3.4 保持 todo，阶段 2/4/5 全不动）。
- [x] Add: `docs/backlog/web3-roadmap.md` Work Item Status 表 M3/WI7 行 Status `todo` → `done`。
- [x] Add: `docs/logs/2026/` 当日日志条目（追加至既有当日文件；跨日则按日志指南新建）。
- [x] Proof: `npm run test:run` exit 0。
- [x] Proof: `npm run build` exit 0 且 `test -f dist/blog/deploy-to-testnet/index.html` 为真。
- [x] Proof: `npm --prefix dapp test` exit 0。

Exit Criteria:

- [x] M3.3 done + articleSlug 正确；roadmap WI 行 done；日志条目在档；AGENTS.md 未动。
- [x] `test` / `build` / `hardhat` 三验证键均 exit 0，新文章路由生成。
- [x] `docs/logs/` 更新（本计划闭环条目）。

## Draft Review Record

- dispatch review #review-2026-09-07-202508-mission-driver-2026-09-07-2027-2-deploy-to-testnet-1-60899797 to ses-opencode-glm53
- 2026-09-07：iteration 1，共识 acceptable-as-is #review-2026-09-07-202508-mission-driver-2026-09-07-2027-2-deploy-to-testnet-1-60899797

## Verification

- pass test 2026-09-07-202508-mission-driver exit=0
- pass build 2026-09-07-202508-mission-driver exit=0
- pass hardhat 2026-09-07-202508-mission-driver exit=0
- pass test 2026-09-07-2106-mission-driver exit=0
- pass build 2026-09-07-2106-mission-driver exit=0
- pass hardhat 2026-09-07-2106-mission-driver exit=0

## Closure

- dispatch audit #audit-2026-09-07-202508-mission-driver-2026-09-07-2027-2-deploy-to-testnet-1-7d38ff0b to ses-opencode-glm53 models={exec:opencode-glm53,aud:opencode-glm53}
- accepted #audit-2026-09-07-202508-mission-driver-2026-09-07-2027-2-deploy-to-testnet-1-7d38ff0b：审计通过——全部 28 项 checkbox 与 live 仓库核对一致（dapp/scripts/deploy.js + .env.example + hardhat.config.js sepolia 配置落地、GlossaryTerm 含测试网/水龙头、deploy-to-testnet.mdx 存在、web3-roadmap-data.json M3.3 done + articleSlug 正确、backlog M3/WI7 done、docs/logs/2026/09-07.md 条目在档）；三验证门由审计独立复跑：npm run test:run exit=0（4 tests passing）、npm run build exit=0（589 pages，dist/blog/deploy-to-testnet/index.html 存在）、npm --prefix dapp test exit=0（4 passing）；无真实密钥入库（.env.example 仅占位符，仓库无 .env）。
