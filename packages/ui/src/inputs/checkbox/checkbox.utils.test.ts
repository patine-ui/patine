import { getAllChecked, nextChecked, toggleAll, toggleChecked } from './checkbox.utils';

describe('nextChecked', () => {
  it('toggles, and goes from mixed to checked', () => {
    expect(nextChecked(false)).toBe(true);
    expect(nextChecked(true)).toBe(false);
    expect(nextChecked('mixed')).toBe(true);
  });
});

describe('checkbox group', () => {
  const options = [{ value: 'a' }, { value: 'b' }, { value: 'c', disabled: true }];

  it('toggles a value and keeps the options order', () => {
    expect(toggleChecked(options, ['b'], 'a')).toEqual(['a', 'b']);
    expect(toggleChecked(options, ['a', 'b'], 'a')).toEqual(['b']);
  });

  it('reads select all from the enabled options', () => {
    expect(getAllChecked(options, [])).toBe(false);
    expect(getAllChecked(options, ['a'])).toBe('mixed');
    expect(getAllChecked(options, ['a', 'b'])).toBe(true);
  });

  it('selects or clears every enabled option, leaving disabled ones', () => {
    expect(toggleAll(options, ['c'])).toEqual(['a', 'b', 'c']);
    expect(toggleAll(options, ['a', 'b'])).toEqual([]);
    expect(toggleAll(options, ['a'])).toEqual(['a', 'b']);
  });
});
