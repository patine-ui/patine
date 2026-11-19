import { Text } from '@/core/primitives/Text';
import { View } from '@/core/primitives/View';
import { styles, themed } from '@/inputs/slider/slider.styles';
import type { ValueLabelProps } from '@/inputs/slider/slider.types';
import { getValueLabelPlace } from '@/inputs/slider/slider.utils';

/** Material's value bubble over the dragged thumb. */
export const ValueLabel = ({ x, text, design, theme, slots }: ValueLabelProps) => (
  <View pointerEvents="none" style={[styles.valueLabelBox, getValueLabelPlace(x, design.thumbHeight)]}>
    <View style={[styles.valueLabel, themed(theme).valueLabel, slots?.valueLabel]}>
      <Text size="sm" color="background" style={slots?.valueLabelText}>
        {text}
      </Text>
    </View>
  </View>
);
