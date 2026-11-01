import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  sheetActions: { padding: 16, gap: 12 },
  sheetAction: { fontSize: 16 },
  menuTrigger: {
    fontSize: 14,
    fontWeight: '600',
    paddingHorizontal: 14,
    paddingVertical: 6,
    borderRadius: 999,
    overflow: 'hidden',
  },
  pill: { borderRadius: 999 },
  slide: { height: 150, borderRadius: 16, alignItems: 'center', justifyContent: 'center' },
  sortRow: { flexDirection: 'row', alignItems: 'center', paddingStart: 16, minHeight: 52 },
  grow: { flex: 1 },
  slideText: { color: '#FFFFFF', fontSize: 32, fontWeight: '700' },
});
