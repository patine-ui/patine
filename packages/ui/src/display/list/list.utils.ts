import { LIST_SEPARATOR } from './list.constants';
import type { ListDesign, SeparatorEdge } from './list.types';

/**
 * A row shows a chevron when asked to, or by default when it navigates and the design draws chevrons. A destructive row is an
 * action, not a way to another screen, so it has none, as in iOS Settings.
 */
export const showsChevron = (look: ListDesign, pressable: boolean, showChevron: boolean | undefined, destructive = false) =>
  showChevron ?? (pressable && !destructive && look.chevron);

/**
 * Where a row draws the line above it: across its text and trailing part, so it starts where the text starts (iOS),
 * across the whole row (web), or nowhere (the first row, and Material).
 */
export const getSeparatorEdge = (look: ListDesign, first: boolean): SeparatorEdge => {
  if (first || look.separator === LIST_SEPARATOR.none) return null;
  return look.separator === LIST_SEPARATOR.inset ? 'content' : 'row';
};
