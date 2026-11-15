import type { ViewStyle } from 'react-native';

import { hoverTransition } from '@/core/animation/animation.utils';
import { IS_WEB } from '@/core/core.constants';
import { useReducedMotion } from './useReducedMotion';

/**
 * Eases the shadow and lift a surface takes on hover or focus, with a CSS transition on the web. Native has no hover to
 * ease and the change is instant there, as it is with the OS set to reduce motion. Spread it into the surface's style.
 */
export const useHoverTransition = (duration: number): ViewStyle => {
  const reduced = useReducedMotion();
  return hoverTransition(IS_WEB && !reduced, duration);
};
