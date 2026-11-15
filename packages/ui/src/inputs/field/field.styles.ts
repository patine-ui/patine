import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  stepper: { flexDirection: 'row', alignItems: 'center', alignSelf: 'flex-start' },
  stepButton: { alignItems: 'center', justifyContent: 'center', alignSelf: 'stretch' },
  glyph: { textAlign: 'center', lineHeight: undefined },
  value: { textAlign: 'center', fontVariant: ['tabular-nums'] },
  divider: { width: StyleSheet.hairlineWidth, alignSelf: 'center' },
  stacked: { alignSelf: 'stretch', justifyContent: 'center' },
});
