import { StyleSheet } from 'react-native';

import { createStyles } from '@/core/theme/theme.utils';
import { INDICATOR, TABBAR_DESIGN } from './tabbar.constants';

export const styles = StyleSheet.create({
  bar: { flexDirection: 'row' },
  items: { flex: 1, flexDirection: 'row' },
  rail: { alignItems: 'center' },
  item: { alignItems: 'center', justifyContent: 'center' },
  itemInBar: { flex: 1, alignSelf: 'stretch' },
  icon: { alignItems: 'center', justifyContent: 'center', minWidth: 28, minHeight: 28 },
  pill: { width: INDICATOR.width, height: INDICATOR.height, borderRadius: INDICATOR.height / 2 },
  badge: {
    position: 'absolute',
    top: -4,
    minWidth: 16,
    height: 16,
    paddingHorizontal: 4,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
  },
  dot: { position: 'absolute', top: 2, width: 8, height: 8, borderRadius: 4 },
  badgeText: { fontSize: 10, lineHeight: 14 },
});

/** The design's bar, rail, items and selected look in the theme's colors. */
export const themed = createStyles((t) => {
  const look = TABBAR_DESIGN[t.design];
  return {
    bar: {
      height: look.height,
      paddingHorizontal: t.spacing.xs,
      backgroundColor: t.colors[look.background],
      borderTopWidth: look.border ? StyleSheet.hairlineWidth : 0,
      borderTopColor: t.colors.border,
    },
    rail: {
      width: look.railWidth,
      gap: t.spacing.lg,
      backgroundColor: t.colors[look.background],
      borderEndWidth: look.border ? StyleSheet.hairlineWidth : 0,
      borderEndColor: t.colors.border,
    },
    railItems: { gap: t.spacing.xs },
    item: { gap: look.indicator ? 4 : 2, borderRadius: t.radius.md },
    itemInRail: { width: look.railWidth, paddingVertical: t.spacing.sm },
    pillOn: { backgroundColor: t.colors.primaryMuted },
    badge: { backgroundColor: t.colors.danger, start: look.indicator ? INDICATOR.width / 2 + 4 : 18 },
    badgeText: { color: t.colors.onDanger },
    selected: { color: t.colors[look.selectedColor] },
    unselected: { color: t.colors.textSecondary },
  };
});
