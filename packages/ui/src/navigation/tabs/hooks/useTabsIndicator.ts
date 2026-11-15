import { useEffect, useRef, useState } from 'react';

import { timing, useAnimatedValue } from '@/core/animation';
import type { TabLayout, TabsIndicator } from '@/navigation/tabs/tabs.types';

/** Slides the indicator to the active tab: it jumps into place on first layout and animates on later changes. */
export const useTabsIndicator = (selected: string | undefined, vertical: boolean, duration: number): TabsIndicator => {
  const offset = useAnimatedValue(0);
  const size = useAnimatedValue(0);
  const layouts = useRef(new Map<string, TabLayout>());
  const [placed, setPlaced] = useState(false);

  const place = (layout: TabLayout, animate: boolean) => {
    const to = vertical ? [layout.y, layout.height] : [layout.x, layout.width];
    if (animate) {
      // Layout props can't run on the native driver.
      timing(offset, to[0] ?? 0, { duration, native: false }).start();
      timing(size, to[1] ?? 0, { duration, native: false }).start();
      return;
    }
    offset.setValue(to[0] ?? 0);
    size.setValue(to[1] ?? 0);
    setPlaced(true);
  };

  const onTabLayout = (value: string, layout: TabLayout) => {
    layouts.current.set(value, layout);
    if (value === selected) place(layout, false);
  };

  // biome-ignore lint/correctness/useExhaustiveDependencies: runs when the selection moves; the animated values never change
  useEffect(() => {
    const layout = selected === undefined ? undefined : layouts.current.get(selected);
    if (!layout) {
      setPlaced(false);
      return;
    }
    setPlaced(true);
    place(layout, true);
  }, [selected, vertical]);

  return {
    style: vertical ? { top: offset, height: size } : { left: offset, width: size },
    placed,
    onTabLayout,
  };
};
