# GSC 未收录页面扫描日报 — 2026-09-26（第 9 轮）

- 属性：`sc-domain:i.zhangqingdong.cn`
- 数据源：线上 `sitemap-0.xml`（89 URL）全量 URL Inspection 检查
- 对比基线：[2026-09-25 第 8 轮](./indexing-scan-2026-09-25.md)（URL 集合完全一致）

## 一、结论（TL;DR）

1. **连续第 2 天完全持稳：16/89，四个桶数量与昨日一字不差**。九日趋势 19→19→19→17→17→17→16→16→16。失血停了，但也证明**零内容动作下不会自然回升**——这个均衡态会一直维持。
2. **健康重爬第 3 例：workplace-sop-overview 9-26 重爬后保持收录**（前两例 elasticsearch、web3/roadmap）。indexed 桶的稳固性在持续验证中。
3. `/about/` 维持「新鲜抓取被拒」状态（9-25 重爬拒绝后未再重访）——内容更新仍是唯一翻案路径，未执行。
4. discovered/unknown 抖动 13 个（8 前 6 后），噪音；phase/2、phase/4 又抖回 unknown（两页已在队列边缘横跳 4 天）。
5. 本轮无代码修复项。

## 二、状态分布与 delta（89 可比 URL）

| 状态 | 今日 | 昨日 | 变化 |
|------|-----:|-----:|------|
| Submitted and indexed | 16 | 16 | 持平 |
| Crawled - currently not indexed | 29 | 29 | 持平 |
| Discovered - currently not indexed | 36 | 35 | +1（抖动） |
| URL is unknown to Google | 8 | 9 | −1（抖动） |

## 三、行动清单（第 9 天，内容不变；附一个节奏建议）

1. **更新 `/about/` 内容**（第 1 优先级，第 2 天）：Google 9-25 新鲜抓取后拒绝，等无用。
2. **GSC 手动请求编入索引**（8 URL）：`/web3/phase/1~5/`、`/web3/report/`、`/projects/chinaneighbor/`、`/blog/distributed-transaction-patterns/`。
3. **「相关文章」内链模板**：等点头即做。

> 节奏建议：如果下周（9-28 ~ 10-02）继续零变动，可以考虑把这个每日任务降频为每周一扫（改动需你在 Automations 页面操作，我无权修改本任务）。在「等用户动作」的状态下，每日扫描的边际信息量在下降。

## 四、存档

- 快照：[indexing-latest.json](./indexing-latest.json)（今日）· [snapshots/indexing-2026-09-25.json](./snapshots/indexing-2026-09-25.json)（昨日）
- 本地积压 8 个未 push 报告 commit（9-19 ~ 9-26）。

---
*自动化任务 automation-8d94dd62 · 第 9 轮 · 无代码修复，报告本地 commit 不 push*
