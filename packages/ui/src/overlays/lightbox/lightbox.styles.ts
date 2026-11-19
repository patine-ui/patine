import { StyleSheet } from 'react-native';

import { MIN_TOUCH_TARGET } from '@/core/a11y/a11y.constants';
import { createStyles } from '@/core/theme/theme.utils';

export const styles = StyleSheet.create({
  fill: { flex: 1 },
  page: { flex: 1, overflow: 'hidden' },
  image: { width: '100%', height: '100%' },
  bar: { position: 'absolute', top: 0, left: 0, right: 0, flexDirection: 'row', alignItems: 'center' },
  barEnd: { flexDirection: 'row-reverse' },
  counter: { flex: 1 },
  counterCenter: { position: 'absolute', left: 0, right: 0, textAlign: 'center' },
  close: { width: MIN_TOUCH_TARGET, height: MIN_TOUCH_TARGET, alignItems: 'center', justifyContent: 'center', zIndex: 1 },
  cross: { position: 'absolute', width: 20, height: 2, borderRadius: 1 },
  crossA: { transform: [{ rotate: '45deg' }] },
  crossB: { transform: [{ rotate: '-45deg' }] },
  startText: { textAlign: 'left' },
  backdropFill: { position: 'absolute', top: 0, right: 0, bottom: 0, left: 0 },
});

/** Lightboxes sit on the theme's `media` (black in light and dark alike, so photos read true), with `onMedia` controls on a `scrim`. */
export const themed = createStyles((t) => ({
  backdrop: { backgroundColor: t.colors.media },
  bar: { backgroundColor: t.colors.scrim, paddingHorizontal: t.spacing.sm },
  cross: { backgroundColor: t.colors.onMedia },
  counter: { color: t.colors.onMedia, paddingHorizontal: t.spacing.sm },
}));
