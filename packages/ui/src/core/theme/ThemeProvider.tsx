import { createContext, useContext, useMemo } from 'react';
import { Platform, useColorScheme } from 'react-native';

import type { DeepPartial } from '@/core/core.types';
import { COLOR_SCHEME, DESIGN, DESIGN_TOKENS, darkTheme, lightTheme } from './theme.constants';
import type { ColorScheme, DesignPreference, PatineProviderProps, PlatformOS, Theme } from './theme.types';
import { mergeTheme, resolveDesign } from './theme.utils';

interface ThemeContextValue {
  theme?: DeepPartial<Theme>;
  darkTheme?: DeepPartial<Theme>;
  colorScheme: ColorScheme;
  platform?: PlatformOS;
  design: DesignPreference;
}

const ThemeContext = createContext<ThemeContextValue | null>(null);

export const PatineProvider = ({
  children,
  colorScheme = COLOR_SCHEME.auto,
  theme,
  darkTheme: dark,
  platform,
  design = DESIGN.brand,
}: PatineProviderProps) => {
  const value = useMemo<ThemeContextValue>(
    () => ({
      theme,
      darkTheme: dark,
      colorScheme,
      platform,
      design,
    }),
    [theme, dark, colorScheme, platform, design]
  );
  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>;
};

/** The platform pickers behave as on: the provider's `platform`, or the one they run on. */
export const usePlatform = (): PlatformOS => useContext(ThemeContext)?.platform ?? Platform.OS;

/**
 * Resolves the active theme: the design's tokens on the light or dark theme, then the provider's overrides, then the component's.
 * The design comes from the component override, the provider, or the platform.
 */
export const useTheme = (override?: DeepPartial<Theme>): Theme => {
  const ctx = useContext(ThemeContext);
  const system = useColorScheme();
  const platform = usePlatform();
  const scheme = ctx?.colorScheme ?? COLOR_SCHEME.auto;
  const isDark = scheme === COLOR_SCHEME.auto ? system === COLOR_SCHEME.dark : scheme === COLOR_SCHEME.dark;
  const provided = isDark ? (ctx?.darkTheme ?? ctx?.theme) : ctx?.theme;
  const design = override?.design ?? provided?.design ?? resolveDesign(ctx?.design ?? DESIGN.brand, platform);
  const base = useMemo(
    () => mergeTheme(mergeTheme(isDark ? darkTheme : lightTheme, DESIGN_TOKENS[design]), provided),
    [isDark, design, provided]
  );
  return useMemo(() => mergeTheme(base, override), [base, override]);
};

/**
 * Folds a component's `design` prop into its `theme` override, so every part it passes the override to draws the same design.
 * 'native' resolves to the platform's design here.
 */
export const useDesignOverride = (theme: DeepPartial<Theme> | undefined, design: DesignPreference | undefined) => {
  const platform = usePlatform();
  const resolved = design ? resolveDesign(design, platform) : undefined;
  return useMemo(() => (resolved ? { ...theme, design: resolved } : theme), [theme, resolved]);
};

/** A component's theme to draw with, and the override with its `design` folded in, for the parts it passes the theme to. */
export const useComponentTheme = (theme: DeepPartial<Theme> | undefined, design: DesignPreference | undefined) => {
  const themeOverride = useDesignOverride(theme, design);
  return {
    theme: useTheme(themeOverride),
    themeOverride,
  };
};
