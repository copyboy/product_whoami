# GSC 未收录页面扫描日报 — 2026-10-05（第 17 轮）

- 属性：`sc-domain:i.zhangqingdong.cn`
- 数据源：线上 `sitemap-0.xml`（89 URL）全量 URL Inspection 检查
- 对比基线：[2026-10-03 第 16 轮](./indexing-scan-2026-10-03.md)（10-04 无扫描，delta 直接对比 10-03）

## 一、结论（TL;DR）

1. **17 四连稳**，无新收录、无掉出。十七轮趋势：19×3→17×3→16×5→（中断）→17×4。
2. **`/about/` 翻案进度：内容已上线，Google 还没来看**。重写版 10-04 部署生效（已线上验证），但 GSC 显示 last_crawled 仍停在 **10-03**——即 Google 尚未抓取新版本。**下一步是触发器：在 GSC 网页版对 `/about/` 手动请求编入索引**，直接让 Google 抓新内容，否则它按自己的节奏可能还要等几天。
3. discovered/unknown 常规互跳 20 个（10 前 10 后），噪音。
4. 本轮无代码修复项。

## 二、状态分布与 delta（89 可比 URL）

| 状态 | 今日 | 10-03 | 变化 |
|------|-----:|-----:|------|
| Submitted and indexed | **17** | 17 | 持平 |
| Crawled - currently not indexed | 25 | 25 | 持平 |
| Discovered - currently not indexed | 33 | 33 | 持平（集合有互跳） |
| URL is unknown to Google | 14 | 14 | 持平（集合有互跳） |

四桶数量与 10-03 完全一致，集合级抖动照旧。

## 三、行动清单（唯一优先项加粗）

1. **GSC 手动请求编入索引 `https://i.zhangqingdong.cn/about/`**（新内容已部署 36 小时，Google 尚未重爬，手动请求是立即触发抓取的唯一手段）；顺手把这 8 个也请求了：`/web3/phase/1~5/`、`/web3/report/`、`/projects/chinaneighbor/`、`/blog/distributed-transaction-patterns/`；
2. 「相关文章」内链模板：等点头即做。

## 四、存档

- 快照：[indexing-latest.json](./indexing-latest.json)（今日）· [snapshots/indexing-2026-10-03.json](./snapshots/indexing-2026-10-03.json)（10-03 存档）
- 远端状态：main 已与 GitHub 同步（昨日 HTTPS 推送成功；origin 记账已修正）。

---
*自动化任务 automation-8d94dd62 · 第 17 轮 · 无代码修复，报告本地 commit 不 push*
