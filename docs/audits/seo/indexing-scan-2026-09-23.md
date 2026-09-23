# GSC 未收录页面扫描日报 — 2026-09-23（第 6 轮）

- 属性：`sc-domain:i.zhangqingdong.cn`
- 数据源：线上 `sitemap-0.xml`（89 URL）全量 URL Inspection 检查
- 对比基线：[2026-09-22 第 5 轮](./indexing-scan-2026-09-22.md)（URL 集合完全一致）

## 一、结论（TL;DR）

1. **连续第 2 个零变动日：收录 17/89，indexed/crawled 两桶与昨日完全一致**——平台期确认。掉出的 2 页（/blog/、distributed-transaction-patterns）已稳掉 3 天，等外部动作翻案。
2. discovered/unknown 抖动 14 个（7 前 7 后，纯噪音），包括 web3 phase/1、phase/4 又抖回 unknown——这两个页面在发现队列边缘反复横跳 3 天了，进一步说明**等待没有意义，手动请求编入索引才是推动它们的手段**。
3. 本轮无代码修复项。技术面自 9-18 修复部署后连续 6 天零问题。

## 二、状态分布与 delta（89 可比 URL）

| 状态 | 今日 | 昨日 | 变化 |
|------|-----:|-----:|------|
| Submitted and indexed | 17 | 17 | 持平 |
| Crawled - currently not indexed | 28 | 28 | 持平 |
| Discovered - currently not indexed | 34 | 34 | 持平（集合有抖动） |
| URL is unknown to Google | 10 | 10 | 持平（集合有抖动） |

六日趋势：19 → 19 → 19 → 17 → 17 → **17**。Google 侧的重评估波已过（9-22 重爬的 3 页状态稳定），当前格局 = 站点在「零外链、零内链动作」状态下的自然均衡水平。

## 三、破局靠内容侧动作（第 6 天列出）

自然均衡已探明（17/89），接下来每一个点的增长都来自：

1. **GSC 手动请求编入索引**（8 URL）：`/web3/phase/1~5/`、`/web3/report/`、`/projects/chinaneighbor/`、`/blog/distributed-transaction-patterns/`。phase/1、phase/4 已在发现队列边缘抖了 3 天，手动请求直接推动。
2. **「相关文章」内链模板**：28 篇 crawled-not-indexed 的权重传导。点头即做。
3. **`/blog/` hub 编辑推荐**：纯列表页翻案的唯一路径。

## 四、存档

- 快照：[indexing-latest.json](./indexing-latest.json)（今日）· [snapshots/indexing-2026-09-22.json](./snapshots/indexing-2026-09-22.json)（昨日）
- 本地积压 5 个未 push 报告 commit（9-19 ~ 9-23），建议尽快 review 掉。

---
*自动化任务 automation-8d94dd62 · 第 6 轮 · 无代码修复，报告本地 commit 不 push*
