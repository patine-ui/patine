import { getRippleBox, getRippleOrigin, touchSize } from './touch.utils';

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
