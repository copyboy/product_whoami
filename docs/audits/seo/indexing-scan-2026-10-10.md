# GSC 未收录页面扫描日报 — 2026-10-10（第 22 轮）

- 属性：`sc-domain:i.zhangqingdong.cn`
- 数据源：线上 `sitemap-0.xml`（89 URL）全量 URL Inspection 检查
- 对比基线：[2026-10-09 第 21 轮](./indexing-scan-2026-10-09.md)（URL 集合完全一致）

## 一、结论（TL;DR）

1. **27/89（30.3%），再净 −1**：无新收录（10-07 批 8 个请求的收录红利已释放完毕），**掉出 1 个——`performance-optimization-practices`（9-22 抓取）**。重评剃刀已从 9 月上旬页面蔓延到 9 月下旬页面，累计掉出 7 个。
2. **手动请求通道中断第 3 天**，失血无缓冲：4 个抢救 URL 的 last_crawled 均未更新（用户未手动请求、浏览器自动化仍未恢复）。历史数据表明每提交一批请求能带来 ~78% 的 24h 收录率——这条通道不通，净流量就会转负。
3. 好消息：28→27 的存量里，新收录页（10 月批次）全部稳固；discovered 池净 +4（噪音互跳 21 个）。
4. 22 轮趋势：19×3→17×3→16×5→（中断）→17×3→（中断）→17×3→24→30→28→**27**。
5. 本轮无代码修复项。

## 二、状态分布与 delta（89 可比 URL）

| 状态 | 今日 | 昨日 | 变化 |
|------|-----:|-----:|------|
| Submitted and indexed | **27** | 28 | −1 |
| Crawled - currently not indexed | 22 | 21 | +1 |
| Discovered - currently not indexed | 29 | 27 | +2（噪音） |
| URL is unknown to Google | 11 | 13 | −2（噪音） |

**掉出（1）**：performance-optimization-practices（曾带 Breadcrumbs 富结果的优质架构文，翻案价值高）。

## 三、⚠️ 手动请求请求（通道中断第 3 天，累计 11 个 URL 待提交）

浏览器自动化连续 3 天挂死（mcp-chrome-bridge），**请用户在 [GSC 网页版](https://search.google.com/search-console?resource_id=sc-domain%3Ai.zhangqingdong.cn) 逐个请求以下 5 个抢救 URL**（顶部检查框粘贴 → 请求编入索引，每个约 30 秒）：

1. `https://i.zhangqingdong.cn/blog/performance-optimization-practices/`（今日掉出，优质架构文）
2. `https://i.zhangqingdong.cn/blog/redis-persistence-rdb-aof/`（9-28 掉出，最早请求未送达）
3. `https://i.zhangqingdong.cn/blog/threadlocal-memory-leak-prevention/`（10-09 掉出）
4. `https://i.zhangqingdong.cn/projects/`（10-09 掉出，hub）
5. `https://i.zhangqingdong.cn/blog/service-mesh-istio-analysis/`（10-07 请求未确认）

备选（有额度继续）：cloudflare-pages、getting-started、synchronized、redis-cache、swot、time-management。

## 四、下一步

1. 手动请求通道恢复（用户点击或修好浏览器桥接）后恢复每日 ~8 个滚动；
2. 观察掉出页翻案周期（历史 1~9 天）；
3. 内链模板等点头；
4. 本地积压 2 个报告 commit（10-09、10-10）。

## 五、存档

- 快照：[indexing-latest.json](./indexing-latest.json)（今日）· [snapshots/indexing-2026-10-09.json](./snapshots/indexing-2026-10-09.json)（昨日）

---
*自动化任务 automation-8d94dd62 · 第 22 轮 · 无代码修复，报告本地 commit 不 push*
