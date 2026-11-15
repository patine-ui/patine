import { findNextItem, firstEnabledValue, indicatorBox, tabIds, touchSlop } from './tabs.utils';

const items = [
  { value: 'a', disabled: false },
  { value: 'b', disabled: true },
  { value: 'c', disabled: false },
];

describe('findNextItem', () => {
  it('skips disabled items and wraps around both ways', () => {
    expect(findNextItem(items, 0, 1)?.value).toBe('c');
    expect(findNextItem(items, 2, 1)?.value).toBe('a');
    expect(findNextItem(items, 0, -1)?.value).toBe('c');
  });

  it('finds the first and last enabled items from outside the list', () => {
    const edges = [{ value: 'x', disabled: true }, ...items, { value: 'y', disabled: true }];
    expect(findNextItem(edges, -1, 1)?.value).toBe('a');
    expect(findNextItem(edges, edges.length, -1)?.value).toBe('c');
  });

  it('finds nothing when every item is disabled', () => {
    expect(findNextItem([{ disabled: true }], 0, 1)).toBeUndefined();
    expect(findNextItem([], -1, 1)).toBeUndefined();
  });
});

describe('tabIds', () => {
  it('ties a tab to its panel', () => {
    expect(tabIds('r1', 'home')).toEqual({ tab: 'r1-tab-home', panel: 'r1-panel-home' });
  });
});

describe('touchSlop', () => {
  it('grows a short control to 44pt and leaves a tall one alone', () => {
    expect(touchSlop(28)).toEqual({ top: 8, bottom: 8 });
    expect(touchSlop(48)).toEqual({ top: 0, bottom: 0 });
  });
});

describe('indicatorBox', () => {
  const tab = { x: 100, y: 0, width: 120, height: 48 };
  it('covers the tab, or only its label', () => {
    expect(indicatorBox(tab, undefined)).toBe(tab);
    expect(indicatorBox(tab, { x: 30, y: 14, width: 60, height: 20 })).toEqual({ x: 130, y: 14, width: 60, height: 20 });
  });
});

describe('firstEnabledValue', () => {
  it('skips disabled items', () => {
    expect(firstEnabledValue([{ value: 'a', disabled: true }, { value: 'b' }])).toBe('b');
  });

  it('is undefined without items or with none enabled', () => {
    expect(firstEnabledValue(undefined)).toBeUndefined();
    expect(firstEnabledValue([{ value: 'a', disabled: true }])).toBeUndefined();
  });
});
