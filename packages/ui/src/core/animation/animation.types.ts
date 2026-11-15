import type { Animated } from 'react-native';

// React Native 0.88's types can't be named from outside the package, so a hook returning `Animated.Value` couldn't
// emit its declaration. These are the same types under names of our own.
export interface AnimatedValue extends Animated.Value {}
export interface AnimatedInterpolation<T extends string | number = number> extends Animated.AnimatedInterpolation<T> {}

export interface TimingOptions {
  duration: number;
  /** Default: `EASE_STANDARD`. `EASE_OUT` for what arrives or is let go by a finger, `EASE_IN` for what leaves. */
  easing?: (value: number) => number;
  delay?: number;
  /** Default: `USE_NATIVE_DRIVER`. Pass `false` for layout props such as `height`. */
  native?: boolean;
}

export interface SpringOptions {
  bounciness?: number;
  speed?: number;
  delay?: number;
  /** Default: `USE_NATIVE_DRIVER` */
  native?: boolean;
}

export interface PresenceOptions {
  visible: boolean;
  /** Exit duration, and the entry duration unless `enterDuration` is set. */
  duration: number;
  enterDuration?: number;
  /** Default: the native driver wherever it exists. Off for layout props such as `height`, which it can't animate. */
  native?: boolean;
  onShown?: () => void;
  onHidden?: () => void;
}

export interface Presence {
  /** Stays true until the exit animation finishes, so the content can animate out before it unmounts. */
  mounted: boolean;
  /** 0 hidden → 1 shown. */
  progress: Animated.Value;
}

export interface AnimateToOptions {
  duration: number;
  /** Jump to the target instead of animating, e.g. when a list re-renders in its new order. Default: false */
  instant?: boolean;
  /** Default: `USE_NATIVE_DRIVER`. Pass `false` for layout props such as `height` or `left`. */
  native?: boolean;
}

export interface PulseOptions {
  /** Pulse while true. Default: true */
  active?: boolean;
  /** How far it dims. Default: `PULSE.min` */
  min?: number;
  /** One dim-and-back, in ms. Default: `PULSE.period` */
  period?: number;
}
