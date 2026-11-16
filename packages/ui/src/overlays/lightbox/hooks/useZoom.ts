import { useEffect, useRef, useState } from 'react';
import type { GestureResponderEvent, LayoutChangeEvent, NativeTouchEvent } from 'react-native';
import { PanResponder } from 'react-native';

import { EASE_OUT, timing, useAnimatedValue } from '@/core/animation';
import type { PanHandlers } from '@/core/core.types';
import { isVerticalSwipe } from '@/core/utils/swipe.utils';
import { DOUBLE_TAP_MS } from '@/overlays/lightbox/lightbox.constants';
import type { ZoomableImageProps, ZoomState } from '@/overlays/lightbox/lightbox.types';
import { clampPan, doubleTapZoom, shouldDismiss, touchCenter, touchDistance, zoomAround } from '@/overlays/lightbox/lightbox.utils';

const REST: ZoomState = { scale: 1, x: 0, y: 0 };
const point = (t: NativeTouchEvent) => ({
  x: t.locationX,
  y: t.locationY,
});

type Params = Pick<ZoomableImageProps, 'active' | 'command' | 'swipeToClose' | 'duration' | 'onZoomChange' | 'onDismissDrag' | 'onDismiss'>;

/**
 * One image's pinch, pan and double tap, and the drag down that closes the viewer. Swipes sideways at rest are left to
 * the pager; once zoomed, every drag pans the image instead.
 */
export const useZoom = ({ active, command, swipeToClose, duration, onZoomChange, onDismissDrag, onDismiss }: Params) => {
  const scale = useAnimatedValue(1);
  const x = useAnimatedValue(0);
  const y = useAnimatedValue(0);
  const dismiss = useAnimatedValue(0);
  const [zoomed, setZoomed] = useState(false);
  const size = useRef({ width: 0, height: 0 });
  const state = useRef<ZoomState>(REST);
  const g = useRef({ start: REST, distance: 0, touches: 0, dx: 0, dy: 0, mode: null as 'zoom' | 'dismiss' | null, tap: 0 }).current;
  const latest = useRef({ swipeToClose, onZoomChange, onDismissDrag, onDismiss, duration });
  latest.current = { swipeToClose, onZoomChange, onDismissDrag, onDismiss, duration };

  const show = (next: ZoomState, animated: boolean) => {
    state.current = next;
    for (const [value, to] of [
      [scale, next.scale],
      [x, next.x],
      [y, next.y],
    ] as const) {
      if (animated) timing(value, to, { duration: latest.current.duration }).start();
      else value.setValue(to);
    }
    const isZoomed = next.scale > 1;
    setZoomed((was) => {
      if (was !== isZoomed) latest.current.onZoomChange(isZoomed);
      return isZoomed;
    });
  };

  // Leaving an image resets it; a key's zoom applies to the image in view.
  // biome-ignore lint/correctness/useExhaustiveDependencies: `show` reads refs.
  useEffect(() => {
    if (!active && state.current.scale !== 1) show(REST, false);
  }, [active]);
  // biome-ignore lint/correctness/useExhaustiveDependencies: run once per command.
  useEffect(() => {
    if (active && command) show(zoomAround(state.current, command.scale, { x: 0, y: 0 }, size.current), true);
  }, [command?.id]);

  /** Re-anchors the gesture when a finger lands or lifts, so the image doesn't jump. */
  const rebase = (touches: readonly NativeTouchEvent[], dx: number, dy: number) => {
    g.start = state.current;
    g.touches = touches.length;
    g.dx = dx;
    g.dy = dy;
    const [a, b] = touches;
    if (a && b) g.distance = touchDistance(point(a), point(b));
  };

  const responder = useRef(
    PanResponder.create({
      onStartShouldSetPanResponder: (e) => e.nativeEvent.touches.length === 2,
      onMoveShouldSetPanResponder: (e, gesture) =>
        e.nativeEvent.touches.length === 2 ||
        state.current.scale > 1 ||
        (latest.current.swipeToClose && gesture.dy > 0 && isVerticalSwipe(gesture.dx, gesture.dy)),
      onPanResponderTerminationRequest: () => false,
      onPanResponderGrant: (e, gesture) => {
        g.mode = e.nativeEvent.touches.length === 2 || state.current.scale > 1 ? 'zoom' : 'dismiss';
        rebase(e.nativeEvent.touches, gesture.dx, gesture.dy);
      },
      onPanResponderMove: (e: GestureResponderEvent, gesture) => {
        const { touches } = e.nativeEvent;
        if (g.mode === 'dismiss') {
          dismiss.setValue(Math.max(0, gesture.dy));
          latest.current.onDismissDrag(Math.max(0, gesture.dy));
          return;
        }
        if (touches.length !== g.touches) rebase(touches, gesture.dx, gesture.dy);
        const [a, b] = touches;
        const { width, height } = size.current;
        const panned = { ...g.start, x: g.start.x + gesture.dx - g.dx, y: g.start.y + gesture.dy - g.dy };
        if (a && b && g.distance > 0) {
          const center = touchCenter(point(a), point(b));
          const focal = { x: center.x - width / 2, y: center.y - height / 2 };
          show(zoomAround(panned, (g.start.scale * touchDistance(point(a), point(b))) / g.distance, focal, size.current), false);
        } else show(clampPan(panned, size.current), false);
      },
      onPanResponderRelease: (_, gesture) => {
        if (g.mode === 'dismiss') {
          if (shouldDismiss(gesture.dy, gesture.vy)) latest.current.onDismiss();
          else {
            timing(dismiss, 0, { duration: latest.current.duration, easing: EASE_OUT }).start();
            latest.current.onDismissDrag(0);
          }
        }
        g.mode = null;
      },
      onPanResponderTerminate: () => {
        g.mode = null;
        dismiss.setValue(0);
        latest.current.onDismissDrag(0);
      },
    })
  ).current;

  return {
    scale,
    x,
    y,
    dismiss,
    zoomed,
    panHandlers: responder.panHandlers as PanHandlers,
    onLayout: (e: LayoutChangeEvent) => {
      size.current = { width: e.nativeEvent.layout.width, height: e.nativeEvent.layout.height };
    },
    /** A second tap soon after the first zooms in there, or back out. */
    onPress: (e: GestureResponderEvent) => {
      const now = Date.now();
      if (now - g.tap < DOUBLE_TAP_MS) {
        g.tap = 0;
        show(doubleTapZoom(state.current, { x: e.nativeEvent.locationX, y: e.nativeEvent.locationY }, size.current), true);
      } else g.tap = now;
    },
  };
};
