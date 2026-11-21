import { Children, isValidElement, type ReactNode } from 'react';

/** A CardHeader's children split into its text (title, description) and the first child of `actionType`, which sits at its end. */
export const splitCardAction = (children: ReactNode, actionType: unknown) => {
  const items = Children.toArray(children);
  const action = items.find((child) => isValidElement(child) && child.type === actionType);
  return {
    text: action ? items.filter((child) => child !== action) : items,
    action,
  };
};
