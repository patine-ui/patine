import { ActivityIndicator } from 'react-native';

import { Text } from '@/core/primitives/Text';
import { Touchable } from '@/core/primitives/Touchable';
import { ThemeScope, useComponentTheme } from '@/core/theme/ThemeProvider';
import { BUTTON_DESIGN, BUTTON_SIZE, BUTTON_VARIANT } from './button.constants';
import { buttonStyles, styles } from './button.styles';
import type { ButtonProps } from './button.types';
import { getButtonBox, getButtonColors, isRaisedVariant } from './button.utils';

/**
 * A button in shadcn/ui's variants and sizes, drawn in the active design, with hover, press feedback, a keyboard focus ring,
 * and a 44pt touch area on phones.
 */
export const Button = ({
  children,
  variant = BUTTON_VARIANT.default,
  size = BUTTON_SIZE.default,
  loading = false,
  disabled,
  startIcon,
  endIcon,
  theme: themeProp,
  design,
  style,
  styles: slots,
  ...rest
}: ButtonProps) => {
  const { theme, themeOverride } = useComponentTheme(themeProp, design);
  const look = BUTTON_DESIGN[theme.design];
  const sheet = buttonStyles(theme);
  const box = getButtonBox(look, size);
  const blocked = !!disabled || loading;
  const label =
    typeof children === 'string' || typeof children === 'number' ? (
      <Text
        size={size === BUTTON_SIZE.icon ? look.textSize.default : look.textSize[size]}
        weight={look.weight}
        numberOfLines={1}
        style={[styles.label, sheet[`${variant}Label`], variant === BUTTON_VARIANT.link && styles.underline, slots?.label]}
      >
        {children}
      </Text>
    ) : (
      children
    );

  return (
    <ThemeScope theme={themeOverride}>
      <Touchable
        pressScale
        role="button"
        disabled={blocked}
        aria-busy={loading}
        {...rest}
        style={[styles.button, box, sheet.root, sheet[variant], isRaisedVariant(variant) && !blocked && sheet.raised, style]}
      >
        {loading ? <ActivityIndicator size="small" color={getButtonColors(theme.colors, variant).text} /> : startIcon}
        {size === BUTTON_SIZE.icon && loading ? null : label}
        {endIcon}
      </Touchable>
    </ThemeScope>
  );
};
