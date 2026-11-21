import type { Insets, StyleProp, ViewStyle } from 'react-native';

import type { ThemableProps, ValueOf } from '@/core/core.types';
import type { StepLabels } from '@/core/theme/labels.types';
import type { Theme } from '@/core/theme/theme.types';
import type { TextFieldProps } from '@/inputs/textfield/textfield.types';
import type { NUMBER_BUTTONS } from './field.constants';

export interface NumberRange {
  /** Default: no limit */
  min?: number;
  /** Default: no limit */
  max?: number;
  /** How much a button press or arrow key moves it; also sets the decimals kept. Default: 1 */
  step?: number;
}

export interface StepperProps extends NumberRange, ThemableProps {
  /** The value, when you control it */
  value?: number;
  /** Initial value when uncontrolled. Default: `min`, or 0 */
  defaultValue?: number;
  /** Called with the new value when the user steps; never when `value` changes from your code */
  onValueChange?: (value: number) => void;
  /** Draws the value between the buttons. Default: the design's (all but iOS, whose UIStepper shows only − and +) */
  showValue?: boolean;
  /** Turns the value into text, for the display and screen readers. Default: the number as is */
  formatValue?: (value: number) => string;
  /** Names it for screen readers, e.g. 'Guests' */
  'aria-label'?: string;
  /** Dims it and ignores input. Default: false */
  disabled?: boolean;
  /** Its built-in text, for translation */
  labels?: Partial<StepLabels>;
  /** The outer view, for layout */
  style?: StyleProp<ViewStyle>;
  testID?: string;
}

export interface NumberFieldProps
  extends NumberRange,
    Omit<TextFieldProps, 'value' | 'defaultValue' | 'onValueChange' | 'secureTextEntry' | 'passwordToggle' | 'clearable'> {
  /** The number, or null when the field is empty */
  value?: number | null;
  /** Initial value when uncontrolled. Default: null */
  defaultValue?: number | null;
  /** Called when the user steps, or leaves the field or presses Enter after typing; never when `value` changes from your code */
  onValueChange?: (value: number | null) => void;
  /** Hides the − and + buttons, leaving the arrow keys and screen-reader actions. Default: false */
  hideButtons?: boolean;
  /** Turns the value into the text shown while the field isn't being edited. Default: the number as is */
  formatValue?: (value: number) => string;
  stepLabels?: Partial<StepLabels>;
}

export type NumberButtons = ValueOf<typeof NUMBER_BUTTONS>;

export interface StepperDesign {
  height: number;
  /** Each button's width */
  buttonWidth: number;
  radius: keyof Theme['radius'];
  /** 'filled': one gray track (iOS). 'outlined': one outlined track (brand, web). 'separate': two tonal round buttons (Material) */
  shape: 'filled' | 'outlined' | 'separate';
  showValue: boolean;
}

export interface NumberFieldDesign {
  /** 'split': − before the number, + after. 'end': both after. 'stacked': small up and down chevrons after, as a browser's number input */
  buttons: NumberButtons;
}

export interface StepButtonProps {
  direction: 1 | -1;
  label: string;
  disabled: boolean;
  onStep: () => void;
  theme: Theme;
  /** The glyph's size and the button's box */
  style?: StyleProp<ViewStyle>;
  /** The glyph: '−' and '+', or chevrons when stacked */
  glyph?: string;
  /** Leave it out of the tab order, when the control around it takes the keys */
  focusable?: boolean;
  /** Extra touch area on every side, up to 44pt */
  hitSlop?: Insets | number;
}

export type { StepLabels } from '@/core/theme/labels.types';
