import type { Design } from '@/core/theme/theme.types';
import type { DialogDesign } from './dialog.types';

export const DIALOG_FOOTER = {
  row: 'row',
  cells: 'cells',
} as const;

export const DIALOG_BUTTONS = {
  filled: 'filled',
  text: 'text',
} as const;

/** iOS stacks its alert buttons when there are more than this many. */
export const IOS_MAX_SIDE_BY_SIDE = 2;

/** Space kept around the dialog, so the backdrop shows on every side. */
// ponytail: fixed margins instead of safe-area insets (core has no inset API); a tall dialog scrolls inside them.
export const DIALOG_SCREEN_MARGIN = { horizontal: 24, vertical: 48 } as const;

/**
 * brand: a centered card that fades and grows in. ios: a 270pt alert with centered text and full-width buttons split by
 * hairlines. material: Material 3's dialog, 28dp corners, a large title and text buttons at the end. web: a centered
 * modal with a deep shadow.
 */
export const DIALOG_DESIGN: Record<Design, DialogDesign> = {
  brand: {
    radius: 'lg',
    maxWidth: 448,
    padding: 24,
    gap: 16,
    headerGap: 6,
    textAlign: 'left',
    titleSize: 'lg',
    descriptionSize: 'sm',
    shadow: 'xl',
    scaleFrom: 0.95,
    footer: DIALOG_FOOTER.row,
    buttons: DIALOG_BUTTONS.filled,
  },
  ios: {
    radius: 14,
    maxWidth: 270,
    padding: 20,
    gap: 16,
    headerGap: 4,
    textAlign: 'center',
    titleSize: 'md',
    descriptionSize: 'sm',
    shadow: 'none',
    scaleFrom: 1.1,
    footer: DIALOG_FOOTER.cells,
    buttons: DIALOG_BUTTONS.text,
  },
  material: {
    radius: 28,
    maxWidth: 560,
    padding: 24,
    gap: 16,
    headerGap: 16,
    textAlign: 'left',
    titleSize: 'xl',
    descriptionSize: 'sm',
    shadow: 'md',
    scaleFrom: 0.9,
    footer: DIALOG_FOOTER.row,
    buttons: DIALOG_BUTTONS.text,
  },
  web: {
    radius: 'md',
    maxWidth: 512,
    padding: 24,
    gap: 16,
    headerGap: 6,
    textAlign: 'left',
    titleSize: 'lg',
    descriptionSize: 'sm',
    shadow: 'xl',
    scaleFrom: 0.98,
    footer: DIALOG_FOOTER.row,
    buttons: DIALOG_BUTTONS.filled,
  },
};
