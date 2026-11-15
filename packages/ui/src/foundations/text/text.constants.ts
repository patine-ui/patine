import type { TextSize } from '@/core/theme/theme.types';

/** The type-scale step each heading level draws at. */
export const HEADING_SIZE = {
  1: '3xl',
  2: '2xl',
  3: 'xl',
  4: 'lg',
} as const satisfies Record<number, TextSize>;
