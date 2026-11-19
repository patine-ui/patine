import { useEffect, useState } from 'react';

import { IS_WEB } from '@/core/core.constants';

const QUERY = '(pointer: fine)';

type MediaList = {
  matches: boolean;
  addEventListener?: (type: 'change', fn: () => void) => void;
  removeEventListener?: (type: 'change', fn: () => void) => void;
};

/** The browser's media query, when there's a DOM. */
const media = (): MediaList | undefined =>
  IS_WEB ? (globalThis as { matchMedia?: (query: string) => MediaList }).matchMedia?.(QUERY) : undefined;

/** Whether the main pointer is a mouse or trackpad: a browser that reports `(pointer: fine)`. Touch screens and native apps never are. */
export const hasFinePointer = () => Boolean(media()?.matches);

/**
 * A mouse or trackpad drives the page, so controls can be compact (plan: 32–36 px rows on desktop menus). Follows the device
 * as it changes, such as a tablet docking a trackpad. Always false on iOS and Android, which keep 44 pt targets.
 */
export const useFinePointer = () => {
  const [fine, setFine] = useState(hasFinePointer);
  useEffect(() => {
    const list = media();
    if (!list) return;
    const update = () => setFine(list.matches);
    list.addEventListener?.('change', update);
    return () => list.removeEventListener?.('change', update);
  }, []);
  return fine;
};
