// Pro animates with the library's own motion, which respects reduce motion.

export type { PortalHostProps, PortalProps } from '@/core/primitives/Portal';
export { Portal, PortalHost } from '@/core/primitives/Portal';
export type { SlotProps } from '@/core/primitives/Slot';
export { Slot } from '@/core/primitives/Slot';
export type { VisuallyHiddenProps } from '@/core/primitives/VisuallyHidden';
export { VisuallyHidden } from '@/core/primitives/VisuallyHidden';
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
  useCycle,
  usePop,
  usePresence,
  usePulse,
  useReducedMotion,
  useSlideIn,
} from './animation';
export type {
  DeepPartial,
  Locale,
  OpenStateProps,
  SlotStyles,
  ThemableProps,
  TouchableProps,
  TouchableState,
  TriggeredOpenProps,
} from './core.types';
export { useControllableState } from './hooks/useControllableState';
export { Touchable } from './primitives/Touchable';
export { DEFAULT_LABELS } from './theme/labels.constants';
export type { Labels } from './theme/labels.types';
export {
  PatineProvider,
  useComponentTheme,
  useDesignOverride,
  useDirection,
  useLabels,
  usePlatform,
  useTheme,
} from './theme/ThemeProvider';
export { DESIGN, DESIGN_SHADOWS, DESIGN_TOKENS, darkTheme, lightTheme, SHADOW_LEVEL } from './theme/theme.constants';
export type {
  ChartPalette,
  Design,
  DesignPreference,
  LayoutDirection,
  PatineProviderProps,
  PlatformOS,
  ShadowLevel,
  Theme,
} from './theme/theme.types';
export { createStyles, createTheme, mergeTheme, resolveDesign, stepShadow, textStyle } from './theme/theme.utils';
export * from './utils/date.utils';
