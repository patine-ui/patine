import { useRef } from 'react';
import { PanResponder } from 'react-native';

import type { DragOptions, PanHandlers } from '@/core/core.types';
import { isHorizontalSwipe, isVerticalSwipe } from '@/core/utils/swipe.utils';
import { scaleGesture, toLayoutScale } from '@/core/utils/touch.utils';

/** A drag that's clearly sideways, or up or down with `vertical`, leaving taps and other drags to what's under it. */
export const useDrag = (options: DragOptions): PanHandlers => {
  // The responder is created once, so it reads the latest callbacks through a ref.
  const latest = useRef(options);
  latest.current = options;
  // Inside a zoomed region (a phone mock on the web) the pointer moves in screen pixels; the drag follows in layout pixels.
  const scale = useRef(1);
  return useRef(
    PanResponder.create({
      onMoveShouldSetPanResponder: (_, g) => (latest.current.vertical ? isVerticalSwipe(g.dx, g.dy) : isHorizontalSwipe(g.dx, g.dy)),
      onPanResponderGrant: (e) => {
        scale.current = toLayoutScale(e.currentTarget);
        latest.current.onStart?.();
      },
      onPanResponderMove: (_, g) => latest.current.onMove?.(scaleGesture(g, scale.current)),
      onPanResponderRelease: (_, g) => latest.current.onEnd?.(scaleGesture(g, scale.current)),
      onPanResponderTerminate: () => latest.current.onCancel?.(),
    })
  ).current.panHandlers;
};
