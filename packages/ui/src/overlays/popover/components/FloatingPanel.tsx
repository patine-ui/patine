import { useState } from 'react';

import { useReducedMotion } from '@/core/animation/hooks/useReducedMotion';
import { AnimatedView, View } from '@/core/primitives/View';
import { useDirection } from '@/core/theme/ThemeProvider';
import { POPOVER_ALIGN, POPOVER_SIDE, SIDE_SHIFT } from '@/overlays/popover/popover.constants';
import { styles } from '@/overlays/popover/popover.styles';
import type { FloatingPanelProps, Size } from '@/overlays/popover/popover.types';
import { getArrowFrame, getArrowTint, getPanelPlace, getPlacement } from '@/overlays/popover/popover.utils';

/** A panel beside its trigger: measured, then placed, flipped and kept in `area`. It fades in, and slides a little unless motion is reduced. */
export const FloatingPanel = ({
  trigger,
  area,
  side = POPOVER_SIDE.bottom,
  align = POPOVER_ALIGN.center,
  sideOffset,
  progress,
  arrowColor,
  ready = true,
  style,
  children,
  ...rest
}: FloatingPanelProps) => {
  const rtl = useDirection() === 'rtl';
  const reduceMotion = useReducedMotion();
  const [size, setSize] = useState<Size | null>(null);
  const placement = size && getPlacement({ trigger, size, area, side, align, sideOffset, rtl });
  const shift = SIDE_SHIFT[placement?.side ?? side];
  const slide = progress.interpolate({ inputRange: [0, 1], outputRange: [shift.from, 0] });
  // Animated values: the panel fades in once placed, and slides from its side unless reducing motion.
  const motion = {
    opacity: ready && placement ? progress : 0,
    transform: reduceMotion ? [] : [shift.axis === 'translateX' ? { translateX: slide } : { translateY: slide }],
  };

  return (
    <AnimatedView
      {...rest}
      onLayout={(e) => {
        const { width, height } = e.nativeEvent.layout;
        setSize((prev) => (prev?.width === width && prev.height === height ? prev : { width, height }));
      }}
      style={[styles.panel, style, getPanelPlace(placement, area.width), motion]}
    >
      {children}
      {arrowColor && placement && size ? (
        <View pointerEvents="none" style={[styles.arrow, getArrowTint(arrowColor), getArrowFrame(placement, size)]} />
      ) : null}
    </AnimatedView>
  );
};
