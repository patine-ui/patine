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
