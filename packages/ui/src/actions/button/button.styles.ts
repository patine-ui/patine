import { StyleSheet } from 'react-native';

import { createStyles } from '@/core/theme/theme.utils';
import { BUTTON_DESIGN, BUTTON_VARIANT } from './button.constants';
import { getButtonColors } from './button.utils';
import { FAB_DESIGN, FAB_SIZE } from './link.constants';
import { BUTTON_GROUP_DESIGN, TOGGLE_DESIGN, TOGGLE_VARIANT } from './toggle.constants';
import { getToggleColors } from './toggle.utils';

export const styles = StyleSheet.create({
  button: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
  },
  label: { textAlign: 'center' },
  underline: { textDecorationLine: 'underline' },
  fab: { flexDirection: 'row', alignItems: 'center', justifyContent: 'center' },
  groupRow: { flexDirection: 'row', alignItems: 'center' },
  groupColumn: { flexDirection: 'column', alignItems: 'stretch' },
  fabIcon_sm: { minWidth: FAB_SIZE.sm.icon, alignItems: 'center' },
  fabIcon_md: { minWidth: FAB_SIZE.md.icon, alignItems: 'center' },
  fabIcon_lg: { minWidth: FAB_SIZE.lg.icon, alignItems: 'center' },
});

/** Each variant's fill, border and text in the theme's colors, and the design's corners, gap and lift. */
export const buttonStyles = createStyles((t) => {
  const look = BUTTON_DESIGN[t.design];
  return {
    root: { gap: t.spacing.sm, borderRadius: t.radius[look.radius] },
    raised: { boxShadow: t.shadows[look.shadow] },
    ...Object.fromEntries(
      Object.values(BUTTON_VARIANT).flatMap((variant) => {
        const colors = getButtonColors(t.colors, variant);
        return [
          [variant, { backgroundColor: colors.background, borderColor: colors.border }],
          [`${variant}Label`, { color: colors.text }],
        ];
      })
    ),
  };
});

export const fabStyles = createStyles((t) => {
  const look = FAB_DESIGN[t.design];
  return {
    root: { gap: t.spacing.sm, backgroundColor: t.colors[look.fill], boxShadow: t.shadows[look.shadow] },
    extended: { paddingHorizontal: t.spacing.lg },
    label: { color: t.colors[look.onFill] },
  };
});

export const groupStyles = createStyles((t) => ({
  joined: { gap: BUTTON_GROUP_DESIGN[t.design].gap },
  dividerTop: { borderTopColor: t.colors.fillDivider },
  dividerStart: { borderStartColor: t.colors.fillDivider },
  apart: { gap: t.spacing.xs },
}));

/** A toggle's fill, border and text for each variant, pressed and not: `default_on`, `outline_off`… */
export const toggleStyles = createStyles((t) =>
  Object.fromEntries(
    Object.values(TOGGLE_VARIANT).flatMap((variant) =>
      [true, false].flatMap((pressed) => {
        const colors = getToggleColors(t.colors, TOGGLE_DESIGN[t.design], variant, pressed);
        const key = `${variant}_${pressed ? 'on' : 'off'}`;
        return [
          [key, { backgroundColor: colors.background, borderColor: colors.border }],
          [`${key}_label`, { color: colors.text }],
        ];
      })
    )
  )
);
