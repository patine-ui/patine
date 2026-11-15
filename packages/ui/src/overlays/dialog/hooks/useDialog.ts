import { useId, useMemo, useRef } from 'react';
import type { HostInstance } from 'react-native';

import { useControllableState } from '@/core/hooks/useControllableState';
import { useComponentTheme } from '@/core/theme/ThemeProvider';
import { DIALOG_DESIGN } from '@/overlays/dialog/dialog.constants';
import type { DialogContextValue, DialogProps } from '@/overlays/dialog/dialog.types';

/** A dialog's shared state: open or not (controlled or its own), the ids that label it, and its design. */
export const useDialog = (
  { open: openProp, defaultOpen = false, onOpenChange, dismissible = true, theme: themeProp, design }: DialogProps,
  alert: boolean
): DialogContextValue => {
  const [open, setOpen] = useControllableState(openProp, defaultOpen, onOpenChange);
  const { theme, themeOverride } = useComponentTheme(themeProp, design);
  const id = useId();
  const initialFocus = useRef<HostInstance | null>(null);
  return useMemo(
    () => ({
      open,
      setOpen,
      dismissible,
      alert,
      titleId: `${id}-title`,
      descriptionId: `${id}-description`,
      initialFocus,
      theme,
      themeOverride,
      look: DIALOG_DESIGN[theme.design],
    }),
    [open, setOpen, dismissible, alert, id, theme, themeOverride]
  );
};
