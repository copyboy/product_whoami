# scripts/checks — 内容完整性检查器（quality-system WI2）

L3 内容完整性检查：Node + TypeScript 实现，解析/校验逻辑全部导出为纯函数（`lib/`），由 vitest 直接单测（`lib/*.test.ts`，已加入 vitest include）；本目录 CLI 聚合执行所有规则。

## 运行

```bash
node scripts/checks/run-content-checks.ts            # 全量检查（远程图片走网络）
node scripts/checks/run-content-checks.ts --skip-remote-fetch   # 离线：跳过远程可达性探测
```

退出码：无 finding → 0；存在任何 finding → 1。输出格式统一为 `文件路径:行号: 规则: 消息`。

verify.sh（`npm run verify`）在 `astro build` 之后调用本 CLI，含产物对账（L3 完整门）。

## 检查规则

| 规则 | 类别 | 说明 |
|------|------|------|
| `links/dead-internal` | (a) 内链 | MDX/astro 中相对或绝对内链目标必须存在（博客/项目 slug、分页、标签、分类/主题、web3 概念与阶段、字面页面路由、public 静态文件）；相对链接按浏览器语义解析 |
| `links/dead-anchor` | (a) 锚点 | 含 `#anchor` 的链接校验目标页标题 slug（MDX，github-slugger 风格）或 `id="..."` 字面量（astro 同文件 + 布局组件 + 目标 astro 页） |
| `images/local-missing` / `images/unresolvable-path` | (b) 图片 | frontmatter `heroImage` 与正文图片引用：本地绝对路径必须存在于 `public/`；相对路径不可解析即 finding |
| `images/remote-not-ok` / `images/remote-unreachable` | (b) 远程图 | 非白名单远程 URL 做 HTTP 2xx 校验（HEAD，405 回退 GET，5s 超时）；网络失败即 finding（离线安全：存量 URL 已全部白名单化，verify 不依赖网络） |
| `frontmatter/*` | (c) frontmatter | blog/projects 每篇：`pubDate ≤ 今天`、`tags` 非空、`description` 非空且 ≤ 300 字符 |
| `glossary/dangling-term` | (d) 术语 | `<GlossaryTerm term="x">` 的 x 必须在 `src/data/glossary.ts` 词典注册 |
| `artifacts/*` | (e) 产物对账 | build 后：sitemap URL 数 = dist 页面数（`**/index.html`）；search-index slug 集合 = 非草稿文章集合；RSS 含最新文章 |

代码块（``` 围栏）内的链接/图片/组件示例不参与检查；astro 模板插值行（含 `${`）的 href 跳过。

## 远程图片白名单

`remote-image-allowlist.json`：命中 `allowlist[].url` 的远程图片跳过网络可达性检查。约定：

- 存量远程封面图已全部登记（含出处文章）；
- 新增远程图片：若本地能联网验证 2xx 可不登记；CI / 离线环境必须在此登记并注明出处，避免静默放过；
- 白名单是显式例外清单，不是缓存。

## 设计决策

- frontmatter 解析：自写 YAML 子集解析器（`lib/frontmatter.ts`，支持标量/引号/流式数组/行内注释/键行号），不引入 `gray-matter`。理由：本仓库 frontmatter 为受控简单子集，解析器 100% 单测覆盖；零新依赖、零供应链面。残余风险（YAML 边界误报/漏报）由单测 + 真实树 verify 兜底。
- vitest include 扩展：`scripts/checks/**/*.{test,spec}.{js,ts}` 与 `src` 测试同池收集（`vitest.config.ts`）。理由：roadmap 要求单测解析逻辑，独立测试跑法会增加维护面；拒绝。
- CLI 运行时：Node ≥ 22.18 原生 TypeScript 类型剥离（`node scripts/checks/*.ts` 直接运行），零构建步骤；tsconfig 增加 `allowImportingTsExtensions`（noEmit 下合法）。

## 已知边界

- 不做外链（http/https）可达性检查（设计文档 §5 边界，属 CI 之外）。
- 仅检查 `src/content/**/*.mdx` 与 `src/pages/**/*.astro`（与计划骨架一致）；组件内链接不在范围。
- check-only，无自动修复模式。
