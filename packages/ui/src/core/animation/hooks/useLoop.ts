import { useEffect } from 'react';
import type { Animated } from 'react-native';

import { isReducedMotion } from '@/core/animation/motion.utils';
import { useAnimatedValue } from './useAnimatedValue';
import { useReducedMotion } from './useReducedMotion';

/**
 * Runs a looping animation on a value that rests at 1: while `active`, restarted whenever `restartKey` changes, and
 * held still at 1 when inactive or when the OS asks to reduce motion. The loops themselves live in animation.utils.
 */
export const useLoop = (
  build: (value: Animated.Value) => Animated.CompositeAnimation,
  active: boolean,
  restartKey?: unknown
): Animated.Value => {
  const value = useAnimatedValue(1);
  const reduced = useReducedMotion();

  // biome-ignore lint/correctness/useExhaustiveDependencies: `build` is a new function each render; the loop restarts only on the inputs that change what it does.
  useEffect(() => {
    value.setValue(1);
    // Also asked now: the setting can arrive between this render and its effect, and a loop built then has zero-length
    // steps, which Animated.loop restarts synchronously until the stack overflows.
    if (!active || reduced || isReducedMotion()) return;
    const loop = build(value);
    loop.start();
    return () => loop.stop();
  }, [active, reduced, restartKey, value]);

  return value;
};
