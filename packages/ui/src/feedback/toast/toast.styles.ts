import { StyleSheet } from 'react-native';

import { TOAST_ICON_SIZE, TOAST_MIN_HEIGHT } from './toast.constants';

export const styles = StyleSheet.create({
  toaster: { ...StyleSheet.absoluteFill, pointerEvents: 'box-none' },
  item: { width: '100%' },
  card: { flexDirection: 'row', alignItems: 'center', minHeight: TOAST_MIN_HEIGHT },
  body: { flex: 1, gap: 2 },
  icon: {
    width: TOAST_ICON_SIZE,
    height: TOAST_ICON_SIZE,
    borderRadius: TOAST_ICON_SIZE / 2,
    alignItems: 'center',
    justifyContent: 'center',
  },
  glyph: { fontSize: 12, lineHeight: 14, fontWeight: '700' },
});
