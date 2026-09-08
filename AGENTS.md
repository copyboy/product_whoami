# Product Whoami — Agent Instructions

> Personal portfolio website combining blog functionality with product showcase capabilities.
> Deployed at: https://i.zhangqingdong.cn

---

## Project Overview

**product_whoami** 是一个基于 Astro 的个人网站，包含以下核心功能：

| 模块 | 说明 |
|------|------|
| **Blog** | 技术文章、学习笔记、深度研究（MDX 格式） |
| **Projects** | 作品展示（China Neighbor、Modern Blog Template 等） |
| **Web3 专栏** | 区块链学习路线图（Bitcoin → Ethereum → DApp → DeFi → DAO） |
| **Search** | 基于 Fuse.js 的全文搜索 |
| **i18n** | astro-i18next 多语言支持 |

**技术栈：** Astro 4 + React 18 + Tailwind CSS + TypeScript

---

## Tech Stack

| 类别 | 技术 |
|------|------|
| 框架 | Astro 4 (`^4.0.0`) |
| UI | React 18, Tailwind CSS 3.4 |
| 内容 | MDX + Astro Content Collections |
| 搜索 | Fuse.js 7 |
| 图表 | Mermaid 11 |
| 部署 | Cloudflare Pages |

---

## Project Structure

```
src/
├── components/          # Astro/React 组件
│   ├── web3/           # Web3 专栏专用组件
│   ├── islands/         # React islands（交互组件）
│   └── *.astro         # Astro 组件
├── content/
│   ├── blog/           # 博客文章（MDX）
│   ├── config.ts       # Content Collections schema
│   └── projects/       # 项目展示（MDX）
├── data/               # JSON 数据（web3-roadmap-data.json）
├── icons/              # SVG 图标
├── layouts/
│   ├── BaseLayout.astro    # HTML 壳
│   └── ThreeColumnLayout.astro  # 三栏布局（Nav + Main + Sidebar）
├── pages/
│   ├── api/            # API 路由
│   ├── blog/           # 博客列表/详情
│   ├── categories/     # 分类页
│   ├── projects/       # 项目展示
│   ├── tags/           # 标签页
│   ├── web3/           # Web3 专栏
│   │   ├── index.astro         # 主页
│   │   ├── roadmap.astro       # 学习路线图
│   │   ├── report.astro        # 深度研究报告
│   │   ├── concept/[slug].astro  # 概念详情页
│   │   └── phase/[n].astro    # 阶段详情页
│   ├── about.astro
│   ├── index.astro
│   └── search.astro
├── styles/
│   └── global.css
├── types/
├── utils/              # 工具函数
│   ├── config.ts       # 站点配置
│   ├── web3Concepts.ts  # Web3 概念元数据
│   └── web3Roadmap.ts  # 路线图工具函数
└── main.tsx            # React 入口
```

---

## Key Conventions

### Content Collections Schema

**Blog 文章必需字段：**
```yaml
title: string
description: string
pubDate: date
tags: string[]
categories: string[]
subject?: string
location?: string
heroImage?: string
draft?: boolean (default: false)
featured?: boolean (default: false)
```

### Web3 学习路线图

路线图数据在 `src/data/web3-roadmap-data.json`，5 个阶段：

| Phase | 主题 | 状态 |
|-------|------|------|
| 1 | Bitcoin — 去中心化价值转移 | 4/4 完成 |
| 2 | Ethereum — 去中心化计算 | 4/4 完成 |
| 3 | DApp — 去中心化应用 | 4/4 |
| 4 | DeFi — 去中心化金融市场 | 4/4 完成 |
| 5 | DAO — 去中心化组织 | 4/4 |

---

## GitNexus Integration

This project is indexed by GitNexus as **product_whoami** (3101 symbols, 3097 relationships, 0 execution flows).

### Always Do

- **MUST run impact analysis before editing any symbol.** Before modifying a function, class, or method, run `gitnexus_impact({target: "symbolName", direction: "upstream"})` and report the blast radius to the user.
- **MUST run `gitnexus_detect_changes()` before committing** to verify your changes only affect expected symbols.
- **MUST warn the user** if impact analysis returns HIGH or CRITICAL risk before proceeding.

### Tools Quick Reference

| Tool | Command |
|------|---------|
| Query by concept | `gitnexus_query({query: "auth validation"})` |
| Symbol context | `gitnexus_context({name: "validateUser"})` |
| Blast radius | `gitnexus_impact({target: "X", direction: "upstream"})` |
| Pre-commit check | `gitnexus_detect_changes({scope: "staged"})` |
| Safe rename | `gitnexus_rename({symbol_name: "old", new_name: "new", dry_run: true})` |

### Impact Risk Levels

| Depth | Meaning | Action |
|-------|---------|--------|
| d=1 | WILL BREAK — direct callers | MUST update these |
| d=2 | LIKELY AFFECTED — indirect deps | Should test |
| d=3 | MAY NEED TESTING — transitive | Test if critical path |

### Self-Check Before Finishing

1. `gitnexus_impact` was run for all modified symbols
2. No HIGH/CRITICAL risk warnings were ignored
3. `gitnexus_detect_changes()` confirms changes match expected scope
4. All d=1 (WILL BREAK) dependents were updated

### Keeping Index Fresh

After committing code changes, re-run analyze to update the index:

```bash
npx gitnexus analyze
```

---

## Skill Calling Strategy

This project has 47+ skills available. **Follow the decision flow below.**

### Decision Flow

| 场景 | Skill | 入口命令 |
|------|-------|----------|
| 了解代码架构 | `gstack:brainstorming` | `/brainstorm` |
| 实现功能 / 写代码 | `superpowers:writing-plans` | `/plan` |
| 调试 Bug / 根因分析 | `gstack:investigate` | `/investigate` |
| 代码审查 / PR review | `gstack:review` | `/review` |
| QA 测试 / 找 Bug | `gstack:qa` | `/qa <url>` |
| 部署上线 | `gstack:ship` | `/ship` |
| 每日 AI 新闻 | `morning-ai:morning-ai` | `/morning-ai` |
| 微信文章转 Markdown | `wechat-to-md` | 直接提供 URL |
| Wiki 知识库 | `wiki:wiki` | `/wiki` |

### Skill 调用三原则

1. **基础上下文放 AGENTS.md** — AI 主动使用 skill 的概率低，先在文档里写清楚规则
2. **Skill 要提供可直接调用的入口** — gstack 类 skill 本身就是入口，通过 `/skill-name` 直接调用
3. **显式告诉 AI 调哪个函数** — 禁止 AI 自己拼装脚本路径

### 高频 Skills 入口速查

| Skill | 调用方式 |
|-------|----------|
| `/investigate` | 四阶段调试流程 |
| `/review` | PR 审查 |
| `/qa <url>` | QA 测试并修复 |
| `/ship` | 部署和创建 PR |
| `/morning-ai` | 每日 AI 新闻 |
| wechat-to-md | `convert_article` MCP 工具 |

---

## Commit Guidelines

Before committing, verify scope with:

```bash
gitnexus_detect_changes({scope: "staged"})
```

### 应该提交的内容

- 新功能 / 页面 / 组件
- 内容文章（MDX）
- 配置和工具函数
- 文档更新

### 不应该提交的内容

| 路径 | 原因 |
|------|------|
| `.claude/` | Claude Code 本地 memory |
| `public/data/search-data.json` | 构建产物 |
| `node_modules/` | 依赖 |
| `dist/` | 构建输出 |
| `*.local` | 本地文件 |
| `.DS_Store` | 系统文件 |

---

## Development

```bash
npm run dev      # 开发服务器
npm run build    # 构建生产版本
npm run preview # 预览构建结果
npm run type-check  # TypeScript 检查
npm run format      # Prettier 格式化
```

<!-- gitnexus:start -->
# GitNexus — Code Intelligence

This project is indexed by GitNexus as **product_whoami** (4563 symbols, 4557 relationships, 0 execution flows). Use the GitNexus MCP tools to understand code, assess impact, and navigate safely.

> If any GitNexus tool warns the index is stale, run `npx gitnexus analyze` in terminal first.

## Always Do

- **MUST run impact analysis before editing any symbol.** Before modifying a function, class, or method, run `gitnexus_impact({target: "symbolName", direction: "upstream"})` and report the blast radius (direct callers, affected processes, risk level) to the user.
- **MUST run `gitnexus_detect_changes()` before committing** to verify your changes only affect expected symbols and execution flows.
- **MUST warn the user** if impact analysis returns HIGH or CRITICAL risk before proceeding with edits.
- When exploring unfamiliar code, use `gitnexus_query({query: "concept"})` to find execution flows instead of grepping. It returns process-grouped results ranked by relevance.
- When you need full context on a specific symbol — callers, callees, which execution flows it participates in — use `gitnexus_context({name: "symbolName"})`.

## When Debugging

1. `gitnexus_query({query: "<error or symptom>"})` — find execution flows related to the issue
2. `gitnexus_context({name: "<suspect function>"})` — see all callers, callees, and process participation
3. `READ gitnexus://repo/product_whoami/process/{processName}` — trace the full execution flow step by step
4. For regressions: `gitnexus_detect_changes({scope: "compare", base_ref: "main"})` — see what your branch changed

## When Refactoring

- **Renaming**: MUST use `gitnexus_rename({symbol_name: "old", new_name: "new", dry_run: true})` first. Review the preview — graph edits are safe, text_search edits need manual review. Then run with `dry_run: false`.
- **Extracting/Splitting**: MUST run `gitnexus_context({name: "target"})` to see all incoming/outgoing refs, then `gitnexus_impact({target: "target", direction: "upstream"})` to find all external callers before moving code.
- After any refactor: run `gitnexus_detect_changes({scope: "all"})` to verify only expected files changed.

## Never Do

- NEVER edit a function, class, or method without first running `gitnexus_impact` on it.
- NEVER ignore HIGH or CRITICAL risk warnings from impact analysis.
- NEVER rename symbols with find-and-replace — use `gitnexus_rename` which understands the call graph.
- NEVER commit changes without running `gitnexus_detect_changes()` to check affected scope.

## Tools Quick Reference

| Tool | When to use | Command |
|------|-------------|---------|
| `query` | Find code by concept | `gitnexus_query({query: "auth validation"})` |
| `context` | 360-degree view of one symbol | `gitnexus_context({name: "validateUser"})` |
| `impact` | Blast radius before editing | `gitnexus_impact({target: "X", direction: "upstream"})` |
| `detect_changes` | Pre-commit scope check | `gitnexus_detect_changes({scope: "staged"})` |
| `rename` | Safe multi-file rename | `gitnexus_rename({symbol_name: "old", new_name: "new", dry_run: true})` |
| `cypher` | Custom graph queries | `gitnexus_cypher({query: "MATCH ..."})` |

## Impact Risk Levels

| Depth | Meaning | Action |
|-------|---------|--------|
| d=1 | WILL BREAK — direct callers/importers | MUST update these |
| d=2 | LIKELY AFFECTED — indirect deps | Should test |
| d=3 | MAY NEED TESTING — transitive | Test if critical path |

## Resources

| Resource | Use for |
|----------|---------|
| `gitnexus://repo/product_whoami/context` | Codebase overview, check index freshness |
| `gitnexus://repo/product_whoami/clusters` | All functional areas |
| `gitnexus://repo/product_whoami/processes` | All execution flows |
| `gitnexus://repo/product_whoami/process/{name}` | Step-by-step execution trace |

## Self-Check Before Finishing

Before completing any code modification task, verify:
1. `gitnexus_impact` was run for all modified symbols
2. No HIGH/CRITICAL risk warnings were ignored
3. `gitnexus_detect_changes()` confirms changes match expected scope
4. All d=1 (WILL BREAK) dependents were updated

## Keeping the Index Fresh

After committing code changes, the GitNexus index becomes stale. Re-run analyze to update it:

```bash
npx gitnexus analyze
```

If the index previously included embeddings, preserve them by adding `--embeddings`:

```bash
npx gitnexus analyze --embeddings
```

To check whether embeddings exist, inspect `.gitnexus/meta.json` — the `stats.embeddings` field shows the count (0 means no embeddings). **Running analyze without `--embeddings` will delete any previously generated embeddings.**

> Claude Code users: A PostToolUse hook handles this automatically after `git commit` and `git merge`.

## CLI

| Task | Read this skill file |
|------|---------------------|
| Understand architecture / "How does X work?" | `.claude/skills/gitnexus/gitnexus-exploring/SKILL.md` |
| Blast radius / "What breaks if I change X?" | `.claude/skills/gitnexus/gitnexus-impact-analysis/SKILL.md` |
| Trace bugs / "Why is X failing?" | `.claude/skills/gitnexus/gitnexus-debugging/SKILL.md` |
| Rename / extract / split / refactor | `.claude/skills/gitnexus/gitnexus-refactoring/SKILL.md` |
| Tools, resources, schema reference | `.claude/skills/gitnexus/gitnexus-guide/SKILL.md` |
| Index, status, clean, wiki CLI commands | `.claude/skills/gitnexus/gitnexus-cli/SKILL.md` |

<!-- gitnexus:end -->
