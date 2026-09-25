# GSC 未收录页面扫描日报 — 2026-09-25（第 8 轮）

- 属性：`sc-domain:i.zhangqingdong.cn`
- 数据源：线上 `sitemap-0.xml`（89 URL）全量 URL Inspection 检查
- 对比基线：[2026-09-24 第 7 轮](./indexing-scan-2026-09-24.md)（URL 集合完全一致）

## 一、结论（TL;DR）

1. **失血暂停：16/89 持稳，无新掉出**。八日趋势 19→19→19→17→17→17→16→16。
2. **关键信号：`/about/` 于 9-25 被 Google 重新抓取后仍拒绝收录**——这是新鲜抓取的否定，不是旧数据滞后。意味着「等 Google 想通」不会发生，**更新 about 页内容是唯一翻案路径**（内容变化会强制下一轮重评）。
3. 同日重爬对照：elasticsearch、web3/roadmap 重爬后**保持收录**——Google 的重访是选择性的、有节奏的，被重访且站得住的页面地位更稳。
4. discovered/unknown 抖动 16 个（10 前 6 后），噪音；web3 phase 全家 + report 连续第 2 天整队在发现队列。
5. 本轮无代码修复项。

## 二、状态分布与 delta（89 可比 URL）

| 状态 | 今日 | 昨日 | 变化 |
|------|-----:|-----:|------|
| Submitted and indexed | 16 | 16 | 持平 |
| Crawled - currently not indexed | 29 | 29 | 持平 |
| Discovered - currently not indexed | 35 | 31 | +4（抖动净流入） |
| URL is unknown to Google | 9 | 13 | −4（抖动） |

## 三、行动清单（第 8 天，关于 /about/ 的判断已升级）

1. **更新 `/about/` 页面内容**（优先级升至第 1）：加近期文章精选链接、更新 2026 年工作近况——Google 昨天刚看过现状并拒绝，只有内容变化才能触发下一轮重评。改完立即在 GSC 手动请求编入索引。
2. **GSC 手动请求编入索引**（8 URL）：`/web3/phase/1~5/`、`/web3/report/`、`/projects/chinaneighbor/`、`/blog/distributed-transaction-patterns/`。
3. **「相关文章」内链模板**：等点头即做，本地 commit。

## 四、存档

- 快照：[indexing-latest.json](./indexing-latest.json)（今日）· [snapshots/indexing-2026-09-24.json](./snapshots/indexing-2026-09-24.json)（昨日）
- 本地积压 7 个未 push 报告 commit（9-19 ~ 9-25）。

---
*自动化任务 automation-8d94dd62 · 第 8 轮 · 无代码修复，报告本地 commit 不 push*
