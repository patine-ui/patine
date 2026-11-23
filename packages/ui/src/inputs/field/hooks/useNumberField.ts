import { useState } from 'react';

import { useControllableState } from '@/core/hooks/useControllableState';
import type { NumberFieldProps, NumberRange } from '@/inputs/field/field.types';
import { clampValue, parseNumber, stepValue } from '@/inputs/field/field.utils';

/**
 * A number field's value and the text being typed. The text is kept as typed while the field has focus, and read as a
 * number on blur, Enter or a step, so half-typed values like "-" or "1." aren't thrown away.
 */
export const useNumberField = (
  {
    value,
    defaultValue = null,
    onValueChange,
    onValueChanging,
    formatValue = String,
  }: Pick<NumberFieldProps, 'value' | 'defaultValue' | 'onValueChange' | 'onValueChanging' | 'formatValue'>,
  range: NumberRange
) => {
  const [current, setCurrent] = useControllableState<number | null>(value, defaultValue, onValueChange);
  const [draft, setDraft] = useState<string | null>(null);
  const set = (next: number | null) => {
    if (next !== current) setCurrent(next);
  };
  const read = () => (draft === null ? current : parseNumber(draft, current));
  const clamp = (parsed: number | null) => (parsed === null ? null : clampValue(parsed, range));
  return {
    value: current,
    text: draft ?? (current === null ? '' : formatValue(current)),
    onChangeText: (text: string) => {
      setDraft(text);
      onValueChanging?.(clamp(parseNumber(text, current)));
    },
    onFocus: () => setDraft(current === null ? '' : String(current)),
    commit: () => {
      const parsed = read();
      setDraft(null);
      set(clamp(parsed));
    },
    step: (direction: 1 | -1) => {
      const next = stepValue(read(), direction, range);
      if (draft !== null) setDraft(String(next));
      set(next);
    },
  };
};
