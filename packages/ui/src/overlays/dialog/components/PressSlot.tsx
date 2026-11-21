import { cloneElement } from 'react';

import type { DialogPressSlotProps } from '@/overlays/dialog/dialog.types';

/** Renders its one child with `onPress` running the child's own handler, then `onPress`. Like Radix's `asChild`. */
export const PressSlot = ({ children, onPress, ...extra }: DialogPressSlotProps & { onPress: () => void; 'aria-expanded'?: boolean }) =>
  cloneElement(children, {
    ...extra,
    onPress: (...args: never[]) => {
      children.props.onPress?.(...args);
      // The child's onPress can call `event.preventDefault()` to stop the slot's own action, such as a validating Save that
      // keeps the dialog open.
      const event = args[0] as { isDefaultPrevented?: () => boolean } | undefined;
      if (!event?.isDefaultPrevented?.()) onPress();
    },
  });
