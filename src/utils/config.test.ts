import { describe, expect, it } from 'vitest';
import { formatPageTitle, getSiteConfig, isFeatureEnabled } from './config';

describe('Config Utils', () => {
  describe('getSiteConfig', () => {
    it('should return site configuration', () => {
      const config = getSiteConfig();
      
      expect(config).toBeDefined();
      expect(config.title).toBe('Product WhoAmI');
      expect(config.description).toBe('Personal portfolio website combining blog functionality with product showcase capabilities');
      expect(config.author).toBe('Gerrad Zhang');
    });
  });

  describe('formatPageTitle', () => {
    it('should format page title correctly', () => {
      const result = formatPageTitle('About');
      expect(result).toBe('About | Product WhoAmI');
    });

    it('should handle empty title', () => {
      const result = formatPageTitle('');
      expect(result).toBe(' | Product WhoAmI');
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