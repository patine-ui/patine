import type { ViewStyle } from 'react-native';
import { Animated, Easing } from 'react-native';

import { EASE_STANDARD, USE_NATIVE_DRIVER } from './animation.constants';
import type { SpringOptions, TimingOptions } from './animation.types';
import { isReducedMotion } from './motion.utils';

/**
 * `Animated.timing` with the library's defaults: the standard ease, and the native driver wherever it exists. With the OS set to
 * reduce motion it jumps straight to the end. Call `.start()` on it.
 */
export const timing = (
  value: Animated.Value,
  toValue: number,
  { duration, easing = EASE_STANDARD, delay, native = USE_NATIVE_DRIVER }: TimingOptions
) =>
  Animated.timing(value, {
    toValue,
    duration: isReducedMotion() ? 0 : duration,
    easing,
    delay,
    useNativeDriver: native,
  });

/** `Animated.spring` with the native driver wherever it exists; a jump to the end when reducing motion. Call `.start()` on it. */
export const spring = (
  value: Animated.Value,
  toValue: number,
  { bounciness, speed, delay, native = USE_NATIVE_DRIVER }: SpringOptions = {}
) =>
  isReducedMotion()
    ? timing(value, toValue, { duration: 0, native })
    : Animated.spring(value, {
        toValue,
        bounciness,
        speed,
        delay,
        useNativeDriver: native,
      });

/** Dims `value` to `min` and back, over and over: a loading placeholder breathing. */
export const pulseLoop = (value: Animated.Value, min: number, period: number) =>
  Animated.loop(Animated.sequence([timing(value, min, { duration: period / 2 }), timing(value, 1, { duration: period / 2 })]));

/** Switches `value` off and on every `interval` ms with no fade, as a text caret blinks. */
export const blinkLoop = (value: Animated.Value, interval: number) =>
  Animated.loop(
    Animated.sequence([timing(value, 0, { duration: 0, delay: interval }), timing(value, 1, { duration: 0, delay: interval })])
  );

/** Runs `value` from 0 to 1 over `period` ms, then jumps back and again: an indeterminate progress bar sweeping across. */
export const sweepLoop = (value: Animated.Value, period: number) =>
  Animated.loop(
    Animated.sequence([
      timing(value, 0, { duration: 0, native: false }),
      timing(value, 1, { duration: period, easing: Easing.inOut(Easing.quad), native: false }),
    ])
  );

/** A web-only CSS transition for `box-shadow` and `transform`, or none. React Native Web reads these style props; native ignores them. */
export const hoverTransition = (on: boolean, duration: number): ViewStyle =>
  on
    ? ({
        transitionProperty: 'box-shadow, transform',
        transitionDuration: `${duration}ms`,
        transitionTimingFunction: 'ease-out',
      } as ViewStyle)
    : {};

/**
 * Runs `callback` once the next frame has been painted, and returns a cancel. A freshly mounted overlay's first frame is
 * its slowest (the whole tree lays out), and an animation started before it would lose its opening frames to it.
 */
export const afterPaint = (callback: () => void) => {
  let frame = requestAnimationFrame(() => {
    frame = requestAnimationFrame(callback);
  });
  return () => cancelAnimationFrame(frame);
};

/** Runs `value` from 0 to 1 at an even pace over `period` ms, over and over: a marquee scrolling, a border's light going round. */
export const cycleLoop = (value: Animated.Value, period: number) =>
  Animated.loop(Animated.sequence([timing(value, 0, { duration: 0 }), timing(value, 1, { duration: period, easing: Easing.linear })]));
