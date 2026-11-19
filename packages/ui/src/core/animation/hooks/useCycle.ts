import { useEffect } from 'react';
import { Easing } from 'react-native';

import type { AnimatedValue } from '@/core/animation/animation.types';
import { cycleLoop, timing } from '@/core/animation/animation.utils';
import { isReducedMotion } from '@/core/animation/motion.utils';
import { useAnimatedValue } from './useAnimatedValue';
import { useReducedMotion } from './useReducedMotion';

/**
 * A value going 0 → 1 at an even pace every `period` ms, for good: a marquee, a light circling a border, a shimmer. Turning
 * `active` off stops it where it is, and on again carries on from there, so a marquee paused on hover doesn't jump. Still
 * at 0 when reducing motion.
 */
export const useCycle = (active = true, period = 2000): AnimatedValue => {
  const value = useAnimatedValue(0);
  const reduced = useReducedMotion();

  useEffect(() => {
    // Asked now too, as useLoop does: a zero-length loop would restart synchronously forever.
    if (!active || reduced || isReducedMotion()) return;
    let stopped = false;
    let loop: ReturnType<typeof cycleLoop> | undefined;
    value.stopAnimation((from) => {
      if (stopped) return;
      // Finish the lap it paused in, then loop whole laps.
      timing(value, 1, { duration: period * (1 - from), easing: Easing.linear }).start(({ finished }) => {
        if (!finished || stopped) return;
        loop = cycleLoop(value, period);
        loop.start();
      });
    });
    return () => {
      stopped = true;
      loop?.stop();
      value.stopAnimation();
    };
  }, [active, period, reduced, value]);

  return value;
};
