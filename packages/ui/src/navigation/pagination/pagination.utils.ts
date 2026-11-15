import type { PageItem } from './pagination.types';

const range = (from: number, to: number) => Array.from({ length: Math.max(0, to - from + 1) }, (_, i) => from + i);

/**
 * The pages to draw: both ends, the current page with its siblings, and an ellipsis for each gap, as MUI and shadcn do.
 * The count stays the same as the page moves, so the buttons don't jump about. A gap of one page shows the page instead.
 */
export const getPageItems = (page: number, count: number, siblings = 1, boundaries = 1): PageItem[] => {
  const start = range(1, Math.min(boundaries, count));
  const end = range(Math.max(count - boundaries + 1, boundaries + 1), count);
  const siblingsStart = Math.max(Math.min(page - siblings, count - boundaries - siblings * 2 - 1), boundaries + 2);
  const siblingsEnd = Math.min(Math.max(page + siblings, boundaries + siblings * 2 + 2), (end[0] ?? count + 1) - 2);
  return [
    ...start,
    ...(siblingsStart > boundaries + 2 ? (['start-ellipsis'] as const) : boundaries + 1 < count - boundaries ? [boundaries + 1] : []),
    ...range(siblingsStart, siblingsEnd),
    ...(siblingsEnd < count - boundaries - 1 ? (['end-ellipsis'] as const) : count - boundaries > boundaries ? [count - boundaries] : []),
    ...end,
  ];
};

/** A page kept between 1 and the count. */
export const clampPage = (page: number, count: number) => Math.min(Math.max(1, Math.round(page)), Math.max(1, count));
