# GSC 未收录页面扫描日报 — 2026-09-21（第 4 轮）

- 属性：`sc-domain:i.zhangqingdong.cn`
- 数据源：线上 `sitemap-0.xml`（89 URL）全量 URL Inspection 检查（3 个瞬时 SSL 错误已按预案缩小批次重试成功）
- 对比基线：[2026-09-20 第 3 轮](./indexing-scan-2026-09-20.md)（URL 集合完全一致）

## 一、结论（TL;DR）

1. **首个负增长日：17/89（19.1%），较昨日 −2**。掉出的两个：`/blog/` 列表页、`distributed-transaction-patterns` 文章，均从「已收录」退到「Crawled - currently not indexed」。
2. **重要背景：这两个页面的 last_crawled 分别是 8-21 和 8-22**（本次部署之前）——掉出反映的是 Google 对**旧抓取的重新评估**，不是对我们改动的响应。sitemap 重提触发的重新评估期里，收录数出现双向波动属于正常过程，先观察 2~3 天再定性。
3. **discovered/unknown 两桶噪音确认**：8 个 URL 从 discovered 抖回 unknown、1 个反向前进。四天数据显示这两桶单日抖动 ±8 属常态，**趋势解读以 indexed 和 crawled-not-indexed 两桶为准**。
4. 本轮无代码修复项；无 noindex/软 404/canonical 问题。

## 二、状态分布与 delta（89 可比 URL）

| 状态 | 今日 | 昨日 | 变化 |
|------|-----:|-----:|------|
| Submitted and indexed | **17** | 19 | **−2** |
| Crawled - currently not indexed | 28 | 26 | +2（即掉出的 2 个） |
| Discovered - currently not indexed | 35 | 42 | −7（其中 8 个抖回 unknown） |
| URL is unknown to Google | 9 | 2 | +7（噪音） |

**掉出索引（2）**：`/blog/`（博客列表 hub，被判定低价值列表页）、`/blog/distributed-transaction-patterns/`（分布式事务文章）。

**四日趋势**：收录 19 → 19 → 19 → **17**；crawled 26 → 26 → 26 → 28；discovered/unknown 两桶大幅抖动（噪音区）。

## 三、分析与建议

**为什么 `/blog/` hub 会掉**：它是纯卡片列表页（无编辑内容），Google 对「低价值聚合页」的门槛正在全网收紧——和我们主动把 concept/分页移出 sitemap 是同一个逻辑。可选对策（等你拍板）：
- 给 `/blog/` hub 顶部加一段原创编辑推荐（本周精选 + 一句话点评），把它从「纯列表」变成「有编辑价值的页面」；成本低，我可以直接做。

**为什么 distributed-transaction-patterns 掉**：文章本身质量不差（曾在索引里），掉出更可能是重新评估期波动 + 站点整体权威度低。对策仍是老三样，但优先级应该提高了：
1. **GSC 手动请求编入索引**（已连续 4 天列出，未执行）：`/web3/phase/1~5/`、`/web3/report/`、`/projects/chinaneighbor/`，外加重新请求 `distributed-transaction-patterns`；
2. **内链**：我可以直接实现「相关文章」模板改动（同分类/同标签自动互链），给 crawled-not-indexed 的 28 篇传权重——等你点头；
3. **近期多发 1~2 篇新内容**并向旧文内链，给 Google「站点活跃」信号。

## 四、存档

- 快照：[indexing-latest.json](./indexing-latest.json)（今日）· [snapshots/indexing-2026-09-20.json](./snapshots/indexing-2026-09-20.json)（昨日）
- 本地积压 3 个未 push 报告 commit（9-19/9-20/9-21），记得 review。

---
*自动化任务 automation-8d94dd62 · 第 4 轮 · 无代码修复，报告本地 commit 不 push*
