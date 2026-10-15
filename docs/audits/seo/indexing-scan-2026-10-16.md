# GSC 未收录页面扫描日报 — 2026-10-16（第 28 轮）

- 属性：`sc-domain:i.zhangqingdong.cn`
- 数据源：线上 `sitemap-0.xml`（89 URL）全量 URL Inspection 检查（含 dist-txn 补扫，89/89 完整）
- 对比基线：[2026-10-15 第 27 轮](./indexing-scan-2026-10-15.md)（URL 集合完全一致）

## 一、结论（TL;DR）

1. **23/89（25.8%），净 −1**：volatile-memory-visibility **再次掉出**——两周内第二次进出，全站最边缘页面确认。其余 23 个存量稳固。
2. **「压线页循环」模型完全确立**：请求/自行转正 → 进索引 → 数天后复检 → 淘汰 → 再请求/再翻案。volatile 已走完两轮完整循环。压线页的留存依赖站内权重，这不是收录动作能解决的。
3. redis-cache 10-15 被重爬仍拒；Google 对 crawled 桶的重爬节奏保持在每天 1~2 笔。
4. 28 轮趋势：19×3→17×3→16×5→（中断）→17×3→（中断）→17×3→24→30→28→27→26→26→25→25→24→**23**。手动请求通道中断第 9 天，五天累计净 −7（30→23）。
5. 本轮无代码修复项。

## 二、状态分布与 delta（89 可比 URL）

| 状态 | 今日 | 昨日 | 变化 |
|------|-----:|-----:|------|
| Submitted and indexed | **23** | 24 | −1 |
| Crawled - currently not indexed | 25 | 24 | +1 |
| Discovered - currently not indexed | 32 | 33 | −1（噪音） |
| URL is unknown to Google | 9 | 8 | +1（噪音） |

**掉出（1）**：volatile-memory-visibility（二次掉出）。**新收录（0）**。

## 三、数据固化的策略结论（28 轮）

1. **手动请求**：进得快（78%）、留不稳（10-07 批留存 4/6 且 volatile 二次掉出）——只适合高价值页定向抢救，不是增长引擎。
2. **crawled 桶自行转正**：cloudflare-pages 案例（8 天老页无请求自行转正）——重爬裁决窗口真实存在，但不可预测。
3. **根本对策仍是内链模板**：压线页循环的唯一打破方式是站内权重网络。26~28 轮的三连降（30→23，净 −7）全部发生在通道中断期间，而通道畅通期是 +13/三天——**杠杆在通道与权重，不在等待**。
4. 手动请求清单（9 个）不变，见 10-15 日报；今日新增 volatile 置顶。

## 四、下一步

1. volatile 加入抢救清单置顶（二次掉出，第 9 个待提交 URL）；
2. 内链模板拍板（等点头）；
3. 本地积压 8 个报告 commit（10-09 ~ 10-16），强烈建议 review 后 push。

## 五、存档

- 快照：[indexing-latest.json](./indexing-latest.json)（今日）· [snapshots/indexing-2026-10-15.json](./snapshots/indexing-2026-10-15.json)（昨日）

---
*自动化任务 automation-8d94dd62 · 第 28 轮 · 无代码修复，报告本地 commit 不 push*
