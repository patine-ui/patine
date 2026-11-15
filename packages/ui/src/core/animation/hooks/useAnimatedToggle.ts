import type { Animated } from 'react-native';

import { useAnimatedTo } from './useAnimatedTo';

/** A value that animates to 1 while `on` and back to 0 when not; it starts where `on` already is. */
export const useAnimatedToggle = (on: boolean, duration: number): Animated.Value => useAnimatedTo(on ? 1 : 0, { duration });
