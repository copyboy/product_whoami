# GSC 未收录页面扫描日报 — 2026-10-06（第 18 轮 · 爆发日 🎉）

- 属性：`sc-domain:i.zhangqingdong.cn`
- 数据源：线上 `sitemap-0.xml`（89 URL）全量 URL Inspection 检查
- 对比基线：[2026-10-05 第 17 轮](./indexing-scan-2026-10-05.md)（URL 集合完全一致）

## 一、结论（TL;DR）

1. **历史最大单日涨幅：24/89（27.0%），一天 +7**，突破 18 轮以来的历史高点（此前区间 [16,19]）。**昨天提交的 9 个手动请求，7 个在 24 小时内收录**——手动请求 + 内容修复的组合拳被完全验证。
2. **两个翻案 + 五个新收录**（全部 last_crawled = 10-05，即昨天提交请求当天 Google 就来抓了）：
   - **翻案**：`/about/`（三连拒终结，重写版内容被接受）、`/blog/distributed-transaction-patterns/`（掉出 14 天后回归，还带 Breadcrumbs 富结果）；
   - **新收录**：`/web3/phase/2/`、`/web3/phase/4/`、`/web3/phase/5/`、`/web3/report/`、`/projects/chinaneighbor/`。
3. **web3 专栏 7 个真实页现在 5 个在索引里**（phase/2、4、5、report、roadmap），只剩 phase/1（discovered）和 phase/3（unknown）——这两个昨天也提交了请求，phase/3 显示 unknown 疑似 GSC 数据刷新滞后，明日复查。
4. 零掉出。本轮无代码修复项。

## 二、状态分布与 delta（89 可比 URL）

| 状态 | 今日 | 昨日 | 变化 |
|------|-----:|-----:|------|
| Submitted and indexed | **24** | 17 | **+7** |
| Crawled - currently not indexed | 23 | 25 | −2 |
| Discovered - currently not indexed | 32 | 33 | −1 |
| URL is unknown to Google | 10 | 14 | −4 |

**新收录（7）**：/about/、distributed-transaction-patterns、projects/chinaneighbor、web3/phase/2、phase/4、phase/5、report。
**掉出（0）**。18 轮全景：19×3→17×3→16×5→（中断）→17×3→（中断）→17→17→17→**24**。

## 三、下一步

1. **phase/1、phase/3 明日复查**：请求已提交但未即时生效（phase/3 显示 unknown 疑似数据滞后）。若明日仍无进展，今日 UI 限额已刷新，可补一次请求。
2. **剩下的 65 个未收录页面**（23 crawled + 32 discovered + 10 unknown）：手动请求每天只能做 ~10 个，可以每天挑一批（优先 crawled 桶里被重新抓取过的 23 篇，它们离收录最近）；不过更 scalable 的路还是**内链模板**——一次改动惠及全部 89 页，等点头即做。
3. 收录 24/89 达到 27%，距离健康站点的 80%+ 还有距离，但方向已被验证：**修内容 → 请求 → 等收录** 的循环可以持续滚动。

## 四、存档

- 快照：[indexing-latest.json](./indexing-latest.json)（今日）· [snapshots/indexing-2026-10-05.json](./snapshots/indexing-2026-10-05.json)（昨日）
- 本地积压 3 个报告 commit（10-05×2、10-06），记得 review 后 push。

---
*自动化任务 automation-8d94dd62 · 第 18 轮 · 无代码修复，报告本地 commit 不 push*
