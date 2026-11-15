import { createContext, useContext } from 'react';

import type { PopoverContextValue } from '@/overlays/popover/popover.types';

export const PopoverContext = createContext<PopoverContextValue | null>(null);

/** The `Popover` a trigger, close button or content belongs to. */
export const usePopoverContext = () => {
  const context = useContext(PopoverContext);
  if (!context) throw new Error('PopoverTrigger, PopoverContent and PopoverClose must be inside a Popover');
  return context;
};
