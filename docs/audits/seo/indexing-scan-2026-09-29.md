# GSC 未收录页面扫描日报 — 2026-09-29（第 12 轮）

- 属性：`sc-domain:i.zhangqingdong.cn`
- 数据源：线上 `sitemap-0.xml`（89 URL）全量 URL Inspection 检查
- 对比基线：[2026-09-28 第 11 轮](./indexing-scan-2026-09-28.md)（URL 集合完全一致）

## 一、结论（TL;DR）

1. **核心 16 第 5 天持稳**。十二日趋势 19→19→19→17→17→17→16→16→16→16→16→16。
2. **昨日预测完全兑现**：unknown 池 36→9 整批弹回（29 个 URL 状态前进、仅 2 个回退），发现队列回到 37。这是噪音池「塌回→弹回」完整循环的第 3 次重现，读数与站点实际状态无关的证据链闭合。
3. `/about/` 维持双拒状态，无新动作。
4. 本轮无代码修复项。

## 二、状态分布与 delta（89 可比 URL）

| 状态 | 今日 | 昨日 | 变化 |
|------|-----:|-----:|------|
| Submitted and indexed | **16** | 16 | 持平（第 5 天） |
| Crawled - currently not indexed | 27 | 27 | 持平 |
| Discovered - currently not indexed | 37 | 10 | +27（噪音弹回） |
| URL is unknown to Google | 9 | 36 | −27（噪音弹回） |

## 三、行动清单（第 12 天，不变）

1. **更新 `/about/` 内容**（双拒结论）；
2. **GSC 手动请求编入索引**（8 URL）：`/web3/phase/1~5/`、`/web3/report/`、`/projects/chinaneighbor/`、`/blog/distributed-transaction-patterns/`；
3. **「相关文章」内链模板**：等点头即做。

## 四、降频建议（第四次）

噪音池「塌回→弹回」已完整循环 3 次（9-27→9-28→9-29），每次振幅 ±20 级别。**每日扫描已从「监控」退化为「记录同一件事」**：核心 16 不动、噪音池来回翻。每周一扫完全够用，cron 改 `30 9 * * 1` 即可（Automations 页面操作，我无权改）。

## 五、存档

- 快照：[indexing-latest.json](./indexing-latest.json)（今日）· [snapshots/indexing-2026-09-28.json](./snapshots/indexing-2026-09-28.json)（昨日）
- 本地积压 11 个未 push 报告 commit（9-19 ~ 9-29）。

---
*自动化任务 automation-8d94dd62 · 第 12 轮 · 无代码修复，报告本地 commit 不 push*
