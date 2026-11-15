import { createContext, useContext } from 'react';

import type { CollapsibleContextValue } from './collapsible.types';

export const CollapsibleContext = createContext<CollapsibleContextValue | null>(null);

export const useCollapsibleContext = () => {
  const ctx = useContext(CollapsibleContext);
  if (!ctx) throw new Error('CollapsibleTrigger and CollapsibleContent must be inside a Collapsible.');
  return ctx;
};
