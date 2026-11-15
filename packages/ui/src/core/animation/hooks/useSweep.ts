import { SWEEP_MS } from '@/core/animation/animation.constants';
import type { AnimatedValue } from '@/core/animation/animation.types';
import { sweepLoop } from '@/core/animation/animation.utils';
import { useLoop } from './useLoop';

/** A value sweeping 0 → 1 over and over while `active`, for indeterminate progress. Rests at 1 when reducing motion. */
export const useSweep = (active = true, period = SWEEP_MS): AnimatedValue => useLoop((value) => sweepLoop(value, period), active, period);
