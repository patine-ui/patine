import { type DimensionValue, StyleSheet, type ViewStyle } from 'react-native';

import type { Theme } from '@/core/theme/theme.types';
import type { Space } from '@/foundations/stack/stack.types';
import type { BoxStyleProps } from './layout.types';

/** A spacing step's points, a number as is, or nothing. */
export const toSpace = (spacing: Theme['spacing'], space: Space | undefined) => (typeof space === 'string' ? spacing[space] : space);

/** A Box's shorthands as a style. Props left out stay out, so a `style` can still set them. */
export const getBoxStyle = (theme: Theme, p: BoxStyleProps): ViewStyle => {
  const s = (space: BoxStyleProps['padding']) => toSpace(theme.spacing, space);
  const style: ViewStyle = {
    padding: s(p.padding),
    paddingHorizontal: s(p.paddingX),
    paddingVertical: s(p.paddingY),
    margin: s(p.margin),
    marginHorizontal: s(p.marginX),
    marginVertical: s(p.marginY),
    gap: s(p.gap),
    backgroundColor: p.background && theme.colors[p.background],
    borderRadius: p.radius && theme.radius[p.radius],
    borderWidth: p.border ? StyleSheet.hairlineWidth : undefined,
    borderColor: p.border ? theme.colors.border : undefined,
    boxShadow: p.shadow && theme.shadows[p.shadow],
    flex: p.flex,
    flexDirection: p.direction ?? (p.row ? 'row' : undefined),
    flexWrap: p.wrap ? 'wrap' : undefined,
    alignItems: p.align,
    justifyContent: p.justify,
  };
  return Object.fromEntries(Object.entries(style).filter(([, v]) => v !== undefined));
};

/** How many columns at least `minWidth` wide fit across `width`, with `gap` between them. Always at least one. */
/** An AspectRatio's box: its width, and the height that keeps `ratio`. */
export const getAspectBox = (width: DimensionValue, ratio: number): ViewStyle => ({
  width,
  aspectRatio: ratio,
});

export const getColumnCount = (width: number, minWidth: number, gap: number) => Math.max(1, Math.floor((width + gap) / (minWidth + gap)));

/** One cell's width, so `columns` cells and the gaps between them fill `width` exactly. */
export const getCellWidth = (width: number, columns: number, gap: number) => (width - gap * (columns - 1)) / columns;

/** A Container's width cap, centred, with its side padding. */
export const getContainerStyle = (theme: Theme, maxWidth: number | undefined, padding: Space | undefined): ViewStyle => ({
  maxWidth,
  paddingHorizontal: toSpace(theme.spacing, padding),
});

/** A Grid's row: cells wrap, and half a gap on each cell's side is taken back at the edges. */
export const getGridRowStyle = (colGap: number, rowGap: number | undefined): ViewStyle => ({
  marginHorizontal: -colGap / 2,
  rowGap,
});

/** One Grid cell: an equal share of the row, with half a gap on each side. */
export const getGridCellStyle = (count: number, colGap: number): ViewStyle => ({
  width: `${100 / count}%`,
  paddingHorizontal: colGap / 2,
});

/** A Spacer: a fixed square of space, or nothing fixed so it grows. */
export const getSpacerStyle = (fixed: number | undefined): ViewStyle | undefined =>
  fixed === undefined
    ? undefined
    : {
        width: fixed,
        height: fixed,
        flexShrink: 0,
      };
