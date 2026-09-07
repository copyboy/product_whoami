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
| M2/WI4 文章「智能合约到底是什么，能做什么」 | todo | `src/content/blog/smart-contracts-explained.mdx` (output) | WI2 | 词典已有 智能合约/ERC20/ERC721 |
| M3/WI5 笔记「Solidity 基础语法」 | todo | `src/content/blog/solidity-basics-notes.mdx` (output) | WI4 | M3.1 用户已在学，有第一手输入 |

## Milestones

### M2 — Ethereum（对应 src/data/web3-roadmap-data.json 阶段 2 的 M2.1-M2.4）

- **WI1 文章「账户模型 vs UTXO」** — 与阶段 1 第一篇形成镜像对照：以太坊全局账户状态（余额 + nonce）vs 比特币 UTXO 集合；nonce 防重放的作用（UTXO 天然防双花，账户模型靠 nonce）；对比表沿用 utxo-model-deep-dive 的维度并扩展（并行性、隐私、合约适配性）；结尾过渡到「状态由谁来执行」引出 EVM。完成定义含：M2.1 置 done + articleSlug。
- **WI2 文章「EVM 是什么，为什么重要」** — 世界计算机的心脏：EVM 作为确定性沙盒虚拟机（同样输入必得同样输出，这是共识的前提）；字节码、操作码与执行模型（栈式机，1024 栈深上限可提一句）；「一次编写多链运行」的 EVM 兼容生态（Arbitrum/Base/Optimism，呼应 report 页）；网络性护城河论点。完成定义含：M2.2 置 done。
- **WI3 文章「Gas 为什么存在，怎么计算」** — Gas 三重意义（计量资源、防滥用/停机问题、定价市场）；费用公式 = gasUsed × gasPrice；EIP-1559 的 base fee（燃烧、目标 50% 利用率自动调节）+ priority fee（小费）；gwei 单位换算给一个手算例子；blob（EIP-4844）如何把 L2 费用打下来（口径与 report 页一致：主网个位数到几十 gwei 波动，L2 不足 0.01 gwei）；完成定义含：M2.3 置 done。
- **WI4 文章「智能合约到底是什么，能做什么」** — 「代码即规则」的准确表述：部署后字节码上链不可变（升级代理模式一句话带过 + 风险提示）；确定性执行 + 全网验证；能力边界（能做什么：代币/DAO/借贷；不能做什么：链下数据需 oracle，随机数难题）；用 ERC-20 转账流程做端到端实例（呼应 WI1 账户模型与 WI3 gas）；结尾完成阶段 2 → 阶段 3 过渡（从「理解」到「动手写」）。完成定义含：M2.4 置 done + AGENTS.md 阶段 2 状态改 4/4。

### M3 — DApp 入门（对应阶段 3，仅 M3.1）

- **WI5 笔记「Solidity 基础语法」** — 学习笔记风格（比正式文章更口语化，允许记录踩坑）：环境（Remix 起步即可，Hardhat/Foundry 一句带过）；基础类型、mapping、函数修饰符（view/pure/payable）、事件；0.8.x 内置溢出检查；一个最小可运行合约（如计数器或存取款）+ 部署到 Remix 的步骤记录；标注这是 M3.1 的进行时笔记，后续 M3.2（测试环境搭建）会引用。完成定义含：M3.1 置 done（若届时仍在学习深水区，允许改为在文章开头注明「进行中」并保持 milestone 的 learning 状态，但必须在 plan 里显式声明这个偏离及理由）。
