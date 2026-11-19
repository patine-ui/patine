import type React from 'react';
import type { DimensionValue, View, ViewProps, ViewStyle } from 'react-native';

import type { DeepPartial } from '@/core/core.types';
import type { ShadowLevel, Theme } from '@/core/theme/theme.types';
import type { Space } from '@/foundations/stack/stack.types';
import type { CONTAINER_WIDTH } from './layout.constants';

interface LayoutBase extends ViewProps {
  /** Component-level theme override, merged on top of the provider theme */
  theme?: DeepPartial<Theme>;
  /** The underlying view, e.g. to `measure()` it */
  ref?: React.Ref<React.ComponentRef<typeof View>>;
}

/** Spacing and surface shorthands, each from the theme. */
export interface BoxStyleProps {
  padding?: Space;
  paddingX?: Space;
  paddingY?: Space;
  margin?: Space;
  marginX?: Space;
  marginY?: Space;
  /** Space between children */
  gap?: Space;
  /** A theme color for the fill, e.g. 'surface' */
  background?: keyof Theme['colors'];
  /** A step of the theme's corner radius */
  radius?: keyof Theme['radius'];
  /** A hairline in the theme's border color. Default: false */
  border?: boolean;
  /** A step of the theme's elevation scale */
  shadow?: ShadowLevel;
  flex?: number;
  /** Lay children in a row. Default: a column, as a View does */
  row?: boolean;
  /** 'row' or 'column'; wins over `row`. Default: a column */
  direction?: 'column' | 'row';
  /** Wrap onto new lines when the children don't fit */
  wrap?: boolean;
  align?: ViewStyle['alignItems'];
  justify?: ViewStyle['justifyContent'];
}

export interface BoxProps extends LayoutBase, BoxStyleProps {}

export interface SpacerProps extends Omit<ViewProps, 'children'> {
  /** A fixed space, a spacing step or points. Default: none, so it grows to fill the free space of its row or column */
  size?: Space;
  theme?: DeepPartial<Theme>;
}

export interface CenterProps extends LayoutBase {
  /** Fill the parent, so the child sits in the middle of the screen or card. Default: false */
  fill?: boolean;
}

export type ContainerSize = keyof typeof CONTAINER_WIDTH;

export interface ContainerProps extends LayoutBase {
  /** Its widest: 'sm' 640, 'md' 768, 'lg' 1024, 'xl' 1280, 'full' none. Default: 'lg' */
  size?: ContainerSize;
  /** Space on the left and right. Default: 'lg' */
  padding?: Space;
}

export interface GridProps extends LayoutBase {
  /** A fixed number of equal columns. Default: 2 */
  columns?: number;
  /** As many columns as fit at least this wide, re-flowing as the grid resizes. Wins over `columns` */
  minColumnWidth?: number;
  /** Space between cells, both ways. Default: 'md' */
  gap?: Space;
  /** Space between rows. Default: `gap` */
  rowGap?: Space;
  /** Space between columns. Default: `gap` */
  columnGap?: Space;
  children?: React.ReactNode;
}

export interface AspectRatioProps extends LayoutBase {
  /** Width over height, e.g. `16 / 9`. Default: 1 */
  ratio?: number;
  /** Default: '100%' */
  width?: DimensionValue;
}
