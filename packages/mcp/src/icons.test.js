const { ICONS, searchIcons } = require('./icons');

describe('searchIcons', () => {
  it('finds icons by name first, then by tag', () => {
    const names = searchIcons('bell').map((i) => i.name);
    expect(names[0]).toBe('bell');
    expect(names).toEqual(expect.arrayContaining(['bellOff', 'bellRing']));
    expect(searchIcons('notification').map((i) => i.name)).toContain('bell');
  });

  it('splits camelCase names, so "arrow left" finds arrowLeft', () => {
    expect(searchIcons('arrow left')[0]?.name).toBe('arrowLeft');
  });

  it('caps the results and returns nothing for an empty query', () => {
    expect(searchIcons('a', 3)).toHaveLength(3);
    expect(searchIcons('  ')).toEqual([]);
  });

  it('ships the free set', () => {
    expect(ICONS.length).toBeGreaterThanOrEqual(200);
  });
});
