import type { Design } from '@/core/theme/theme.types';
import type { TableDesign } from './table.types';

/**
 * web: shadcn's Table, gray header text and a line under each row. material: Material's data table, 56dp header and 52dp
 * rows in an outlined box. ios: list-like 44pt rows under a small capitalized header. brand: outlined, a tinted header.
 */
export const TABLE_DESIGN: Record<Design, TableDesign> = {
  brand: { headerHeight: 40, rowHeight: 48, outlined: true, headerFill: 'surface', headerUppercase: false, cellSize: 'sm', radius: 'md' },
  ios: { headerHeight: 32, rowHeight: 44, outlined: false, headerFill: null, headerUppercase: true, cellSize: 'md', radius: 'md' },
  material: { headerHeight: 56, rowHeight: 52, outlined: true, headerFill: null, headerUppercase: false, cellSize: 'sm', radius: 'sm' },
  web: { headerHeight: 40, rowHeight: 48, outlined: false, headerFill: null, headerUppercase: false, cellSize: 'sm', radius: 'md' },
};

export const SORT_ARROW = { asc: '↑', desc: '↓' } as const;
export const DEFAULT_EMPTY_TEXT = 'No results.';
