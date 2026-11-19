import { useEffect, useRef } from 'react';
import type { AccessibilityActionEvent, HostInstance, KeyDownEvent } from 'react-native';

import { focusRing } from '@/core/a11y/a11y.utils';
import { useFocusVisible } from '@/core/a11y/hooks/useFocusVisible';
import { useAnimatedTo } from '@/core/animation';
import { IS_WEB } from '@/core/core.constants';
import { AnimatedView, Pressable } from '@/core/primitives/View';
import { SortableRowCtx } from '@/display/sortable/SortableContext';
import { LIFT_DELAY_MS, MOVE_ACTION, SORT_ACTIVATION, SORTABLE_DESIGN } from '@/display/sortable/sortable.constants';
import { styles, themed } from '@/display/sortable/sortable.styles';
import type { SortableRowProps } from '@/display/sortable/sortable.types';

const KEYS = { space: ' ', enter: 'Enter', escape: 'Escape', up: 'ArrowUp', down: 'ArrowDown' } as const;

/**
 * One row: it makes way while another is dragged, follows the finger when lifted, and on the web picks up with Space,
 * moves with the arrow keys and drops with Space, Enter or Escape. Screen readers get Move up and Move down actions.
 */
export const SortableRow = ({
  itemKey,
  index,
  count,
  shift,
  active,
  dragging,
  grabbed,
  drag,
  label,
  labels,
  activation,
  disabled,
  theme,
  onLayout,
  onLift,
  onRelease,
  onMove,
  onGrab,
  children,
}: SortableRowProps) => {
  const look = SORTABLE_DESIGN[theme.design];
  const ref = useRef<HostInstance>(null);
  const focus = useFocusVisible();
  // Rows jump back to rest once the new order renders; while dragging they glide out of the way.
  const offset = useAnimatedTo(shift, { duration: theme.animation.duration, instant: !dragging });
  const scale = useAnimatedTo(active ? look.scale : 1, { duration: theme.animation.duration });
  const raised = active || grabbed;
  // Animated values: the row follows the drag, or slides to its new place, and grows while held.
  const motion = { transform: [{ translateY: active ? drag : offset }, { scale }] };

  // A keyboard move re-renders the row elsewhere in the list: keep focus on it.
  // biome-ignore lint/correctness/useExhaustiveDependencies: refocus when the index changes.
  useEffect(() => {
    if (grabbed) (ref.current as unknown as { focus?: () => void } | null)?.focus?.();
  }, [index, grabbed]);

  const onKeyDown = (e: KeyDownEvent) => {
    if (disabled || e.target !== e.currentTarget) return;
    const { key } = e.nativeEvent;
    const handled =
      key === KEYS.space || key === KEYS.enter
        ? () => onGrab(grabbed ? null : itemKey)
        : key === KEYS.escape && grabbed
          ? () => onGrab(null)
          : grabbed && (key === KEYS.up || key === KEYS.down)
            ? () => onMove(index, key === KEYS.up ? -1 : 1)
            : null;
    if (!handled) return;
    e.preventDefault();
    e.stopPropagation();
    handled();
  };

  const actions = [
    ...(index > 0 ? [{ name: MOVE_ACTION.up, label: labels.moveUp }] : []),
    ...(index < count - 1 ? [{ name: MOVE_ACTION.down, label: labels.moveDown }] : []),
  ];
  const a11y = IS_WEB
    ? {
        role: 'listitem' as const,
        'aria-label': label,
        accessibilityHint: disabled ? undefined : labels.keyboardHint,
        focusable: !disabled,
        onKeyDown,
        onFocus: focus.onFocus,
        onBlur: () => {
          focus.onBlur();
          if (grabbed) onGrab(null);
        },
      }
    : {
        accessible: true,
        'aria-label': label,
        accessibilityActions: disabled ? undefined : actions,
        onAccessibilityAction: (e: AccessibilityActionEvent) => onMove(index, e.nativeEvent.actionName === MOVE_ACTION.up ? -1 : 1),
      };

  return (
    <AnimatedView
      ref={ref}
      onLayout={(e) => onLayout(itemKey, { y: e.nativeEvent.layout.y, height: e.nativeEvent.layout.height })}
      style={[raised && [styles.raised, themed(theme).raised], focus.focusVisible && focusRing(theme.colors.primary), motion]}
      {...a11y}
    >
      <SortableRowCtx.Provider value={{ theme, active, disabled, lift: () => onLift(index), release: onRelease }}>
        {activation === SORT_ACTIVATION.longPress && !disabled ? (
          <Pressable
            accessible={false}
            tabIndex={-1}
            delayLongPress={LIFT_DELAY_MS}
            onLongPress={() => onLift(index)}
            onPressOut={onRelease}
            style={styles.press}
          >
            {children}
          </Pressable>
        ) : (
          children
        )}
      </SortableRowCtx.Provider>
    </AnimatedView>
  );
};
