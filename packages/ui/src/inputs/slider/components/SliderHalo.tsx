import { Animated } from 'react-native';

import { TOUCH_TARGET } from '@/core/core.constants';
import { useHaloStyle } from '@/inputs/slider/hooks/useHaloStyle';
import { styles } from '@/inputs/slider/slider.styles';
import type { SliderHaloProps } from '@/inputs/slider/slider.types';

/** The web design's ring of colour behind a thumb: faint on hover or focus, grown in and stronger while pressed. */
export const SliderHalo = ({ x, level, size, theme, testID }: SliderHaloProps) => {
  const animated = useHaloStyle(level, theme.animation.duration);
  return (
    <Animated.View
      pointerEvents="none"
      style={[
        styles.halo,
        {
          start: x - size / 2,
          top: (TOUCH_TARGET - size) / 2,
          width: size,
          height: size,
          borderRadius: size / 2,
          backgroundColor: theme.colors.primary,
        },
        animated,
      ]}
      testID={testID}
    />
  );
};
