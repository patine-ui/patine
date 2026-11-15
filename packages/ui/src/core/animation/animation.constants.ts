import { Easing } from 'react-native';

import { IS_WEB } from '@/core/core.constants';

/** react-native-web has no native animated module. Layout props (height) never run on it, whatever the platform. */
export const USE_NATIVE_DRIVER = !IS_WEB;

/**
 * The library's durations, in ms. `instant`: a press answering the finger. `fast`: small state changes, a hover tint, a
 * checkmark. `base`: moves and overlays, the default of the theme's `animation.duration`, which components follow.
 */
export const DURATION = { instant: 100, fast: 160, base: 240 } as const;

/** Moves and resizes on screen (a thumb sliding, content folding): starts gently and settles softly, so no frame jumps. Material's standard curve. */
export const EASE_STANDARD = Easing.bezier(0.2, 0, 0, 1);
/** Things arriving, or let go by a finger, decelerate into place. */
export const EASE_OUT = Easing.out(Easing.cubic);
/** Things leaving speed up as they go, without the slow start of a cubic ease-in that reads as lag. */
export const EASE_IN = Easing.bezier(0.4, 0, 1, 1);

/** A press letting go: a quick spring back with a hint of overshoot. */
export const RELEASE_SPRING = { speed: 24, bounciness: 6 } as const;

/** A loading placeholder's breathing: how far it dims, and one dim-and-back in ms. */
export const PULSE = { min: 0.45, period: 1600 } as const;

/** A text caret's on and off time, in ms. */
export const BLINK_MS = 500;

/** One sweep of an indeterminate progress bar, in ms. */
export const SWEEP_MS = 1400;
