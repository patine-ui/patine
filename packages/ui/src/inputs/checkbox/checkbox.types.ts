import type React from 'react';
import type { PressableProps, StyleProp, TextStyle, ViewProps, ViewStyle } from 'react-native';

import type { CheckedState, ThemableProps } from '@/core/core.types';
import type { Theme } from '@/core/theme/theme.types';

export interface CheckboxProps extends Omit<PressableProps, 'children' | 'style' | 'onPress' | 'role'>, ThemableProps {
  /** Controlled state. `'mixed'` draws a dash, for a parent whose children are partly checked */
  checked?: CheckedState;
  /** Initial state when uncontrolled. Default: false */
  defaultChecked?: boolean;
  /** Called with the new state when the user toggles it. From `'mixed'` it goes to checked */
  onCheckedChange?: (checked: boolean) => void;
  /** Text (or any node) next to the box. Pressing it toggles too */
  label?: React.ReactNode;
  /** A line of secondary text under the label */
  description?: React.ReactNode;
  /** Put the box after the label, as settings lists do. Default: false */
  controlAtEnd?: boolean;
  /** The outer view, for layout */
  style?: StyleProp<ViewStyle>;
  /** A string label's text */
  labelStyle?: StyleProp<TextStyle>;
  /** The box itself */
  boxStyle?: StyleProp<ViewStyle>;
}

export interface CheckboxDesign {
  size: number;
  /** A number of points, or 'full' for a circle */
  radius: number | 'full';
  /** Border color while unchecked */
  offColor: keyof Theme['colors'];
}

/** One choice of a CheckboxGroup. */
export interface CheckboxGroupOption {
  value: string;
  label?: React.ReactNode;
  /** A line of secondary text under the label */
  description?: React.ReactNode;
  disabled?: boolean;
}

export interface CheckboxGroupProps extends Omit<ViewProps, 'children'>, ThemableProps {
  /** The choices */
  options: ReadonlyArray<CheckboxGroupOption>;
  /** The checked values, controlled */
  value?: readonly string[];
  /** The checked values when uncontrolled. Default: none */
  defaultValue?: readonly string[];
  /** Called with the checked values, in the options' order, when the user checks or unchecks one */
  onValueChange?: (value: string[]) => void;
  /** A parent checkbox above the options that checks or clears them all, and shows a dash when some are checked */
  selectAllLabel?: React.ReactNode;
  /** Disables every option */
  disabled?: boolean;
  /** Lays the options out in a row. Default: 'vertical' */
  orientation?: 'vertical' | 'horizontal';
  /** Put each box after its label, as settings lists do. Default: false */
  controlAtEnd?: boolean;
}
