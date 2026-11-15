import type { Design } from '@/core/theme/theme.types';
import type { CarouselDesign, CarouselLabels } from './carousel.types';

export const ORIENTATION = {
  horizontal: 'horizontal',
  vertical: 'vertical',
} as const;

export const CAROUSEL_ALIGN = {
  center: 'center',
  start: 'start',
} as const;

export const DEFAULT_CAROUSEL_LABELS: CarouselLabels = {
  previous: 'Previous slide',
  next: 'Next slide',
  slide: 'Slide {page} of {count}',
};

/** `autoplay={true}`: a slide every 4 seconds. */
export const AUTOPLAY_MS = 4000;

/** A scroll that stops sending events for this long has come to rest (the web has no momentum-end event). */
export const SETTLE_MS = 120;

/**
 * iOS: UIPageControl's 7pt dots, the current one in the text colour and the rest faded. Material 3: an 8dp row with the
 * current page a primary pill. The web: plain 8px dots, the current one primary. Brand: a primary pill sliding over soft dots.
 * Arrows: round buttons over the edges; outlined on the web and brand, tonal in Material, a frosted fill on iOS.
 */
export const CAROUSEL_DESIGN: Record<Design, CarouselDesign> = {
  brand: {
    indicator: { dot: 8, slot: 16, activeWidth: 20, activeColor: 'primary', inactiveColor: 'border', inactiveOpacity: 1 },
    arrow: { size: 40, fill: 'background', border: true, radius: 'full' },
  },
  ios: {
    indicator: { dot: 7, slot: 16, activeWidth: 7, activeColor: 'text', inactiveColor: 'text', inactiveOpacity: 0.3 },
    arrow: { size: 36, fill: 'surface', border: false, radius: 'full' },
  },
  material: {
    indicator: { dot: 8, slot: 16, activeWidth: 16, activeColor: 'primary', inactiveColor: 'outline', inactiveOpacity: 0.6 },
    arrow: { size: 40, fill: 'primaryMuted', border: false, radius: 'full' },
  },
  web: {
    indicator: { dot: 8, slot: 18, activeWidth: 8, activeColor: 'primary', inactiveColor: 'border', inactiveOpacity: 1 },
    arrow: { size: 36, fill: 'background', border: true, radius: 'full' },
  },
};
