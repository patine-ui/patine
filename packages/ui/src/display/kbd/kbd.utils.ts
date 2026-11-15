import { KEY_NAMES } from './kbd.constants';

/** How a screen reader should say a shortcut: symbols as words, keys joined by spaces. */
export const speakKeys = (keys: readonly string[]) => keys.map((key) => KEY_NAMES[key] ?? key).join(' ');
