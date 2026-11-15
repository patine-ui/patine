import { AccessibilityInfo } from 'react-native';

type Listener = () => void;

let reduced = false;
let started = false;
const listeners = new Set<Listener>();

const set = (next: boolean) => {
  if (next === reduced) return;
  reduced = next;
  for (const listener of listeners) listener();
};

/** Follows the OS "reduce motion" setting from the first call on: one subscription for the whole library. */
const start = () => {
  if (started) return;
  started = true;
  AccessibilityInfo.isReduceMotionEnabled()
    .then(set)
    .catch(() => {});
  AccessibilityInfo.addEventListener('reduceMotionChanged', set);
};

/** Whether the user asked the OS to reduce motion. Animations then jump to their end instead of moving. */
export const isReducedMotion = () => {
  start();
  return reduced;
};

/** For `useSyncExternalStore`. */
export const subscribeReducedMotion = (listener: Listener) => {
  start();
  listeners.add(listener);
  return () => {
    listeners.delete(listener);
  };
};
