import { Platform, StyleSheet } from 'react-native';

import { MIN_TOUCH_TARGET } from '@/core/a11y/a11y.constants';
import { createStyles } from '@/core/theme/theme.utils';
import { CAROUSEL_DESIGN } from './carousel.constants';

export const styles = StyleSheet.create({
  viewport: { flexGrow: 1, flexShrink: 1 },
  // The web has no snapToInterval: CSS scroll snapping does the same.
  snapX: Platform.select({ web: { scrollSnapType: 'x mandatory' } as object, default: {} }),
  snapY: Platform.select({ web: { scrollSnapType: 'y mandatory' } as object, default: {} }),
  snapCenter: Platform.select({ web: { scrollSnapAlign: 'center' } as object, default: {} }),
  snapStart: Platform.select({ web: { scrollSnapAlign: 'start' } as object, default: {} }),
  dots: { flexDirection: 'row', alignSelf: 'center', alignItems: 'center', height: MIN_TOUCH_TARGET },
  dotSlot: { height: MIN_TOUCH_TARGET, alignItems: 'center', justifyContent: 'center' },
  activeDot: { position: 'absolute' },
  // Static dots (no onValueChange) aren't disabled controls, so they keep their own look.
  undimmed: { opacity: 1 },
  arrow: { position: 'absolute', alignItems: 'center', justifyContent: 'center' },
  vertical: { transform: [{ rotate: '90deg' }] },
});

/** The design's arrows and dots in the theme's colors. */
export const themed = createStyles((t) => {
  const { arrow, indicator } = CAROUSEL_DESIGN[t.design];
  return {
    arrow: {
      width: arrow.size,
      height: arrow.size,
      borderRadius: t.radius[arrow.radius],
      backgroundColor: t.colors[arrow.fill],
      borderWidth: arrow.border ? StyleSheet.hairlineWidth : 0,
      borderColor: t.colors.border,
    },
    slot: { width: indicator.slot },
    dot: {
      width: indicator.dot,
      height: indicator.dot,
      borderRadius: indicator.dot / 2,
      backgroundColor: t.colors[indicator.inactiveColor],
      opacity: indicator.inactiveOpacity,
    },
    activeDot: {
      left: (indicator.slot - indicator.activeWidth) / 2,
      width: indicator.activeWidth,
      height: indicator.dot,
      borderRadius: indicator.dot / 2,
      backgroundColor: t.colors[indicator.activeColor],
    },
  };
});
