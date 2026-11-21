import type { ViewStyle } from 'react-native';

import type { RippleOrigin } from '@/core/core.types';

/** A ripple centred on the touch point, big enough to reach the element's farthest corner. */
export const getRippleOrigin = (x: number, y: number, width: number, height: number): RippleOrigin => ({
  x,
  y,
  radius: Math.hypot(Math.max(x, width - x), Math.max(y, height - y)),
});

const numeric = (value: unknown) => (typeof value === 'number' ? value : undefined);

/** A control's drawn size from its flattened style: its width and height, or their minimums; undefined when not a number. */
export const touchSize = (style: ViewStyle | undefined): [number | undefined, number | undefined] => [
  numeric(style?.width) ?? numeric(style?.minWidth),
  numeric(style?.height) ?? numeric(style?.minHeight),
];

/** The ripple's circle, centred on the touch point. */
export const getRippleBox = (ripple: RippleOrigin) => ({
  left: ripple.x - ripple.radius,
  top: ripple.y - ripple.radius,
  width: ripple.radius * 2,
  height: ripple.radius * 2,
  borderRadius: ripple.radius,
});

/** Corners that follow the pressable's own. */
export const roundOf = (borderRadius: number | undefined) => ({ borderRadius });

interface Measurable {
  offsetWidth: number;
  getBoundingClientRect(): { width: number };
}

const isMeasurable = (node: unknown): node is Measurable =>
  typeof node === 'object' && node !== null && 'offsetWidth' in node && 'getBoundingClientRect' in node;

/**
 * Layout pixels per pointer pixel on the touched element. 1 on native; on the web, more than 1 inside a CSS-zoomed or
 * scaled-down region (a phone mock, a thumbnail), where touches come in screen pixels and sizes in the element's own.
 */
export const toLayoutScale = (node: unknown) => {
  if (!isMeasurable(node)) return 1;
  const shown = node.getBoundingClientRect().width;
  return shown > 0 && node.offsetWidth > 0 ? node.offsetWidth / shown : 1;
};
