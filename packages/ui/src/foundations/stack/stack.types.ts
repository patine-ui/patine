import type { ViewProps, ViewStyle } from 'react-native';

import type { DeepPartial } from '@/core/core.types';
import type { Theme } from '@/core/theme/theme.types';

/** A step of the theme's spacing scale, or a number of points. */
export type Space = keyof Theme['spacing'] | number;

export interface StackLayout {
  /** Default: 'column' */
  direction?: 'column' | 'row';
  /** Space between children */
  gap?: Space;
  /** Space inside the edges */
  padding?: Space;
  align?: ViewStyle['alignItems'];
  justify?: ViewStyle['justifyContent'];
  /** Wrap onto new lines when the children don't fit */
  wrap?: boolean;
}

export interface StackProps extends ViewProps, StackLayout {
  /** Component-level theme override, merged on top of the provider theme */
  theme?: DeepPartial<Theme>;
}
