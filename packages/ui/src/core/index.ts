// Pro animates with the library's own motion, which respects reduce motion.

export { announce, focusRing } from '@/core/a11y/a11y.utils';
export {
  AnimatedImage,
  AnimatedScrollView,
  AnimatedText,
  AnimatedView,
  animatedAdd,
  animatedEvent,
  animatedMultiply,
  animatedSubtract,
  createAnimatedComponent,
  createAnimatedValue,
} from '@/core/animation/animated';
export { Input } from '@/core/primitives/Input';
export type { PortalHostProps, PortalProps } from '@/core/primitives/Portal';
export { Portal, PortalHost } from '@/core/primitives/Portal';
export type { InputProps, ScrollProps, VirtualListProps } from '@/core/primitives/primitives.types';
export { Scroll } from '@/core/primitives/Scroll';
export type { SlotProps } from '@/core/primitives/Slot';
export { Slot } from '@/core/primitives/Slot';
export { Span } from '@/core/primitives/Span';
export { Pressable } from '@/core/primitives/View';
export { VirtualList } from '@/core/primitives/VirtualList';
export type { VisuallyHiddenProps } from '@/core/primitives/VisuallyHidden';
export { VisuallyHidden } from '@/core/primitives/VisuallyHidden';
export { useFocusVisible } from './a11y/hooks/useFocusVisible';
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
export { IS_WEB } from './core.constants';
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
export { ContentColor, useContentColor } from './theme/ContentColor';
export { DEFAULT_LABELS } from './theme/labels.constants';
export type {
  ActivityLabels,
  DataTableLabels,
  Labels,
  QueryStateLabels,
  ShellLabels,
  UploadLabels,
  WizardLabels,
} from './theme/labels.types';
export {
  PatineProvider,
  ThemeScope,
  useComponentTheme,
  useDesignOverride,
  useDirection,
  useLabels,
  usePlatform,
  useTheme,
} from './theme/ThemeProvider';
export {
  DENSITY,
  DESIGN,
  DESIGN_SHADOWS,
  DESIGN_TOKENS,
  darkTheme,
  FONT_ROLE,
  lightTheme,
  SHADOW_LEVEL,
  TABULAR,
  TEXT_SIZE,
  TEXT_WEIGHT,
} from './theme/theme.constants';
export type {
  ChartPalette,
  Density,
  Design,
  DesignPreference,
  FontFaces,
  FontRole,
  LayoutDirection,
  PatineProviderProps,
  PlatformOS,
  ShadowLevel,
  TextSize,
  TextWeight,
  Theme,
} from './theme/theme.types';
export { createStyles, createTheme, fontFace, mergeTheme, resolveDesign, stepShadow, textStyle } from './theme/theme.utils';
export * from './utils/date.utils';
export { getAnchorProps, openHref } from './utils/href.utils';
