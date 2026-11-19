import type React from 'react';
import type { ViewProps } from 'react-native';

import type { SlotStyles, ThemableProps, ValueOf } from '@/core/core.types';
import type { BADGE_VARIANT } from './badge.constants';

export type BadgeVariant = ValueOf<typeof BADGE_VARIANT>;

export interface BadgeProps extends ViewProps, ThemableProps {
  /** The label. A string is drawn in the variant's color; anything else as is */
  children?: React.ReactNode;
  /** Default: 'default' */
  variant?: BadgeVariant;
  /** Styles for its parts: `label` */
  styles?: SlotStyles<'label'>;
}

export interface BadgeColors {
  background: string;
  text: string;
  border: string;
}
