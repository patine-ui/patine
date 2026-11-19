import type { DimensionValue, ViewStyle } from 'react-native';

import type { Theme } from '@/core/theme/theme.types';

/** A skeleton's size and corners: a theme radius step, or points. */
export const getBoneShape = (
  theme: Theme,
  width: DimensionValue,
  height: DimensionValue,
  radius: keyof Theme['radius'] | number
): ViewStyle => ({
  width,
  height,
  borderRadius: typeof radius === 'number' ? radius : theme.radius[radius],
});
