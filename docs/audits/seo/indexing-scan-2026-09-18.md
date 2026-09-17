# GSC 未收录页面扫描日报 — 2026-09-18（首轮基线）

- 属性：`sc-domain:i.zhangqingdong.cn`
- 数据源：线上 `sitemap-0.xml`（329 URL）全量 URL Inspection API 检查
- 趋势：**首轮基线，无前值可比**。快照存于 [indexing-latest.json](./indexing-latest.json)，明日起逐日 delta。

## 一、结论（TL;DR）

1. **329 个 sitemap URL 中仅 19 个被收录（5.8%）**，与 9 月初「646 页只收录首页」的诊断相比，收录面略有扩大（首页/关于/博客 hub/项目/专栏 hub + 13 篇文章），但整体仍处于收录危机。
2. **最大问题定位：233 个 `/web3/concept/*` 自动标签聚合页 0 收录**，占 sitemap 的 71%，全是「last_crawled: Never」。它们在 347823e 的薄页过滤中被遗漏。
3. **本轮已修（本地 commit，待 push）**：
   - sitemap 过滤器补排 `/web3/concept/*`（233 个）与博客分页 `/blog/2~8/`（7 个）→ **sitemap 329 → 90**，把抓取预算集中到真实内容；
   - BaseLayout 移除手写 canonical，消除与 astro-seo 重复输出的**全站双 canonical**（每页 2 → 1）。
4. 无 noindex 误加、无软 404、无重定向异常、无 robots 屏蔽 —— 未收录全部是「质量门槛/权威度」问题，不是技术性屏蔽。
5. ⚠️ 修复生效前提：**push 后 Cloudflare Pages 重新部署**。明天 9:30 的扫描会自动和本轮基线对比。

## 二、收录状态分布（329 URL）

| 状态 | 数量 | 占比 | 说明 |
|------|-----:|-----:|------|
| Submitted and indexed | 19 | 5.8% | 首页、/about/、/blog/、/projects/、/web3/、/web3/roadmap/、13 篇文章 |
| Crawled - currently not indexed | 30 | 9.1% | 26 篇文章 + 4 个分页（/blog/2~5/）；爬过但判定不值得收录 |
| Discovered - currently not indexed | 134 | 40.7% | 16 篇文章 + /blog/6/ 分页 + 113 个 concept 页 + chinaneighbor 项目页 + web3/phase/2、phase/5、report |
| URL is unknown to Google | 146 | 44.4% | 20 篇文章 + /blog/7~8/ 分页 + 120 个 concept 页 + modern-blog-template 项目页 + web3/phase/1、3、4 |

已收录的 13 篇文章：constraint-based-management、dao-governance-voting、digital-tools-integration、distributed-transaction-patterns、effective-meeting-management、elasticsearch-distributed-search、flash-loans-arbitrage、kafka-high-throughput-architecture、performance-optimization-practices、redis-persistence-rdb-aof、threadlocal-memory-leak-prevention、unlocking-ai-hidden-capabilities、workplace-sop-overview。

## 三、按问题类型的修复拆解

### 已修复（代码，本轮 commit）

| 问题 | 规模 | 修复 |
|------|------|------|
| concept 标签聚合页混入 sitemap | 233 URL | `astro.config.mjs` filter 补 `/web3/concept` 前缀排除（页面仍可被抓取，只是不主动提交） |
| 博客分页页混入 sitemap | 7 URL | 同上，`/blog/<纯数字>/` 排除 |
| 全站重复 canonical | 每页 2 个 | `BaseLayout.astro` 删手写 `<link rel=canonical>`，保留 astro-seo 输出 |

构建已验证：648 页构建通过，`dist/sitemap-0.xml` 90 个 URL（concept=0、分页=0），样例页面 canonical 恰好 1 个。

### 待用户决策（内容/权威度，未动内容）

1. **26 篇 crawled-not-indexed 文章**（MySQL 系列最密集：btree/innodb-lock/master-slave/mvcc/partitioning/perf-monitoring/query-opt/txn-isolation 全家族；JVM/并发系列次之；职场方法论系列散布）。这是典型的「爬过但质量分不够」。可执行选项：
   - 每篇做**内链**：从已收录的 13 篇文章正文/相关文章组件链向同系列未收录文章（成本最低，优先做）；
   - 挑 5~10 篇在 GSC 网页版**手动请求编入索引**（API 无此端点，只能手动）；
   - 长期：系列文章补差异化开篇/结论，避免同质模板感。
2. **/web3/phase/1~5、/web3/report/、/projects/chinaneighbor/**：真实内容页但从未被抓取（phase 2/5 处于 discovered，phase 1/3/4 连 discovered 都不是）。建议 push 部署后手动请求编入索引这 7 个 URL。
3. **concept 标签页的长期定位**：本轮只是移出 sitemap（0 收录，继续留着只耗抓取预算）。若将来想让标签页参与排名，需要给标签页模板加原创聚合文案；若确定不要，可以进一步加 noindex——**等你拍板，本轮未动**。

## 四、下轮扫描（明日 9:30）会自动做的事

- 重新抓线上 sitemap（部署后应为 90 URL）做全量检查；
- 与 `indexing-latest.json` 基线对比：新收录、新掉出、状态迁移；
- 若部署未发生（sitemap 仍 329），会在报告中提示「修复尚未部署」。

---
*自动化任务 automation-8d94dd62 · 扫描+修复+报告均已完成 · 本地 commit 未 push*
