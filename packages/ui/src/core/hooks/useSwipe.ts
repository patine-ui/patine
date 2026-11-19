import type { GestureResponderHandlers } from 'react-native';

import { useDirection } from '@/core/theme/ThemeProvider';
import { getSwipeDelta } from '@/core/utils/swipe.utils';
import { useDrag } from './useDrag';

/** Swipe left for `go(1)` and right for `go(-1)`, mirrored in RTL. */
export const useSwipe = (go: (delta: number) => void): GestureResponderHandlers => {
  const rtl = useDirection() === 'rtl';
  return useDrag({
    onEnd: ({ dx, vx }) => {
      const delta = getSwipeDelta(dx, vx, rtl);
      if (delta) go(delta);
    },
  });
};
