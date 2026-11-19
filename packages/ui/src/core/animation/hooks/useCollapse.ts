import { useEffect, useState } from 'react';
import type { Animated, LayoutChangeEvent } from 'react-native';

import { afterPaint, timing } from '@/core/animation/animation.utils';
import { useAnimatedValue } from './useAnimatedValue';

/**
 * Animates content's height open and shut. It stays mounted until it finishes closing, and starts where `open` already is,
 * so an item open at first doesn't animate. With the OS set to reduce motion it opens and closes at once.
 */
export const useCollapse = (
  open: boolean,
  duration: number
): {
  mounted: boolean;
  height: Animated.AnimatedInterpolation<number>;
  /** The animated height as a style, for the clipping view */
  style: { height: Animated.AnimatedInterpolation<number> };
  onContentLayout: (e: LayoutChangeEvent) => void;
} => {
  const progress = useAnimatedValue(open ? 1 : 0);
  const [mounted, setMounted] = useState(open);
  const [height, setHeight] = useState(0);

  const measured = height > 0;

  // biome-ignore lint/correctness/useExhaustiveDependencies: runs as it opens, mounts and is measured; the animated value never changes
  useEffect(() => {
    if (open && !mounted) {
      setMounted(true);
      return;
    }
    if (!open) {
      // Height can't run on the native driver.
      if (mounted)
        timing(progress, 0, { duration, native: false }).start(({ finished }) => {
          if (finished) setMounted(false);
        });
      return;
    }
    // Opening waits for the content's height and for the frame that mounted it to paint; started earlier, the first frames
    // run with nothing to grow to, or are lost to that frame, and it jumps.
    if (measured) return afterPaint(() => timing(progress, 1, { duration, native: false }).start());
  }, [open, mounted, measured]);

  const animated = progress.interpolate<number>({
    inputRange: [0, 1],
    outputRange: [0, height],
  });
  return {
    mounted,
    height: animated,
    style: { height: animated },
    onContentLayout: (e: LayoutChangeEvent) => setHeight(e.nativeEvent.layout.height),
  };
};
