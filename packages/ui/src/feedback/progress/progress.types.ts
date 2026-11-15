import type { ActivityIndicatorProps, StyleProp, ViewProps, ViewStyle } from 'react-native';

import type { ThemableProps } from '@/core/core.types';
import type { Theme } from '@/core/theme/theme.types';

export interface ProgressProps extends ViewProps, ThemableProps {
  /** How far along, from 0 to `max`. Leave it out (or `null`) while the amount is unknown: a segment sweeps across */
  value?: number | null;
  /** Default: 100 */
  max?: number;
  /** The track's height. Default: from the design (4 on iOS and Material, 8 on the web and brand) */
  height?: number;
  /** The filled part */
  indicatorStyle?: StyleProp<ViewStyle>;
}

export interface ProgressDesign {
  height: number;
  track: keyof Theme['colors'];
}

export interface SpinnerProps extends Omit<ActivityIndicatorProps, 'color'>, ThemableProps {
  /** A theme color. Default: 'primary' */
  color?: keyof Theme['colors'];
  /** Read by screen readers. Default: 'Loading' */
  accessibilityLabel?: string;
}
