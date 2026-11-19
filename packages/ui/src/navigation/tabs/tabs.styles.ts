import { StyleSheet } from 'react-native';

import { createStyles } from '@/core/theme/theme.utils';
import { TABS_DESIGN, TRACK_PADDING } from './tabs.constants';

export const styles = StyleSheet.create({
  row: { flexDirection: 'row' },
  /** ScrollView grows by default, which would stretch a row inside a column. */
  list: { flexGrow: 0 },
  listContent: { flexDirection: 'row', alignItems: 'center' },
  fill: { flexGrow: 1 },
  track: { overflow: 'hidden' },
  trackContent: { padding: TRACK_PADDING, gap: 2 },
  label: { flexDirection: 'row', alignItems: 'center' },
  trigger: { flexDirection: 'row', alignItems: 'center', justifyContent: 'center' },
  pill: { position: 'absolute' },
  pillHorizontal: { top: TRACK_PADDING, bottom: TRACK_PADDING },
  pillVertical: { left: TRACK_PADDING, right: TRACK_PADDING },
  underline: { position: 'absolute' },
  underlineHorizontal: { bottom: 0 },
  underlineVertical: { start: 0 },
  hidden: { display: 'none' },
});

/** The design's track, pill, underline and tabs, by variant (`pills…`, `underline…`). */
export const themed = createStyles((t) => {
  const look = TABS_DESIGN[t.design];
  return {
    root: { gap: t.spacing.md },
    track: { backgroundColor: t.colors[look.track], borderRadius: t.radius.md },
    lineAcross: { borderColor: t.colors.border, borderBottomWidth: StyleSheet.hairlineWidth },
    lineDown: { borderColor: t.colors.border, borderStartWidth: StyleSheet.hairlineWidth },
    pill: { backgroundColor: t.colors.background, borderRadius: t.radius.sm, boxShadow: t.shadows.xs },
    underlineAcross: { height: look.indicatorSize, borderTopLeftRadius: look.indicatorSize, borderTopRightRadius: look.indicatorSize },
    underlineDown: { width: look.indicatorSize },
    underline: { backgroundColor: t.colors.primary },
    pillsTab: { minHeight: look.pillHeight, paddingHorizontal: t.spacing.md, borderRadius: t.radius.sm },
    underlineTab: { minHeight: look.underlineHeight, paddingHorizontal: t.spacing.lg },
    label: { gap: t.spacing.xs },
    pillsActive: { color: t.colors.text },
    underlineActive: { color: t.colors[look.activeLabel] },
    idle: { color: t.colors.textSecondary },
  };
});
