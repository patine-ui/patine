import { cloneElement } from 'react';

import type { DialogPressSlotProps } from '@/overlays/dialog/dialog.types';

/** Renders its one child with `onPress` running the child's own handler, then `onPress`. Like Radix's `asChild`. */
export const PressSlot = ({ children, onPress, ...extra }: DialogPressSlotProps & { onPress: () => void; 'aria-expanded'?: boolean }) =>
  cloneElement(children, {
    ...extra,
    onPress: (...args: never[]) => {
      children.props.onPress?.(...args);
      onPress();
    },
  });
