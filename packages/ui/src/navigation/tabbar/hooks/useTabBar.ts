import { useControllableState } from '@/core/hooks/useControllableState';
import type { TabBarProps } from '@/navigation/tabbar/tabbar.types';

/** The selected destination. Pressing the selected one calls `onValueChange` again, so an app can scroll to top. */
export const useTabBar = <T extends string>({ items, value, defaultValue, onValueChange }: TabBarProps<T>) => {
  const [selected, setSelected] = useControllableState<T | undefined>(value, defaultValue ?? items[0]?.value, (next) => {
    if (next !== undefined) onValueChange?.(next);
  });
  return {
    selected,
    select: (next: T) => setSelected(next),
  };
};
