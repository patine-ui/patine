import type React from 'react';
import type { PressableProps, StyleProp, ViewStyle } from 'react-native';

import type { ControlPosition, SlotStyles, ThemableProps } from '@/core/core.types';
import type { ThemeColor } from '@/core/primitives/primitives.types';

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
  /**
   * Waiting on the change it started (a request after `onCheckedChange`): a spinner turns in the thumb, presses are
   * ignored and it's announced busy, while it keeps showing `checked`. Default: false
   */
  loading?: boolean;
  /** Which side of the label the switch sits on. Default: 'end', as settings lists do */
  controlPosition?: ControlPosition;
  /** The outer view, for layout */
  style?: StyleProp<ViewStyle>;
  /** Styles for its parts: `label` */
  styles?: SlotStyles<'label'>;
}

export interface SwitchDesign {
  trackWidth: number;
  trackHeight: number;
  /** Thumb size while off and while on (Material grows it when on) */
  thumbOff: number;
  thumbOn: number;
  /** An outline on the off track, as Material draws it */
  outlinedOff: boolean;
  /** The loading spinner in the thumb: its diameter and stroke, before the thumb's scale */
  spinner: number;
  spinnerStroke: number;
  /** The spinner's colour on the off thumb; on the on thumb it takes `primary` */
  spinnerOff: ThemeColor;
}
