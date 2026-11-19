import type { ValueOf } from '@/core/core.types';

/** The keyboard focus ring drawn by `focusRing`. */
export const FOCUS_RING = { width: 2, offset: 2 } as const;

/** Smallest touch area on phones (Apple HIG 44pt, Android 48dp rounds to it with spacing). */
export const MIN_TOUCH_TARGET = 44;

/** The largest the user's font size setting grows text, so fixed-height controls (44pt rows, buttons) don't clip it. */
export const MAX_FONT_SCALE = 1.6;

/** Opacity of a disabled control. */
export const DISABLED_OPACITY = 0.5;

/** `KeyboardEvent.key` values the pickers answer, on the web and on hardware keyboards. */
export const KEY = {
  up: 'ArrowUp',
  down: 'ArrowDown',
  left: 'ArrowLeft',
  right: 'ArrowRight',
  home: 'Home',
  end: 'End',
  pageUp: 'PageUp',
  pageDown: 'PageDown',
} as const;

/** The screen-reader actions of an adjustable control, a slider or a wheel. */
export const A11Y_ACTION = {
  increment: 'increment',
  decrement: 'decrement',
} as const;

export const ADJUSTABLE_ACTIONS = [{ name: A11Y_ACTION.increment }, { name: A11Y_ACTION.decrement }];

export const DIRECTION = {
  up: 'up',
  down: 'down',
  left: 'left',
  right: 'right',
} as const;

export const ARROW_DIRECTION: Record<string, ValueOf<typeof DIRECTION>> = {
  [KEY.up]: DIRECTION.up,
  [KEY.down]: DIRECTION.down,
  [KEY.left]: DIRECTION.left,
  [KEY.right]: DIRECTION.right,
};

/** What arrow-key focus moves to: what Tab stops at, text fields included. */
export const FOCUS_TARGETS = '[tabindex="0"], input:not([disabled]), textarea:not([disabled])';

export const TEXT_FIELD_TAGS = ['INPUT', 'TEXTAREA'];

/** How far (px) a box may overlap the one focus leaves and still count as lying that way. */
export const EDGE_TOLERANCE = 1;

/** A step across counts double a step along, so moving down keeps to the column and moving right to the row. */
export const CROSS_WEIGHT = 2;
