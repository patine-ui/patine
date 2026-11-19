import { StyleSheet } from 'react-native';

import { createStyles } from '@/core/theme/theme.utils';
import { TOAST_DESIGN, TOAST_ICON_SIZE, TOAST_MIN_HEIGHT, TOAST_TYPE } from './toast.constants';
import { getToastColors } from './toast.utils';

export const styles = StyleSheet.create({
  toaster: { ...StyleSheet.absoluteFill, pointerEvents: 'box-none' },
  fromTop: { flexDirection: 'column' },
  fromBottom: { flexDirection: 'column-reverse' },
  item: { width: '100%' },
  card: { flexDirection: 'row', alignItems: 'center', minHeight: TOAST_MIN_HEIGHT },
  body: { flex: 1, gap: 2 },
  icon: {
    width: TOAST_ICON_SIZE,
    height: TOAST_ICON_SIZE,
    borderRadius: TOAST_ICON_SIZE / 2,
    alignItems: 'center',
    justifyContent: 'center',
  },
  glyph: { fontSize: 12, lineHeight: 14, fontWeight: '700' },
});

/** The toaster and its toasts in the design's look; the type only changes the icon's color. */
export const themed = createStyles((t) => {
  const look = TOAST_DESIGN[t.design];
  const colors = getToastColors(t, look, TOAST_TYPE.default);
  return {
    toaster: { alignItems: look.align, gap: t.spacing.sm },
    item: { maxWidth: look.maxWidth },
    card: {
      gap: t.spacing.md,
      paddingVertical: t.spacing.sm,
      paddingStart: t.spacing.lg,
      paddingEnd: t.spacing.md,
      borderRadius: t.radius[look.radius],
      backgroundColor: colors.background,
      borderWidth: look.border ? 1 : 0,
      borderColor: colors.border,
      boxShadow: t.shadows[look.shadow],
    },
    text: { color: colors.text },
    secondary: { color: colors.secondary },
    action: { color: colors.action },
    glyph: { color: colors.background },
  };
});

/** Each toast type's icon fill. */
export const accentStyles = createStyles((t) =>
  Object.fromEntries(
    Object.values(TOAST_TYPE).map((type) => [type, { backgroundColor: getToastColors(t, TOAST_DESIGN[t.design], type).accent }])
  )
);
