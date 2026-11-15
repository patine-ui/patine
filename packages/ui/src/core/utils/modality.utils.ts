/**
 * Whether the user is on a keyboard or a pointer right now, so a focus ring shows for Tab but not after a click
 * (the `:focus-visible` rule, which React Native Web styles can't express).
 */
export const createModality = (startsOnKeyboard: boolean) => {
  let keyboard = startsOnKeyboard;
  return {
    /** A key with a modifier is a shortcut, not navigation, so it doesn't switch to keyboard. */
    onKeyDown: (e: { metaKey?: boolean; altKey?: boolean; ctrlKey?: boolean }) => {
      if (!e.metaKey && !e.altKey && !e.ctrlKey) keyboard = true;
    },
    onPointerDown: () => {
      keyboard = false;
    },
    isKeyboard: () => keyboard,
  };
};
