import type { Design } from '@/core/theme/theme.types';
import type { HeaderDesign } from './header.types';

export const HEADER_SIZE = {
  default: 'default',
  /** A big title under the bar: iOS large titles, Material's large top app bar */
  large: 'large',
} as const;

/**
 * iOS: a 44pt bar with the title centred and a "Back" label beside the chevron. Material 3: a 64dp top app bar with the
 * title at the start in title-large. The web: a 56px bar with a bottom border. Brand: 56pt, title at the start, bold.
 */
export const HEADER_DESIGN: Record<Design, HeaderDesign> = {
  brand: { height: 56, centerTitle: false, titleSize: 'lg', titleWeight: 'semibold', largeSize: '3xl', border: false, backLabel: false },
  ios: { height: 44, centerTitle: true, titleSize: 'md', titleWeight: 'semibold', largeSize: '3xl', border: true, backLabel: true },
  material: { height: 64, centerTitle: false, titleSize: 'xl', titleWeight: 'regular', largeSize: '2xl', border: false, backLabel: false },
  web: { height: 56, centerTitle: false, titleSize: 'lg', titleWeight: 'medium', largeSize: '2xl', border: true, backLabel: false },
};

/** Room kept on each side of a centred title for the back button and actions. */
export const CENTER_TITLE_INSET = 96;
