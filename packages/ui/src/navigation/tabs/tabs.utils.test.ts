import { firstEnabledValue, indicatorBox, tabIds } from './tabs.utils';

describe('tabIds', () => {
  it('ties a tab to its panel', () => {
    expect(tabIds('r1', 'home')).toEqual({ tab: 'r1-tab-home', panel: 'r1-panel-home' });
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
