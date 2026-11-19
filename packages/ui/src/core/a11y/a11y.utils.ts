import { AccessibilityInfo, type Insets, type ViewStyle } from 'react-native';

import { IS_WEB } from '@/core/core.constants';
import { FOCUS_RING, MIN_TOUCH_TARGET } from './a11y.constants';

/** The keyboard focus ring: an outline just outside the control, so it never shifts the layout. */
export const focusRing = (color: string): ViewStyle => ({
  outlineColor: color,
  outlineStyle: 'solid',
  outlineWidth: FOCUS_RING.width,
  outlineOffset: FOCUS_RING.offset,
});

/** Extra hit area that grows a control `width` × `height` to the 44pt touch target; undefined when it's big enough. */
export const hitSlopFor = (width: number | undefined, height: number | undefined): Insets | undefined => {
  const vertical = height === undefined ? 0 : Math.max(0, (MIN_TOUCH_TARGET - height) / 2);
  const horizontal = width === undefined ? 0 : Math.max(0, (MIN_TOUCH_TARGET - width) / 2);
  if (!vertical && !horizontal) return undefined;
  return {
    top: vertical,
    bottom: vertical,
    left: horizontal,
    right: horizontal,
  };
};

/**
 * The enabled item `step` places from index `from`, wrapping around; undefined when none is enabled. Pass -1 with step 1
 * for the first enabled item, `items.length` with step -1 for the last.
 */
export const findNextEnabled = <T extends { disabled?: boolean }>(items: readonly T[], from: number, step: number): T | undefined => {
  for (let i = 1; i <= items.length; i++) {
    const item = items[(((from + step * i) % items.length) + items.length) % items.length];
    if (item && !item.disabled) return item;
  }
  return undefined;
};

const LIVE_REGION_ID = 'patine-live-region';
const HIDDEN_CSS = 'position:absolute;width:1px;height:1px;margin:-1px;overflow:hidden;clip:rect(0 0 0 0);white-space:nowrap;';

interface LiveRegion {
  textContent: string | null;
  setAttribute(name: string, value: string): void;
}
// Method syntax on purpose: TypeScript checks it bivariantly, so the DOM's Document (where present) fits this shape.
interface DocumentLike {
  getElementById(id: string): LiveRegion | null;
  createElement(tag: string): LiveRegion & { id: string };
  body: { appendChild(node: unknown): unknown } | null;
}

/** The page's one visually hidden live region, made on first use. */
const liveRegion = (): LiveRegion | undefined => {
  // Reflect.get type-checks with and without the DOM types, so apps with either can compile the source.
  const doc: DocumentLike | undefined = Reflect.get(globalThis, 'document');
  if (!doc?.body) return undefined;
  const found = doc.getElementById(LIVE_REGION_ID);
  if (found) return found;
  const region = doc.createElement('div');
  region.id = LIVE_REGION_ID;
  region.setAttribute('style', HIDDEN_CSS);
  doc.body.appendChild(region);
  return region;
};

/**
 * Has the screen reader say `text`: VoiceOver and TalkBack through `AccessibilityInfo`, the web through a hidden live
 * region. `assertive` interrupts what's being read; otherwise it waits its turn.
 */
export const announce = (text: string, { assertive = false }: { assertive?: boolean } = {}) => {
  if (!IS_WEB) {
    AccessibilityInfo.announceForAccessibilityWithOptions(text, { queue: !assertive });
    return;
  }
  const region = liveRegion();
  if (!region) return;
  region.setAttribute('aria-live', assertive ? 'assertive' : 'polite');
  // Clear first, so the same sentence twice in a row is still read.
  region.textContent = '';
  setTimeout(() => {
    region.textContent = text;
  }, 0);
};
