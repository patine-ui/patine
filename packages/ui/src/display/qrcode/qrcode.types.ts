import type React from 'react';
import type { StyleProp, ViewStyle } from 'react-native';

import type { ThemableProps, ValueOf } from '@/core/core.types';
import type { Theme } from '@/core/theme/theme.types';
import type { ERROR_CORRECTION } from './qrcode.constants';

export type QRErrorCorrection = ValueOf<typeof ERROR_CORRECTION>;

export interface QRCodeOptions {
  /** Default: 'M' */
  errorCorrection?: QRErrorCorrection;
  /** The smallest version (size) to use, 1–40. Default: 1 */
  minVersion?: number;
  /** Force a mask pattern, 0–7. Default: the one the spec's penalty rules pick */
  mask?: number;
}

/** An encoded QR code: `modules[y][x]` is true for a dark module. */
export interface QRMatrix {
  version: number;
  /** Modules per side: 17 + 4 × version */
  size: number;
  errorCorrection: QRErrorCorrection;
  mask: number;
  modules: boolean[][];
}

export interface QRCodeProps extends ThemableProps {
  /** The text or URL to encode, as UTF-8 bytes */
  value: string;
  /** The width and height, quiet zone included, in points. Default: 200 */
  size?: number;
  /** Default: 'M', or 'H' with a logo */
  errorCorrection?: QRErrorCorrection;
  /** Dark modules. Default: black, in light and dark mode, since scanners expect dark on light */
  color?: string;
  /** The ground and quiet zone. Default: white */
  backgroundColor?: string;
  /** The margin around the code, in modules. Default: 4, as the spec asks */
  quietZone?: number;
  /** Shown in the centre over a plate in `backgroundColor`, with the modules under it cleared */
  logo?: React.ReactNode;
  /** The logo plate's share of the code's width, up to 0.3. Default: 0.22 */
  logoSize?: number;
  /** Read by screen readers. Default: 'QR code' */
  accessibilityLabel?: string;
  /** The value is too long for a QR code at this level; nothing is drawn */
  onError?: (error: Error) => void;
  /** The outer view, for layout */
  style?: StyleProp<ViewStyle>;
  testID?: string;
}

export interface QRCodeDesign {
  radius: keyof Theme['radius'];
  logoRadius: keyof Theme['radius'];
}

/** One horizontal run of dark modules, drawn as a single view. */
export interface QRRun {
  x: number;
  y: number;
  length: number;
}
