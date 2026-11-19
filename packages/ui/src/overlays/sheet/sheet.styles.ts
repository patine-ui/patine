import { StyleSheet } from 'react-native';

import { MIN_TOUCH_TARGET } from '@/core/a11y/a11y.constants';
import { createStyles } from '@/core/theme/theme.utils';
import {
  DIALOG_MARGIN,
  DROPDOWN_PADDING,
  FIELD_DESIGN,
  FLOATING_LABEL_PADDING,
  FOCUS_RING_WIDTH,
  SHEET_MAX_WIDTH,
} from './sheet.constants';

export const styles = StyleSheet.create({
  fill: { position: 'absolute', top: 0, right: 0, bottom: 0, left: 0 },
  container: { flex: 1, justifyContent: 'flex-end' },
  dialogContainer: { flex: 1, justifyContent: 'center', padding: DIALOG_MARGIN },
  sheetFrame: { width: '100%', alignSelf: 'center', maxWidth: SHEET_MAX_WIDTH },
  sheet: { width: '100%', overflow: 'hidden' },
  /** Sheet-coloured, under the sheet: what shows below it while it's dragged above its height. */
  filler: { position: 'absolute', top: '100%', left: 0, right: 0 },
  dragContent: { width: '100%' },
  dialogHeader: { paddingTop: 12 },
  handleArea: { alignItems: 'center', paddingTop: 8, paddingBottom: 6 },
  handle: { width: 40, height: 5, borderRadius: 3 },
  header: { flexDirection: 'row', alignItems: 'center', minHeight: MIN_TOUCH_TARGET, paddingBottom: 4 },
  headerSide: { flex: 1, flexDirection: 'row', alignItems: 'center' },
  headerRight: { justifyContent: 'flex-end' },
  headerCenter: { flex: 2, alignItems: 'center' },
  headerStart: { alignItems: 'flex-start' },
  flex: { flex: 1 },
  shrink: { flexShrink: 1 },
  /** Padded for a comfortable hover and ripple area; the negative margin keeps the label lined up with the edge. */
  button: { paddingVertical: 6, paddingHorizontal: 8, marginHorizontal: -8 },
  /** Its glyph lines up with the header's edge; the rest of the 44pt is touch room. */
  close: { width: MIN_TOUCH_TARGET, height: MIN_TOUCH_TARGET, alignItems: 'center', justifyContent: 'center', marginEnd: -14 },
  dropdownOverlay: { position: 'absolute' },
  dropdown: { position: 'absolute', borderWidth: StyleSheet.hairlineWidth, paddingVertical: DROPDOWN_PADDING, overflow: 'hidden' },
  dropdownScroll: { flexGrow: 0, flexShrink: 1 },
  inline: { overflow: 'hidden' },
  inlineContent: { position: 'absolute', top: 0, left: 0, right: 0 },
  actions: { flexDirection: 'row', justifyContent: 'flex-end', alignItems: 'center', gap: 24 },
  dropdownFooter: {
    paddingTop: 8,
    paddingBottom: 2,
    borderTopWidth: StyleSheet.hairlineWidth,
  },
  content: { paddingHorizontal: 16, paddingBottom: 8 },
  compactContent: { paddingHorizontal: 8 },
  fieldLabel: { marginBottom: 6 },
  fieldMessage: { marginTop: 4 },
  centeredMessage: { textAlign: 'center' },
  trigger: { flexDirection: 'row', alignItems: 'center', paddingVertical: 6 },
  floatingLabelBox: { justifyContent: 'center', alignItems: 'flex-start' },
  floatingLabel: { paddingHorizontal: FLOATING_LABEL_PADDING },
  triggerRow: { flexDirection: 'row', alignItems: 'center' },
  triggerIcon: { marginEnd: 8 },
  clear: { paddingHorizontal: 6 },
  clearButton: { justifyContent: 'center' },
  chevron: { width: 20, height: 20, alignItems: 'center', justifyContent: 'center', marginStart: 4 },
  chevronTriangle: {
    width: 0,
    height: 0,
    borderLeftWidth: 5,
    borderRightWidth: 5,
    borderTopWidth: 5,
    borderLeftColor: 'transparent',
    borderRightColor: 'transparent',
  },
  chevronMark: { width: 8, height: 8, borderRightWidth: 1.75, borderBottomWidth: 1.75, marginTop: -4, transform: [{ rotate: '45deg' }] },
});

/**
 * The design's text-field box, shared by TextField, picker fields and PhoneField: resting, open (a thicker border that grows
 * inward so the text doesn't shift, with the design's ring) and invalid. `floatingStart` lines a floating label up with the text.
 */
export const fieldStyles = createStyles((t) => {
  const look = FIELD_DESIGN[t.design];
  const inset = (width: number) => t.spacing.md - (width - 1);
  return {
    box: {
      minHeight: look.minHeight,
      gap: t.spacing.sm,
      backgroundColor: t.colors.background,
      borderWidth: 1,
      borderColor: t.colors[look.outline],
      borderRadius: t.radius.md,
      paddingHorizontal: inset(1),
    },
    open: {
      borderWidth: look.openBorderWidth,
      borderColor: t.colors.primary,
      paddingHorizontal: inset(look.openBorderWidth),
      boxShadow: look.focusRing ? `0px 0px 0px ${FOCUS_RING_WIDTH}px ${t.colors.primaryMuted}` : undefined,
    },
    invalid: { borderColor: t.colors.danger },
    multiline: { paddingVertical: inset(1) },
    multilineOpen: { paddingVertical: inset(look.openBorderWidth) },
    floatingStart: { marginStart: t.spacing.md - FLOATING_LABEL_PADDING },
    floatingStartOpen: { marginStart: t.spacing.md - FLOATING_LABEL_PADDING - (look.openBorderWidth - 1) },
  };
});

/** The sheet's surface: the backdrop, the sheet and its filler, the handle, the footer, and its corners as a sheet or a dialog. */
export const sheetStyles = createStyles((t) => ({
  backdrop: { backgroundColor: t.colors.backdrop },
  surface: { backgroundColor: t.colors.sheet },
  dropdown: { backgroundColor: t.colors.sheet, borderColor: t.colors.border, borderRadius: t.radius.md, boxShadow: t.shadows.lg },
  dropdownFooter: { borderTopColor: t.colors.border, paddingHorizontal: t.spacing.lg },
  chevronOpen: { borderColor: t.colors.primary, borderTopColor: t.colors.primary },
  chevronClosed: { borderColor: t.colors.textSecondary, borderTopColor: t.colors.textSecondary },
  messageInset: { paddingStart: t.spacing.md },
  pressArea: { borderRadius: t.radius.md },
  round: { borderRadius: t.radius.full },
  button: { borderRadius: t.radius.sm },
  inline: { paddingTop: t.spacing.sm },
  header: { paddingHorizontal: t.spacing.lg },
  label: { backgroundColor: t.colors.background, color: t.colors.textSecondary },
  labelOpen: { color: t.colors.primary },
  labelInvalid: { color: t.colors.danger },
  handle: { backgroundColor: t.colors.handle },
  footer: { paddingHorizontal: t.spacing.lg, paddingTop: t.spacing.md },
  dialog: { borderRadius: t.radius.sheet, paddingBottom: t.spacing.md },
  sheet: { borderTopLeftRadius: t.radius.sheet, borderTopRightRadius: t.radius.sheet },
}));
