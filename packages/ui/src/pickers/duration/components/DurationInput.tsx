import { Input } from '@/core/primitives/Input';
import { Text } from '@/core/primitives/Text';
import { View } from '@/core/primitives/View';
import { styles, themed } from '@/pickers/duration/duration.styles';
import type { DurationInputProps } from '@/pickers/duration/duration.types';
import { getMaxDigits } from '@/pickers/duration/duration.utils';
import { useDurationInput } from '@/pickers/duration/hooks/useDurationInput';
import { styles as timeStyles } from '@/pickers/time/time.styles';
import { NUMERIC_KEYBOARD_TYPE } from '@/pickers/wheel/wheel.constants';

/** Material's take on a duration: a box per unit to type the number into, the unit beside it, as in its time input. */
export const DurationInput = ({ columns, theme, style, testID }: DurationInputProps) => {
  const input = useDurationInput();
  return (
    <View style={[styles.input, themed(theme).input, style]} testID={testID}>
      {columns.map((column) => (
        <View key={column.key} style={[styles.inputUnit, themed(theme).unit]}>
          <Input
            theme={theme}
            size="xl"
            value={input.text(column)}
            onChangeText={(text) => input.type(column, text)}
            onFocus={() => input.focus(column)}
            onBlur={input.blur}
            keyboardType={NUMERIC_KEYBOARD_TYPE}
            maxLength={getMaxDigits(column.items)}
            selectTextOnFocus
            aria-label={column['aria-label']}
            style={[timeStyles.fieldInput, styles.field, themed(theme).field, input.focused === column.key && themed(theme).fieldOn]}
            testID={column.testID}
          />
          <Text theme={theme} color="textSecondary">
            {column.suffix}
          </Text>
        </View>
      ))}
    </View>
  );
};
