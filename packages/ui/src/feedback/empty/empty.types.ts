import type React from 'react';
import type { ViewProps } from 'react-native';

import type { ThemableProps } from '@/core/core.types';

export interface EmptyStateProps extends ViewProps, ThemableProps {
  title: string;
  /** What to do about it, e.g. "Try another search or clear the filters" */
  description?: string;
  /** An illustration, icon or emoji above the title */
  icon?: React.ReactNode;
  /** One or two Buttons under the text */
  action?: React.ReactNode;
}
