import { View } from 'react-native';

import { DISABLED_OPACITY } from '@/core/core.constants';
import { coreStyles } from '@/core/core.styles';
import type { ChoiceRowProps } from '@/core/core.types';
import { useFocusVisible } from '@/core/hooks/useFocusVisible';
import { focusOutline } from '@/core/utils/focus.utils';
import { PickerText } from './PickerText';
import { Touchable } from './Touchable';

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
  onFocus,
  onBlur,
  ...rest
}: ChoiceRowProps) => {
  const focus = useFocusVisible();
  const text =
    label === undefined && description === undefined ? null : (
      <View style={coreStyles.choiceText}>
        {typeof label === 'string' ? (
          <PickerText theme={theme} style={labelStyle}>
            {label}
          </PickerText>
        ) : (
          label
        )}
        {typeof description === 'string' ? (
          <PickerText theme={theme} size="sm" color="textSecondary">
            {description}
          </PickerText>
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
      aria-disabled={!!disabled}
      disabled={disabled}
      onFocus={(e) => {
        focus.onFocus();
        onFocus?.(e);
      }}
      onBlur={(e) => {
        focus.onBlur();
        onBlur?.(e);
      }}
      {...rest}
      style={[
        coreStyles.choiceRow,
        // The hover tint gets room around the text, and the negative margin keeps the label in line with the content around it.
        {
          gap: theme.spacing.md,
          borderRadius: theme.radius.md,
          paddingHorizontal: theme.spacing.sm,
          paddingVertical: theme.spacing.xs,
          marginHorizontal: -theme.spacing.sm,
        },
        controlAtEnd && coreStyles.choiceRowReverse,
        disabled && { opacity: DISABLED_OPACITY },
        focus.focusVisible && focusOutline(theme.colors.primary),
        style,
      ]}
    >
      {control}
      {text}
    </Touchable>
  );
};
