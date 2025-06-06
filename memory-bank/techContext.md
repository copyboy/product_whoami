# Technical Context: Product WhoAmI
*Version: 1.0*
*Created: 2025-06-06*
*Last Updated: 2025-06-06*

## Technology Stack

### Core Framework
- **Frontend Framework**: Astro 4.0 - Static Site Generator with excellent performance and SEO
- **UI Library**: React 18.3.1 - For interactive components and islands architecture
- **Styling**: TailwindCSS 3.4.1 + @tailwindcss/typography - Utility-first CSS framework
- **Language**: TypeScript 5.5.3 - Type safety and enhanced development experience
- **Content**: MDX 3.0 - Enhanced markdown with React component support

### Recommended Additions

#### Internationalization (Multi-language Support)
- **Primary**: `astro-i18next` - Astro-optimized i18n solution
- **Alternative**: `@astrojs/i18n` - Official Astro i18n integration
- **Implementation**: Static route generation for different locales

#### Search Functionality
- **Client-side**: Fuse.js 7.1.0 (already installed) - Fuzzy search for blog posts
- **Static Search**: Pagefind - Full-text search for static sites
- **Implementation**: Hybrid approach with instant client search + comprehensive static search

#### Content Management System (CMS)
- **Recommended**: Decap CMS (formerly Netlify CMS)
  - Git-based workflow
  - Free and open-source
  - Perfect for static sites
  - Support for markdown/MDX content
- **Alternative**: Sanity - Headless CMS with rich editing experience

#### Comment System
- **Recommended**: Giscus
  - Based on GitHub Discussions
  - No ads, privacy-friendly
  - Supports reactions and nested comments
  - Perfect for developer-focused content
- **Alternative**: Utterances - Lighter weight, GitHub Issues-based

#### Analytics Integration
- **Primary**: Vercel Analytics (if deploying to Vercel)
  - Privacy-focused
  - Integrated with deployment platform
  - Performance insights
- **Secondary**: Google Analytics 4
  - Comprehensive user behavior tracking
  - SEO insights and search console integration

#### Performance & SEO Optimization
- **Compression**: @astrojs/compress - Asset optimization
- **SEO**: astro-robots-txt - Automated robots.txt generation
- **Third-party Scripts**: @astrojs/partytown - Offload third-party scripts
- **Images**: Built-in Astro image optimization with Sharp

## Development Environment Setup

### Prerequisites
- **Node.js**: v18+ (managed via nvm)
- **Package Manager**: npm (default) or pnpm for faster installs
- **Git**: Version control
- **Editor**: Cursor/VSCode with Astro extension

### Installation Commands
```bash
# Install current dependencies
npm install

# Install additional packages (already installed)
npm install astro-i18next astro-compress astro-robots-txt @astrojs/partytown
npm install -D vitest @vitest/ui @testing-library/react @testing-library/jest-dom jsdom
```

### Development Workflow
```bash
# Development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview

# Code quality
npm run lint              # Check for linting errors
npm run lint:fix          # Fix auto-fixable linting errors
npm run format            # Format code with Prettier
npm run format:check      # Check code formatting
npm run type-check        # TypeScript type checking

# Testing
npm run test              # Run tests in watch mode
npm run test:ui           # Run tests with UI
npm run test:run          # Run tests once
npm run test:coverage     # Run tests with coverage report
```

### VSCode Configuration
The project includes optimized VSCode settings for:
- Automatic formatting on save
- ESLint integration with auto-fix
- Astro and TypeScript support
- TailwindCSS IntelliSense
- Path aliases and imports

## Dependencies Analysis

### Current Dependencies (Excellent Choices)
- **@astrojs/mdx**: 3.0.0 - Enhanced markdown support
- **@astrojs/react**: 3.0.0 - React integration
- **@astrojs/rss**: 4.0.11 - RSS feed generation
- **@astrojs/sitemap**: 3.0.0 - Automatic sitemap generation
- **@astrojs/tailwind**: 5.0.0 - TailwindCSS integration
- **fuse.js**: 7.1.0 - Search functionality (already perfect for requirements)
- **qrcode**: 1.5.4 - QR code generation for sharing
- **astro-seo**: 0.8.3 - SEO optimization helpers

### Recommended Additions
- **astro-i18next**: ~1.0.0 - Internationalization
- **@astrojs/compress**: ~2.0.0 - Asset compression
- **astro-robots-txt**: ~1.0.0 - SEO optimization
- **@astrojs/partytown**: ~2.0.0 - Third-party script optimization

## Technical Constraints & Considerations

### Performance Requirements
- **Target**: < 3 seconds initial page load
- **Optimization Strategy**:
  - Static site generation (SSG) for optimal performance
  - Image optimization with Sharp
  - Code splitting and lazy loading
  - CDN deployment via Vercel/Cloudflare

### SEO Requirements
- **Target**: Lighthouse SEO score > 90
- **Implementation**:
  - Semantic HTML structure
  - Proper meta tags and Open Graph
  - Schema.org structured data
  - Optimized images with alt text
  - Clean URL structure

### Multi-language Support
- **Approach**: Static route generation for each locale
- **Structure**: `/en/`, `/zh/` path-based routing
- **Content**: Separate MDX files for each language
- **Fallback**: English as default language

## Build and Deployment

### Build Process
- **Static Generation**: Full SSG build with Astro
- **Asset Optimization**: Automatic compression and optimization
- **Bundle Analysis**: Built-in Astro bundle analyzer

### Deployment Options
- **Primary**: Vercel
  - Zero-config deployment
  - Automatic previews
  - Built-in analytics
  - Edge functions support
- **Alternative**: Cloudflare Pages
  - Global CDN
  - Excellent performance
  - Free tier generous

### CI/CD Pipeline
- **GitHub Actions**: Automatic builds on push
- **Preview Deployments**: Pull request previews
- **Production Deployment**: Automatic on main branch merge

## Testing Approach

### Unit & Integration Testing
- **Framework**: Vitest with React Testing Library
- **Environment**: jsdom for DOM testing
- **Coverage**: V8 coverage reporting
- **Mocking**: Comprehensive browser API mocks
- **Configuration**: Optimized for Astro components

### Performance Testing
- **Lighthouse CI**: Automated performance monitoring with score thresholds (90+)
- **Web Vitals**: Core Web Vitals tracking in CI/CD
- **Bundle Analysis**: Regular bundle size monitoring
- **Performance Budget**: Automated performance regression detection

### Content Testing
- **Component Testing**: React Islands testing with Testing Library
- **Link Checking**: Automated broken link detection
- **Content Validation**: MDX syntax validation
- **SEO Testing**: Automated SEO audit with Lighthouse

### Browser Testing
- **Modern Browsers**: Chrome, Firefox, Safari, Edge
- **Mobile Testing**: iOS Safari, Chrome Mobile
- **Accessibility**: WCAG compliance testing with automated audits
- **Cross-browser**: Automated testing via GitHub Actions

### CI/CD Testing Pipeline
- **Quality Gates**: Linting, formatting, type checking
- **Test Suite**: Unit tests with coverage reporting
- **Build Verification**: Production build testing
- **Performance Audit**: Lighthouse scoring on PRs
- **Security**: Automated dependency vulnerability scanning

---

*This document describes the technologies used in the project and how they're configured to meet the specific requirements of Product WhoAmI.* 