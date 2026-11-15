import { useEffect, useMemo, useState } from 'react';
import { AccessibilityInfo, type Animated } from 'react-native';

import { spring, useAnimatedValue, usePresence, useReducedMotion } from '@/core/animation';
import { IS_WEB } from '@/core/core.constants';
import { useDrag } from '@/core/hooks/useDrag';
import { getSwipeDelta } from '@/core/utils/swipe.utils';
import { TOAST_ENTER_OFFSET, TOAST_POSITION } from '@/feedback/toast/toast.constants';
import type { ToastData, ToastPosition } from '@/feedback/toast/toast.types';
import { dismissToast, getToastAnnouncement, getToastDuration, isAssertive, removeToast } from '@/feedback/toast/toast.utils';
import { useToastTimer } from './useToastTimer';

interface Options {
  /** The Toaster's default duration */
  duration: number;
  animationDuration: number;
  position: ToastPosition;
}

/**
 * One toast's life: it slides in (fades only when reducing motion), closes on its timer, which pauses while it's touched or
 * hovered, swipes away sideways, and on iOS and Android has the screen reader say it.
 */
export const useToastItem = (t: ToastData, { duration, animationDuration, position }: Options) => {
  const [hovered, setHovered] = useState(false);
  const [pressed, setPressed] = useState(false);
  const reduceMotion = useReducedMotion();
  const drag = useAnimatedValue(0);
  const presence = usePresence({
    visible: t.open,
    duration: animationDuration,
    onHidden: () => removeToast(t.id),
  });
  const dismiss = () => dismissToast(t.id);

  useToastTimer(getToastDuration(t, duration), hovered || pressed || !t.open, t, dismiss);

  // Native live regions don't read a view that's just been added; the web's role="status" and role="alert" do.
  const announcement = getToastAnnouncement(t);
  useEffect(() => {
    if (IS_WEB || !t.open) return;
    AccessibilityInfo.announceForAccessibilityWithOptions(announcement, { queue: !isAssertive(t.type) });
  }, [announcement, t.open, t.type]);

  const panHandlers = useDrag({
    onStart: () => setPressed(true),
    onMove: ({ dx }) => drag.setValue(dx),
    onEnd: ({ dx, vx }) => {
      setPressed(false);
      if (getSwipeDelta(dx, vx, false)) dismiss();
      else spring(drag, 0).start();
    },
    onCancel: () => {
      setPressed(false);
      spring(drag, 0).start();
    },
  });

  const enterFrom = reduceMotion ? 0 : position === TOAST_POSITION.top ? -TOAST_ENTER_OFFSET : TOAST_ENTER_OFFSET;
  const style: {
    opacity: Animated.Value;
    transform: ({ translateY: Animated.AnimatedInterpolation<number> } | { translateX: Animated.Value })[];
  } = useMemo(
    () => ({
      opacity: presence.progress,
      transform: [
        { translateY: presence.progress.interpolate<number>({ inputRange: [0, 1], outputRange: [enterFrom, 0] }) },
        { translateX: drag },
      ],
    }),
    [drag, enterFrom, presence.progress]
  );

  return {
    mounted: presence.mounted,
    style,
    dismiss,
    onAction: () => {
      t.action?.onPress();
      dismiss();
    },
    handlers: {
      ...panHandlers,
      onTouchStart: () => setPressed(true),
      onTouchEnd: () => setPressed(false),
      onTouchCancel: () => setPressed(false),
      onPointerEnter: () => setHovered(true),
      onPointerLeave: () => setHovered(false),
      onAccessibilityEscape: dismiss,
    },
  };
};
