# GSC 未收录页面扫描日报 — 2026-10-15（第 27 轮）

- 属性：`sc-domain:i.zhangqingdong.cn`
- 数据源：线上 `sitemap-0.xml`（89 URL）全量 URL Inspection 检查（1 批超时重试成功）
- 对比基线：[2026-10-14 第 26 轮](./indexing-scan-2026-10-14.md)（URL 集合完全一致）

## 一、结论（TL;DR）

1. **24/89（27.0%），净 −1**：rabbitmq-message-reliability 掉出（10-08 收录、今日复检淘汰）。volatile-memory-visibility 保持收录（此前掉出后已自行翻案）。
2. **10-07 批请求的 6 篇文章留存率定格：4/6**（team-perf、5w2h、volatile、workplace-sop 留存；mysql-btree、rabbitmq 被剃）。
3. **Google 重爬活动持续加速**：synchronized、swot 今日被重爬（均拒）——crawled 桶的复检频率明显上升，每笔重爬都是裁决机会。
4. 27 轮趋势：19×3→17×3→16×5→（中断）→17×3→（中断）→17×3→24→30→28→27→26→26→25→25→**24**。手动请求通道中断第 8 天，四天累计净 −6（30→24）。
5. 本轮无代码修复项。

## 二、状态分布与 delta（89 可比 URL）

| 状态 | 今日 | 昨日 | 变化 |
|------|-----:|-----:|------|
| Submitted and indexed | **24** | 25 | −1 |
| Crawled - currently not indexed | 24 | 23 | +1 |
| Discovered - currently not indexed | 33 | 41 | −8（噪音互跳） |
| URL is unknown to Google | 8 | 0 | +8（噪音） |

**掉出（1）**：rabbitmq-message-reliability。**新收录（0）**。

## 三、⚠️ 手动请求通道中断第 8 天（累计 9 个 URL 待提交）

抢救优先级（[GSC 网页版](https://search.google.com/search-console?resource_id=sc-domain%3Ai.zhangqingdong.cn) 逐个「请求编入索引」，每批 ≤10 个/天）：

1. `/blog/rabbitmq-message-reliability/`（今日掉出）
2. `/blog/performance-optimization-practices/`
3. `/blog/mysql-btree-index-principle/`
4. `/blog/elasticsearch-distributed-search/`
5. `/blog/redis-persistence-rdb-aof/`
6. `/blog/service-mesh-istio-analysis/`
7. `/blog/threadlocal-memory-leak-prevention/`
8. `/projects/`
9. `/blog/getting-started-with-astro/`

## 四、下一步

1. 抢救清单提交后 24~48h 验证；
2. **内链模板**仍是根本对策（等点头）；
3. 本地积压 7 个报告 commit（10-09 ~ 10-15），强烈建议 review 后 push。

## 五、存档

- 快照：[indexing-latest.json](./indexing-latest.json)（今日）· [snapshots/indexing-2026-10-14.json](./snapshots/indexing-2026-10-14.json)（昨日）

---
*自动化任务 automation-8d94dd62 · 第 27 轮 · 无代码修复，报告本地 commit 不 push*
