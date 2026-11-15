import type { Theme } from '@/core/theme/theme.types';
import { TREND } from './stat.constants';
import type { Trend } from './stat.types';

/** The trend a change shows: down for a minus sign, neutral for zero, up otherwise. */
export const getTrend = (change: string | number | undefined): Trend => {
  if (change === undefined) return TREND.neutral;
  if (typeof change === 'number') return change > 0 ? TREND.up : change < 0 ? TREND.down : TREND.neutral;
  const text = change.trim();
  if (/^[-−]/.test(text)) return TREND.down;
  return /^[+]?0*(\.0*)?%?$/.test(text) ? TREND.neutral : TREND.up;
};

/** A trend's color: green for good, red for bad, gray for neutral. `invert` when down is good. */
export const getTrendColor = (colors: Theme['colors'], trend: Trend, invert: boolean) => {
  if (trend === TREND.neutral) return colors.textSecondary;
  return (trend === TREND.up) !== invert ? colors.success : colors.danger;
};

/** A change as shown: numbers get a sign. */
export const formatChange = (change: string | number) => (typeof change === 'number' && change > 0 ? `+${change}` : String(change));
