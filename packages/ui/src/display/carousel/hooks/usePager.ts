import { Children, useEffect, useRef, useState } from 'react';
import type { LayoutChangeEvent, NativeScrollEvent, NativeSyntheticEvent, ScrollViewInstance } from 'react-native';

import { useReducedMotion, useScrollPosition } from '@/core/animation';
import type { AnimatedInterpolation } from '@/core/animation/animation.types';
import { IS_WEB, KEY } from '@/core/core.constants';
import { useControllableState } from '@/core/hooks/useControllableState';
import { keyboardProps } from '@/core/utils/keyboard.utils';
import { CAROUSEL_ALIGN, ORIENTATION, SETTLE_MS } from '@/display/carousel/carousel.constants';
import type { CarouselProps } from '@/display/carousel/carousel.types';
import {
  copiesFor,
  edgePadding,
  indexAtOffset,
  nearestVirtual,
  positionRange,
  recenter,
  resolveItemSize,
  stepIndex,
  toReal,
} from '@/display/carousel/carousel.utils';
import { useAutoplay } from './useAutoplay';

type ScrollEvent = NativeSyntheticEvent<NativeScrollEvent>;
type Params = Pick<
  CarouselProps,
  'children' | 'value' | 'defaultValue' | 'onValueChange' | 'orientation' | 'itemWidth' | 'align' | 'loop' | 'autoplay'
> & { gap: number };

/**
 * A paging scroll view's state: which slide is shown, the scroll position the dots follow, and going to a slide by a
 * swipe, an arrow, a dot, a key or autoplay. A loop renders three copies and quietly jumps back to the middle one.
 */
export const usePager = ({
  children,
  value,
  defaultValue = 0,
  onValueChange,
  orientation = ORIENTATION.horizontal,
  itemWidth = '100%',
  align = CAROUSEL_ALIGN.center,
  loop = false,
  autoplay = false,
  gap,
}: Params) => {
  const horizontal = orientation === ORIENTATION.horizontal;
  const slides = Children.toArray(children);
  const count = slides.length;
  const copies = copiesFor(count, loop);
  const total = count * copies;
  const reduced = useReducedMotion();
  const scrollRef = useRef<ScrollViewInstance>(null);
  const [size, setSize] = useState(0);
  const item = resolveItemSize(itemWidth, size);
  const step = item + gap;
  const center = align === CAROUSEL_ALIGN.center;
  const lead = edgePadding(size, item, center);
  const trail = center ? lead : Math.max(0, size - item);

  const [stored, setStored] = useControllableState(value, defaultValue);
  const index = Math.min(Math.max(0, stored), Math.max(0, count - 1));
  // The latest index, for timers and scroll events between renders.
  const indexRef = useRef(index);
  indexRef.current = index;
  // The rendered slide being scrolled to or resting in view.
  const target = useRef(copies === 1 ? index : index + count);

  const scrollToVirtual = (virtual: number, animated: boolean) => {
    target.current = virtual;
    const offset = virtual * step;
    scrollRef.current?.scrollTo(horizontal ? { x: offset, animated } : { y: offset, animated });
  };

  /** A change the user made (or autoplay): store it and tell the app. */
  const select = (next: number) => {
    if (next === indexRef.current) return;
    indexRef.current = next;
    setStored(next);
    onValueChange?.(next);
  };

  const goTo = (next: number) => {
    if (count < 2 || step <= 0) return;
    scrollToVirtual(nearestVirtual(next, target.current, count, copies), !reduced);
    select(next);
  };

  const go = (delta: number) => {
    const next = stepIndex(indexRef.current, delta, count, loop);
    if (next === indexRef.current || step <= 0) return;
    if (copies === 1) return goTo(next);
    // Presses faster than the scroll settles can run off the copies: jump back to the middle one first.
    let from = target.current;
    if (from + delta < 0 || from + delta >= total) {
      from = toReal(from, count) + count;
      scrollToVirtual(from, false);
    }
    scrollToVirtual(from + delta, !reduced);
    select(next);
  };

  const settle = (offset: number) => {
    if (step <= 0 || count === 0) return;
    const virtual = indexAtOffset(offset, step, total);
    const middle = recenter(virtual, count, copies);
    if (middle === null) target.current = virtual;
    else scrollToVirtual(middle, false);
    select(toReal(virtual, count));
  };
  const settleRef = useRef(settle);
  settleRef.current = settle;
  const timer = useRef<ReturnType<typeof setTimeout> | undefined>(undefined);
  useEffect(() => () => clearTimeout(timer.current), []);
  const offsetOf = (e: ScrollEvent) => (horizontal ? e.nativeEvent.contentOffset.x : e.nativeEvent.contentOffset.y);
  const { position, onScroll } = useScrollPosition(horizontal, (e) => {
    const offset = offsetOf(e);
    clearTimeout(timer.current);
    timer.current = setTimeout(() => settleRef.current(offset), SETTLE_MS);
  });

  // `value` changed by the app: scroll there without telling it back.
  // biome-ignore lint/correctness/useExhaustiveDependencies: scrollToVirtual reads the latest step through this render.
  useEffect(() => {
    if (step <= 0 || toReal(target.current, count) === index) return;
    scrollToVirtual(nearestVirtual(index, target.current, count, copies), !reduced);
  }, [index, step, count, copies]);

  const autoplayState = useAutoplay(autoplay, index, count, () =>
    loop ? go(1) : goTo(indexRef.current === count - 1 ? 0 : indexRef.current + 1)
  );

  const range = positionRange(count, copies, step);
  const [prevKey, nextKey] = horizontal ? [KEY.left, KEY.right] : [KEY.up, KEY.down];

  return {
    slides,
    count,
    copies,
    index,
    horizontal,
    item,
    step,
    lead,
    trail,
    scrollRef,
    canGoBack: loop || index > 0,
    canGoForward: loop || index < count - 1,
    go,
    goTo,
    autoplay: autoplayState,
    /** The real slide, fractional mid-swipe; null until measured or with a single slide. */
    position: range ? (position.interpolate({ ...range, extrapolate: 'clamp' }) as AnimatedInterpolation) : null,
    keys: IS_WEB
      ? keyboardProps({
          [prevKey]: () => go(-1),
          [nextKey]: () => go(1),
          [KEY.home]: () => goTo(0),
          [KEY.end]: () => goTo(count - 1),
        })
      : {},
    scrollProps: {
      onScroll,
      scrollEventThrottle: 16,
      onMomentumScrollEnd: (e: ScrollEvent) => {
        clearTimeout(timer.current);
        settle(offsetOf(e));
      },
      // Re-measured (a rotation, a new item width): put the current slide back in place.
      onContentSizeChange: () => {
        if (step > 0) scrollToVirtual(target.current, false);
      },
      onLayout: (e: LayoutChangeEvent) => setSize(horizontal ? e.nativeEvent.layout.width : e.nativeEvent.layout.height),
      contentOffset: horizontal ? { x: target.current * step, y: 0 } : { x: 0, y: target.current * step },
    },
  };
};
