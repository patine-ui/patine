import { View } from 'react-native';

import { styles } from '@/pickers/wheel/wheel.styles';
import type { WheelIndicatorProps } from '@/pickers/wheel/wheel.types';

export const WheelIndicator = ({ itemHeight, theme, style, renderIndicator }: WheelIndicatorProps) => (
  <View pointerEvents="none" style={styles.centerOverlay}>
    {renderIndicator ? (
      renderIndicator(theme)
    ) : (
      <View
        style={[
          {
            height: itemHeight,
            borderRadius: theme.radius.md,
            backgroundColor: theme.colors.indicator,
            marginHorizontal: theme.spacing.xs,
          },
          style,
        ]}
      />
    )}
  </View>
);
