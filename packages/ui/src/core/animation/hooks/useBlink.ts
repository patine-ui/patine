import type { Animated } from 'react-native';

import { BLINK_MS } from '@/core/animation/animation.constants';
import { blinkLoop } from '@/core/animation/animation.utils';
import { useLoop } from './useLoop';

/**
 * An opacity that blinks on and off while `active`, like a text caret. It shows solid again each time `restartKey`
 * changes (the caret moved), and stays solid when reducing motion.
 */
export const useBlink = (active: boolean, restartKey?: unknown): Animated.Value =>
  useLoop((value) => blinkLoop(value, BLINK_MS), active, restartKey);
