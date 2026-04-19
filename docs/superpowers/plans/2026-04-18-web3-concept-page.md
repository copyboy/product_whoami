# Web3 Concept Page Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Create a dedicated `/web3/concept/[slug]` dynamic page for each Web3 concept (e.g., `/web3/concept/bitcoin`), showing concept details and all related articles.

**Architecture:** Extract `conceptNames` mapping from `Web3ConceptCards.astro` into a shared utils file (`src/utils/web3Concepts.ts`), then create a dynamic route that filters blog posts by tag and displays concept info, related posts, and cross-links to learning phases.

**Tech Stack:** Astro, TypeScript, existing `ThreeColumnLayout`, existing `ArticleListItem` component

---

## File Structure

```
src/
├── utils/
│   └── web3Concepts.ts          # NEW: Shared concept metadata & helper functions
├── pages/web3/
│   └── concept/
│       └── [slug].astro         # NEW: Dynamic concept page
└── components/web3/
    └── Web3ConceptCards.astro    # MODIFY: Import from shared utils
```

---

## Task 1: Extract concept metadata to shared utils

**Files:**
- Create: `src/utils/web3Concepts.ts`
- Modify: `src/components/web3/Web3ConceptCards.astro:21-50`

- [ ] **Step 1: Create web3Concepts.ts**

```typescript
// src/utils/web3Concepts.ts

export interface ConceptMeta {
  name: string;
  nameEn: string;
  description?: string;
  phaseId?: number; // Which phase this concept belongs to (1-5)
  color?: string; // Theme color for the concept
}

// Web3 concept name mapping (English to display name)
export const conceptMeta: Record<string, ConceptMeta> = {
  'web3': { name: 'Web3', nameEn: 'Decentralized Web', phaseId: 0 },
  'blockchain': { name: '区块链', nameEn: 'Blockchain', phaseId: 1 },
  'bitcoin': { name: '比特币', nameEn: 'Bitcoin', phaseId: 1, color: 'indigo' },
  'ethereum': { name: '以太坊', nameEn: 'Ethereum', phaseId: 2, color: 'purple' },
  'defi': { name: 'DeFi', nameEn: 'Decentralized Finance', phaseId: 4, color: 'amber' },
  'nft': { name: 'NFT', nameEn: 'Non-Fungible Token', phaseId: 3, color: 'emerald' },
  'dao': { name: 'DAO', nameEn: 'Decentralized Autonomous Organization', phaseId: 5, color: 'pink' },
  'layer1': { name: 'Layer1', nameEn: 'Layer 1 Blockchain', phaseId: 1 },
  'layer2': { name: 'Layer2', nameEn: 'Layer 2 Scaling', phaseId: 2 },
  'solidity': { name: 'Solidity', nameEn: 'Solidity Language', phaseId: 3 },
  'evm': { name: 'EVM', nameEn: 'Ethereum Virtual Machine', phaseId: 2 },
  'smart-contract': { name: '智能合约', nameEn: 'Smart Contract', phaseId: 2 },
  'gas': { name: 'Gas', nameEn: 'Gas Fee', phaseId: 2 },
  'depin': { name: 'DePIN', nameEn: 'Decentralized Physical Infrastructure', phaseId: 0 },
  'rwa': { name: 'RWA', nameEn: 'Real World Assets', phaseId: 0 },
  'solana': { name: 'Solana', nameEn: 'Solana Blockchain', phaseId: 1 },
  'polygon': { name: 'Polygon', nameEn: 'Polygon', phaseId: 2 },
  'arbitrum': { name: 'Arbitrum', nameEn: 'Arbitrum', phaseId: 2 },
  'base': { name: 'Base', nameEn: 'Base', phaseId: 2 },
  'optimism': { name: 'Optimism', nameEn: 'Optimism', phaseId: 2 },
  'wallet': { name: '钱包', nameEn: 'Wallet', phaseId: 0 },
  'metamask': { name: 'MetaMask', nameEn: 'MetaMask', phaseId: 0 },
  'uniswap': { name: 'Uniswap', nameEn: 'Uniswap', phaseId: 4 },
  'aave': { name: 'Aave', nameEn: 'Aave', phaseId: 4 },
  'amm': { name: 'AMM', nameEn: 'Automated Market Maker', phaseId: 4 },
  'consensus': { name: '共识机制', nameEn: 'Consensus Mechanism', phaseId: 1 },
  'pow': { name: 'PoW', nameEn: 'Proof of Work', phaseId: 1 },
  'pos': { name: 'PoS', nameEn: 'Proof of Stake', phaseId: 2 },
};

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

- [ ] **Step 2: Update Web3ConceptCards.astro to use shared utils**

Replace lines 21-50 in `Web3ConceptCards.astro` with:

```astro
---
import { conceptMeta } from '@utils/web3Concepts';

const { posts, activeTag } = Astro.props;

// Use conceptMeta from shared utils instead of inline object
```

And update the references from `conceptNames[slug]` to `conceptMeta[slug]`.

- [ ] **Step 3: Commit**

```bash
git add src/utils/web3Concepts.ts src/components/web3/Web3ConceptCards.astro
git commit -m "refactor(web3): extract concept metadata to shared utils"
```

---

## Task 2: Create concept page dynamic route

**Files:**
- Create: `src/pages/web3/concept/[slug].astro`
- Modify: `src/components/web3/Web3ConceptCards.astro:120` (update href)

- [ ] **Step 1: Create the dynamic route file**

```astro
---
import ThreeColumnLayout from '@layouts/ThreeColumnLayout.astro';
import ArticleListItem from '@components/ArticleListItem.astro';
import { getCollection } from 'astro:content';
import { conceptMeta, getConceptMeta, getPhaseColor } from '@utils/web3Concepts';

export function getStaticPaths() {
  // Generate paths for all concepts that have metadata
  const slugs = Object.keys(conceptMeta);

  return slugs.map(slug => ({
    params: { slug },
    props: { conceptSlug: slug }
  }));
}

const { slug } = Astro.params;
const { conceptSlug } = Astro.props;

const meta = getConceptMeta(conceptSlug);
if (!meta) {
  return Astro.redirect('/web3');
}

const color = meta.color || getPhaseColor(meta.phaseId);

// Get all posts and filter by tag
const allPosts = await getCollection('blog', ({ data }) => {
  return import.meta.env.PROD ? !data.draft : true;
});

const conceptPosts = allPosts
  .filter(post => {
    const tags = post.data.tags?.map(t => t.toLowerCase()) || [];
    return tags.includes(conceptSlug.toLowerCase());
  })
  .sort((a, b) => b.data.pubDate.getTime() - a.data.pubDate.getTime());

// Get related concepts (tags that co-occur)
const relatedConcepts = new Set<string>();
conceptPosts.forEach(post => {
  (post.data.tags || []).forEach(tag => {
    const lowerTag = tag.toLowerCase();
    if (lowerTag !== conceptSlug && conceptMeta[lowerTag]) {
      relatedConcepts.add(lowerTag);
    }
  });
});
---

<ThreeColumnLayout
  title={`${meta.name} | Web3 Concept | Gerrad's Digital Garden`}
  description={`${meta.nameEn} - ${meta.name} 相关文章和学习资源`}
>
  <div class="space-y-8">
    <!-- Concept Hero -->
    <header class="relative overflow-hidden rounded-xl border border-slate-200 dark:border-[#30363d]">
      <div class:list={[
        "absolute inset-0 bg-gradient-to-br",
        color === 'indigo' && "from-indigo-500/10 to-purple-500/10 dark:from-indigo-500/5 dark:to-purple-500/5",
        color === 'purple' && "from-purple-500/10 to-pink-500/10 dark:from-purple-500/5 dark:to-pink-500/5",
        color === 'emerald' && "from-emerald-500/10 to-teal-500/10 dark:from-emerald-500/5 dark:to-teal-500/5",
        color === 'amber' && "from-amber-500/10 to-orange-500/10 dark:from-amber-500/5 dark:to-orange-500/5",
        color === 'pink' && "from-pink-500/10 to-rose-500/10 dark:from-pink-500/5 dark:to-rose-500/5",
      ]}></div>
      <div class="relative p-8">
        <div class="flex items-center gap-3 mb-4">
          <div class:list={[
            "w-16 h-16 rounded-xl flex items-center justify-center text-white font-bold text-2xl",
            color === 'indigo' && "bg-indigo-500",
            color === 'purple' && "bg-purple-500",
            color === 'emerald' && "bg-emerald-500",
            color === 'amber' && "bg-amber-500",
            color === 'pink' && "bg-pink-500",
          ]}>
            {meta.name.charAt(0)}
          </div>
          <div>
            <h1 class="text-3xl font-bold text-slate-900 dark:text-white">{meta.name}</h1>
            <p class="text-slate-500 dark:text-slate-400 font-mono">{meta.nameEn}</p>
          </div>
        </div>

        {meta.phaseId && meta.phaseId > 0 && (
          <a
            href={`/web3/phase/${meta.phaseId}`}
            class:list={[
              "inline-flex items-center gap-2 text-sm px-3 py-1.5 rounded-full border transition-colors",
              color === 'indigo' && "border-indigo-200 dark:border-indigo-500/30 text-indigo-600 dark:text-indigo-400 hover:bg-indigo-50 dark:hover:bg-indigo-500/10",
              color === 'purple' && "border-purple-200 dark:border-purple-500/30 text-purple-600 dark:text-purple-400 hover:bg-purple-50 dark:hover:bg-purple-500/10",
              color === 'emerald' && "border-emerald-200 dark:border-emerald-500/30 text-emerald-600 dark:text-emerald-400 hover:bg-emerald-50 dark:hover:bg-emerald-500/10",
              color === 'amber' && "border-amber-200 dark:border-amber-500/30 text-amber-600 dark:text-amber-400 hover:bg-amber-50 dark:hover:bg-amber-500/10",
              color === 'pink' && "border-pink-200 dark:border-pink-500/30 text-pink-600 dark:text-pink-400 hover:bg-pink-50 dark:hover:bg-pink-500/10",
            ]}
          >
            <span class="font-mono">阶段{meta.phaseId}</span>
            <svg class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
              <path stroke-linecap="round" stroke-linejoin="round" d="M14 5l7 7m0 0l-7 7m7-7H3" />
            </svg>
          </a>
        )}
      </div>
    </header>

    <!-- Related Concepts -->
    {relatedConcepts.size > 0 && (
      <div>
        <h2 class="text-lg font-bold text-slate-900 dark:text-white mb-3">相关概念</h2>
        <div class="flex flex-wrap gap-2">
          {Array.from(relatedConcepts).slice(0, 8).map(relSlug => {
            const relMeta = conceptMeta[relSlug];
            return relMeta ? (
              <a
                href={`/web3/concept/${relSlug}`}
                class="text-sm px-3 py-1.5 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 border border-slate-200 dark:border-slate-700 hover:border-indigo-300 dark:hover:border-indigo-500/50 transition-colors"
              >
                {relMeta.name}
              </a>
            ) : null;
          })}
        </div>
      </div>
    )}

    <!-- Articles -->
    <div>
      <div class="flex justify-between items-center mb-4">
        <h2 class="text-xl font-bold text-slate-900 dark:text-white">
          文章
        </h2>
        <span class="text-sm text-slate-500">{conceptPosts.length} 篇</span>
      </div>

      {conceptPosts.length > 0 ? (
        <div class="space-y-4">
          {conceptPosts.map((post) => (
            <ArticleListItem
              title={post.data.title}
              description={post.data.description}
              pubDate={post.data.pubDate}
              updatedDate={post.data.updatedDate}
              tags={post.data.tags}
              author={post.data.author}
              slug={post.slug}
            />
          ))}
        </div>
      ) : (
        <div class="text-center py-12 bg-slate-50 dark:bg-slate-800 rounded-lg">
          <p class="text-slate-500 dark:text-slate-400">暂无相关文章</p>
          <p class="text-sm text-slate-400 dark:text-slate-500 mt-2">
            开始写你的第一篇 {meta.name} 学习笔记吧
          </p>
        </div>
      )}
    </div>

    <!-- Back link -->
    <div class="pt-6 border-t border-slate-200 dark:border-[#30363d]">
      <a href="/web3" class="inline-flex items-center gap-2 text-sm text-indigo-600 dark:text-[#58a6ff] hover:text-indigo-700 dark:hover:text-[#79b8ff] transition-colors">
        <svg class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
          <path stroke-linecap="round" stroke-linejoin="round" d="M10 19l-7-7m0 0l7-7m-7 7h18"/>
        </svg>
        返回 Web3 专栏
      </a>
    </div>
  </div>
</ThreeColumnLayout>
```

- [ ] **Step 2: Update Web3ConceptCards.astro href**

In `src/components/web3/Web3ConceptCards.astro` line 120, change:
```astro
href={`/web3?tag=${concept.slug}`}
```
to:
```astro
href={`/web3/concept/${concept.slug}`}
```

- [ ] **Step 3: Commit**

```bash
git add src/pages/web3/concept/[slug].astro src/components/web3/Web3ConceptCards.astro
git commit -m "feat(web3): add /web3/concept/[slug] dynamic concept pages"
```

---

## Task 3: Verify and test

**Files:**
- Browse: `http://localhost:4321/web3/concept/bitcoin`
- Browse: `http://localhost:4321/web3/concept/ethereum`
- Browse: `http://localhost:4321/web3/concept/defi`
- Click concept card on `http://localhost:4321/web3` and verify navigation

- [ ] **Step 1: Test concept pages**

Open `http://localhost:4321/web3/concept/bitcoin` and verify:
- [ ] Hero shows "比特币" with correct color
- [ ] "阶段1" link appears and goes to `/web3/phase/1`
- [ ] Related concepts are shown (e.g., blockchain, defi, ethereum)
- [ ] Article list shows bitcoin-whitepaper-deep-dive article
- [ ] "返回 Web3 专栏" link works

- [ ] **Step 2: Test navigation from index**

On `http://localhost:4321/web3`:
- [ ] Click any concept card (e.g., "比特币")
- [ ] Verify URL changes to `/web3/concept/bitcoin`
- [ ] Verify page loads correctly

- [ ] **Step 3: Commit**

```bash
git commit -m "docs: update implementation plan status"
```

---

## Self-Review Checklist

1. **Spec coverage:** All requirements from the brainstorming are covered:
   - [x] `/web3/concept/[slug]` dynamic route
   - [x] Concept hero with name and color
   - [x] Link to relevant learning phase
   - [x] Related concepts section
   - [x] Article list filtered by tag
   - [x] Back navigation

2. **Placeholder scan:** No "TBD", "TODO", or vague requirements. All code is complete.

3. **Type consistency:** `conceptMeta` type matches usage in both files. `getPhaseColor` function handles undefined phaseId.

4. **URL consistency:** Concept page URLs follow pattern `/web3/concept/{slug}` matching the card href update.
