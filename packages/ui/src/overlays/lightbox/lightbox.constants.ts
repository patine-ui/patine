import type { Design } from '@/core/theme/theme.types';
import type { LightboxDesign } from './lightbox.types';

export const ZOOM = {
  /** The most an image grows */
  max: 4,
  /** A double tap or the + key zooms to this */
  step: 2.5,
} as const;

/** Two taps closer than this (ms) are a double tap. */
export const DOUBLE_TAP_MS = 280;

/** A downward drag past this (pt), or a flick faster than `velocity` (pt/ms), closes the viewer. */
export const DISMISS = { distance: 120, velocity: 1, fade: 400 } as const;

/**
 * iOS and Material put the close button at the start of the top bar, as Photos and Google Photos do; the web and brand at
 * the end, where a browser dialog's close sits.
 */
export const LIGHTBOX_DESIGN: Record<Design, LightboxDesign> = {
  brand: { closeSide: 'end', counter: 'center' },
  ios: { closeSide: 'start', counter: 'center' },
  material: { closeSide: 'start', counter: 'start' },
  web: { closeSide: 'end', counter: 'start' },
};
