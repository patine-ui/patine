import type { Theme } from '@/core/theme/theme.types';
import { clamp } from '@/core/utils/track.utils';
import { STEP_STATUS } from './steps.constants';
import type { StepItem, StepStatus, StepsDesign } from './steps.types';

/** A step's state from where the current step is. */
export const stepStatus = (step: StepItem, index: number, value: number): StepStatus => {
  if (step.error) return STEP_STATUS.error;
  if (index < value) return STEP_STATUS.complete;
  return index === value ? STEP_STATUS.current : STEP_STATUS.upcoming;
};

/** Fills `{page}` and `{count}`. */
export const formatStep = (template: string, page: number, count: number) =>
  template.replace('{page}', String(page)).replace('{count}', String(count));

/** The current step held to the list, for the progress bar and its caption. */
export const clampStep = (value: number, count: number) => clamp(value, 0, count);

/** A step circle's fill, border and mark colors for its status. */
export const getStepColors = (colors: Theme['colors'], look: StepsDesign, status: StepStatus) => {
  const filled = status === STEP_STATUS.complete || status === STEP_STATUS.error || (status === STEP_STATUS.current && look.currentFilled);
  const fill =
    status === STEP_STATUS.error
      ? colors.danger
      : filled
        ? colors.primary
        : status === STEP_STATUS.current
          ? colors.background
          : colors[look.upcomingFill];
  return {
    fill,
    border: status === STEP_STATUS.current ? colors.primary : status === STEP_STATUS.upcoming ? colors.outline : fill,
    ink:
      status === STEP_STATUS.error
        ? colors.onDanger
        : filled
          ? colors.onPrimary
          : status === STEP_STATUS.current
            ? colors.primary
            : colors.textSecondary,
  };
};
