import { describe, expect, it } from 'vitest';
import { conceptMeta, getConceptMeta, getPhaseColor } from './web3Concepts';

describe('Web3 Concepts Utils', () => {
  describe('getConceptMeta', () => {
    it('should return metadata for a known slug', () => {
      expect(getConceptMeta('bitcoin')).toEqual({
        name: '比特币',
        nameEn: 'Bitcoin',
        phaseId: 1,
        color: 'indigo',
      });
    });

    it('should look up slugs case-insensitively', () => {
      expect(getConceptMeta('Bitcoin')).toEqual(getConceptMeta('bitcoin'));
      expect(getConceptMeta('DeFi')?.nameEn).toBe('Decentralized Finance');
    });

    it('should return undefined for an unknown slug', () => {
      expect(getConceptMeta('nonexistent-concept')).toBeUndefined();
    });

    it('should return undefined for an empty slug', () => {
      expect(getConceptMeta('')).toBeUndefined();
    });

    it('should support chinese slugs', () => {
      expect(getConceptMeta('稳定币')?.nameEn).toBe('Stablecoins');
    });

    it('should omit optional color when not defined', () => {
      expect(getConceptMeta('web3')).toEqual({
        name: 'Web3',
        nameEn: 'Decentralized Web',
        phaseId: 0,
      });
    });
  });

  describe('getPhaseColor', () => {
    it('should map phase ids 1-5 to their palette colors', () => {
      expect(getPhaseColor(1)).toBe('indigo');
      expect(getPhaseColor(2)).toBe('purple');
      expect(getPhaseColor(3)).toBe('emerald');
      expect(getPhaseColor(4)).toBe('amber');
      expect(getPhaseColor(5)).toBe('pink');
    });

    it('should fall back to indigo for out-of-range phase ids', () => {
      expect(getPhaseColor(6)).toBe('indigo');
      expect(getPhaseColor(99)).toBe('indigo');
    });

    it('should fall back to indigo for undefined or zero phase ids', () => {
      expect(getPhaseColor(undefined)).toBe('indigo');
      expect(getPhaseColor(0)).toBe('indigo');
    });
  });

  describe('conceptMeta data invariants', () => {
    it('should register concepts with non-empty name and nameEn', () => {
      const entries = Object.entries(conceptMeta);
      expect(entries.length).toBeGreaterThan(0);
      for (const [slug, meta] of entries) {
        expect(meta.name.trim().length, `name of "${slug}"`).toBeGreaterThan(0);
        expect(meta.nameEn.trim().length, `nameEn of "${slug}"`).toBeGreaterThan(0);
      }
    });

    it('should keep phaseId within 0-5 when present', () => {
      for (const [slug, meta] of Object.entries(conceptMeta)) {
        if (meta.phaseId !== undefined) {
          expect(meta.phaseId, `phaseId of "${slug}"`).toBeGreaterThanOrEqual(0);
          expect(meta.phaseId, `phaseId of "${slug}"`).toBeLessThanOrEqual(5);
        }
      }
    });

    it('should use lowercase keys so lookups stay case-insensitive', () => {
      for (const key of Object.keys(conceptMeta)) {
        expect(key).toBe(key.toLowerCase());
      }
    });
  });
});
