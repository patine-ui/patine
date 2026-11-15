import { StyleSheet, type ViewStyle } from 'react-native';

export const styles = StyleSheet.create({
  // On the web the tooltip isn't in a modal (it would take focus from the trigger), so it's fixed to the viewport instead.
  // React Native's types leave out 'fixed', which react-native-web passes to the DOM.
  webFixed: { position: 'fixed' as ViewStyle['position'] },
  raised: { borderWidth: StyleSheet.hairlineWidth },
});
