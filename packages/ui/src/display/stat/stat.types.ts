import type React from 'react';
import type { StyleProp, ViewProps, ViewStyle } from 'react-native';

import type { SlotStyles, ThemableProps, ValueOf } from '@/core/core.types';
import type { TextSize, TextWeight } from '@/core/theme/theme.types';
import type { TREND } from './stat.constants';

export type Trend = ValueOf<typeof TREND>;

export type StatSlot = 'label' | 'value' | 'change' | 'description';

export interface StatProps extends Omit<ViewProps, 'children'>, ThemableProps {
  /** What's measured: 'Revenue', 'Active users' */
  label: string;
  /** The figure, formatted: '$48,210' */
  value: React.ReactNode;
  /** How it moved: '+12.5%', or a number whose sign sets the trend */
  change?: string | number;
  /** 'up', 'down' or 'neutral'. Default: from `change`'s sign ('-' or '−' is down) */
  trend?: Trend;
  /** Down is good, as for costs, churn or load time: down draws green and up red. Default: false */
  invertTrend?: boolean;
  /** Under the value: 'vs last month' */
  description?: React.ReactNode;
  /** Beside the label, such as an icon */
  icon?: React.ReactNode;
  /** Below everything, such as a Sparkline */
  children?: React.ReactNode;
  style?: StyleProp<ViewStyle>;
  styles?: SlotStyles<StatSlot>;
}

export interface StatDesign {
  valueSize: TextSize;
  valueWeight: TextWeight;
  /** The change in a tinted pill, rather than colored text */
  changePill: boolean;
}
