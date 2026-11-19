import { useCallback, useMemo } from 'react';
import type { Animated } from 'react-native';

import { EASE_OUT } from '@/core/animation/animation.constants';
import { timing } from '@/core/animation/animation.utils';
import { SLIDE_DISTANCE } from '@/core/core.constants';
import type { SlideStyle } from '@/core/core.types';
import { useDirection } from '@/core/theme/ThemeProvider';
import { useAnimatedValue } from './useAnimatedValue';

/** A page that fades and slides in from the side it came from: `from(1)` for the next page, `from(-1)` for the previous one. */
export const useSlideIn = (animationDuration: number) => {
  const rtl = useDirection() === 'rtl';
  const slide: Animated.Value = useAnimatedValue(0);

  const from = useCallback(
    (delta: number) => {
      slide.setValue(delta * (rtl ? -1 : 1));
      timing(slide, 0, { duration: animationDuration, easing: EASE_OUT }).start();
    },
    [animationDuration, slide, rtl]
  );

  const style = useMemo<SlideStyle>(
    () => ({
      opacity: slide.interpolate({ inputRange: [-1, 0, 1], outputRange: [0, 1, 0] }),
      transform: [{ translateX: slide.interpolate({ inputRange: [-1, 0, 1], outputRange: [-SLIDE_DISTANCE, 0, SLIDE_DISTANCE] }) }],
    }),
    [slide]
  );

  return {
    style,
    from,
  };
};
