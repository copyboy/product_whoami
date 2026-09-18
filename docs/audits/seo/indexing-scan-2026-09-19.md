# GSC 未收录页面扫描日报 — 2026-09-19（第 2 轮）

- 属性：`sc-domain:i.zhangqingdong.cn`
- 数据源：线上 `sitemap-0.xml`（**89 URL**，昨日清理版已部署）全量 URL Inspection 检查
- 对比基线：[2026-09-18 首轮](./indexing-scan-2026-09-18.md)（可比集合 = 今日 89 个 URL，昨日均有记录）

## 一、结论（TL;DR）

1. **收录数持平：19/89（21.3%）**，无新增收录、无掉出。重提 sitemap 后仅 1 天，Google 还没开始重新评估内容页——符合预期，真正的收录变化通常要 1~4 周。
2. **早期积极信号：16 个 URL 状态向前迁移**（多从「Google 不知道此 URL」前进到「已发现待抓取」），净前进 +7。说明重提的 sitemap 已生效，Google 在重新发现 URL。
3. 昨日的两项修复（sitemap 329→89、去重 canonical）线上运行正常，无新代码问题。
4. 本轮无代码修复项（`fixes_applied: []`）；待用户动作仍是昨天报告里的两件事：**内链建设**和 **GSC 手动请求编入索引**。

## 二、状态分布与 delta（89 可比 URL）

| 状态 | 今日 | 昨日可比口径* | 变化 |
|------|-----:|-----:|------|
| Submitted and indexed | 19 | 19 | 持平 |
| Crawled - currently not indexed | 26 | 26 | 持平 |
| Discovered - currently not indexed | 27 | — | ← 净流入 +7 |
| URL is unknown to Google | 17 | — | → 净流出 |

*昨日 329 口径不可直接比（含 240 个已移除薄页），delta 全部按 89 个可比 URL 逐个状态对比。

**向前迁移 16 个**（unknown→discovered 为主）：bitcoin-network-in-practice、bitcoin-whitepaper-deep-dive、creators-alchemy-system、evm-deep-dive、gc-algorithms-tuning-practice、hardhat-local-env、github-arsenal-skills、linkedlist-source-analysis、multisig-permission-management、pdca-knowledge-management、redis-data-structures-memory-optimization、smart-contracts-explained、spring-singleton-thread-safety、wallets-and-account-abstraction、projects/modern-blog-template、web3/phase/1、web3/phase/3。

**向后抖动 9 个**（discovered↔unknown 互跳，Google 常态波动，单日不值得解读）：account-model-vs-utxo、concurrenthashmap-concurrent-mechanism、ethereum-layer2-rollups、jvm-memory-structure-analysis、pow-consensus、utxo-model-deep-dive、projects/chinaneighbor、web3/phase/2、web3/phase/5。

**全部 19 个已收录页保持收录**，无掉出。

## 三、待用户决策（同昨日，未动内容）

1. **26 篇 crawled-not-indexed 文章**（MySQL 系列最密集）——建议从已收录的 13 篇文章做内链（「相关文章」组件或正文互链），这是最低成本的质信号；需要我下轮直接实现内链改动的话说一声。
2. **手动请求编入索引（GSC UI，API 无此端点）**，优先这 7 个：`/web3/phase/1~5/`、`/web3/report/`、`/projects/chinaneighbor/`。注意 phase/2、phase/5 今日抖回 unknown，手动请求正好能推一把。
3. concept 标签页长期定位（原创聚合文案 vs noindex）仍待拍板；当前已移出 sitemap、保持可抓取。

## 四、明日扫描预告

- 继续以 89-URL 清单为基线对比；若用户做了手动请求/内链，收录数应开始动。
- 快照：[indexing-latest.json](./indexing-latest.json)（今日）· [snapshots/indexing-2026-09-18.json](./snapshots/indexing-2026-09-18.json)（昨日基线存档）

---
*自动化任务 automation-8d94dd62 · 第 2 轮 · 无代码修复，报告本地 commit 不 push*
