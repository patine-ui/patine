import { createContext, useContext } from 'react';

import type { DialogContextValue } from './dialog.types';

export const DialogContext = createContext<DialogContextValue | null>(null);

/** The dialog a part sits in. Every part must be inside a Dialog or an AlertDialog. */
export const useDialogContext = () => {
  const ctx = useContext(DialogContext);
  if (!ctx) throw new Error('Dialog parts must be inside <Dialog> or <AlertDialog>.');
  return ctx;
};
