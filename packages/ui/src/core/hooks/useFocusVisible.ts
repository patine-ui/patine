import { useCallback, useState } from 'react';
import { Platform } from 'react-native';

import { createModality } from '@/core/utils/modality.utils';

type KeyLike = Parameters<ReturnType<typeof createModality>['onKeyDown']>[0];
// Method syntax on purpose: TypeScript checks it bivariantly, so the DOM's Document (where present) fits this shape.
interface DocumentLike {
  addEventListener(type: string, listener: (event: KeyLike) => void, capture: boolean): void;
}

// Native views only take focus from a hardware keyboard or a TV remote, so there focus always means keyboard.
const modality = createModality(Platform.OS !== 'web');
let listening = false;

/** Listens on the whole document once, in the capture phase, so every component reads the same modality. */
const listen = () => {
  // Reflect.get type-checks with and without the DOM types, so apps with either can compile the source.
  const doc: DocumentLike | undefined = Reflect.get(globalThis, 'document');
  if (listening || !doc) return;
  listening = true;
  doc.addEventListener('keydown', modality.onKeyDown, true);
  doc.addEventListener('pointerdown', modality.onPointerDown, true);
};

/** Focus state for a ring that shows on keyboard focus only: spread `onFocus` and `onBlur` on the focusable view. */
export const useFocusVisible = () => {
  listen();
  const [focusVisible, setFocusVisible] = useState(false);
  const onFocus = useCallback(() => setFocusVisible(modality.isKeyboard()), []);
  const onBlur = useCallback(() => setFocusVisible(false), []);
  return {
    focusVisible,
    onFocus,
    onBlur,
  };
};
