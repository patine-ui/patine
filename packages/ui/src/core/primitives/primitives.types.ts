import type {
  FlatList,
  FlatListProps,
  TextProps as RNTextProps,
  ScrollView,
  ScrollViewProps,
  TextInput,
  TextInputProps,
} from 'react-native';

import type { DeepPartial, ThemableProps } from '@/core/core.types';
import type { FontRole, TextSize, TextWeight, Theme } from '@/core/theme/theme.types';

export type ThemeColor = keyof Theme['colors'];

export interface TextProps extends RNTextProps, ThemableProps {
  /** A step of the theme's type scale. Default: 'md' */
  size?: TextSize;
  /** Default: 'regular' */
  weight?: TextWeight;
  /** Which of the theme's font roles draws it: 'numeric' also lines digits up (tabular figures). Default: 'body' */
  font?: FontRole;
  /** One of the theme's colors. Default: 'text' */
  color?: ThemeColor;
}

export interface InputProps extends TextInputProps {
  /** A theme override; leave it out to use the one in scope */
  theme?: DeepPartial<Theme>;
  /** A step of the theme's type scale. Default: 'md' */
  size?: TextSize;
  ref?: React.Ref<React.ComponentRef<typeof TextInput>>;
}

export interface ScrollProps extends ScrollViewProps {
  ref?: React.Ref<React.ComponentRef<typeof ScrollView>>;
}

export type VirtualListProps<T> = FlatListProps<T> & {
  ref?: React.Ref<FlatList<T>>;
};
