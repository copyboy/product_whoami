# GSC 未收录页面扫描日报 — 2026-10-07（第 19 轮）

- 属性：`sc-domain:i.zhangqingdong.cn`
- 数据源：线上 `sitemap-0.xml`（89 URL）全量 URL Inspection 检查（含 /web3/roadmap/ 补查）
- 对比基线：[2026-10-06 第 18 轮](./indexing-scan-2026-10-06.md)（URL 集合完全一致）

## 一、结论（TL;DR）

1. **24 持稳，零掉出**——昨天的 7 个新收录全部站住，新高平台第 1 天。十九轮趋势：19×3→17×3→16×5→（中断）→17×3→（中断）→17×3→24→**24**。
2. **phase/1、phase/3 复查：10-05 的请求未在 GSC 数据中生效**（phase/1 仍 discovered、phase/3 仍 unknown）。已按昨日计划用浏览器自动化**补交请求**，均拿到确认弹窗。
3. **手动请求滚动推进第 2 天**：今天共提交 **8 个**（2 个补交 + 6 个 crawled 桶新提交），全部成功——service-mesh-istio-analysis、team-performance-management、problem-solving-5w2h、rabbitmq-message-reliability、mysql-btree-index-principle、volatile-memory-visibility。**今日 UI 限额（~10/天）已用完，停止提交。**
4. discovered/unknown 常规互跳 17 个（5 前 12 后），噪音。
5. 本轮无代码修复项。

## 二、状态分布与 delta（89 可比 URL）

| 状态 | 今日 | 昨日 | 变化 |
|------|-----:|-----:|------|
| Submitted and indexed | **24** | 24 | 持平 |
| Crawled - currently not indexed | 23 | 23 | 持平 |
| Discovered - currently not indexed | 25 | 32 | −7（噪音互跳） |
| URL is unknown to Google | 17 | 10 | +7（噪音互跳） |

## 三、手动请求台账

**已提交待生效（10-07，8 个）**：phase/1、phase/3（补交）+ service-mesh、team-performance、problem-solving-5w2h、rabbitmq、mysql-btree、volatile（新提交，均为近期被重爬过的 crawled 页，离收录最近）。

**crawled 桶剩余未请求（15 篇，按 last_crawled 近到远排）**：cloudflare-pages（8-11）、getting-started（7-23）、threadpool（7-04）、synchronized（7-05）、redis-cache（7-23）、mysql-query-opt（7-17）、time-management（8-30）、swot（8-24）、mysql-transaction-isolation（6-25）、mysql-mvcc（6-08）、jmm（6-13）、mysql-master-slave（5-06）、mysql-perf-monitoring（4-15）、mysql-partitioning→discovered、pdca-continuous（8-24）。后续每天 ~8 个继续滚，约 2 天滚完。

**手动请求成功率统计**：10-05 批 9 个 → 7 个 24h 内收录（78%）；按此推算，今天 8 个预期 ~6 个在明后天收录。

## 四、下一步

1. 明日扫描验证今天 8 个的收录情况 + phase/1、phase/3 补交效果；
2. crawled 桶剩 15 篇，明后两天滚完；
3. 内链模板（惠及全部 89 页的 scalable 方案）仍等点头；
4. 本地积压 4 个报告 commit（10-05×2、10-06、10-07），建议 review 后 push。

## 五、存档

- 快照：[indexing-latest.json](./indexing-latest.json)（今日）· [snapshots/indexing-2026-10-06.json](./snapshots/indexing-2026-10-06.json)（昨日）

---
*自动化任务 automation-8d94dd62 · 第 19 轮 · 无代码修复，报告本地 commit 不 push*
