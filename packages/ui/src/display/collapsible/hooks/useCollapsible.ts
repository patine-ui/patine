import { useId, useRef } from 'react';
import type { HostInstance } from 'react-native';

import { useControllableState } from '@/core/hooks/useControllableState';
import type { Theme } from '@/core/theme/theme.types';
import type { CollapsibleContextValue, CollapsibleProps } from '@/display/collapsible/collapsible.types';

/** Open or shut (controlled or its own), and the ids that tie the trigger to its content. */
export const useCollapsible = (
  { open: openProp, defaultOpen = false, onOpenChange, disabled = false }: CollapsibleProps,
  theme: Theme
): CollapsibleContextValue => {
  const [open, setOpen] = useControllableState(openProp, defaultOpen, onOpenChange);
  const id = useId();
  const triggerRef = useRef<HostInstance>(null);
  return {
    open,
    toggle: () => {
      if (!disabled) setOpen(!open);
    },
    disabled,
    theme,
    triggerId: `${id}-trigger`,
    contentId: `${id}-content`,
    triggerRef,
  };
};
