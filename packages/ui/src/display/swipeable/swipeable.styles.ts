import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  root: { overflow: 'hidden' },
  panel: { flexDirection: 'row' },
  start: { justifyContent: 'flex-start' },
  end: { justifyContent: 'flex-end' },
  action: { alignItems: 'center', justifyContent: 'center', gap: 4, paddingHorizontal: 8 },
  label: { color: '#FFFFFF' },
  front: { zIndex: 2 },
});
