import { useMemo } from 'react';
import type { Animated } from 'react-native';

import { useReturnFocus } from '@/core/a11y/hooks/useReturnFocus';
import { usePresence } from '@/core/animation/hooks/usePresence';
import { IS_WEB } from '@/core/core.constants';
import { useScrollLock } from '@/core/hooks/useScrollLock';
import type { DialogContextValue } from '@/overlays/dialog/dialog.types';

/**
 * Fades the dialog in and out, and wires how it closes: the backdrop (not for an AlertDialog), and Escape, Android back
 * or the iOS screen-reader escape gesture, unless it isn't dismissible. Focus goes back to the opener when it closes, and
 * the web page behind doesn't scroll while it's open.
 */
export const useDialogContent = ({ open, setOpen, dismissible, alert, initialFocus, theme, look }: DialogContextValue) => {
  const { mounted, progress }: { mounted: boolean; progress: Animated.Value } = usePresence({
    visible: open,
    duration: theme.animation.duration,
  });
  useReturnFocus(mounted);
  useScrollLock(mounted);
  const scale: Animated.AnimatedInterpolation<number> = useMemo(
    () => progress.interpolate({ inputRange: [0, 1], outputRange: [look.scaleFrom, 1] }),
    [progress, look.scaleFrom]
  );
  // While it fades out, a second press or Escape doesn't report closing again.
  const close = () => {
    if (open) setOpen(false);
  };
  const onRequestClose = () => {
    if (dismissible) close();
  };

  return {
    mounted,
    progress,
    scale,
    /** The backdrop's fade */
    fade: { opacity: progress },
    /** The card's fade and grow */
    pop: { opacity: progress, transform: [{ scale }] },
    onRequestClose,
    onBackdropPress: dismissible && !alert ? close : undefined,
    // The web's modal moves focus to the first control once shown; a frame later, Cancel takes it if there is one.
    onShow: () => {
      if (IS_WEB) requestAnimationFrame(() => initialFocus.current?.focus());
    },
  };
};
