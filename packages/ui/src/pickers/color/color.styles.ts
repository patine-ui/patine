import { StyleSheet } from 'react-native';

import { MIN_TOUCH_TARGET } from '@/core/a11y/a11y.constants';
import { KNOB_SIZE } from '@/core/core.constants';
import { createStyles } from '@/core/theme/theme.utils';
import { CHECKER_DARK, CHECKER_LIGHT, CHECKER_SIZE, IOS_GRID_CELL_HEIGHT, PAD_BLACK, PAD_THUMB_SIZE, PAD_WHITE } from './color.constants';

/** The platforms' colour sliders ring the colour in white, so it shows on any colour. */
const thumb = {
  position: 'absolute',
  borderWidth: 3,
} as const;

export const styles = StyleSheet.create({
  checkerLight: { backgroundColor: CHECKER_LIGHT },
  gridCellHeight: { height: IOS_GRID_CELL_HEIGHT },
  checkerDark: { backgroundColor: CHECKER_DARK },
  white: { backgroundColor: PAD_WHITE },
  black: { backgroundColor: PAD_BLACK },
  row: { flexDirection: 'row' },
  column: { flexDirection: 'column' },
  center: { alignItems: 'center', justifyContent: 'center' },
  centerRow: { alignItems: 'center' },
  fill: { flex: 1 },
  swatches: { flexDirection: 'row', flexWrap: 'wrap' },
  swatchRow: { flexDirection: 'row' },
  swatch: { alignItems: 'center', justifyContent: 'center', borderWidth: StyleSheet.hairlineWidth },
  slider: { height: MIN_TOUCH_TARGET, justifyContent: 'center' },
  sliderHeader: { flexDirection: 'row', justifyContent: 'space-between' },
  rail: { justifyContent: 'center' },
  track: { ...StyleSheet.absoluteFill, flexDirection: 'row', overflow: 'hidden' },
  sliderThumb: {
    ...thumb,
    width: KNOB_SIZE,
    height: KNOB_SIZE,
    borderRadius: KNOB_SIZE / 2,
    marginLeft: -KNOB_SIZE / 2,
  },
  pad: { overflow: 'hidden' },
  layer: { ...StyleSheet.absoluteFill },
  layerRow: { ...StyleSheet.absoluteFill, flexDirection: 'row' },
  layerColumn: { ...StyleSheet.absoluteFill, flexDirection: 'column' },
  halfTop: { position: 'absolute', top: 0, left: 0, right: 0, height: '50%', flexDirection: 'column' },
  halfBottom: { position: 'absolute', bottom: 0, left: 0, right: 0, height: '50%', flexDirection: 'column' },
  padThumb: {
    ...thumb,
    width: PAD_THUMB_SIZE,
    height: PAD_THUMB_SIZE,
    borderRadius: PAD_THUMB_SIZE / 2,
    marginLeft: -PAD_THUMB_SIZE / 2,
    marginTop: -PAD_THUMB_SIZE / 2,
  },
  checker: { ...StyleSheet.absoluteFill, flexDirection: 'row', flexWrap: 'wrap', overflow: 'hidden' },
  checkerCell: { width: CHECKER_SIZE, height: CHECKER_SIZE },
  hexRow: { flexDirection: 'row', alignItems: 'center' },
  hexField: { flex: 1, justifyContent: 'center' },
  hexInput: { height: 40, borderWidth: 1 },
  hexButton: { position: 'absolute', end: 4, width: 32, height: 32, alignItems: 'center', justifyContent: 'center' },
  preview: { width: 40, height: 40, borderWidth: StyleSheet.hairlineWidth },
  previewCircle: { width: 32, height: 32, borderRadius: 16, borderWidth: StyleSheet.hairlineWidth },
  previewLarge: { width: 56, height: 56, borderWidth: StyleSheet.hairlineWidth },
  iconButton: { width: 40, height: 40, alignItems: 'center', justifyContent: 'center', borderWidth: 1 },
  grid: { overflow: 'hidden' },
  gridCell: { flex: 1 },
  gridCellSelected: { borderWidth: 3, zIndex: 1 },
  fieldSwatch: { width: 20, height: 20, borderWidth: StyleSheet.hairlineWidth },
  copyIcon: { width: 14, height: 14 },
  copyBack: { position: 'absolute', top: 0, left: 0, width: 10, height: 10, borderWidth: 1.5, borderRadius: 2 },
  copyFront: { position: 'absolute', bottom: 0, right: 0, width: 10, height: 10, borderWidth: 1.5, borderRadius: 2 },
  dropperIcon: { width: 16, height: 16, alignItems: 'center', justifyContent: 'center', transform: [{ rotate: '45deg' }] },
  dropperBulb: { width: 6, height: 6, borderRadius: 3 },
  dropperBody: { width: 4, height: 7, borderWidth: 1.5, borderTopWidth: 0 },
  dropperTip: { width: 1.5, height: 3 },
});

/** The thumbs' ring and the selected grid cell's frame, in the theme's knob colour so they show on any colour. */
export const knobStyles = createStyles((t) => ({
  ring: { borderColor: t.colors.knob },
}));

/** The picker's frames, inputs and buttons in the theme's corners, borders and spacing. */
export const themed = createStyles((t) => ({
  small: { borderRadius: t.radius.sm, borderColor: t.colors.border },
  large: { borderRadius: t.radius.md, borderColor: t.colors.border },
  shadow: { boxShadow: t.shadows.sm },
  border: { borderColor: t.colors.border },
  swatchGap: { gap: t.spacing.sm },
  hexInput: { borderRadius: t.radius.sm, borderColor: t.colors.border, backgroundColor: t.colors.background, paddingStart: t.spacing.md },
  hexPad: { paddingEnd: t.spacing.md },
  hexPadCopy: { paddingEnd: 40 },
  emptySwatch: { backgroundColor: t.colors.surface },
}));
