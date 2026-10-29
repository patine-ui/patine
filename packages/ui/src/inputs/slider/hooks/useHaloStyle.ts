import { useMemo } from 'react';

import { useAnimatedTo } from '@/core/animation';
import { HALO_LEVEL, HALO_OPACITY, HALO_SCALE } from '@/inputs/slider/slider.constants';
import type { HaloLevel, HaloStyle } from '@/inputs/slider/slider.types';

const LEVELS = Object.values(HALO_LEVEL);

/** The halo's fade and size, animating between none, hover and pressed. */
export const useHaloStyle = (level: HaloLevel, duration: number): HaloStyle => {
  const progress = useAnimatedTo(level, { duration });
  return useMemo<HaloStyle>(
    () => ({
      opacity: progress.interpolate({ inputRange: LEVELS, outputRange: HALO_OPACITY }),
      transform: [{ scale: progress.interpolate({ inputRange: LEVELS, outputRange: HALO_SCALE }) }],
    }),
    [progress]
  );
};
