# GSC 未收录页面扫描日报 — 2026-10-08（第 20 轮）

- 属性：`sc-domain:i.zhangqingdong.cn`
- 数据源：线上 `sitemap-0.xml`（89 URL）全量 URL Inspection 检查
- 对比基线：[2026-10-07 第 19 轮](./indexing-scan-2026-10-07.md)（URL 集合完全一致）

## 一、结论（TL;DR）

1. **30/89（33.7%），净 +6**——连续第 2 天高速收录。二十轮趋势：19×3→17×3→16×5→（中断）→17×3→（中断）→17×3→24→**30**。20 轮累计：收录率从 5.8% → 33.7%。
2. **web3 专栏 7/7 全收录**：phase/1、phase/3 的补交请求生效（10-06 抓取），加上昨天的 phase/2/4/5、report、roadmap，整个学习路线图列表现已完整进索引。
3. **昨日 6 篇 crawled 文章请求中 5 篇收录**：team-performance、problem-solving-5w2h、rabbitmq、mysql-btree（10-06 抓取）+ volatile（10-07 当天抓当天收）；只有 service-mesh 仍未动（当日请求未拿到确认弹窗）。
4. **一个掉出：`/blog/redis-persistence-rdb-aof/`**（曾是最早收录的老页，last_crawled 仍 9-04）——Google 旧抓取重评把它刷掉了。它排在今天手动请求的第一位（浏览器自动化中断，见下）。
5. 本轮无代码修复项。

## 二、状态分布与 delta（89 可比 URL）

| 状态 | 今日 | 昨日 | 变化 |
|------|-----:|-----:|------|
| Submitted and indexed | **30** | 24 | **+7 / −1** |
| Crawled - currently not indexed | 19 | 23 | −4 |
| Discovered - currently not indexed | 25 | 25 | 持平 |
| URL is unknown to Google | 15 | 17 | −2 |

**新收录（7）**：web3/phase/1、phase/3、team-performance-management、problem-solving-5w2h、rabbitmq-message-reliability、mysql-btree-index-principle、volatile-memory-visibility。
**掉出（1）**：redis-persistence-rdb-aof（待手动请求抢救）。

## 三、手动请求：今日中断

- **中断情况**：准备提交 8 个请求（redis-persistence 抢救 + service-mesh 重试 + 6 篇 crawled），浏览器自动化会话在第一个请求执行中途挂死（连续超时，close 亦无效）。第一个请求（redis-persistence）**是否已提交无法确认**——明日扫描看它的 last_crawled 是否更新即知。
- **恢复方式**：浏览器进程是用户本机的（mcp-chrome-bridge 驱动），不能强杀；明日自动化会话重新挂载浏览器后继续，队列不变：redis-persistence、service-mesh、cloudflare-pages、getting-started、threadpool、synchronized、redis-cache、mysql-query-opt。
- 注：掉出页 redis-persistence 即便今天请求成功，从历史看翻案需要 1~9 天（/blog/ 用了 9 天）。

## 四、下一步

1. 明日扫描：验证 redis-persistence 是否已被重爬（请求是否送达）、service-mesh 状态、30 个存量稳固性；
2. 手动请求队列恢复后继续滚（crawled 桶还剩 ~11 篇没请求过）；
3. 内链模板等点头；
4. 本地积压 5 个报告 commit（10-05×2 ~ 10-08），建议 review 后 push。

## 五、存档

- 快照：[indexing-latest.json](./indexing-latest.json)（今日）· [snapshots/indexing-2026-10-07.json](./snapshots/indexing-2026-10-07.json)（昨日）

---
*自动化任务 automation-8d94dd62 · 第 20 轮 · 无代码修复，报告本地 commit 不 push*
