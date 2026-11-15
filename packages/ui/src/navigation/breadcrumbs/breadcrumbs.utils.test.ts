import { getBreadcrumbEntries } from './breadcrumbs.utils';

const items = ['Home', 'Docs', 'Components', 'Inputs', 'Slider'].map((label) => ({ label }));
const labels = (entries: ReturnType<typeof getBreadcrumbEntries>) => entries.map((e) => (e.kind === 'item' ? e.item.label : '…'));

describe('getBreadcrumbEntries', () => {
  it('shows every item within the limit', () => {
    expect(labels(getBreadcrumbEntries(items))).toEqual(['Home', 'Docs', 'Components', 'Inputs', 'Slider']);
    expect(labels(getBreadcrumbEntries(items, 5))).toHaveLength(5);
  });

  it('folds the middle past the limit, keeping the first and the last', () => {
    expect(labels(getBreadcrumbEntries(items, 3))).toEqual(['Home', '…', 'Inputs', 'Slider']);
  });

  it('unfolds when expanded', () => {
    expect(labels(getBreadcrumbEntries(items, 3, true))).toHaveLength(5);
  });
});
