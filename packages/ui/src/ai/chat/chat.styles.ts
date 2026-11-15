import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  message: { width: '100%' },
  mine: { alignItems: 'flex-end' },
  theirs: { alignItems: 'flex-start' },
  bubble: { borderWidth: StyleSheet.hairlineWidth },
  composer: { flexDirection: 'row', alignItems: 'flex-end' },
  input: { flex: 1 },
  sendGlyph: { fontSize: 18, lineHeight: 20 },
  stopGlyph: { width: 12, height: 12, borderRadius: 2 },
});
