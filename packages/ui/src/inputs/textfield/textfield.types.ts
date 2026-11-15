import type React from 'react';
import type { StyleProp, TextInput, TextInputProps, TextStyle, ViewStyle } from 'react-native';

import type { SlotStyles, ThemableProps, Theme } from '@/core';
import type { FieldStatusProps } from '@/overlays/sheet/sheet.types';

export type TextFieldSlot = 'label' | 'field' | 'input' | 'affix' | 'action' | 'helperText' | 'counter';

/** What the field's buttons say, for translation. */
export interface TextFieldLabels {
  /** The clear button, for screen readers. Default: 'Clear' */
  clear: string;
  /** The password toggle while the password is hidden. Default: 'Show' */
  show: string;
  /** The password toggle while the password is shown. Default: 'Hide' */
  hide: string;
  /** The toggle, for screen readers, while the password is hidden. Default: 'Show password' */
  showPassword: string;
  /** The toggle, for screen readers, while the password is shown. Default: 'Hide password' */
  hidePassword: string;
}

/** The props TextField and TextArea share. Other `TextInput` props (`keyboardType`, `autoComplete`, `maxLength`, `onSubmitEditing`…) pass through. */
export interface TextFieldBaseProps
  extends Omit<
      TextInputProps,
      'style' | 'value' | 'defaultValue' | 'onChangeText' | 'editable' | 'multiline' | 'numberOfLines' | 'secureTextEntry'
    >,
    ThemableProps,
    FieldStatusProps {
  /** Above the field, or inside it in Material until it's focused or filled. Screen readers read it as the field's name */
  label?: string;
  value?: string;
  /** Initial text when uncontrolled. Default: '' */
  defaultValue?: string;
  /** Called with the new text as the user types, pastes or clears; never when `value` changes from your code */
  onValueChange?: (text: string) => void;
  /** Dims the field and blocks typing. Default: false */
  disabled?: boolean;
  /** Shows the text, selectable, but blocks typing. Default: false */
  readOnly?: boolean;
  /** Before the text, such as an icon */
  startIcon?: React.ReactNode;
  /** After the text and its buttons */
  endIcon?: React.ReactNode;
  /** Text before the value, in the secondary color, such as '$' or 'https://' */
  prefix?: string;
  /** Text after the value, in the secondary color, such as 'kg' */
  suffix?: string;
  /** A clear (×) button while there's text. Default: false */
  clearable?: boolean;
  /** The character count under the field, out of `maxLength` when it's set. Default: false */
  showCount?: boolean;
  labels?: Partial<TextFieldLabels>;
  /** The outer view, for layout */
  style?: StyleProp<ViewStyle>;
  styles?: SlotStyles<TextFieldSlot>;
  /** The `TextInput`, to `focus()`, `blur()` or `clear()` it */
  ref?: React.Ref<React.ComponentRef<typeof TextInput>>;
}

export interface TextFieldProps extends TextFieldBaseProps {
  /** Hides the text, for a password */
  secureTextEntry?: boolean;
  /** With `secureTextEntry`, a Show / Hide button that reveals the password. Default: true */
  passwordToggle?: boolean;
}

export interface TextAreaProps extends TextFieldBaseProps {
  /** A fixed height of this many lines; sets `minRows` and `maxRows` both */
  rows?: number;
  /** The height it starts at, in lines. Default: 3 */
  minRows?: number;
  /** It grows with the text up to this many lines, then scrolls. Default: no limit */
  maxRows?: number;
}

/** What the shared field draws from: TextField's props, or TextArea's with `multiline`. */
export type FieldInputProps = TextFieldProps & Pick<TextAreaProps, 'rows' | 'minRows' | 'maxRows'> & { multiline?: boolean };

export interface FieldButtonProps {
  label: string;
  accessibilityLabel: string;
  onPress: () => void;
  /** A larger glyph, such as ×, in the secondary color; otherwise a word in the primary color */
  glyph?: boolean;
  theme: Theme;
  style?: StyleProp<TextStyle>;
}

/** What SearchField's buttons say, for translation. */
export interface SearchFieldLabels {
  /** The clear button, for screen readers. Default: 'Clear search' */
  clear: string;
  /** Default: 'Cancel' */
  cancel: string;
}

export interface SearchFieldProps
  extends Omit<TextInputProps, 'style' | 'value' | 'defaultValue' | 'onChangeText' | 'editable' | 'onSubmitEditing'>,
    ThemableProps {
  value?: string;
  /** Initial text when uncontrolled. Default: '' */
  defaultValue?: string;
  /** Called with the new text as the user types or clears; never when `value` changes from your code */
  onValueChange?: (text: string) => void;
  /** Called with the text when the user presses the keyboard's Search or Enter */
  onSubmit?: (text: string) => void;
  /** Shows a Cancel button beside the field while it has focus, as iOS search bars do. It clears the text, closes the keyboard, then calls this */
  onCancel?: () => void;
  /** Default: 'Search' */
  placeholder?: string;
  disabled?: boolean;
  labels?: Partial<SearchFieldLabels>;
  /** The row around the field, for layout */
  style?: StyleProp<ViewStyle>;
  /** The text input itself */
  inputStyle?: StyleProp<TextStyle>;
}
