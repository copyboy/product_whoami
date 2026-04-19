# Web3 页面重构详细实施方案

> 版本：1.0
> 日期：2026-04-18
> 状态：可执行
> 依赖：`20260418-web3-page-redesign.md`（设计文档）

---

## 执行摘要

本方案将 `web3` 频道从旧版 skill-based 结构迁移到 cognition-based 5 阶段路线图。涉及：

| 类型 | 数量 | 文件 |
|------|------|------|
| 新建 | 4 | `web3-roadmap-data.json`、`Web3PhaseProgress.astro`、`MilestoneCard.astro`、`PhaseDetail.astro` |
| 重构 | 3 | `/web3/index.astro`、`/web3/roadmap.astro`、`/web3/phase/[n].astro` |
| 同步 | 1 | `/web3/report.astro` |

---

## 一、数据层

### 1.1 创建 `src/data/web3-roadmap-data.json`

**路径**：`src/data/web3-roadmap-data.json`（注意：放在 `src/` 下以便直接 import，放在 `public/` 下会导致 getStaticPaths 中 fetch 失败）

> **注意**：JSON 中若包含中文引号 `"` `"` ，需转义为 `\u201c` `\u201d`，否则 Vite JSON 解析器会报语法错误。

```json
{
  "phases": [
    {
      "id": 1,
      "title": "理解去中心化价值转移",
      "subtitle": "Bitcoin",
      "painPoint": "你在非洲有亲人需要钱。你去银行汇款，手续费 10%，到账 3-5 天，还要求你有银行账户——但全球有 17 亿成年人没有银行账户。",
      "painRoot": "没有机构，就没有信任，就没有转账。",
      "coreQuestion": "能不能用数学代替机构，来证明"这笔钱是你的"？",
      "scenarios": ["跨境汇款", "资产存储", "censorship-resistant 的价值转移"],
      "color": "indigo",
      "milestones": [
        { "id": "M1.1", "title": "UTXO 模型是什么，为什么和银行账户不一样", "status": "done", "articleSlug": "utxo-model" },
        { "id": "M1.2", "title": "PoW 共识怎么保证不可篡改", "status": "done", "articleSlug": "pow-consensus" },
        { "id": "M1.3", "title": "Bitcoin 白皮书深度解读", "status": "done", "articleSlug": "bitcoin-whitepaper-deep-dive" },
        { "id": "M1.4", "title": "Bitcoin 网络实际运行（节点、矿工、交易）", "status": "todo", "articleSlug": null }
      ]
    },
    {
      "id": 2,
      "title": "理解去中心化计算",
      "subtitle": "Ethereum",
      "painPoint": "你和陌生人签了一份合同，约定"如果我按时交货，你就付款"。但付款这件事，还是靠对方自觉——或者打官司。",
      "painRoot": ""规则执行"这件事，一直需要人来中间撮合。有人就有腐败、有延迟、有成本。",
      "coreQuestion": "能不能让规则本身变成代码，自动执行，没有人可以干预？",
      "scenarios": ["可编程规则", "遗产自动执行", "代码合同"],
      "color": "purple",
      "milestones": [
        { "id": "M2.1", "title": "账户模型 vs UTXO", "status": "todo", "articleSlug": null },
        { "id": "M2.2", "title": "EVM 是什么，为什么重要", "status": "todo", "articleSlug": null },
        { "id": "M2.3", "title": "Gas 为什么存在，怎么计算", "status": "todo", "articleSlug": null },
        { "id": "M2.4", "title": "智能合约到底是什么，能做什么", "status": "todo", "articleSlug": null }
      ]
    },
    {
      "id": 3,
      "title": "理解去中心化应用",
      "subtitle": "DApp",
      "painPoint": "你在某平台做了5年的内容创作者，某天账号被封，一分收入没有，粉丝清零。平台说封就封，你没有任何申诉权。",
      "painRoot": ""应用"的本质是平台控制数据，用户只是租客。",
      "coreQuestion": "能不能构建一个应用，规则写在链上，没有任何人可以单方面修改或关掉它？",
      "scenarios": ["不需要服务器的 DApp", "众筹合约", "规则即法律"],
      "color": "emerald",
      "milestones": [
        { "id": "M3.1", "title": "Solidity 基础语法，能写简单合约", "status": "learning", "articleSlug": null },
        { "id": "M3.2", "title": "Hardhat + 本地测试环境搭建", "status": "todo", "articleSlug": null },
        { "id": "M3.3", "title": "部署到测试网（Sepolia / Holesky）", "status": "todo", "articleSlug": null },
        { "id": "M3.4", "title": "第一个完整 DApp（前端 + 合约交互）", "status": "todo", "articleSlug": null }
      ]
    },
    {
      "id": 4,
      "title": "理解去中心化金融市场",
      "subtitle": "DeFi",
      "painPoint": "你想用手里的资产赚收益，或者借一笔钱周转。但银行贷款要抵押、要审批、要信用记录——而全球大多数人根本没有"信用记录"这个东西。",
      "painRoot": "金融中介天然是信息不对称的受益者，它掌握规则制定权，你只能接受定价。",
      "coreQuestion": "能不能把借贷、交易、做市这些金融行为，变成任何人都能参与、规则公开透明的链上协议？",
      "scenarios": ["无门槛借贷", "DEX", "AMM", "合成资产"],
      "color": "amber",
      "milestones": [
        { "id": "M4.1", "title": "AMM 机制与 Uniswap 原理", "status": "todo", "articleSlug": null },
        { "id": "M4.2", "title": "借贷协议（Aave / Compound）", "status": "todo", "articleSlug": null },
        { "id": "M4.3", "title": "闪电贷与套利策略", "status": "todo", "articleSlug": null },
        { "id": "M4.4", "title": "DeFi 聚合器与收益策略", "status": "todo", "articleSlug": null }
      ]
    },
    {
      "id": 5,
      "title": "理解去中心化组织",
      "subtitle": "DAO",
      "painPoint": "你和一群人共同创建了一个项目，出钱出力。但最终决策权在创始人手里，利益分配靠信任，散伙靠打架。",
      "painRoot": ""组织"的协调机制一直依赖层级和信任，而信任会被权力侵蚀。",
      "coreQuestion": "能不能让一群人的协作规则、投票权、收益分配，全部写在链上自动执行，没有CEO可以一票否决？",
      "scenarios": ["开源资金管理", "链上治理投票", "NFT 社区治理"],
      "color": "pink",
      "milestones": [
        { "id": "M5.1", "title": "DAO 治理机制与投票模型", "status": "todo", "articleSlug": null },
        { "id": "M5.2", "title": "代币经济学设计", "status": "todo", "articleSlug": null },
        { "id": "M5.3", "title": "Multi-sig 与权限管理", "status": "todo", "articleSlug": null },
        { "id": "M5.4", "title": "知名 DAO 案例分析", "status": "todo", "articleSlug": null }
      ]
    }
  ]
}
```

**说明**：
- `color`：用于该阶段的渐变色标识，对应 Tailwind 颜色
- `articleSlug`：关联文章 slug，为 `null` 表示暂无关联文章
- `status`：枚举 `done` | `learning` | `todo` | `empty`

---

## 二、计算工具函数

### 2.1 创建 `src/utils/web3Roadmap.ts`

**路径**：`src/utils/web3Roadmap.ts`

```typescript
export interface Milestone {
  id: string;
  title: string;
  status: 'done' | 'learning' | 'todo' | 'empty';
  articleSlug: string | null;
}

export interface Phase {
  id: number;
  title: string;
  subtitle: string;
  painPoint: string;
  painRoot: string;
  coreQuestion: string;
  scenarios: string[];
  color: string;
  milestones: Milestone[];
}

export interface RoadmapData {
  phases: Phase[];
}

const statusEmoji: Record<Milestone['status'], string> = {
  done: '✅',
  learning: '🔄',
  todo: '🔄',
  empty: '🔄',
};

const statusLabel: Record<Milestone['status'], string> = {
  done: '已有',
  learning: '进行中',
  todo: '待学',
  empty: '待填',
};

export function getStatusEmoji(status: Milestone['status']): string {
  return statusEmoji[status];
}

export function getStatusLabel(status: Milestone['status']): string {
  return statusLabel[status];
}

export function getPhaseProgress(phase: Phase): number {
  const doneCount = phase.milestones.filter(m => m.status === 'done').length;
  return Math.round((doneCount / phase.milestones.length) * 100);
}

export function getCurrentPhase(phases: Phase[]): Phase | undefined {
  return phases.find(p =>
    p.milestones.some(m => m.status !== 'done')
  );
}

export function getCompletedMilestones(phases: Phase[]): Milestone[] {
  return phases.flatMap(p =>
    p.milestones.filter(m => m.status === 'done')
  );
}
```

---

## 三、组件

### 3.1 新建 `src/components/web3/Web3PhaseProgress.astro`

**用途**：首页学习路径预览，显示 5 阶段进度概览

**路径**：`src/components/web3/Web3PhaseProgress.astro`

```astro
---
import { getCollection } from 'astro:content';
import type { Phase } from '@utils/web3Roadmap';
import { getPhaseProgress, getCurrentPhase, getCompletedMilestones, getStatusEmoji } from '@utils/web3Roadmap';

interface Props {
  phases: Phase[];
}

const { phases } = Astro.props;

const currentPhase = getCurrentPhase(phases);
const completedMilestones = getCompletedMilestones(phases);
const currentPhaseIndex = phases.indexOf(currentPhase!);

// Get all posts for article link resolution
const allPosts = await getCollection('blog', ({ data }) => {
  return import.meta.env.PROD ? !data.draft : true;
});
---

<div class="rounded-lg border border-slate-200 dark:border-[#30363d] overflow-hidden">
  <!-- Header -->
  <div class="bg-slate-100 dark:bg-[#161b22] px-6 py-4 border-b border-slate-200 dark:border-[#30363d]">
    <div class="flex items-center justify-between">
      <div class="flex items-center gap-3">
        <div class="flex items-center gap-2">
          <span class="font-mono text-xs text-[#7ee787]">//</span>
          <h2 class="font-bold text-lg text-slate-800 dark:text-white">学习路径</h2>
        </div>
        <span class="text-xs text-slate-500 dark:text-slate-400">Learning Path</span>
      </div>
      <a href="/web3/roadmap" class="text-sm text-indigo-600 dark:text-indigo-400 hover:underline">
        查看完整路线图 →
      </a>
    </div>
  </div>

  <!-- Phase List -->
  <div class="divide-y divide-slate-200 dark:divide-[#30363d] bg-white dark:bg-[#0d1117]">
    {phases.map((phase, index) => {
      const progress = getPhaseProgress(phase);
      const isCurrent = phase.id === currentPhase?.id;
      const isCompleted = progress === 100;

      return (
        <div class:list={[
          "px-6 py-4 transition-colors",
          isCurrent && "bg-indigo-50 dark:bg-indigo-500/5"
        ]}>
          <div class="flex items-center justify-between mb-2">
            <div class="flex items-center gap-3">
              <span class:list={[
                "inline-flex items-center justify-center w-7 h-7 rounded-full text-xs font-bold text-white",
                isCompleted && "bg-emerald-500",
                isCurrent && !isCompleted && "bg-indigo-500",
                !isCompleted && !isCurrent && "bg-slate-400 dark:bg-[#30363d]"
              ]}>
                {phase.id}
              </span>
              <div>
                <span class:list={[
                  "font-semibold text-sm",
                  isCurrent ? "text-indigo-600 dark:text-indigo-400" : "text-slate-700 dark:text-white"
                ]}>
                  {phase.title}
                </span>
                <span class="ml-2 text-xs text-slate-500 dark:text-slate-400">
                  {phase.subtitle}
                </span>
              </div>
            </div>
            <span class:list={[
              "font-mono text-sm font-bold",
              isCompleted && "text-emerald-600 dark:text-emerald-400",
              isCurrent && !isCompleted && "text-indigo-600 dark:text-indigo-400",
              !isCompleted && !isCurrent && "text-slate-500 dark:text-slate-400"
            ]}>
              {progress}%
            </span>
          </div>

          <!-- Progress Bar -->
          <div class="ml-10 h-1.5 bg-slate-200 dark:bg-[#21262d] rounded-full overflow-hidden">
            <div
              class:list={[
                "h-full rounded-full transition-all duration-500",
                isCompleted && "bg-emerald-500",
                isCurrent && !isCompleted && "bg-indigo-500",
                !isCompleted && !isCurrent && "bg-slate-400 dark:bg-[#484f58]"
              ]}
              style={`width: ${progress}%`}
            />
          </div>
        </div>
      );
    })}
  </div>

  <!-- Current Phase CTA -->
  {currentPhase && (
    <div class="border-t border-slate-200 dark:border-[#30363d] px-6 py-4 bg-slate-50 dark:bg-[#161b22]">
      <div class="flex items-center justify-between">
        <div>
          <p class="text-xs text-slate-500 dark:text-slate-400 mb-1">当前阶段</p>
          <p class="font-semibold text-slate-800 dark:text-white">
            阶段{currentPhase.id}：{currentPhase.title}
          </p>
        </div>
        <a
          href={`/web3/phase/${currentPhase.id}`}
          class="inline-flex items-center gap-2 text-sm px-4 py-2 rounded-md bg-indigo-600 hover:bg-indigo-700 text-white transition-colors font-medium"
        >
          继续学习 →
        </a>
      </div>
    </div>
  )}

  <!-- Completed Milestones -->
  {completedMilestones.length > 0 && (
    <div class="border-t border-slate-200 dark:border-[#30363d] px-6 py-4">
      <p class="text-xs text-slate-500 dark:text-slate-400 mb-3">已完成里程碑</p>
      <div class="space-y-2">
        {completedMilestones.map(milestone => {
          const phase = phases.find(p => p.milestones.includes(milestone));
          const post = milestone.articleSlug
            ? allPosts.find(p => p.slug === milestone.articleSlug)
            : null;

          return (
            <div class="flex items-center gap-2 text-sm">
              <span class="text-emerald-500">{getStatusEmoji('done')}</span>
              <span class="text-slate-600 dark:text-slate-300">
                {post?.data.title || milestone.title}
              </span>
              {post && (
                <a
                  href={`/web3/article/${post.slug}`}
                  class="text-indigo-600 dark:text-indigo-400 hover:underline ml-1"
                >
                  →
                </a>
              )}
            </div>
          );
        })}
      </div>
    </div>
  )}
</div>
```

---

### 3.2 新建 `src/components/web3/MilestoneCard.astro`

**用途**：可展开的里程碑卡片，用于 Roadmap 详情页和阶段详情页

**路径**：`src/components/web3/MilestoneCard.astro`

```astro
---
import type { Milestone } from '@utils/web3Roadmap';
import { getStatusEmoji, getStatusLabel } from '@utils/web3Roadmap';

interface Props {
  milestone: Milestone;
  articleTitle?: string | null;
  articleDescription?: string | null;
  articleSlug?: string | null;
  expanded?: boolean;
}

const {
  milestone,
  articleTitle = null,
  articleDescription = null,
  articleSlug = null,
  expanded = false
} = Astro.props;

const statusEmoji = getStatusEmoji(milestone.status);
const statusLabel = getStatusLabel(milestone.status);
const hasArticle = !!articleSlug;
---

<div
  class="group relative bg-white dark:bg-[#161b22] rounded-xl border border-slate-200 dark:border-[#30363d] overflow-hidden transition-all duration-300 hover:border-indigo-500/50 dark:hover:border-indigo-500/50"
  data-milestone-card
>
  <button
    type="button"
    class="w-full text-left p-5 flex items-start gap-4 cursor-pointer"
    data-expand-toggle
  >
    <!-- Status Icon -->
    <div class:list={[
      "shrink-0 w-8 h-8 rounded-full flex items-center justify-center text-sm",
      milestone.status === 'done' && "bg-emerald-100 dark:bg-emerald-500/20 text-emerald-600 dark:text-emerald-400",
      milestone.status === 'learning' && "bg-amber-100 dark:bg-amber-500/20 text-amber-600 dark:text-amber-400",
      (milestone.status === 'todo' || milestone.status === 'empty') && "bg-slate-100 dark:bg-[#21262d] text-slate-400 dark:text-slate-500"
    ]}>
      {milestone.status === 'done' ? (
        <svg class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
          <path stroke-linecap="round" stroke-linejoin="round" d="M5 13l4 4L19 7" />
        </svg>
      ) : (
        <span class="font-mono text-xs font-bold">{milestone.id}</span>
      )}
    </div>

    <!-- Content -->
    <div class="flex-1 min-w-0">
      <div class="flex items-center gap-2 mb-1">
        <h4 class="font-semibold text-slate-900 dark:text-white">{milestone.title}</h4>
        <span class:list={[
          "text-xs px-2 py-0.5 rounded font-mono",
          milestone.status === 'done' && "bg-emerald-100 dark:bg-emerald-500/20 text-emerald-700 dark:text-emerald-300",
          milestone.status === 'learning' && "bg-amber-100 dark:bg-amber-500/20 text-amber-700 dark:text-amber-300",
          milestone.status === 'todo' && "bg-slate-100 dark:bg-[#21262d] text-slate-500 dark:text-slate-400",
          milestone.status === 'empty' && "bg-slate-100 dark:bg-[#21262d] text-slate-400 dark:text-slate-500"
        ]}>
          {statusEmoji} {statusLabel}
        </span>
      </div>

      {hasArticle && articleTitle && (
        <p class="text-sm text-indigo-600 dark:text-indigo-400 truncate">
          {articleTitle}
        </p>
      )}
    </div>

    <!-- Expand Icon -->
    <div class="shrink-0 transition-transform duration-200 data-[expanded=true]:rotate-180" data-expand-icon>
      <svg class="w-5 h-5 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
        <path stroke-linecap="round" stroke-linejoin="round" d="M12 6v12m6-6H6" />
      </svg>
    </div>
  </button>

  <!-- Expanded Content -->
  <div
    class="hidden px-5 pb-5"
    data-expand-content
  >
    <div class="ml-12 border-t border-slate-100 dark:border-[#30363d] pt-4 space-y-3">
      {hasArticle && articleDescription ? (
        <>
          <div>
            <p class="text-xs text-slate-500 dark:text-slate-400 mb-1">笔记摘要</p>
            <p class="text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
              {articleDescription}
            </p>
          </div>
          <div class="flex items-center gap-4 pt-2">
            <a
              href={`/web3/article/${articleSlug}`}
              class="inline-flex items-center gap-1 text-sm text-indigo-600 dark:text-indigo-400 hover:underline"
            >
              查看完整文章
              <svg class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                <path stroke-linecap="round" stroke-linejoin="round" d="M14 5l7 7m0 0l-7 7m7-7H3" />
              </svg>
            </a>
          </div>
        </>
      ) : (
        <p class="text-sm text-slate-500 dark:text-slate-400 italic">
          暂无关联文章，可先阅读相关资料
        </p>
      )}
    </div>
  </div>
</div>

<script>
  document.querySelectorAll('[data-milestone-card]').forEach(card => {
    const toggle = card.querySelector('[data-expand-toggle]');
    const content = card.querySelector('[data-expand-content]');
    const icon = card.querySelector('[data-expand-icon]');

    if (!toggle || !content || !icon) return;

    toggle.addEventListener('click', () => {
      const isExpanded = content.classList.contains('hidden');

      if (isExpanded) {
        content.classList.remove('hidden');
        icon.classList.add('rotate-180');
      } else {
        content.classList.add('hidden');
        icon.classList.remove('rotate-180');
      }
    });
  });
</script>
```

---

### 3.3 新建 `src/components/web3/PhaseHero.astro`

**用途**：阶段详情页 Hero 区域，显示阶段编号 + 标题 + 核心问题

**路径**：`src/components/web3/PhaseHero.astro`

```astro
---
interface Props {
  phaseId: number;
  title: string;
  coreQuestion: string;
  color: string;
}

const { phaseId, title, coreQuestion, color } = Astro.props;

const colorClasses: Record<string, string> = {
  indigo: 'from-indigo-500 to-purple-600',
  purple: 'from-purple-500 to-pink-600',
  emerald: 'from-emerald-500 to-teal-600',
  amber: 'from-amber-500 to-orange-600',
  pink: 'from-pink-500 to-rose-600',
};

const gradientClass = colorClasses[color] || colorClasses.indigo;
---

<header class="relative overflow-hidden rounded-xl border border-slate-200 dark:border-[#30363d] mb-8">
  <div class="absolute inset-0 bg-gradient-to-br from-slate-100 via-white to-slate-50 dark:from-[#0d1117] dark:via-[#0d1117] dark:to-[#0d1117]">
    <svg class="absolute inset-0 w-full h-full opacity-[0.04] dark:opacity-[0.07]" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <pattern id="grid" width="32" height="32" patternUnits="userSpaceOnUse">
          <path d="M 32 0 L 0 0 0 32" fill="none" stroke="currentColor" stroke-width="0.5"/>
        </pattern>
      </defs>
      <rect class="text-slate-400 dark:text-[#58a6ff]" width="100%" height="100%" fill="url(#grid)" />
    </svg>
  </div>

  <div class="relative p-8 md:p-10">
    <div class="flex items-center gap-2 mb-6">
      <span class="font-mono text-xs text-slate-400 dark:text-[#8b949e]">$ cd phase_{phaseId}</span>
    </div>

    <div class="flex flex-col md:flex-row md:items-end justify-between gap-6">
      <div>
        <div class:list={[
          "inline-flex items-center justify-center w-14 h-14 rounded-xl bg-gradient-to-br text-white font-black font-mono text-2xl shadow-lg mb-4",
          gradientClass
        ]}>
          {phaseId}
        </div>
        <h1 class="text-3xl md:text-4xl font-bold text-slate-900 dark:text-white mb-3 tracking-tight leading-none">
          {title}
        </h1>
        <p class="font-mono text-sm text-slate-500 dark:text-[#8b949e] max-w-2xl leading-relaxed">
          {coreQuestion}
        </p>
      </div>
    </div>
  </div>
</header>
```

---

### 3.4 新建 `src/components/web3/PainPointBlock.astro`

**用途**：显示阶段的痛点叙述区块

**路径**：`src/components/web3/PainPointBlock.astro`

```astro
---
interface Props {
  painPoint: string;
  painRoot: string;
  color?: string; // 可选，默认 amber
}

const { painPoint, painRoot, color = 'amber' } = Astro.props;

// 根据 color 动态映射颜色类
const colorMap: Record<string, { bg: string; border: string; iconBg: string; iconColor: string; textColor: string; rootColor: string }> = {
  amber: {
    bg: 'bg-amber-50 dark:bg-amber-500/5',
    border: 'border-amber-200 dark:border-amber-500/30',
    iconBg: 'bg-amber-100 dark:bg-amber-500/20',
    iconColor: 'text-amber-600 dark:text-amber-400',
    textColor: 'text-amber-800 dark:text-amber-200',
    rootColor: 'text-amber-700 dark:text-amber-300',
  },
  indigo: {
    bg: 'bg-indigo-50 dark:bg-indigo-500/5',
    border: 'border-indigo-200 dark:border-indigo-500/30',
    iconBg: 'bg-indigo-100 dark:bg-indigo-500/20',
    iconColor: 'text-indigo-600 dark:text-indigo-400',
    textColor: 'text-indigo-800 dark:text-indigo-200',
    rootColor: 'text-indigo-700 dark:text-indigo-300',
  },
  purple: {
    bg: 'bg-purple-50 dark:bg-purple-500/5',
    border: 'border-purple-200 dark:border-purple-500/30',
    iconBg: 'bg-purple-100 dark:bg-purple-500/20',
    iconColor: 'text-purple-600 dark:text-purple-400',
    textColor: 'text-purple-800 dark:text-purple-200',
    rootColor: 'text-purple-700 dark:text-purple-300',
  },
  emerald: {
    bg: 'bg-emerald-50 dark:bg-emerald-500/5',
    border: 'border-emerald-200 dark:border-emerald-500/30',
    iconBg: 'bg-emerald-100 dark:bg-emerald-500/20',
    iconColor: 'text-emerald-600 dark:text-emerald-400',
    textColor: 'text-emerald-800 dark:text-emerald-200',
    rootColor: 'text-emerald-700 dark:text-emerald-300',
  },
  pink: {
    bg: 'bg-pink-50 dark:bg-pink-500/5',
    border: 'border-pink-200 dark:border-pink-500/30',
    iconBg: 'bg-pink-100 dark:bg-pink-500/20',
    iconColor: 'text-pink-600 dark:text-pink-400',
    textColor: 'text-pink-800 dark:text-pink-200',
    rootColor: 'text-pink-700 dark:text-pink-300',
  },
};

const c = colorMap[color] || colorMap.amber;
---

<div class={`rounded-xl border ${c.border} ${c.bg} p-6 mb-8`}>
  <div class="flex items-start gap-3 mb-4">
    <div class={`shrink-0 w-8 h-8 rounded-full ${c.iconBg} flex items-center justify-center`}>
      <svg class={`w-4 h-4 ${c.iconColor}`} fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
        <path stroke-linecap="round" stroke-linejoin="round" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
      </svg>
    </div>
    <p class={`text-sm font-medium ${c.textColor}`}>痛点</p>
  </div>
  <p class="text-slate-700 dark:text-slate-200 leading-relaxed mb-4">
    {painPoint}
  </p>
  <p class={`text-sm ${c.rootColor} leading-relaxed`}>
    <span class="font-semibold">为什么有这个痛点？</span> {painRoot}
  </p>
</div>
```

---

## 四、页面重构

### 4.1 重构 `/web3/index.astro`

**变化**：将"学习路径预览"从旧版 3 阶段改为 Web3PhaseProgress 组件

**保留**：Hero 区域、概念图谱（Web3ConceptCards）、文章列表不变

**改动位置**：约 line 116-175 的"Learning Path Preview" section

```astro
---
// 现有 imports 保持
import { getCollection } from 'astro:content';
import ThreeColumnLayout from '@layouts/ThreeColumnLayout.astro';
import Web3ConceptCards from '@components/web3/Web3ConceptCards.astro';
import ArticleListItem from '@components/ArticleListItem.astro';
import Web3PhaseProgress from '@components/web3/Web3PhaseProgress.astro';

// 获取 roadmap 数据
const roadmapData = await fetch('/data/web3-roadmap-data.json').then(r => r.json());
const { phases } = roadmapData;

// ... 现有 filter 逻辑保持 ...
---

<!-- 替换原有的 Learning Path Preview section（约 line 116-175）-->
<!-- 新组件：-->
<Web3PhaseProgress phases={phases} />
```

### 4.2 重构 `/web3/roadmap.astro`

**完全重写**，基于新 5 阶段结构

**路径**：`src/pages/web3/roadmap.astro`

```astro
---
import ThreeColumnLayout from '@layouts/ThreeColumnLayout.astro';
import MilestoneCard from '@components/web3/MilestoneCard.astro';
import PainPointBlock from '@components/web3/PainPointBlock.astro';
import { getCollection } from 'astro:content';

// 获取 roadmap 数据
const roadmapData = await fetch('/data/web3-roadmap-data.json').then(r => r.json());
const { phases } = roadmapData;

// 获取所有 blog posts 用于解析 articleSlug
const allPosts = await getCollection('blog', ({ data }) => {
  return import.meta.env.PROD ? !data.draft : true;
});

// 构建 phase → posts 映射
const postsMap = new Map(allPosts.map(p => [p.slug, p]));
---

<ThreeColumnLayout
  title="Web3 学习路线图 | Gerrad's Digital Garden"
  description="Web3 学习路径 - 从概念地基到开发实践"
>
  <div class="space-y-12">

    <!-- Hero Header -->
    <header class="relative overflow-hidden rounded-xl border border-slate-200 dark:border-[#30363d]">
      <div class="absolute inset-0 bg-gradient-to-br from-slate-100 via-white to-slate-50 dark:from-[#0d1117] dark:via-[#0d1117] dark:to-[#0d1117]">
        <svg class="absolute inset-0 w-full h-full opacity-[0.04] dark:opacity-[0.07]" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="grid" width="32" height="32" patternUnits="userSpaceOnUse">
              <path d="M 32 0 L 0 0 0 32" fill="none" stroke="currentColor" stroke-width="0.5"/>
            </pattern>
          </defs>
          <rect class="text-slate-400 dark:text-[#58a6ff]" width="100%" height="100%" fill="url(#grid)" />
        </svg>
        <div class="absolute -top-20 -right-20 w-64 h-64 bg-[#58a6ff]/5 dark:bg-[#58a6ff]/10 rounded-full blur-3xl"></div>
        <div class="absolute -bottom-10 -left-10 w-48 h-48 bg-emerald-500/5 dark:bg-emerald-500/10 rounded-full blur-3xl"></div>
      </div>

      <div class="relative p-8 md:p-10">
        <div class="flex items-center gap-2 mb-6">
          <div class="flex gap-1.5">
            <div class="w-3 h-3 rounded-full bg-red-400 dark:bg-[#ff5f57]"></div>
            <div class="w-3 h-3 rounded-full bg-yellow-400 dark:bg-[#febc2e]"></div>
            <div class="w-3 h-3 rounded-full bg-green-400 dark:bg-[#28c840]"></div>
          </div>
          <span class="font-mono text-xs text-slate-400 dark:text-[#8b949e] ml-2">web3_learning_path.exe</span>
        </div>

        <div class="flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div>
            <div class="font-mono text-xs text-indigo-600 dark:text-emerald-400 mb-2">$ ./start_learning.sh --path=web3</div>
            <h1 class="text-4xl md:text-5xl font-black text-slate-900 dark:text-white mb-3 tracking-tight leading-none">
              WEB3<br/>
              <span class="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-emerald-600 dark:from-[#58a6ff] dark:to-emerald-400">ROADMAP</span>
            </h1>
            <p class="font-mono text-sm text-slate-500 dark:text-[#8b949e] max-w-lg leading-relaxed">
              // 理解去中心化的五个阶段<br/>
              // 认知升级路线图
            </p>
          </div>

          <div class="flex gap-6 md:text-right">
            <div>
              <p class="font-mono text-3xl font-black text-slate-900 dark:text-white">5</p>
              <p class="font-mono text-xs text-slate-500 dark:text-[#8b949e]">PHASES</p>
            </div>
            <div class="w-px bg-slate-200 dark:bg-[#30363d]"></div>
            <div>
              <p class="font-mono text-3xl font-black text-indigo-600 dark:text-[#58a6ff]">
                {phases.reduce((sum, p) => sum + p.milestones.length, 0)}
              </p>
              <p class="font-mono text-xs text-slate-500 dark:text-[#8b949e]">MILESTONES</p>
            </div>
          </div>
        </div>
      </div>
    </header>

    <!-- Phases -->
    {phases.map((phase, phaseIndex) => (
      <section class="relative" id={`phase-${phase.id}`}>
        <!-- Section Header -->
        <div class="flex items-center gap-4 mb-6">
          <div class:list={[
            "flex items-center justify-center w-12 h-12 rounded-xl bg-gradient-to-br text-white font-black font-mono text-xl shadow-lg",
            phase.color === 'indigo' && "from-indigo-500 to-purple-600",
            phase.color === 'purple' && "from-purple-500 to-pink-600",
            phase.color === 'emerald' && "from-emerald-500 to-teal-600",
            phase.color === 'amber' && "from-amber-500 to-orange-600",
            phase.color === 'pink' && "from-pink-500 to-rose-600"
          ]}>
            {phase.id}
          </div>
          <div>
            <h2 class="text-xl md:text-2xl font-bold text-slate-900 dark:text-white">
              阶段{phase.id} — {phase.title}
            </h2>
            <p class="font-mono text-sm text-slate-500 dark:text-[#8b949e]">
              {phase.subtitle}
            </p>
          </div>
        </div>

        <!-- Timeline line -->
        {phaseIndex < phases.length - 1 && (
          <div class="absolute left-6 top-20 bottom-0 w-0.5 bg-gradient-to-b from-indigo-500 via-purple-500 to-amber-500 opacity-20 dark:opacity-30"></div>
        )}

        <!-- Pain Point Block -->
        <PainPointBlock
          painPoint={phase.painPoint}
          painRoot={phase.painRoot}
          color={phase.color}
        />

        <!-- Core Question -->
        <div class="mb-6 p-4 rounded-lg bg-slate-100 dark:bg-[#161b22] border border-slate-200 dark:border-[#30363d]">
          <p class="text-xs text-slate-500 dark:text-slate-400 mb-1 font-mono">核心问题</p>
          <p class="text-slate-800 dark:text-slate-100 font-medium">
            <span class="text-indigo-600 dark:text-indigo-400 font-bold">{phase.subtitle}</span>
            {' '}回答的问题是：{phase.coreQuestion}
          </p>
        </div>

        <!-- Milestones -->
        <div class="space-y-4 ml-0 md:ml-0">
          {phase.milestones.map(milestone => {
            const post = milestone.articleSlug ? postsMap.get(milestone.articleSlug) : null;

            return (
              <MilestoneCard
                milestone={milestone}
                articleTitle={post?.data.title}
                articleDescription={post?.data.description}
                articleSlug={milestone.articleSlug}
              />
            );
          })}
        </div>

        <!-- Scenarios -->
        <div class="mt-6 flex flex-wrap gap-2">
          {phase.scenarios.map(scenario => (
            <span class="text-xs px-3 py-1.5 rounded-full bg-slate-100 dark:bg-[#21262d] text-slate-600 dark:text-slate-300 border border-slate-200 dark:border-[#30363d]">
              {scenario}
            </span>
          ))}
        </div>
      </section>
    ))}

    <!-- Back link -->
    <div class="pt-8 border-t border-slate-200 dark:border-[#30363d]">
      <a href="/web3" class="inline-flex items-center gap-2 font-mono text-sm text-indigo-600 dark:text-[#58a6ff] hover:text-indigo-700 dark:hover:text-[#79b8ff] transition-colors group">
        <svg class="w-4 h-4 transition-transform group-hover:-translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
          <path stroke-linecap="round" stroke-linejoin="round" d="M10 19l-7-7m0 0l7-7m-7 7h18"/>
        </svg>
        cd ../ 返回 Web3 专栏
      </a>
    </div>
  </div>
</ThreeColumnLayout>
```

---

### 4.3 新建 `/web3/phase/[n].astro`

**动态路由**，显示单个阶段详情

**路径**：`src/pages/web3/phase/[n].astro`

```astro
---
import ThreeColumnLayout from '@layouts/ThreeColumnLayout.astro';
import PhaseHero from '@components/web3/PhaseHero.astro';
import PainPointBlock from '@components/web3/PainPointBlock.astro';
import MilestoneCard from '@components/web3/MilestoneCard.astro';
import { getCollection } from 'astro:content';

export async function getStaticPaths() {
  const roadmapData = await fetch('/data/web3-roadmap-data.json').then(r => r.json());
  const { phases } = roadmapData;

  return phases.map(phase => ({
    params: { n: phase.id.toString() },
    props: { phase, phases }
  }));
}

const { phase, phases } = Astro.props;
const { n } = Astro.params;

const allPosts = await getCollection('blog', ({ data }) => {
  return import.meta.env.PROD ? !data.draft : true;
});

const postsMap = new Map(allPosts.map(p => [p.slug, p]));

// Next phase
const currentIndex = phases.findIndex(p => p.id === phase.id);
const nextPhase = phases[currentIndex + 1] || null;

// Generate TOC from milestones
const toc = phase.milestones.map(m => ({
  depth: 3,
  slug: `milestone-${m.id}`,
  text: `${m.id} ${m.title}`
}));
---

<ThreeColumnLayout
  title={`阶段${phase.id}：${phase.title} | Gerrad's Digital Garden`}
  description={phase.coreQuestion}
  toc={toc}
>
  <div class="space-y-8">
    <!-- Hero -->
    <PhaseHero
      phaseId={phase.id}
      title={phase.title}
      coreQuestion={phase.coreQuestion}
      color={phase.color}
    />

    <!-- Pain Point -->
    <PainPointBlock
      painPoint={phase.painPoint}
      painRoot={phase.painRoot}
    />

    <!-- Scenarios -->
    <div class="flex flex-wrap gap-2">
      {phase.scenarios.map(scenario => (
        <span class="text-sm px-3 py-1.5 rounded-full bg-indigo-50 dark:bg-indigo-500/10 text-indigo-700 dark:text-indigo-300 border border-indigo-100 dark:border-indigo-500/20">
          {scenario}
        </span>
      ))}
    </div>

    <!-- Milestones -->
    <section>
      <h2 class="text-lg font-bold text-slate-900 dark:text-white mb-4 flex items-center gap-2">
        <span class="font-mono text-indigo-600 dark:text-indigo-400">//</span>
        里程碑
      </h2>
      <div class="space-y-4">
        {phase.milestones.map(milestone => {
          const post = milestone.articleSlug ? postsMap.get(milestone.articleSlug) : null;

          return (
            <div id={`milestone-${milestone.id}`}>
              <MilestoneCard
                milestone={milestone}
                articleTitle={post?.data.title}
                articleDescription={post?.data.description}
                articleSlug={milestone.articleSlug}
              />
            </div>
          );
        })}
      </div>
    </section>

    <!-- Next Phase -->
    {nextPhase ? (
      <div class="pt-8 border-t border-slate-200 dark:border-[#30363d]">
        <a
          href={`/web3/phase/${nextPhase.id}`}
          class="inline-flex items-center gap-3 p-4 rounded-xl border border-indigo-200 dark:border-indigo-500/30 bg-indigo-50 dark:bg-indigo-500/5 hover:bg-indigo-100 dark:hover:bg-indigo-500/10 transition-colors group"
        >
          <div class="shrink-0 w-10 h-10 rounded-lg bg-indigo-500 text-white font-bold flex items-center justify-center">
            {nextPhase.id}
          </div>
          <div>
            <p class="text-xs text-slate-500 dark:text-slate-400 mb-0.5">下一篇</p>
            <p class="font-semibold text-slate-800 dark:text-white group-hover:text-indigo-600 dark:group-hover:text-indigo-400">
              阶段{nextPhase.id}：{nextPhase.title}
            </p>
          </div>
          <svg class="w-5 h-5 text-slate-400 ml-auto group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
            <path stroke-linecap="round" stroke-linejoin="round" d="M14 5l7 7m0 0l-7 7m7-7H3" />
          </svg>
        </a>
      </div>
    ) : (
      <div class="pt-8 border-t border-slate-200 dark:border-[#30363d]">
        <a
          href="/web3/roadmap"
          class="inline-flex items-center gap-2 font-mono text-sm text-indigo-600 dark:text-[#58a6ff] hover:text-indigo-700 dark:hover:text-[#79b8ff] transition-colors group"
        >
          <svg class="w-4 h-4 transition-transform group-hover:-translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
            <path stroke-linecap="round" stroke-linejoin="round" d="M10 19l-7-7m0 0l7-7m-7 7h18"/>
          </svg>
          返回完整路线图
        </a>
      </div>
    )}
  </div>
</ThreeColumnLayout>
```

---

## 五、报告页同步

### 5.1 更新 `/web3/report.astro`

**改动**：将报告内容按新 5 阶段重新组织，保持现有视觉风格

**重构方向**：

将现有报告页面从 Layer1/Layer2/DeFi/NFT/新兴技术 结构，改为与 5 阶段认知路线图对齐：

| 现有章节 | → | 新章节 |
|----------|---|--------|
| Bitcoin / 理论 | → | 阶段一：去中心化价值转移 |
| Ethereum / 智能合约 | → | 阶段二：去中心化计算 |
| DApp 开发 | → | 阶段三：去中心化应用 |
| DeFi | → | 阶段四：去中心化金融市场 |
| NFT / 治理 | → | 阶段五：去中心化组织 |

**保留元素**：
- Terminal chrome 头部
- 现有 GlossaryTerm 组件
- 暗色模式样式

**变更元素**：
- 章节结构按 5 阶段重新分组
- 各阶段 Header 使用 PainPointBlock 样式（核心问题引导）
- 在报告开头增加"5阶段认知路线图"总览链接

**TODO**：
- [ ] 读取现有 report.astro 内容
- [ ] 按上表映射关联网址
- [ ] 设计新报告结构的大纲
- [ ] 实施重构

---

## 六、TODO 清单

| # | 任务 | 文件 | 状态 |
|---|------|------|------|
| 1 | 创建 roadmap 数据文件 | `src/data/web3-roadmap-data.json` | ✅ |
| 2 | 创建工具函数 | `src/utils/web3Roadmap.ts` | ✅ |
| 3 | 创建进度组件 | `src/components/web3/Web3PhaseProgress.astro` | ✅ |
| 4 | 创建里程碑卡片组件 | `src/components/web3/MilestoneCard.astro` | ✅ |
| 5 | 创建 Hero 组件 | `src/components/web3/PhaseHero.astro` | ✅ |
| 6 | 创建痛点组件 | `src/components/web3/PainPointBlock.astro` | ✅ |
| 7 | 重构首页 | `src/pages/web3/index.astro` | ✅ |
| 8 | 重构 roadmap 页 | `src/pages/web3/roadmap.astro` | ✅ |
| 9 | 创建阶段详情页 | `src/pages/web3/phase/[n].astro` | ✅ |
| 10 | 同步报告页 | `src/pages/web3/report.astro` | ✅ |

---

## 七、注意事项

1. **JSON 加载**：JSON 文件放在 `src/data/` 下，通过 `import` 直接导入（而非 `fetch`）。`fetch('/data/...')` 在 `getStaticPaths` 中不可用。
2. **JSON 转义**：若 JSON 内容含中文引号 `"` `"`，需转义为 `\u201c` `\u201d`，否则 Vite JSON 解析报错。
3. **里程碑 ID**：格式为 `M{phaseId}.{milestoneIndex}`，用于锚点定位
4. **颜色映射**：`phase.color` 对应 Tailwind 颜色名称，需在 `PhaseHero.astro` 中映射到 gradient class
5. **暗色模式**：所有新组件均需同时支持 light/dark 模式，使用 `dark:` 前缀
6. **展开状态**：里程碑展开状态由 JS 控制，默认收起（`hidden` class）
