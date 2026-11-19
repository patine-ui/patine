import {
  ARROW_INSET,
  ARROW_SHADOW_ROOM,
  ARROW_SIDE,
  ARROW_SIZE,
  EDGE_MARGIN,
  OPPOSITE_SIDE,
  POPOVER_ALIGN,
  POPOVER_SIDE,
} from './popover.constants';
import type { Placement, PlacementOptions, PopoverSide, Size } from './popover.types';

const isVertical = (side: PopoverSide) => side === POPOVER_SIDE.top || side === POPOVER_SIDE.bottom;

/** Keeps `start` so the whole `length` fits between the margins; when it can't, its start stays in view. */
const clamp = (start: number, length: number, room: number) => Math.max(EDGE_MARGIN, Math.min(start, room - EDGE_MARGIN - length));

/**
 * Where a panel goes beside its trigger: on `side`, or the opposite one when `side` has no room and that one has more;
 * lined up with the trigger's start, centre or end; then kept inside `area`.
 */
export const getPlacement = ({ trigger: t, size, area, side, align, sideOffset, rtl }: PlacementOptions): Placement => {
  const room: Record<PopoverSide, number> = {
    top: t.y,
    bottom: area.height - t.y - t.height,
    left: t.x,
    right: area.width - t.x - t.width,
  };
  const needed = (isVertical(side) ? size.height : size.width) + sideOffset + EDGE_MARGIN;
  const opposite = OPPOSITE_SIDE[side];
  const placed = room[side] < needed && room[opposite] > room[side] ? opposite : side;
  const vertical = isVertical(placed);

  const main = {
    top: t.y - sideOffset - size.height,
    bottom: t.y + t.height + sideOffset,
    left: t.x - sideOffset - size.width,
    right: t.x + t.width + sideOffset,
  }[placed];
  const [start, length, extent] = vertical ? [t.x, t.width, size.width] : [t.y, t.height, size.height];
  // Start and end are reading order across the screen; down the screen, start is always the top.
  const toEnd = align === POPOVER_ALIGN.end ? !(vertical && rtl) : align === POPOVER_ALIGN.start && vertical && rtl;
  const cross = align === POPOVER_ALIGN.center ? start + (length - extent) / 2 : toEnd ? start + length - extent : start;

  const x = clamp(vertical ? cross : main, size.width, area.width);
  const y = clamp(vertical ? main : cross, size.height, area.height);
  const arrow = start + length / 2 - (vertical ? x : y);
  return {
    side: placed,
    x,
    y,
    arrow: Math.max(Math.min(ARROW_INSET, extent / 2), Math.min(arrow, extent - ARROW_INSET)),
  };
};

/**
 * The arrow is a square turned 45° and centred on the panel's edge facing the trigger, so its point sticks out
 * `ARROW_SIZE` at `placement.arrow`. It sits in a clip drawn pointing up (its outer half, the panel's border under it, and
 * room for the shadow) that is then turned to face the trigger: the panel's shadow and border carry on around the arrow,
 * and none of it falls inside the panel.
 */
export const getArrowClip = (border: number) => ({
  width: 2 * (ARROW_SIZE + ARROW_SHADOW_ROOM),
  height: ARROW_SIZE + ARROW_SHADOW_ROOM + border,
});

/** The turned square inside the clip, its centre on the panel's outer edge. */
export const getArrowSquare = (border: number) => {
  const clip = getArrowClip(border);
  return {
    left: clip.width / 2 - ARROW_SIDE / 2,
    top: ARROW_SIZE + ARROW_SHADOW_ROOM - ARROW_SIDE / 2,
  };
};

/** Where the clip goes and how it turns. `size` is the panel's outer box; an absolute child is placed from inside its border. */
export const getArrowFrame = ({ side, arrow }: Placement, size: Size, border = 0) => {
  const clip = getArrowClip(border);
  // How far the clip's centre lies outside the edge.
  const out = (ARROW_SIZE + ARROW_SHADOW_ROOM - border) / 2;
  const centre = {
    bottom: { x: arrow, y: -out, rotate: '0deg' },
    top: { x: arrow, y: size.height + out, rotate: '180deg' },
    right: { x: -out, y: arrow, rotate: '-90deg' },
    left: { x: size.width + out, y: arrow, rotate: '90deg' },
  }[side];
  return {
    left: centre.x - clip.width / 2 - border,
    top: centre.y - clip.height / 2 - border,
    transform: [{ rotate: centre.rotate }],
  };
};

/** Calls a child's own handler, then ours: how a trigger adds behaviour to the element it wraps. */
export const chain =
  <A extends unknown[]>(theirs: ((...args: A) => void) | undefined, ours: (...args: A) => void) =>
  (...args: A) => {
    theirs?.(...args);
    ours(...args);
  };

/** The panel's place and room: at its computed spot (top-left until measured), never wider than the area allows. */
export const getPanelPlace = (placement: { x: number; y: number } | null | undefined, areaWidth: number) => ({
  maxWidth: areaWidth - EDGE_MARGIN * 2,
  left: placement?.x ?? 0,
  top: placement?.y ?? 0,
});

/** The arrow's fill, and the panel's border on its outer sides (top and left before it turns) when the panel has one. */
export const getArrowTint = (color: string, borderColor?: unknown, borderWidth = 0, boxShadow?: unknown) => ({
  backgroundColor: color,
  ...(boxShadow ? { boxShadow: boxShadow as string } : {}),
  ...(borderColor && borderWidth
    ? {
        borderTopWidth: borderWidth,
        borderLeftWidth: borderWidth,
        borderColor: borderColor as string,
      }
    : {}),
});

/** What `liftToTopLayer` needs of a DOM element: the Popover API, where the browser has it. */
export interface TopLayerNode {
  setAttribute(name: string, value: string): void;
  style: Record<string, string>;
  showPopover?: () => void;
}

/**
 * Lifts a floating panel's element into the browser's top layer (the Popover API, `popover="manual"`), above every stacking
 * context and clipping ancestor: react-native-web gives each view its own (`z-index: 0`), so a fixed panel inside a top bar
 * is otherwise painted under the content after it. It undoes the user agent's popover box (inset, margin, overflow) so the
 * panel keeps its own place. Without the API it does nothing and the panel stays where it is.
 */
export const liftToTopLayer = (node: TopLayerNode | null | undefined) => {
  if (!node?.showPopover) return false;
  node.setAttribute('popover', 'manual');
  Object.assign(node.style, { right: 'auto', bottom: 'auto', margin: '0', overflow: 'visible', border: 'none' });
  node.showPopover();
  return true;
};
