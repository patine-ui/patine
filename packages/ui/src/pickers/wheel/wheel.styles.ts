import { StyleSheet } from 'react-native';

import { createStyles } from '@/core/theme/theme.utils';

export const styles = StyleSheet.create({
  clip: { overflow: 'hidden' },
  centerOverlay: { ...StyleSheet.absoluteFill, justifyContent: 'center' },
  row: { justifyContent: 'center' },
  typingRing: { borderWidth: 2 },
  hiddenInput: { position: 'absolute', width: 1, height: 1, opacity: 0 },
  columns: { flexDirection: 'row', flex: 1 },
  separator: { justifyContent: 'center', paddingHorizontal: 2 },
});

/** The selection band, rows, labels and the typing ring in the theme's colours. */
export const themed = createStyles((t) => ({
  indicator: { borderRadius: t.radius.md, backgroundColor: t.colors.indicator, marginHorizontal: t.spacing.xs },
  row: { paddingHorizontal: t.spacing.sm },
  label: { color: t.colors.textSecondary },
  labelOn: { color: t.colors.text },
  labelOff: { color: t.colors.textDisabled },
  typingRing: { borderRadius: t.radius.md, borderColor: t.colors.primary, marginHorizontal: t.spacing.xs },
}));
