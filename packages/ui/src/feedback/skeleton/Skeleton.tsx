import { Animated } from 'react-native';

import { usePulse } from '@/core/animation';
import { useTheme } from '@/core/theme/ThemeProvider';
import type { SkeletonProps } from './skeleton.types';

/**
 * A placeholder shaped like the content that's loading, breathing gently (still when the OS asks to reduce motion).
 * Hidden from screen readers: mark the region that's loading with `aria-busy` instead.
 */
export const Skeleton = ({ width = '100%', height = 16, radius = 'sm', theme: themeProp, style, ...rest }: SkeletonProps) => {
  const theme = useTheme(themeProp);
  const opacity = usePulse();
  return (
    <Animated.View
      aria-hidden
      style={[
        {
          width,
          height,
          borderRadius: typeof radius === 'number' ? radius : theme.radius[radius],
          backgroundColor: theme.colors.surface,
          opacity,
        },
        style,
      ]}
      {...rest}
    />
  );
};
