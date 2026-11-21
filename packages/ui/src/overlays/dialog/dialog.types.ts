import type React from 'react';
import type { RefObject } from 'react';
import type { HostInstance, ViewProps } from 'react-native';

import type { ButtonProps, ButtonVariant } from '@/actions/button/button.types';
import type { DeepPartial, ThemableProps, ValueOf } from '@/core/core.types';
import type { ShadowLevel, TextSize, Theme } from '@/core/theme/theme.types';
import type { ThemeColor } from '@/foundations/text/text.types';
import type { DIALOG_BUTTONS, DIALOG_FOOTER } from './dialog.constants';

export interface DialogPressSlotProps {
  /** One pressable element, such as a Button. Its own `onPress` still runs */
  children: React.ReactElement<{ onPress?: (...args: never[]) => void; 'aria-expanded'?: boolean }>;
}

/** A footer button for the shorthand `actions`: a Button that runs its `onPress`, then closes. Call `event.preventDefault()` in `onPress` to keep the dialog open, as a Save that finds an error does. */
export interface DialogAction extends Omit<ButtonProps, 'children'> {
  label: string;
}

/**
 * The shorthand: give any of these and the root draws its own trigger, content, header and footer, with `children` as the
 * body. Leave them all out to compose the parts yourself.
 */
export interface DialogShorthandProps {
  /** One pressable element, such as a Button, that opens it */
  trigger?: DialogPressSlotProps['children'];
  /** Shorthand: the DialogTitle, also the dialog's name for screen readers */
  title?: React.ReactNode;
  /** Shorthand: the DialogDescription under the title */
  description?: React.ReactNode;
}

/** The shorthand's layout: the trigger, then the content with its header, the body and a footer. */
export interface DialogLayoutProps extends DialogShorthandProps {
  footer?: React.ReactNode;
  showCloseButton?: boolean;
  children?: React.ReactNode;
}

interface DialogBaseProps extends ThemableProps, DialogShorthandProps {
  /** The parts (DialogTrigger, DialogContent…), or the body when you use the shorthand props */
  children?: React.ReactNode;
  /** Open, when you control it. Pair with `onOpenChange` */
  open?: boolean;
  /** Open at first, when the dialog keeps its own state. Default: false */
  defaultOpen?: boolean;
  /** Called when the user opens or closes it: a trigger, a close button, the backdrop, Escape or Android back. Not when `open` changes */
  onOpenChange?: (open: boolean) => void;
  /** Closes on a backdrop press (Dialog only), Escape on the web and Android back. Default: true */
  dismissible?: boolean;
}

export interface DialogProps extends DialogBaseProps {
  /** Shorthand: the footer's buttons, in order. Each runs its `onPress`, then closes the dialog */
  actions?: DialogAction[];
  /** Shorthand: DialogContent's ✕ in the top corner. Default: true */
  showCloseButton?: boolean;
}

export interface AlertDialogProps extends DialogBaseProps {
  /** Shorthand: the confirm button's label. Default: 'Continue' */
  confirmLabel?: string;
  /** Shorthand: the cancel button's label. Default: 'Cancel' */
  cancelLabel?: string;
  /** Shorthand: draw the confirm button in the danger color. Default: false */
  destructive?: boolean;
  /** Shorthand: the user confirmed. The dialog closes after */
  onConfirm?: () => void;
  /** Shorthand: the user pressed Cancel. Escape, Back and the backdrop call `onOpenChange` only */
  onCancel?: () => void;
}

export interface DialogContentProps extends ViewProps {
  children?: React.ReactNode;
  /** A close button (✕) in the top corner. Default: true, false in an AlertDialog, which closes only by its buttons */
  showCloseButton?: boolean;
  /** What a screen reader says for the ✕. Default: 'Close' */
  closeLabel?: string;
}

export interface DialogSectionProps extends ViewProps {
  children?: React.ReactNode;
}

export interface DialogActionProps extends ButtonProps {
  /** 'destructive' draws it in the danger color. Default: 'default' (Action) or 'outline' (Cancel) */
  variant?: ButtonVariant;
  ref?: React.Ref<HostInstance>;
}

export type DialogFooterLayout = ValueOf<typeof DIALOG_FOOTER>;
export type DialogButtonStyle = ValueOf<typeof DIALOG_BUTTONS>;

/** How a design draws the dialog. */
export interface DialogDesign {
  /** A theme radius, or points */
  radius: keyof Theme['radius'] | number;
  maxWidth: number;
  padding: number;
  /** Between the header, the body and the footer */
  gap: number;
  /** Between the title and the description */
  headerGap: number;
  /** The title and description at the line's start (right in right to left), or centred */
  textAlign: 'start' | 'center';
  titleSize: TextSize;
  descriptionSize: TextSize;
  /** A step on the theme's elevation scale */
  shadow: ShadowLevel;
  /** The card grows from this scale as it fades in */
  scaleFrom: number;
  /** 'row': buttons side by side at the end. 'cells': iOS full-width cells split by hairlines, stacked past two */
  footer: DialogFooterLayout;
  /** 'filled': the Button variants. 'text': text buttons in the primary (or danger) color */
  buttons: DialogButtonStyle;
}

export interface DialogButtonLook {
  variant: ButtonVariant;
  color?: ThemeColor;
}

export interface DialogContextValue {
  open: boolean;
  setOpen: (open: boolean) => void;
  dismissible: boolean;
  /** An AlertDialog: the backdrop doesn't close it, and Cancel takes focus first */
  alert: boolean;
  titleId: string;
  descriptionId: string;
  /** What takes focus when it opens on the web: AlertDialogCancel. Otherwise the first control inside */
  initialFocus: RefObject<HostInstance | null>;
  theme: Theme;
  themeOverride?: DeepPartial<Theme>;
  look: DialogDesign;
}
