# Product Whoami Web3 Roadmap

> 驱动 Web3 专栏阶段 2（Ethereum）与阶段 3（Solidity 入门）的内容生产。每个 WI 产出一篇博客文章 + 路线图数据联动更新。系列背景：阶段 1（Bitcoin）4/4 已完成，前三篇参考 `/blog/utxo-model-deep-dive`、`/blog/pow-consensus`、`/blog/bitcoin-whitepaper-deep-dive`、`/blog/bitcoin-network-in-practice`。

## 全局写作规范（每个 WI 都必须遵守）

- **frontmatter**：`categories: ["Web3"]`、`subject: "Ethereum"`（WI5 为 `"DApp"`）、tags 必含 `["Web3", "区块链入门"]` + 文章主题 tag（如 `Ethereum`、`Gas`、`Solidity`）；pubDate 用当天日期；heroImage 用与已有文章不重复的 Unsplash 图（`?w=1200&h=630&fit=crop` 后缀）
- **组件**：`<Highlight type="info|warning|success|danger" />`（仅这四种，组件不支持其他值）；`<GlossaryTerm term="..." />` 只能引用 `src/components/web3/GlossaryTerm.astro` 词典已有的 key（大小写完全一致），新概念先在词典加词条再使用；禁止 `client:load` 等指令加在 Astro 组件上
- **图示**：用 ASCII `text` 代码块（本站 mermaid 代码块只渲染为静态代码，不是图）
- **结构**：引言（痛点/问题，衔接前文）→ 分节机制讲解 → 实例或对比表 → 总结（完成阶段内过渡）；篇幅 150-250 行；文末「相关文章」内链已发布文章（slug 必须真实存在）
- **事实核查**：数字不确定时用「量级/约」表述，不编造精确值；与已发布文章的口径保持一致（如攻击成本、TPS 口径见 `docs/testing/known-good-baselines.md` 同期的修订记录）
- **数据联动（完成的定义）**：更新 `src/data/web3-roadmap-data.json` 对应 milestone 的 `status` → `done` 并填 `articleSlug`；若阶段全部完成，同步 `AGENTS.md` 路线图表的状态列；在 `docs/logs/2026/` 当日日志记录条目
- **验证**：`npm run build` 通过且新文章路由生成（`dist/blog/<slug>/index.html` 存在）；注意 `npm run type-check` 与 `npm run lint` 有存量失败（见 known-good-baselines），不在本 mission 的通过门内

## Work Item Status

| Work Item | Status | Owner Doc / Source | Dependencies | Reuse |
| --------- | ------ | ------------------ | ------------ | ----- |
| M2/WI1 文章「账户模型 vs UTXO」 | done | `src/content/blog/account-model-vs-utxo.mdx` (output) | — | 术语词典已有 UTXO |
| M2/WI2 文章「EVM 是什么，为什么重要」 | done | `src/content/blog/evm-deep-dive.mdx` (output) | WI1 | 词典已有 EVM/PoS |
| M2/WI3 文章「Gas 为什么存在，怎么计算」 | done | `src/content/blog/ethereum-gas-fees.mdx` (output) | WI2 | 词典已有 Gas/EIP1559 |
| M2/WI4 文章「智能合约到底是什么，能做什么」 | done | `src/content/blog/smart-contracts-explained.mdx` (output) | WI2 | 词典已有 智能合约/ERC20/ERC721 |
| M3/WI5 笔记「Solidity 基础语法」 | done | `src/content/blog/solidity-basics-notes.mdx` (output) | WI4 | M3.1 用户已在学，有第一手输入 |
| M3/WI6 Hardhat 本地测试环境 + 文章 | done | `dapp/` + `src/content/blog/hardhat-local-env.mdx` (output) | WI5 | npm 工具链现成 |
| M3/WI7 测试网部署脚本 + 文章 | todo | `dapp/` 部署脚本 + `src/content/blog/deploy-to-testnet.mdx` (output) | WI6 | — |
| M3/WI8 第一个完整 DApp + 文章 | todo | `dapp/` 合约+前端 + `src/content/blog/first-full-dapp.mdx` (output) | WI7 | — |

## Milestones

### M2 — Ethereum（对应 src/data/web3-roadmap-data.json 阶段 2 的 M2.1-M2.4）

- **WI1 文章「账户模型 vs UTXO」** — 与阶段 1 第一篇形成镜像对照：以太坊全局账户状态（余额 + nonce）vs 比特币 UTXO 集合；nonce 防重放的作用（UTXO 天然防双花，账户模型靠 nonce）；对比表沿用 utxo-model-deep-dive 的维度并扩展（并行性、隐私、合约适配性）；结尾过渡到「状态由谁来执行」引出 EVM。完成定义含：M2.1 置 done + articleSlug。
- **WI2 文章「EVM 是什么，为什么重要」** — 世界计算机的心脏：EVM 作为确定性沙盒虚拟机（同样输入必得同样输出，这是共识的前提）；字节码、操作码与执行模型（栈式机，1024 栈深上限可提一句）；「一次编写多链运行」的 EVM 兼容生态（Arbitrum/Base/Optimism，呼应 report 页）；网络性护城河论点。完成定义含：M2.2 置 done。
- **WI3 文章「Gas 为什么存在，怎么计算」** — Gas 三重意义（计量资源、防滥用/停机问题、定价市场）；费用公式 = gasUsed × gasPrice；EIP-1559 的 base fee（燃烧、目标 50% 利用率自动调节）+ priority fee（小费）；gwei 单位换算给一个手算例子；blob（EIP-4844）如何把 L2 费用打下来（口径与 report 页一致：主网个位数到几十 gwei 波动，L2 不足 0.01 gwei）；完成定义含：M2.3 置 done。
- **WI4 文章「智能合约到底是什么，能做什么」** — 「代码即规则」的准确表述：部署后字节码上链不可变（升级代理模式一句话带过 + 风险提示）；确定性执行 + 全网验证；能力边界（能做什么：代币/DAO/借贷；不能做什么：链下数据需 oracle，随机数难题）；用 ERC-20 转账流程做端到端实例（呼应 WI1 账户模型与 WI3 gas）；结尾完成阶段 2 → 阶段 3 过渡（从「理解」到「动手写」）。完成定义含：M2.4 置 done + AGENTS.md 阶段 2 状态改 4/4。

### M3 — DApp 入门（对应阶段 3，仅 M3.1）

- **WI5 笔记「Solidity 基础语法」** — 学习笔记风格（比正式文章更口语化，允许记录踩坑）：环境（Remix 起步即可，Hardhat/Foundry 一句带过）；基础类型、mapping、函数修饰符（view/pure/payable）、事件；0.8.x 内置溢出检查；一个最小可运行合约（如计数器或存取款）+ 部署到 Remix 的步骤记录；标注这是 M3.1 的进行时笔记，后续 M3.2（测试环境搭建）会引用。完成定义含：M3.1 置 done（若届时仍在学习深水区，允许改为在文章开头注明「进行中」并保持 milestone 的 learning 状态，但必须在 plan 里显式声明这个偏离及理由）。

### M3 — DApp 入门·续（M3.2-M3.4，2026-09-07 追加）

代码工程约定（WI6-WI8 共同遵守）：所有合约代码放在仓库根的 `dapp/` 目录（独立 package.json，`test` script = `hardhat test`）；Solidity ^0.8.x；不把 `node_modules`、`cache/`、`artifacts/` 提交进 git（更新 `.gitignore`）；`dapp/` 的构建产物不影响站点 `npm run build`。文章仍走「全局写作规范」；密钥类信息（助记词/私钥/RPC URL）一律只进 `.env`（已 gitignore）并在文中用占位符表述，严禁真实值入库。

- **WI6 Hardhat 本地测试环境（M3.2）** — 在 `dapp/` 初始化 Hardhat（TS 可选，JS 即可）：hardhat.config、一个最小合约（沿用 WI5 笔记里的计数器/存取款）、配套测试文件（至少覆盖正常路径 + 一个 revert 断言）；`npx hardhat test` 全绿；`npx hardhat compile` 无告警。文章 `hardhat-local-env.mdx`：Remix → Hardhat 的工作流升级动机、目录结构导览、测试怎么写（describe/it + ethers-waffle 或 chai 断言）、常见坑（Node 版本、cache/artifacts）。完成定义含：M3.2 置 done + articleSlug；`.gitignore` 补 `dapp/cache/`、`dapp/artifacts/`、`dapp/node_modules/`。
- **WI7 测试网部署准备（M3.3）** — `dapp/` 增加 deploy 脚本（hardhat-deploy 或 scripts/deploy.js）+ `.env.example`（`SEPOLIA_RPC_URL` / `PRIVATE_KEY` 占位）+ hardhat.config 的 sepolia network 配置。**真实部署不是本 WI 的完成门**（需要用户自己的 RPC 与测试私钥，文中明确写「配置好 .env 后执行 npx hardhat run ... --network sepolia」的操作步骤即可）；若用户 .env 恰好已配置且测试币可用，允许真实部署并把 tx hash 写进文章。文章 `deploy-to-testnet.mdx`：本地网络 vs 测试网 vs 主网的差别、水龙头（faucet）获取测试币、RPC 节点服务（Alchemy/Infura）角色、部署后如何用 Etherscan 验证合约。完成定义含：M3.3 置 done + articleSlug（文章须如实注明部署脚本在本地/模拟网络验证通过）。
- **WI8 第一个完整 DApp（M3.4）** — 把 `dapp/` 里的合约配一个最小前端（单页即可：原生 HTML/JS + ethers.js CDN 引入，或 Astro island 二选一，不强求 React 工程）：连接 MetaMask、读合约状态、发一笔写交易并轮询确认；`npx hardhat test` 与前端本地联调（localhost + hardhat network）通过。文章 `first-full-dapp.mdx`：完整数据流（前端 → provider → 签名交易 → 打包 → 事件回读），串起阶段 1-3 全部概念（账户模型/nonce/gas/合约），结尾完成阶段 3 → 阶段 4（DeFi）过渡。完成定义含：M3.4 置 done + AGENTS.md 阶段 3 状态改 4/4；若涉新术语先补词典。
