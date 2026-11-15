import { Text as RNText } from 'react-native';

import { useComponentTheme } from '@/core/theme/ThemeProvider';
import { textStyle } from '@/core/theme/theme.utils';
import type { TextProps } from './text.types';

/** Text in the theme's type scale and colors. Scales with the user's font size setting, like React Native's Text. */
export const Text = ({ size = 'md', weight = 'regular', color = 'text', theme: themeProp, design, style, ...rest }: TextProps) => {
  const { theme } = useComponentTheme(themeProp, design);
  return <RNText style={[textStyle(theme, size, weight), { color: theme.colors[color] }, style]} {...rest} />;
};
