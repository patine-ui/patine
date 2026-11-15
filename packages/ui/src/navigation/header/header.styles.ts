import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  bar: { flexDirection: 'row', alignItems: 'center' },
  side: { flexDirection: 'row', alignItems: 'center' },
  title: { flex: 1, minWidth: 0 },
  centered: { ...StyleSheet.absoluteFill, alignItems: 'center', justifyContent: 'center' },
  // On the web a heading is an <h1>–<h6>, which a page's stylesheet may give margins.
  heading: { margin: 0 },
});
