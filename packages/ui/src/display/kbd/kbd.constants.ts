import type { Design } from '@/core/theme/theme.types';
import type { KbdDesign } from './kbd.types';

/** brand and web: an outlined keycap with a heavier bottom edge, as GitHub and shadcn draw it. iOS and Material: a flat tonal chip. */
export const KBD_DESIGN: Record<Design, KbdDesign> = {
  brand: { keycap: true, fill: 'surface', radius: 6 },
  ios: { keycap: false, fill: 'surface', radius: 6 },
  material: { keycap: false, fill: 'primaryMuted', radius: 8 },
  web: { keycap: true, fill: 'surface', radius: 4 },
};

export const KBD_SIZE = {
  sm: { height: 20, minWidth: 20, paddingX: 4, text: 'xs' },
  md: { height: 24, minWidth: 24, paddingX: 6, text: 'sm' },
} as const;

/** Spoken names for the symbols on keys, so a screen reader says "Command K", not "place of interest sign K". */
export const KEY_NAMES: Record<string, string> = {
  '⌘': 'Command',
  '⇧': 'Shift',
  '⌥': 'Option',
  '⌃': 'Control',
  '↵': 'Enter',
  '⏎': 'Return',
  '⌫': 'Delete',
  '⎋': 'Escape',
  '⇥': 'Tab',
  '↑': 'Up',
  '↓': 'Down',
  '←': 'Left',
  '→': 'Right',
  '⇪': 'Caps Lock',
  '␣': 'Space',
};

export const MONO_FONT = 'ui-monospace, SFMono-Regular, Menlo, monospace';
