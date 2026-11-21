import type { ReactNode } from 'react';

/**
 * Whether children are plain text: a string, a number, or a list of them. JSX turns `Add at {time}` into
 * `['Add at ', '3:00 PM']`, which still needs the component's own Text, color and size.
 */
export const isTextContent = (children: ReactNode): boolean =>
  typeof children === 'string' ||
  typeof children === 'number' ||
  (Array.isArray(children) && children.length > 0 && children.every(isTextContent));
