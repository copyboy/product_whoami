# GSC 未收录页面扫描日报 — 2026-09-27（第 10 轮）

- 属性：`sc-domain:i.zhangqingdong.cn`
- 数据源：线上 `sitemap-0.xml`（89 URL）全量 URL Inspection 检查
- 对比基线：[2026-09-26 第 9 轮](./indexing-scan-2026-09-26.md)（URL 集合完全一致）

## 一、结论（TL;DR）

1. **连续第 3 天持稳：16/89**。十日趋势 19→19→19→17→17→17→16→16→16→16。
2. **`/about/` 双实锤**：9-27 第二次被新鲜抓取、第二次拒绝。两次独立否定，判定不会再变——**只有改内容才能翻案**，此页已从「建议」升级为「结论」。
3. **首页 9-27 重爬保持收录**（健康重爬第 4 例：elasticsearch、web3/roadmap、workplace-sop、首页）。indexed 桶的稳固性进一步确认。
4. discovered/unknown 抖动放大（unknown 池 8→15，14 个回退 6 个前进），其中 phase/2、phase/3、phase/4 三页继续在队列边缘横跳第 5 天；microservices crawled→discovered 单点回退。全是噪音级波动。
5. 本轮无代码修复项。

## 二、状态分布与 delta（89 可比 URL）

| 状态 | 今日 | 昨日 | 变化 |
|------|-----:|-----:|------|
| Submitted and indexed | 16 | 16 | 持平 |
| Crawled - currently not indexed | 28 | 29 | −1（microservices 抖回 discovered） |
| Discovered - currently not indexed | 30 | 36 | −6（抖动） |
| URL is unknown to Google | 15 | 8 | +7（抖动） |

## 三、行动清单（第 10 天）

1. **更新 `/about/` 内容**——已从建议升级为结论：两次新鲜抓取两次拒绝，Google 在等页面变化。
2. **GSC 手动请求编入索引**（8 URL）：`/web3/phase/1~5/`、`/web3/report/`、`/projects/chinaneighbor/`、`/blog/distributed-transaction-patterns/`。
3. **「相关文章」内链模板**：等点头即做。

> **降频建议（重申）**：连续 3 天零变动 + /about/ 判定已收敛。若明天（9-28）扫描仍零变动，强烈建议把本任务降频为每周一扫（Automations 页面操作）。每日扫描在均衡态下的边际价值已经很低，报告将只重复相同结论。

## 四、存档

- 快照：[indexing-latest.json](./indexing-latest.json)（今日）· [snapshots/indexing-2026-09-26.json](./snapshots/indexing-2026-09-26.json)（昨日）
- 本地积压 9 个未 push 报告 commit（9-19 ~ 9-27）。

---
*自动化任务 automation-8d94dd62 · 第 10 轮 · 无代码修复，报告本地 commit 不 push*
