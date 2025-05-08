# 部署Astro项目到GitHub Pages

本文档提供了将Astro项目部署到GitHub Pages的完整指南，涵盖了基础路径配置、GitHub Actions工作流、本地开发和预览，以及常见问题的解决方案。

## 目录

- [1. 配置Astro项目](#1-配置astro项目)
- [2. 创建GitHub Actions工作流](#2-创建github-actions工作流)
- [3. 路径处理与导航](#3-路径处理与导航)
- [4. 本地开发与预览](#4-本地开发与预览)
- [5. 上传到GitHub并部署](#5-上传到github并部署)
- [6. 常见问题与解决方案](#6-常见问题与解决方案)
- [7. 使用特定分支（如demo）部署到GitHub Pages](#7-使用特定分支如demo部署到github-pages)
- [8. 基础路径处理方案](#8-基础路径处理方案)

## 1. 配置Astro项目

首先，我们需要修改Astro配置文件以支持GitHub Pages部署。GitHub Pages的项目站点使用子路径（如`/project-name`），因此需要配置相应的基础路径。

### 修改`astro.config.mjs`

```javascript
import { defineConfig } from 'astro/config';
// 其他导入...

// 检测当前环境
const isProd = process.env.NODE_ENV === 'production';
// 检测是否为demo分支（通过环境变量或构建参数指定）
const isDemoBranch = process.env.GITHUB_REF?.includes('refs/heads/demo') || process.env.DEPLOY_BRANCH === 'demo';
// 只在demo分支的生产环境中使用基础路径
const shouldUseBase = isProd && isDemoBranch && !process.env.DISABLE_BASE_PATH;
const base = shouldUseBase ? '/product_whoami' : '';

// 根据分支选择不同的站点URL
const siteUrl = isDemoBranch ? 'https://copyboy.github.io' : getSiteConfig().url;

// https://astro.build/config
export default defineConfig({
  site: siteUrl,
  base: base,
  // 其他配置...
});
```

> **注意**：将`your-username`替换为您的GitHub用户名，将`product_whoami`替换为您的仓库名称。

## 2. 创建GitHub Actions工作流

GitHub Actions可以自动构建和部署您的Astro项目。创建以下文件：

### `.github/workflows/deploy.yml`

```yaml
name: Deploy Demo to GitHub Pages

on:
  # 只在推送到demo分支时触发部署
  push:
    branches: [ demo ]
  # 允许手动触发部署
  workflow_dispatch:
    inputs:
      branch:
        description: 'Branch to deploy'
        required: true
        default: 'demo'

# 设置GITHUB_TOKEN的权限
permissions:
  contents: read
  pages: write
  id-token: write

# 只允许一个并发部署，跳过正在运行和最新队列之间的运行队列
concurrency:
  group: "pages"
  cancel-in-progress: false

jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - name: Checkout
        uses: actions/checkout@v4
        with:
          ref: ${{ github.event_name == 'workflow_dispatch' && github.event.inputs.branch || 'demo' }}
      - name: Setup Node
        uses: actions/setup-node@v4
        with:
          node-version: "18"
          cache: 'npm'
      - name: Setup Pages
        uses: actions/configure-pages@v4
      - name: Install dependencies
        run: npm ci
      - name: Build
        run: npm run build
        env:
          DEPLOY_BRANCH: demo
      - name: Upload artifact
        uses: actions/upload-pages-artifact@v3
        with:
          path: ./dist

  deploy:
    runs-on: ubuntu-latest
    needs: build
    steps:
      - name: Deploy to GitHub Pages
        id: deployment
        uses: actions/deploy-pages@v4
```

> **重要**：确保使用最新版本的GitHub Actions，否则可能会出现"Missing download info"等错误。

## 3. 路径处理与导航

由于GitHub Pages使用基础路径，所有内部链接都需要考虑这一点。创建一个通用的路径处理工具：

### `src/utils/paths.js`

```javascript
/**
 * 路径处理工具函数
 */

/**
 * 格式化链接，确保与当前环境的基础路径兼容
 * @param {string} path - 链接路径，如 '/blog' 或 'blog'
 * @returns {string} 带有正确基础路径的完整链接
 */
export function getLink(path) {
  const base = import.meta.env.BASE_URL || '/';
  const cleanBase = base.endsWith('/') ? base.slice(0, -1) : base;
  const cleanPath = path.startsWith('/') ? path : `/${path}`;
  return `${cleanBase}${cleanPath}`;
}

/**
 * 获取资源URL
 * @param {string} path - 资源路径，如 '/images/logo.png'
 * @returns {string} 带有正确基础路径的资源URL
 */
export function getAssetPath(path) {
  return getLink(path);
}

/**
 * 检查当前是否使用了基础路径
 * @returns {boolean} 是否使用了基础路径
 */
export function hasBasePath() {
  return import.meta.env.BASE_URL && import.meta.env.BASE_URL !== '/';
}

/**
 * 获取当前基础路径
 * @returns {string} 当前基础路径
 */
export function getBasePath() {
  return import.meta.env.BASE_URL || '/';
}

export default {
  getLink,
  getAssetPath,
  hasBasePath,
  getBasePath
};
```

### 更新组件中的链接

在所有组件中，使用`getLink`函数处理链接，例如：

```jsx
import { getLink } from '@utils/paths';

// 从
<a href="/blog">博客</a>

// 改为
<a href={getLink('/blog')}>博客</a>
```

## 4. 本地开发与预览

为了方便本地开发和预览，我们需要添加一些命令到`package.json`：

```json
{
  "scripts": {
    "dev": "astro dev",
    "start": "astro dev",
    "build": "astro build",
    "preview": "astro preview",
    "preview:local": "DISABLE_BASE_PATH=true astro build && DISABLE_BASE_PATH=true astro preview"
  }
}
```

对于Windows用户，创建一个批处理文件：

### `preview-local.bat`

```batch
@echo off
SET DISABLE_BASE_PATH=true
npm run build
SET DISABLE_BASE_PATH=true
npm run preview
```

### 使用方式：

- **开发模式**：`npm run dev` - 不使用基础路径，适合本地开发
- **生产预览**：`npm run preview` - 使用基础路径，模拟GitHub Pages环境
- **本地预览**：`npm run preview:local`（Mac/Linux）或 `.\preview-local.bat`（Windows）- 不使用基础路径的生产构建

## 5. 上传到GitHub并部署

1. **创建GitHub仓库**：
   - 在GitHub上创建一个新仓库，命名为您选择的项目名称
   - 不要初始化仓库，保持为空

2. **将项目推送到GitHub**：
   ```bash
   git init
   git add .
   git commit -m "初始提交"
   git branch -M main
   git remote add origin https://github.com/username/repository-name.git
   git push -u origin main
   ```

3. **启用GitHub Pages**：
   - 转到您的GitHub仓库 → Settings → Pages
   - Source: 选择"GitHub Actions"
   - 保存设置

4. **触发部署**：
   - 提交代码会自动触发部署工作流
   - 或者在GitHub仓库 → Actions → "Deploy to GitHub Pages" → "Run workflow"手动触发

5. **访问您的站点**：
   部署完成后，您可以通过`https://username.github.io/repository-name/`访问您的站点

## 6. 常见问题与解决方案

### 问题：部署后出现404错误

**解决方案**：
- 确保`astro.config.mjs`中的`base`设置正确（与仓库名称匹配）
- 检查所有导航链接是否使用了`getLink`函数
- 在GitHub仓库 → Settings → Pages 验证部署源设置
- 检查GitHub Actions工作流是否成功完成

### 问题：本地运行没问题但部署后样式丢失

**解决方案**：
- 确保所有样式和资源引用都使用了相对路径或`getAssetPath`函数
- 检查`public`目录中的资源路径是否正确

### 问题：GitHub Actions 错误 "Missing download info for actions/upload-artifact"

**解决方案**：
- 更新`.github/workflows/deploy.yml`中的Actions版本，特别是：
  - `actions/upload-pages-artifact@v3`（或最新版本）
  - `actions/deploy-pages@v4`（或最新版本）

### 问题：导航链接在开发环境和生产环境行为不一致

**解决方案**：
- 在所有组件中使用统一的`getLink`函数处理链接
- 避免硬编码URL路径
- 使用绝对路径作为`getLink`函数的参数（以`/`开头）

## 7. 使用特定分支（如demo）部署到GitHub Pages

如果您希望将特定分支（如`demo`分支）部署到GitHub Pages，同时保持主分支（`main`）用于其他目的（如部署到Cloudflare等），可以进行以下配置：

### 修改`astro.config.mjs`

```javascript
// 检测当前环境
const isProd = process.env.NODE_ENV === 'production';
// 检测是否为demo分支（通过环境变量或构建参数指定）
const isDemoBranch = process.env.GITHUB_REF?.includes('refs/heads/demo') || process.env.DEPLOY_BRANCH === 'demo';
// 只在demo分支的生产环境中使用基础路径
const shouldUseBase = isProd && isDemoBranch && !process.env.DISABLE_BASE_PATH;
const base = shouldUseBase ? '/product_whoami' : '';

// 根据分支选择不同的站点URL
const siteUrl = isDemoBranch ? 'https://copyboy.github.io' : getSiteConfig().url;

export default defineConfig({
  site: siteUrl,
  base: base,
  // 其他配置...
});
```

这种配置方式实现了：
1. 在demo分支上，使用GitHub Pages的URL（`https://copyboy.github.io`）作为站点URL，并添加基础路径
2. 在main分支或其他分支上，使用配置文件中定义的URL（`getSiteConfig().url`），不添加基础路径

这样可以让您同时维护两个不同的部署环境：
- GitHub Pages（demo分支）：`https://copyboy.github.io/product_whoami/`
- 自定义域名（main分支）：`https://i.zhangqingdong.cn/`（或您在配置文件中定义的其他URL）

### 调整GitHub Actions工作流

将`.github/workflows/deploy.yml`文件修改为仅在demo分支上触发：

```yaml
name: Deploy Demo to GitHub Pages

on:
  # 只在推送到demo分支时触发部署
  push:
    branches: [ demo ]
  # 允许手动触发部署
  workflow_dispatch:
    inputs:
      branch:
        description: 'Branch to deploy'
        required: true
        default: 'demo'

# ... 其他配置 ...

jobs:
  build:
    # ... 其他配置 ...
    steps:
      - name: Checkout
        uses: actions/checkout@v4
        with:
          ref: ${{ github.event_name == 'workflow_dispatch' && github.event.inputs.branch || 'demo' }}
      # ... 其他步骤 ...
      - name: Build
        run: npm run build
        env:
          DEPLOY_BRANCH: demo
```

### 本地预览demo版本

为了方便在本地预览demo分支的构建效果，可以使用以下命令：

**Windows用户**（使用`preview-demo.bat`）：
```batch
@echo off
SET DEPLOY_BRANCH=demo
npm run build
SET DEPLOY_BRANCH=demo
npm run preview
```

**Mac/Linux用户**（使用`preview-demo.sh`）：
```bash
#!/bin/bash
export DEPLOY_BRANCH=demo
npm run build
export DEPLOY_BRANCH=demo
npm run preview
```

别忘了为shell脚本添加执行权限：
```bash
chmod +x preview-demo.sh
```

### 分支管理策略

1. **main分支**：用于开发和Cloudflare部署，不应用GitHub Pages基础路径
2. **demo分支**：用于GitHub Pages演示站点，应用基础路径

当您需要更新demo站点时，可以将main分支的更改合并到demo分支：
```bash
git checkout demo
git merge main
git push origin demo
```

这种配置允许您同时维护两个不同部署目标的代码，而不会互相干扰。

## 8. 基础路径处理方案

为了避免手动在每个链接中调用`getLink()`函数，本项目提供了多种项目级别的解决方案：

### Vite插件方案（默认）

项目默认使用Vite插件自动处理所有链接。该插件在构建时自动为所有HTML和JavaScript中的静态链接添加基础路径前缀。

**优势**：
- 零代码修改，所有现有链接都能正常工作
- 不影响运行时性能
- 对静态内容完全兼容

**配置**：
```javascript
// astro.config.mjs
import autoPathPlugin from './vite-path-plugin';

// ...

export default defineConfig({
  // ...
  vite: {
    // ...
    plugins: [autoPathPlugin()]
  }
});
```

### 自定义Link组件（推荐用于新功能）

对于新开发的功能，推荐使用自定义`<Link>`组件替代原生`<a>`标签：

```astro
---
import Link from '@components/common/Link.astro';
---

<Link href="/blog">博客</Link>
```

### 中间件方案（可选，默认禁用）

如果您的项目有大量动态生成的链接，可以启用中间件方案：

1. 编辑`src/middleware.config.js`：
```javascript
export const enablePathMiddleware = true; // 改为true启用中间件
```

2. 中间件会拦截所有链接点击和导航API调用，动态添加基础路径前缀。

有关更详细的说明，请参阅`docs/baseurl-solution.md`。

## 结论

通过以上配置，您的Astro项目可以顺利部署到GitHub Pages上，同时保持本地开发的便捷性。无论是作为个人项目展示还是作为项目文档，这种配置都能满足您的需求。

如需更多信息，请参考[Astro官方文档](https://docs.astro.build/en/guides/deploy/github/)和[GitHub Pages文档](https://docs.github.com/en/pages)。 