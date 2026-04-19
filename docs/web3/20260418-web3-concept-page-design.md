# Web3 Concept 页面设计文档

> **版本：** v2.0
> **日期：** 2026-04-18
> **状态：** 已实施

> **变更记录（v2.0）：** `conceptMeta` 从"固定 27 个"改为"元数据 + 自动兜底"：所有文章 tag 均生成独立 concept 页，有 metadata 的使用元数据，无 metadata 的自动生成名称。

---

## 1. 概述

### 1.1 目标

为每个 Web3 概念（如 Bitcoin、Ethereum、DeFi）创建独立的 `/web3/concept/[slug]` 页面，提供概念的深入介绍、相关文章列表及相关概念导航。

### 1.2 背景

当前 `/web3` 首页的概念卡片点击后仅跳转至 `/web3?tag=xxx` 过滤 URL，交互体验不够深入。用户需要一个专门的概念页面来系统了解某个主题。

### 1.3 改造范围

| 类型 | 文件 | 改动 |
|------|------|------|
| 新建 | `src/utils/web3Concepts.ts` | 共享 concept 元数据与工具函数 |
| 新建 | `src/pages/web3/concept/[slug].astro` | 动态路由，27 个静态页 |
| 修改 | `src/components/web3/Web3ConceptCards.astro` | import 来源变更 + href 链接更新 |

---

## 2. URL 设计

| 页面 | URL 格式 | 说明 |
|------|----------|------|
| 概念页 | `/web3/concept/{slug}` | slug = tag 小写，如 `bitcoin`、`ethereum`、`defi` |
| 概念卡链接（改前） | `/web3?tag={slug}` | 过滤模式 |
| 概念卡链接（改后） | `/web3/concept/{slug}` | 独立页面 |

**示例：**
- `/web3/concept/bitcoin` — 比特币概念页
- `/web3/concept/ethereum` — 以太坊概念页
- `/web3/concept/defi` — DeFi 概念页

---

## 3. 数据结构

### 3.1 ConceptMeta 接口

```typescript
// src/utils/web3Concepts.ts

interface ConceptMeta {
  name: string;           // 中文显示名，如 "比特币"
  nameEn: string;         // 英文全称，如 "Bitcoin"
  description?: string;    // 可选描述
  phaseId?: number;       // 所属阶段 1-5，0 表示通用/跨阶段
  color?: string;          // 主题色：indigo/purple/emerald/amber/pink
}
```

### 3.2 conceptMeta 完整数据

```typescript
export const conceptMeta: Record<string, ConceptMeta> = {
  'web3':        { name: 'Web3',           nameEn: 'Decentralized Web',                    phaseId: 0 },
  'blockchain':  { name: '区块链',          nameEn: 'Blockchain',                           phaseId: 1 },
  'bitcoin':     { name: '比特币',          nameEn: 'Bitcoin',                              phaseId: 1, color: 'indigo' },
  'ethereum':    { name: '以太坊',          nameEn: 'Ethereum',                             phaseId: 2, color: 'purple' },
  'defi':        { name: 'DeFi',            nameEn: 'Decentralized Finance',                 phaseId: 4, color: 'amber' },
  'nft':         { name: 'NFT',             nameEn: 'Non-Fungible Token',                   phaseId: 3, color: 'emerald' },
  'dao':         { name: 'DAO',             nameEn: 'Decentralized Autonomous Organization', phaseId: 5, color: 'pink' },
  'layer1':      { name: 'Layer1',         nameEn: 'Layer 1 Blockchain',                   phaseId: 1 },
  'layer2':      { name: 'Layer2',         nameEn: 'Layer 2 Scaling',                      phaseId: 2 },
  'solidity':    { name: 'Solidity',        nameEn: 'Solidity Language',                    phaseId: 3 },
  'evm':         { name: 'EVM',            nameEn: 'Ethereum Virtual Machine',              phaseId: 2 },
  'smart-contract': { name: '智能合约',      nameEn: 'Smart Contract',                       phaseId: 2 },
  'gas':         { name: 'Gas',             nameEn: 'Gas Fee',                              phaseId: 2 },
  'depin':       { name: 'DePIN',           nameEn: 'Decentralized Physical Infrastructure', phaseId: 0 },
  'rwa':         { name: 'RWA',             nameEn: 'Real World Assets',                    phaseId: 0 },
  'solana':      { name: 'Solana',          nameEn: 'Solana Blockchain',                    phaseId: 1 },
  'polygon':     { name: 'Polygon',         nameEn: 'Polygon',                              phaseId: 2 },
  'arbitrum':    { name: 'Arbitrum',        nameEn: 'Arbitrum',                             phaseId: 2 },
  'base':        { name: 'Base',            nameEn: 'Base',                                 phaseId: 2 },
  'optimism':    { name: 'Optimism',        nameEn: 'Optimism',                             phaseId: 2 },
  'wallet':      { name: '钱包',            nameEn: 'Wallet',                               phaseId: 0 },
  'metamask':    { name: 'MetaMask',        nameEn: 'MetaMask',                             phaseId: 0 },
  'uniswap':     { name: 'Uniswap',         nameEn: 'Uniswap',                              phaseId: 4 },
  'aave':        { name: 'Aave',            nameEn: 'Aave',                                 phaseId: 4 },
  'amm':         { name: 'AMM',             nameEn: 'Automated Market Maker',                phaseId: 4 },
  'consensus':   { name: '共识机制',        nameEn: 'Consensus Mechanism',                  phaseId: 1 },
  'pow':         { name: 'PoW',             nameEn: 'Proof of Work',                        phaseId: 1 },
  'pos':         { name: 'PoS',             nameEn: 'Proof of Stake',                        phaseId: 2 },
};
```

### 3.3 辅助函数

```typescript
export function getConceptMeta(slug: string): ConceptMeta | undefined {
  return conceptMeta[slug.toLowerCase()];
}

export function getPhaseColor(phaseId: number | undefined): string {
  const colors: Record<number, string> = {
    1: 'indigo',
    2: 'purple',
    3: 'emerald',
    4: 'amber',
    5: 'pink',
  };
  return phaseId ? colors[phaseId] || 'indigo' : 'indigo';
}
```

---

## 4. 页面结构

### 4.1 页面布局

```
┌─────────────────────────────────────────────────────┐
│ Concept Hero (带渐变背景 + 图标 + 标题)                │
│   - 概念图标（首字母圆形背景，按 color 上色）           │
│   - 中文名 + 英文名                                   │
│   - 阶段跳转链接（如"阶段1 →"）                       │
├─────────────────────────────────────────────────────┤
│ 相关概念标签                                          │
│   - 横排标签球，链接到其他 concept 页                 │
├─────────────────────────────────────────────────────┤
│ 文章列表                                             │
│   - ArticleListItem 组件展示                         │
│   - 按发布时间倒序                                    │
├─────────────────────────────────────────────────────┤
│ 返回链接                                             │
│   - "返回 Web3 专栏 →"                              │
└─────────────────────────────────────────────────────┘
```

### 4.2 颜色映射

| phaseId | color | 渐变 | 图标背景 |
|---------|-------|------|----------|
| 1 | indigo | `from-indigo-500/10 to-purple-500/10` | `bg-indigo-500` |
| 2 | purple | `from-purple-500/10 to-pink-500/10` | `bg-purple-500` |
| 3 | emerald | `from-emerald-500/10 to-teal-500/10` | `bg-emerald-500` |
| 4 | amber | `from-amber-500/10 to-orange-500/10` | `bg-amber-500` |
| 5 | pink | `from-pink-500/10 to-rose-500/10` | `bg-pink-500` |
| 0 / 无 | indigo | 默认 indigo | `bg-indigo-500` |

---

## 5. 组件清单

### 5.1 新建组件

#### ConceptHeroSection（内嵌于页面）
- 概念图标圆牌（首字符 + color 背景色）
- 标题：中英文
- 阶段跳转链接（可选，phaseId > 0 时显示）

#### RelatedConceptsSection
- 标签云展示，最多 8 个
- 每个标签链接到对应 `/web3/concept/{slug}`

#### ArticleListSection
- 复用现有 `ArticleListItem` 组件
- 空状态显示占位提示

### 5.2 复用组件

| 组件 | 用途 |
|------|------|
| `ThreeColumnLayout` | 页面布局 |
| `ArticleListItem` | 文章列表项 |

---

## 6. 数据流

### 6.1 构建时（getStaticPaths）

```
conceptMeta keys (27个)
    ↓
slugs = Object.keys(conceptMeta)
    ↓
slugs.map(slug => ({ params: { slug }, props: { conceptSlug: slug } }))
    ↓
生成 27 个静态路由
```

### 6.2 请求时（页面渲染）

```
slug (from params) + conceptSlug (from props)
    ↓
getConceptMeta(conceptSlug) → ConceptMeta | undefined
    ↓
getCollection('blog') → filter by tag
    ↓
conceptPosts[] + relatedConcepts Set
    ↓
渲染页面
```

---

## 7. 路由匹配规则

### 7.1 getStaticPaths 逻辑

- 遍历所有 blog 文章的 tag（去重）生成静态路径（**不再依赖 conceptMeta 列表**）
- slug 存在于 `conceptMeta` 时使用元数据；不存在时自动从 tag slug 生成显示名称（首字母大写）

### 7.2 过滤逻辑

```typescript
const conceptPosts = allPosts.filter(post => {
  const tags = post.data.tags?.map(t => t.toLowerCase()) || [];
  return tags.includes(conceptSlug.toLowerCase());
});
```

- 大小写不敏感（前端传入小写 slug，内部统一转小写比较）
- 多标签文章会出现在多个 concept 页

---

## 8. 相关概念计算

```typescript
const relatedConcepts = new Set<string>();
conceptPosts.forEach(post => {
  (post.data.tags || []).forEach(tag => {
    const lowerTag = tag.toLowerCase();
    if (lowerTag !== conceptSlug && conceptMeta[lowerTag]) {
      relatedConcepts.add(lowerTag);
    }
  });
});
```

- 基于同篇文章的标签共现关系
- 排除自身
- 只包含在 `conceptMeta` 中有定义的标签
- 最多显示 8 个

---

## 9. 导航链接更新

### 9.1 Web3ConceptCards.astro

**改前（line 120）：**
```astro
href={`/web3?tag=${concept.slug}`}
```

**改后：**
```astro
href={`/web3/concept/${concept.slug}`}
```

### 9.2 其他潜在影响点

| 文件 | 影响 | 说明 |
|------|------|------|
| `MilestoneCard.astro` | 无 | 已指向 `/blog/{slug}` |
| `index.astro` | 无 | 保留 `?tag=` 过滤逻辑作为 fallback |

---

## 10. 实施任务

### Task 1: 提取共享工具

1. 创建 `src/utils/web3Concepts.ts`，包含 `ConceptMeta` 接口、`conceptMeta` 数据、`getConceptMeta()`、`getPhaseColor()`
2. 修改 `Web3ConceptCards.astro`：删除内联 `conceptNames`，改为 import `conceptMeta` from utils
3. 提交：`refactor(web3): extract concept metadata to shared utils`

### Task 2: 创建动态路由

1. 创建 `src/pages/web3/concept/[slug].astro`
2. 实现 `getStaticPaths` 生成 27 个静态路径
3. 实现页面渲染：Hero → 相关概念 → 文章列表 → 返回链接
4. **注意：不要 import `roadmapData`，该数据在页面中未使用**
5. 更新 `Web3ConceptCards.astro` line 120 href
6. 提交：`feat(web3): add /web3/concept/[slug] dynamic concept pages`

### Task 3: 验证测试

1. 访问 `/web3/concept/bitcoin` 验证 Hero、阶段链接、相关文章
2. 访问 `/web3/concept/ethereum`、`/web3/concept/defi` 验证颜色和内容
3. 从 `/web3` 点击概念卡片，验证跳转到对应 concept 页
4. 访问不存在的 slug 如 `/web3/concept/nonexistent`，验证重定向至 `/web3`

---

## 11. 风险与注意事项

1. **构建产物增大**：动态生成所有 tag 的 concept 页（当前 200 个），构建时间增加
2. **conceptMeta 定位变更**：现在主要用于提供元数据（名称、颜色、阶段），兜底显示由 tag slug 自动生成
3. **phaseId = 0**：表示通用/跨阶段概念（如 web3、depin），不显示阶段跳转链接
4. **slug 大小写**：URL 使用小写，内部比较时统一转小写
