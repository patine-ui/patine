import {
  copiesFor,
  edgePadding,
  formatSlideLabel,
  indexAtOffset,
  nearestVirtual,
  positionRange,
  recenter,
  resolveItemSize,
  stepIndex,
  toReal,
} from './carousel.utils';

describe('carousel utils', () => {
  it('renders three copies only for a loop of two or more', () => {
    expect(copiesFor(5, true)).toBe(3);
    expect(copiesFor(1, true)).toBe(1);
    expect(copiesFor(5, false)).toBe(1);
  });

  it('resolves item widths and centring padding', () => {
    expect(resolveItemSize(300, 400)).toBe(300);
    expect(resolveItemSize('80%', 400)).toBe(320);
    expect(edgePadding(400, 320, true)).toBe(40);
    expect(edgePadding(400, 320, false)).toBe(0);
    expect(edgePadding(400, 500, true)).toBe(0);
  });

  it('finds the slide at an offset, held to the rendered range', () => {
    expect(indexAtOffset(0, 100, 5)).toBe(0);
    expect(indexAtOffset(149, 100, 5)).toBe(1);
    expect(indexAtOffset(151, 100, 5)).toBe(2);
    expect(indexAtOffset(9999, 100, 5)).toBe(4);
    expect(indexAtOffset(-50, 100, 5)).toBe(0);
    expect(indexAtOffset(300, 0, 5)).toBe(0);
  });

  it('maps rendered slides to real ones', () => {
    expect(toReal(7, 5)).toBe(2);
    expect(toReal(-1, 5)).toBe(4);
    expect(toReal(3, 0)).toBe(0);
  });

  it('picks the nearest copy of a slide in a loop', () => {
    expect(nearestVirtual(2, 0, 5, 1)).toBe(2);
    // From the last slide of the middle copy, slide 0 is the next copy's first, one step on.
    expect(nearestVirtual(0, 9, 5, 3)).toBe(10);
    // From the first, slide 4 is the previous copy's last, one step back.
    expect(nearestVirtual(4, 5, 5, 3)).toBe(4);
    expect(nearestVirtual(2, 6, 5, 3)).toBe(7);
  });

  it('recentres only when a loop drifts into an outer copy', () => {
    expect(recenter(10, 5, 3)).toBe(5);
    expect(recenter(4, 5, 3)).toBe(9);
    expect(recenter(7, 5, 3)).toBeNull();
    expect(recenter(10, 5, 1)).toBeNull();
  });

  it('steps with wrapping in a loop and holds at the ends otherwise', () => {
    expect(stepIndex(4, 1, 5, true)).toBe(0);
    expect(stepIndex(0, -1, 5, true)).toBe(4);
    expect(stepIndex(4, 1, 5, false)).toBe(4);
    expect(stepIndex(0, -1, 5, false)).toBe(0);
  });

  it('fills slide labels', () => {
    expect(formatSlideLabel('Slide {page} of {count}', 2, 5)).toBe('Slide 2 of 5');
  });

  it('maps offsets to the real page for the dots', () => {
    expect(positionRange(3, 1, 100)).toEqual({ inputRange: [0, 100, 200], outputRange: [0, 1, 2] });
    expect(positionRange(2, 3, 50)?.outputRange).toEqual([0, 1, 0, 1, 0, 1]);
    expect(positionRange(1, 1, 100)).toBeNull();
    expect(positionRange(3, 1, 0)).toBeNull();
  });
});
