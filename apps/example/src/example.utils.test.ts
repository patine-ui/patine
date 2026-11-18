import { BASICS_LABEL, CATALOG_PAGES, COMPONENTS_LABEL } from './example.constants';
import { initialOpenSections, routeTitle } from './example.utils';

const pageAt = (doc: string) => {
  const entry = CATALOG_PAGES.find(({ page }) => page.doc === doc);
  if (!entry) throw new Error(doc);
  return entry.page;
};

describe('initialOpenSections', () => {
  it('opens the group of the page shown', () => {
    expect(initialOpenSections({ page: pageAt('components/select-list') }, CATALOG_PAGES)).toEqual([COMPONENTS_LABEL, 'Selection']);
  });

  it('opens no group for the basics screen', () => {
    expect(initialOpenSections({ basics: true }, CATALOG_PAGES)).toEqual([COMPONENTS_LABEL]);
  });

  it('titles a page by its label, and the basics screen as such', () => {
    expect(routeTitle({ page: pageAt('components/select-list') })).toBe(pageAt('components/select-list').label);
    expect(routeTitle({ basics: true })).toBe(BASICS_LABEL);
  });
});
