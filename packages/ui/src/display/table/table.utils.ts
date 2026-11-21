import type { ViewStyle } from 'react-native';

import { endAlign, startAlign } from '@/core/core.styles';
import type { FontRole, LayoutDirection } from '@/core/theme/theme.types';
import { styles } from './table.styles';
import type { TableAlign, TableColumn, TableSort } from './table.types';

/** A cell's value: the column's accessor, or the row's field named by the column's key. */
export const getCellValue = <T>(row: T, column: TableColumn<T>) =>
  column.accessor ? column.accessor(row) : (row as Record<string, unknown>)[column.key];

/** Numbers, and anything end-aligned (amounts already formatted as text), draw in the theme's numeric font. */
export const getCellFont = (value: unknown, align: TableAlign | undefined): FontRole =>
  typeof value === 'number' || align === 'end' ? 'numeric' : 'body';

const collator = new Intl.Collator(undefined, { numeric: true, sensitivity: 'base' });

/** Compares two cell values: numbers by size, text the way people sort it ("item 2" before "item 10"), empty ones last. */
export const compareValues = (a: unknown, b: unknown) => {
  const emptyA = a === null || a === undefined || a === '';
  const emptyB = b === null || b === undefined || b === '';
  if (emptyA || emptyB) return Number(emptyA) - Number(emptyB);
  if (typeof a === 'number' && typeof b === 'number') return a - b;
  return collator.compare(String(a), String(b));
};

/** The rows in the sort's order; stable, so equal rows keep their order. Empty values stay last either way. */
export const sortRows = <T>(rows: readonly T[], columns: readonly TableColumn<T>[], sort: TableSort | null | undefined): T[] => {
  const column = sort && columns.find((c) => c.key === sort.key);
  if (!sort || !column) return [...rows];
  const sign = sort.direction === 'asc' ? 1 : -1;
  return rows
    .map((row, index) => ({
      row,
      index,
      value: getCellValue(row, column),
    }))
    .sort((x, y) => {
      const emptyX = x.value === null || x.value === undefined || x.value === '';
      const emptyY = y.value === null || y.value === undefined || y.value === '';
      if (emptyX !== emptyY) return emptyX ? 1 : -1;
      return sign * compareValues(x.value, y.value) || x.index - y.index;
    })
    .map(({ row }) => row);
};

/** The sort after pressing a column's header: ascending, then descending, then none; another column starts ascending. */
export const nextSort = (current: TableSort | null | undefined, key: string): TableSort | null => {
  const direction = !current || current.key !== key ? 'asc' : current.direction === 'asc' ? 'desc' : null;
  return (
    direction && {
      key,
      direction,
    }
  );
};

/** The `aria-sort` of a header. */
export const getAriaSort = (sort: TableSort | null | undefined, key: string): 'ascending' | 'descending' | 'none' =>
  sort?.key === key ? (sort.direction === 'asc' ? 'ascending' : 'descending') : 'none';

/** A column's share of the row: its fixed width, or its flex (1 by default). */
export const getColumnBox = <T>(column: TableColumn<T>): ViewStyle => (column.width ? { width: column.width } : { flex: column.flex ?? 1 });

/** The text alignment for a column's align, in the reading direction (the web doesn't flip `textAlign` by itself). */
export const getTextAlign = (align: TableAlign | undefined, dir: LayoutDirection) =>
  align === 'end' ? endAlign[dir] : align === 'center' ? styles.textCenter : startAlign[dir];

/** A row's key: from `keyExtractor`, the row's `id`, or its index. */
export const getRowKey = <T>(row: T, index: number, keyExtractor?: (row: T, index: number) => string) =>
  keyExtractor?.(row, index) ?? String((row as { id?: string | number }).id ?? index);

/** The table's box when it scrolls sideways: at least `minWidth`, growing to fill. */
export const getTableWidth = (minWidth: number | undefined): ViewStyle | null =>
  minWidth
    ? {
        minWidth,
        flexGrow: 1,
      }
    : null;
