import { useEffect } from 'react';

import { useControllableState } from '@/core/hooks/useControllableState';
import type { DropdownMenuProps, DropdownMenuState } from '@/overlays/action/action.types';
import { useAnchor } from '@/overlays/sheet/hooks/useAnchor';
import { useActionPress } from './useActionPress';

/** Opens the menu from its measured trigger (its own state, or `open` when controlled), and runs a pressed action once the menu has closed. */
export const useDropdownMenu = ({ disabled, open: openProp, defaultOpen = false, onOpenChange }: DropdownMenuProps): DropdownMenuState => {
  const anchor = useAnchor();
  const [visible, setVisible] = useControllableState(openProp, defaultOpen, onOpenChange);
  // The menu needs the trigger's position, also when `open` comes from your code.
  // biome-ignore lint/correctness/useExhaustiveDependencies: measures on opening only.
  useEffect(() => {
    if (visible) anchor.measure();
  }, [visible]);
  const open = () => {
    if (disabled) return;
    anchor.measure();
    setVisible(true);
  };
  const close = () => setVisible(false);
  const { press, onClosed } = useActionPress(close);

  return {
    anchor,
    visible,
    open,
    close,
    press,
    onClosed,
  };
};
