import { useMemo, useRef } from 'react';
import type { NativeScrollEvent, NativeSyntheticEvent } from 'react-native';
import { Animated } from 'react-native';

import { USE_NATIVE_DRIVER } from '@/core/animation/animation.constants';
import { useAnimatedValue } from './useAnimatedValue';

type ScrollEvent = NativeSyntheticEvent<NativeScrollEvent>;

/**
 * A scroll view's offset along one axis as an `Animated.Value`, driven on the native thread where it can be, so what
 * follows the scroll (a pager's dots) moves with the finger. Spread `onScroll` on an `Animated.ScrollView`; `listener`
 * gets every event on the JS side too.
 */
export const useScrollPosition = (horizontal: boolean, listener?: (event: ScrollEvent) => void) => {
  const position = useAnimatedValue(0);
  const latest = useRef(listener);
  latest.current = listener;
  const onScroll = useMemo(
    () =>
      Animated.event<NativeScrollEvent>([{ nativeEvent: { contentOffset: horizontal ? { x: position } : { y: position } } }], {
        useNativeDriver: USE_NATIVE_DRIVER,
        listener: (event) => latest.current?.(event as ScrollEvent),
      }),
    [horizontal, position]
  );
  return {
    position,
    onScroll,
  };
};
