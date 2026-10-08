# GSC 未收录页面扫描日报 — 2026-10-09（第 21 轮）

- 属性：`sc-domain:i.zhangqingdong.cn`
- 数据源：线上 `sitemap-0.xml`（89 URL）全量 URL Inspection 检查
- 对比基线：[2026-10-08 第 20 轮](./indexing-scan-2026-10-08.md)（URL 集合完全一致）

## 一、结论（TL;DR）

1. **28/89（31.5%），净 −2**：无新收录（24h 前提交的 8 个请求尚未在 GSC 数据中反映，正常滞后），但**掉出 2 个**——`/blog/threadlocal-memory-leak-prevention/`（9-17 旧抓取重评）和 **`/projects/` 项目列表 hub**（9-09）。累计掉出 6 个。
2. **重评剃刀模式确认**：掉出全部是 last_crawled 停在 9 月上旬的旧抓取页（redis-persistence 9-04、/projects/ 9-09、threadlocal 9-17）。Google 在系统性地重审旧页，被重审过且站得住的（如 kafka 9-22、elasticsearch 9-25）很稳。
3. **redis-persistence 的 last_crawled 仍是 9-04**——证实 10-08 中断的请求没有送达 Google。手动请求通道连续两天中断（见下），掉出页无缓冲在积累。
4. 21 轮趋势：19×3→17×3→16×5→（中断）→17×3→（中断）→17×3→24→30→**28**。
5. 本轮无代码修复项。

## 二、状态分布与 delta（89 可比 URL）

| 状态 | 今日 | 昨日 | 变化 |
|------|-----:|-----:|------|
| Submitted and indexed | **28** | 30 | **−2** |
| Crawled - currently not indexed | 21 | 19 | +2（掉入 2 个） |
| Discovered - currently not indexed | 27 | 25 | +2（噪音互跳） |
| URL is unknown to Google | 13 | 15 | −2（噪音互跳） |

**掉出（2）**：threadlocal-memory-leak-prevention、/projects/。
**新收录（0）**。discovered/unknown 互跳 17 个（噪音）。

## 三、手动请求：连续第二天中断 ⚠️

- 浏览器自动化（mcp-chrome-bridge 驱动本机浏览器）**跨会话挂死**：navigate/snapshot 均 60s 超时，close 也超时。今天 8 个请求（redis-persistence、service-mesh、threadlocal、/projects/ 抢救 + 4 篇 crawled）全部未能提交。
- **需要用户介入**（二选一）：
  - **方案 A（推荐）**：在 GSC 网页版手动请求以下 4 个最高优先 URL（都是掉出页/待抢救页，点开检查 → 请求编入索引）：
    1. `https://i.zhangqingdong.cn/blog/redis-persistence-rdb-aof/`
    2. `https://i.zhangqingdong.cn/blog/threadlocal-memory-leak-prevention/`
    3. `https://i.zhangqingdong.cn/projects/`
    4. `https://i.zhangqingdong.cn/blog/service-mesh-istio-analysis/`
  - **方案 B**：检查本机 Chrome 是否开着、mcp-chrome-bridge 扩展是否连接正常，修好后明天自动化自动恢复。
- 备选队列（方案 A 做完还有额度的话）：cloudflare-pages、getting-started、synchronized、redis-cache。

## 四、下一步

1. 手动请求通道恢复后：优先 4 个抢救 URL，然后继续滚 crawled 桶（剩 ~11 篇未请求）；
2. 观察掉出页翻案周期（历史：1~9 天）；
3. 内链模板等点头；
4. 远端已同步（昨天 push 过），今天报告 commit 后本地积压 1 个。

## 五、存档

- 快照：[indexing-latest.json](./indexing-latest.json)（今日）· [snapshots/indexing-2026-10-08.json](./snapshots/indexing-2026-10-08.json)（昨日）

---
*自动化任务 automation-8d94dd62 · 第 21 轮 · 无代码修复，报告本地 commit 不 push*
