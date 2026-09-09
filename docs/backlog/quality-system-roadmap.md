# Quality System Roadmap

> Source design: `docs/design/quality-assurance-architecture.md` (PROPOSAL, Gerrad 2026-09-09 approved → mission)
> Goal: 五层防线落地。验收门见每个 WI 的完成定义；总验收 = `npm run verify` 一条命令在干净树上 exit 0，且对故意注入的缺陷能精确报错。

## Q1 — L1 红灯归零（机器防线）

- **WI1 修复存量红灯并建立 verify 骨架**（done 2026-09-09，plan `docs/plans/quality-system/2026-09-09-0127-1-wi1-red-light-zero-verify-skeleton.md`；type-check/lint/verify exit 0，基线见 `docs/testing/known-good-baselines.md` 2026-09-09 行）— 修复 `src/components/islands/MermaidDiagram.tsx:122` 的 TS2345（theme 类型收窄为 MermaidConfig union 允许值）；清零 14 个 lint error（`.astro/astro/content.d.ts` 与 `.astro/types.d.ts` 属生成目录，优先通过 eslint 配置 ignore 处理；`src/` 内的真实错误逐个修复，禁止 eslint-disable 掩盖语义错误）。新建 `scripts/verify.sh` 聚合 type-check + lint + test（L1+L2 骨架，L3 后续 WI 接入），注册 `npm run verify`。完成定义：`npm run type-check` exit 0、`npm run lint` exit 0、`npm run verify` exit 0、更新 known-good-baselines（红灯行移入 passed）。

## Q2 — L3 内容完整性（本站特色层）

- **WI2 内容完整性检查器 + verify 接入**（done 2026-09-09，plan `docs/plans/quality-system/2026-09-09-0127-2-wi2-content-integrity-checker.md` § Verification；verify exit 0 含内容检查，注入死链/悬空 Glossary 时精确报文件+行号且非零退出）— 新建内容扫描脚本（Node，放 `scripts/checks/`，vitest 可单测其解析逻辑）：(a) 内链检查：MDX/astro 中相对 href 目标存在（含 anchor 对 slug 校验）；(b) 图片存在性：frontmatter heroImage 与正文图片引用可解析（本地路径存在、远程 URL 允许 http 200 或显式白名单跳过）；(c) frontmatter 强化：pubDate ≤ 今天、tags 非空、description 非空且 ≤ 300 字符；(d) Glossary 闭合：`<GlossaryTerm term="x">` 的 x 必须在词典数据中注册；(e) 产物对账：build 后 sitemap URL 数与实际页面数一致、search-index 覆盖所有非 draft 文章、RSS 含最新文章。全部接入 `scripts/verify.sh`。完成定义：verify 包含内容检查；故意在测试 fixture 注入一个死链与一个悬空 Glossary 引用，verify 必须失败且错误信息指到文件与行号（验收证据记入 plan）。

## Q3 — L2 单测补齐

- **WI3 utils 层单测补齐**（done 2026-09-09，plan `docs/plans/quality-system/2026-09-09-0127-3-wi3-utils-unit-tests.md` § Verification；test:run 全绿 13 files / 120 tests，新增 57 用例 ≥ 20，verify exit 0 含内容检查，基线见 `docs/testing/known-good-baselines.md` 2026-09-09 WI3 行）— 为 `src/utils/web3Roadmap.ts`、`src/utils/web3Concepts.ts`、`src/utils/seo.ts`、`src/utils/content.ts` 补 vitest 用例（colocated `__tests__` 或同目录 `.test.ts`，与 config.test.ts 风格一致）：纯函数正常路径 + 边界（空值、缺失 slug、draft 文章过滤等）。不追覆盖率数字，只锁行为契约。完成定义：`npm run test:run` 全绿且新增用例数 ≥ 20；verify 保持 exit 0。

## Q4 — L4 冒烟 + CI 卡口

- **WI4 Playwright 冒烟 + GitHub Actions**（done 2026-09-09，plan `docs/plans/quality-system/2026-09-09-0257-1-wi4-playwright-smoke-ci.md` § Verification；本地 `npx playwright test` 全绿 6/6，known-good-baselines 已有 full（含 e2e）基线行；workflow 入库 + YAML 校验通过，push 后首次运行验证以 successor 标注移交 supervisor/作者，见 plan Phase 2 Proof；首跑回执 2026-09-09：run 34294655717 conclusion success ~1m55s（head ba299974，branch main / event push，https://github.com/copyboy/product_whoami/actions/runs/34294655717），完成定义「push 后首次运行验证」分支闭合，successor 计划 `2026-09-09-0336-1-wi4-ci-first-run-backfill.md` 已回填）— 安装 Playwright（devDependency），`e2e/playwright.config.ts` 打 `astro preview` 构建产物；`e2e/smoke.spec.ts` 覆盖 6 条路径：首页 200、任一博客文章详情渲染、web3 roadmap 页、搜索页可输入并出结果、任一分类页、404 页返回 404 状态；每条路径断言 console 无 error。新建 `.github/workflows/quality.yml`：push → npm ci + verify + build；PR → 上述 + Playwright 冒烟。CI 不含外链可达性检查（设计文档 §5 边界）。完成定义：本地 `npx playwright test` 全绿；workflow 文件入库且语法经 `act` 或 push 后首次运行验证；known-good-baselines 新增 full 基线行（verify + build + e2e 全绿）。
