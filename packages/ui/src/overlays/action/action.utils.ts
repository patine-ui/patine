import type { AnchorRect } from '@/overlays/sheet/sheet.types';
import { MENU_ALIGN } from './action.constants';
import type { DropdownMenuAlign } from './action.types';

/** The rect the menu drops from: the trigger, widened to the menu and lined up with its left or right edge. */
export const getMenuAnchor = (
  trigger: AnchorRect,
  width: number,
  align: DropdownMenuAlign,
  windowWidth: number,
  rtl: boolean
): AnchorRect => {
  const rightEdge = align === MENU_ALIGN.auto ? trigger.x + trigger.width / 2 > windowWidth / 2 : (align === MENU_ALIGN.end) !== rtl;
  return {
    ...trigger,
    x: rightEdge ? trigger.x + trigger.width - width : trigger.x,
    width,
  };
};

/** A row at least `height` tall: the design's row height. */
export const getRowMinHeight = (height: number) => ({ minHeight: height });

/** The actions with each group gathered at its first appearance, as Select groups its options. Ungrouped ones stay put. */
export const groupActions = <T extends { group?: string }>(actions: readonly T[]): T[] => {
  const groups = new Map<string, T[]>();
  for (const action of actions) groups.set(action.group ?? '', [...(groups.get(action.group ?? '') ?? []), action]);
  // Array.from, not spread: Babel's loose mode (e.g. Docusaurus) compiles `[...map]` to `[map]`.
  return Array.from(groups.values()).flat();
};
