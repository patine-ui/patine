import { useEffect, useRef, useState } from 'react';
import type { KeyDownEvent, LayoutChangeEvent } from 'react-native';

import { EASE_OUT, timing, useAnimatedValue } from '@/core/animation';
import { IS_WEB, KEY } from '@/core/core.constants';
import { useDrag } from '@/core/hooks/useDrag';
import type { Theme } from '@/core/theme/theme.types';
import { SWIPE_DESIGN, SWIPE_SIDE } from '@/display/swipeable/swipeable.constants';
import type { SwipeAction, SwipeableRowProps, SwipeSide } from '@/display/swipeable/swipeable.types';
import { clampOffset, isFullSwipe, openOffset, releaseSwipe } from '@/display/swipeable/swipeable.utils';

interface OpenRow {
  close: () => void;
}

// ponytail: one open row app-wide, as iOS has it; a group context if two lists on one screen need their own.
let openRow: OpenRow | null = null;

const NO_ACTIONS: readonly SwipeAction[] = [];

type Params = Pick<SwipeableRowProps, 'leadingActions' | 'trailingActions' | 'fullSwipe' | 'disabled' | 'onOpenChange'> & { theme: Theme };

/**
 * A row's swipe: it follows the finger up to its actions and resists past them, opens or closes on release, runs the
 * outermost action on a long swipe, and closes any other open row as it opens. Arrow keys open it on the web.
 */
export const useSwipeable = ({
  leadingActions = NO_ACTIONS,
  trailingActions = NO_ACTIONS,
  fullSwipe = false,
  disabled = false,
  onOpenChange,
  theme,
}: Params) => {
  const look = SWIPE_DESIGN[theme.design];
  const [width, setWidth] = useState(0);
  const [open, setOpen] = useState<SwipeSide | null>(null);
  const [revealed, setRevealed] = useState<SwipeSide | null>(null);
  const [armed, setArmed] = useState(false);
  const x = useAnimatedValue(0);
  const offset = useRef({ base: 0, current: 0 }).current;
  const bounds = {
    leading: leadingActions.length * look.actionWidth,
    trailing: trailingActions.length * look.actionWidth,
    width,
    full: fullSwipe,
    resistance: look.resistance,
  };
  const duration = theme.animation.duration;

  const moveTo = (to: number, done?: () => void) => {
    offset.current = to;
    timing(x, to, { duration, easing: EASE_OUT }).start(({ finished }) => {
      if (finished) done?.();
    });
  };

  const self = useRef<OpenRow>({ close: () => {} }).current;
  const settle = (side: SwipeSide | null) => {
    moveTo(openOffset(side, bounds), side ? undefined : () => setRevealed(null));
    setArmed(false);
    if (side) {
      setRevealed(side);
      if (openRow && openRow !== self) openRow.close();
      openRow = self;
    } else if (openRow === self) openRow = null;
    if (side !== open) {
      setOpen(side);
      onOpenChange?.(side);
    }
  };
  self.close = () => settle(null);
  useEffect(
    () => () => {
      if (openRow === self) openRow = null;
    },
    [self]
  );

  const run = (action: SwipeAction) => {
    settle(null);
    action.onPress();
  };

  // The edge action takes the whole row: slide it out, run the action, then come back in case the row stays.
  const runFull = (side: SwipeSide) => {
    const action = (side === SWIPE_SIDE.leading ? leadingActions : trailingActions)[0];
    if (!action) return settle(null);
    moveTo(side === SWIPE_SIDE.leading ? width : -width, () => {
      action.onPress();
      settle(null);
    });
  };

  const drag = useDrag({
    onStart: () => {
      offset.base = offset.current;
      if (openRow && openRow !== self) openRow.close();
    },
    onMove: ({ dx }) => {
      const next = clampOffset(offset.base + dx, bounds);
      offset.current = next;
      x.setValue(next);
      const side = next > 0 ? SWIPE_SIDE.leading : next < 0 ? SWIPE_SIDE.trailing : revealed;
      if (side !== revealed) setRevealed(side);
      const full = isFullSwipe(next, bounds);
      if (full !== armed) setArmed(full);
    },
    onEnd: ({ vx }) => {
      const release = releaseSwipe(offset.current, vx, bounds);
      if (release.kind === 'full') runFull(release.side);
      else settle(release.kind === 'open' ? release.side : null);
    },
    onCancel: () => settle(open),
  });

  const onKeyDown = (e: KeyDownEvent) => {
    if (e.target !== e.currentTarget) return;
    const { key } = e.nativeEvent;
    // ponytail: left and right don't swap in RTL; read the layout direction if RTL web apps need it.
    const side =
      key === KEY.left && trailingActions.length
        ? SWIPE_SIDE.trailing
        : key === KEY.right && leadingActions.length
          ? SWIPE_SIDE.leading
          : key === 'Escape' && open
            ? null
            : undefined;
    if (side === undefined) return;
    e.preventDefault();
    settle(side === open ? null : side);
  };

  return {
    x,
    open,
    revealed,
    armed,
    look,
    run,
    close: () => settle(null),
    panHandlers: disabled ? {} : drag,
    keys: IS_WEB && !disabled ? { focusable: true, onKeyDown } : {},
    onLayout: (e: LayoutChangeEvent) => setWidth(e.nativeEvent.layout.width),
  };
};
