# GSC 未收录页面扫描日报 — 2026-10-12（第 24 轮）

- 属性：`sc-domain:i.zhangqingdong.cn`
- 数据源：线上 `sitemap-0.xml`（89 URL）全量 URL Inspection 检查
- 对比基线：[2026-10-11 第 23 轮](./indexing-scan-2026-10-11.md)（URL 集合完全一致）

## 一、结论（TL;DR）

1. **完全持平日：26/89（29.2%），零掉出、零新收录**，indexed/crawled 两桶集合与昨日一致。无请求注入时，系统进入静止态——这已经是第 3 个静止日。
2. **手动请求通道中断第 5 天**：8 个待提交 URL 的 last_crawled 全部未更新（含 5 个掉出页抢救 + 3 篇 crawled）。系统当前是「无输入 → 无输出」的确定状态。
3. 24 轮趋势：19×3→17×3→16×5→（中断）→17×3→（中断）→17×3→24→30→28→27→26→**26**。峰值 33.7%。
4. 本轮无代码修复项。

## 二、状态分布与 delta（89 可比 URL）

| 状态 | 今日 | 昨日 | 变化 |
|------|-----:|-----:|------|
| Submitted and indexed | **26** | 26 | 持平 |
| Crawled - currently not indexed | 23 | 23 | 持平 |
| Discovered - currently not indexed | 29 | 26 | +3（噪音互跳） |
| URL is unknown to Google | 11 | 14 | −3（噪音互跳） |

## 三、⚠️ 待办不变：8 个 URL 等待手动请求（第 5 天）

抢救优先级（在 [GSC 网页版](https://search.google.com/search-console?resource_id=sc-domain%3Ai.zhangqingdong.cn) 逐个「请求编入索引」，每批 ≤10 个/天）：

| 优先级 | URL | 性质 |
|--------|-----|------|
| 1 | `/blog/performance-optimization-practices/` | 掉出（优质架构文） |
| 2 | `/blog/mysql-btree-index-principle/` | 掉出（48h 复检淘汰） |
| 3 | `/blog/redis-persistence-rdb-aof/` | 掉出 13 天 |
| 4 | `/blog/threadlocal-memory-leak-prevention/` | 掉出 3 天 |
| 5 | `/projects/` | 掉出 3 天（hub） |
| 6 | `/blog/service-mesh-istio-analysis/` | 请求未确认 |
| 7 | `/blog/cloudflare-pages-deployment-guide-zh/` | crawled 待推 |
| 8 | `/blog/getting-started-with-astro/` | crawled 待推 |

浏览器自动化（mcp-chrome-bridge）连续 5 天挂死，需检查本机 Chrome 与扩展连接（方案 B），或直接手动点击上表（方案 A）。

## 四、下一步

1. 8 个 URL 提交后 24~48h 验证；
2. crawled 桶剩 6 篇未请求过；
3. 内链模板等点头（48h 复检淘汰的根本对策）；
4. 本地积压 4 个报告 commit（10-09 ~ 10-12），建议 review 后 push。

## 五、存档

- 快照：[indexing-latest.json](./indexing-latest.json)（今日）· [snapshots/indexing-2026-10-11.json](./snapshots/indexing-2026-10-11.json)（昨日）

---
*自动化任务 automation-8d94dd62 · 第 24 轮 · 无代码修复，报告本地 commit 不 push*
