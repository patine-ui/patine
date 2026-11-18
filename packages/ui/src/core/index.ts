// Pro animates with the library's own motion, which respects reduce motion.
export {
  DURATION,
  EASE_OUT,
  spring,
  timing,
  useAnimatedTo,
  useAnimatedToggle,
  useAnimatedValue,
  useBlink,
  useCollapse,
  usePop,
  usePresence,
  usePulse,
  useReducedMotion,
  useSlideIn,
} from './animation';
export type { PortalHostProps, PortalProps } from './components/Portal';
export { Portal, PortalHost } from './components/Portal';
export type { SlotProps } from './components/Slot';
export { Slot } from './components/Slot';
export type { VisuallyHiddenProps } from './components/VisuallyHidden';
export { VisuallyHidden } from './components/VisuallyHidden';
export type { DeepPartial, Locale, OpenStateProps, SlotStyles, ThemableProps, TriggeredOpenProps } from './core.types';
export { useControllableState } from './hooks/useControllableState';
export { PatineProvider, useComponentTheme, useDesignOverride, usePlatform, useTheme } from './theme/ThemeProvider';
export { DESIGN, DESIGN_SHADOWS, DESIGN_TOKENS, darkTheme, lightTheme, SHADOW_LEVEL } from './theme/theme.constants';
export type { Design, DesignPreference, PatineProviderProps, PlatformOS, ShadowLevel, Theme } from './theme/theme.types';
export { createTheme, mergeTheme, resolveDesign, stepShadow, textStyle } from './theme/theme.utils';
export * from './utils/date.utils';
