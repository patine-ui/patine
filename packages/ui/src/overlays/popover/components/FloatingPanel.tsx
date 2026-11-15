import { useState } from 'react';
import { Animated, I18nManager, View } from 'react-native';

import { useReducedMotion } from '@/core/animation/hooks/useReducedMotion';
import { EDGE_MARGIN, POPOVER_ALIGN, POPOVER_SIDE, SIDE_SHIFT } from '@/overlays/popover/popover.constants';
import { styles } from '@/overlays/popover/popover.styles';
import type { FloatingPanelProps, Size } from '@/overlays/popover/popover.types';
import { getArrowFrame, getPlacement } from '@/overlays/popover/popover.utils';

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
  const reduceMotion = useReducedMotion();
  const [size, setSize] = useState<Size | null>(null);
  const placement = size && getPlacement({ trigger, size, area, side, align, sideOffset, rtl: I18nManager.isRTL });
  const shift = SIDE_SHIFT[placement?.side ?? side];
  const slide = progress.interpolate({ inputRange: [0, 1], outputRange: [shift.from, 0] });

  return (
    <Animated.View
      {...rest}
      onLayout={(e) => {
        const { width, height } = e.nativeEvent.layout;
        setSize((prev) => (prev?.width === width && prev.height === height ? prev : { width, height }));
      }}
      style={[
        styles.panel,
        { maxWidth: area.width - EDGE_MARGIN * 2 },
        style,
        {
          left: placement?.x ?? 0,
          top: placement?.y ?? 0,
          opacity: ready && placement ? progress : 0,
          transform: reduceMotion ? [] : [shift.axis === 'translateX' ? { translateX: slide } : { translateY: slide }],
        },
      ]}
    >
      {children}
      {arrowColor && placement && size ? (
        <View pointerEvents="none" style={[styles.arrow, { borderBottomColor: arrowColor }, getArrowFrame(placement, size)]} />
      ) : null}
    </Animated.View>
  );
};
