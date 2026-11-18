import type { Design } from '@/core/theme/theme.types';
import type { ImageDesign } from './image.types';

/**
 * Brand frames a picture with a soft radius and a hairline, so a white photo keeps its edge on a white screen. iOS
 * (Photos, the App Store) and Material 3 (its large shape) round it without a border; the web keeps a smaller radius.
 */
export const IMAGE_DESIGN: Record<Design, ImageDesign> = {
  brand: { radius: 'lg', border: true },
  ios: { radius: 'md', border: false },
  material: { radius: 'lg', border: false },
  web: { radius: 'md', border: false },
};

/** The fallback's picture glyph, in points: a frame with a sun in its corner. */
export const GLYPH = { width: 28, height: 22, sun: 6, stroke: 1.5, inset: 4 } as const;
