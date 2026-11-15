import type { TextProps as RNTextProps } from 'react-native';

import type { ThemableProps } from '@/core/core.types';
import type { TextSize, TextWeight, Theme } from '@/core/theme/theme.types';
import type { HEADING_SIZE } from './text.constants';

export type ThemeColor = keyof Theme['colors'];

export interface TextProps extends RNTextProps, ThemableProps {
  /** A step of the theme's type scale. Default: 'md' */
  size?: TextSize;
  /** Default: 'regular' */
  weight?: TextWeight;
  /** One of the theme's colors. Default: 'text' */
  color?: ThemeColor;
}

export type HeadingLevel = keyof typeof HEADING_SIZE;

export interface HeadingProps extends Omit<TextProps, 'size'> {
  /** 1 to 4. Sets the size and, for screen readers and the web's `<h1>`–`<h4>`, the heading level. Default: 2 */
  level?: HeadingLevel;
  /** Overrides the size the level gives */
  size?: TextSize;
}
