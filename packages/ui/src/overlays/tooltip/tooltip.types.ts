import type React from 'react';
import type { GestureResponderEvent, StyleProp, ViewStyle } from 'react-native';

import type { ThemableProps } from '@/core/core.types';
import type { TextSize, Theme } from '@/core/theme/theme.types';
import type { PopoverPlacementProps } from '@/overlays/popover/popover.types';

export interface TooltipDesign {
  background: keyof Theme['colors'];
  foreground: keyof Theme['colors'];
  radius: keyof Theme['radius'];
  paddingX: number;
  paddingY: number;
  textSize: TextSize;
  /** A hairline border and a soft shadow, for a light callout rather than a dark chip */
  raised: boolean;
  /** Point at the trigger */
  arrow: boolean;
  sideOffset: number;
}

export interface TooltipContextValue {
  delayDuration: number;
  skipDelayDuration: number;
  /** When a tooltip under this provider last closed, so the next one can skip its delay */
  closedAt: { current: number };
}

export interface TooltipProviderProps {
  children: React.ReactNode;
  /** How long the pointer rests on a trigger before its tooltip opens, in ms. Default: 500 */
  delayDuration?: number;
  /** Moving to another trigger within this many ms of a tooltip closing opens the next one at once. Default: 300 */
  skipDelayDuration?: number;
}

export interface TooltipStateOptions {
  open?: boolean;
  defaultOpen?: boolean;
  onOpenChange?: (open: boolean) => void;
  delayDuration?: number;
}

/** What the tooltip adds to the element it wraps; its own handlers still run. */
export interface TooltipChildProps {
  onHoverIn?: (e: never) => void;
  onHoverOut?: (e: never) => void;
  onFocus?: (e: never) => void;
  onBlur?: (e: never) => void;
  onPressIn?: (e: GestureResponderEvent) => void;
  onLongPress?: (e: GestureResponderEvent) => void;
  'aria-describedby'?: string;
}

export interface TooltipProps extends PopoverPlacementProps, TooltipStateOptions, ThemableProps {
  /** What it says. A string is drawn in the design's text style; keep it short and never put buttons or links in it */
  content: React.ReactNode;
  /** One element that already has its own accessible name, such as an icon Button with an `accessibilityLabel` */
  children: React.ReactElement;
  /** The tooltip's box */
  style?: StyleProp<ViewStyle>;
  testID?: string;
}
