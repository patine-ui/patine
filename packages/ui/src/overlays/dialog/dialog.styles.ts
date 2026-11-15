import { StyleSheet } from 'react-native';

import { DIALOG_SCREEN_MARGIN } from './dialog.constants';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: DIALOG_SCREEN_MARGIN.horizontal,
    paddingVertical: DIALOG_SCREEN_MARGIN.vertical,
  },
  card: { width: '100%', maxHeight: '100%', overflow: 'hidden' },
  scroll: { flexGrow: 0, flexShrink: 1 },
  row: { flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'flex-end', gap: 8 },
  cells: { borderTopWidth: StyleSheet.hairlineWidth },
  cell: { flex: 1 },
  stackedCell: { flex: 0 },
  cellButton: { alignSelf: 'stretch', borderRadius: 0, borderWidth: 0 },
});
