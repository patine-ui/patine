import { useEffect, useRef, useState } from 'react';

import { EASE_IN, EASE_OUT } from '@/core/animation/animation.constants';
import type { Presence, PresenceOptions } from '@/core/animation/animation.types';
import { afterPaint, timing } from '@/core/animation/animation.utils';
import { useAnimatedValue } from './useAnimatedValue';

/** Mounts when `visible` turns on and animates `progress` in; on hide it animates out first and unmounts after. */
export const usePresence = ({ visible, duration, enterDuration = duration, native, onShown, onHidden }: PresenceOptions): Presence => {
  const [mounted, setMounted] = useState(visible);
  const progress = useAnimatedValue(0);
  const callbacks = useRef({ onShown, onHidden });
  callbacks.current = { onShown, onHidden };

  useEffect(() => {
    // Mount first, and animate in once that frame is painted: started together, a heavy mount (a Modal) eats the
    // opening frames and the content shows up already half faded in.
    if (visible && !mounted) {
      setMounted(true);
      return;
    }
    if (visible) {
      return afterPaint(() =>
        timing(progress, 1, { duration: enterDuration, easing: EASE_OUT, native }).start(({ finished }) => {
          if (finished) callbacks.current.onShown?.();
        })
      );
    }
    if (mounted) {
      timing(progress, 0, { duration, easing: EASE_IN, native }).start(({ finished }) => {
        if (!finished) return;
        setMounted(false);
        callbacks.current.onHidden?.();
      });
    }
  }, [duration, enterDuration, mounted, native, progress, visible]);

  return {
    mounted,
    progress,
  };
};
