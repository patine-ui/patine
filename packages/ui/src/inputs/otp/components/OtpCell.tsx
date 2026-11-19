import { Text } from '@/core/primitives/Text';
import { AnimatedView, View } from '@/core/primitives/View';
import { styles, themed } from '@/inputs/otp/otp.styles';
import type { OtpCellProps } from '@/inputs/otp/otp.types';

/** One character of the code in a box drawn like the design's text fields, with the caret while it's next to fill. */
export const OtpCell = ({ cell, caretOpacity, invalid, theme, slots, testID }: OtpCellProps) => {
  const sheet = themed(theme);
  // An animated value: the caret blinks.
  const blink = { opacity: caretOpacity };

  return (
    <View
      style={[
        styles.cell,
        sheet.cell,
        cell.focused && sheet.focused,
        invalid && sheet.invalid,
        slots?.cell,
        cell.filled && slots?.filledCell,
        cell.focused && slots?.focusedCell,
      ]}
      testID={testID}
    >
      {cell.caret ? (
        <AnimatedView style={[styles.caret, sheet.caret, blink, slots?.caret]} />
      ) : (
        <Text size="xl" weight="medium" style={slots?.cellText}>
          {cell.char}
        </Text>
      )}
    </View>
  );
};
