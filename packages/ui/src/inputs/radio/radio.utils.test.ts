import type { RadioItemEntry } from './radio.types';
import { findNextItem } from './radio.utils';

const item = (value: string, disabled = false): RadioItemEntry => ({
  value,
  disabled,
  ref: { current: null },
});
const items = [item('a'), item('b', true), item('c')];

describe('findNextItem', () => {
  it('skips disabled items and wraps around both ways', () => {
    expect(findNextItem(items, 'a', 1)?.value).toBe('c');
    expect(findNextItem(items, 'c', 1)?.value).toBe('a');
    expect(findNextItem(items, 'a', -1)?.value).toBe('c');
  });

  it('starts from the first item when nothing is selected', () => {
    expect(findNextItem(items, 'missing', 1)?.value).toBe('a');
  });

  it('finds nothing when every item is disabled', () => {
    expect(findNextItem([item('a', true)], 'a', 1)).toBeUndefined();
  });
});
