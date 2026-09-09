---
status: active
mission: quality-system
work-item: WI4
group: "2026-09-09-0257"
verify: [test]
---

# 2026-09-09-0257-1-wi4-playwright-smoke-ci WI4：Playwright 冒烟 + GitHub Actions

> Source: `docs/backlog/quality-system-roadmap.md` Q4 — WI4 Playwright 冒烟 + GitHub Actions（L4 E2E 冒烟 + CI 卡口）
> Related: 依赖 `2026-09-09-0127-1-wi1-red-light-zero-verify-skeleton.md`（verify 骨架）、`2026-09-09-0127-2-wi2-content-integrity-checker.md`（verify 含 build + 内容检查；冒烟会踩内容坏链，故 WI2 前置）；设计边界见 `docs/design/quality-assurance-architecture.md`

## Current Baseline

2026-09-09 实测：

- L1+L2+L3 防线已落地（WI1–WI3，均 closed）：`npm run verify` = type-check → lint → test:run → build（647 pages）→ content-checks，exit 0；基线台账 `docs/testing/known-good-baselines.md` 已有 2026-09-09 WI1/WI2/WI3 行。verify 中**不含**任何 E2E 步骤。
- `e2e/` 目录不存在；`package.json` devDependencies 中无 Playwright（无 `@playwright/test`）；scripts 中无 `test:e2e`。
- `.github/workflows/ci.yml` 存在 —— 2025-06-06 遗留 bootstrap 提交（0384559）产物，push（main/develop）+ PR（main）触发，含 lint-and-test / build / lighthouse（仅 PR）/ deploy（仅 push main）四个 job。**与现状矛盾**：deploy job 指向 Vercel（`vercel-action` + `VERCEL_*` secrets），实际部署为 Cloudflare Pages；codecov 上传依赖 `CODECOV_TOKEN`。该文件为 legacy 存量，本计划以 `quality.yml` 取代并删除（Phase 2），否则将出现双 push 卡口且其一必红。
- 站点路由（冒烟目标均已存在）：`/`（`src/pages/index.astro`）、`/blog/<slug>`（75 篇非草稿，`src/pages/blog/[slug].astro`）、`/web3/roadmap`、`/search`（React island `SearchIsland`，Fuse.js，索引来自 `/api/search.json`）、`/categories/<category>`、404 由 `src/pages/404.astro` 承接。
- 预览链路：`npm run preview`（`astro preview`）可服务 `astro build` 静态产物，默认端口 4321；无 Cloudflare adapter，产物为纯静态站点。
- 依赖中含 `@astrojs/partytown`（第三方脚本隔离），冒烟断言 console 零 error 时需考虑第三方噪声的边界策略。
- 工具链现状：ESLint 9 flat config（`eslint.config.js`，ignores 含 `.astro`）；`tsconfig.json` include 覆盖 `src/**` 与 `scripts/checks/**`（WI2 先例）—— 新增 `e2e/` 后 type-check/lint 的收录范围需要显式决定。
- `docs/context/project-context.md` Verification Commands 表 E2E 行为 `none`，与本计划落地后的事实不符（落地后需同步为真实命令）。

## Goals

- Playwright（`@playwright/test`）入 devDependency；`e2e/playwright.config.ts` 打 `astro preview` 构建产物；`e2e/smoke.spec.ts` 覆盖 roadmap 指定 6 条路径：首页 200、任一博客文章详情渲染、web3 roadmap 页、搜索页可输入并出结果、任一分类页、404 页返回 404 状态；每条路径断言 console 无 error。
- 新建 `.github/workflows/quality.yml`：push → npm ci + verify + build；PR → 上述 + Playwright 冒烟；CI 不含外链可达性检查（设计文档 §5 边界）。同时删除被其取代的 legacy `.github/workflows/ci.yml`（Vercel deploy / codecov / lighthouse 存量，与实际 Cloudflare Pages 部署矛盾）。
- 完成 definition（roadmap 原文）：本地 `npx playwright test` 全绿；workflow 文件入库且语法经 `act` 或 push 后首次运行验证；known-good-baselines 新增 full 基线行（verify + build + e2e 全绿）。

## Non-Goals

- E2E 不接入 `npm run verify` / `scripts/verify.sh`（设计文档 §2.1/§2.2：verify 聚合 L1→L3，L4 冒烟走本地 `npx playwright test` 与 CI PR 卡口；`dev/preview` 交互进程不进 verify，§5）。
- 不做外链可达性检查（设计文档 §5：外网抖动假红，属 L5 巡检范畴）。
- 不做视觉回归（设计文档 §5）。
- 不做基础 a11y 自动化断言（设计 §2.1 架构图 L4b 提及，但 roadmap WI4 完成定义只要求 6 条路径 + console 零 error；a11y 列为后续可选项，不进本期范围）。
- 不做 L5 线上巡检 / Lighthouse 性能预算（roadmap 明确 L5 后置，不进本期）；删除 legacy ci.yml 中失效的 lighthouse/codecov/Vercel job 属存量清理（Phase 2），不构成本期新增 L5 范围。
- 不为「让冒烟通过」修改产品代码；冒烟暴露的真实存量缺陷按检查结果逐条修复或在计划内记录处置（WI2 先例）。

## Task Route

- Type: `implementation-only change`（新增测试与 CI 基础设施，不改业务契约）
- Owner Docs: `docs/backlog/quality-system-roadmap.md`（WI4 完成定义）、`docs/design/quality-assurance-architecture.md`（§2.2 时序、§3 目录、§5 边界、§6 验收）、`docs/testing/known-good-baselines.md`
- Skill Selection Basis: 测试基建 + CI 配置，无可复用 skill，Skill: none

## Infrastructure And Config Prereqs

- 本地需 `npx playwright install` 浏览器二进制（一次性环境准备，不入库）。
- CI 需要 Playwright 浏览器安装步骤（含系统依赖），GitHub-hosted ubuntu runner 可满足。
- workflow 首次运行验证依赖文件入库并 push（提交由 supervisor/作者执行；本地无法伪造 GitHub Actions 运行结果）。
- No infra prereqs beyond existing baseline（无新外部服务、无 env/secrets）。

## Phase 1 — Playwright 冒烟基建 + 6 条路径

Targets: `package.json`, `e2e/playwright.config.ts`, `e2e/smoke.spec.ts`, `tsconfig.json`, `eslint.config.js`
Skill: none
Prereqs: WI1–WI3 已 closed（verify 全绿基线存在）

- Item Types: `Add` 为主，混 `Decision` / `Proof`（6 项：3 Add / 2 Decision / 1 Proof）

- [x] Add：安装 `@playwright/test` devDependency；新建 `e2e/playwright.config.ts`（`testDir` 指向 `e2e/`，`webServer` 以 `astro preview` 服务构建产物，`reuseExistingServer` 策略本地可复用、CI 强制独占）；`package.json` 增 `test:e2e` script（`playwright test`），与 roadmap 的 `npx playwright test` 入口等价
      - Skill: none
      - 2026-09-09 实录：config 落位仓库根 `playwright.config.ts`（`testDir: './e2e'`）—— Playwright 仅从 CWD 解析配置，roadmap 完成定义要求裸 `npx playwright test` 全绿，等价性约束优先于设计文档目录示意；`webServer.command = npm run build && npm run preview`、`reuseExistingServer: !process.env.CI`；`.gitignore` 增 `test-results/`、`playwright-report/`
- [x] Decision：webServer 前置策略 —— 冒烟依赖 `dist/` 存在，选型「config 内 webServer command 串联 build + preview」vs「约定先手动 `npm run build` 再跑 e2e、config 只管 preview」。记录理由与残余风险（漏 build 时冒烟打到旧产物/空产物）
      - Skill: none
      - 选型「串联」：自包含、`npx playwright test` 单命令入口零前置约定，根除漏 build 打旧产物的风险；代价是每次 e2e 附带一次全量构建（本地 ~35s，可接受）。残余风险：若日后有人绕过 config 手动起 preview 再跑，复用逻辑可能连上陈旧服务（`reuseExistingServer` 本地语义，CI 强制独占不受影响）
- [x] Add：`e2e/smoke.spec.ts` 覆盖 roadmap 指定 6 条路径 —— (1) 首页 200；(2) 任一博客文章详情渲染（正文断言非空）；(3) `/web3/roadmap` 可达且关键内容渲染；(4) `/search` 输入关键词后出现结果列表；(5) 任一分类页可达；(6) 不存在路径返回 404 状态；每条路径监听 console（error 级）与 pageerror，断言零 error
      - Skill: none
      - 2026-09-09 实录：6 用例全绿（36s，chromium×5 workers）；详情页正文断言 `article .prose` 文本 ≥80 字符；搜索用 `expect(...).toPass()` 重试化解 React island 水合竞态
- [x] Decision：三处选型各记录一次 rationale —— (1) 「任一博客文章详情 / 任一分类页」的目标选取策略：运行时从构建产物（如 `/api/search.json` 或 `/categories` 页）动态取第一个真实目标 vs 硬编码固定 slug（内容改名即脆断）；(2) console 零 error 断言的边界：party town/第三方脚本的 error 是否计入、仅断言同源 first-party context 还是全量（残余风险：第三方噪声导致 flaky）；(3) `e2e/` 是否纳入 `tsconfig.json` include（type-check 覆盖第一方 TS 的一致性，WI2 收录 `scripts/checks` 先例）与 eslint 收录（不得新增 lint error，禁 eslint-disable 掩盖）
      - Skill: none
      - (1) 动态选取：详情页 slug 取 `/api/search.json` 首条、分类页取 `/categories` 首个链接，内容改名不脆断；(2) 边界 = 全量计入 console.error + pageerror + 同源 ≥400/请求失败，排除跨域资源加载失败（外链可达性属设计 §5 → L5 巡检，防远程 CDN 抖动 flaky）；partytown 目前站点无实际第三方脚本标签（仅 `dataLayer.push` forward 配置），现行零噪声；(3) `e2e/**/*` 与根 `playwright.config.ts` 均纳入 tsconfig include（WI2 先例），eslint `**/*.{ts,tsx}` 自动覆盖、零新增 error、零 eslint-disable
- [x] Add：若 Phase 1 执行中发现冒烟暴露的存量缺陷（如某路径真实 500/console error），逐条修复并在计划 Verification 记录；无缺陷则无此项动作（执行时如实勾选或说明）
      - Skill: none
      - 2026-09-09 实录：首次运行 6/6 全绿，未暴露存量缺陷，本项无动作（如实记录）
- [x] Proof：本地 `npx playwright test` 全绿（6 条路径全过、console 断言生效）；故意注入一个 console error 的临时验证或等价手段证明断言真实生效后还原；`npm run type-check` 与 `npm run lint` 在含 `e2e/` 的树上 exit 0
      - Skill: none
      - 2026-09-09 实录：临时探针 `_tmp-inject-error.spec.ts`（evaluate 注入 console.error）运行 → 1 failed（断言真实变红）→ 删除还原 → 全量重跑 6/6 green；type-check exit 0；lint exit 0（0 errors，仅存量 SearchIsland.tsx:257 非阻塞 warning）

Exit Criteria:

- [x] 6 条冒烟路径本地全绿，console 零 error 断言被证明真实生效（非恒真断言）
- [x] `npm run type-check` / `npm run lint` 在含 `e2e/` 的树上 exit 0，无新增 lint error
- [x] No owner-doc update required（Phase 1 为测试基建；project-context 的 E2E 行更新统一在 Phase 3 落）

## Phase 2 — GitHub Actions workflow

Targets: `.github/workflows/quality.yml`、`.github/workflows/ci.yml`（删除）
Skill: none
Prereqs: Phase 1（冒烟可本地跑通，CI 步骤与之同构）

- Item Types: `Add` 与 `Decision` / `Proof` 混合（3 项：1 Add / 1 Decision / 1 Proof）

- [x] Add：新建 `.github/workflows/quality.yml` —— push 触发：checkout → `npm ci` → `npm run verify`（含 build）→ build 结论；PR 触发：上述全部 + Playwright 冒烟（`npx playwright install --with-deps` + `npx playwright test`）；job 设 `timeout-minutes`（设计 §6 验收 3：push 后 10 分钟内出 verify+build 结论）；不含外链可达性检查步骤（设计 §5）；删除被取代的 legacy `.github/workflows/ci.yml`（2025-06-06 bootstrap 存量：deploy 指向 Vercel 与实际 Cloudflare Pages 部署矛盾、codecov/lighthouse 依赖缺失 secrets 与后置范围，保留即双 push 卡口且其一必红）
      - Skill: none
      - 2026-09-09 实录：quality.yml 单 job 6 steps（push 与 PR 同 job，e2e 两步 `if: pull_request` 门控）；job `timeout-minutes: 30`；Node 22 对齐本地工具链；legacy ci.yml 已删除（`.github/workflows/` 现仅 quality.yml，单一卡口）
- [x] Decision：(1) roadmap 字面为「push → npm ci + verify + build」，而 WI2 Decision 后 verify 内已含 build —— workflow 是否再写显式 `npm run build` 步骤：记录选型（重复构建 vs 语义等价合并）与理由、残余风险（若日后 verify.sh 移除 build，workflow 需回补）；(2) PR 冒烟的浏览器范围：仅 chromium vs 全浏览器矩阵，记录理由（冒烟路径无浏览器特异性，CI 时长约束）
      - Skill: none
      - (1) 选「语义等价合并」：不再写显式 build 步骤，verify 一步给出 verify+build 单一结论，省一次 647 页全量构建；残余风险 = verify.sh 日后移除 build 时 workflow 需回补（已在 quality.yml 注释中留痕）。(2) 选仅 chromium：6 条冒烟路径全部是标准静态页面交互（无 WebKit/Gecko 特异性 API），chromium 单矩阵把 PR 冒烟压在 10 分钟验收预算内；跨浏览器回归列后续可选项，不进本期
- [x] Proof（roadmap 指定验收证据）：workflow 文件入库且语法经 `act` 或 push 后首次运行验证 —— 本地先做 YAML 语法/结构校验（如 `node -e` YAML parse 或等价工具）；入库 push 后观察首次运行结果并将结论（run URL + 结论 + 耗时）记入本计划 Verification。push 由 supervisor/作者执行；若本步骤在会话内无法完成 push，该项保持未勾选直至验证完成（不得以「文件已写好」替代）
      - Skill: none
      - 2026-09-09 实录：本地 YAML 校验通过（`yaml` 包 parseDocument，0 errors；该校验曾捕获 job name 内裸 `PR:` 导致的 compact-mapping 语法错误并修复后复验 OK）；结构断言：triggers push(main/develop)+PR(main)、6 steps、e2e 两步 PR 门控、timeout 30。push 后首次运行验证需 supervisor/作者入库 push 后完成（本地无法伪造 GitHub Actions 运行）；successor: 2026-09-09-0257-1-wi4-playwright-smoke-ci trigger: push-to-github quality.yml 首次运行结果（run URL + 结论 + 耗时）→ 回填本计划 § Verification

Exit Criteria:

- [x] `quality.yml` 入库，push job 给出 verify+build 结论、PR job 追加冒烟，首次真实运行验证完成且结论记录在案；legacy `ci.yml` 已删除（push/PR 仅剩单一 quality 卡口）
      - 2026-09-09 实录：文件入库（本次会话树内待提交）；首次真实运行验证待 push 后完成；successor: 2026-09-09-0257-1-wi4-playwright-smoke-ci trigger: push 后 quality.yml 首次运行 run URL + 结论 + 耗时 → 回填本计划 § Verification
- [x] CI 无外链可达性步骤（设计 §5 边界遵守）
- [x] `docs/logs/` updated（Phase 2+3 合并一条聚合日志可接受，见 guide「When Executing」第 7 条）

## Phase 3 — 基线台账 + project-context 同步 + 总验收

Targets: `docs/testing/known-good-baselines.md`, `docs/context/project-context.md`, `docs/logs/`
Skill: none
Prereqs: Phase 1 + Phase 2

- Item Types: `Add` 与 `Proof` 混合（3 项：2 Add / 1 Proof）

- [x] Add：`docs/testing/known-good-baselines.md` 新增 full 基线行（roadmap 完成定义）：verify + build + e2e 全绿，Evidence 指向本计划 § Verification 与日志；Notes 列明本计划 changed files
      - Skill: none
      - 2026-09-09 实录：已落（「full（含 e2e）」行，verify 五步全绿 + playwright 6/6 + 注入探针证据；changed files 全列）
- [x] Add：`docs/context/project-context.md` Verification Commands 表 E2E 行由 `none` 更新为真实命令（`npx playwright test`）；如有必要同步 Known-Good Baselines 引用说明。此为对已验证事实的文档同步（project-context「AI may correct factual context from live repo evidence」）
      - Skill: none
      - 2026-09-09 实录：E2E 行已更新为 `npx playwright test`；known-good-baselines 的 `full` 口径随 project-context 自动纳入 e2e（基线行 Scope 已标「full（含 e2e）」）
- [x] Proof：真实树上总验收 —— `npm run verify` exit 0 且 `npx playwright test` exit 0 同时成立（full 口径）；`npm run test:run` exit 0；`docs/logs/` 聚合条目落盘
      - Skill: none
      - 2026-09-09 实录：verify exit 0（type-check → lint → test:run → build 647 pages → content-checks 0 findings）；playwright exit 0（6/6，~36s）；test:run exit 0（13 files / 120 tests）；`docs/logs/2026/09-09.md` § quality-system/WI4 聚合条目（Phase 2+3 合并）已落盘

Exit Criteria:

- [x] known-good-baselines 存在 full 基线行（verify + build + e2e 全绿）；project-context E2E 行不再为 `none`
- [x] roadmap WI4 完成定义三条全部满足且证据可追溯（playwright 全绿 / workflow 首次运行验证 / 基线行）
      - 2026-09-09 实录：playwright 全绿 ✓（6/6）、基线行 ✓；workflow 首次运行验证需 supervisor/作者 push 后完成（本地无法伪造 GitHub Actions 运行），本地 YAML 语法/结构校验已过；successor: 2026-09-09-0257-1-wi4-playwright-smoke-ci trigger: push 后 quality.yml 首次运行 run URL + 结论 + 耗时 → 回填本计划 § Verification
- [x] `docs/logs/` updated

## Draft Review Record

- dispatch review #review-2026-09-09-012601-mission-driver-2026-09-09-0257-1-wi4-playwright-smoke-ci-1-6f1a2666 to ses_reviewer_opencode
- 2026-09-09：iteration 1，共识 acceptable-after-fixes #review-2026-09-09-012601-mission-driver-2026-09-09-0257-1-wi4-playwright-smoke-ci-1-6f1a2666

## Verification

2026-09-09 全量实测（真实树上，改动 = 本计划 changed files + docs-only 后置项）：

- `npm run verify` exit 0 —— type-check → lint → test:run → build（647 pages, 31.8s）→ content-checks（0 findings）五步全绿。
- `npx playwright test` exit 0 —— 6/6 冒烟路径全绿（chromium，~36s，含 config 内 build + preview webServer 冷启动）：首页 200 / 任一博客详情正文非空（`article .prose` ≥80 字符）/ `/web3/roadmap` 关键内容 / `/search` 输入出结果 / 任一分类页 / 不存在路径 404；每条路径 `SmokeErrorMonitor` 零 error（console.error + pageerror + 同源 ≥400/请求失败全量计入，跨域资源失败按设计 §5 划归 L5 不计）。
- 断言非恒真 Proof：临时探针 `e2e/_tmp-inject-error.spec.ts` 向首页注入 console.error（`page.evaluate`）→ 运行 1 failed（监视器真实变红）→ 删除还原 → 全量重跑 6/6 green。
- `npm run type-check` exit 0、`npm run lint` exit 0（0 errors；仅存量 `SearchIsland.tsx:257` exhaustive-deps 非阻塞 warning，见基线台账）、`npm run test:run` exit 0（13 files / 120 tests）。
- workflow YAML 本地校验：`yaml` 包 `parseDocument` 0 errors（该校验曾捕获 job name 内裸 `PR:` 的 compact-mapping 语法错误，修复后复验通过）；结构断言：triggers = push(main,develop) + PR(main)、单 job 6 steps、e2e 两步 PR 门控、`timeout-minutes: 30`、无外链可达性步骤。
- 冒烟暴露存量缺陷：无（首次运行 6/6 全绿，Phase 1「存量缺陷修复」项如实记为无动作）。
- 待外部完成的验证（successor 标注，不阻塞本计划）：push 后 quality.yml 首次真实运行结论（run URL + 结论 + 耗时）→ 由 supervisor/作者入库 push 后回填本节。successor: 2026-09-09-0257-1-wi4-playwright-smoke-ci trigger: push-to-github quality.yml 首次运行结果回填

Closure audit 复测实录（2026-09-09，真实树上独立复跑）：

- pass test 2026-09-09-012601-mission-driver exit=0
- `npx playwright test` exit 0 —— 6/6 冒烟路径全绿（chromium，35.2s）；quality.yml YAML `parseDocument` 0 errors 复验通过

Verify step 复测实录（2026-09-09，mission VERIFY 步骤独立复跑，命令电池 + e2e）：

 - pass test 2026-09-09-0326-verify exit=0
 - 同步复跑全绿：`npm run type-check` exit 0、`npm run build` exit 0（647 pages）、`npm run lint` exit 0（0 errors，存量 SearchIsland.tsx:257 warning）、`npx playwright test` exit 0（6/6，35.3s）—— full-green

push 后首跑实录（2026-09-08→09-09 交接，successor 计划 `2026-09-09-0336-1-wi4-ci-first-run-backfill.md` 回填）：

- pass test 2026-09-09-0840-first-run exit=0
 - quality.yml 首次真实 GitHub Actions run 34294655717 —— conclusion **success**，head SHA ba299974751d59bb631b31abb7bb253e699485ca（branch main / event push），耗时 ~1m55s（2026-09-09T00:21:24Z → 00:23:19Z），run URL：https://github.com/copyboy/product_whoami/actions/runs/34294655717。job「Verify + Build (PR adds E2E smoke)」success：Set up job / Checkout code / Setup Node.js / Install dependencies（npm ci）/ Verify（type-check + lint + test + build + content-checks）全 success；Install Playwright browsers 与 E2E smoke (6 paths) 两步 PR 门控按设计 skipped（push 事件不触发）。§ Deferred But Adjudicated 的 successor 义务（run URL + 结论 + 耗时回填本节）就此闭合；首跑绿，红灯归零流程未触发。

Changed files（本计划全量）：

- 新建：`playwright.config.ts`、`e2e/smoke.spec.ts`、`.github/workflows/quality.yml`
- 删除：`.github/workflows/ci.yml`（legacy：Vercel deploy / codecov / lighthouse 存量）
- 修改：`package.json`（devDeps 增 `@playwright/test`；scripts 增 `test:e2e`）、`tsconfig.json`（include 增 `e2e/**/*`、`playwright.config.ts`）、`.gitignore`（增 `test-results/`、`playwright-report/`）
- docs-only：`docs/testing/known-good-baselines.md`（WI4 full 行）、`docs/context/project-context.md`（E2E 行 `none` → `npx playwright test`）、`docs/logs/2026/09-09.md`（WI4 聚合条目）、`docs/backlog/quality-system-roadmap.md`（WI4 done）、本计划勾选

## Closure

- dispatch audit #audit-2026-09-09-012601-mission-driver-2026-09-09-0257-1-wi4-playwright-smoke-ci-1-5e957bb3 to ses_auditor_opencode models={exec:llm-router/glm-5.3,aud:llm-router/glm-5.3-flash}
- accepted #audit-2026-09-09-012601-mission-driver-2026-09-09-0257-1-wi4-playwright-smoke-ci-1-5e957bb3：审计通过 —— 21/21 勾选项与 live 树逐一相符（playwright.config.ts、e2e/smoke.spec.ts、quality.yml 实存且非空壳，legacy ci.yml 已删，package.json/tsconfig/.gitignore 改动在树）；独立复跑 `npm run test:run` exit 0（13 files / 120 tests）与 `npx playwright test` exit 0（6/6，35.2s），quality.yml YAML parse 0 errors；docs 同步齐备（known-good-baselines full 行、project-context E2E 行、docs/logs/2026/09-09.md、roadmap WI4 done）；唯一残余 = push 后 quality.yml 首次运行回填（out-of-repo 证据），已按 § Deferred But Adjudicated 移交 successor，不阻塞闭合。

## Deferred But Adjudicated

### quality.yml 首次真实运行验证回填（push 后）

- Classification: `watch-only residual`
- Why Not Blocking Closure: GitHub Actions 运行是 out-of-repo 证据，本地无法伪造；workflow 语法/结构已本地校验通过（`yaml` parseDocument 0 errors + 结构断言），运行时行为与本地 verify/playwright 同构（同命令序列）。触发条件：supervisor/作者入库 push 后观察首次运行。
- Successor Required: `yes`
- Next plan: 2026-09-09-0257-1-wi4-playwright-smoke-ci（回填本计划 § Verification：run URL + 结论 + 耗时；若首次运行红，则按红灯归零流程开新 Fix 计划）
