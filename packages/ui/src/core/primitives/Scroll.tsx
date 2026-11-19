import { ScrollView } from 'react-native';

import { SHOWS_SCROLL_INDICATOR } from '@/core/core.constants';
import type { ScrollProps } from './primitives.types';

/** A ScrollView that keeps taps on its controls while the keyboard is up, and hides the scrollbar track on the web. */
export const Scroll = ({
  ref,
  showsVerticalScrollIndicator = SHOWS_SCROLL_INDICATOR,
  showsHorizontalScrollIndicator = SHOWS_SCROLL_INDICATOR,
  keyboardShouldPersistTaps = 'handled',
  ...rest
}: ScrollProps) => (
  <ScrollView
    ref={ref}
    showsVerticalScrollIndicator={showsVerticalScrollIndicator}
    showsHorizontalScrollIndicator={showsHorizontalScrollIndicator}
    keyboardShouldPersistTaps={keyboardShouldPersistTaps}
    {...rest}
  />
);
