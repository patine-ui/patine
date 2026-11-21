import { StyleSheet } from 'react-native';

import { SHADOW_LEVEL } from '@/core/theme/theme.constants';
import { createStyles } from '@/core/theme/theme.utils';
import { CARD_DESIGN } from './card.constants';

export const styles = StyleSheet.create({
  card: { overflow: 'hidden' },
  footer: { flexDirection: 'row', alignItems: 'center' },
  headerRow: { flexDirection: 'row', alignItems: 'flex-start' },
  headerText: { flex: 1 },
  action: { flexShrink: 0 },
});

/** The design's card surface, its sections' padding, and each shadow level . */
export const themed = createStyles((t) => {
  const look = CARD_DESIGN[t.design];
  return {
    surface: {
      borderRadius: t.radius[look.radius],
      backgroundColor: look.border ? t.colors.background : t.colors.surface,
      borderWidth: look.border ? StyleSheet.hairlineWidth : 0,
      borderColor: t.colors.border,
      paddingVertical: t.spacing.lg,
      gap: t.spacing.lg,
    },
    header: { paddingHorizontal: t.spacing.lg, gap: t.spacing.xs },
    headerRow: { gap: t.spacing.md },
    headerText: { gap: t.spacing.xs },
    content: { paddingHorizontal: t.spacing.lg },
    footer: { paddingHorizontal: t.spacing.lg, gap: t.spacing.sm },
  };
});

/** Each elevation step as a style, by level. */
export const shadowStyles = createStyles((t) =>
  Object.fromEntries(Object.values(SHADOW_LEVEL).map((level) => [level, { boxShadow: t.shadows[level] }]))
);
