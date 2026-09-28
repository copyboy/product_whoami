# GSC 未收录页面扫描日报 — 2026-09-28（第 11 轮）

- 属性：`sc-domain:i.zhangqingdong.cn`
- 数据源：线上 `sitemap-0.xml`（89 URL）全量 URL Inspection 检查
- 对比基线：[2026-09-27 第 10 轮](./indexing-scan-2026-09-27.md)（URL 集合完全一致）

## 一、结论（TL;DR）

1. **核心桶第 4 天稳定：16 indexed**。十一日趋势 19→19→19→17→17→17→16→16→16→16→16。crawled 桶 27（昨天 28，2 个抖出又会被抖回来）。
2. **噪音池剧烈放大**：unknown 池 15→36——几乎整个发现队列一夜塌回「unknown」。这是 GSC 侧大抖动日（此前 unknown 池在 2~17 间波动，今天 36 创纪录），**没有任何操作含义**：indexed/crawled 两桶未受影响，被抖下去的 URL 明天大概率又回来。这再次证明这两桶的日度读数不可用于决策。
3. `/about/` 无新动作（9-27 双拒后未再重访），结论不变：改内容是唯一翻案路径。
4. 本轮无代码修复项。

## 二、状态分布与 delta（89 可比 URL）

| 状态 | 今日 | 昨日 | 变化 |
|------|-----:|-----:|------|
| Submitted and indexed | **16** | 16 | 持平（第 4 天） |
| Crawled - currently not indexed | 27 | 28 | −1（噪音） |
| Discovered - currently not indexed | 10 | 30 | −20（噪音池塌缩） |
| URL is unknown to Google | **36** | 15 | +21（噪音池放大） |

## 三、行动清单（第 11 天，不变）

1. **更新 `/about/` 内容**（结论级：双新鲜抓取双拒绝）；
2. **GSC 手动请求编入索引**（8 URL）：`/web3/phase/1~5/`、`/web3/report/`、`/projects/chinaneighbor/`、`/blog/distributed-transaction-patterns/`；
3. **「相关文章」内链模板**：等点头即做。

## 四、降频建议（第三次，触发条件已满足）

昨天承诺的触发条件——「若 9-28 扫描仍零变动」——**今天已满足**。核心指标连续 4 天零变化，发现队列的读数已被证明是纯噪音（单日 ±20），每日扫描的边际信息量趋近于零。**强烈建议把本任务降频为每周一扫**（Automations 页面 → 编辑该任务 → cron 改 `30 9 * * 1`）。我无权修改本任务，这个决定在你。

## 五、存档

- 快照：[indexing-latest.json](./indexing-latest.json)（今日）· [snapshots/indexing-2026-09-27.json](./snapshots/indexing-2026-09-27.json)（昨日）
- 本地积压 10 个未 push 报告 commit（9-19 ~ 9-28）。

---
*自动化任务 automation-8d94dd62 · 第 11 轮 · 无代码修复，报告本地 commit 不 push*
