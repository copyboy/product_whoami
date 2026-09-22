# GSC 未收录页面扫描日报 — 2026-09-22（第 5 轮）

- 属性：`sc-domain:i.zhangqingdong.cn`
- 数据源：线上 `sitemap-0.xml`（89 URL）全量 URL Inspection 检查
- 对比基线：[2026-09-21 第 4 轮](./indexing-scan-2026-09-21.md)（URL 集合完全一致）

## 一、结论（TL;DR）

1. **企稳日：收录 17/89 持平，indexed/crawled 两桶零变动**。昨天掉出的 `/blog/` 和 `distributed-transaction-patterns` 第 2 天停留在 crawled-not-indexed，没有自动恢复——大概率是 Google 的确定性判定，等内链/内容动作来翻案，不是等时间。
2. **重评估波实锤且有序**：9-22（昨天）Google 主动重爬了 kafka-high-throughput 和 performance-optimization-practices（**重爬后保持收录**）以及 service-mesh-istio-analysis（重爬后仍不收录）。这说明 Google 正在逐页重新评估，indexed 桶的 17 个是「重爬后站得住」的。
3. discovered/unknown 抖动 13 个（6 前进 7 后退），纯噪音，继续忽略。
4. 本轮无代码修复项。

## 二、状态分布与 delta（89 可比 URL）

| 状态 | 今日 | 昨日 | 变化 |
|------|-----:|-----:|------|
| Submitted and indexed | 17 | 17 | 持平 |
| Crawled - currently not indexed | 28 | 28 | 持平 |
| Discovered - currently not indexed | 34 | 35 | −1（噪音） |
| URL is unknown to Google | 10 | 9 | +1（噪音） |

五日趋势：收录 19 → 19 → 19 → 17 → **17**。重新评估期接近尾声（有 last_crawled 更新的页面在增多），接下来收录数的方向取决于内容侧动作，不再取决于技术面。

## 三、待用户决策（第 5 天列出，重要性不变）

1. **GSC 手动请求编入索引**：`/web3/phase/1~5/`、`/web3/report/`、`/projects/chinaneighbor/` + 掉出的 `distributed-transaction-patterns`（已稳掉 2 天，重新请求是标准翻案动作）。
2. **「相关文章」内链模板**：28 篇 crawled-not-indexed 等权重传导。点头即做，本地 commit 你 review。
3. **`/blog/` hub 编辑推荐改造**：纯列表页判定短期不会翻，加原创编辑推荐是唯一翻案路径。

## 四、存档

- 快照：[indexing-latest.json](./indexing-latest.json)（今日）· [snapshots/indexing-2026-09-21.json](./snapshots/indexing-2026-09-21.json)（昨日）
- 本地积压 4 个未 push 报告 commit（9-19 ~ 9-22）。

---
*自动化任务 automation-8d94dd62 · 第 5 轮 · 无代码修复，报告本地 commit 不 push*
