---
status: active
mission: web3-roadmap
work-item: M3-WI6
group: "2026-09-07-2027"
verify: [test, build, hardhat]
---

# 2026-09-07-2027-1-hardhat-local-env Hardhat 本地测试环境 + 文章

> Source: docs/backlog/web3-roadmap.md M3/WI6（Hardhat 本地测试环境搭建 + 文章，对应 web3-roadmap-data.json M3.2）
> Related: 2026-09-07-1524-2-solidity-basics-notes（前置：M3.1 已 done，本篇沿用其 Counter 合约并承接其「预告 M3.2」结尾）；本组后续计划 2026-09-07-2027-2-deploy-to-testnet（依赖本计划产出的 dapp/ 工程）

## Current Baseline

- 仓库根**没有** `dapp/` 目录（`ls dapp/` 不存在）；`docs/backlog/web3-roadmap.md` M3 续约定：所有合约代码放 `dapp/`，独立 package.json（`test` script = `hardhat test`），Solidity ^0.8.x，`node_modules`/`cache/`/`artifacts/` 不入 git。
- mission 配置（`missions/web3-roadmap.json`）已定义命令键 `hardhat` = `npm --prefix dapp test`——依赖本计划在 `dapp/package.json` 里建 `test: "hardhat test"`。
- 可复用合约：`src/content/blog/solidity-basics-notes.mdx` 第 142-172 行的 `Counter`（SPDX + `pragma solidity ^0.8.20`；`increment` 正常路径 + `decrement` 带 `require(count > 0, "count is zero")`——天然满足 roadmap「正常路径 + 一个 revert 断言」的测试要求）。
- `src/data/web3-roadmap-data.json` 阶段 3：M3.1 `done`（articleSlug `solidity-basics-notes`）；M3.2 `todo`、articleSlug `null`（本计划目标）；M3.3/M3.4 `todo`。
- `docs/backlog/web3-roadmap.md` Work Item Status 表 M3/WI6 行 Status `todo`，依赖 WI5（已 done，依赖链满足）。
- `.gitignore` 现状：`node_modules`（无锚定，已天然覆盖 `dapp/node_modules/`）、`.env` 在列；**没有** `cache`/`artifacts` 相关条目——roadmap 明确要求补 `dapp/cache/`、`dapp/artifacts/`、`dapp/node_modules/`。
- 术语词典 `GlossaryTerm.astro` 已有 `Solidity`（WI5 计划新增）；**没有** `Hardhat` 词条——本篇文章高频使用 Hardhat，按全局规范需先加词条再引用。
- 环境事实：Node v22.22.2 / npm 10.9.7 可用；站点 `node_modules/` 已安装。
- Web3 系列已发布 9 篇（4 Bitcoin + account-model-vs-utxo + evm-deep-dive + ethereum-gas-fees + smart-contracts-explained + solidity-basics-notes）。
- 已用 heroImage（全库唯一性硬约束）：photo-1554224155-6726b3ff858f、photo-1516245834210-c4c142787335、photo-1451187580459-43490279c0fa、photo-1554224154-26032ffc0d07、photo-1518770660439-4636190af475、photo-1518546305927-5a555bb7020d、photo-1639762681485-074b7f938ba0、photo-1555066931-4365d14bab8c、photo-1621761191319-c6fb62004040。
- 验证门：`test`（npm run test:run）+ `build`（npm run build）+ `hardhat`（npm --prefix dapp test）；`type-check`/`lint` 存量失败不在门内（docs/testing/known-good-baselines.md）。

## Goals

- `dapp/` Hardhat 工程落地（JS 即可，TS 可选）：独立 package.json（`test` = `hardhat test`）、hardhat.config、`contracts/Counter.sol`（沿用 WI5 笔记合约）、配套测试（正常路径 + 一个 revert 断言）；`npx hardhat compile` 无告警；`npx hardhat test` 全绿。
- `.gitignore` 补 `dapp/cache/`、`dapp/artifacts/`、`dapp/node_modules/`；`dapp/` 构建产物不影响站点 `npm run build`。
- 词典新增 `Hardhat` 词条并先于文章使用。
- 发布文章 `hardhat-local-env`（Remix → Hardhat 工作流升级动机、目录结构导览、测试怎么写、常见坑：Node 版本/cache/artifacts），150-250 行，承接 WI5 结尾的 M3.2 预告。
- 数据联动：M3.2 置 `done` + `articleSlug: "hardhat-local-env"`；roadmap M3/WI6 行置 `done`；当日日志记录条目。
- 验证门通过：`npm run test:run` exit 0；`npm run build` exit 0 且 `dist/blog/hardhat-local-env/index.html` 生成；`npm --prefix dapp test` exit 0。

## Non-Goals

- 不写 WI7 测试网部署脚本/配置/文章（本组后续计划 2026-09-07-2027-2 负责）。
- 不更新 `AGENTS.md` 任何状态列（阶段 3 需 M3.1-M3.4 全 done 才由 WI8 授权同步，现为 1/4）。
- 不引入 Foundry、不写 CI 集成、不做 gas 报告/coverage 等 toolbox 进阶功能——超出 M3.2 范围。
- 不修复 `type-check` / `lint` 存量失败。

## Task Route

- Type: `implementation-only change`（net-new：`dapp/` 工程 + 测试 + 一篇 MDX + 词典词条 + 数据联动）
- Owner Docs: `docs/backlog/web3-roadmap.md`（全局写作规范 + M3 续代码工程约定 + WI6 定义）、`src/content/blog/solidity-basics-notes.mdx`（复用合约来源，只读）
- Skill Selection Basis: 无匹配 skill——npm 工具链初始化与内容写作为领域专项，无架构变更，同前五篇计划理由。

## Infrastructure And Config Prereqs

- Node v22.22.2 / npm 10.9.7（已核验在位）；`dapp/` 需独立 `npm install`（hardhat + toolbox 等开发依赖，node_modules 不入库）。
- 无外部服务、无密钥、无数据迁移；Hardhat 全部运行在本地 in-process 网络。

## Phase 1 — 工程骨架与 .gitignore

Targets: `dapp/`, `dapp/package.json`, `dapp/hardhat.config.js`, `dapp/contracts/Counter.sol`, `.gitignore`
Skill: none

- Item Types: `Add | Decision | Proof`
- Prereqs: 计划 2026-09-07-1524-2 已完成（M3.1 done，依赖链 WI5 → WI6 满足；Counter 合约文本可得）

- [x] Decision: Hardhat 主版本选型——默认 Hardhat 2.x（`hardhat` + `@nomicfoundation/hardhat-toolbox`，ethers + chai matchers，与 roadmap「describe/it + ethers-waffle 或 chai 断言」口径一致）；仅当 2.x 在 Node 22 下无法干净安装时改用 Hardhat 3.x（其默认测试栈），并在执行记录里写明偏离与理由。判据（两版通用）：干净安装、`npx hardhat compile` 无告警、`npx hardhat test` 全绿。→ 执行结果：走默认路径 hardhat@2.26.x + toolbox@5，Node 22 下干净安装（640 packages，exit 0），无偏离。
- [x] Add: `dapp/package.json`（独立于站点根）：name/private/scripts 含 `test: "hardhat test"`；devDependencies 按 Phase 1 Decision 选型锁定；随后 `npm install`（dapp/ 内）成功。→ `npm --prefix dapp install` exit 0（added 640 packages）。
- [x] Add: `dapp/hardhat.config.js`：solidity `^0.8.20`；含 toolbox require；networks 先只保留默认 hardhat network（sepolia 配置属 WI7，本计划不加）。
- [x] Add: `dapp/contracts/Counter.sol`——逐字沿用 `solidity-basics-notes.mdx` 第 142-172 行合约（SPDX/MIT + pragma ^0.8.20 + increment/decrement/getCount），保证文章与代码一一对应。
- [x] Add: `.gitignore` 追加 `dapp/cache/`、`dapp/artifacts/`、`dapp/node_modules/`（注：无锚定 `node_modules` 已覆盖第三项，显式列出是 roadmap 的明确要求，自文档化）。
- [x] Proof: `npm --prefix dapp install` exit 0；`npm --prefix dapp exec hardhat compile` exit 0 且输出无 warning 行；`git status --porcelain` 确认 `dapp/cache/`、`dapp/artifacts/`、`dapp/node_modules/` 均未被跟踪（手工 `touch dapp/cache/x && git check-ignore -v dapp/cache/x` 验证生效后清理）。→ install exit 0；compile 在 dapp/ 工作目录执行 exit 0（`Compiled 1 Solidity file successfully`，无 warning 行；注：`npm --prefix dapp exec` 不切换 cwd，字面命令报 HH1，等价工作命令 `cd dapp && npx hardhat compile`）；`git check-ignore -v` 三条目全部命中 `.gitignore:35-37`，touch 后已清理，`git status --porcelain` 中 dapp/ 下无 cache/artifacts/node_modules 条目。

Exit Criteria:

- [x] `dapp/` 工程可编译：compile exit 0、无告警；依赖安装成功。
- [x] `.gitignore` 三条目生效，构建产物与依赖不入库。
- [x] 版本选型 Decision 记录在案（含偏离理由，如触发）。（未触发偏离——默认 2.x 通过全部判据）

## Phase 2 — 测试文件与全绿门

Targets: `dapp/test/counter.js`
Skill: none

- Item Types: `Add | Proof`
- Prereqs: Phase 1

- [x] Add: 测试文件 `dapp/test/counter.js`：describe/it 结构，至少覆盖——① 正常路径：部署后初始 `count == 0`、`increment()` 后 `count == 1`、`getCount()` 返回一致；② revert 断言：初始状态调 `decrement()` 被 revert 且错误信息 `"count is zero"`（chai matchers 的 `.revertedWith` 或等价断言）；③ 事件断言：`increment()` emit `CountChanged`（toolbox 提供的 expect().to.emit，如选型不含此能力则改为 ②③ 合并的最小集并在执行记录注明）。→ ①②③ 三类全部落地（toolbox 5 提供 expect().to.emit + withArgs，无豁免）。
- [x] Proof: `npm --prefix dapp test` exit 0、全部用例 pass；输出粘贴进执行记录。→ 输出：`Counter` 4 passing（886ms）——「正常路径：部署后初始 count == 0」「正常路径：increment() 后 count == 1，getCount() 返回一致」「revert 断言：初始状态调 decrement() 被 revert，错误信息 count is zero」「事件断言：increment() emit CountChanged(调用者, 新值)」，exit 0。

Exit Criteria:

- [x] 正常路径 + revert 断言齐备（事件断言按选型能力落地或记录豁免理由）。（事件断言已落地，无豁免）
- [x] `hardhat` 验证键对应的命令（`npm --prefix dapp test`）exit 0。

## Phase 3 — 词典与文章写作

Targets: `src/components/web3/GlossaryTerm.astro`, `src/content/blog/hardhat-local-env.mdx`
Skill: none

- Item Types: `Add | Decision | Proof`
- Prereqs: Phase 2

- [x] Add: `GlossaryTerm.astro` 的 `definitions` 追加 key `Hardhat`（以太坊主流本地开发框架：提供本地测试网络、合约编译、自动化测试与部署脚本，是 Remix 之后的进阶工作流）。风格与既有词条一致，不与 `Solidity`/`EVM`/`字节码` 词条口径冲突。→ data-level addition 紧邻 `Solidity` 词条，无组件逻辑改动；口径核对：Solidity 词条讲「语言→字节码」，Hardhat 词条讲「框架/工具链」，不冲突。
- [x] Add: 创建 `src/content/blog/hardhat-local-env.mdx`，frontmatter：`title`、`categories: ["Web3"]`、`subject: "DApp"`、`tags: ["Web3", "区块链入门", "Hardhat"]`、`pubDate` 执行当天、`description` 摘要、`heroImage` 为 Unsplash 图（`?w=1200&h=630&fit=crop`）。
- [x] Decision: subject 取 `"DApp"`——roadmap 全局规范明文只定义了 WI5 为 "DApp"，M3 续各篇同属阶段 3（DApp 入门），按 WI5 先例取 "DApp"；主题 tag 取 `Hardhat`。备选（"Ethereum"）否决：阶段归属已从 Ethereum 切换到 DApp。残余风险：无（仅内容元数据）。
- [x] Decision: heroImage 选图——`grep -h "heroImage" src/content/blog/*.mdx` 全库比对确认唯一后选定（避开 Current Baseline 已列 9 图）。备选与残余风险记录在案（无）。→ 选定 `photo-1581092160562-40aa08e78837`（工程测试主题，Unsplash）；grep 复查全库唯一（1 hit）。
- [x] Add: 正文 150-250 行：引言（承接 solidity-basics-notes 结尾「预告 M3.2 测试环境」，Remix 单机试错的痛点 → 工程化动机）→ 目录结构导览（contracts/test/scripts/config，ASCII text 代码块画 `dapp/` 树）→ 测试怎么写（describe/it + chai/ethers matchers，贴 Phase 2 真实用例并解释 revert 断言）→ 常见坑（Node 版本、cache/artifacts 何时删、为什么重新编译）→ 总结：从「浏览器里点按钮」到「可回归验证的工程」，预告 M3.3 测试网部署。
- [x] Add: 组件使用合规——`<Highlight>` 仅四种 type；`<GlossaryTerm>` 仅引用词典已有 key（含新增 `Hardhat`）；无 `client:` 指令；图示全 ASCII text。→ 实测：Highlight 仅 info ×1；GlossaryTerm 引用 Hardhat×3/Solidity×1/字节码×1，全部命中词典且大小写一致；`client:` 0；图示均为 text/javascript 代码块。
- [x] Add: 文末「相关文章」内链仅引用已发布 slug：4 篇 Bitcoin + account-model-vs-utxo + evm-deep-dive + ethereum-gas-fees + smart-contracts-explained + solidity-basics-notes。→ 9 条内链逐条对应已发布 slug，无未发布引用。
- [x] Proof: `wc -l` 打印值 150-250；每个 `GlossaryTerm term="X"` 词典命中且大小写一致；heroImage 唯一性复查通过；文中代码与 `dapp/` 实际文件一致（目录树、测试用例逐项核对）。→ wc -l = 192 ∈ [150,250]；词典命中核对脚本输出 Hardhat/Solidity/字节码 = true；heroImage 唯一（grep 1 hit）；目录树与 dapp/ 实况逐项核对一致（scripts/ 标注为 M3.3 预告，非现存文件）；测试代码块为 dapp/test/counter.js 真实逻辑；compile/test 输出粘贴自真实运行。验证门：build exit 0（586 pages）、test:run exit 0（4/4）。

Exit Criteria:

- [x] 词典含 `Hardhat` key，先于文章使用落地；文章文件存在，frontmatter 全字段合规，行数 150-250。
- [x] Remix→Hardhat 动机 / 目录导览 / 测试写法 / 常见坑四个内容块齐备，结尾完成向 M3.3 的预告；文内代码与 dapp/ 实况一致。
- [x] 组件与内链合规；heroImage 全库唯一。

## Phase 4 — 数据联动与验证

Targets: `src/data/web3-roadmap-data.json`, `docs/backlog/web3-roadmap.md`, `docs/logs/2026/`
Skill: none

- Item Types: `Add | Proof`
- Prereqs: Phase 3

- [x] Add: `web3-roadmap-data.json` 阶段 3 的 M3.2 `status: "todo"` → `"done"`、`articleSlug: null` → `"hardhat-local-env"`；其余 milestone 不动（M3.1 保持 done，M3.3/M3.4 保持 todo，阶段 2/4/5 全不动）。→ 复核脚本输出：M3.1 done/solidity-basics-notes、M3.2 done/hardhat-local-env、M3.3/M3.4 todo/null；阶段 1/2 各 4 done、阶段 4/5 各 0 done，未动。
- [x] Add: `docs/backlog/web3-roadmap.md` Work Item Status 表 M3/WI6 行 Status `todo` → `done`。
- [x] Add: `docs/logs/2026/` 当日日志条目（追加至既有 `docs/logs/2026/09-07.md`；跨日则按日志指南新建当日文件）。→ 追加「### 2026-09-07 (M3/WI6)」条目（当日文件已存在，未跨日）。
- [x] Proof: `npm run test:run` exit 0。→ 4/4 passed，exit 0。
- [x] Proof: `npm run build` exit 0 且 `test -f dist/blog/hardhat-local-env/index.html` 为真（同时证明 `dapp/` 存在不影响站点构建）。→ 586 pages built，dist check: EXISTS。
- [x] Proof: `npm --prefix dapp test` exit 0（收口前最后一次全绿复核）。→ 4 passing (335ms)，exit 0。

Exit Criteria:

- [x] M3.2 done + articleSlug 正确；roadmap WI 行 done；日志条目在档；AGENTS.md 未动。（本执行对 AGENTS.md 零编辑；工作区中 AGENTS.md 预先存在的未提交改动（阶段 3 行 0/4→1/4）系前次会话遗留，与本计划 Current Baseline「现为 1/4」描述一致，按 Non-Goals 不动它）
- [x] `test` / `build` / `hardhat` 三验证键均 exit 0，新文章路由生成。
- [x] `docs/logs/` 更新（本计划闭环条目）。

## Draft Review Record

- dispatch review #review-2026-09-07-202508-mission-driver-2026-09-07-2027-1-hardhat-local-env-1-02c8b292 to ses_opencode_reviewer
- 2026-09-07：iteration 1，共识 acceptable-after-fixes #review-2026-09-07-202508-mission-driver-2026-09-07-2027-1-hardhat-local-env-1-02c8b292

## Verification

- pass test 2026-09-07-202508-mission-driver exit=0
- pass build 2026-09-07-202508-mission-driver exit=0
- pass hardhat 2026-09-07-202508-mission-driver exit=0

## Closure

- dispatch audit #audit-2026-09-07-202508-mission-driver-2026-09-07-2027-1-hardhat-local-env-1-3f9a2c7e to ses_opencode_auditor models={exec:opencode/glm-5.3,aud:opencode/glm-5.3}
- accepted #audit-2026-09-07-202508-mission-driver-2026-09-07-2027-1-hardhat-local-env-1-3f9a2c7e：审计通过——33/33 计数域条目全 [x]，仓库实况逐项核对一致（dapp/ 工程 + counter.js 4 用例、.gitignore:35-37、GlossaryTerm Hardhat 词条、hardhat-local-env.mdx 192 行、M3.2 done + slug、roadmap WI6 done、docs/logs/2026/09-07.md 条目），审计员实跑验证门全绿：npm run test:run exit=0（4/4）、npm run build exit=0（586 pages，dist/blog/hardhat-local-env/index.html 存在）、npm --prefix dapp test exit=0（4 passing）；无 hollow 代码，无隐藏缺陷，Non-Goals 边界未越。
