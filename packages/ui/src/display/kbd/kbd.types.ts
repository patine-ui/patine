import type { StyleProp, TextStyle, ViewProps, ViewStyle } from 'react-native';

import type { ThemableProps } from '@/core/core.types';
import type { Theme } from '@/core/theme/theme.types';

export interface KbdProps extends Omit<ViewProps, 'children'>, ThemableProps {
  /** One key: a letter, a word, or a symbol like ⌘ */
  children?: string;
  /** A shortcut, one key each, drawn side by side: `['⌘', 'K']`. Wins over `children` */
  keys?: readonly string[];
  /** Between the keys of a shortcut. Default: none, as macOS menus show it; '+' as Windows does */
  separator?: string;
  /** Default: 'md' */
  size?: 'sm' | 'md';
  style?: StyleProp<ViewStyle>;
  textStyle?: StyleProp<TextStyle>;
}

export interface KbdDesign {
  /** A thicker bottom edge, like a physical keycap */
  keycap: boolean;
  fill: keyof Theme['colors'];
  radius: number;
}
