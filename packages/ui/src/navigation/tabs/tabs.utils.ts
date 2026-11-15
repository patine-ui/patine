import { MIN_TOUCH_TARGET } from '@/core/core.constants';
import type { TabLayout, TabsItem } from './tabs.types';

/**
 * The enabled item `step` places from index `from`, wrapping around; undefined when none is enabled. Pass -1 with step 1
 * for the first enabled item, `items.length` with step -1 for the last.
 */
export const findNextItem = <T extends { disabled: boolean }>(items: readonly T[], from: number, step: number): T | undefined => {
  for (let i = 1; i <= items.length; i++) {
    const item = items[(((from + step * i) % items.length) + items.length) % items.length];
    if (item && !item.disabled) return item;
  }
  return undefined;
};

/** The ids that tie a tab to its panel, for `aria-controls` and `aria-labelledby`. */
export const tabIds = (baseId: string, value: string) => ({
  tab: `${baseId}-tab-${value}`,
  panel: `${baseId}-panel-${value}`,
});

/** Vertical hit slop that grows a control `height` tall to the 44pt touch target. */
export const touchSlop = (height: number) => {
  const slop = Math.max(0, (MIN_TOUCH_TARGET - height) / 2);
  return {
    top: slop,
    bottom: slop,
  };
};

/** Where the indicator sits under a tab: the tab's box, or its label's box inside it. */
export const indicatorBox = (tab: TabLayout, content: TabLayout | undefined): TabLayout =>
  content
    ? {
        x: tab.x + content.x,
        y: tab.y + content.y,
        width: content.width,
        height: content.height,
      }
    : tab;

/** The shorthand's first tab: the first enabled item's value, or undefined when there are none. */
export const firstEnabledValue = (items: readonly Pick<TabsItem, 'value' | 'disabled'>[] | undefined) =>
  items?.find((item) => !item.disabled)?.value;
