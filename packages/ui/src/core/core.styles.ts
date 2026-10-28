import { Platform, StyleSheet } from 'react-native';

import { DISCLOSURE_CHEVRON, MIN_TOUCH_TARGET, SEARCH_ICON_SIZE } from './core.constants';

export const coreStyles = StyleSheet.create({
  /**
   * React Native Web renders Text with dir="auto", so each label aligns by its own script (Hebrew right, English left).
   * ponytail: pinned left because RN Web has no RTL layout flag; RTL web apps override it through the slot styles.
   */
  startAligned: Platform.select({ web: { textAlign: 'left' }, default: {} }),
  /** Drops the browser's focus ring; inputs show focus with a theme-colored border instead. */
  noOutline: Platform.select({ web: { outlineStyle: 'solid', outlineWidth: 0 }, default: {} }),
  clip: { overflow: 'hidden' },
  searchIcon: { width: SEARCH_ICON_SIZE, height: SEARCH_ICON_SIZE },
  searchLens: { width: 11, height: 11, borderRadius: 6, borderWidth: 1.6 },
  searchHandle: { position: 'absolute', left: 10.4, top: 8.7, width: 1.6, height: 5, borderRadius: 1, transform: [{ rotate: '-45deg' }] },
  ripple: { position: 'absolute' },
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
