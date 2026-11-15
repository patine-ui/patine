import type { RadioItemEntry } from './radio.types';

/** The enabled item `step` places from `from`, wrapping around; `from` itself when nothing else is enabled. */
export const findNextItem = (items: readonly RadioItemEntry[], from: string, step: number): RadioItemEntry | undefined => {
  const start = items.findIndex((item) => item.value === from);
  for (let i = 1; i <= items.length; i++) {
    const item = items[(((start + step * i) % items.length) + items.length) % items.length];
    if (item && !item.disabled) return item;
  }
  return undefined;
};
