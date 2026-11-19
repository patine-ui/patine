import { adjustableProps } from '@/core/a11y/adjustable.utils';
import { KNOB_SIZE } from '@/core/core.constants';
import { useTrackPan } from '@/core/hooks/useTrackPan';
import { Text } from '@/core/primitives/Text';
import { View } from '@/core/primitives/View';
import { fillOf } from '@/core/utils/style.utils';
import { clamp01 } from '@/core/utils/track.utils';
import { COLOR_DESIGN, COLOR_STEP } from '@/pickers/color/color.constants';
import { knobStyles, styles, themed } from '@/pickers/color/color.styles';
import type { ColorSliderProps } from '@/pickers/color/color.types';
import { getCenteredTop, getRailBox, getThumbPlace, roundOf, toSlices } from '@/pickers/color/color.utils';
import { Checkerboard } from './Checkerboard';

const INSET = KNOB_SIZE / 2;

/** A slider over its own gradient, drawn as slices of solid colour; 44pt to touch however thin the track. */
export const ColorSlider = ({
  label,
  value,
  onValueChange,
  colors,
  thumbColor,
  valueText,
  showLabel = false,
  showValue = false,
  checkered = false,
  theme,
  slots,
  testID,
}: ColorSliderProps) => {
  const pan = useTrackPan({ onMove: (x) => onValueChange(x), insetX: INSET });
  const { trackHeight } = COLOR_DESIGN[theme.design];
  return (
    <View>
      {showLabel || showValue ? (
        <View style={styles.sliderHeader}>
          <Text theme={theme} size="sm" color="textSecondary" style={slots?.sliderLabel}>
            {showLabel ? label : ''}
          </Text>
          {showValue ? (
            <Text theme={theme} size="sm" color="textSecondary" style={slots?.sliderLabel}>
              {valueText}
            </Text>
          ) : null}
        </View>
      ) : null}
      <View
        style={[styles.slider, slots?.slider]}
        onLayout={pan.onLayout}
        {...pan.panHandlers}
        {...adjustableProps({
          label,
          valueText,
          onStep: (direction) => onValueChange(clamp01(value + direction * COLOR_STEP)),
          onMin: () => onValueChange(0),
          onMax: () => onValueChange(1),
        })}
        testID={testID}
      >
        <View pointerEvents="none" style={[styles.rail, getRailBox(trackHeight, INSET)]}>
          <View style={[styles.track, roundOf(trackHeight / 2)]}>
            {checkered ? <Checkerboard /> : null}
            {toSlices(colors).map(({ key, color }) => (
              <View key={key} style={[styles.fill, fillOf(color)]} />
            ))}
          </View>
          <View
            style={[
              styles.sliderThumb,
              knobStyles(theme).ring,
              getThumbPlace(value),
              getCenteredTop(trackHeight, KNOB_SIZE),
              fillOf(thumbColor),
              themed(theme).shadow,
              slots?.sliderThumb,
            ]}
          />
        </View>
      </View>
    </View>
  );
};
