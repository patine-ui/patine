import { Platform, type PlatformOSType } from 'react-native';

import type { PressFeedback, SearchDesign, ValueOf } from './core.types';
import type { Design } from './theme/theme.types';

/** The `Platform.OS` values pickers tell apart. Anything else (windows, macos) behaves like native. */
export const PLATFORM = {
  ios: 'ios',
  android: 'android',
  web: 'web',
} as const satisfies Record<string, PlatformOSType>;

/** Desktop browsers can draw a permanent scrollbar track, which looks out of place in phone-style lists. */
export const SHOWS_SCROLL_INDICATOR = Platform.select({ web: false, default: true });

export const IS_WEB = Platform.OS === PLATFORM.web;

export const PICKER_DISPLAY = {
  calendar: 'calendar',
  wheel: 'wheel',
} as const;

/** A text field can't hold the hover tint as a child view, so an inset shadow this wide paints it over the background, under the text. */
export const HOVER_FILL_SPREAD = 999;

export const CHECK_MARK = '✓';

/** The keyboard focus ring drawn by `focusOutline`. */
export const FOCUS_OUTLINE = { width: 2, offset: 2 } as const;

/** Smallest touch area on phones (Apple HIG 44pt, Android 48dp rounds to it with spacing). */
export const MIN_TOUCH_TARGET = 44;

/** Opacity of a disabled control. */
export const DISABLED_OPACITY = 0.5;

/** The drawn chevron of Accordion, Collapsible and tree rows: its arm length and stroke, in points. */
export const DISCLOSURE_CHEVRON = { size: 8, stroke: 1.75 } as const;

/** Where a disclosure trigger draws its icon: before the label, after it, or not at all. */
export const ICON_POSITION = {
  start: 'start',
  end: 'end',
  none: 'none',
} as const;

export const PRESS_FEEDBACK = {
  ripple: 'ripple',
  highlight: 'highlight',
} as const;

/** Material ripples from the touch point; iOS and the web dim what's pressed while it's held. */
export const PRESS_FEEDBACK_DESIGN: Record<Design, PressFeedback> = {
  brand: PRESS_FEEDBACK.highlight,
  ios: PRESS_FEEDBACK.highlight,
  material: PRESS_FEEDBACK.ripple,
  web: PRESS_FEEDBACK.highlight,
};

/** How far a button shrinks while held (`pressScale` on Touchable). Material answers with its ripple instead, so it stays put. */
export const PRESS_SCALE_DESIGN: Record<Design, number> = {
  brand: 0.97,
  ios: 0.97,
  material: 1,
  web: 0.98,
};

/** iOS: a short gray search bar. Material: the taller pill of its search bar. The web: an outlined input with a focus ring. */
export const SEARCH_DESIGN: Record<Design, SearchDesign> = {
  brand: {
    height: 44,
    radius: 'md',
    outlined: true,
    focusRing: true,
    iconInset: 'md',
  },
  ios: {
    height: 36,
    radius: 'md',
    outlined: false,
    focusRing: false,
    iconInset: 'sm',
  },
  material: {
    height: 48,
    radius: 'full',
    outlined: false,
    focusRing: false,
    iconInset: 'lg',
  },
  web: {
    height: 38,
    radius: 'md',
    outlined: true,
    focusRing: true,
    iconInset: 'md',
  },
};

export const SEARCH_ICON_SIZE = 16;

/** The ripple grows over this multiple of the theme's animation duration, and fades out over the other. */
export const RIPPLE_GROW_RATIO = 1.5;
export const RIPPLE_FADE_RATIO = 1.25;
/** On a quick tap the ripple still spreads this far through its growth before it starts fading. */
export const RIPPLE_MIN_VISIBLE_RATIO = 0.6;

export const SWIPE = {
  /** Horizontal travel before a pager claims the gesture */
  activateDistance: 14,
  /** How much more horizontal than vertical a move must be */
  directionRatio: 1.5,
  /** A release past either threshold changes the page */
  minDistance: 50,
  minVelocity: 0.5,
} as const;

/** How far (px) a new page slides in from. */
export const SLIDE_DISTANCE = 40;

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

/** A slider's touch area, 44pt as iOS asks, however thin its track. */
export const TOUCH_TARGET = 44;
/** iOS's slider knob: white on any colour, with the theme's `sm` shadow. */
export const KNOB_SIZE = 28;
export const KNOB_COLOR = '#FFFFFF';

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
