import { createContext, useContext } from 'react';

import type { RadioGroupContextValue } from './radio.types';

export const RadioGroupContext = createContext<RadioGroupContextValue | null>(null);

export const useRadioGroup = () => {
  const ctx = useContext(RadioGroupContext);
  if (!ctx) throw new Error('RadioGroupItem must be rendered inside a RadioGroup.');
  return ctx;
};
