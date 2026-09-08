import { describe, expect, it } from 'vitest';
import { generateBreadcrumbSchema } from './seo';

describe('SEO Utils', () => {
  describe('generateBreadcrumbSchema', () => {
    it('should return a JSON string with schema.org breadcrumb context and type', () => {
      const schema = JSON.parse(
        generateBreadcrumbSchema([{ name: 'Home', item: '/' }])
      );
      expect(schema['@context']).toBe('https://schema.org');
      expect(schema['@type']).toBe('BreadcrumbList');
    });

    it('should map items to list elements with 1-based positions in order', () => {
      const schema = JSON.parse(
        generateBreadcrumbSchema([
          { name: 'Home', item: '/' },
          { name: 'Blog', item: '/blog' },
          { name: 'Post', item: '/blog/post' },
        ])
      );
      expect(schema.itemListElement).toEqual([
        { '@type': 'ListItem', position: 1, name: 'Home', item: '/' },
        { '@type': 'ListItem', position: 2, name: 'Blog', item: '/blog' },
        { '@type': 'ListItem', position: 3, name: 'Post', item: '/blog/post' },
      ]);
    });

    it('should return empty itemListElement for empty items', () => {
      const schema = JSON.parse(generateBreadcrumbSchema([]));
      expect(schema.itemListElement).toEqual([]);
      expect(schema['@type']).toBe('BreadcrumbList');
    });

    it('should preserve empty-string names and items', () => {
      const schema = JSON.parse(
        generateBreadcrumbSchema([{ name: '', item: '' }])
      );
      expect(schema.itemListElement).toEqual([
        { '@type': 'ListItem', position: 1, name: '', item: '' },
      ]);
    });

    it('should round-trip special characters through JSON serialization', () => {
      const raw = generateBreadcrumbSchema([
        { name: 'Web3 "专栏" <&>', item: '/web3?tag=a&b=c' },
      ]);
      expect(() => JSON.parse(raw)).not.toThrow();
      expect(JSON.parse(raw).itemListElement[0].name).toBe('Web3 "专栏" <&>');
    });
  });
});
