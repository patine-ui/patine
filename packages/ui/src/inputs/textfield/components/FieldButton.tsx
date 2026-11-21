import { StyleSheet } from 'react-native';

import { CloseMark } from '@/core/components/CloseMark';
import { Text } from '@/core/primitives/Text';
import { Touchable } from '@/core/primitives/Touchable';
import { ACTION_HIT_SLOP } from '@/inputs/textfield/textfield.constants';
import { styles, themed } from '@/inputs/textfield/textfield.styles';
import type { FieldButtonProps } from '@/inputs/textfield/textfield.types';

/** A small button inside the field: the clear ✕, or the password's Show / Hide. Its touch area reaches 44pt. */
export const FieldButton = ({ label, spokenLabel, onPress, theme, style }: FieldButtonProps) => (
  <Touchable
    theme={theme}
    hitSlop={ACTION_HIT_SLOP}
    onPress={onPress}
    role="button"
    aria-label={spokenLabel}
    style={label ? themed(theme).button : styles.clear}
  >
    {label ? (
      <Text size="sm" weight="medium" color="primary" style={[styles.action, style]}>
        {label}
      </Text>
    ) : (
      // The `action` slot's color reaches the ✕ too.
      <CloseMark size="sm" color={String(StyleSheet.flatten(style)?.color ?? theme.colors.textSecondary)} />
    )}
  </Touchable>
);
