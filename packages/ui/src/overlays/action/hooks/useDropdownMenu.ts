import { useState } from 'react';

import type { DropdownMenuProps, DropdownMenuState } from '@/overlays/action/action.types';
import { useAnchor } from '@/overlays/sheet/hooks/useAnchor';
import { useActionPress } from './useActionPress';

/** Opens the menu from its measured trigger, and runs a pressed action once the menu has closed. */
export const useDropdownMenu = ({ disabled, onOpen, onClose }: DropdownMenuProps): DropdownMenuState => {
  const anchor = useAnchor();
  const [visible, setVisible] = useState(false);
  const open = () => {
    if (disabled) return;
    anchor.measure();
    setVisible(true);
    onOpen?.();
  };
  const close = () => {
    setVisible(false);
    onClose?.();
  };
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
