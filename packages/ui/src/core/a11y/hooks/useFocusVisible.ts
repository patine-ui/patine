import { useCallback, useEffect, useRef, useState } from 'react';

import { createModality } from '@/core/a11y/modality.utils';
import { IS_WEB } from '@/core/core.constants';

type KeyLike = Parameters<ReturnType<typeof createModality>['onKeyDown']>[0];
// Method syntax on purpose: TypeScript checks it bivariantly, so the DOM's Document (where present) fits this shape.
interface DocumentLike {
  addEventListener(type: string, listener: (event: KeyLike) => void, capture: boolean): void;
}

// Native views only take focus from a hardware keyboard or a TV remote, so there focus always means keyboard.
const modality = createModality(!IS_WEB);
let listening = false;
// A focus that follows a press on the same view came from a finger or a mouse, even on native, where an iOS simulator or an
// iPad with a keyboard attached hands focus to whatever is tapped.
const PRESS_FOCUS_MS = 600;

/** Listens on the whole document once, in the capture phase, so every component reads the same modality. */
const listen = () => {
  // Reflect.get type-checks with and without the DOM types, so apps with either can compile the source.
  const doc: DocumentLike | undefined = Reflect.get(globalThis, 'document');
  if (listening || !doc) return;
  listening = true;
  doc.addEventListener('keydown', modality.onKeyDown, true);
  doc.addEventListener('pointerdown', modality.onPointerDown, true);
};

/**
 * Focus state for a ring that shows on keyboard focus only: spread `onFocus` and `onBlur` on the focusable view. While
 * focused it follows the modality, so a click on a view focused from the keyboard hides the ring, and a key brings it back.
 */
export const useFocusVisible = () => {
  listen();
  const [focused, setFocused] = useState(false);
  const [focusVisible, setFocusVisible] = useState(false);
  const lastPress = useRef(0);
  // Only the focused view listens, so a modality change re-renders one component, not every pressable on the page.
  useEffect(() => (focused ? modality.subscribe(() => setFocusVisible(modality.isKeyboard())) : undefined), [focused]);
  const onFocus = useCallback(() => {
    setFocused(true);
    setFocusVisible(modality.isKeyboard() && Date.now() - lastPress.current > PRESS_FOCUS_MS);
  }, []);
  const onPressIn = useCallback(() => {
    lastPress.current = Date.now();
    setFocusVisible(false);
  }, []);
  const onBlur = useCallback(() => {
    setFocused(false);
    setFocusVisible(false);
  }, []);
  return {
    focusVisible,
    onFocus,
    onBlur,
    /** Spread on the view's press-in: a press never shows the ring, and a focus right after one doesn't either */
    onPressIn,
  };
};
