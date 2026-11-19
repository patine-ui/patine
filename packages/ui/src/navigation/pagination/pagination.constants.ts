import type { Design } from '@/core/theme/theme.types';
import type { PaginationDesign } from './pagination.types';

/** brand and Material fill the current page; iOS tints it gray; the web outlines it, as shadcn does. */
export const PAGINATION_DESIGN: Record<Design, PaginationDesign> = {
  brand: { current: 'default', other: 'ghost', round: false },
  ios: { current: 'secondary', other: 'ghost', round: false },
  material: { current: 'default', other: 'ghost', round: true },
  web: { current: 'outline', other: 'ghost', round: false },
};

export const ELLIPSIS = '…';
export const PREV_ARROW = '‹';
export const NEXT_ARROW = '›';
