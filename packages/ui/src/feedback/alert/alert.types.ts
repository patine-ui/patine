import type React from 'react';
import type { ViewProps } from 'react-native';

import type { ThemableProps, ValueOf } from '@/core/core.types';
import type { ALERT_VARIANT } from './alert.constants';

export type AlertVariant = ValueOf<typeof ALERT_VARIANT>;

export interface AlertProps extends ViewProps, ThemableProps {
  /** Default: 'default' */
  variant?: AlertVariant;
  /** Shown before the title and description */
  icon?: React.ReactNode;
  /** Announce it as soon as it appears, for errors that come after an action. Default: true for 'destructive' */
  live?: boolean;
  /** Shorthand: the AlertTitle, so you don't compose it. `children` follow it */
  title?: React.ReactNode;
  /** Shorthand: the AlertDescription under the title */
  description?: React.ReactNode;
}
