import { View } from 'react-native';

import { Touchable } from '@/core/components/Touchable';
import { ENTRY_TOGGLE_LABEL } from '@/pickers/time/time.constants';
import { styles } from '@/pickers/time/time.styles';
import type { ClockPartProps } from '@/pickers/time/time.types';

/** Switches between the dial and typing, drawn as a keyboard or a clock (views, so no icon font). */
export const EntryToggle = ({ dial, theme, testID }: ClockPartProps) => {
  const color = theme.colors.textSecondary;
  return (
    <Touchable
      theme={theme}
      onPress={dial.toggleTyping}
      accessibilityRole="button"
      accessibilityLabel={dial.typing ? ENTRY_TOGGLE_LABEL.toDial : ENTRY_TOGGLE_LABEL.toKeyboard}
      style={[styles.entryToggle, { borderRadius: theme.radius.full }]}
      testID={testID ? `${testID}-entry` : undefined}
    >
      {dial.typing ? (
        <View style={[styles.clockIcon, { borderColor: color }]}>
          <View style={[styles.clockIconHand, { backgroundColor: color }]} />
        </View>
      ) : (
        <View style={[styles.keyboardIcon, { borderColor: color }]}>
          <View style={[styles.keyboardKeys, { borderColor: color }]} />
          <View style={[styles.keyboardKeys, { borderColor: color }]} />
        </View>
      )}
    </Touchable>
  );
};
