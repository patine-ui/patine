import { StyleSheet } from 'react-native';

import { createStyles } from '@/core/theme/theme.utils';
import { CENTER_TITLE_INSET, HEADER_DESIGN } from './header.constants';

export const styles = StyleSheet.create({
  bar: { flexDirection: 'row', alignItems: 'center' },
  side: { flexDirection: 'row', alignItems: 'center' },
  title: { flex: 1, minWidth: 0 },
  centered: { ...StyleSheet.absoluteFill, alignItems: 'center', justifyContent: 'center' },
  // On the web a heading is an <h1>–<h6>, which a page's stylesheet may give margins.
  heading: { margin: 0 },
  center: { alignItems: 'center' },
  centerInset: { paddingHorizontal: CENTER_TITLE_INSET },
});

export const themed = createStyles((t) => {
  const look = HEADER_DESIGN[t.design];
  return {
    root: {
      backgroundColor: t.colors.background,
      borderBottomWidth: look.border ? StyleSheet.hairlineWidth : 0,
      borderBottomColor: t.colors.border,
    },
    bar: { minHeight: look.height, paddingHorizontal: t.spacing.xs, gap: t.spacing.xs },
    titleAlone: { paddingHorizontal: t.spacing.md },
    actions: { gap: t.spacing.xs },
    large: { paddingHorizontal: t.spacing.lg, paddingBottom: t.spacing.sm },
  };
});
