import type React from 'react';
import type { PressableProps, StyleProp, TextStyle, ViewStyle } from 'react-native';

import type { ThemableProps, ValueOf } from '@/core/core.types';
import type { TextSize, TextWeight, Theme } from '@/core/theme/theme.types';
import type { BUTTON_SIZE, BUTTON_VARIANT } from './button.constants';

export type ButtonVariant = ValueOf<typeof BUTTON_VARIANT>;
export type ButtonSize = ValueOf<typeof BUTTON_SIZE>;
type TextButtonSize = Exclude<ButtonSize, typeof BUTTON_SIZE.icon>;

export interface ButtonProps extends Omit<PressableProps, 'children' | 'style'>, ThemableProps {
  /** The label. A string is drawn in the variant's text color; anything else is drawn as is */
  children?: React.ReactNode;
  /** 'default' (filled with the primary color), 'secondary', 'outline', 'ghost', 'destructive' or 'link'. Default: 'default' */
  variant?: ButtonVariant;
  /** 'sm', 'default', 'lg', or 'icon' (square: give it an `accessibilityLabel`). Default: 'default' */
  size?: ButtonSize;
  /** Shows a spinner in place of the start icon, and blocks presses while true. Default: false */
  loading?: boolean;
  /** Before the label, e.g. an icon */
  startIcon?: React.ReactNode;
  /** After the label */
  endIcon?: React.ReactNode;
  /** The button's box */
  style?: StyleProp<ViewStyle>;
  /** The label's text */
  labelStyle?: StyleProp<TextStyle>;
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
}
