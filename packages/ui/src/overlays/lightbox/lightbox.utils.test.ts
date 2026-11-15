import {
  clampPan,
  clampScale,
  dismissOpacity,
  doubleTapZoom,
  maxPan,
  shouldDismiss,
  touchCenter,
  touchDistance,
  zoomAround,
} from './lightbox.utils';

const size = { width: 400, height: 800 };

describe('lightbox utils', () => {
  it('holds the scale between 1 and the maximum', () => {
    expect(clampScale(0.5)).toBe(1);
    expect(clampScale(2)).toBe(2);
    expect(clampScale(10)).toBe(4);
  });

  it('keeps a zoomed image covering the frame', () => {
    expect(maxPan(1, 400)).toBe(0);
    expect(maxPan(2, 400)).toBe(200);
    expect(clampPan({ scale: 2, x: 500, y: -900 }, size)).toEqual({ scale: 2, x: 200, y: -400 });
  });

  it('zooms around the focal point', () => {
    // Zooming 2× on a point 100pt right of centre moves the image 100pt left, so that point stays put.
    expect(zoomAround({ scale: 1, x: 0, y: 0 }, 2, { x: 100, y: 0 }, size)).toEqual({ scale: 2, x: -100, y: 0 });
    expect(zoomAround({ scale: 2, x: -100, y: 0 }, 1, { x: 0, y: 0 }, size)).toEqual({ scale: 1, x: 0, y: 0 });
  });

  it('double tap zooms in at the tap and back out', () => {
    expect(doubleTapZoom({ scale: 1, x: 0, y: 0 }, { x: 200, y: 400 }, size)).toEqual({ scale: 2.5, x: 0, y: 0 });
    expect(doubleTapZoom({ scale: 1, x: 0, y: 0 }, { x: 300, y: 400 }, size).x).toBe(-150);
    expect(doubleTapZoom({ scale: 3, x: 50, y: 20 }, { x: 0, y: 0 }, size)).toEqual({ scale: 1, x: 0, y: 0 });
  });

  it('measures two touches', () => {
    expect(touchDistance({ x: 0, y: 0 }, { x: 3, y: 4 })).toBe(5);
    expect(touchCenter({ x: 0, y: 0 }, { x: 10, y: 20 })).toEqual({ x: 5, y: 10 });
  });

  it('closes on a long or fast drag down, and fades the backdrop with it', () => {
    expect(shouldDismiss(130, 0)).toBe(true);
    expect(shouldDismiss(40, 1.5)).toBe(true);
    expect(shouldDismiss(40, 0.2)).toBe(false);
    expect(shouldDismiss(-200, 2)).toBe(false);
    expect(dismissOpacity(0)).toBe(1);
    expect(dismissOpacity(200)).toBe(0.5);
    expect(dismissOpacity(1000)).toBe(0);
  });
});
