import { createContext, useContext } from 'react';

import type { TabsContextValue } from './tabs.types';

export const TabsContext = createContext<TabsContextValue | null>(null);

export const useTabs = () => {
  const ctx = useContext(TabsContext);
  if (!ctx) throw new Error('TabsList, TabsTrigger and TabsContent must be rendered inside Tabs.');
  return ctx;
};
