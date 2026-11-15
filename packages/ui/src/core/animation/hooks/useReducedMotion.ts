import { useSyncExternalStore } from 'react';

import { isReducedMotion, subscribeReducedMotion } from '@/core/animation/motion.utils';

/** Whether the user asked the OS to reduce motion; re-renders when they change it. */
export const useReducedMotion = () => useSyncExternalStore(subscribeReducedMotion, isReducedMotion, isReducedMotion);
