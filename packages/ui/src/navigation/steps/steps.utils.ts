import { STEP_STATUS } from './steps.constants';
import type { StepItem, StepStatus } from './steps.types';

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
export const clampStep = (value: number, count: number) => Math.min(Math.max(0, value), count);
