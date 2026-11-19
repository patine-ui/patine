import { A11Y_ACTION, ADJUSTABLE_ACTIONS, KEY } from '@/core/a11y/a11y.constants';
import { keyboardProps } from '@/core/a11y/keyboard.utils';
import { useTrackPan } from '@/core/hooks/useTrackPan';
import { View } from '@/core/primitives/View';
import { fillOf } from '@/core/utils/style.utils';
import { clamp01 } from '@/core/utils/track.utils';
import { COLOR_STEP, PAD_ACTION } from '@/pickers/color/color.constants';
import { knobStyles, styles, themed } from '@/pickers/color/color.styles';
import type { ColorPadProps } from '@/pickers/color/color.types';
import { getThumbPlace, heightOf } from '@/pickers/color/color.utils';

/**
 * A square of colour to tap or drag across. Screen readers step it across with increment and decrement, and up and down
 * with two named actions, since they can't move in two directions at once.
 */
export const ColorPad = ({
  label,
  x,
  y,
  onValueChange,
  thumbColor,
  valueText,
  upLabel,
  downLabel,
  height,
  children,
  theme,
  slots,
  testID,
}: ColorPadProps) => {
  const pan = useTrackPan({ onMove: onValueChange });
  const moveX = (by: number) => onValueChange(clamp01(x + by), y);
  const moveY = (by: number) => onValueChange(x, clamp01(y + by));
  return (
    <View
      style={[styles.pad, heightOf(height), themed(theme).large, slots?.pad]}
      onLayout={pan.onLayout}
      {...pan.panHandlers}
      accessible
      role="slider"
      aria-label={label}
      aria-valuetext={valueText}
      accessibilityActions={[...ADJUSTABLE_ACTIONS, { name: PAD_ACTION.up, label: upLabel }, { name: PAD_ACTION.down, label: downLabel }]}
      onAccessibilityAction={({ nativeEvent: { actionName } }) => {
        if (actionName === A11Y_ACTION.increment || actionName === A11Y_ACTION.decrement) {
          moveX(actionName === A11Y_ACTION.increment ? COLOR_STEP : -COLOR_STEP);
        } else moveY(actionName === PAD_ACTION.up ? -COLOR_STEP : COLOR_STEP);
      }}
      {...keyboardProps({
        [KEY.right]: () => moveX(COLOR_STEP),
        [KEY.left]: () => moveX(-COLOR_STEP),
        [KEY.up]: () => moveY(-COLOR_STEP),
        [KEY.down]: () => moveY(COLOR_STEP),
      })}
      testID={testID}
    >
      <View pointerEvents="none" style={styles.layer}>
        {children}
      </View>
      <View
        pointerEvents="none"
        style={[styles.padThumb, knobStyles(theme).ring, getThumbPlace(x, y), fillOf(thumbColor), themed(theme).shadow]}
      />
    </View>
  );
};
