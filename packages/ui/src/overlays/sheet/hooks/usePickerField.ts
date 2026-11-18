import { useCallback, useEffect, useMemo } from 'react';

import { useControllableState } from '@/core/hooks/useControllableState';
import { usePlatform } from '@/core/theme/ThemeProvider';
import { FIELD_PRESENTATION } from '@/overlays/sheet/sheet.constants';
import type { FieldPresentation, FieldSheetContextValue, PickerFieldBaseProps } from '@/overlays/sheet/sheet.types';
import { resolveFieldPresentation, shouldCollapseOnPress } from '@/overlays/sheet/sheet.utils';
import { useAnchor } from './useAnchor';

/**
 * Whether the field's picker is open (its own, or `open` when controlled), and where; opening does nothing while
 * `disabled`. `toggle` is the field's tap.
 */
export const usePickerField = ({
  disabled,
  presentation: presentationProp = FIELD_PRESENTATION.auto,
  open: openProp,
  defaultOpen = false,
  onOpenChange,
}: Pick<PickerFieldBaseProps, 'disabled' | 'open' | 'defaultOpen' | 'onOpenChange'> & {
  presentation?: FieldPresentation;
}) => {
  const [open, setOpen] = useControllableState(openProp, defaultOpen, onOpenChange);
  const anchor = useAnchor();
  const presentation = resolveFieldPresentation(presentationProp, usePlatform());
  const dropdown = presentation === FIELD_PRESENTATION.dropdown;

  // A dropdown needs the field's position, also when `open` comes from your code.
  // biome-ignore lint/correctness/useExhaustiveDependencies: measures on opening only.
  useEffect(() => {
    if (open && dropdown) anchor.measure();
  }, [open, dropdown]);

  const show = useCallback(() => {
    if (disabled) return;
    if (dropdown) anchor.measure();
    setOpen(true);
  }, [anchor.measure, disabled, dropdown, setOpen]);

  const hide = useCallback(() => setOpen(false), [setOpen]);

  const toggle = shouldCollapseOnPress(presentation, open) ? hide : show;

  const sheet = useMemo<FieldSheetContextValue>(
    () => ({
      presentation,
      anchor: anchor.rect,
    }),
    [anchor.rect, presentation]
  );

  return {
    open,
    show,
    hide,
    toggle,
    anchor,
    sheet,
  };
};
