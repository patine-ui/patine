import { StyleSheet } from 'react-native';

import { DIALOG_SCREEN_MARGIN } from '@/overlays/dialog/dialog.constants';
import { CLOSE_BUTTON_ROOM } from './modal.constants';

export const styles = StyleSheet.create({
  centered: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: DIALOG_SCREEN_MARGIN.horizontal,
    paddingVertical: DIALOG_SCREEN_MARGIN.vertical,
  },
  fill: { ...StyleSheet.absoluteFill },
  drawerRow: { ...StyleSheet.absoluteFill, flexDirection: 'row' },
  centeredPanel: { width: '100%', maxHeight: '100%', overflow: 'hidden' },
  fullPanel: { flex: 1, overflow: 'hidden' },
  drawerPanel: { height: '100%', overflow: 'hidden' },
  header: { paddingEnd: CLOSE_BUTTON_ROOM },
  body: { flexGrow: 0, flexShrink: 1 },
  bodyFill: { flexGrow: 1 },
  footer: { flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'flex-end', alignItems: 'center' },
  close: { position: 'absolute' },
});
