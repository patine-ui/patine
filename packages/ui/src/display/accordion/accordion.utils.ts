import { ACCORDION_TYPE } from './accordion.constants';
import type { AccordionListItem, AccordionType } from './accordion.types';

/** The open items as a list, whichever type the accordion is. */
export const toOpenList = (value: string | readonly string[] | undefined): string[] => {
  if (value === undefined || value === '') return [];
  return typeof value === 'string' ? [value] : [...value];
};

/** The list back in the accordion's own shape: the one open value (`''` for none) or every open value. */
export const fromOpenList = (type: AccordionType, open: readonly string[]): string | string[] =>
  type === ACCORDION_TYPE.multiple ? [...open] : (open[0] ?? '');

/** The open items after the user toggles `item`, or null when nothing changes (the open item of a non-collapsible single). */
export const toggleOpen = (open: readonly string[], item: string, type: AccordionType, collapsible: boolean): string[] | null => {
  const isOpen = open.includes(item);
  if (type === ACCORDION_TYPE.multiple) return isOpen ? open.filter((value) => value !== item) : [...open, item];
  if (!isOpen) return [item];
  return collapsible ? [] : null;
};

/** The ids that tie a trigger to its content, for `aria-controls` and `aria-labelledby`. */
export const itemIds = (baseId: string, value: string) => ({
  trigger: `${baseId}-trigger-${value}`,
  content: `${baseId}-content-${value}`,
});

/** A shorthand item's value: its own, or its index as a string. */
export const listItemValue = (item: Pick<AccordionListItem, 'value'>, index: number) => item.value ?? String(index);
