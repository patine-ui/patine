import type React from 'react';
import type { StyleProp, ViewStyle } from 'react-native';

import type { ThemableProps, ValueOf } from '@/core/core.types';
import type { TextSize, Theme } from '@/core/theme/theme.types';
import type { SWIPE_SIDE } from './swipeable.constants';

export type SwipeSide = ValueOf<typeof SWIPE_SIDE>;

export interface SwipeAction {
  label: string;
  /** Drawn above the label */
  icon?: React.ReactNode;
  /** 'destructive' is red, 'primary' the theme's primary, 'default' a neutral gray. Default: 'default' */
  variant?: 'default' | 'primary' | 'destructive';
  /** A colour of your own, over the variant's */
  color?: string;
  onPress: () => void;
}

export interface SwipeableRowProps extends ThemableProps {
  children: React.ReactNode;
  /** Revealed by swiping right (left in RTL), outermost first */
  leadingActions?: readonly SwipeAction[];
  /** Revealed by swiping left, outermost first: the first sits at the edge */
  trailingActions?: readonly SwipeAction[];
  /** A long swipe runs the outermost action on that side, as iOS Mail's delete does. Default: false */
  fullSwipe?: boolean;
  /** The row's own fill, which covers the actions. Default: the List's fill for the design */
  backgroundColor?: string;
  /** Dims it and ignores input. Default: false */
  disabled?: boolean;
  /** Opened or closed by a swipe, a key or an action */
  onOpenChange?: (side: SwipeSide | null) => void;
  /** The outer view, for layout */
  style?: StyleProp<ViewStyle>;
  testID?: string;
}

export interface SwipeDesign {
  actionWidth: number;
  labelSize: TextSize;
  /** The neutral action's fill */
  neutral: keyof Theme['colors'];
  /** How far past the actions a swipe stretches before it resists, as a share of the overshoot */
  resistance: number;
}

/** Where a released swipe goes. */
export type SwipeRelease = { kind: 'close' } | { kind: 'open'; side: SwipeSide } | { kind: 'full'; side: SwipeSide };
