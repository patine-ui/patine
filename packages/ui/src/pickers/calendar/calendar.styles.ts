import { StyleSheet } from 'react-native';

import { MIN_TOUCH_TARGET } from '@/core/a11y/a11y.constants';
import { createStyles } from '@/core/theme/theme.utils';

export const styles = StyleSheet.create({
  header: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' },
  titleButton: { flexDirection: 'row', alignItems: 'center', paddingVertical: 6, paddingHorizontal: 8 },
  caret: { marginStart: 6 },
  arrows: { flexDirection: 'row', gap: 4 },
  arrow: { width: 36, height: 36, alignItems: 'center', justifyContent: 'center' },
  arrowText: { lineHeight: 22 },
  week: { flexDirection: 'row' },
  weekdays: { marginBottom: 4 },
  weekdayText: { textAlign: 'center' },
  uppercase: { textTransform: 'uppercase' },
  cell: { flex: 1, alignItems: 'center', justifyContent: 'center' },
  dayInner: { alignItems: 'center', justifyContent: 'center' },
  todayRing: { borderWidth: 1.5 },
  band: { position: 'absolute', start: 0, end: 0 },
  bandFromCenter: { start: '50%' },
  bandToCenter: { end: '50%' },
  dayLabel: { fontSize: 9, marginTop: -2 },
  dots: { flexDirection: 'row', gap: 2, position: 'absolute', bottom: 4 },
  dot: { width: 4, height: 4, borderRadius: 2 },
  quickGrid: { justifyContent: 'space-evenly' },
  presets: { marginBottom: 8 },
  expandClip: { overflow: 'hidden' },
  expandHandle: { alignItems: 'center', justifyContent: 'center', height: 28 },
  grabber: { width: 36, height: 5, borderRadius: 3 },
  quickCell: { flex: 1, marginHorizontal: 6, height: MIN_TOUCH_TARGET, alignItems: 'center', justifyContent: 'center' },
});

/** The calendar's header, grid cells and days in the theme's colours. */
export const themed = createStyles((t) => ({
  header: { paddingHorizontal: t.spacing.sm, marginBottom: t.spacing.sm },
  title: { borderRadius: t.radius.sm },
  round: { borderRadius: t.radius.full },
  handle: { backgroundColor: t.colors.handle },
  quickGrid: { paddingHorizontal: t.spacing.sm },
  quickOn: { backgroundColor: t.colors.primary },
  band: { backgroundColor: t.colors.primaryMuted },
  filled: { backgroundColor: t.colors.primary },
  tinted: { backgroundColor: t.colors.primaryMuted },
  todayRing: { borderColor: t.colors.primary },
  todaySurface: { backgroundColor: t.colors.surface },
  labelOnFill: { color: t.colors.onPrimary },
  label: { color: t.colors.textSecondary },
  dotOnFill: { backgroundColor: t.colors.onPrimary },
}));
