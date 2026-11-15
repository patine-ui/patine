import { useLayoutEffect, useRef } from 'react';
import type { HostInstance, LayoutChangeEvent } from 'react-native';

import { KEY } from '@/core/core.constants';
import { useFocusVisible } from '@/core/hooks/useFocusVisible';
import { keyboardProps } from '@/core/utils/keyboard.utils';
import { useTabs } from '@/navigation/tabs/TabsContext';
import { INDICATOR_FIT, TABS_DESIGN, TABS_VARIANT } from '@/navigation/tabs/tabs.constants';
import type { TabEntry, TabLayout, TabsTriggerState } from '@/navigation/tabs/tabs.types';
import { indicatorBox, tabIds } from '@/navigation/tabs/tabs.utils';

/** A tab's state, its registration for arrow keys, its ids, and the layout it reports to the indicator. */
export const useTabsTrigger = (value: string, disabled: boolean): TabsTriggerState => {
  const tabs = useTabs();
  const ref = useRef<HostInstance>(null);
  const focus = useFocusVisible();
  const boxes = useRef<{ tab?: TabLayout; content?: TabLayout }>({});
  const look = TABS_DESIGN[tabs.theme.design];
  // Material 3 puts the line under the label only; the pill and vertical bars cover the whole tab.
  const fitContent = tabs.variant === TABS_VARIANT.underline && !tabs.vertical && look.indicatorFit === INDICATOR_FIT.content;

  // One entry for the tab's life, kept current, so it keeps its place in the order when it's disabled or renamed.
  const entry = useRef<TabEntry>({ value, disabled, ref }).current;
  entry.value = value;
  entry.disabled = disabled;
  useLayoutEffect(() => tabs.register(entry), [tabs.register, entry]);

  const report = () => {
    const { tab, content } = boxes.current;
    if (!tab || (fitContent && !content)) return;
    tabs.indicator.onTabLayout(value, indicatorBox(tab, fitContent ? content : undefined));
  };
  const [prev, next] = tabs.vertical ? [KEY.up, KEY.down] : [KEY.left, KEY.right];

  return {
    tabs,
    ref,
    focus,
    look,
    selected: tabs.value === value,
    ids: tabIds(tabs.baseId, value),
    onTabLayout: (e: LayoutChangeEvent) => {
      boxes.current.tab = e.nativeEvent.layout;
      report();
    },
    onContentLayout: (e: LayoutChangeEvent) => {
      boxes.current.content = e.nativeEvent.layout;
      report();
    },
    // ponytail: left and right don't swap in RTL; read the layout direction if RTL apps need it.
    keys: keyboardProps({
      [prev]: () => tabs.move(value, -1),
      [next]: () => tabs.move(value, 1),
      [KEY.home]: () => tabs.moveToEdge(false),
      [KEY.end]: () => tabs.moveToEdge(true),
    }),
  };
};
