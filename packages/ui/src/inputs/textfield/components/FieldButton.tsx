import { Text } from '@/core/primitives/Text';
import { Touchable } from '@/core/primitives/Touchable';
import { ACTION_HIT_SLOP } from '@/inputs/textfield/textfield.constants';
import { styles, themed } from '@/inputs/textfield/textfield.styles';
import type { FieldButtonProps } from '@/inputs/textfield/textfield.types';

/** A small button inside the field: the clear ×, or the password's Show / Hide. Its touch area reaches 44pt. */
export const FieldButton = ({ label, spokenLabel, onPress, glyph = false, theme, style }: FieldButtonProps) => (
  <Touchable theme={theme} hitSlop={ACTION_HIT_SLOP} onPress={onPress} role="button" aria-label={spokenLabel} style={themed(theme).button}>
    <Text
      size={glyph ? 'lg' : 'sm'}
      weight={glyph ? 'regular' : 'medium'}
      color={glyph ? 'textSecondary' : 'primary'}
      style={[styles.action, style]}
    >
      {label}
    </Text>
  </Touchable>
);
