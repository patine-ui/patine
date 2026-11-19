import type { ReactNode } from 'react';

import type { Theme } from '@/core/theme/theme.types';
import { TREND, TREND_WORD } from './stat.constants';
import type { Trend, TrendTone } from './stat.types';

/** The trend a change shows: down for a minus sign, neutral for zero, up otherwise. */
export const getTrend = (change: string | number | undefined): Trend => {
  if (change === undefined) return TREND.neutral;
  if (typeof change === 'number') return change > 0 ? TREND.up : change < 0 ? TREND.down : TREND.neutral;
  const text = change.trim();
  if (/^[-−]/.test(text)) return TREND.down;
  return /^[+]?0*(\.0*)?%?$/.test(text) ? TREND.neutral : TREND.up;
};

/** Whether a trend is good, bad or neutral. `invert` when down is good. */
export const getTrendTone = (trend: Trend, invert: boolean): TrendTone => {
  if (trend === TREND.neutral) return 'neutral';
  return (trend === TREND.up) !== invert ? 'good' : 'bad';
};

/** A tone's color: green for good, red for bad, gray for neutral. */
export const TONE_COLOR = { good: 'success', bad: 'danger', neutral: 'textSecondary' } as const satisfies Record<
  TrendTone,
  keyof Theme['colors']
>;

/** A trend's color: green for good, red for bad, gray for neutral. `invert` when down is good. */
export const getTrendColor = (colors: Theme['colors'], trend: Trend, invert: boolean) => colors[TONE_COLOR[getTrendTone(trend, invert)]];

const textOf = (node: ReactNode) => (typeof node === 'string' || typeof node === 'number' ? String(node) : '');

/** The whole stat as one sentence for screen readers: "Revenue, $12k, up 8%, vs last month". */
export const getStatLabel = (label: string, value: ReactNode, changeText: string | null, trend: Trend, description: ReactNode) =>
  [label, textOf(value), changeText && `${TREND_WORD[trend]} ${changeText.replace(/^[+\-−]/, '')}`, textOf(description)]
    .filter(Boolean)
    .join(', ');

/** A change as shown: numbers get a sign. */
export const formatChange = (change: string | number) => (typeof change === 'number' && change > 0 ? `+${change}` : String(change));
