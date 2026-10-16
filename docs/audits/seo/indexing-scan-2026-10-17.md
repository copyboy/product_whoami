# GSC 未收录页面扫描日报 — 2026-10-17（第 29 轮）

- 属性：`sc-domain:i.zhangqingdong.cn`
- 数据源：线上 `sitemap-0.xml`（89 URL）全量 URL Inspection 检查
- 对比基线：[2026-10-16 第 28 轮](./indexing-scan-2026-10-16.md)（URL 集合完全一致）

## 一、结论（TL;DR）

1. **22/89（24.7%），净 −1**：effective-meeting-management 掉出——**9-09 起收录的资深页**，被 old-crawl（9-09）重评刷掉。剃刀已从旧抓取页、新收录页一路切到最老的稳定层，掉出累计 9 个。
2. **失血在通道中断下持续**：手动请求通道中断第 10 天，六天累计净 −8（30→22）。每天 −1~-1.3 的稳定失血率，全部来自旧抓取页的重评。
3. 好消息：其余 22 个存量稳固（web3 7/7、10 月批 5 篇、cloudflare 新页、/about/ 翻案页都在）。
4. 29 轮趋势：19×3→17×3→16×5→（中断）→17×3→（中断）→17×3→24→30→28→27→26→26→25→25→24→23→**22**。
5. 本轮无代码修复项。

## 二、状态分布与 delta（89 可比 URL）

| 状态 | 今日 | 昨日 | 变化 |
|------|-----:|-----:|------|
| Submitted and indexed | **22** | 23 | −1 |
| Crawled - currently not indexed | 25 | 25 | 持平 |
| Discovered - currently not indexed | 29 | 32 | −3（噪音互跳） |
| URL is unknown to Google | 13 | 9 | +4（噪音互跳） |

**掉出（1）**：effective-meeting-management（资深页，待抢救）。**新收录（0）**。

## 三、⚠️ 抢救清单（通道中断第 10 天，累计 10 个 URL）

按优先级（[GSC 网页版](https://search.google.com/search-console?resource_id=sc-domain%3Ai.zhangqingdong.cn) 逐个「请求编入索引」，每批 ≤10 个/天）：

1. `/blog/effective-meeting-management/`（今日掉出，资深页）
2. `/blog/volatile-memory-visibility/`（二次掉出）
3. `/blog/rabbitmq-message-reliability/`
4. `/blog/performance-optimization-practices/`
5. `/blog/mysql-btree-index-principle/`
6. `/blog/elasticsearch-distributed-search/`
7. `/blog/redis-persistence-rdb-aof/`
8. `/blog/service-mesh-istio-analysis/`
9. `/blog/threadlocal-memory-leak-prevention/`
10. `/projects/`

## 四、下一步

1. 抢救清单提交后 24~48h 验证；
2. **内链模板拍板**（29 轮数据全部指向它）；
3. 本地积压 9 个报告 commit（10-09 ~ 10-17），强烈建议 review 后 push。

## 五、存档

- 快照：[indexing-latest.json](./indexing-latest.json)（今日）· [snapshots/indexing-2026-10-16.json](./snapshots/indexing-2026-10-16.json)（昨日）

---
*自动化任务 automation-8d94dd62 · 第 29 轮 · 无代码修复，报告本地 commit 不 push*
