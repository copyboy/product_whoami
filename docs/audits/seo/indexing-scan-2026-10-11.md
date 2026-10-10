# GSC 未收录页面扫描日报 — 2026-10-11（第 23 轮）

- 属性：`sc-domain:i.zhangqingdong.cn`
- 数据源：线上 `sitemap-0.xml`（89 URL）全量 URL Inspection 检查
- 对比基线：[2026-10-10 第 22 轮](./indexing-scan-2026-10-10.md)（URL 集合完全一致）

## 一、结论（TL;DR）

1. **26/89（29.2%），再净 −1**：掉出 `mysql-btree-index-principle`——它是 10-08 刚收录、当天被重爬、10-11 复检淘汰。**新收录页 48 小时内被复检淘汰**，说明站点整体质量分仍低于 Google 门槛，单页抢救只能缓解、不能根治。
2. 好消息：昨日同批收录的 volatile、workplace-sop、problem-solving-5w2h、rabbitmq、team-performance **经受住了复检保持收录**（5/6 留存）；web3 专栏 7/7 稳固。
3. **4 个抢救 URL 的 last_crawled 均未更新**——手动请求通道中断第 4 天，累计 8 个 URL 待提交。redis-persistence（9-04）、threadlocal（9-17）、/projects/（9-09）、service-mesh（9-22）仍在原状态。
4. 23 轮趋势：19×3→17×3→16×5→（中断）→17×3→（中断）→17×3→24→30→28→27→**26**。峰值 33.7% → 当前 29.2%。
5. 本轮无代码修复项。

## 二、状态分布与 delta（89 可比 URL）

| 状态 | 今日 | 昨日 | 变化 |
|------|-----:|-----:|------|
| Submitted and indexed | **26** | 27 | −1 |
| Crawled - currently not indexed | 23 | 22 | +1 |
| Discovered - currently not indexed | 26 | 29 | −3（噪音互跳） |
| URL is unknown to Google | 14 | 11 | +3（噪音互跳） |

**掉出（1）**：mysql-btree-index-principle（48h 复检淘汰）。**新收录（0）**。

## 三、⚠️ 抢救清单（通道中断第 4 天，累计 8 个 URL）

手动请求仍是最有效的杠杆（历史 78% 成功率），**请用户在 [GSC 网页版](https://search.google.com/search-console?resource_id=sc-domain%3Ai.zhangqingdong.cn) 提交**（每批 ≤10 个/天）：

| 优先级 | URL | 性质 |
|--------|-----|------|
| 1 | `/blog/performance-optimization-practices/` | 掉出（优质架构文） |
| 2 | `/blog/mysql-btree-index-principle/` | 今日掉出（48h 复检淘汰） |
| 3 | `/blog/redis-persistence-rdb-aof/` | 掉出 13 天，请求从未送达 |
| 4 | `/blog/threadlocal-memory-leak-prevention/` | 掉出 2 天 |
| 5 | `/projects/` | 掉出 2 天（hub） |
| 6 | `/blog/service-mesh-istio-analysis/` | 请求未确认 |
| 7 | `/blog/cloudflare-pages-deployment-guide-zh/` | crawled 待推 |
| 8 | `/blog/getting-started-with-astro/` | crawled 待推 |

## 四、下一步

1. 抢救清单提交后 24~48h 验证翻案；
2. crawled 桶还剩 6 篇未请求过（synchronized、redis-cache、swot、time-management、arraylist、threadpool 之后）；
3. **中期真正的解法仍是内链模板**：48h 复检淘汰说明单点收录不稳，需要站内权重网络兜底——等点头即做；
4. 本地积压 3 个报告 commit（10-09 ~ 10-11）。

## 五、存档

- 快照：[indexing-latest.json](./indexing-latest.json)（今日）· [snapshots/indexing-2026-10-10.json](./snapshots/indexing-2026-10-10.json)（昨日）

---
*自动化任务 automation-8d94dd62 · 第 23 轮 · 无代码修复，报告本地 commit 不 push*
