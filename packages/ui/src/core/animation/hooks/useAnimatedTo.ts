import { useLayoutEffect } from 'react';

import type { AnimatedValue, AnimateToOptions } from '@/core/animation/animation.types';
import { timing } from '@/core/animation/animation.utils';
import { useAnimatedValue } from './useAnimatedValue';

/** A value that starts at `target` and animates to each new `target` it's given, or jumps there with `instant`. */
export const useAnimatedTo = (target: number, { duration, native, instant = false }: AnimateToOptions): AnimatedValue => {
  const value = useAnimatedValue(target);
  // Before paint, so a jump never shows a frame at the old value.
  useLayoutEffect(() => {
    if (instant) value.setValue(target);
    else timing(value, target, { duration, native }).start();
  }, [duration, native, instant, target, value]);
  return value;
};
