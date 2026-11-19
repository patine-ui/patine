import { useEffect, useRef, useState } from 'react';
import type { LayoutChangeEvent, NativeScrollEvent, NativeSyntheticEvent, ScrollViewInstance } from 'react-native';
import { PanResponder } from 'react-native';

import { announce } from '@/core/a11y/a11y.utils';
import { EASE_OUT, timing, useAnimatedValue } from '@/core/animation';
import { IS_WEB } from '@/core/core.constants';
import type { HostRef, PanHandlers } from '@/core/core.types';
import type { Theme } from '@/core/theme/theme.types';
import { clamp } from '@/core/utils/track.utils';
import { AUTO_SCROLL } from '@/display/sortable/sortable.constants';
import type { RowLayout, SortableLabels, SortableListProps } from '@/display/sortable/sortable.types';
import { autoScrollSpeed, dropIndex, formatPosition, moveItem, rowSpan, settleOffset, shiftFor } from '@/display/sortable/sortable.utils';

type Params<T> = Pick<SortableListProps<T>, 'data' | 'keyExtractor' | 'onReorder' | 'onDragStart' | 'disabled'> & {
  theme: Theme;
  labels: SortableLabels;
};

/** Gesture page coordinates on the web include the page's scroll; layout ones don't. */
const pageScroll = () => (IS_WEB ? ((globalThis as { scrollY?: number }).scrollY ?? 0) : 0);

/**
 * Drag to reorder: a row lifts (a long press or a handle), follows the finger while the others make way, scrolls the list
 * near its edges, and settles in its new place, then `onReorder` gets the new order. Keys and screen-reader actions move a
 * row one place at a time.
 */
export const useSortable = <T>({ data, keyExtractor, onReorder, onDragStart, disabled = false, theme, labels }: Params<T>) => {
  const keys = data.map(keyExtractor);
  const scrollRef = useRef<ScrollViewInstance>(null);
  const rootRef = useRef<HostRef>(null);
  const layouts = useRef(new Map<string, RowLayout>());
  const drag = useAnimatedValue(0);
  const [active, setActive] = useState<{ key: string; from: number } | null>(null);
  const [hover, setHover] = useState(-1);
  const [grabbed, setGrabbed] = useState<string | null>(null);
  const g = useRef({
    dy: 0,
    fingerY: 0,
    scroll: 0,
    startScroll: 0,
    viewportTop: 0,
    viewportHeight: 0,
    content: 0,
    granted: false,
    dropping: false,
    frame: 0,
  }).current;
  // Gesture callbacks are created once; they read the latest render through this.
  const latest = useRef({ data, keys, active, hover, onReorder });
  latest.current = { data, keys, active, hover, onReorder };

  const ordered = () => latest.current.keys.map((key) => layouts.current.get(key) ?? { y: 0, height: 0 });
  const offset = () => g.dy + g.scroll - g.startScroll;

  const follow = () => {
    const current = latest.current.active;
    if (!current) return;
    drag.setValue(offset());
    const to = dropIndex(ordered(), current.from, offset());
    if (to !== latest.current.hover) {
      latest.current.hover = to;
      setHover(to);
    }
  };

  const announceMove = (index: number) => announce(formatPosition(labels.moved, index + 1, latest.current.data.length));

  const stopScrolling = () => cancelAnimationFrame(g.frame);
  // Near the top or bottom while dragging, scroll a little every frame, and keep the row under the finger.
  const autoScroll = () => {
    if (!latest.current.active) return;
    const speed = g.granted ? autoScrollSpeed(g.fingerY - g.viewportTop, g.viewportHeight, AUTO_SCROLL.edge, AUTO_SCROLL.speed) : 0;
    const next = clamp(g.scroll + speed, 0, Math.max(0, g.content - g.viewportHeight));
    if (next !== g.scroll) {
      g.scroll = next;
      scrollRef.current?.scrollTo({ y: next, animated: false });
      follow();
    }
    g.frame = requestAnimationFrame(autoScroll);
  };

  const lift = (index: number) => {
    const key = latest.current.keys[index];
    if (disabled || latest.current.active || g.dropping || key === undefined) return;
    g.dy = 0;
    g.startScroll = g.scroll;
    g.granted = false;
    drag.setValue(0);
    rootRef.current?.measureInWindow((_x, y, _w, height) => {
      g.viewportTop = y;
      g.viewportHeight = height;
    });
    latest.current.active = { key, from: index };
    latest.current.hover = index;
    setActive({ key, from: index });
    setHover(index);
    onDragStart?.(index);
    g.frame = requestAnimationFrame(autoScroll);
  };

  const drop = () => {
    stopScrolling();
    const current = latest.current.active;
    if (!current || g.dropping) return;
    g.dropping = true;
    const { from } = current;
    const to = latest.current.hover < 0 ? from : latest.current.hover;
    timing(drag, settleOffset(ordered(), from, to), { duration: theme.animation.duration, easing: EASE_OUT }).start(() => {
      g.dropping = false;
      if (to !== from) {
        latest.current.onReorder(moveItem(latest.current.data, from, to), { from, to });
        announceMove(to);
      }
      latest.current.active = null;
      setActive(null);
      setHover(-1);
    });
  };

  // A long press or handle press that ends without dragging: the list never took the gesture, so drop here. Deferred, as
  // the press also ends when the list takes over the gesture.
  const release = () => {
    setTimeout(() => {
      if (!g.granted) drop();
    }, 0);
  };

  const responder = useRef(
    PanResponder.create({
      onMoveShouldSetPanResponderCapture: () => !!latest.current.active && !g.dropping,
      onPanResponderGrant: () => {
        g.granted = true;
      },
      onPanResponderMove: (_, gesture) => {
        g.dy = gesture.dy;
        g.fingerY = gesture.moveY - pageScroll();
        follow();
      },
      onPanResponderRelease: () => drop(),
      onPanResponderTerminate: () => drop(),
      onPanResponderTerminationRequest: () => false,
    })
  ).current;

  useEffect(() => () => cancelAnimationFrame(g.frame), [g]);

  /** A key or screen-reader action: move the row at `index` by one place, at once. */
  const move = (index: number, delta: number) => {
    const to = index + delta;
    if (disabled || to < 0 || to >= latest.current.data.length) return;
    latest.current.onReorder(moveItem(latest.current.data, index, to), { from: index, to });
    announceMove(to);
  };

  const span = active ? rowSpan(ordered(), active.from) : 0;

  return {
    keys,
    rootRef,
    scrollRef,
    drag,
    active,
    grabbed,
    panHandlers: responder.panHandlers as PanHandlers,
    shiftOf: (index: number) => (active ? shiftFor(index, active.from, hover, span) : 0),
    lift,
    release,
    move,
    grab: setGrabbed,
    onRowLayout: (key: string, layout: RowLayout) => {
      layouts.current.set(key, layout);
    },
    onScroll: (e: NativeSyntheticEvent<NativeScrollEvent>) => {
      g.scroll = e.nativeEvent.contentOffset.y;
    },
    onContentSizeChange: (_w: number, height: number) => {
      g.content = height;
    },
    onLayout: (e: LayoutChangeEvent) => {
      g.viewportHeight = e.nativeEvent.layout.height;
    },
  };
};
