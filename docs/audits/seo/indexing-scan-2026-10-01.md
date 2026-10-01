# GSC 未收录页面扫描日报 — 2026-10-01（第 14 轮）

- 属性：`sc-domain:i.zhangqingdong.cn`
- 数据源：线上 `sitemap-0.xml`（89 URL）全量 URL Inspection 检查（1 个瞬时 500 重试成功）
- 对比基线：[2026-09-29 第 12 轮](./indexing-scan-2026-09-29.md)（9-30 为工具缺失中断日，无数据；本 delta 直接对比 9-29）
- 工具恢复：`mcp__gsc__*` 本轮重新挂载，服务账号授权完好，无需任何重认证。

## 一、结论（TL;DR）

1. **首个恢复日：17/89（19.1%），+1**。`/blog/` hub 于 9-30 被 Google 重新抓取后**翻案回归索引**——9-21 掉出、历时 9 天自行恢复，全程无人工干预。
2. **这个恢复案例修正了此前的判断**：掉出并非都是终局判决。Google 的重评估存在「再回头」机制，9 天是观察到的恢复周期。对三个仍掉出页面的含义：
   - `/blog/distributed-transaction-patterns/`（稳掉 10 天）：还有等的价值，手动请求可以加速；
   - `/about/`（双新鲜抓取拒绝）：性质不同——它是被抓取后主动拒绝，不是排队等待，「改内容」结论不变；
   - `/blog/` hub 的恢复也说明 hub 页判定松动，content hub 加编辑推荐的建议优先级可以下调。
3. `/about/` 无新动作（9-27 后未再重访）。
4. 本轮无代码修复项。

## 二、状态分布与 delta（89 可比 URL，对比 9-29）

| 状态 | 今日 | 9-29 | 变化 |
|------|-----:|-----:|------|
| Submitted and indexed | **17** | 16 | **+1（/blog/ 回归）** |
| Crawled - currently not indexed | 26 | 27 | −1 |
| Discovered - currently not indexed | 27 | 37 | −10（噪音） |
| URL is unknown to Google | 19 | 9 | +10（噪音） |

**新收录（1）**：`/blog/`。无掉出。discovered/unknown 继续互跳（10 级别振幅，忽略）。

十四轮全景：19 → 19 → 19 → 17 → 17 → 17 → 16 → 16 → 16 → 16 → 16 →（中断）→ **17**。历史区间 [16, 19]。

## 三、行动清单（第 14 天，按修正后的优先级）

1. **GSC 手动请求编入索引**（8 URL）：`/web3/phase/1~5/`、`/web3/report/`、`/projects/chinaneighbor/`、`/blog/distributed-transaction-patterns/` —— 前者加速排队，后者可能直接翻案；
2. **更新 `/about/` 内容**：性质是「主动拒绝」而非「排队」，仍是唯一翻案路径；
3. **「相关文章」内链模板**：等点头即做。

## 四、存档

- 快照：[indexing-latest.json](./indexing-latest.json)（今日）· [snapshots/indexing-2026-09-29.json](./snapshots/indexing-2026-09-29.json)（9-29 存档）
- 本地积压 13 个未 push 报告 commit（9-19 ~ 10-01）。

---
*自动化任务 automation-8d94dd62 · 第 14 轮 · 无代码修复，报告本地 commit 不 push*
