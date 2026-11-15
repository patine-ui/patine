import { formatBadge, getTabLabel } from './tabbar.utils';

describe('formatBadge', () => {
  it('caps counts, draws a dot for true, and nothing for none', () => {
    expect(formatBadge(3)).toBe('3');
    expect(formatBadge(120)).toBe('99+');
    expect(formatBadge(true)).toBe('');
    expect(formatBadge(0)).toBeNull();
    expect(formatBadge(false)).toBeNull();
    expect(formatBadge(undefined)).toBeNull();
  });
});

describe('getTabLabel', () => {
  it('reads the badge with the label', () => {
    expect(getTabLabel('Inbox', 3)).toBe('Inbox, 3 new');
    expect(getTabLabel('Inbox', true)).toBe('Inbox, new');
    expect(getTabLabel('Inbox', 0)).toBe('Inbox');
  });
});
