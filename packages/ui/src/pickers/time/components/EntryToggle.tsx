import { Touchable } from '@/core/primitives/Touchable';
import { View } from '@/core/primitives/View';
import { useLabels } from '@/core/theme/ThemeProvider';
import { styles, themed } from '@/pickers/time/time.styles';
import type { ClockPartProps } from '@/pickers/time/time.types';

/** Switches between the dial and typing, drawn as a keyboard or a clock (views, so no icon font). */
export const EntryToggle = ({ dial, theme, testID }: ClockPartProps) => {
  const words = useLabels();
  return (
    <Touchable
      theme={theme}
      onPress={dial.toggleTyping}
      role="button"
      aria-label={dial.typing ? words.time.toDial : words.time.toKeyboard}
      style={[styles.entryToggle, themed(theme).round]}
      testID={testID ? `${testID}-entry` : undefined}
    >
      {dial.typing ? (
        <View style={[styles.clockIcon, themed(theme).iconStroke]}>
          <View style={[styles.clockIconHand, themed(theme).iconFill]} />
        </View>
      ) : (
        <View style={[styles.keyboardIcon, themed(theme).iconStroke]}>
          <View style={[styles.keyboardKeys, themed(theme).iconStroke]} />
          <View style={[styles.keyboardKeys, themed(theme).iconStroke]} />
        </View>
      )}
    </Touchable>
  );
};
