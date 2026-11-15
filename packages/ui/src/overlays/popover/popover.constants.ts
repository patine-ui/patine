import type { Design } from '@/core/theme/theme.types';
import type { PopoverDesign, PopoverSide } from './popover.types';

export const POPOVER_SIDE = {
  top: 'top',
  bottom: 'bottom',
  left: 'left',
  right: 'right',
} as const;

export const POPOVER_ALIGN = {
  start: 'start',
  center: 'center',
  end: 'end',
} as const;

export const POPOVER_PRESENTATION = {
  popover: 'popover',
  sheet: 'sheet',
} as const;

export const OPPOSITE_SIDE: Record<PopoverSide, PopoverSide> = {
  top: 'bottom',
  bottom: 'top',
  left: 'right',
  right: 'left',
};

/** Space kept between the panel and the window edge. */
export const EDGE_MARGIN = 8;
/** How far the arrow sticks out of the panel; it's twice as wide. */
export const ARROW_SIZE = 8;
/** The arrow stays this far from the panel's corners, clear of the rounding. */
export const ARROW_INSET = 16;
/** The panel slides this far in from its trigger as it fades in, unless motion is reduced. */
export const SLIDE_DISTANCE = 4;

/** Which way the panel slides in from: away from the trigger, towards where it settles. */
export const SIDE_SHIFT: Record<PopoverSide, { axis: 'translateX' | 'translateY'; from: number }> = {
  top: { axis: 'translateY', from: SLIDE_DISTANCE },
  bottom: { axis: 'translateY', from: -SLIDE_DISTANCE },
  left: { axis: 'translateX', from: SLIDE_DISTANCE },
  right: { axis: 'translateX', from: -SLIDE_DISTANCE },
};

/** iPad popovers point at what opened them; Material, web and brand float a bordered or raised card beside it. */
export const POPOVER_DESIGN: Record<Design, PopoverDesign> = {
  brand: { width: 288, padding: 16, radius: 'md', border: true, arrow: false, sideOffset: 6 },
  ios: { width: 320, padding: 16, radius: 'lg', border: false, arrow: true, sideOffset: 4 },
  material: { width: 280, padding: 16, radius: 'lg', border: false, arrow: false, sideOffset: 4 },
  web: { width: 288, padding: 12, radius: 'sm', border: true, arrow: false, sideOffset: 4 },
};

export const CLOSE_LABEL = 'Close';
