import { useEffect, useRef } from 'react';

/**
 * Calls `onExpire` after `duration` ms, counting only while not `paused`: a pause keeps the time left. A new `restart` key
 * (the updated toast) starts the full duration again. `Infinity` never expires.
 */
export const useToastTimer = (duration: number, paused: boolean, restart: unknown, onExpire: () => void) => {
  const remaining = useRef(duration);
  const expire = useRef(onExpire);
  expire.current = onExpire;

  // biome-ignore lint/correctness/useExhaustiveDependencies: `restart` only signals an update, to start the duration again
  useEffect(() => {
    remaining.current = duration;
  }, [duration, restart]);

  // biome-ignore lint/correctness/useExhaustiveDependencies: `restart` only signals an update, to start the duration again
  useEffect(() => {
    if (paused || !Number.isFinite(remaining.current)) return;
    const start = Date.now();
    const timer = setTimeout(() => expire.current(), remaining.current);
    return () => {
      clearTimeout(timer);
      remaining.current -= Date.now() - start;
    };
  }, [duration, paused, restart]);
};
