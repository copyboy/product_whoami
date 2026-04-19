export interface Milestone {
  id: string;
  title: string;
  status: 'done' | 'learning' | 'todo' | 'empty';
  articleSlug: string | null;
}

export interface Phase {
  id: number;
  title: string;
  subtitle: string;
  painPoint: string;
  painRoot: string;
  coreQuestion: string;
  scenarios: string[];
  color: string;
  milestones: Milestone[];
}

export interface RoadmapData {
  phases: Phase[];
}

const statusEmoji: Record<Milestone['status'], string> = {
  done: '✅',
  learning: '🔄',
  todo: '🔄',
  empty: '🔄',
};

const statusLabel: Record<Milestone['status'], string> = {
  done: '已有',
  learning: '进行中',
  todo: '待学',
  empty: '待填',
};

export function getStatusEmoji(status: Milestone['status']): string {
  return statusEmoji[status];
}

export function getStatusLabel(status: Milestone['status']): string {
  return statusLabel[status];
}

export function getPhaseProgress(phase: Phase): number {
  const doneCount = phase.milestones.filter(m => m.status === 'done').length;
  return Math.round((doneCount / phase.milestones.length) * 100);
}

export function getCurrentPhase(phases: Phase[]): Phase | undefined {
  return phases.find(p =>
    p.milestones.some(m => m.status !== 'done')
  );
}

export function getCompletedMilestones(phases: Phase[]): Milestone[] {
  return phases.flatMap(p =>
    p.milestones.filter(m => m.status === 'done')
  );
}
