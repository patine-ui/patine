import { View } from '@/core/primitives/View';
import { styles, themed } from '@/pickers/wheel/wheel.styles';
import type { WheelIndicatorProps } from '@/pickers/wheel/wheel.types';
import { getItemHeight } from '@/pickers/wheel/wheel.utils';

export const WheelIndicator = ({ itemHeight, theme, style, renderIndicator }: WheelIndicatorProps) => (
  <View pointerEvents="none" style={styles.centerOverlay}>
    {renderIndicator ? renderIndicator(theme) : <View style={[getItemHeight(itemHeight), themed(theme).indicator, style]} />}
  </View>
);
