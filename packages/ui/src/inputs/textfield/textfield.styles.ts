import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  /** The box grows to the input's height; icons and buttons sit on its first line. */
  multilineField: { alignItems: 'flex-start' },
  /** Padding sits on the box, so a TextArea's content height is its text's alone. */
  input: { flex: 1, minWidth: 0, alignSelf: 'stretch', padding: 0, margin: 0 },
  multilineInput: { alignSelf: 'auto', textAlignVertical: 'top' },
  action: { paddingHorizontal: 6 },
  footer: { flexDirection: 'row', alignItems: 'flex-start' },
  message: { flex: 1 },
  counter: { marginTop: 4, marginStart: 'auto' },
  searchRow: { flexDirection: 'row', alignItems: 'center' },
  searchInput: { flex: 1 },
  searchClear: { position: 'absolute' },
});
