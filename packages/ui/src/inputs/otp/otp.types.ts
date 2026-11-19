import type { Animated, StyleProp, ViewStyle } from 'react-native';

import type { SlotStyles, ThemableProps, Theme } from '@/core';
import type { ValueOf } from '@/core/core.types';
import type { FieldStatusProps } from '@/overlays/sheet/sheet.types';
import type { OTP_INPUT_MODE } from './otp.constants';

/** 'numeric': digits on a number pad. 'text': letters and digits. */
export type OtpInputMode = ValueOf<typeof OTP_INPUT_MODE>;

export type InputOTPSlot = 'container' | 'cell' | 'focusedCell' | 'filledCell' | 'cellText' | 'caret' | 'helperText';

/** `error` and `helperText` work as on the fields; there's no label to mark `required`. */
export interface InputOTPProps extends ThemableProps, Omit<FieldStatusProps, 'required'> {
  /** How many characters the code has. Default: 6 */
  length?: number;
  /** The value, when you control it */
  value?: string;
  /** The value at first, when it keeps its own state */
  defaultValue?: string;
  /** As the user types, deletes or pastes, with the code so far */
  onValueChange?: (code: string) => void;
  /** Once the user fills the last cell, with the whole code */
  onComplete?: (code: string) => void;
  /** 'numeric': digits only, on a number pad. 'text': letters and digits. Default: 'numeric' */
  inputMode?: OtpInputMode;
  /** Each character shows as a dot, for a PIN. Default: false */
  secureTextEntry?: boolean;
  autoFocus?: boolean;
  /** Dims it and ignores input. Default: false */
  disabled?: boolean;
  /** What screen readers call the field. Default: 'Verification code' */
  accessibilityLabel?: string;
  /** The outer view, for layout */
  style?: StyleProp<ViewStyle>;
  /** Per-part style overrides */
  styles?: SlotStyles<InputOTPSlot>;
  /** On the text input; cell `i` gets `${testID}-cell-${i}` */
  testID?: string;
}

export interface OtpCellState {
  key: string;
  /** The character, or a dot with `secureTextEntry`; '' while empty */
  char: string;
  /** The field is focused and this cell takes the next character */
  focused: boolean;
  filled: boolean;
  /** The blinking caret: in the focused cell while it's empty */
  caret: boolean;
}

/** What `useInputOTP` hands the field. Named so the build can emit the hook returning it. */
export interface InputOTPState {
  code: string;
  length: number;
  cells: OtpCellState[];
  caretOpacity: Animated.Value;
  changeText: (text: string) => void;
  onFocus: () => void;
  onBlur: () => void;
}

export interface OtpCellProps {
  cell: OtpCellState;
  caretOpacity: Animated.Value;
  invalid: boolean;
  theme: Theme;
  slots?: SlotStyles<InputOTPSlot>;
  testID?: string;
}
