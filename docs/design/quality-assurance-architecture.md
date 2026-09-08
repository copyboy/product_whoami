# 质量测试体系设计（Quality Assurance Architecture）

> Status: PROPOSAL — 待 Gerrad 拍板后落地
> Date: 2026-09-09
> Scope: product_whoami 全站质量防线；不改业务功能

## 1. 问题定义

当前防线现状（2026-09-09 实测证据，见 `docs/testing/known-good-baselines.md`）：

| 层 | 现状 | 风险 |
|---|---|---|
| type-check | ❌ 1 个 TS 错误（MermaidDiagram.tsx TS2345） | 红灯常态化，防线失效信号 |
| lint | ❌ 14 个存量 error | 同上 |
| 单元测试 | ⚠️ 仅 4 个用例（config.test.ts），utils 层 6 个模块只测了 1 个 | 回归无网 |
| 内容完整性 | ❌ 零防线：死链、坏图、frontmatter、Glossary 引用全靠肉眼 | **内容站最大风险敞口** |
| E2E | ❌ 无（project-context 记录 `none`） | 部署产物行为不可知 |
| 线上巡检 | ❌ 无 | 生产事故只能靠用户发现 |

核心判断：这是 563 页的内容站，质量风险大头在**内容完整性**而非代码逻辑，但现有防线恰好相反——代码层半残、内容层为零。

## 2. 架构图

### 2.1 五层防线总览

```mermaid
flowchart TB
    subgraph L5["L5 线上巡检 (cron)"]
        L5a["关键页可用性探测<br>i.zhangqingdong.cn"]:::l5
        L5b["Lighthouse 性能预算<br>(后置，可选)"]:::l5opt
    end
    subgraph L4["L4 E2E 冒烟 (Playwright, preview 产物)"]
        L4a["6 条冒烟路径: 首页/文章详情/<br>roadmap/搜索/分类/404"]:::l4
        L4b["console 零报错 + 基础 a11y"]:::l4
    end
    subgraph L3["L3 内容完整性 ★ 本站特色层 (build 时)"]
        L3a["内链/外链检查"]:::l3
        L3b["图片/资源存在性"]:::l3
        L3c["frontmatter schema 强化"]:::l3
        L3d["Glossary 引用闭合 +<br>RSS/sitemap/search-index 对账"]:::l3
    end
    subgraph L2["L2 单元测试 (vitest)"]
        L2a["utils 层: web3Roadmap / web3Concepts /<br>seo / content / config"]:::l2
    end
    subgraph L1["L1 机器防线"]
        L1a["type-check = 0 错误"]:::l1
        L1b["lint = 0 error"]:::l1
    end
    L1 --> L2 --> L3 --> L4 --> L5
    VERIFY["npm run verify<br>一条命令聚合 L1→L3"]:::gate
    VERIFY -.聚合并卡口.-> L1
    VERIFY -.-> L2
    VERIFY -.-> L3
    CI["GitHub Actions<br>push → verify + build<br>PR → + L4 冒烟"]:::gate
    BASE["known-good-baselines.md<br>基线台账 (已有机制)"]:::out
    CI --> BASE
    L5 --> BASE

    classDef l1 fill:#fee,stroke:#c33
    classDef l2 fill:#fed,stroke:#c93
    classDef l3 fill:#efe,stroke:#3a3,stroke-width:3px
    classDef l4 fill:#eef,stroke:#36c
    classDef l5 fill:#f5f0fa,stroke:#76c
    classDef l5opt fill:#eee,stroke:#999,stroke-dasharray: 5 5
    classDef gate fill:#fff3cd,stroke:#856404,stroke-width:2px
    classDef out fill:#e8f4f8,stroke:#207
```

### 2.2 执行时序（改动如何流过防线）

```mermaid
sequenceDiagram
    participant Dev as 作者/AI 改动
    participant V as npm run verify<br>(本地/mission)
    participant CI as GitHub Actions
    participant CF as Cloudflare Pages
    participant W as 线上巡检 (cron)

    Dev->>V: 提交前跑 verify
    V->>V: L1 type-check + lint
    V->>V: L2 vitest run
    V->>V: L3 内容完整性扫描
    V-->>Dev: 全绿 → 允许提交；任一红 → 阻断
    Dev->>CI: git push
    CI->>CI: verify + build (563页)
    CI->>CI: L4 Playwright 冒烟 (仅 PR)
    CI-->>CF: 绿 → 部署
    CI->>Dev: 结果写基线台账
    CF-->>W: 部署后
    W->>W: 关键页探测 + 站点地图抽查
    W-->>Dev: 异常 → 告警
```

### 2.3 L3 内容完整性检查矩阵（投入产出比最高的一层）

| 检查项 | 规则 | 失败示例 |
|---|---|---|
| 内链检查 | 扫 MDX/astro 中 `href`/`src` 相对路径，目标必须存在（含 anchor 对 slug 校验） | 文章链接到已改名的概念页 |
| 图片存在性 | `heroImage`、`![]()` 引用的本地/远程资源可解析 | frontmatter 写了不存在的图 |
| Frontmatter | Content Collections schema 已有，增加：pubDate ≤ 今天、tags 非空、description 长度区间 | 忘写 description |
| Glossary 闭合 | `<GlossaryTerm term="x">` 的 x 必须在词典 JSON 中注册 | 词典词条改名后引用悬空 |
| 产物对账 | build 后：sitemap URL 数 = 页面数；search-index 覆盖所有非 draft 文章；RSS 含最新 N 篇 | 新文章漏进搜索索引 |

## 3. 目录与产物

```
product_whoami/
├── scripts/
│   └── verify.sh              # L1→L3 聚合，exit code 语义化
├── e2e/
│   ├── smoke.spec.ts          # L4 冒烟（6 条路径）
│   └── playwright.config.ts   # 打 astro preview 产物
├── src/utils/__tests__/       # L2 补齐（colocated）
│   ├── web3Roadmap.test.ts
│   ├── web3Concepts.test.ts
│   └── ...
└── .github/workflows/
    └── quality.yml            # push: verify+build；PR: +e2e
```

`npm run verify` 输出对齐 mission-driver 的 BUILD_VERIFY 消费格式（marker: pass / fail + 分层摘要）。

## 4. 实施计划（建议切 4 个 WI）

| WI | 内容 | 前置 | 规模 |
|---|---|---|---|
| Q1 | L1 归零：修 TS2345 + 14 lint error，verify.sh 只含 L1 | 无（当前代码已提交） | 小 |
| Q2 | L3 内容完整性：链接/图片/glossary/产物对账脚本 | Q1 | 中 |
| Q3 | L2 单测补齐 utils 5 模块 | Q1 | 小 |
| Q4 | L4 Playwright 冒烟 + CI workflow | Q2（冒烟会踩内容坏链） | 中 |

L5 线上巡检后置：等 Q1-Q4 稳定后用 cronjob 挂定时探测即可，不进本期。

## 5. 边界与不做的事

- 不追求覆盖率数字，L2 只锁 utils 纯函数
- 不做视觉回归（内容站样式变动频繁，误报成本高）
- 外链检查默认只验 HTTP 可达且**不卡 CI**（外网抖动会假红），放 L5 巡检
- `npm run dev/preview` 交互进程不进 verify（沿用 project-context 的语义边界）

## 6. 验收标准

1. `npm run verify` 一条命令在干净树上 exit 0
2. 故意制造一个死链 / 一个悬空 Glossary 引用，L3 必须报错并指到文件行号
3. GitHub Actions push 后 10 分钟内给出 verify+build 结论
4. 全绿后基线台账新增一行（复用现有 known-good-baselines 机制）
