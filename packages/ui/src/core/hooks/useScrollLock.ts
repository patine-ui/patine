import { useEffect } from 'react';

interface BodyLike {
  style: { overflow: string };
}

// One count for every open overlay, so closing a nested modal doesn't unlock the page under the one still open.
let locks = 0;
let saved = '';

/** While `active`, stops the web page behind an overlay from scrolling. Native screens don't scroll behind a modal. */
export const useScrollLock = (active: boolean) => {
  useEffect(() => {
    // Reflect.get type-checks with and without the DOM types, as useFocusVisible does.
    const body: BodyLike | undefined = Reflect.get(globalThis, 'document')?.body;
    if (!active || !body) return;
    if (locks === 0) {
      saved = body.style.overflow;
      body.style.overflow = 'hidden';
    }
    locks += 1;
    return () => {
      locks -= 1;
      if (locks === 0) body.style.overflow = saved;
    };
  }, [active]);
};
