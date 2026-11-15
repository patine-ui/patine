import type { RowLayout } from './sortable.types';

/** The array with the item at `from` moved to `to`. */
export const moveItem = <T>(items: readonly T[], from: number, to: number): T[] => {
  const next = items.slice();
  next.splice(to, 0, ...next.splice(from, 1));
  return next;
};

/** How far the lifted row's neighbours make way: its height plus the gap after it. */
export const rowSpan = (layouts: readonly RowLayout[], from: number) => {
  const row = layouts[from];
  if (!row) return 0;
  const next = layouts[from + 1];
  const prev = layouts[from - 1];
  if (next) return next.y - row.y;
  if (prev) return row.y - prev.y - prev.height + row.height;
  return row.height;
};

/** Where the lifted row would land: one place after every other row whose middle is above its own. */
export const dropIndex = (layouts: readonly RowLayout[], from: number, offset: number) => {
  const row = layouts[from];
  if (!row) return from;
  const middle = row.y + row.height / 2 + offset;
  let index = 0;
  layouts.forEach((other, i) => {
    if (i !== from && other.y + other.height / 2 < middle) index++;
  });
  return index;
};

/** How far a row moves to make way while the row at `from` hovers over `to`. */
export const shiftFor = (index: number, from: number, to: number, span: number) => {
  if (from < 0 || index === from) return 0;
  if (from < to && index > from && index <= to) return -span;
  if (to < from && index >= to && index < from) return span;
  return 0;
};

/** Where the lifted row settles, relative to its own place, when it drops at `to`. */
export const settleOffset = (layouts: readonly RowLayout[], from: number, to: number) => {
  const row = layouts[from];
  const target = layouts[to];
  if (!row || !target || from === to) return 0;
  return to > from ? target.y + target.height - (row.y + row.height) : target.y - row.y;
};

/** Points per frame to scroll while the finger is within `edge` of the top or bottom: faster the closer it gets. */
export const autoScrollSpeed = (y: number, viewport: number, edge: number, max: number) => {
  if (viewport <= 0) return 0;
  const zone = Math.min(edge, viewport / 3);
  if (y < zone) return -max * Math.min(1, (zone - y) / zone);
  if (y > viewport - zone) return max * Math.min(1, (y - (viewport - zone)) / zone);
  return 0;
};

/** Fills `{position}` and `{count}`. */
export const formatPosition = (template: string, position: number, count: number) =>
  template.replace('{position}', String(position)).replace('{count}', String(count));
