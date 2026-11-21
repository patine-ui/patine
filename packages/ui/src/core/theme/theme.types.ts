import type React from 'react';
import type { PlatformOSType, TextStyle } from 'react-native';

import type { DeepPartial, ValueOf } from '@/core/core.types';
import type { Labels } from './labels.types';
import type { COLOR_SCHEME, DENSITY, DESIGN, FONT_ROLE, SHADOW_LEVEL, TEXT_SIZE, TEXT_WEIGHT } from './theme.constants';

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
    /** Behind full-screen media, such as the image viewer */
    media: string;
    /** Text and icons on media, on a `scrim`, or on a saturated action fill (swipe actions) */
    onMedia: string;
    /** A see-through band over media that keeps `onMedia` text readable */
    scrim: string;
    /** A slider's or colour picker's thumb, as iOS draws it: the same in light and dark */
    knob: string;
    /** Filled rating stars */
    rating: string;
    /** The line between joined filled buttons, on the fill */
    fillDivider: string;
    /** Secondary text and icons on media: captions, counters, timestamps */
    onMediaMuted: string;
    /** A track or progress rail drawn on media, such as a video scrubber */
    mediaTrack: string;
  };
  /**
   * Data colours for charts, in the order series should take them: eight hues from the Okabe–Ito colour-blind-safe palette,
   * tuned to read on this scheme's background. `theme.chart[i % theme.chart.length]` colours series `i`.
   */
  chart: ChartPalette;
  radius: { sm: number; md: number; lg: number; full: number; sheet: number };
  spacing: { xs: number; sm: number; md: number; lg: number; xl: number };
  typography: {
    /**
     * Font families by role, one family name per weight (static fonts name each weight: `Inter_600SemiBold`). A role left
     * out uses `body`; with no `body`, the system font. Load the files yourself (Expo's `useFonts`, `@font-face`) and pass
     * their names here: Patine ships no fonts.
     */
    fonts?: Partial<Record<FontRole, FontFaces>>;
    sizes: Record<TextSize, number>;
    /** Line height per step, in points. Leave out to keep the font's own. Set them when you set `fonts`: families differ */
    lineHeights?: Partial<Record<TextSize, number>>;
    /** Letter spacing per step, in points: tighter on large steps */
    tracking?: Partial<Record<TextSize, number>>;
    weights: Record<TextWeight, TextStyle['fontWeight']>;
  };
  /** How tightly lists, tables and controls pack. `compact` is for dense desktop screens with a pointer; touch keeps 44pt targets */
  density: Density;
  animation: { duration: number };
  /**
   * Elevation, as CSS `box-shadow` strings that React Native draws on iOS, Android and the web. Each design fills its own:
   * soft and diffuse on iOS, Material 3's five levels, Tailwind's scale on the web. Every component that casts a shadow reads
   * one of these, so overriding them restyles cards, dialogs, menus, popovers, toasts and knobs at once. `'none'` turns one off.
   */
  shadows: Record<ShadowLevel, string>;
}

export type ColorScheme = ValueOf<typeof COLOR_SCHEME>;
/** A design, or 'native' for the one that matches the platform */
export type DesignPreference = ValueOf<typeof DESIGN>;
export type Design = Exclude<DesignPreference, typeof DESIGN.native>;
/** A step of the type scale, from captions to one hero number per screen. */
export type TextSize = ValueOf<typeof TEXT_SIZE>;
export type TextWeight = ValueOf<typeof TEXT_WEIGHT>;
/** What a piece of text is for, which picks its family: `heading` for titles, `numeric` for amounts and times, `mono` for code. */
export type FontRole = ValueOf<typeof FONT_ROLE>;
/** A family's name for each weight. A weight left out draws `regular`'s family at that weight. */
export type FontFaces = { regular: string } & Partial<Record<Exclude<TextWeight, 'regular'>, string>>;
export type Density = ValueOf<typeof DENSITY>;
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
  /** Components behave as on this platform: sheets or dropdowns, insets, dragging, keyboard. For previewing iOS or Android in a browser. Default: `Platform.OS` */
  platform?: PlatformOS;
  /** The look components follow. 'brand' is Patine's own look on every platform; 'native' matches the platform: 'ios' on iOS, 'web' on the web, 'material' elsewhere. Default: 'brand' */
  design?: DesignPreference;
  /** The words components show and say by default, for translation: `{ close: 'Fermer', pagination: { next: 'Suivant' } }`. A component's own label props still win. Default: English */
  labels?: DeepPartial<Labels>;
  /** Which way text runs: arrows, swipes, sliders and chevrons follow it. Default: the app's, `I18nManager.isRTL` on iOS and Android and the page's `dir` on the web */
  dir?: LayoutDirection;
}

/** Which way text runs. */
export type LayoutDirection = 'ltr' | 'rtl';

/** Eight chart series colours, in order. */
export type ChartPalette = readonly [string, string, string, string, string, string, string, string];
