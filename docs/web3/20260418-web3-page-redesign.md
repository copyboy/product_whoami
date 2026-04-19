# Web3 页面重构设计方案

> 版本：1.0
> 日期：2026-04-18
> 状态：设计阶段，待实施

---

## 一、目标

保持现有视觉风格不变的前提下，将页面结构按 `20260418-web3-roadmap-design.md` 的 5 阶段认知升级路线图重构。

**核心变化**：
- Roadmap 详情页从"skill-based"改为"cognition-based"（5 阶段）
- 首页从"3阶段预览"改为"5阶段进度概览"
- 新增各阶段专属详情页

---

## 二、页面结构

```
/web3                          → 首页：Roadmap 总览 + 当前进度 + 文章列表
/web3/roadmap                  → Roadmap 详情页（5阶段展开）
/web3/phase/[n]               → 各阶段详情页（Phase 1-5）
/web3/article/[slug]          → 具体文章（已有逻辑不变）
/web3/report                   → 完整调研报告（同步更新）
```

---

## 三、首页（`/web3/index.astro`）重构

### 3.1 保持不变的部分

- Hero 区域：保持现有样式（深色背景 + grid pattern + 节点动画）
- 概念图谱（Web3ConceptCards）：保持现有组件和样式
- 文章列表（ArticleListItem）：保持现有组件和样式

### 3.2 变化的部分：学习路径预览

**现状**（3 阶段，skill-based）：
```
[阶段一：基础阶段]  Bitcoin / Ethereum / 钱包
[阶段二：开发阶段]  Solidity / Hardhat / wagmi
[阶段三：专业方向]  DeFi / Security / AI Agent
```

**改为**（5 阶段，cognition-based）：

```
┌─────────────────────────────────────────────────────────┐
│  Web3 学习路径                                          │
│  理解去中心化的五个阶段                                  │
├─────────────────────────────────────────────────────────┤
│  [阶段一：去中心化价值转移]     ████████████ 100%      │
│  [阶段二：去中心化计算]        ████████░░░░░░░ 60%     │
│  [阶段三：去中心化应用]        ░░░░░░░░░░░░░░░ 0%      │
│  [阶段四：去中心化金融市场]    ░░░░░░░░░░░░░░░ 0%      │
│  [阶段五：去中心化组织]        ░░░░░░░░░░░░░░░ 0%      │
├─────────────────────────────────────────────────────────┤
│  当前阶段                                              │
│  阶段二：理解"去中心化计算"                            │
│  [继续学习 →]                                         │
├─────────────────────────────────────────────────────────┤
│  已完成里程碑                                          │
│  ✅ Bitcoin 白皮书深度解读                             │
│  ✅ UTXO 模型 vs 账户模型                              │
│  ✅ PoW 共识机制                                       │
└─────────────────────────────────────────────────────────┘
```

**实现方式**：
- 每个阶段显示：阶段编号 + 标题 + 进度条 + 完成百分比
- 进度百分比由该阶段"已有"里程碑 / 总里程碑计算
- 当前阶段高亮显示，带"继续学习"CTA 按钮
- 已完成里程碑列表（取所有 ✅ 状态里程碑）
- 点击阶段标题或"查看完整路线图"跳转 `/web3/roadmap`

**组件**：`Web3PhaseProgress.astro`（新）

---

## 四、Roadmap 详情页（`/web3/roadmap.astro`）重构

### 4.1 整体结构

每个阶段包含：
1. **阶段 Header** — 编号 + 标题 + 副标题（痛点一句话）
2. **痛点区块** — 痛点 + 为什么有这个痛点（用户写的原始文案）
3. **核心问题** — "XXX 回答的问题是：能不能...？"
4. **里程碑列表** — 每条可点击跳转对应文章

### 4.2 各阶段结构

#### 阶段一：去中心化价值转移（Bitcoin）

```
**阶段编号 + 标题**
阶段一：理解"去中心化价值转移"

**痛点区块**（引用设计文档原文）
> 你在非洲有亲人需要钱...（痛点原文）
> 为什么会有这个痛点？...（根因原文）

**核心问题**
Bitcoin 回答的问题是：能不能用数学代替机构，来证明"这笔钱是你的"？

**里程碑**
✅ M1.1 UTXO 模型是什么，为什么和银行账户不一样
✅ M1.2 PoW 共识怎么保证不可篡改
✅ M1.3 Bitcoin 白皮书深度解读
🔄 M1.4 Bitcoin 网络实际运行（节点、矿工、交易）
```

#### 阶段二：去中心化计算（Ethereum）

同上结构，4个里程碑均为 🔄 待填。

#### 阶段三：去中心化应用（DApp）

同上结构，4个里程碑均为 🔄 待学。

#### 阶段四：去中心化金融市场（DeFi）

结构同上，4 个里程碑（M4.1-M4.4）。平行方向指学习顺序可按兴趣选择，导航顺序仍为 1→2→3→4→5。

#### 阶段五：去中心化组织（DAO）

结构同上，4 个里程碑（M5.1-M5.4）。

### 4.3 视觉样式

保持现有 roadmap.astro 的视觉风格：
- Terminal chrome 头部（`web3_learning_path.exe`）
- 编号圆形色块（01 / 02 / 03...）
- 渐变连接线
- 里程碑卡片样式
- 状态 emoji（✅ 🔄）不变

---

## 五、阶段详情页（`/web3/phase/[n].astro`）

### 5.1 路由

```
/web3/phase/1   → 阶段一详情
/web3/phase/2   → 阶段二详情
/web3/phase/3   → 阶段三详情
/web3/phase/4   → 阶段四详情（DeFi）
/web3/phase/5   → 阶段五详情（DAO）
```

### 5.2 页面结构

每个阶段详情页包含：

1. **Hero** — 阶段编号 + 标题 + 核心问题（"能不能...？"）
2. **痛点区块** — 完整痛点叙述
3. **里程碑详情** — 每个里程碑可展开：
   - 标题 + 状态 emoji
   - 展开后：关联文章的 `description`（摘要） + 链接
   - 无关联文章时：显示"暂无关联文章，可先阅读参考资料"
4. **解决场景** — 该阶段解决的实际场景举例
5. **下一篇** — 下一个阶段链接（阶段四/五按 4→5 顺序）

### 5.3 侧边栏

`/web3/phase/[n]` 侧边栏按里程碑生成目录锚点，点击跳转对应里程碑卡片。

### 5.3 组件

- `PhaseDetail.astro`（新）— 通用阶段详情布局
- `MilestoneCard.astro`（新）— 单个里程碑卡片

---

## 六、内容状态系统

| status | 含义 | emoji |
|--------|------|-------|
| `done` | 有完整文章可直接阅读 | ✅ 已有 |
| `learning` | 正在学，笔记草稿状态 | 🔄 进行中 |
| `todo` | 计划中学，还没开始 | 🔄 待学 |
| `empty` | 计划外，待补充 | 🔄 待填 |

---

## 七、实施顺序

### Phase 1：数据层
- [ ] 创建 `web3-roadmap-data.json` 源数据文件
- [ ] 编写 build time 读取 + 计算逻辑（进度%、当前阶段）

### Phase 2：基础设施组件
- [ ] 创建 `Web3PhaseProgress.astro`（首页进度概览组件）
- [ ] 创建 `MilestoneCard.astro`（可展开的里程碑卡片）
- [ ] 创建 `PhaseDetail.astro`（阶段详情页布局）

### Phase 3：Roadmap 详情页
- [ ] 按新结构重构 `/web3/roadmap.astro`
- [ ] 验证所有 5 阶段 + 里程碑显示正确
- [ ] 验证进度条计算逻辑

### Phase 4：首页
- [ ] 重构 `/web3/index.astro` 的学习路径预览
- [ ] 接入 Web3PhaseProgress 组件
- [ ] 验证"已完成里程碑"列表正确

### Phase 5：阶段详情页
- [ ] 创建 `/web3/phase/[n].astro` 动态路由
- [ ] 实现 5 个阶段的详情页模板
- [ ] 验证里程碑展开笔记功能

### Phase 6：报告页同步
- [ ] 按新 5 阶段结构更新 `/web3/report.astro`

---

## 八、视觉风格保留清单

以下样式**保持不变**：

- [x] 深色背景 + grid pattern
- [x] Terminal chrome 头部（`web3_learning_path.exe`）
- [x] 编号圆形色块（渐变背景 + 白色数字）
- [x] 里程碑卡片（白/暗色背景 + hover 边框高亮）
- [x] 状态 emoji（✅ 🔄）
- [x] 渐变连接线
- [x] font-mono 等宽字体风格
- [x] 三栏布局（Navigation + MainContent + Sidebar）
- [x] 暗色模式支持

**新增交互**：
- [ ] 里程碑卡片点击展开/收起笔记内容（默认收起）
- [ ] 展开动画：高度过渡 + 内容渐入
- [ ] 展开状态：expand icon 从 [+] 变为 [−]

---

## 九、数据层

### 9.1 源数据文件

**`web3-roadmap-data.json`** — 所有阶段的源数据，AI 维护。

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
      "milestones": [
        {
          "id": "M1.1",
          "title": "UTXO 模型是什么，为什么和银行账户不一样",
          "status": "done",
          "articleSlug": "utxo-model"
        },
        {
          "id": "M1.2",
          "title": "PoW 共识怎么保证不可篡改",
          "status": "done",
          "articleSlug": "pow-consensus"
        },
        {
          "id": "M1.3",
          "title": "Bitcoin 白皮书深度解读",
          "status": "done",
          "articleSlug": "bitcoin-whitepaper-deep-dive"
        },
        {
          "id": "M1.4",
          "title": "Bitcoin 网络实际运行（节点、矿工、交易）",
          "status": "todo"
        }
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
      "milestones": [
        { "id": "M2.1", "title": "账户模型 vs UTXO", "status": "todo" },
        { "id": "M2.2", "title": "EVM 是什么，为什么重要", "status": "todo" },
        { "id": "M2.3", "title": "Gas 为什么存在，怎么计算", "status": "todo" },
        { "id": "M2.4", "title": "智能合约到底是什么，能做什么", "status": "todo" }
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
      "milestones": [
        { "id": "M3.1", "title": "Solidity 基础语法，能写简单合约", "status": "learning" },
        { "id": "M3.2", "title": "Hardhat + 本地测试环境搭建", "status": "todo" },
        { "id": "M3.3", "title": "部署到测试网（Sepolia / Holesky）", "status": "todo" },
        { "id": "M3.4", "title": "第一个完整 DApp（前端 + 合约交互）", "status": "todo" }
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
      "milestones": [
        { "id": "M4.1", "title": "AMM 机制与 Uniswap 原理", "status": "todo" },
        { "id": "M4.2", "title": "借贷协议（Aave / Compound）", "status": "todo" },
        { "id": "M4.3", "title": "闪电贷与套利策略", "status": "todo" },
        { "id": "M4.4", "title": "DeFi 聚合器与收益策略", "status": "todo" }
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
      "milestones": [
        { "id": "M5.1", "title": "DAO 治理机制与投票模型", "status": "todo" },
        { "id": "M5.2", "title": "代币经济学设计", "status": "todo" },
        { "id": "M5.3", "title": "Multi-sig 与权限管理", "status": "todo" },
        { "id": "M5.4", "title": "知名 DAO 案例分析", "status": "todo" }
      ]
    }
  ]
}
```

### 9.2 里程碑状态枚举

| status | 含义 | 显示 |
|--------|------|------|
| `done` | 有完整文章 | ✅ 已有 |
| `learning` | 正在学，笔记草稿 | 🔄 进行中 |
| `todo` | 计划中学，还没开始 | 🔄 待学 |
| `empty` | 计划外，待补充 | 🔄 待填 |

### 9.3 计算逻辑（build time）

Roadmap 页面和首页在 build 时读取 JSON：

```js
// 阶段进度 = done 里程碑数 / 总里程碑数 × 100%
const phaseProgress = (phase.milestones.filter(m => m.status === 'done').length / phase.milestones.length) * 100;

// 当前阶段 = 第一个非 done 的阶段
const currentPhase = phases.find(p => p.milestones.some(m => m.status !== 'done'));
```

### 9.4 `articleSlug` 解析规则

`articleSlug` 直接对应 blog post slug，解析成链接：

```
articleSlug: "bitcoin-whitepaper-deep-dive"
↓
/web3/article/bitcoin-whitepaper-deep-dive
```

里程碑展开时，读取该 post 的 `description` 作为摘要展示。

### 9.5 AI 维护协议

当用户说"我完成了 XXX 文章"，AI 自动：
1. 在对应 milestone 找到 `articleSlug` 字段填入文章 slug
2. 将 `status` 从 `todo` 改为 `done`（或 `learning` 如果是草稿）

---

## 十、已解决

- ~~1. 里程碑点击行为~~ → **展开笔记详情**（笔记 = 文章 description）
- ~~2. 进度百分比~~ → **JSON build time 计算**
- ~~3. 阶段四/五里程碑~~ → **需要，已加入 JSON**
- ~~4. articleSlug 解析~~ → **`/web3/article/[slug]` 直接对应 blog post**
- ~~5. 侧边栏内容~~ → **按里程碑生成目录锚点**
- ~~6. 报告页同步~~ → **Phase 6 实施项已加入**
