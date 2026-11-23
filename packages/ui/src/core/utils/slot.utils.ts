import { Children, isValidElement, type ReactElement, type ReactNode } from 'react';

type Props = Record<string, unknown>;

/** A component whose root is one pressable, such as Button, sets `pressable = true` on itself. */
export interface PressableComponent {
  pressable?: boolean;
}

const isHandler = (key: string, value: unknown): value is (...args: unknown[]) => unknown =>
  /^on[A-Z]/.test(key) && typeof value === 'function';

/**
 * A Slot's props merged into its child's, as Radix does: the child's win, except that handlers both run (the child's
 * first) and styles stack (the child's on top). The Slot's `undefined` props are left out, so they can't clear a default
 * the child sets for itself.
 */
export const mergeSlotProps = (slot: Props, child: Props): Props => {
  const merged: Props = { ...child };
  for (const key of Object.keys(slot)) {
    const own = slot[key];
    const theirs = child[key];
    if (own === undefined) continue;
    if (isHandler(key, own) && isHandler(key, theirs)) {
      merged[key] = (...args: unknown[]) => {
        theirs(...args);
        own(...args);
      };
    } else if (key === 'style' && own && theirs) {
      merged.style = [own, theirs];
    } else if (theirs === undefined) {
      merged[key] = own;
    }
  }
  return merged;
};

/**
 * Whether a node is one pressable element a trigger can merge into instead of wrapping it in a second button: a component
 * marked `pressable` (Button, Touchable), or anything given an `onPress`.
 */
export const isPressableElement = (node: ReactNode): node is ReactElement<Props> =>
  isValidElement(node) &&
  (typeof (node.props as Props).onPress === 'function' || (node.type as unknown as PressableComponent).pressable === true);

/**
 * Whether a node holds a control of its own, however deep inside plain wrappers: a pressable, or anything given an event
 * handler (a Checkbox's `onCheckedChange`). A row that is a button keeps such nodes beside it, never inside it.
 */
export const hasControl = (node: ReactNode): boolean =>
  Children.toArray(node).some((child) => {
    if (!isValidElement(child)) return false;
    const props = child.props as Props;
    return (
      isPressableElement(child) ||
      Object.keys(props).some((key) => key !== 'onLayout' && isHandler(key, props[key])) ||
      hasControl(props.children as ReactNode)
    );
  });
