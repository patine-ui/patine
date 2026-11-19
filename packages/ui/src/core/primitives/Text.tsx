import { Text as RNText } from 'react-native';

import { MAX_FONT_SCALE } from '@/core/a11y/a11y.constants';
import { colorStyles } from '@/core/core.styles';
import { useComponentTheme } from '@/core/theme/ThemeProvider';
import { textStyle } from '@/core/theme/theme.utils';
import type { TextProps } from './primitives.types';

/**
 * Text in the theme's type scale and colors. Scales with the user's font size setting, like React Native's Text, up to
 * `MAX_FONT_SCALE` so fixed-height controls don't clip it.
 */
export const Text = ({
  size = 'md',
  weight = 'regular',
  color = 'text',
  theme: themeProp,
  design,
  style,
  maxFontSizeMultiplier = MAX_FONT_SCALE,
  ...rest
}: TextProps) => {
  const { theme } = useComponentTheme(themeProp, design);
  return (
    <RNText
      maxFontSizeMultiplier={maxFontSizeMultiplier}
      style={[textStyle(theme, size, weight), colorStyles(theme)[color], style]}
      {...rest}
    />
  );
};
