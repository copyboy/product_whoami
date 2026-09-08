import { describe, expect, it } from 'vitest';
import roadmapData from '../data/web3-roadmap-data.json';
import {
  getCompletedMilestones,
  getCurrentPhase,
  getPhaseProgress,
  getStatusEmoji,
  getStatusLabel,
  type Milestone,
  type Phase,
} from './web3Roadmap';

const phases = roadmapData.phases as Phase[];

const makePhase = (overrides: Partial<Phase> = {}): Phase => ({
  id: 1,
  title: 'Phase title',
  subtitle: 'Bitcoin',
  painPoint: 'pain',
  painRoot: 'root',
  coreQuestion: 'question',
  scenarios: [],
  color: 'indigo',
  milestones: [],
  ...overrides,
});

const makeMilestone = (id: string, status: Milestone['status']): Milestone => ({
  id,
  title: `title ${id}`,
  status,
  articleSlug: status === 'done' ? `${id.toLowerCase()}-slug` : null,
});

describe('Web3 Roadmap Utils', () => {
  describe('getStatusEmoji', () => {
    it('should map done to a check mark', () => {
      expect(getStatusEmoji('done')).toBe('✅');
    });

    it('should map learning, todo and empty to the in-progress mark', () => {
      expect(getStatusEmoji('learning')).toBe('🔄');
      expect(getStatusEmoji('todo')).toBe('🔄');
      expect(getStatusEmoji('empty')).toBe('🔄');
    });
  });

  describe('getStatusLabel', () => {
    it('should map each status to its chinese label', () => {
      expect(getStatusLabel('done')).toBe('已有');
      expect(getStatusLabel('learning')).toBe('进行中');
      expect(getStatusLabel('todo')).toBe('待学');
      expect(getStatusLabel('empty')).toBe('待填');
    });
  });

  describe('getPhaseProgress', () => {
    it('should return 0 when no milestone is done', () => {
      const phase = makePhase({
        milestones: [makeMilestone('M1.1', 'todo'), makeMilestone('M1.2', 'learning')],
      });
      expect(getPhaseProgress(phase)).toBe(0);
    });

    it('should return 100 when all milestones are done', () => {
      const phase = makePhase({
        milestones: [makeMilestone('M1.1', 'done'), makeMilestone('M1.2', 'done')],
      });
      expect(getPhaseProgress(phase)).toBe(100);
    });

    it('should return the rounded done ratio', () => {
      const phase = makePhase({
        milestones: [makeMilestone('M1.1', 'done'), makeMilestone('M1.2', 'todo'), makeMilestone('M1.3', 'todo')],
      });
      expect(getPhaseProgress(phase)).toBe(33);
    });

    it('should return NaN for a phase without milestones (recorded quirk, fix deferred per plan Non-Goals)', () => {
      expect(getPhaseProgress(makePhase({ milestones: [] }))).toBeNaN();
    });
  });

  describe('getCurrentPhase', () => {
    it('should prefer the phase that has a learning milestone', () => {
      const learning = makePhase({
        id: 3,
        milestones: [makeMilestone('M3.1', 'learning')],
      });
      const earlier = makePhase({ id: 1, milestones: [makeMilestone('M1.1', 'todo')] });
      expect(getCurrentPhase([earlier, learning])).toBe(learning);
    });

    it('should fall back to the first phase with a non-done milestone', () => {
      const done = makePhase({ id: 1, milestones: [makeMilestone('M1.1', 'done')] });
      const todo = makePhase({ id: 2, milestones: [makeMilestone('M2.1', 'todo')] });
      expect(getCurrentPhase([done, todo])).toBe(todo);
    });

    it('should return undefined when all phases are complete', () => {
      const done = makePhase({ id: 1, milestones: [makeMilestone('M1.1', 'done')] });
      expect(getCurrentPhase([done])).toBeUndefined();
    });

    it('should return undefined for an empty phase list', () => {
      expect(getCurrentPhase([])).toBeUndefined();
    });
  });

  describe('getCompletedMilestones', () => {
    it('should flatten done milestones across phases in order', () => {
      const a = makePhase({
        id: 1,
        milestones: [makeMilestone('M1.1', 'done'), makeMilestone('M1.2', 'todo')],
      });
      const b = makePhase({ id: 2, milestones: [makeMilestone('M2.1', 'done')] });
      expect(getCompletedMilestones([a, b]).map(m => m.id)).toEqual(['M1.1', 'M2.1']);
    });

    it('should return an empty list when nothing is done or phases are empty', () => {
      const todo = makePhase({ id: 1, milestones: [makeMilestone('M1.1', 'todo')] });
      expect(getCompletedMilestones([todo])).toEqual([]);
      expect(getCompletedMilestones([])).toEqual([]);
    });
  });

  describe('roadmap data invariants', () => {
    it('should contain exactly 5 phases with ids 1-5 in order', () => {
      expect(phases.map(p => p.id)).toEqual([1, 2, 3, 4, 5]);
    });

    it('should keep the documented phase themes', () => {
      expect(phases.map(p => p.subtitle)).toEqual(['Bitcoin', 'Ethereum', 'DApp', 'DeFi', 'DAO']);
    });

    it('should give every phase non-empty copy, scenarios, a color and 4 milestones', () => {
      for (const phase of phases) {
        expect(phase.title.trim().length, `title of phase ${phase.id}`).toBeGreaterThan(0);
        expect(phase.painPoint.trim().length, `painPoint of phase ${phase.id}`).toBeGreaterThan(0);
        expect(phase.painRoot.trim().length, `painRoot of phase ${phase.id}`).toBeGreaterThan(0);
        expect(phase.coreQuestion.trim().length, `coreQuestion of phase ${phase.id}`).toBeGreaterThan(0);
        expect(phase.scenarios.length, `scenarios of phase ${phase.id}`).toBeGreaterThan(0);
        expect(phase.color.trim().length, `color of phase ${phase.id}`).toBeGreaterThan(0);
        expect(phase.milestones.length, `milestones of phase ${phase.id}`).toBe(4);
      }
    });

    it('should give every done milestone a published article slug and unique ids per phase', () => {
      for (const phase of phases) {
        const ids = phase.milestones.map(m => m.id);
        expect(new Set(ids).size, `milestone ids of phase ${phase.id}`).toBe(ids.length);
        for (const milestone of phase.milestones) {
          if (milestone.status === 'done') {
            expect(milestone.articleSlug, `articleSlug of ${milestone.id}`).toBeTruthy();
          }
        }
      }
    });

    it('should report every data phase at 100 percent progress', () => {
      for (const phase of phases) {
        expect(getPhaseProgress(phase), `progress of phase ${phase.id}`).toBe(100);
      }
    });
  });
});
