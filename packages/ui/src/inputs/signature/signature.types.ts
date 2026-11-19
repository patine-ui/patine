import type { StyleProp, ViewStyle } from 'react-native';

import type { ThemableProps } from '@/core/core.types';
import type { SignatureLabels } from '@/core/theme/labels.types';
import type { Theme } from '@/core/theme/theme.types';

export interface SignaturePoint {
  x: number;
  y: number;
}

/** One pen-down-to-pen-up line, in points from the pad's top left. */
export type SignatureStroke = readonly SignaturePoint[];

export interface SignaturePadProps extends ThemableProps {
  /** The strokes drawn. Pair with `onValueChange` to control it; `[]` clears it */
  value?: readonly SignatureStroke[];
  /** The value at first, when it keeps its own state */
  defaultValue?: readonly SignatureStroke[];
  /** A stroke is finished, or the pad is cleared. Not called when you change `value` */
  onValueChange?: (strokes: SignatureStroke[]) => void;
  /** The pen touches down: e.g. stop a ScrollView around it from scrolling */
  onBegin?: () => void;
  /** The pen lifts */
  onEnd?: () => void;
  /** Default: the theme's text colour */
  strokeColor?: string;
  /** Default: 3 */
  strokeWidth?: number;
  /** Default: 200 */
  height?: number;
  /** A Clear button in the corner once something's drawn. Default: true */
  showClear?: boolean;
  /** Dims it and ignores input. Default: false */
  disabled?: boolean;
  /** Its built-in text, for translation */
  labels?: Partial<SignatureLabels>;
  /** The outer view, for layout */
  style?: StyleProp<ViewStyle>;
  testID?: string;
}

export interface SignatureDesign {
  fill: keyof Theme['colors'];
  border: 'dashed' | 'solid' | 'none';
  borderColor: keyof Theme['colors'];
  radius: keyof Theme['radius'];
}

/** A drawn segment: a rounded bar from one point to the next. */
export interface SegmentBox {
  left: number;
  top: number;
  width: number;
  height: number;
  angle: number;
}

export interface SvgOptions {
  width: number;
  height: number;
  /** Default: '#000000' */
  color?: string;
  /** Default: 3 */
  strokeWidth?: number;
  /** Default: none (transparent) */
  backgroundColor?: string;
}

export type { SignatureLabels } from '@/core/theme/labels.types';
