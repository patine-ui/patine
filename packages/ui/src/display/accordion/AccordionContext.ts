import { createContext, useContext } from 'react';

import type { AccordionContextValue, AccordionItemContextValue } from './accordion.types';

export const AccordionContext = createContext<AccordionContextValue | null>(null);
export const AccordionItemContext = createContext<AccordionItemContextValue | null>(null);

export const useAccordion = () => {
  const ctx = useContext(AccordionContext);
  if (!ctx) throw new Error('AccordionItem must be rendered inside an Accordion.');
  return ctx;
};

export const useAccordionItem = () => {
  const ctx = useContext(AccordionItemContext);
  if (!ctx) throw new Error('AccordionTrigger and AccordionContent must be rendered inside an AccordionItem.');
  return ctx;
};
