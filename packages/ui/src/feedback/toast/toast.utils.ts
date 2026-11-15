import type { PlatformOSType } from 'react-native';

import { PLATFORM } from '@/core/core.constants';
import { darkTheme, lightTheme } from '@/core/theme/theme.constants';
import type { Theme } from '@/core/theme/theme.types';
import { TOAST_ACCENT, TOAST_POSITION, TOAST_TYPE } from './toast.constants';
import type {
  ToastColors,
  ToastData,
  ToastDesign,
  ToastId,
  ToastOptions,
  ToastPosition,
  ToastPromiseMessages,
  ToastType,
} from './toast.types';

type Listener = () => void;

// One store for the app, so `toast()` works from anywhere, outside React too. Newest first.
let toasts: ToastData[] = [];
let count = 0;
const listeners = new Set<Listener>();

const emit = (next: ToastData[]) => {
  toasts = next;
  for (const listener of listeners) listener();
};

/** For `useSyncExternalStore`. */
export const subscribeToasts = (listener: Listener) => {
  listeners.add(listener);
  return () => {
    listeners.delete(listener);
  };
};

export const getToasts = () => toasts;

/** Adds a toast, or updates the one with `options.id` in place (and reopens it). Returns its id. */
export const addToast = (message: string, options: ToastOptions, type: ToastType): ToastId => {
  count += 1;
  const id = options.id ?? count;
  const existing = toasts.find((t) => t.id === id);
  const next: ToastData = {
    ...existing,
    ...options,
    id,
    type,
    message,
    open: true,
  };
  emit(existing ? toasts.map((t) => (t.id === id ? next : t)) : [next, ...toasts]);
  return id;
};

/** Closes one toast, or all of them. A Toaster animates it out and then removes it; with none mounted it goes at once. */
export const dismissToast = (id?: ToastId) => {
  const matches = (t: ToastData) => id === undefined || t.id === id;
  emit(listeners.size ? toasts.map((t) => (matches(t) ? { ...t, open: false } : t)) : toasts.filter((t) => !matches(t)));
};

export const removeToast = (id: ToastId) => emit(toasts.filter((t) => t.id !== id));

const resolve = <T>(message: string | ((value: T) => string), value: T) => (typeof message === 'function' ? message(value) : message);

/** A loading toast that turns into a success or an error toast when the promise settles. Returns its id. */
const promise = <T>(task: Promise<T> | (() => Promise<T>), messages: ToastPromiseMessages<T>, options: ToastOptions = {}) => {
  const id = addToast(messages.loading, options, TOAST_TYPE.loading);
  (typeof task === 'function' ? task() : task).then(
    (data) => addToast(resolve(messages.success, data), { id }, TOAST_TYPE.success),
    (error: unknown) => addToast(resolve(messages.error, error), { id }, TOAST_TYPE.error)
  );
  return id;
};

const show =
  (type: ToastType) =>
  (message: string, options: ToastOptions = {}) =>
    addToast(message, options, type);

/** Shows a toast in the mounted `<Toaster />`, from anywhere. Returns its id. */
export const toast = Object.assign(show(TOAST_TYPE.default), {
  success: show(TOAST_TYPE.success),
  error: show(TOAST_TYPE.error),
  warning: show(TOAST_TYPE.warning),
  info: show(TOAST_TYPE.info),
  loading: show(TOAST_TYPE.loading),
  /** Closes the toast with this id, or every toast */
  dismiss: dismissToast,
  promise,
});

/** iOS shows toasts from the top, like its notifications; Android's snackbars and the web's toasts sit at the bottom. */
export const getDefaultPosition = (platform: PlatformOSType): ToastPosition =>
  platform === PLATFORM.ios ? TOAST_POSITION.top : TOAST_POSITION.bottom;

/**
 * How long a toast stays. Loading toasts stay until updated, and a toast with an action stays until it's closed, so there's
 * time to reach the button (WCAG 2.2.1), unless it sets its own `duration`.
 */
export const getToastDuration = (t: ToastData, fallback: number) => {
  if (t.type === TOAST_TYPE.loading) return Number.POSITIVE_INFINITY;
  return t.duration ?? (t.action ? Number.POSITIVE_INFINITY : fallback);
};

/** Whether it closes only when asked: these get a close button by default. */
export const isPersistent = (t: ToastData, fallback: number) =>
  t.type !== TOAST_TYPE.loading && !Number.isFinite(getToastDuration(t, fallback));

/** What a screen reader says when it appears. */
export const getToastAnnouncement = (t: Pick<ToastData, 'message' | 'description'>) =>
  t.description ? `${t.message}. ${t.description}` : t.message;

/** Errors interrupt the screen reader; the rest wait their turn. */
export const isAssertive = (type: ToastType) => type === TOAST_TYPE.error;

export const getToastColors = (theme: Theme, look: ToastDesign, type: ToastType): ToastColors => {
  const { colors } = theme;
  const accent = colors[TOAST_ACCENT[type]];
  if (look.surface !== 'inverse') {
    return {
      background: colors[look.surface],
      border: colors.border,
      text: colors.text,
      secondary: colors.textSecondary,
      accent,
      action: colors.primary,
    };
  }
  // ponytail: Material's inverse primary is the other scheme's primary; a custom `primary` doesn't carry over to it.
  return {
    background: colors.text,
    border: colors.text,
    text: colors.background,
    secondary: colors.background,
    accent,
    action: (theme.dark ? lightTheme : darkTheme).colors.primary,
  };
};
