import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  group: { overflow: 'hidden' },
  row: { flexDirection: 'row', alignItems: 'center' },
  text: { flex: 1, minWidth: 0 },
  end: { flexDirection: 'row', alignItems: 'center', flexShrink: 0 },
  value: { flexShrink: 1 },
  // On the web a heading is an <h1>–<h6>, which a page's stylesheet may give margins.
  heading: { margin: 0 },
  uppercase: { textTransform: 'uppercase', letterSpacing: 0.4 },
});
