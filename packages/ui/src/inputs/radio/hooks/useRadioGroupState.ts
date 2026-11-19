import { useCallback, useMemo, useRef } from 'react';

import { findNextEnabled } from '@/core/a11y/a11y.utils';
import { useControllableState } from '@/core/hooks/useControllableState';
import type { Theme } from '@/core/theme/theme.types';
import type { RadioGroupContextValue, RadioItemEntry } from '@/inputs/radio/radio.types';

interface Params {
  value: string | undefined;
  defaultValue: string | undefined;
  onValueChange: ((value: string) => void) | undefined;
  disabled: boolean;
  theme: Theme;
}

/** The selected value, the items in render order, and arrow-key movement between them. */
export const useRadioGroupState = ({ value: valueProp, defaultValue, onValueChange, disabled, theme }: Params): RadioGroupContextValue => {
  const [value, setValue] = useControllableState<string | undefined>(valueProp, defaultValue, (next) => {
    if (next !== undefined) onValueChange?.(next);
  });
  const items = useRef<RadioItemEntry[]>([]);

  const register = useCallback((entry: RadioItemEntry) => {
    items.current.push(entry);
    return () => {
      items.current = items.current.filter((item) => item !== entry);
    };
  }, []);

  const move = useCallback(
    (from: string, step: number) => {
      const next = findNextEnabled(
        items.current,
        items.current.findIndex((item) => item.value === from),
        step
      );
      if (!next) return;
      setValue(next.value);
      next.ref.current?.focus();
    },
    [setValue]
  );

  return useMemo(
    () => ({
      value,
      select: setValue,
      theme,
      disabled,
      register,
      move,
    }),
    [value, setValue, theme, disabled, register, move]
  );
};
