import { clamp } from '@/core/utils/track.utils';
import type { ItemSize } from './carousel.types';

/** Loop renders the slides three times and keeps the middle copy in view, so either neighbour is always there. */
export const copiesFor = (count: number, loop: boolean) => (loop && count > 1 ? 3 : 1);

/** `itemWidth` in points: a number as is, a percentage of the container. */
export const resolveItemSize = (size: ItemSize, container: number) =>
  typeof size === 'number' ? size : (container * Number.parseFloat(size)) / 100;

/** Space before the first slide, so a narrower slide can rest in the middle. */
export const edgePadding = (container: number, item: number, center: boolean) => (center ? Math.max(0, (container - item) / 2) : 0);

/** The slide nearest a scroll offset, among `total` rendered ones. */
export const indexAtOffset = (offset: number, step: number, total: number) =>
  step > 0 ? clamp(Math.round(offset / step), 0, total - 1) : 0;

/** A rendered slide's real index. */
export const toReal = (virtual: number, count: number) => (count > 0 ? ((virtual % count) + count) % count : 0);

/** The rendered slide for `index` closest to `from`, so going from the last slide to the first moves one step forward. */
export const nearestVirtual = (index: number, from: number, count: number, copies: number) => {
  if (copies === 1) return index;
  const base = from - toReal(from, count);
  const candidates = [base - count + index, base + index, base + count + index].filter((v) => v >= 0 && v < count * copies);
  return candidates.reduce((best, v) => (Math.abs(v - from) < Math.abs(best - from) ? v : best), candidates[0] ?? index + count);
};

/** In a loop, the same slide in the middle copy when `virtual` has drifted into an outer one; otherwise null. */
export const recenter = (virtual: number, count: number, copies: number) => {
  if (copies === 1 || (virtual >= count && virtual < 2 * count)) return null;
  return toReal(virtual, count) + count;
};

/** Where a step of `delta` lands: wrapped in a loop, held at the ends otherwise. */
export const stepIndex = (index: number, delta: number, count: number, loop: boolean) =>
  loop ? toReal(index + delta, count) : clamp(index + delta, 0, count - 1);

/** Fills `{page}` and `{count}` in a label. */
export const formatSlideLabel = (template: string, page: number, count: number) =>
  template.replace('{page}', String(page)).replace('{count}', String(count));

/**
 * Maps the scroll offset to the real page, fractional mid-swipe, for the dots to follow. In a loop the step from the last
 * slide to the next copy's first runs the mark back to the start.
 */
export const positionRange = (count: number, copies: number, step: number) => {
  const total = count * copies;
  const inputRange = Array.from({ length: total }, (_, v) => v * step);
  const outputRange = inputRange.map((_, v) => toReal(v, count));
  return total > 1 && step > 0
    ? {
        inputRange,
        outputRange,
      }
    : null;
};

/** The track's spacing: the gap between slides, and the room before the first and after the last so they can center. */
export const getTrackStyle = (gap: number, horizontal: boolean, lead: number, trail: number) =>
  horizontal
    ? {
        gap,
        paddingLeft: lead,
        paddingRight: trail,
      }
    : {
        gap,
        paddingTop: lead,
        paddingBottom: trail,
      };

/** An arrow's place over the carousel's edge, centered on the cross axis. */
export const getArrowPlace = (vertical: boolean, forward: boolean, size: number, edge: number) =>
  vertical
    ? { left: '50%' as const, marginLeft: -size / 2, ...(forward ? { bottom: edge } : { top: edge }) }
    : { top: '50%' as const, marginTop: -size / 2, ...(forward ? { right: edge } : { left: edge }) };
