import { clamp } from '@/core/utils/track.utils';
import { DISMISS, ZOOM } from './lightbox.constants';
import type { ZoomState } from './lightbox.types';

interface Size {
  width: number;
  height: number;
}

interface Point {
  x: number;
  y: number;
}

export const clampScale = (scale: number) => clamp(scale, 1, ZOOM.max);

/** How far a zoomed image can move from centre before its edge leaves the frame's edge. */
export const maxPan = (scale: number, size: number) => Math.max(0, (size * scale - size) / 2);

/** The pan held inside the frame. */
export const clampPan = (state: ZoomState, size: Size): ZoomState => {
  const mx = maxPan(state.scale, size.width);
  const my = maxPan(state.scale, size.height);
  return {
    scale: state.scale,
    // `+ 0` turns -0 into 0.
    x: clamp(state.x, -mx, mx) + 0,
    y: clamp(state.y, -my, my) + 0,
  };
};

/** Zooms to `scale` keeping `focal` (from the frame's centre) still under the finger, then holds the pan in the frame. */
export const zoomAround = (from: ZoomState, scale: number, focal: Point, size: Size): ZoomState => {
  const next = clampScale(scale);
  const ratio = next / from.scale;
  return clampPan(
    {
      scale: next,
      x: focal.x - (focal.x - from.x) * ratio,
      y: focal.y - (focal.y - from.y) * ratio,
    },
    size
  );
};

/** A double tap: zoom in at the tap, or back out when already zoomed. `tap` is from the frame's top left. */
export const doubleTapZoom = (from: ZoomState, tap: Point, size: Size): ZoomState =>
  from.scale > 1
    ? {
        scale: 1,
        x: 0,
        y: 0,
      }
    : zoomAround(from, ZOOM.step, { x: tap.x - size.width / 2, y: tap.y - size.height / 2 }, size);

/** The distance between two touches. */
export const touchDistance = (a: Point, b: Point) => Math.hypot(a.x - b.x, a.y - b.y);

/** The point between two touches. */
export const touchCenter = (a: Point, b: Point): Point => ({
  x: (a.x + b.x) / 2,
  y: (a.y + b.y) / 2,
});

/** Whether a released downward drag closes the viewer. */
export const shouldDismiss = (dy: number, vy: number) => dy > DISMISS.distance || (dy > 0 && vy > DISMISS.velocity);

/** The backdrop's opacity as an image is dragged away. */
export const dismissOpacity = (dy: number) => Math.max(0, 1 - Math.abs(dy) / DISMISS.fade);

/** The top bar clears the status bar. */
export const getBarInset = (top: number) => ({ paddingTop: top });

/** A centred counter sits below the status bar, `gap` down. */
export const getCounterPlace = (top: number, gap: number) => ({ top: top + gap });
