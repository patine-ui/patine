import { FLICK_VELOCITY, FULL_SWIPE_SHARE, SWIPE_SIDE } from './swipeable.constants';
import type { SwipeRelease } from './swipeable.types';

interface Bounds {
  /** How far the leading actions reach, ≥ 0 */
  leading: number;
  /** How far the trailing actions reach, ≥ 0 */
  trailing: number;
  /** The row's width, for a full swipe */
  width: number;
  full: boolean;
  /** Share of an overshoot that's followed */
  resistance: number;
}

/**
 * Where the row is drawn for a raw offset: free up to the actions, then resisting; pinned at 0 on a side with no actions.
 * A full swipe follows the finger.
 */
export const clampOffset = (raw: number, b: Bounds) => {
  const limit = raw > 0 ? b.leading : b.trailing;
  if (limit === 0) return 0;
  const size = Math.abs(raw);
  if (size <= limit || b.full) return raw;
  return Math.sign(raw) * (limit + (size - limit) * b.resistance);
};

/** Whether an offset is far enough for a full swipe. */
export const isFullSwipe = (offset: number, b: Bounds) =>
  b.full && b.width > 0 && (offset > 0 ? b.leading : b.trailing) > 0 && Math.abs(offset) > b.width * FULL_SWIPE_SHARE;

/** What a released swipe does: run the edge action, open a side, or close. */
export const releaseSwipe = (offset: number, velocity: number, b: Bounds): SwipeRelease => {
  if (isFullSwipe(offset, b))
    return {
      kind: 'full',
      side: offset > 0 ? SWIPE_SIDE.leading : SWIPE_SIDE.trailing,
    };
  if (offset < 0 && b.trailing > 0 && (offset < -b.trailing / 2 || velocity < -FLICK_VELOCITY) && velocity <= FLICK_VELOCITY) {
    return {
      kind: 'open',
      side: SWIPE_SIDE.trailing,
    };
  }
  if (offset > 0 && b.leading > 0 && (offset > b.leading / 2 || velocity > FLICK_VELOCITY) && velocity >= -FLICK_VELOCITY) {
    return {
      kind: 'open',
      side: SWIPE_SIDE.leading,
    };
  }
  return { kind: 'close' };
};

/** The resting offset of a side. */
export const openOffset = (side: string | null, b: Pick<Bounds, 'leading' | 'trailing'>) =>
  side === SWIPE_SIDE.leading ? b.leading : side === SWIPE_SIDE.trailing ? -b.trailing : 0;
