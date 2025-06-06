import mdx from '@astrojs/mdx';
import partytown from '@astrojs/partytown';
import react from '@astrojs/react';
import sitemap from '@astrojs/sitemap';
import tailwind from '@astrojs/tailwind';
import compress from 'astro-compress';
import robotsTxt from 'astro-robots-txt';
import { defineConfig } from 'astro/config';
import rehypeAutolinkHeadings from 'rehype-autolink-headings';
import rehypeSlug from 'rehype-slug';
import remarkToc from 'remark-toc';
import { getSiteConfig } from './src/utils/config';

// https://astro.build/config
export default defineConfig({
  site: getSiteConfig().url,
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
    sitemap(),
    robotsTxt(),
    partytown({
      config: {
        forward: ['dataLayer.push']
      }
    }),
    // Compression should be last for optimal results
    compress({
      CSS: true,
      HTML: true,
      Image: false, // Using Astro's built-in image optimization
      JavaScript: true,
      SVG: true
    })
  ],
  markdown: {
    syntaxHighlight: 'shiki',
    shikiConfig: {
      theme: 'github-dark',
      wrap: true
    }
  },
  output: 'static',
  image: {
    // Image service optimization configuration
    service: {
      entrypoint: 'astro/assets/services/sharp',
      config: {
        jpeg: {
          quality: 80
        },
        png: {
          quality: 80
        },
        webp: {
          quality: 80
        },
        avif: {
          quality: 65 // Reduce AVIF quality to speed up processing
        }
      }
    },
    // Use faster formats for development environment
    dev: {
      format: 'webp' // Use WebP instead of AVIF in development environment
    }
  },
  vite: {
    build: {
      assetsInlineLimit: 4096, // Inline images smaller than 4kb as base64
    },
    // Optimize development server
    server: {
      watch: {
        usePolling: false
      },
      hmr: {
        overlay: true
      }
    }
  }
});