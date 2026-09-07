import { describe, expect, it } from 'vitest';
import { formatPageTitle, getSiteConfig, isFeatureEnabled } from './config';

describe('Config Utils', () => {
  describe('getSiteConfig', () => {
    it('should return site configuration', () => {
      const config = getSiteConfig();
      
      expect(config).toBeDefined();
      expect(config.title).toBe('Gerrad Zhang');
      expect(config.description).toBe('Gerrad Zhang (Zhang Qingdong), payments systems engineer in Wuhan, China, and builder of ChinaNeighbor.com — practical guides for foreigners living in and traveling to China. Writing about payment architecture, Java engineering, and expat life in China.');
      expect(config.author).toBe('Gerrad Zhang');
    });
  });

  describe('formatPageTitle', () => {
    it('should format page title correctly', () => {
      const result = formatPageTitle('About');
      expect(result).toBe('About | Gerrad Zhang');
    });

    it('should handle empty title', () => {
      const result = formatPageTitle('');
      expect(result).toBe(' | Gerrad Zhang');
    });
  });

  describe('isFeatureEnabled', () => {
    it('should return true for enabled features', () => {
      expect(isFeatureEnabled('darkMode')).toBe(true);
      expect(isFeatureEnabled('search')).toBe(true);
      expect(isFeatureEnabled('comments')).toBe(true);
    });
  });
}); 