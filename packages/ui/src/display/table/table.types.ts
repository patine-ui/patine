import type React from 'react';
import type { StyleProp, ViewProps, ViewStyle } from 'react-native';

import type { SlotStyles, ThemableProps } from '@/core/core.types';
import type { Theme } from '@/core/theme/theme.types';

export type TableAlign = 'left' | 'center' | 'right';
export type SortDirection = 'asc' | 'desc';

export interface TableSort {
  /** The column's `key` */
  key: string;
  direction: SortDirection;
}

export interface TableColumn<T> {
  /** Unique; also the row field shown and sorted on, unless `accessor` says otherwise */
  key: string;
  title: string;
  /** Default: 'left'. Put numbers on the right */
  align?: TableAlign;
  /** A fixed width in points. Default: a share of the free width (`flex`) */
  width?: number;
  /** The column's share of the free width. Default: 1 */
  flex?: number;
  /** The value to show and sort by. Default: `row[key]` */
  accessor?: (row: T) => string | number | null | undefined;
  /** Draws the cell: a badge, an avatar, a button. Default: the value as text */
  render?: (row: T, index: number) => React.ReactNode;
  /** The header sorts by this column when pressed. Default: false */
  sortable?: boolean;
}

export type TableSlot = 'table' | 'header' | 'headerCell' | 'row' | 'cell' | 'caption';

export interface TableProps<T> extends Omit<ViewProps, 'children'>, ThemableProps {
  columns: ReadonlyArray<TableColumn<T>>;
  data: ReadonlyArray<T>;
  /** Each row's key. Default: `row.id`, else the index */
  keyExtractor?: (row: T, index: number) => string;
  /** Makes each row pressable, with hover and a focus ring */
  onRowPress?: (row: T, index: number) => void;
  /** A title for the table, read first by screen readers */
  caption?: React.ReactNode;
  /** Tints every other row. Default: false */
  striped?: boolean;
  /** The sort, controlled. null is unsorted */
  sort?: TableSort | null;
  /** The sort when uncontrolled. Default: none */
  defaultSort?: TableSort | null;
  /** Called when the user presses a sortable header: ascending, then descending, then unsorted */
  onSortChange?: (sort: TableSort | null) => void;
  /** Leave `data` in the order given, for sorting on a server. Default: false */
  manualSort?: boolean;
  /** Shown when there are no rows. Default: 'No results.' */
  emptyText?: React.ReactNode;
  /** Below this width the table scrolls sideways instead of squeezing its columns */
  minWidth?: number;
  style?: StyleProp<ViewStyle>;
  styles?: SlotStyles<TableSlot>;
}

export interface TableDesign {
  headerHeight: number;
  rowHeight: number;
  /** A border and corners around the whole table */
  outlined: boolean;
  /** The header row's fill; null leaves it clear */
  headerFill: keyof Theme['colors'] | null;
  /** Header titles in capitals, small and gray, as iOS section headers */
  headerUppercase: boolean;
  cellSize: 'sm' | 'md';
  radius: keyof Theme['radius'];
}
