import type { Design, Theme } from '@/core/theme/theme.types';
import type { ToastDesign, ToastType } from './toast.types';

/** sonner's toast types: `toast.success()`, `toast.error()`… `loading` stays until it's updated or closed. */
export const TOAST_TYPE = {
  default: 'default',
  success: 'success',
  error: 'error',
  warning: 'warning',
  info: 'info',
  loading: 'loading',
} as const;

export const TOAST_POSITION = {
  top: 'top',
  bottom: 'bottom',
} as const;

/** sonner's default: long enough to read a short line. */
export const TOAST_DURATION = 4000;
export const TOAST_MAX = 3;
export const TOAST_CLOSE_LABEL = 'Close notification';
/** How far (px) a toast slides in from, toward its edge. */
export const TOAST_ENTER_OFFSET = 16;
export const TOAST_ICON_SIZE = 20;
/** A one-line toast: room for a 36pt button, whose touch area grows to 44pt. */
export const TOAST_MIN_HEIGHT = 52;
export const TOAST_CLOSE_GLYPH = '✕';

/** The status icon's color, from the theme. */
export const TOAST_ACCENT: Record<ToastType, keyof Theme['colors']> = {
  default: 'text',
  success: 'success',
  error: 'danger',
  warning: 'warning',
  info: 'primary',
  loading: 'textSecondary',
};

/** The glyph in the status icon; `loading` shows a spinner and `default` none. */
export const TOAST_GLYPH: Record<ToastType, string | null> = {
  default: null,
  success: '✓',
  error: '!',
  warning: '!',
  info: 'i',
  loading: null,
};

/**
 * Brand: a bordered card with a soft shadow. iOS: a rounded banner on the sheet surface, like a notification. Material 3: the
 * snackbar, dark on a light screen, with a text button. The web: sonner's card, bottom right on a wide screen.
 */
export const TOAST_DESIGN: Record<Design, ToastDesign> = {
  brand: {
    radius: 'lg',
    surface: 'background',
    border: true,
    shadow: 'lg',
    icon: true,
    align: 'center',
    maxWidth: 420,
    actionVariant: 'default',
    actionTinted: false,
  },
  ios: {
    radius: 'lg',
    surface: 'sheet',
    border: false,
    shadow: 'lg',
    icon: true,
    align: 'center',
    maxWidth: 500,
    actionVariant: 'ghost',
    actionTinted: true,
  },
  material: {
    radius: 'md',
    surface: 'inverse',
    border: false,
    shadow: 'md',
    icon: false,
    align: 'center',
    maxWidth: 600,
    actionVariant: 'ghost',
    actionTinted: true,
  },
  web: {
    radius: 'md',
    surface: 'background',
    border: true,
    shadow: 'lg',
    icon: true,
    align: 'flex-end',
    maxWidth: 356,
    actionVariant: 'default',
    actionTinted: false,
  },
};
