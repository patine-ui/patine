import { useCallback, useId, useRef } from 'react';

import { findNextEnabled } from '@/core/a11y/a11y.utils';
import { useControllableState } from '@/core/hooks/useControllableState';
import type { Theme } from '@/core/theme/theme.types';
import { ACCORDION_TYPE } from '@/display/accordion/accordion.constants';
import type { AccordionContextValue, AccordionProps, TriggerEntry } from '@/display/accordion/accordion.types';
import { fromOpenList, toggleOpen, toOpenList } from '@/display/accordion/accordion.utils';

/** The open items, the triggers in render order, and arrow-key focus between them. */
export const useAccordionState = (props: AccordionProps, theme: Theme): AccordionContextValue => {
  const { type = ACCORDION_TYPE.single, disabled = false } = props;
  const collapsible = props.type !== ACCORDION_TYPE.multiple && !!props.collapsible;
  // Both types share one handler shape here; `fromOpenList` hands each its own.
  const onValueChange = props.onValueChange as ((value: string | string[]) => void) | undefined;
  const [value, setValue] = useControllableState<string | string[] | undefined>(props.value, props.defaultValue);
  const open = toOpenList(value);
  const triggers = useRef<TriggerEntry[]>([]);
  const baseId = useId();

  // Stable, since each trigger registers in a layout effect that depends on it.
  const register = useCallback((entry: TriggerEntry) => {
    triggers.current.push(entry);
    return () => {
      triggers.current = triggers.current.filter((item) => item !== entry);
    };
  }, []);

  const focus = (entry: TriggerEntry | undefined) => entry?.ref.current?.focus();

  return {
    open,
    toggle: (item) => {
      const next = toggleOpen(open, item, type, collapsible);
      if (!next) return;
      const shaped = fromOpenList(type, next);
      setValue(shaped);
      onValueChange?.(shaped);
    },
    theme,
    disabled,
    baseId,
    register,
    move: (from, step) =>
      focus(
        findNextEnabled(
          triggers.current,
          triggers.current.findIndex((item) => item.value === from),
          step
        )
      ),
    moveToEdge: (last) =>
      focus(last ? findNextEnabled(triggers.current, triggers.current.length, -1) : findNextEnabled(triggers.current, -1, 1)),
  };
};
