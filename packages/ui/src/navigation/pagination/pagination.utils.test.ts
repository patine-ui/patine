import { clampPage, getPageItems } from './pagination.utils';

describe('getPageItems', () => {
  it('shows every page when they fit', () => {
    expect(getPageItems(1, 5)).toEqual([1, 2, 3, 4, 5]);
    expect(getPageItems(3, 7)).toEqual([1, 2, 3, 4, 5, 6, 7]);
    expect(getPageItems(1, 1)).toEqual([1]);
  });

  it('puts an ellipsis in each gap and keeps the count steady', () => {
    expect(getPageItems(1, 10)).toEqual([1, 2, 3, 4, 5, 'end-ellipsis', 10]);
    expect(getPageItems(5, 10)).toEqual([1, 'start-ellipsis', 4, 5, 6, 'end-ellipsis', 10]);
    expect(getPageItems(10, 10)).toEqual([1, 'start-ellipsis', 6, 7, 8, 9, 10]);
  });

  it('widens with more siblings and boundaries', () => {
    expect(getPageItems(10, 20, 2, 2)).toEqual([1, 2, 'start-ellipsis', 8, 9, 10, 11, 12, 'end-ellipsis', 19, 20]);
  });
});

describe('clampPage', () => {
  it('keeps the page in range', () => {
    expect(clampPage(0, 5)).toBe(1);
    expect(clampPage(9, 5)).toBe(5);
    expect(clampPage(3, 0)).toBe(1);
  });
});
