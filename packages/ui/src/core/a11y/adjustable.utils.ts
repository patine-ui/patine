import type { AccessibilityActionEvent } from 'react-native';

import type { AdjustableOptions } from '@/core/core.types';
import { A11Y_ACTION, ADJUSTABLE_ACTIONS, KEY } from './a11y.constants';
import { keyboardProps } from './keyboard.utils';

/**
 * Screen-reader adjust actions and keys for a control that moves in steps, a slider's thumb: `onStep(1)` on increment,
 * right and up, `onStep(-1)` on decrement, left and down. Home and End go to the ends; Page Up and Down call `onPage`.
 */
export const adjustableProps = ({ label, valueText, disabled = false, onStep, onPage, onMin, onMax }: AdjustableOptions) => ({
  accessible: true,
  role: 'slider' as const,
  'aria-label': label,
  'aria-valuetext': valueText,
  'aria-disabled': disabled,
  accessibilityActions: ADJUSTABLE_ACTIONS,
  onAccessibilityAction: (e: AccessibilityActionEvent) => {
    if (!disabled) onStep(e.nativeEvent.actionName === A11Y_ACTION.increment ? 1 : -1);
  },
  ...(disabled
    ? {}
    : keyboardProps({
        [KEY.right]: () => onStep(1),
        [KEY.up]: () => onStep(1),
        [KEY.left]: () => onStep(-1),
        [KEY.down]: () => onStep(-1),
        [KEY.pageUp]: onPage && (() => onPage(1)),
        [KEY.pageDown]: onPage && (() => onPage(-1)),
        [KEY.home]: onMin,
        [KEY.end]: onMax,
      })),
});
