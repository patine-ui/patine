import { Input } from '@/core/primitives/Input';
import { View } from '@/core/primitives/View';
import { NUMERIC_KEYBOARD_TYPE } from '@/pickers/wheel/wheel.constants';
import { styles, themed } from '@/pickers/wheel/wheel.styles';
import type { WheelTypingInputProps } from '@/pickers/wheel/wheel.types';
import { getItemHeight } from '@/pickers/wheel/wheel.utils';

export const WheelTypingInput = ({
  value,
  numeric,
  itemHeight,
  theme,
  accessibilityLabel,
  onChangeText,
  onDone,
}: WheelTypingInputProps) => (
  <>
    <View pointerEvents="none" style={styles.centerOverlay}>
      <View style={[styles.typingRing, getItemHeight(itemHeight), themed(theme).typingRing]} />
    </View>
    <Input
      theme={theme}
      autoFocus
      value={value}
      onChangeText={onChangeText}
      onSubmitEditing={onDone}
      onBlur={onDone}
      keyboardType={numeric ? NUMERIC_KEYBOARD_TYPE : 'default'}
      returnKeyType="done"
      autoCorrect={false}
      autoCapitalize="none"
      caretHidden
      style={styles.hiddenInput}
      aria-label={accessibilityLabel}
    />
  </>
);
