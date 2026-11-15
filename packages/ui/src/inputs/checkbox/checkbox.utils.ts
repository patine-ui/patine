import type { CheckedState } from '@/core/core.types';
import { MIXED } from './checkbox.constants';

/** The state a press moves to: unchecked → checked, checked → unchecked, mixed → checked. */
export const nextChecked = (checked: CheckedState): boolean => checked === MIXED || !checked;

/** The checked values after toggling `value`, kept in the options' order. */
export const toggleChecked = (options: readonly { value: string }[], checked: readonly string[], value: string): string[] => {
  const next = checked.includes(value) ? checked.filter((v) => v !== value) : [...checked, value];
  return options.map((o) => o.value).filter((v) => next.includes(v));
};

/** A "select all" box's state: checked when every enabled option is, mixed when some are. */
export const getAllChecked = (options: readonly { value: string; disabled?: boolean }[], checked: readonly string[]): CheckedState => {
  const enabled = options.filter((o) => !o.disabled);
  const count = enabled.filter((o) => checked.includes(o.value)).length;
  if (count === 0) return false;
  return count === enabled.length ? true : MIXED;
};

/** The values after pressing "select all": every enabled option, or none of them; disabled ones keep their state. */
export const toggleAll = (options: readonly { value: string; disabled?: boolean }[], checked: readonly string[]): string[] => {
  const on = getAllChecked(options, checked) !== true;
  return options.filter((o) => (o.disabled ? checked.includes(o.value) : on)).map((o) => o.value);
};
