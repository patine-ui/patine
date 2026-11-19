import type { StyleProp, ViewProps, ViewStyle } from 'react-native';

import type { SlotStyles, ThemableProps } from '@/core/core.types';
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
  /** The outer view, for layout */
  style?: StyleProp<ViewStyle>;
  /** Styles for its parts: `text` */
  styles?: SlotStyles<'text'>;
}

export interface KbdDesign {
  /** A thicker bottom edge, like a physical keycap */
  keycap: boolean;
  fill: keyof Theme['colors'];
  radius: number;
}
