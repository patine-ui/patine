import type { Design } from '@/core/theme/theme.types';
import type { TabsDesign } from './tabs.types';

export const TABS_VARIANT = {
  pills: 'pills',
  underline: 'underline',
} as const;

export const TABS_ORIENTATION = {
  horizontal: 'horizontal',
  vertical: 'vertical',
} as const;

export const INDICATOR_FIT = {
  tab: 'tab',
  content: 'content',
} as const;

/** Space between the pill track's edge and its tabs. */
export const TRACK_PADDING = 3;

/**
 * Brand: shadcn's muted track with the active tab raised, the tabs sharing its width. iOS: a segmented control. Material 3: primary tabs, full width,
 * the indicator under the label. The web: an underline under the whole tab, sized to its label.
 */
export const TABS_DESIGN: Record<Design, TabsDesign> = {
  brand: {
    variant: TABS_VARIANT.pills,
    fullWidth: true,
    pillHeight: 36,
    underlineHeight: 44,
    indicatorSize: 2,
    indicatorFit: INDICATOR_FIT.tab,
    track: 'surface',
    activeLabel: 'text',
  },
  ios: {
    variant: TABS_VARIANT.pills,
    fullWidth: true,
    pillHeight: 26,
    underlineHeight: 44,
    indicatorSize: 2,
    indicatorFit: INDICATOR_FIT.tab,
    track: 'border',
    activeLabel: 'primary',
  },
  material: {
    variant: TABS_VARIANT.underline,
    fullWidth: true,
    pillHeight: 32,
    underlineHeight: 48,
    indicatorSize: 3,
    indicatorFit: INDICATOR_FIT.content,
    track: 'surface',
    activeLabel: 'primary',
  },
  web: {
    variant: TABS_VARIANT.underline,
    fullWidth: false,
    pillHeight: 32,
    underlineHeight: 40,
    indicatorSize: 2,
    indicatorFit: INDICATOR_FIT.tab,
    track: 'surface',
    activeLabel: 'text',
  },
};
