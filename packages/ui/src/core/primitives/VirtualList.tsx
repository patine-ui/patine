import { Animated, FlatList } from 'react-native';

import { SHOWS_SCROLL_INDICATOR } from '@/core/core.constants';
import type { VirtualListProps } from './primitives.types';

/** A FlatList with Scroll's defaults: taps on its rows work while the keyboard is up, and no scrollbar track on the web. */
export const VirtualList = <T,>({
  ref,
  showsVerticalScrollIndicator = SHOWS_SCROLL_INDICATOR,
  showsHorizontalScrollIndicator = SHOWS_SCROLL_INDICATOR,
  keyboardShouldPersistTaps = 'handled',
  ...rest
}: VirtualListProps<T>) => (
  <FlatList
    ref={ref}
    showsVerticalScrollIndicator={showsVerticalScrollIndicator}
    showsHorizontalScrollIndicator={showsHorizontalScrollIndicator}
    keyboardShouldPersistTaps={keyboardShouldPersistTaps}
    {...rest}
  />
);

/** The FlatList a native-driver scroll event drives (the wheel), for the few lists that animate with their scroll. */
export const AnimatedVirtualList = Animated.FlatList;
