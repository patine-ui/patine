import type { Design } from '@/core/theme/theme.types';
import type { QRCodeDesign, QRErrorCorrection } from './qrcode.types';

export const ERROR_CORRECTION = {
  /** Recovers about 7% damage: the smallest code */
  L: 'L',
  /** About 15% */
  M: 'M',
  /** About 25% */
  Q: 'Q',
  /** About 30%: enough to cover the centre with a logo */
  H: 'H',
} as const;

export const MIN_VERSION = 1;
export const MAX_VERSION = 40;

/** Row order of the tables below, and the two bits each level writes in the format information. */
export const ECL_INDEX: Record<QRErrorCorrection, number> = { L: 0, M: 1, Q: 2, H: 3 };
export const ECL_FORMAT_BITS: Record<QRErrorCorrection, number> = { L: 1, M: 0, Q: 3, H: 2 };

/** Error-correction codewords in each block, by level then version (index 0 unused). ISO/IEC 18004 table 9. */
export const ECC_CODEWORDS_PER_BLOCK: readonly (readonly number[])[] = [
  [
    -1, 7, 10, 15, 20, 26, 18, 20, 24, 30, 18, 20, 24, 26, 30, 22, 24, 28, 30, 28, 28, 28, 28, 30, 30, 26, 28, 30, 30, 30, 30, 30, 30, 30,
    30, 30, 30, 30, 30, 30, 30,
  ],
  [
    -1, 10, 16, 26, 18, 24, 16, 18, 22, 22, 26, 30, 22, 22, 24, 24, 28, 28, 26, 26, 26, 26, 28, 28, 28, 28, 28, 28, 28, 28, 28, 28, 28, 28,
    28, 28, 28, 28, 28, 28, 28,
  ],
  [
    -1, 13, 22, 18, 26, 18, 24, 18, 22, 20, 24, 28, 26, 24, 20, 30, 24, 28, 28, 26, 30, 28, 30, 30, 30, 30, 28, 30, 30, 30, 30, 30, 30, 30,
    30, 30, 30, 30, 30, 30, 30,
  ],
  [
    -1, 17, 28, 22, 16, 22, 28, 26, 26, 24, 28, 24, 28, 22, 24, 24, 30, 28, 28, 26, 28, 30, 24, 30, 30, 30, 30, 30, 30, 30, 30, 30, 30, 30,
    30, 30, 30, 30, 30, 30, 30,
  ],
];

/** Error-correction blocks, by level then version (index 0 unused). ISO/IEC 18004 table 9. */
export const ECC_BLOCKS: readonly (readonly number[])[] = [
  [
    -1, 1, 1, 1, 1, 1, 2, 2, 2, 2, 4, 4, 4, 4, 4, 6, 6, 6, 6, 7, 8, 8, 9, 9, 10, 12, 12, 12, 13, 14, 15, 16, 17, 18, 19, 19, 20, 21, 22, 24,
    25,
  ],
  [
    -1, 1, 1, 1, 2, 2, 4, 4, 4, 5, 5, 5, 8, 9, 9, 10, 10, 11, 13, 14, 16, 17, 17, 18, 20, 21, 23, 25, 26, 28, 29, 31, 33, 35, 37, 38, 40,
    43, 45, 47, 49,
  ],
  [
    -1, 1, 1, 2, 2, 4, 4, 6, 6, 8, 8, 8, 10, 12, 16, 12, 17, 16, 18, 21, 20, 23, 23, 25, 27, 29, 34, 34, 35, 38, 40, 43, 45, 48, 51, 53, 56,
    59, 62, 65, 68,
  ],
  [
    -1, 1, 1, 2, 4, 4, 4, 5, 6, 8, 8, 11, 11, 16, 16, 18, 16, 19, 21, 25, 25, 25, 34, 30, 32, 35, 37, 40, 42, 45, 48, 51, 54, 57, 60, 63,
    66, 70, 74, 77, 81,
  ],
];

/** Byte mode's indicator, and the pad codewords that fill unused capacity. */
export const BYTE_MODE = 0b0100;
export const PAD_BYTES = [0xec, 0x11] as const;

/** The mask penalty weights of ISO/IEC 18004 section 7.8.3. */
export const PENALTY = { run: 3, block: 3, finder: 40, balance: 10 } as const;

/** The white margin scanners need around the code, in modules. The spec asks for 4. */
export const DEFAULT_QUIET_ZONE = 4;

/** The logo's share of the code's width; H recovers the modules under it with room to spare. */
export const DEFAULT_LOGO_SIZE = 0.22;

/** Scanners read dark modules on a light ground; inverted codes fail on many readers, so dark mode keeps these too. */
export const DEFAULT_QR_COLOR = '#000000';
export const DEFAULT_QR_BACKGROUND = '#FFFFFF';

/** The quiet zone's corners and the logo plate's: rounded like each design's cards. */
export const QRCODE_DESIGN: Record<Design, QRCodeDesign> = {
  brand: { radius: 'lg', logoRadius: 'md' },
  ios: { radius: 'md', logoRadius: 'md' },
  material: { radius: 'md', logoRadius: 'full' },
  web: { radius: 'sm', logoRadius: 'sm' },
};
