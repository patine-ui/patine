import type { ViewStyle } from 'react-native';

import type { FabProps } from './link.types';

/** Where a placed FAB floats: a corner, or the bottom middle, `offset` in from the edges. */
export const getFabPlacement = (placement: FabProps['placement'], offset: number): ViewStyle | null => {
  if (!placement) return null;
  const base: ViewStyle = { position: 'absolute', bottom: offset, zIndex: 10 };
  const side: ViewStyle =
    placement === 'bottomStart' ? { start: offset } : placement === 'bottomCenter' ? { alignSelf: 'center' } : { end: offset };
  return Object.assign(base, side);
};

/** Copies text with the browser's clipboard, where there is one. Resolves false where there isn't. */
export const copyToWebClipboard = async (text: string) => {
  const clipboard = (globalThis as { navigator?: { clipboard?: { writeText: (t: string) => Promise<void> } } }).navigator?.clipboard;
  if (!clipboard) return false;
  await clipboard.writeText(text);
  return true;
};
