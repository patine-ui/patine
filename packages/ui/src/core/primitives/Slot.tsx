import { Children, cloneElement, isValidElement, type ReactElement, type ReactNode } from 'react';

import { mergeSlotProps } from '@/core/utils/slot.utils';

export interface SlotProps {
  /** One element, which gets the Slot's other props */
  children?: ReactNode;
  [prop: string]: unknown;
}

/**
 * Renders its one child with the Slot's props merged in, like Radix's Slot: the way to build an `asChild` prop. Handlers
 * both run and styles stack; anything else the child sets wins.
 */
export const Slot = ({ children, ...props }: SlotProps) => {
  const child = Children.only(children);
  if (!isValidElement(child)) return null;
  const element = child as ReactElement<Record<string, unknown>>;
  return cloneElement(element, mergeSlotProps(props, element.props));
};
