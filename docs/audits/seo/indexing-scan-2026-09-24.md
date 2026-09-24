# GSC 未收录页面扫描日报 — 2026-09-24（第 7 轮）

- 属性：`sc-domain:i.zhangqingdong.cn`
- 数据源：线上 `sitemap-0.xml`（89 URL）全量 URL Inspection 检查
- 对比基线：[2026-09-23 第 6 轮](./indexing-scan-2026-09-23.md)（URL 集合完全一致）

## 一、结论（TL;DR）

1. **又掉一个：16/89（18.0%）**。`/about/` 从已收录退到 crawled-not-indexed——**第 3 个掉出的页面，而且是实名 E-E-A-T 策略的核心页**。last_crawled 仍是 9-09（旧抓取的重评估），同 /blog/、distributed-transaction 的掉出模式一致。
2. **七日趋势：19 → 19 → 19 → 17 → 17 → 17 → 16**。这不是波动，是**无内容动作下的缓慢失血**：Google 在逐个重审旧抓取页面，没有内链/新鲜度支撑的就逐个掉。照这个速度，indexed 桶里 last_crawled 还是 7~8 月的页面（还有约 6 个）都可能是候选掉出对象。
3. 好消息：web3 phase/1、phase/4、modern-blog-template、pow-consensus 前进到 discovered，web3 全部真实页再次整队进入发现队列。
4. 本轮无代码修复项。

## 二、状态分布与 delta（89 可比 URL）

| 状态 | 今日 | 昨日 | 变化 |
|------|-----:|-----:|------|
| Submitted and indexed | **16** | 17 | **−1（/about/）** |
| Crawled - currently not indexed | 29 | 28 | +1 |
| Discovered - currently not indexed | 31 | 34 | −3（抖动） |
| URL is unknown to Google | 13 | 10 | +3（抖动） |

**掉出（1）**：`/about/`。
**前进（4）**：pow-consensus、projects/modern-blog-template、web3/phase/1、web3/phase/4（均 unknown→discovered）。
**后退抖动（8）**：creators-alchemy、dao-case-studies、hashmap、jvm-memory、pyramid、redis-data-structures、spring-singleton、account-model 等 discovered↔unknown 互跳。

**已掉出累计（3）**：`/blog/`（9-21）、`/blog/distributed-transaction-patterns/`（9-21）、`/about/`（9-24）。

## 三、/about/ 掉出的特殊性与对策

`/about/` 是实名背书页（Gerrad Zhang、工作经历、项目链接），它的收录直接影响全站 E-E-A-T 评分——**这个页面的优先级应高于普通文章**。可执行对策：

1. **GSC 手动请求编入索引**（第 7 天列出，现在加 `/about/` 共 9 个 URL）：`/about/`、`/web3/phase/1~5/`、`/web3/report/`、`/projects/chinaneighbor/`、`/blog/distributed-transaction-patterns/`；
2. **给 `/about/` 补内容与内链**：加入近期文章精选（带链接）、更新工作近况——「页面更新时间」本身是重新评估的触发器；
3. **「相关文章」内链模板**：全站性动作，等点头即做。

## 四、存档

- 快照：[indexing-latest.json](./indexing-latest.json)（今日）· [snapshots/indexing-2026-09-23.json](./snapshots/indexing-2026-09-23.json)（昨日）
- 本地积压 6 个未 push 报告 commit（9-19 ~ 9-24）。

---
*自动化任务 automation-8d94dd62 · 第 7 轮 · 无代码修复，报告本地 commit 不 push*
