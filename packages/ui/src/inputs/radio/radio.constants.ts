import type { Design } from '@/core/theme/theme.types';
import type { RadioDesign } from './radio.types';

export const RADIO_INDICATOR = {
  circle: 'circle',
  check: 'check',
} as const;

/** iOS has no radio button; its lists mark the chosen row with a check at the end, so the iOS design does too. */
export const RADIO_DESIGN: Record<Design, RadioDesign> = {
  brand: { indicator: RADIO_INDICATOR.circle, size: 20, dot: 10, ringWidth: 1.5, offColor: 'outline' },
  ios: { indicator: RADIO_INDICATOR.check, size: 22, dot: 0, ringWidth: 0, offColor: 'textDisabled' },
  material: { indicator: RADIO_INDICATOR.circle, size: 20, dot: 10, ringWidth: 2, offColor: 'textSecondary' },
  web: { indicator: RADIO_INDICATOR.circle, size: 16, dot: 8, ringWidth: 1.5, offColor: 'textSecondary' },
};
