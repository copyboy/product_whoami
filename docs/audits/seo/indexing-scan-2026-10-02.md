# GSC 未收录页面扫描日报 — 2026-10-02（第 15 轮）

- 属性：`sc-domain:i.zhangqingdong.cn`
- 数据源：线上 `sitemap-0.xml`（89 URL）全量 URL Inspection 检查
- 对比基线：[2026-10-01 第 14 轮](./indexing-scan-2026-10-01.md)（URL 集合完全一致）

## 一、结论（TL;DR）

1. **17 持稳：`/blog/` 恢复后第 2 天站住**，恢复正式确认。十五轮趋势：19→19→19→17→17→17→16×5→（中断）→17→**17**，当前处历史区间 [16,19] 上沿。
2. 无新收录、无掉出；okr-goal-management（crawled→discovered）与 mysql-partitioning（unknown→discovered）单点前进，其余 12 个 discovered/unknown 互跳为常规噪音。
3. `/about/`（主动拒绝型，待改内容）与 distributed-transaction-patterns（排队型，稳掉 11 天）状态不变。
4. 本轮无代码修复项。

## 二、状态分布与 delta（89 可比 URL）

| 状态 | 今日 | 昨日 | 变化 |
|------|-----:|-----:|------|
| Submitted and indexed | **17** | 17 | 持平 |
| Crawled - currently not indexed | 25 | 26 | −1（okr 前进） |
| Discovered - currently not indexed | 37 | 27 | +10（噪音互跳） |
| URL is unknown to Google | 10 | 19 | −9（噪音互跳） |

## 三、行动清单（不变）

1. **GSC 手动请求编入索引**（8 URL）：`/web3/phase/1~5/`、`/web3/report/`、`/projects/chinaneighbor/`、`/blog/distributed-transaction-patterns/`；
2. **更新 `/about/` 内容**（主动拒绝型，唯一翻案路径）；
3. **「相关文章」内链模板**：等点头即做。

## 四、存档

- 快照：[indexing-latest.json](./indexing-latest.json)（今日）· [snapshots/indexing-2026-10-01.json](./snapshots/indexing-2026-10-01.json)（昨日）
- 本地积压 14 个未 push 报告 commit（9-19 ~ 10-02）。

---
*自动化任务 automation-8d94dd62 · 第 15 轮 · 无代码修复，报告本地 commit 不 push*
