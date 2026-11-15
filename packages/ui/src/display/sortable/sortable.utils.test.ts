import { autoScrollSpeed, dropIndex, formatPosition, moveItem, rowSpan, settleOffset, shiftFor } from './sortable.utils';

// Three 50pt rows with 10pt gaps, and a taller last one.
const rows = [
  { y: 0, height: 50 },
  { y: 60, height: 50 },
  { y: 120, height: 50 },
  { y: 180, height: 80 },
];

describe('sortable utils', () => {
  it('moves an item', () => {
    expect(moveItem(['a', 'b', 'c', 'd'], 0, 2)).toEqual(['b', 'c', 'a', 'd']);
    expect(moveItem(['a', 'b', 'c', 'd'], 3, 0)).toEqual(['d', 'a', 'b', 'c']);
    expect(moveItem(['a', 'b'], 1, 1)).toEqual(['a', 'b']);
  });

  it('measures the room a row takes, its gap included', () => {
    expect(rowSpan(rows, 0)).toBe(60);
    expect(rowSpan(rows, 3)).toBe(90);
    expect(rowSpan([{ y: 0, height: 40 }], 0)).toBe(40);
    expect(rowSpan(rows, 9)).toBe(0);
  });

  it('finds where a dragged row lands from its middle', () => {
    expect(dropIndex(rows, 0, 0)).toBe(0);
    expect(dropIndex(rows, 0, 40)).toBe(0);
    expect(dropIndex(rows, 0, 70)).toBe(1);
    expect(dropIndex(rows, 0, 200)).toBe(3);
    expect(dropIndex(rows, 3, -200)).toBe(0);
    expect(dropIndex(rows, 2, -30)).toBe(2);
    expect(dropIndex(rows, 2, -70)).toBe(1);
  });

  it('shifts the rows between the old and new place', () => {
    expect([0, 1, 2, 3].map((i) => shiftFor(i, 0, 2, 60))).toEqual([0, -60, -60, 0]);
    expect([0, 1, 2, 3].map((i) => shiftFor(i, 3, 1, 90))).toEqual([0, 90, 90, 0]);
    expect(shiftFor(1, -1, 2, 60)).toBe(0);
  });

  it('settles the dragged row on its new slot', () => {
    expect(settleOffset(rows, 0, 2)).toBe(120);
    expect(settleOffset(rows, 0, 3)).toBe(210);
    expect(settleOffset(rows, 3, 0)).toBe(-180);
    expect(settleOffset(rows, 1, 1)).toBe(0);
  });

  it('scrolls faster nearer the edges and not in the middle', () => {
    expect(autoScrollSpeed(300, 600, 60, 10)).toBe(0);
    expect(autoScrollSpeed(0, 600, 60, 10)).toBe(-10);
    expect(autoScrollSpeed(30, 600, 60, 10)).toBe(-5);
    expect(autoScrollSpeed(600, 600, 60, 10)).toBe(10);
    expect(autoScrollSpeed(10, 0, 60, 10)).toBe(0);
  });

  it('fills position labels', () => {
    expect(formatPosition('Moved to position {position} of {count}', 2, 5)).toBe('Moved to position 2 of 5');
  });
});
