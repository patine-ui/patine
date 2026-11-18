import type { StyleProp, ViewStyle } from 'react-native';

import type { ThemableProps, ValueOf } from '@/core/core.types';
import type { Theme } from '@/core/theme/theme.types';
import type { STEP_STATUS, STEPS_VARIANT } from './steps.constants';

export type StepStatus = ValueOf<typeof STEP_STATUS>;
export type StepsVariant = ValueOf<typeof STEPS_VARIANT>;

export interface StepItem {
  title: string;
  description?: string;
  /** Marks the step as failed, in the danger colour */
  error?: boolean;
}

export interface StepsLabels {
  /** With `{page}` and `{count}`. Default: 'Step {page} of {count}' */
  step: string;
  /** Read after a done step. Default: 'completed' */
  completed: string;
  /** Default: 'error' */
  error: string;
}

export interface StepsProps extends ThemableProps {
  steps: readonly StepItem[];
  /** The current step, from 0. Steps before it are done; `steps.length` marks them all done */
  value: number;
  /** Makes done steps pressable, to go back to one */
  onValueChange?: (index: number) => void;
  /** 'steps' draws numbered circles; 'progress' a Progress bar with "Step 2 of 4", for narrow screens. Default: 'steps' */
  variant?: StepsVariant;
  /** Default: 'horizontal' */
  orientation?: 'horizontal' | 'vertical';
  /** Its built-in text, for translation */
  labels?: Partial<StepsLabels>;
  /** The outer view, for layout */
  style?: StyleProp<ViewStyle>;
  testID?: string;
}

export interface StepsDesign {
  size: number;
  /** The current step's circle: filled like a done one (Material), or a primary ring (the rest) */
  currentFilled: boolean;
  connector: number;
  upcomingFill: keyof Theme['colors'];
}
