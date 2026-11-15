import type { Design } from '@/core/theme/theme.types';
import type { LightboxDesign, LightboxLabels } from './lightbox.types';

export const DEFAULT_LIGHTBOX_LABELS: LightboxLabels = {
  close: 'Close',
  previous: 'Previous image',
  next: 'Next image',
  image: 'Image {page} of {count}',
};

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

/** Lightboxes are black in light and dark mode alike, so photos read true. */
export const LIGHTBOX_BACKDROP = '#000000';
export const LIGHTBOX_FOREGROUND = '#FFFFFF';
/** Behind the top bar, so the counter and close button read over a bright photo. */
export const LIGHTBOX_SCRIM = 'rgba(0, 0, 0, 0.45)';

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
