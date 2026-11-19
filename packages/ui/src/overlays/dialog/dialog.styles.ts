import { StyleSheet } from 'react-native';

import { createStyles } from '@/core/theme/theme.utils';
import { DIALOG_DESIGN, DIALOG_SCREEN_MARGIN } from './dialog.constants';
import { resolveDialogRadius } from './dialog.utils';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: DIALOG_SCREEN_MARGIN.horizontal,
    paddingVertical: DIALOG_SCREEN_MARGIN.vertical,
  },
  card: { width: '100%', maxHeight: '100%', overflow: 'hidden' },
  scroll: { flexGrow: 0, flexShrink: 1 },
  row: { flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'flex-end', gap: 8 },
  cells: { borderTopWidth: StyleSheet.hairlineWidth },
  cell: { flex: 1 },
  stackedCell: { flex: 0 },
  cellButton: { alignSelf: 'stretch', borderRadius: 0, borderWidth: 0 },
  fill: { position: 'absolute', top: 0, right: 0, bottom: 0, left: 0 },
  rowCells: { flexDirection: 'row' },
  columnCells: { flexDirection: 'column' },
  cellDivider: { borderStartWidth: StyleSheet.hairlineWidth },
});

/** The design's dialog card, its padding and gaps, text alignment and iOS's footer cells. */
export const themed = createStyles((t) => {
  const look = DIALOG_DESIGN[t.design];
  return {
    backdrop: { backgroundColor: t.colors.backdrop },
    card: {
      maxWidth: look.maxWidth,
      borderRadius: resolveDialogRadius(look.radius, t),
      backgroundColor: t.colors.sheet,
      boxShadow: t.shadows[look.shadow],
    },
    body: { padding: look.padding, gap: look.gap },
    header: { gap: look.headerGap },
    text: { textAlign: look.textAlign },
    hairline: { borderColor: t.colors.border },
    cells: { margin: -look.padding, marginTop: 0 },
  };
});
