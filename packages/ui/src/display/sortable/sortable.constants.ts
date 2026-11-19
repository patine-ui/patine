import type { Design } from '@/core/theme/theme.types';
import type { SortableDesign } from './sortable.types';

export const SORT_ACTIVATION = {
  longPress: 'longPress',
  handle: 'handle',
} as const;

/** Hold this long (ms) to lift a row: iOS and Android's long-press time. */
export const LIFT_DELAY_MS = 350;

/** Auto-scroll: how near the edge (pt) it starts, and its top speed (pt per frame). */
export const AUTO_SCROLL = { edge: 64, speed: 14 } as const;

/** Custom screen-reader actions on each row. */
export const MOVE_ACTION = { up: 'moveUp', down: 'moveDown' } as const;

/**
 * iOS: the row lifts on a wide shadow, with the three-line reorder control. Material 3: a dragged item rises to level 4 on
 * a surface fill, with the drag-indicator dots. The web and brand: a card-like shadow and a six-dot grip.
 */
export const SORTABLE_DESIGN: Record<Design, SortableDesign> = {
  brand: { shadow: 'lg', scale: 1.02, fill: 'background', handle: 'dots' },
  ios: { shadow: 'lg', scale: 1.03, fill: 'background', handle: 'lines' },
  material: { shadow: 'lg', scale: 1, fill: 'surface', handle: 'dots' },
  web: { shadow: 'md', scale: 1, fill: 'background', handle: 'dots' },
};
