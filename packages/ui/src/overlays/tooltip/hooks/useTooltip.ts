import { createContext, useCallback, useContext, useEffect, useRef } from 'react';

import { IS_WEB } from '@/core/core.constants';
import { useControllableState } from '@/core/hooks/useControllableState';
import { useFocusVisible } from '@/core/hooks/useFocusVisible';
import { DEFAULT_DELAY_MS, DEFAULT_SKIP_DELAY_MS, ESCAPE_KEY, LONG_PRESS_HIDE_MS } from '@/overlays/tooltip/tooltip.constants';
import type { TooltipContextValue, TooltipStateOptions } from '@/overlays/tooltip/tooltip.types';

interface KeyListenerTarget {
  addEventListener(type: string, listener: (event: { key: string }) => void): void;
  removeEventListener(type: string, listener: (event: { key: string }) => void): void;
}

// Without a provider every tooltip shares these, so moving between them still skips the delay.
export const TooltipContext = createContext<TooltipContextValue>({
  delayDuration: DEFAULT_DELAY_MS,
  skipDelayDuration: DEFAULT_SKIP_DELAY_MS,
  closedAt: { current: 0 },
});

/**
 * When a tooltip shows. On the web: after the pointer rests on the trigger (at once when another just closed), or on keyboard
 * focus; it hides on leave, blur, press or Escape. On touch: a long press shows it for a moment.
 */
export const useTooltip = ({ open: openProp, defaultOpen = false, onOpenChange, delayDuration }: TooltipStateOptions) => {
  const { closedAt, skipDelayDuration, ...provider } = useContext(TooltipContext);
  const delay = delayDuration ?? provider.delayDuration;
  const [open, setValue] = useControllableState(openProp, defaultOpen, onOpenChange);
  const focus = useFocusVisible();
  const timer = useRef<ReturnType<typeof setTimeout>>(undefined);
  const current = useRef(open);
  current.current = open;

  const setOpen = useCallback(
    (next: boolean) => {
      clearTimeout(timer.current);
      if (next === current.current) return;
      if (!next) closedAt.current = Date.now();
      current.current = next;
      setValue(next);
    },
    [closedAt, setValue]
  );

  const show = () => {
    clearTimeout(timer.current);
    if (delay <= 0 || Date.now() - closedAt.current < skipDelayDuration) setOpen(true);
    else timer.current = setTimeout(() => setOpen(true), delay);
  };

  // Keyboard focus only: a click focuses the trigger too, and shouldn't pop the tooltip up.
  useEffect(() => {
    if (focus.focusVisible) setOpen(true);
  }, [focus.focusVisible, setOpen]);

  useEffect(() => () => clearTimeout(timer.current), []);

  // Escape closes it wherever focus is, including when it opened on hover.
  useEffect(() => {
    const doc: KeyListenerTarget | undefined = Reflect.get(globalThis, 'document');
    if (!open || !doc) return;
    const onKeyDown = (e: { key: string }) => {
      if (e.key === ESCAPE_KEY) setOpen(false);
    };
    doc.addEventListener('keydown', onKeyDown);
    return () => doc.removeEventListener('keydown', onKeyDown);
  }, [open, setOpen]);

  const hide = () => setOpen(false);
  const pointer = IS_WEB
    ? {
        onHoverIn: show,
        onHoverOut: hide,
        onFocus: focus.onFocus,
        onBlur: () => {
          focus.onBlur();
          hide();
        },
      }
    : {};

  return {
    open,
    close: hide,
    triggerProps: {
      ...pointer,
      onPressIn: hide,
      onLongPress: () => {
        setOpen(true);
        timer.current = setTimeout(hide, LONG_PRESS_HIDE_MS);
      },
    },
  };
};
