import { BUTTON_VARIANT } from '@/actions/button/button.constants';
import type { ButtonVariant } from '@/actions/button/button.types';
import type { Theme } from '@/core/theme/theme.types';
import { DIALOG_BUTTONS, DIALOG_FOOTER, IOS_MAX_SIDE_BY_SIDE } from './dialog.constants';
import type { DialogButtonLook, DialogButtonStyle, DialogDesign, DialogFooterLayout } from './dialog.types';

/** The dialog's corner radius in points: a theme step, or a fixed value. */
export const resolveDialogRadius = (radius: DialogDesign['radius'], theme: Theme) =>
  typeof radius === 'number' ? radius : theme.radius[radius];

/** Text-button designs (iOS, Material) draw every action as a tinted text button: danger when destructive, else primary. */
export const getDialogButton = (buttons: DialogButtonStyle, variant: ButtonVariant): DialogButtonLook =>
  buttons === DIALOG_BUTTONS.text
    ? {
        variant: BUTTON_VARIANT.ghost,
        color: variant === BUTTON_VARIANT.destructive ? 'danger' : 'primary',
      }
    : { variant };

/** iOS puts two buttons side by side and stacks three or more; the other designs keep a row. */
export const getFooterDirection = (footer: DialogFooterLayout, count: number) =>
  footer === DIALOG_FOOTER.cells && count > IOS_MAX_SIDE_BY_SIDE ? 'column' : 'row';
