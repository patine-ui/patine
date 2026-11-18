import type { PlatformOSType, TextStyle } from 'react-native';

import { PLATFORM } from '@/core/core.constants';
import type { DeepPartial } from '@/core/core.types';
import { DESIGN, darkTheme, lightTheme, SHADOW_LEVELS } from './theme.constants';
import type { Design, DesignPreference, ShadowLevel, TextSize, TextWeight, Theme } from './theme.types';

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
  return SHADOW_LEVELS[Math.min(Math.max(at, 0), SHADOW_LEVELS.length - 1)] ?? level;
};
