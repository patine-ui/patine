import type React from 'react';
import type { HostInstance, PressableProps, StyleProp, TextStyle, ViewProps, ViewStyle } from 'react-native';

import type { ThemableProps, ValueOf } from '@/core/core.types';
import type { Theme } from '@/core/theme/theme.types';
import type { RADIO_INDICATOR } from './radio.constants';

export interface RadioGroupProps extends ViewProps, ThemableProps {
  /** The selected item's value, controlled */
  value?: string;
  /** The selected item's value when uncontrolled */
  defaultValue?: string;
  /** Called with the item's value when the user selects one */
  onValueChange?: (value: string) => void;
  /** Disables every item */
  disabled?: boolean;
  /** Lays the items out in a row. Arrow keys move through them either way. Default: 'vertical' */
  orientation?: 'vertical' | 'horizontal';
  /** Shorthand: the choices, so you don't compose RadioGroupItems */
  options?: RadioGroupOption[];
  /** The parts: RadioGroupItems. Leave out when you give `options` */
  children?: React.ReactNode;
}

/** One choice for the shorthand `options`. */
export type RadioGroupOption = Pick<RadioGroupItemProps, 'value' | 'label' | 'description' | 'disabled'>;

export interface RadioGroupItemProps extends Omit<PressableProps, 'children' | 'style' | 'onPress' | 'role'> {
  /** Identifies the choice: the RadioGroup's `value` while it's selected */
  value: string;
  /** Text (or any node) next to the radio. Pressing it selects too */
  label?: React.ReactNode;
  /** A line of secondary text under the label */
  description?: React.ReactNode;
  /** Dims it and ignores input. Default: false */
  disabled?: boolean;
  /** The outer view, for layout */
  style?: StyleProp<ViewStyle>;
  /** A string label's text */
  labelStyle?: StyleProp<TextStyle>;
}

export type RadioIndicator = ValueOf<typeof RADIO_INDICATOR>;

export interface RadioDesign {
  /** A circle with a dot, or a check mark after the label (iOS lists) */
  indicator: RadioIndicator;
  size: number;
  dot: number;
  ringWidth: number;
  offColor: keyof Theme['colors'];
}

export interface RadioItemEntry {
  value: string;
  disabled: boolean;
  ref: React.RefObject<HostInstance | null>;
}

export interface RadioGroupContextValue {
  value: string | undefined;
  select: (value: string) => void;
  theme: Theme;
  disabled: boolean;
  /** Adds an item in render order and returns the function that removes it */
  register: (entry: RadioItemEntry) => () => void;
  /** Selects and focuses the enabled item `step` places from `from`, wrapping around */
  move: (from: string, step: number) => void;
}
