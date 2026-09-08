import { describe, expect, it } from 'vitest';
import { calculateReadingTime, getHeadings } from './content';

const words = (n: number) => Array.from({ length: n }, () => 'word').join(' ');

describe('Content Utils', () => {
  describe('getHeadings', () => {
    it('should return empty array for empty content', async () => {
      expect(await getHeadings('')).toEqual([]);
    });

    it('should return empty array when content has no headings', async () => {
      expect(await getHeadings('Just a paragraph.\nAnother line.')).toEqual([]);
    });

    it('should extract headings with depth, slug and text', async () => {
      const headings = await getHeadings('## Getting Started\nSome text\n### Setup Guide');
      expect(headings).toEqual([
        { depth: 2, slug: 'getting-started', text: 'Getting Started' },
        { depth: 3, slug: 'setup-guide', text: 'Setup Guide' },
      ]);
    });

    it('should map heading levels 1-6 to depth 1-6', async () => {
      const headings = await getHeadings('# a\n## b\n### c\n#### d\n##### e\n###### f');
      expect(headings.map(h => h.depth)).toEqual([1, 2, 3, 4, 5, 6]);
    });

    it('should ignore seven or more hash marks', async () => {
      expect(await getHeadings('####### not a heading')).toEqual([]);
    });

    it('should ignore heading marks without a following space', async () => {
      expect(await getHeadings('##NoSpace')).toEqual([]);
    });

    it('should slugify: lowercase, spaces and underscores to hyphens', async () => {
      const headings = await getHeadings('## My Cool Section_title');
      expect(headings[0].slug).toBe('my-cool-section-title');
    });

    it('should keep chinese characters in slugs', async () => {
      const headings = await getHeadings('## 区块链基础');
      expect(headings[0].text).toBe('区块链基础');
      expect(headings[0].slug).toBe('区块链基础');
    });

    it('should strip special characters from slugs', async () => {
      const headings = await getHeadings('## What is DeFi? (2026)');
      expect(headings[0].slug).toBe('what-is-defi-2026');
    });

    it('should prefix slug with a dash when text starts with an emoji', async () => {
      const headings = await getHeadings('## 🚀 Getting Started');
      expect(headings[0].slug).toBe('-getting-started');
    });

    it('should fall back to positional slug for special-char-only headings', async () => {
      const headings = await getHeadings('## !!!\n## ???');
      expect(headings[0].slug).toBe('heading-2-0');
      expect(headings[1].slug).toBe('heading-2-1');
    });

    it('should trim surrounding whitespace in heading text', async () => {
      const headings = await getHeadings('##   Padded Heading   ');
      expect(headings[0].text).toBe('Padded Heading');
      expect(headings[0].slug).toBe('padded-heading');
    });
  });

  describe('calculateReadingTime', () => {
    it('should return 1 min for 200 words at the default speed', () => {
      expect(calculateReadingTime(words(200))).toBe('1 min read');
    });

    it('should round up to the next minute', () => {
      expect(calculateReadingTime(words(201))).toBe('2 min read');
    });

    it('should honor a custom words-per-minute value', () => {
      expect(calculateReadingTime(words(400), 100)).toBe('4 min read');
    });

    it('should exclude fenced code blocks from the word count', () => {
      const content = `${words(200)}\n\`\`\`js\n${words(50)}\n\`\`\``;
      expect(calculateReadingTime(content)).toBe('1 min read');
    });

    it('should exclude inline code from the word count', () => {
      const content = `${words(200)} \`ignored words here\``;
      expect(calculateReadingTime(content)).toBe('1 min read');
    });

    it('should count link text but not the url', () => {
      const content = `${words(199)} [docs](https://example.com/page)`;
      expect(calculateReadingTime(content)).toBe('1 min read');
    });

    it('should count image alt text but not the url', () => {
      expect(calculateReadingTime('![alt text](https://example.com/a.png)')).toBe('1 min read');
    });

    it('should strip markdown emphasis and heading markers', () => {
      const content = '# Title\n\n**bold** and *italic* and __strong__ and _em_';
      expect(calculateReadingTime(content)).toBe('1 min read');
    });

    it('should strip blockquote markers', () => {
      expect(calculateReadingTime('> quoted line')).toBe('1 min read');
    });

    it('should return 1 min read for empty content', () => {
      expect(calculateReadingTime('')).toBe('1 min read');
    });
  });
});
