import { useCallback, useRef, useState } from 'react';
import type { GestureResponderEvent, HostInstance } from 'react-native';
import { Easing } from 'react-native';

import { DURATION, RELEASE_SPRING } from '@/core/animation/animation.constants';
import { spring, timing } from '@/core/animation/animation.utils';
import { useAnimatedTo } from '@/core/animation/hooks/useAnimatedTo';
import { useAnimatedValue } from '@/core/animation/hooks/useAnimatedValue';
import { isReducedMotion } from '@/core/animation/motion.utils';
import {
  PRESS_FEEDBACK,
  PRESS_FEEDBACK_DESIGN,
  PRESS_SCALE_DESIGN,
  RIPPLE_FADE_RATIO,
  RIPPLE_GROW_RATIO,
  RIPPLE_MIN_VISIBLE_RATIO,
} from '@/core/core.constants';
import type { RippleOrigin, TouchFeedbackState } from '@/core/core.types';
import type { Theme } from '@/core/theme/theme.types';
import { getRippleOrigin } from '@/core/utils/touch.utils';

/**
 * Hover and press state for a pressable: an eased hover tint, then a ripple or a dim while held, as the theme's design does
 * it, and with `scaleOnPress` a slight shrink that springs back. `ref` goes on the view the effects cover (the ripple is
 * measured against it), `handlers` on the Pressable, `pressScale` in its transform, and `feedback` on a <TouchFeedback />
 * inside that view.
 */
export const useTouchFeedback = (theme: Theme, disabled = false, feedbackEnabled = true, scaleOnPress = false): TouchFeedbackState => {
  const ref = useRef<HostInstance>(null);
  const [hovered, setHovered] = useState(false);
  const [pressed, setPressed] = useState(false);
  const highlight = PRESS_FEEDBACK_DESIGN[theme.design] === PRESS_FEEDBACK.highlight;
  const shrinkTo = scaleOnPress ? PRESS_SCALE_DESIGN[theme.design] : 1;
  const [ripple, setRipple] = useState<RippleOrigin | null>(null);
  const hover = useAnimatedTo(hovered && !disabled ? 1 : 0, { duration: DURATION.fast });
  const press = useAnimatedValue(0);
  const pressScale = useAnimatedValue(1);
  const scale = useAnimatedValue(0);
  const opacity = useAnimatedValue(0);
  const pressing = useRef(false);
  const pressedAt = useRef(0);
  const grownAt = useRef(0);
  const duration = theme.animation.duration;
  const growDuration = duration * RIPPLE_GROW_RATIO;

  const fadeOut = useCallback(() => {
    const delay = Math.max(0, growDuration * RIPPLE_MIN_VISIBLE_RATIO - (Date.now() - grownAt.current));
    timing(opacity, 0, { duration: duration * RIPPLE_FADE_RATIO, delay }).start();
  }, [duration, growDuration, opacity]);

  const onPressIn = useCallback(
    (e: GestureResponderEvent) => {
      if (disabled) return;
      setPressed(true);
      pressing.current = true;
      pressedAt.current = Date.now();
      // A shrink is motion: with reduce motion on, the dim or ripple alone answers the press.
      if (shrinkTo < 1 && !isReducedMotion()) timing(pressScale, shrinkTo, { duration: DURATION.instant }).start();
      if (!feedbackEnabled) return;
      if (highlight) {
        timing(press, 1, { duration: DURATION.instant }).start();
        return;
      }
      const { pageX, pageY } = e.nativeEvent;
      ref.current?.measure((_x, _y, width, height, left, top) => {
        setRipple(getRippleOrigin(pageX - left, pageY - top, width, height));
        scale.setValue(0);
        opacity.setValue(1);
        grownAt.current = Date.now();
        timing(scale, 1, { duration: growDuration, easing: Easing.out(Easing.quad) }).start();
        // A quick tap can lift before the measurement arrives; fade right away so the ripple doesn't stick.
        if (!pressing.current) fadeOut();
      });
    },
    [disabled, fadeOut, feedbackEnabled, growDuration, highlight, opacity, press, pressScale, scale, shrinkTo]
  );

  const onPressOut = useCallback(() => {
    setPressed(false);
    pressing.current = false;
    // A quick tap still shows the press before letting go of it.
    const delay = Math.max(0, DURATION.instant - (Date.now() - pressedAt.current));
    spring(pressScale, 1, { ...RELEASE_SPRING, delay }).start();
    timing(press, 0, { duration, delay }).start();
    fadeOut();
  }, [duration, fadeOut, press, pressScale]);

  const onHoverIn = useCallback(() => setHovered(true), []);
  const onHoverOut = useCallback(() => setHovered(false), []);

  return {
    ref,
    pressed: pressed && !disabled,
    pressScale,
    handlers: {
      onPressIn,
      onPressOut,
      onHoverIn,
      onHoverOut,
    },
    feedback: {
      hover,
      press,
      ripple,
      scale,
      opacity,
      theme,
    },
  };
};
