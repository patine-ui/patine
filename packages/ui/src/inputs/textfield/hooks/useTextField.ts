import { type ComponentRef, useId, useLayoutEffect, useRef, useState } from 'react';
import type { TextInput, TextInputProps } from 'react-native';

import { useFocus } from '@/core/a11y/hooks/useFocus';
import { IS_WEB } from '@/core/core.constants';
import { useControllableState } from '@/core/hooks/useControllableState';
import type { Theme } from '@/core/theme/theme.types';
import type { FieldInputProps, WebTextArea } from '@/inputs/textfield/textfield.types';
import { getLineHeight, getTextAreaHeight, measureTextArea, resolveRows } from '@/inputs/textfield/textfield.utils';

type TextInputInstance = ComponentRef<typeof TextInput>;
type EventOf<K extends 'onFocus' | 'onBlur' | 'onContentSizeChange' | 'onLayout'> = Parameters<NonNullable<TextInputProps[K]>>[0];

/** The text, focus, password reveal and TextArea height behind a field. `onValueChange` fires for the user's typing and clearing only. */
export const useTextField = (
  {
    value: valueProp,
    defaultValue = '',
    onValueChange,
    secureTextEntry,
    onFocus,
    onBlur,
    onContentSizeChange,
    onLayout,
    multiline,
    ref,
    rows,
    minRows,
    maxRows,
  }: FieldInputProps,
  theme: Theme
) => {
  const [value, setValue] = useControllableState(valueProp, defaultValue, onValueChange);
  const focus = useFocus();
  const labelId = useId();
  const [revealed, setRevealed] = useState(false);
  const [hovered, setHovered] = useState(false);
  const [contentHeight, setContentHeight] = useState(0);
  const lineHeight = getLineHeight(theme.typography.sizes.md);
  const lines = resolveRows(rows, minRows, maxRows);
  const height = getTextAreaHeight(contentHeight, lineHeight, lines);
  const node = useRef<TextInputInstance | null>(null);
  // The web reports a textarea's content as never shorter than the box, so it's measured here when the text or width changes.
  const measureOnWeb = () => {
    if (IS_WEB && multiline && node.current) setContentHeight(measureTextArea(node.current as unknown as WebTextArea));
  };
  // biome-ignore lint/correctness/useExhaustiveDependencies: measures again when the text changes, from code too (a sent message clears it)
  useLayoutEffect(measureOnWeb, [value]);

  return {
    value,
    changeText: setValue,
    clear: () => setValue(''),
    focused: focus.focused,
    onFocus: (e: EventOf<'onFocus'>) => {
      focus.onFocus();
      onFocus?.(e);
    },
    onBlur: (e: EventOf<'onBlur'>) => {
      focus.onBlur();
      onBlur?.(e);
    },
    hovered,
    onHoverIn: () => setHovered(true),
    onHoverOut: () => setHovered(false),
    /** A press anywhere on the box, such as on its icon or padding, puts the caret in the text */
    focusInput: () => node.current?.focus(),
    hidden: !!secureTextEntry && !revealed,
    toggleRevealed: () => setRevealed((r) => !r),
    labelId,
    ref: (instance: TextInputInstance | null) => {
      node.current = instance;
      if (typeof ref === 'function') ref(instance);
      else if (ref) ref.current = instance;
    },
    onLayout: (e: EventOf<'onLayout'>) => {
      measureOnWeb();
      onLayout?.(e);
    },
    multiline: {
      lineHeight,
      height,
      /** The input's measured height and line height, as a style */
      style: { lineHeight, height },
      scrollEnabled: contentHeight > height,
      onContentSizeChange: (e: EventOf<'onContentSizeChange'>) => {
        setContentHeight(e.nativeEvent.contentSize.height);
        onContentSizeChange?.(e);
      },
    },
  };
};
