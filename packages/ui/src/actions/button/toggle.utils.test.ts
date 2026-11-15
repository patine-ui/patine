import { lightTheme } from '@/core/theme/theme.constants';
import { BUTTON_GROUP_DESIGN, TOGGLE_DESIGN } from './toggle.constants';
import { getJoinedStyle, getToggleColors, toggleValue } from './toggle.utils';

const c = lightTheme.colors;

describe('getToggleColors', () => {
  it('fills with the design color when pressed', () => {
    expect(getToggleColors(c, TOGGLE_DESIGN.material, 'default', true)).toEqual({
      background: c.primary,
      text: c.onPrimary,
      border: 'transparent',
    });
    expect(getToggleColors(c, TOGGLE_DESIGN.brand, 'default', true).background).toBe(c.primaryMuted);
  });

  it('is clear or tonal when off, and outlined either way in the outline variant', () => {
    expect(getToggleColors(c, TOGGLE_DESIGN.brand, 'default', false).background).toBe('transparent');
    expect(getToggleColors(c, TOGGLE_DESIGN.ios, 'default', false).background).toBe(c.surface);
    expect(getToggleColors(c, TOGGLE_DESIGN.ios, 'outline', false)).toMatchObject({ background: 'transparent', border: c.border });
    expect(getToggleColors(c, TOGGLE_DESIGN.web, 'outline', true).border).toBe(c.border);
  });
});

describe('toggleValue', () => {
  it('keeps one value in single mode, and clears it when pressed again', () => {
    expect(toggleValue('single', ['a'], 'b')).toEqual(['b']);
    expect(toggleValue('single', ['a'], 'a')).toEqual([]);
  });

  it('adds and removes in multiple mode', () => {
    expect(toggleValue('multiple', ['a'], 'b')).toEqual(['a', 'b']);
    expect(toggleValue('multiple', ['a', 'b'], 'a')).toEqual(['b']);
  });
});

describe('getJoinedStyle', () => {
  it('squares the inner corners and overlaps borders when the buttons touch', () => {
    expect(getJoinedStyle(0, 3, false, BUTTON_GROUP_DESIGN.web)).toEqual({ borderTopEndRadius: 0, borderBottomEndRadius: 0 });
    expect(getJoinedStyle(1, 3, false, BUTTON_GROUP_DESIGN.web)).toEqual({
      borderTopStartRadius: 0,
      borderBottomStartRadius: 0,
      borderTopEndRadius: 0,
      borderBottomEndRadius: 0,
      marginStart: -1,
    });
    expect(getJoinedStyle(2, 3, true, BUTTON_GROUP_DESIGN.web)).toEqual({ borderTopLeftRadius: 0, borderTopRightRadius: 0, marginTop: -1 });
  });

  it('softens inner corners without overlapping when the design leaves a gap', () => {
    expect(getJoinedStyle(1, 2, false, BUTTON_GROUP_DESIGN.material)).toEqual({ borderTopStartRadius: 8, borderBottomStartRadius: 8 });
  });

  it('leaves a lone button alone', () => {
    expect(getJoinedStyle(0, 1, false, BUTTON_GROUP_DESIGN.brand)).toEqual({});
  });
});
