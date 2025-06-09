# Modern Personal Blog with Astro

A modern, fast, and feature-rich blog platform built with Astro, React, and Tailwind CSS.

## 💡 System Overview

This blog platform combines modern web technologies to create a performant, feature-rich content management system. Key capabilities include:

**Content Management**
- MDX-powered blog posts with rich formatting and code highlighting
- Hierarchical categorization with main categories and subjects
- Tagging system with related content discovery
- Featured posts and draft mode

**User Experience**
- Responsive three-column layout with mobile optimization
- Dark/light mode theming with smooth transitions
- Optimized article listings with consistent alignment
- Enhanced navigation with dynamic category menus

**Performance**
- Static site generation for lightning-fast page loads
- Image optimization and lazy loading
- CSS/JS minification and code splitting
- High PageSpeed and Core Web Vitals scores

**Developer Experience**
- Component-based architecture for maintainability
- Tailwind CSS for rapid styling
- Content collections for type-safe content management
- Clear conventions and documentation

## 📚 Content Management

### Blog Posts
Blog posts are stored in `src/content/blog/` as MDX files. Each post should follow this structure:

```md
---
title: Your Post Title
description: A brief description of your post
pubDate: 2024-01-01
updatedDate: 2024-01-02 # Optional
heroImage: https://example.com/image.jpg # Optional
tags: ['typescript', 'react', 'web development']
categories: ['programming']
subject: 'React' # For sub-categorization
draft: false
featured: false
author: Your Name
location: City, Country
---

Your content here...
```

### Frontmatter Fields

#### Required
- `title`: Post title
- `description`: Brief summary (150-160 characters recommended)
- `pubDate`: Publication date (YYYY-MM-DD)
- `tags`: Array of relevant tags
- `categories`: Array of categories

#### Optional
- `updatedDate`: Last update date
- `heroImage`: Featured image URL
- `subject`: Sub-category within main category
- `draft`: Set to `true` to exclude from production build
- `featured`: Set to `true` to highlight on homepage
- `author`: Post author name
- `location`: Author's location

### Available Tags
- Technology: `web development`, `tools`, `software`
- Programming: `javascript`, `typescript`, `react`, `node.js`
- Design: `ui`, `ux`, `css`, `design systems`
- General: `tutorial`, `guide`, `opinion`, `career`

## 🏗 Project Architecture

```
src/
├── components/     # Reusable UI components
├── content/        # Blog posts and content collections
│   ├── blog/      # Blog posts (MDX)
│   └── projects/  # Project showcases
├── layouts/        # Page layouts
├── pages/         # Route pages
│   ├── blog/      # Blog post pages
│   ├── categories/ # Category pages with subject sub-pages
│   └── tags/      # Tag pages
└── styles/        # Global styles
```

### Key Components
- `ThreeColumnLayout.astro`: Main blog layout
- `ArticleCard.astro`: Blog post preview card
- `ArticleListItem.astro`: Compact article listing with optimized alignment
- `TableOfContents.astro`: Auto-generated post ToC
- `Navigation.astro`: Main navigation menu with mobile optimization
- `Sidebar.astro`: Right sidebar with recent posts/tags

## 🚀 Features

### Content
- ✍️ MDX Support
  - Rich text formatting
  - React components in markdown
  - Code syntax highlighting
  - Auto-generated table of contents

- 🏷 Content Organization
  - Tags and categories
  - Subject-based sub-categorization
  - Category pages with two-column layout
  - "View All" functionality for subject pages
  - Related posts
  - Featured posts
  - Draft posts

### Design
- 🎨 Theming
  - Dark/light mode
  - Responsive design
  - Custom typography
  - Tailwind CSS utilities

- 📱 Layout
  - Three-column desktop layout
  - Mobile-friendly navigation
  - Optimized date and title alignment
  - Sticky sidebar
  - Smooth animations

### Performance
- ⚡️ Fast by Default
  - Static site generation
  - Image optimization
  - CSS/JS minification
  - Lazy loading

### SEO
- 🔍 SEO Optimized
  - Meta tags
  - Open Graph
  - JSON-LD
  - Sitemap
  - RSS feed

## 💻 Development

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

### Adding New Features
1. Components: Add to `src/components/`
2. Styles: Modify `src/styles/global.css`
3. Routes: Create in `src/pages/`
4. Content: Add to `src/content/`

### Content Collections
Content is managed through Astro's Content Collections:

```typescript
// src/content/config.ts
export const collections = {
  blog: defineCollection({
    schema: blogSchema
  }),
  projects: defineCollection({
    schema: projectSchema
  })
}
```

## 🔧 Configuration

### Astro Config
Edit `astro.config.mjs` for:
- Site metadata
- Markdown/MDX options
- Integration settings
- Build configuration

### Tailwind Config
Edit `tailwind.config.js` for:
- Theme customization
- Color palette
- Typography
- Custom utilities

## 📝 Writing Guidelines

### Post Structure
1. Clear title and description
2. Engaging introduction
3. Well-organized sections with headings
4. Relevant code examples
5. Conclusion or call-to-action

### Markdown Features
- Headers: `# H1` through `###### H6`
- Lists: Ordered and unordered
- Code blocks with language syntax
- Images with captions
- Blockquotes
- Tables

### Code Examples
````md
```typescript
// Your code here
```
````

### Images
```md
![Alt text](image-url)
```

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Submit a pull request

## 📄 License

MIT © 2025