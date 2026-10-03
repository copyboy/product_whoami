# GSC 未收录页面扫描日报 — 2026-10-03（第 16 轮）

- 属性：`sc-domain:i.zhangqingdong.cn`
- 数据源：线上 `sitemap-0.xml`（89 URL）全量 URL Inspection 检查
- 对比基线：[2026-10-02 第 15 轮](./indexing-scan-2026-10-02.md)（URL 集合完全一致）

## 一、结论（TL;DR）

1. **17 三连稳**，无新收录、无掉出。十六轮趋势：19→19→19→17→17→17→16×5→（中断）→17→17→**17**。
2. **`/about/` 三连拒**：10-03 第三次新鲜抓取、第三次拒绝（前两次 9-25、9-27）。Google 在持续盯这个页面并持续拒绝，内容更新的必要性已无悬念——这是全站当前性价比最高的单点动作。
3. discovered/unknown 常规互跳 18 个（7 前 11 后），噪音。
4. 本轮无代码修复项。

## 二、状态分布与 delta（89 可比 URL）

| 状态 | 今日 | 昨日 | 变化 |
|------|-----:|-----:|------|
| Submitted and indexed | **17** | 17 | 持平 |
| Crawled - currently not indexed | 25 | 25 | 持平 |
| Discovered - currently not indexed | 33 | 37 | −4（噪音） |
| URL is unknown to Google | 14 | 10 | +4（噪音） |

## 三、行动清单（不变）

1. **GSC 手动请求编入索引**（8 URL）：`/web3/phase/1~5/`、`/web3/report/`、`/projects/chinaneighbor/`、`/blog/distributed-transaction-patterns/`；
2. **更新 `/about/` 内容**（三连拒，最优先）；
3. **「相关文章」内链模板**：等点头即做。

## 四、存档

- 快照：[indexing-latest.json](./indexing-latest.json)（今日）· [snapshots/indexing-2026-10-02.json](./snapshots/indexing-2026-10-02.json)（昨日）
- 本地积压 15 个未 push 报告 commit（9-19 ~ 10-03）。

---
*自动化任务 automation-8d94dd62 · 第 16 轮 · 无代码修复，报告本地 commit 不 push*
