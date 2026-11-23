import { StyleSheet } from 'react-native';

import { createStyles } from '@/core/theme/theme.utils';
import { FIELD_DESIGN, FOCUS_RING_WIDTH } from '@/overlays/sheet/sheet.constants';
import { CARET_HEIGHT_RATIO, CARET_WIDTH, NO_ZOOM_FONT_SIZE, OTP_CELL_MAX_WIDTH, OTP_CELL_MIN_WIDTH } from './otp.constants';

export const styles = StyleSheet.create({
  // Codes read left to right, so the first cell stays on the left in a right-to-left app too.
  row: { flexDirection: 'row', justifyContent: 'center', direction: 'ltr' },
  cell: { flex: 1, minWidth: OTP_CELL_MIN_WIDTH, maxWidth: OTP_CELL_MAX_WIDTH, alignItems: 'center', justifyContent: 'center' },
  caret: { width: CARET_WIDTH },
  // Over the cells, so a tap anywhere focuses it and a long press offers to paste; the cells draw what it holds.
  input: { ...StyleSheet.absoluteFill, opacity: 0, fontSize: NO_ZOOM_FONT_SIZE },
});

/** A cell drawn like the design's text field: resting, focused (with the design's ring) and invalid. */
export const themed = createStyles((t) => {
  const look = FIELD_DESIGN[t.design];
  return {
    row: { gap: t.spacing.sm },
    cell: {
      height: look.minHeight,
      backgroundColor: t.colors.background,
      borderWidth: 1,
      borderColor: t.colors[look.outline],
      borderRadius: t.radius.md,
    },
    focused: {
      borderWidth: look.openBorderWidth,
      borderColor: t.colors.primary,
      boxShadow: look.focusRing ? `0px 0px 0px ${FOCUS_RING_WIDTH}px ${t.colors.primaryMuted}` : undefined,
    },
    invalid: { borderColor: t.colors.danger },
    caret: { height: t.typography.sizes.xl * CARET_HEIGHT_RATIO, backgroundColor: t.colors.primary },
  };
});
