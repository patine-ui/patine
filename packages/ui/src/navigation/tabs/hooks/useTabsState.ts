import { useCallback, useId, useRef } from 'react';

import { useControllableState } from '@/core/hooks/useControllableState';
import type { Theme } from '@/core/theme/theme.types';
import type { TabEntry, TabsContextValue, TabsVariant } from '@/navigation/tabs/tabs.types';
import { findNextItem } from '@/navigation/tabs/tabs.utils';
import { useTabsIndicator } from './useTabsIndicator';

interface Params {
  value: string | undefined;
  defaultValue: string | undefined;
  onValueChange: ((value: string) => void) | undefined;
  theme: Theme;
  variant: TabsVariant;
  vertical: boolean;
}

/** The active tab, the tabs in render order, arrow-key movement between them, and the sliding indicator. */
export const useTabsState = ({ value: valueProp, defaultValue, onValueChange, theme, variant, vertical }: Params): TabsContextValue => {
  const [value, setValue] = useControllableState<string | undefined>(valueProp, defaultValue);
  const items = useRef<TabEntry[]>([]);
  const baseId = useId();
  const indicator = useTabsIndicator(value, vertical, theme.animation.duration);

  const select = (next: string) => {
    if (next === value) return;
    setValue(next);
    onValueChange?.(next);
  };

  // Stable, since each tab registers in a layout effect that depends on it.
  const register = useCallback((entry: TabEntry) => {
    items.current.push(entry);
    return () => {
      items.current = items.current.filter((item) => item !== entry);
    };
  }, []);

  const goTo = (next: TabEntry | undefined) => {
    if (!next) return;
    select(next.value);
    next.ref.current?.focus();
  };

  return {
    value,
    select,
    theme,
    variant,
    vertical,
    baseId,
    indicator,
    register,
    move: (from, step) =>
      goTo(
        findNextItem(
          items.current,
          items.current.findIndex((item) => item.value === from),
          step
        )
      ),
    moveToEdge: (last) => goTo(last ? findNextItem(items.current, items.current.length, -1) : findNextItem(items.current, -1, 1)),
  };
};
