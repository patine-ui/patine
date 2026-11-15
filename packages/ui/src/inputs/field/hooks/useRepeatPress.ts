import { useCallback, useEffect, useRef } from 'react';

import { REPEAT_DELAY, REPEAT_INTERVAL } from '@/inputs/field/field.constants';

/**
 * Steps once on a tap (or Enter and Space), and again and again while held, as UIStepper does. Spread on a Pressable.
 * Holding starts after `delayLongPress`, so a tap never steps twice.
 */
export const useRepeatPress = (onStep: () => void, disabled: boolean) => {
  const latest = useRef(onStep);
  latest.current = onStep;
  const timer = useRef<ReturnType<typeof setInterval> | null>(null);
  const stop = useCallback(() => {
    if (timer.current) clearInterval(timer.current);
    timer.current = null;
  }, []);
  useEffect(() => stop, [stop]);
  useEffect(() => {
    if (disabled) stop();
  }, [disabled, stop]);
  return {
    delayLongPress: REPEAT_DELAY,
    onPress: () => {
      if (!disabled) latest.current();
    },
    onLongPress: () => {
      if (disabled) return;
      latest.current();
      stop();
      timer.current = setInterval(() => latest.current(), REPEAT_INTERVAL);
    },
    onPressOut: stop,
  };
};
