import { StyleSheet } from 'react-native';

import { MIN_TOUCH_TARGET } from '@/core/a11y/a11y.constants';

/** The chevron drawn with views: two sides of a turned square. */
export const CHEVRON_SIZE = 8;

import { DISCLOSURE_CHEVRON, HOVER_FILL_SPREAD, SEARCH_DESIGN, SEARCH_ICON_SIZE } from '@/core/core.constants';
import { createStyles } from '@/core/theme/theme.utils';

export const styles = StyleSheet.create({
  searchContainer: { justifyContent: 'center' },
  searchInput: { borderWidth: 1 },
  searchIconBox: { position: 'absolute' },
  chevronMark: { width: CHEVRON_SIZE, height: CHEVRON_SIZE, borderTopWidth: 2, borderRightWidth: 2, borderRadius: 1 },
  chevronForward: { transform: [{ rotate: '45deg' }] },
  chevronBack: { transform: [{ rotate: '-135deg' }] },
  searchIcon: { width: SEARCH_ICON_SIZE, height: SEARCH_ICON_SIZE },
  searchLens: { width: 11, height: 11, borderRadius: 6, borderWidth: 1.6 },
  searchHandle: { position: 'absolute', left: 10.4, top: 8.7, width: 1.6, height: 5, borderRadius: 1, transform: [{ rotate: '-45deg' }] },
  choiceRow: { flexDirection: 'row', alignItems: 'center', minHeight: MIN_TOUCH_TARGET },
  choiceRowReverse: { flexDirection: 'row-reverse', justifyContent: 'space-between' },
  choiceText: { flexShrink: 1, gap: 2 },
  disclosureLabel: { flex: 1 },
  disclosureIcon: { minWidth: 20, minHeight: 20, alignItems: 'center', justifyContent: 'center' },
  /** Two sides of a square turned 45°: a chevron pointing down, nudged up to sit centred. */
  disclosureChevron: {
    width: DISCLOSURE_CHEVRON.size,
    height: DISCLOSURE_CHEVRON.size,
    borderRightWidth: DISCLOSURE_CHEVRON.stroke,
    borderBottomWidth: DISCLOSURE_CHEVRON.stroke,
    marginTop: -DISCLOSURE_CHEVRON.size / 2,
    transform: [{ rotate: '45deg' }],
  },
});

export const themed = createStyles((t) => {
  const search = SEARCH_DESIGN[t.design];
  const iconStart = t.spacing[search.iconInset];
  return {
    // The hover tint gets room around the text, and the negative margin keeps the label in line with the content around it.
    choiceRow: {
      gap: t.spacing.md,
      borderRadius: t.radius.md,
      paddingHorizontal: t.spacing.sm,
      paddingVertical: t.spacing.xs,
      marginHorizontal: -t.spacing.sm,
    },
    disclosureChevron: { borderColor: t.colors.textSecondary },
    search: {
      height: search.height,
      backgroundColor: search.outlined ? t.colors.background : t.colors.surface,
      borderColor: search.outlined ? t.colors.border : 'transparent',
      borderRadius: t.radius[search.radius],
      paddingStart: iconStart + SEARCH_ICON_SIZE + t.spacing.sm,
      paddingEnd: t.spacing.md,
    },
    searchRing: { borderColor: t.colors.primary, boxShadow: `0 0 0 1px ${t.colors.primary}` },
    searchHover: { boxShadow: `inset 0 0 0 ${HOVER_FILL_SPREAD}px ${t.colors.hover}` },
    searchIcon: { start: iconStart },
  };
});
