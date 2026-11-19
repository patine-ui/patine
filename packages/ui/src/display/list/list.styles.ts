import { StyleSheet } from 'react-native';

import { createStyles } from '@/core/theme/theme.utils';
import { LIST_DESIGN } from './list.constants';

export const styles = StyleSheet.create({
  group: { overflow: 'hidden' },
  row: { flexDirection: 'row', alignItems: 'center' },
  content: { flex: 1, alignSelf: 'stretch' },
  text: { flex: 1, minWidth: 0 },
  end: { flexDirection: 'row', alignItems: 'center', flexShrink: 0 },
  value: { flexShrink: 1 },
  // On the web a heading is an <h1>–<h6>, which a page's stylesheet may give margins.
  heading: { margin: 0 },
  uppercase: { textTransform: 'uppercase', letterSpacing: 0.4 },
});

/** The design's group box, rows and separators in the theme's colors and spacing. */
export const themed = createStyles((t) => {
  const look = LIST_DESIGN[t.design];
  return {
    root: { marginHorizontal: look.inset ? t.spacing.lg : 0, gap: t.spacing.sm },
    padded: { paddingHorizontal: t.spacing.lg },
    group: {
      backgroundColor: t.colors[look.fill],
      borderRadius: look.radius ? t.radius[look.radius] : 0,
      borderWidth: look.border ? StyleSheet.hairlineWidth : 0,
      borderColor: t.colors.border,
    },
    leading: { marginEnd: t.spacing.md },
    content: { minHeight: look.minHeight, paddingEnd: t.spacing.lg, paddingVertical: t.spacing.sm, gap: t.spacing.sm },
    end: { gap: t.spacing.sm },
    item: { paddingStart: t.spacing.lg },
    line: { borderTopWidth: StyleSheet.hairlineWidth, borderTopColor: t.colors.border },
  };
});
