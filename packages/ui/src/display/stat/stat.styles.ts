import { StyleSheet } from 'react-native';

import { createStyles } from '@/core/theme/theme.utils';
import { TONE_COLOR } from './stat.utils';

export const styles = StyleSheet.create({
  header: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' },
  footer: { flexDirection: 'row', alignItems: 'center', flexWrap: 'wrap' },
  pill: { paddingHorizontal: 6, paddingVertical: 1, overflow: 'hidden' },
  pillTint: { ...StyleSheet.absoluteFill, opacity: 0.12 },
});

export const themed = createStyles((t) => ({
  root: { gap: t.spacing.xs },
  header: { gap: t.spacing.sm },
  footer: { gap: t.spacing.xs },
  pill: { borderRadius: t.radius.full },
  good: { color: t.colors[TONE_COLOR.good] },
  bad: { color: t.colors[TONE_COLOR.bad] },
  neutral: { color: t.colors[TONE_COLOR.neutral] },
  goodTint: { backgroundColor: t.colors[TONE_COLOR.good] },
  badTint: { backgroundColor: t.colors[TONE_COLOR.bad] },
  neutralTint: { backgroundColor: t.colors[TONE_COLOR.neutral] },
}));
