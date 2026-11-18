import { useId, useState } from 'react';
import type { TextInputProps } from 'react-native';

import { useControllableState } from '@/core/hooks/useControllableState';
import { useFocus } from '@/core/hooks/useFocus';
import type { Theme } from '@/core/theme/theme.types';
import type { FieldInputProps } from '@/inputs/textfield/textfield.types';
import { getLineHeight, getTextAreaHeight, resolveRows } from '@/inputs/textfield/textfield.utils';

type EventOf<K extends 'onFocus' | 'onBlur' | 'onContentSizeChange'> = Parameters<NonNullable<TextInputProps[K]>>[0];

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
  const [contentHeight, setContentHeight] = useState(0);
  const lineHeight = getLineHeight(theme.typography.sizes.md);
  const lines = resolveRows(rows, minRows, maxRows);
  const height = getTextAreaHeight(contentHeight, lineHeight, lines);

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
    hidden: !!secureTextEntry && !revealed,
    toggleRevealed: () => setRevealed((r) => !r),
    labelId,
    multiline: {
      lineHeight,
      height,
      scrollEnabled: contentHeight > height,
      onContentSizeChange: (e: EventOf<'onContentSizeChange'>) => {
        setContentHeight(e.nativeEvent.contentSize.height);
        onContentSizeChange?.(e);
      },
    },
  };
};
