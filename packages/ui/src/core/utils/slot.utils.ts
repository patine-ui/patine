type Props = Record<string, unknown>;

const isHandler = (key: string, value: unknown): value is (...args: unknown[]) => unknown =>
  /^on[A-Z]/.test(key) && typeof value === 'function';

/**
 * A Slot's props merged into its child's, as Radix does: the child's win, except that handlers both run (the child's
 * first) and styles stack (the child's on top).
 */
export const mergeSlotProps = (slot: Props, child: Props): Props => {
  const merged: Props = { ...slot, ...child };
  for (const key of Object.keys(slot)) {
    const own = slot[key];
    const theirs = child[key];
    if (isHandler(key, own) && isHandler(key, theirs)) {
      merged[key] = (...args: unknown[]) => {
        theirs(...args);
        own(...args);
      };
    } else if (key === 'style' && own && theirs) {
      merged.style = [own, theirs];
    }
  }
  return merged;
};
