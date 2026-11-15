import type { Animated } from 'react-native';

import { PULSE } from '@/core/animation/animation.constants';
import type { PulseOptions } from '@/core/animation/animation.types';
import { pulseLoop } from '@/core/animation/animation.utils';
import { useLoop } from './useLoop';

/** An opacity that breathes between 1 and `min`, for loading placeholders. Still when reducing motion. */
export const usePulse = ({ active = true, min = PULSE.min, period = PULSE.period }: PulseOptions = {}): Animated.Value =>
  useLoop((value) => pulseLoop(value, min, period), active, `${min}:${period}`);
