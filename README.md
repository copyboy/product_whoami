# Modern Personal Blog ✨

<div align="center">

[![Astro Official Theme](https://img.shields.io/badge/Astro-Official%20Theme-FF5D01?style=flat-square&logo=astro&logoColor=white)](https://portal.astro.build/themes/modern-personal-blog/)
[![Stars](https://img.shields.io/github/stars/copyboy/product_whoami?style=flat-square)](https://github.com/copyboy/product_whoami/stargazers)
[![Forks](https://img.shields.io/github/forks/copyboy/product_whoami?style=flat-square)](https://github.com/copyboy/product_whoami/network/members)
[![License](https://img.shields.io/github/license/copyboy/product_whoami?style=flat-square)](LICENSE)
[![Astro](https://img.shields.io/badge/Astro-4.0+-FF5D01?style=flat-square&logo=astro)](https://astro.build)
[![React](https://img.shields.io/badge/React-18+-61DAFB?style=flat-square&logo=react)](https://react.dev)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-3.4+-06B6D4?style=flat-square&logo=tailwindcss)](https://tailwindcss.com)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.5+-3178C6?style=flat-square&logo=typescript)](https://www.typescriptlang.org)

**A modern, performant blog platform for content creators, developers, and knowledge sharers**

🏆 **Featured on [Astro Official Theme Directory](https://portal.astro.build/themes/modern-personal-blog/)** 🏆

[Demo](https://copyboy.github.io/product_whoami/) | [Live Site](https://i.zhangqingdong.cn/) | [Astro Themes](https://portal.astro.build/themes/modern-personal-blog/) | [Documentation](#-documentation)

</div>

---

## 🌟 Why Choose This Theme?

### ⚡ Performance First
- **100/100 Lighthouse scores** in all categories
- Static Site Generation (SSG) for instant page loads
- Optimized images with lazy loading
- Zero JavaScript for content pages

### 🎨 Beautiful & Responsive
- Three-column layout that adapts to mobile seamlessly
- Dark/light mode with smooth transitions
- Modern typography with Tailwind CSS
- Professional design out of the box

### 📝 Content Creator Friendly
- Write in **MDX** (Markdown + React components)
- Hierarchical categories and tags
- Featured posts and drafts
- Code syntax highlighting with Shiki
- Auto-generated table of contents

### 🚀 Developer Experience
- Type-safe content with Astro Content Collections
- Component-based architecture
- Hot Module Replacement (HMR) for fast development
- ESLint + Prettier + TypeScript configured

---

## 🎯 Perfect For

- 💼 **Professionals**: Showcase your expertise and build your personal brand
- 👨‍💻 **Developers**: Share technical tutorials and project documentation
- 📚 **Knowledge Workers**: Build your digital garden or second brain
- 🎓 **Educators**: Create course materials and learning resources
- ✍️ **Writers**: Publish long-form content with beautiful typography

---

## ✨ Key Features

<table>
<tr>
<td width="50%">

### Content Management
- ✅ MDX support with React components
- ✅ Hierarchical categories with subjects
- ✅ Tag system with related posts
- ✅ Featured posts highlighting
- ✅ Draft mode for work-in-progress
- ✅ Author and location metadata

</td>
<td width="50%">

### User Experience
- ✅ Three-column responsive layout
- ✅ Dark/light theme switching
- ✅ Dynamic category navigation
- ✅ Recent posts sidebar
- ✅ Tag cloud visualization
- ✅ Mobile-optimized interface

</td>
</tr>
<tr>
<td width="50%">

### SEO & Performance
- ✅ Automatic sitemap generation
- ✅ RSS feed support
- ✅ Open Graph meta tags
- ✅ JSON-LD structured data
- ✅ Image optimization
- ✅ CSS/JS minification

</td>
<td width="50%">

### Developer Tools
- ✅ TypeScript for type safety
- ✅ ESLint + Prettier configured
- ✅ Vitest for unit testing
- ✅ Content Collections API
- ✅ Hot reload development
- ✅ Build-time optimization

</td>
</tr>
</table>

---

## 🌿 Branch Guide

- **`demo` (Recommended)**: The clean template branch. Contains minimal sample content and placeholder configurations. **Use this branch to build your site.**
- **`main`**: The author's personal blog source code. Contains personal articles and specific configurations.

---

## 🚀 Quick Start

### Prerequisites

```bash
Node.js 18+ (LTS recommended)
npm, pnpm, or yarn
```

### 1️⃣ Create New Project

```bash
# Using npm (Recommended)
npm create astro@latest -- --template copyboy/product_whoami#demo

# Or clone the demo branch manually
git clone -b demo https://github.com/copyboy/product_whoami.git my-blog
cd my-blog
npm install
```

### 2️⃣ Start Development

```bash
npm run dev
# Open http://localhost:4321
```

### 3️⃣ Write Your First Post

Create `src/content/blog/my-first-post.mdx`:

```mdx
---
title: My First Blog Post
description: This is my first post on my new blog!
pubDate: 2025-01-01
tags: ['welcome', 'introduction']
categories: ['blog']
draft: false
featured: true
author: Your Name
---

# Welcome to My Blog!

This is my first post. Let's explore **Astro** together!
```

### 4️⃣ Build & Deploy

```bash
# Build for production
npm run build

# Preview production build
npm run preview

# Deploy to your platform of choice
# (Vercel, Netlify, GitHub Pages, etc.)
```

---

## 📖 Documentation

### Content Structure

```
src/content/
├── blog/           # Your blog posts (MDX)
│   ├── post-1.mdx
│   └── post-2.mdx
└── projects/       # Project showcases
    └── project-1.mdx
```

### Frontmatter Reference

```yaml
---
title: Post Title                    # Required
description: Post description        # Required (150-160 chars)
pubDate: 2025-01-01                 # Required (YYYY-MM-DD)
updatedDate: 2025-01-02             # Optional
heroImage: https://...              # Optional
tags: ['tag1', 'tag2']              # Required
categories: ['category']            # Required
subject: 'Sub-category'             # Optional
draft: false                        # Optional (default: false)
featured: false                     # Optional (default: false)
author: Your Name                   # Optional
location: City, Country             # Optional
---
```

### Available Commands

| Command | Action |
|---------|--------|
| `npm run dev` | Start dev server at `localhost:4321` |
| `npm run build` | Build production site to `./dist/` |
| `npm run preview` | Preview production build locally |
| `npm run lint` | Run ESLint |
| `npm run format` | Format code with Prettier |
| `npm run test` | Run unit tests with Vitest |
| `npm run type-check` | Check TypeScript types |

---

## 🏗️ Project Architecture

```
product_whoami/
├── src/
│   ├── components/        # Reusable UI components
│   │   ├── ArticleCard.astro
│   │   ├── Navigation.astro
│   │   ├── Sidebar.astro
│   │   └── TableOfContents.astro
│   ├── content/          # Content collections
│   │   ├── blog/         # Blog posts (MDX)
│   │   ├── projects/     # Projects (MDX)
│   │   └── config.ts     # Content schemas
│   ├── layouts/          # Page layouts
│   │   ├── BaseLayout.astro
│   │   └── ThreeColumnLayout.astro
│   ├── pages/            # File-based routing
│   │   ├── index.astro   # Homepage
│   │   ├── blog/         # Blog pages
│   │   ├── categories/   # Category pages
│   │   └── tags/         # Tag pages
│   └── styles/           # Global styles
│       └── global.css
├── public/               # Static assets
├── astro.config.mjs      # Astro configuration
├── tailwind.config.js    # Tailwind configuration
└── package.json
```

---

## 🎨 Customization

### Site Metadata

Edit `astro.config.mjs`:

```javascript
export default defineConfig({
  site: 'https://your-domain.com',
  // ... other config
});
```

### Theme Colors

Edit `tailwind.config.js`:

```javascript
module.exports = {
  theme: {
    extend: {
      colors: {
        primary: { /* your colors */ },
        // ...
      }
    }
  }
}
```

### Navigation Menu

Edit `src/components/Navigation.astro` to customize menu items.

---

## 🌐 Deployment

This theme works with any static hosting provider:

### Vercel
```bash
npm i -g vercel
vercel
```

### Netlify
```bash
npm i -g netlify-cli
netlify deploy --prod
```

### GitHub Pages
```bash
# 1. Set base in astro.config.mjs
base: '/your-repo-name'

# 2. Build and deploy
npm run build
# Push dist/ to gh-pages branch
```

### Cloudflare Pages
Connect your GitHub repo in Cloudflare dashboard. Build settings:
- Build command: `npm run build`
- Output directory: `dist`

---

## 📸 Screenshots

<details>
<summary>Click to view screenshots</summary>

### Homepage
- Three-column layout with featured posts
- Recent posts sidebar with tag cloud
- Responsive navigation

### Blog Post
- Clean typography optimized for reading
- Code syntax highlighting with Shiki
- Auto-generated table of contents
- Related posts recommendations

### Dark Mode
- Smooth theme transitions
- Comfortable reading in low light
- Persistent theme selection

### Mobile View
- Optimized touch targets
- Collapsible navigation menu
- Single-column layout

</details>

---

## 🤝 Contributing

Contributions are welcome! Here's how you can help:

### Report Bugs
Open an issue with:
- Clear description of the bug
- Steps to reproduce
- Expected vs actual behavior
- Screenshots if applicable

### Suggest Features
Open an issue with:
- Clear feature description
- Use case and benefits
- Proposed implementation (optional)

### Submit Pull Requests
1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Make your changes
4. Run tests (`npm run test`)
5. Commit with clear message (`git commit -m 'Add amazing feature'`)
6. Push to branch (`git push origin feature/amazing-feature`)
7. Open a Pull Request

### Code Style
- Follow existing code conventions
- Run `npm run lint:fix` before committing
- Write meaningful commit messages
- Add tests for new features

---

## 🌟 Showcase

Using this theme? I'd love to feature your site here! Open a PR or issue to add yours.

- [Gerrad's Digital Garden](https://i.zhangqingdong.cn/) - Tech blog and knowledge management
- *Your site here!*

---

## 📊 Stats & Performance

### Lighthouse Scores
- ✅ Performance: 100
- ✅ Accessibility: 100
- ✅ Best Practices: 100
- ✅ SEO: 100

### Build Performance
- ⚡ Build time: ~3-5s for 100 posts
- 📦 Bundle size: < 50KB JS (initial load)
- 🖼️ Image optimization: Automatic WebP conversion

---

## 🛠️ Tech Stack

- **Framework**: [Astro 4.0+](https://astro.build) - The web framework for content-driven websites
- **UI Library**: [React 18+](https://react.dev) - For interactive components
- **Styling**: [Tailwind CSS 3.4+](https://tailwindcss.com) - Utility-first CSS
- **Content**: [MDX](https://mdxjs.com/) - Markdown with JSX
- **Syntax Highlighting**: [Shiki](https://shiki.matsu.io/) - Beautiful code blocks
- **Icons**: React Icons - Comprehensive icon library
- **Testing**: [Vitest](https://vitest.dev/) - Blazing fast unit tests
- **Linting**: ESLint + Prettier - Code quality tools

---

## 📝 Changelog

### v1.0.0 (Latest)
- ✨ Initial release
- ✅ Three-column responsive layout
- ✅ Dark/light theme support
- ✅ MDX blog posts with code highlighting
- ✅ Category and tag system
- ✅ SEO optimization
- ✅ RSS feed generation
- 🏆 Featured on Astro Official Themes

---

## 📄 License

MIT License © 2025 Gerrad Zhang

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED.

See [LICENSE](LICENSE) for full text.

---

## 🙏 Acknowledgements

- [Astro](https://astro.build) - For the amazing framework
- [Tailwind CSS](https://tailwindcss.com) - For the utility-first CSS framework
- [React](https://react.dev) - For the UI library
- [Shiki](https://shiki.matsu.io/) - For beautiful syntax highlighting
- [Astro Community](https://astro.build/chat) - For inspiration and support

---

## 💬 Support & Community

- 📧 **Email**: gerrad.zhang@hotmail.com
- 🐛 **Issues**: [GitHub Issues](https://github.com/copyboy/product_whoami/issues)
- 💡 **Discussions**: [GitHub Discussions](https://github.com/copyboy/product_whoami/discussions)
- 🌐 **Blog**: [i.zhangqingdong.cn](https://i.zhangqingdong.cn/)
- 🎨 **Astro Themes**: [Official Listing](https://portal.astro.build/themes/modern-personal-blog/)

---

## ⭐ Star History

If this theme helped you build something awesome, give it a star! ⭐

It helps others discover this project and motivates me to keep improving it.

---

<div align="center">

**[⬆ Back to Top](#modern-personal-blog-)**

Made with ❤️ by [Gerrad Zhang](https://github.com/copyboy)

🏆 **[Featured on Astro Official Themes](https://portal.astro.build/themes/modern-personal-blog/)** 🏆

</div>

