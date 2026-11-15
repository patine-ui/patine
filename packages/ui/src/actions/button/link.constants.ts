import type { Design } from '@/core/theme/theme.types';
import type { FabDesign, LinkDesign } from './link.types';

export const LINK_UNDERLINE = {
  always: 'always',
  hover: 'hover',
  none: 'none',
} as const;

/** iOS tints links without a line; Material underlines them; brand and the web underline on hover, as shadcn does. */
export const LINK_DESIGN: Record<Design, LinkDesign> = {
  brand: { underline: LINK_UNDERLINE.hover, weight: 'medium' },
  ios: { underline: LINK_UNDERLINE.none, weight: 'regular' },
  material: { underline: LINK_UNDERLINE.always, weight: 'medium' },
  web: { underline: LINK_UNDERLINE.hover, weight: 'medium' },
};

export const EXTERNAL_MARK = ' ↗';

/** Material 3's FAB sizes: small 40, regular 56, large 96; the icon grows with it. */
export const FAB_SIZE = {
  sm: { side: 40, radius: 12, icon: 24 },
  md: { side: 56, radius: 16, icon: 24 },
  lg: { side: 96, radius: 28, icon: 36 },
} as const;

/** Material 3: a rounded square on the tonal primary container. The others: a primary circle that floats. */
export const FAB_DESIGN: Record<Design, FabDesign> = {
  brand: { shape: 'circle', fill: 'primary', onFill: 'onPrimary', shadow: 'lg' },
  ios: { shape: 'circle', fill: 'primary', onFill: 'onPrimary', shadow: 'lg' },
  material: { shape: 'rounded', fill: 'primaryMuted', onFill: 'primary', shadow: 'md' },
  web: { shape: 'circle', fill: 'primary', onFill: 'onPrimary', shadow: 'lg' },
};

export const DEFAULT_FAB_OFFSET = 16;
export const COPY_TIMEOUT = 2000;
export const COPY_GLYPH = '⧉';
export const COPIED_GLYPH = '✓';
