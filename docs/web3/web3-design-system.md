# Web3 页面设计系统

> 版本：1.0
> 日期：2026-04-18
> 来源：`/web3/report.astro`、`/web3/roadmap.astro`

本文档提取当前 Web3 频道的视觉设计要素，形成可复用的设计系统指南。

---

## 一、整体美学

**主题**：Terminal + GitHub Dark 混搭风格

不是传统的"技术文档"或"博客"风格，而是：
- 代码终端的冷峻感（`font-mono`、语法高亮色）
- GitHub 深色主题的克制优雅
- 科技感的装饰元素（发光节点、grid 背景）
- 保留了技术文档的专业性和可读性

---

## 二、色彩系统

### 2.1 主色调（GitHub Dark Palette）

| Token | Hex | 用途 |
|-------|-----|------|
| `accent-blue` | `#58a6ff` | 链接、主要强调、高亮文字 |
| `accent-green` | `#7ee787` | 成功状态、注释、 `$` 提示符 |
| `accent-orange` | `#f0883e` | 警告、重要数据、CTA 按钮 |
| `accent-purple` | `#d2a8ff` | 次要强调、代码高亮 |
| `accent-pink` | `#f778ba` | NFT/创作者相关 |

### 2.2 深色模式背景

| Token | Hex | 用途 |
|-------|-----|------|
| `dark-bg` | `#0d1117` | 主背景、代码块背景 |
| `dark-surface` | `#161b22` | 卡片、section 背景 |
| `dark-elevated` | `#21262d` | 标签、徽章背景 |
| `dark-border` | `#30363d` | 边框、分割线 |

### 2.3 浅色模式背景

| Token | Hex | 用途 |
|-------|-----|------|
| `light-bg` | `#ffffff` | 卡片背景 |
| `light-surface` | `#f8fafc` | 浅色 section 背景 |
| `light-border` | `#e2e8f0` | 边框 |

### 2.4 功能色

| 用途 | 深色模式 | 浅色模式 |
|------|----------|----------|
| 成功 | `text-emerald-400` | `text-emerald-600` |
| 警告 | `text-amber-400` | `text-amber-600` |
| 错误 | `text-red-400` | `text-red-600` |
| 信息 | `text-blue-400` | `text-blue-600` |

### 2.5 使用示例

```astro
<!-- 链接 -->
<a class="text-[#58a6ff] hover:text-[#79b8ff]">链接</a>

<!-- 成功状态 -->
<span class="text-[#7ee787]">✓ 完成</span>

<!-- 代码注释风格 -->
<span class="font-mono text-xs text-[#8b949e]">// 这是注释</span>

<!-- 深色卡片 -->
<div class="bg-[#161b22] rounded-lg border border-[#30363d]">
```

---

## 三、字体系统

### 3.1 主要字体

- **UI 文字**：`system-ui, -apple-system, sans-serif`
- **代码/终端**：`ui-monospace, 'Cascadia Code', 'Source Code Pro', monospace`

### 3.2 字号层级

| 用途 | 尺寸 | weight |
|------|-------|--------|
| 大标题（H1） | `text-3xl` / `text-4xl` | `font-black` |
| 区块标题（H2） | `text-xl` / `text-2xl` | `font-bold` |
| 卡片标题（H3） | `text-lg` | `font-bold` |
| 正文 | `text-sm` / `text-base` | `font-normal` |
| 注释/标签 | `text-xs` | `font-mono` |
| 终端输出 | `text-sm` | `font-mono` |

### 3.3 标题约定

```astro
<!-- 大标题：黑体 + 渐变 -->
<h1 class="text-4xl font-black tracking-tight">
  Web3 <span class="text-[#58a6ff]">深度研究</span>
</h1>

<!-- 区块标题：序号 + 标题 -->
<h2 class="text-2xl font-bold">
  <span class="text-[#7ee787] font-mono">01</span> 理论基础
</h2>

<!-- 子标题：序号 + 内容 -->
<h3 class="text-lg font-bold">
  <span class="text-[#58a6ff]">1.1</span> Web3 本质是 Layer1 吗？
</h3>
```

---

## 四、Terminal 头部模式

这是当前设计最独特的视觉签名。

### 4.1 标准结构（report 页）

```astro
<div class="rounded-lg border border-slate-200 dark:border-[#30363d] bg-white dark:bg-[#161b22] overflow-hidden transition-colors">
  <!-- Chrome bar -->
  <div class="flex items-center gap-2 px-4 py-3 bg-slate-100 dark:bg-[#0d1117] border-b border-slate-200 dark:border-[#30363d] transition-colors">
    <div class="w-3 h-3 rounded-full bg-red-400"></div>    <!-- 关闭 -->
    <div class="w-3 h-3 rounded-full bg-yellow-400"></div>   <!-- 最小化 -->
    <div class="w-3 h-3 rounded-full bg-green-400"></div>     <!-- 最大化 -->
    <span class="ml-4 text-xs font-mono text-slate-500 dark:text-[#8b949e]">research_report.sh</span>
  </div>
  <!-- Content -->
  <div class="p-6">
    <!-- ... -->
  </div>
</div>
```

**注意**：`bg-slate-100 dark:bg-[#0d1117]` 是关键组合，浅色模式用灰色头部，不是纯透明。

### 4.2 变体

**无关闭按钮（report 页）**：
```astro
<!-- 只有 3 个圆点，无标题 -->
<div class="w-3 h-3 rounded-full bg-red-400"></div>
<div class="w-3 h-3 rounded-full bg-yellow-400"></div>
<div class="w-3 h-3 rounded-full bg-green-400"></div>
<span class="ml-4 text-xs font-mono text-[#8b949e]">research_report.sh</span>
```

**首页 Hero（web3/index）**：
```astro
<!-- 使用 16 进制暗色，不带边框 -->
<div class="absolute inset-0 bg-[#0d1117]">
  <!-- grid pattern overlay -->
</div>
```

---

## 五、Grid Pattern 背景

### 5.1 实现方式

```astro
<div class="relative overflow-hidden rounded-xl">
  <div class="absolute inset-0 bg-[#0d1117]">
    <svg class="absolute inset-0 w-full h-full opacity-[0.07]" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
          <path d="M 40 0 L 0 0 0 40" fill="none" stroke="#58a6ff" stroke-width="0.5"/>
        </pattern>
      </defs>
      <rect width="100%" height="100%" fill="url(#grid)" />
    </svg>
  </div>
  <!-- Decorative nodes -->
  <div class="absolute top-6 left-6 w-2 h-2 rounded-full bg-[#58a6ff] opacity-60 animate-pulse"></div>
  <!-- Content -->
  <div class="relative p-8">...</div>
</div>
```

### 5.2 参数

| 参数 | 值 | 说明 |
|------|-----|------|
| grid size | 40px | 格子大小 |
| stroke width | 0.5 | 线条粗细 |
| opacity | 0.04-0.07 | 暗色模式下 |
| color | `#58a6ff` 或 `currentColor` | 线条颜色 |

---

## 六、Section 结构模式

### 6.1 标准 Section 头部（report 页）

```astro
<section id="theory" class="mb-16 scroll-mt-8">
  <div class="flex items-center gap-3 mb-6">
    <!-- 序号：纯文字，无背景 -->
    <span class="font-mono text-sm text-[#7ee787]">01</span>
    <!-- 标题 -->
    <h2 class="text-2xl font-bold text-slate-900 dark:text-white">理论基础</h2>
    <!-- 分隔符 -->
    <span class="text-slate-300 dark:text-[#30363d]">|</span>
    <!-- 模块名 -->
    <span class="text-slate-500 dark:text-[#8b949e] text-sm font-mono">core_concepts</span>
  </div>
</section>
```

**说明**：report 页的 Section header 用纯文字序号，不需要圆形背景。渐变数字圆形是 **Roadmap Phase 专用**（见 6.3）。

### 6.2 Section 内容容器

```astro
<div class="pl-4 border-l-2 border-emerald-500 dark:border-[#238636] space-y-8">
  <!-- 内容项 -->
</div>
```

**颜色对应**：

| Section | 颜色 |
|---------|------|
| 理论基础 | `emerald` |
| Layer1 | `blue` |
| Layer2 | `purple` |
| DeFi | `amber` |
| NFT | `pink` |
| 新赛道 | `cyan` |
| 结论 | `emerald` |

### 6.3 Roadmap Phase 头部（Roadmap 专用）

Roadmap 详情页每个阶段使用渐变数字圆形，不是通用 Section 模式：

```astro
<div class="flex items-center gap-4 mb-6">
  <!-- 渐变圆形序号 -->
  <div class:list={[
    "flex items-center justify-center w-12 h-12 rounded-xl",
    "bg-gradient-to-br text-white font-black font-mono text-xl shadow-lg",
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
```

**颜色映射**：

| Phase | 渐变 |
|-------|-------|
| 阶段一（Bitcoin） | `indigo` → `purple` |
| 阶段二（Ethereum） | `purple` → `pink` |
| 阶段三（DApp） | `emerald` → `teal` |
| 阶段四（DeFi） | `amber` → `orange` |
| 阶段五（DAO） | `pink` → `rose` |

---

## 七、内容卡片模式

### 7.1 标准卡片

```astro
<div class="bg-slate-50 dark:bg-[#0d1117] rounded-lg p-5 border border-slate-200 dark:border-[#30363d] transition-colors">
  <p class="text-slate-700 dark:text-[#c9d1d9]">
    正文内容
  </p>
</div>
```

### 7.2 带左边框强调的卡片

```astro
<div class="p-4 bg-white dark:bg-[#161b22] rounded-lg border-l-2 border-amber-500">
  <p class="font-bold text-slate-900 dark:text-white mb-2">标题</p>
  <p class="text-sm text-slate-600 dark:text-[#8b949e]">内容</p>
</div>
```

### 7.3 网格布局卡片

```astro
<div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
  <div class="p-4 bg-white dark:bg-[#161b22] rounded-lg border border-slate-200 dark:border-[#30363d]">
    <!-- 单个卡片内容 -->
  </div>
</div>
```

### 7.4 状态徽章卡片

```astro
<div class="p-5 bg-white dark:bg-[#161b22] rounded-lg border-l-2 border-emerald-500">
  <div class="flex items-start justify-between mb-4">
    <div>
      <span class="font-mono text-xs text-emerald-600 dark:text-emerald-400 mb-1 block">TRACK A</span>
      <h3 class="text-xl font-bold text-slate-900 dark:text-white">DeFi 开发者</h3>
    </div>
    <div class="w-10 h-10 rounded-lg bg-emerald-100 dark:bg-emerald-500/20 flex items-center justify-center">
      <!-- 图标 -->
    </div>
  </div>
  <p class="text-sm text-slate-600 dark:text-[#8b949e] mb-4">描述文字</p>
  <div class="space-y-2 mb-4">
    <!-- 列表项 -->
  </div>
  <div class="p-3 rounded-lg bg-slate-50 dark:bg-[#0d1117] border border-slate-200 dark:border-[#30363d]">
    <p class="font-mono text-xs text-slate-500 dark:text-[#8b949e]">市场薪资参考</p>
    <p class="font-mono text-lg text-emerald-600 dark:text-emerald-400 font-bold">$150-300k / 年</p>
  </div>
</div>
```

---

## 八、标签/徽章模式

### 8.1 标签芯片

```astro
<!-- 默认标签 -->
<span class="inline-flex items-center gap-1 text-xs px-2 py-1 rounded bg-slate-100 dark:bg-[#21262d] text-slate-600 dark:text-slate-300">
  Bitcoin
</span>

<!-- 彩色标签 -->
<span class="px-2 py-1 bg-indigo-100 dark:bg-indigo-500/20 text-indigo-700 dark:text-indigo-300 rounded text-xs font-mono">
  TVL $55B+
</span>
```

### 8.2 序号圆形

```astro
<!-- 小号（用于 milestone） -->
<div class="w-8 h-8 rounded-full bg-slate-100 dark:bg-[#0d1117] border-2 border-indigo-500 flex items-center justify-center">
  <span class="font-mono text-xs text-indigo-600 dark:text-indigo-400 font-bold">M1</span>
</div>

<!-- 中号（用于 section header） -->
<div class="w-10 h-10 rounded-lg bg-gradient-to-br from-indigo-500 to-purple-600 text-white font-black font-mono text-lg shadow-lg">
  01
</div>

<!-- 大号（用于 Hero） -->
<div class="w-14 h-14 rounded-xl bg-gradient-to-br from-indigo-500 to-purple-600 text-white font-black font-mono text-2xl shadow-lg">
  1
</div>
```

---

## 九、代码/终端块模式

### 9.1 深色代码块

```astro
<div class="font-mono text-xs bg-[#0d1117] p-4 rounded border border-[#30363d]">
  <p class="text-[#7ee787] mb-2">// 注释行</p>
  <p class="text-[#c9d1d9]">
    <span class="text-[#58a6ff]">Aave</span> (借贷)
  </p>
</div>
```

**注意**：`bg-[#0d1117]` 在 dark 模式下本身就是深色，不需要 `dark:` 覆盖。

### 9.2 内联代码

```astro
<p class="text-sm text-slate-600 dark:text-[#8b949e]">
  <span class="font-mono text-amber-600 dark:text-amber-400">BTC (UTXO)</span>：每笔交易消耗旧输出
</p>
```

### 9.3 Terminal 输出风格

```astro
<div class="font-mono text-sm text-emerald-600 dark:text-[#7ee787] mb-2">
  $ cat web3_research_2026.md
</div>
```

---

## 十、比较表格模式

### 10.1 技术对比表

```astro
<div class="overflow-x-auto">
  <table class="w-full text-sm font-mono">
    <thead class="bg-slate-100 dark:bg-[#161b22]">
      <tr class="text-left text-slate-500 dark:text-[#8b949e]">
        <th class="py-2 px-3">维度</th>
        <th class="py-2 px-3 text-purple-600 dark:text-purple-400">Solana</th>
        <th class="py-2 px-3 text-indigo-600 dark:text-indigo-400">Ethereum</th>
      </tr>
    </thead>
    <tbody class="text-slate-700 dark:text-[#c9d1d9]">
      <tr class="border-t border-slate-200 dark:border-[#21262d]">
        <td class="py-2 px-3">TPS</td>
        <td class="py-2 px-3 text-purple-600 dark:text-purple-400">65,000</td>
        <td class="py-2 px-3 text-indigo-600 dark:text-indigo-400">~30</td>
      </tr>
    </tbody>
  </table>
</div>
```

---

## 十一、进度条模式

### 11.1 简单进度条

```astro
<div class="flex items-center gap-4">
  <span class="font-bold text-slate-900 dark:text-white w-28">Arbitrum</span>
  <div class="flex-1 bg-slate-200 dark:bg-[#30363d] rounded-full h-2">
    <div class="bg-indigo-500 h-2 rounded-full" style="width: 45%"></div>
  </div>
  <span class="text-sm text-slate-600 dark:text-[#8b949e] w-20 text-right">TVL $7.8B</span>
</div>
```

### 11.2 Roadmap 进度条

```astro
<div class="h-1.5 bg-slate-200 dark:bg-[#21262d] rounded-full overflow-hidden">
  <div
    class="h-full rounded-full transition-all duration-500"
    style="width: 60%"
    classList={[
      isCompleted && "bg-emerald-500",
      isCurrent && "bg-indigo-500",
      !isCompleted && !isCurrent && "bg-slate-400"
    ]}
  />
</div>
```

---

## 十二、导航/锚点模式

### 12.1 In-page 锚点导航

```astro
<nav class="flex flex-wrap gap-4 text-sm font-mono">
  <a href="#theory" class="text-[#58a6ff] hover:text-[#79b8ff]">→ 01_理论基础</a>
  <a href="#layer1" class="text-[#58a6ff] hover:text-[#79b8ff]">→ 02_Layer1</a>
</nav>
```

### 12.2 里程碑锚点

```html
<div id={`milestone-${milestone.id}`}>
  <!-- milestone content -->
</div>
```

---

## 十三、Timeline/连接线模式

### 13.1 左侧竖线

```astro
<!-- Section 内容容器 -->
<div class="pl-4 border-l-2 border-emerald-500 space-y-8">
  <!-- 单项 -->
  <div class="relative">
    <!-- 圆点 -->
    <div class="absolute -left-[21px] w-3 h-3 rounded-full bg-emerald-500"></div>
    <!-- 内容 -->
    <h3 class="text-lg font-bold ...">标题</h3>
  </div>
</div>
```

### 13.2 Roadmap 渐变连接线

```astro
<!-- 在 section 之间 -->
<div class="absolute left-6 top-20 bottom-0 w-0.5 bg-gradient-to-b from-indigo-500 via-purple-500 to-amber-500 opacity-20 dark:opacity-30"></div>
```

---

## 十四、暗色模式适配规则

### 14.1 核心原则

每个颜色类同时提供 light 和 dark 版本：

```astro
<!-- 背景色 -->
bg-white dark:bg-[#161b22]

<!-- 文字色 -->
text-slate-900 dark:text-white

<!-- 边框 -->
border-slate-200 dark:border-[#30363d]

<!-- hover -->
hover:border-[#58a6ff]/50 dark:hover:border-[#58a6ff]/50
```

### 14.2 常用颜色映射

| 用途 | Light | Dark |
|------|-------|------|
| 主文字 | `slate-900` | `white` |
| 次要文字 | `slate-600` | `#8b949e` |
| 边框 | `slate-200` | `#30363d` |
| 卡片背景 | `white` | `#161b22` |
| 代码背景 | `#0d1117` | `#0d1117` |

---

## 十五、交互动效

### 15.1 卡片 Hover

```astro
<div class="... transition-all duration-300 hover:shadow-lg hover:border-indigo-500/50">
```

### 15.2 链接动画

```astro
<a class="... transition-colors group">
  <svg class="w-4 h-4 transition-transform group-hover:translate-x-1" />
</a>
```

### 15.3 展开/收起

```astro
<!-- 默认状态 -->
<div class="hidden" data-expand-content>

<!-- Icon 旋转 -->
<div class="transition-transform duration-200 rotate-180" data-expand-icon>

<!-- JS -->
<script>
  toggle.addEventListener('click', () => {
    content.classList.toggle('hidden');
    icon.classList.toggle('rotate-180');
  });
</script>
```

---

## 十五（续）、MilestoneCard 展开卡片

用于 Roadmap 详情页和阶段详情页，点击里程碑展开笔记摘要。

### 十五（续）.1 结构

```astro
<div class="group relative bg-white dark:bg-[#161b22] rounded-xl border border-slate-200 dark:border-[#30363d] overflow-hidden transition-all duration-300 hover:border-indigo-500/50"
  data-milestone-card>

  <!-- 收起态：标题 + 状态 -->
  <button type="button" class="w-full text-left p-5 flex items-start gap-4 cursor-pointer"
    data-expand-toggle>
    <!-- 状态图标 -->
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

    <!-- 内容 -->
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
        <p class="text-sm text-indigo-600 dark:text-indigo-400 truncate">{articleTitle}</p>
      )}
    </div>

    <!-- 展开 Icon -->
    <div class="shrink-0 transition-transform duration-200" data-expand-icon>
      <svg class="w-5 h-5 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
        <path stroke-linecap="round" stroke-linejoin="round" d="M12 6v12m6-6H6" />
      </svg>
    </div>
  </button>

  <!-- 展开态：笔记摘要 + 链接 -->
  <div class="hidden px-5 pb-5" data-expand-content>
    <div class="ml-12 border-t border-slate-100 dark:border-[#30363d] pt-4 space-y-3">
      {hasArticle && articleDescription ? (
        <>
          <div>
            <p class="text-xs text-slate-500 dark:text-slate-400 mb-1">笔记摘要</p>
            <p class="text-sm text-slate-600 dark:text-slate-300 leading-relaxed">{articleDescription}</p>
          </div>
          <a href={`/web3/article/${articleSlug}`} class="inline-flex items-center gap-1 text-sm text-indigo-600 dark:text-indigo-400 hover:underline">
            查看完整文章 →
          </a>
        </>
      ) : (
        <p class="text-sm text-slate-500 dark:text-slate-400 italic">暂无关联文章，可先阅读相关资料</p>
      )}
    </div>
  </div>
</div>
```

### 十五（续）.2 完成态视觉

`status === 'done'` 时的特殊处理：

- 左边框：`border-emerald-500`（hover 时显示）
- 状态图标：绿色圆形背景 + 白色勾选 SVG
- 标题颜色：`text-slate-900 dark:text-white`

```astro
<!-- 完成态：左边框高亮 -->
<div class="... hover:border-emerald-500/50 dark:hover:border-emerald-500/50">
```

### 十五（续）.3 JS 逻辑

```html
<script>
  document.querySelectorAll('[data-milestone-card]').forEach(card => {
    const toggle = card.querySelector('[data-expand-toggle]');
    const content = card.querySelector('[data-expand-content]');
    const icon = card.querySelector('[data-expand-icon]');

    toggle?.addEventListener('click', () => {
      const isHidden = content.classList.contains('hidden');
      content.classList.toggle('hidden');
      if (isHidden) {
        icon.classList.add('rotate-180');
      } else {
        icon.classList.remove('rotate-180');
      }
    });
  });
</script>
```

---

## 十五（续二）、PainPointBlock 痛点区块

用于 Roadmap 页面，展示阶段的痛点叙述。

### 十五（续二）.1 结构

```astro
<div class="mb-6 p-5 rounded-xl border border-amber-200 dark:border-amber-500/30 bg-amber-50 dark:bg-amber-500/5">
  <div class="flex items-start gap-3 mb-3">
    <!-- 警告图标 -->
    <div class="shrink-0 w-7 h-7 rounded-full bg-amber-100 dark:bg-amber-500/20 flex items-center justify-center">
      <svg class="w-3.5 h-3.5 text-amber-600 dark:text-amber-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
        <path stroke-linecap="round" stroke-linejoin="round" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
      </svg>
    </div>
    <p class="text-sm font-medium text-amber-800 dark:text-amber-200">痛点</p>
  </div>
  <p class="text-slate-700 dark:text-slate-200 text-sm leading-relaxed mb-2">
    {phase.painPoint}
  </p>
  <p class="text-xs text-amber-700 dark:text-amber-300">
    <span class="font-semibold">为什么？</span> {phase.painRoot}
  </p>
</div>
```

### 十五（续二）.2 核心样式参数

| 参数 | 浅色 | 深色 |
|------|------|------|
| 边框 | `border-amber-200` | `dark:border-amber-500/30` |
| 背景 | `bg-amber-50` | `dark:bg-amber-500/5` |
| 图标背景 | `bg-amber-100` | `dark:bg-amber-500/20` |
| 文字主色 | `text-amber-800` | `dark:text-amber-200` |
| 文字次色 | `text-amber-700` | `dark:text-amber-300` |

---

## 十六、组件清单

| 组件 | 用途 | 复用场景 |
|------|------|----------|
| `TerminalHeader` | 模拟终端窗口头部 | 任何需要"Terminal 风格"的地方 |
| `GridBackground` | Grid pattern + 发光节点 | Hero section |
| `SectionHeader` | 序号 + 标题 + 模块名 | report 页所有 section |
| `PhaseHeader` | 渐变数字圆形 + 标题 | Roadmap Phase 头部 |
| `ContentCard` | 标准内容卡片 | 任意内容块 |
| `AccentBorderCard` | 左边框强调卡片 | 比较、优势列表 |
| `ComparisonTable` | 技术对比表 | 方案对比 |
| `ProgressBar` | 带标签的进度条 | 数据展示 |
| `MilestoneCard` | 可展开的里程碑卡片 | Roadmap / 阶段详情页 |
| `MilestoneNode` | 左侧 timeline 圆点 | Roadmap / 时间线 |
| `StatusBadge` | 状态标签 | 里程碑、文章状态 |
| `CodeBlock` | 深色代码块 | 代码、命令展示 |
| `PainPointBlock` | 警告风格痛点块 | 痛点展示 |
| `GlossaryTerm` | 术语悬浮提示 | Web3 专业术语解释 |

### 16.1 GlossaryTerm 组件

**文件**：`src/components/web3/GlossaryTerm.astro`

**用途**：鼠标悬停显示术语解释，用于 report 页大量 Web3 专业术语

**使用方式**：
```astro
<GlossaryTerm term="EVM" />
<GlossaryTerm term="Layer2" />
<GlossaryTerm term="DeFi" />
```

**行为**：
- 鼠标悬停时显示 tooltip
- 术语本身有下划虚线标识
- Tooltip 展示术语的定义

**典型样式**：
```astro
<!-- 浅色模式 -->
<span class="border-b border-dotted border-slate-400 cursor-help" title="解释文字">
  术语
</span>

<!-- 深色模式 -->
<span class="dark:border-b dark:border-dotted dark:border-[#58a6ff] dark:text-[#58a6ff]">
  术语
</span>
```

---

## 十七、CSS 变量（全局）

如需在 `globals.css` 中定义：

```css
:root {
  --color-accent-blue: #58a6ff;
  --color-accent-green: #7ee787;
  --color-accent-orange: #f0883e;
  --color-accent-purple: #d2a8ff;
  --color-dark-bg: #0d1117;
  --color-dark-surface: #161b22;
  --color-dark-elevated: #21262d;
  --color-dark-border: #30363d;
}
```
