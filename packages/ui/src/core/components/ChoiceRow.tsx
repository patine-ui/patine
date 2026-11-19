import type { ChoiceRowProps } from '@/core/core.types';
import { Text } from '@/core/primitives/Text';
import { Touchable } from '@/core/primitives/Touchable';
import { View } from '@/core/primitives/View';
import { styles, themed } from './components.styles';

/**
 * The row a checkbox, switch or radio sits in: the control and its label, pressable as one, at least 44pt tall,
 * announced with its role and checked state, with a keyboard focus ring.
 */
export const ChoiceRow = ({
  theme,
  role,
  checked,
  control,
  label,
  description,
  controlAtEnd = false,
  disabled,
  style,
  labelStyle,
  ...rest
}: ChoiceRowProps) => {
  const text =
    label === undefined && description === undefined ? null : (
      <View style={styles.choiceText}>
        {typeof label === 'string' ? (
          <Text theme={theme} style={labelStyle}>
            {label}
          </Text>
        ) : (
          label
        )}
        {typeof description === 'string' ? (
          <Text theme={theme} size="sm" color="textSecondary">
            {description}
          </Text>
        ) : (
          description
        )}
      </View>
    );

  return (
    <Touchable
      theme={theme}
      ripple={false}
      role={role}
      aria-label={typeof label === 'string' ? label : undefined}
      accessibilityHint={typeof description === 'string' ? description : undefined}
      aria-checked={checked}
      disabled={disabled}
      {...rest}
      style={[styles.choiceRow, themed(theme).choiceRow, controlAtEnd && styles.choiceRowReverse, style]}
    >
      {control}
      {text}
    </Touchable>
  );
};
