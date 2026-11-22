import { getRippleBox, getRippleOrigin, scaleGesture, shapeOf, toLayoutScale, touchSize } from './touch.utils';

describe('getRippleOrigin', () => {
  it('reaches the farthest corner from the touch point', () => {
    expect(getRippleOrigin(0, 0, 30, 40)).toEqual({ x: 0, y: 0, radius: 50 });
    expect(getRippleOrigin(30, 40, 30, 40).radius).toBe(50);
  });

  it('is half the diagonal from the centre', () => {
    expect(getRippleOrigin(15, 20, 30, 40).radius).toBe(25);
  });
});

describe('touchSize', () => {
  it('reads a numeric width and height, or their minimums', () => {
    expect(touchSize({ width: 32, height: 28 })).toEqual([32, 28]);
    expect(touchSize({ minWidth: 40, minHeight: 36 })).toEqual([40, 36]);
  });

  it('leaves out sizes that are not numbers', () => {
    expect(touchSize({ width: '100%' })).toEqual([undefined, undefined]);
    expect(touchSize(undefined)).toEqual([undefined, undefined]);
  });
});

describe('getRippleBox', () => {
  it('centres the circle on the touch point', () => {
    expect(getRippleBox({ x: 10, y: 20, radius: 5 })).toEqual({ left: 5, top: 15, width: 10, height: 10, borderRadius: 5 });
  });
});

describe('toLayoutScale', () => {
  const element = (offsetWidth: number, shown: number) => ({
    offsetWidth,
    getBoundingClientRect: () => ({ width: shown }),
  });

  it('converts screen pixels to layout pixels in a zoomed-out region', () => {
    expect(toLayoutScale(element(200, 100))).toBe(2);
    expect(toLayoutScale(element(200, 200))).toBe(1);
  });

  it('is 1 on native, and for a hidden or unmeasured element', () => {
    expect(toLayoutScale(42)).toBe(1);
    expect(toLayoutScale(undefined)).toBe(1);
    expect(toLayoutScale(element(0, 0))).toBe(1);
  });
});

describe('shapeOf', () => {
  it('reaches out under a border to the frame', () => {
    expect(shapeOf({ borderRadius: 8, borderWidth: 1 })).toEqual({ borderRadius: 8, top: -1, right: -1, bottom: -1, left: -1 });
  });

  it('keeps each corner, so a joined button stays square where it meets the next', () => {
    expect(shapeOf({ borderRadius: 8, borderTopEndRadius: 0, borderBottomEndRadius: 0 })).toEqual({
      borderRadius: 8,
      borderTopEndRadius: 0,
      borderBottomEndRadius: 0,
    });
  });

  it('fills the box when there is no border', () => {
    expect(shapeOf({ borderRadius: 8 })).toEqual({ borderRadius: 8 });
    expect(shapeOf(undefined)).toEqual({});
  });
});

describe('scaleGesture', () => {
  const g = {
    stateID: 1,
    moveX: 5,
    moveY: 6,
    x0: 0,
    y0: 0,
    dx: 10,
    dy: -20,
    vx: 0.5,
    vy: -1,
    numberActiveTouches: 1,
    _accountsForMovesUpTo: 0,
  };

  it('scales distance and speed into layout pixels', () => {
    expect(scaleGesture(g, 2)).toMatchObject({ dx: 20, dy: -40, vx: 1, vy: -2, moveX: 5 });
  });

  it('returns the same gesture at scale 1', () => {
    expect(scaleGesture(g, 1)).toBe(g);
  });
});
