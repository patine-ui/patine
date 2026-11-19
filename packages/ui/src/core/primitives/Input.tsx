import { TextInput } from 'react-native';

import { MAX_FONT_SCALE } from '@/core/a11y/a11y.constants';
import { cs } from '@/core/core.styles';
import { useTheme } from '@/core/theme/ThemeProvider';
import { textStyle } from '@/core/theme/theme.utils';
import type { InputProps } from './primitives.types';

/**
 * A TextInput in the theme's type and colors: secondary placeholder, primary caret and selection, font scaling capped at
 * `MAX_FONT_SCALE`, and no browser outline, since the field around it draws its own focus. `style` goes on top.
 */
export const Input = ({
  ref,
  theme: themeProp,
  size = 'md',
  style,
  placeholderTextColor,
  selectionColor,
  cursorColor,
  maxFontSizeMultiplier = MAX_FONT_SCALE,
  ...rest
}: InputProps) => {
  const theme = useTheme(themeProp);
  return (
    <TextInput
      ref={ref}
      placeholderTextColor={placeholderTextColor ?? theme.colors.textSecondary}
      selectionColor={selectionColor ?? theme.colors.primary}
      cursorColor={cursorColor ?? theme.colors.primary}
      maxFontSizeMultiplier={maxFontSizeMultiplier}
      {...rest}
      style={[textStyle(theme, size), cs.noOutline, style]}
    />
  );
};
