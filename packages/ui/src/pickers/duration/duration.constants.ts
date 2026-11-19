import type { Design } from '@/core/theme/theme.types';
import { TIME_DISPLAY } from '@/pickers/time/time.constants';
import type { DurationDisplay, DurationUnit } from './duration.types';

export const DURATION_UNIT = {
  hours: 'hours',
  minutes: 'minutes',
  seconds: 'seconds',
} as const;

export const DURATION_UNITS: DurationUnit[] = [DURATION_UNIT.hours, DURATION_UNIT.minutes, DURATION_UNIT.seconds];

/** The narrowest a typed box gets on a small screen: two digits still fit. */
export const DURATION_FIELD_MIN_WIDTH = 56;

/** iOS scrolls wheels like its countdown timer, Material types the numbers like its time input, and the web clicks from columns. */
export const DURATION_DISPLAY_DESIGN: Record<Design, DurationDisplay> = {
  brand: TIME_DISPLAY.list,
  ios: TIME_DISPLAY.wheel,
  material: TIME_DISPLAY.input,
  web: TIME_DISPLAY.list,
};
