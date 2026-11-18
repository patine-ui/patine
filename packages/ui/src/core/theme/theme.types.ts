import type React from 'react';
import type { PlatformOSType, TextStyle } from 'react-native';

import type { DeepPartial, ValueOf } from '@/core/core.types';
import type { COLOR_SCHEME, DESIGN, PLATFORM_DESIGNS, SHADOW_LEVEL } from './theme.constants';

export interface Theme {
  dark: boolean;
  /** The look components follow: 'brand', 'ios', 'material' or 'web' */
  design: Design;
  colors: {
    /** Picker surface background */
    background: string;
    /** Secondary surfaces: search inputs, chips, hovered rows */
    surface: string;
    /** Bottom sheet background */
    sheet: string;
    text: string;
    textSecondary: string;
    textDisabled: string;
    primary: string;
    onPrimary: string;
    /** Soft primary tint: range fill, selected row background */
    primaryMuted: string;
    border: string;
    /** The edge of a control that must be seen to be used, such as an unchecked checkbox: 3:1 against the background */
    outline: string;
    backdrop: string;
    /** Wheel selection band */
    indicator: string;
    handle: string;
    /** Tint over anything pressable while the pointer is over it (web and pointer devices). 'transparent' turns it off */
    hover: string;
    /** The ripple that spreads from the touch point on press. 'transparent' turns it off */
    ripple: string;
    /** Destructive actions, such as Delete in an action sheet */
    danger: string;
    /** Text and icons on a `danger` fill */
    onDanger: string;
    /** Positive outcomes: saved, paid, online */
    success: string;
    /** Needs attention but isn't an error */
    warning: string;
  };
  radius: { sm: number; md: number; lg: number; full: number; sheet: number };
  spacing: { xs: number; sm: number; md: number; lg: number; xl: number };
  typography: {
    fontFamily?: string;
    fontFamilyMedium?: string;
    sizes: { xs: number; sm: number; md: number; lg: number; xl: number; '2xl': number; '3xl': number };
    weights: { regular: TextStyle['fontWeight']; medium: TextStyle['fontWeight']; bold: TextStyle['fontWeight'] };
  };
  animation: { duration: number };
  /**
   * Elevation, as CSS `box-shadow` strings that React Native draws on iOS, Android and the web. Each design fills its own:
   * soft and diffuse on iOS, Material 3's five levels, Tailwind's scale on the web. Every component that casts a shadow reads
   * one of these, so overriding them restyles cards, dialogs, menus, popovers, toasts and knobs at once. `'none'` turns one off.
   */
  shadows: Record<ShadowLevel, string>;
}

export type ColorScheme = ValueOf<typeof COLOR_SCHEME>;
/** A design, or 'native' (alias 'auto') for the one that matches the platform */
export type DesignPreference = ValueOf<typeof DESIGN>;
export type Design = Exclude<DesignPreference, (typeof PLATFORM_DESIGNS)[number]>;
export type TextSize = keyof Theme['typography']['sizes'];
export type TextWeight = keyof Theme['typography']['weights'];
/** A step on the theme's elevation scale, from flat to floating */
export type ShadowLevel = ValueOf<typeof SHADOW_LEVEL>;

/** The platform components behave as on (`Platform.OS`'s values). */
export type PlatformOS = PlatformOSType;

export interface PatineProviderProps {
  children: React.ReactNode;
  /** 'auto' follows the OS appearance. Default: 'auto' */
  colorScheme?: ColorScheme;
  /** Overrides applied to the light theme (or a full theme) */
  theme?: DeepPartial<Theme>;
  /** Overrides applied to the dark theme */
  darkTheme?: DeepPartial<Theme>;
  /** Pickers behave as on this platform: sheets or dropdowns, insets, dragging. For previewing iOS or Android in a browser. Default: `Platform.OS` */
  platform?: PlatformOS;
  /** The look components follow. 'brand' is Patine's own look on every platform; 'native' matches the platform: 'ios' on iOS, 'web' on the web, 'material' elsewhere. Default: 'brand' */
  design?: DesignPreference;
}
