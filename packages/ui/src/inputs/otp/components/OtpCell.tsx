import { Animated, View } from 'react-native';

import { PickerText } from '@/core/components/PickerText';
import { CARET_HEIGHT_RATIO } from '@/inputs/otp/otp.constants';
import { styles } from '@/inputs/otp/otp.styles';
import type { OtpCellProps } from '@/inputs/otp/otp.types';
import { FOCUS_RING_WIDTH } from '@/overlays/sheet/sheet.constants';

/** One character of the code in a box drawn like the design's text fields, with the caret while it's next to fill. */
export const OtpCell = ({ cell, caretOpacity, invalid, look, theme, slots, testID }: OtpCellProps) => {
  const c = theme.colors;
  const borderWidth = cell.focused ? look.openBorderWidth : 1;
  const fontSize = theme.typography.sizes.xl;

  return (
    <View
      style={[
        styles.cell,
        {
          height: look.minHeight,
          backgroundColor: c.background,
          borderWidth,
          borderColor: invalid ? c.danger : cell.focused ? c.primary : c[look.outline],
          borderRadius: theme.radius.md,
        },
        cell.focused && look.focusRing && { boxShadow: `0px 0px 0px ${FOCUS_RING_WIDTH}px ${c.primaryMuted}` },
        slots?.cell,
        cell.filled && slots?.filledCell,
        cell.focused && slots?.focusedCell,
      ]}
      testID={testID}
    >
      {cell.caret ? (
        <Animated.View
          style={[styles.caret, { height: fontSize * CARET_HEIGHT_RATIO, backgroundColor: c.primary, opacity: caretOpacity }, slots?.caret]}
        />
      ) : (
        <PickerText theme={theme} size="xl" weight="medium" style={slots?.cellText}>
          {cell.char}
        </PickerText>
      )}
    </View>
  );
};
