import type React from 'react';
import type { GestureResponderEvent, StyleProp, ViewProps, ViewStyle } from 'react-native';

import type { ThemableProps, TouchableState } from '@/core/core.types';
import type { ShadowLevel, Theme } from '@/core/theme/theme.types';

export interface CardProps extends ViewProps, ThemableProps {
  /** Its elevation, a step on the theme's shadow scale. Default: the design's (`xs` in brand and web, `none` in iOS and Material) */
  shadow?: ShadowLevel;
  /** Makes the whole card pressable: a button for screen readers and the keyboard, with hover lift and press feedback */
  onPress?: (event: GestureResponderEvent) => void;
  /** Makes the whole card a link to here: a real link (`<a href>`) on the web that crawlers follow, opened with `Linking` on iOS and Android. Call `event.preventDefault()` in `onPress` to keep it from opening */
  href?: string;
  /** With `href`, opens in a new tab on the web. Default: false */
  external?: boolean;
  /** Makes the whole card pressable on a long press */
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
  /** Shorthand: the CardAction at the end of the header, such as a Badge, a menu or a small Button */
  action?: React.ReactNode;
}

export interface CardSectionProps extends ViewProps {
  /** Theme override. Default: the Card's */
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
  handlers: { onHoverIn: () => void; onHoverOut: () => void };
  /** The card's lift and shadow for its hover, focus and press state */
  style: (state: TouchableState) => StyleProp<ViewStyle>;
}
