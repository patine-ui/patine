import { Platform, type TextInputProps } from 'react-native';

export const OTP_INPUT_MODE = {
  /** Digits only, on a number pad */
  numeric: 'numeric',
  /** Letters and digits */
  text: 'text',
} as const;

/** Characters the field keeps from what's typed or pasted, so "123-456" or "Your code is 123456" become the code. */
export const OTP_DROPPED_CHARS = {
  numeric: /\D/g,
  text: /[^0-9a-z]/gi,
} as const;

export const DEFAULT_OTP_LENGTH = 6;
/** What a `secureTextEntry` cell shows for each character. */
export const SECURE_DOT = '•';

/** The OS offers the code from a text message: iOS and the web by `one-time-code`, Android's autofill by `sms-otp`. */
export const OTP_AUTO_COMPLETE: TextInputProps['autoComplete'] = Platform.select({ android: 'sms-otp', default: 'one-time-code' });

export const OTP_CELL_MAX_WIDTH = 56;
/** Keeps the cells drawn when the row has no width to share, as inside a centered column. */
export const OTP_CELL_MIN_WIDTH = 40;
export const CARET_WIDTH = 2;
/** The caret's height, as a multiple of the cell's font size. */
export const CARET_HEIGHT_RATIO = 1.2;
/** A mobile browser zooms into a focused input with smaller text, so the hidden input keeps this size. */
export const NO_ZOOM_FONT_SIZE = 16;
