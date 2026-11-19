import { ARROW_INSET, ARROW_SIZE, EDGE_MARGIN, OPPOSITE_SIDE, POPOVER_ALIGN, POPOVER_SIDE } from './popover.constants';
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
 * The arrow is a triangle pointing up, `ARROW_SIZE * 2` wide and `ARROW_SIZE` tall, turned to face the trigger. It sits
 * just outside the panel's edge on that side, with its tip at `placement.arrow`.
 */
export const getArrowFrame = ({ side, arrow }: Placement, size: Size) => {
  const centre = {
    bottom: { x: arrow, y: -ARROW_SIZE / 2, rotate: '0deg' },
    top: { x: arrow, y: size.height + ARROW_SIZE / 2, rotate: '180deg' },
    right: { x: -ARROW_SIZE / 2, y: arrow, rotate: '-90deg' },
    left: { x: size.width + ARROW_SIZE / 2, y: arrow, rotate: '90deg' },
  }[side];
  return {
    left: centre.x - ARROW_SIZE,
    top: centre.y - ARROW_SIZE / 2,
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

/** The arrow's fill: the panel's colour on its pointing side. */
export const getArrowTint = (color: string) => ({ borderBottomColor: color });
