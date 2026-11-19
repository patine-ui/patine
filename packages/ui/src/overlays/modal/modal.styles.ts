import { StyleSheet } from 'react-native';

import { createStyles } from '@/core/theme/theme.utils';
import { DIALOG_SCREEN_MARGIN } from '@/overlays/dialog/dialog.constants';
import { CLOSE_BUTTON_ROOM, CLOSE_FILL_SIZE, MODAL_DESIGN } from './modal.constants';

export const styles = StyleSheet.create({
  centered: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: DIALOG_SCREEN_MARGIN.horizontal,
    paddingVertical: DIALOG_SCREEN_MARGIN.vertical,
  },
  fill: { ...StyleSheet.absoluteFill },
  drawerRow: { ...StyleSheet.absoluteFill, flexDirection: 'row' },
  centeredPanel: { width: '100%', maxHeight: '100%', overflow: 'hidden' },
  fullPanel: { flex: 1, overflow: 'hidden' },
  drawerPanel: { height: '100%', overflow: 'hidden' },
  header: { paddingEnd: CLOSE_BUTTON_ROOM },
  body: { flexGrow: 0, flexShrink: 1 },
  bodyFill: { flexGrow: 1 },
  footer: { flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'flex-end', alignItems: 'center' },
  close: { position: 'absolute' },
});

/** The design's header, body and footer spacing and dividers, and the close button (a ghost ✕ or iOS's gray circle). */
export const themed = createStyles((t) => {
  const look = MODAL_DESIGN[t.design];
  const divider = { borderColor: t.colors.border };
  return {
    header: {
      gap: look.headerGap,
      padding: look.padding,
      paddingBottom: look.dividers ? look.padding : look.gap / 2,
      ...(look.textAlign === 'center' ? { paddingStart: look.padding + CLOSE_BUTTON_ROOM } : null),
      ...(look.dividers ? { borderBottomWidth: StyleSheet.hairlineWidth, ...divider } : null),
    },
    body: { paddingHorizontal: look.padding, paddingVertical: look.gap / 2, gap: look.gap },
    footer: {
      gap: t.spacing.sm,
      padding: look.padding,
      paddingTop: look.dividers ? look.padding : look.gap / 2,
      ...(look.dividers ? { borderTopWidth: StyleSheet.hairlineWidth, ...divider } : null),
    },
    backdrop: { backgroundColor: t.colors.backdrop },
    close: {
      borderRadius: t.radius.full,
      ...(look.closeFill
        ? { backgroundColor: t.colors.surface, width: CLOSE_FILL_SIZE, height: CLOSE_FILL_SIZE, minHeight: CLOSE_FILL_SIZE }
        : null),
    },
  };
});
