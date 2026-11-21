import type React from 'react';
import type { StyleProp, TextInput, TextInputProps, TextStyle, ViewStyle } from 'react-native';

import type { SlotStyles, ThemableProps, Theme } from '@/core';
import type { SearchFieldLabels, TextFieldLabels } from '@/core/theme/labels.types';
import type { FieldStatusProps } from '@/overlays/sheet/sheet.types';

export type TextFieldSlot = 'label' | 'field' | 'input' | 'affix' | 'action' | 'helperText' | 'counter';

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
  /** A word in the primary color, such as Show. Leave it out for the clear button's drawn ✕ in the secondary color */
  label?: string;
  spokenLabel: string;
  onPress: () => void;
  theme: Theme;
  style?: StyleProp<TextStyle>;
}

export interface SearchFieldProps
  extends Omit<TextInputProps, 'style' | 'value' | 'defaultValue' | 'onChangeText' | 'editable' | 'onSubmitEditing'>,
    ThemableProps {
  /** The value, when you control it */
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
  /** Dims it and ignores input. Default: false */
  disabled?: boolean;
  /** Its built-in text, for translation */
  labels?: Partial<SearchFieldLabels>;
  /** The row around the field, for layout */
  style?: StyleProp<ViewStyle>;
  /** Styles for its parts: `input` */
  styles?: SlotStyles<'input'>;
}

/** The few DOM members a TextArea's height needs on the web; the library is typed without the DOM. */
export interface WebTextArea {
  style: { height: string };
  scrollHeight: number;
}

export type { SearchFieldLabels, TextFieldLabels } from '@/core/theme/labels.types';
