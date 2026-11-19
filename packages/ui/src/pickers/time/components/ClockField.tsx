import { Input } from '@/core/primitives/Input';
import { Text } from '@/core/primitives/Text';
import { Touchable } from '@/core/primitives/Touchable';
import { View } from '@/core/primitives/View';
import { useLabels } from '@/core/theme/ThemeProvider';
import { styles, themed } from '@/pickers/time/time.styles';
import type { ClockFieldProps } from '@/pickers/time/time.types';
import { NUMERIC_KEYBOARD_TYPE } from '@/pickers/wheel/wheel.constants';

/** The hours or the minutes in large type: a box that points the dial at them, or a field to type them into. */
export const ClockField = ({ field, dial, theme, testID }: ClockFieldProps) => {
  const words = useLabels();
  const active = dial.mode === field;
  const id = testID ? `${testID}-${field}` : undefined;

  if (dial.typing) {
    return (
      <View style={[styles.fieldColumn, themed(theme).gapXs]}>
        <Input
          theme={theme}
          size="xl"
          value={dial.fieldText(field)}
          onChangeText={(text) => dial.type(field, text)}
          onFocus={() => dial.setMode(field)}
          onBlur={dial.endTyping}
          keyboardType={NUMERIC_KEYBOARD_TYPE}
          maxLength={2}
          selectTextOnFocus
          aria-label={words.time[field]}
          style={[styles.fieldInput, themed(theme).field, active && themed(theme).fieldOn]}
          testID={id}
        />
        <Text theme={theme} size="xs" color="textSecondary">
          {words.time[field]}
        </Text>
      </View>
    );
  }
  return (
    <Touchable
      theme={theme}
      onPress={() => dial.setMode(field)}
      role="button"
      aria-label={words.time[field]}
      aria-valuetext={dial.fieldText(field)}
      aria-selected={active}
      style={[styles.field, themed(theme).fieldButton, active && themed(theme).fieldButtonOn]}
      testID={id}
    >
      <Text theme={theme} size="xl" color={active ? 'primary' : 'text'} style={styles.fieldText}>
        {dial.fieldText(field)}
      </Text>
    </Touchable>
  );
};
