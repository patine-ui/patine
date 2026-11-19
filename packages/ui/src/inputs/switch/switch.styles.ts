import { StyleSheet } from 'react-native';

import { createStyles } from '@/core/theme/theme.utils';
import { SWITCH_DESIGN, SWITCH_OUTLINE_WIDTH } from './switch.constants';
import { getThumbMotion } from './switch.utils';

export const styles = StyleSheet.create({
  track: { justifyContent: 'center', overflow: 'hidden' },
  // Anchored at the start, and slid toward the end (Switch flips the slide in right to left), as iOS and Android do.
  thumb: { position: 'absolute', top: 0, start: 0 },
  fill: { position: 'absolute', top: 0, right: 0, bottom: 0, left: 0 },
  busy: { position: 'absolute', top: 0, right: 0, bottom: 0, left: 0, alignItems: 'center', justifyContent: 'center' },
  dots: { flexDirection: 'row', alignItems: 'center' },
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
    // A three-quarter ring that turns; with reduced motion, three still dots as wide as it.
    spinner: {
      width: look.spinner,
      height: look.spinner,
      borderRadius: look.spinner / 2,
      borderWidth: look.spinnerStroke,
    },
    // The gap after the colour, so it wins on the web, where the shorthand would cover it.
    spinnerOn: { borderColor: t.colors.primary, borderTopColor: 'transparent' },
    spinnerOff: { borderColor: t.colors[look.spinnerOff], borderTopColor: 'transparent' },
    dots: { gap: look.spinner / 8 },
    dot: { width: look.spinner / 4, height: look.spinner / 4, borderRadius: look.spinner / 8 },
    dotOn: { backgroundColor: t.colors.primary },
    dotOff: { backgroundColor: t.colors[look.spinnerOff] },
  };
});
