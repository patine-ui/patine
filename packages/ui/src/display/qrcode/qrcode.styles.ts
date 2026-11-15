import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  frame: { overflow: 'hidden' },
  module: { position: 'absolute' },
  center: { ...StyleSheet.absoluteFill, alignItems: 'center', justifyContent: 'center' },
  logo: { alignItems: 'center', justifyContent: 'center', overflow: 'hidden' },
});
