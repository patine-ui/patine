import type { Design } from '@/core/theme/theme.types';
import type { ListDesign } from './list.types';

export const LIST_SEPARATOR = {
  /** Starts where the text starts, after the leading icon, as iOS does it */
  inset: 'inset',
  full: 'full',
  none: 'none',
} as const;

/**
 * iOS: an inset grouped table on a filled surface, uppercase section headers, chevrons on rows that navigate.
 * Material 3: full-width rows without dividers, 56dp tall, headers in the primary color.
 * The web: an outlined box with full-width dividers. Brand: an outlined card with inset dividers and chevrons.
 */
export const LIST_DESIGN: Record<Design, ListDesign> = {
  brand: {
    radius: 'lg',
    fill: 'background',
    border: true,
    inset: true,
    separator: LIST_SEPARATOR.inset,
    minHeight: 52,
    chevron: true,
    headerUppercase: false,
    headerColor: 'textSecondary',
  },
  ios: {
    radius: 'md',
    fill: 'surface',
    border: false,
    inset: true,
    separator: LIST_SEPARATOR.inset,
    minHeight: 44,
    chevron: true,
    headerUppercase: true,
    headerColor: 'textSecondary',
  },
  material: {
    radius: null,
    fill: 'background',
    border: false,
    inset: false,
    separator: LIST_SEPARATOR.none,
    minHeight: 56,
    chevron: false,
    headerUppercase: false,
    headerColor: 'primary',
  },
  web: {
    radius: 'md',
    fill: 'background',
    border: true,
    inset: true,
    separator: LIST_SEPARATOR.full,
    minHeight: 48,
    chevron: false,
    headerUppercase: false,
    headerColor: 'textSecondary',
  },
};

/** The mark before each BulletList item. */
export const BULLET = '•';
