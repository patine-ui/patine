/**
 * Whether the user is on a keyboard or a pointer right now, so a focus ring shows for Tab but not after a click
 * (the `:focus-visible` rule, which React Native Web styles can't express, and which browsers don't always clear).
 */
export const createModality = (startsOnKeyboard: boolean) => {
  let keyboard = startsOnKeyboard;
  const listeners = new Set<() => void>();
  const set = (next: boolean) => {
    if (next === keyboard) return;
    keyboard = next;
    for (const listener of listeners) listener();
  };
  return {
    /** A key with a modifier is a shortcut, not navigation, so it doesn't switch to keyboard. */
    onKeyDown: (e: { metaKey?: boolean; altKey?: boolean; ctrlKey?: boolean }) => {
      if (!e.metaKey && !e.altKey && !e.ctrlKey) set(true);
    },
    onPointerDown: () => set(false),
    isKeyboard: () => keyboard,
    /** Called when the modality changes; returns the unsubscribe. */
    subscribe: (listener: () => void) => {
      listeners.add(listener);
      return () => {
        listeners.delete(listener);
      };
    },
  };
};
