import { Carousel } from './Carousel';
import type { PagerProps } from './carousel.types';

/**
 * Full-size pages you swipe between, as react-native-pager-view does, without native code: onboarding, a photo
 * gallery, swipeable tabs. Give it a height (`style={{ flex: 1 }}`). Add `showIndicator` for dots.
 */
export const Pager = ({ gap = 0, showIndicator = false, showArrows = false, ...rest }: PagerProps) => (
  <Carousel gap={gap} showIndicator={showIndicator} showArrows={showArrows} {...rest} />
);
