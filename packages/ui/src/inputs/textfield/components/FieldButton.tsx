import { PickerText } from '@/core/components/PickerText';
import { Touchable } from '@/core/components/Touchable';
import { ACTION_HIT_SLOP } from '@/inputs/textfield/textfield.constants';
import { styles } from '@/inputs/textfield/textfield.styles';
import type { FieldButtonProps } from '@/inputs/textfield/textfield.types';

/** A small button inside the field: the clear ×, or the password's Show / Hide. Its touch area reaches 44pt. */
export const FieldButton = ({ label, accessibilityLabel, onPress, glyph = false, theme, style }: FieldButtonProps) => (
  <Touchable
    theme={theme}
    hitSlop={ACTION_HIT_SLOP}
    onPress={onPress}
    accessibilityRole="button"
    accessibilityLabel={accessibilityLabel}
    style={{ borderRadius: theme.radius.sm }}
  >
    <PickerText
      theme={theme}
      size={glyph ? 'lg' : 'sm'}
      weight={glyph ? 'regular' : 'medium'}
      color={glyph ? 'textSecondary' : 'primary'}
      style={[styles.action, style]}
    >
      {label}
    </PickerText>
  </Touchable>
);
