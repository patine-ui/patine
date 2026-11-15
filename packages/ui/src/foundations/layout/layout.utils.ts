import { StyleSheet, type ViewStyle } from 'react-native';

import type { Theme } from '@/core/theme/theme.types';
import { toSpace } from '@/foundations/stack/stack.utils';
import type { BoxStyleProps } from './layout.types';

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
    flexDirection: p.row ? 'row' : undefined,
    alignItems: p.align,
    justifyContent: p.justify,
  };
  return Object.fromEntries(Object.entries(style).filter(([, v]) => v !== undefined));
};

/** How many columns at least `minWidth` wide fit across `width`, with `gap` between them. Always at least one. */
export const getColumnCount = (width: number, minWidth: number, gap: number) => Math.max(1, Math.floor((width + gap) / (minWidth + gap)));

/** One cell's width, so `columns` cells and the gaps between them fill `width` exactly. */
export const getCellWidth = (width: number, columns: number, gap: number) => (width - gap * (columns - 1)) / columns;
