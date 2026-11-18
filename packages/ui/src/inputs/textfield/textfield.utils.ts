import type { FieldError } from '@/overlays/sheet/sheet.types';
import { getFieldAccessibility } from '@/overlays/sheet/sheet.utils';
import { DEFAULT_MIN_ROWS, LINE_HEIGHT_RATIO } from './textfield.constants';
import type { WebTextArea } from './textfield.types';

/** The lines a TextArea starts at and grows to: `rows` fixes both; `maxRows` is never below `minRows`. */
export const resolveRows = (rows?: number, minRows = DEFAULT_MIN_ROWS, maxRows = Number.POSITIVE_INFINITY) => {
  const min = Math.max(1, rows ?? minRows);
  return {
    min,
    max: Math.max(min, rows ?? maxRows),
  };
};

export const getLineHeight = (fontSize: number) => Math.round(fontSize * LINE_HEIGHT_RATIO);

/** A TextArea's height: its text's, kept between its first and last row. */
export const getTextAreaHeight = (contentHeight: number, lineHeight: number, rows: { min: number; max: number }) =>
  Math.min(Math.max(contentHeight, rows.min * lineHeight), rows.max * lineHeight);

/**
 * The web: a textarea's text height. Its `scrollHeight` never drops below its own height, so it's read at no height:
 * otherwise a textarea first laid out narrow, or emptied, would stay as tall as it once was.
 */
export const measureTextArea = (node: WebTextArea) => {
  const { height } = node.style;
  node.style.height = '0px';
  const content = node.scrollHeight;
  node.style.height = height;
  return content;
};

/** '12/200' with a `maxLength`, otherwise '12'. */
export const formatCount = (length: number, maxLength?: number) => (maxLength ? `${length}/${maxLength}` : `${length}`);

/** A floating label rests inside the field only while it's empty, unfocused, single-line and has nothing before the text. */
export const isLabelRaised = ({ focused, filled, hasStart, multiline }: Record<'focused' | 'filled' | 'hasStart' | 'multiline', boolean>) =>
  focused || filled || hasStart || multiline;

interface TextFieldAccessibilityOptions {
  label?: string;
  placeholder?: string;
  error?: FieldError;
  helperText?: string;
  required?: boolean;
  disabled: boolean;
  /** The visible label's `nativeID`, on the web where `aria-labelledby` ties it to the input; native reads `accessibilityLabel` */
  labelledBy?: string;
}

/**
 * What screen readers get on the input: the label (or placeholder) as its name with "required", the error or helper text as
 * its hint, and the invalid, required and disabled states. React Native types lack `aria-invalid` and `aria-required`;
 * React Native Web renders them and native ignores them.
 */
export const getTextFieldAccessibility = ({
  label,
  placeholder,
  error,
  helperText,
  required,
  disabled,
  labelledBy,
}: TextFieldAccessibilityOptions) => {
  const name = label ?? placeholder;
  const field = name ? getFieldAccessibility({ name, error, required }) : { accessibilityLabel: undefined, accessibilityHint: undefined };
  return {
    accessibilityLabel: field.accessibilityLabel,
    accessibilityHint: field.accessibilityHint ?? helperText,
    'aria-labelledby': labelledBy,
    'aria-invalid': !!error,
    'aria-required': !!required,
    'aria-disabled': disabled,
  };
};
