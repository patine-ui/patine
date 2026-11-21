import { StyleSheet, type ViewStyle } from 'react-native';

import { createStyles } from '@/core/theme/theme.utils';
import { DROPDOWN_MAX_HEIGHT } from '@/overlays/sheet/sheet.constants';
import { DISABLED_OPTION_OPACITY, SELECT_DESIGN, SELECT_PRESENTATION } from './select.constants';
import type { SelectPresentation } from './select.types';

export const styles = StyleSheet.create({
  flex: { flex: 1 },
  option: { flexDirection: 'row', alignItems: 'center', paddingVertical: 10, marginVertical: 1 },
  icon: { alignItems: 'center', justifyContent: 'center' },
  description: { marginTop: 2 },
  groupHeaderText: { textTransform: 'uppercase', letterSpacing: 0.6 },
  checkBox: { borderWidth: 2, alignItems: 'center', justifyContent: 'center' },
  checkBoxMark: { fontSize: 13, fontWeight: '700', lineHeight: 16 },
  radio: { width: 20, height: 20, borderWidth: 2, borderRadius: 10, alignItems: 'center', justifyContent: 'center' },
  radioDot: { width: 10, height: 10, borderRadius: 5 },
  empty: { alignItems: 'center' },
  loading: { flexDirection: 'row', alignItems: 'center', justifyContent: 'center' },
  searchField: { height: '100%' },
  chips: { flexDirection: 'row', flexWrap: 'wrap', gap: 6 },
  chip: { paddingHorizontal: 10, paddingVertical: 4 },
  dropdownList: { flexShrink: 1 },
  sheetList: { flexGrow: 1, flexShrink: 1 },
  /** Inline, the list scrolls on its own instead of stretching the page. */
  inlineList: { maxHeight: DROPDOWN_MAX_HEIGHT },
  disabledOption: { opacity: DISABLED_OPTION_OPACITY },
});

export const LIST_STYLE: Record<SelectPresentation, ViewStyle> = {
  [SELECT_PRESENTATION.auto]: styles.sheetList,
  [SELECT_PRESENTATION.bottomSheet]: styles.sheetList,
  [SELECT_PRESENTATION.modal]: styles.sheetList,
  [SELECT_PRESENTATION.dropdown]: styles.dropdownList,
  [SELECT_PRESENTATION.inline]: styles.inlineList,
};

/** The design's rows (inset blocks or edge to edge, tinted when chosen), checks and the search field. */
export const themed = createStyles((t) => {
  const look = SELECT_DESIGN[t.design];
  const { size, radius, offColor } = look.checkbox;
  return {
    groupHeader: { paddingHorizontal: t.spacing.lg, paddingTop: t.spacing.md, paddingBottom: t.spacing.xs },
    row: {
      minHeight: look.rowHeight,
      paddingHorizontal: t.spacing.lg,
      marginHorizontal: look.insetRows ? t.spacing.sm : 0,
      borderRadius: look.insetRows ? t.radius.md : 0,
    },
    rowOn: { backgroundColor: look.tintSelected ? t.colors.primaryMuted : 'transparent' },
    leading: { marginEnd: t.spacing.md },
    trailing: { marginStart: t.spacing.md },
    radioOn: { borderColor: t.colors.primary },
    radioOff: { borderColor: t.colors.textSecondary },
    dot: { backgroundColor: t.colors.primary },
    box: { width: size, height: size, borderRadius: radius },
    boxOn: { borderColor: t.colors.primary, backgroundColor: t.colors.primary },
    boxOff: { borderColor: t.colors[offColor], backgroundColor: 'transparent' },
    mark: { color: t.colors.onPrimary },
    search: { paddingHorizontal: t.spacing.lg, paddingBottom: t.spacing.sm },
    empty: { padding: t.spacing.xl },
    loading: { padding: t.spacing.lg, gap: t.spacing.sm },
    searchField: {
      backgroundColor: t.colors.background,
      borderColor: t.colors.primary,
      borderRadius: t.radius.md,
      paddingHorizontal: t.spacing.md,
    },
    chip: { backgroundColor: t.colors.primaryMuted, borderRadius: t.radius.full },
  };
});
