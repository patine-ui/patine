import { useEffect, useState } from 'react';

import { useReducedMotion } from '@/core/animation';
import { AUTOPLAY_MS } from '@/display/carousel/carousel.constants';

/**
 * Calls `advance` every `autoplay` ms (`true` is every 4 s) while nothing holds it: a touch, the pointer over it, or focus
 * inside it. Never runs when the OS asks to reduce motion. The timer restarts whenever `index` changes, so a manual change
 * gets a full interval too. Spread `handlers` on the carousel's root.
 */
export const useAutoplay = (autoplay: boolean | number, index: number, count: number, advance: () => void) => {
  const reduced = useReducedMotion();
  const [touched, setTouched] = useState(false);
  const [hovered, setHovered] = useState(false);
  const [focused, setFocused] = useState(false);
  const interval = autoplay === true ? AUTOPLAY_MS : autoplay || 0;
  const running = interval > 0 && count > 1 && !reduced && !touched && !hovered && !focused;

  // biome-ignore lint/correctness/useExhaustiveDependencies: `index` restarts the timer after any change; `advance` is read when it fires.
  useEffect(() => {
    if (!running) return;
    const timer = setTimeout(advance, interval);
    return () => clearTimeout(timer);
  }, [running, interval, index]);

  return {
    running,
    handlers: {
      onTouchStart: () => setTouched(true),
      onTouchEnd: () => setTouched(false),
      onTouchCancel: () => setTouched(false),
      onPointerEnter: () => setHovered(true),
      onPointerLeave: () => setHovered(false),
      onFocus: () => setFocused(true),
      onBlur: () => setFocused(false),
    },
  };
};
