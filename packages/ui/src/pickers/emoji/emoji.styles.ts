import { StyleSheet } from 'react-native';

import { SEARCH_DESIGN } from '@/core/core.constants';
import { createStyles } from '@/core/theme/theme.utils';
import { INACTIVE_TAB_OPACITY, SECTION_HEADER_HEIGHT, TONE_POPOVER_PADDING } from './emoji.constants';

export const styles = StyleSheet.create({
  inactiveTab: { opacity: INACTIVE_TAB_OPACITY },
  fillArea: { position: 'absolute', top: 0, right: 0, bottom: 0, left: 0 },
  popoverPad: { padding: TONE_POPOVER_PADDING },
  flex: { flex: 1 },
  row: { flexDirection: 'row' },
  header: { flexDirection: 'row', alignItems: 'center' },
  toneButton: { alignItems: 'center', justifyContent: 'center' },
  toneButtonText: { fontSize: 20 },
  toneMenu: { flexDirection: 'row', justifyContent: 'space-around', padding: 4, marginTop: 6 },
  toneOption: { padding: 6 },
  toneOptionText: { fontSize: 22 },
  tonePopover: { position: 'absolute', flexDirection: 'row', borderWidth: StyleSheet.hairlineWidth },
  bar: { flexDirection: 'row', marginTop: 6 },
  barTop: { borderBottomWidth: StyleSheet.hairlineWidth },
  barBottom: { borderTopWidth: StyleSheet.hairlineWidth },
  tab: { flex: 1, height: 40, alignItems: 'center', justifyContent: 'center' },
  markedBar: { paddingHorizontal: 4 },
  markedTab: { height: 32, marginVertical: 4 },
  tabIcon: { fontSize: 18 },
  tabIndicator: { position: 'absolute', left: '25%', right: '25%', height: 2.5, borderRadius: 2 },
  tabIndicatorTop: { bottom: 0 },
  tabIndicatorBottom: { top: 0 },
  uppercase: { textTransform: 'uppercase' },
  sectionHeader: { height: SECTION_HEADER_HEIGHT, justifyContent: 'flex-end', paddingHorizontal: 4, paddingBottom: 6 },
  cell: { alignItems: 'center', justifyContent: 'center' },
  cellPressed: { transform: [{ scale: 1.15 }] },
  empty: { alignItems: 'center' },
});

/** The picker's header, category bar, tabs and skin-tone menus in the theme's colours. */
export const themed = createStyles((t) => {
  const search = SEARCH_DESIGN[t.design];
  return {
    list: { paddingHorizontal: t.spacing.xs },
    empty: { padding: t.spacing.xl },
    bar: { borderColor: t.colors.border },
    pillTab: { borderRadius: t.radius.full },
    tab: { borderRadius: t.radius.sm },
    pillOn: { backgroundColor: t.colors.primaryMuted },
    tabOn: { backgroundColor: t.colors.surface },
    indicatorOn: { backgroundColor: t.colors.primary },
    header: { paddingHorizontal: t.spacing.sm, paddingTop: t.spacing.sm, gap: t.spacing.sm },
    toneButton: { width: search.height, height: search.height, backgroundColor: t.colors.surface, borderRadius: t.radius[search.radius] },
    toneMenu: { marginHorizontal: t.spacing.sm, backgroundColor: t.colors.surface, borderRadius: t.radius.md },
    toneOption: { borderRadius: t.radius.sm },
    toneOn: { backgroundColor: t.colors.primaryMuted },
    popover: { backgroundColor: t.colors.sheet, borderColor: t.colors.border, borderRadius: t.radius.md, boxShadow: t.shadows.lg },
    cell: { borderRadius: t.radius.sm },
  };
});
