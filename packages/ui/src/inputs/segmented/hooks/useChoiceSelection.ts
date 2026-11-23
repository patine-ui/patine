import { useControllableState } from '@/core/hooks/useControllableState';
import type { ChoiceItem, ChoiceSelectionOptions } from '@/inputs/segmented/segmented.types';
import { findItemIndex, toggleChoice } from '@/inputs/segmented/segmented.utils';

/** The list's selection: one value (`null` for none), or with `type: 'multiple'` an array the user adds to and removes from. */
export const useChoiceSelection = <T>({
  items,
  type,
  value,
  defaultValue,
  onValueChange,
  isEqual = Object.is,
}: ChoiceSelectionOptions<T>) => {
  const multiple = type === 'multiple';
  const [selected, setSelected] = useControllableState<T | null | T[]>(value, defaultValue ?? (multiple ? [] : null));
  const values = multiple ? ((selected ?? []) as T[]) : [];
  const selectedIndex = multiple ? -1 : findItemIndex(items, selected as T | null, isEqual);
  const select = (item: ChoiceItem<T>) => {
    const next = multiple ? toggleChoice(values, item.value, isEqual) : item.value;
    setSelected(next);
    onValueChange?.(next as never, item);
  };
  const isSelected = (item: ChoiceItem<T>, index: number) =>
    multiple ? values.some((v) => isEqual(v, item.value)) : index === selectedIndex;
  return {
    multiple,
    selectedIndex,
    isSelected,
    select,
  };
};
