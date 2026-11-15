import { clampOffset, isFullSwipe, openOffset, releaseSwipe } from './swipeable.utils';

const b = { leading: 80, trailing: 160, width: 400, full: false, resistance: 0.5 };

describe('swipeable utils', () => {
  it('follows freely up to the actions, then resists, and stays put with none on that side', () => {
    expect(clampOffset(-100, b)).toBe(-100);
    expect(clampOffset(-200, b)).toBe(-180);
    expect(clampOffset(120, b)).toBe(100);
    expect(clampOffset(50, { ...b, leading: 0 })).toBe(0);
    expect(clampOffset(-300, { ...b, full: true })).toBe(-300);
  });

  it('runs the edge action only on a long swipe with fullSwipe', () => {
    expect(isFullSwipe(-250, b)).toBe(false);
    expect(isFullSwipe(-250, { ...b, full: true })).toBe(true);
    expect(isFullSwipe(-200, { ...b, full: true })).toBe(false);
    expect(isFullSwipe(250, { ...b, full: true, leading: 0 })).toBe(false);
    expect(releaseSwipe(-300, 0, { ...b, full: true })).toEqual({ kind: 'full', side: 'trailing' });
  });

  it('opens past half the actions or on a flick, and closes otherwise', () => {
    expect(releaseSwipe(-90, 0, b)).toEqual({ kind: 'open', side: 'trailing' });
    expect(releaseSwipe(-30, -0.8, b)).toEqual({ kind: 'open', side: 'trailing' });
    expect(releaseSwipe(-90, 0.8, b)).toEqual({ kind: 'close' });
    expect(releaseSwipe(-30, 0, b)).toEqual({ kind: 'close' });
    expect(releaseSwipe(50, 0, b)).toEqual({ kind: 'open', side: 'leading' });
    expect(releaseSwipe(20, 0, b)).toEqual({ kind: 'close' });
  });

  it('rests each side at its actions', () => {
    expect(openOffset('leading', b)).toBe(80);
    expect(openOffset('trailing', b)).toBe(-160);
    expect(openOffset(null, b)).toBe(0);
  });
});
