import type React from 'react';
import type { PressableProps, StyleProp, ViewStyle } from 'react-native';

import type { SlotStyles, ThemableProps, ValueOf } from '@/core/core.types';
import type { ShadowLevel, TextSize, TextWeight, Theme } from '@/core/theme/theme.types';
import type { BUTTON_SIZE, BUTTON_VARIANT, ICON_BUTTON_SIDE } from './button.constants';

export type ButtonVariant = ValueOf<typeof BUTTON_VARIANT>;
export type ButtonSize = ValueOf<typeof BUTTON_SIZE>;
type TextButtonSize = Exclude<ButtonSize, keyof typeof ICON_BUTTON_SIDE>;

export interface ButtonProps extends Omit<PressableProps, 'children' | 'style'>, ThemableProps {
  /** The label. A string is drawn in the variant's text color; anything else is drawn as is */
  children?: React.ReactNode;
  /** Where it goes: a real link (`<a href>`) on the web that crawlers follow, opened with `Linking` on iOS and Android. Call `event.preventDefault()` in `onPress` to keep it from opening */
  href?: string;
  /** With `href`, opens in a new tab on the web. Default: false */
  external?: boolean;
  /** 'default' (filled with the primary color), 'secondary', 'outline', 'ghost', 'destructive' or 'link'. Default: 'default' */
  variant?: ButtonVariant;
  /** 'sm', 'default', 'lg', or a square 'icon', 'icon-sm' or 'icon-lg' (give those an `aria-label`). Default: 'default' */
  size?: ButtonSize;
  /** Shows a spinner in place of the start icon, and blocks presses while true. Default: false */
  loading?: boolean;
  /** Dims the button and blocks presses. Default: false */
  disabled?: boolean;
  /** Before the label, e.g. an icon */
  startIcon?: React.ReactNode;
  /** After the label */
  endIcon?: React.ReactNode;
  /** The button's box */
  style?: StyleProp<ViewStyle>;
  /** Styles for its parts: `label` */
  styles?: SlotStyles<'label'>;
}

export interface ButtonColors {
  background: string;
  text: string;
  border: string;
}

export interface ButtonDesign {
  heights: Record<TextButtonSize, number>;
  paddingX: Record<TextButtonSize, number>;
  radius: keyof Theme['radius'];
  textSize: Record<TextButtonSize, TextSize>;
  weight: TextWeight;
  /** The lift under a filled or outlined button, as shadcn's `shadow-xs`. Ghost and link buttons stay flat */
  shadow: ShadowLevel;
}
