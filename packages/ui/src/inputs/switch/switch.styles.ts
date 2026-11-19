import { StyleSheet } from 'react-native';

import { createStyles } from '@/core/theme/theme.utils';
import { SWITCH_DESIGN, SWITCH_OUTLINE_WIDTH } from './switch.constants';
import { getThumbMotion } from './switch.utils';

export const styles = StyleSheet.create({
  track: { justifyContent: 'center', overflow: 'hidden' },
  thumb: { position: 'absolute', top: 0, left: 0 },
  fill: { position: 'absolute', top: 0, right: 0, bottom: 0, left: 0 },
});

/** The design's track and thumb. An absolute child sits inside the border, so the outlined track's border lifts the thumb. */
export const themed = createStyles((t) => {
  const look = SWITCH_DESIGN[t.design];
  const thumb = getThumbMotion(look);
  const border = look.outlinedOff ? SWITCH_OUTLINE_WIDTH : 0;
  return {
    track: {
      width: look.trackWidth,
      height: look.trackHeight,
      borderRadius: look.trackHeight / 2,
      backgroundColor: look.outlinedOff ? t.colors.surface : t.colors.border,
      borderWidth: border,
      borderColor: t.colors.textSecondary,
    },
    on: { backgroundColor: t.colors.primary },
    thumb: {
      width: thumb.size,
      height: thumb.size,
      borderRadius: thumb.size / 2,
      boxShadow: t.shadows.sm,
      top: (look.trackHeight - thumb.size) / 2 - border,
      backgroundColor: look.outlinedOff ? t.colors.textSecondary : t.colors.onPrimary,
    },
    thumbOn: { borderRadius: thumb.size / 2, backgroundColor: t.colors.onPrimary },
  };
});
