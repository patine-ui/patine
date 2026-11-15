import { StyleSheet } from 'react-native';

import { MIN_TOUCH_TARGET } from '@/core/core.constants';

export const styles = StyleSheet.create({
  row: { flexDirection: 'row' },
  column: { flexDirection: 'column' },
  item: { flex: 1, alignItems: 'center', minHeight: MIN_TOUCH_TARGET },
  itemVertical: { flexDirection: 'row', minHeight: MIN_TOUCH_TARGET },
  rail: { alignItems: 'center' },
  track: { flexDirection: 'row', alignItems: 'center', alignSelf: 'stretch' },
  line: { flex: 1 },
  lineVertical: { flex: 1, minHeight: 16 },
  circle: { alignItems: 'center', justifyContent: 'center' },
  text: { alignItems: 'center' },
  textVertical: { flex: 1, paddingBottom: 16 },
  center: { textAlign: 'center' },
  hidden: { opacity: 0 },
});
