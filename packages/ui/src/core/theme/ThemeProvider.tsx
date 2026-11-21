import { createContext, type ReactNode, useContext, useMemo, useSyncExternalStore } from 'react';
import { Appearance, Platform, useColorScheme, type ViewProps } from 'react-native';

import { IS_WEB } from '@/core/core.constants';
import type { DeepPartial } from '@/core/core.types';
import { View } from '@/core/primitives/View';
import { DEFAULT_LABELS } from './labels.constants';
import type { Labels } from './labels.types';
import { COLOR_SCHEME, DESIGN, DESIGN_TOKENS, darkTheme, lightTheme } from './theme.constants';
import { styles } from './theme.styles';
import type { Design, DesignPreference, LayoutDirection, PatineProviderProps, PlatformOS, Theme } from './theme.types';
import { getSystemDirection, mergeTheme, resolveDesign } from './theme.utils';

interface ThemeContextValue {
  platform?: PlatformOS;
  /** The theme every `useTheme()` without an override gets: the same object for all of them */
  resolved: Theme;
  /** The resolved theme in another design, cached, for a component's `design` override */
  baseFor: (design: Design) => Theme;
  /** The default words, with the provider's translations on top */
  labels: Labels;
  /** Which way text runs */
  dir: LayoutDirection;
}

const ThemeContext = createContext<ThemeContextValue | null>(null);

/** The design tokens on the light or dark theme, then the provider's overrides, cached per design. */
const themeCache = (isDark: boolean, provided: DeepPartial<Theme> | undefined) => {
  const cache = new Map<Design, Theme>();
  return (design: Design) => {
    let theme = cache.get(design);
    if (!theme) {
      theme = mergeTheme(mergeTheme(isDark ? darkTheme : lightTheme, DESIGN_TOKENS[design]), provided);
      cache.set(design, theme);
    }
    return theme;
  };
};

// Without a provider every component shares these, so a theme-keyed style cache hits.
const BARE = { light: themeCache(false, undefined), dark: themeCache(true, undefined) };

export const PatineProvider = ({
  children,
  colorScheme = COLOR_SCHEME.auto,
  theme,
  darkTheme: dark,
  platform,
  design = DESIGN.brand,
  labels,
  dir,
}: PatineProviderProps) => {
  const system = useColorScheme();
  const os = platform ?? Platform.OS;
  const isDark = colorScheme === COLOR_SCHEME.auto ? system === COLOR_SCHEME.dark : colorScheme === COLOR_SCHEME.dark;
  const provided = isDark ? (dark ?? theme) : theme;
  const words = useMemo(() => mergeTheme(DEFAULT_LABELS, labels), [labels]);
  const value = useMemo<ThemeContextValue>(() => {
    const baseFor = themeCache(isDark, provided);
    return {
      platform,
      resolved: baseFor(provided?.design ?? resolveDesign(design, os)),
      baseFor,
      labels: words,
      dir: dir ?? getSystemDirection(),
    };
  }, [isDark, provided, platform, os, design, words, dir]);
  return (
    <ThemeContext.Provider value={value}>
      {IS_WEB ? (
        // React Native Web turns start / end styles (marginStart, paddingEnd, `start`) into left / right by the direction a
        // view's `dir` hands down, not the page's: without this, a right-to-left page keeps left-to-right spacing. `dir` is
        // a React Native Web prop, missing from React Native's types.
        <View {...({ dir: value.dir } as ViewProps)} style={styles.contents}>
          {children}
        </View>
      ) : (
        children
      )}
    </ThemeContext.Provider>
  );
};

/** The default words components show and say: English, or the provider's `labels` on top. */
export const useLabels = (): Labels => useContext(ThemeContext)?.labels ?? DEFAULT_LABELS;

/** Which way text runs: the provider's `dir`, or the app's own (see `getSystemDirection`). */
export const useDirection = (): LayoutDirection => useContext(ThemeContext)?.dir ?? getSystemDirection();

/** The platform pickers behave as on: the provider's `platform`, or the one they run on. */
export const usePlatform = (): PlatformOS => useContext(ThemeContext)?.platform ?? Platform.OS;

/** A theme override without its `design`, or undefined when that's all it held. */
const withoutDesign = (override: DeepPartial<Theme> | undefined) => {
  if (!override) return undefined;
  const { design: _design, ...rest } = override;
  return Object.keys(rest).length ? rest : undefined;
};

const subscribeScheme = (onChange: () => void) => {
  const subscription = Appearance.addChangeListener(onChange);
  return () => subscription.remove();
};
const subscribeNone = () => () => undefined;
const systemScheme = () => Appearance.getColorScheme();
const noScheme = () => null;

/**
 * The context's themes, or without a provider the bare ones for the system's light or dark. Only a component outside every
 * provider listens to the system scheme: one listener per mounted component cost a long list ~80ms per re-render on the web.
 */
const useBaseFor = (ctx: ThemeContextValue | null) => {
  // The server has no system scheme: it renders light, and the client corrects it.
  const system = useSyncExternalStore(ctx ? subscribeNone : subscribeScheme, ctx ? noScheme : systemScheme, noScheme);
  return ctx?.baseFor ?? (system === COLOR_SCHEME.dark ? BARE.dark : BARE.light);
};

/**
 * Resolves the active theme: the design's tokens on the light or dark theme, then the provider's overrides, then the component's.
 * The design comes from the component override, the provider, or the platform. Every call without an override (or with only a
 * `design`) returns the same object, so `createStyles` builds each sheet once.
 */
export const useTheme = (override?: DeepPartial<Theme>): Theme => {
  const ctx = useContext(ThemeContext);
  const baseFor = useBaseFor(ctx);
  const resolved = ctx?.resolved ?? baseFor(DESIGN.brand);
  const base = override?.design && override.design !== resolved.design ? baseFor(override.design) : resolved;
  const rest = useMemo(() => withoutDesign(override), [override]);
  // A part handed its parent's resolved theme gets that same object back.
  return useMemo(() => (rest && override !== base ? mergeTheme(base, rest) : base), [base, rest, override]);
};

/**
 * Hands a component's theme override down to everything inside it, the way PatineProvider does: its parts and the app's
 * children then draw the same design and tokens without a `theme` prop. Renders no provider when there's nothing to change.
 */
export const ThemeScope = ({ theme: override, children }: { theme?: DeepPartial<Theme>; children: ReactNode }) => {
  const ctx = useContext(ThemeContext);
  const resolved = useTheme(override);
  const parentBaseFor = useBaseFor(ctx);
  const rest = useMemo(() => withoutDesign(override), [override]);
  const value = useMemo<ThemeContextValue>(() => {
    const cache = new Map<Design, Theme>();
    return {
      platform: ctx?.platform,
      labels: ctx?.labels ?? DEFAULT_LABELS,
      dir: ctx?.dir ?? getSystemDirection(),
      resolved,
      baseFor: (design: Design) => {
        if (design === resolved.design) return resolved;
        let theme = cache.get(design);
        if (!theme) {
          theme = mergeTheme(parentBaseFor(design), rest);
          cache.set(design, theme);
        }
        return theme;
      },
    };
  }, [ctx?.platform, ctx?.labels, ctx?.dir, resolved, parentBaseFor, rest]);
  if (!override || resolved === (ctx?.resolved ?? parentBaseFor(DESIGN.brand))) return children;
  return (
    <ThemeContext.Provider value={value}>
      {IS_WEB ? (
        // React Native Web turns start / end styles (marginStart, paddingEnd, `start`) into left / right by the direction a
        // view's `dir` hands down, not the page's: without this, a right-to-left page keeps left-to-right spacing. `dir` is
        // a React Native Web prop, missing from React Native's types.
        <View {...({ dir: value.dir } as ViewProps)} style={styles.contents}>
          {children}
        </View>
      ) : (
        children
      )}
    </ThemeContext.Provider>
  );
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
