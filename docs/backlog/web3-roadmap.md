# Product Whoami Web3 Roadmap

> 驱动 Web3 专栏内容生产：阶段 2（Ethereum）、阶段 3（DApp 入门）已完成；当前批次为阶段 4（DeFi，M4.1-M4.4）与阶段 5（DAO，M5.1-M5.4）。每个 WI 产出一篇博客文章 + 路线图数据联动更新。系列已有 12 篇：阶段 1 四篇 + 阶段 2 四篇 + 阶段 3 四篇（slug 见 `src/data/web3-roadmap-data.json`）。

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
| M3/WI7 测试网部署脚本 + 文章 | done | `dapp/` 部署脚本 + `src/content/blog/deploy-to-testnet.mdx` (output) | WI6 | — |
| M3/WI8 第一个完整 DApp + 文章 | done | `dapp/` 合约+前端 + `src/content/blog/first-full-dapp.mdx` (output) | WI7 | — |
| M4/WI9 文章「AMM 机制与 Uniswap」 | done | `src/content/blog/uniswap-amm-explained.mdx` (output) | WI8 | 词典已有 AMM/Uniswap |
| M4/WI10 文章「借贷协议」 | done | `src/content/blog/defi-lending-protocols.mdx` (output) | WI9 | 词典已有 Aave/MakerDAO/清算 |
| M4/WI11 文章「闪电贷与套利」 | todo | `src/content/blog/flash-loans-arbitrage.mdx` (output) | WI10 | 词典已有 闪电贷/MEV |
| M4/WI12 文章「聚合器与收益策略」 | todo | `src/content/blog/defi-aggregators-yield.mdx` (output) | WI11 | 词典已有 Curve/Convex/gauge voting |
| M5/WI13 文章「DAO 治理与投票」 | todo | `src/content/blog/dao-governance-voting.mdx` (output) | WI12 | 词典已有 DAO |
| M5/WI14 文章「代币经济学设计」 | todo | `src/content/blog/tokenomics-design.mdx` (output) | WI13 | — |
| M5/WI15 文章「Multi-sig 与权限管理」 | todo | `src/content/blog/multisig-permission-management.mdx` (output) | WI14 | — |
| M5/WI16 文章「知名 DAO 案例分析」 | todo | `src/content/blog/dao-case-studies.mdx` (output) | WI15 | 呼应 WI4 的重入漏洞 |

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

### M4 — DeFi（M4.1-M4.4，2026-09-07 追加；纯文章阶段）

DeFi 各篇共识口径：与 `report.astro` 阶段 4 章节保持一致（x*y=k 恒定乘积示例 100 ETH / 200,000 USDC、价格 $2040.6、滑点约 2%；Uniswap V4 Hook 创新清单；Aave V3 池化借贷 + Health Factor + 清算罚金属量级表述；MakerDAO/DAI/DSR/PSM）。无常损失、聚合器、收益金库等新概念先补词典再用。

- **WI9 文章「AMM 机制与 Uniswap」（M4.1）** — 订单簿 vs AMM 的动机；x*y=k 恒定乘积推导（数值例直接沿用 report 页口径，含滑点计算）；LP 与无常损失（给一个简化的数值例说明 IL < HODL 的情形，标注为简化模型）；V2 → V3 集中流动性 → V4 Hook 的演进一句话各带过；结尾过渡到「价格有了，借贷呢」。完成定义含：M4.1 置 done + articleSlug。
- **WI10 文章「借贷协议」（M4.2）** — 超额抵押为什么是去中心化借贷的前提；Aave 模式拆解（aTokens、利用率利率模型、Health Factor、清算流程与罚金属量级）；Compound 的 cTokens 对照一句带过；MakerDAO 与 DAI 的稳定币视角（超额抵押铸 DAI、DSR/PSM，口径与词典一致）；呼应 WI3 的 gas（清算的经济学动机）。完成定义含：M4.2 置 done。
- **WI11 文章「闪电贷与套利」（M4.3）** — 闪电贷的原理与唯一规则（同区块借还，不还则整体回滚——呼应 WI4 合约原子性）；合法用途（套利、清算、一键换仓）与攻击面（配合预言机操纵的攻击，强调这是「工具无善恶、协议要有防单价格源设计」）；MEV 与三明治攻击简要提及（口径与词典一致）；从「攻击者的工具箱」收束到「DeFi 安全设计的必修课」。完成定义含：M4.3 置 done。
- **WI12 文章「聚合器与收益策略」（M4.4）** — DEX 聚合器为什么存在（拆单路由找最优价，1inch 类一句话机制）；收益金库/自动复投（Yearn 式 vault 的策略抽象）；DeFi 乐高：直接引用 report 页的 Aave→Curve→Convex→gauge voting 栈叠示例并展开风险（嵌套越深，清算与合约风险复合）；理性提示：APY 高≠好，风险与策略复杂度正相关。完成定义含：M4.4 置 done + AGENTS.md 阶段 4 状态改 4/4 + 结尾过渡到阶段 5（DAO：金融原生组织如何治理这些协议）。

### M5 — DAO（M5.1-M5.4，2026-09-07 追加；纯文章阶段）

- **WI13 文章「DAO 治理与投票」（M5.1）** — 从「协议由谁升级」引出链上治理；Token Voting 1 token = 1 票的优缺点 vs Quadratic Voting（口径与 report 页 5.2 一致）；提案-投票-时间锁的完整生命周期；治理攻击面（闪电贷投票/巨鲸垄断，呼应 WI11 闪电贷——治理代币也能被闪电贷借来投票，故有 snapshot 链下快照投票等缓解）。完成定义含：M5.1 置 done + articleSlug。
- **WI14 文章「代币经济学设计」（M5.2）** — 供给曲线（固定上限/通胀/销毁，呼应 EIP-1559 的 ETH 燃烧口径）；分配结构与归属（vesting/锁仓，团队/投资者/国库/社区的典型区间沿用 report 页 5.3 的 15-20%/10-15%/20-30%/40-50% 表述并标注为常见区间而非标准）；价值捕获（手续费分红/回购/治理权）与「治理代币为什么有价值」；警惕纯激励驱动的死亡螺旋。完成定义含：M5.2 置 done。
- **WI15 文章「Multi-sig 与权限管理」（M5.3）** — 单私钥的风险 → 多签的 m-of-n 模型（沿用 report 页 5.4 的 Gnosis Safe 3/7 + 48 小时时间锁口径）；多签 vs MPC（词典已有 MPC 词条）的取舍；DAO 金库的权限分层（多签执行 + 治理提案 + 时间锁窗口）；操作安全的现实建议（测试专用账户、签名前核对 calldata）。完成定义含：M5.3 置 done。
- **WI16 文章「知名 DAO 案例分析」（M5.4）** — The DAO 2016 事件始末与重入漏洞（呼应 WI4 智能合约的安全边界，注明该事件催生了 ERC-20 时代的 checks-effects-interactions 模式与硬分叉先例）；MakerDAO 治理的现实运转（执行/治理两院制可一句话带过）；Uniswap 国库与治理权争议的量级描述（不编造精确数字）；案例总结表（成败维度：金库规模/治理参与率/幸存状态用定性词）。**本篇是专栏收官文**：结尾做五阶段总回顾（价值转移→计算→应用→金融→组织），呼应系列第一篇。完成定义含：M5.4 置 done + AGENTS.md 阶段 5 状态改 4/4；检查 `getCurrentPhase`（web3Roadmap.ts）在全 done 时的行为无异常（返回 undefined 即首页不显示当前阶段 CTA，属预期）。
