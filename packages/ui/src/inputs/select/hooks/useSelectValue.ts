import { useState } from 'react';

import type { SelectValueProps } from '@/inputs/select/select.types';

/**
 * Select's and SelectList's value: `value` when given, otherwise their own state seeded from `defaultValue`. Returns the
 * props with the value filled in, and `reset` to empty the selection when it's uncontrolled.
 */
export const useSelectValue = <T, P extends SelectValueProps<T>>(props: P): { props: P; reset: () => void } => {
  const [inner, setInner] = useState<T | T[] | null | undefined>(props.defaultValue);
  const controlled = props.value !== undefined;
  const reset = () => {
    if (!controlled) setInner(props.multiple ? [] : null);
  };
  if (controlled) {
    return {
      props,
      reset,
    };
  }
  const onValueChange = (value: T | T[], option: unknown) => {
    setInner(value);
    (props.onValueChange as ((value: T | T[], option: unknown) => void) | undefined)?.(value, option);
  };
  return {
    props: { ...props, value: inner, onValueChange },
    reset,
  };
};
