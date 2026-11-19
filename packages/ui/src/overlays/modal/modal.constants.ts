import type { Design } from '@/core/theme/theme.types';
import { DIALOG_BUTTONS, DIALOG_FOOTER } from '@/overlays/dialog/dialog.constants';
import type { ModalDesign } from './modal.types';

/** A centered modal's widest, and a drawer's width, by size. 'full' fills the screen. */
export const MODAL_SIZE = {
  sm: { modal: 400, drawer: 320 },
  md: { modal: 520, drawer: 400 },
  lg: { modal: 720, drawer: 560 },
  xl: { modal: 960, drawer: 720 },
  full: { modal: Number.POSITIVE_INFINITY, drawer: Number.POSITIVE_INFINITY },
} as const;

export const MODAL_LAYOUT = {
  centered: 'centered',
  fullScreen: 'fullScreen',
  drawer: 'drawer',
} as const;

export const DRAWER_SIDE = {
  start: 'start',
  end: 'end',
} as const;

/** Below this width, a modal fills the screen, as phones show rich content. */
export const COMPACT_WIDTH = 600;
/** A drawer leaves at least this much of the screen showing, so the backdrop can close it. */
export const DRAWER_MAX_RATIO = 0.85;
/** A full-screen modal rises this far as it fades in. */
export const FULL_SCREEN_RISE = 48;
/** Room for the close button beside the header text. */
export const CLOSE_BUTTON_ROOM = 44;
/** iOS's round close button: a 30pt gray circle, touched across 44pt. */
export const CLOSE_FILL_SIZE = 30;

/**
 * brand: Patine's card, grown from 95%. ios: a form sheet: a centered title, a gray round close button, rising as a page.
 * material: Material 3's dialog, 28dp corners and text buttons, and its full-screen dialog on phones; the navigation drawer
 * rounds its open edge. web: shadcn's modal, dividers around a scrolling body.
 */
export const MODAL_DESIGN: Record<Design, ModalDesign> = {
  brand: {
    radius: 'lg',
    maxWidth: MODAL_SIZE.md.modal,
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
    closeFill: false,
    dividers: false,
    drawerRadius: 0,
  },
  ios: {
    radius: 'md',
    maxWidth: MODAL_SIZE.md.modal,
    padding: 20,
    gap: 16,
    headerGap: 4,
    textAlign: 'center',
    titleSize: 'md',
    descriptionSize: 'sm',
    shadow: 'lg',
    scaleFrom: 1,
    footer: DIALOG_FOOTER.row,
    buttons: DIALOG_BUTTONS.filled,
    closeFill: true,
    dividers: false,
    drawerRadius: 0,
  },
  material: {
    radius: 28,
    maxWidth: MODAL_SIZE.md.modal,
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
    closeFill: false,
    dividers: false,
    drawerRadius: 16,
  },
  web: {
    radius: 'md',
    maxWidth: MODAL_SIZE.md.modal,
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
    closeFill: false,
    dividers: true,
    drawerRadius: 0,
  },
};
