import { TextInput, View } from 'react-native';

import { textStyle } from '@/core';
import { PickerText } from '@/core/components/PickerText';
import { Touchable } from '@/core/components/Touchable';
import { CLOCK_MODE_LABEL } from '@/pickers/time/time.constants';
import { styles } from '@/pickers/time/time.styles';
import type { ClockFieldProps } from '@/pickers/time/time.types';
import { NUMERIC_KEYBOARD_TYPE } from '@/pickers/wheel/wheel.constants';

/** The hours or the minutes in large type: a box that points the dial at them, or a field to type them into. */
export const ClockField = ({ field, dial, theme, testID }: ClockFieldProps) => {
  const c = theme.colors;
  const active = dial.mode === field;
  const id = testID ? `${testID}-${field}` : undefined;

  if (dial.typing) {
    return (
      <View style={[styles.fieldColumn, { gap: theme.spacing.xs }]}>
        <TextInput
          value={dial.fieldText(field)}
          onChangeText={(text) => dial.type(field, text)}
          onFocus={() => dial.setMode(field)}
          onBlur={dial.endTyping}
          keyboardType={NUMERIC_KEYBOARD_TYPE}
          maxLength={2}
          selectTextOnFocus
          accessibilityLabel={CLOCK_MODE_LABEL[field]}
          style={[
            textStyle(theme, 'xl'),
            styles.fieldInput,
            {
              borderRadius: theme.radius.sm,
              backgroundColor: c.surface,
              borderColor: active ? c.primary : 'transparent',
            },
          ]}
          testID={id}
        />
        <PickerText theme={theme} size="xs" color="textSecondary">
          {CLOCK_MODE_LABEL[field]}
        </PickerText>
      </View>
    );
  }
  return (
    <Touchable
      theme={theme}
      onPress={() => dial.setMode(field)}
      accessibilityRole="button"
      accessibilityLabel={CLOCK_MODE_LABEL[field]}
      accessibilityValue={{ text: dial.fieldText(field) }}
      accessibilityState={{ selected: active }}
      style={[styles.field, { borderRadius: theme.radius.sm, backgroundColor: active ? c.primaryMuted : c.surface }]}
      testID={id}
    >
      <PickerText theme={theme} size="xl" color={active ? 'primary' : 'text'} style={styles.fieldText}>
        {dial.fieldText(field)}
      </PickerText>
    </Touchable>
  );
};
