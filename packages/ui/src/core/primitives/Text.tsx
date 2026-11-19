import { Text as RNText } from 'react-native';

import { MAX_FONT_SCALE } from '@/core/a11y/a11y.constants';
import { colorStyles, startAlign } from '@/core/core.styles';
import { useComponentTheme, useDirection } from '@/core/theme/ThemeProvider';
import { textStyle } from '@/core/theme/theme.utils';
import type { TextProps } from './primitives.types';

/**
 * Text in the theme's type scale and colors. Scales with the user's font size setting, like React Native's Text, up to
 * `MAX_FONT_SCALE` so fixed-height controls don't clip it. On the web it starts at the layout's start edge: the browser would
 * otherwise align each string by its own script, so a Latin name in a right-to-left list would sit on the left.
 */
export const Text = ({
  size = 'md',
  weight = 'regular',
  font = 'body',
  color = 'text',
  theme: themeProp,
  design,
  style,
  maxFontSizeMultiplier = MAX_FONT_SCALE,
  ...rest
}: TextProps) => {
  const { theme } = useComponentTheme(themeProp, design);
  const dir = useDirection();
  return (
    <RNText
      maxFontSizeMultiplier={maxFontSizeMultiplier}
      style={[startAlign[dir], textStyle(theme, size, weight, font), colorStyles(theme)[color], style]}
      {...rest}
    />
  );
};
