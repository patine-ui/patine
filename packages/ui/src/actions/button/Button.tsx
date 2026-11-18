import { ActivityIndicator } from 'react-native';

import { Touchable } from '@/core/components/Touchable';
import { DISABLED_OPACITY, PLATFORM } from '@/core/core.constants';
import { useFocusVisible } from '@/core/hooks/useFocusVisible';
import { useComponentTheme, usePlatform } from '@/core/theme/ThemeProvider';
import { focusOutline } from '@/core/utils/focus.utils';
import { Text } from '@/foundations/text/Text';
import { BUTTON_DESIGN, BUTTON_SIZE, BUTTON_VARIANT } from './button.constants';
import { styles } from './button.styles';
import type { ButtonProps } from './button.types';
import { getButtonBox, getButtonColors, getHitSlop, isRaisedVariant } from './button.utils';

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
  labelStyle,
  onFocus,
  onBlur,
  ...rest
}: ButtonProps) => {
  const { theme, themeOverride } = useComponentTheme(themeProp, design);
  const platform = usePlatform();
  const focus = useFocusVisible();
  const look = BUTTON_DESIGN[theme.design];
  const colors = getButtonColors(theme.colors, variant);
  const box = getButtonBox(look, size);
  const blocked = !!disabled || loading;
  const label =
    typeof children === 'string' || typeof children === 'number' ? (
      <Text
        theme={themeOverride}
        size={size === BUTTON_SIZE.icon ? look.textSize.default : look.textSize[size]}
        weight={look.weight}
        numberOfLines={1}
        style={[styles.label, { color: colors.text }, variant === BUTTON_VARIANT.link && styles.underline, labelStyle]}
      >
        {children}
      </Text>
    ) : (
      children
    );

  return (
    <Touchable
      theme={theme}
      pressScale
      role="button"
      disabled={blocked}
      aria-disabled={blocked}
      aria-busy={loading}
      hitSlop={getHitSlop(box.width, box.height, platform === PLATFORM.web)}
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
        styles.button,
        box,
        {
          gap: theme.spacing.sm,
          borderRadius: theme.radius[look.radius],
          backgroundColor: colors.background,
          borderColor: colors.border,
          boxShadow: isRaisedVariant(variant) && !blocked ? theme.shadows[look.shadow] : undefined,
        },
        blocked && { opacity: DISABLED_OPACITY },
        focus.focusVisible && focusOutline(theme.colors.primary),
        style,
      ]}
    >
      {loading ? <ActivityIndicator size="small" color={colors.text} /> : startIcon}
      {size === BUTTON_SIZE.icon && loading ? null : label}
      {endIcon}
    </Touchable>
  );
};
