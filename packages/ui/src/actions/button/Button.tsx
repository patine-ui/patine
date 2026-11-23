import { ActivityIndicator, StyleSheet } from 'react-native';

import { Text } from '@/core/primitives/Text';
import { Touchable } from '@/core/primitives/Touchable';
import { ContentColor } from '@/core/theme/ContentColor';
import { ThemeScope, useComponentTheme } from '@/core/theme/ThemeProvider';
import { isTextContent } from '@/core/utils/text.utils';
import { BUTTON_DESIGN, BUTTON_SIZE, BUTTON_VARIANT } from './button.constants';
import { buttonStyles, styles } from './button.styles';
import type { ButtonProps } from './button.types';
import { getButtonBox, getButtonColors, iconSideOf, isRaisedVariant } from './button.utils';

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
  const square = iconSideOf(size);
  // Icons without their own color take the label's, so they match every variant and a restyled label.
  const contentColor = (StyleSheet.flatten(slots?.label)?.color as string | undefined) ?? getButtonColors(theme.colors, variant).text;
  const label = isTextContent(children) ? (
    <Text
      size={look.textSize[square ?? (size as keyof typeof look.textSize)]}
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
        feedbackColor={contentColor}
        role="button"
        disabled={blocked}
        aria-busy={loading}
        {...rest}
        style={[styles.button, box, sheet.root, sheet[variant], isRaisedVariant(variant) && !blocked && sheet.raised, style]}
      >
        <ContentColor color={contentColor}>
          {loading ? <ActivityIndicator size="small" color={contentColor} /> : startIcon}
          {square && loading ? null : label}
          {endIcon}
        </ContentColor>
      </Touchable>
    </ThemeScope>
  );
};

// Its root is one pressable, so a DropdownMenu or a ListItem takes it as a control of its own instead of wrapping it.
Button.pressable = true;
