import type { Design } from '@/core/theme/theme.types';
import type { SignatureDesign, SignatureLabels } from './signature.types';

export const DEFAULT_SIGNATURE_LABELS: SignatureLabels = {
  placeholder: 'Sign here',
  clear: 'Clear',
  label: 'Signature',
  signed: 'Signed',
  empty: 'Empty',
};

export const SIGNATURE_DEFAULTS = { strokeWidth: 3, height: 200 } as const;

/** A new point closer than this (pt) to the last one is skipped, which keeps strokes light without losing shape. */
export const MIN_POINT_DISTANCE = 1.5;

/** Custom screen-reader action that clears the pad. */
export const CLEAR_ACTION = 'clear';

/**
 * iOS: a gray filled card, as signing in Apple's Markup. Material 3: an outlined field. The web and brand: a dashed
 * drop-zone border. Every design draws a signature line near the bottom.
 */
export const SIGNATURE_DESIGN: Record<Design, SignatureDesign> = {
  brand: { fill: 'background', border: 'dashed', borderColor: 'outline', radius: 'lg' },
  ios: { fill: 'surface', border: 'none', borderColor: 'border', radius: 'lg' },
  material: { fill: 'background', border: 'solid', borderColor: 'outline', radius: 'sm' },
  web: { fill: 'background', border: 'dashed', borderColor: 'border', radius: 'md' },
};
