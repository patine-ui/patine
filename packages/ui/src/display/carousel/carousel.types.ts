import type React from 'react';
import type { Animated, StyleProp, ViewStyle } from 'react-native';

import type { SlotStyles, ThemableProps, ValueOf } from '@/core/core.types';
import type { CarouselLabels } from '@/core/theme/labels.types';
import type { Theme } from '@/core/theme/theme.types';
import type { CAROUSEL_ALIGN, ORIENTATION } from './carousel.constants';

export type CarouselOrientation = ValueOf<typeof ORIENTATION>;
export type CarouselAlign = ValueOf<typeof CAROUSEL_ALIGN>;
/** A width in points, or a share of the carousel's width such as `'80%'`. */
export type ItemSize = number | `${number}%`;

export type CarouselSlot = 'container' | 'item' | 'indicator' | 'arrow';

export interface PagerProps extends ThemableProps {
  /** One page per child */
  children?: React.ReactNode;
  /** The page shown, from 0. Pair with `onValueChange` to control it */
  value?: number;
  /** The first page when uncontrolled. Default: 0 */
  defaultValue?: number;
  /** A page settles after a swipe, an arrow, a dot, a key or autoplay. Not called when you change `value` */
  onValueChange?: (index: number) => void;
  /** Default: 'horizontal'. 'vertical' needs a height (`style={{ flex: 1 }}`) */
  orientation?: CarouselOrientation;
  /** Let the user swipe between pages. Arrows, dots and keys still work. Default: true */
  scrollEnabled?: boolean;
  /** Space between pages, in points. Default: 0 for Pager, the theme's `md` spacing for Carousel */
  gap?: number;
  /** Dots under the pages. Default: false for Pager, true for Carousel */
  showIndicator?: boolean;
  /** Previous and next buttons over the edges. Default: false for Pager; on the web for Carousel */
  showArrows?: boolean;
  /** Names the carousel for screen readers, e.g. "Featured products" */
  'aria-label'?: string;
  /** Its built-in text, for translation */
  labels?: Partial<CarouselLabels>;
  /** The outer view, for layout */
  style?: StyleProp<ViewStyle>;
  /** Per-part style overrides */
  styles?: SlotStyles<CarouselSlot>;
  testID?: string;
}

export interface CarouselProps extends PagerProps {
  /** Each slide's width; less than the full width shows the next one peeking in. Default: '100%' */
  itemWidth?: ItemSize;
  /** Where a slide rests when it's narrower than the carousel. Default: 'center' */
  align?: CarouselAlign;
  /** Go from the last slide on to the first, and back. Default: false */
  loop?: boolean;
  /** Move on by itself: `true` every 4 seconds, or a number of milliseconds. Pauses while touched, hovered or focused, and never runs when the OS asks to reduce motion. Default: false */
  autoplay?: boolean | number;
}

export interface PageIndicatorProps extends ThemableProps {
  count: number;
  /** The current page, from 0 */
  value: number;
  /** A dot is tapped, or a screen reader or arrow key steps. Leave it out for dots that only show the page */
  onValueChange?: (index: number) => void;
  /** Read with the page, e.g. "Slide 2 of 5". Default: 'Slide {page} of {count}' */
  label?: string;
  /** The outer view, for layout */
  style?: StyleProp<ViewStyle>;
  testID?: string;
}

export interface IndicatorDesign {
  dot: number;
  /** The space each dot takes, its gap included */
  slot: number;
  /** The current page's mark: as wide as a dot, or a longer pill */
  activeWidth: number;
  activeColor: keyof Theme['colors'];
  inactiveColor: keyof Theme['colors'];
  inactiveOpacity: number;
}

export interface ArrowDesign {
  size: number;
  fill: keyof Theme['colors'];
  border: boolean;
  radius: keyof Theme['radius'];
}

export interface CarouselDesign {
  indicator: IndicatorDesign;
  arrow: ArrowDesign;
}

/** What the drawn dots need: the page as an animated number (fractional mid-swipe), and how to step. */
export interface DotsProps {
  count: number;
  position: Animated.Value | Animated.AnimatedInterpolation<number>;
  value: number;
  label: string;
  theme: Theme;
  onValueChange?: (index: number) => void;
  style?: StyleProp<ViewStyle>;
  testID?: string;
}

export type { CarouselLabels } from '@/core/theme/labels.types';
