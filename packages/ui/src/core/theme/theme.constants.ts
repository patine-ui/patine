import { DURATION } from '@/core/animation/animation.constants';
import type { DeepPartial } from '@/core/core.types';
import type { Design, Theme } from './theme.types';

export const COLOR_SCHEME = {
  auto: 'auto',
  light: 'light',
  dark: 'dark',
} as const;

export const DESIGN = {
  /** Patine's own look, the same on every platform. The default */
  brand: 'brand',
  /** The look of the platform it runs on: 'ios' on iOS, 'material' on Android, 'web' on the web */
  native: 'native',
  ios: 'ios',
  material: 'material',
  web: 'web',
} as const;

/** The elevation scale, flat to floating. Cards rest on `xs`, menus and popovers float on `lg`, dialogs on `xl`. */
export const SHADOW_LEVEL = {
  none: 'none',
  xs: 'xs',
  sm: 'sm',
  md: 'md',
  lg: 'lg',
  xl: 'xl',
} as const;

/** The scale in order, for stepping up or down it. */
export const SHADOW_LEVELS = Object.values(SHADOW_LEVEL);

/**
 * Each design's elevation. brand (Patine): hairline-soft, low layers tinted with the
 * green-black ink, never a hard drop. ios: wide, diffuse shadows, with UIKit's two-layer knob shadow
 * at `sm`. material: Material 3's elevation levels 1 to 5 (a key and an ambient shadow). web: Tailwind's shadow scale.
 */
export const DESIGN_SHADOWS: Record<Design, Theme['shadows']> = {
  brand: {
    none: 'none',
    xs: '0px 1px 2px rgba(23,26,25,0.05)',
    sm: '0px 1px 2px rgba(23,26,25,0.06), 0px 2px 6px -1px rgba(23,26,25,0.06)',
    md: '0px 2px 4px -1px rgba(23,26,25,0.05), 0px 8px 16px -4px rgba(23,26,25,0.08)',
    lg: '0px 4px 8px -2px rgba(23,26,25,0.06), 0px 16px 32px -8px rgba(23,26,25,0.14)',
    xl: '0px 8px 16px -4px rgba(23,26,25,0.08), 0px 28px 56px -12px rgba(23,26,25,0.22)',
  },
  ios: {
    none: 'none',
    xs: '0px 1px 3px rgba(0,0,0,0.1)',
    sm: '0px 3px 8px rgba(0,0,0,0.15), 0px 3px 1px rgba(0,0,0,0.06)',
    md: '0px 6px 18px rgba(0,0,0,0.12)',
    lg: '0px 8px 28px rgba(0,0,0,0.16)',
    xl: '0px 16px 48px rgba(0,0,0,0.22)',
  },
  material: {
    none: 'none',
    xs: '0px 1px 2px rgba(0,0,0,0.3), 0px 1px 3px 1px rgba(0,0,0,0.15)',
    sm: '0px 1px 2px rgba(0,0,0,0.3), 0px 2px 6px 2px rgba(0,0,0,0.15)',
    md: '0px 1px 3px rgba(0,0,0,0.3), 0px 4px 8px 3px rgba(0,0,0,0.15)',
    lg: '0px 2px 3px rgba(0,0,0,0.3), 0px 6px 10px 4px rgba(0,0,0,0.15)',
    xl: '0px 4px 4px rgba(0,0,0,0.3), 0px 8px 12px 6px rgba(0,0,0,0.15)',
  },
  web: {
    none: 'none',
    xs: '0px 1px 2px rgba(0,0,0,0.05)',
    sm: '0px 1px 3px rgba(0,0,0,0.1), 0px 1px 2px -1px rgba(0,0,0,0.1)',
    md: '0px 4px 6px -1px rgba(0,0,0,0.1), 0px 2px 4px -2px rgba(0,0,0,0.1)',
    lg: '0px 10px 15px -3px rgba(0,0,0,0.1), 0px 4px 6px -4px rgba(0,0,0,0.1)',
    xl: '0px 20px 25px -5px rgba(0,0,0,0.1), 0px 8px 10px -6px rgba(0,0,0,0.1)',
  },
};

const SHARED_TOKENS: Omit<Theme, 'dark' | 'colors'> = {
  design: DESIGN.ios,
  radius: { sm: 8, md: 12, lg: 16, full: 999, sheet: 24 },
  spacing: { xs: 4, sm: 8, md: 12, lg: 16, xl: 24 },
  typography: {
    sizes: { xs: 11, sm: 13, md: 16, lg: 19, xl: 22, '2xl': 26, '3xl': 32 },
    weights: { regular: '400', medium: '500', bold: '600' },
  },
  animation: { duration: DURATION.base },
  shadows: DESIGN_SHADOWS.ios,
};

export const lightTheme: Theme = {
  dark: false,
  colors: {
    background: '#FFFFFF',
    surface: '#F4F2EE',
    sheet: '#FFFFFF',
    text: '#171A19',
    textSecondary: '#5F5B54',
    textDisabled: '#ABA69D',
    primary: '#1F6B63',
    onPrimary: '#FFFFFF',
    primaryMuted: 'rgba(31,107,99,0.10)',
    border: '#E5E1D9',
    outline: '#8C877E',
    backdrop: 'rgba(23,26,25,0.48)',
    indicator: 'rgba(23,26,25,0.06)',
    handle: '#D3CEC5',
    hover: 'rgba(23,26,25,0.04)',
    ripple: 'rgba(23,26,25,0.12)',
    danger: '#C2352B',
    onDanger: '#FFFFFF',
    success: '#4D7C0F',
    warning: '#A16207',
  },
  ...SHARED_TOKENS,
};

export const darkTheme: Theme = {
  dark: true,
  colors: {
    background: '#0E1312',
    surface: '#18201E',
    sheet: '#121816',
    text: '#EDF0EC',
    textSecondary: '#9AA39F',
    textDisabled: '#4B5552',
    primary: '#6CC4B3',
    onPrimary: '#06201B',
    primaryMuted: 'rgba(108,196,179,0.16)',
    border: '#242D2A',
    outline: '#6A7571',
    backdrop: 'rgba(0,0,0,0.6)',
    indicator: 'rgba(255,255,255,0.07)',
    handle: '#38433F',
    hover: 'rgba(255,255,255,0.05)',
    ripple: 'rgba(255,255,255,0.16)',
    danger: '#FF7B70',
    onDanger: '#1F0705',
    success: '#A8D46A',
    warning: '#F2C94C',
  },
  ...SHARED_TOKENS,
};

/** What each design changes on top of the light or dark theme. iOS is the base look. */
export const DESIGN_TOKENS: Record<Design, DeepPartial<Theme>> = {
  brand: { design: DESIGN.brand, radius: { sm: 6, md: 10, lg: 14, sheet: 20 }, shadows: DESIGN_SHADOWS.brand },
  ios: { design: DESIGN.ios, shadows: DESIGN_SHADOWS.ios },
  material: { design: DESIGN.material, radius: { sm: 8, md: 4, lg: 16, sheet: 28 }, shadows: DESIGN_SHADOWS.material },
  web: { design: DESIGN.web, radius: { sm: 6, md: 8, lg: 12, sheet: 12 }, shadows: DESIGN_SHADOWS.web },
};
