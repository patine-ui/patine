import type { Design } from '@/core/theme/theme.types';
import type { TabBarDesign } from './tabbar.types';

/**
 * ios: UITabBar, 49pt, a hairline on top, the selected icon and label tinted. material: Material 3's navigation bar,
 * 80dp on a tonal surface with a pill behind the selected icon. web and brand: a 56–64pt bar with a top border.
 */
export const TABBAR_DESIGN: Record<Design, TabBarDesign> = {
  brand: {
    height: 64,
    indicator: false,
    border: true,
    background: 'background',
    selectedColor: 'primary',
    labelSize: 'xs',
    railWidth: 80,
  },
  ios: {
    height: 49,
    indicator: false,
    border: true,
    background: 'background',
    selectedColor: 'primary',
    labelSize: 'xs',
    railWidth: 72,
  },
  material: {
    height: 80,
    indicator: true,
    border: false,
    background: 'surface',
    selectedColor: 'text',
    labelSize: 'sm',
    railWidth: 80,
  },
  web: {
    height: 56,
    indicator: false,
    border: true,
    background: 'background',
    selectedColor: 'primary',
    labelSize: 'xs',
    railWidth: 72,
  },
};

/** Material 3's active indicator behind the selected icon. */
export const INDICATOR = { width: 64, height: 32 } as const;

export const DEFAULT_TABBAR_LABEL = 'Tabs';

/** Counts past this read as "99+". */
export const MAX_BADGE = 99;
