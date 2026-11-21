import { useControllableState } from '@/core/hooks/useControllableState';
import type { FieldValueProps } from '@/overlays/sheet/sheet.types';

/**
 * A picker field's value: `value` when given, else its own from `defaultValue`. `confirm` is the sheet's `onConfirm`, `clear`
 * the field's ✕; both report through `onValueChange`, `clear` with `null`.
 */
export const useFieldValue = <V>({ value, defaultValue = null, onValueChange }: FieldValueProps<V>) => {
  const [current, setCurrent] = useControllableState<V | null>(value, defaultValue, onValueChange);
  return {
    value: current,
    confirm: (next: V) => setCurrent(next),
    clear: () => setCurrent(null),
  };
};
