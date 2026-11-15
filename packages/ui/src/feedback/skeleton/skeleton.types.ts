import type { DimensionValue, ViewProps } from 'react-native';

import type { DeepPartial } from '@/core/core.types';
import type { Theme } from '@/core/theme/theme.types';

export interface SkeletonProps extends ViewProps {
  /** Default: '100%' */
  width?: DimensionValue;
  /** Default: 16, about a line of text */
  height?: DimensionValue;
  /** A radius step, 'full' for a circle or pill, or points. Default: 'sm' */
  radius?: keyof Theme['radius'] | number;
  theme?: DeepPartial<Theme>;
}
