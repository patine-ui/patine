import { useAnimatedTo, useReducedMotion, useSweep } from '@/core/animation';
import type { AnimatedInterpolation } from '@/core/animation/animation.types';
import { INDETERMINATE_SHARE, PROGRESS_FILL_MS } from '@/feedback/progress/progress.constants';
import { getProgressRatio } from '@/feedback/progress/progress.utils';

/** The fill's animated width, or the sweeping segment's position while the amount is unknown. */
export const useProgress = (value: number | null | undefined, max: number) => {
  const ratio = getProgressRatio(value, max);
  const indeterminate = ratio === null;
  const fill = useAnimatedTo(ratio ?? 0, { duration: PROGRESS_FILL_MS, native: false });
  const sweep = useSweep(indeterminate);
  const reduced = useReducedMotion();
  return {
    ratio,
    indeterminate,
    width: fill.interpolate({ inputRange: [0, 1], outputRange: ['0%', '100%'] }) as AnimatedInterpolation<string>,
    // Reduced motion holds a still, full-width segment instead of one parked off the end.
    segment: reduced
      ? { left: '0%' as const, width: '100%' as const, opacity: 0.5 }
      : {
          left: sweep.interpolate({
            inputRange: [0, 1],
            outputRange: [`${-INDETERMINATE_SHARE * 100}%`, '100%'],
          }) as AnimatedInterpolation<string>,
          width: `${INDETERMINATE_SHARE * 100}%` as const,
        },
  };
};
