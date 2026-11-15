import type { Design } from '@/core/theme/theme.types';
import type { SwipeDesign } from './swipeable.types';

export const SWIPE_SIDE = {
  leading: 'leading',
  trailing: 'trailing',
} as const;

/** A swipe past this share of the row's width runs the outermost action, with `fullSwipe`. */
export const FULL_SWIPE_SHARE = 0.6;

/** A flick at least this fast (pt/ms) opens or closes whatever the distance. */
export const FLICK_VELOCITY = 0.3;

/**
 * iOS: 74pt square actions with a small label, a gray neutral, the edge action stretching on a full swipe. Material: wider
 * 88dp actions. The web and brand: 80px actions.
 */
export const SWIPE_DESIGN: Record<Design, SwipeDesign> = {
  brand: { actionWidth: 80, labelSize: 'sm', neutral: 'textSecondary', resistance: 0.35 },
  ios: { actionWidth: 74, labelSize: 'sm', neutral: 'textSecondary', resistance: 0.4 },
  material: { actionWidth: 88, labelSize: 'sm', neutral: 'textSecondary', resistance: 0.3 },
  web: { actionWidth: 80, labelSize: 'sm', neutral: 'textSecondary', resistance: 0.35 },
};
