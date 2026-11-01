import { useMemo } from 'react';

import { usePresence } from '@/core/animation/hooks/usePresence';
import { OPEN_EXTRA_DURATION_MS } from '@/overlays/sheet/sheet.constants';
import type { SheetAnimation, SheetAnimationOptions } from '@/overlays/sheet/sheet.types';

/** Slides the sheet in when `visible` turns on and unmounts it after sliding out. */
export const useSheetAnimation = ({ visible, duration, slideDistance, onOpened, onClosed }: SheetAnimationOptions): SheetAnimation => {
  const { mounted, progress } = usePresence({
    visible,
    duration,
    enterDuration: duration + OPEN_EXTRA_DURATION_MS,
    onShown: onOpened,
    onHidden: onClosed,
  });
  const slide = useMemo(() => progress.interpolate({ inputRange: [0, 1], outputRange: [slideDistance, 0] }), [progress, slideDistance]);

  return {
    mounted,
    progress,
    slide,
  };
};
