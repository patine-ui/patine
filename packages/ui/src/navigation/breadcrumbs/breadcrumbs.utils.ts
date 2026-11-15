import type { BreadcrumbEntry, BreadcrumbItem } from './breadcrumbs.types';

/** The items to draw: all of them, or past `maxItems` the first, an ellipsis, and the last ones that fit. */
export const getBreadcrumbEntries = (items: readonly BreadcrumbItem[], maxItems?: number, expanded = false): BreadcrumbEntry[] => {
  const all = items.map(
    (item, index): BreadcrumbEntry => ({
      kind: 'item',
      item,
      index,
    })
  );
  if (expanded || !maxItems || items.length <= maxItems || maxItems < 2) return all;
  return [...all.slice(0, 1), { kind: 'ellipsis' }, ...all.slice(items.length - (maxItems - 1))];
};
