import { createContext } from 'react';

/**
 * Whether an inset grouped List (iOS, brand, web) adds its own side margin. True on a full-bleed screen; a container that
 * already pads its content, such as a page, provides false, so its lists line up with the cards beside them instead of
 * sitting a margin narrower.
 */
export const ListInsetContext = createContext(true);
