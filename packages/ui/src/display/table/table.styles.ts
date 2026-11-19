import { StyleSheet } from 'react-native';

import { createStyles } from '@/core/theme/theme.utils';
import { TABLE_DESIGN } from './table.constants';

export const styles = StyleSheet.create({
  row: { flexDirection: 'row' },
  cell: { justifyContent: 'center' },
  // Cells line up their content by the column's align, and the text inside follows.
  left: { alignItems: 'flex-start' },
  center: { alignItems: 'center' },
  right: { alignItems: 'flex-end' },
  textLeft: { textAlign: 'left' },
  textCenter: { textAlign: 'center' },
  textRight: { textAlign: 'right' },
  uppercase: { textTransform: 'uppercase', letterSpacing: 0.4 },
  numbers: { fontVariant: ['tabular-nums'] },
  empty: { alignItems: 'center', justifyContent: 'center' },
  scrollContent: { flexGrow: 1 },
});

/** The design's header, rows and box in the theme's colors and spacing. */
export const themed = createStyles((t) => {
  const look = TABLE_DESIGN[t.design];
  return {
    root: { gap: t.spacing.sm },
    cell: { paddingHorizontal: t.spacing.md },
    header: { minHeight: look.headerHeight, backgroundColor: look.headerFill ? t.colors[look.headerFill] : undefined },
    row: { minHeight: look.rowHeight, paddingVertical: t.spacing.xs },
    hairline: { borderBottomWidth: StyleSheet.hairlineWidth, borderBottomColor: t.colors.border },
    stripe: { backgroundColor: t.colors.surface },
    sorted: { color: t.colors.text },
    box: look.outlined
      ? { borderWidth: StyleSheet.hairlineWidth, borderColor: t.colors.border, borderRadius: t.radius[look.radius], overflow: 'hidden' }
      : {},
    empty: { minHeight: look.rowHeight * 2 },
  };
});
