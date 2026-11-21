import type { StyleProp, ViewStyle } from 'react-native';

import type { ButtonVariant } from '@/actions/button/button.types';
import type { ThemableProps, ValueOf } from '@/core/core.types';
import type { ShadowLevel, Theme } from '@/core/theme/theme.types';
import type { TOAST_POSITION, TOAST_TYPE } from './toast.constants';

export type ToastType = ValueOf<typeof TOAST_TYPE>;
export type ToastPosition = ValueOf<typeof TOAST_POSITION>;
export type ToastId = string | number;

export interface ToastAction {
  /** The button's text, also what screen readers read */
  label: string;
  /** Runs on press; the toast closes after it */
  onPress: () => void;
}

export interface ToastOptions {
  /** A second, smaller line under the message */
  description?: string;
  /** A button in the toast, such as Undo. A toast with an action stays until it's closed, unless `duration` is set */
  action?: ToastAction;
  /** How long it stays, in ms. `Infinity` keeps it until it's closed. Default: the Toaster's `duration` */
  duration?: number;
  /** Reuse an id to update that toast in place, such as a loading toast that finishes */
  id?: ToastId;
  /** Show it only in the `<Toaster id>` with this id. Default: the Toaster without an id */
  toasterId?: string;
  /**
   * Called once when it closes without its action: its timer, the close button, a swipe or `toast.dismiss`. An Undo toast
   * commits the change here, since pressing Undo doesn't call it
   */
  onDismiss?: (id: ToastId) => void;
}

/** A toast in the store. */
export interface ToastData extends ToastOptions {
  id: ToastId;
  type: ToastType;
  message: string;
  /** False while it animates out, before it's removed */
  open: boolean;
}

/** A message for each outcome of `toast.promise`; a function gets the result or the error. */
export interface ToastPromiseMessages<T> {
  loading: string;
  success: string | ((data: T) => string);
  error: string | ((error: unknown) => string);
}

export interface ToastInsets {
  top?: number;
  bottom?: number;
  left?: number;
  right?: number;
}

export interface ToasterProps extends ThemableProps {
  /** The edge toasts stack from. Default: 'top' on iOS, 'bottom' on Android and the web */
  position?: ToastPosition;
  /** Space between the toasts and the edge of the screen, past the insets. Default: the theme's `lg` spacing */
  offset?: number;
  /** The most toasts shown at once; newer ones push older ones out until those come back. Default: 3 */
  max?: number;
  /** How long a toast stays, in ms, unless it sets its own. Default: 4000 */
  duration?: number;
  /** The safe area to keep clear, such as `useSafeAreaInsets()` from react-native-safe-area-context */
  insets?: ToastInsets;
  /** A close button on every toast. Default: on the web, and on toasts that stay until they're closed */
  closeButton?: boolean;
  /** The close button's label for screen readers. Default: 'Close notification' */
  closeLabel?: string;
  /** Shows only toasts sent with this `toasterId`, for a second Toaster on the same screen */
  id?: string;
  /** The box the toasts are laid out in, which covers the screen */
  style?: StyleProp<ViewStyle>;
}

/** How a design draws a toast. */
export interface ToastDesign {
  radius: keyof Theme['radius'];
  /** The theme color it's drawn on, or 'inverse': the text color, as Material's snackbar is dark on a light screen */
  surface: 'background' | 'sheet' | 'inverse';
  border: boolean;
  /** A step on the theme's elevation scale */
  shadow: ShadowLevel;
  /** A status icon before the message */
  icon: boolean;
  /** Where toasts sit across a screen wider than `maxWidth` */
  align: 'flex-start' | 'center' | 'flex-end';
  maxWidth: number;
  actionVariant: ButtonVariant;
  /** The action's label in the primary color, as a text button */
  actionTinted: boolean;
}

export interface ToastColors {
  background: string;
  border: string;
  text: string;
  secondary: string;
  /** The status icon's fill */
  accent: string;
  /** A tinted action's label */
  action: string;
}
