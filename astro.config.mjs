import { defineConfig } from 'astro/config';
import tailwind from '@astrojs/tailwind';
import mdx from '@astrojs/mdx';
import react from '@astrojs/react';
import sitemap from '@astrojs/sitemap';
import rehypeSlug from 'rehype-slug';
import rehypeAutolinkHeadings from 'rehype-autolink-headings';
import remarkToc from 'remark-toc';
import { getSiteConfig } from './src/utils/config'; // 确保路径正确
import icon from 'astro-icon';

const siteConfig = getSiteConfig();
console.log('Astro Config - URL:', siteConfig.url);
console.log('Astro Config - Base:', siteConfig.base);

// https://astro.build/config
export default defineConfig({
  site: siteConfig.url, // 使用从 config 文件获取的 URL
  base: siteConfig.base, // <-- 使用从 config 文件获取的 base
  integrations: [
    tailwind(),
    mdx({
      remarkPlugins: [remarkToc],
      rehypePlugins: [
        rehypeSlug,
        [rehypeAutolinkHeadings, { behavior: 'append' }]
      ],
      shikiConfig: {
        theme: 'github-dark',
        langs: ['html', 'css', 'js', 'ts', 'jsx', 'tsx', 'json', 'bash', 'md'],
        wrap: true
      }
    }),
    react(),
    sitemap(), // sitemap 会自动使用 site 和 base
    icon() // 添加 icon 集成
  ],
  markdown: {
    syntaxHighlight: 'shiki',
    shikiConfig: {
      theme: 'github-dark',
      wrap: true
    }
  },
  output: 'static', // 保持 'static'，因为 GitHub Pages 和 Cloudflare Pages 都托管静态文件
  image: {
    service: {
      entrypoint: 'astro/assets/services/sharp',
      config: {
        jpeg: { quality: 80 },
        png: { quality: 80 },
        webp: { quality: 80 },
        avif: { quality: 65 }
      }
    },
    dev: {
      format: 'webp'
    }
  },
  vite: {
    base: siteConfig.base, // 确保Vite也使用相同的base
    build: {
      assetsInlineLimit: 4096,
    },
    server: {
      watch: {
        usePolling: false
      },
      hmr: {
        overlay: true
      }
    },
    // 添加定义环境变量，确保客户端代码能访问
    define: {
      'import.meta.env.PUBLIC_BASE_URL': JSON.stringify(siteConfig.base)
    }
  }
});