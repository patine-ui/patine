import { StyleSheet } from 'react-native';

import { createStyles } from '@/core/theme/theme.utils';
import {
  CHIP_HEIGHT,
  DISABLED_ITEM_OPACITY,
  ICON_POSITION_DIRECTION,
  LIST_DESIGN,
  OUTLINED_SEGMENT_HEIGHT,
  SCROLL_ARROW_SIZE,
  SEGMENT_GAP,
  SEGMENT_HEIGHT,
  TRACK_PADDING,
} from './segmented.constants';

export const styles = StyleSheet.create({
  /** ScrollView grows by default, which would stretch a row inside a column. */
  list: { flexGrow: 0 },
  content: { flexDirection: 'row', alignItems: 'center' },
  item: { flexDirection: 'row', alignItems: 'center', justifyContent: 'center' },
  chip: { height: CHIP_HEIGHT },
  track: { overflow: 'hidden' },
  trackContent: { flexGrow: 1, padding: TRACK_PADDING, gap: SEGMENT_GAP },
  segmentSlot: { flexGrow: 1 },
  segment: { height: SEGMENT_HEIGHT },
  outlinedTrack: { borderWidth: 1 },
  outlinedContent: { flexGrow: 1 },
  outlinedSegment: { borderRadius: 0 },
  outlinedSegmentHeight: { height: OUTLINED_SEGMENT_HEIGHT },
  thumb: { position: 'absolute', top: TRACK_PADDING, bottom: TRACK_PADDING },
  arrowFrame: { flexDirection: 'row', alignItems: 'center' },
  /** Grows and shrinks from its content width: a zero basis (`flex: 1`) collapses it when the frame sizes to its children. */
  arrowFrameList: { flexGrow: 1, flexShrink: 1 },
  arrowSlot: { position: 'absolute', top: 0, bottom: 0, justifyContent: 'center' },
  arrowSlotLeft: { left: 0 },
  arrowSlotRight: { right: 0 },
  arrow: {
    width: SCROLL_ARROW_SIZE,
    height: SCROLL_ARROW_SIZE,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
  },
  arrowText: { lineHeight: 20 },
  left: { flexDirection: ICON_POSITION_DIRECTION.left },
  right: { flexDirection: ICON_POSITION_DIRECTION.right },
  top: { flexDirection: ICON_POSITION_DIRECTION.top },
  bottom: { flexDirection: ICON_POSITION_DIRECTION.bottom },
  disabledItem: { opacity: DISABLED_ITEM_OPACITY },
  divided: { borderStartWidth: 1 },
  undivided: { borderStartWidth: 0 },
});

/** The track, thumb, items and labels: a filled track, Material's outlined segments, or chips. */
export const themed = createStyles((t) => {
  const { outlined } = LIST_DESIGN[t.design];
  return {
    track: outlined
      ? { borderColor: t.colors.textSecondary, borderRadius: t.radius.full }
      : { backgroundColor: t.colors.border, borderRadius: t.radius.md },
    chips: { gap: t.spacing.sm },
    thumb: { backgroundColor: t.colors.background, borderRadius: t.radius.sm, boxShadow: t.shadows.xs },
    item: { gap: t.spacing.xs, paddingHorizontal: t.spacing.md },
    stacked: { paddingVertical: t.spacing.xs },
    segment: { borderRadius: t.radius.sm, backgroundColor: 'transparent' },
    chip: { borderRadius: t.radius.full, backgroundColor: t.colors.surface },
    chipOn: { backgroundColor: t.colors.primaryMuted },
    outlinedOn: { backgroundColor: t.colors.primaryMuted, borderColor: t.colors.textSecondary },
    outlinedOff: { backgroundColor: 'transparent', borderColor: t.colors.textSecondary },
    outlinedChipOn: { borderRadius: t.radius.sm, borderWidth: 0 },
    outlinedChipOff: { borderRadius: t.radius.sm, borderWidth: 1 },
    label: { color: t.colors.text },
    labelOn: { color: outlined ? t.colors.text : t.colors.primary },
    segmentLabel: { color: outlined ? t.colors.text : t.colors.textSecondary },
    arrow: { backgroundColor: t.colors.background, borderColor: t.colors.border, borderRadius: t.radius.full, boxShadow: t.shadows.xs },
    arrowFrame: { gap: t.spacing.xs },
  };
});
