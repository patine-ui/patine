import type { TabLayout, TabsItem } from './tabs.types';

/** The ids that tie a tab to its panel, for `aria-controls` and `aria-labelledby`. */
export const tabIds = (baseId: string, value: string) => ({
  tab: `${baseId}-tab-${value}`,
  panel: `${baseId}-panel-${value}`,
});

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
