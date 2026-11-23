import { isValidElement, type ReactNode } from 'react';
import type { TextInputKeyPressEvent, TextStyle } from 'react-native';

import { DEFAULT_LABELS } from '@/core/theme/labels.constants';
import type { Labels } from '@/core/theme/labels.types';
import type { LayoutDirection } from '@/core/theme/theme.types';
import { clamp } from '@/core/utils/track.utils';
import type { FieldError } from '@/overlays/sheet/sheet.types';
import { getFieldAccessibility } from '@/overlays/sheet/sheet.utils';
import { DEFAULT_MIN_ROWS, LINE_HEIGHT_RATIO } from './textfield.constants';
import type { TextDirection, WebTextArea } from './textfield.types';

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
  clamp(contentHeight, rows.min * lineHeight, rows.max * lineHeight);

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

/**
 * Enter without Shift: send rather than add a line. Hardware keyboards (the web, iPad) report Shift, so Shift+Enter stays a
 * new line; React Native's event type lacks `shiftKey`.
 */
export const isSubmitKey = (event: TextInputKeyPressEvent) => {
  const { key, shiftKey } = event.nativeEvent as { key: string; shiftKey?: boolean };
  return key === 'Enter' && !shiftKey;
};

/**
 * The input's writing direction and alignment for a field's own `dir` (a phone number in a right-to-left app), or `null` to
 * keep the layout's. Its text starts at the start of `dir`: native mirrors 'left' and 'right' in a right-to-left layout, the
 * web doesn't; 'auto' lets the web align each value by its own script.
 */
export const getInputDirection = (dir: TextDirection | undefined, layout: LayoutDirection, web: boolean): TextStyle | null => {
  if (!dir) return null;
  if (dir === 'auto')
    return web ? { writingDirection: 'auto', textAlign: 'start' as TextStyle['textAlign'] } : { writingDirection: 'auto' };
  const left = web ? dir === 'ltr' : dir === layout;
  return {
    writingDirection: dir,
    textAlign: left ? 'left' : 'right',
  };
};

/** The words in a label node (`<HStack><Text>Phone</Text><InfoTip /></HStack>` reads 'Phone'), to name its input on native. */
export const getNodeText = (node: ReactNode): string => {
  if (typeof node === 'string' || typeof node === 'number') return String(node).trim();
  if (Array.isArray(node)) return node.map(getNodeText).filter(Boolean).join(' ');
  if (isValidElement<{ children?: ReactNode }>(node)) return getNodeText(node.props.children);
  return '';
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
  /** The visible label's `nativeID`, on the web where `aria-labelledby` ties it to the input; native reads `aria-label` */
  labelledBy?: string;
  /** The caller's own `aria-label` or `aria-label`: it wins over the name built from the label or placeholder */
  spokenName?: string;
}

/**
 * What screen readers get on the input: the label (or placeholder) as its name with "required", the error or helper text as
 * its hint, and the invalid, required and disabled states. React Native types lack `aria-invalid` and `aria-required`;
 * React Native Web renders them and native ignores them.
 */
export const getTextFieldAccessibility = (
  { label, placeholder, error, helperText, required, disabled, labelledBy, spokenName }: TextFieldAccessibilityOptions,
  words: Pick<Labels, 'required' | 'invalid'> = DEFAULT_LABELS
) => {
  const name = label ?? placeholder;
  const field = name ? getFieldAccessibility({ name, error, required }, words) : { 'aria-label': undefined, accessibilityHint: undefined };
  return {
    'aria-label': spokenName ?? field['aria-label'],
    accessibilityHint: field.accessibilityHint ?? helperText,
    // On the web aria-labelledby beats aria-label, so a caller's own name drops it.
    'aria-labelledby': spokenName ? undefined : labelledBy,
    'aria-invalid': !!error,
    'aria-required': !!required,
    'aria-disabled': disabled,
  };
};
