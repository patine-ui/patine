import type { Design } from '@/core/theme/theme.types';
import type { StatDesign } from './stat.types';

export const TREND = {
  up: 'up',
  down: 'down',
  neutral: 'neutral',
} as const;

export const TREND_ARROW = { up: '↑', down: '↓', neutral: '→' } as const;

/** brand and web: a bold figure with colored change text, as shadcn's dashboard cards. iOS and Material: the change in a tinted pill. */
export const STAT_DESIGN: Record<Design, StatDesign> = {
  brand: { valueSize: '2xl', valueWeight: 'bold', changePill: false },
  ios: { valueSize: '3xl', valueWeight: 'bold', changePill: true },
  material: { valueSize: '2xl', valueWeight: 'regular', changePill: true },
  web: { valueSize: '2xl', valueWeight: 'bold', changePill: false },
};

/** The spoken word for each trend. */
export const TREND_WORD = { up: 'up', down: 'down', neutral: 'unchanged' } as const;
