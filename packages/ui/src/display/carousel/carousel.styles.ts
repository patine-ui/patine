import { Platform, StyleSheet } from 'react-native';

import { MIN_TOUCH_TARGET } from '@/core/core.constants';

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
  arrow: { position: 'absolute', alignItems: 'center', justifyContent: 'center' },
  vertical: { transform: [{ rotate: '90deg' }] },
});
