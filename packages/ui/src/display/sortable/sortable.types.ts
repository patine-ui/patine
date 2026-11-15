import type React from 'react';
import type { Animated, ScrollViewProps, StyleProp, ViewStyle } from 'react-native';

import type { ThemableProps, ValueOf } from '@/core/core.types';
import type { ShadowLevel, Theme } from '@/core/theme/theme.types';
import type { SORT_ACTIVATION } from './sortable.constants';

export type SortActivation = ValueOf<typeof SORT_ACTIVATION>;

/** Where a row sits in the list, from its layout. */
export interface RowLayout {
  y: number;
  height: number;
}

export interface SortableRenderInfo<T> {
  item: T;
  index: number;
  /** This row is lifted and following the finger */
  isActive: boolean;
}

export interface SortableLabels {
  /** The screen-reader action. Default: 'Move up' */
  moveUp: string;
  /** Default: 'Move down' */
  moveDown: string;
  /** Announced after a move, with `{position}` and `{count}`. Default: 'Moved to position {position} of {count}' */
  moved: string;
  /** Read on a row on the web: how to move it with keys. Default: 'Press Space to pick up, arrows to move, Space to drop' */
  keyboardHint: string;
}

export interface SortableListProps<T> extends ThemableProps, Omit<ScrollViewProps, 'children'> {
  /** The items in their current order */
  data: readonly T[];
  /** A stable key for each item */
  keyExtractor: (item: T, index: number) => string;
  renderItem: (info: SortableRenderInfo<T>) => React.ReactNode;
  /** The new order, after a drag, a key or a screen-reader action. Set `data` to it */
  onReorder: (data: T[], move: { from: number; to: number }) => void;
  /** 'longPress' lifts a row by holding it (and by a SortableHandle); 'handle' only by a SortableHandle. Default: 'longPress' */
  activation?: SortActivation;
  /** Each row's name for screen readers, e.g. the item's title */
  getItemLabel?: (item: T) => string;
  /** Turn reordering off */
  disabled?: boolean;
  labels?: Partial<SortableLabels>;
  /** A row is lifted */
  onDragStart?: (index: number) => void;
}

export interface SortableHandleProps extends ThemableProps {
  /** Default: 'Drag to reorder' */
  accessibilityLabel?: string;
  style?: StyleProp<ViewStyle>;
  testID?: string;
}

export interface SortableDesign {
  /** The lifted row's shadow */
  shadow: ShadowLevel;
  /** How much it grows as it lifts */
  scale: number;
  /** Its fill while lifted, so rows under it don't show through */
  fill: keyof Theme['colors'];
  /** The handle's mark: iOS's three lines, or a grid of six dots */
  handle: 'lines' | 'dots';
}

/** What each row reads from the list. */
export interface SortableRowContext {
  theme: Theme;
  active: boolean;
  disabled: boolean;
  /** Lift this row, from a long press or a handle */
  lift: () => void;
  /** The press ended; drop if no drag followed */
  release: () => void;
}

export interface SortableRowProps {
  itemKey: string;
  index: number;
  count: number;
  shift: number;
  active: boolean;
  dragging: boolean;
  grabbed: boolean;
  drag: Animated.Value;
  label?: string;
  labels: SortableLabels;
  activation: SortActivation;
  disabled: boolean;
  theme: Theme;
  onLayout: (key: string, layout: RowLayout) => void;
  onLift: (index: number) => void;
  onRelease: () => void;
  onMove: (index: number, delta: number) => void;
  onGrab: (key: string | null) => void;
  children: React.ReactNode;
}
