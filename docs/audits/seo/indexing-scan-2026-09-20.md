# GSC 未收录页面扫描日报 — 2026-09-20（第 3 轮）

- 属性：`sc-domain:i.zhangqingdong.cn`
- 数据源：线上 `sitemap-0.xml`（89 URL）全量 URL Inspection 检查
- 对比基线：[2026-09-19 第 2 轮](./indexing-scan-2026-09-19.md)（URL 集合完全一致，89 个全部可比）

## 一、结论（TL;DR）

1. **收录数仍持平：19/89（21.3%）**，无新增收录、无掉出。距离 sitemap 重提已 2 天，Google 还在「发现 → 抓取」阶段，未到「抓取 → 收录」的评估阶段。
2. **发现队列大幅扩张：unknown 池从 17 个缩到只剩 2 个**。17 个 URL 前进到「已发现待抓取」（净 +15），重提 sitemap 的引流效果持续兑现。
3. **web3 专栏状态修满**：`/web3/phase/1~5/` + `/web3/report/` 全部 6 个真实内容页现在都在发现队列里（昨天 phase/2、4、5 还是 unknown）——上一轮报告建议的手动请求编入索引若还没做，现在做正是时候，抓取队列已就位。
4. 本轮无代码修复项；内容侧建议不变（内链 + 手动请求）。

## 二、状态分布与 delta（89 可比 URL）

| 状态 | 今日 | 昨日 | 变化 |
|------|-----:|-----:|------|
| Submitted and indexed | 19 | 19 | 持平 |
| Crawled - currently not indexed | 26 | 26 | 持平 |
| Discovered - currently not indexed | **42** | 27 | **+15** |
| URL is unknown to Google | **2** | 17 | **−15** |

**向前迁移 17 个**：account-model-vs-utxo、agile-project-management、cache-consistency-strategies、concurrenthashmap-concurrent-mechanism、dao-case-studies、defi-lending-protocols、deploy-to-testnet、ethereum-layer2-rollups、jvm-memory-structure-analysis、pow-consensus、tokenomics-design、uniswap-amm-explained、utxo-model-deep-dive、projects/chinaneighbor、web3/phase/2、phase/4、phase/5。

**向后抖动 2 个**：bitcoin-network-in-practice、multisig-permission-management（discovered↔unknown 常态波动）。

三日趋势：unknown 池 146（329 口径）→ 17 → **2**；发现队列 134 → 27 → **42**；收录 19 → 19 → 19。Google 正按「清薄页 → 重新发现 → 待抓取」的顺序推进，收录评估通常在抓取后 1~2 周内发生。

## 三、待用户决策（连续第 3 天列出）

1. **手动请求编入索引（GSC UI）**：`/web3/phase/1~5/`、`/web3/report/`、`/projects/chinaneighbor/` —— 这 7 个已全部进入发现队列，手动请求会直接触发抓取评估，是当前杠杆最大的动作。
2. **内链建设**：26 篇 crawled-not-indexed 文章（MySQL 系列最密集）需要从已收录文章传导权重。我可以下轮直接实现「相关文章」内链模板改动（本地 commit，你 review 后 push）——说一声就做。
3. concept 标签页长期定位（原创聚合文案 vs noindex）仍待拍板，当前维持「移出 sitemap、可抓取」。

## 四、存档

- 快照：[indexing-latest.json](./indexing-latest.json)（今日）· [snapshots/indexing-2026-09-19.json](./snapshots/indexing-2026-09-19.json)（昨日）· [snapshots/indexing-2026-09-18.json](./snapshots/indexing-2026-09-18.json)（基线）
- 注：昨日报告（98bc8f2）+ 本轮报告仍未 push，等用户 review。

---
*自动化任务 automation-8d94dd62 · 第 3 轮 · 无代码修复，报告本地 commit 不 push*
