import { useLayoutEffect, useRef } from 'react';
import type { HostInstance } from 'react-native';

import { KEY } from '@/core/core.constants';
import { useFocusVisible } from '@/core/hooks/useFocusVisible';
import { keyboardProps } from '@/core/utils/keyboard.utils';
import { useAccordion, useAccordionItem } from '@/display/accordion/AccordionContext';
import type { AccordionTriggerState, TriggerEntry } from '@/display/accordion/accordion.types';

/** A trigger's item, its registration for arrow keys, and the keys that move focus between triggers. */
export const useAccordionTrigger = (): AccordionTriggerState => {
  const accordion = useAccordion();
  const item = useAccordionItem();
  const ref = useRef<HostInstance>(null);
  const focus = useFocusVisible();

  // One entry for the trigger's life, kept current, so it keeps its place in the order when it's disabled or renamed.
  const entry = useRef<TriggerEntry>({ value: item.value, disabled: item.disabled, ref }).current;
  entry.value = item.value;
  entry.disabled = item.disabled;
  useLayoutEffect(() => accordion.register(entry), [accordion.register, entry]);

  return {
    accordion,
    item,
    ref,
    focus,
    keys: keyboardProps({
      [KEY.down]: () => accordion.move(item.value, 1),
      [KEY.up]: () => accordion.move(item.value, -1),
      [KEY.home]: () => accordion.moveToEdge(false),
      [KEY.end]: () => accordion.moveToEdge(true),
    }),
  };
};
