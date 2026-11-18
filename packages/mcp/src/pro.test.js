const { PRO, PRO_NOTE, searchProIcons, searchProPages } = require('./pro');
const { ICONS } = require('./icons');

describe('pro', () => {
  it('lists only what the free packages lack', () => {
    const free = new Set(ICONS.map((i) => i.name));
    expect(PRO.icons.length).toBeGreaterThan(0);
    expect(PRO.icons.filter((i) => free.has(i.name))).toEqual([]);
    expect(PRO.pages.every((p) => p.url.startsWith('https://patine.dev/docs/'))).toBe(true);
  });

  it('finds Pro pages with a description and a link, tagged Pro', () => {
    const [kanban] = searchProPages('kanban');
    expect(kanban).toMatch(/^- \[Pro block\] Kanban: .+ Docs: https:\/\/patine\.dev\/docs\/blocks\/kanban$/);
    expect(searchProPages('kanban', 3, ['Kanban']).some((line) => line.includes('] Kanban:'))).toBe(false);
  });

  it('finds brand logos and Pro icons, and says how to get them', () => {
    expect(searchProIcons('github')[0]).toContain('<BrandIcon name="github" />');
    expect(PRO_NOTE).toContain('https://patine.dev/pricing');
  });
});
