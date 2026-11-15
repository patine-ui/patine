import { StyleSheet } from 'react-native';

import { MIN_TOUCH_TARGET } from '@/core/core.constants';

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
});
