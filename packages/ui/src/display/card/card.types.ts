import type React from 'react';
import type { GestureResponderEvent, PressableStateCallbackType, StyleProp, ViewProps, ViewStyle } from 'react-native';

import type { ThemableProps } from '@/core/core.types';
import type { ShadowLevel, Theme } from '@/core/theme/theme.types';

export interface CardProps extends ViewProps, ThemableProps {
  /** Its elevation, a step on the theme's shadow scale. Default: the design's (`xs` in brand and web, `none` in iOS and Material) */
  shadow?: ShadowLevel;
  /** Makes the whole card pressable: a button for screen readers and the keyboard, with hover lift and press feedback */
  onPress?: (event: GestureResponderEvent) => void;
  onLongPress?: (event: GestureResponderEvent) => void;
  /** Hover lift and focus ring without `onPress`, for a card a parent link or gesture handles. Default: true when `onPress` is set */
  interactive?: boolean;
  /** Dims a pressable card and ignores presses */
  disabled?: boolean;
  /** Shorthand: the CardTitle. With any shorthand prop, `children` go in a CardContent */
  title?: React.ReactNode;
  /** Shorthand: the CardDescription under the title */
  description?: React.ReactNode;
  /** Shorthand: the CardFooter's content, such as Buttons */
  footer?: React.ReactNode;
}

export interface CardSectionProps extends ViewProps {
  theme?: ThemableProps['theme'];
}

export interface CardDesign {
  radius: keyof Theme['radius'];
  border: boolean;
  shadow: ShadowLevel;
  /** How many steps up the shadow scale a hovered or focused card rises */
  hoverSteps: number;
  /** How far up a hovered card moves, in points. 0 keeps it in place, as Material's state layer does */
  hoverLift: number;
  /** Tint the card while hovered, as Material's state layer does. Designs that lift it show the lift alone */
  hoverTint: boolean;
}

/** What `useCardPress` gives an interactive card. */
export interface CardPressState {
  /** The theme for the press feedback: without the hover tint in designs that lift instead */
  feedbackTheme: Theme;
  focusVisible: boolean;
  handlers: { onHoverIn: () => void; onHoverOut: () => void; onFocus: () => void; onBlur: () => void };
  /** The card's lift and shadow for its hover, focus and press state */
  style: (state: PressableStateCallbackType) => StyleProp<ViewStyle>;
}
