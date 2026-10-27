import { useEffect, useRef, useState } from 'react';

import { timing, useAnimatedValue } from '@/core/animation';
import type { ItemLayout, SegmentThumb } from '@/inputs/segmented/segmented.types';

/** Slides the segmented thumb under the selected item; it jumps into place on first layout and animates on later changes. */
export const useSegmentThumb = (selectedIndex: number, duration: number): SegmentThumb => {
  const left = useAnimatedValue(0);
  const width = useAnimatedValue(0);
  const layouts = useRef<ItemLayout[]>([]);
  const [placed, setPlaced] = useState(false);

  const jumpTo = (layout: ItemLayout) => {
    left.setValue(layout.x);
    width.setValue(layout.width);
    setPlaced(true);
  };

  const onItemLayout = (index: number, layout: ItemLayout) => {
    layouts.current[index] = layout;
    if (index === selectedIndex) jumpTo(layout);
  };

  // biome-ignore lint/correctness/useExhaustiveDependencies: runs when the selection moves; the animated values never change
  useEffect(() => {
    const layout = layouts.current[selectedIndex];
    if (!layout) {
      setPlaced(false);
      return;
    }
    setPlaced(true);
    // Layout props can't run on the native driver.
    timing(left, layout.x, { duration, native: false }).start();
    timing(width, layout.width, { duration, native: false }).start();
  }, [selectedIndex]);

  return {
    style: { left, width },
    placed,
    onItemLayout,
  };
};
