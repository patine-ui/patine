import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  root: { alignItems: 'center', justifyContent: 'center' },
  icon: { width: 64, height: 64, alignItems: 'center', justifyContent: 'center' },
  iconText: { fontSize: 28 },
  text: { alignItems: 'center', maxWidth: 360 },
  center: { textAlign: 'center' },
  // On the web a heading is an <h3>, which a page's stylesheet may give margins.
  heading: { margin: 0 },
  actions: { flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'center' },
});
