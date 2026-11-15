import { StyleSheet } from 'react-native';

import { TRACK_PADDING } from './tabs.constants';

export const styles = StyleSheet.create({
  row: { flexDirection: 'row' },
  /** ScrollView grows by default, which would stretch a row inside a column. */
  list: { flexGrow: 0 },
  listContent: { flexDirection: 'row', alignItems: 'center' },
  fill: { flexGrow: 1 },
  track: { overflow: 'hidden' },
  trackContent: { padding: TRACK_PADDING, gap: 2 },
  label: { flexDirection: 'row', alignItems: 'center' },
  trigger: { flexDirection: 'row', alignItems: 'center', justifyContent: 'center' },
  pill: { position: 'absolute' },
  pillHorizontal: { top: TRACK_PADDING, bottom: TRACK_PADDING },
  pillVertical: { left: TRACK_PADDING, right: TRACK_PADDING },
  underline: { position: 'absolute' },
  underlineHorizontal: { bottom: 0 },
  underlineVertical: { start: 0 },
  hidden: { display: 'none' },
});
