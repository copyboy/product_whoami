# GSC 未收录页面扫描日报 — 2026-10-14（第 26 轮）

- 属性：`sc-domain:i.zhangqingdong.cn`
- 数据源：线上 `sitemap-0.xml`（89 URL）全量 URL Inspection 检查
- 对比基线：[2026-10-13 第 25 轮](./indexing-scan-2026-10-13.md)（URL 集合完全一致）

## 一、结论（TL;DR）

1. **一进一出持平 25/89（28.1%）**：cloudflare-pages 新收录（10-13 重爬 + Breadcrumbs，crawled 桶 8 天老页自行转正）；elasticsearch 掉出（同日重爬被拒——它曾是「稳定页」，说明没有任何页面是绝对安全的）。
2. **同日两笔重爬、一收一拒**（cloudflare-pages 收、elasticsearch 拒）——Google 在逐页裁决，且重爬活动明显加速：mysql-mvcc、mysql-transaction-isolation 也于 10-13 被重爬（仍拒）。
3. **unknown 池清零**（11→0）：全部 89 个 URL 现在至少被 Google 发现。发现侧的工作彻底完成，剩余战场只在 crawled→indexed 一段。
4. 26 轮趋势：19×3→17×3→16×5→（中断）→17×3→（中断）→17×3→24→30→28→27→26→26→25→**25**。
5. 本轮无代码修复项；手动请求通道中断第 7 天。

## 二、状态分布与 delta（89 可比 URL）

| 状态 | 今日 | 昨日 | 变化 |
|------|-----:|-----:|------|
| Submitted and indexed | **25** | 25 | 持平（一进一出） |
| Crawled - currently not indexed | 23 | 23 | 持平 |
| Discovered - currently not indexed | **41** | 35 | +6 |
| URL is unknown to Google | **0** | 6 | −6（池子清零） |

**新收录（1）**：cloudflare-pages-deployment-guide-zh（无请求注入下自行转正）。
**掉出（1）**：elasticsearch-distributed-search（10-13 重爬被拒，待抢救请求）。

## 三、解读

1. **unknown 池清零是里程碑**：从基线 146 个「Google 根本不知道」到现在 0 个，发现阶段全部完成。剩余 64 个未收录页全部在 Google 的视野里，只差质量裁决。
2. **Google 正在加速重爬**：今天观察到 4 笔重爬（cloudflare 收、elasticsearch 拒、mvcc/txn-isolation 拒）。重爬 = 重新裁决的机会窗口，每笔重爬都可能翻转结果。
3. elasticsearch 的掉出再次验证：9-25 时代的「稳定页」也会被重审——存量没有任何豁免权。它已加入抢救清单首位。
4. 云flare 案例同样重要：**crawled 桶的老页可以不经请求自行转正**——crawled 桶的 23 页都是潜在的下一个。

## 四、下一步

1. **抢救清单更新（elasticsearch 置顶）**：elasticsearch、distributed-transaction、perf-opt、mysql-btree、redis-persistence、threadlocal、/projects/、service-mesh——通道中断第 7 天，等用户手动提交或桥接修复；
2. crawled 桶 23 页持续观察自行转正 + 请求推波助澜；
3. 内链模板等点头；
4. 本地积压 6 个报告 commit（10-09 ~ 10-14）。

## 五、存档

- 快照：[indexing-latest.json](./indexing-latest.json)（今日）· [snapshots/indexing-2026-10-13.json](./snapshots/indexing-2026-10-13.json)（昨日）

---
*自动化任务 automation-8d94dd62 · 第 26 轮 · 无代码修复，报告本地 commit 不 push*
