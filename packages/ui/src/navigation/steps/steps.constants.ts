import type { Design } from '@/core/theme/theme.types';
import type { StepsDesign, StepsLabels } from './steps.types';

export const STEP_STATUS = {
  complete: 'complete',
  current: 'current',
  upcoming: 'upcoming',
  error: 'error',
} as const;

export const STEPS_VARIANT = {
  steps: 'steps',
  progress: 'progress',
} as const;

export const DEFAULT_STEPS_LABELS: StepsLabels = {
  step: 'Step {page} of {count}',
  completed: 'completed',
  error: 'error',
};

/**
 * Material 3: 24dp circles, the current one filled primary, 1dp connectors. iOS: 24pt circles with a primary ring for the
 * current step. The web and brand: 28px circles, a ring for the current step, 2px connectors.
 */
export const STEPS_DESIGN: Record<Design, StepsDesign> = {
  brand: { size: 28, currentFilled: false, connector: 2, upcomingFill: 'background' },
  ios: { size: 24, currentFilled: false, connector: 2, upcomingFill: 'surface' },
  material: { size: 24, currentFilled: true, connector: 1, upcomingFill: 'surface' },
  web: { size: 28, currentFilled: false, connector: 2, upcomingFill: 'background' },
};
