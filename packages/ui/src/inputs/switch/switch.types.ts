import type React from 'react';
import type { PressableProps, StyleProp, TextStyle, ViewStyle } from 'react-native';

import type { ControlPosition, ThemableProps } from '@/core/core.types';

export interface SwitchProps extends Omit<PressableProps, 'children' | 'style' | 'onPress' | 'role'>, ThemableProps {
  /** Controlled state */
  checked?: boolean;
  /** Initial state when uncontrolled. Default: false */
  defaultChecked?: boolean;
  /** Called with the new state when the user flips it */
  onCheckedChange?: (checked: boolean) => void;
  /** Text (or any node) next to the switch. Pressing it flips too */
  label?: React.ReactNode;
  /** A line of secondary text under the label */
  description?: React.ReactNode;
  /** Which side of the label the switch sits on. Default: 'end', as settings lists do */
  controlPosition?: ControlPosition;
  /** The outer view, for layout */
  style?: StyleProp<ViewStyle>;
  /** A string label's text */
  labelStyle?: StyleProp<TextStyle>;
}

export interface SwitchDesign {
  trackWidth: number;
  trackHeight: number;
  /** Thumb size while off and while on (Material grows it when on) */
  thumbOff: number;
  thumbOn: number;
  /** An outline on the off track, as Material draws it */
  outlinedOff: boolean;
}
