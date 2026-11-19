import { I18nManager, type ImageStyle, type PlatformOSType, StyleSheet, type TextStyle, type ViewStyle } from 'react-native';

import { IS_WEB, PLATFORM } from '@/core/core.constants';
import type { DeepPartial } from '@/core/core.types';
import { clamp } from '@/core/utils/track.utils';
import { DESIGN, darkTheme, lightTheme, SHADOW_LEVELS } from './theme.constants';
import type { Design, DesignPreference, LayoutDirection, ShadowLevel, TextSize, TextWeight, Theme } from './theme.types';

const isPlainObject = (v: unknown): v is Record<string, unknown> => {
  return typeof v === 'object' && v !== null && !Array.isArray(v);
};

export const mergeTheme = <T>(base: T, override?: DeepPartial<T>): T => {
  if (!override) return base;
  const out: Record<string, unknown> = { ...(base as Record<string, unknown>) };
  for (const key of Object.keys(override)) {
    const o = (override as Record<string, unknown>)[key];
    // `{ shadows: undefined }` keeps the base's, as a partial override should.
    if (o === undefined) continue;
    const b = out[key];
    out[key] = isPlainObject(o) && isPlainObject(b) ? mergeTheme(b, o as DeepPartial<typeof b>) : o;
  }
  return out as T;
};

/** Build a full theme from overrides on top of the light (or dark) base. */
export const createTheme = (overrides: DeepPartial<Theme>, base?: Theme): Theme => {
  return mergeTheme(base ?? (overrides.dark ? darkTheme : lightTheme), overrides);
};

/** Text style helper used across components. */
export const textStyle = (theme: Theme, size: TextSize, weight: TextWeight = 'regular'): TextStyle => {
  return {
    fontSize: theme.typography.sizes[size],
    fontWeight: theme.typography.weights[weight],
    fontFamily: weight === 'regular' ? theme.typography.fontFamily : (theme.typography.fontFamilyMedium ?? theme.typography.fontFamily),
    color: theme.colors.text,
  };
};

/** The design to draw: the one chosen, or for 'native' the one that matches the platform. */
export const resolveDesign = (preference: DesignPreference, platform: PlatformOSType): Design => {
  if (preference !== DESIGN.native) return preference;
  if (platform === PLATFORM.ios) return DESIGN.ios;
  return platform === PLATFORM.web ? DESIGN.web : DESIGN.material;
};

/** The level `steps` up the elevation scale (down when negative), stopping at its ends: a hovered card's lift. */
export const stepShadow = (level: ShadowLevel, steps: number): ShadowLevel => {
  const at = SHADOW_LEVELS.indexOf(level) + steps;
  return SHADOW_LEVELS[clamp(at, 0, SHADOW_LEVELS.length - 1)] ?? level;
};

/**
 * A style sheet built from the theme, once per theme: `const themed = createStyles((t) => ({ row: { gap: t.spacing.sm } }))`,
 * then `themed(theme).row` in render. `useTheme` returns one object per theme, so the sheet is made once and reused.
 */
export const createStyles = <S extends Record<string, ViewStyle | TextStyle | ImageStyle>>(factory: (theme: Theme) => S) => {
  const cache = new WeakMap<Theme, Readonly<S>>();
  return (theme: Theme): Readonly<S> => {
    let sheet = cache.get(theme);
    if (!sheet) {
      sheet = StyleSheet.create(factory(theme));
      cache.set(theme, sheet);
    }
    return sheet;
  };
};

/** The app's own direction: `I18nManager.isRTL` on iOS and Android, the page's `dir` on the web (where React Native Web has no RTL flag). */
export const getSystemDirection = (): LayoutDirection => {
  if (!IS_WEB) return I18nManager.isRTL ? 'rtl' : 'ltr';
  // Reflect.get type-checks with and without the DOM types, so apps with either can compile the source.
  const doc: { documentElement?: { dir?: string }; dir?: string } | undefined = Reflect.get(globalThis, 'document');
  return (doc?.documentElement?.dir || doc?.dir) === 'rtl' ? 'rtl' : 'ltr';
};
