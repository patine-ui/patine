import { useMemo, useSyncExternalStore } from 'react';

import { getToasts, subscribeToasts } from '@/feedback/toast/toast.utils';

/** The toasts a Toaster shows: the newest `max` sent to its id. */
export const useToasts = (toasterId: string | undefined, max: number) => {
  const all = useSyncExternalStore(subscribeToasts, getToasts, getToasts);
  return useMemo(() => all.filter((t) => t.toasterId === toasterId).slice(0, max), [all, toasterId, max]);
};
