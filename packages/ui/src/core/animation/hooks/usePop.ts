import { useMemo } from 'react';
import type { Animated } from 'react-native';

import { DURATION } from '@/core/animation/animation.constants';
import { useAnimatedToggle } from './useAnimatedToggle';

/** Where a popping mark starts growing from, as a share of its size. */
const POP_FROM = 0.5;

/**
 * A mark that pops in while `on` (a checkbox's fill, a radio's dot): it fades and grows from half size, and shrinks away
 * when turned off. Spread the style on an `Animated.View` that stays mounted. Instant with reduce motion.
 */
export const usePop = (on: boolean) => {
  const progress = useAnimatedToggle(on, DURATION.fast);
  return useMemo(
    (): { opacity: Animated.Value; transform: { scale: Animated.AnimatedInterpolation<number> }[] } => ({
      opacity: progress,
      transform: [{ scale: progress.interpolate({ inputRange: [0, 1], outputRange: [POP_FROM, 1] }) }],
    }),
    [progress]
  );
};
