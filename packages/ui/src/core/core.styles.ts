import { Platform, StyleSheet } from 'react-native';

import { DISABLED_OPACITY, FOCUS_RING } from '@/core/a11y/a11y.constants';
import { createStyles } from '@/core/theme/theme.utils';

/** Common static styles: a style goes here once three or more folders use it. */
export const cs = StyleSheet.create({
  row: { flexDirection: 'row' },
  rowReverse: { flexDirection: 'row-reverse' },
  column: { flexDirection: 'column' },
  rowCenter: { flexDirection: 'row', alignItems: 'center' },
  between: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' },
  center: { alignItems: 'center', justifyContent: 'center' },
  flex1: { flex: 1 },
  grow: { flexGrow: 1 },
  shrink: { flexShrink: 1 },
  wrap: { flexWrap: 'wrap' },
  fill: { position: 'absolute', top: 0, right: 0, bottom: 0, left: 0 },
  clip: { overflow: 'hidden' },
  /** Drops the browser's focus ring; inputs show focus with a theme-colored border instead. */
  noOutline: Platform.select({ web: { outlineStyle: 'solid', outlineWidth: 0 }, default: {} }),
  disabled: { opacity: DISABLED_OPACITY },
  /** The focus ring drawn inside the control, for controls in a container that clips. */
  insetRing: { outlineOffset: -FOCUS_RING.width },
});

/** Common theme styles: the spacing scale as gaps, and hairline dividers in the theme's border color. */
export const commonStyles = createStyles((t) => ({
  gapXs: { gap: t.spacing.xs },
  gapSm: { gap: t.spacing.sm },
  gapMd: { gap: t.spacing.md },
  gapLg: { gap: t.spacing.lg },
  gapXl: { gap: t.spacing.xl },
  hairline: { height: StyleSheet.hairlineWidth, backgroundColor: t.colors.border },
  hairlineTop: { borderTopWidth: StyleSheet.hairlineWidth, borderTopColor: t.colors.border },
  hairlineBottom: { borderBottomWidth: StyleSheet.hairlineWidth, borderBottomColor: t.colors.border },
}));

/**
 * Text aligned to the start of the line on the web, by `useDirection()`: React Native Web renders Text with dir="auto", so
 * each label would otherwise align by its own script (Hebrew right, English left). Native already aligns to the start.
 */
export const startAlign = StyleSheet.create({
  ltr: Platform.select({ web: { textAlign: 'left' }, default: {} }),
  rtl: Platform.select({ web: { textAlign: 'right' }, default: {} }),
});

/** Text aligned to the end of the line, by `useDirection()`. Native swaps 'right' for right to left itself; the web doesn't. */
export const endAlign = StyleSheet.create({
  ltr: { textAlign: 'right' },
  rtl: Platform.select({ web: { textAlign: 'left' }, default: { textAlign: 'right' } }),
});

/** Each theme color as a text color: `colorStyles(theme).primary`. */
export const colorStyles = createStyles((t) =>
  Object.fromEntries(Object.entries(t.colors).map(([name, color]) => [name, { color: String(color) }]))
);
