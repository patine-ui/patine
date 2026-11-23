import { StyleSheet } from 'react-native';

import { createStyles } from '@/core/theme/theme.utils';
import { GROUP_GAP } from './action.constants';

export const styles = StyleSheet.create({
  groupedSheet: { backgroundColor: 'transparent', paddingHorizontal: GROUP_GAP },
  group: { flexShrink: 1, overflow: 'hidden' },
  cancelGroup: { marginTop: GROUP_GAP },
  list: { flexGrow: 0, flexShrink: 1 },
  header: { gap: 4 },
  groupedHeader: { alignItems: 'center' },
  centered: { textAlign: 'center' },
  row: { flexDirection: 'row', alignItems: 'center' },
  groupedRow: { justifyContent: 'center' },
  separator: { borderTopWidth: StyleSheet.hairlineWidth },
  text: { flex: 1 },
  groupedText: { alignItems: 'center' },
  groupedCheck: { position: 'absolute' },
});

export const themed = createStyles((t) => ({
  header: { paddingHorizontal: t.spacing.lg, paddingVertical: t.spacing.sm },
  groupCard: { backgroundColor: t.colors.sheet, borderRadius: t.radius.lg },
  groupedHeader: { paddingVertical: t.spacing.md },
  row: { paddingHorizontal: t.spacing.lg, paddingVertical: t.spacing.sm, gap: t.spacing.md },
  compactRow: { paddingHorizontal: t.spacing.md, paddingVertical: t.spacing.xs, gap: t.spacing.sm },
  groupHeading: { paddingHorizontal: t.spacing.lg, paddingTop: t.spacing.md, paddingBottom: t.spacing.xs },
  compactHeader: { paddingHorizontal: t.spacing.md, paddingTop: t.spacing.sm, paddingBottom: t.spacing.xs },
  separator: { borderColor: t.colors.border },
  label: { color: t.colors.text },
  groupedLabel: { color: t.colors.primary },
  destructive: { color: t.colors.danger },
  groupedCheck: { end: t.spacing.lg },
}));
