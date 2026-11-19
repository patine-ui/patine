import { fromOpenList, itemIds, listItemValue, toggleOpen, toOpenList } from './accordion.utils';

describe('toOpenList and fromOpenList', () => {
  it('reads either type as a list and writes it back in its own shape', () => {
    expect(toOpenList(undefined)).toEqual([]);
    expect(toOpenList('')).toEqual([]);
    expect(toOpenList('a')).toEqual(['a']);
    expect(toOpenList(['a', 'b'])).toEqual(['a', 'b']);
    expect(fromOpenList('single', ['a'])).toBe('a');
    expect(fromOpenList('single', [])).toBe('');
    expect(fromOpenList('multiple', ['a', 'b'])).toEqual(['a', 'b']);
  });
});

describe('toggleOpen', () => {
  it('opens one item at a time in a single accordion', () => {
    expect(toggleOpen([], 'a', 'single', false)).toEqual(['a']);
    expect(toggleOpen(['a'], 'b', 'single', false)).toEqual(['b']);
  });

  it('closes the open item only when collapsible', () => {
    expect(toggleOpen(['a'], 'a', 'single', false)).toBeNull();
    expect(toggleOpen(['a'], 'a', 'single', true)).toEqual([]);
  });

  it('opens and closes items independently in a multiple accordion', () => {
    expect(toggleOpen(['a'], 'b', 'multiple', false)).toEqual(['a', 'b']);
    expect(toggleOpen(['a', 'b'], 'a', 'multiple', false)).toEqual(['b']);
  });
});

describe('itemIds', () => {
  it('ties a trigger to its content', () => {
    expect(itemIds('r1', 'faq')).toEqual({ trigger: 'r1-trigger-faq', content: 'r1-content-faq' });
  });
});

describe('listItemValue', () => {
  it("uses the item's value, or its index", () => {
    expect(listItemValue({ value: 'faq' }, 3)).toBe('faq');
    expect(listItemValue({}, 3)).toBe('3');
  });
});
