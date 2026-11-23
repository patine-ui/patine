import { useCallback, useState } from 'react';

/**
 * Controlled when `value` is defined; otherwise keeps its own state seeded from `defaultValue`. The third item sets its own
 * state without calling `onValueChange`, for a change from code (a ref's `clear()`).
 */
export const useControllableState = <T>(
  value: T | undefined,
  defaultValue: T | (() => T),
  onValueChange?: (next: T) => void
): [T, (next: T) => void, (next: T) => void] => {
  const [inner, setInner] = useState<T>(defaultValue);
  const controlled = value !== undefined;

  const setValue = useCallback(
    (next: T) => {
      if (!controlled) setInner(() => next);
      onValueChange?.(next);
    },
    [controlled, onValueChange]
  );

  return [controlled ? value : inner, setValue, setInner];
};
