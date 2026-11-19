import type { Design } from '@/core/theme/theme.types';
import type { NumberFieldDesign, StepperDesign } from './field.types';

export const NUMBER_BUTTONS = {
  split: 'split',
  end: 'end',
  stacked: 'stacked',
} as const;

export const STEP_GLYPH = { [-1]: '−', 1: '+' } as const;
export const STACKED_GLYPH = { [-1]: '▾', 1: '▴' } as const;

/**
 * ios: UIStepper, a 94×32 gray track split by a hairline, without the value. material: two tonal round icon buttons around
 * the value. web: a compact outlined group. brand: an outlined pill with 44pt buttons.
 */
export const STEPPER_DESIGN: Record<Design, StepperDesign> = {
  brand: { height: 44, buttonWidth: 44, radius: 'full', shape: 'outlined', showValue: true },
  ios: { height: 32, buttonWidth: 47, radius: 'sm', shape: 'filled', showValue: false },
  material: { height: 40, buttonWidth: 40, radius: 'full', shape: 'separate', showValue: true },
  web: { height: 36, buttonWidth: 36, radius: 'sm', shape: 'outlined', showValue: true },
};

export const NUMBER_FIELD_DESIGN: Record<Design, NumberFieldDesign> = {
  brand: { buttons: NUMBER_BUTTONS.split },
  ios: { buttons: NUMBER_BUTTONS.end },
  material: { buttons: NUMBER_BUTTONS.split },
  web: { buttons: NUMBER_BUTTONS.stacked },
};

/** Holding a step button steps once, waits this long, then repeats at the interval, as UIStepper does. */
export const REPEAT_DELAY = 400;
export const REPEAT_INTERVAL = 80;

/** NumberField's step buttons: 32pt squares, or three quarters as wide when stacked. */
export const STEP_SIZE = 32;
