import type { ViewProps } from 'react-native';

import type { DeepPartial } from '@/core/core.types';
import type { Theme } from '@/core/theme/theme.types';

export interface SeparatorProps extends ViewProps {
  /** Default: 'horizontal' */
  orientation?: 'horizontal' | 'vertical';
  /** Purely visual (the default), so screen readers skip it. Set false when it separates content meaningfully */
  decorative?: boolean;
  theme?: DeepPartial<Theme>;
}
