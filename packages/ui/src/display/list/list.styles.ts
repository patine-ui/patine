import { StyleSheet } from 'react-native';

import { createStyles } from '@/core/theme/theme.utils';
import { LIST_DESIGN } from './list.constants';

export const styles = StyleSheet.create({
  group: { overflow: 'hidden' },
  /** Inside a container that already pads its content: no margin of its own */
  flush: { marginHorizontal: 0 },
  row: { flexDirection: 'row', alignItems: 'center' },
  content: { flex: 1, alignSelf: 'stretch' },
  text: { flexGrow: 1, flexShrink: 1, flexBasis: 'auto', minWidth: 0 },
  end: { flexDirection: 'row', alignItems: 'center', flexShrink: 0 },
  // With a value, the title keeps its line and the value gives way (truncates) first, as iOS settings rows do. A control
  // (a switch) never shrinks.
  endYields: { flexShrink: 4, minWidth: 0 },
  value: { flexShrink: 1 },
  // The row box already dims a disabled row; its button doesn't dim again.
  opaque: { opacity: 1 },
  // On the web a heading is an <h1>–<h6>, which a page's stylesheet may give margins.
  heading: { margin: 0 },
  bulletItem: { flexDirection: 'row', alignItems: 'flex-start' },
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
    // A tall leading element (an account's avatar) grows the row and keeps clear of its edges, never touching them.
    leading: { marginEnd: t.spacing.md, paddingVertical: t.spacing.md },
    content: { minHeight: look.minHeight, paddingEnd: t.spacing.lg, paddingVertical: t.spacing.sm, gap: t.spacing.sm },
    end: { gap: t.spacing.sm },
    // The text as the row's button: the row's full height, so it's as easy to hit as a whole row.
    press: { alignSelf: 'stretch', justifyContent: 'center', marginVertical: -t.spacing.sm, paddingVertical: t.spacing.sm },
    item: { paddingStart: t.spacing.lg },
    line: { borderTopWidth: StyleSheet.hairlineWidth, borderTopColor: t.colors.border },
  };
});

/** A BulletList's spacing: a small gap between items and between each bullet and its text. */
export const bulletStyles = createStyles((t) => ({
  root: { gap: t.spacing.xs },
  item: { gap: t.spacing.sm },
}));
