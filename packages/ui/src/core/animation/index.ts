// Every animation in the library goes through here: components ask for one by name and never build their own.
// Biome blocks Animated.timing / spring / loop / sequence / parallel outside this folder.
export {
  BLINK_MS,
  DURATION,
  EASE_IN,
  EASE_OUT,
  EASE_STANDARD,
  PULSE,
  RELEASE_SPRING,
  SWEEP_MS,
  USE_NATIVE_DRIVER,
} from './animation.constants';
export type {
  AnimateToOptions,
  Presence,
  PresenceOptions,
  PulseOptions,
  SpringOptions,
  TimingOptions,
} from './animation.types';
export { blinkLoop, cycleLoop, hoverTransition, pulseLoop, spring, sweepLoop, timing } from './animation.utils';
export { useAnimatedTo } from './hooks/useAnimatedTo';
export { useAnimatedToggle } from './hooks/useAnimatedToggle';
export { useAnimatedValue } from './hooks/useAnimatedValue';
export { useBlink } from './hooks/useBlink';
export { useCollapse } from './hooks/useCollapse';
export { useCycle } from './hooks/useCycle';
export { useHoverTransition } from './hooks/useHoverTransition';
export { usePop } from './hooks/usePop';
export { usePresence } from './hooks/usePresence';
export { usePulse } from './hooks/usePulse';
export { useReducedMotion } from './hooks/useReducedMotion';
export { useScrollPosition } from './hooks/useScrollPosition';
export { useSlideIn } from './hooks/useSlideIn';
export { useSweep } from './hooks/useSweep';
export { isReducedMotion } from './motion.utils';
