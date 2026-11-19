import { type KeyboardAvoidingViewProps, Platform, type PlatformOSType } from 'react-native';

import type { PressFeedback, SearchDesign } from './core.types';
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

/** iOS lifts a modal's content above the keyboard with padding; Android resizes the window itself. */
export const KEYBOARD_AVOID_BEHAVIOR: KeyboardAvoidingViewProps['behavior'] = Platform.OS === PLATFORM.ios ? 'padding' : undefined;

export const PICKER_DISPLAY = {
  calendar: 'calendar',
  wheel: 'wheel',
} as const;

/** A text field can't hold the hover tint as a child view, so an inset shadow this wide paints it over the background, under the text. */
export const HOVER_FILL_SPREAD = 999;

export const CHECK_MARK = '✓';

/** The drawn chevron of Accordion, Collapsible and tree rows: its arm length and stroke, in points. */
export const DISCLOSURE_CHEVRON = { size: 8, stroke: 1.75 } as const;

/** Which side of its label a checkbox or switch sits on. */
export const CONTROL_POSITION = {
  start: 'start',
  end: 'end',
} as const;

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

/** iOS's slider knob: white on any colour, with the theme's `sm` shadow. */
export const KNOB_SIZE = 28;
